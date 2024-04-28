import SearchBar from "./SearchBar";
import SearchCity from "./SearchCity";
import OwnerDashBoard from "./DashBoards/ownerDashboard";
import { useSelector } from "react-redux";
import UserRecentSearches from "./UserDetails/UserRecentSearches";

export default function HomePage() {
  const userDetail = useSelector((state) => {
    return state.user.user;
  });

  const isLoggedIn = useSelector((state) => {
    return state.isLogIn.isLoggedIn;
  });
  console.log(isLoggedIn);
  return (
    <>
      {isLoggedIn ? (
        <>
          {userDetail.role === "owner" ? (
            <OwnerDashBoard />
          ) : (
            <>
              <SearchBar />
              <SearchCity />
              <hr />
              <UserRecentSearches />
            </>
          )}
        </>
      ) : (
        <>
          <SearchBar />
          <SearchCity />
        </>
      )}
    </>
  );
}
