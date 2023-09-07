import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { getAllGroups } from "../redux/actions/group";
import { clearMessage } from "../redux/actions/message";
import HomePage from "./HomePage";
import MyLoader from "./MyLoader";

const Home = (props) => {
  const [isGetDataSuccess, setIsGetDataSuccess] = useState(false);
  const [isAPICalled, setIsAPICalled] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const { groups } = useSelector((state) => state.group);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
    if (isAPICalled) {
      return;
    }
    setIsAPICalled(true);
    dispatch(getAllGroups())
      .then(() => {
        setIsGetDataSuccess(true);
      })
      .catch((e) => {
        setIsGetDataSuccess(false);
        setIsAPICalled(false);
      });
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if(isGetDataSuccess && groups) {
    return (
      <>
        <Header />
        <HomePage Data={groups} />
      </>
    );
  } else {
    return (
      <>
        <Header />
        <MyLoader />
      </>
    );
  }
};

export default Home;
