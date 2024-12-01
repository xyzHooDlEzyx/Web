import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/productsApi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../button/button";
import "../RegistrationPage/RegistrationPage.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First name is required")
      .max(50, "First name cannot be longer than 50 characters"),
    lastName: Yup.string()
      .required("Last name is required")
      .max(50, "Last name cannot be longer than 50 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const handleRegister = async (values) => {
    try {
      const response = await registerUser(
        values.email,
        values.password,
        values.firstName,
        values.lastName
      );
      // token,
      const { userId } = response;
      // localStorage.setItem("token", token);
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Register</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
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
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>

            <Button type="outline">Register</Button>
          </Form>
        </Formik>
        <p>
          Already have an account?{" "}
          <button className="link" onClick={() => navigate("/login")}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
