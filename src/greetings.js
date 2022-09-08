import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export class Greetings extends React.Component {

    constructor(props) {
        super(props);
        this.state = { title: [] };
        this.callAPI = this.callAPI.bind(this);
    }

    callAPI(e){
        const text=e.target.value;
        let url="http://www.omdbapi.com/?t="+text+"&apikey=1c68acfc";

        var movieList = [];

        axios
            .get(url)
            .then(response => {
                console.log(response.data.Title);
                //add condition if undefined or empty
                movieList.push(response.data.Title);
                let title=(<li>{response.data.Title}</li>);
                //document.getElementById("movie").innerHTML = movieList; // Not working
                //save response.data to state
                this.setState({
                    title: this.state.title.concat([title])
                })

            })
            .catch(error => console.error(error));


    }

    render() {

        const login = (<form action='#'>
            <input
                type="text"
                placeholder="movie"
                onChange={this.callAPI}
            />
            <input
                type="submit"/>
        </form>);

        return (
            <div>
                <h1>Movie Search</h1>
                {login}
                <ul>
                <li>{this.state.title}</li>
                </ul>
            </div>
        );
    }
}
export default Greetings;