import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { BASE_URL } from '../services/api';

const FoodCard = ({ food }) => {
  const { addToCart, loading } = useCart();

  return (
    <Card
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <ImageSection>
        <FoodImage src={`${BASE_URL}${food.image}`} alt={food.name} />
        <Badge>{food.type}</Badge>
        <Rating>⭐ {food.rating}</Rating>
      </ImageSection>

      <InfoSection>
        <FoodName>{food.name}</FoodName>
        <Description>{food.text}</Description>
        
        <Details>
          <Calories>🔥 {food.calories} cal</Calories>
        </Details>

        <BottomSection>
          <Price>${food.price.toFixed(2)}</Price>
          <AddButton
            onClick={() => addToCart(food)}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? '...' : 'Add to Cart'}
          </AddButton>
        </BottomSection>
      </InfoSection>
    </Card>
  );
};

export default FoodCard;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    border-color: rgba(255, 67, 67, 0.5);
    box-shadow: 0 8px 32px rgba(255, 67, 67, 0.2);
  }
`;

const ImageSection = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(255, 67, 67, 0.1) 0%, rgba(242, 47, 47, 0.1) 100%);
`;

const FoodImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;

  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(255, 67, 67, 0.9);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
`;

const Rating = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
`;

const InfoSection = styled.div`
  padding: 20px;
`;

const FoodName = styled.h3`
  font-size: 20px;
  margin-bottom: 8px;
  color: white;
`;

const Description = styled.p`
  font-size: 13px;
  color: #cccccc;
  margin-bottom: 12px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Details = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`;

const Calories = styled.span`
  font-size: 13px;
  color: #ff9800;
  font-weight: 500;
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Price = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #ff4343;
`;

const AddButton = styled(motion.button)`
  background: linear-gradient(135deg, #ff4343 0%, #f22f2f 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;