const { model } = require("mongoose");
const { UserSchema } = require("../schemas/UserSchema.js");
const bcrypt = require("bcryptjs");

UserSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });

const UserModel = new model("user",UserSchema);

module.exports = { UserModel};