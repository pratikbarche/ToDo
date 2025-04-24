import React from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import '../style/componenetcss/Layout.css'

const Layout = ({children}) => {
    return (
        <>
            <div className='layout-container'>
            <Header />
            <main className='main-container'>{children}</main>
            <Footer/>
            </div>
        </>
    );
}

export default Layout;
