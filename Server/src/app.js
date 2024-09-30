const express = require('express');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');
const { Dbconnect } = require('./config/DB');
const cors = require("cors");


dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}));


app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET_ID,
  callbackURL: 'http://localhost:5000/auth/google/callback',
},(accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));


app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));


app.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/login',
  }),(req, res) => {
    res.redirect('http://localhost:5173/dashboard');
  }
);


app.get('/auth/me', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});


app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT,(err)=>{
  if (err) {
      console.log(err);
  } else {
      try {
          Dbconnect(process.env.DB_URL)
          console.log(`server is running at port http://localhost:${PORT}`)
      } catch (error) {
          console.log(error)
      }
  }
})
