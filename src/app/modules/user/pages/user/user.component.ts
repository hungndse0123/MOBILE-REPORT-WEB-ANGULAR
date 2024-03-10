import { Component } from '@angular/core';
import { UsersService } from '../../../../data/services/users/users.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  userList: any;
  selectedUserCondition: string = '';
  minHeightCondition: number = 0;
  dropdownList: any = [
    {
      title: 'All Gender',
      value: ''
    },
    {
      title: 'Male',
      value: 'male'
    },
    {
      title: 'Female',
      value: 'female'
    }
  ];
  myChart: any;

  constructor(
    private usersService: UsersService
  ) {
  }

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe((res: any) => {
      this.userList = res;
      this.loadData(res);
    });
    Chart.register(...registerables);
    this.myChart = new Chart("Users",  {
      type: 'bar',
      data: {
        labels: ["< 20", ">= 20 and <=40", "> 40"],
        datasets: [{
          label: '# of Users',
          data: [],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  onSelectedUserConditionChange(event: any) {
    this.selectedUserCondition = event;
    this.loadData(this.userList);
  }

  onMinHeightConditionChange(event: any) {
    this.minHeightCondition = event;
    this.loadData(this.userList);
  }

  loadData(data: any) {  
    let filteredData = data.users?.filter((x: any) => (this.selectedUserCondition != '' ? x.gender == this.selectedUserCondition : true)
    && (this.minHeightCondition ? x.height >= this.minHeightCondition : true)); 
    this.myChart.data.datasets[0].data = [filteredData?.filter((x: any) => x.age < 20).length,
      filteredData?.filter((x: any) => x.age >= 20 && x.age <= 40).length,
      filteredData?.filter((x: any) => x.age > 40).length ];
    this.myChart.update();
  }
}
