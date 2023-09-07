import React, { useState, useEffect } from "react";
import {
  Alert,
  Navbar,
  Container,
  Nav,
  FormControl,
  Button,
  InputGroup,
  Modal,
  Dropdown,
  Spinner,
} from "react-bootstrap";
import "./styles/Header.css";
import { MdAddCircleOutline } from "react-icons/md";
import { FiActivity } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { logout } from "../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { IoMdAdd } from "react-icons/io";
import { addGroup } from "../redux/actions/group";
import { clearMessage } from "../redux/actions/message";
import { Link } from "react-router-dom";

const Header = (props) => {
  const [show, setShow] = useState(false);
  const [searchMember, setSearchMember] = useState("");
  const [groupName, setGroupName] = useState("");

  const { isLoggedIn, members, user } = useSelector((state) => state.auth);

  const { message } = useSelector((state) => state.message);

  const [filteredMember, setFilteredMmeber] = useState(members);

  const [selectedMember, setSelectedMember] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setShow(false);
    window.location.reload();
    setFilteredMmeber(members);
    setSelectedMember([]);
    setSearchMember("");
    setGroupName("");
    setLoading(false);
  };

  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [show]);

  useEffect(() => {
    if (members === null) {
      return;
    }
    const newFiltered = members.filter(
      (item) => !selectedMember.includes(item)
    );
    setFilteredMmeber(newFiltered);
  }, [selectedMember]);

  useEffect(() => {
    if (members === null) {
      return;
    }
    if (searchMember.length <= 0) {
      let temp = members.filter((item) => !selectedMember.includes(item));
      setFilteredMmeber(temp);
    } else {
      let temp = members.filter((item) =>
        item.displayName
          .toLowerCase()
          .includes(searchMember.toLocaleLowerCase())
      );
      temp = temp.filter((item) => !selectedMember.includes(item));
      setFilteredMmeber(temp);
    }
  }, [searchMember]);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const logOut = () => {
    dispatch(logout())
      .then(() => {
        props.history.push("/login");
        window.location.reload();
      })
      .catch(() => {});
  };

  const onUserSelected = (id) => {
    setSearchMember("");
    const currSelected = filteredMember.filter((item) => item._id === id);
    //const isNotPresent = selectedMember.filter((item) => item.displayName === currSelected[0].displayName).length <= 0;
    const isNotPresent = !selectedMember.includes(currSelected[0]);
    if (isNotPresent) {
      setSelectedMember([...selectedMember, currSelected[0]]);
    }
    //setFilteredMmeber(members)
  };

  const onUserRemoved = (val) => {
    const removed = selectedMember.filter((item) => item._id === val._id);
    const afterRemove = selectedMember.filter((item) => item._id !== val._id);
    setSelectedMember(afterRemove);
    setFilteredMmeber([...filteredMember, removed[0]]);
  };

  const onSaveChanges = (e) => {
    e.preventDefault();
    if (groupName === "" || selectedMember.length < 0) {
      alert("Please fill in all the details!");
    } else {
      setLoading(true);
      const obj = {};
      obj["name"] = groupName;
      obj["admin"] = user._id;
      let membersId = [];
      selectedMember.map((item) => membersId.push(item._id));
      obj["members"] = membersId;
      dispatch(addGroup(obj))
        .then(() => {
          handleClose();
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  const onSearchChange = (event) => {
    setSearchMember(event.target.value);
  };

  const onChangeGroupName = (event) => {
    setGroupName(event.target.value);
  };

  return (
    <>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="my-2 ms-2">
              <InputGroup.Text>Group Name</InputGroup.Text>
              <FormControl
                placeholder="Group Name"
                aria-label="Group Name"
                aria-describedby="basic-addon1"
                onChange={onChangeGroupName}
              />
            </InputGroup>
            <div className="dropdown">
              <Dropdown onSelect={onUserSelected}>
                <Dropdown.Toggle variant="primary" id="dropdown-basic-button">
                  Search Members
                </Dropdown.Toggle>

                <Dropdown.Menu
                  style={{
                    backgroundColor: "#73a47",
                    overflow: "auto",
                    maxHeight: "15rem",
                  }}
                >
                  <InputGroup className="mt-0 mb-2 position-sticky top-0">
                    <FormControl
                      placeholder="Search contacts to add"
                      aria-label="Search contacts to add"
                      aria-describedby="basic-addon2"
                      value={searchMember}
                      onChange={onSearchChange}
                    />
                  </InputGroup>
                  {filteredMember.map((val) => {
                    return (
                      <>
                        <Dropdown.Item eventKey={val._id}>
                          {val.displayName}
                          <IoMdAdd className="float-end" color="darkblue" />
                        </Dropdown.Item>
                        <hr />
                      </>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {selectedMember.length >= 1 && (
              <div className="selected-members pt-4">
                {selectedMember.map((val, index) => {
                  return (
                    <>
                      <Alert
                        variant={"dark"}
                        dismissible
                        onClose={() => onUserRemoved(val)}
                        key={index}
                      >
                        {val.displayName}
                      </Alert>
                    </>
                  );
                })}
              </div>
            )}
            {message && (
              <>
                <Alert variant={"danger"}>{message}</Alert>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={onSaveChanges}>
              {loading && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              &nbsp;
              <span>Add group</span>
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <Navbar bg="dark" expand="lg" sticky="top">
        <Container fluid>
          <Navbar.Brand href="/home" id="navBrand">
          Split Among Friends
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link id="navItem1" onClick={handleShow}>
                <MdAddCircleOutline
                  fontSize="1.5rem"
                  style={{ marginBottom: "3px" }}
                />{" "}
                Create Group
              </Nav.Link>
              <Nav.Link href="/activity" id="navItem1">
                <FiActivity fontSize="1.5rem" style={{ marginBottom: "3px" }} />{" "}
                Activity
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link id="navItem1" className="text-uppercase">
                <FaUserAlt style={{ marginBottom: "3px", padding: "0.5px" }} />{" "}
                {user.displayName}
              </Nav.Link>
              <Nav.Link href="/login" id="navItem1" onClick={logOut}>
                <HiOutlineLogout
                  fontSize="1.5rem"
                  style={{ marginBottom: "3px" }}
                />{" "}
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
