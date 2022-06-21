const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
const data = {
	labels: labels,
	datasets: [
		{
			label: 'My First dataset',
			backgroundColor: 'rgb(255, 99, 132)',
			borderColor: 'rgb(255, 99, 132)',
			data: [0, 10, 5, 2, 20, 30, 45],
		},
	],
};
const config = {
	type: 'line',
	data: data,
};

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, config);

/*
			var pieData = [
				{
					value: 20,
					color: '#878BB6',
				},
				{
					value: 40,
					color: '#4ACAB4',
				},
				{
					value: 10,
					color: '#FF8153',
				},
				{
					value: 30,
					color: '#FFEA88',
				},
			];
			// Get the context of the canvas element we want to select
			var countries = document.getElementById('countries').getContext('2d');
			new Chart(countries).Pie(pieData);
*/
