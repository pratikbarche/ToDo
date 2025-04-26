import React,{useState,useEffect} from 'react';
import '../style/componenetcss/Header.css'
import { useNavigate } from 'react-router-dom';
import {Button} from 'antd';
import axios from 'axios';



const Header = () => {

    const navigate = useNavigate();
    const [name, setName] = useState();
    const token = localStorage.getItem("token");


    
    const getUserdata = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/namesetting`,{
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            })
            if (res.data.success) {
                setName(res.data.data.name);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getUserdata();
    },[]);
    



    const forLogin = () => {
        navigate('/login');
    }
    const forRegister = () => navigate('/register');

    const forLogout = () => {
        localStorage.removeItem("token");
        navigate('/login');
        window.location.reload();
    }


    return (
        <>
            <header className='header'>
                <h1>{name}</h1>
            
                <nav>
                    {token ? <Button type='primary' onClick={forLogout}>logout</Button> : <> <Button type='primary' onClick={forLogin}>Login</Button> <Button type='primary' onClick={forRegister}>Register</Button></> }
                
            </nav>
            </header>
        </>
    );
}

export default Header;
