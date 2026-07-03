import React, { useEffect, useState } from "react";

import Header from "./components/Header.jsx";
import HeroSection from "./components/HeroSection.jsx";
import QuickMenu from "./components/QuickMenu.jsx";
import SplitFeature from "./components/SplitFeature.jsx";
import Gallery from "./components/Gallery.jsx";
import About from "./components/About.jsx";
import WhyChoose from "./components/WhyChoose.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Subscribe from "./components/Subscribe.jsx";
import Footer from "./components/Footer.jsx";
import FloatingDecorations from "./components/FloatingDecorations.jsx";
import DemoBookingForm from "./components/DemoBookingForm.jsx";
import AdminPage from "./components/AdminPage.jsx";

function App() {
  const [activeSection, setActiveSection] = useState("home");

  const isAdminPage = window.location.pathname === "/admin";

  useEffect(() => {
    if (isAdminPage) {
      return;
    }

    const sectionIds = [
      "home",
      "classes",
      "demo",
      "gallery",
      "about",
      "programs",
      "book-demo",
      "contact"
    ];

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      {
        threshold: [0.28, 0.55, 0.75],
        rootMargin: "-94px 0px -42% 0px"
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isAdminPage]);

  if (isAdminPage) {
    return <AdminPage />;
  }

  return (
    <div className="app-shell">
      <FloatingDecorations />

      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main>
        <HeroSection />

        <QuickMenu />

        <SplitFeature
          id="classes"
          title="Live Online Classes"
          layout="video-left"
        />

        <SplitFeature
          id="demo"
          title="Free Demo"
          layout="content-left"
        />

        <Gallery />

        <About />

        <WhyChoose />

        <Testimonials />

        <DemoBookingForm />

        <Subscribe />
      </main>

      <Footer />
    </div>
  );
}

export default App;