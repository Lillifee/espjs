import styled, { css } from 'styled-components';

const activeMixin = css`
  background: ${(p) => p.theme.PrimarySubBackground};
  color: ${(p) => p.theme.PrimarySubForeground};
  fill: ${(p) => p.theme.PrimarySubForeground};
`;

export const Button = styled.button`
  outline: 0;
  border: 1px solid;
  border-color: ${(p) => p.theme.PrimarySubBackground};
  background: ${(p) => p.theme.Background};
  color: ${(p) => p.theme.Foreground};
  fill: ${(p) => p.theme.Foreground};
  padding: 5em;
  padding-top: 0.7em;
  padding-bottom: 0.5em;
  cursor: pointer;

  :hover {
    background: ${(p) => p.theme.HighlightBackground};
    color: ${(p) => p.theme.HighlightForeground};
    fill: ${(p) => p.theme.HighlightForeground};
  }

  &.active,
  :active {
    ${activeMixin}
  }

  :disabled {
    cursor: default;
    visibility: hidden;
    opacity: 0.8;
    background: ${(p) => p.theme.Background};
    color: ${(p) => p.theme.Foreground};
    fill: ${(p) => p.theme.Foreground};
  }
`;
