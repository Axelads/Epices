import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swaggerOptions';

import passport from 'passport';             // Import de passport
import './config/passport';                 // Import de votre stratégie Google
import { errorHandler } from './middlewares/error.middleware';
import routes from './routes';

const app = express();

// Sécuriser les en-têtes HTTP avec Helmet
app.use(helmet());

// Appliquer un rate limiter pour limiter le nombre de requêtes par IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite chaque IP à 100 requêtes par fenêtre de 15 minutes
  message: 'Too many requests from this IP, please try again after 15 minutes.',
});
app.use(limiter);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialiser Passport (après l'import de votre config)
app.use(passport.initialize());

// Exposer la documentation Swagger sur la route /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes de l'API
app.use('/api', routes);

// Middleware de gestion des erreurs
app.use(errorHandler);

export default app;
