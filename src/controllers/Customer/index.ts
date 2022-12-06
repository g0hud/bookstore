import * as create from './Create';
import * as getAll from './GetAll';
import * as getOneByCPF from './GetOneByCPF';


export const CustomerController = {
  ...create,
  ...getAll,
  ...getOneByCPF,
};
