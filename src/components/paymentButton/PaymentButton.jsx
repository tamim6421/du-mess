import React from "react";
import { Button } from "react-bootstrap";

const PaymentButton = ({
  title,
  variant,
  handleClick,
  mealName,
  mealStatus,
}) => {
  return (
    <div>
      <Button
        onClick={() => handleClick(mealName, mealStatus)}
        size="sm"
        className={mealStatus === "9" ? "px-2" : "px-4"}
        variant={
          mealStatus === "1"
            ? "primary"
            : mealStatus === "0"
            ? "danger"
            : "warning"
        }
        style={{color:"white"}}
      >
        {mealStatus === "1" ? "ON" : mealStatus === "0" ? "OFF" : "INACTIVE"}
      </Button>
    </div>
  );
};

export default PaymentButton;
