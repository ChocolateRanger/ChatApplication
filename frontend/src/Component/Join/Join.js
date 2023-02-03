import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Join.css'

const Join = () => {

    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    return (
        <div className='container'>
            <div className='joinOuterContainer'>
                <h2> JOIN ROOM </h2>
                <div>
                    <p>Enter Name</p>
                    <input className='inputField' type="text" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <p>Enter Room</p>
                    <input className='inputField' type="text" value={room} onChange={e => setRoom(e.target.value)} />
                </div>
                <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className='btn-submit'>
                        SUBMIT
                    </button>
                    
                </Link>
            </div>
        </div>
    )
}

export default Join