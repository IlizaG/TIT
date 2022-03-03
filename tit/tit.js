let apiurl = 'https://rfrk.ru/tit/formResponse'
let number = window.location.search.split("?")[1];
document.getElementById("number").innerText = number;
document.getElementById("prev").href = "?" + (parseInt(number) - 1);
document.getElementById("next").href = "?" + (parseInt(number) + 1);
//
function func(url, number, status) {

    return fetch(url, {
        "headers": {
            "accept": "application/xml, text/xml, */*; q=0.01",
            "accept-language": "en,ru;q=0.9,es;q=0.8,zh;q=0.7,th;q=0.6,en-US;q=0.5,an;q=0.4,und;q=0.3",
            "cache-control": "no-cache",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "pragma": "no-cache",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"
        },
        "referrer": "https://rfrk.ru/tit/?" + number,
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "entry.1134586381=" + number + "&entry.1496506828=" + status + "&entry.807958025=12312&entry.703388132=3123",
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
}

function add() {
    func(apiurl, number, "1")
        .then(data => alert("Кормушка пополнена"))
        .catch(function(error) {
            console.log('request failed', error)
        })
}
document.getElementById("add").addEventListener("click", add);

function empted() {
    func(apiurl, number, "0")
        .then(data => alert("Высылаем волонтера"))
        .catch(function(error) {
            console.log('request failed', error)
        })
}
document.getElementById("empted").addEventListener("click", empted);
//
const url ='https://docs.google.com/spreadsheets/d/e/2PACX-1vSnEkO8XAkvqrdI1W8Iv9WKOQRWzNLlCJ9GmmvUSSu1VacORxo3VX3UiXvzOgkq8hqSpOGsHwhApfkr/pub?gid=1675273004&single=true&output=csv'
let feeders = [];
fetch(url)
.then((response) => {
  return response.text();
})
.then((data) => {
  feeders = data.split(/\r?\n/)
  ymaps.ready(init);
});
//yandex baloons


function init() {
  var myMap = new ymaps.Map(
    "map",
    {
     // center: [43.89645442, 42.73835063],
     center: [43.9002,42.7380],
      zoom: 15,
    },
    {
      
    }
  );
  feeders.forEach(function (value, i) {
    partset = value.split(',')
    const lat = parseFloat(partset[2].split('\"')[1]);
    const lon = parseFloat(partset[3]);
    myMap.behaviors.disable('scrollZoom');
    if  (number == i){
      myMap.setCenter([lat, lon], 17, {
        checkZoomRange: true
      });
    }
    myMap.behaviors.disable('scrollZoom');
    myMap.geoObjects
      .add(
        new ymaps.Placemark(
          [ lat, lon ],
          {
            balloonContent: partset[1],
            iconCaption: i,
          },
          {
            preset: "islands#blueCircleDotIconWithCaption",
            iconCaptionMaxWidth: "50",
          }
        )
      )
  });
}
