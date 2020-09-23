const {buildSchema} = require('graphql')


module.exports=buildSchema(`

        type Product{
            _id:ID!
            name: String!
            description: String!
            releaseDate: String!
            link: String!
            vote: Int
            founder:Founder!
        }

        type Founder{
            _id:ID!
            email:String!
            password:String!
            username:String!
            type:Int!
            address:String!
            phone:Int
            createdProducts:[Product!]
            votedProducts:[Product!]
        }

        type AuthData{
            userId: ID!
            token: String!
            tokenExpiration: Int!
        }


        input ProductInput {
            name: String!
            description: String!
            releaseDate: String!
            link: String!
            vote: Int
        }

        input FounderInput{
            email:String!
            password:String!
            username:String!
            type:Int!
            address:String!
            phone:Int
        }

        type RootQuery{
            products: [Product!]!
            founders: [Founder!]!
            login(email:String!, password:String!): AuthData!
        }

        type RootMutation{
            createProduct(productInput: ProductInput): Product
            createFounder(founderInput:FounderInput): Founder

        }

        schema{
            query: RootQuery
            mutation: RootMutation
        }
    `);