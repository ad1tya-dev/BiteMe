import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { getFoods } from '../services/api';
import FoodCard from '../components/FoodCard';
import Loader from '../components/Loader';

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const response = await getFoods();
      setFoods(response.data.slice(0, 3)); // Show only 3 items on home
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch foods');
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <Container>
      <HeroSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <HeroContent>
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Welcome to <Highlight>Food Zone</Highlight>
          </motion.h1>
          <motion.p
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Discover delicious meals delivered right to your doorstep
          </motion.p>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <HeroButton to="/menu">Explore Menu</HeroButton>
          </motion.div>
        </HeroContent>

        <HeroImage
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.div
            animate={{ 
              y: [0, -20, 0],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🍔
          </motion.div>
        </HeroImage>
      </HeroSection>

      <FeaturesSection>
        <SectionTitle>Why Choose Us?</SectionTitle>
        <FeaturesGrid>
          <FeatureCard
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <FeatureIcon>🚀</FeatureIcon>
            <FeatureTitle>Fast Delivery</FeatureTitle>
            <FeatureText>Get your food delivered in 30 minutes or less</FeatureText>
          </FeatureCard>

          <FeatureCard
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <FeatureIcon>🌟</FeatureIcon>
            <FeatureTitle>Quality Food</FeatureTitle>
            <FeatureText>Fresh ingredients and authentic recipes</FeatureText>
          </FeatureCard>

          <FeatureCard
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <FeatureIcon>💰</FeatureIcon>
            <FeatureTitle>Best Prices</FeatureTitle>
            <FeatureText>Affordable prices with amazing taste</FeatureText>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      <PopularSection>
        <SectionHeader>
          <SectionTitle>Popular Dishes</SectionTitle>
          <ViewAllLink to="/menu">View All →</ViewAllLink>
        </SectionHeader>
        <FoodGrid>
          {foods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </FoodGrid>
      </PopularSection>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const HeroSection = styled(motion.section)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  min-height: 500px;
  padding: 60px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  h1 {
    font-size: 56px;
    margin-bottom: 20px;
    line-height: 1.2;

    @media (max-width: 768px) {
      font-size: 40px;
    }
  }

  p {
    font-size: 18px;
    color: #cccccc;
    margin-bottom: 30px;
    line-height: 1.6;
  }
`;

const Highlight = styled.span`
  background: linear-gradient(135deg, #ff4343 0%, #f22f2f 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const HeroButton = styled(Link)`
  display: inline-block;
  background: linear-gradient(135deg, #ff4343 0%, #f22f2f 100%);
  color: white;
  padding: 16px 40px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  font-size: 18px;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(255, 67, 67, 0.4);
  }
`;

const HeroImage = styled(motion.div)`
  font-size: 200px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 150px;
  }
`;

const FeaturesSection = styled.section`
  padding: 80px 0;
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  text-align: center;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px;
  text-align: center;
`;

const FeatureIcon = styled.div`
  font-size: 60px;
  margin-bottom: 20px;
`;

const FeatureTitle = styled.h3`
  font-size: 22px;
  margin-bottom: 12px;
  color: white;
`;

const FeatureText = styled.p`
  font-size: 14px;
  color: #cccccc;
  line-height: 1.6;
`;

const PopularSection = styled.section`
  padding: 80px 0;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const ViewAllLink = styled(Link)`
  color: #ff4343;
  text-decoration: none;
  font-weight: 600;
  font-size: 18px;
  transition: transform 0.3s;

  &:hover {
    transform: translateX(5px);
  }
`;

const FoodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;