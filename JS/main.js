var mainIndex;

var arrayOfProducts ;
if(localStorage.getItem("arrayOfProducts") != null) {
    arrayOfProducts = JSON.parse(localStorage.getItem("arrayOfProducts"));
    displayProduct()
}else{
    arrayOfProducts = []
}
if(arrayOfProducts.length == 0){
    document.getElementById("inputSearch").classList.add("d-none");
    displayProduct();
}else{
    document.getElementById("inputSearch").classList.replace("d-none", "d-block");
    displayProduct();
}
var productName = document.getElementById("ProductName");
var productPrice = document.getElementById("ProductPrice");
var productCategory = document.getElementById("ProductCategory");
var productDesc = document.getElementById("ProductDesc");
var search = document.getElementById("inputSearch");

function AddProduct (){
    
    
    if(validateProductName() && validateProductPrice() && validateProductCatogry() && validateProductDesc()){
        var product = {
            productNameValue : productName.value,
            productPriceValue : productPrice.value,
            productCategoryValue : productCategory.value,
            productDescValue : productDesc.value
        }
        arrayOfProducts.push(product);
        localStorage.setItem("arrayOfProducts" ,JSON.stringify(arrayOfProducts));
        displayProduct()
        clearProduct()
    }else{
        alert("There is something wrong in these values")
    }
        
    if(arrayOfProducts.length == 0){
        document.getElementById("inputSearch").classList.add("d-none");
        displayProduct();
    }else{
        document.getElementById("inputSearch").classList.replace("d-none", "d-block");
        displayProduct();
    }
    document.getElementById("btn").classList.add("d-block");
}


function displayProduct(){
    if(arrayOfProducts.length > 0){
        document.getElementById("thead").innerHTML = 
        `<tr>
            <th>index</th>
            <th>Product Name</th>
            <th>Product price</th>
            <th>Product Category</th>
            <th>Product Desc</th>
            <th>Update</th>
            <th>Delete</th>
        </tr>`
    }else{
        document.getElementById("thead").innerHTML = ""
    }
    var row = ""
    for(var i = 0 ; i < arrayOfProducts.length ; i++){
        row +=
        `<tr>
            <td>${i}</td>
            <td>${arrayOfProducts[i].productNameValue}</td>
            <td>${arrayOfProducts[i].productPriceValue}</td>
            <td>${arrayOfProducts[i].productCategoryValue}</td>
            <td>${arrayOfProducts[i].productDescValue}</td>
            <td><button onclick="getUpdateProduct(${i})" class="btn btn-warning">Update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
        </tr>`
    }
    document.getElementById("tbody").innerHTML = row
}

function clearProduct(){
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDesc.value = "";
}

function deleteProduct(num){
    
    arrayOfProducts.splice(num, 1);
    localStorage.setItem("arrayOfProducts", JSON.stringify(arrayOfProducts))
    displayProduct()
    if(arrayOfProducts.length == 0){
        document.getElementById("inputSearch").classList.add("d-none");
        displayProduct();
    }else{
        document.getElementById("inputSearch").classList.replace("d-none", "d-block");
        displayProduct();
    }
}

function getUpdateProduct(num){
    mainIndex = num;

    productName.value = arrayOfProducts[num].productNameValue;
    productPrice.value = arrayOfProducts[num].productPriceValue;;
    productCategory.value = arrayOfProducts[num].productCategoryValue;
    productDesc.value = arrayOfProducts[num].productDescValue;

    document.getElementById("btn").classList.add("d-none");
    document.getElementById("btn1").classList.replace("d-none","d-block");
}

function updateProduct() {
    if(arrayOfProducts.length == 0){
        document.getElementById("inputSearch").classList.add("d-none");
        displayProduct();
    }else{
        document.getElementById("inputSearch").classList.replace("d-none", "d-block");
        displayProduct();
    }
    arrayOfProducts[mainIndex] = {
        productNameValue : productName.value,
        productPriceValue : productPrice.value,
        productCategoryValue : productCategory.value,
        productDescValue : productDesc.value

    }
    localStorage.setItem("arrayOfProducts", JSON.stringify(arrayOfProducts))
    displayProduct();
    clearProduct();
    document.getElementById("btn").classList.replace("d-none","d-block");
    document.getElementById("btn1").classList.replace("d-block","d-none");
}

function searchProducts() {
    var searchValue = search.value;
    
    var row = ""
    for(var i = 0 ; i < arrayOfProducts.length ; i++) {
        if(arrayOfProducts[i].productNameValue.toLowerCase().includes(searchValue.toLowerCase())){
            
                row += `<tr>
                    <td>${i}</td>
                    <td>${arrayOfProducts[i].productNameValue}</td>
                    <td>${arrayOfProducts[i].productPriceValue}</td>
                    <td>${arrayOfProducts[i].productCategoryValue}</td>
                    <td>${arrayOfProducts[i].productDescValue}</td>
                    <td><button onclick="getUpdateProduct(${i})" class="btn btn-warning">Update</button></td>
                    <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
                </tr>`
            }
        }
    document.getElementById("tbody").innerHTML = row
}
function validateProductName(){
    var nameRegex = /^\w{2,15}$/;
    return nameRegex.test( productName.value )
}
function validateProductPrice(){
    var priceRegex = /^[1-9][0-9]{1,}$/;
    return priceRegex.test( productPrice.value )
}
function validateProductCatogry(){
    var categoryRegex = /^\w{2,15}$/;
    return categoryRegex.test( productCategory.value )
}
function validateProductDesc(){
    var descRegex = /^[A-Z][a-z]{2,}$/;
    return descRegex.test( productDesc.value )
}