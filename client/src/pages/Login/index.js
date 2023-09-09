import React from "react";
import { Form, message } from "antd";
// import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import axios from "axios";

export default function Login(){
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        values,
        {
          "content-type": "application/json",
        }
      );
      console.log(response);
      const res = response.data;

      if (res.success) {
        message.success(res.message);
        navigate("/");
      } else {
        message.error(res.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <div className="flex justify-center h-screen items-center bg-image">
      <div className="card p-3 w-400">
        <h1 className="text-xl mb-1">Welcome Again! Please Login</h1>
        <hr />
        <Form layout="vertical" className="mt-1" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <input type="password" />
          </Form.Item>

          <div className="flex flex-col mt-2 gap-1">
            <Button fullWidth title="LOGIN" type="submit" />
            <Link to="/register" className="text-primary">
              {" "}
              Don't have an account? Register
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};
