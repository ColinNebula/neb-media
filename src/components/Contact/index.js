import React from 'react';
import { Card, Container } from 'react-bootstrap';
import logo from '../../assets/images/logo.png';

function Contact() {

    return(
<Container fluid>
<div>
<h2 className="contact-h2">Contact us </h2>
<p className="contact-p"> Let us edit and composite your videos for you.</p>
<br/>
<Card className="bg-dark text-white shadow-lg" style={{ color: "#000", width: 'auto' }}>

<div>
<h2 className="contact-h2 text-white">Contact Information</h2>
    
    <p> Please contact us and find out how we can help create lasting memories with your videos. 
    </p>
     
 
     <p>55 Main Street <br />
     Vaughan, On <br />
     L4L-8Y9 <br />
     Phone: <a href="tel:416.856.5764"> (416.856.5764)</a><br />
     Email: <a href="mailto://info@nebmedia.io">info@nebmedia.io</a>  
     </p>
  
</div>

</Card>
<br/>
<Card className="text-center overflow bg-dark text-white shadow-lg rounded" style={{ color: "#000", width: 'auto' }}>
      <Card.Header>Get in touch</Card.Header>
      <Card.Body>
      <img src={logo} width="90px" height="40px" alt="logo" />
        <Card.Title>Contact Nebula Media</Card.Title>
        <Card.Text>
        
          Please contact us and find out how we can help create lasting memories with your videos. 
          <address>
          55 Main Street <br />
          Vaughan, On <br />
          L4L-8Y9 <br />
          Phone: <a href="tel:416.856.5764"> (416.856.5764)</a><br />
          Email: <a href="mailto://info@nebmedia.io">info@nebmedia.io</a>
        </address>
        </Card.Text>
        
      </Card.Body>
      <Card.Footer className="text-muted">Neb Media</Card.Footer>
    </Card>
</div>
</Container>



    )

};

export default Contact;