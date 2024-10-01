const express = require('express');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');
const { Dbconnect } = require('./config/DB');
const cors = require("cors");
const { UserModel } = require('./Models/User');
const { userRouter } = require('./Routes/User');
const { check_auth } = require('./Middleware/Passport');


dotenv.config();
const app = express();

app.use(cors({
  origin: true, 
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    sameSite: 'lax'
  }
}));


app.use(passport.initialize());
app.use(passport.session());
app.use('/user', userRouter);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET_ID,
  callbackURL: `${process.env.BACK_END}auth/google/callback`,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await UserModel.findOne({ email: profile.emails[0].value });
    if (user) {
      return done(null, user);
    } else {
      const newUser = new UserModel({
        email: profile.emails[0].value,
        name: profile.displayName,
        profile: profile.photos[0].value
      });
      await newUser.save();
      return done(null, newUser);
    }
  } catch (err) {
    return done(err, null);
  }
}));

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/login',
}), (req, res) => {
  res.redirect(`${process.env.FRONT_END}`);
});

app.get('/auth/me', check_auth, (req, res) => {
  res.json(req.user);
});

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed', error: err });
    }
    req.session.destroy((err) => { 
      if (err) {
        return res.status(500).json({ message: 'Session destruction failed', error: err });
      }
      res.clearCookie('connect.sid', { path: '/' });
      res.status(200).json({ message: 'Logged out successfully' });
    });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    try {
      Dbconnect(process.env.DB_URL);
      console.log(`server is running at port http://localhost:${PORT}`);
    } catch (error) {
      console.log(error);
    }
  }
});
