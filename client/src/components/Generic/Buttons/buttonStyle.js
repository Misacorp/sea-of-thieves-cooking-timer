import { css, keyframes } from 'styled-components';

const spring = keyframes`
  0% {
    transform: scale(1);
    animation-timing-function: cubic-bezier(.4,0,.4,1);
  }
  
  50% {
    transform: scale(1.15, 0.75) translateY(0.5rem);
    animation-timing-function: cubic-bezier(0.4,0,.4,1);
  }

  100% {
    transform: scale(1) translateY(0);
  }
`;

export default css`
  box-sizing: border-box;
  display: ${({ variant }) =>
    variant === 'inline' ? 'inline-block' : 'block'};
  margin-left: ${({ variant }) => (variant === 'inline' ? '0.5rem' : 'auto')};
  margin-right: ${({ variant }) => (variant === 'inline' ? '0.5rem' : 'auto')};
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 3rem;
  padding: 1rem 1rem 0.5rem 1rem;
  padding-top: 1.1rem;
  padding-right: ${({ padded }) => (padded ? '5rem' : '2rem')};
  padding-bottom: 0.5rem;
  padding-left: ${({ padded }) => (padded ? '5rem' : '2rem')};

  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.typography.base.fontFamily};
  font-weight: 700;
  font-size: 1.5rem;
  letter-spacing: 0.08em;
  line-height: 1em;
  transition-property: background-color border-color;
  transition-duration: ${({ theme }) => theme.transition.duration};
  transition-timing-function: ${({ theme }) => theme.transition.timingFunction};

  border-width: 4px;
  border-style: solid;
  border-color: ${({ theme }) => theme.palette.yellow[300]};

  background-color: ${({ theme }) => theme.palette.yellow[300]};
  color: ${({ theme }) => theme.palette.blue[700]};

  &:disabled {
    background-color: ${({ theme }) => theme.palette.disabled.main};
    pointer-events: none;
  }

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.palette.yellow[300]};
    border-color: ${({ theme }) => theme.palette.yellow[500]};
  }

  &:focus,
  &:active {
    animation-name: ${spring};
    animation-iteration-count: 1;
    animation-duration: 0.3s;
    animation-timing-function: ease-in;
    outline: none;
  }
`;
