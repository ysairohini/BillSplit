import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { getActivity } from "../redux/actions/activity";
import { clearMessage } from "../redux/actions/message";

const Activity = (props) => {
  const [isGetDataSuccess, setIsGetDataSuccess] = useState(false);
  const [isAPICalled, setIsAPICalled] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const { activity } = useSelector((state) => state.activity);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
    if (isAPICalled) {
      return;
    }
    setIsAPICalled(true);
    dispatch(getActivity())
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

  return (
    <>
      <Header />
      <Container className="mt-2">
        <Row>
          <Col></Col>
          <Col lg="10">
            <h4>Activites</h4>
            {isGetDataSuccess &&
              activity &&
              activity.map((val, index) => {
                return (
                  <Card
                    className="m-2 border border-light shadow-lg rounded"
                    style={{
                      backgroundColor: "#DEDEDE",
                      color: "antiquewhite",
                    }}
                    key={index}
                  >
                    <Card.Body>
                      <Card.Text>{val.activity}</Card.Text>
                      <Card.Text>{val.timestamp}</Card.Text>
                    </Card.Body>
                  </Card>
                );
              })}
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
};

export default Activity;
