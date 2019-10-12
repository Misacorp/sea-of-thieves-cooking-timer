import styled from 'styled-components';

const InputBottomBorder = styled.div`
  input + &::before,
  input + &::after {
    content: '';
    display: block;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.palette.yellow[300]};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

  input + &::before {
    height: 2px;
    opacity: 0.5;
  }

  input + &::after {
    content: '';
    position: absolute;
    left: -2px;
    right: -2px;
    bottom: 0;
    height: 3px;
    opacity: 1;
    background-color: ${({ theme }) => theme.palette.yellow[300]};

    transform: scaleX(0);
    transition-property: transform;
    transition-duration: ${({ theme }) => theme.transition.duration};
    transition-timing-function: ${({ theme }) =>
      theme.transition.timingFunction};
    transform-origin: center;
  }

  input:focus + &::after {
    transform: scaleX(1);
  }
`;

export default InputBottomBorder;
