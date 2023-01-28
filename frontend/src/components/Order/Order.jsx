import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ApiUrl from "../../ApiUrl";
import { useNavigate } from "react-router-dom";
import Invoice from "../Invoice/Invoice";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const [token, setToken] = useState(null);
  const [isSumitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [show, setShow] = useState(false);
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
    setIsSubmitting(true);
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

  const updateOrderStatus = async ({ target: { value } }, orderId) => {
    setIsSubmitting(true);
    try {
      const payload = {
        orderId,
        status: value,
      };
      await axios.put(ApiUrl.orderStatusUpate + `?token=${token}`, payload);
      window.location.reload();
    } catch (err) {
      console.log({ err });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getOrderIPNDetails = async (id) => {
    setIsSubmitting(true);
    try {
      const { data } = await axios.get(
        ApiUrl.orderIPNDetails + `?orderId=${id}&token=${token}`
      );
      setInvoiceDetails(data);
      setShow(true);
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
                  <th>Amount</th>
                  <th>Customer Name</th>
                  <th>Customer Address</th>
                  <th>Phone</th>
                  <th>City</th>
                  <th>Details</th>
                  <th>Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, key) => {
                  return (
                    <tr key={key}>
                      <td>{++key}</td>
                      <td>{order.invoice_id}</td>
                      <td>{order.amount}</td>
                      <td>{order.customer_name}</td>
                      <td>{order.customer_email}</td>
                      <td>{order.customer_phone}</td>
                      <td>{order.city}</td>
                      <td>
                        <Button
                          variant="primary"
                          size="sm"
                          disabled={isSumitting}
                          onClick={() => getOrderIPNDetails(order.id)}
                        >
                          IPN
                        </Button>
                      </td>
                      <td>
                        <select
                          style={{ width: "80%" }}
                          name="status"
                          className="form-control"
                          value={order.status}
                          onChange={(e) => updateOrderStatus(e, order.id)}
                        >
                          <option value="0">Pending</option>
                          <option value="1">Paid</option>
                          <option value="2">Fulfilled</option>
                          <option value="3">Refund</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Modal show={show} onHide={() => setShow(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Invoice</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Invoice invoiceDetails={invoiceDetails} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

export default Order;
