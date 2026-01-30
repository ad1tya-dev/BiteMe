import { createContext, useContext, useState, useEffect } from 'react';
import { getCart, addToCart as addToCartAPI, removeFromCart as removeFromCartAPI } from '../services/api';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await getCart();
      setCart(response.data);
    } catch (error) {
      console.error('Failed to fetch cart');
    }
  };

  const addToCart = async (food, quantity = 1) => {
    setLoading(true);
    try {
      const response = await addToCartAPI({ foodId: food.id, quantity });
      setCart(response.data);
      toast.success(`${food.name} added to cart!`);
    } catch (error) {
      toast.error('Failed to add to cart');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await removeFromCartAPI(id);
      setCart(cart.filter(item => item.id !== id));
      toast.info('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.food.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getTotal, loading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);