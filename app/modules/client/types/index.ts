export type Address = {
  street: string;
  postalCode: string;
  city: string;
};

export type Order = {
  id: number;
  date: string;
  items: any[];
  total: number;
};

export type Client = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: Address;
  registrationDate: string;
  orders: Order[];
  image?: string;
  description?: string;
};
