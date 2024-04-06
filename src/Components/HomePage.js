import NavigationBar from "./Navbar"
import SearchBar from "./SearchBar"
import SearchCity from "./SearchCity"
import OwnerDashBoard from "./DashBoards/ownerDashboard"
import { useSelector } from "react-redux"

export default function HomePage() {

    const userDetail = useSelector((state) => {
        return state.user.user
    })

    const isLoggedIn = useSelector((state) => {
        return state.isLogIn.isLoggedIn
    })

    return (
        <>
            <NavigationBar />
            {isLoggedIn ?
                <>
                    {
                        userDetail.role == 'owner' ?

                            <OwnerDashBoard />
                            :
                            <>
                                <SearchBar />
                                <SearchCity />
                            </>

                    }
                </>
                :
                <>
                    <SearchBar />
                    <SearchCity />
                </>
            }
        </>
    )
}