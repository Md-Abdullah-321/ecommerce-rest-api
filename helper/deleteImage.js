const fs = require('fs').promises;
const deleteImage = async (userImagePath) => {
    try {
        await fs.access(userImagePath);
        await fs.unlink(userImagePath);
        console.error('user image was deleted');
    } catch (error) {
        console.error('user image does not exist');
        throw error;
    }
}

module.exports = {deleteImage}