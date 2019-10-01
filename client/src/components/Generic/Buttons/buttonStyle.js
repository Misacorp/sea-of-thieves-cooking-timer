import { css } from 'styled-components';

export default css`
  display: ${({ variant }) =>
    variant === 'inline' ? 'inline-block' : 'block'};
  margin-left: ${({ variant }) => (variant === 'inline' ? '0.5rem' : 'auto')};
  margin-right: ${({ variant }) => (variant === 'inline' ? '0.5rem' : 'auto')};
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 1rem 1rem 0.5rem 1rem;
  border-radius: 3rem;

  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.5rem;
  letter-spacing: 0.08em;
  line-height: 1em;

  background-color: ${({ theme }) => theme.palette.yellow[300]};
  color: ${({ theme }) => theme.palette.blue[700]};

  &:disabled {
    background-color: ${({ theme }) => theme.palette.disabled.main};
    pointer-events: none;
  }
`;
