import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const material = [
  MatButtonModule,
  MatIconModule,
  NgbCarouselModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressSpinnerModule
]

@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
