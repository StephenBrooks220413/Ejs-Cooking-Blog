require('../models/db');
// const { insertMany } = require('../models/Category');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');

// Get page / home page
exports.homepage = async(req, res) =>{

    try {

        const limitNumber = 5
        const categories = await Category.find({}).sort({}).limit(limitNumber);
        const latest = await Recipe.find({}).sort({}).limit(limitNumber);
        const bbq = await Recipe.find({'category': 'bbq'}).sort({}).limit(limitNumber);
        const tacos = await Recipe.find({'category': 'tacos'}).sort({}).limit(limitNumber);
        const chinese = await Recipe.find({'category': 'chinese'}).sort({}).limit(limitNumber);
        const american = await Recipe.find({'category': 'american'}).sort({}).limit(limitNumber);

        const food = {latest, bbq, tacos, chinese, american};

        res.render('index', {title: 'Recipe Blog - Home', categories, food});
    } catch (error) {
        res.status(500).send({message: error.message || "Error occured"})
    }

}

exports.exploreCategories = async(req, res) =>{

    try {

        const limitNumber = 20
        const categories = await Category.find({}).sort({_id: -1}).limit(limitNumber);

        res.render('categories', {title: 'Cooking Blog - Categories', categories});
    } catch (error) {
        res.status(500).send({message: error.message || "Error occured"})
    }

}

exports.exploreCategoriesById = async(req, res) =>{

    try {
        let categoryId = req.params.id;
        const limitNumber = 20
        const categoryById = await Recipe.find({'category': categoryId}).limit(limitNumber);
        res.render ('categories', {title: 'Cooking Blog - Categories', categoryById});
    } catch (error) {
        res.status(500).send({message: error.message || "Error occured"})
    }

}

exports.exploreRecipe = async(req, res) =>{

    try {

        let recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId)
        res.render('recipe', {title: 'Cooking Blog - Recipe', recipe});
    } catch (error) {
        res.status(500).send({message: error.message || "Error occured"});
    }

}


//Search Recipes
exports.searchRecipe = async(req, res) => {

    try {
        let searchTerm = req.body.searchTerm;
        let recipe = await Recipe.find({$text: {$search: searchTerm, $diacriticSensitive: true }});
        res.render('search', {title: 'Cooking Blog - Search', recipe});
    } catch (error) {
        res.status(500).send({message: error.message || "Error occured"});
    }

}

exports.exploreLatest = async(req, res) =>{

    try {
        const limitNumber = 10;
        const recipe = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
        res.render('explore-latest', {title: 'Cooking Blog - Explore Latest', recipe});
    } catch (error) {
        res.status(500).send({message: error.message || "Error occured"});
    }

}

exports.exploreRandom = async(req, res) =>{

    try {
        let count = await Recipe.find().sort({_id: -1}).countDocuments();
        random = Math.floor(Math.random() * count);
        let recipe = await Recipe.findOne().skip(random).exec();
        res.render('explore-random', {title: 'Cooking Blog - Random Recipe', recipe});
    } catch (error) {
        res.status(500).send({message: error.message || "Error occured"});
    }

}

exports.submitRecipe = async(req, res) =>{
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render('submit-recipe', {title: 'Cooking Blog - Submit Your Recipe Idea', infoErrorsObj, infoSubmitObj});
}

exports.submitRecipeOnPost = async(req, res) =>{
    req.flash('infoSubmit', 'Recipe has been added!!!');
    res.redirect('/submit-recipe');
}


// exports.submitRecipe = async(req, res) =>{

//     try {

//         res.render('submit-recipe', {title: 'Cooking Blog - Submit Your Recipe Idea'});
//     } catch (error) {
//         res.status(500).send({message: error.message || "Error occured"});
//     }

// }

// async function recipeData(){
//     try {
//         await Recipe.insertMany([
//             {
//                 "name": "StirFry",
//                 "description": "Olive Oil Vegetables: red bell pepper, yellow bell peppers, sugar snap peas, carrots, mushrooms, broccoli, baby corn, water chestnuts. Sauce: soy sauce, garlic cloves (minced), brown sugar, sesame oil, chicken broth, cornstarch Garnish: green onions and sesame seeds",
//                 "Source": "https://therecipecritic.com/vegetable-stir-fry/",
//                 "ingredients": [
//                     "1 cup garlic",
//                     "tblspn olive oil",
//                     "1/2 cup of thai seasoning",
//                 ],
//                 "email": "johnsnow@gmail.com",
//                 "directions": "take classes",
//                 "category": "Chinese",
//                 "image": "stir-fry.png",
//             },
//             {
//                 "name": "Bbq",
//                 "description": "Olive Oil Vegetables: red bell pepper, yellow bell peppers, sugar snap peas, carrots, mushrooms, broccoli, baby corn, water chestnuts. Sauce: soy sauce, garlic cloves (minced), brown sugar, sesame oil, chicken broth, cornstarch Garnish: green onions and sesame seeds",
//                 "Source": "https://therecipecritic.com/vegetable-stir-fry/",
//                 "ingredients": [
//                     "1 cup garlic",
//                     "tblspn olive oil",
//                     "1/2 cup of thai seasoning",
//                 ],
//                 "email": "johnsnow@gmail.com",
//                 "directions": "take classes",
//                 "category": "Chinese",
//                 "image": "stir-fry.png",
//             },
//             {
//                 "name": "Tacos",
//                 "description": "Olive Oil Vegetables: red bell pepper, yellow bell peppers, sugar snap peas, carrots, mushrooms, broccoli, baby corn, water chestnuts. Sauce: soy sauce, garlic cloves (minced), brown sugar, sesame oil, chicken broth, cornstarch Garnish: green onions and sesame seeds",
//                 "Source": "https://therecipecritic.com/vegetable-stir-fry/",
//                 "ingredients": [
//                     "1 cup garlic",
//                     "tblspn olive oil",
//                     "1/2 cup of thai seasoning",
//                 ],
//                 "email": "johnsnow@gmail.com",
//                 "directions": "take classes",
//                 "category": "Chinese",
//                 "image": "stir-fry.png",
//             },
//             {
//                 "name": "AsianFry",
//                 "description": "Olive Oil Vegetables: red bell pepper, yellow bell peppers, sugar snap peas, carrots, mushrooms, broccoli, baby corn, water chestnuts. Sauce: soy sauce, garlic cloves (minced), brown sugar, sesame oil, chicken broth, cornstarch Garnish: green onions and sesame seeds",
//                 "Source": "https://therecipecritic.com/vegetable-stir-fry/",
//                 "ingredients": [
//                     "1 cup garlic",
//                     "tblspn olive oil",
//                     "1/2 cup of thai seasoning",
//                 ],
//                 "email": "johnsnow@gmail.com",
//                 "directions": "take classes",
//                 "category": "Chinese",
//                 "image": "stir-fry.png",
//             },
//         ])
//     } catch(error){
//         console.log(error)
//     }
// }

// recipeData();