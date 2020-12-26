import styled from 'styled-components';

export const CardContainer = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  user-select: none;
  min-height: 16em;
  &:hover {
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.12), 0 5px 5px rgba(0, 0, 0, 0.22);
  }
`;

export const Card = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.Background};
  color: ${(props) => props.theme.Foreground};
`;

export const CardInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0.5em 0.8em;
`;

export const CardInfoContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 4em;
`;

export const CardInfoContentStretch = styled(CardInfoContent)`
  justify-content: stretch;
  align-items: stretch;
`;

export const CardOverlay = styled.div`
  display: flex;
  flex-direction: column;

  z-index: 10;
`;

export const CardFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 0.8em;

  background: ${(props) => props.theme.SubBackground};
  color: ${(props) => props.theme.Foreground};
`;

export const CardFooterPanel = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 0.7em;
`;

export interface CardSettingsProps {
  expanded: boolean;
}

export const CardSetting = styled.div<CardSettingsProps>`
  display: flex;
  flex-direction: column;
  visibility: ${({ expanded }) => (expanded ? 'visible' : 'hidden')};
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.2);
  margin-top: 3em;
`;

export const CardSettingPanel = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.8em;
  margin-top: 1em;
`;

export const CardInfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: row;
  grid-gap: 0.1em;
  align-items: center;
  flex: 1;
`;

export const CardInfoState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;
