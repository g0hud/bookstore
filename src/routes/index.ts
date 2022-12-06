import { Router } from 'express';

import { CustomerController, UserController, ProductController } from '../controllers/';
import { Auth } from '../middleware/Auth';

const router = Router();

// Users
router.post('/user', UserController.Create);
router.post('/login', UserController.Login);

// Customers
router.post('/customer', Auth, CustomerController.Create);

router.get('/customers', Auth, CustomerController.GetAll);
router.get('/customer/:cpf', Auth, CustomerController.GetOneByCPF);

// Products
router.post('/product', Auth, ProductController.CreateProduct);

// Sales

export { router };
