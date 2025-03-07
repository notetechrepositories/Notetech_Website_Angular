import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private key: string = 'Zm94Zm9ybXdob2xlZ3VudGhpbmdmb2d3b2xmbGFtcGJyZWF0aGluZ3BsYXRlc21pbmU='; // Change this key for better security
  constructor() { }

  // Simple XOR encryption (HTTP-compatible)
  private xorEncrypt(data: string): string {
    let encrypted = '';
    for (let i = 0; i < data.length; i++) {
      encrypted += String.fromCharCode(data.charCodeAt(i) ^ this.key.charCodeAt(i % this.key.length));
    }
    return btoa(encrypted); // Convert to Base64 for storage
  }

  // Simple XOR decryption
  private xorDecrypt(encryptedData: string): string {
    let decoded = atob(encryptedData); // Convert from Base64
    let decrypted = '';
    for (let i = 0; i < decoded.length; i++) {
      decrypted += String.fromCharCode(decoded.charCodeAt(i) ^ this.key.charCodeAt(i % this.key.length));
    }
    return decrypted;
  }

  // Encrypt and store data
  encryptData(data: string): string {
    return this.xorEncrypt(data);
  }

  // Decrypt stored data
  decryptData(encryptedData: string): string {
    console.log("Entered to decryptData",encryptedData);
    
    return this.xorDecrypt(encryptedData);
  }
}
