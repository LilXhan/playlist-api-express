import { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const getAllPlaylist = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const playlists = await prisma.playlist.findMany({
      include: {songs: true}
    });
    res.status(200).json({
      status: 'OK',
      data: playlists
    });
  } catch (error) {
    res.status(500).json({
      status: 'FAILED',
      data: {
        error: error
      }
    });
  };
};

export const connectSongPlaylist = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_song, id_playlist } = req.body;
    const song = await prisma.song.update({
      where: {id: id_song},
      data: {
          playlist: {connect: {id: id_playlist}}
      }
    });
    res.status(200).json({
      status: 'OK',
      data: song
    });
  } catch (error) {
    res.status(500).json({
      status: 'FAILED',
      data: {
        error: error
      }
    });
  };
};

export const createPlaylist = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, user } = req.body;
    const playlist = await prisma.playlist.create({
      data: {
        name: name,
        user: {connect: {id: user}}
      }
    });
    res.status(201).json({
      status: 'OK',
      data: playlist
    });
  } catch (error) {
    res.status(500).json({
      status: 'FAILED',
      data: {
        error: error
      }
    });
  };
};