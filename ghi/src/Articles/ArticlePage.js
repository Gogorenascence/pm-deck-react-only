import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Card } from "react-bootstrap";

function ArticlePage({
    articles
}) {

    const { article_id } = useParams()

    const [article, setArticle] = useState({
        title: "",
        subtitle: "",
        author: "",
        story_date: "",
        section: "",
        content: "",
        images: "",
        news: false,
        site_link: "",
    });

    const [images, setImages] = useState([])
    const [author, setAuthor] = useState({
        username: "TeamPlayMaker"
    })

    const getArticle = async() =>{
        const articleData = articles.find(article => article.id === article_id)
        setArticle(articleData);

        const processedImages = []
        for (let keyName of Object.keys(articleData.images)) {
            for (let order of Object.keys(articleData.images[keyName])) {
                const image = {
                    keyName: keyName,
                    src: articleData.images[keyName][order].src??null,
                    alt_text: articleData.images[keyName][order].alt_text??null,
                    caption: articleData.images[keyName][order].caption??null,
                    order: order,
                    link: articleData.images[keyName][order].link??null,
                }
                processedImages.push(image)
            }
        }
        setImages(processedImages)
    }

    useEffect(() => {
        window.scroll(0, 0);
        document.body.style.overflow = 'auto';
        getArticle()
    // eslint-disable-next-line
    },[article_id]);

    useEffect(() => {
        document.title = `${article.title} - PM CardBase`
        return () => {
            document.title = "PlayMaker CardBase"
        };
    // eslint-disable-next-line
    },[article]);

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


    return (
        <div className="white-space">
            <Card className="text-white text-center card-list-card3" style={{margin: "2% 0%" }}>
                <div className="card-image-wrapper">
                    <div className="card-image-clip2">
                        <Card.Img
                            src={images[0]? images[0].src : "https://i.imgur.com/8wqd1sD.png"}
                            alt={images[0]? images[0].alt_text : "article's first image"}
                            className="card-image2"
                            variant="bottom"/>
                    </div>
                </div>
                <Card.ImgOverlay className="blackfooter2 mt-auto">
                    <div className="flex">
                        <h1 className="left margin-top-10 ellipsis">{article.title}</h1>
                        {/* {account?
                            <FavoriteDeck deck={deck}/>:null
                        } */}
                    </div>
                    {/* <h6 className="left"
                        style={{margin: '0px 0px 5px 10px', fontWeight: "600"}}
                    >
                        Section: {deck.strategies.length > 0 ? deck.strategies.join(', ') : "n/a"}
                    </h6> */}
                    <div className=" flex wide100-3">
                        <img className="newsSection" src={`/${article.section}.png`} alt={article.section}/>
                    </div>
                    {/* <h6 className="left"
                        style={{margin: '0px 0px 10px 10px', fontWeight: "600"}}
                    >
                        Main Deck: {main_list.length} &nbsp; Pluck Deck: {pluck_list.length}
                    </h6> */}
                    <div className="flex">
                        <img className="logo2" src="https://i.imgur.com/nIY2qSx.png" alt="created on"/>
                        <h6
                            className="left justify-content-end"
                            style={{margin: '5px 0px 5px 5px', fontWeight: "600", textAlign: "left"}}
                        >
                            {formatDate(article.story_date)} &nbsp; &nbsp;
                        </h6>
                        { article.updated ?
                            <>
                                <img className="logo3" src="https://i.imgur.com/QLa1ciW.png" alt="updated on"/>
                                <h6
                                className="left justify-content-end"
                                    style={{margin: '5px 0px 5px 5px', fontWeight: "600", textAlign: "left"}}
                                >
                                    {formatDate(article.updated)} &nbsp; &nbsp;
                                </h6>
                            </>:null
                        }
                        <img className="logo2" src="https://i.imgur.com/eMGZ7ON.png" alt="created by"/>
                        <h6
                        className="left justify-content-end"
                            style={{margin: '5px 0px 5px 5px', fontWeight: "600", textAlign: "left"}}
                        >
                            {author.username}
                        </h6>
                    </div>
                </Card.ImgOverlay>
            </Card>
            <h1>{article.subtitle}</h1>
            <div className="newsSection2">
                {
                    processedText(article.content)?.map((line, index) => {
                        return (
                            <>
                                {line.includes("]]")?
                                    <p className={`${line.includes("@@")? "newsText4" :"newsText5"} bolder margin-bottom-0 margin-top-20`}>
                                        { line.includes("@@")? processedBigLine(processedBoldLine(line)): processedBoldLine(line)}
                                    </p>
                                :
                                    <p className="newsText2 margin-bottom-0">{line}</p>
                                }
                                <div className="newsImageContainer">
                                    {article.images[index.toString()] ?
                                        article.images[index.toString()].sort((a,b) => a.order - b.order).map(image => {
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
                <NavLink className="nav-link no-pad" to={"/articles"}>
                    <button
                        style={{ width: "100%"}}>
                        Back to News and Articles
                    </button>
                </NavLink>
            </div>
        </div>
    );
}

export default ArticlePage;
