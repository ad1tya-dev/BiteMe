import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartItem from '../components/CartItem';
import { createOrder } from '../services/api';
import { toast } from 'react-toastify';
import { sendOrderConfirmationEmail } from '../services/emailService';
const Cart = () => {
  const { cart, getTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const total = getTotal();
  const tax = total * 0.1; // 10% tax
  const deliveryFee = cart.length > 0 ? 5 : 0;
  const grandTotal = total + tax + deliveryFee;

  const handleCheckout = async () => {
  if (!user) {
    toast.info('Please login to checkout');
    navigate('/login');
    return;
  }

  setIsProcessing(true);

  try {
    const orderData = {
      items: cart.map(item => ({
        foodId: item.food.id,
        name: item.food.name,
        quantity: item.quantity,
        price: item.food.price,
      })),
      total: grandTotal,
      userEmail: user.email,
    };

    const order = await createOrder(orderData);
    
    // Send confirmation email
    await sendOrderConfirmationEmail({
      ...orderData,
      id: order.data.id,
    });
    
    toast.success(`✅ Order confirmed! Confirmation email sent to ${user.email}`);
    clearCart();
    navigate('/profile');

  } catch (error) {
    toast.error('Failed to place order. Please try again.');
  } finally {
    setIsProcessing(false);
  }
};
//   const handleCheckout = async () => {
//     if (!user) {
//       toast.info('Please login to checkout');
//       navigate('/login');
//       return;
//     }

//     setIsProcessing(true);

//     try {
//       const orderData = {
//         items: cart.map(item => ({
//           foodId: item.food.id,
//           name: item.food.name,
//           quantity: item.quantity,
//           price: item.food.price,
//         })),
//         total: grandTotal,
//         userEmail: user.email,
//       };

//       await createOrder(orderData);
      
//       // Simulate email sending
//       setTimeout(() => {
//         toast.success(`✅ Order confirmed! Confirmation email sent to ${user.email}`);
//         clearCart();
//         navigate('/profile');
//       }, 1500);

//     } catch (error) {
//       toast.error('Failed to place order. Please try again.');
//     } finally {
//       setIsProcessing(false);
//     }
//   };

  if (cart.length === 0) {
    return (
      <Container>
        <EmptyCart
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <EmptyIcon>🛒</EmptyIcon>
          <EmptyTitle>Your cart is empty</EmptyTitle>
          <EmptyText>Add some delicious items to get started!</EmptyText>
          <ShopButton
            onClick={() => navigate('/menu')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Browse Menu
          </ShopButton>
        </EmptyCart>
      </Container>
    );
  }

  return (
    <Container>
      <Header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Shopping Cart</Title>
        <ItemCount>{cart.length} {cart.length === 1 ? 'item' : 'items'}</ItemCount>
      </Header>

      <ContentWrapper>
        <CartSection>
          <AnimatePresence>
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </CartSection>

        <SummarySection
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SummaryTitle>Order Summary</SummaryTitle>

          <SummaryRow>
            <Label>Subtotal:</Label>
            <Value>${total.toFixed(2)}</Value>
          </SummaryRow>

          <SummaryRow>
            <Label>Tax (10%):</Label>
            <Value>${tax.toFixed(2)}</Value>
          </SummaryRow>

          <SummaryRow>
            <Label>Delivery Fee:</Label>
            <Value>${deliveryFee.toFixed(2)}</Value>
          </SummaryRow>

          <Divider />

          <SummaryRow className="total">
            <Label>Total:</Label>
            <TotalValue>${grandTotal.toFixed(2)}</TotalValue>
          </SummaryRow>

          <CheckoutButton
            onClick={handleCheckout}
            disabled={isProcessing}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isProcessing ? (
              <ButtonLoader>Processing...</ButtonLoader>
            ) : (
              <>
                <span>Proceed to Checkout</span>
                <span>→</span>
              </>
            )}
          </CheckoutButton>

          <SecurityNote>
            🔒 Secure checkout powered by Food Zone
          </SecurityNote>
        </SummarySection>
      </ContentWrapper>
    </Container>
  );
};

export default Cart;

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
  margin-bottom: 8px;
  background: linear-gradient(135deg, #ff4343 0%, #f22f2f 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const ItemCount = styled.p`
  font-size: 16px;
  color: #cccccc;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const CartSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SummarySection = styled(motion.div)`
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

const SummaryTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 24px;
  color: white;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  &.total {
    margin-top: 16px;
    margin-bottom: 24px;
  }
`;

const Label = styled.span`
  font-size: 16px;
  color: #cccccc;
`;

const Value = styled.span`
  font-size: 16px;
  color: white;
  font-weight: 500;
`;

const TotalValue = styled.span`
  font-size: 28px;
  color: #ff4343;
  font-weight: 700;
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 20px 0;
`;

const CheckoutButton = styled(motion.button)`
  width: 100%;
  background: linear-gradient(135deg, #ff4343 0%, #f22f2f 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ButtonLoader = styled.span`
  width: 100%;
  text-align: center;
`;

const SecurityNote = styled.p`
  text-align: center;
  font-size: 13px;
  color: #888;
`;

const EmptyCart = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  text-align: center;
`;

const EmptyIcon = styled.div`
  font-size: 100px;
  margin-bottom: 24px;
`;

const EmptyTitle = styled.h2`
  font-size: 32px;
  margin-bottom: 12px;
  color: white;
`;

const EmptyText = styled.p`
  font-size: 18px;
  color: #cccccc;
  margin-bottom: 32px;
`;

const ShopButton = styled(motion.button)`
  background: linear-gradient(135deg, #ff4343 0%, #f22f2f 100%);
  color: white;
  border: none;
  border-radius: 30px;
  padding: 16px 40px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
`;