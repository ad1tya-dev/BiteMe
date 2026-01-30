import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { registerSchema } from '../utils/validation';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    const { confirmPassword, ...userData } = values;
    const success = await register(userData);
    setSubmitting(false);
    if (success) {
      navigate('/');
    }
  };

  return (
    <Container>
      <FormContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Join Food Zone!</Title>
        <Subtitle>Create your account to get started</Subtitle>

        <Formik
          initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <StyledForm>
              <FormGroup>
                <Label>Full Name</Label>
                <StyledField
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  className={errors.name && touched.name ? 'error' : ''}
                />
                {errors.name && touched.name && (
                  <ErrorMessage>{errors.name}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label>Email Address</Label>
                <StyledField
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className={errors.email && touched.email ? 'error' : ''}
                />
                {errors.email && touched.email && (
                  <ErrorMessage>{errors.email}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label>Password</Label>
                <PasswordWrapper>
                  <StyledField
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Create a password"
                    className={errors.password && touched.password ? 'error' : ''}
                  />
                  <TogglePassword onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </TogglePassword>
                </PasswordWrapper>
                {errors.password && touched.password && (
                  <ErrorMessage>{errors.password}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label>Confirm Password</Label>
                <PasswordWrapper>
                  <StyledField
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    className={errors.confirmPassword && touched.confirmPassword ? 'error' : ''}
                  />
                  <TogglePassword onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </TogglePassword>
                </PasswordWrapper>
                {errors.confirmPassword && touched.confirmPassword && (
                  <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
                )}
              </FormGroup>

              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating Account...' : 'Register'}
              </SubmitButton>

              <LoginLink>
                Already have an account? <Link to="/login">Login here</Link>
              </LoginLink>
            </StyledForm>
          )}
        </Formik>
      </FormContainer>
    </Container>
  );
};

export default Register;

// Reuse styled components from Login.jsx
const Container = styled.div`
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`;

const FormContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 10px;
  text-align: center;
  background: linear-gradient(135deg, #ff4343 0%, #f22f2f 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #cccccc;
  margin-bottom: 30px;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
`;

const StyledField = styled(Field)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 12px 16px;
  color: white;
  font-size: 16px;
  transition: all 0.3s;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: #ff4343;
    background: rgba(255, 255, 255, 0.08);
  }

  &.error {
    border-color: #ff4343;
  }
`;

const PasswordWrapper = styled.div`
  position: relative;
`;

const TogglePassword = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;

const ErrorMessage = styled.div`
  color: #ff4343;
  font-size: 12px;
  margin-top: 4px;
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #ff4343 0%, #f22f2f 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 67, 67, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LoginLink = styled.p`
  text-align: center;
  color: #cccccc;
  font-size: 14px;

  a {
    color: #ff4343;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;