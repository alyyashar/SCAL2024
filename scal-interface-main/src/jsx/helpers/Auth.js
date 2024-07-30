import cookie from 'js-cookie';

// Set in Cookie
export const setCookie = (key, value) => {
  if (window !== 'undefined') {
    cookie.set(key, value, {
      // 1 Day
      expires: 1,
    });
  }
};

// remove from cookie
export const removeCookie = (key) => {
  if (window !== 'undefined') {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

// Get from cookie such as stored token
// Will be useful when we need to make request to server with token
export const getCookie = (key) => {
  if (window !== 'undefined') {
    return cookie.get(key);
  }
};

// Set in localstorage
export const setLocalStorage = (key, value) => {
  if (window !== 'undefined') {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};

export const setTheme = (key, value) => {
  if (window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export const removeTheme = (key) => {
  if (window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

// Remove from localstorage
export const removeLocalStorage = (key) => {
  if (window !== 'undefined') {
    sessionStorage.removeItem(key);
  }
};

// Authenticate user by passing data to cookie and localstorage during signin
export const authenticate = (response) => {
  console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response);
  setCookie('token', response.data.token);
  setLocalStorage('user', response.data.user);
  setTheme('theme', { value: "light", label: "Light" });
  setNotification('notification', [])
};

// Access user info from localstorage
export const isAuth = () => {
  if (window !== 'undefined') {
    const cookieChecked = getCookie('token');
    if (cookieChecked) {
      if (sessionStorage.getItem('user')) {
       // console.log(localStorage.getItem('user'));
        return JSON.parse(sessionStorage.getItem('user'));
      } else {
        return false;
      }
    }
  }
};

export const isTheme = () => {
  if (window !== 'undefined') {
    return JSON.parse(localStorage.getItem('theme'));
  }
}

export const signout = () => {
  removeCookie('token');
  removeLocalStorage('user');
  removeNotification('notification');
};

export const updateUser = (response) => {
  //console.log('UPDATE USER IN LOCALSTORAGE HELPERS', response);
  if (typeof window !== 'undefined') {
    let auth = JSON.parse(sessionStorage.getItem('user'));
    auth = response.data;
    sessionStorage.setItem('user', JSON.stringify(auth));
  }
};

export const updateTheme = (response) => {
  if (typeof window !== 'undefined') {
    let theme = JSON.parse(localStorage.getItem('theme'));
    theme = response.data;
    localStorage.setItem('theme', theme);
  }
}

//Set Notification
export const setNotification = (key, value) => {
  if (window !== 'undefined') {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};

// Read Notification
export const isNotification = () => {
  if (window !== 'undefined') {
    const userChecked = sessionStorage.getItem('user');
    if (userChecked) {
      if (sessionStorage.getItem('notification')) {
        return JSON.parse(sessionStorage.getItem('notification'));
      } else {
        return false;
      }
    }
  }
};

// Remove from localstorage
export const removeNotification = (key) => {
  if (window !== 'undefined') {
    sessionStorage.removeItem(key);
  }
};