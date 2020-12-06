const { createWriteStream } = require('fs')
const { createAvatar } = require('@beyonk/initials-avatar')

 
async function main() {
   const output = createWriteStream('./public/images/default/defaultAvatar.jpg')
   await createAvatar({ firstName: '?', lastName: '?' }, output)
}
exports.avatarGenerator = main
