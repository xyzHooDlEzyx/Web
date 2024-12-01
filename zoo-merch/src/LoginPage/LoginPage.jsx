import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/productsApi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../button/button";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const handleLogin = async (values) => {
    try {
      const response = await loginUser(values.email, values.password);

      const { token, userId } = response;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      navigate("/");
      window.location.reload();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
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

            <Button type="outline">Login</Button>
          </Form>
        </Formik>
        <p>
          Don't have an account?{" "}
          <button className="link" onClick={() => navigate("/register")}>
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
