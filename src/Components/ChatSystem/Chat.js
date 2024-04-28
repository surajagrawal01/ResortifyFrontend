import { useSelector } from "react-redux"
import ChatAdmin from "./ChatAdmin"
import ChatUser from "./ChatUser"
export default function Chat(){
    const userDetail = useSelector((state)=>{
        return state.user.user
    })

    return(
        <>
            {
                userDetail.role == 'admin' ? <ChatAdmin /> : <ChatUser />
            }
        </>
    )
}