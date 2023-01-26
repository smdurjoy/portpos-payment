import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Title from "./Title";
import { useState } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [isSumitting, setIsSubmitting] = useState(false);

  const store = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Email and Password is required.");
      return;
    }
    setIsSubmitting(true);
    try {
      const {
        data: { access_token },
      } = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });
      localStorage.setItem("access_token", access_token);
    } catch (error) {
      if (error.response.status === 401) {
        setShow(true);
        return;
      }
      alert("Something Went Wrong!");
      console.log({ error });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <Row className="mt-5">
        <Col md={{ span: 6, offset: 3 }}>
          <Title title="Login" />
          {show ? (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
              Invalid Credentials!
            </Alert>
          ) : (
            <></>
          )}

          <Form onSubmit={store}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isSumitting}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
