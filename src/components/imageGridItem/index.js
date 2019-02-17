import { h, Component } from 'preact';
import style from './style';

// const ImageGridItem = (url, id) => (
export default class ImageGridItem extends Component {

    componentDidMount() {
        console.log(this.props.url, this.props.id);
    }

	render({url, id}) {
        return (

            <div class={style.image_grid_item}>
            <img src={url}></img>
            
            <p>{id}</p>
            {/* <p>{url.toString()}</p> */}
    
    
        </div>
        );
    }

}

// export default ImageGridItem;
