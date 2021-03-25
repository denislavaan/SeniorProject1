import { Photo } from "./photo";

export interface Connection {
  id: string;
  username: string;
  photoUrl: string;
  age: string;
  Nickname: string;
  Created: Date;
  LastActive: Date;
  gender: string;
  Bio: string;
  LookingFor: string;
  InterestedIn: string;
  city: string;
  country: string;
  photos: Photo[];
}
