import { io } from "socket.io-client";
import { useEffect, useState, useMemo } from "react";
export default function ChatUser() {
    const socket = useMemo(() => {
        return io("http://localhost:3060");
    }, []);

    const [message, setMessage] = useState("");
    const [socketId, setSocketId] = useState("");
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        socket.on("connect", () => {
            setChatMessages((previousState) => [...previousState, { socketId, adminMsg: 'Welcome to Resotify..' }]);
            console.log("connected", socket.id);
            setSocketId(socket.id);
        });

        socket.on("admin_response", (data) => {
            setChatMessages((previousState) => [...previousState, data]);
            console.log(data, "admin response");
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleSendMessage = () => {
        if (!message) {
            alert('Must add some text before sending')
        }
        const data = { socketId, message };
        setChatMessages((previousState) => [...previousState, data]);
        console.log(data, "dataByUser");
        socket.emit("user_message", data);
        setMessage("");
    };
    return (
        <>
            <div className="container-fluid vh-100 d-flex flex-column rounded">
                <div className="flex-grow-1 overflow-auto bg-primary p-3">
                    {chatMessages.map((ele, i) => (
                        <div key={i} className={`mb-3`}>
                            {ele.adminMsg ? (
                                <p className="p-1 bg-warning rounded">{ele.adminMsg}</p>
                            ) : (
                                <p className="p-1 bg-light rounded">{ele.message}</p>
                            )}
                        </div>
                    ))}
                </div>
                <div className="bg-secondary p-3">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Type your message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={handleSendMessage}>
                            Send Message
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}