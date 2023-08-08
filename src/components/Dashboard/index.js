import React from 'react';
import { Card, NavDropdown } from 'react-bootstrap';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { SocialIcon } from 'react-social-icons';

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
      
      <h2 className="dash-h2">Video Editing with a passion!</h2>
      <p className="dash-p"> From concept to completion</p>
      <FaQuoteRight className="right-q" />
</div>



    )

};

export default Dashboard;