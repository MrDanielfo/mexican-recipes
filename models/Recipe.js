const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
     name: {
          type: String,
          required: true
     },
     category: {
          type: String,
          required: true
     },
     description: {
          type: String,
          required: true
     },
     imageUrl: {
           type: String,
           required: false
     },
     instructions: {
          type: String,
          required: true
     },
     createdDate: {
          type: Date,
          default: Date.now
     },
     likes: {
          type: Number,
          default: 0
     },
     username: {
          type: String
     }
});

mongoose.Types.ObjectId.prototype.valueOf = function() {
     return this.toString();
}

RecipeSchema.index({
     '$**': 'text'
});

module.exports = mongoose.model('Recipe', RecipeSchema); 

