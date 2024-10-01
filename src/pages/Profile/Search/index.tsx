import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { IUser } from "../../../lib/types"
import { handleSearch } from "../../../lib/api"
import { BASE_URL, DEFAULT_PIC } from "../../../lib/constant"

export const Search = () => {
    const [users, setUsers] = useState<IUser[]>([])
    const [text, setText] = useState<string>("")

    useEffect(() => {
        if (!text.trim()) {
            setUsers([])
        } else {
            handleSearch(text).then(response => {
                setUsers(response.payload as IUser[])
            })
        }
    }, [text])

    return (
        <div style={{ padding: 5 }}>
            <h3>Search</h3>
            <input
                placeholder="Search for friends ..."
                className="form-control"
                value={text}
                onChange={e => setText(e.target.value)}
            />
            
            {users.length > 0 && <small>{users.length} users found!</small>}
            <div className="list">
                {users.map(user => (
                    <div key={user.id} style={{ marginBottom: '10px' }}>
                        <Link to={`/profile/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <img
                                src={user.picture ? BASE_URL + user.picture : DEFAULT_PIC}
                                alt={`${user.name} ${user.surname}`} // Add alt for accessibility
                                style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
                            />
                            <p style={{ display: 'inline-block' }}>
                                {user.name} {user.surname}
                            </p>
                        </Link>
                        <p style={{ margin: '5px 0', color: user.isPrivate ? 'red' : 'green' }}>
                            Status: {user.isPrivate ? 'Private' : 'Public'}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
