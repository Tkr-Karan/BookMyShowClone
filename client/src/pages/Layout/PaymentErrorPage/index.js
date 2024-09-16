import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const PaymentErrorPage = () => {
  const [time, setTime] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          navigate("/");
        }
        return prevTime - 1;
      });
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>Payment Failed, Please try again after sometime!</h2>

      <div>
        <img
          src="https://inai.io/hubfs/Header%20-%20Online%20payment%20failure%20reasons%20and%20how%20to%20avoid%20it_%20%281%29.png"
          alt=""
          width={500}
          height={400}
        />
      </div>

      <p>
        Click here for redirecting &nbsp;
        <Link to="/">home</Link>
        &nbsp; or wait for {time} seconds
      </p>
    </div>
  );
};
