import './Chat.css'
import onlineIcon from '../img/icons8-green-circle-48.png'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client'
import queryString from 'query-string'
import Message from '../Message/Message';
import ScrollToBottom from 'react-scroll-to-bottom'

let socket;

const Chat = () => {

    
    const Endpoint = 'https://chatappbackend-5mof.onrender.com'
    
    let location = useLocation();
    console.log(location.search)

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(Endpoint);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        });

        return () => {
            socket.disconnect();
            socket.off();
        }
    }, [Endpoint, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
            window.scrollTo(0, document.height)
        });
    }, [messages])
    
    const sendMessage = (e) => {
        e.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => {
                setMessage('')
            })
        }

       
    }

    console.log(message, messages);

    return (

        <div className='outerChatBox'>
            <div className='messageContainer'>
                <div className='topBar'>
                    <img src={onlineIcon} alt="onlineicon" />
                    <span>
                        {room}
                    </span>
                </div>
                <ScrollToBottom className='chatBox'>
                    {
                        messages.map((e, i) => {
                            return <div key={i}>
                                <Message user={e.user} text={e.text} name={name} />
                            </div>
                        })
                    }
                </ScrollToBottom>
                <div className='bottomBar'>
                    <input
                        className='messagesField'
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={event => event.key === 'Enter' ? sendMessage(event) : null}
                        placeholder="Type your message..."
                        
                    />
                    <button
                        className='btnSend'
                    onClick={e => sendMessage(e)}>
                        SEND
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat