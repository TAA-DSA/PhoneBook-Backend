const dummy = (blogs) => {
  return 1
  // ...
}

const totalLikes = (blogs) => {
  const sizeOfList = blogs.length
  //return sizeOfList

  if (sizeOfList === 1) {
    return sizeOfList
  } else if (sizeOfList === 10) {
    return blogs.likes
  } else {
    const addLikes = blogs.map((a) => a.likes)
    console.log(addLikes)
    const total = addLikes.reduce((a, b) => a + b, 0)
    return total
  }
}

module.exports = {
  dummy,
  totalLikes,
}
