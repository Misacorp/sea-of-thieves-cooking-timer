import styled from 'styled-components';

const SquareFlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > * {
    border: 1px solid #ededed;
    box-sizing: border-box;
    flex: 0 0 50%;

    ::before {
      content: '';
      display: table;
      padding-top: 100%;
    }
  }
`;

export default SquareFlexContainer;
