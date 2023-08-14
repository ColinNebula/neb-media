import React from 'react';
import { Card, Container } from 'react-bootstrap';
import logo from '../../assets/images/logo.png';

function Faq() {

    return(
<Container fluid>
<div>
        <h2 className="faq-h2x">Frequently Asked Questions </h2>
        <p className="faq-px"> Got questions? We have the answers to make your life easier</p>
<div>

<br/>
</div>
<Card className="bg-dark text-white shadow-lg" style={{ color: "#000", width: 'auto' }}>
<div>
<h2 className="faq-h2">Featured Topics</h2>
<ul>

    <a href="#location" className="faq-p">Where is Nebula Media located?</a>
    <br/>
    <a href="#how-long" className="faq-p">How long does it take to complete my video?</a>
    <br/>
    <a href="#how-do" className="faq-p">How do I send my videos to Nebula Media?</a>
    <br/>
    <a href="#how-do1" className="faq-p">How do I download my completed video?</a>
    <br/>
    <a href="#what-does" className="faq-p">What does Nebula Media charge for video editing?</a>
    <br/>
    <a href="#how-pay" className="faq-p">How do I pay?</a>
    
    </ul>
</div>
</Card>
<Card className="bg-dark text-white shadow-lg" style={{ color: "#000", width: 'auto' }}>
<div>
<ul>
<h2 className="faq-h2">General Inquiries</h2>
    
    <a href="#sponsorship" className="faq-p">Sponsorship or media requests</a>
    <br/>
    
    <a href="#are-you" className="faq-p">Are you hiring right now?</a>   
    </ul>
</div>
</Card>
<br/>
<Card className="bg-dark text-white shadow-lg" style={{ color: "#000", width: 'auto' }}>
  <h2 className="faq-h2">Featured Topics</h2>
  <h2>Where is Nebula Media located?</h2>
  <p id="location">Presently, we are located in Vaughan, Ontario, Canada. 
  Please check the contact information.</p>

  <h2 id="how-long">How long does it take to complete my video?</h2>
  <p>
  <br/>One of our representatives will be be in touch to discuss the time frame 
  for your project.</p>
  
  <h2 id="how-do">How do I send my videos to Nebula Media?</h2>
  <p>Please mail them directly or use the dropbox NebulaMedia@dropbox.com</p>
  
  <h2 id="how-do1">How do I download my completed video from Nebula Media?</h2>
  <p>We use dropbox for this primarily. Our team will advise you directly.</p>
  
  <h2 id="how-pay">How much does Nebula Media charge for video editing?</h2>
  <p>This depends on the length of the video and the work being done on it.</p>
  
  <h2 id="how-pay">How do I pay?</h2>
  <p>We take electronic money transfers and Paypal payments.</p>
  <br/>
  
  <h2 className="faq-h2g">General Inquiries</h2>
  <h2 id="sponsorship">Sponsorship or media requests</h2>
  <p>We are proud community supporters. Please contact us directly.</p>

  
  <h2 id="are-you">Are you hiring right now?</h2>
  <p>At this moment, our team is bursting at the seams with talent. 
  Check back in the future.</p>
  <br/>
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
          Some Town, Ca <br />
          123445 <br />
          Phone: <a href="tel:416.856.5764"> (416.856.5764)</a><br />
          Email: <a href="mailto://info@nebmedia.io">info@nebmedia.io</a>
        </address>
        </Card.Text>
        
      </Card.Body>
      <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>
</div>
</Container>


    )

};

export default Faq;