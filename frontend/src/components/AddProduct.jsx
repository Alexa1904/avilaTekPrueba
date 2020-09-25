import React, {Component} from 'react'
import './styles/AddProduct.css'
import AuthContext from '../context/auth-context'


export default class AddProduct extends Component{
    constructor(...props){
        super(...props)

        this.state={
            id:String
        }

        this.name=React.createRef();
        this.description = React.createRef();
        this.link = React.createRef();

    }

    static contextType = AuthContext;

    AddHandler=()=>{
       const name = this.name.current.value
       const description= this.description.current.value 
       const link = this.link.current.value 

       if(name.trim().length===0 || description.trim().length===0||link.trim().length===0){
        return;
    }
    const date = new Date().toISOString()
    const votes = 0;
    console.log("this is the date" + date)
    const requestBody={
        query:`
            mutation{
                createProduct(productInput:{
                    name: "${name}"
                    description: "${description}"
                    releaseDate:"${date}" 
                    link: "${link}"
                    votes: ${votes}

                }){
                    name
                    description
                    releaseDate
                    link
                    votes
                }
            }
        `
    }
    const token = this.context.token
    fetch('http://localhost:8000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
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
    });

        this.name=''
        this.description = ''
        this.link = ''
    }


    render(){
        return(
            <div>
                <div className="col-md-10 offset-1 addP shadow gap-up gap-down">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" role="tabpanel" aria-labelledby="home-tab">
                                <div className="row register-form">
                                    <div className="col-md-6 offset-3">
                                        <div className="col-md-12 text-center gap-up"><h4>Add a Product</h4></div>
                                        <div className="form-group">
                                            <input type="text" className="form-control gap-up" ref={this.name} placeholder="Name  *"/>
                                        </div>
                                        <div class="form-group">
                                            <input type="text" className="form-control" ref={this.description} placeholder="Description *" />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" className="form-control"ref={this.link}  placeholder="Link *"/>
                                        </div>
                                        <div className="form-group">
                                            <input onClick={this.AddHandler} type="submit" className="add shadow gap-down"  value="Add"/>
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