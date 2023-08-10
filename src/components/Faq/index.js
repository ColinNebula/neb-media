import React from 'react';
import { Card, Container } from 'react-bootstrap';
import logo from '../../assets/images/logo.png';

function Faq() {

    return(
<Container fluid>
<div>
        <h2 className="faq-h2x">Frequently Asked Questions </h2>
        <p> Some questions, we have the answers to make your life easier.</p>
<div>

<br/>
</div>
<Card>
<div>
<h2 className="faq-h2">Featured Topics</h2>
<ul>

    <a href="#location" className="faq-p">Where are we located?</a>
    <br/>
    <a href="#how-long" className="faq-p">How long does it take to complete my video?</a>
    <br/>
    <a href="#how-do" className="faq-p">How do I upload my videos to Nebula Media?</a>
    <br/>
    <a href="#how-do1" className="faq-p">How do I download my completed video?</a>
    <br/>
    <a href="#what-does" className="faq-p">What does Nebula Media charge for video editing?</a>
    <br/>
    <a href="#how-pay" className="faq-p">How do I pay?</a>
    
    </ul>
</div>
</Card>
<Card>
<div>
<ul>
<h2 className="faq-h2">General Inquiries</h2>
    <a href="#what-is" className="faq-p">What is Nebula Media?, and what do you do?</a>
    <br/>
    <a href="#more-info" className="faq-p">more information here</a>
    <br/>
    <a href="#how-can" className="faq-p">How can I get in touch with Nebula Media?</a>
    <br/>
    <a href="#are-you" className="faq-p">Are you hiring right now?</a>   
    </ul>
</div>
</Card>
<br/>
<Card>
  <h2 className="faq-h2">Featured Topics</h2>
  <h2>Where is Nebula Media Located?</h2>
  <p id="location">We are located in Vaughan Ontario Canada. Please checkout out contact information for more info.</p>

  <h2 id="how-long">How long does it take to complete my video?</h2>
  <p>This depends on the length of the video, and the work being done on it.
  3D intergration will take longer because 
  <br/>we have to create those objects before from different softwares.
  One of our representatives will be be in touch and also discus time frame for your project.</p>
  
  <h2 id="how-do">How do I upload my videos to Nebula Media?</h2>
  <p>This depends on the length of the video, and the work being done on it.</p>
  
  <h2 id="how-do1">How do I download my completed video from Nebula Media?</h2>
  <p>This depends on the length of the video, and the work being done on it.</p>
  
  <h2 id="how-pay">How much does Nebula Media charge for video editing?</h2>
  <p>This depends on the length of the video, and the work being done on it.</p>
  
  <h2 id="how-pay">How do I pay for video editing?</h2>
  <p>This depends on the length of the video, and the work being done on it.</p>
  <br/>
  
  <h2 className="faq-h2g">General Inquiries</h2>
  <h2 id="what-is">what is Nebula Media?, and what do we do?</h2>
  <p>This depends on the length of the video, and the work being done on it.</p>

  <h2 id="more-info">How do I pay for video editing?</h2>
  <p>This depends on the length of the video, and the work being done on it.</p>

  <h2 id="how-can">How can I get in touch with Nebula media?</h2>
  <p>This depends on the length of the video, and the work being done on it.</p>

  <h2 id="are-you">Are you hiring right now?</h2>
  <p>This depends on the length of the video, and the work being done on it.</p>
  <br/>
  </Card>
<br/>
<Card className="text-center overflow bg-dark text-white shadow-lg rounded">
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