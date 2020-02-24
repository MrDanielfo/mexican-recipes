const { gql } = require('apollo-server');

const typeDefs = gql`
     type Recipe {
          _id: ID
          name: String!
          category: String!
          description: String!
          imageUrl: String
          instructions: String! 
          createdDate: String
          likes: Int
          username: String
     }

     type User {
          _id: ID
          username: String! 
          password: String!
          email: String!
          joinDate: String
          favorites: [Recipe]
     }

     type Token {
          token: String!
     }

     input RecipeInput {
          name: String!
          category: String!
          description: String!
          imageUrl: Upload
          instructions: String! 
          username: String
     }

     input SignUpInput {
          username: String!
          email: String!
          password: String! 
     }

     input SignInInput {
          username: String!
          password: String!
     }

     type Query {
          getAllRecipes: [Recipe]
          getRecipe(_id: ID!): Recipe
          getCurrentUser: User
          getUserRecipes(username: String!): [Recipe]
          searchRecipes(searchTerm: String): [Recipe]
     }

     type Mutation {
          addRecipe(data: RecipeInput): Recipe
          signupUser(data: SignUpInput): Token
          signinUser(data: SignInInput): Token
          deleteUserRecipe(_id: ID!): Recipe
          likeRecipe(_id: ID, username: String): Recipe
          unlikeRecipe(_id: ID, username: String): Recipe
     }
`;

module.exports = typeDefs;