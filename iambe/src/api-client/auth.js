import axios from 'axios';

export const BASE_URL = "http://localhost:2019"

const setToken = (token) => {
  window.localStorage.setItem('tuffet-token', token);
}

const getToken = () => window.localStorage.getItem('tuffet-token');

const setUserData = newData => {
  /**
   * updates userData in localStorage with the given object
   */
  delete newData.email;
  window.localStorage.setItem('userData', JSON.stringify(newData));
}

// const getUserData = () => window.localStorage.getItem('userData');

export const login = async ({ username, password }) => {
  /**
   * uses the given object to login, sets the JWT and userData into localStorage, and returns a full userData object
   */
  try {
    const response = await axios.post(BASE_URL + "/login",
      `grant_type=password&username=${username}&password=${password}`,
      {headers: {
          // btoa is converting our client id/client secret into base64
          Authorization: `Basic ${btoa(process.env.REACT_APP_SECRET)}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    )

    setToken(response.data.access_token);
    const userData = await fetchCurrentUser();
    setUserData(userData);

    return userData;
  } catch (err ) {
    console.log('err', err);
  }
}

export const axiosWithAuth = () => {
  /**
   * a new instance of axios to be used for requests where authorization is required
   */
  const token = getToken();

  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    baseURL: BASE_URL,
  })
}

export const fetchCurrentUser = async () => {
  /**
   * gets the data of the currentUser from the database and returns it
   */
  try {
    let userData;
    
    await axiosWithAuth()
      .get('/users/user/')
      .then(res => {
        const { username, email, poems, roles, userid } = res.data;
        const user = { username, email, poems, role: roles[0].role.name, userid };
        userData = user;
        setUserData(userData);
      })
      .catch(err => console.log(err));
    
    return userData;
  }
  catch (err) {
    throw err
  }
}

export const deletePoemById = async (id) => {
  /**
   * Given a poem id, deletes the poem, updates localStorage with the new userData, returns userData to update store 
   */
  await axiosWithAuth().delete(`/poems/poem/${id}`);
  
  const userData = await fetchCurrentUser();
  setUserData(userData);
  
  return userData;
}