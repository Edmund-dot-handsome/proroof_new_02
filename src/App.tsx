import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ProblemSigns from './components/ProblemSigns';
import StatsBar from './components/StatsBar';
import Services from './components/Services';
import Process from './components/Process';
import Gallery from './components/Gallery';
import RecentWork from './components/RecentWork';
import WhyChoose from './components/WhyChoose';
import Reviews from './components/Reviews';
import ComprehensiveServices from './components/ComprehensiveServices';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import Admin from './pages/Admin';
import SimpleAdmin from './pages/SimpleAdmin';
import WarningSection from './components/WarningSection';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/admin" element={<SimpleAdmin />} />
          <Route path="/admin-panel" element={<Admin />} />
          <Route path="/" element={
            <>
              <Header />
              <Hero />
              <ProblemSigns />
              <StatsBar />
              <Services />
              <Process />
              <Gallery />
              <RecentWork />
              <WarningSection />
              <WhyChoose />
              <Reviews />
              <ComprehensiveServices />
              <FAQ />
              <Contact />
              <Footer />
              <WhatsAppFloat />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;