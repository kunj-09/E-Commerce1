import React from 'react'
import {NavLink,Link} from 'react-router-dom'
// import { GiShoppingBag } from "react-icons/gi";
import { useAuth } from '../../context/auth'

import SearchInput from '../Form/SearchInput'
import useCategory from '../../hooks/useCategory'
import { useCart } from '../../context/cart'
import {Badge} from 'antd'

const Header = () => {
  const [auth ,setAuth] = useAuth();
  const [cart] = useCart();                  //ider useCart wale context ko set nhi kiya hai --- khali detructure kiya smajo 
  const categories = useCategory();
  const handleLogout = ()=>{
    setAuth({
      ...auth,          //yeh spread Operator hota hai
      user:null,
      token:null
    })
    localStorage.removeItem('auth')
    
  }
  return (
      <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link to='/' className="navbar-brand" href="#"> 🛒 Ecommerece App</Link>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <SearchInput></SearchInput>
        <li className="nav-item">
          <NavLink to='/' className="nav-link ">Home</NavLink>
        </li>

        <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c._id}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

       {
        !auth.user ? (<>
         <li className="nav-item">
          <NavLink to='/register' className="nav-link" >REGISTER</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/login' className="nav-link" >LOGIN</NavLink>
        </li>
        </>) : (<>
         <li className="nav-item dropdown">
  <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    {auth?.user?.name}
  </NavLink>
  <ul className="dropdown-menu">
    <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item" href="#">Dashboard</NavLink></li>
     <li><NavLink to='/login' className="dropdown-item" onClick={handleLogout}>LOGOUT</NavLink></li>
  </ul>
</li>
        </>)
       }
        <li className="nav-item">
          <Badge count={cart?.length} showZero>
          <NavLink to='/cart' className="nav-link">CART</NavLink>
          </Badge>
        </li>
        
      </ul>
    </div>
  </div>
</nav>

      </>
    
  )
}

export default Header
