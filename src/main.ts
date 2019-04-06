import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => {
    let splashScreen = document.getElementById('app-splash-screen');
    splashScreen.setAttribute('class', 'loaded');
    setTimeout(function(){ splashScreen.remove(); }, 2000);
  })
  .catch(err => console.log(err));
