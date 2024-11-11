export interface Idol {
  id: number;
  name: string;
  slug: string;
  stage_name: string;
  birthdate: string;
  nationality: string;
  debute_date: string;
  position: string;
  social_media: string;
  bio: string;
  group_id: number;
  group: Group;
  spotify_id: string;
  profile_picture: string;
  photos: string[];
  schedules: Schedule[];
}

export interface Group {
  id: number;
  name: string;
  debut_date: string;
  company: string;
  slug: string;
  bio: string;
  social_media: string;
  idols: Idol[];
  cover_picture: string;
  photos: string[];
  spotify_id: string;
  schedules: Schedule[];
}

export interface Schedule {
  id: number;
  title: string;
  type: string;
  description: string;
  date: string;
  location: string;
  idol_id: number;
  group_id: number;
  created_by: number;
  reminder: boolean;
}
