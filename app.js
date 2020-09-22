const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Product = require('./models/products');
const {buildSchema} = require('graphql')
const graphqlHttp = require('express-graphql').graphqlHTTP;

const app = express();
app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
    schema: buildSchema(`

        type RootQuery{
            products: [String!]!
        }

        type RootMutation{
            createProduct(name: String): String
        }

        schema{
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue:{
        products:()=>{
           return['product1','product2','product3']; 
        },
        createProduct:(args)=>{
            const productName = args.name;
            return productName;
        }
    },
    graphiql:true
}));

app.get('/', (req,res,next)=>{
    res.send('Hello World')
})


mongoose.connect(`mongodb+srv://ReichelLarez:${process.env.MONGO_PASSWORD}@avilatekprueba.vsq3l.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
.then(()=>{
    app.listen(3000);
}).catch(err=>{
    console.log(err)
})

