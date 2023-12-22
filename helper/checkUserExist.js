const User = require("../src/models/userModel");

const checkUserExist = async (email) => {
    return await User.exists({ email: email });
}

module.exports = checkUserExist;