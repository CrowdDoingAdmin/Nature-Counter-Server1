var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var FavoriteLocSchema = new Schema (
  {
    location: { type: String, required: true, maxLength: 200 },
    userId: {type: Schema.Types.ObjectId, ref: "UserDetail", required: true},

  }
);

// Export model 
module.exports = mongoose.model("FavoriteLocSchema", FavoriteLocSchema);
