const mongoose = require("mongoose");

const noticeSchema = mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  }
});

const Notice = mongoose.model("notice", noticeSchema);

module.exports = Notice;