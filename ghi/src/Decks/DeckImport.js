// import React, { useState } from 'react';

// function DeckImport() {
//   const [importedDecks, setImportedDecks] = useState([]);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         try {
//           const importedDeck = JSON.parse(e.target.result);
//           setImportedDecks([...importedDecks, importedDeck]);
//         } catch (error) {
//           console.error('Error parsing imported deck JSON:', error);
//         }
//       };
//       reader.readAsText(file);
//     }
//   };

//   const importDeck = (deck) => {
//     // Handle the imported deck data and update your application's state as needed.
//     // You can access the imported deck's data in the `deck` variable.
//     // Example: props.updateDeck(deck);
//   };

//   return (
//     <div>
//         <p>{importDecks[0].name}</p>
//       <input
//         type="file"
//         accept=".json"
//         onChange={handleFileChange}
//         style={{ display: 'none' }}
//         ref={(input) => (fileInput = input)}
//       />
//       <button
//         className="left heightNorm"
//         variant="dark"
//         style={{ marginRight: '10px', marginLeft: '6px' }}
//         onClick={() => fileInput.click()}
//       >
//         Import Deck
//       </button>
//       {importedDecks.map((deck, index) => (
//         <div key={index}>
//           <button
//             onClick={() => importDeck(deck)}
//             style={{ margin: '5px' }}
//           >
//             Import Deck {index + 1}
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default DeckImport;
