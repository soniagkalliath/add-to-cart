import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItemList:any=[];
  productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

//  In Angular, in many cases we need to see the value(s) of a stream in real time and in the same time we need to get access to this stream to many consumers (subscribers). Each subscriber/ consumer will do different things function on the stream value(s). In this situation we have to define a Subject or a BehaviorSubject.
// A BehaviorSubject = a set/ stream of data a subscriber (consumer) can subscribe to. The subscriber can see the NEW data in the stream and also the initial or the LAST value in the stream. If you don't want to see the last value of the stream you have to use Subject in Angular.
constructor() { }

getProducts(){
  return this.productList.asObservable();
}

setProduct(product : any){
  this.cartItemList.push(...product);
  this.productList.next(product);
}
addtoCart(product : any){
  this.cartItemList.push(product);
  this.productList.next(this.cartItemList);
  this.getTotalPrice();
  console.log(this.cartItemList)
}

getTotalPrice() : number{
  let grandTotal = 0;
  this.cartItemList.map((a:any)=>{
    grandTotal += a.total;
  })
  return grandTotal;
}

removeCartItem(product: any){
  this.cartItemList.map((a:any, index:any)=>{
    if(product.id=== a.id){
      this.cartItemList.splice(index,1);
    }
  })
  this.productList.next(this.cartItemList);
}

removeAllCart(){
  this.cartItemList = []
  this.productList.next(this.cartItemList);
}

}
