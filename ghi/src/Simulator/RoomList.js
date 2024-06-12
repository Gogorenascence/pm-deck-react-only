import React, { useState, useEffect, useContext, useRef } from 'react';
import { GameStateContext } from '../context/GameStateContext';
import { MatchMakingContext } from '../context/MatchMakingContext';
import { AuthContext } from '../context/AuthContext';
import deckQueries from '../QueryObjects/DeckQueries';
import DamageRow from './DamageRow';
import DefendingCard from './DefendingCard';
import DiceRoller from './DiceRoller';
import soundPlayer from '../Sounds/SoundPlayer';
import turnSorter from './TurnSorter';


function RoomList({
    waiting,
    setWaiting
}){

    const gameState = useContext(GameStateContext)
    const matchMaking = useContext(MatchMakingContext)
    const {account} = useContext(AuthContext)
    const content = useRef(null)

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        matchMaking.getRooms();
        // Listen for room updates
        if (matchMaking.socket !== null) {
            matchMaking.socket.on('updateRooms', (direction) => {
                matchMaking.getRooms();
                if (direction === "enter") {
                    soundPlayer.enterSound(gameState.volume)
                }
            });
            return () => {
                matchMaking.socket.off('updateRooms');
            };
        }
    }, [account, matchMaking.socket])

    const updateRoom = async(room_id, update) => {
        const gameUrl = `http://localhost:4000/games/${room_id}`;
        const fetchConfig = {
            method: "PATCH",
            body: JSON.stringify(update),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(gameUrl, fetchConfig);
        if (response.ok) {
            matchMaking.getRooms()
            matchMaking.socket.emit("updateRoom", "none")
        } else {
            console.log(response);
        }
    }

    const createRoom = async() => {
        const data = {
            name: "Test Room",
            owner: { name: "Quinny", p_id: "64f69854879b29f8b4dd51cd" },
            seats: 4,
            players: [],
            watchers: []
        }
        const gameUrl = "http://localhost:4000/games";
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(gameUrl, fetchConfig);
        if (response.ok) {
            await matchMaking.getRooms();
            matchMaking.socket.emit("updateRoom")
            matchMaking.setRoom({
                name: "",
                owner: "",
                seats: 0,
                players: [],
                watchers: [],
            });
        } else {
            alert("Error in creating room");
        }
    }

    const enterRoom = async(g_id) => {
        const savedPlayer = matchMaking.savedPlayer
        console.log(savedPlayer)
        const roomToEnter = matchMaking.rooms.find(roomItem => roomItem.id === g_id)
        console.log(roomToEnter)
        if (savedPlayer.g_id !== null) {
            console.log("leaving a room")
            const roomToLeave = matchMaking.rooms.find(roomItem => roomItem.id === savedPlayer.g_id)
            if (roomToLeave) {
                console.log(roomToLeave)
                const newPlayers = [...roomToLeave.players]
                const playerIndex = newPlayers.indexOf(savedPlayer.p_id)
                newPlayers.splice(playerIndex, 1)
                updateRoom(roomToLeave.id, {players: newPlayers})
            }
        }
        if (roomToEnter) {
            const newPlayers = [...roomToEnter.players]
            newPlayers.push(savedPlayer.p_id)
            updateRoom(roomToEnter.id, {players: newPlayers})
            matchMaking.updatePlayer({ g_id: roomToEnter.id })
            matchMaking.socket.emit("updateRoom", "enter")
        }
    }

    const leaveRoom = async(g_id) => {
        const savedPlayer = matchMaking.savedPlayer
        console.log(savedPlayer)
        const roomToLeave = matchMaking.rooms.find(roomItem => roomItem.id === g_id)
        if (roomToLeave) {
            const newPlayers = [...roomToLeave.players]
            const playerIndex = newPlayers.indexOf(savedPlayer.p_id)
            newPlayers.splice(playerIndex, 1)
            updateRoom(roomToLeave.id, {players: newPlayers})
            matchMaking.updatePlayer({ g_id: null })
            matchMaking.socket.emit("updateRoom", "leave")
        }
    }

    const playInRoom = async(room_id) => {
        matchMaking.setSelectedRoom(room_id)
        matchMaking.getOpponents(room_id)
        matchMaking.setWaiting(false)
        matchMaking.socket.emit("gameStart", room_id)
    }

    useEffect(() => {
        if (matchMaking.socket !== null) {
            matchMaking.socket.on( "startingGame", (room_id) => {
                if (room_id === matchMaking.savedPlayer.g_id) {
                    matchMaking.getOpponents(room_id)
                    matchMaking.setWaiting(false)
                }
            })
            return () => {
                matchMaking.socket.off('startingGame');
            };
        }
    }, [matchMaking.socket])

    const handleClose = async() => {
        setWaiting(false)
        await matchMaking.getOpponents()
        document.body.style.overflow = 'auto';
    };

    return (
        <div className={waiting? null: "hidden2"}>
            <div className="small-modal-dark topbar" ref={content}>
                <div className='flex-column-full margin-bottom-10'>
                    <h2 className="aligned margin-top-0 margin-bottom-30">Game Rooms </h2>
                    <span className=' scrollable'>
                        <div className='flex-column-full'>
                            {matchMaking.rooms.length > 0?
                                matchMaking.rooms.map((roomItem, index) => {
                                    return (
                                        <div className="roomItem" key={index}>
                                            <p>Name: {roomItem.name} {index + 1} &nbsp;&nbsp;&nbsp; Owner: {roomItem.owner.name}</p>
                                            <p>{roomItem.seats - roomItem.players.length} of {roomItem.seats} Seats Left</p>
                                            {/* <p>{roomItem.watchers.length}</p> */}
                                            { roomItem.players.includes(matchMaking.savedPlayer.p_id) ?
                                            <button onClick={() => leaveRoom(roomItem.id)}>
                                                Leave
                                            </button>:
                                            <button onClick={() => enterRoom(roomItem.id)}>
                                                Join
                                            </button>
                                            }
                                            { roomItem.owner.p_id === matchMaking.savedPlayer.p_id?
                                                <button onClick={() => playInRoom(roomItem.id)}>Start Game</button>:null
                                            }
                                        </div>
                                    )
                                })
                                : null
                            }
                        </div>
                    </span>
                </div>
                <button onClick={createRoom}>Create Room</button>
                <button onClick={handleClose}>Close</button>
            </div>
        </div>
    )
}

export default RoomList;
