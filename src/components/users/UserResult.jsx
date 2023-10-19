import { useEffect, useState } from "react";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";

const UserResult = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, 
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
        }
      }
    );
    const data = await response.json();
    setUsers(data);
    setLoading(false);
    return data;
  }

  useEffect(() => {
    fetchUsers();
  }, [])
  
  if (!loading) {
    return (<div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
      {users.map(user => {
        return <UserItem key={user.id} user={user} />
      })}
    </div>);
  }
  return (<Spinner/>);
}

export default UserResult