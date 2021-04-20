import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TitleComponent } from './title/title.component';
import { HangmanDisplayComponent } from './hangman-display/hangman-display.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import { WrongLettersComponent } from './wrong-letters/wrong-letters.component';
import { WordComponent } from './word/word.component';
import { ResultDialogComponent } from './result-dialog/result-dialog.component';
import { NotificationLetterComponent } from './notification-letter/notification-letter.component';
import { NgZorroAntdModule, NZ_I18N, en_US, NzMessageModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import en from '@angular/common/locales/en';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    HangmanDisplayComponent,
    WrongLettersComponent,
    WordComponent,
    ResultDialogComponent,
    NotificationLetterComponent
  ],
  imports: [
    BrowserModule,
    NzMessageModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
