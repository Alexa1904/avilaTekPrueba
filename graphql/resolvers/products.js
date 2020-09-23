const Product = require('../../models/products');
const Founder = require('../../models/founders');
const {founder} = require('./merge');

const transformProduct = product =>{
    return{
        ...product._doc, 
        _id:product.id, 
        releaseDate:new Date(product._doc.releaseDate).toISOString(),
        founder:founder.bind(this,product.founder),
    }
};

module.exports= {

    products: async () => {
        try {
          const products = await Product.find();
          return products.map(product => {
            return transformProduct(product);
          });
        } catch (err) {
          throw err;
        }
      },

    createProduct:(args, req) =>{

        if (!req.isAuth){
            throw new Error ('Unauthenticated')
        }

        const product = new Product({
            name: args.productInput.name,
            description: args.productInput.description,
            releaseDate: new Date(args.productInput.releaseDate),
            link: args.productInput.link,
            vote: args.productInput.votes,
            founder: req.userId
        });
        let createdProduct;
        console.log(product);
        return product.save().then(result =>{
            createdProduct={...result._doc, _id:result._doc._id.toString(), founder: founder.bind(this, result._doc.founder), releaseDate:new Date(result._doc.releaseDate).toISOString()};
            return Founder.findById(re.userId)   
        })
        .then(founder=>{
            if (!founder){
                throw new Error('User not found.')
            }
            founder.createdProducts.push(product);
            return founder.save();
        })
        .then(result =>{
            return createdProduct;
        })
        .catch(err=>{
            console.log(err)
            throw err;
        });
    },
}