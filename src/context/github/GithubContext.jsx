import {createContext, useReducer} from "react";
import { githubReducer } from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({children}) => {
  const initialState = {
    users: [],
    user: null,
    loading: false
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const searchUsers = async (query) => {
    setLoading();

    const params = new URLSearchParams({q: query})
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, 
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`
        }
      }
    );
    const {items} = await response.json();
    dispatch({type: 'GET_USERS', payload: items});
  }

  const loadUser = async login => {
    setLoading();
    const response = await fetch(`${GITHUB_URL}/users/${login}`, 
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`
        }
      }
    );

    if (response.status === 404) {
      window.location = '/notfound';
      return;
    }
    const user = await response.json();
    dispatch({type: 'GET_USER', payload: user});
  }

  const setLoading = () => dispatch({type: 'SET_LOADING'});

  const clearUsers = () => dispatch({type: 'CLEAR_USERS'});

  return <GithubContext.Provider value={{
    users: state.users, 
    user: state.user,
    loading: state.loading,
    searchUsers,
    setLoading,
    clearUsers,
    loadUser
  }}>
    {children}
  </GithubContext.Provider>
};

export default GithubContext;