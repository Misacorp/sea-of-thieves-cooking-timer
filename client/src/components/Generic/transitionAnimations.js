import { keyframes } from 'styled-components';

export const slideInLeft = keyframes`
  from {
    transform: translateX(-100%);
    visibility: visible;
  }

  to {
    transform: translateX(0);
  }
`;

export const slideOutLeft = keyframes`
  from {
    transform: translateX(0);
  }

  to {
    visibility: hidden;
    transform: translateX(-100%);
  }
`;

export const slideInRight = keyframes`
  from {
    transform: translateX(100%);
    visibility: visible;
  }

  to {
    transform: translateX(0);
  }
`;

export const slideOutRight = keyframes`
  from {
    transform: translateX(0);
  }

  to {
    visibility: hidden;
    transform: translateX(100%);
  }
`;

export const slideInUp = keyframes`
  from {
    transform: translateY(-100%);
    visibility: visible;
  }

  to {
    transform: translateY(0);
  }
`;

export const slideOutUp = keyframes`
  from {
    transform: translateY(0);
  }

  to {
    visibility: hidden;
    transform: translateY(-100%);
  }
`;
