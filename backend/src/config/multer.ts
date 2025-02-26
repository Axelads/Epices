import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';

const storage = multer.memoryStorage();

const imageFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (!file.mimetype.startsWith('image/')) {
    // Cast l'erreur en any pour satisfaire le type attendu par cb
    return cb(new Error('Only image files are allowed!') as any, false);
  }
  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite à 5 Mo
});
