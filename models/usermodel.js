const { Timestamp } = require("bson");
const mongoose = require("mongoose");

const userschema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      unique: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "phone no. is required"],
    },
    usertype: {
      type: String,
      required: [true, "user type is required"],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://www.google.com/imgres?q=user%20img&imgurl=https%3A%2F%2Fwww.citypng.com%2Fpublic%2Fuploads%2Fpreview%2Fhd-man-user-illustration-icon-transparent-png-701751694974843ybexneueic.png%3Fv%3D2026050810&imgrefurl=https%3A%2F%2Fwww.citypng.com%2Fsearch%3Fq%3Duser%2Bicon&docid=CewRESp_Btw1XM&tbnid=x2Wcu-bnVSzpFM&vet=12ahUKEwiin7i4s8eUAxVBSWwGHeeADIUQnPAOegQIHxAB..i&w=800&h=800&hcb=2&ved=2ahUKEwiin7i4s8eUAxVBSWwGHeeADIUQnPAOegQIHxAB",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("user", userschema);
