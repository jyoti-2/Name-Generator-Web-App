import React from 'react';
import SearchBox from '../SearchBox/SearchBox.jsx';
import Header from './../Header/Header.jsx';
import './app.css';


// Class Component
class App extends React.Component
{
    state = {
        headertext: "Name it!"
    };

    handleInputChange = () => {
        alert('I am called');
    }
    


    render()
    {
        return (
            <div>
                <Header headtitle={this.state.headertext} />
                <SearchBox onInputChange = {this.handleInputChange}/>
                
            </div>
        );
    };
    
};



export default App;