import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFIlePath) => {
  try {
    if (!localFIlePath) return null;
    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFIlePath, {
      resource_type: 'auto',
    });
    // file has been uploaded suceessfully
    console.log('upload done', response.url);
    return response;
  } catch (err) {
    fs.unlinkSync(localFIlePath);
    // locally saved temporary file as the upload operation got failed
    return null;
  }
};
export { uploadOnCloudinary };
