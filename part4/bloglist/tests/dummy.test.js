const listHelper = require('../utils/list_helper')
// Needs .dummy or other test function to be specified when requiring if there are multiple functions in the file.

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    // ...Unless the specific function is already called above in here.
    expect(result).toBe(1)
})