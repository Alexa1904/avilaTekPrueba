const bcrypt = require('bcryptjs');
const Product = require('../../models/products');
const Founder = require('../../models/founders');

const products = productIds =>{
    return Product.find({_id: {$in:productIds}}).then(products=>{
        return products.map(product=>{
            return{...product._doc, 
                _id:product.id, 
                releaseDate: new Date(product._doc.date).toISOString(),
                founder:founder.bind(this,product.founder),

            }
        })
    }).catch(err=>{
        throw err;
    })
}

const founder = founderId=>{
    return Founder.findById(founderId).then(founder=>{
        return {...founder._doc, _id: founder.id, createdProducts: products.bind(this, user._doc.createdProducts)}
    }).catch(err=>{
        throw err;
    })
}


module.exports= {
    products:()=>{
       Product.find()
        .then(products=>{
           return products.map(product=>{
               return{
                ...product._doc,
                _id:product.id,
                founder:founder.bind(this,product._doc.founder)
            };
           });
        }).catch(err=>{
           throw err;
        })
    },
    founder:()=>{
        Founder.find().then(founders=>{
            return founders.map(founder=>{
                return{...founder._doc, password:null}
            })
        })
    },
    createProduct:(args)=>{
        const product = new Product({
            name: args.productInput.name,
            description: args.productInput.description,
            releaseDate: new Date(args.productInput.releaseDate),
            link: args.productInput.link,
            vote: args.productInput.votes,
            founder: '5f6978e957522b162b7a6f47'
        });
        let createdProduct;
        console.log(product);
        return product.save().then(result =>{
            createdProduct={...result._doc, _id:result._doc._id.toString(), founder: founder.bind(this, result._doc.founder)};
            return Founder.findById('5f6978e957522b162b7a6f47')   
        })
        .then(founder=>{
            if (!founder){
                throw new Error('User not found.')
            }
            founder.createdProducts.push(product);
            return user.save();
        })
        .then(result =>{
            return createdProduct;
        })
        .catch(err=>{
            console.log(err)
            throw err;
        });
    },
    createFounder: (args) =>{
        return Founder.findOne({email:args.founderInput.email}).then(user=>{
            if (founder){
                throw new Error('User exists already.')
            }
            return bcrypt.hash(args.founderInput.password,12)
        })
        .then(hashedPassword =>{
            const founder = new Founder({
                email:args.founderInput.email,
                password:hashedPassword,
                username:args.founderInput.username,
                type:args.founderInput.type,
                address:args.founderInput.address,
                phone:args.founderInput.phone,
            });
            return founder.save().then(result =>{
                console.log(result);
                return {...result._doc, _id:result.id};
            }).catch(err=>{
                console.log(err)
                throw err;
            })
        }).catch(err=>{
            throw err;
        });
    }
}