import { useState, useEffect, useContext, useRef } from "react";
import { jsPDF } from 'jspdf';


function FEDeckSheetPage({
    deck,
    main_list,
    pluck_list
}) {

    const [sheets, setSheets] = useState([]);

    const getDeck = async() =>{
        console.log(main_list)
        console.log(pluck_list)
        const imageList = []
        for (let card of main_list) {
            const compressedLink = card.picture_url.replace("https://playmakercards","https://compressedplaymakercards")
                .replace("png", "jpg")
            imageList.push(compressedLink)
        }
        for (let card of pluck_list) {
            const compressedLink = card.picture_url.replace("https://playmakercards","https://compressedplaymakercards")
                .replace("png", "jpg")
            imageList.push(compressedLink)
        }
        let sheet = []
        const sheetList = []
        for (let i = 0; i < imageList.length; i++) {
            if (sheet.length < 9) {
                sheet.push(imageList[i])
            } else {
                sheetList.push(sheet)
                sheet = []
                sheet.push(imageList[i])
            }
        }
        sheetList.push(sheet)
        setSheets(sheetList);
    };

    useEffect(() => {
        getDeck();
    },[deck, main_list, pluck_list]);

    const getPDF = () => {
        const doc = new jsPDF('p', 'mm', 'a4', true, true);

        sheets.forEach((sheet, index) => {
            if (index > 0) {
                doc.addPage();
            }
            sheet.forEach((image, i) => {
                const x = (i % 3) * 2.5 * 25.4 + 12.7; // 2.5 inches converted to mm plus half inch margin
                const y = Math.floor(i / 3) * 3.5 * 25.4 + 6.35; // 3.5 inches converted to mm plus half inch margin
                doc.addImage(image, 'JPEG', x, y, 2.5 * 25.4, 3.5 * 25.4, undefined, "FAST");
            });
        });
        doc.save(`${deck.name !== ""? deck.name: "deck"}.pdf`);
    }

    return (
        <>
            <button
                className="left heightNorm"
                onClick={getPDF}
                style={{marginRight: "6px", marginLeft: "0px" }}
            >PDF</button>
        </>
    );
}


export default FEDeckSheetPage;
