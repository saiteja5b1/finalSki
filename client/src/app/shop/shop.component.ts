import { ShopService } from './shop.service';
import { IProduct } from './../shared/models/product';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @ViewChild('search',{static:false}) searchText: ElementRef | undefined;
  products: IProduct[] | undefined;
  brands: IBrand[] | undefined;
  types: IType[] | undefined;
  shopParams = new ShopParams();
  totalCount:number = 0;
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
    this.shopService.getProducts(this.shopParams).subscribe(response =>{
      if(response!= null){
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
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
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onTypeSelected(typeId:number){
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onSortSelected(sort:string){
    this.shopParams.sort = sort;
    this.getProducts();
  }
  onPageChanged(event:any){
    if(this.shopParams.pageNumber!==event){
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }
  onSearch(){
    this.shopParams.search = this.searchText?.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onReset(){
    if(this.searchText){
      this.searchText.nativeElement.value = '';
    }

    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
