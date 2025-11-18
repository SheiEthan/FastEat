import type { Address } from '~/modules/address/types'
import type { Order } from '~/modules/order/types'

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
