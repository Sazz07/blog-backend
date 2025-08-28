/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import config from '../config';
import { TCloudinaryResponse } from '../interface/common';

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

const uploadToCloudinary = async (
  file: Express.Multer.File,
): Promise<TCloudinaryResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      (error: Error, result: TCloudinaryResponse) => {
        if (file.path) {
          fs.unlinkSync(file.path);
        }

        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );
  });
};

const deleteFromCloudinary = async (publicId: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error: Error, result: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.result === 'ok');
      }
    });
  });
};

export const FileUploadHelper = {
  uploadToCloudinary,
  deleteFromCloudinary,
};
