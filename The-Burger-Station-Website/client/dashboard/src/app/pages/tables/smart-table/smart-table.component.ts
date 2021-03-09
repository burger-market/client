import {ThisReceiver} from '@angular/compiler';
import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';

import {SmartTableData} from '../../../@core/data/smart-table';
import {UsersService} from '../../../services/users.service';
import {FormLayoutsComponent} from '../../forms/form-layouts/form-layouts.component';
import Swal from 'sweetalert2'
@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent implements OnInit {

  settings = {
    actions: {
      add: false,
      edit: false,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash" style="color: red!important;"></i>',
      confirmDelete: true,
    },
    columns: {
      _id: {
        title: 'ID',
        type: 'number',
      },
      username: {
        title: 'Username',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },

    },
  };

  source: LocalDataSource = new LocalDataSource();

  table = [{
    id: "",
    name: "",
    username: "",
    email: ""
  },]

  filteredData: Array<any>;

  constructor(private service: SmartTableData, private UsersService: UsersService) {
    this.filteredData = new Array<any>();
  }

  ngOnInit(): void {

    this.updateTable();

  }

  updateTable() {

    this.UsersService.getAllUsers().subscribe((data: any) => {
      this.filteredData = data.data.data;
      // this.updateUsers();
    });
  }


  updateUsers() {
    console.log(this.filteredData);
    this.filteredData.forEach(element => {
      this.table.push({
        id: element._id,
        name: '',
        username: element.username,
        email: element.email
      });
    });
    this.source.load(this.table);
  }

  onEdit() {
    console.log('clicked');
  }

  onCustom(event) {
    alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`);
    console.log('clicked');
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      // event.confirm.resolve();
      this.deleteAdmin(event.data);

    } else {
      event.confirm.reject();
    }
  }

  deleteAdmin(data: any) {
    this.UsersService.deleteUser(data).subscribe(data => {
      Swal.fire({
        title: 'success',
        icon: "success"
      })
      this.updateTable();
    }, error1 => {
      Swal.fire({
        title: 'error',
        icon: "error"
      })
    })
  }
}

