import React, {Component} from 'react'
import Header from './Header'
import './index.css'
import './SingIn'
import SingIn from './SingIn'
import SingUp from './SingUp'

class App extends Component{
    constructor(...props){
        super(...props)

        this.state={

        }
    }

    render(){
        return(
            <div>
                <Header/>
                <div className="gap-up">
                    <SingUp/>
                </div>
               
            </div>
        )
    }
}

export default App;