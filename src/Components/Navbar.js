import Container from 'react-bootstrap/Container';
import { Nav, Navbar, NavbarBrand, NavLink, } from 'react-bootstrap';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap"
import { useSelector, useDispatch } from 'react-redux';
import { FaHome, FaBuilding, FaUser } from 'react-icons/fa';
import logo from "../Images/logo.png"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { clearUserData } from '../actions/userActions';
import { setLoginFalse } from '../actions/isLoginActions';

export default function NavigationBar() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isLoggedIn = useSelector((state) => {
    return state.isLogIn.isLoggedIn
  })

  const userDetail = useSelector((state) => {
    return state.user.user
  })

  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch(setLoginFalse())
    dispatch(clearUserData())
    navigate("/")
  }

  return (
    <>
      <Navbar expand="lg" className="gray-background navbar">
        <Container>
          <NavbarBrand><Link to='/' className='link-style'>
            <img
              alt="logo"
              src={logo}
              style={{
                height: 50,
                width: 50
              }}
            />
            &nbsp; Resortify
          </Link>
          </NavbarBrand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"> &nbsp; &nbsp;
            <Nav>
              <NavLink className='mx-md-2'><Link to='/about' className='link-style'> <FaHome /> About Us</Link></NavLink>
              {isLoggedIn ?
                userDetail.role === 'owner' && <Nav.Link><Link to='/list-property' className='link-style'> <FaBuilding /> List Your Property</Link></Nav.Link>
                : <Nav.Link><Link to='/list-property' className='link-style'> <FaBuilding /> List Your Property</Link></Nav.Link>}
            </Nav>
            <Nav className="ms-auto">
              {isLoggedIn ?
                <>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      <FaUser />
                    </DropdownToggle>
                    {
                      userDetail.role === 'user' ?
                        <DropdownMenu end>
                          <DropdownItem>Personal Details</DropdownItem>
                          <DropdownItem>Your Bookings</DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                        </DropdownMenu> :
                        <DropdownMenu end>
                          <DropdownItem>Property Details</DropdownItem>
                          <DropdownItem><Link to='/owner-dashobard' className='link-style'> Dashboard </Link></DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                        </DropdownMenu>
                    }
                  </UncontrolledDropdown>
                </>
                : <Nav.Link><Link to='/registration-page' className='link-style'><FaUser /> Login/SignUp </Link></Nav.Link>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>


  );
}

