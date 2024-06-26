import Container from "react-bootstrap/Container";
import { Nav, Navbar, NavbarBrand, NavLink } from "react-bootstrap";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { FaHome, FaBuilding, FaUserCircle } from "react-icons/fa";
import { IoMdChatboxes } from "react-icons/io";
import logo from "../Images/Escape, Relax, Indulge.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { clearUserData } from "../actions/userActions";
import { setLoginFalse } from "../actions/isLoginActions";

export default function NavigationBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => {
    return state.isLogIn.isLoggedIn;
  });

  const userDetail = useSelector((state) => {
    return state.user.user;
  });

  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch(setLoginFalse())
    dispatch(clearUserData())
    navigate("/")
  };

  const conditionalLinks = (role) => {
    switch (role) {
      case "admin": {
        return (
          <DropdownItem>
            <Link to="/owner-dashobard" className="link-style">
              {" "}
              Dashboard{" "}
            </Link>
          </DropdownItem>
        );
      }
      case "user": {
        return (
          <div>
            <DropdownItem>
              <Link to="/personal-detail" className="link-style">
                {" "}
                Personal Details{" "}
              </Link>
            </DropdownItem>
            <DropdownItem>
              <Link to="/my-bookings" className="link-style">
                {" "}
                Your Bookings{" "}
              </Link>
            </DropdownItem>
          </div>
        );
      }
      case "owner": {
        return (
          <div>
            <DropdownItem>
              <Link to="/personal-detail" className="link-style">
                {" "}
                Personal Details{" "}
              </Link>
            </DropdownItem>
            <DropdownItem>
              <Link to="/owner-dashobard" className="link-style">
                {" "}
                Dashboard{" "}
              </Link>
            </DropdownItem>
          </div>
        );
      }
      default: {
        return (
          <div>
            <DropdownItem>user</DropdownItem>
          </div>
        );
      }
    }
  };

  return (
    <>
      <Navbar expand="lg" className="gray-background navbar">
        <Container>
          <NavbarBrand>
            <Link to="/" className="link-style">
              <img
                alt="logo"
                src={logo}
                style={{
                  height: 75,
                  width: 75,
                }}
              />
              &nbsp; Resortify
            </Link>
          </NavbarBrand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {" "}
            &nbsp; &nbsp;
            <Nav>
              <NavLink className="mx-md-2">
                <Link to="/aboutus" className="link-style">
                  {" "}
                  <FaHome /> About Us
                </Link>
              </NavLink>
              {isLoggedIn ? (
                userDetail.role === "owner" && (
                  <Nav.Link>
                    <Link to="/stepperform" className="link-style">
                      {" "}
                      <FaBuilding /> List Your Property
                    </Link>
                  </Nav.Link>
                )
              ) : (
                <Nav.Link>
                  <Link to="/stepperform" className="link-style">
                    {" "}
                    <FaBuilding /> List Your Property
                  </Link>
                </Nav.Link>
              )}
            </Nav>
            <Nav className="ms-auto">
              <Nav.Link>
                <Link to="/chat" className="link-style">
                  {" "}
                  <IoMdChatboxes /> ChatwithUs
                </Link>{" "}
              </Nav.Link>
              {isLoggedIn ? (
                <>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      <FaUserCircle />
                    </DropdownToggle>
                    <DropdownMenu end>
                      {conditionalLinks(userDetail.role)}
                      <DropdownItem divider />
                      <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </>
              ) : (
                <Nav.Link>
                  <Link to="/registration-page" className="link-style">
                    <FaUserCircle /> Login/SignUp{" "}
                  </Link>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
