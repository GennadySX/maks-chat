import { Router } from 'express';
import UserRouter from './Http/UsersRouter';
import AuthRouter from './Http/AuthRouter';
import IndexRouter from './Http/IndexRouter';
import {Cors} from "@config/Cors";

// Init router and path
const router = Router();



router.use('/', Cors);

//global route for testing
router.use('/', IndexRouter);

// Add sub-routes
router.use('/api/auth', AuthRouter);
router.use('/api/users',  UserRouter);

// Export the base-router
export default router;
