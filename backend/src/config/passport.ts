import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import envConfig from "./env.config";
import { UserRepository } from "../repository/implementation/user.repository";

const userRepo = new UserRepository();

passport.use(
  new GoogleStrategy(
    {
      clientID: envConfig.GOOGLE_CLIENT_ID as string,
      clientSecret: envConfig.GOOGLE_CLIENT_SECRET as string,
      callbackURL: envConfig.GOOGLE_CALLBACK_URL as string,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const user = await userRepo.upsertByGoogleId({
          googleId: profile.id,
          email: profile.emails?.[0]?.value || "",
          name: profile.displayName || "User",
          avatar: profile.photos?.[0]?.value,
        });
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        return done(err as Error);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await userRepo.findUser(id);

    done(null, user);
  } catch (err) {
    done(err as Error);
  }
});

export default passport;
