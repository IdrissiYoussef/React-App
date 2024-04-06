import React from "react";
import { Footer, Navbar, Product } from "../components";
import { Link } from "react-router-dom";
const InvoicePage = (props) => {
  const getCurrentDate = () => {
    const date = new Date();
    const formattedDate = `${date.getDate()} ${getMonthName(date.getMonth())}, ${date.getFullYear()}`;
    return formattedDate;
  };
  
  const getMonthName = (monthIndex) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[monthIndex];
  };
  const customer = props.invoice.customer;
  console.log(props);
  return (
    <>
      <>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css"
          integrity="sha256-2XFplPlrFClt0bIdPgpz8H7ojnk10H69xRqd9+uTShA="
          crossOrigin="anonymous"
        />
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="invoice-title">
                    <h4 className="float-end font-size-15">
                      Invoice #{props?.invoice.id}{" "}
                      <span className="badge bg-success font-size-12 ms-2">
                        Paid
                      </span>
                    </h4>
                    <div className="mb-4">
                      <h2 className="mb-1 text-muted">TechStore</h2>
                    </div>
                    {/* <div className="text-muted">
                      <p className="mb-1">
                        3184 Spruce Drive Pittsburgh, PA 15201
                      </p>
                      <p className="mb-1">
                        <i className="uil uil-envelope-alt me-1" /> xyz@987.com
                      </p>
                      <p>
                        <i className="uil uil-phone me-1" /> 012-345-6789
                      </p>
                    </div> */}
                  </div>
                  <hr className="my-4" />
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="text-muted">
                        <h5 className="font-size-16 mb-3">Billed To:</h5>
                        <h5 className="font-size-15 mb-2">{customer.firstName} {customer.lastName}</h5>
                        <p className="mb-1">
                        {customer.address}, {customer.city}
                        </p>
                        
                        <p>{customer.phoneNumber}</p>
                      </div>
                    </div>
                    {/* end col */}
                    <div className="col-sm-6">
                      <div className="text-muted text-sm-end">
                        <div>
                          <h5 className="font-size-15 mb-1">Invoice No:</h5>
                          <p>#{props?.invoice.id}</p>
                        </div>
                        <div className="mt-4">
                          <h5 className="font-size-15 mb-1">Invoice Date:</h5>
                          <p>{getCurrentDate()}</p>
                        </div>
                        {props.invoice.orderList.map((Product)=>{
                            return(
                              <div className="mt-4">
                          <h5 className="font-size-15 mb-1">Order No:</h5>
                          <p>#{Product.id}</p>
                        </div>
                              )
                            })}
                        
                      </div>
                    </div>
                    {/* end col */}
                  </div>
                  {/* end row */}
                  <div className="py-2">
                    <h5 className="font-size-15">Order Summary</h5>
                    <div className="table-responsive">
                      <table className="table align-middle table-nowrap table-centered mb-0">
                        <thead>
                          <tr>
                            <th style={{ width: 70 }}>No.</th>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th className="text-end" style={{ width: 120 }}>
                              Total
                            </th>
                          </tr>
                        </thead>
                        {/* end thead */}
                        <tbody>
                          {props.invoice.orderList.map((Product)=>{
                            return(
                              <tr>
                            <th scope="row">{Product.id}</th>
                            <td>
                              <div>
                                <h5 className="text-truncate font-size-14 mb-1">
                                  {Product.product.productName}
                                </h5>
                                <p className="text-muted mb-0">{Product.product.description}</p>
                              </div>
                            </td>
                            <td>${Product.product.price}</td>
                            <td>{Product.quantity}</td>
                            <td className="text-end">${Product.total}</td>
                          </tr>

                            )
                          })}
                          
                          
                          <tr>
                            <th
                              scope="row"
                              colSpan={4}
                              className="border-0 text-end"
                            >
                              Total
                            </th>
                            <td className="border-0 text-end">
                              <h4 className="m-0 fw-semibold">${props.invoice.total}</h4>
                            </td>
                          </tr>
                          {/* end tr */}
                        </tbody>
                        {/* end tbody */}
                      </table>
                      {/* end table */}
                    </div>
                    {/* end table responsive */}
                    <div className="d-print-none mt-4">
                      <div className="float-end">
                        <a
                          href="javascript:window.print()"
                          className="btn btn-success me-1"
                        >
                          <i className="fa fa-print" />
                        </a>
                        <Link to="/" className="btn btn-primary w-md">
                          Done
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end col */}
          </div>
        </div>
      </>
    </>
  );
};

export default InvoicePage;
