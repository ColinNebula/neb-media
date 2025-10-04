import React from "react";
import BgVideo from '../../assets/videos/bg.mp4';

function LandingPage({ setCurrentTab }) {
   
    return (
        <div className="landing-page">

            <video src={BgVideo} autoPlay muted loop className="video-bg" />
            <div className="bg-overlay"></div>
            
            {/* Floating particles for extra visual appeal */}
            <div className="floating-particles">
                <div className="particle particle-1"></div>
                <div className="particle particle-2"></div>
                <div className="particle particle-3"></div>
                <div className="particle particle-4"></div>
                <div className="particle particle-5"></div>
            </div>
            
            <div className="home-text">
                <h1> 
                <span className="welcome-enhanced"> 
                    Welcome 
                    <div className="welcome-glow"></div>
                    <div className="welcome-particles">
                        <span className="welcome-particle"></span>
                        <span className="welcome-particle"></span>
                        <span className="welcome-particle"></span>
                    </div>
                </span> 
                <span className="welcome-to"> to </span> 
                <br/>
                
                <span className="lastly"> 
                    Nebula Dev
                    <div className="text-glow"></div>
                </span>
                </h1>
                
                <div className="home-btn enhanced-btn" onClick={() => setCurrentTab("dashboard")}>
                    <span>View Our Services</span>
                    <div className="btn-glow"></div>
                </div>
            </div>

            
        </div>
    )
}

export default LandingPage;