import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p>
        &copy; {currentYear} <strong>Book</strong> - Book Store
      </p>
    </footer>
  );
};

export default Footer;
