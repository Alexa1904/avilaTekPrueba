import React, {Component} from 'react'
import logo from './images/logoAvilaHunt.png'
import './styles/Header.css'


export default class Header extends Component{
    constructor(...props){
        super(...props)

        this.state={
            logedIn: false
        }
    }

    render(){
        return(
            <div className="margins">
                <div className="row">
                    <div className="col-md-2">
                        <img id="logo"  src={logo} alt=""/>
                    </div>
                    <div className="col-md-2"><h3 className="align-middle">Avila Hunt</h3></div>
                </div>
            </div>
        )
    }
}