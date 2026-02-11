import { Request, Response } from "express";

export class AuthController {
  getMe = (req: Request, res: Response) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    return res.json(req.user);
  };

  logout = (req: Request, res: Response) => {
    req.logout((err) => {
      if (err) return res.status(500).json({ message: "Logout failed" });
      req.session.destroy(() => {
        res.clearCookie("connect.sid");
        return res.json({ message: "Logged out" });
      });
    });
  };
}
