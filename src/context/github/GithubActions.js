import axios from "axios";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const githubInstance = axios.create({
  baseURL: GITHUB_URL,
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`
  }
})

export const searchUsers = async (query) => {
  const params = new URLSearchParams({q: query})
  const response = await githubInstance.get(`/search/users?${params}`)
  return response.data.items;
}

export const loadUser = async login => {
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
  return user;
}