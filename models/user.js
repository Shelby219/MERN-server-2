const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    email: {
        type: String,
        unique: true,
        require: true
  },
    password: {
        type: String,
        require: true  
    },
    name: {
        type: String,
    },
    profile: {
        type: String,
    },
    preferences:{
        type: Schema.Types.ObjectId, 
        ref: "Preferences" 
    },
    // dietPreferences: {
    //     vegetarian: {type: Boolean,default: false},
    //     glutenFree: {type: Boolean,default: false},
    //     ketogenic: {type: Boolean,default: false},
    //     vegan: {type: Boolean,default: false},
    //     pescetarian: {type: Boolean,default: false},
    //     paleo: {type: Boolean,default: false},
    // },
    // healthPreferences: {
    //     dairy: {type: Boolean,default: false},
    //     egg: {type: Boolean,default: false},
    //     gluten: {type: Boolean,default: false},
    //     grain: {type: Boolean,default: false},
    //     peanut: {type: Boolean,default: false},
    //     seafood: {type: Boolean,default: false},
    //     sesame: {type: Boolean,default: false},
    //     shellfish: {type: Boolean,default: false},
    //     soy: {type: Boolean,default: false},
    //     sulphite: {type: Boolean,default: false},
    //     treeNut: {type: Boolean,default: false},
    //     wheat: {type: Boolean,default: false}
    // },
    fridgeIngredients: {
        type:  Array,
        default: []
    },
    pantryIngredients: {
        type:  Array,
        default: ["water", "salt", "olive oil", "black pepper"]
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
        default: Date.now
    }
});

User.plugin(require('mongoose-bcrypt'));
module.exports = mongoose.model('User', User);

