import { nowData } from "./now";

export type LaptopFolder = "projects" | "hackathons" | "stack";

export interface DrawerOpenOptions {
  folder?: LaptopFolder;
  skip?: boolean;
}

export type OpenDrawerFn = (target: string, opts?: DrawerOpenOptions) => void;

export interface DeskItemData {
  id: string;
  k: string;
  t: string;
  d?: string;
  list?: string[];
  go: string;
  style?: React.CSSProperties;
  tag?: string;
  ariaLabel: string;
  isPolygon?: boolean;
}

export const TITLES: Record<string, string> = {
  laptop: "Laptop",
  blog: "Blog",
  now: "Now",
  photos: "Photos",
  about: "About",
  contact: "Contact"
};

export const DESK_ITEMS: Record<string, DeskItemData> = {
  laptop: {
    id: "laptop",
    k: "Laptop",
    t: "Out of battery",
    d: "It needs a charger before it shows my projects, hackathons and stack.",
    go: "laptop",
    ariaLabel: "Laptop",
    tag: "Laptop",
    isPolygon: true
  },
  notebook: {
    id: "notebook",
    k: "Notebook",
    t: "Blog",
    d: "Notes on how I build things. Engineering logs, deep-dives and drafts.",
    go: "blog",
    ariaLabel: "Left book, the blog",
    tag: "Blog",
    style: { left: "17.34%", top: "64.59%", width: "13.76%", height: "10.38%" }
  },
  pen: {
    id: "pen",
    k: "Pen",
    t: "Send a message",
    d: "Say hello, pitch a project, or invite me to a hackathon.",
    go: "contact",
    ariaLabel: "Pen, send a message",
    tag: "Send a message",
    style: { left: "14.35%", top: "77.28%", width: "10.77%", height: "5.19%" }
  },
  ticket: {
    id: "ticket",
    k: "Boarding pass",
    t: "BLR → ?",
    d: "Where I am right now, and where I am headed next.",
    go: "now",
    ariaLabel: "Boarding pass, where I am now",
    tag: "Where I am",
    style: { left: "73.56%", top: "76.36%", width: "15.19%", height: "8.54%" }
  },
  photo1: {
    id: "photo1",
    k: "Photos",
    t: "Photos",
    d: "A few pictures from outside the code.",
    go: "photos",
    ariaLabel: "Photos, pinned on the wall",
    tag: "Photos",
    style: { left: "49.04%", top: "7.61%", width: "12.56%", height: "19.84%" }
  },
  photo2: {
    id: "photo2",
    k: "Photos",
    t: "Photos",
    d: "A few pictures from outside the code.",
    go: "photos",
    ariaLabel: "Photos, pinned on the desk",
    tag: "Photos",
    style: { left: "9.39%", top: "85.81%", width: "8.07%", height: "14.19%" }
  },
  mug: {
    id: "mug",
    k: "Coffee mug",
    t: "Current focus",
    list: nowData.focus.items,
    go: "now",
    ariaLabel: "Coffee mug, current focus",
    tag: "Current focus",
    style: { left: "90.19%", top: "53.75%", width: "9.81%", height: "20.18%" }
  },
  books: {
    id: "books",
    k: "Books",
    t: "Blog",
    d: "Notes on how I build things. One book per post.",
    go: "blog",
    ariaLabel: "Books, the blog",
    tag: "Blog",
    style: { left: "71.77%", top: "53.52%", width: "17.82%", height: "19.38%" }
  },
  sticky: {
    id: "sticky",
    k: "Sticky note",
    t: "Current focus",
    list: ["Semester 3", "Build projects", "Hackathons", "Explore"],
    go: "now",
    ariaLabel: "Sticky note, current focus",
    tag: "Current focus",
    style: { left: "74.04%", top: "15.11%", width: "13.64%", height: "25.95%" }
  }
};
