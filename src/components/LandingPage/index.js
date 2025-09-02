import React from "react";
import BgVideo from '../../assets/videos/bg.mp4';



function LandingPage({ setCurrentTab }) {
   
    return (
        <div className="landing-page">

            <video src={BgVideo} autoPlay muted loop className="video-bg" />
            <div className="bg-overlay"></div>
            
            <div className="home-text">
                <h1> Welcome <span className="welcome"> to </span> Nebula Media
                <br/>
                
                <span className="lastly"> Nebula Media</span>
                </h1>
                
                <div className="home-btn" onClick={() => setCurrentTab("dashboard")}>
                    <span>Enter Site</span>
                </div>
            </div>

            
        </div>
    )
}

export default LandingPage;