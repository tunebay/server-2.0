import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { comparePassword } from '../lib/auth';
import User from '../models/user.model';

require('dotenv').config();

const localOptions = {
  usernameField: 'emailOrUsername'
};

const localLogin = new LocalStrategy(localOptions, (emailOrUsername, password, done) => {
  const credentialType = emailOrUsername.match(/@/) ? 'email' : 'username';
  User
    .query()
    .where(credentialType, emailOrUsername).first()
    .then((user) => {
      if (!user) return done(null, false);
      if (!comparePassword(password, user.password_hash)) {
        return done(null, false);
      }
      return done(null, user);
    })
    .catch(err => done(err));
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User
    .query()
    .where('id', payload.id).first()
    .then((user) => {
      if (!user) return done(null, false);
      return done(null, user);
    })
    .catch(err => done(err, false));
});

passport.use(jwtLogin);
passport.use(localLogin);
