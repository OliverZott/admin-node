import { Request, Response } from 'express';
import multer from 'multer';
import { extname } from 'path';
import { send } from 'process';

export const Upload = async (req: Request, res: Response) => {

    const storage = multer.diskStorage({
        destination: './uploads',
        filename(_, file, callback): void {
            const randomName = Math.random().toString(20).substring(2, 12);
            return callback(null, `${randomName}${extname(file.originalname)}`);
        }
    })

    const upload = multer({ storage }).single('image')

    upload(req, res, (err) => {

        if (err) {
            res.send(400).send(err);
        }
        res.send({
            url: `http://localhost:8000/api/uploads/${req.file?.filename}`,
        })
    })

}