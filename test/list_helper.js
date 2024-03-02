const dummy = (blogs) => {
  return 1
  // ...
}

const totalLikes = (blogs) => {
  const sizeOfList = blogs.length
  //return sizeOfList

  if (sizeOfList === 0) {
    return sizeOfList
  } else if (sizeOfList === 1) {
    return blogs[0].likes
  } else {
    const addLikes = blogs.map((a) => a.likes)
    console.log(addLikes)
    const total = addLikes.reduce((a, b) => a + b, 0)
    return total
  }
}

const favoriteBlog = (blogs) => {
  const mostLikesObj = Math.max(...blogs.map((blog) => blog.likes))
  const favorite = blogs.find((blog) => blog.likes === mostLikesObj)

  if (favorite) {
    return {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes,
    }
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
