declare namespace Express {
  export interface Request {
    userId: number,
    isAuthenticated: boolean
  }
}