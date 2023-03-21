const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var JournalSchema = new Schema(
  {
    location: {
      latitude: { type: Number },
      longitude: { type: Number },
      name: { type: String },
      city: { type: String },
      stateInitials: { type: String },
      zip: { type: String }
    },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    mongoId: { type: Schema.Types.ObjectId, ref: "UserDetail" },
    firebaseId: { type: String, required: [true, 'Firebase Id required'] }
  }
);

const Journal = mongoose.model('Journal', JournalSchema);
module.exports = Journal;