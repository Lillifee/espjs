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
import { Loading } from './widgets/Loading';
import { SplitFlapText } from './widgets/SplitFlapText';

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

export type Application = 'cube' | 'co2' | 'display' | 'knob' | 'aqiLed' | 'splitFlap';

export interface ApiApplication {
  application?: Application;
}

export interface ApplicationSettings {
  mpu?: boolean;
  co2?: boolean;
  bsec?: boolean;
  led?: boolean;
  waveshare?: boolean;
  knob?: boolean;
  sleep?: boolean;
  splitFlapText?: boolean;
}

const applicationSettings: Record<Application, ApplicationSettings> = {
  cube: { sleep: true, mpu: true },
  co2: { co2: true, bsec: true },
  aqiLed: { led: true, bsec: true },
  display: { waveshare: true, sleep: true },
  knob: { knob: true, sleep: true },
  splitFlap: { splitFlapText: true },
};

export const Main: React.FC = () => {
  const [state] = useFetch<ApiApplication>('/api/application', {});
  const application = state.data.application;
  const settings = application ? applicationSettings[application] : undefined;

  return (
    <Wrapper>
      <PageLimiter>
        {settings ? (
          <Grid>
            {settings.mpu && <Mpu />}
            {settings.co2 && <Co2 />}
            {settings.led && <Led />}
            {settings.bsec && <Bsec />}
            {settings.waveshare && <Waveshare />}
            {settings.knob && <Knob />}
            {settings.splitFlapText && <SplitFlapText />}
            <Wifi />
            <Network />
            <Esp />
            <Update sleep={settings.sleep} />
          </Grid>
        ) : (
          <Loading />
        )}
      </PageLimiter>
    </Wrapper>
  );
};
