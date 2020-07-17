import styled from 'styled-components';

export interface LabelProps {
  fontSize?: 'xs' | 's' | 'm' | 'l' | 'xl';
}

export const SkeletonLine = styled.div`
  background-image: ${({ theme }) =>
    `linear-gradient(90deg, ${theme.HighlightBackground} 0px, ${theme.Background} 40px, ${theme.HighlightBackground} 80px)`};

  border-radius: 3px;
  background-size: 200%;
  animation: gradient 2s ease infinite, fadein 1s ease;
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

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Label = styled.label<LabelProps>`
  color: ${(p) => p.theme.Foreground};
  font-size: ${({ fontSize, theme }) => theme.FontSize[fontSize || 'm']};
  margin: 0.2em 0;
`;

export const SubLabel = styled(Label)`
  color: ${(props) => props.theme.SubForeground};
`;

export const Space = styled.div`
  margin-bottom: 1em;
`;
