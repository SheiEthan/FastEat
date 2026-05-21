export interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'RESTAURANT' | 'USER';
  firstName?: string;
  lastName?: string;
  token?: string;
}
