import { DATA_SOURCE_URL } from "@/fetch/api/DATA_SOURCE_URL";

let eventSource: EventSource | null = null;

export const subscribeOnPickAndBanUpdates = (callback: (data: any) => void) => {
  if (eventSource) {
    eventSource.close();
  }

  eventSource = new EventSource(`${DATA_SOURCE_URL}/game/pickAndBan/updates`);

  eventSource.onmessage = (event) => {
    const newData = JSON.parse(event.data);
    callback(newData);
  };

  eventSource.onerror = (error) => {
    console.error("EventSource failed:", error);
    eventSource?.close();
    setTimeout(() => subscribeOnPickAndBanUpdates(callback), 5000);
  };
};

// export const subscribeOnForProdUpdates = (callback: (data: any) => void) => {
//   if (eventSource) {
//     eventSource.close();
//   }
//
//   eventSource = new EventSource(`${DATA_SOURCE_URL}/forProd/updates`);
//
//   eventSource.onmessage = (event) => {
//     const newData = JSON.parse(event.data);
//     callback(newData);
//   };
//
//   eventSource.onerror = (error) => {
//     console.error("EventSource failed:", error);
//     eventSource?.close();
//     setTimeout(() => subscribeOnForProdUpdates(callback), 2000);
//   };
// };

export const unsubscribeFromUpdates = () => {
  if (eventSource) {
    eventSource.close();
    eventSource = null;
  }
};
