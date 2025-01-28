// angular import
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartModule } from 'primeng/chart';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

declare const AmCharts: any;

import '../../../assets/charts/amchart/amcharts.js';
import '../../../assets/charts/amchart/gauge.js';
import '../../../assets/charts/amchart/serial.js';
import '../../../assets/charts/amchart/light.js';
import '../../../assets/charts/amchart/pie.min.js';
import '../../../assets/charts/amchart/ammap.min.js';
import '../../../assets/charts/amchart/usaLow.js';
import '../../../assets/charts/amchart/radar.js';
import '../../../assets/charts/amchart/worldLow.js';

import dataJson from 'src/fake-data/map_data';
import mapColor from 'src/fake-data/map-color-data.json';
import {environment} from "../../../environments/environment.development";
import {ApiService} from "../../services/api.service";
//import {ChartOptions} from "../chart/apex-chart/apex-chart.component";


// third party
import { NgApexchartsModule } from 'ng-apexcharts';

import {
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexResponsive,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexGrid
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  colors: string[];
  labels: string[];
  title: ApexTitleSubtitle;
  grid: ApexGrid;
};


@Component({
    selector: 'app-dashboard',
    imports: [SharedModule, ChartModule, NgApexchartsModule],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export default class DashboardComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  barSimpleChart: Partial<ChartOptions>;
  zoneSimpleChart: Partial<ChartOptions>;
  barStackedChart: Partial<ChartOptions>;
  areaAngleChart: Partial<ChartOptions>;
  areaSmoothChart: Partial<ChartOptions>;
  lineAreaChart: Partial<ChartOptions>;
  donutChart: Partial<ChartOptions>;
  monthlyBillPaymentChart: Partial<ChartOptions>;

  APP_CURRENCY = environment.APP_CURRENCY;
  APP_NAME = environment.APP_NAME;
  user: any;
  noOfProperties: number = 0;
  noOfBills: number = 0;
  objections:number = 0;
  billAmount:number = 0;
  amountPaid: number = 0;
  sales:any [] = [];
  card:any [] = [];
  billChartData: any;
  distributionByZonesData: any;
  distributionByLGAData: any;
  subZoneLabels:any = [];
  subZoneData:any = [];


  currentYear = new Date().getFullYear();
  selectedYear = new Date().getFullYear();
  options: any;
  lgaOptions: any;
  labels:any = [];
  labelData:any = [];

  constructor(private apiService: ApiService) {

  }



  ngOnInit() {

    this.loadDashboardContent(this.currentYear);
    this.loadPropertyDistributionByZones(this.currentYear);
    this.loadBillChart(this.currentYear);
    this.loadDashboardCharts(this.currentYear);
    this.options = {
      responsive: false,
      maintainAspectRatio: false
    };



    setTimeout(() => {
      const latlong = dataJson;

      const mapData = mapColor;

      const minBulletSize = 3;
      const maxBulletSize = 70;
      let min = Infinity;
      let max = -Infinity;
      let i;
      let value;
      for (i = 0; i < mapData.length; i++) {
        value = mapData[i].value;
        if (value < min) {
          min = value;
        }
        if (value > max) {
          max = value;
        }
      }

      const maxSquare = maxBulletSize * maxBulletSize * 2 * Math.PI;
      const minSquare = minBulletSize * minBulletSize * 2 * Math.PI;

      const images = [];
      for (i = 0; i < mapData.length; i++) {
        const dataItem = mapData[i];
        value = dataItem.value;

        let square = ((value - min) / (max - min)) * (maxSquare - minSquare) + minSquare;
        if (square < minSquare) {
          square = minSquare;
        }
        const size = Math.sqrt(square / (Math.PI * 8));
        const id = dataItem.code;

        images.push({
          type: 'circle',
          theme: 'light',
          width: size,
          height: size,
          color: dataItem.color,
          longitude: latlong[id].longitude,
          latitude: latlong[id].latitude,
          title: dataItem.name + '</br> [ ' + value + ' ]',
          value: value
        });
      }

      // world-low chart
      AmCharts.makeChart('world-low', {
        type: 'map',
        projection: 'eckert6',

        dataProvider: {
          map: 'worldLow',
          images: images
        },
        export: {
          enabled: true
        }
      });

      const chartDatac = [
        {
          day: 'Mon',
          value: 60
        },
        {
          day: 'Tue',
          value: 45
        },
        {
          day: 'Wed',
          value: 70
        },
        {
          day: 'Thu',
          value: 55
        },
        {
          day: 'Fri',
          value: 70
        },
        {
          day: 'Sat',
          value: 55
        },
        {
          day: 'Sun',
          value: 70
        }
      ];

      // widget-line-chart
      AmCharts.makeChart('widget-line-chart', {
        type: 'serial',
        addClassNames: true,
        defs: {
          filter: [
            {
              x: '-50%',
              y: '-50%',
              width: '200%',
              height: '200%',
              id: 'blur',
              feGaussianBlur: {
                in: 'SourceGraphic',
                stdDeviation: '30'
              }
            },
            {
              id: 'shadow',
              x: '-10%',
              y: '-10%',
              width: '120%',
              height: '120%',
              feOffset: {
                result: 'offOut',
                in: 'SourceAlpha',
                dx: '0',
                dy: '20'
              },
              feGaussianBlur: {
                result: 'blurOut',
                in: 'offOut',
                stdDeviation: '10'
              },
              feColorMatrix: {
                result: 'blurOut',
                type: 'matrix',
                values: '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .2 0'
              },
              feBlend: {
                in: 'SourceGraphic',
                in2: 'blurOut',
                mode: 'normal'
              }
            }
          ]
        },
        fontSize: 15,
        dataProvider: chartDatac,
        autoMarginOffset: 0,
        marginRight: 0,
        categoryField: 'day',
        categoryAxis: {
          color: '#fff',
          gridAlpha: 0,
          axisAlpha: 0,
          lineAlpha: 0,
          offset: -20,
          inside: true
        },
        valueAxes: [
          {
            fontSize: 0,
            inside: true,
            gridAlpha: 0,
            axisAlpha: 0,
            lineAlpha: 0,
            minimum: 0,
            maximum: 100
          }
        ],
        chartCursor: {
          valueLineEnabled: false,
          valueLineBalloonEnabled: false,
          cursorAlpha: 0,
          zoomable: false,
          valueZoomable: false,
          cursorColor: '#fff',
          categoryBalloonColor: '#51b4e6',
          valueLineAlpha: 0
        },
        graphs: [
          {
            id: 'g1',
            type: 'line',
            valueField: 'value',
            lineColor: '#ffffff',
            lineAlpha: 1,
            lineThickness: 3,
            fillAlphas: 0,
            showBalloon: true,
            balloon: {
              drop: true,
              adjustBorderColor: false,
              color: '#ffffff',
              fillAlphas: 0.2,
              bullet: 'round',
              bulletBorderAlpha: 1,
              bulletSize: 5,
              hideBulletsCount: 50,
              lineThickness: 2,
              useLineColorForBulletBorder: true,
              valueField: 'value',
              balloonText: '<span style="font-size:18px;">[[value]]</span>'
            }
          }
        ]
      });
    }, 500);
  }
  loadPropertyDistributionByZones(year){
    this.apiService.get(`billing/property-distribution/${year}`).subscribe((result:any)=>{
      this.subZoneLabels = [];
      this.subZoneData = [];
      this.distributionByZonesData = result;
      this.distributionByZonesData.map((dt)=>{
        this.subZoneLabels.push(dt.zoneName);
        this.subZoneData.push(dt.totalProperties);
      });
      this.zoneSimpleChart = {
        series: [
          {
            name: 'Properties',
            data: this.subZoneData
          },
        ],
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%'
          }
        },
        dataLabels: {
          enabled: true
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: this.subZoneLabels
        },
        yaxis: {
          title: {
            text: '# of Properties'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return  val.toLocaleString()
            }
          }
        }
      };

    },error => {
      //this.errorBag = error.message
    })
  }

  filterDashboardRecord()
  {
    this.currentYear = this.selectedYear;
    this.sales = [];
    this.card = [];
    this.loadDashboardContent(this.selectedYear);
    this.loadPropertyDistributionByZones(this.selectedYear);
    this.loadBillChart(this.selectedYear);
    this.loadDashboardCharts(this.selectedYear);
  }

  loadBillChart(year){
    this.apiService.get(`billing/chart-summary/${year}`).subscribe((result:any)=>{
      this.labelData = [];
      this.labels = [];
      this.billChartData = result;
      this.billChartData.labels.map((lb)=>{
        this.labels.push(lb);
      });
        this.labelData = this.billChartData.datasets[0].data
      this.monthlyBillPaymentChart = {
        chart: {
          type: 'pie',
          width: '100%',
          height: 350
        },
        dataLabels: {
          enabled: true
        },
        plotOptions: {
          pie: {
            customScale: 0.8,
            donut: {
              size: '75%'
            },
            offsetY: 20
          }
        },
        colors: ['#00D8B6', '#008FFB', '#FF0000',
          '#909912', '#190789', '#889199',
          '#871290', '#165945', '#908078',
          '#99FFA1', '#121212', '#DEDEDE'
        ],
        series: this.labelData,
        labels: this.labels,
        legend: {
          position: 'left',
          offsetY: 80
        }
      };

    },error => {
      //this.errorBag = error.message
    })
  }

  fetchMonthlyBillAmount(year){
    this.apiService.get(`chart-record/${year}`).subscribe((result:any)=>{
      let donutData = result.byZones;
      let labels = [];
      let labelData = [];
      donutData.map((val)=>{
        let labelAmount = `${val.sub_zone}: ₦${val.total_bills.toLocaleString()}`;
        labels.push(labelAmount)
        labelData.push(val.total_bills)
      })
      this.barSimpleChart = {
        series: [
          {
            name: 'Bill Amount',
            data: result.billAmount
          },
          {
            name: 'Amount Paid',
            data: result.amountPaid
          }
        ],
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yaxis: {
          title: {
            text: '₦ (Amount)'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return '₦ ' + val.toLocaleString() //+ ' thousands';
            }
          }
        }
      };
      this.donutChart = {
        chart: {
          type: 'donut',
          width: '100%',
          height: 350
        },
        dataLabels: {
          enabled: true
        },
        plotOptions: {
          pie: {
            customScale: 0.8,
            donut: {
              size: '75%'
            },
            offsetY: 20
          }
        },
        colors: ['#00D8B6', '#008FFB', '#FF0000',
          '#909912', '#190789', '#889199',
          '#871290', '#165945', '#908078',
          '#99FFA1', '#121212', '#DEDEDE'
        ],
        series: labelData,//[21, 23, 19, 14],
        labels: labels,//['A', 'B', 'C', 'D'],
        legend: {
          position: 'left',
          offsetY: 80
        }
      };

    },error => {
      //this.errorBag = error.message
    })
  }
  loadDashboardContent(year){
    this.apiService.get(`dashboard/statistics/${year}`).subscribe((result:any)=>{
      this.noOfBills = result.data.noOfBills;
      this.noOfProperties = result.data.noOfProperties;
      this.amountPaid = result.data.amountPaid;
      this.objections = result.data.objections;
      this.billAmount = result.data.billAmount;
      this.sales.push(
        {
          title: 'Bill Amount',
          //icon: 'icon-arrow-up text-c-green',
          amount: '₦'+this.billAmount,
          //percentage: '67%',
          //progress: 50,
          design: 'col-md-6'
        },
        {
          title: 'Amount Paid',
          //icon: 'icon-arrow-down text-c-red',
          amount: '₦'+this.amountPaid,
          //percentage: '36%',
          //progress: 35,
          design: 'col-md-6'
        },
        {
          title: 'No. of Properties',
          //icon: 'icon-arrow-up text-c-green',
          amount: this.noOfProperties,
          //percentage: '80%',
          //progress: 70,
          design: 'col-md-12'
        }
      );
      this.card.push(
       /* {
          design: 'border-bottom',
          number: this.noOfBills,
          text: 'NO. OF BILLS',
          icon: 'icon-zap text-c-green'
        },*/
        {
          number: this.objections,
          text: 'NO. OF OBJECTIONS',
          icon: 'icon-alert-triangle text-c-blue'
        }
      );

    },error => {
      //this.errorBag = error.message
    })
  }

  loadDashboardCharts(year){
    this.fetchMonthlyBillAmount(year);
    this.barStackedChart = {
      series: [
        {
          name: 'PRODUCT A',
          data: [44, 55, 41, 67, 22, 43, 21, 49]
        },
        {
          name: 'PRODUCT B',
          data: [13, 23, 20, 8, 13, 27, 33, 12]
        },
        {
          name: 'PRODUCT C',
          data: [11, 17, 15, 15, 21, 14, 15, 13]
        }
      ],
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        stackType: '100%'
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      xaxis: {
        categories: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2', '2012 Q3', '2012 Q4']
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'right',
        offsetX: 0,
        offsetY: 50
      }
    };
    this.areaAngleChart = {
      chart: {
        height: 380,
        type: 'area',
        stacked: false
      },
      stroke: {
        curve: 'straight'
      },
      series: [
        {
          name: 'Music',
          data: [11, 15, 26, 20, 33, 27]
        },
        {
          name: 'Photos',
          data: [32, 33, 21, 42, 19, 32]
        }
      ],
      xaxis: {
        categories: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2']
      },
      tooltip: {
        followCursor: true
      },
      fill: {
        opacity: 1
      }
    };
    this.areaSmoothChart = {
      series: [
        {
          name: 'series1',
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: 'series2',
          data: [11, 32, 45, 32, 34, 52, 41]
        }
      ],
      chart: {
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19T00:00:00.000Z',
          '2018-09-19T01:30:00.000Z',
          '2018-09-19T02:30:00.000Z',
          '2018-09-19T03:30:00.000Z',
          '2018-09-19T04:30:00.000Z',
          '2018-09-19T05:30:00.000Z',
          '2018-09-19T06:30:00.000Z'
        ]
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        }
      }
    };
    this.lineAreaChart = {
      series: [
        {
          name: 'Desktops',
          data: [20, 55, 45, 75, 50, 75, 100]
        },
        {
          name: 'Desktops',
          data: [10, 45, 35, 65, 40, 65, 90]
        }
      ],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Product Trends by Month',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: ['2006', '2007', '2008', '2009', '2010', '2011', '2012']
      }
    };
  }

  social_card = [
    {
      design: 'col-md-12',
      icon: 'fab fa-facebook-f text-primary',
      amount: '12,281',
      percentage: '+7.2%',
      color: 'text-c-green',
      target: '35,098',
      progress: 60,
      duration: '3,539',
      progress2: 45
    },
    {
      design: 'col-md-6',
      icon: 'fab fa-twitter text-c-blue',
      amount: '11,200',
      percentage: '+6.2%',
      color: 'text-c-purple',
      target: '34,185',
      progress: 40,
      duration: '4,567',
      progress2: 70
    },
    {
      design: 'col-md-6',
      icon: 'fab fa-google-plus-g text-c-red',
      amount: '10,500',
      percentage: '+5.9%',
      color: 'text-c-blue',
      target: '25,998',
      progress: 80,
      duration: '7,753',
      progress2: 50
    }
  ];

  progressing = [
    {
      number: '5',
      amount: '384',
      progress: 70
    },
    {
      number: '4',
      amount: '145',
      progress: 35
    },
    {
      number: '3',
      amount: '24',
      progress: 25
    },
    {
      number: '2',
      amount: '1',
      progress: 10
    },
    {
      number: '1',
      amount: '0',
      progress: 0
    }
  ];

  tables = [
    {
      src: 'assets/images/user/avatar-1.jpg',
      title: 'Isabella Christensen',
      text: 'Lorem Ipsum is simply dummy',
      time: '11 MAY 12:56',
      color: 'text-c-green'
    },
    {
      src: 'assets/images/user/avatar-2.jpg',
      title: 'Ida Jorgensen',
      text: 'Lorem Ipsum is simply',
      time: '11 MAY 10:35',
      color: 'text-c-red'
    },
    {
      src: 'assets/images/user/avatar-3.jpg',
      title: 'Mathilda Andersen',
      text: 'Lorem Ipsum is simply dummy',
      time: '9 MAY 17:38',
      color: 'text-c-green'
    },
    {
      src: 'assets/images/user/avatar-1.jpg',
      title: 'Karla Soreness',
      text: 'Lorem Ipsum is simply',
      time: '19 MAY 12:56',
      color: 'text-c-red'
    },
    {
      src: 'assets/images/user/avatar-2.jpg',
      title: 'Albert Andersen',
      text: 'Lorem Ipsum is',
      time: '21 July 12:56',
      color: 'text-c-green'
    }
  ];
}

