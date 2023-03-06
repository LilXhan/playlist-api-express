import express, {Application} from 'express';
import  { default as userRouter }  from './routes/user.router'
import  { default as playlistRouter } from './routes/playlist.router';
import  { default as songRouter } from './routes/song.router';
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config();
const app: Application = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1/users', userRouter);
app.use('/api/v1/songs', songRouter);
app.use('/api/v1/playlist', playlistRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




