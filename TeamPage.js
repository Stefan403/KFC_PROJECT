import React, { useEffect, useState } from "react";
import MainPageNav from "../components/MainPageNav";
import { Navigate } from "react-router-dom";

export const TeamPage = ({ user }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  } else {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    let id = 1;

    useEffect(() => {
      const fetchData = async () => {
        const result = await fetch("http://localhost:4000/api/users").then(
          (res) => res.json()
        );
        setUsers(result);
        setFilteredUsers(result);
      };

      fetchData();
    }, []);

    const requestSearch = (searchedVal) => {
      const filteredRows = users.filter((user) => {
        return (
          user.firstName
            .toString()
            .toLowerCase()
            .includes(searchedVal.toString().toLowerCase()) ||
          user.lastName
            .toString()
            .toLowerCase()
            .includes(searchedVal.toString().toLowerCase())
        );
      });
      if (searchedVal.length < 1) {
        setFilteredUsers(users);
      } else {
        setFilteredUsers(filteredRows);
        console.log(filteredRows);
      }
    };

    return (
      <div>
        <MainPageNav />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input
            type="text" id="myInput" onkeyup="myFunction()" placeholder="Search for names.." onChange={(e) => requestSearch(e.target.value)}></input>
          <table class="table">
            <thead>
              <tr>
                <th></th>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>Function</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr>
                  <td>
                    <img
                      src={`https://gillcleerenpluralsight.blob.core.windows.net/person/${id++}-small.jpg`}
                      alt="user pic"
                      className="rounded-circle"
                    />
                  </td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.function}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};
