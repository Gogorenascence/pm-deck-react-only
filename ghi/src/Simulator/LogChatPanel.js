import { useState, useEffect, useContext, useRef } from "react";
import { GameStateContext } from "../context/GameStateContext";
import { MainActionsContext } from "../context/MainActionsContext";
import { damageSound, gainSound, rollSound, chatSound } from "../Sounds/Sounds";


function LogChatPanel({
    // hoveredCard
}) {

    const [showPanel, setShowPanel] = useState(false)
    const [newMessage, setNewMessage] = useState(false)
    const [message, setMessage] = useState("")

    const {
        player,
        setPlayer,
        defending,
        setDefending,
        defendingCard,
        setDefendingCard,
        log,
        addToLog,
        volume
    } = useContext(GameStateContext)

    const {discardCard} = useContext(MainActionsContext)

    const [logLength, setLogLength] = useState(log.length)

    const [damage, setDamage] = useState("")

    const [defender, setDefender] = useState("self")

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

    const diceRoll = () => {
        let roll = Math.floor(Math.random() *6) + 1
        return roll;
    }

    const handleDamage = (event) => {
        setDamage(event.target.value)
    }

    const takeDamage = (event) => {
        if (event.key === "Enter" && !event.shiftKey && /^(-)?\d+$/.test(damage)) {
            event.preventDefault();
            const damageTaken = parseInt(damage, 10);
            console.log(damageTaken)
            if (defender === "self"){
                setPlayer({...player, hp: player.hp - damageTaken})
                setDamage("")
                if (damageTaken > 0) {
                    damageSound(volume)
                    addToLog("System", "system", `${player.name} took ${damageTaken} damage`)
                } else if (damageTaken < 0) {
                    gainSound(volume*2)
                    addToLog("System", "system", `${player.name} gained ${-damageTaken} HP`)
                }
            } else if (defender === "card" && defendingCard.card.name){
                setDefendingCard({...defendingCard, hp: defendingCard.hp - damageTaken})
                setDamage("")
                if (damageTaken > 0) {
                    damageSound(volume)
                    addToLog("System", "system", `${player.name}'s defending card took ${damageTaken} damage`)
                } else if (damageTaken < 0) {
                    gainSound(volume*2)
                    addToLog("System", "system", `${player.name}'s defending card gained ${-damageTaken} HP`)
                }
                if (damageTaken >= defendingCard.hp) {
                    discardCard(player.playArea[defendingCard.slot][0], 0, defendingCard.slot)
                    addToLog(
                        "System",
                        "system",
                        `${player.name}'s defending card took ${damageTaken} damage and was defeated`
                    )
                    setDefending({...defending, [defendingCard.slot]: false})
                    setDefendingCard({
                        card: "",
                        hp: 5,
                        block: 0,
                        counter: 0,
                        endure: 0,
                        redirect: 0,
                        slot: ""
                    })
                }
            }
        }
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
