import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: '',
        isLoading: false,
        error: null,
        items: []
      };
    }
    handleChange = (event) =>{
        this.setState({
            value: event.target.value
                });
     }
        
   handleSubmit= (event) => {
        let coin = this.state.value;
        this.ComponentDidMount(coin);
        event.preventDefault();
        this.setState({
            isLoading : true
        });
    }
    ComponentDidMount(id)
     {
        fetch(`https://swapi.co/api/people/?search=${id}`, {
        }).then((response) => response.json())
        .then(
          (result) => {
          
            this.setState({
              isLoading: false,
              items: result.results
            });
          },
          (error) => {
            this.setState({
             isLoading: false,
              error
            });
          }
        )
    }
  
    render() {
    
      const { error,isLoading, items } = this.state;
      if (error) 
      {
        return <div>Error: {error.message="no"}</div>;
      } 
      else 
      {
          
        return (
        <div id="outer">
            <form  onSubmit={() => this.handleSubmit} className="okay">
                <label>
                <span>  Name:</span>
                  <input type="text" value={this.state.value} onChange={() => this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
             </form>
            <div id="try">
            <ul>
                {items.map(item => (
                <li key={item.name}>
                   <h4>Name:{item.name} Mass:{item.mass} Height:{item.height}</h4>
                    
                    
                </li>
               
                ))}
            </ul>
            </div>
            {this.state.isLoading === true ? <div id="small"><h1>Loading...</h1></div> : <div />}
        </div>
       
        );
      }
      
    }
  }

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
