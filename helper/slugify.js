/*
 * Title: Slugify 
 * Description: Slugify any category.
 * Author: Md Abdullah
 * Date: 24/20/23
 */


const slugify = (str) => {
    return str.split(" ").join("-").toString().toLowerCase();
}

module.exports = slugify;