import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  glowIntensity: number = 1; // Default intensity

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = 300; 
    this.glowIntensity = Math.max(0, 1 - scrollTop / maxScroll); 
  }

  getGlowStyleDecrease(): string {
    const intensity = this.glowIntensity; 
    return `
      0 0 ${7 * intensity}px #05f1f9,
      0 0 ${10 * intensity}px #05f1f9,
      0 0 ${21 * intensity}px #05f1f9,
      0 0 ${42 * intensity}px #0a75bd,
      0 0 ${82 * intensity}px #0a75bd,
      0 0 ${92 * intensity}px #0a75bd,
      0 0 ${102 * intensity}px #0a75bd,
      0 0 ${151 * intensity}px #0a75bd
    `;
  }


}
