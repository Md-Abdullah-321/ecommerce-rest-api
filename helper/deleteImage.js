const fs = require('fs').promises;
const deleteImage = async (userImagePath) => {
    try {
        await fs.access(userImagePath);
        await fs.unlink(userImagePath);
        console.error('Image was deleted');
    } catch (error) {
        console.error('Image does not exist');
        throw error;
    }
}

module.exports = {deleteImage}