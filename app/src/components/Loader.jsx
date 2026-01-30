import styled from 'styled-components';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <LoaderContainer>
      <motion.div
        className="loader"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <motion.div
          className="inner-circle"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Loading delicious food...
      </motion.p>
    </LoaderContainer>
  );
};

export default Loader;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 20px;

  .loader {
    width: 80px;
    height: 80px;
    border: 4px solid rgba(255, 67, 67, 0.2);
    border-top: 4px solid #ff4343;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .inner-circle {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #ff4343 0%, #f22f2f 100%);
    border-radius: 50%;
  }

  p {
    font-size: 16px;
    color: #ffffff;
    font-weight: 500;
  }
`;