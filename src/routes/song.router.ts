import { getSong, getAllSongs, createSong } from "../controllers/song.controller";
import { Router } from 'express';
import { authMiddleware } from "../middleware/partial.authentication";

const songRouter = Router();

songRouter.get('', authMiddleware, getAllSongs);
songRouter.post('', createSong);
songRouter.get('/:id', getSong);

export default songRouter;