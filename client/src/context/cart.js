import { useState,useContext,createContext ,useEffect} from "react";


const CartContext = createContext();

const CartProvider = ({children})=>{
    const [cart , setCart] = useState([])

    useEffect(()=>{
        let existingCategory = localStorage.getItem('cart')  //local storage ka data save kiya existingcategory me 
        if(existingCategory) setCart(JSON.parse(existingCategory))  //ab check kiya existingCategory hai matlab data hai toh usko cart me save karlo samjo 
    },[])

    return(
        <CartContext.Provider value={[cart,setCart]}>
            {children}
        </CartContext.Provider>
    );
}

//custom hook
const useCart=()=> useContext(CartContext)

export {useCart , CartProvider};