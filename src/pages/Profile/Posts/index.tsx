// import { useEffect, useRef, useState } from "react"
// import { handleGetPosts, handlePostCreation } from "../../../lib/api"
// import { IPost } from "../../../lib/types"
// import { Gallery } from "../../../components/Gallery"

// export const Posts = () => {

//     const [text, setText] = useState<string>('')
//     const [list, setList] = useState<IPost[]>([])
//     const photo = useRef<HTMLInputElement | null>(null)

//     const handleUpload = () => {
//         if (photo.current) {
//             const file = photo.current.files?.[0]
//             if (file) {
//                 const form = new FormData()
//                 form.append('photo', file)
//                 form.append('content', text)
//                 handlePostCreation(form)
//                     .then(response => {
//                         console.log(response)
//                         setList([...list, response.payload as IPost])
//                     })

//             }
//         }
//     }

//     useEffect(() => {
//         handleGetPosts()
//             .then(response => {
//                 console.log(response.payload)
//                 setList(response.payload as IPost[])
//             })
//     }, [])


//     return <>
//         <h3>Posts</h3>

//         <input
//             type="file"
//             style={{ display: 'none' }}
//             ref={photo}
//             onChange={handleUpload}
//         />

//         <input
//             className="form-control"
//             placeholder="What's on your mind ?"
//             value={text}
//             onChange={e => setText(e.target.value)}
//         />
//         <button onClick={() => photo.current?.click()} className="btn btn-s btn-info my-2">Upload</button>
//         <Gallery posts={list} />
//     </>
// }

import { useEffect, useRef, useState } from "react"
import { handleGetPosts, handlePostCreation } from "../../../lib/api"
import { IPost } from "../../../lib/types"
import { Gallery } from "../../../components/Gallery"

export const Posts = () => {
    const [text, setText] = useState<string>("")
    const [list, setList] = useState<IPost[]>([])
    const photo = useRef<HTMLInputElement | null>(null)

    const handleUpload = () => {
        if (photo.current) {
            const file = photo.current.files?.[0]
            if (file) {
                const form = new FormData()
                form.append("photo", file)
                form.append("content", text)

                handlePostCreation(form).then(response => {
                    if (response.status === "ok") {
                        console.log("Post created:", response.payload)
                        setList(prevList => [...prevList, response.payload as IPost])
                        setText("")
                    }
                })
            }
        }
    }

    useEffect(() => {
        handleGetPosts().then(response => {
            if (response.status === "ok") {
                console.log("Posts fetched:", response.payload)
                setList(response.payload as IPost[])
            }
        })
    }, [])

    return (
        <>
            <h3>Posts</h3>

            <input
                type="file"
                style={{ display: "none" }}
                ref={photo}
                onChange={handleUpload}
            />

            <input
                className="form-control"
                placeholder="What's on your mind?"
                value={text}
                onChange={e => setText(e.target.value)}
            />

            <button
                onClick={() => photo.current?.click()}
                className="btn btn-info my-2"
            >
                Upload
            </button>

            <Gallery posts={list} />
        </>
    )
}
