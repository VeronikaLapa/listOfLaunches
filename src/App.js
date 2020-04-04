import React from 'react';
import './App.css';
import ListView from "./ListView";

class App extends React.Component {
    render() {
        return (
            <div className="content">
                <ListView />
            </div>
        )
    }
}

export default App;
