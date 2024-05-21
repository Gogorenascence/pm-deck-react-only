import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { SimulatorActionsContext } from '../context/SimulatorActionsContext';

const SimulateButton = ({deckName, main_list, pluck_list}) => {
    const {
        setSelectedMainDeck,
        setSelectedPluckDeck,
        fillDecks
    } = useContext(SimulatorActionsContext)

    const navigate = useNavigate()

    const handleSimulator = () => {
        setSelectedMainDeck({
            name: deckName,
            cards: main_list
        });
        setSelectedPluckDeck({
            name: deckName,
            cards: pluck_list
        })
        fillDecks()
        navigate(`/simulator`)
    }

    return (
        <button
            onClick={handleSimulator}
            className="left none"
        >
            Simulate
        </button>
    );
};

export default SimulateButton;
