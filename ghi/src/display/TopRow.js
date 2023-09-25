import {
    Card,
} from "react-bootstrap";
import { Link } from 'react-router-dom';

function TopRow() {
  return (
    <div className="white-space">
      <div className="cd-inner">
          <div style={{width: "15vw", margin: "0px 5px"}}>
            <Link to="/deckbuilder">
              <Card className=" text-white text-center glow3" style={{ width: '15vw', minWidth: "200px"}}>
                <Card.Img src="1g303Bone Whisper4.png" alt="Card image" variant="bottom"/>
                <Card.ImgOverlay className="blackfooter mt-auto zindex-0">
                  <Card.Title className="card-img-overlay d-flex flex-column justify-content-end">Deck Builder</Card.Title>
                </Card.ImgOverlay>
              </Card>
            </Link>
          </div>
          <div style={{width: "15vw", margin: "0px 5px"}}>
            <Link to="/decks">
              <Card className="text-white text-center glow3" style={{ width: '15vw', minWidth: "200px"}}>
                <Card.Img src="1b109Jet and Climber2.png" alt="Card image" variant="bottom"/>
                <Card.ImgOverlay className="blackfooter mt-auto">
                  <Card.Title className="card-img-overlay d-flex flex-column justify-content-end">Decks</Card.Title>
                </Card.ImgOverlay>
              </Card>
            </Link>
          </div>
          <div style={{width: "15vw", margin: "0px 5px"}}>
            <Link to="/cards">
              <Card className="text-white text-center glow3" style={{ width: '15vw', minWidth: "200px"}}>
                <Card.Img src="1r307Burst Esper2.png" alt="Card image" variant="bottom"/>
                <Card.ImgOverlay className="blackfooter mt-auto">
                  <Card.Title className="card-img-overlay d-flex flex-column justify-content-end">Cards</Card.Title>
                </Card.ImgOverlay>
              </Card>
            </Link>
          </div>
          <div style={{width: "15vw", margin: "0px 5px"}}>
            <Link to="/cardsets">
              <Card className="text-white text-center glow3" style={{ width: '15vw', minWidth: "200px"}}>
                <Card.Img src="mv2.png" alt="Card image" variant="bottom"/>
                <Card.ImgOverlay className="blackfooter mt-auto">
                  <Card.Title className="card-img-overlay d-flex flex-column justify-content-end">Card Sets</Card.Title>
                </Card.ImgOverlay>
              </Card>
            </Link>
          </div>
          <div style={{width: "15vw", margin: "0px 5px"}}>
            {/* <Link to="/gameplay"> */}
              <Card className="text-white text-center" style={{ width: '15vw', minWidth: "200px"}}>
                <Card.Img src="gcb17-2.png" alt="Card image" variant="bottom"/>
                <Card.ImgOverlay className="blackfooter mt-auto">
                  <Card.Title className="card-img-overlay d-flex flex-column justify-content-end">Game Play</Card.Title>
                </Card.ImgOverlay>
              </Card>
            {/* </Link> */}
          </div>
      </div>
    </div>
  );
}

export default TopRow;
