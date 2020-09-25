import React, {Component} from 'react'
import './styles/Profile.css'
import MyProducts from './MyProducts'
import AddProduct from './AddProduct'
import VotedProducts from './VotedProducts'
import {
    BrowserRouter as Router,
} from 'react-router-dom'
import AuthContext from '../context/auth-context'
import usuario from './images/usuario.png'




export default class Profile extends Component{
    constructor(...props){
        super(...props)

        this.state={
            type: 0,
            option:0,
            id: String,
            name:String,
            username:String,
            email:String
        }

        this.AddProduct=this.AddProduct.bind(this)
        this.MyProducts=this.MyProducts.bind(this)
    }

    static contextType = AuthContext;

    componentDidMount(){
        console.log(this.context.userId)
        const requestBody={
            query:`
                query{
                    user(id:"${this.context.userId}"){
                       address
                       username
                       email
                       type
                    }
                }
            `
        }
        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers:{
                'Content-Type': 'application/json',
            }
        })
        .then(res=>{
            if(res.status !== 200 && res.status !==201){
                throw new Error('Failed')
            }
            return res.json()
        })
        .then(resData=>{
            this.setState({name:resData.data.user.address})
            this.setState({username:resData.data.user.username})
            this.setState({email:resData.data.user.email})
            this.setState({type:resData.data.user.type})
        }).catch(err =>{
            console.log(err)
        });
    }

    AddProduct(){
        this.setState({option:1})
    }

    MyProducts(){
        this.setState({option:0})
    }

    render(){
        return(
        <div>
            <Router>
            <div className="row gap-up">
                <div className="col-md-10 offset-1 userInfo shadow">
                    <div className="row">
                        <div className="col-md-2">
                            <img src={usuario} className="usuario align-self-center text-center" alt=""/>
                        </div>
                        <div className="col-md-4">
                            <div className="">
                                <h5 className="align-self-center gap-up">{this.state.name}</h5>
                                <p>{this.state.email}</p>
                                <p>{this.state.username}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {this.state.type===0?
                <>
                    <div className="row gap-down">
                        <div className="col-md-10 offset-1">
                        <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
                            <li className="nav-item">
                                <div onClick={this.MyProducts} className="nav-link active" id="home-tab" data-toggle="tab"  role="tab" aria-controls="home" >My Products</div>
                            </li>
                            <li class="nav-item">
                                <div onClick={this.AddProduct} className="nav-link" id="profile-tab" data-toggle="tab"  role="tab" aria-controls="profile" aria-selected="false">Add Product</div>
                            </li>
                        </ul>
                        </div>
                    </div>

                    {this.state.option===0?
                        <div className="row">
                        <div className="col-md-10 offset-1">
                        <div><MyProducts/></div>
                        </div>
                    </div>
                        :
                        <div className="row">
                        <div className="col-md-10 offset-1">
                        <div><AddProduct/></div>
                        </div>
                    </div>
                    }
                </>
                :
                <div className="row">
                        <div className="col-md-10 offset-1">
                            <VotedProducts/>
                        </div>
                    </div>
            }
            </Router>
        </div>
        )
    }
}
