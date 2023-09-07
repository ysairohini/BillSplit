import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/auth";
import { clearMessage } from '../redux/actions/message'
import { Navigate } from 'react-router';

var obj = {};

const Signup = () => {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector(state => state.message);
    const { isLoggedIn } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, []);

    if (isLoggedIn) {
        return <Navigate to="/home" />;
    }

    return (
        <Container fluid style={{marginTop: '13%'}}>
            <Row>
                <Col></Col>
                <Col lg={6}>
                    <div className="login-container">
                        <div className='login-card'>
                            <h4 className="align-start mb-3">Sign up to Split with Friends</h4>
                            <Form className='login-form'>
                            {!successful && (
                                <div>
                                <Form.Group as={Row} className="mb-3" controlId="displayName">
                                    <Form.Label className="align-start" column sm={2}>Name</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" placeholder="Name" onChange={(event)=>{
                                            setDisplayName(event.target.value);
                                        }}/>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="email">
                                    <Form.Label className="align-start" column sm={2}>Email</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="email" placeholder="Email" onChange={(event)=>{
                                            setEmail(event.target.value);
                                        }}/>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="password">
                                    <Form.Label className="align-start" column sm={2}>Password</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control required type="password" placeholder="Password" onChange={(event)=>{
                                            setPassword(event.target.value);
                                        }} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="confirmPassword">
                                    <Form.Label className="align-start" column sm={2}>Confirm Password</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control required type="password" placeholder="Confirm Password" onChange={(event)=>{
                                            setConfirmPassword(event.target.value);
                                        }}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Col className="align-start" sm={{ span: 10, offset: 2 }}>
                                        <Button variant="dark" type="submit" onClick={(e) => {
                                            e.preventDefault();
                                            if(displayName === "" || email === "" || password === "" || confirmPassword === ""){
                                                alert("Please fill in all the details!");
                                             } else if (password !== confirmPassword){
                                                alert("Passwords must match!");
                                             }else {
                                                 obj['displayName'] = displayName;
                                                 obj['password'] = password;
                                                 obj['email'] = email;
                                                 dispatch(register(obj))
                                                 .then(() => {
                                                     setSuccessful(true);})
                                                .catch(() => {
                                                    setSuccessful(false);
                                                });
                                            }
                                        }}>Sign up</Button>
                                    </Col>
                                </Form.Group>
                                </div>
                            )}
                                {message && (
                                    <Form.Group as={Row} className="mb-3" controlId="successError">
                                        <Col sm={12}>
                                            <Alert variant={ successful ? "success" : "danger" }>
                                                {message}
                                            </Alert>
                                        </Col>
                                    </Form.Group>
                                )}
                            </Form>
                        </div>
                    </div>
                    <p className="mt-3 align-start">Already a User? &nbsp;<Link to="/login">Log in</Link></p>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
}
 
export default Signup;

