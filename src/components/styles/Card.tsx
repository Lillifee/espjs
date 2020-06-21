import styled from 'styled-components';
import { Label } from './Label';
import { PanelC } from './Panel';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  user-select: none;

  &:hover {
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.12), 0 5px 5px rgba(0, 0, 0, 0.22);
  }
`;

export const CardTitle = styled.div`
  font-size: 1em;
  margin: 0.8em;
`;

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.Background};
  color: ${(props) => props.theme.Foreground};
  padding: 0.5em 0.8em;
`;

export const CardFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 0.8em;
`;

export const CardSetting = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.8em;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CardSubInfo = styled(Label)`
  align-self: flex-end;
`;

export const CardFooterPanel = styled(PanelC)`
  flex: 1;
  margin: 0 0.7em;
`;
