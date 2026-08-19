import express from 'express';
import process from 'process';
import path from 'path';

const __dirname = import.meta.dirname;
const PORT = process.env.PORT || 3000

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.listen(PORT, ()=>{
	console.log(`App running in port ${PORT}`);
})