import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <Nav>
      <Container>
        <Logo to="/" onClick={closeMobileMenu}>
          <motion.img 
            src="/react.svg" 
            alt="logo"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          />
          <span>Food Zone</span>
        </Logo>

        <DesktopNav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/menu">Menu</NavLink>
          <CartLink to="/cart">
            Cart
            {cart.length > 0 && <CartBadge>{cart.length}</CartBadge>}
          </CartLink>
          
          {user ? (
            <>
              <NavLink to="/profile">Profile</NavLink>
              <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <RegisterButton to="/register">Register</RegisterButton>
            </>
          )}
        </DesktopNav>

        <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </Container>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MobileNavLink to="/" onClick={closeMobileMenu}>
              🏠 Home
            </MobileNavLink>
            <MobileNavLink to="/menu" onClick={closeMobileMenu}>
              🍽️ Menu
            </MobileNavLink>
            <MobileNavLink to="/cart" onClick={closeMobileMenu}>
              🛒 Cart {cart.length > 0 && `(${cart.length})`}
            </MobileNavLink>
            
            {user ? (
              <>
                <MobileNavLink to="/profile" onClick={closeMobileMenu}>
                  👤 Profile
                </MobileNavLink>
                <MobileLogoutButton onClick={handleLogout}>
                  🚪 Logout
                </MobileLogoutButton>
              </>
            ) : (
              <>
                <MobileNavLink to="/login" onClick={closeMobileMenu}>
                  🔐 Login
                </MobileNavLink>
                <MobileRegisterButton to="/register" onClick={closeMobileMenu}>
                  ✨ Register
                </MobileRegisterButton>
              </>
            )}
          </MobileMenu>
        )}
      </AnimatePresence>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  background: rgba(50, 51, 52, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 1rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: white;
  font-size: 24px;
  font-weight: 700;
  z-index: 1001;

  img {
    width: 40px;
    height: 40px;
  }

  span {
    background: linear-gradient(135deg, #ff4343 0%, #f22f2f 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    
    img {
      width: 35px;
      height: 35px;
    }
  }
`;

const DesktopNav = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
  position: relative;

  &:hover {
    color: #ff4343;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: #ff4343;
    transition: width 0.3s;
  }

  &:hover:after {
    width: 100%;
  }
`;

const CartLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: color 0.3s;

  &:hover {
    color: #ff4343;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -12px;
  background: #ff4343;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
`;

const LogoutButton = styled.button`
  background: transparent;
  border: 1px solid #ff4343;
  color: #ff4343;
  padding: 8px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;

  &:hover {
    background: #ff4343;
    color: white;
  }
`;

const RegisterButton = styled(Link)`
  background: linear-gradient(135deg, #ff4343 0%, #f22f2f 100%);
  color: white;
  padding: 8px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 67, 67, 0.4);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 28px;
  cursor: pointer;
  z-index: 1001;
  padding: 5px;
  line-height: 1;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    background: rgba(40, 41, 42, 0.98);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    overflow: hidden;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const MobileNavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 18px 20px;
  font-weight: 500;
  font-size: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background: rgba(255, 67, 67, 0.1);
    color: #ff4343;
    padding-left: 30px;
  }

  &:active {
    background: rgba(255, 67, 67, 0.2);
  }
`;

const MobileLogoutButton = styled.button`
  background: transparent;
  border: none;
  color: #ff4343;
  padding: 18px 20px;
  text-align: left;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background: rgba(255, 67, 67, 0.1);
    padding-left: 30px;
  }

  &:active {
    background: rgba(255, 67, 67, 0.2);
  }
`;

const MobileRegisterButton = styled(Link)`
  background: linear-gradient(135deg, #ff4343 0%, #f22f2f 100%);
  color: white;
  padding: 16px 20px;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  margin: 10px 20px 20px;
  border-radius: 10px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 4px 12px rgba(255, 67, 67, 0.3);

  &:hover {
    box-shadow: 0 6px 16px rgba(255, 67, 67, 0.4);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;