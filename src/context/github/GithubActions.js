const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const searchUsers = async (query) => {
  const params = new URLSearchParams({q: query})
  const response = await fetch(`${GITHUB_URL}/search/users?${params}`, 
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`
      }
    }
  );
  const {items} = await response.json();
  return items;
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