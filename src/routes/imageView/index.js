import { h, Component } from 'preact';
import style from './style';
import ImageGridItem from '../../components/imageGridItem';
import axios from 'axios';
import { getRandomInt } from '../../helpers';


export default class ImageView extends Component {

	state = {
        result: null
	};

	
   
	componentDidMount() {
        const _this = this;

        let temp;

		axios({
			method:'get',
			url:'https://archillect-api.now.sh/visuals/' + _this.props.id.toString(),
			responseType:'stream'
		  })
		.then( (response) => {
            console.log(response.data);
            this.setState({ result : response.data });
		});

    }
    
    
      
    fetchImage = () => {
        const TF_REST_API_URL = 'http://localhost:5000/predict';
        const IMAGE_PATH = this.state.result.imageSource;
        const types=['la_muse', 'rain_princess', 'scream', 'udnie', 'wave', 'wreck'];
        const MODEL_PATH = 'models/'+ types[getRandomInt(5)] +'.ckpt';
        const payload = {image : IMAGE_PATH, model: MODEL_PATH};
        axios.post(TF_REST_API_URL, payload)
          .then( (response) => {
            console.log(response.data);
            this.setState({ result : response.data });
		})
          .catch(function (error) {
            console.log(error);
          });
    }


	render({id}, {result}) {

        if(this.state.result === null)
        {
            return (
                <p>Loading!</p>
            );
        }
        else
        {
            return (
                <div class= {style.imagePage}>
            <div class={style.imageView}>
                <h1>Image {result.id}</h1>
                {/* <p>This is the Image Viewing Tab.</p> */}
                <img src={result.imageSource}> </img> 
            </div>
            <button onClick={() => this.fetchImage()} class="myButton">Synthesize!</button>
            </div>
            );
        }

		// return (
		// 	<div class={style.imageView}>
		// 			<h1>Image</h1>
		// 			<p>This is the Image Viewing Tab.</p>

                    
        //             {this.state.temp.map((x) => 
		// 				<img src={x.imageSource}> </img>
		// 			)}
        //             {/* <img src={result.imageSource}> </img>  */}

		// 	</div>
			
		// );

	}
}