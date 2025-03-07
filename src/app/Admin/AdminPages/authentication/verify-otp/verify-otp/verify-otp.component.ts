import { Component } from '@angular/core';
import { AuthService } from '../../../../../Services/Admin/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EncryptionService } from '../../../../../Services/utilities/encryption.service';
import Swal from 'sweetalert2';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.css'
})
export class VerifyOtpComponent {
  loading:boolean=true;
  otpControls: string[] = ['otp1', 'otp2', 'otp3', 'otp4', 'otp5', 'otp6'];
  otpForm!:FormGroup;
  encryptedContact!:string;
  username!: string;
  otp!: string;
  otpGeneratedTime!: string;
  timer: number=60;
  interval: any;
  resendAttempts: number = 0; // Number of times "Resend OTP" is clicked
  maxResendAttempts: number = 3; // Maximum allowed resend attempts// Initial timer value (60 seconds)
  isErrorMessage = false;
  errorMessage: string = '';

  constructor(
    private authService:AuthService,
    private router:Router,
    private route: ActivatedRoute,
    private encryptSevice: EncryptionService,
    private fb: FormBuilder
  ){
    const controlsConfig: { [key: string]: AbstractControl } = {};
    this.otpControls.forEach((control) => {
      controlsConfig[control] = this.fb.control('', [
        Validators.required,
        Validators.pattern(/^\d$/),
      ]);
    });
    this.otpForm = this.fb.group(controlsConfig);
  }
  async  ngOnInit(){
    this.loading = true;
    console.log("reached verify otp");
    
  // Ensure loading state is set at the beginning

    // Check login status first
    const isLoggedIn =await this.authService.isLoggedIn();
    if (isLoggedIn) {
      this.router.navigate(['/dashboard']); // Redirect to dashboard if logged in
      return;
    }

  
    this.route.queryParams.subscribe(async (params) => {
      this.encryptedContact = params['data'];
      console.log(this.encryptedContact);
      
      console.log("data is:",this.encryptedContact);
      
      try {
        // Ensure encryptedContact exists and is a string
        if (!this.encryptedContact || typeof this.encryptedContact !== 'string') {
          this.router.navigate(['/authentication/login']);
          return;
        }
        console.log(this.encryptedContact);
        
        // ✅ Correctly decrypt data instead of encrypting it again
        this.username = await this.encryptSevice.decryptData(this.encryptedContact);
        console.log("decrypted",this.username);
        console.log(this.username);

        // Ensure decryption was successful
        if (!this.username) {
          this.router.navigate(['/authentication/login']);
          return;
        }

        // ✅ Proceed only if decryption is successful
        await this.sendOtp();
      } catch (error) {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Somthing is wrong.',
          showConfirmButton: false,
          timer: 3000,
          toast: true,
          background: '#f44336',
          color: 'white',
          padding: '10px',
          showCloseButton: true,
        });
        this.router.navigate(['/authentication/login']); // Redirect on unexpected errors
      } finally {
        this.loading = false; // Ensure loading state is updated after processing
      }
    });
  }

  sendOtp() {
    console.log("entered into sendotp");
    
    this.authService.ForgotPassword(this.username).subscribe({
      next: (res) => {
        console.log("returned from forgotpassword");
        
        if (res.status == 200) {
          console.log(res.status);
          
          this.otp = res.data.encryptedOtp;
          this.otpGeneratedTime = res.data.otpGeneratedTime;
          this.startTimer();
        }
        else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: res.message,
            showConfirmButton: false,
            timer: 3000,
            toast: true,
            background: '#f44336',
            color: 'white',
            padding: '10px',
            showCloseButton: true,
          });

          this.router.navigate(['/authentication/login']);
        }
      },
      error: (error) => {
        alert('Somthing is wrong.');

      }
    });
  }

  startTimer(): void {
    this.timer = 60;
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  checkTimeDifference(otpGeneratedTime: any): any {
    // Parse the OTP generated time to a Date object
    const otpTime = new Date(otpGeneratedTime);

    // Get the current time
    const currentTime = new Date();

    // Calculate the time difference in milliseconds
    const timeDifferenceMs = Math.abs(currentTime.getTime() - otpTime.getTime());

    // Convert milliseconds to minutes and check if it's within 1 minute
    const timeDifferenceMinutes = timeDifferenceMs / 1000 / 60;

    return timeDifferenceMinutes;
  }

  moveToNext(event: any, index: number): void {
    const value = event.target.value;
    if (value && index < this.otpControls.length - 1) {
      const nextInput = document.querySelectorAll<HTMLInputElement>(
        '.otp-box input'
      )[index + 1];
      nextInput?.focus();
    }
  }

  moveToPrevious(event: any, index: number): void {
    if (!event.target.value && index > 0) {
      const prevInput = document.querySelectorAll<HTMLInputElement>(
        '.otp-box input'
      )[index - 1];
      prevInput?.focus();
    }
  }

  resendOtp(): void {
    if (this.resendAttempts < this.maxResendAttempts) {
      if (this.username != null) {
        this.resendAttempts++;
        this.authService.ForgotPassword(this.username).subscribe({
          next: (res) => {
            if (res.status == 200) {
              this.otp = res.data.encryptedOtp;

              this.otpGeneratedTime = res.data.otpGeneratedTime;
              this.startTimer();

            }
            else {
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: res.message,
                showConfirmButton: false,
                timer: 3000,
                toast: true,
                background: '#f44336',
                color: 'white',
                padding: '10px',
                showCloseButton: true,
              });
            }
          },
          error: (error) => {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Somthing is wrong.',
              showConfirmButton: false,
              timer: 3000,
              toast: true,
              background: '#f44336',
              color: 'white',
              padding: '10px',
              showCloseButton: true,
            });
          }
        });
      }
      else {
        this.router.navigate(['/authentication/login']);
      }
    } else {
      // Display error message on exceeding resend attempts
      this.isErrorMessage = true;
      this.errorMessage = 'You have exceeded the maximum OTP resend attempts. Please try again later.';
      console.error(this.errorMessage);
      setTimeout(() => {
        this.isErrorMessage = false; // Optionally clear the error message
        this.router.navigate(['/authentication/login']);
      }, 15000);

    }


  }

  verifyOtp(): void {
    if (this.otpForm.valid) {

      if (this.otpGeneratedTime != null
        && this.checkTimeDifference(this.otpGeneratedTime) <= 1
        && this.otp != null) {
        const otpValue = this.otpControls.map((control) =>
          this.otpForm.get(control)?.value
        ).join('');
        this.authService.varifyOtp(otpValue, this.otp).subscribe({
          next: (res) => {
            if (res.status == 200) {
              const data = res.data.userDetails;
              this.router.navigate(['/authentication/reset-password'], {
                queryParams: {
                  data
                },
              });

            }
            else {
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: res.message,
                showConfirmButton: false,
                timer: 3000,
                toast: true,
                background: '#f44336',
                color: 'white',
                padding: '10px',
                showCloseButton: true,
              });
            }
          },
          error: (error) => {
            alert('Somthing is wrong.');
          }
        });
      }
      else {
        alert('Somthing is wrong.');

      }

    } else {
      console.error('Form is invalid');
    }
  }
}
