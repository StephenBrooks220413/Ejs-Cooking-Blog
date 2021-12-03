const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This is required.'
    },
    description: {
        type: String,
        required: 'This is required.'
    },
    email: {
        type: String,
        required: 'This is required.'
    },
    ingredients: {
        type: Array,
        required: 'This is required.'
    },
    category: {
        type: String,
        enum: ['Thai', 'Chinese', 'Bbq', 'Seafood', 'American', 'Indian', 'Mexican'],
        required: 'This is required.'
    },
    directions: {
        type: String,
        required: 'This is required'
    },
    image: {
        type: String
    }
});

// recipeSchema.index({name: 'text', description: 'text'});

recipeSchema.index({"$**": "text"});

module.exports = mongoose.model('Recipe', recipeSchema)