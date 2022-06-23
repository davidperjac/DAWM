const ctx = document.getElementById('myChart').getContext('2d');

let myChart;

let gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(58,123,213,1)');
gradient.addColorStop(1, 'rgba(0,210,255,0.3)');

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
			let delayed;

			for (let movie of limitedMovies) {
				labels.push(movie.title);
				scores.push(movie.popularity);
			}

			const dataChart = {
				labels,
				datasets: [
					{
						data: scores,
						label: 'Points',
						fill: true,
						backgroundColor: gradient,
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

const select = document.querySelector('select');

const selectValue = select.value.toLowerCase().replace(' ', '_');

window.addEventListener('DOMContentLoaded', (event) => {
	cargarDatos(selectValue);
});

select.addEventListener('change', (event) => {
	cargarDatos(selectValue);
});
