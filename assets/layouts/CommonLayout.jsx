import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CommonLayout = ({ children }) => {
  return (
    <div className="container common-layout">
      <Header />
      <main className="fill-window">{children}</main>
      <Footer />
    </div>
  );
};

export default CommonLayout;
