const {User} = require('../models'); 

//sign toke function from auth 

const {signToken} = require('../utils/auth'); 

module.exports = {
    // pulls in a signle user by id or username 

async getSignleUser({user = null, params}, res){
    const foundUser = await User.findOne({
        $or: ({_id: user ? user._id : params.id}, {username: params.username}), 
    }); 

    if (!foundUser) {
        return res.status(400).json({message: 'Not able to find a user with this id.'}); 
    }
    res.json(foundUser);
},
//Authentication process 
async createUser({body}, res) {
    const user = await User.create(body);

    if(!user) {
        return res.status(400).json({message: 'Something went wrong.'}); 
    }
    const token = signToken(user); 
    res.json({token, user}); 
},    
}
