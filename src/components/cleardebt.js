import React, { useState } from "react";
import {
  Button,
  Container,
  Modal,
  Row,
  Col,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import Data from "./data/SingleGroupData.json";

const Cleardebt = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Clear Debts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>Group Name:</Col>
              <Col className="text-uppercase">{Data.name}</Col>
            </Row>
            <Row className="mt-2">
              <Col className="float-start">
                <DropdownButton
                  id="dropdown-basic-button"
                  title="Members"
                  className="rounded-pill"
                >
                  {Object.keys(Data.debts).length !== 0 &&
                    Object.keys(Data.debts)
                      .filter((val) => Data.debts[val] < 0)
                      .map((value, index) => (
                        <>
                          <Dropdown.Item key={index}>
                            {value} ({Data.debts[value]}$){" "}
                          </Dropdown.Item>
                          <hr />
                        </>
                      ))}
                </DropdownButton>
              </Col>
              <Col>
                <input
                  id={1}
                  type="text"
                  name="number"
                  placeholder="$0.00"
                  className="m-2"
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={handleClose}
            className="rounded rounded-pill"
          >
            Close
          </Button>
          <Button variant="success" className="rounded rounded-pill text-black">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cleardebt;
