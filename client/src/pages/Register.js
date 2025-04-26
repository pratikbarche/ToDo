import React from "react";
import { Form, Input, Button } from "antd";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import '../style/pagecss/Register.css';

const Register = () => {

  const navigate = useNavigate();
  const onFinishRegister = async(values) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/register`, values);
      if (res.data.success) {
        alert("Register Succesfully");
        navigate('/login');
      }
      else {
        console.log(res.data.message); 
      }
    }
    catch (error) {
      console.log(error);
    }
  };


  return (
    <>
          <div className="register-form-container">
              
        <Form
          layout="vertical"
          onFinish={onFinishRegister}
          className="registration-form"
              >
                  <h2>Register Here</h2>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Name are required" }]}
          >
            <Input type="text" placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email are required" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input type="email" placeholder="Enter Your Email" />
          </Form.Item>

          <Form.Item
            label="Mobile No."
            name="mobile"
            rules={[{ required: true, message: "Mobile No. are required" }]}
          >
            <Input placeholder="Enter your mobile number" maxLength={10} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "password are required" }]}
          >
            <Input
              type="password"
              placeholder="Enter your password"
              minLength={8}
            />
          </Form.Item>

          <Link to="/login" className="link">Already user? login here</Link>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Register;
