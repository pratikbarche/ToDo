import React from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import '../style/pagecss/Login.css';

const Login = () => {
  const navigate = useNavigate();

  const onFinishLogin = async(values) => {
    try {
      const res = await axios.post('/api/v1/admin/login', values);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        navigate('/');
        window.location.reload();
      }
      else {
        alert("user not found");
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="login-form-container">
              <Form layout="vertical" onFinish={onFinishLogin} className="login-form">
                  <h2>Login Here</h2>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email are required" }]}
                  >
                      
            <Input type="email" placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password are required" }]}
          >
            <Input type="password" placeholder="Enter password" minLength={8}/>
          </Form.Item>

          <Link to="/register" className="link">If not registered, Register here</Link>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Login;
