import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ApiUrl from "../ApiUrl";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [token, setToken] = useState(null);
  const [isSumitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      setToken(accessToken);
      (async () => {
        await fetchOrders(accessToken);
      })();
    } else {
      navigate("/login");
    }
  }, []);

  const fetchOrders = async (accessToken) => {
    setIsFetching(true);
    try {
      const { data } = await axios.get(
        ApiUrl.fetchOrders + "?token=" + accessToken
      );
      setOrders(data);
    } catch (err) {
      console.log({ err });
    } finally {
      setIsFetching(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(ApiUrl.logout + "?token=" + token);
      localStorage.removeItem("access_token");
      setToken(null);
      navigate("/login");
    } catch (err) {
      console.log({ err });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (token) {
    return isFetching ? (
      <p className="text-center mt-3">loading...</p>
    ) : (
      <div className="container">
        <Row>
          <Col>
            <Button
              variant="outline-danger"
              size="sm"
              className="mt-2"
              onClick={logout}
              disabled={isSumitting}
            >
              Sign Out
            </Button>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <div className="d-flex justify-content-between">
              <h5>Order</h5>
              <Link to={`/create-order`}>
                <Button variant="primary" size="sm">
                  New Order
                </Button>
              </Link>
            </div>
            <hr />
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Invoice No</th>
                  <th>Product Name</th>
                  <th>Product Description</th>
                  <th>Amount</th>
                  <th>Customer Name</th>
                  <th>Customer Address</th>
                  <th>Phone</th>
                  <th>City</th>
                  <th>Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, key) => {
                  return (
                    <tr key={key}>
                      <td>{++key}</td>
                      <td>#123</td>
                      <td>{order.product_name}</td>
                      <td>{order.product_description}</td>
                      <td>{order.amount}</td>
                      <td>{order.customer_name}</td>
                      <td>{order.customer_email}</td>
                      <td>{order.customer_phone}</td>
                      <td>{order.city}</td>
                      <td></td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
};

export default Order;
