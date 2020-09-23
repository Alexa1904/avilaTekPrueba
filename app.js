const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const app = express();
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-Auth');

app.use(bodyParser.json());

app.use(isAuth);

app.use(bodyParser.urlencoded({ extended: true }));


app.use('/graphql', graphqlHttp({
    schema:graphQlSchema ,
    rootValue:graphQlResolvers,
    graphiql:true
}));

app.get('/', (req,res,next)=>{
    res.send('Hello World')
})

mongoose


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@avilatekprueba.vsq3l.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, {
    useUnifiedTopology: true,
    useNewUrlParser: true 
})
.then(()=>{
    app.listen(3000);
}).catch(err=>{
    console.log(err)
})

