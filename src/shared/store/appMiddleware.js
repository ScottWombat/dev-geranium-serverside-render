import {WOMEN_PRODUCTS_RETRIEVAL,MEN_PRODUCTS_RETRIEVAL,ADD_TO_CART} from '../actionTypes';

export const appMiddleware = (store) => (next) => (action) => {
    
  if(action.type === WOMEN_PRODUCTS_RETRIEVAL) {
     
      if(localStorage['womenProductList'] !== null){
          localStorage.removeItem('womenProductList');
      }
      localStorage.setItem('womenProductList', JSON.stringify(action.womenProductList.data.productByProductType));
  }

  if(action.type === MEN_PRODUCTS_RETRIEVAL) {
     
      if(localStorage['menProductList'] !== null){
          localStorage.removeItem('menProductList');
      }
      localStorage.setItem('menProductList', JSON.stringify(action.menProductList.data.productByProductType));
  }
    
  if(action.type === ADD_TO_CART){
      //localStorage.removeItem('customerInfo');
      if('customerInfo' in localStorage){
           
           var product = action.product;
           var id = product.id;
           var customer =localStorage.getItem("customerInfo") ;
           var obj = JSON.parse(customer);
           var ifItemAdded = false;
           for(var i in obj.items){
                if(obj.items[i].id === product.id){
                    obj.items[i].qty=obj.items[i].qty+1;
                   ifItemAdded = true;
                }
           }
          if(!ifItemAdded){
               let item = new Object();
                item.id = product.id;
                item.name = product.name;
                item.description = product.description;
                item.qty= 1;
                item.price = product.price;
                item.cost = product.price;
                obj.items.push(item);
          }
           
           localStorage.removeItem('customerInfo');
           localStorage.setItem('customerInfo',JSON.stringify(obj))
           
      }else{
          
          var product = action.product;
          
          let item = new Object();
          item.id = product.id;
          item.name = product.name;
          item.description = product.description;
          item.qty= 1;
          item.price = product.price;
          item.cost = product.price;
          
          
          let customerInfo = new Object();
          customerInfo.firstName = '';
          customerInfo.lastName = '' ;
          customerInfo.email='';
          customerInfo.pwd='';
          customerInfo.mobile=''
          customerInfo.creditCardType='';
          customerInfo.creditCardName='';
          customerInfo.creditCardNumber='';
          customerInfo.creditCardExpiryDate='';
          customerInfo.creditCardCVV='';
          customerInfo.postalAddress='';
          customerInfo.postalSuburb='';
          customerInfo.postalState='';
          customerInfo.postalZipcode='';
          customerInfo.postalCountry='';
          customerInfo.postalAsDelivery='';
          customerInfo.deliveryAddress='';
          customerInfo.deliverySuburb='';
          customerInfo.deliveryState='';
          customerInfo.deliveryZipcode='';
          customerInfo.deliveryCountry='';
          
          customerInfo.items = [item];
          
          localStorage.setItem('customerInfo',JSON.stringify(customerInfo));
      }
      
      //console.log("this product:" + JSON.stringify(action.product));
  }
  next(action);
}