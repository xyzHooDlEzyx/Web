import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/button";
import "./success.css";

const SuccessPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/catalog");
  };

  return (
    <div className="success-page">
      <h2>Thank you for your order!</h2>
      <p>Your order has been successfully placed.</p>
      <Button onClick={handleGoBack}>Go back to Catalog</Button>
    </div>
  );
};

export default SuccessPage;
