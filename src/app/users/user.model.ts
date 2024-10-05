//src/app/users/user.model.ts
export interface User {
  id: number; 
  name: string; 
  email: string; 
  password_hash?: string; 
  birthdate: Date;
  is_manager: boolean;
  profile_pic_url?: string;
  creation_datetime: string;
  image_public_id?: string;
  firebase_token?: string;
}