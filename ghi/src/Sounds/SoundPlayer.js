import summon from "./summon.wav"
import destroy from "./destroyed.wav"
import draw from "./draw.wav"
import shuffle from "./shuffle.wav"
import special from "./specialsummon.wav"
import gain from "./gainlp.wav"
import activate from "./activate.wav"
import equip from "./equip.wav"
import discard from "./discard.wav"
import menu from "./menu.wav"
import gameStart from "./nextturn.wav"
import flip from "./flip.wav"
import damage from "./damage.wav"
import roll from "./diceroll.mp3"
import chat from "./chatmessage.wav"
import coin from "./coinflip.wav"


const soundPlayer = {
    gainSound: function gainSound(volume) {
        const audio = new Audio(gain);
        audio.volume = volume
        audio.play()
    },
    summonSound: function summonSound(volume) {
        const audio = new Audio(summon);
        audio.volume = volume
        audio.play()
    },
    drawSound: function drawSound(volume) {
        const audio = new Audio(draw);
        audio.volume = volume
        audio.play()
    },
    shuffleSound: function shuffleSound(volume) {
        const audio = new Audio(shuffle);
        audio.volume = volume
        audio.play()
    },
    destroySound: function destroySound(volume) {
        const audio = new Audio(destroy);
        audio.volume = volume
        audio.play()
    },
    specialSound: function specialSound(volume) {
        const audio = new Audio(special);
        audio.volume = volume
        audio.play()
    },
    activateSound: function activateSound(volume) {
        const audio = new Audio(activate);
        audio.volume = volume
        audio.play()
    },
    discardSound: function discardSound(volume) {
        const audio = new Audio(discard);
        audio.volume = volume
        audio.play()
    },
    menuSound: function menuSound(volume) {
        const audio = new Audio(menu);
        audio.volume = volume
        audio.play()
    },
    startSound: function startSound(volume) {
        const audio = new Audio(gameStart);
        audio.volume = volume
        audio.play()
    },
    equipSound: function equipSound(volume) {
        const audio = new Audio(equip);
        audio.volume = volume
        audio.play()
    },
    flipSound: function flipSound(volume) {
        const audio = new Audio(flip);
        audio.volume = volume*4
        audio.play()
    },
    damageSound: function damageSound(volume) {
        const audio = new Audio(damage);
        audio.volume = volume
        audio.play()
    },
    rollSound: function rollSound(volume) {
        const audio = new Audio(roll);
        audio.volume = volume
        audio.play()
    },
    chatSound: function chatSound(volume) {
        const audio = new Audio(chat);
        audio.volume = volume
        audio.play()
    },
    coinSound: function coinSound(volume) {
        const audio = new Audio(coin);
        audio.volume = volume
        audio.play()
    },
}

export default soundPlayer
