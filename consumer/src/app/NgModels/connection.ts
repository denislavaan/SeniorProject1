import { Photo } from "./photo";

export interface Connection {

  id: number;
  username: string;
  photoUrl: string;
  age: number;
  nickname: string;
  created: Date;
  lastActive: Date;
  gender: string;
  bio: string;
  lookingFor: string;
  interestedIn: string;
  city: string;
  country: string;
  photos: Photo[];
}