async function loadJSON (url) {
    const res = await fetch(url);
    return await res.json();
  }
  
  loadJSON('WeatherData.json').then(values => {
    let placeholder = document.querySelector("#data-output");
    let out ="";
    for(let value of values.result){
        out += `
        <tr>
            <td>${value.date}</td>
            <td> Day: ${value.temporature.Day}\n Night: ${value.temporature.Night} </td>
            <td> Day: ${value.humidity.Day}\n Night: ${value.humidity.Night}</td>
        </tr>
        `;
    }
    placeholder.innerHTML = out;
  });