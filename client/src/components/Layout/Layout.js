import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
// import { ToastContainer } from 'react-toastify';
import { Toaster } from 'sonner';

import 'react-toastify/dist/ReactToastify.css';
import { ToastProvider } from "react-toast-notifications";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      {/* ///yeh helmet SEO ke liye hai  */}
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>

      <Header />
      <main style={{ minHeight: "70vh" }}>
        <Toaster />
        {/* <ToastContainer /> */}
        <ToastProvider></ToastProvider>
        {children}
      </main>
      <Footer />
    </div>
  );
};
// Layout.defaultProps={
//   title:'Ecommerce app-shop now ',
//   description:'mern stack project',       //->>>yeh for SEO kiya tha
//   keywords:'mern,react,node,mongodb',
//   author:'Kunj'

// }
export default Layout;
