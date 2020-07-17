import * as React from 'react';
import styled from 'styled-components';
import { Label } from '.';

export const Slider = styled.input`
  flex: 1;
  appearance: none;
  outline: none;

  border-radius: 10px;
  margin: 1em 0.5em;
  height: 1em;
  background: ${(props) => props.theme.SelectedBackground};

  ::-webkit-slider-thumb {
    cursor: pointer;
    appearance: none;
    width: 25px;
    height: 25px;
    background: ${(props) => props.theme.PrimarySubBackground};
    border-radius: 15px;
  }
`;

export type SliderValueProps = React.InputHTMLAttributes<HTMLInputElement>;

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SliderLabel = styled(Label)`
  display: flex;
  flex-basis: 2em;

  background: ${(props) => props.theme.PrimarySubBackground};
  color: ${(props) => props.theme.PrimarySubForeground};
  border-radius: 20px;

  padding: 0.6em 0.2em;

  justify-content: center;
  align-items: center;
`;

export const SliderValue: React.FC<SliderValueProps> = ({ ...rest }) => (
  <SliderWrapper>
    <Slider type="range" {...rest} />
    <SliderLabel fontSize="s">{rest.value}</SliderLabel>
  </SliderWrapper>
);
