// import logo from './logo.svg';
import "./App.css";
import React, { useState } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import About from "./components/About";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import { ThemeProvider } from './contexts/ThemeContext';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  const [currentTab, setCurrentTab] = useState("landing-page");

  const renderTab = () => {
    switch (currentTab) {
      case "dashboard":
        return <Dashboard />;

      case "about-us":
        return <About Us />;

      case "contact":
        return <Contact />;

        case "faq":
          return <Faq />;

          case "landing-page":
            return <LandingPage setCurrentTab={setCurrentTab} />;

      default:
        return null;
    }
  };

  return (
    <ThemeProvider>
      <div className="app-container">
        {currentTab !== "landing-page" && (
          <div>
            <Header currentTab={currentTab} setCurrentTab={setCurrentTab}></Header>
          </div>
        )}

        <div className="main-content">
          <main>{renderTab()}</main>
        </div>

        {currentTab !== "landing-page" && (
          <Footer />
        )}
     
      </div>
    </ThemeProvider>
  );
}
export default App;
