init = function(){
var button = document.getElementById("button");
var input1 = document.getElementById("input");
var input2 = document.getElementById("input2");
var input3 = document.getElementById("input3");
var button1 = document.getElementById("button2");
var button2 = document.getElementById("button3");
var month = 0;
var year = 0;
var day = 0;
let Params = new URLSearchParams(window.location.search);
if(Params.has("month")){
    monthint = Params.get("month");
    input1.value = Params.get("month");
   
} 
if(Params.has("year")){
    input2.value = Params.get("year");
   
} 
if(Params.has("day")){
    input3.value = Params.get("day");
   
} 
button.addEventListener("click", (e) =>{
    month = input1.value;
    year = input2.value;
    day = input3.value;
    var monthint = parseInt(month);
    var yearint = parseInt(year);
    var dayint = parseInt(day);

    if(month != "" & year != "" & monthint > 0 & monthint < 13){
        var thead = document.getElementById("year").innerHTML= getMonth(monthint) + " " + year;
        console.log(monthint);
        GetDays(yearint,monthint);
        var firstday = GetFirstDay(yearint, monthint);
        var td = document.getElementsByTagName("td");
        if (dayint != 0 & dayint < 32) {
            GetCurrentDay(dayint-1,td,firstday);
        }
    }
    else{
        alert("Nezadali jste hodnoty nebo zadali špatně");
    }
    button1.addEventListener("click", (e) =>{
        if (monthint < 2) {
            monthint=12;
            Button((yearint--)-1,monthint);
            console.log(monthint);
        }   
        else{
            Button(yearint,(monthint--)-1);
            console.log(monthint);
        }
    });

    button2.addEventListener("click", (e) =>{
        if (monthint>11) {
            monthint=1;
            Button(1+yearint++,monthint);
            console.log(monthint);
        }
        else{
            Button(yearint,1+monthint++);
            console.log(monthint);
        }       
    });
});
}
document.addEventListener("DOMContentLoaded", init);

function getMonth(value){
    switch (value) {
        case 1 : return "January";
        case 2 : return "February";
        case 3 : return "March";
        case 4 : return "April";
        case 5 : return "May";
        case 6 : return "June";
        case 7 : return "July";
        case 8 : return "August";
        case 9 : return "September";
        case 10 : return "October";
        case 11 : return "November";
        case 12 : return "December";
    }
}

function GetFirstDay(year, month){
    var d = new Date(year,(month-1),1);
    let a = (d.getDay()-1);
    if(a == -1){
        return 6;
    }
    else{
        return a;
    }
}

function GetDays(yearint,monthint){
    var firstday = GetFirstDay(yearint, monthint);
    var td = document.getElementsByTagName("td");
    var value = 1;
    Clear(td);
    var firstday2 = firstday;
    if (monthint % 2 != 0 || monthint == 7 )   {
        if (firstday > 4 ) {
            GetExTable(31,firstday,value,monthint);
        }
        else{
            for (let index = 0; index < 31; index++) {
                td[firstday].innerHTML= value;
                firstday++;
                value++;
            }
        }
    }
    else {
        if (monthint == 2) {
            if (yearint % 4 == 0) {
                for (let index = 0; index < 29; index++) {
                    td[firstday].innerHTML= value;
                    firstday++;
                    value++; 
                }
            }
            else{
                for (let index = 0; index < 28; index++) {
                    td[firstday].innerHTML= value;
                    firstday++;
                    value++; 
                }
            }
        }
        else{
            if (firstday > 5) {
                GetExTable(30,firstday,value,monthint);
            }
            else{
                for (let index = 0; index < 30; index++) {
                    td[firstday].innerHTML= value;
                    firstday++;
                    value++; 
                }
            }
        }  
    }
    Holidays(monthint,td,firstday2);
}

function GetExTable(y,firstday,value,monthint){
    var tr6 = document.getElementById("tr6");
    var arr = document.getElementsByTagName("td");
    if (arr.length <40) {
        for (let index = 0; index < 7; index++) {
            let td6 = document.createElement("td");
            td6.id = "td";
            tr6.appendChild(td6);
        }
    }
    var x = document.getElementsByTagName("td");
    var firstday2 = firstday;
    for (let index = 0; index < y; index++) {
        x[firstday].innerHTML= value;
        firstday++;
        value++;
    }
    Holidays(monthint,x,firstday2);
}

function Clear(td){
    for (let index = 0; index < td.length; index++) {
        td[index].innerHTML= ""; 
        td[index].id = "days";     
    }
}

function Button(yearint,monthint){
    let theadyear = yearint;
    var theadmonth = (getMonth(monthint));
    var thead = document.getElementById("year");    
    thead.innerHTML= theadmonth + " " + (theadyear);
    GetDays(yearint,monthint);
    
}
function GetCurrentDay(day,td,firstday){
    td[day+firstday].id="currentday";    
}
function Holidays(monthint,td,firstday){
    var holidays  = ["1 Nový rok","1 Svátek Práce","8 Den vítězství","5 Cyril a Metoděj","6 Upálení J. Husa","28 Den české státnosti","28 Den vzniku ČSR","17 Boj za svobodu a demokracii","24 Štědrý den","25 1. svátek vánoční","26 2. svátek vánoční"];
    if (monthint == 1) {
        td[firstday].id="holidayday";
        td[firstday].innerHTML=  holidays[0];
    }
    else if (monthint == 5) {
        td[firstday].id="holidayday";
        td[firstday].innerHTML= holidays[1];
        td[firstday+7].id = "holidayday";
        td[firstday+7].innerHTML= holidays[2];
    }
    else if (monthint == 7) {
        td[firstday+4].id="holidayday";
        td[firstday+4].innerHTML= holidays[3];
        td[firstday+5].id = "holidayday";
        td[firstday+5].innerHTML= holidays[4];
    }
    else if (monthint == 9) {
        td[firstday+27].id="holidayday";
        td[firstday+27].innerHTML= holidays[5];
    }
    else if (monthint == 10) {
        td[firstday+27].id="holidayday";
        td[firstday+27].innerHTML= holidays[6];
    }
    else if (monthint == 11) {
        td[firstday+16].id="holidayday";
        td[firstday+16].innerHTML= holidays[7];
    }
    else if (monthint == 12) {
        td[firstday+23].id="holidayday";
        td[firstday+23].innerHTML= holidays[8];
        td[firstday+24].id = "holidayday";
        td[firstday+24].innerHTML= holidays[9];
        td[firstday+25].id = "holidayday";
        td[firstday+25].innerHTML= holidays[10];
    }
}