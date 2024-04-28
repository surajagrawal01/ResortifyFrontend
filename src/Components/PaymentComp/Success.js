import axios from "axios"
import { useEffect } from "react"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
export default function Success() {

    const navigate = useNavigate()

    const sweetAlertFunc = () => {
        Swal.fire({
            title: "Payment Info",
            text: "Payment Successful, Confirmation sent to mail",
            icon: "success",
            confirmButtonText: "OK"
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/")
            }
        })
    }

    useEffect(() => {
        (async () => {
            try {
                const stripeId = localStorage.getItem('stripeId')
                const payment = await axios.put(`http://localhost:3060/api/payments/${stripeId}/success`, { paymentStatus: "success" })
                localStorage.removeItem('stripeId')
                sweetAlertFunc()
            } catch (err) {
                console.log(err)
            }
        })()
    }, [])
    return (
        <div>
            
        </div>
    )
}