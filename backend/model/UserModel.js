const { model } = require("mongoose");
const { UserSchema } = require("../schemas/UserSchema.js");
const bcrypt = require("bcryptjs");

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 12);
});

const UserModel = new model("user",UserSchema);

module.exports = { UserModel};
