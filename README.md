# Epices
Projet E-commerce - Backend
Ce projet est le backend d'un site e-commerce dédié à la vente d'épices, herbes, poivres, produits festifs, etc. Il a été développé avec Node.js et TypeScript, et il utilise une architecture modulaire comprenant des routes, contrôleurs, services et modèles. Le backend communique avec une base de données PostgreSQL et intègre plusieurs fonctionnalités clés, notamment :

*Authentification locale (avec hachage des mots de passe via bcrypt) et OAuth via Google (Passport).
*Gestion des utilisateurs, produits, commandes, catégories.
*Intégration des paiements via Stripe et PayPal.
*Documentation interactive de l'API avec Swagger.

Prérequis :

*Node.js (version 14 ou supérieure recommandée)
*npm (géré avec Node.js)
*PostgreSQL (pour la base de données)
*Un éditeur de code (par exemple, Visual Studio Code)


Technologies et outils utilisés :
*Express : Framework web pour Node.js.
*TypeScript : Langage typé sur JavaScript.
*ts-node-dev : Outil de rechargement automatique en développement.
*dotenv : Gestion des variables d'environnement.
*pg : Client PostgreSQL pour Node.js.
*Passport et passport-google-oauth20 : Pour l'authentification OAuth via Google.
*JSON Web Token (JWT) : Utilisé pour l'authentification. La bibliothèque jsonwebtoken est utilisée pour générer et vérifier des tokens, garantissant ainsi que les données sensibles (comme les identifiants utilisateur) ne transitent pas directement et que les endpoints sécurisés sont protégés.
*bcrypt : Pour le hachage des mots de passe.
*Stripe (avec le package stripe) : Pour la gestion des paiements par carte.
*@paypal/checkout-server-sdk : Pour l'intégration des paiements PayPal.
*swagger-ui-express et swagger-jsdoc : Pour générer et exposer la documentation interactive de l'API (Swagger).
*Multer et Sharp : Pour la gestion et le traitement des uploads d'images (conversion en .webp, redimensionnement).

Utilisation securité :
* TEST : ESLint/JEST/PRETTERC
* Helmet & Express-rate-limi : Helmet :
app.use(helmet()) ajoute plusieurs en-têtes HTTP de sécurité (comme X-Content-Type-Options, Content-Security-Policy, etc.), ce qui protège contre certaines attaques.

Rate Limiting :
La configuration du rate limiter avec express-rate-limit limite chaque IP à 100 requêtes toutes les 15 minutes. Cela aide à prévenir des abus et des attaques par déni de service (DoS). Vous pouvez ajuster ces valeurs selon vos besoins.

Commandes utiles :
*Démarrer le serveur en mode développement (avec rechargement automatique) : npm run dev
*Compiler le projet : npm run build
*Demarrer le serveur compilé : npm start
*ouvrir le swagger : http://localhost:3000/api-docs ( attention le serveur doit etre lancé )
*pour lancer les test : npm run test:watch ou npm test


pour le Frontend :

* Utilisation du create-next-app : pour créer mon environement en NEXT.js
* pour lancer mon serveur frontend : npm run dev -- -p 3001