import passport from 'passport';
import moment from 'moment';
import uidSafe from 'uid-safe';
import camelCase from 'camelcase-keys';
import LocalStrategy from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
// import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { comparePassword } from '../services/auth';
import keys from '../config/keys';
import User from '../models/user.model';

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.query().where('id', id).first();
  return done(null, camelCase(user));
});

// GOOGLE

const googleLogin = new GoogleStrategy(
  {
    clientID: keys.GOOGLE_CLIENT_ID,
    clientSecret: keys.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/v1/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.query().where('email', profile.emails[0].value).first();
    if (existingUser) {
      return done(null, camelCase(existingUser));
    }

    const newUser = _constructUser(profile);
    const dbUser = await User.query().insert(newUser);
    const user = camelCase(dbUser);
    return done(null, user);
  },
);

// FACEBOOK

const facebookLogin = new FacebookStrategy(
  {
    clientID: keys.FACEBOOK_CLIENT_ID,
    clientSecret: keys.FACEBOOK_CLIENT_SECRET,
    callbackURL: '/api/v1/auth/facebook/callback',
    profileFields: ['email', 'name', 'gender', 'cover', 'picture.type(large)', 'displayName'],
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.query().where('email', profile.emails[0].value).first();
    if (existingUser) {
      return done(null, camelCase(existingUser));
    }

    const newUser = _constructUser(profile);
    const dbUser = await User.query().insert(newUser);
    const user = camelCase(dbUser);
    return done(null, user);
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

const _constructUser = (profile) => {
  const profileProps = {
    email: profile.emails[0].value,
    display_name: profile.displayName || null,
    first_name: profile.name.givenName || null,
    last_name: profile.name.familyName || null,
    gender: profile.gender || null,
    password_hash: uidSafe.sync(18),
    username: `_${uidSafe.sync(18)}`,
    provider: profile.provider,
    created_at: moment().format(),
    active: false,
    verified: true, // automatic verification for social login
    pending: true, // sets to false once sign up flow complete
  };
  // facebook
  if (profile.provider === 'facebook') {
    return {
      ...profileProps,
      profile_image: profile._json.picture.data.is_silhouette
        ? null
        : profile._json.picture.data.url,
      cover_photo: profile._json.cover ? profile._json.cover.source : null,
    };
  }
  // google
  return {
    ...profileProps,
    profile_image: profile._json.image.isDefault ? null : profile._json.image.url,
    cover_photo: profile._json.cover ? profile._json.cover.coverPhoto.url : null,
  };
};

passport.use(localLogin);
passport.use(googleLogin);
passport.use(facebookLogin);
