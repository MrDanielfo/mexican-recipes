const { createRecipe, getRecipes, getRecipe, searchRecipes, userRecipes, deleteUserRecipe, updateLikeRecipe } = require('../actions/recipesActions');
const { createToken, getUser, createUser, checkPassword, updateFavoriteUser } = require('../actions/signUpActions');

const resolvers = {
     Query: {
          getAllRecipes: () => {
               try {
                    return getRecipes();
               } catch (err) {
                    console.log(err)
               }
          },
          getRecipe: async (parent, { _id }, context, info) => {
               // se puede usar el mismo nombre del action y el query
               try {
                    return await getRecipe(_id);
               } catch (err) {
                    console.log(err);
               }
          },
          getUserRecipes: async (parent, { username }, context, info) => {
               try {
                    return await userRecipes(username);
               } catch (err) {
                    console.log(err)
               }
          },
          searchRecipes: async (parent, { searchTerm }, context, info) => {
               try {
                    if(searchTerm) {
                         return await searchRecipes(searchTerm);
                    } else {
                         return await getRecipes();
                    }
                    
               } catch (err) {
                    console.log(err);
               }
          },
          getCurrentUser: async (parent, { data }, context, info) => {
              try {
                   // console.log(context.email);
                   if (!context.email) {
                        return null;
                   }
                   const user = await getUser(context.username);
                   return user;

              } catch (err) {
                   console.log(err);
              } 
          }
     },
     Mutation: {
          addRecipe: async (parent, { data }, context, info) => {
               try {
                    const newRecipe = await createRecipe(data);
                    return newRecipe;
               } catch (err) {
                    console.log(err)
               }       
          },
          signupUser: async (parent, {data}, context, info) => {
               try {
                    const user = await getUser(data.username);
                    if (user) {
                         throw new Error('User already exists');
                    }
                    const newUser = createUser(data);
                    return { token: createToken(newUser, process.env.SECRET, '1hr') }
                    
               } catch (err) {
                    console.log(err)
               }
          },
          signinUser: async (parent, {data}, context, info) => {
               
                    const user = await getUser(data.username);
                    if (!user) {
                         throw new Error('Bad credentials');
                    }

                    return checkPassword(data.password, user.password).then(data => {
                         try {
                              if (!data) throw new Error('Bad Credentials');
                              return { token: createToken(user, process.env.SECRET, '1hr') }
                         } catch (err) {
                              console.log(err)
                         }
                    })
                    
          },
          deleteUserRecipe: async (parent, { _id }, context, info) => {
               try {
                    const recipe = await deleteUserRecipe(_id);
                    return recipe; 
               } catch (err) {
                    console.log(err)
               }    
          },
          likeRecipe: async (parent, { _id, username }, context, info) => {
               try {
                    // console.log(_id, username);
                    const filter = { _id };
                    // Método para incrementar $inc
                    const update = { $inc: { 'likes': 1 }}
                    const filterUser = { username }
                    const recipeLiked = await updateLikeRecipe(filter, update);
                    // leer sobre el método $addToSet que Barger emplea
                    const updateFavorite = { $push: {'favorites': recipeLiked._id } };
                    await updateFavoriteUser(filterUser, updateFavorite);
                    return recipeLiked;
               } catch (err) {
                    console.log(err);
               }
          },
          unlikeRecipe: async (parent, { _id, username }, context, info) => {
               try {
                    // console.log(_id, username);
                    const filter = { _id };
                    // Método para restar es $inc -1
                    const update = { $inc: { 'likes': -1 }}
                    const filterUser = { username }
                    const recipeLiked = await updateLikeRecipe(filter, update);
                    const updateFavorite = { $pull: {'favorites': recipeLiked._id } };
                    await updateFavoriteUser(filterUser, updateFavorite);
                    return recipeLiked;
               } catch (err) {
                    console.log(err);
               }
          }
     }
}


module.exports = resolvers;