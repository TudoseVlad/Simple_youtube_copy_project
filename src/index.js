import _ from 'lodash';

import React,{Component} from "react";
import ReactDOM, { render } from "react-dom";

import YTSearh from "youtube-api-search";

import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";


// insert yt api key
const API_KEY = '';


// Create a new component. This component should produce some HTML
class App extends Component{

    constructor(props){
        super(props);

        this.state = { 
            videos : [] ,
            selectedVideo: null
        };
        this.videoSearh('george buhnici');
       
    }

    videoSearh(term){
        YTSearh({key: API_KEY, term: term} , (videos) =>{
            // only works if the name of the state is the same with the name of the argument
             this.setState({ videos : videos,
                    selectedVideo: videos[0]
             });
        });
    }

    render() {
        const videoSearch = _.debounce((term) => {this.videoSearh(term)},300);

       return (
        <div>
            <SearchBar onSearchTermChange = {videoSearch } />
            <VideoDetail video={this.state.selectedVideo}/>
            <VideoList 
                onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                videos ={this.state.videos}  />
        </div>
        );
    }
}
// Take this components generated HTML and put iton the page (in the DOM )
ReactDOM.render(<App/>, document.querySelector('.container'));