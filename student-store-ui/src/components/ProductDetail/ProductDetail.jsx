import "./ProductDetail.css"
import { useEffect, useState } from "react"
import {useParams} from "react-router-dom"
import NotFound from "../NotFound/NotFound"
import ProductCard from "../Home/ProductsGrid/ProductCard/ProductCard"
import ProductView from "./ProductView/ProductView"
import axios from "axios"
const URL = 'https://codepath-store-api.herokuapp.com/store'

export default function ProductDetail({handleAddItemToCart, handleRemoveItemFromCart, products, setError, getQuantity}) {
    const [product, setProduct] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams()
    let productId = params.productId
    const URL = `https://codepath-store-api.herokuapp.com/store/${productId}`
    const API_BASE_URL = "http://localhost:3001";

    
    const getData = async() => {
        setIsLoading(true)
        try{
          const {data} = await axios(`http://localhost:3001/store/${productId}`);
          
          let product = data.product;
          setProduct((product))
        }
        catch(err){
          setError(err)
          

        }
        finally{
            setIsLoading(false);
        }
    }
    


    useEffect(()=>{getData()}
    ,[])

    
    if (product == null){
        <NotFound/>
    }
    
    
    
    return(
        <div className="product-detail">
            {isLoading? <h1 className = "loading">Loading...</h1>: null}
            <ProductView product = {product}
     productId ={productId} handleAddItemToCart = {handleAddItemToCart} 
     handleRemoveItemFromCart = {handleRemoveItemFromCart} getQuantity = {getQuantity} />
        </div>
    )
    
}