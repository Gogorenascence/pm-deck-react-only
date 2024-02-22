import { useState, useEffect } from "react";


function TermsPage(props) {

    const {terms} = props

    useEffect(() => {
        window.scroll(0, 0);
        console.log(terms)
        document.body.style.overflow = 'auto';
        document.title = "Glossary and Rulings - PM CardBase"
        return () => {
            document.title = "PlayMaker CardBase"
        };
    // eslint-disable-next-line
    },[]);


    return (
        <div className="white-space">
            <div className="flex-items">
                <h1 className="left-h1-2">Glossary and Rulings</h1>
            </div>

            <div className="fullTableBorder">
                {terms.sort((a,b) => a.name.localeCompare(b.name)).map(function(term, index, arr) {
                    return (
                        <div className="flex" key={term.name}>
                            <div className="table200">
                                <h5 className="text-table aligned">{term.name}</h5>
                            </div>
                            <div className="tableText flex-items between-space">
                                <h5 className="text-table-2">{term.text}</h5>
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
}

export default TermsPage;
