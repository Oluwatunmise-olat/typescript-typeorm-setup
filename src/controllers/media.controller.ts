import { NextFunction, Request, Response } from "express";

class MediaController {
  mediaUrl(req: Request, res: Response, _: NextFunction) {
    const file = req.file;

    if (!file) return res.status(400).json({});

    // @ts-ignore
    return res.status(200).json({ url: file.location });
  }
}

export default new MediaController();
