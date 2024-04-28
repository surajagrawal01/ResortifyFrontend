import SearchBar from "./SearchBar"
import SearchCity from "./SearchCity"
import OwnerDashBoard from "./DashBoards/ownerDashboard"
import { useSelector } from "react-redux"
import AdminDashboard from "./DashBoards/AdminDashBoard"
import UserRecentSearches from "./UserDetails/UserRecentSearches";

export default function HomePage() {

    const userDetail = useSelector((state) => {
        return state.user.user
    })

    const isLoggedIn = useSelector((state) => {
        return state.isLogIn.isLoggedIn
    })

    const conditionalPage = (role) => {
        switch (role) {
            case 'owner': {
                return <OwnerDashBoard />
            }
            case "user": {
                return <div>
                    <SearchBar />
                    <SearchCity />
                    <hr />
                    <UserRecentSearches />
                </div>
            }
            case "admin": {
                return <AdminDashboard />
            }
        }
    }

    return (
        <>
            {isLoggedIn ?
                <>
                    {conditionalPage(userDetail.role)}
                </>
                :
                <>
                    <SearchBar />
                    <SearchCity />
                </>
            }
        </>
  );
}
