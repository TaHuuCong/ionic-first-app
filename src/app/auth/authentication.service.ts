import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);   // user is not authenticated (false)

  constructor(
    private storage: Storage,
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      this.getToken();
    });
  }

  getToken() {
    return this.storage.get(TOKEN_KEY).then(
      res => {
        if (res) {
          this.authenticationState.next(true);        // user is authenticated (true)
        }
      }
    );
  }

  login() {
    return this.storage.set(TOKEN_KEY, 'congta12345').then(() => {
      this.authenticationState.next(true);
    });
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated(): boolean {
    return this.authenticationState.value;
  }
}
