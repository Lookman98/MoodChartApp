/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-trailing-spaces */
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Chart , BarElement, BarController, LinearScale, CategoryScale, Title} from 'chart.js';
import { UserInputModalComponent } from '../user-input-modal/user-input-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  @ViewChild('barCanvas') public barCanvas: ElementRef;

  barChart: any;
  labels: string[] = ["Happy", "Sad", "Relaxed", "Stressed"];
  backgroundColor: string[] = [
    'rgba(75, 192, 192, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(255, 99, 132, 0.2)'
  ];

  borderColor:  string[] = [
    'rgb(75, 192, 192)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(255, 99, 132)'
  ];

  chartData = [0,0,0,0];

  constructor( private mdlController: ModalController, private platform: Platform) 
  { Chart.register(BarElement, BarController,LinearScale,CategoryScale,Title); }

  ionViewWillEnter(){
    this.barChartMethod();
  }

 
  async openModal(){
    const modal = await this.mdlController.create({
      component: UserInputModalComponent
    });

    await modal.present();

    const {data: userInput, role} = await modal.onWillDismiss();
    
    if(role === "updated"){
      this.barChart.data.datasets[0].data[0] = userInput.happy;
      this.barChart.data.datasets[0].data[1] = userInput.sad;
      this.barChart.data.datasets[0].data[2] = userInput.relax;
      this.barChart.data.datasets[0].data[3] = userInput.stress;
      this.barChart.update();
    }
  
    
  }


  barChartMethod(){
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          backgroundColor: this.backgroundColor,
          borderColor: this.borderColor,
          borderWidth: 1,
          data:this.chartData,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          }
        },
        plugins:{
          title: {
            display: true,
            text: "My Mood",
            padding: {
              top: 40,
              bottom: 30
          }
          }
        }
        
      }
    });
  }

  closeApp(){
    this.platform.backButton.subscribe( () => {
      navigator['app'].exitApp();
      });
  }

}


