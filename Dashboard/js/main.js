const ctx = document.getElementById('myChart').getContext('2d');
const select = document.querySelector('select');
const arregloInfo = document.getElementsByClassName('counter');
const tableBody = document.querySelector('tbody');
let myChart;

const tableTemplate = (index, movie) => {
	return `<tr>
							<td>${index}</td>
							<td class="txt-oflo">${movie.title}</td>
							<td>${movie.popularity}</td>
							<td class="txt-oflo">${movie.release_date}</td>
							<td><span class="text-success">${movie.vote_average}</span></td>
						</tr>`;
};

const cleanTable = () => {
	while (tableBody.hasChildNodes()) {
		tableBody.removeChild(tableBody.firstChild);
	}
};

const cargarDatos = (type) => {
	if (myChart) {
		myChart.destroy();
	}
	const url = `https://api.themoviedb.org/3/movie/${type}?api_key=15238df3fae4d5af0df0f3ac7790463b&language=en-US&page=1`;
	fetch(url)
		.then((response) => response.text())
		.then((data) => {
			const res = JSON.parse(data).results;
			const limitedMovies = res.slice(0, 10);
			const scores = [];
			const labels = [];
			let totalPopularity = 0;
			let totalVotes = 0;
			let totalAverage = 0;
			let delayed;

			limitedMovies.sort((a, b) => {
				return b.vote_average - a.vote_average;
			});

			cleanTable();

			let index = 1;
			for (let movie of limitedMovies) {
				labels.push(movie.title);
				scores.push(movie.popularity);
				totalPopularity += movie.popularity;
				totalVotes += movie.vote_count;
				totalAverage += movie.vote_average / 10;
				tableBody.innerHTML += tableTemplate(index, movie);
				index++;
			}

			arregloInfo[0].textContent = totalPopularity.toFixed(2);
			arregloInfo[1].textContent = totalVotes;
			arregloInfo[2].textContent = totalAverage.toFixed(2);

			const dataChart = {
				labels,
				datasets: [
					{
						data: scores,
						label: 'Points',
						fill: true,
						backgroundColor: 'blue',
					},
				],
			};

			const config = {
				type: 'bar',
				data: dataChart,
				options: {
					scales: {
						y: {
							suggestedMin: 0,
							suggestedMax: 10,
						},
					},
					hoverRadius: 8,
					radius: 5,
					hitRadius: 30,
					responsive: false,
					animation: {
						onComplete: () => {
							delayed = true;
						},
						delay: (context) => {
							let delay = 0;
							if (
								context.type === 'data' &&
								context.mode === 'default' &&
								!delayed
							) {
								delay = context.dataIndex * 300 + context.datasetIndex * 100;
							}
							return delay;
						},
					},
				},
			};

			myChart = new Chart(ctx, config);
		})
		.catch(console.error);
};

/*EVENT LISTENERS*/

window.addEventListener('DOMContentLoaded', (event) => {
	cargarDatos(select.value.toLowerCase().replace(' ', '_'));
});

select.addEventListener('change', (event) => {
	cargarDatos(select.value.toLowerCase().replace(' ', '_'));
});
