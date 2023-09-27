import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const containerStyle = {
  maxHeight: '670px',
  overflowY: 'auto',
};

const Layout = (props) => {
  return (
    <>
      <Header />
        <div style={containerStyle}>{props.children}</div>
      <Footer />
    </>
  );
};

export default Layout;
