const mongoose = require ("mongoose");

const { Schema } = mongoose;
const subjectSchema = new Schema({
  subjectName: {
    type: String,
    required: true,
    trim: true,
  },
  subjectCode: {
    type: String,
    required: true,
  },
  subjectDescription: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  }
});

export default mongoose.model("subject", subjectSchema);