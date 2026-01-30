import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // In a real app, fetch user's orders from API
    const mockOrders = [
      {
        id: 1,
        date: '2024-12-10',
        items: 3,
        total: 78.50,
        status: 'Delivered',
      },
      {
        id: 2,
        date: '2024-12-08',
        items: 2,
        total: 45.00,
        status: 'Delivered',
      },
    ];
    setOrders(mockOrders);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Container>
      <Header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>My Profile</Title>
      </Header>

      <ContentWrapper>
        <ProfileCard
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ProfileHeader>
            <Avatar>{user?.name?.charAt(0).toUpperCase() || 'U'}</Avatar>
            <ProfileInfo>
              <UserName>{user?.name || 'User'}</UserName>
              <UserEmail>{user?.email || 'user@example.com'}</UserEmail>
              <UserBadge>{user?.role || 'Member'}</UserBadge>
            </ProfileInfo>
          </ProfileHeader>

          <ProfileStats>
            <StatCard>
              <StatValue>{orders.length}</StatValue>
              <StatLabel>Total Orders</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>
                ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
              </StatValue>
              <StatLabel>Total Spent</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>⭐ 4.8</StatValue>
              <StatLabel>Rating</StatLabel>
            </StatCard>
          </ProfileStats>

          <ActionButtons>
            <EditButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Edit Profile
            </EditButton>
            <LogoutButton
              onClick={handleLogout}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Logout
            </LogoutButton>
          </ActionButtons>
        </ProfileCard>

        <OrdersSection
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SectionTitle>Order History</SectionTitle>

          {orders.length === 0 ? (
            <EmptyOrders>
              <EmptyIcon>📦</EmptyIcon>
              <EmptyText>No orders yet</EmptyText>
              <EmptySubtext>Start ordering to see your history here</EmptySubtext>
            </EmptyOrders>
          ) : (
            <OrdersList>
              {orders.map((order, index) => (
                <OrderCard
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <OrderHeader>
                    <OrderId>Order #{order.id}</OrderId>
                    <OrderStatus status={order.status}>{order.status}</OrderStatus>
                  </OrderHeader>
                  <OrderDetails>
                    <OrderInfo>
                      <InfoLabel>Date:</InfoLabel>
                      <InfoValue>{new Date(order.date).toLocaleDateString()}</InfoValue>
                    </OrderInfo>
                    <OrderInfo>
                      <InfoLabel>Items:</InfoLabel>
                      <InfoValue>{order.items}</InfoValue>
                    </OrderInfo>
                    <OrderInfo>
                      <InfoLabel>Total:</InfoLabel>
                      <InfoValue>${order.total.toFixed(2)}</InfoValue>
                    </OrderInfo>
                  </OrderDetails>
                  <ViewButton>View Details →</ViewButton>
                </OrderCard>
              ))}
            </OrdersList>
          )}
        </OrdersSection>
      </ContentWrapper>
    </Container>
  );
};

export default Profile;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: calc(100vh - 200px);
`;

const Header = styled(motion.div)`
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 42px;
  background: linear-gradient(135deg, #ff4343 0%, #f22f2f 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 40px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const ProfileCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 30px;
  height: fit-content;
  position: sticky;
  top: 100px;

  @media (max-width: 968px) {
    position: static;
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #ff4343 0%, #f22f2f 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
`;

const UserName = styled.h2`
  font-size: 24px;
  color: white;
`;

const UserEmail = styled.p`
  font-size: 14px;
  color: #cccccc;
`;

const UserBadge = styled.span`
  display: inline-block;
  background: rgba(255, 67, 67, 0.2);
  color: #ff4343;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  width: fit-content;
`;

const ProfileStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 24px;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #ff4343;
  margin-bottom: 6px;
`;

const StatLabel = styled.div`
  font-size: 11px;
  color: #cccccc;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const EditButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 12px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: #ff4343;
    background: rgba(255, 67, 67, 0.1);
  }
`;

const LogoutButton = styled(motion.button)`
  background: transparent;
  border: 1px solid #ff4343;
  color: #ff4343;
  padding: 12px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #ff4343;
    color: white;
  }
`;

const OrdersSection = styled(motion.div)``;

const SectionTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 24px;
  color: white;
`;

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const OrderCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: rgba(255, 67, 67, 0.3);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const OrderId = styled.h3`
  font-size: 18px;
  color: white;
`;

const OrderStatus = styled.span`
  background: ${({ status }) =>
    status === 'Delivered' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255, 152, 0, 0.2)'};
  color: ${({ status }) => (status === 'Delivered' ? '#4CAF50' : '#FF9800')};
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`;

const OrderDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 16px;
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InfoLabel = styled.span`
  font-size: 12px;
  color: #888;
  text-transform: uppercase;
`;

const InfoValue = styled.span`
  font-size: 16px;
  color: white;
  font-weight: 600;
`;

const ViewButton = styled.div`
  color: #ff4343;
  font-weight: 600;
  font-size: 14px;
  text-align: right;
`;

const EmptyOrders = styled.div`
  text-align: center;
  padding: 80px 20px;
`;

const EmptyIcon = styled.div`
  font-size: 80px;
  margin-bottom: 20px;
`;

const EmptyText = styled.h3`
  font-size: 24px;
  margin-bottom: 10px;
  color: white;
`;

const EmptySubtext = styled.p`
  font-size: 16px;
  color: #cccccc;
`;