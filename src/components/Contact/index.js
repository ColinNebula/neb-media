import React from 'react';
import { Card, Container } from 'react-bootstrap';

function Contact() {

    return(
<Container fluid>
<div>
<h2 className="contact-h2">Contact us </h2>
<p className="contact-p"> Let us edit and composite your videos for you.</p>
<br/>
<Card>

<div>
<h2 className="contact-h2">Contact Information</h2>
    
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
</div>
</Container>



    )

};

export default Contact;