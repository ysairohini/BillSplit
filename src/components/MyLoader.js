import Loader from "react-loader-spinner";
import { Container, Row, Col } from 'react-bootstrap';

const MyLoader = (props) => {
    
    return (
        <Container fluid style={{marginTop: '17%'}}>
            <Row>
                <Col></Col>
                <Col lg={6}>
                    <div className="login-container">
                    <Loader type="Oval" color="#00BFFF" height={100} width={100}/>
                    </div>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
}
 
export default MyLoader;