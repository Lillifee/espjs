import styled from 'styled-components';

export const Button = styled.button`
  outline: 0;
  border: 1px solid;
  border-color: ${(props) => props.theme.PrimaryBackground};
  background: ${(props) => props.theme.Background};
  color: ${(props) => props.theme.Foreground};
  fill: ${(props) => props.theme.Foreground};
  padding: 5em;
  padding-top: 0.7em;
  padding-bottom: 0.5em;
  cursor: pointer;

  :hover {
    background: ${(props) => props.theme.HighlightBackground};
    color: ${(props) => props.theme.HighlightForeground};
    fill: ${(props) => props.theme.HighlightForeground};
  }
  :active {
    background: ${(props) => props.theme.PrimarySubBackground};
    color: ${(props) => props.theme.PrimaryForeground};
    fill: ${(props) => props.theme.PrimaryForeground};
  }
  :disabled {
    cursor: default;
    visibility: hidden;
    opacity: 0.8;
    background: ${(props) => props.theme.Background};
    color: ${(props) => props.theme.Foreground};
    fill: ${(props) => props.theme.Foreground};
  }
`;
