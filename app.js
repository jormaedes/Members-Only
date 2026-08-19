import express from 'express';
import process from 'process';
import path from 'path';
import passport from 'passport';
import Strategy from 'passport-local';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import { 
	getUserByUsername,
	createUser,
	InsertPost,
	getAllPosts,
	getPostById,
	deletePostById,
	updatePostById
} from './db/queries.js';

import indexRouter from './routes/indexRouter.js';
import signRouter from './routes/signupRouter.js';

const __dirname = import.meta.dirname;
const PORT = process.env.PORT || 3000

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));


passport.use(new Strategy(
	(username, password, done)=>{
		try{
			const user = getUserByUsername(username);
			if(!user){
				return done(null, false, {message: 'Incorrect username'});
			}
			const isValidPassword = bcrypt.compareSync(password, user.password);
			if(!isValidPassword){
				return done(null, false, {message: 'Incorrect password'});
			}
			return done(null, user);
		}catch(err){
			return done(err);
		}
	}
));

passport.serializeUser((user, done)=>{
	done(null, user.id);
});

passport.deserializeUser((id, done)=>{
	try{
		const user = getUserById(id);
		done(null, user);
	}catch(err){
		done(err);
	}
});

app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: false }));
app.use(passport.session());

app.use('/', indexRouter);
app.use('/sign-up', signRouter);

app.listen(PORT, ()=>{
	console.log(`App running in port ${PORT}`);
})