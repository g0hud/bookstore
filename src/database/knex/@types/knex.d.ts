import { IAddress, ICustomer, IPhone, IProduct, ISale, IUser } from '../../models';


declare module 'knex/types/tables' {
  interface Tables {
    user: IUser;
    sale: ISale;
    phone: IPhone;
    address: IAddress;
    product: IProduct;
    customer: ICustomer;
  }
}
