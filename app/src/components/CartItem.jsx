import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { BASE_URL } from '../services/api';

const CartItem = ({ item }) => {
  const { removeFromCart } = useCart();

  return (
    <Item
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <ItemImage src={`${BASE_URL}${item.food.image}`} alt={item.food.name} />
      
      <ItemDetails>
        <ItemName>{item.food.name}</ItemName>
        <ItemType>{item.food.type}</ItemType>
      </ItemDetails>

      <ItemQuantity>
        <QuantityLabel>Qty:</QuantityLabel>
        <QuantityValue>{item.quantity}</QuantityValue>
      </ItemQuantity>

      <ItemPrice>${(item.food.price * item.quantity).toFixed(2)}</ItemPrice>

      <RemoveButton
        onClick={() => removeFromCart(item.id)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        🗑️
      </RemoveButton>
    </Item>
  );
};

export default CartItem;

const Item = styled(motion.div)`
  display: grid;
  grid-template-columns: 80px 1fr auto auto auto;
  gap: 20px;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s;

  &:hover {
    border-color: rgba(255, 67, 67, 0.3);
  }

  @media (max-width: 768px) {
    grid-template-columns: 60px 1fr;
    gap: 12px;
  }
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ItemName = styled.h4`
  font-size: 18px;
  color: white;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ItemType = styled.span`
  font-size: 13px;
  color: #ff4343;
  text-transform: capitalize;
`;

const ItemQuantity = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    grid-column: 1 / -1;
    justify-content: flex-start;
    margin-left: 72px;
  }
`;

const QuantityLabel = styled.span`
  font-size: 14px;
  color: #cccccc;
`;

const QuantityValue = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: white;
`;

const ItemPrice = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #ff4343;

  @media (max-width: 768px) {
    grid-column: 2;
    grid-row: 1;
    text-align: right;
  }
`;

const RemoveButton = styled(motion.button)`
  background: rgba(255, 67, 67, 0.1);
  border: 1px solid rgba(255, 67, 67, 0.3);
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: rgba(255, 67, 67, 0.2);
    border-color: #ff4343;
  }

  @media (max-width: 768px) {
    grid-column: 2;
    grid-row: 2;
    justify-self: end;
  }
`;