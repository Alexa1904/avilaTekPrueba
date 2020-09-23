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
            <div className="cont aling-center">
                <div className="row">
                    <div className="col-md-10 offset-1 shadow shadow-box">
                        <div className="row">
                            <div className="col-md-3 text-center">
                                <img src={logo} id="logo" alt=""/>
                            </div>
                            <div className="col-md-4 title align-self-center offset-1 text-center"><h2><span id="avila">AVILA</span> HUNT</h2></div>
                            {!this.state.logedIn?
                                    <>
                                        <div className="col-md-2 align-self-center text-right padding0 ">
                                            <input type="submit" class="options shadow"  value="Login"/>
                                        </div>
                                        <div className="col-md-2  align-self-center text-left">
                                            <input type="submit" class="options shadow" id="green-button"  value="Sing Up"/>   
                                        </div>
                                    </>
                                :
                                    <>
                                        <div className="col-md-2 align-self-center text-right padding0 ">
                                            <button className="button">Add Project</button>
                                        </div>
                                        <div className="col-md-2 align-self-center">
                                            <img id = "avatar" src="" alt=""/>
                                        </div>
                                    </>
                            }
                        </div>
                    </div>
                </div>     
            </div>
        )
    }
}