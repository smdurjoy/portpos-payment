import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useState } from "react";

const OrderCreate = () => {
  const [orderObj, setOrderObj] = useState({
    order: {
      amont: null,
      currency: "BDT",
      redirect_url: "http://localhost:3000/orders",
    },
    product: {
      name: null,
      description: null,
    },
    billing: {
      customer: {
        name: null,
        email: null,
        phone: null,
        address: {
          street: null,
          city: null,
          state: null,
          zipcode: null,
          country: "BD",
        },
      },
    },
  });

  return (
    <div className="container">
      <Form>
        <Row className="mt-5">
          <Col md={12}>
            <div className="d-flex justify-content-between">
              <h5>Order</h5>
              <Link to={`/orders`}>
                <Button variant="primary" size="sm">
                  Back to List
                </Button>
              </Link>
            </div>
            <hr />
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label column="sm">Customer Name</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                placeholder="Enter"
                onChange={(e) =>
                  setOrderObj((prevState) => {
                    prevState.billing.customer.name = e.target.value;
                    return {
                      ...prevState,
                    };
                  })
                }
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label column="sm">Customer Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter"
                size="sm"
                onChange={(e) =>
                  setOrderObj((prevState) => {
                    prevState.billing.customer.name = e.target.value;
                    return {
                      ...prevState,
                    };
                  })
                }
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label column="sm">Customer Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter"
                size="sm"
                onChange={(e) =>
                  setOrderObj((prevState) => {
                    prevState.customer.phone = e.target.value;
                    return {
                      ...prevState,
                    };
                  })
                }
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label column="sm">Customer Address</Form.Label>
              <Form.Control type="text" placeholder="Enter" size="sm" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label column="sm">Product Name</Form.Label>
              <Form.Control type="text" placeholder="Enter" size="sm" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label column="sm">Product Description</Form.Label>
              <Form.Control type="text" placeholder="Enter" size="sm" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label column="sm">Amount</Form.Label>
              <Form.Control type="number" placeholder="Enter" size="sm" />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-2">
          <Col md={3}>
            <Button variant="primary" size="sm">
              Create
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default OrderCreate;
