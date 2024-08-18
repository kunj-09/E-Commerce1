import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import axios from "axios";
import CategoryFrom from "../../components/Form/CategoryFrom";
import {Modal} from 'antd'

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name,setName] = useState("")
  const [visible,setVisible] = useState(false)
  const [selected, setSelected] = useState(null)
  const [updatedName,setUpdatedName] = useState("")

  // handle From 
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`,{
        name,
      });
      if(data.success){
        getAllCategory();
      }else{
        console.log("Error fetching Categories")
      }
    } catch (error) {
      console.log(error)
    }
  }

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);         //yeh question mark matlsb data milta hai toh (success) toh aage badho find data.category isko kuch optional chaning bolte hai 
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  //Update category 
  const handleUpdate= async(e) =>{
    e.preventDefault();
    try {
      const {data} =  await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,{name:updatedName})
      if(data.success){
        setSelected(null)
        setUpdatedName("")
        setVisible(false)
        getAllCategory();
      }else{
        console.log("Error fetching data ")
      }
    } catch (error) {
      console.log(error)
    }
  }
  //Delete category 
  const handleDelete= async(pId) =>{
    try {
      const {data} =  await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`)
      if(data.success){
        getAllCategory();
      }else{
        console.log("Error fetching data ")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryFrom handleSubmit={handleSubmit} value={name} setValue={setName}/>
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <React.Fragment key={c._id}>           
                      <tr>
                        <td>{c.name}</td>
                        <td>
                        <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>                              
                          {/* yeh jo c._id aaya hai woh 101 line me apan ne map kiya hai uder se aa raha ha samjo                */}
                          <button className="btn btn-danger ms-2" onClick={()=> {handleDelete(c._id)}}>Delete</button>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>                 
          </div>
          <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
            <CategoryFrom value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}></CategoryFrom>
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
