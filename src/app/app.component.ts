// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { FingerprintService } from './services/fingerprint.service';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  email = '';
  visitorId = '';
  message = '';
  isError = false;

  constructor(private fingerprintService: FingerprintService, private apiService: ApiService) {}

  async ngOnInit() {
    this.visitorId = await this.fingerprintService.getFingerprint();
    console.log(this.visitorId);
    this.checkRegistration();
  }

  checkRegistration() {
    this.apiService.check(this.visitorId).subscribe(
      (response) => {
        this.message = `You are registered as ${response.email}, with id ${response.fingerprint_id}`;
        this.isError = false
      },
      (error) => {
        if (error.status === 404) {
          this.message = 'You are not registered. Please enter your email:';
          this.isError = true
        }
      }
    );
  }

  register() {
    this.apiService.register(this.email, this.visitorId).subscribe(
      (response) => {
        this.message = 'Registration successful';
      },
      (error) => {
        this.message = error.error.message;
      }
    );
  }
}
