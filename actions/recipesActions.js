const Recipe = require('../models/Recipe');

const getRecipes = async () => {
     try {
          return await Recipe.find().sort({createdDate: 'desc' });
     } catch (err) {
          console.log(err)
     }
}

const userRecipes = async (username) => {
     try {
          return await Recipe.find({ username }).sort({createdDate: 'desc'});
     } catch (err) {
          console.log(err);
     }
}

const createRecipe = async (recipe) => {
     try {
          const RecipeCreated = await Recipe.create(recipe);
          return RecipeCreated;
     } catch (err) {
          console.log(err);
     }
}

const searchRecipes = async (name) => {
     try {
          // Ya acepta otro tipo de parámetros
          const recipes = await Recipe.find({ $text: { $search: name } }, { score: { $meta: "textScore" } }).sort({ score: { $meta: "textScore" } });
          if(recipes.length >= 1) {
               return recipes;
          } else {
               return {
                    message: `No matches found with the word ${name}`
               }
          }
          
     } catch (err) {
          console.log(err);
     }
}

const getRecipe = async (_id) => {
     try {
          return await Recipe.findOne({ _id });
     } catch (err) {
          console.log(err)
     }
}

const deleteUserRecipe = async (_id) => {
     try {
          return await Recipe.findOneAndRemove({ _id });
     } catch (err) {
          console.log(err);
     }
}

const updateLikeRecipe = async (filter, update) => {
     try {
          const recipeLiked = await Recipe.findOneAndUpdate(filter, update, { new: true });
          return recipeLiked;
     } catch (err) {
          console.log(err);
     }
}

module.exports = {
     createRecipe,
     getRecipes,
     userRecipes,
     getRecipe,
     searchRecipes,
     deleteUserRecipe,
     updateLikeRecipe
}
