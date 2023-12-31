import { useContext, useState } from "react"
import {searchUsers} from "../../context/github/GithubActions";
import GithubContext from "../../context/github/GithubContext";
import {AlertContext} from "../../context/alert/AlertContext";

const UserSearch = () => {
  const {users, dispatch} = useContext(GithubContext);
  const {setAlert} = useContext(AlertContext);

  const [text, setText] = useState('');
  const handleChange = e => {
    setText(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!text) {
      setAlert('Please enter smth', 'error');
      return;
    }
    
    dispatch({type: 'SET_LOADING'});
    const users = await searchUsers(text);
    dispatch({type: 'GET_USERS', payload: users})
    setText('');
  };

  const handleClear = () => dispatch({type: 'CLEAR_USERS'});

  return (
    <div className="grid grid-cols-1 xl:grids-cols-2 lg:grids-cols-2 md:grids-cols-2 mb-8 gap-8">
      <div>
        <form className="form-control" onSubmit={handleSubmit}>
          <div className="relative">
            <input 
              type="text"
              value={text} 
              className="w-full pr-40 bg-gray-200 input input-lg text-black"
              placeholder="Search"
              onChange={handleChange}
            />
            <button 
              type="submit"
              className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg">
              Go
            </button>
          </div>
        </form>
      </div>
      {users && users.length > 0  && (<div>
        <button className="btn btn-ghost btn-lg" onClick={handleClear}>
          Clear
        </button>
      </div>)}
      
    </div>
  )
}

export default UserSearch