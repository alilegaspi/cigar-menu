
export interface Cigar {
  id: number;
  name: string;
  image: string; // Single image used for both card and modal
  // detailsImage removed; fallback logic now always uses image
  price: string;
  origin: string;
  profile: string;
  vitola: string;
  wrapper: string;
  binder: string;
  filler: string;
  description: string;
}
