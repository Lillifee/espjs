// import * as React from "react";
// import { ThemeProvider } from "styled-components";
// import {
//   Card,
//   CardTitle,
//   CardInfo,
//   LabelS,
//   LabelXL,
//   Label,
//   CardFooter,
//   SubLabelS,
//   SubLabelXS,
//   CardSetting,
//   Input,
//   CardContainer,
//   CardSubInfo,
//   CardFooterPanel,
//   Button,
//   LoadingLabel,
//   LoadingLabelS,
//   LoadingLabelXL,
// } from "../styles";
// import { RoundIcon, ButtonIcon } from "../Icons";
// import { themePrimary, theme } from "../theme";
// import { ApiWifiSettings, wifiSettingsStore, wifiStatusStore } from "../api";
// import { Suspense } from "react";
// import { useFetch } from "../api/createFetchStore";
// import { useInterval } from "../hooks/useInterval";

// export const Wifi: React.FC = () => {
//   return (
//     <CardContainer>
//       <Card>
//         <CardTitle>Wifi</CardTitle>

//         <ThemeProvider theme={themePrimary}>
//         <CardInfo theme={themePrimary}>
//           <Suspense fallback={<WifiStatusLoading />}>
//             <WifiStatus />
//           </Suspense>
//         </CardInfo>
//         </ThemeProvider>

//         <Suspense fallback={<WifiFooterLoading />}>
//           <WifiFooter />
//         </Suspense>
//       </Card>
//     </CardContainer>
//   );
// };

// export const WifiStatusLoading: React.FC = () => (
//   <React.Fragment>
//     <LoadingLabelS />
//     <LoadingLabelXL />
//     <LoadingLabel />
//   </React.Fragment>
// );

// export const WifiStatus: React.FC = () => {
//   const [status, reload] = useFetch(wifiStatusStore);
//   useInterval(() => reload(), 10000);

//   let signal: string = "Unknown";
//   if (status && status.rssi) {
//     const rssi = parseInt(status.rssi);
//     if (rssi > -90) signal = "Bad";
//     if (rssi > -80) signal = "Weak";
//     if (rssi > -70) signal = "Fair";
//     if (rssi > -60) signal = "Good";
//     if (rssi > -50) signal = "Excellent";
//   }

//   return (
//     <React.Fragment>
//       <LabelS>Signal strength</LabelS>
//       <LabelXL>{signal}</LabelXL>
//       <Label>{status?.rssi} dBm</Label>
//     </React.Fragment>
//   );
// };

// export const WifiFooterLoading: React.FC = () => (
//   <CardFooter>
//     <RoundIcon theme={themePrimary} type="Wifi" />
//     <CardFooterPanel>
//       <LoadingLabel />
//       <LoadingLabelS />
//     </CardFooterPanel>
//   </CardFooter>
// );

// export const WifiFooter: React.FC = () => {
//   const [wifi, reload, update] = useFetch<ApiWifiSettings>(wifiSettingsStore);
//   const [expanded, setExpanded] = React.useState<boolean>(false);
//   const [userInput, setUserInput] = React.useState<ApiWifiSettings>();

//   const data = userInput || wifi;

//   return (
//     <React.Fragment>
//       <CardFooter>
//         <RoundIcon theme={themePrimary} type="Wifi" />
//         <CardFooterPanel>
//           <Label>Patrick</Label>
//           <SubLabelS>cube.local</SubLabelS>
//         </CardFooterPanel>
//         <ThemeProvider theme={theme}>
//           <ButtonIcon
//             type={expanded ? "ExpandLess" : "ExpandMore"}
//             onClick={() => {
//               setExpanded(!expanded);
//             }}
//           />
//         </ThemeProvider>
//       </CardFooter>

//       {expanded && (
//         <CardSetting>
//           <SubLabelXS>Host</SubLabelXS>
//           <Input
//             defaultValue={data?.host}
//             onChange={(e) => setUserInput({ ...data, host: e.target.value })}
//           />

//           <SubLabelXS>SSID</SubLabelXS>
//           <Input
//             defaultValue={data?.ssid}
//             onChange={(e) => setUserInput({ ...data, ssid: e.target.value })}
//           />

//           <SubLabelXS>Password</SubLabelXS>
//           <Input
//             type="Password"
//             defaultValue={data?.password}
//             onChange={(e) =>
//               setUserInput({ ...data, password: e.target.value })
//             }
//           />

//           <Button  theme={themePrimary} onClick={() => update(data)}>Apply</Button>
//         </CardSetting>
//       )}
//     </React.Fragment>
//   );
// };
