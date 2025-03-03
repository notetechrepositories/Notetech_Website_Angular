import { Component } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environment';
import { MasterService } from '../../../Services/User/master.service';
import { PageDetailsContentModel } from '../home/home.component';

@Component({
  selector: 'app-common-page-2',
  templateUrl: './common-page-2.component.html',
  styleUrl: './common-page-2.component.css'
})
export class CommonPage2Component {
  pageId: string | null = '';
  pageContent!: PageDetailsContentModel;
  pageTitle!: SafeHtml;
  title!: SafeHtml;
  isLoading = true;
  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer,
    private settingService: MasterService) { }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(params => {
      this.pageId = params.get('id');
      this.getSettings();// Fetch the dynamic id

    });
    console.log('Page ID:', this.pageId);
    await this.getSettings();
  }
  async getSettings(): Promise<void> {
    this.settingService.getPage(this.pageId).subscribe({
      next: (res) => {
        if (res.status === 200) {
          console.log(res.data.pageContent);

          this.pageContent = res.data.pageContent;
          this.pageTitle = this.sanitizer.bypassSecurityTrustHtml(this.pageContent.page_title ?? '');
          this.title = this.sanitizer.bypassSecurityTrustHtml(this.pageContent.title ?? '');
          this.pageContent.page_background_image = environment.baseUrlWithOutApiString + this.pageContent.page_background_image


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

        }
      },
      error: () => {

      }
    });
  }
}
