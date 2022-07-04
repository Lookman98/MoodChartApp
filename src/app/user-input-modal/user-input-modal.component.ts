/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-user-input-modal',
  templateUrl: './user-input-modal.component.html',
  styleUrls: ['./user-input-modal.component.scss'],
})
export class UserInputModalComponent {
  happyInput = new FormControl(null, Validators.max(20));
  sadInput = new FormControl(null, Validators.max(20));
  relaxedInput = new FormControl(null, Validators.max(20));
  stressInput = new FormControl(null, Validators.max(20));


  constructor(private mdlController: ModalController) { }

  closeModal(){
    this.mdlController.dismiss(null, 'cancel');
  }

  updateMood(){
    // console.log(this.happyInput.value);
    // console.log(this.sadInput.value);
    // console.log(this.relaxedInput.value);
    // console.log(this.stressInput.value);
    // console.log(this.newMoodInput);
    this.mdlController.dismiss({happy: this.happyInput.value, sad: this.sadInput.value, relax: this.relaxedInput.value, stress: this.stressInput.value}, 'updated');
  }

}
