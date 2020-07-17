import * as React from 'react';
import styled from 'styled-components';
import { Label, LabelProps } from '.';

export const Input = styled.input<LabelProps>`
  border: 0;
  outline: 0;
  border-bottom: 1px solid;
  border-color: ${(props) => props.theme.SubBorder};
  color: ${(props) => props.theme.Foreground};
  background: transparent;
  margin-bottom: 1em;
  margin-top: 0.2em;
  font-size: ${({ fontSize, theme }) => theme.FontSize[fontSize || 'm']};

  :disabled {
    opacity: 0.5;
  }
`;

const RadioWrapper = styled.div`
  display: inline-block;
  color: ${(props) => props.theme.Foreground};
  margin-bottom: 0.7em;
`;

const RadioMark = styled.span`
  display: inline-block;
  position: relative;
  border: 1px solid ${(props) => props.theme.Foreground};
  width: 14px;
  height: 14px;
  left: 0;
  border-radius: 50%;
  margin-right: 5px;
  vertical-align: middle;
  &::after {
    content: '';
    position: absolute;

    display: block;
    opacity: 0;
    background-color: ${(props) => props.theme.PrimarySubBackground};
    left: 2px;
    top: 2px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
`;

const RadioElement = styled.input`
  position: absolute;
  opacity: hidden;
  display: none;
  &:checked + ${RadioMark} {
    &::after {
      opacity: 1;
    }
  }
`;

const RadioLabel = styled(Label)`
  display: flex;
  align-items: center;
  margin: 0;
  position: relative;
  cursor: pointer;
`;

const RadioContent = styled.div`
  margin-top: 0.1em;
`;

export type RadioProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Radio: React.FC<RadioProps> = ({ children, ...rest }) => (
  <RadioWrapper>
    <RadioLabel fontSize="s">
      <RadioElement type="radio" {...rest} />
      <RadioMark />
      <RadioContent>{children}</RadioContent>
    </RadioLabel>
  </RadioWrapper>
);
