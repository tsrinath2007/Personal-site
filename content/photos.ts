import photosJson from "./photos.json";

export interface PhotoItem {
  id: string;
  src?: string;
  alt: string;
  caption: string;
  description?: string;
  location?: string;
  tilt: string;
}

export const photos: PhotoItem[] = photosJson as PhotoItem[];
