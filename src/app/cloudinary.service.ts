// src/app/cloudinary.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment'; 

@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  private cloudinaryConfig = {
    cloud_name: environment.cloudinary.CLOUD_NAME,
    api_key: environment.cloudinary.API_KEY,
    api_secret: environment.cloudinary.API_SECRET,
  };

  private uploadUrl = `https://api.cloudinary.com/v1_1/${this.cloudinaryConfig.cloud_name}/upload`;

  constructor(private http: HttpClient) {}

  /**
   * Uploads and crops the image to Cloudinary.
   * @param file - The image file to be uploaded.
   * @returns The URL of the uploaded image.
   */
  uploadImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'knuvmbyr'); // Since I dont have signed my upload, I must use a preset

      // Specify transformations as a string
      //formData.append('transformation', 'c_fill,g_auto,w_400,h_400'); //todo: I need to sign if I want to make transformations here

      this.http.post<any>(this.uploadUrl, formData).toPromise()
        .then(response => {
          if (response.secure_url) {
            resolve(response.secure_url);
          } else {
            reject('Image upload failed: No URL returned.');
          }
        })
        .catch(error => {
          console.error('Image upload failed:', error);
          reject(error);
        });
    });
  }
}
