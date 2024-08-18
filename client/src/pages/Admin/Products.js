import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/get-product`);
      setProducts(data?.products);
      // console.log(data.products)
    } catch (error) {
      console.log(error);
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
    // console.log(product)
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu></AdminMenu>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex">
          {products?.map((p) => (
            <Link  to={`/dashboard/admin/product/${p.slug}`} key={p._id} className="product-link">
            <div className="card m-2" style={{ width: "18rem" }} >
              <img src={`/api/v1/products/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">
                 {p.description}
                </p>
              </div>
            </div>
            </Link>
          ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
