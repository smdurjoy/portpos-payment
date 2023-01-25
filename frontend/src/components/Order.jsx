import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Order = () => {
  return (
    <div className="container">
      <Row className="mt-5">
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
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>#123</td>
                <td>T-Shirt</td>
                <td>Comfortable Mens T-Shirt</td>
                <td>Tk.890</td>
                <td>Durjoy</td>
                <td>Dhaka</td>
                <td>Paid</td>
              </tr>
              <tr>
                <td>2</td>
                <td>#456</td>
                <td>Shirt</td>
                <td>Comfortable Mens Shirt</td>
                <td>Tk.1390</td>
                <td>Ruddro</td>
                <td>Rangpur</td>
                <td>Pending</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default Order;
