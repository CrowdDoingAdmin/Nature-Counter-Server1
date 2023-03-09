const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var JournalSchema = new Schema (
    {

        location: {
          park: {
              type: String,
              required: true
          },
          city: {
              type: String,
              required: false
          },
  
          state: {
              type: String,
              enum: {
              values:["AK","AL","AR","AZ","CA","CO","CT","DE","FL","GA","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VA","VT","WA","WI","WV","WY"],
              message: "{VALUE} is not a state"
              },
              required: false
          },
          zipCode: {
              type: Number,
              required: false
          },
          latitude: {
              type: Number,
              required: false
          },
          longitude: {
              type: Number,
              required: false
          }
      },
  
      start_time: { type: Date, required: true },
      end_time: { type: Date, required: true },
      userId: {type: Schema.Types.ObjectId, ref: "UserDetail", required: true}
  
    }
  );

const Journal = mongoose.model('Journal', JournalSchema);
module.exports = Journal;