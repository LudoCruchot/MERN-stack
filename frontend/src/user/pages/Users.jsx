import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Antoine",
      image:
        "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      places: 3,
    },
    {
      id: "u2",
      name: "Zoé",
      image:
        "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      places: 128,
    },
    {
      id: "u3",
      name: "Claire",
      image:
        "https://images.pexels.com/photos/806835/pexels-photo-806835.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      places: 55,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
