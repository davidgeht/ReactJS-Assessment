import Row from "react-bootstrap/Row";
import logo from "../../images/logo.jpeg";

import React from "react";

const Logo = () => {
  return (
    <Row className="d-flex justify-content-center">
      <a href="/">
        <img
          alt="logo"
          styles={{ height: "100px" }}
          className="logo"
          src={logo}
        />
      </a>
    </Row>
  );
};

export default Logo;
