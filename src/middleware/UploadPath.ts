import fs from 'fs-extra';
import path from 'path';

const uploadPath = path.join(__dirname, '../wwwroot/upload'); // Register the upload path
fs.ensureDir(uploadPath);

export default uploadPath;
