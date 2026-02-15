import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../styles/footer.css';

import { SlSocialInstagram } from "react-icons/sl";
import { AiFillTikTok } from "react-icons/ai";
import { BsTwitterX } from "react-icons/bs";
import { SiGmail } from "react-icons/si";

export default function Footer() {
    return (
        <Container className='bottom-of-page py-3'>
          <Row className='justify-content-center gap-5 padding'>
            <Col xs='auto' className='clickable d-flex align-items-center gap-2'><SiGmail /> email@email.com</Col>
            <Col xs='auto' className='clickable d-flex align-items-center gap-2'><SlSocialInstagram /> TheCharacterTest</Col>
            <Col xs='auto' className='clickable d-flex align-items-center gap-2'><AiFillTikTok /> TheCharacterTest</Col>
            <Col xs='auto' className='clickable d-flex align-items-center gap-2'><BsTwitterX /> TheCharacterTest</Col>
          </Row>
          {/* <Row>
            <Col className='sub-text padding'>Website developed by Danny Regan.</Col>
          </Row> */}
        </Container>
    )
}