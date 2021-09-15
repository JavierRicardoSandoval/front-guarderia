import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PetService } from '../../services/pet.service';
import { OwnerService } from '../../services/owner.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  formSearch: FormGroup;

  pets: any = new MatTableDataSource();
  columnsTablePets: string[] = ['id', 'name', 'breed', 'last_deworming', 'physical_features'];

  owners: any = new MatTableDataSource();
  columnsTableOwners: string[] = ['cedula', 'fullname', 'phone', 'email'];

  constructor(
    private fb: FormBuilder,
    private petService: PetService,
    private ownerService: OwnerService
  ) { }

  ngOnInit(): void {
    this.formSearch = this.fb.group({
      tipo: ['1', []],
      nombre: ['', [Validators.required]]
    });
  }

  onSubmitSearch(){
    if(this.formSearch.controls['tipo'].value == 1){
      this.petService.searchPets(this.formSearch.controls['nombre'].value).subscribe((data)=> {
        this.pets.data = data;
      });
    } else{
      this.ownerService.searchOwners(this.formSearch.controls['nombre'].value).subscribe((data)=> {
        this.owners.data = data;
      });
    }
  }

}
