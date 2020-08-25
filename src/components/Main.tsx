import * as React from 'react';
import styled from 'styled-components';
import { PageLimiter } from './styles';
import { Wifi } from './widgets/Wifi';
import { Network } from './widgets/Network';
import { Update } from './widgets/Update';
import { Esp } from './widgets/Esp';
import { Mpu } from './widgets/Mpu';
import { Co2 } from './widgets/Co2';
import { Bme } from './widgets/Bme';
import { Bsec } from './widgets/Bsec';
import { Waveshare } from './widgets/Waveshare';

const Wrapper = styled.section`
  flex: 1;
  display: flex;
  justify-content: center;
  background: #2c2c2c;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 0.8em;
  padding: 0.8em;
`;

export const Main: React.FC = () => (
  <Wrapper>
    <PageLimiter>
      <Grid>
        {/* <Mpu /> */}
        {/* <Co2 /> */}
        {/* <Bsec /> */}
        {/* <Bme /> */}
        <Waveshare />
        <Wifi />
        <Network />
        <Esp />
        <Update />
      </Grid>
    </PageLimiter>
  </Wrapper>
);
