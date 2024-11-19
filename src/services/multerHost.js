import multer from "multer";

/* File extensions for voice */
export const validationExtensions = {
  voice: ["audio/mpeg", "audio/wav", "audio/ogg", "audio/mp3"],
};

const multerHost = () => {
  /* Multer config */
  const storage = multer.diskStorage({});

  const upload = multer({ storage });

  return upload;
};

export default multerHost;
