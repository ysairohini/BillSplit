import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router';
import { login } from '../redux/actions/auth';
import { clearMessage } from '../redux/actions/message'
import { useEffect } from 'react';


const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, []);

    if (isLoggedIn) {
        return <Navigate to="/home" />;
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if(email === "" || password === ""){
            alert("Please fill in all the details!");
        } else {
            setLoading(true);
            const obj = {}
            obj['password'] = password;
            obj['email'] = email;
            dispatch(login(obj))
                .then(() => {
                    props.history.push("/");
                    window.location.reload();
                })
                .catch(() => {
                    setLoading(false);});
        }
    }

    return (
        <Container fluid style={{marginTop: '17%'}}>
            <Row>
                <Col></Col>
                <Col lg={6}>
                    <div className="login-container">
                        <div className='login-card'>
                            <h4 className="align-start mb-3">Log in to Split with Friends</h4>
                            <Form className='login-form' onSubmit={handleLogin}>
                                <Form.Group as={Row} className="mb-3" controlId="email">
                                    <Form.Label className="align-start" column sm={2}>Email</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="email" placeholder="Email" onChange={(event)=>{
                                            setEmail(event.target.value);
                                        }} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="password">
                                    <Form.Label className="align-start" column sm={2}>Password</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="password" placeholder="Password" onChange={(event)=>{
                                            setPassword(event.target.value);
                                        }} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Col className="align-start" sm={{ span: 10, offset: 2 }}>
                                        <Button variant="dark" type="submit">
                                            {loading && (
                                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                            )}
                                            &nbsp;
                                            <span>Sign in</span>
                                        </Button>
                                    </Col>
                                </Form.Group>
                                {message && (
                                    <Form.Group as={Row} className="mb-3" controlId="successError">
                                        <Col sm={12}>
                                            <Alert variant={ "danger" }>
                                                {message}
                                            </Alert>
                                        </Col>
                                    </Form.Group>
                                )}
                            </Form>
                        </div>
                    </div>
                    <p className="mt-3 align-start">New User? &nbsp;<Link to="/register">Sign up</Link></p>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
}
 
export default Login;