import passport from 'passport';
import { Strategy as GoogleStrategy, Profile, GoogleCallbackParameters } from 'passport-google-oauth20';
import { Request } from 'express';
import { User } from '../models/User'; // Votre modèle User doit correspondre aux propriétés étendues

type DoneCallback = (error: any, user?: false | Express.User | undefined) => void;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "/api/auth/google/callback",
      passReqToCallback: true,
    },
    async (
      req: Request,
      accessToken: string,
      refreshToken: string,
      params: GoogleCallbackParameters,
      profile: Profile,
      done: DoneCallback
    ) => {
      try {
        const appUser: User = {
          id: profile.id,
          title: "", // Pas d'information sur le titre dans le profile Google
          firstName: profile.displayName ? profile.displayName.split(" ")[0] : "",
          lastName: profile.displayName ? profile.displayName.split(" ")[1] || "" : "",
          address: "", // À remplir ultérieurement
          email: profile.emails && profile.emails[0]?.value ? profile.emails[0].value : "",
          phoneNumber: "", // Pas d'info disponible
          dateOfBirth: new Date(), // Valeur par défaut car non fournie par Google
          role: "utilisateur",
          created_at: new Date(),
        };
        return done(null, appUser);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.serializeUser((user: Express.User, done) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});

export default passport;
