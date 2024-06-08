result();
async function result() {
  try {
    var data = await fetch("https://raw.githubusercontent.com/rvsp/restcountries-json-data/master/res-countries.json");
    var res = await data.json();
    console.log(res);
    var select = document.getElementById("country");
    for (var i = 0; i < res.length; i++) {
      const opt = document.createElement("option");
      opt.value = res[i].name;
      opt.innerText = res[i].name;
      select.append(opt);

      //console.log(opt)
    }
    document.querySelector("button").addEventListener("click", (ele) => {
      ele.onclick = display(res);
    })
  }
  catch (error) {
    console.log(error);
  }
}

function display(x) {
  var select = document.getElementById("country");
  var value = select.options[select.selectedIndex].text;
  console.log(value);
  var country_data = x.filter((element) => {
    if (element.name == value) {
      return element;
    }
  });
  console.log(country_data);
  var y = country_data[0];
  weather_report(y.latlng, y)

}
async function weather_report(arr, y) {
  var lat = arr[0], lng = arr[1];
  var data1 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m`)
  var res1 = await data1.json();
  console.log(res1)
  //return res1.current.temperature_2m;


  var card_div = document.createElement("div");
  card_div.className = "col-lg-12 col-md-8 col-sm-6 col d-flex justify-content-center ";
  card_div.id = "card";
  if (document.querySelector("#card") !== null) {
    var parent = document.querySelector("#card");
    parent.innerHTML = `<div class="card border-info mb-3" style="max-width: 18rem;">
    <div class="card-header" style="font-size:40px">${y.name}</div>
    <div class="card-body text-info">
      <h5 class="text-center">Temperature-Details</h5>
      <p class="card-text output"><b>Current-Temperature: ${res1.current.temperature_2m}</b></p>
      <p class="output"><b>Latitude: ${res1.latitude}</b></p>
      <p class="output"><b>Longitude: ${res1.longitude}</b></p>
      <p class="output"><b>Timezone: ${res1.timezone}</b></p>
    </div>
  </div>`
  }
  else {
    card_div.innerHTML = `<div class="card border-info mb-3" style="max-width: 18rem;">
        <div class="card-header" style="font-size:40px">${y.name}</div>
        <div class="card-body text-info">
          <h5 class="text-center">Temperature-Details</h5>
          <p class="card-text output"><b>Current-Temperature: ${res1.current.temperature_2m}</b></p>
          <p class="output"><b>Latitude: ${res1.latitude}</b></p>
          <p class="output"><b>Longitude: ${res1.longitude}</b></p>
          <p class="output"><b>Timezone: ${res1.timezone}</b></p>
        </div>
      </div>`
    var parent = document.querySelector(".container");
    parent.append(card_div);
  }
}