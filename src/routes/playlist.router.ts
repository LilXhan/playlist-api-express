import { createPlaylist, getAllPlaylist, connectSongPlaylist } from "../controllers/playlist.controller";
import { Router } from 'express';
import { authMiddleware } from "../middleware/authentication";

const playlistRouter = Router();

playlistRouter.get('', authMiddleware, getAllPlaylist);
playlistRouter.post('', createPlaylist);
playlistRouter.put('', connectSongPlaylist);

export default playlistRouter;