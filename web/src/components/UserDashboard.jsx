import { Stack } from "@mui/material";
import UserCard from "./UserCard";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const FETCH_USERS = gql`
  query Query {
    getUsers {
      firstName
      lastName
      username
      email
      type
      tweeted
      approved
    }
  }
`;

function UserDashboard() {
  const [users, setUsers] = useState([]);

  const [getUsers] = useLazyQuery(FETCH_USERS);

  useEffect(() => {
    const fetchUsers = () => {
      Promise.all([getUsers()]).then((data) => {
        setUsers(data[0].data.getUsers);
      });
    };
    fetchUsers();
  }, []);

  return (
    <Stack gap={3}>
      {[...users].reverse().map((user, index) => (
        <UserCard user={user} key={index} />
      ))}
    </Stack>
  );
}

export default UserDashboard;
