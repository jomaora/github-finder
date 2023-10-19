import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const UserItem = ({user}) => {
  const {login, avatar_url} = user;
  return (
    <div className="card shadow-md compact side bg-base-100">
      <div className="flex-row itels-ceter space-x_4 card-body">
        <div>
          <div className="avatar">
            <div className="rounded-full shadow w-14 h-14">
              <img src={avatar_url} alt="profile" />
            </div>
          </div>
        </div>
        <div>
          <h2 className="card-title">
            {login}
          </h2>
          <Link 
            className="text-base-content text-opacity-40"
            to={`/users/${login}`}
          >
            Visit Profile
          </Link>
        </div>
      </div>
    </div>
  )
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserItem