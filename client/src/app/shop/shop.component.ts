import { ShopService } from './shop.service';
import { IProduct } from './../shared/models/product';
import { Component, OnInit } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: IProduct[] | undefined;
  brands: IBrand[] | undefined;
  types: IType[] | undefined;
  selectedBrandId:number | undefined = 0;
  selectedTypeId:number | undefined = 0;
  sortSelected = 'name';
  sortOptions = [
    {name:'Alphabetical',value:'name'},
    {name:'Price: High to Low',value:'priceDesc'},
    {name:'Price: Low to High',value:'priceAsc'}
  ];
  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }
  getProducts(){
    this.shopService.getProducts(this.selectedBrandId,this.selectedTypeId,this.sortSelected).subscribe(response =>{
      if(response!= null){
        this.products = response.data;
      }
    },error => {
      console.log(error);
    })
  }
  getBrands(){
    this.shopService.getBrands().subscribe(response => {
      this.brands = [{id:0,name:"All"}, ...response];
    },error =>{
      console.log(error);
    })
  }
  getTypes(){
    this.shopService.getTypes().subscribe(response => {
      this.types = [{id:0,name:"All"}, ...response];
    },error => {
      console.log(error);
    })
  }
  onBrandSelected(brandId:number){
    this.selectedBrandId = brandId;
    this.getProducts();
  }
  onTypeSelected(typeId:number){
    this.selectedTypeId = typeId;
    this.getProducts();
  }
  onSortSelected(sort:string){
    this.sortSelected = sort;
    this.getProducts();
  }
}
