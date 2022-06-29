import "./CheckoutForm.css"
import { Link } from "react-router-dom"

export default function CheckoutForm({isOpen, checkoutForm, shoppingCart, handleOnCheckoutFormChange, handleOnSubmitCheckoutForm, error, receipt, setReceipt}){
    let error2 = JSON.stringify(error); 
    return(
        <div className="checkout-form">
            <h2 className="CheckoutBelow">Checkout Below!</h2>
            <input type="email" name="email" placeholder = "student@codepath.org" 
            className="checkout-form-input" value={checkoutForm.email}
            onChange={(e) => {handleOnCheckoutFormChange("email", e.target.value)}} />

            <input type="text" name="name" placeholder = "Student Name" 
            className="checkout-form-input" value={checkoutForm.name}
            onChange={(e) => {handleOnCheckoutFormChange("name", e.target.value)}} />
            
            <button className="checkout-button" onClick={() => handleOnSubmitCheckoutForm(checkoutForm, shoppingCart, receipt, setReceipt)}> Checkout </button>
            {error == "success" ? 
            <div className="success">
                <h3 >{`Success! You can expect to receive your items soon!`}</h3>
                <div className="receipt">
                    {receipt.map((line) => {
                        return <p className="receipt-line">{line}</p>
                    })}
                </div>
                
                
            </div>
                : 
                <h3 className="error">{error2}</h3>}

        </div>
    )
}