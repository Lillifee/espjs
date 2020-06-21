import styled from 'styled-components';

export interface LabelProps {
  skeleton?: boolean;
}

export const SkeletonLine = styled.div`
  /* font-size: 1em; */
  /* height: 1em; */
  background: ${({ theme }) => theme.HighlightBackground};
  width: 7em;

  &::before {
    content: ' ';
    white-space: pre;
  }
`;

export const Label = styled.div<LabelProps>`
  /* height: 1em; */
  font-size: 1em;
  margin: 0.2em 0;
`;

export const LabelXS = styled(Label)`
  font-size: 0.7em;
  margin: 0.2em 0;
`;

export const LabelS = styled(Label)`
  font-size: 0.8em;
  margin: 0.2em 0;
`;

export const LabelL = styled(Label)`
  font-size: 2em;
  margin: 0.2em 0;
`;

export const LabelXL = styled(Label)`
  font-size: 3em;
  font-weight: lighter;
  margin: 0.1em 0;
`;

export const SubLabel = styled(Label)`
  color: ${(props) => props.theme.SubForeground};
`;

export const SubLabelXS = styled(LabelXS)`
  color: ${(props) => props.theme.SubForeground};
`;

export const SubLabelS = styled(LabelS)`
  color: ${(props) => props.theme.SubForeground};
`;
