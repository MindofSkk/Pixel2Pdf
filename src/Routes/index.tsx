
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Core Pages (important for SEO - not lazy loaded)
import { Header } from "../components/pages/Header";
import Home from "../components/pages/Home";
import PrivacyPolicy from "../components/pages/PrivacyPolicy";
import ContactUs from "../components/pages/Contact";
import AboutUs from "../components/pages/AboutUs";
import TermsAndConditions from "../components/pages/TermsAndConditions";
import Footer from "../components/pages/Footer";

// PDF Tools (lazy-loaded)
const PdfMerger = lazy(() => import("../components/pdf/PdfMerger"));
const SplitPdf = lazy(() => import("../components/pdf/SplitPdf"));
const CompressPdf = lazy(() => import("../components/pdf/CompressPdf"));
const PdfToWord = lazy(() => import("../components/pdf/PdfToWord"));
const PdfToJpg = lazy(() => import("../components/pdf/PdfToJpg"));
const UnlockPdf = lazy(() => import("../components/pdf/UnlockPdf"));
const ProtectPdf = lazy(() => import("../components/pdf/ProtectPdf"));
// If you later add WordToPdf or JpgToPdf → lazy load those too

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />

        {/* Tool Pages (Lazy Loaded) */}
        <Route path="/merge-pdf" element={<PdfMerger />} />
        <Route path="/split-pdf" element={<SplitPdf />} />
        <Route path="/compress-pdf" element={<CompressPdf />} />
        <Route path="/pdf-to-word" element={<PdfToWord />} />
        <Route path="/pdf-to-jpg" element={<PdfToJpg />} />
        <Route path="/unlock-pdf" element={<UnlockPdf />} />
        <Route path="/protect-pdf" element={<ProtectPdf />} />
      </Routes>
      <Footer/>
    </Suspense>
  </BrowserRouter>
);

export default AppRoutes;
