var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var JournalSchema = new Schema (
  {
    location: { type: String,required: true, maxLength: 200 },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    userId: {type: Schema.Types.ObjectId, ref: "UserDetail", required: true}

  }
);

// Export model 
module.exports = mongoose.model("JournalSchema", JournalSchema);