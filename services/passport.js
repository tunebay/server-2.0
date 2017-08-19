import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { comparePassword } from '../services/auth';
import keys from '../config/keys';
import User from '../models/user.model';

// GOOGLE

const googleLogin = new GoogleStrategy(
  {
    clientID: keys.GOOGLE_CLIENT_ID,
    clientSecret: keys.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/v1/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    const googleProfile = profile; // eslint-disable-line no-underscore-dangle
    console.log(googleProfile);
  },
);

// FACEBOOK

const facebookLogin = new FacebookStrategy(
  {
    clientID: keys.FACEBOOK_CLIENT_ID,
    clientSecret: keys.FACEBOOK_CLIENT_SECRET,
    callbackURL: '/api/v1/auth/facebook/callback',
    profileFields: [
      'email',
      'id',
      'displayName',
      'name',
      'gender',
      'age_range',
      'cover',
      'locale',
      'music',
      'picture',
    ],
  },
  (accessToken, refreshToken, profile, done) => {
    console.log('Acess token', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile', profile); // eslint-disable-line no-underscore-dangle
  },
);

// LOCAL

const localOptions = {
  usernameField: 'emailOrUsername',
};

const localLogin = new LocalStrategy(localOptions, (emailOrUsername, password, done) => {
  const credentialType = emailOrUsername.match(/@/) ? 'email' : 'username';
  return User.query()
    .where(credentialType, emailOrUsername)
    .first()
    .then((user) => {
      if (!user) return done(null, false);
      if (!comparePassword(password, user.password_hash)) {
        return done(null, false);
      }
      return done(null, user);
    })
    .catch(err => done(err));
});

// JWT

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: keys.JWT_SECRET,
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  return User.query()
    .where('id', payload.sub)
    .first()
    .then((user) => {
      if (!user) return done(null, false);
      return done(null, user);
    })
    .catch(err => done(err, false));
});

// PASSPORT

passport.use(jwtLogin);
passport.use(localLogin);
passport.use(googleLogin);
passport.use(facebookLogin);

export const requireAuth = passport.authenticate('jwt', { session: false });
export const requireLogin = passport.authenticate('local', { session: false });
