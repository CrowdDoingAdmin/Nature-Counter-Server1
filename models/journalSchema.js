const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var JournalSchema = new Schema(
  {
    location: {
      latitude: { type: Number },
      longitude: { type: Number },
      name: { type: String },
      city: { type: String },
      stateInitials: { type: String,
        enum: {
          values:["AK","AL","AR","AZ","CA","CO","CT","DE","FL","GA","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VA","VT","WA","WI","WV","WY"],
          message: "{VALUE} is not a state"
          } },
      zip: { type: String },
      category: {type: String}
    },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    mongoId: { type: Schema.Types.ObjectId, ref: "UserDetail" },
    firebaseId: { type: String, required: [true, 'Firebase Id required'] }
  }
);

const Journal = mongoose.model('Journal', JournalSchema);
module.exports = Journal;