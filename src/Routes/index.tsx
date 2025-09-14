import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactGA from "react-ga4";

// Core Pages
import { Header } from "../components/pages/Header";
import Home from "../components/pages/Home";
import PrivacyPolicy from "../components/pages/PrivacyPolicy";
import ContactUs from "../components/pages/Contact";
import AboutUs from "../components/pages/AboutUs";
import TermsAndConditions from "../components/pages/TermsAndConditions";
import Footer from "../components/pages/Footer";
import usePageTracking from "./usePageTracking";
import MergePDF from "../components/pdf/MergePdf/MergePdf";

// PDF Tools (lazy-loaded)
// const PdfMerger = lazy(() => import("../components/pdf/PdfMerger"));
const SplitPdf = lazy(() => import("../components/pdf/SplitPdf"));
const CompressPdf = lazy(() => import("../components/pdf/CompressPdf"));
const PdfToWord = lazy(() => import("../components/pdf/PdfToWord"));
const PdfToJpg = lazy(() => import("../components/pdf/PdfToJpg"));
const UnlockPdf = lazy(() => import("../components/pdf/UnlockPdf"));
const ProtectPdf = lazy(() => import("../components/pdf/ProtectPdf"));

const GA_MEASUREMENT_ID = "G-1EKSH789BY"; // Replace with your actual ID

// This component is inside BrowserRouter context and can use react-router hooks
const RouterWrapper: React.FC = () => {
  useEffect(() => {
    ReactGA.initialize(GA_MEASUREMENT_ID);
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  usePageTracking(); // Now safe to use

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />

          {/* Tool Pages */}
          <Route path="/merge-pdf" element={<MergePDF />} />
          <Route path="/split-pdf" element={<SplitPdf />} />
          <Route path="/compress-pdf" element={<CompressPdf />} />
          <Route path="/pdf-to-word" element={<PdfToWord />} />
          <Route path="/pdf-to-jpg" element={<PdfToJpg />} />
          <Route path="/unlock-pdf" element={<UnlockPdf />} />
          <Route path="/protect-pdf" element={<ProtectPdf />} />
          {/* <Route path="/v" element={<MergePDF />}></Route> */}

        </Routes>
        <Footer />
      </Suspense>
    </>
  );
};

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <RouterWrapper />
    </BrowserRouter>
  );
};

export default AppRoutes;
