

var productName=document.getElementById("productName");
var productPrice=document.getElementById("productPrice");
var productCategory=document.getElementById("productCategory");
var productDesc=document.getElementById("productDesc");
var Inputs=document.getElementsByClassName("form-control");
var addBtn=document.getElementById("addBtn");
var InputSearch=document.getElementById("search");
var nameAlert=document.getElementById("nameAlert");
var priceAlert=document.getElementById("priceAlert");


var productsContainer=[];
var currentIndex;
//retreive data
if(JSON.parse(localStorage.getItem("productsList"))!=null){
    productsContainer=JSON.parse(localStorage.getItem("productsList"));
    displaydata();
}



addBtn.onclick=function(){
    if(productName.value!="" &&productPrice.value!="" &&productDesc.value!="" &&productCategory.value!=""){
        if(addBtn.innerHTML="Add Product"){
            addProduct();

        }
        else{
            updateproduct();
        }
    }
    else{
        alert("All Inputs Required")
    }
    clearForm();
    displaydata();



}

// add products
function addProduct(){

    var product={

        name:productName.value,
        price:productPrice.value,
        Category:productCategory.value,
        Desc: productDesc.value
    }

    productsContainer.push(product)
    localStorage.setItem("productsList",JSON.stringify(productsContainer))
    
}

//display data

function  displaydata(){
    trs=``
   for(var i=0 ;i<productsContainer.length;i++){
       
    trs+=
    `
    <tr>
      <td>${i+1}</td>
      <td>${productsContainer[i].name}</td>
      <td>${productsContainer[i].price}</td>
      <td>${productsContainer[i].Category}</td>
      <td>${productsContainer[i].Desc}</td>
      <td><button onclick="deleteproduct(${i})" class="btn btn-outline-danger">delete</button></td>
      <td><button onclick="getproductinfo(${i})" class="btn btn-outline-warning">update</button></td>
    </tr>
    `
   }
   
   document.getElementById("tableBody").innerHTML=trs
}

//clear form 

function clearForm(){

    for(var i=0 ;i<Inputs.length;i++){
        Inputs[i].value=""
    }

}


//delete product

function deleteproduct(index){
    productsContainer.splice(index,1);
    localStorage.setItem("productsList",JSON.stringify(productsContainer));
    displaydata();



}


//search items 

InputSearch.onkeyup= function(){
    trs=``
    var val=InputSearch.value;
    for(var i=0;i<productsContainer.length;i++){

        if(productsContainer[i].name.toLowerCase().includes(val.toLowerCase())){
            trs+= `
                <tr>
                    <td>${i+1}</td>
                    <td>${productsContainer[i].name}</td>
                    <td>${productsContainer[i].price}</td>
                    <td>${productsContainer[i].Category}</td>
                    <td>${productsContainer[i].Desc}</td>
                    <td><button onclick="deleteproduct(${i})" class="btn btn-outline-danger">delete</button></td>
                    <td><button onclick="getproductinfo(${i})" class="btn btn-outline-warning">update</button></td>
                </tr>
            `
        }
    }
    document.getElementById("tableBody").innerHTML=trs

}

//update product 

function getproductinfo(index){

  productName.value=productsContainer[index].name;
  productPrice.value=productsContainer[index].price;
  productCategory.value=productsContainer[index].Category;
  productDesc.value=productsContainer[index].Desc;
  currentIndex=index;
  addBtn.innerHTML="Update Produce"

}

function updateproduct(){
    var product={

        name:productName.value,
        price:productPrice.value,
        Category:productCategory.value,
        Desc: productDesc.value
    }
    productsContainer[currentIndex]=product;
    localStorage.setItem("productsList",JSON.stringify(productsContainer));


}



//validation 

productName.onkeyup=function(){

    var rejexName=/^[A-Z][a-z]{3,7}$/
    if(!rejexName.test(productName.value)){
        addBtn.disabled="true";
        productName.classList.add("is-invalid");
        productName.classList.remove("is-valid");
        nameAlert.classList.remove("d-none")
    }
    else{
        addBtn.removeAttribute("disabled")
        productName.classList.add("is-valid");
        productName.classList.remove("is-invalid");
        nameAlert.classList.add("d-none")
    }
}


productPrice.onkeyup=function(){

    var rejexName=/^[0-9]{3,7}$/
    if(!rejexName.test(productPrice.value)){
        addBtn.disabled="true";
        productPrice.classList.add("is-invalid");
        productPrice.classList.remove("is-valid");
        priceAlert.classList.remove("d-none")
    }
    else{
        addBtn.removeAttribute("disabled")
        productPrice.classList.add("is-valid");
        productPrice.classList.remove("is-invalid");
        priceAlert.classList.add("d-none")
    }
}