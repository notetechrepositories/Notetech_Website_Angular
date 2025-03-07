import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding">
      <a href="/">
        <img

          src="./assets/images/notetech-logo.png"

          class="align-middle m-2"
          alt="logo"
          height="60"
   
          style="padding: 7px;"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() { }
}
