import { useState, useEffect, useContext, useRef } from "react";
import { GameStateContext } from "../context/GameStateContext";
import { chatSound } from "../Sounds/Sounds";


function LogChatPanel() {

    const [showPanel, setShowPanel] = useState(false)
    const [newMessage, setNewMessage] = useState(false)
    const [message, setMessage] = useState("")

    const {
        player,
        log,
        addToLog,
        volume
    } = useContext(GameStateContext)

    const [logLength, setLogLength] = useState(log.length)

    const handleShowPanel = () => {
        if (!showPanel) {
            setShowPanel(true)
            setTimeout(() => {
                if (chatWindow.current) {
                    chatWindow.current.scrollTop = chatWindow.current.scrollHeight;
                    setNewMessage(false);
                }
            }, 100);
            // document.body.style.overflow = 'hidden';
        } else {
            // document.body.style.overflow = 'auto';
            setShowPanel(false)
            setNewMessage(false)
        }
    }
    const chatWindow = useRef(null)

    function useChatScroll(ref) {
        useEffect(() => {
            if (ref && ref.current) {
                const { scrollHeight, clientHeight } = ref.current;
                ref.current.scrollTop = scrollHeight - clientHeight
                // ref.current.scrollTop = ref.current.scrollHeight
            }
        },[log])
    }

    useChatScroll(chatWindow)

    useEffect(() => {
        if (log.length > logLength){
            setNewMessage(true)
            setLogLength(log.length)
        }
    },[log])

    const handleMessageChange = (event) => {
        setMessage(event.target.value)
    }

    const sendMessage = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            if (message.length > 0) {
                addToLog(player.name, "player", message)
                chatSound(volume)
                setMessage("")
            }
        }
    }

    const colors = {
        system: "green",
        player: "skyblue",
        opponent: "red"
    }

    return (
        <div className={newMessage && !showPanel? "notify": null}>
            <div className={showPanel? "chatPanel" : "chatPanelClosed"}>
                {showPanel?
                    <div className="right">
                        <div className="scrollableChat" ref={chatWindow}>
                            {log.length > 0? log.map((message) => (
                                <div className="m-l-r-5">
                                    <p style={{fontWeight: "700", color: colors[message.role], margin: "7px 0 0 0"}}>
                                        {message.user}
                                    </p>
                                    <div className="messageWrapper">
                                    <p className=" margin-bottom-0">{message.message}</p>
                                    </div>
                                </div>
                            )): null}
                        </div>
                        <textarea
                            className="chatTextBox"
                            type="text"
                            value={message}
                            placeholder="Message"
                            onChange={handleMessageChange}
                            onKeyDown={sendMessage}
                            // focus={true}
                        >
                        </textarea>
                    </div>
                :null}
                {showPanel?
                    <p className="white chat-panel-close pointer" onClick={() => handleShowPanel()}>&#129170;</p>
                :
                    <p className="white chat-panel-open pointer" onClick={() => handleShowPanel()}>&#129168;</p>
                }
            </div>
        </div>
    );
}

export default LogChatPanel;
