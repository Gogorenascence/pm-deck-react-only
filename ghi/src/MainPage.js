import TopRow from "./display/TopRow";
import DeckRow from "./display/DeckRow";
import CardRow from "./display/CardRow";


function MainPage(props) {

  const { cards } = props

    return (
      <div>
        <br/>
          <h1 className="media-title">Welcome to PlayMaker CardBase</h1>
          <h2 className="media-title">The PlayMaker Card Database and Deck Sharing Site</h2>
        <br/>
        <div>
          <TopRow/>
        </div>
        <br/>
          <h1 className="margin-top-20">Latest Decks</h1>
        <br/>
        <div>
          <DeckRow/>
        </div>
        <br/>
          <h1 className="margin-top-20 media-margin-bottom-none">Latest Cards</h1>
        <br/>
        <div>
          <CardRow cards={cards}/>
        </div>
      </div>
    );
  }

  export default MainPage;
