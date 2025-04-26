import React, {useState,useEffect } from 'react';
import axios from 'axios';
import '../style/pagecss/Home.css'
import { Button, Form, Input, } from 'antd';
import TodoDisplay from '../components/TodoDisplay.js';

const Home = () => {
    const [data, setData] = useState([]);
    const [form] = Form.useForm();

    const fectchTodos = async () => {
        try {
            const getTodoRes = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/gettodo`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            });
            if (getTodoRes.data.success) {
                setData(getTodoRes.data.gettodo)
            }
            else {
                setData([]);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const finishHandler = async (values) => {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/upload`,values, {headers :{
            Authorization:"Bearer " + localStorage.getItem("token") }
        });
        if (res.data.success) {
            fectchTodos();
            form.resetFields();
        }
        
    }

    const deleteHandler = async (ID) => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/delete`,{
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            ,  data: { ID: ID } });

            if (res.data.success) {
                fectchTodos();
            }
        } catch (error) {
            console.log(error);
        }
    }
    

    useEffect(() => { fectchTodos() }, []);

    return (
        <>
            <div className='home-main-container'>
                <h1>Add your Todos</h1>

                <Form form={form} layout="horizontal" onFinish={finishHandler} className='todo-add-container'>
                    <Form.Item name="todo" rules={[{ required: true, message: "Fill blank field" }]}>
                        <Input type='text' placeholder='add your todo hear' className='text-area'/>
                    </Form.Item>
                    <Form.Item>
                         <Button type='primary' htmlType='submit' className='submit-button'>Add</Button>
                    </Form.Item>
                </Form>
                
                {data.map((item) => (<TodoDisplay key={item._id} item={item} onDelete={deleteHandler} />))}
                
            </div>
        </>
    );
}

export default Home;
