import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="success-page">
      <h1>Thank you for your purchase!</h1>
      <p>Your order has been placed successfully.</p>
      <Button onClick={() => navigate("/")}>Go to Home</Button>
    </div>
  );
};

export default SuccessPage;
