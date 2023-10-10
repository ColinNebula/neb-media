import React from 'react';
import { Card, Container } from 'react-bootstrap';
import logo from '../../assets/images/logo.png';

function About() {

    return(
      <Container fluid>
<div>
        <h2 className="about-h2">About Us </h2>
        <p className="about-p"> Since its inception, Nebula Media has been delivering high 
        quality videos customized to the high specificity of our client. Our 
        highly focused and dedicated team works tirelessly to complete projects 
        within required deadlines. </p>

        <Card className="text-right bg-dark text-white shadow-lg" style={{ color: "#000", width: 'auto' }}>
        <div>
            <h2 className="about-h2 text-white" > What We Do</h2>
            <br/>

            <uL>
            <a href="#edit">Video editing and Compositing</a><br/>

            <a href="#animation" >Animation</a><br/>

            <a href="#modeling">3D Modeling</a><br/>
            
           <a href="#integration">3D integration</a><br/>

           <a href="#art">2D Art Integration</a><br/>

           <a href="#green-s">Green Screen Removal</a><br/>
          
           </uL>
        </div>
        <br/>
        </Card>

<Card className="text-center bg-dark text-white shadow-lg" style={{ color: "#000", width: 'auto' }}>
  <h2 className="faq-h2">What We Do</h2>
  <br/>
  <h2 id="edit">Video Editing and Compositing</h2>
  <p> This is our bread and butter. Sorting through the footage, 
  creating the narrative, composing and rendering<br/> the video are the
  mainstay of our business. Customizations and 3D integration can be added. 
  </p>

  <h2 id="animation">Animation</h2>
  <p>We can add in  any animation the client desires and each piece is priced individually 
  based on complexity.
  </p>
  
  <h2 id="modeling">3D Modeling</h2>
  <p>Object digitization: we can model unique or personalized objects for a fee, including integration.</p>
  
  <h2 id="#integration">3D Integration</h2>
  <p>Video manipulation to include 3D features customized for clients.</p>
  
  <h2 id="green-s">2D Art and Integration</h2>
  <p>Video manipulation to include 2D features customized for clients. </p>

  <h2 id="art">Green Screen Removal</h2>
  <p>We do green screen removal.</p>

  <br/>
  
  </Card>


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
          Email: <a href="mailto://nebulamedia3d@gmail.com">nebulamedia3d@gmail.com</a>
        </address>
        </Card.Text>
        
      </Card.Body>
      <Card.Footer className="text-muted">Neb Media</Card.Footer>
    </Card>
</div>
</Container>
    )

};

export default About;