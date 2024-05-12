import { useEffect, useState, useMemo } from "react"
import { io } from "socket.io-client";
export default function ChatAdmin() {

    const [messages, setMessages] = useState([])
    const [adminMsg, setAdminMsg] = useState("")
    const [userSocketConnectedId, seUserSocketConnectedId] = useState("")
    const [connectedUser, setConnectedUser] = useState([])

    const socketAdmin = useMemo(() => {
        return io('https://resortifybackend.onrender.com/admin')
    }, [])


    useEffect(() => {
        socketAdmin.on("connect", () => {
            console.log('socket.id', socketAdmin.id)
        })

        socketAdmin.on("new_user", (socketId) => {
            setConnectedUser((previousState) => ([
                ...previousState,
                socketId
            ]))
        })

        socketAdmin.on('adminMessage', (message) => {
            console.log('Received admin message:', message);
            // Handle the admin message as needed
        });

        socketAdmin.on('userMessage', (data) => {
            console.log(data, 'message from user')
            setMessages((previousState) => ([
                ...previousState,
                data
            ]))
        })

        socketAdmin.on('user_disconnected', (socketId) => {

            //to update the connectedUser state when one user disocnnect the socket that particular socketId of user removed
            setConnectedUser((prevUsers) => prevUsers.filter((user) => user !== socketId));

            //updating messages state variable as well when user disconnect that particular messages removed
            setMessages((prevMessages) => prevMessages.filter((msg) => msg.socketId !== socketId))
        })

        return (() => {
            socketAdmin.disconnect()
        })
    }, [])

    const handleAdminMsg = () => {
        let socketId = userSocketConnectedId
        const data = { socketId, adminMsg }
        setMessages((previousState) => ([
            ...previousState,
            data
        ]))
        socketAdmin.emit('admin_message', data)
        setAdminMsg("")
    }

    const handleClick = (userId) => {
        seUserSocketConnectedId(userId)
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3 bg-light p-3">
                        <h2>Connected Users</h2>
                        <hr />
                        {connectedUser.map((ele, i) => (
                            <button onClick={() => handleClick(ele)} key={i} className="btn btn-primary mb-2 overflow-auto">
                                {ele}
                            </button>
                        ))}
                        <hr />
                    </div>
                    <div className="col-9 p-3 vh-100 d-flex flex-column bg-primary">
                        {userSocketConnectedId && (
                            <div className="overflow-auto">
                                <h2>Chat with User: {userSocketConnectedId}</h2>
                                <ul className="list-group">
                                    {messages
                                        .filter((ele) => ele.socketId === userSocketConnectedId)
                                        .map((ele, i) => (
                                            <div key={i} className={`mb-1`}>
                                                {ele.adminMsg ? (
                                                    <p className="p-1 bg-light rounded">Admin - {ele.adminMsg}</p>
                                                ) : (
                                                    <p className="p-1 bg-warning rounded">User - {ele.message}</p>
                                                )}
                                            </div>
                                        ))}
                                </ul>
                            </div>
                        )}
                        <div className="p-3 bg-secondary mt-auto">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={adminMsg}
                                    onChange={(e) => setAdminMsg(e.target.value)}
                                />
                                <button onClick={handleAdminMsg} className="btn btn-primary">
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}