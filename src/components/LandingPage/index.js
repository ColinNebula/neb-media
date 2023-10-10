import React from "react";
import BgVideo from '../../assets/videos/bg.mp4'



function LandingPage() {
   
    return (
        <div className="landing-page">

            <video src={BgVideo} autoPlay muted loop class="video-bg" />
            <div className="bg-overlay"></div>
            <div className="bar-over">
           
            </div>
            <div className="home-text">
                <h1 className="landing-h1">Nebula Media</h1>
                <p className="landing-p">3D, Animation, Visual effects, Video editing & Compositing</p>
            </div>

            <div className="home-btn">
            Enter
            
            </div>
        </div>
    )
}

export default LandingPage;