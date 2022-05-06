export interface Juyeong {
  name: string;
  src: string;
}

export interface CurrentFighter {
  left: Juyeong;
  right: Juyeong;
}

export type Direction = 'LEFT' | 'RIGHT';
