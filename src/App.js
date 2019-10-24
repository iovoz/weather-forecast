import React from 'react';
import './App.scss';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import WeatherForecastContainer from './containers/WeatherForecastContainer';

function App() {
    return (
        <div className="App">
            <div className="App-content">
                <WeatherForecastContainer/>
            </div>
        </div>
    );
}

export default App;
