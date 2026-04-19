import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProfilesDemo from "./components/ProfilesDemo";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";

import Login from "./components/Login";
import Signup from "./components/signup";
import Dashboard from "./components/Dashboard";
import Report from "./components/Report";
import "./App.css";

function Home() {
  const lang = "en";

  return (
    <>
      <Navbar />
      <Hero lang={lang} />
      <ProfilesDemo lang={lang} />
      <HowItWorks lang={lang} />
      <Footer lang={lang} />
    </>
  );
}

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </div>
  );
}

export default App;
