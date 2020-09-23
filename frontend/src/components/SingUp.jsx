import React, {Component} from 'react'
import './styles/SingUp.css'



export default class SingUp extends Component{
    constructor(...props){
        super(...props)

        this.state={
            type:0
        }

        this.typeFounder=this.typeFounder.bind(this)
        this.typeVoter=this.typeVoter.bind(this)
    }
    

    typeFounder(){
        this.setState({type:0})
        console.log(this.state)
    }
    typeVoter(){
        this.setState({type:1})
        console.log(this.state)
    }

    render(){
        return(
            <div>
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <div className="row">
            <div className="col-md-10 offset-1">
            <div className="container register gap-down">
                <div className="row ">
                    <div className="col-md-3 register-left text-center gap-up">
                        <h3 className="welcome align-self-middle gap-up">Welcome</h3>
                        <p>You already have an account?</p>
                        <input className="shadow" type="submit" name="" value="Login"/><br/>
                    </div>
                    <div className="col-md-9 register-right">
                        <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
                            <li className="nav-item">
                                <div onClick={this.typeFounder} className="nav-link active" id="home-tab" data-toggle="tab"  role="tab" aria-controls="home" >Founder</div>
                            </li>
                            <li class="nav-item">
                                <div onClick={this.typeVoter} className="nav-link" id="profile-tab" data-toggle="tab"  role="tab" aria-controls="profile" aria-selected="false">Voter</div>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                {this.state.type==0?
                                        <h3 class="register-heading">Sing Up as a Founder</h3>
                                    :
                                        <h3 class="register-heading">Sing Up as a Voter</h3>
                                }
                                <div className="row register-form">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="First Name *"/>
                                        </div>
                                        <div class="form-group">
                                            <input type="text" className="form-control" placeholder="Last Name *" />
                                        </div>
                                        <div class="form-group">
                                            <input type="password" className="form-control" placeholder="Password *"/>
                                        </div>
                                        <div class="form-group">
                                            <input type="password" className="form-control"  placeholder="Confirm Password *"/>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="email" className="form-control" placeholder="Your Email *"/>
                                        </div>
                                        <div class="form-group">
                                            <input type="tel" minlength="10" maxlength="10"  class="form-control" placeholder="Your Phone Number (optional)*" />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" className="form-control" placeholder="Username *"/>
                                        </div>
                                        <input type="submit" className="btnRegister shadow"  value="Register"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            </div>
        </div>
        
            </div>
        )
    }

}
