import axios from "axios"
import { useEffect } from "react"
export default function Success() {
    useEffect(() => {
        (async () => {
            try {
                const stripeId = localStorage.getItem('stripeId')
                const payment = await axios.put(`http://localhost:3060/api/payments/${stripeId}/success`, { paymentStatus: "success" })
                alert('Payment Done')
            } catch (err) {
                console.log(err)
            }
        })()
    }, [])
    return (
        <div>
            <h1>Payment Success</h1>
        </div>
    )
}