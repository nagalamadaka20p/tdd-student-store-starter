import "./ShoppingCart.css"
import { Link } from "react-router-dom"

export default function ShoppingCart({isOpen, products, shoppingCart}){
    function getName (id){
        for (let i = 0; i<products.length; i++){
            if (products[i].id == id){
                return products[i].name
            }
        }
    }

    function sumPrices(shoppingCart){
        let price = 0;
        let sum = 0;
        {shoppingCart.map(cart => {
            for (let i = 0; i<products.length; i++){
                if (products[i].id == cart.itemId){
                    price = products[i].price
                }
            }
            sum += (cart.quantity * price)
            
        })}
        return sum.toFixed(2)
        
    }

    function getPrice(id){
        for (let i = 0; i<products.length; i++){
            if (products[i].id == id){
                return Number(products[i].price).toFixed(2)
            }
        }

    }
    
    return(
        
        <div className="shopping-cart">
            
            {shoppingCart.length == 0? 
            <div className="shopping-cart-empty">
                <h3 className="notification">No items added to cart yet.</h3>
                <h3 className="notification">Start shopping now!</h3>
            </div>
            :
            <div>
                <h1 className="item">Items in Cart</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shoppingCart.map(cart => {
                            return(
                                <tr>
                                    <td>{getName(cart.itemId)}</td>
                                    <td>{cart.quantity}</td>
                                    <td>${Number(getPrice(cart.itemId) * cart.quantity).toFixed(2)}</td>
                                </tr>
                            )
                        }
                        )}
                    </tbody>
                </table>
            

                <h3 className="subtotal">Subtotal: ${sumPrices(shoppingCart)}</h3>
                <h3 className="tax">Tax: ${(sumPrices(shoppingCart)*0.0875).toFixed(2)}</h3>
                <h3 className="total-price">Total including tax: ${(sumPrices(shoppingCart) * 1.0875).toFixed(2)}</h3>
            
            </div>
            }

            
            
        </div>
    )
}