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
	updatePostById,
	getUserById
} from './db/queries.js';

import indexRouter from './routes/indexRouter.js';
import signRouter from './routes/signupRouter.js';
import loginRouter from './routes/loginRouter.js';
import logoutRouter from './routes/logoutRouther.js';
import messageRouter from './routes/messageRouter.js';

const __dirname = import.meta.dirname;
const PORT = process.env.PORT || 3000

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));


passport.use(new Strategy( async (username, password, done)=>{
		try{
			const user = await getUserByUsername(username);
			if(!user){
				return done(null, false, {message: 'Incorrect username'});
			}
			const match = await bcrypt.compare(password, user.password);
			if(!match){
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

passport.deserializeUser(async (id, done)=>{
	try{
		const user = await getUserById(id);
		done(null, user);
	}catch(err){
		done(err);
	}
});

app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: false }));
app.use(passport.session());

app.use('/', indexRouter);
app.use('/sign-up', signRouter);

app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/new-message', messageRouter);

app.listen(PORT, ()=>{
	console.log(`App running in port ${PORT}`);
})