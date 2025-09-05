import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import HomeToolsGrid from "../components/pdf/Card";

import { Header } from "../components/pages/Header";
import Home from "../components/pdf/Home";
import Footer from "../components/pages/Footer";
import PrivacyPolicy from "../components/pages/PrivacyPolicy";
import ContactUs from "../components/pages/ContactUs";

const PdfMerger = lazy(() => import("../components/pdf/PdfMerger"));
// const SplitPdf = lazy(() => import("../components/pdf/SplitPdf"));
// const CompressPdf = lazy(() => import("../components/pdf/CompressPdf"));
// const ConvertPdf = lazy(() => import("../components/pdf/ConvertPdf"));

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <Routes>

        {/* <Route path="/" element={<HomeToolsGrid />} /> */}
        <Route path="/merge" element={<PdfMerger />} />
        <Route path="/" element={<Home />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/contact-us" element={<ContactUs />} />
        {/* <Route path="/terms-conditions" element={<TermsConditions />} /> */}



        {/* <Route path="/split" element={<SplitPdf />} /> */}
        {/* <Route path="/compress" element={<CompressPdf />} /> */}
        {/* <Route path="/convert" element={<ConvertPdf />} /> */}
      </Routes>
      <Footer />
    </Suspense>
  </BrowserRouter>
);

export default AppRoutes;
