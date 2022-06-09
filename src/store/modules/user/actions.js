let timer;
// console.log(timer);
const apiKey = 'AIzaSyBiAnEhGVTfT5iyx1asfdH4L0x-8VWKvsk';

export default {

  async login(context, data) {
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        returnSecureToken: true,
      }),
    });
    const responseData = await response.json();

    if (!response.ok) {
      console.log(responseData);
      const error = new Error(response.message || 'Failed to authenticate');
      throw error;
    }

    // console.log('/actions/login - response from API call', responseData);
    const expiresIn = +responseData.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;
    

    localStorage.setItem('uId', responseData.localId);
    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('tokenExpiration', expirationDate);
    
    timer = setTimeout(() => {
      // console.log('***** login - starting timer. *****');
      context.dispatch('autoSignout');
    }, expiresIn);
    // }, 5000);

    await context.commit('setUser', {
      token: responseData.idToken,
      uId: responseData.localId,
    });
  },

  autoLogin(context) {
    const uId = localStorage.getItem('uId');
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(() => {
      context.dispatch('autoSignout');
    }, expiresIn);

    if (uId && token) {
      context.commit('setUser', {
        uId: uId,
        token: token,
      });
    }
  },

  async signup(context, data) {
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        phone: data.phone,
        returnSecureToken: true,
      }),
    });
    const responseData = await response.json();

    if (!response.ok) {
      console.log(responseData);
      const error = new Error(responseData.message || 'Failed to authenticate');
      throw error;
    }

    console.log('actions/signup - response from API call', responseData);
    const expiresIn = +responseData.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;
    localStorage.setItem('uId', responseData.uId);
    localStorage.setItem('token', responseData.token);
    localStorage.setItem('tokenExpiration', expirationDate);
    timer = setTimeout(()=> {
      context.dispatch('autoSignout');
    }, expiresIn);
    context.commit('setUser', {
      token: responseData.idToken,
      uId: responseData.localId,
    });
  },

  async signout(context) {
    localStorage.removeItem('uId');
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);
    context.commit('setUser', {
      uId: null,
      token: null,
    })

  },
  autoSignout(context) {
    context.dispatch('signout');
    context.commit('setAutoSignout');
  }


};