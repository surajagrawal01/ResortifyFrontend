import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


export const SweetAlertFunc = (title, text, icon, navigateTo) => {
    const navigate = useNavigate()
    Swal.fire({
        title: title,
        text:text,
        icon: icon,
        confirmButtonText: "OK"
    }).then((result) => {
        if (result.isConfirmed) {
            navigate(navigateTo)
        }
    })
}

