import styled from 'styled-components';

export interface LabelProps {
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
}

export const SkeletonLine = styled.div`
  background-image: ${({ theme }) =>
    `linear-gradient(90deg, ${theme.HighlightBackground} 0px, ${theme.Background} 40px, ${theme.HighlightBackground} 80px)`};

  border-radius: 3px;
  background-size: 200%;
  animation: gradient 2s ease infinite;
  width: 6em;

  &::before {
    content: ' ';
    white-space: pre;
  }

  @keyframes gradient {
    0% {
      background-position: 100%;
    }
    40% {
      background-position: -100%;
    }
    100% {
      background-position: -100%;
    }
  }
`;

export const Label = styled.div<LabelProps>`
  font-size: ${({ size, theme }) => theme.FontSize[size || 'm']};
  margin: 0.2em 0;
`;

export const SubLabel = styled(Label)`
  color: ${(props) => props.theme.SubForeground};
`;
