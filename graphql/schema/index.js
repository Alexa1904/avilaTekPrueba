const { buildSchema } = require("graphql");

module.exports = buildSchema(`

        type Product{
            _id:ID!
            name: String!
            description: String!
            releaseDate: String!
            link: String!
            votes: Int
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
            votes: Int
        }

        input FounderInput{
            email:String!
            password:String!
            username:String!
            type:Int!
            address:String!
            phone:String!
        }

        type RootQuery{
            products: [Product!]!
            product(id:String!): Product!
            user(id:String!): Founder!
            founders: [Founder!]!
            getType(id:String!):Int
            login(email:String!, password:String!): AuthData!
            productDay:Product!
        }

        type RootMutation{
            createProduct(productInput: ProductInput): Product
            createFounder(founderInput:FounderInput): Founder
            voting(id:String!):Product
        }

        schema{
            query: RootQuery
            mutation: RootMutation
        }
    `);
