import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../button/button";
import { clearCart } from "../store/actions/cartActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./checkout.css";

const CheckoutPage = () => {
  const [isRussian, setIsRussian] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkPhoneAndEmail = (phone, email) => {
    if (phone.startsWith("+7")) {
      setErrorMessage("FUCK YOU RUSSIAN RAPIST");
      setIsRussian(true);
      return false;
    }

    if (email.endsWith("@mail.ru")) {
      setErrorMessage("FUCK YOU RUSSIAN RAPIST");
      setIsRussian(true);
      return false;
    }

    return true;
  };

  const handleSubmit = (values) => {
    if (!checkPhoneAndEmail(values.phoneNumber, values.email)) {
      return;
    }
    dispatch(clearCart());
    navigate("/success");
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First Name is required")
      .max(50, "First Name cannot be longer than 50 characters"),
    lastName: Yup.string()
      .required("Last Name is required")
      .max(50, "Last Name cannot be longer than 50 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(
        /^\+?\d{1,3}[-\s]?\(?\d{1,3}\)?[-\s]?\d{1,4}[-\s]?\d{1,4}[-\s]?\d{1,4}$/,
        "Invalid phone number format"
      )
      .required("Phone number is required"),
    address: Yup.string().required("Address is required"),
    creditCard: Yup.string()
      .matches(/^[0-9]{16}$/, "Credit card number must be 16 digits")
      .required("Credit card number is required"),
  });

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      {isRussian && (
        <div className="alert-card">
          <p className="alert-message">{errorMessage}</p>
        </div>
      )}

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          address: "",
          creditCard: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <Field type="text" id="firstName" name="firstName" />
            <ErrorMessage
              name="firstName"
              component="div"
              className="error-message"
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <Field type="text" id="lastName" name="lastName" />
            <ErrorMessage
              name="lastName"
              component="div"
              className="error-message"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage
              name="email"
              component="div"
              className="error-message"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <Field type="text" id="phoneNumber" name="phoneNumber" />
            <ErrorMessage
              name="phoneNumber"
              component="div"
              className="error-message"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <Field type="text" id="address" name="address" />
            <ErrorMessage
              name="address"
              component="div"
              className="error-message"
            />
          </div>

          <div className="form-group">
            <label htmlFor="creditCard">Credit Card Number</label>
            <Field type="text" id="creditCard" name="creditCard" />
            <ErrorMessage
              name="creditCard"
              component="div"
              className="error-message"
            />
          </div>

          <Button type="submit">Submit</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default CheckoutPage;
