async function loadJSON(url) {
	const res = await fetch(url);
	return await res.json();
}

loadJSON('WeatherData.json').then((values) => {
	let placeholder = document.querySelector('#data-output');
	let out = '';
	for (let value of values.result) {
		out += `
        <tr>
            <td>${value.date}</td>
            <td>
            <span>Day: ${
							value.temporature.Day !== '' ? value.temporature.Day : '<em><mark>N/A</mark></em>'
						}</span>
            <br/>
            <span>Night: ${value.temporature.Night} </span>
            </td>
            <td>
            <span> Day: ${
							value.humidity.Day !== '' ? value.humidity.Day : '<em><mark>N/A</mark></em>'
						}</span>
            <br/>
            <span>Night: ${value.humidity.Night}</span>
            </td>
        </tr>
        `;
	}
	placeholder.innerHTML = out;
});