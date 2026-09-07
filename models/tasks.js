const { Timestamp } = require("bson");
const mongoose = require("mongoose");

const taskschema = new mongoose.Schema(
  {
    //  user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "userschema", // Name of your User model
    //   required: [true, "User is required"],
    // },
    user:{
      type:String,
      ref:"userschema"
    },
    tasktitle:{
        type: String,
        required:[true,"tasktitle is required"],
    },
    taskdescription:{
        type: String,
    },
    iscompleted:{
        type: Boolean,
        default:false,
    }
  },
  { timestamps: true },
);

module.exports = mongoose.model("task", taskschema);
