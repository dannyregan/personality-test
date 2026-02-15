import { useState } from 'react';
//import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Fade from 'react-bootstrap/Fade';
import { VscMenu } from "react-icons/vsc";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';


function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const goTo = (path: string) => {
    handleClose();
    setTimeout(() => {
      navigate(path);
    }, 200);
  };

  return (
    <>
      <Container>
        <Row>
          <Col xs='auto' onClick={handleShow} className='ms-auto clickable d-flex align-items-center gap-2'>
              Menu <VscMenu />
          </Col>
        </Row>
      </Container>

      <Offcanvas show={show} onHide={handleClose} placement={'end'} transition={Fade}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup>
            <ListGroup.Item className='clickable' onClick={() => goTo('/')}>Home</ListGroup.Item>
            <ListGroup.Item className='clickable' onClick={() => goTo('/test')}>Take the Test</ListGroup.Item>
            <ListGroup.Item className='clickable' onClick={() => goTo('/about')}>About</ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Example;