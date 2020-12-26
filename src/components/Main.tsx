import * as React from 'react';
import styled from 'styled-components';
import { PageLimiter } from './styles';
import { Wifi } from './widgets/Wifi';
import { Network } from './widgets/Network';
import { Update } from './widgets/Update';
import { Esp } from './widgets/Esp';
import { Mpu } from './widgets/Mpu';
import { Co2 } from './widgets/Co2';
import { Waveshare } from './widgets/Waveshare';
import { Knob } from './widgets/Knob';
import { useFetch } from './hooks';
import { Bsec } from './widgets/Bsec';
import { Led } from './widgets/Led';

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

export interface ApiApplication {
  application?: 'cube' | 'co2' | 'display' | 'knob' | 'aqiLed';
}

export const Main: React.FC = () => {
  const { state } = useFetch<ApiApplication>('/api/application', {});
  const application = state.data.application;

  return (
    <Wrapper>
      <PageLimiter>
        <Grid>
          {application === 'cube' && <Mpu />}
          {application === 'co2' && (
            <React.Fragment>
              <Co2 />
              <Bsec />
            </React.Fragment>
          )}
          {application === 'aqiLed' && (
            <React.Fragment>
              <Led />
              <Bsec />
            </React.Fragment>
          )}
          {application === 'display' && <Waveshare />}
          {application === 'knob' && <Knob />}
          {application && (
            <React.Fragment>
              <Wifi />
              <Network />
              <Esp />
              <Update />
            </React.Fragment>
          )}
        </Grid>
      </PageLimiter>
    </Wrapper>
  );
};
