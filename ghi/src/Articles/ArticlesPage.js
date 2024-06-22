import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { NewsQueryContext } from "../context/NewsQueryContext";
import { todaysFormattedDate } from "../Helpers";
import { AuthContext } from "../context/AuthContext";


function ArticlesPage({
    // articles
}) {
    const {account} = useContext(AuthContext)

    const {
        newsQuery,
        setNewsQuery,
        newsSortState,
        setNewsSortState,
        handleResetNewsQuery,
        someMoreNews,
        setSomeMoreNews,
        handleSomeMoreNews,
    } = useContext(NewsQueryContext)

    const maxDate = todaysFormattedDate();

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)

    const formatDate = (date) => {
        const month = date.slice(5,7);
        const day = date.slice(8);
        const year = date.slice(0,4);
        return `${month}-${day}-${year}`
    }

    const getArticles = async() => {
        setLoading(true)
        const articleResponse = await fetch("https://pm-deck-react-only.onrender.com/articles/")
        // const articleResponse = await fetch("http://localhost:4000/articles/")
        const articleData = await articleResponse.json()
        if (articleData) {
            const filteredArticles = account && account.roles.includes("admin")?
                articleData.sort((a,b) => {
                        let comparedArticles = new Date(b.story_date) - new Date(a.story_date)
                        if (comparedArticles === 0) {
                            comparedArticles = b.id.localeCompare(a.id)
                        }
                        return comparedArticles
                    }):
                articleData.filter(article => article.section !== "admin")
                    .sort((a,b) => {
                        let comparedArticles = new Date(b.story_date) - new Date(a.story_date)
                        if (comparedArticles === 0) {
                            comparedArticles = b.id.localeCompare(a.id)
                        }
                        return comparedArticles
                    })
            setArticles(filteredArticles)
            setLoading(false)
        }
    }


    const newsColors = {
        guide: "rgba(42, 168, 115, 0.70)",
        lore: "rgba(124, 19, 33, 0.70)",
        releases: "rgba(192, 145, 17, 0.87)",
        game: "rgba(42, 168, 115, 0.70)",
        design: "rgba(124, 19, 33, 0.70)",
        site: "rgba(77, 71, 94, 0.50)",
        social: "rgba(82, 96, 194, 0.70)",
        events: "rgba(101, 56, 131, 0.70)",
        admin: "rgba(77, 71, 94, 0.50)",
        simulator: "rgba(232, 82, 230, 0.70)"
    }

    const newsBorders = {
        guide: "rgb(54, 184, 129)",
        lore: "rgb(255, 0, 43)",
        releases: "#f0be1c",
        game: "rgb(54, 184, 129)",
        design: "rgb(255, 0, 43)",
        site: "#4D475E",
        social: "rgb(88, 129, 253)",
        events: "rgb(104, 20, 172)",
        admin: "#4D475E",
        simulator: "rgba(232, 82, 230, 0.70)"
    }

    useEffect(() => {
        window.scroll(0, 0);
        document.body.style.overflow = 'auto';
        getArticles();
        document.title = "Articles - PM CardBase"
        return () => {
            document.title = "PlayMaker CardBase"
        };
    // eslint-disable-next-line
    },[]);

    const newsSortMethods = {
        none: {method: (a,b) => new Date(b.story_date) - new Date(a.story_date)},
        newest: {method: (a,b) => new Date(b.story_date) - new Date(a.story_date)},
        oldest: {method: (a,b) => new Date(a.story_date) - new Date(b.story_date)},
    };

    const handleNewsQuery = (event) => {
        setNewsQuery({ ...newsQuery, [event.target.name]: event.target.value });
        setSomeMoreNews(20)
    };

    const handleNewsCheck = (event) => {
        setNewsQuery({...newsQuery, news: !newsQuery.news});
    };

    const handleNewsSortState = (event) => {
        setNewsSortState(event.target.value);
    };

    const completelyFilteredNews = articles.filter(article => newsQuery.section? (newsQuery.section === article.section): article)
        .filter(article => newsQuery.startingDate? (new Date(article.story_date) >= new Date(newsQuery.startingDate)):article)
        .filter(article => newsQuery.content? (article.content.toLowerCase().includes(newsQuery.content.toLowerCase())):article)
        .filter(article => newsQuery.title? (article.title.toLowerCase().includes(newsQuery.title.toLowerCase())):article)
        .filter(article => newsQuery.news? (article.news === true):article)
        .sort(newsSortMethods[newsSortState].method)

    return (
        <div className="white-space">
            <h1 className="left-h1">Article List</h1>
            {/* <h2 className="left">Search all news and articles</h2> */}
            <input
                className="left dcbsearch-x-large"
                type="text"
                placeholder=" Headline Contains..."
                name="title"
                value={newsQuery.title}
                onChange={handleNewsQuery}>
            </input>
            <br/>
            <input
                className="left dcbsearch-x-large"
                type="text"
                placeholder=" Article Contains..."
                name="content"
                value={newsQuery.content}
                onChange={handleNewsQuery}>
            </input>
            <br/>
            <div className="flex-items">
                <input
                    className="left dcbsearch-medium"
                    type="date"
                    placeholder=" Starting Date"
                    max={maxDate}
                    onChange={handleNewsQuery}
                    name="startingDate"
                    value={newsQuery.startingDate}>
                </input>
                <select
                    className="left dcbsearch-medium"
                    type="text"
                    placeholder=" Section"
                    name="section"
                    value={newsQuery.section}
                    onChange={handleNewsQuery}>
                    <option value="">Section</option>
                    <option value="guides">Guides</option>
                    <option value="lore">Lore</option>
                    <option value="releases">Releases</option>
                    <option value="game">Game</option>
                    <option value="design">Design</option>
                    <option value="site">Site</option>
                    <option value="social">Social</option>
                    <option value="events">Events</option>
                    {account && account.roles.includes("admin")?
                        <option value="admin">Admin</option>: null
                    }
                    <option value="simulator">Simulator</option>
                </select>
                <select
                    className="left dcbsearch-medium"
                    type="text"
                    placeholder=" Sorted By"
                    value={newsSortState}
                    onChange={handleNewsSortState}>
                    <option value="none">Sorted By</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                </select>
            </div>
            <div className="flex-items margin-top-10">
                <input
                    style={{margin: "2px 5px 0 7px", height:"10px"}}
                    type="checkbox"
                    onChange={handleNewsCheck}
                    name="news"
                    checked={newsQuery.news}
                    >
                </input>
                <label for="news"
                    className="bold"
                >
                    News Article
                </label>
            </div>
            <div className="flex">
                { account && account.roles.includes("admin")?
                    <NavLink to="/articlecreate">
                        <button
                            className="left red left margin-top-10">
                            Create
                        </button>
                    </NavLink>:
                null}
                <button
                    className="left margin-top-10"
                    variant="dark"
                    onClick={handleResetNewsQuery}
                    >
                    Reset Filters
                </button>
            </div>
            { loading ?
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                </div> :
                // <h4 className="left-h3">Showing Results 1 - {completelyFilteredNews.slice(0, someMoreNews).length} of {completelyFilteredNews.length}</h4>}
                <h4 className="left-h3">
                    {completelyFilteredNews.length > 0 ? `Showing Results 1 - ${completelyFilteredNews.slice(0, someMoreNews).length} of ${completelyFilteredNews.length}`:
                        "No Articles Fit Your Search Criteria"}
                </h4>}
            <br/>
            <div className="newsPage">
                {completelyFilteredNews.slice(0, someMoreNews).map((article, index) => {
                    return (
                        <>
                            {article.content||(account && account.roles.includes("admin"))?
                                <NavLink className="nav-link no-pad" to={`/articles/${article.id}`}>
                                    <div
                                        className="flex-items newsItem"
                                        style={{
                                            backgroundColor: newsColors[article.section],
                                            borderColor: newsBorders[article.section],
                                            marginTop: index === 0 ? "2px" : "10px",
                                            marginBottom: index ===  articles.length -1 ? "2px" : "10px"
                                        }}
                                    >

                                        <h3 className="newsText no-wrap">{formatDate(article.story_date)}</h3>
                                        <img className="newsSection" src={`${article.section}.png`} alt={article.section}/>
                                        {/* <h4 className="newsText">{story.section}</h4> */}
                                        <h4 className="newsText">{article.title}</h4>
                                    </div>
                                </NavLink>
                                :
                                <div
                                    className="flex-items newsItem"
                                    style={{
                                        backgroundColor: newsColors[article.section],
                                        borderColor: newsBorders[article.section],
                                        marginTop: index === 0 ? "2px" : "10px",
                                        marginBottom: index ===  articles.length -1 ? "2px" : "10px"
                                    }}
                                >

                                    <h3 className="newsText no-wrap">{formatDate(article.story_date)}</h3>
                                    <img className="newsSection" src={`${article.section}.png`} alt={article.section}/>
                                    {/* <h4 className="newsText">{story.section}</h4> */}
                                    <h4 className="newsText">{article.title}</h4>
                                </div>
                            }
                        </>
                    )
                })}
            </div>
            {someMoreNews < completelyFilteredNews.length ?
                <button
                    style={{ width: "100%", marginTop:"2%"}}
                    onClick={handleSomeMoreNews}>
                    Show More Articles ({completelyFilteredNews.length - someMoreNews} Remaining)
                </button> : null }
        </div>
    );
}

export default ArticlesPage;
