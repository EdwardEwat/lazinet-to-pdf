import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { LoginApp } from "../../redux/AuthSlice/AuthSlice";
import "./Login.css";

const Login = () => {
  const { token, setToken } = useContext(AuthContext);
  const { visible, setVisible } = useState(true);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      const loginData = { ...values };
      const res = await dispatch(LoginApp(loginData)).unwrap();
      message.success("Đăng nhập thành công");
      setToken(res);
      setVisible(false);
    } catch (error) {}
  };

  return (
    <div className="Login">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, display: !visible ? "block" : "none" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
