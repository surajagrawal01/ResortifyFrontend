import { useEffect } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
export default function Failure() {

    const navigate = useNavigate()

    const sweetAlertFunc = () => {
        Swal.fire({
            title: "Payment Info",
            text: "Payment UnSuccessful",
            icon: "error",
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
                const payment = await axios.put(`https://resortifybackend.onrender.com/api/payments/${stripeId}/failed`, { paymentStatus: "failure" })
                alert('Payment Failed')
            } catch (err) {
                sweetAlertFunc()
                console.log(err)
            }
        })()
    }, [])
    return (
        <div>
        </div>
    )
}