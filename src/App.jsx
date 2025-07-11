import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import Reviews from "./pages/Reviews";
import Services from "./pages/Services";
import "./App.css";

const App = () => (
  <BrowserRouter>
    <Header />
    <main style={{ minHeight: "calc(100vh - 120px)" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
);

export default App;
