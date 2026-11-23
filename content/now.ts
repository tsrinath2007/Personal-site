import nowJson from "./now.json";

export interface NowPassengerField {
  label: string;
  value: string;
}

export interface NowData {
  header: string;
  origin: {
    code: string;
    city: string;
  };
  destination: {
    code: string;
    city: string;
  };
  fields: NowPassengerField[];
  stubText: string;
  focus: {
    title: string;
    items: string[];
  };
}

export const nowData: NowData = nowJson as NowData;
