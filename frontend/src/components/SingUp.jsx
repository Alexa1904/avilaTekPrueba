import React, {Component} from 'react'
import './styles/SingUp.css'
import {Link} from 'react-router-dom'



export default class SingUp extends Component{
    constructor(...props){
        super(...props)

        this.state={
            type:0
        }

        this.email= React.createRef();
        this.password = React.createRef();
        this.name=React.createRef();
        this.lastName=React.createRef();
        this.confirmPassword=React.createRef(); 
        this.phone=React.createRef();
        this.username=React.createRef();


        this.typeFounder=this.typeFounder.bind(this);
        this.typeVoter=this.typeVoter.bind(this);
    }
    
    submitHandler = (event) =>{
        event.preventDefault();
        const email = this.email.current.value;
        const password = this.password.current.value
        const name = this.name.current.value
        const lastName = this.lastName.current.value
        const confirmPassword = this.confirmPassword.current.value
        const phone = this.phone.current.value
        const username = this.username.current.value

        if(email.trim().length===0 || password.trim().length===0||name.trim().length===0||lastName.trim().length===0||confirmPassword.trim().length===0||phone.trim().length===0||username.trim().length===0){
            alert("Please fill in ALL the fields")
            return
        }

        if(password!=confirmPassword){
            alert("The passwords do not match")
            return
        }
        const requestBody={
            query:`
                mutation{
                    createFounder(founderInput:{
                        email:"${email}"
                        password:"${password}"
                        username:"${username}"
                        type:${this.state.type}
                        address:"${name} ${lastName}"
                        phone:"${phone}"
                    }){
                        _id
                        email
                    }
                }
            `
        }
        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res=>{
            if(res.status !== 200 && res.status !==201){
                throw new Error('Failed')
            }
            return res.json()
        })
        .then(resData=>{
            console.log(resData)
        }).catch(err =>{
            console.log(err)
        })

        this.email.current.value= ''
        this.password.current.value = ''
        this.name.current.value=''
        this.lastName.current.value=''
        this.confirmPassword.current.value='' 
        this.phone.current.value=''
        this.username.current.value=''
    };

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
                        <Link to="/login">
                            <input type="submit" className="shadow"  value="Login"/>
                        </Link> 
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
                                {this.state.type===0?
                                        <h3 class="register-heading">Sing Up as a Founder</h3>
                                    :
                                        <h3 class="register-heading">Sing Up as a Voter</h3>
                                }
                                <div className="row register-form" >
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" ref={this.name} placeholder="First Name *"/>
                                        </div>
                                        <div class="form-group">
                                            <input type="text" className="form-control" ref={this.lastName} placeholder="Last Name *" />
                                        </div>
                                        <div class="form-group">
                                            <input type="password" className="form-control" ref={this.password} placeholder="Password *"/>
                                        </div>
                                        <div class="form-group">
                                            <input type="password" className="form-control"  ref={this.confirmPassword} placeholder="Confirm Password *"/>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="email" className="form-control" ref={this.email} placeholder="Your Email *"/>
                                        </div>
                                        <div class="form-group">
                                            <input type="tel" minlength="10" maxlength="10"  class="form-control" placeholder="Your Phone Number (optional)" ref={this.phone}/>
                                        </div>
                                        <div class="form-group">
                                            <input type="text" className="form-control" ref={this.username} placeholder="Username *"/>
                                        </div>
                                        <input onClick={this.submitHandler} type="submit" className="btnRegister shadow"  value="Register"/>
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
