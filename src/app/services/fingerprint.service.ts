// src/app/services/fingerprint.service.ts
import { Injectable } from '@angular/core';
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro';

@Injectable({
  providedIn: 'root',
})
export class FingerprintService {
  fpPromise = FingerprintJS.load({ apiKey: 'DFzZWPs6YvAUuPEksHce' });

  async getFingerprint() {
    const fp = await this.fpPromise;
    const result = await fp.get();
    return result.visitorId;
  }
}
