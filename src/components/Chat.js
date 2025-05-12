import React, { useState, useEffect } from "react";
import { io } from 'socket.io-client';


const socket = io('http://localhost:3001');

const Chat = () => {
    const [listmessages, setListmessages] = useState([]);
    const [messages, setMessages] = useState("");


    useEffect(() => {

        socket.on("chat message", (message) => {
            setListmessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off("chat message");
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (messages) {
            socket.emit("chat message", {
                user: socket.id,
                text: messages
            });
            setMessages("");
        }
    };

    return (
        <section id="chat">
            <ul id="messages">
                {listmessages.map((message, index) => (
                    <li key={index}>
                        {message.user}: {message.text}
                    </li>
                ))}
            </ul>
            <form id="form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="message"
                    id="input"
                    placeholder="Message"
                    autoComplete="off"
                    value={messages}
                    onChange={(e) => setMessages(e.target.value)}
                />
                <button type="submit">
                    Send
                </button>
            </form>
        </section>
    );
};

export default Chat;
