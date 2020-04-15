import { Router } from 'express';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';
import multer from 'multer';
import multerConfig from './config/multer';

// Controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionControler';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryStatusController from './app/controllers/DeliveryStatusController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';

// Validators
import validateDeliveryStore from './app/validators/Delivery/Store';
import validateDeliveryUpdate from './app/validators/Delivery/Update';
import validateDeliverymanStore from './app/validators/Deliveryman/Store';
import validateDeliverymanUpdate from './app/validators/Deliveryman/Update';
import validateDeliveryProblemStore from './app/validators/DeliveryProblem/Store';
import validateDeliveryStatusUpdate from './app/validators/DeliveryStatus/Update';
import validateRecipientStore from './app/validators/Recipient/Store';
import validateRecipientUpdate from './app/validators/Recipient/Update';
import validateSessionStore from './app/validators/Session/Store';
import validateUserStore from './app/validators/User/Store';
import validateUserUpdate from './app/validators/User/Update';

// Middlewares
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

let bruteForce = null;

if (process.env.NODE_ENV !== 'test') {
  const bruteStore = new BruteRedis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  });

  bruteForce = new Brute(bruteStore);
}

// Without auth

routes.post('/users', validateUserStore, UserController.store);

if (process.env.NODE_ENV !== 'test') {
  routes.post(
    '/sessions',
    bruteForce.prevent,
    validateSessionStore,
    SessionController.store
  );
} else {
  routes.post('/sessions', validateSessionStore, SessionController.store);
}

routes.get('/deliverymen', DeliverymanController.index);

routes.get(
  '/deliverymen/:deliveryman_id/deliveries',
  DeliveryStatusController.index
);
routes.put(
  '/deliverymen/:deliveryman_id/deliveries/:id',
  validateDeliveryStatusUpdate,
  upload.single('signature'),
  DeliveryStatusController.update
);

routes.post(
  '/delivery/:delivery_id/problems',
  validateDeliveryProblemStore,
  DeliveryProblemController.store
);
routes.get('/delivery/:delivery_id/problems', DeliveryProblemController.get);

routes.post('/files', upload.single('file'), FileController.store);

// With auth
routes.use(authMiddleware);
routes.put('/users', validateUserUpdate, UserController.update);

routes.delete(
  '/problem/:problem_id/cancel-delivery',
  DeliveryProblemController.delete
);

routes.get('/problems', DeliveryProblemController.index);

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', validateRecipientStore, RecipientController.store);
routes.put(
  '/recipients/:id',
  validateRecipientUpdate,
  RecipientController.update
);
routes.delete('/recipients/:id', RecipientController.destroy);

routes.post(
  '/deliverymen',
  validateDeliverymanStore,
  DeliverymanController.store
);
routes.put(
  '/deliverymen/:id',
  validateDeliverymanUpdate,
  DeliverymanController.update
);
routes.delete('/deliverymen/:id', DeliverymanController.delete);

routes.get('/deliveries', DeliveryController.index);
routes.post('/deliveries', validateDeliveryStore, DeliveryController.store);
routes.put(
  '/deliveries/:id',
  validateDeliveryUpdate,
  DeliveryController.update
);
routes.delete('/deliveries/:id', DeliveryController.delete);

export default routes;
