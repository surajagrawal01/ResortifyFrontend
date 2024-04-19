import { useEffect } from "react"
import axios from "axios"
export default function Failure() {
    useEffect(() => {
        (async () => {
            try {
                const stripeId = localStorage.getItem('stripeId')
                const payment = await axios.put(`http://localhost:3060/api/payments/${stripeId}/failed`, { paymentStatus: "failure" })
                alert('Payment Failed')
            } catch (err) {
                console.log(err)
            }
        })()
    }, [])
    return (
        <div>
            <h1>Payment Failed</h1>
        </div>
    )
}