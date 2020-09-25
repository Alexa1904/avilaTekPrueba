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

    product: async ({id}) =>{

          try {
          const product = await Product.findById(id);
            return transformProduct(product);
        } catch (err) {
          throw err;
        }
      },

      productDay: async ()=>{
        const date = new Date()
        let dayProduct = new Product({
          name: '',
          description: '',
          releaseDate: null,
          link: '',
          votes: 0,
          founder: ''
      });
        const products = await Product.find();
        products.map(product =>{
            pDate = new Date(`${product._doc.releaseDate}`)
            console.log("product" + pDate.getDay() + "current" + date.getDay())
            if (pDate.getFullYear()===date.getFullYear()&&pDate.getDay()===date.getDay()&&pDate.getMonth()&&date.getMonth()){
                if(dayProduct.votes<product._doc.votes){
                  console.log("Entered")
                  console.log(dayProduct)
                  dayProduct = product
                }
            }
        })
        return transformProduct(dayProduct);
      },

      voting: async ({id}) =>{
        try{
            const products = await Product.findById(id)
            const votes = products._doc.votes + 1;
            console.log(votes)
            const product = await Product.findByIdAndUpdate({_id:id},{votes:votes},{function(err,result){
                if (err) {
                    res.send(err);
                  } else {
                    res.send(result);
                  }
            }})
            

                return Founder.findById(req.userId).
            then(founder=>{
              if (!founder){
                throw new Error('User not found.')
            }
            founder.votedProducts.push(products);
                return founder.save();
            })
            .then(result =>{
              return Product.findById(id)
          })
        }catch (err){
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
            votes: args.productInput.votes,
            founder: req.userId
        });
        let createdProduct;
        console.log(product);
        return product.save().then(result =>{
            createdProduct={...result._doc, _id:result._doc._id.toString(), founder: founder.bind(this, result._doc.founder), releaseDate:new Date(result._doc.releaseDate).toISOString()};
            return Founder.findById(req.userId)   
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