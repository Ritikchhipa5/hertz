import React from "react";
import Footer from "../Components/Footer";
import Header2 from "../Components/_Header/index";
export default function Layout2(props) {
  return (
    <>
      <Header2 />
      {props.children}
      <Footer />
    </>
  );
}
