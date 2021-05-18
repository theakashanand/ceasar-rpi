import React, { Component } from 'react'
import Card from './Card'

import temperature_img from '../images/cards/thermometer.png'
import humidity_img from '../images/cards/humidity.png'
import moisture_img from '../images/cards/soil.png'
import co2_img from '../images/cards/co2.png'

import  CanvasJSReact from '../canvasjs-3.2.16/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


export class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            sensorData:{
                humidity:0,
                temperature:0,
                moisture:0,
                co2: 0,
            },
            plotField:"temperature",
            plotData:null,
        }

        this.units = {
            temperature:" C",
            moisture: "%",
            humidity: "%",
            co2:"ppm"
        }

        this.logos = {
            temperature:temperature_img,
            moisture: moisture_img,
            humidity: humidity_img,
            co2:co2_img,
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

    showAllTimeDataPlot = (field = "temperature") =>{
        fetch(`/alltime-data/${field}`)
              .then((res) => res.json())
              .then((data)=>{
                console.log("Data: ", data)
                // for (var i =0; i<data.length; i++){
                //     data[i] = {y: data[i].y, label: data[i].label}
                // }
                var plotData = this.getPlotData(field, data)
                this.setState({
                    plotData: plotData
                })
              });  
    }

    getPlotData = (field = "temperature", dataPoints) =>{
        const options = {
            animationEnabled: true,	
            title:{
                text: field.charAt(0).toUpperCase() + field.slice(1)

            },
            axisY : {
                title: this.units[field]
            },
            toolTip: {
                shared: true
            },
            data: [{
                type: "spline",
                showInLegend: true,
                dataPoints: dataPoints
            }]
    }

        return options
      
    }

    componentDidMount(){
        this.getLatestData()
    }

    render() {
        let d = new Date()
        const {sensorData} = this.state
        return (
            <div className="View WelcomeView">
                {/* <button onClick={this.getAllTimeData}>Get Data</button> */}
                <h3>Current Environment</h3>
                <h4>Last refreshed at: {`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`}</h4>
                <table>
                    <tr>
                        {Object.keys(sensorData).map((field)=>
                        <td key={field} name={field} onClick = {()=>{this.showAllTimeDataPlot(field)}}>
                            <Card  field={field} value={sensorData[field]} unit={this.units[field]} img_src = {this.logos[field]}></Card>
                        </td>
                    )}

                    </tr>
                </table>
                <br/>
                <button onClick={this.getLatestData}>Refresh</button>
                <br/>
                {this.state.plotData?
                <CanvasJSChart options = {this.state.plotData} 
                    /* onRef={ref => this.chart = ref} */
                />
                :null}
                
            </div>
        )
    }
}

export default Home
