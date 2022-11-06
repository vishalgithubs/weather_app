import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';
import { LocationServiceService } from 'src/app/services/location-service.service';
Chart.register(...registerables);

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, AfterViewInit {

  @ViewChild('lineCanvas') private lineCanvas!: ElementRef;

  lineChart: any;
  doubleLineChart: any;
  doubleLineCanvas: any;

  constructor(private locationService: LocationServiceService) { }

  latitude: any = '';
  longitude: any = '';

  date = [];
  count: any = '';
  temp: any = '';
  IamData: any = '';

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getposition();
  }

  getposition() {
    this.locationService.getPosition().then(pos => {
      console.log(`Positon: ${pos.lng} ${pos.lat}`);
      this.latitude = pos.lat;
      this.longitude = pos.lng;
      this.initialfunction();
    });
  }

  initialfunction() {
    this.locationService.getGraphWeather(this.latitude, this.longitude).subscribe(data => {
      console.log(data);
      this.IamData = data;
      this.count = data.cnt;
      console.log(this.count);
      this.store();


      // for (let i = 0; i <= this.count; i++) {
      //   this.date = data.list[i].dt_txt.map((coins: any) => coins.date);
      //   console.log(this.date)
      // }
    });

  }

  groupList: any = [];
  groupTemp: any = [];
  groupMinTemp: any = [];
  groupMaxTemp: any = [];
  allData: any = [];
  convertedtemp: any = '';
  tempToBeConverted: any = '';
  minTempToBeConverted: any = '';
  convertedminTemp: any = '';
  maxTempToBeConverted: any = '';
  convertedmaxTemp: any = '';
  store() {
    for (let i = 0; i < this.count; i++) {
      this.groupList.push(this.IamData.list[i].dt_txt);

      this.tempToBeConverted = this.IamData.list[i].main.temp;
      this.convertedtemp = this.tempToBeConverted + -273.15;
      this.groupTemp.push(this.convertedtemp);

      this.minTempToBeConverted = this.IamData.list[i].main.temp_min;
      this.convertedminTemp = this.minTempToBeConverted + -273.15;
      this.groupMinTemp.push(this.convertedminTemp);
      
      this.maxTempToBeConverted = this.IamData.list[i].main.temp_max;
      this.convertedmaxTemp = this.maxTempToBeConverted + -273.15;
      this.groupMaxTemp.push(this.convertedmaxTemp);

      this.allData.push({ date: this.IamData.list[i].dt_txt, temp: this.convertedtemp, min_temp: this.convertedminTemp, max_temp: this.convertedmaxTemp });
    }
    // console.log(this.groupList);
    // console.log(this.groupTemp);
    console.log(this.allData);
    // this.lineChartMethod();
    this.lineChartMethod();
    // this.date = this.IamData.list.push(newValue);
    // this.date = this.IamData.list.dt.push(this.date);
  }

  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas?.nativeElement, {
      type: 'line',
      data: {
        labels: this.groupList,
        datasets: [
          {
            label: 'Temperature',
            //  lineTension: 0.2, 
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 5,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.groupTemp,
            spanGaps: false,
          },
          {
            label: 'Min Temp',
            //  lineTension: 0.2, 
            fill: false,
            backgroundColor: 'rgb(255,192,100)',
            borderColor: 'rgb(255,192,100)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgb(255,192,100)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 9,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgb(255,192,100)',
            pointHoverBorderColor: 'rgb(255,192,100)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.groupMinTemp,
            spanGaps: false,
          },
          {
            label: 'Max Temp',
            //  lineTension: 0.2, 
            fill: false,
            backgroundColor: '#033BCC',
            borderColor: 'rgb(35,91,236)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#033BCC',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 13,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#033BCC',
            pointHoverBorderColor: '#033BCC',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.groupMaxTemp,
            spanGaps: false,
          }
        ],
      },
    });
  }
}