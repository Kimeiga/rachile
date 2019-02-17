import { h, Component } from 'preact';
import style from './style';
import ImageGridItem from '../../components/imageGridItem';
import axios from 'axios';


export default class Home extends Component {

	state = {
		pics: []
	};

	// getPostData(req)
	// .then(body => {
	// 	console.log(body);
	// 	let options = {
	// 		uri: query.url,
	// 		headers: body.headers,
	// 		method: body.method || 'GET
	// 	};

	// 	let proxyCallback = (proxyErr, proxyRes, proxyBody) => {
	// 		res.writeHead(proxyRes.statusCode, proxyRes.headers);
	// 		res.write(proxyBody);
	// 		res.end();
	// };
	// 	request(options, proxyCallback);
	// })

	componentDidMount() {

	// 	fetch images
	// 	const proxyurl = "https://cors-escape.herokuapp.com/";
	// 	const url = "https://archillect-api.now.sh/visuals"; // site that doesn’t send Access-Control-*
	// 	fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
	// 	.then(response => response.text())
	// 	.then((data) => {
	// 		console.log( JSON.parse(data) );
	// 		this.setState({ pics: JSON.parse(data) });
	// 	  })
	// 	.catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

		// fetch('https://archillect-api.now.sh/visuals', {
		// 	method: 'GET',
		// 	headers: {
		// 	  'Accept': 'application/json',
		// 	  'Content-Type': 'application/json',
		// 	  'Access-Control-Allow-Origin': 'http://localhost:8080',
		// 	  'Access-Control-Allow-Credentials': 'true'

		// 	},
		//   })
		//   .then((response) => {
		// 	return response.text();
		//   })
		//   .then((data) => {
		// 	console.log( JSON.parse(data) );
		// 	this.setState({ pics: JSON.parse(data) });
		//   })

		axios({
			method:'get',
			url:'https://archillect-api.now.sh/visuals',
			responseType:'stream'
		  })
		.then( (response) => {
		//   response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
			console.log(response.data);
			this.setState({ pics: response.data });
		});

	}


	render() {
		return (
			<div class={style.home}>
					<h1>Home</h1>
					<p>This is the Home component.</p>


					{/* get 20 images from archillect via js */}
					{/* create 20 imageGridItems that each have the images and ids */}

					{this.state.pics.map((element) => 
						<ImageGridItem key={element.id} url={element.imageSource} id={element.id} />	
					)}

			</div>
			
		);

	}
}