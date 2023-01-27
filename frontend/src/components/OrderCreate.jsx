import { React, useState, useEffect } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import ApiUrl from "../ApiUrl";
import axios from "axios";
import AlertMsg from "./AlertMsg";

const OrderCreate = () => {
  const [orderObj, setOrderObj] = useState({
    product_name: null,
    product_description: null,
    amount: null,
    customer_name: null,
    customer_email: null,
    customer_phone: null,
    street: null,
    city: null,
    state: null,
    zipcode: null,
    country: null,
  });
  const [token, setToken] = useState(null);
  const [isSumitting, setIsSubmitting] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      setToken(accessToken);
    } else {
      navigate("/login");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validation()) {
      alert("Please fill all the required fields.");
      return;
    }
    setIsSubmitting(true);
    try {
      await axios.post(ApiUrl.orderCreate + "?token=" + token, orderObj);
      setShow(true);
      setTimeout(() => {
        navigate("/");
      }, 700);
    } catch (err) {
      console.log({ err });
      alert("Something Went Wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const validation = () => {
    let validation = false;

    if (
      !orderObj.customer_name ||
      !orderObj.customer_email ||
      !orderObj.customer_phone ||
      !orderObj.product_name ||
      !orderObj.product_description ||
      !orderObj.amount ||
      !orderObj.city ||
      !orderObj.street ||
      !orderObj.state ||
      !orderObj.zipcode ||
      !orderObj.country
    ) {
      validation = true;
    }

    return validation;
  };

  return (
    <div className="container">
      <Row className="mt-5">
        <Col md={{ span: 6, offset: 3 }}>
          <AlertMsg
            showStatus={show}
            variant="success"
            msg="Stored Successfully."
          />
        </Col>
      </Row>
      <Form md={3} onSubmit={handleSubmit}>
        <Row className="mt-5">
          <Col md={12}>
            <div className="d-flex justify-content-between">
              <h5>Order</h5>
              <Link to={`/`}>
                <Button variant="primary" size="sm">
                  Back to List
                </Button>
              </Link>
            </div>
            <hr />
          </Col>

          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label column="sm">
                Product Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter"
                size="sm"
                onChange={(e) =>
                  setOrderObj((prevState) => {
                    prevState.product_name = e.target.value;
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
              <Form.Label column="sm">
                Product Description <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter"
                size="sm"
                onChange={(e) =>
                  setOrderObj((prevState) => {
                    prevState.product_description = e.target.value;
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
              <Form.Label column="sm">
                Amount <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter"
                size="sm"
                onChange={(e) =>
                  setOrderObj((prevState) => {
                    prevState.amount = e.target.value;
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
              <Form.Label column="sm">
                Customer Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                size="sm"
                placeholder="Enter"
                onChange={(e) =>
                  setOrderObj((prevState) => {
                    prevState.customer_name = e.target.value;
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
              <Form.Label column="sm">
                Customer Email <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter"
                size="sm"
                onChange={(e) =>
                  setOrderObj((prevState) => {
                    prevState.customer_email = e.target.value;
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
              <Form.Label column="sm">
                Customer Phone <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter"
                size="sm"
                onChange={(e) =>
                  setOrderObj((prevState) => {
                    prevState.customer_phone = e.target.value;
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
              <Form.Label column="sm">
                Street <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter"
                size="sm"
                onChange={(e) =>
                  setOrderObj((prevState) => {
                    prevState.street = e.target.value;
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
              <Form.Label column="sm">
                City <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter"
                size="sm"
                onChange={(e) =>
                  setOrderObj((prevState) => {
                    prevState.city = e.target.value;
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
              <Form.Label column="sm">
                State <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter"
                size="sm"
                onChange={(e) =>
                  setOrderObj((prevState) => {
                    prevState.state = e.target.value;
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
              <Form.Label column="sm">
                Zipcode <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter"
                size="sm"
                onChange={(e) =>
                  setOrderObj((prevState) => {
                    prevState.zipcode = e.target.value;
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
              <Form.Label column="sm">
                Country <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter"
                size="sm"
                onChange={(e) =>
                  setOrderObj((prevState) => {
                    prevState.country = e.target.value;
                    return {
                      ...prevState,
                    };
                  })
                }
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-2">
          <Col md={3}>
            <Button
              variant="primary"
              type="submit"
              size="sm"
              disabled={isSumitting}
            >
              Create
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default OrderCreate;
