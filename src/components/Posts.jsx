import React, { useEffect, useState } from 'react'

const Posts = () => {
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        const data = fetch('https://jsonplaceholder.typicode.com/posts')
            .then((result) => {
                result.json().then((d) => {
                    const newArray = d.map(v => ({ ...v, hide: false }))
                    setPosts(newArray)
                })
            })
    }, [])

    const remove = (index) => {
        const tempPost = posts.filter((post) => post.id !== index)
        setPosts(tempPost)
    }

    const addHide = (id, hide = true) => {
        const tempPost = posts
        const index = tempPost?.findIndex((post) => post.id === id)
        setPosts(
            posts.map(item =>
                item.id === id
                    ? { ...item, hide }
                    : item
            ))
    }

    return (
        <div>
            <table>
                {posts?.map((post) => {
                    const isHide = post.hide
                    return (
                        <tr>
                            <td style={{
                                textAlign: 'left'
                            }}>
                                {post.hide ? "" : post.title}
                            </td>
                            <td style={{
                                paddingRight: '50px'
                            }}><a onClick={() => remove(post.id)}>Delete</a></td>
                            <td>
                                <a onClick={() => addHide(post.id, !isHide)}>{post.hide == true ? 'Show' : 'Hide'}</a>
                            </td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}

export default Posts