'use strict';


function getRandomPrice(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let allMobiles = [];
function Mobile(user, type) {
    this.user = user;
    this.type = type;
    this.price = getRandomPrice(100, 500);
    // condition
    this.render();
    allMobiles.push(this);
    settingItems();

}

//add Event Lisitner

//get the form By Id
let form = document.getElementById('form');
form.addEventListener('submit', submitterToTable);

//submitter Function
function submitterToTable(event) {
    event.preventDefault();

    let user = event.target.user.value;
    let type = event.target.type.value;

    // new instance
    new Mobile(user, type);

}

// table part

//get the table by ID
let table = document.getElementById('table');

//rendering ProtoType
Mobile.prototype.render = function () {
    let trElement = document.createElement('tr');
    table.appendChild(trElement);

    let userData = document.createElement('td');
    trElement.appendChild(userData);
    userData.textContent = this.user;

    let typeData = document.createElement('td');
    trElement.appendChild(typeData);
    typeData.textContent = this.type;

    let priceData = document.createElement('td');
    trElement.appendChild(priceData);
    priceData.textContent = this.price;

    let conditionData = document.createElement('td');
    trElement.appendChild(conditionData);
    if ((this.price) < 200) {
        conditionData.textContent = 'Used';
    } else {
        conditionData.textContent = 'New';
    }
    
}

//for settingItem Function 
function settingItems() {
    let stringData=JSON.stringify(allMobiles);
    localStorage.setItem('allMobiles',stringData);
}

//getting Item Function
function gettingItems() {
    let storgeData=localStorage.getItem('allMobiles');
    let objectData=JSON.parse(storgeData);

    if(objectData){
        for (let i = 0; i < objectData.length; i++) {
            
            new Mobile(objectData[i].user,objectData[i].type,objectData[i].price)
        }
    }
    
}
gettingItems();


let clear=document.getElementById("clear");
clear.addEventListener('click',clearFun)

function clearFun(){
    localStorage.clear;
}