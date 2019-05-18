import styled from 'styled-components';

const Input = styled.input`
  background-color: white;
  border: none;
  padding: 1rem;
  font-size: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-left: ${({ variant }) => (variant === 'inline' ? '0.5rem' : 'auto')}
  margin-right: ${({ variant }) => (variant === 'inline' ? '0.5rem' : 'auto')}
  display: ${({ variant }) => (variant === 'inline' ? 'inline-block' : 'block')}
`;

export default Input;
