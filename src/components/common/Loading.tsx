import styled from 'styled-components';

export const Loading = styled.div`
  color: ${({ theme }) => theme.PrimaryBackground};
  margin: auto;
  position: relative;
  transform: translateZ(0);
  background: ${({ theme }) => theme.PrimaryBackground};
  animation: loading 1s infinite ease-in-out;
  width: 1em;
  height: 4em;
  animation-delay: -0.16s;

  :before,
  :after {
    background: ${({ theme }) => theme.PrimaryBackground};
    animation: loading 1s infinite ease-in-out;
    width: 1em;
    height: 4em;
    position: absolute;
    top: 0;
    content: '';
  }

  :before {
    left: -1.5em;
    animation-delay: -0.32s;
  }

  :after {
    left: 1.5em;
  }

  @-webkit-keyframes loading {
    0%,
    80%,
    100% {
      height: 4em;
    }
    40% {
      height: 5em;
    }
  }
  @keyframes loading {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: 4em;
    }
    40% {
      box-shadow: 0 -2em;
      height: 5em;
    }
  }
`;
