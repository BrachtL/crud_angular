//src/app/users/user.model.ts
export interface User {
  id?: number; //is this a good approach?
  first_name: string;
  email: string;
  phone: string;
  password_hash?: string; //is this a good approach?
}
