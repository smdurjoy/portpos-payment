import { React, useState, useEffect } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import ApiUrl from "../../ApiUrl";
import axios from "axios";

const OrderCreate = () => {
  const [orderObj, setOrderObj] = useState({
    order: {
      amount: 0.0,
      currency: "BDT",
      redirect_url: "http://localhost:3000",
    },
    billing: {
      customer: {
        name: "",
        email: "",
        phone: "",
        address: {
          street: "",
          city: "",
          state: "",
          zipcode: "",
          country: "BD",
        },
      },
    },
    product: {
      name: "",
      description: "",
    },
  });
  const [token, setToken] = useState(null);
  const [isSumitting, setIsSubmitting] = useState(false);
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
    orderObj.order.amount = parseFloat(orderObj.order.amount);
    try {
      const { data } = await axios.post(
        ApiUrl.orderCreate + "?token=" + token,
        orderObj
      );
      localStorage.setItem("order", JSON.stringify(data));
      navigate("/");
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
      !orderObj.billing.customer.name ||
      !orderObj.billing.customer.email ||
      !orderObj.billing.customer.phone ||
      !orderObj.product.name ||
      !orderObj.product.description ||
      !orderObj.order.amount ||
      !orderObj.billing.customer.address.city ||
      !orderObj.billing.customer.address.street ||
      !orderObj.billing.customer.address.state ||
      !orderObj.billing.customer.address.zipcode
    ) {
      validation = true;
    }

    return validation;
  };

  return (
    <div className="container">
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
                    prevState.product.name = e.target.value;
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
                    prevState.product.description = e.target.value;
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
                    prevState.order.amount = e.target.value;
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
              <Form.Label column="sm">
                Customer Email <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter"
                size="sm"
                onChange={(e) =>
                  setOrderObj((prevState) => {
                    prevState.billing.customer.email = e.target.value;
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
                    prevState.billing.customer.phone = e.target.value;
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
                    prevState.billing.customer.address.street = e.target.value;
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
                    prevState.billing.customer.address.city = e.target.value;
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
                    prevState.billing.customer.address.state = e.target.value;
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
                    prevState.billing.customer.address.zipcode = e.target.value;
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
