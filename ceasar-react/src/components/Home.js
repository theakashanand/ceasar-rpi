import React, { Component } from 'react'
import Card from './Card'

import temperature_img from '../images/cards/thermometer.png'
import humidity_img from '../images/cards/humidity.png'
import moisture_img from '../images/cards/soil.png'


export class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            sensorData:{
                temperature:0,
                humidity:0,
                moisture:0,
            },
        }

        this.units = {
            temperature:" C",
            moisture: "%",
            humidity: "%",
        }

        this.logos = {
            temperature:temperature_img,
            moisture: moisture_img,
            humidity: humidity_img,
        }
    }

    getLatestData = () =>{

        fetch("/latest-data")
              .then((res) => res.json())
              .then((data) => this.setState({
                  sensorData:data.sensorData,
              }
        ));
          
    }

    render() {
        let d = new Date()
        const {sensorData} = this.state
        return (
            <div className="View WelcomeView">
                <button onClick={this.getLatestData}>Refresh</button>
                <p>Current Environment</p>
                <p>Time: {`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`}</p>
                <table>
                    <tr>
                        {Object.keys(sensorData).map((field)=>
                        <td key={field}>
                            <Card  field={field} value={sensorData[field]} unit={this.units[field]} img_src = {this.logos[field]}></Card>
                        </td>
                    )}

                    </tr>
                </table>
                
            </div>
        )
    }
}

export default Home
