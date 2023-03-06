import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { connect } from "http2";

const prisma = new PrismaClient();

export const getSong = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const song = await prisma.song.findUnique({
      where: {id: Number(id)}
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

export const getAllSongs = async (req: Request, res: Response): Promise<void> => {
  const  isAuthenticated  = req.isAuthenticated;
  if (isAuthenticated) {
    try {
      const songs = await prisma.song.findMany();
      res.status(200).json({
        status: 'OK',
        data: songs
      });
    } catch (error) {
      res.status(500).json({
        status: 'FAILED',
        data: {
          error: error
        }
      });
    }
  } else {
    try {
      const songs = await prisma.song.findMany({
        where: {is_private: false}
      });
      res.status(200).json({
        status: 'OK',
        data: songs
      });
    } catch (error) {
      res.status(500).json({
        status: 'FAILED',
        data: {
          error: error
        }
      });
    }
  }
};

export const createSong = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, artist, album, year, genre, is_private, duration, playlist } = req.body;
    if (playlist) {
      const song = await prisma.song.create({
        data: {
          name: name,
          artist: artist,
          album: album,
          year: year,
          genre: genre,
          is_private: is_private,
          duration: duration,
          playlist: {connect: {id: playlist}}
        }
      });
      res.status(201).json({
        status: 'OK',
        data: song
      });
    } else {
      const song = await prisma.song.create({
        data: {
          name: name,
          artist: artist,
          album: album,
          year: year,
          genre: genre,
          is_private: is_private,
          duration: duration,
          playlist
      }
    });
    res.status(201).json({
      status: 'OK',
      data: song
    });
    }
  } catch (error) {
    res.status(500).json({
      status: 'FAILED',
      data: {
        error: error
      }
    });
  };
};