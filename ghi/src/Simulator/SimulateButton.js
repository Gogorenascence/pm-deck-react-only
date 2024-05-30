import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { SimulatorActionsContext } from '../context/SimulatorActionsContext';

const SimulateButton = ({deck}) => {
    const {
        simulateDeck
    } = useContext(SimulatorActionsContext)

    const navigate = useNavigate()

    const handleSimulator = () => {
        simulateDeck(deck)
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
