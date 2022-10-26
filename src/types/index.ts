export type Album = {
  id: string;
  name: string;
  images: Array<{
    url: string;
  }>;
  type: "album";
};

export type Track = {
  album: Album;
  artists: Array<{ name: string }>;
  duration_ms: number;
  href: string;
  id: string;
  name: string;
  preview_url: string;
  images: Array<{ url: string, height: number, width: number }>;
  type: "track";
}

export type TrackList = {
  items: Array<{ track: Track }>;
  next?: string;
  add: boolean;
}

export type Playlist = {
  id: string;
  name: string;
  description: string;
  images: Array<{ url: string, height: number, width: number }>;
  tracks: { href: string };
  type: "playlist";
}