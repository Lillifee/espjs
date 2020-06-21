import * as React from 'react';
import styled from 'styled-components';
import { PageLimiter } from './styles';
import { Wifi } from './wifi/Wifi';

const Wrapper = styled.section`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1.5em;
  padding: 1.5em;
`;

export const Main: React.FC = () => (
  <Wrapper>
    <PageLimiter>
      <Grid>
        <Wifi />
        {/* <Network/> */}
      </Grid>
    </PageLimiter>
  </Wrapper>
);
