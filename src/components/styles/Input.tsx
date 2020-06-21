import styled from 'styled-components';

export const Input = styled.input`
  border: 0;
  outline: 0;
  border-bottom: 1px solid;
  border-color: ${(props) => props.theme.SubBorder};
  margin-bottom: 1em;
  margin-top: 0.2em;
`;
