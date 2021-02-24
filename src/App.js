import './App.css';
import React, { useState, useEffect } from 'react';
import { readRemoteFile } from 'react-papaparse';
import Spinner from 'react-bootstrap/Spinner';

const text = (title, total, diff, percentage) => {
	return (
		<p>
			{title} {total}; ({diff}); <b>{percentage}%</b>
		</p>
	);
};
function App() {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);

	useEffect(() => {
		function fetchData() {
			readRemoteFile(
				'https://raw.githubusercontent.com/dssg-pt/covid19pt-data/master/data.csv',
				{
					download: true,
					complete: (results) => {
						setData(results.data);
					},
				}
			);
		}

		fetchData();
	}, []);

	useEffect(() => {
		if (data !== null) {
			setLoading(false);
		}
	}, [data]);

	return (
		<>
			{loading === false ? (
				<div className="App">
					<header className="App-header">
						<div
							style={{
								fontSize: 16,
							}}
						>
							<p>
								<b>Relatorio do dia {data[data.length - 2][0]}</b>
							</p>
						</div>
						<div
							style={{
								textAlign: 'left',
								fontSize: 14,
							}}
						>
							{text(
								'Total de Casos em Vigilancia:',
								data[data.length - 2][18],
								data[data.length - 2][18] - data[data.length - 3][18],
								(
									((data[data.length - 2][18] - data[data.length - 3][18]) /
										data[data.length - 2][18]) *
									100
								).toFixed(2)
							)}
							{text(
								'Total de Obitos:',
								data[data.length - 2][13],
								data[data.length - 2][13] - data[data.length - 3][13],
								(
									((data[data.length - 2][13] - data[data.length - 3][13]) /
										data[data.length - 2][13]) *
									100
								).toFixed(2)
							)}
							{text(
								'Total de Casos Recuperados:',
								data[data.length - 2][11],
								data[data.length - 2][11] - data[data.length - 3][11],
								(
									((data[data.length - 2][11] - data[data.length - 3][11]) /
										data[data.length - 2][11]) *
									100
								).toFixed(2)
							)}
							{text(
								'Total de Casos Confirmados:',
								data[data.length - 2][2],
								data[data.length - 2][11],
								(
									(data[data.length - 2][11] / data[data.length - 2][2]) *
									100
								).toFixed(2)
							)}
							{text(
								'Total de Casos Ativos:',
								data[data.length - 2][86],
								data[data.length - 2][86] - data[data.length - 3][86],
								(
									((data[data.length - 2][86] - data[data.length - 3][86]) /
										data[data.length - 2][86]) *
									100
								).toFixed(2)
							)}
							{text(
								'Total de Casos Internados na Enfermaria:',
								data[data.length - 2][87],
								data[data.length - 2][87] - data[data.length - 3][87],
								(
									((data[data.length - 2][87] - data[data.length - 3][87]) /
										data[data.length - 2][87]) *
									100
								).toFixed(2)
							)}
							{text(
								'Total de Casos Internados em UCI:',
								data[data.length - 2][15],
								data[data.length - 2][15] - data[data.length - 3][15],
								(
									((data[data.length - 2][15] - data[data.length - 3][15]) /
										data[data.length - 2][15]) *
									100
								).toFixed(2)
							)}
						</div>
					</header>
				</div>
			) : (
				<div className="App">
					<header className="App-header">
						<p>Fetching Covid19 data!</p>
						<p>It's ok, this is not transmissible</p>
						<Spinner animation="border" variant="danger" />
					</header>
				</div>
			)}
		</>
	);
}

export default App;
