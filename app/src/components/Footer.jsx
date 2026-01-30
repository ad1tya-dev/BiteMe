import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <FooterContent>
          <FooterSection>
            <h3>Food Zone</h3>
            <p>Delivering happiness through delicious food.</p>
          </FooterSection>
          
          <FooterSection>
            <h4>Quick Links</h4>
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/menu">Menu</FooterLink>
            <FooterLink href="/cart">Cart</FooterLink>
          </FooterSection>
          
          <FooterSection>
            <h4>Contact</h4>
            <p>Email: info@foodzone.com</p>
            <p>Phone: +1 234 567 890</p>
          </FooterSection>
          
          <FooterSection>
            <h4>Follow Us</h4>
            <SocialLinks>
              <SocialLink href="#" aria-label="Facebook">📘</SocialLink>
              <SocialLink href="#" aria-label="Instagram">📷</SocialLink>
              <SocialLink href="#" aria-label="Twitter">🐦</SocialLink>
            </SocialLinks>
          </FooterSection>
        </FooterContent>
        
        <Copyright>
          <p>© 2024 Food Zone. All rights reserved.</p>
          <p>Made with ❤️ by Your Name</p>
        </Copyright>
      </Container>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  background: #1a1a1a;
  color: white;
  margin-top: 80px;
  padding: 40px 0 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const FooterSection = styled.div`
  h3, h4 {
    margin-bottom: 15px;
    color: #ff4343;
  }

  p {
    margin: 8px 0;
    color: #cccccc;
    font-size: 14px;
  }
`;

const FooterLink = styled.a`
  display: block;
  color: #cccccc;
  text-decoration: none;
  margin: 8px 0;
  transition: color 0.3s;

  &:hover {
    color: #ff4343;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
`;

const SocialLink = styled.a`
  font-size: 24px;
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  p {
    margin: 5px 0;
    color: #888;
    font-size: 14px;
  }
`;