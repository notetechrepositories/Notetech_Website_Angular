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
  loading: boolean = false;
  otpControls: string[] = ['otp1', 'otp2', 'otp3', 'otp4', 'otp5', 'otp6'];
  otpForm!: FormGroup;
  encryptedContact!: string;
  username: any;
  otp!: string;
  otpGeneratedTime!: string;
  interval: any;
  timer: number = 30;
  sectiontimer: number = 120;
  sectionInterval: any;
  resendAttempts: number = 0; // Number of times "Resend OTP" is clicked
  maxResendAttempts: number = 3; // Maximum allowed resend attempts// Initial timer value (60 seconds)
  isErrorMessage = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private encryptSevice: EncryptionService,
    private fb: FormBuilder
  ) {
    const controlsConfig: { [key: string]: AbstractControl } = {};
    this.otpControls.forEach((control) => {
      controlsConfig[control] = this.fb.control('', [
        Validators.required,
        Validators.pattern(/^\d$/),
      ]);
    });
    this.otpForm = this.fb.group(controlsConfig);
  }
  async ngOnInit() {
    this.loading = true;


    // Check login status first
    const isLoggedIn = await this.authService.isLoggedIn();
    if (isLoggedIn) {
      this.router.navigate(['/dashboard']); // Redirect to dashboard if logged in
      return;
    }


    this.route.queryParams.subscribe(async (params) => {
      this.encryptedContact = params['data'];


      try {
        // Ensure encryptedContact exists and is a string
        if (!this.encryptedContact || typeof this.encryptedContact !== 'string') {
          this.router.navigate(['/authentication/login']);
          return;
        }



        // ✅ Correctly decrypt data instead of encrypting it again
        var jsonString = await this.encryptSevice.decryptData(this.encryptedContact);


        // Ensure decryption was successful
        if (!jsonString) {
          this.router.navigate(['/authentication/login']);
          return;
        }
        var data = JSON.parse(jsonString);
        if (!jsonString) {
          this.router.navigate(['/authentication/login']);
          return;
        }
        this.otp = data.user.encryptedOtp;
        this.otpGeneratedTime = data.user.otpGeneratedTime;
        this.username = data.email

        if (this.otpGeneratedTime != null
          && this.checkTimeDifference(this.otpGeneratedTime) <= 1
          && this.otp != null) {
          this.startTimer();
          this.startSectionTimer();
          this.loading = false;
        }
        else {
          this.router.navigate(['/authentication/login']);
        }




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
      next: async (res) => {
        console.log("returned from forgotpassword");

        if (res.status == 200) {
          console.log(res.status);

          this.otp = await res.data.encryptedOtp;
          this.otpGeneratedTime = await res.data.otpGeneratedTime;
          if (this.otpGeneratedTime != null
            && this.checkTimeDifference(this.otpGeneratedTime) <= 1
            && this.otp != null) {
            this.startTimer();
            this.startSectionTimer();
            this.loading = false;
          }
          else {
            this.router.navigate(['/authentication/login']);
          }



          this.loading = false;
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

          this.router.navigate(['/authentication/forgot-password']);
        }
      },
      error: (error) => {
        alert('Somthing is wrong.');

      }
    });

  }
  startTimer(): void {
    const otpTime = new Date(this.otpGeneratedTime).getTime(); // Convert OTP time to milliseconds
    const currentTime = new Date().getTime(); // Get current time
    const timeDifference = (otpTime + 30000) - currentTime; // 2 minutes (120000 ms) expiry time



    this.timer = Math.floor(timeDifference / 1000); // Convert to seconds


    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(this.interval);

      }
    }, 1000);
  }

  startSectionTimer(): void {
    const otpTime = new Date(this.otpGeneratedTime).getTime(); // Convert OTP time to milliseconds
    const currentTime = new Date().getTime(); // Get current time
    const timeDifference = (otpTime + 120000) - currentTime; // 2 minutes (120000 ms) expiry time
    console.log(timeDifference);

    if (timeDifference <= 0) {
      this.expireOtpSession(); // Redirect immediately if already expired
      return;
    }

    this.sectiontimer = Math.floor(timeDifference / 1000);
    this.sectionInterval = setInterval(() => {
      if (this.sectiontimer > 0) {
        this.sectiontimer--;
      }
      else {
        this.expireOtpSession(); // Redirect immediately if already expired
      }
    }, 1000);
  }
  expireOtpSession() {

    this.router.navigate(['/authentication/forgot-password']);
    // Swal.fire({
    //   position: 'top-end',
    //   icon: 'warning',
    //   title: 'Section Expired',
    //   showConfirmButton: false,
    //   timer: 3000,
    //   toast: true,
    //   background: '#f44336',
    //   color: 'white',
    //   padding: '10px',
    //   showCloseButton: true,
    // });
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
        this.sendOtp();
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
