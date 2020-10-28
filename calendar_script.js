let month00; //пермененная, которая передает итоговое значение в создать
let year00; //итоговое значение года в создать

//записываем месяцы в select
const monthsSelection = () => {
  var selectMonth = document.getElementById('selectMonth');
  var monthOptions = ['Выбрать месяц', 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь','Декабрь',];
  for (let i=0; i<monthOptions.length; i++) {
    var opt = document.createElement('option');
    opt.textContent = monthOptions[i];
    opt.value = i;
    selectMonth.appendChild(opt);
  }};
monthsSelection();
 
//записываем годы в select
const yearsSelection = () => {
  var selectYear = document.getElementById('selectYear');
  var yearOptions = [];
  for (let i = 1980; i<2020; i++) {
    yearOptions.push(i);
    }
  yearOptions.unshift('Выбрать год');
  for (let i=0; i<yearOptions.length; i++) {
    var opt = document.createElement('option');
    opt.textContent = yearOptions[i];
    selectYear.appendChild(opt);
}};
yearsSelection();

//предзаданные значения
let month0 = parseInt(document.getElementById('selectMonth').options[0].value);
let year0 =  document.getElementById('selectYear').options[0].value;

//функция задизейбливания "Создать"
const disableCreateButton = () => {
  if (month0 === 0 ||  year0 === 'Выбрать год') {document.getElementById('creature').disabled = true;}
  else {document.getElementById('creature').disabled = false;}
}
disableCreateButton();


//перезаписываем выбранный месяц
document.getElementById('selectMonth').onchange = function() {
  let a = document.getElementById('selectMonth').options[selectMonth.selectedIndex].value;
  month0 =  parseInt(a);
  disableCreateButton();  
  month00 = month0 - 1;
  }


//достаем значение выбранного года
document.getElementById('selectYear').onchange = function() {
  let b = document.getElementById('selectYear').options[selectYear.selectedIndex].innerHTML;
  year0 = b;
  disableCreateButton();
  year0 = parseInt(year0);
  year00 = year0;
  }

  //считаем календари по порядку
  calendarNumber = 0;
  const countCalendarNumber = () =>{
  calendarNumber++;
    }

//для записывания выбранных дат
  let monthBB = [0];
  let yearBB = [0];
  let dayBB = [0];

// по клику на создать
document.getElementById('creature').onclick = function () {
  countCalendarNumber();
  
//создаем структуру
let calendarMonth = document.createElement('div'); 
let parent = document.getElementById('listOfCalendars');
let tableHeadingDiv = document.createElement('div');
let calendarDiv = document.createElement('div');

//оформляем структуру календаря 
function buildStructure() {
calendarMonth.id = `${calendarNumber}`;
calendarMonth.className = 'calendarPole';
parent.appendChild(calendarMonth);
tableHeadingDiv.id = `tableHeading${calendarNumber}`;
tableHeadingDiv.className = 'title';
calendarMonth.appendChild(tableHeadingDiv);
calendarDiv.id = `calendar${calendarNumber}`;
calendarMonth.appendChild(calendarDiv);
}
buildStructure();

//pastyear button
let pastYearButton = document.createElement('input');
pastYearButton.type = 'button';
pastYearButton.id = `pastYear${calendarNumber}`;
pastYearButton.value = '<<';
tableHeadingDiv.appendChild(pastYearButton);
//pastYearButton.addEventListener('click', changeOnPastYear);

//pastmonth button
let pastMonthButton = document.createElement('input');
pastMonthButton.type = 'button';
pastMonthButton.id = `pastMonth${calendarNumber}`;
pastMonthButton.value = '<';
tableHeadingDiv.appendChild(pastMonthButton);
//pastMonthButton.addEventListener('click', changeOnPastMonth);

//название месяца и год
let monthAndYearHeading = document.createElement('div');
monthAndYearHeading.id = `title${calendarNumber}`;
monthAndYearHeading.className = 'titleMonthAndYear';
tableHeadingDiv.appendChild(monthAndYearHeading);

//futuremonth button
let futureMonthButton = document.createElement('input');
futureMonthButton.type = 'button';
futureMonthButton.id = `futureMonth${calendarNumber}`;
futureMonthButton.value = '>';
tableHeadingDiv.appendChild(futureMonthButton);
//futureMonthButton.addEventListener('click', changeOnFutureMonth);

//futureyear button
let futureYearButton = document.createElement('input');
futureYearButton.type = 'button';
futureYearButton.id = `futureYear${calendarNumber}`;
futureYearButton.value = '>>';
tableHeadingDiv.appendChild(futureYearButton);
//futureYearButton.addEventListener('click', changeOnFutureYear);

let month1 = month00;
let year1 = year00;

let monthsArray = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
monthAndYearHeading.innerHTML =  monthsArray[month1] + ' ' + year1 + ' года';

calendarDiv.innerHTML = monthTable(year1, month1);

function rememberDate(a, b, c) {
    if (b === yearBB[c] && a === monthBB[c]) {
    let array = document.getElementById(c).lastChild.getElementsByTagName('td');
    array = Array.from(array);
    let newArray = array.filter(td => td.id === 'ourMonth');
    for (let i = 0; i < newArray.length; i++) {
      if (newArray[i].innerHTML === dayBB[c]) {newArray[i].style.backgroundColor = 'rgb(2, 148, 136)';}
      
    }

  }
}
//на год назад
document.getElementById(`pastYear${calendarNumber}`).onclick = function() {
  year1 = year1 - 1;
  calendarDiv.innerHTML = monthTable(year1, month1);
  monthAndYearHeading.innerHTML = monthsArray[month1] + ' ' + year1 + ' года';
  let target = parseInt(event.target.parentNode.parentNode.id);
  rememberDate(month1, year1, target);
}

//на месяц назад
document.getElementById(`pastMonth${calendarNumber}`).onclick = function() {
month1 = month1 - 1;
if (month1 === -1) {
  month1 = 11;
  year1 = year1-1;
 }
calendarDiv.innerHTML = monthTable(year1, month1);
monthAndYearHeading.innerHTML = monthsArray[month1] + ' ' + year1 + ' года';
let target = parseInt(event.target.parentNode.parentNode.id);
rememberDate(month1, year1, target);
}

//на месяц вперед
document.getElementById(`futureMonth${calendarNumber}`).onclick = function() {
  month1 = month1 + 1;
  if (month1 === 12) {
    month1 = 0;
    year1 = year1 + 1;
  }
  calendarDiv.innerHTML = monthTable(year1, month1);
  monthAndYearHeading.innerHTML = monthsArray[month1] + ' ' + year1 + ' года';
  let target = parseInt(event.target.parentNode.parentNode.id);
  rememberDate(month1, year1, target);
}

//на год вперед 
document.getElementById(`futureYear${calendarNumber}`).onclick = function() {
  year1 = year1 + 1;
  calendarDiv.innerHTML = monthTable(year1, month1);
  monthAndYearHeading.innerHTML = monthsArray[month1] + ' ' + year1 + ' года';
  let target = parseInt(event.target.parentNode.parentNode.id);
  rememberDate(month1, year1, target);
}

//раздизейбливаем кнопку удаления
checkCalendars();

//кликая по числу:
var checkingVariable = true;
document.getElementById(`calendar${calendarNumber}`).onclick = function(event) {
  let target = event.target; //где был клик?
  if (target.tagName != 'TD') return;
  if (checkingVariable != false && target.id == 'ourMonth') {hightlight(target)};
  checkingVariable = false;   
  }
 function hightlight(td) {
   td.style.backgroundColor = 'rgb(2, 148, 136)';   
   monthBB.push(month1);
   yearBB.push(year1);
   dayBB.push(td.innerHTML);
}
}

//функция создания календаря
const monthTable = (year, month) => {

  let ourDate =new Date(year, month); // сохранили нашу дату
  
  //создаем таблицу
   let table = '<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';
   //добавляем числа предыдущего месяца
  var endOfLastMonth = new Date(ourDate.getYear(), ourDate.getMonth(),0)
  let a = endOfLastMonth.getDate() - getDay(ourDate) + 1;
  const minus = () => {
   return a++;
  }
  
  //вставляем пустые клетки в первой строке где надо
  for (let i=0; i< getDay(ourDate); i++) {
    table += '<td id="notOurMonth">' + minus() + '</td>';
  
  }
  
  //ячейки с числами
  while (ourDate.getMonth() == month) {
    table += '<td  id = "ourMonth">' + ourDate.getDate() + '</td>';
    //переносим после воскресенья на новую строку:
    if(getDay(ourDate) == 6) {
      table += '</tr><tr>'
    }
    ourDate.setDate(ourDate.getDate() + 1);
    }
  
  //вставляем числа след месяца в конец
  let b = 1;
  const plus = () => {
   return b++;
  }
  
  //вставляем пустые ячейки в конце где надо
  if (getDay(ourDate) != 0) {
    for (let i=getDay(ourDate); i<7; i++) {
    table += '<td id = "notOurMonth">' + plus() + '</td>';
    }
  }
  
  //закрываем таблицу 
  table += '</tr></table>'
  return table;
  }
   
//функция, которая делает воскресенье последним днем
function getDay(dateA) {
    let day = dateA.getDay();
    if (day == 0) {day = 7;} 
    return day-1;
}

  //проверяем есть ли календари
  const checkCalendars = () => {
    let children = document.getElementById('listOfCalendars').children.length;
    if (children === 0) {document.getElementById('delete').disabled = true;}
    else{
      document.getElementById('delete').disabled = false;

    }
  }
  checkCalendars();

  //удаление первого календаря
document.getElementById('delete').onclick = function deleteFirstCalendar() {
  let kid = document.getElementById('listOfCalendars').children[0];
  kid.parentNode.removeChild(kid);
  checkCalendars();
}