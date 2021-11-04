import React, { useEffect, useState } from "react";
import axios from "axios";
import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState();
  //Get Method
  //Get Users From API
  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      await axios({
        method: "get",
        url: "http://localhost:3000/api/users",
        responseType: "stream",
      })
        .then(function (response) {
          setUsers(response.data.users);
          setIsLoading(false);
        })
        .catch(function (response) {
          setError("Something Went Wrong, Please Try Again", response);
        });
      setIsLoading(false);
    };
    sendRequest();
  }, []);

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {users && <UsersList items={users} />}
    </React.Fragment>
  );
};

export default Users;
