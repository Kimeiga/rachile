import { h, Component } from 'preact';
import style from './style';
import ImageGridItem from '../../components/imageGridItem';
import axios from 'axios';


export default class Home extends Component {

	state = {
		pics: [],
		lastPic: null,
		error: false,
		hasMore: true,
		isLoading: false
	};

	constructor(props) {
		super(props);
		// Binds our scroll event handler
		window.onscroll = () => {
		  const {
			loadImages,
			state: {
			  error,
			  isLoading,
			  hasMore,
			  pics,
			  lastPic
			},
		  } = this;

		  // Bails early if:
      // * there's an error
      // * it's already loading
      // * there's nothing left to load
      if (error || isLoading || !hasMore) return;

      // Checks that the page has scrolled to the bottom
      if (
		window.scrollY + window.innerHeight >= document.body.scrollHeight
      ) {
        loadImages();
      }
    };
  }

  loadImages = () =>  {
	console.log ("Yoooooo!!");
	console.log(this.state.lastPic);
	var i;
	for(i=0;i<48;i++)
	{
		console.log(this.state.lastPic);

		axios({
			method:'get',
			url:'https://archillect-api.now.sh/visuals/' + (this.state.lastPic - i).toString(),
			responseType:'stream'
		  })
		.then( (response) => {
			console.log(response.data);
			this.setState((prevState) => { 
				return { pics: [...prevState.pics, response.data] }
			});
		}).then(() => {
			this.setState((prevState)=> {
				return {lastPic: prevState.lastPic -1};
			})
		})
	}

	
	
  }
	

	componentDidMount() {


		axios({
			method:'get',
			url:'https://archillect-api.now.sh/visuals?per=48',
			responseType:'stream'
		  })
		.then( (response) => {
			console.log(response.data);
			this.setState({ pics: response.data , lastPic: response.data[response.data.length-1].id});
		});

	}


	render() {
		return (
			<div class={style.home}>
					{/* <h1>Home</h1> */}
					{/* <p>This is the Home component.</p> */}


					{/* get 20 images from archillect via js */}
					{/* create 20 imageGridItems that each have the images and ids */}

					{this.state.pics.map((element) => 
						<ImageGridItem key={element.id} url={element.imageSource} id={element.id} /> 
					)}

			</div>
			
		);

	}
}