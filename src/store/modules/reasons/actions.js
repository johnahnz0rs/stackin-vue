// HELPERS
async function getAllReasonsFromDbase(uId, token) {
  // API Call
  const response = await fetch(`https://stackin-vue-default-rtdb.firebaseio.com/reasons/${uId}.json?auth=${token}`);
  
  // error handling
  if(!response.ok) { 
    console.log(responseData);
    const error = new Error(response.message || 'Failed to add a win to today');
    throw error;
  }

  // manipulate & return data
  const reasons = [];
  const responseData = await response.json();
  for (const key in responseData) {
    const reasonObj = {
      id: key,
      reason: responseData[key].reason,
      dateCreated: responseData[key].dateCreated,
      dateUpdated: responseData[key].dateUpdated,
    };
    reasons.push(reasonObj);
  }
  return reasons;
}

export default {

  // CREATE
  async addNewReason(context, data) {
    
    // build the data 
    const uId = context.rootGetters.uId;
    const token = context.rootGetters.token;
    const newReason = {
      reason: data.reason,
      dateCreated: data.dateCreated,
      dateUpdated: data.dateUpdated,
    };
    console.log('***********[ reasons/actions > starting addNewReason ]***********', uId, token, newReason);
    
    // build the REST API call
    const response = await fetch(`https://stackin-vue-default-rtdb.firebaseio.com/reasons/${uId}.json?auth=${token}`, {
      method: 'POST',
      body: JSON.stringify(newReason)
    });
    const responseData = await response.json();
    // "err handling"
    if(!response.ok) { 
      console.log(responseData);
      const error = new Error(response.message || 'Failed to add a new Reason');
      throw error;
    }

    // mutate the store -- actually, get and set all the user's fresh batch of reasons now.
    const allReasonsNew = await getAllReasonsFromDbase(uId, token);
    context.commit('setReasons', allReasonsNew);
    
  },


  // READ (ALL)
  async getAndSetReasons(context) {
    //build the data
    const uId = context.rootGetters.uId;
    const token = context.rootGetters.token;
    // REST API call
    const reasons = await getAllReasonsFromDbase(uId, token);
    context.commit('setReasons', reasons);
  },



  // UPDATE (ONE REASON)
  async updateOneReason(context, data) {
    console.log('this is reasons/actions>updateOneReason()', context, data);
    const uId = context.rootGetters.uId;
    const token = context.rootGetters.token;
    const today = context.rootGetters.today;
    const id = data.id;
    const updatedReason = {
      reason: data.reason,
      dateCreated: data.dateCreated,
      dateUpdated: today,
    }
    const response = await fetch(`https://stackin-vue-default-rtdb.firebaseio.com/reasons/${uId}/${id}.json?auth=${token}`, {
      method: 'PUT',
      body: JSON.stringify(updatedReason)
    });
    const responseData = await response.json();
    if(!response.ok) { 
      console.log(responseData);
      const error = new Error(response.message || 'Failed to update a Reason');
      throw error;
    }

    // mutate the store
    const allReasonsNew = await getAllReasonsFromDbase(uId, token);
    context.commit('setReasons', allReasonsNew);
  },




  // DELETE (ONE REASON)
  async deleteOneReason(context, data) {
    console.log('this is reasons/actions>deleteOneReason()', context, data);
    const uId = context.rootGetters.uId;
    const token = context.rootGetters.token;
    const id = data.id;
    const response = await fetch(`https://stackin-vue-default-rtdb.firebaseio.com/reasons/${uId}/${id}.json?auth=${token}`, {
      method: 'DELETE',
    });
    const responseData = await response.json();
    if (!response.ok) { 
      console.log(responseData);
      const error = new Error(response.message || 'Failed to delete a Reason');
      throw error;
    }

    // mutate the store
    const allReasonsNew = await getAllReasonsFromDbase(uId, token);
    context.commit('setReasons', allReasonsNew);
  },








};