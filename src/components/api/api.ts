// import { createFetchStore } from "./createFetchStore";

// export interface ApiWifiSettings {
//   host?: string;
//   password?: string;
//   ssid?: string;
// }

// export interface ApiWifiStatus {
//   rssi?: string;
// }

// // function objToQueryString(obj: any) {
// //   const keyValuePairs = [];
// //   for (const key in obj) {
// //     keyValuePairs.push(
// //       encodeURIComponent(key) + "=" + encodeURIComponent(obj[key])
// //     );
// //   }
// //   return keyValuePairs.join("&");
// // }

// // export const wifiSettingsStore = createFetchStore<ApiWifiSettings>(() =>
// //     fetch("/api/wifiSettings").then((x) => x.json()),
// //     (result) => fetch(`/api/updateWifi?${objToQueryString(result)}`)
// // );

// // export const wifiStatusStore = createFetchStore<ApiWifiStatus>(() =>
// //     fetch("/api/wifiStatus").then((x) => x.json()),
// //     (result) => fetch(`/api/updateWifi?${objToQueryString(result)}`)
// // );
