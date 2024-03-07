import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Card } from "react-bootstrap";

function HowToPage({
    howTos
}) {

    const { how_to_id } = useParams()

    const [prevHowTo, setPrevHowTo] = useState("")
    const [nextHowTo, setNextHowTo] = useState("")

    const [images, setImages] = useState([])

    const howTo = howTos.find(howToItem => howToItem.id === how_to_id)

    const getHowTo = async() =>{
        const sortedHowTos = howTos.sort((a,b) => a.how_to_number - b.how_to_number)
        const howToIndexes = sortedHowTos.map((howToItem) => howToItem.id)
        const prevHowToItem = sortedHowTos[howToIndexes.indexOf(how_to_id) - 1] ?? ""
        const nextHowToItem = sortedHowTos[howToIndexes.indexOf(how_to_id) + 1] ?? ""
        setPrevHowTo(prevHowToItem)
        setNextHowTo(nextHowToItem)

        console.log(prevHowToItem, howTo, nextHowToItem)
        const processedImages = []
        for (let keyName of Object.keys(howTo.images)) {
            for (let order of Object.keys(howTo.images[keyName])) {
                const image = {
                    keyName: keyName,
                    src: howTo.images[keyName][order].src??null,
                    alt_text: howTo.images[keyName][order].alt_text??null,
                    caption: howTo.images[keyName][order].caption??null,
                    order: order,
                    link: howTo.images[keyName][order].link??null,
                }
                processedImages.push(image)
            }
        }
        setImages(processedImages)
    };

    useEffect(() => {
        window.scroll(0, 0);
        document.body.style.overflow = 'auto';
        getHowTo();
    // eslint-disable-next-line
    },[how_to_id]);

    useEffect(() => {
        document.title = `${howTo.title} - PM CardBase`
        return () => {
            document.title = "PlayMaker CardBase"
        };
    // eslint-disable-next-line
    },[howTo]);

    const processedText = (text) => {
        return text?.split("//");
    };

    const processedBoldLine = (line) => {
        return line?.replace("]]", "");
    };

    const processedBigLine = (line) => {
        return line?.replace("@@", "");
    };

    const formatDate = (date) => {
        const month = date.slice(5,7);
        const day = date.slice(8);
        const year = date.slice(0,4);
        return `${month}-${day}-${year}`
    }

    const getLink = (link) => {
        let newLink = ""
        link.includes("https://www.jothplaymaker.com/")?
            newLink = link.replace("https://www.jothplaymaker.com", `${process.env.PUBLIC_URL}`):
            newLink = link
        return newLink
    }

    const howToColors = {
        beginner: "rgba(42, 168, 115, 0.70)",
        advanced: "rgba(192, 145, 17, 0.87)",
        expert: "rgba(124, 19, 33, 0.70)",
    }

    const howToBorders = {
        beginner: "rgb(54, 184, 129)",
        advanced: "#f0be1c",
        expert: "rgb(255, 0, 43)",
    }

    const howToSkills = {
        beginner: "https://i.imgur.com/ziEZp16.png",
        advanced: "https://i.imgur.com/SJV0t8k.png",
        expert: "https://i.imgur.com/SgtaTVa.png",
    }


    return (
        <div className="white-space">
            <Card className="text-white text-center card-list-card3" style={{margin: "2% 0%" }}>
                <div className="card-image-wrapper">
                    <div className="card-image-clip2">
                        <Card.Img
                            src={images[0]? images[0].src : "https://i.imgur.com/8wqd1sD.png"}
                            alt={images[0]? images[0].alt_text : "howTo's first image"}
                            className="card-image2"
                            variant="bottom"/>
                    </div>
                </div>
                <Card.ImgOverlay className="blackfooter2 mt-auto">
                    <div className="flex">
                        <h1 className="left margin-top-10 ellipsis">{howTo.title}</h1>
                    </div>
                    {/* <h6 className="left"
                        style={{margin: '0px 0px 5px 10px', fontWeight: "600"}}
                    >
                        Section: {deck.strategies.length > 0 ? deck.strategies.join(', ') : "n/a"}
                    </h6> */}
                    {/* <div className=" flex wide100-3">
                        <img className="newsSection" src={`/${howTo.section}.png`} alt={howTo.section}/>
                    </div> */}
                    {/* <h6 className="left"
                        style={{margin: '0px 0px 10px 10px', fontWeight: "600"}}
                    >
                        Main Deck: {main_list.length} &nbsp; Pluck Deck: {pluck_list.length}
                    </h6> */}
                    <div className="flex">
                        { howTo.updated ?
                            <>
                                <img className="logo3" src="https://i.imgur.com/QLa1ciW.png" alt="updated on"/>
                                <h6
                                className="left justify-content-end"
                                    style={{margin: '5px 0px 5px 5px', fontWeight: "600", textAlign: "left"}}
                                >
                                    {formatDate(howTo.updated)} &nbsp; &nbsp;
                                </h6>
                            </>:null
                        }
                    </div>
                </Card.ImgOverlay>
            </Card>
            {/* <h1>{howTo.subtitle}</h1> */}
            <div className="newsSection2">
                {
                    processedText(howTo.content)?.map((line, index) => {
                        return (
                            <>
                                {line.includes("]]")?
                                    <p className={`${line.includes("@@")? "newsText4" :"newsText5"} bolder margin-bottom-0 margin-top-20`} key={index}>
                                        { line.includes("@@")? processedBigLine(processedBoldLine(line)): processedBoldLine(line)}
                                    </p>
                                :
                                    <p className="newsText2 margin-bottom-0">{line}</p>
                                }
                                <div className="newsImageContainer">
                                    {howTo.images[index.toString()] ?
                                        howTo.images[index.toString()].sort((a,b) => a.order - b.order).map(image => {
                                            return (
                                                image.link?
                                                <a href={getLink(image.link)}>
                                                    <div className="margin-top-10 margin-bottom-10">
                                                        <img className="newsImage"
                                                            src={image.src}
                                                            title={image.alt_text}
                                                            alt={image.alt_text}
                                                        />
                                                        {image.caption? <p className="newsText3">{image.caption}</p>: null}
                                                    </div>
                                                </a>
                                                :
                                                <div className="margin-top-10 margin-bottom-10">
                                                    <img className="newsImage"
                                                        src={image.src}
                                                        title={image.alt_text}
                                                        alt={image.alt_text}
                                                    />
                                                    {image.caption? <p className="newsText3">{image.caption}</p>: null}
                                                </div>
                                            )}
                                        ):null
                                    }
                                </div>
                            </>
                        )
                    })
                }
                {prevHowTo && prevHowTo.game_format === howTo.game_format?
                    // <NavLink className="nav-link" to={`/rulebooks/${prevHowTo.id}`}>
                    //     <h1 className="ellipsis">Prev: {prevHowTo.title}</h1>
                    // </NavLink>:null
                    <NavLink className="nav-link no-pad" to={`/rulebooks/${prevHowTo.id}`}>
                        <div
                            className="flex-items newsItem"
                            style={{
                                backgroundColor: howToColors[prevHowTo.skill_level],
                                borderColor: howToBorders[prevHowTo.skill_level],
                                marginTop: "40px",
                                marginBottom: "-15px"
                            }}
                        >
                            <h3 className="newsText no-wrap">{prevHowTo.game_format}</h3>
                            <img className="skill_level" src={howToSkills[prevHowTo.skill_level]} alt={prevHowTo.skill_level}/>
                            <h4 className="newsText">{prevHowTo.title}</h4>
                        </div>
                    </NavLink>:null
                }
                <br/>
                {nextHowTo && nextHowTo.game_format === howTo.game_format?
                    // <NavLink className="nav-link" to={`/rulebooks/${nextHowTo.id}`}>
                    //     <h1 className="ellipsis">Next: {nextHowTo.title}</h1>
                    // </NavLink>:null
                    <NavLink className="nav-link no-pad" to={`/rulebooks/${nextHowTo.id}`}>
                        <div
                            className="flex-items newsItem"
                            style={{
                                backgroundColor: howToColors[nextHowTo.skill_level],
                                borderColor: howToBorders[nextHowTo.skill_level],
                                marginTop: "0px",
                                marginBottom: "10px"
                            }}
                        >

                            <h3 className="newsText no-wrap">{nextHowTo.game_format}</h3>
                            <img className="skill_level" src={howToSkills[nextHowTo.skill_level]} alt={nextHowTo.skill_level}/>
                            {/* <h4 className="newsText">{story.section}</h4> */}
                            <h4 className="newsText">{nextHowTo.title}</h4>
                        </div>
                    </NavLink>:null
                }
                <NavLink className="nav-link no-pad" to={"/rulebooks"}>
                    <button
                        style={{ width: "100%" }}>
                        Back to Rulebooks
                    </button>
                </NavLink>
            </div>
        </div>
    );
}

export default HowToPage;
