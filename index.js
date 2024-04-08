const express = require('express');
const fetch = require('node-fetch');
const { Buffer } = require('buffer');
const { config } = require('dotenv');
config();

const app = express();

app.get('/', (req, res) => res.json('It works'));

app.use('/image/:imageName', async (req, res) => {
	try {
		const { imageName } = req.params;
		const imageUrl =
			process.env.MAIN_SERVER + `/document/photos_couvert/${imageName}`;
		const response = await fetch(imageUrl);
		const arrayBuffer = await response.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		res.writeHead(200, {
			'Content-Type': 'image/png',
			'Access-Control-Allow-Origin': '*',
		});
		res.end(buffer);
	} catch (error) {
		console.error('Error fetching image:', error);
		res.status(500).send('Internal Server Error');
	}
});

app.listen(process.env.PORT, () => {
	console.log(`Proxy server running on port`);
});
