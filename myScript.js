let Mdemand = -1000;
let Bdemand = 10000;
let Msupply = 0;
let Bsupply = 8000;
let consumption;
let supply;
let message;
let data;
let inputArr;
let url = 'https://en.wikipedia.org/w/api.php';

let params = {
 action: 'query',
 prop: 'extracts',
 exintro: '',
 rvslots: '*',
 titles: 'Economic equilibrium',
 rvprop: 'content',
 formatversion: '2',
 format: 'json',
};

url = url + '?origin=*';
Object.keys(params).forEach(function (key) {
 url += '&' + key + '=' + params[key];
});

let xhttp = new XMLHttpRequest();
xhttp.open('GET', url, true);
xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
xhttp.onreadystatechange = function () {
 if (this.readyState == 4 && this.status == 200) {
  let response = JSON.parse(this.responseText);
  let content = response.query.pages[0].extract;
  let title = response.query.pages[0].title;
  const titleEl = document.querySelector('#title');
  titleEl.insertAdjacentHTML('afterbegin', `${title}`);
  const introEl = document.querySelector('#intro1');
  introEl.insertAdjacentHTML('afterbegin', `${content}`);
 }
};
xhttp.send();

document.getElementById('calculate').addEventListener('click', calculateOutput);

function calculateOutput() {
 let price;
 let priceOptions = document.getElementsByName('price');
 document.getElementsByName('price').disabled = true;

 console.log(priceOptions);
 message = '';

 for (let i = 0; i < priceOptions.length; i++) {
  if (priceOptions[i].checked) {
   price = priceOptions[i].value;
   break;
  }
 }

 consumption = price * Mdemand + Bdemand;
 supply = price * Msupply + Bsupply;

 if (consumption > supply) {
  consumption = supply;
  message = 'ABC Company canot make enough XYZ Widgets';
 }

 if (consumption <= 0) {
  consumption = 0;
  message = 'No one will buy XYZ Widgets at this price';
 }

 revenue = consumption * price;

 let obj = {
  price: 0,
  consumption: 0,
  revenue: 0,
  message: '',
 };

 obj.price = price;
 obj.consumption = consumption;
 obj.revenue = revenue;
 obj.message = message;

 const result = document.querySelector('#result');
 result.insertAdjacentHTML(
  'beforeend',
  `<tr>
        <td>${price}</td>
        <td>${consumption} / Month</td>
        <td>${revenue} / Month</td>
        <td>${message}</td>
    </tr>`,
 );
}

console.log(inputArr);
