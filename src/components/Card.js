import React, { Component } from 'react'
import './styles/Card.css'
export class Card extends Component {

    componentDidMount(){
        
    }
    render() {
        const {field, img_src, value, unit} = this.props

        return (
            <div className="Card">
                <h4>{field}</h4>
                <div className="CardContainer">
                    <img className="CardLogo" src={img_src}></img>
                    <p className="CardValue">{value} {unit}</p>

                </div>
                
            </div>
        )
    }
}

export default Card
