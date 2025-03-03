import { Component } from '@angular/core';
import { SafeHtml, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environment';
import { MasterService } from '../../../Services/User/master.service';
import { PageDetailsContentModel } from '../home/home.component';
import { SettingsData } from '../../Layout/full/full.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  pageId: string | null = '';
  isLoading = false;
  pageTitle!: SafeHtml;
  pageContent!: PageDetailsContentModel;
  settings!: SettingsData;
  title!: SafeHtml;
  address!: SafeHtml;
  contactForm!: FormGroup;
  googleMapUrl!: SafeResourceUrl;
  constructor(private route: ActivatedRoute, private router: Router,
    private sanitizer: DomSanitizer, private fb: FormBuilder,
    private masterService: MasterService) {


  }
  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  async ngOnInit(): Promise<void> {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: [''],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
    await this.getSettings();
  }
  async getSettings(): Promise<void> {
    this.masterService.getContactUs().subscribe({
      next: (res) => {
        if (res.status === 200) {
          console.log(res.data.pageContent);

          this.pageContent = res.data.pageContent;
          this.settings = res.data.settings;
          this.pageTitle = this.sanitizer.bypassSecurityTrustHtml(this.pageContent.page_title ?? '');
          this.title = this.sanitizer.bypassSecurityTrustHtml(this.pageContent.title ?? '');
          this.address = this.sanitizer.bypassSecurityTrustHtml(this.settings.address ?? '');
          this.pageContent.page_background_image = environment.baseUrlWithOutApiString + this.pageContent.page_background_image
          this.googleMapUrl = this.sanitizeUrl(this.settings.google_map_embedded);

          if (this.pageContent.pagesModels) {
            this.pageContent.pagesModels = this.pageContent.pagesModels.map(item => ({
              ...item,
              home_image: item.home_image
                ? `${environment.baseUrlWithOutApiString}${item.home_image}`
                : '' // Use undefined instead of null
            }));
          }
          if (this.pageContent.section_two) {
            this.pageContent.section_two = this.pageContent.section_two.map(item => ({
              ...item,
              home_image: item.home_image
                ? `${environment.baseUrlWithOutApiString}${item.home_image}`
                : '' // Use undefined instead of null
            }));
          }
          if (this.pageContent.main) {
            this.pageContent.main = this.pageContent.main.map(item => ({
              ...item,
              home_image: item.home_image
                ? `${environment.baseUrlWithOutApiString}${item.home_image}`
                : '' // Use undefined instead of null
            }));
          }
          this.isLoading = false;
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: () => {
        this.router.navigate(['/home']);
      }
    });
  }
  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form Submitted:', this.contactForm.value);
      this.masterService.insertContactUs(this.contactForm.value).subscribe({
        next: (res) => {
          if (res.status === 200) {
            alert('Form Submitted Successfully!');

            this.contactForm.reset(); // Reset form after submission
          } else {
            this.router.navigate(['/home']);
          }
        },
        error: () => {
          this.router.navigate(['/home']);
        }
      });

    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
}
