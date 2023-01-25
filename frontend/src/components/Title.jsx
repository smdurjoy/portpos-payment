import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

const Title = ({ title }) => {
  return (
    <Row>
      <Col>
        <h5>{title}</h5>
        <hr />
      </Col>
    </Row>
  );
};

export default Title;
