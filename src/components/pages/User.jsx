import {useContext, useEffect} from "react"
import Spinner from "../layout/Spinner";
import GithubContext from "../../context/github/GithubContext"
import {useParams, Link} from "react-router-dom";
import { loadUser } from "../../context/github/GithubActions";

const User = () => {
  const {user, dispatch, loading} = useContext(GithubContext);
  const params = useParams();

  useEffect(() => {
    const setData = async () => {
      const user = await loadUser(params.login);
      dispatch({type: 'GET_USER', payload: user});
    }
    
    dispatch({type: 'SET_LOADING'});
    setData();
  }, []);

  if (loading || !user) {
    return (<Spinner/>);
  }

  return (<>
    <div className="w-full mx-auto lg:w-10/12">
      <div className="mb-4">
        <Link to='/' className="btn btn-ghost">Back to Seach</Link>
        {user.avatar_url}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8">
        <div className="custom-card-image mb-6 md:mb-0">
          <div className="rounded-lg shadow-xl card image-full">
            <figure>
              <img src={user.avatar_url} alt='' />
            </figure>
            <div className="card-body justify-end">
              <h2 className="card-title mb-0">
                {user.name}
                <p>{user.login}</p>
              </h2>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="mb-6">
            <h1 className="text-3xl card-title">
              {user.name}
              <div className="ml-2 mr-1 badge badge-success">
                {user.type}
              </div>
            </h1>
            <p>{user.bio}</p>
          </div>
        </div>
      </div>
    </div>
  </>);
}

export default User