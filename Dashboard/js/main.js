/*VARIABLES*/

const ctxBar = document.getElementById('barChart').getContext('2d');
const ctxPie = document.getElementById('pieChart').getContext('2d');

const select = document.querySelector('select');
const arregloInfo = document.getElementsByClassName('counter');
const tableBody = document.querySelector('tbody');
const posterViewer = document.getElementById('card-viewer');

const moviePoster = 'http://image.tmdb.org/t/p/w500';

let barChart;
let pieChart;
let delayed;

const optionsChart = {
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
	maintainAspectRatio: true,
	animation: {
		onComplete: () => {
			delayed = true;
		},
		delay: (context) => {
			let delay = 0;
			if (context.type === 'data' && context.mode === 'default' && !delayed) {
				delay = context.dataIndex * 300 + context.datasetIndex * 100;
			}
			return delay;
		},
	},
};

/*TEMPLATES*/

const tableTemplate = (index, movie) => {
	return `<tr>
							<th scope="row">${index}</th>
							<td class="txt-oflo">${movie.title}</td>
							<td>${movie.original_language}</td>
							<td class="txt-oflo">${movie.release_date}</td>
							<td><span class="text-success">${movie.vote_average}</span></td>
						</tr>`;
};

const posterTemplate = (movie) => {
	return `
		<div class="row p-5">
			<div class="p-2">
				<img
					src= ${moviePoster}${movie.poster_path}
					alt="user"
					width="200"
					class="p-2"
				/>
			</div>
			<div class="comment-text ps-2 ps-md-3 w-100">
				<h5 class="font-medium">${movie.title}</h5>
				<span class="mb-3 d-block">
					${movie.overview}
				</span>
				<div class="comment-footer d-md-flex align-items-center">
					<span class="badge rounded bg-success">${movie.vote_average}</span>
					<div class="text-muted fs-2 ms-auto mt-2 mt-md-0">
						${movie.release_date}
					</div>
				</div>
			</div>
		</div>
	`;
};

/*FUNCTIONS*/

const cleanTable = () => {
	while (tableBody.hasChildNodes()) {
		tableBody.removeChild(tableBody.firstChild);
	}
};

const cleanPoster = () => {
	while (posterViewer.hasChildNodes()) {
		posterViewer.removeChild(posterViewer.firstChild);
	}
};

const updateChart = () => {
	if (barChart || pieChart) {
		barChart.destroy();
		pieChart.destroy();
	}
};

const backgroundColorArray = [
	'rgba(255, 99, 132, 0.2)',
	'rgba(255, 159, 64, 0.2)',
	'rgba(255, 205, 86, 0.2)',
	'rgba(75, 192, 192, 0.2)',
	'rgba(54, 162, 235, 0.2)',
	'rgba(153, 102, 255, 0.2)',
	'rgba(201, 203, 207, 0.2)',
	'rgba(12, 204, 201, 0.2)',
	'rgba(66, 21, 288, 0.2)',
	'rgba(90, 10, 10, 0.2)',
];

const borderColorArray = [
	'rgb(255, 99, 132)',
	'rgb(255, 159, 64)',
	'rgb(255, 205, 86)',
	'rgb(75, 192, 192)',
	'rgb(54, 162, 235)',
	'rgb(153, 102, 255)',
	'rgb(201, 203, 207)',
	'rgba(12, 204, 201)',
	'rgba(66, 21, 288)',
	'rgba(90, 10, 10)',
];

const fetchMovies = (type) => {
	updateChart();
	cleanTable();
	cleanPoster();
	fetch(
		`https://api.themoviedb.org/3/movie/${type}?api_key=15238df3fae4d5af0df0f3ac7790463b&language=en-US&page=1`
	)
		.then((response) => response.text())
		.then((data) => {
			const res = JSON.parse(data).results;
			const limitedMovies = res.slice(0, 10);

			const popularity = [];
			const scores = [];
			const labels = [];

			let totalPopularity = 0;
			let totalAverage = 0;
			let totalVotes = 0;
			let index = 1;

			limitedMovies.sort((a, b) => {
				return b.vote_average - a.vote_average;
			});

			for (let movie of limitedMovies) {
				labels.push(movie.title);
				scores.push(movie.vote_average);
				popularity.push(movie.popularity);
				totalPopularity += movie.popularity;
				totalVotes += movie.vote_count;
				totalAverage += movie.vote_average / 10;
				tableBody.innerHTML += tableTemplate(index, movie);
				posterViewer.innerHTML += posterTemplate(movie);
				index++;
			}

			arregloInfo[0].textContent = totalPopularity.toFixed(2);
			arregloInfo[1].textContent = totalVotes;
			arregloInfo[2].textContent = totalAverage.toFixed(2);

			const dataBar = {
				labels,
				datasets: [
					{
						data: scores,
						label: 'Points',
						backgroundColor: backgroundColorArray,
						borderColor: borderColorArray,
						borderWidth: 1,
					},
				],
			};

			const dataPie = {
				labels,
				datasets: [
					{
						data: popularity,
						label: 'Points',
						backgroundColor: backgroundColorArray,
						borderColor: borderColorArray,
						borderWidth: 1,
					},
				],
			};

			const barConfig = {
				type: 'bar',
				data: dataBar,
				options: optionsChart,
			};

			const pieConfig = {
				type: 'doughnut',
				data: dataPie,
				options: {
					hitRadius: 30,
					responsive: true,
					maintainAspectRatio: true,
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
			barChart = new Chart(ctxBar, barConfig);
			pieChart = new Chart(ctxPie, pieConfig);
		})
		.catch(console.error);
};

/*EVENT LISTENERS*/

window.addEventListener('DOMContentLoaded', (event) => {
	fetchMovies(select.value.toLowerCase().replace(' ', '_'));
});

select.addEventListener('change', (event) => {
	fetchMovies(select.value.toLowerCase().replace(' ', '_'));
});
