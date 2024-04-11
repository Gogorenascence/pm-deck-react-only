import SectionCard from "../display/SectionCard";

function GamePlayPage() {
    return (
        <div className="white-space">
            <h1 className="left-h1">Game Play Portal</h1>
            <h2 className="left">Select a section</h2>
            <div className="decks-page-card-list2" style={{marginTop: "30px"}}>
                <SectionCard
                    link="/cardcategories"
                    title="Card Categories"
                    imageSRC="https://i.imgur.com/8wqd1sD.png"
                />
                <SectionCard
                    link="/cardtypes"
                    title="Card Types"
                    imageSRC="https://i.imgur.com/8wqd1sD.png"
                />
                <SectionCard
                    link="/cardtags"
                    title="Card Tags"
                    imageSRC="https://i.imgur.com/8wqd1sD.png"
                />
                <SectionCard
                    link="/extraeffects"
                    title="Extra Effects"
                    imageSRC="https://i.imgur.com/8wqd1sD.png"
                />
                <SectionCard
                    link="/reactions"
                    title="Reactions"
                    imageSRC="https://i.imgur.com/8wqd1sD.png"
                />
                <SectionCard
                    link="/glossary"
                    title="Glossary and Rulings"
                    imageSRC="https://i.imgur.com/8wqd1sD.png"
                />
            </div>
        </div>
    );
}

export default GamePlayPage;
