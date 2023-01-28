import React from "react";
import "./invoice.css";

const Invoice = ({ invoiceDetails }) => {
  return (
    <div style={{ padding: 20 }} className="invoice">
      <header>
        <h1>Invoice</h1>
        <address>
          <p>{invoiceDetails.customer_name}</p>
          <p>
            {invoiceDetails.customer_street}, {invoiceDetails.customer_zipcode}
            <br />
            {invoiceDetails.customer_city}, {invoiceDetails.customer_state},
            {invoiceDetails.customer_country}
          </p>
          <p>{invoiceDetails.customer_email}</p>
          <p>{invoiceDetails.customer_phone}</p>
        </address>
      </header>
      <article>
        <p>
          Payment Url
          <br />
          {invoiceDetails.payment_url}
        </p>
        <table className="meta">
          <tr>
            <th>
              <span>Invoice #</span>
            </th>
            <td>
              <span>{invoiceDetails.invoice_no}</span>
            </td>
          </tr>
          <tr>
            <th>
              <span>Date</span>
            </th>
            <td>
              <span>{invoiceDetails.invoice_date}</span>
            </td>
          </tr>
          <tr>
            <th>
              <span>Status</span>
            </th>
            <td>
              <span>{invoiceDetails.status}</span>
            </td>
          </tr>
        </table>
        <table className="inventory">
          <thead>
            <tr>
              <th>
                <span>Product Name</span>
              </th>
              <th>
                <span>Product Description</span>
              </th>
              <th>
                <span>Amount</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a className="cut">-</a>
                <span>{invoiceDetails.product_name}</span>
              </td>
              <td>
                <span>{invoiceDetails.product_description}</span>
              </td>
              <td>
                <span data-prefix>{invoiceDetails.currency} </span>
                <span>{invoiceDetails.amount}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <a className="add">+</a>
        <table className="balance">
          <tr>
            <th>
              <span>Total</span>
            </th>
            <td>
              <span data-prefix>{invoiceDetails.currency} </span>
              <span>{invoiceDetails.amount}</span>
            </td>
          </tr>
        </table>
      </article>
    </div>
  );
};

export default Invoice;
