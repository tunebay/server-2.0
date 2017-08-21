import passport from 'passport';
import moment from 'moment';
import LocalStrategy from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
// import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { comparePassword } from '../services/auth';
import keys from '../config/keys';
import User from '../models/user.model';

passport.serializeUser((user, done) => {
  console.log('SERIALIZE USER', user);
  return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log('DESERIALIZE USER', id);
  const user = await User.query().where('id', id).first();
  return done(null, user);
});

// GOOGLE

const googleLogin = new GoogleStrategy(
  {
    clientID: keys.GOOGLE_CLIENT_ID,
    clientSecret: keys.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/v1/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.query().where('email', profile.emails[0].value);
    console.log(existingUser);
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
  async (accessToken, refreshToken, profile, done) => {
    console.log('profile', profile);
    const existingUser = await User.query().where('email', profile._json.email).first(); // eslint-disable-line no-underscore-dangle
    if (existingUser) {
      console.log('****** user exists *******');
      return done(null, existingUser);
    }
    const newUser = {
      email: profile._json.email,
      display_name: profile.displayName,
      first_name: profile.name.givenName,
      last_name: profile.name.familyName,
      gender: profile.gender,
      profile_image: profile.photos[0].value,
      password_hash: 'required',
      username: 'everververeverv',
      provider: 'google',
      cover_photo: profile._json.cover.source,
      created_at: moment().format(),
      active: false,
      verified: false,
    };
    const user = await User.query().insert(newUser);
    console.log('USER', user);
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

// JWT

// const jwtOptions = {
//   jwtFromRequest: ExtractJwt.fromHeader('authorization'),
//   secretOrKey: keys.JWT_SECRET,
// };

// const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
//   return User.query()
//     .where('id', payload.sub)
//     .first()
//     .then((user) => {
//       if (!user) return done(null, false);
//       return done(null, user);
//     })
//     .catch(err => done(err, false));
// });

// PASSPORT

// passport.use(jwtLogin);
passport.use(localLogin);
passport.use(googleLogin);
passport.use(facebookLogin);

// export const requireAuth = passport.authenticate('jwt', { session: false });
// export const requireLogin = passport.authenticate('local');
