import React, { Component } from 'react'
import Card from './Card'

import temperature_img from '../images/cards/thermometer.png'
import humidity_img from '../images/cards/humidity.png'
import moisture_img from '../images/cards/soil.png'
import  CanvasJSReact from '../canvasjs-3.2.16/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


export class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            sensorData:{
                temperature:0,
                humidity:0,
                moisture:0,
            },
            plotField:"temperature",
            plotData:null,
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

    getField = (string) =>{
        fetch("/p/Akash")
              .then((res) => res.json())
              .then((data)=>{
                  console.log("Field data: ", data)
              });  
    }

    getPlotData = (field = null) =>{
        const options = {
            animationEnabled: true,	
            title:{
                text: "Number of New Customers"
            },
            axisY : {
                title: "Number of Customers"
            },
            toolTip: {
                shared: true
            },
            data: [{
                type: "spline",
                name: "2016",
                showInLegend: true,
                dataPoints: [
                    { y: 155, label: "Jan" },
                    { y: 150, label: "Feb" },
                    { y: 152, label: "Mar" },
                    { y: 148, label: "Apr" },
                    { y: 142, label: "May" },
                    { y: 150, label: "Jun" },
                    { y: 146, label: "Jul" },
                    { y: 149, label: "Aug" },
                    { y: 153, label: "Sept" },
                    { y: 158, label: "Oct" },
                    { y: 154, label: "Nov" },
                    { y: 150, label: "Dec" }
                ]
            },
            {
                type: "spline",
                name: "2017",
                showInLegend: true,
                dataPoints: [
                    { y: 172, label: "Jan" },
                    { y: 173, label: "Feb" },
                    { y: 175, label: "Mar" },
                    { y: 172, label: "Apr" },
                    { y: 162, label: "May" },
                    { y: 165, label: "Jun" },
                    { y: 172, label: "Jul" },
                    { y: 168, label: "Aug" },
                    { y: 175, label: "Sept" },
                    { y: 170, label: "Oct" },
                    { y: 165, label: "Nov" },
                    { y: 169, label: "Dec" }
                ]
            }]
    }

        return options
      
    }

    showPlot = (field = null) =>{
        var plotData = this.getPlotData()
        this.setState({
            plotData: plotData
        })

    }

    render() {
        let d = new Date()
        const {sensorData} = this.state
        return (
            <div className="View WelcomeView">
                <button onClick={this.getTagId}>Get Data</button>
                <button onClick={this.getLatestData}>Refresh</button>
                <p>Current Environment</p>
                <p>Time: {`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`}</p>
                <table>
                    <tr>
                        {Object.keys(sensorData).map((field)=>
                        <td key={field} name={field} onClick = {()=>{this.showPlot()}}>
                            <Card  field={field} value={sensorData[field]} unit={this.units[field]} img_src = {this.logos[field]}></Card>
                        </td>
                    )}

                    </tr>
                </table>
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
