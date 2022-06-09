// HELPERS
async function getProgramFromDbase(uId, token) {
  // API Call
  const response = await fetch(`https://stackin-vue-default-rtdb.firebaseio.com/program/${uId}.json?auth=${token}`);
  const responseData = await response.json();

  // "err handling" - needs to be made real
  if(!response.ok) { 
    console.log(responseData);
    const error = new Error(response.message || 'Failed to add a win to today');
    throw error;
  }

  // manipulate & return data
  const program = [];
  for (const key in responseData) {
    const winObj = {
      id: key,
      win: responseData[key].win,
      dateCreated: responseData[key].dateCreated,
      dateUpdated: responseData[key].dateUpdated,
    };
    program.push(winObj);
  }
  
  return program;
}

async function getAllWinsForTodayFromDbase(uId, today, token) {
  const response = await fetch(`https://stackin-vue-default-rtdb.firebaseio.com/wins/${uId}/${today}.json?auth=${token}`);
  const responseData = await response.json();

  // err handling
  if(!response.ok) {
    console.log(responseData);
    const error = new Error(response.message || 'Failed to get today\'s wins from dbase');
    throw error;
  }

  const wins = [];
  for (const key in responseData) {
    const winObj = {
      id: key,
      win: responseData[key].win,
      stacked: responseData[key].stacked,
      programId: responseData[key].programId,
      dateCreated: responseData[key].dateCreated,
      dateUpdated: responseData[key].dateUpdated, 
    };
    wins.push(winObj);
  }
  return wins;
}

async function addAWinToToday(uId, today, win, token) {

  const response = await fetch(`https://stackin-vue-default-rtdb.firebaseio.com/wins/${uId}/${today}.json?auth=${token}`, {
    method: 'POST',
    body: JSON.stringify(win),
  });
  const responseData = await response.json();
  
  if (!response.ok) {
    console.log(responseData);
    const error = new Error(response.message || 'Failed to add a win to today');
    throw error;
  }
  
}

export default {

  // jahn special
  async createWinsForDashboard(context) { 
    console.log('***********[ wins/actions > starting createDashboard() ]***********')
    
    // data
    const uId = context.rootGetters.uId;
    const today = context.rootGetters.today;
    const token = context.rootGetters.token;
    const program = await getProgramFromDbase(uId, token);
    let wins = await getAllWinsForTodayFromDbase(uId, today, token);
    let programIdsOfTodaysWins = [];
    let winsToAddToToday = [];

    console.log('***********[ got user\'s program and wins for today ]***********');
    console.log('wins:', wins);
    console.log('program:', program);

    // look through wins & find their programId's
    if (wins.length > 0) {
      for (const key in wins) {
        programIdsOfTodaysWins.push(wins[key].programId);
      }
    }
    console.log('got programIdsOfTodaysWins:', programIdsOfTodaysWins);

    // look through program: find missing wins & create newWins
    if (program.length > 0) {
      for (const key in program) {
        if (!programIdsOfTodaysWins.includes(program[key].id)) {
          const newWin = {
            programId: program[key].id,
            win: program[key].win,
            stacked: false,
            dateCreated: today,
            dateUpdated: today,
          };
          // addAWinToToday(uId, today, newWin, token);
          winsToAddToToday.push(newWin);
        }
      }
    }

    // if necessary, make new API calls and mutate store
    if (winsToAddToToday.length > 0) {
      for (const key in winsToAddToToday) {
        const win = winsToAddToToday[key];
        addAWinToToday(uId, today, win, token);
      }
      console.log('winsToAddToToday:', winsToAddToToday);
      wins = await getAllWinsForTodayFromDbase(uId, today, token);
    }
    context.commit('setWins', wins);
    context.commit('setProgram', program);

  },



  // CREATE
  async addNewWinToProgram(context, data) {
    // console.log('starting wins/actions/addNewWinToProgram', data);

    // build the data
    const uId = context.rootGetters.uId;
    const token = context.rootGetters.token;
    const newWinForProgram = {
      win: data.win,
      dateCreated: data.dateCreated,
      dateUpdated: data.dateUpdated,
    };

    // build the REST API Call
    const response = await fetch(`https://stackin-vue-default-rtdb.firebaseio.com/program/${uId}.json?auth=${token}`, {
      method: 'POST',
      body: JSON.stringify(newWinForProgram)
    });
    const responseData = await response.json();

    // "err handling" - needs to be made real
    if(!response.ok) { 
      console.log(responseData);
      const error = new Error(response.message || 'Failed to add a win to today');
      throw error;
    }

    // grab a fresh pull of the user's Program, then save it to the store
    const program = await getProgramFromDbase(uId, token);
    context.commit('setProgram', program);
    
  },

  // CREATE (add program items that are missing from today's wins)
  async addNewWinsFromProgramToToday(context, data) {
    // data
    const uId = context.rootGetters.uId;
    const today = context.rootGetters.today;
    const token = context.rootGetters.token;
    const winsToAdd = data.winsToAdd;
    console.log('wins/actions > addNewWinsFromProgramToToday - starting');
    console.log('winsToAdd (raw data)', winsToAdd);

    for (const key in winsToAdd) {
      console.log(key, winsToAdd[key]);
      const newWin = {
        programId: winsToAdd[key].id,
        win: winsToAdd[key].win,
        stacked: false,
        dateCreated: today,
        dateUpdated: today,
      };
      try {
        addAWinToToday(uId, today, newWin, token);
      } catch {
        console.log(Error);
      }
    }
    
    
    // for (const key in winsToAdd) {
      
    // }
    // update today's wins
    const wins = await getAllWinsForTodayFromDbase(uId, today, token);
    context.commit('setWins', wins);
  },





  // READ (ALL PROGRAM)
  async getAndSetProgram(context) {
    const uId = context.rootGetters.uId;
    const token = context.rootGetters.token;
    const program = await getProgramFromDbase(uId, token); // REST API Call
    context.commit('setProgram', program); // mutate the store
  },

  // READ (ALL WINS) 
  async getAndSetAllWinsForToday(context) {
    const uId = context.rootGetters.uId;
    const today = context.rootGetters.today;
    const token = context.rootGetters.token;
    
    let wins = await getAllWinsForTodayFromDbase(uId, today, token); // REST API Call
    context.commit('setWins', wins); // mutate the store
  },




  // UPDATE (ONE WIN)
  async updateOneWin(context, data) {
    const uId = context.rootGetters.uId;
    const token = context.rootGetters.token;
    const today = context.rootGetters.today;
    // const dateOfWin = data.dateOfWin;
    const id = data.id;
    const updatedWin = {
      win: data.win,
      stacked: data.stacked,
      programId: data.programId,
      dateCreated: data.dateCreated,
      dateUpdated: today,
    };

    const response = await fetch(`https://stackin-vue-default-rtdb.firebaseio.com/wins/${uId}/${today}/${id}.json?auth=${token}`, {
      method: 'PUT',
      body: JSON.stringify(updatedWin)
    });
    const responseData = await response.json();
    if (!response.ok) {
      console.log(responseData);
      const error = new Error(response.message || 'Failed to update a Win');
      throw error;
    }
    // mutate the store
    let wins = await getAllWinsForTodayFromDbase(uId, today, token);
    context.commit('setWins', wins);
  },





  // UPDATE (ONE PROGRAM)
  async updateOneProgram(context, data) {
    const uId = context.rootGetters.uId;
    const token = context.rootGetters.token;
    const today = context.rootGetters.today;
    const id = data.id;
    const updatedProgram = {
      win: data.win,
      dateCreated: data.dateCreated,
      dateUpdated: today,
    };
    const response = await fetch(`https://stackin-vue-default-rtdb.firebaseio.com/program/${uId}/${id}.json?auth=${token}`, {
      method: 'PUT',
      body: JSON.stringify(updatedProgram)
    });
    const responseData = await response.json();
    if (!response.ok) {
      console.log(responseData);
      const error = new Error(response.message || 'Failed to update a Program');
      throw error;
    }
    // mutate the store
    const program = await getProgramFromDbase(uId, token); // REST API Call
    context.commit('setProgram', program); // mutate the store
  },



  // DELETE (ONE PROGRAM)
  async deleteOneProgram(context, data) {
    const uId = context.rootGetters.uId;
    const token = context.rootGetters.token;
    const id = data.id;
    const response = await fetch(`https://stackin-vue-default-rtdb.firebaseio.com/program/${uId}/${id}.json?auth=${token}`, {
      method: 'DELETE',
    });
    const responseData = await response.json();
    if (!response.ok) { 
      console.log(responseData);
      const error = new Error(response.message || 'Failed to delete a Program');
      throw error;
    }
    // mutate the store
    const program = await getProgramFromDbase(uId, token); // REST API Call
    context.commit('setProgram', program); // mutate the store
  },

};