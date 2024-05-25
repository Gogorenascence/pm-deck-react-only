import { useContext } from 'react';
import { AppContext } from '../context/AppContext';


const useMouseTracker = () => {
    const { setPosition } = useContext(AppContext)
    const handleMouseMove = (event) => {
        setPosition({
            x: event.clientX,
            y: event.clientY,
        });
    }

    return { handleMouseMove }
};

export default useMouseTracker;

// return (
//     <div
//         style={{ height: '100vh', border: '1px solid black' }}
//         onMouseMove={handleMouseMove}
//     >
//         <h1>Move the mouse around!</h1>
//         <p>The current mouse position is ({position.x}, {position.y})</p>
//     </div>
// );
