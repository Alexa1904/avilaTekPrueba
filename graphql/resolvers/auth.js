const bcrypt = require('bcryptjs');
const Founder = require('../../models/founders');
const {products} = require('./merge');
const jwt = require('jsonwebtoken');

module.exports= {
    founders:async ()=>{
        try{
            const founders = await Founder.find();
            return founders.map(founder=>{
                return {
                    ...founder._doc, 
                    _id: founder.id, 
                    createdProducts: products.bind(this, founder._doc.createdProducts), 
                    votedProducts:products.bind(this, founder._doc.votedProducts)
                }

            })
        }catch(err){
            throw err;
        }
    },
    createFounder: (args) =>{
        return Founder.findOne({email:args.founderInput.email}).then(founder=>{
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
    },
    login: async ({email, password}) =>{
        const user = await Founder.findOne({email:email});
        if(!user){
            throw new Error('The user does not exist')
        }
        const isEqueal = await bcrypt.compare(password, user.password)
        if(!isEqueal){
            throw new Error('Password is incorrect')
        }

        const token = jwt.sign({userId: user.id, email: user.email}, 'passwordtovalidatetoken', {
            expiresIn: '1h'
        });    
        return{userId: await user.id, token: token, tokenExpiration:1}
        },

     user: async ({id})=>{
         const user = await Founder.findById(id)
         return {
            ...user._doc, 
            _id: user.id, 
            createdProducts: products.bind(this, user._doc.createdProducts), 
            votedProducts:products.bind(this, user._doc.votedProducts)
        }
     },
     
     getType: async ({id})=>{
        const user = await Founder.findById(id)
        return user._doc.type
     }
}