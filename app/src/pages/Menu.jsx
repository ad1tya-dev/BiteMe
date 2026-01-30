import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { getFoods } from '../services/api';
import FoodCard from '../components/FoodCard';

import { toast } from 'react-toastify';
import Loader from '../components/Loader';


const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const response = await getFoods();
      setFoods(response.data);
      setFilteredFoods(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch foods');
      toast.error('Failed to load foods');
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterFoods(selectedCategory, query);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterFoods(category, searchQuery);
  };

  const filterFoods = (category, query) => {
    let filtered = foods;

    if (category !== 'all') {
      filtered = filtered.filter(food => food.type === category);
    }

    if (query) {
      filtered = filtered.filter(food =>
        food.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredFoods(filtered);
  };

  const categories = [
    { name: 'All', value: 'all' },
    { name: 'Breakfast', value: 'breakfast' },
    { name: 'Lunch', value: 'lunch' },
    { name: 'Dinner', value: 'dinner' },
  ];

  if (loading) return <Loader />;

  return (
    <Container>
      <Header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Our Menu</Title>
        <Subtitle>Explore our delicious selection of meals</Subtitle>
      </Header>

      <FilterSection>
        <SearchBar
          type="text"
          placeholder="🔍 Search for your favorite food..."
          value={searchQuery}
          onChange={handleSearch}
        />

        <CategoryButtons>
          {categories.map((category) => (
            <CategoryButton
              key={category.value}
              active={selectedCategory === category.value}
              onClick={() => handleCategoryChange(category.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </CategoryButton>
          ))}
        </CategoryButtons>
      </FilterSection>

      {filteredFoods.length === 0 ? (
        <EmptyState>
          <EmptyIcon>🍽️</EmptyIcon>
          <EmptyText>No items found</EmptyText>
          <EmptySubtext>Try adjusting your filters or search</EmptySubtext>
        </EmptyState>
      ) : (
        <FoodGrid>
          {filteredFoods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </FoodGrid>
      )}
    </Container>
  );
};

export default Menu;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: calc(100vh - 200px);
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 10px;
  background: linear-gradient(135deg, #ff4343 0%, #f22f2f 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #cccccc;
`;

const FilterSection = styled.div`
  margin-bottom: 40px;
`;

const SearchBar = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 16px 20px;
  color: white;
  font-size: 16px;
  margin-bottom: 20px;
  transition: all 0.3s;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: #ff4343;
    background: rgba(255, 255, 255, 0.08);
  }
`;

const CategoryButtons = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
`;

const CategoryButton = styled(motion.button)`
  background: ${({ active }) => 
    active ? 'linear-gradient(135deg, #ff4343 0%, #f22f2f 100%)' : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${({ active }) => (active ? '#ff4343' : 'rgba(255, 255, 255, 0.2)')};
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: #ff4343;
    background: ${({ active }) => 
      active ? 'linear-gradient(135deg, #ff4343 0%, #f22f2f 100%)' : 'rgba(255, 67, 67, 0.1)'};
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

const EmptyState = styled.div`
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