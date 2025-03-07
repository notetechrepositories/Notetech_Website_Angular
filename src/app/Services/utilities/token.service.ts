import { Injectable } from '@angular/core';
import { EncryptionService } from './encryption.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private encytSevice: EncryptionService) { }

  async storeToken(data: any): Promise<void> {
    if (!data || !data.token || !data.userDetail) {
      return;
    }

    try {
      localStorage.clear();


      const encryptedToken = await this.encytSevice.encryptData(data.token);
      const encryptedUserDetail = await this.encytSevice.encryptData(JSON.stringify(data.userDetail));

      localStorage.setItem('token', encryptedToken);
      localStorage.setItem('userDetail', encryptedUserDetail);

    } catch (error) {
      console.error('Encryption failed:', error);
    }
  }

  async getUserData(): Promise<string | null> {


    const encryptedUserData = localStorage.getItem('userDetail');

    if (!encryptedUserData) {
      return null;
    }

    try {
      const decryptedUserData = await this.encytSevice.decryptData(encryptedUserData);

      if (!decryptedUserData) {
        throw new Error("User Detail decryption failed.");
      }

      return decryptedUserData;
    } catch (error) {
      return null;
    }
  }
  async getToken(): Promise<string | null> {


    const encryptedToken = localStorage.getItem('token');

    if (!encryptedToken) {
      return null;
    }

    try {
      const decryptedToken = await this.encytSevice.decryptData(encryptedToken);

      if (!decryptedToken) {
        throw new Error("Token decryption failed.");
      }

      return decryptedToken;
    } catch (error) {
      return null;
    }
  }

  async removeToken() {
    localStorage.clear();

  }

  isTokenExpired(token: string | null): boolean {
    try {
      if (token) {
        const decodedToken: any = 
        (token);

        // Extract the expiration time (exp) from the decoded token
        const expirationTime = decodedToken.exp;

        // Get the current time in seconds
        const currentTime = Math.floor(Date.now() / 1000);

        // Check if the token is expired
        return expirationTime < currentTime;
      }
      return true;

      // Decode the token

    } catch (error) {
      console.error("Error decoding token", error);
      return true;  // If decoding fails, assume the token is expired or invalid
    }
  }
}
