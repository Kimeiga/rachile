import { h, Component } from 'preact';
import style from './style';
import ImageGridItem from '../../components/imageGridItem';
import axios from 'axios';


export default class ImageView extends Component {

	state = {
        result: null
	};

	
    initResult = () => {

    }
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


	render({id}, {result}) {

        if(this.state.result == null)
        {
            return (<p>Loading!</p> );
        }
        else
        {
            return (<div class={style.imageView}>
            <h1>Image</h1>
            <p>This is the Image Viewing Tab.</p>
            <img src={result.imageSource}> </img> 
            </div>);
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