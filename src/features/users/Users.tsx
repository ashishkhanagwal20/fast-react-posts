import { useQuery } from 'react-query';
import { fetchusers } from "../../services/userServices";

interface UserData {
  email : string;
}

const Users: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery<UserData[], Error>('users', fetchusers);

  if (isLoading) return <p>Loading...</p>;
  if (isError) {
      return <div>Error: {error?.message}</div>;
    }
console.log("Users",data)
  return(
    <div className='p-4'>
      <h2 className="text-xl font-bold">Users</h2>
      {data?.map((user, index) => (
                    <li key={index} className='mt-2'>{user.email}</li>
                ))}
    </div>
  )

  }

  export default Users