const ctx = document.getElementById('myChart').getContext('2d');

const movies =
	'https://api.themoviedb.org/3/movie/upcoming?api_key=15238df3fae4d5af0df0f3ac7790463b&language=en-US&page=1';

const cargarDatos = () => {
	fetch(movies)
		.then((response) => response.text())
		.then((data) => {
			const res = JSON.parse(data).results;
			const limitedMovies = res.slice(0, 20);
			let delayed;
			console.log(limitedMovies);

			const labels = [];
			const scores = [];

			for (let movie of limitedMovies) {
				labels.push(movie.title);
				scores.push(movie.popularity);
			}

			let gradient = ctx.createLinearGradient(0, 0, 0, 400);
			gradient.addColorStop(0, 'rgba(58,123,213,1)');
			gradient.addColorStop(1, 'rgba(0,210,255,0.3)');

			const dataChart = {
				labels,
				datasets: [
					{
						data: scores,
						label: 'Points',
						fill: true,
						backgroundColor: gradient,
						borderColor: '#fff',
						pointBackgroundColor: 'gray',
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
					responsive: true,
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

			const myChart = new Chart(ctx, config);
		})
		.catch(console.error);
};

window.addEventListener('DOMContentLoaded', (event) => {
	cargarDatos();
});
