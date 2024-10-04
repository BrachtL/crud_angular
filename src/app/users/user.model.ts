export interface User {
  id?: number; // Optional for new users
  first_name: string;
  email: string;
  phone: string;
  password_hash?: string; // If needed, remove if not applicable
}
