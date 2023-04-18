const dummy = (blogs) => {
    return 1
}

const totalLikes = (array) => {
    const reducer = (sum, item) => {
        // console.log('sum:', sum)
        // console.log('item:', item)
        // console.log('item.likes:', item.likes)
        return sum + item.likes
    }

    return array.reduce(reducer, 0)
}

const favoriteBlog = (array) => {
    const reducer = (blog, item) => {

        // console.log('blog:', blog)
        // console.log('blog[\'likes\']:', blog['likes'])
        // console.log('item', item)

        if (item.likes > blog['likes']) {
            blog['title'] = item.title
            blog['author'] = item.author
            blog['likes'] = item.likes
        }
        return blog
    }
    if (array.length === 0
        || !array[0].hasOwnProperty('title')
        || !array[0].hasOwnProperty('author')
        || !array[0].hasOwnProperty('likes')) {
        console.log('Array was empty or contained undesirable objects. Returning an empty array.')
        return {}
    }
    const initialBlog = {
        title: array[0]['title'],
        author: array[0]['author'],
        likes: array[0]['likes']
    }
    // }
    console.log('initialBlog:', initialBlog)
    // console.log('initialBlog after JSON.stringify:', JSON.stringify(initialBlog))
    const result = array.reduce(reducer, initialBlog)
    console.log('result:', result)
    return result
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}