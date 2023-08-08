import React from 'react';
import { Card, NavDropdown, Button } from 'react-bootstrap';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { SocialIcon } from 'react-social-icons';
import logo from '../../assets/images/logo.png';

function Dashboard() {

    return(
        
<div>
        <h2 className="dash-h2">Keep Going! </h2>
        <p className="dash-p"> This is the dashboard!</p>
        <Card className="bg-dark text-white">
        <Card.Img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.ikFEwkag0PM-l-XDlXbp_wHaEK%26pid%3DApi&f=1&ipt=b204ca3e2b6be786df00ec1848f572109d16193e30cd3613e6f092176d6e893a&ipo=images/100px270" alt="Card image" />
        <Card.ImgOverlay>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
          <Card.Text>Last updated 3 mins ago</Card.Text>
        </Card.ImgOverlay>
      </Card>
      <br/>
      <br/>
      <NavDropdown.Divider />

      <FaQuoteLeft className="left-q" /> 
      
      <h2 className="dash-h2">Video Editing and compositing with a passion!</h2>
      <p className="dash-p"> From concept to completion</p>
      <FaQuoteRight className="right-q" />

      <Card className="text-center overflow bg-dark text-white shadow-lg">
      <Card.Header>Get in touch</Card.Header>
      <Card.Body>
      <img src={logo} width="90px" height="40px" alt="logo" />
        <Card.Title>Contact Neb Media</Card.Title>
        <Card.Text>
        
          Please contact us and find out how we can help with your videos. 
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



    )

};

export default Dashboard;