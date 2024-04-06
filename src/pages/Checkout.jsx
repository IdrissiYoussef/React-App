import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useFormik, Field } from "formik";
import Select from "react-select";
import InvoicePage from "./InvoicePage";
import { useSelector, useDispatch } from "react-redux";
import { CLEAR, Clear, delCart } from "../redux/action";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const componentMounted = true;
const options = [
  { value: "INDIA", label: "INDIA" },
  { value: "MOROCCO", label: "MOROCCO" },
  { value: "USA", label: "USA" },
];
const options2 = [
  { value: "Punjab", label: "Punjab" },
  { value: "California", label: "California" },
  { value: "cali", label: "cali" },
];

const Checkout = () => {
  const state = useSelector((state) => state.handleCart);

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">No item in Cart</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const SignupForm = (props) => {
    const [selectedOption, setSelectedOption] = useState("test");
    const handleChange = (selectedOption) => {
      if (selectedOption) {
        console.log(selectedOption.value); // Accessing the value property of the selected option
      } else {
        console.log("No option selected");
      }
      // You can also update Formik's state here if needed
      // formik.setFieldValue("country", selectedOption ? selectedOption.value : "");
    };
    const navigate = useNavigate();

    const navigateToInvoice = (id) => {
      navigate(`/invoice/${id}`);
    };
    const state = useSelector((state) => state.handleCart);
    const dispatch = useDispatch();
    const postProduct = async (productData) => {
      try {
        const response = await fetch(`${BASE_URL}/v1/invoices/create`, {
          method: "POST", // Specify the method
          headers: {
            "Content-Type": "application/json", // Set the content type header so that the server knows we're sending JSON
          },
          body: JSON.stringify(productData), // Convert the JavaScript object to a string
        });

        // Check if the component is still mounted before updating its state
        if (componentMounted) {
          if (response.ok) {
            const result = await response.json();
            console.log(result, props, state);
            props.setInvoice(result);
            
            dispatch(Clear())
            // state.map((item)=>{
            //   console.log(item)
            //   
            // })
          } else {
            throw new Error("Something went wrong with the POST request");
          }
        }
      } catch (error) {
        console.error("Failed to post product:", error);
        // Handle error scenario, maybe set an error state here
      } finally {
      }
    };
    const getOrderList = (productsArray) => {
      return productsArray.map((product) => ({
        productId: product.id,
        quantity: product.qty,
      }));
    };
    useEffect(() => {
      console.log(getOrderList(state));
    }, []);
    const formik = useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        address2: "",
        country: "",
        city: "",
        zip: "",
      },
      onSubmit: (values) => {
        postProduct({
          customerRequest: formik.values,
          orderList: getOrderList(state),
        });
      },
    });
    return (
      <div className="col-md-7 col-lg-8">
        <div className="card mb-4">
          <div className="card-header py-3">
            <h4 className="mb-0">Billing address</h4>
          </div>
          <div className="card-body">
            <form
              onSubmit={formik.handleSubmit}
              className="needs-validation"
              novalidate
            >
              <div className="row g-3">
                <div className="col-sm-6 my-1">
                  <label for="firstName" className="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder=""
                    name="firstName"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    required
                  />
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>

                <div className="col-sm-6 my-1">
                  <label for="lastName" className="form-label">
                    Last name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder=""
                    name="lastName"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    required
                  />
                  <div className="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>

                

                <div className="col-12 my-1">
                  <label for="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="1234 Main St"
                    name="address"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                    required
                  />
                  <div className="invalid-feedback">
                    Please enter your shipping address.
                  </div>
                </div>

                <div className="col-12">
                  <label for="address2" className="form-label">
                    Address 2 <span className="text-muted">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address2"
                    placeholder="Apartment or suite"
                    name="address2"
                    onChange={formik.handleChange}
                    value={formik.values.address2}
                  />
                </div>

                <div className="col-12 my-1">
                  <label for="phoneNumber" className="form-label">
                  phoneNumber
                  </label>
                  <input
                    type="tel"
                    pattern="[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}"
                    title="Please enter a valid phone number in the format 06-XX-XX-XX-XX"
                    className="form-control"
                    id="phoneNumber"
                    placeholder="06-XX-XX-XX-XX"
                    name="phoneNumber"
                    onChange={formik.handleChange}
                    value={formik.values.phoneNumber}
                    required
                  />
                  <div className="invalid-feedback">
                    Please enter a valid phoneNumber for shipping updates.
                  </div>
                </div>

                {/* <div className="col-md-5 my-1">
                  <label for="country" className="form-label">
                    Country
                  </label>
                  <br />

                  <Select
                    onChange={(e) => {
                      formik.setFieldValue("country", e ? e.value : null);
                    }}
                    options={options}
                    isClearable={true}
                    value={options.find(
                      (option) => option.value === formik.values.country
                    )}
                    required
                  />
                  <div className="invalid-feedback">
                    Please select a valid country.
                  </div>
                </div> */}

                <div className="col-12 my-1">
                  <label for="City" className="form-label">
                    City
                  </label>
                  <br />
                  <input 
                        className="form-control" 
                        id="city" 
                        name="city" 
                        onChange={formik.handleChange}
                        value={formik.values.city}
                        required
                
                        />
                  {/* <Select
                    onChange={(e) => {
                      formik.setFieldValue("state", e ? e.value : null);
                    }}
                    options={options2}
                    isClearable={true}
                    value={options.find(
                      (option) => option.value === formik.values.state
                    )}
                    required
                  /> */}
                  <div className="invalid-feedback">
                    Please provide a valid city.
                  </div>
                </div>

                {/* <div className="col-md-3 my-1">
                  <label for="zip" className="form-label">
                    Zip
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    placeholder=""
                    name="zip"
                    onChange={formik.handleChange}
                    value={formik.values.zip}
                    required
                  />
                  <div className="invalid-feedback">Zip code required.</div>
                </div> */}
              </div>

              {/* <hr className="my-4" />

                    <h4 className="mb-3">Payment</h4>

                    <div className="row gy-3">
                      <div className="col-md-6">
                        <label for="cc-name" className="form-label">
                          Name on card
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cc-name"
                          placeholder=""
                          required
                        />
                        <small className="text-muted">
                          Full name as displayed on card
                        </small>
                        <div className="invalid-feedback">
                          Name on card is required
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label for="cc-number" className="form-label">
                          Credit card number
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cc-number"
                          placeholder=""
                          required
                        />
                        <div className="invalid-feedback">
                          Credit card number is required
                        </div>
                      </div>

                      <div className="col-md-3">
                        <label for="cc-expiration" className="form-label">
                          Expiration
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cc-expiration"
                          placeholder=""
                          required
                        />
                        <div className="invalid-feedback">
                          Expiration date required
                        </div>
                      </div>

                      <div className="col-md-3">
                        <label for="cc-cvv" className="form-label">
                          CVV
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cc-cvv"
                          placeholder=""
                          required
                        />
                        <div className="invalid-feedback">
                          Security code required
                        </div>
                      </div>
                    </div> */}

              <hr className="my-4" />

              <button className="w-100 btn btn-primary " type="submit">
                Continue to checkout
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };
  const [invoice, setInvoice] = useState(null);
  const ShowCheckout = () => {
    
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;
    console.log(state);
    state?.map((item) => {
      return (subtotal += item.price * item.qty);
    });

    state?.map((item) => {
      return (totalItems += item.qty);
    });

    return (
      <>
        {!!invoice === false ? (
          <div className="container py-5">
            <div className="row my-4">
              <div className="col-md-5 col-lg-4 order-md-last">
                <div className="card mb-4">
                  <div className="card-header py-3 bg-light">
                    <h5 className="mb-0">Order Summary</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Products ({totalItems})
                        <span>${Math.round(subtotal)}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Shipping
                        <span>${shipping}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total amount</strong>
                        </div>
                        <span>
                          <strong>${Math.round(subtotal + shipping)}</strong>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <SignupForm setInvoice={setInvoice} />
            </div>
          </div>
        ) : (
          ""
        )}
        {!!invoice === true ? <InvoicePage invoice={invoice} /> : ""}
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {state.length || !!invoice === true? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
