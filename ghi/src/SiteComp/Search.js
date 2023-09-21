// import {
//     Container,
//     InputGroup,
//     FormControl,
//     Button,
//     Row,
//     Card,
// } from "react-bootstrap";
// import { useState } from "react";
// import AlbumModal from "./AlbumModal";

export default function SearchBar() {
//     const [searchInput, setSearchInput] = useState("");
//     const [albums, setAlbums] = useState([]);

//   async function search() {
//     await fetch(
//       `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/artists/${searchInput}`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         let albums_with_dupes = data.items;
//         const seen = new Set();
//         const uniqueAlbums = albums_with_dupes.filter((album) => {
//           const duplicate = seen.has(album.name);
//           seen.add(album.name);
//           return !duplicate;
//         });
//         setAlbums(uniqueAlbums);
//       });
//   }
//   function Display() {
//     document.getElementById("dark-logo").style.display = "none";
//     document.getElementById("light-logo").style.display = "none";
//   }

    return (
        <div className="App" style={{ marginTop: "30px" }}>
            {/* <Container>
                <InputGroup className="mb-3" size="lg">
                    <FormControl
                        placeholder="Search For Artist"
                        type="input"
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                search();
                                Display();
                            }
                        }}
                        onChange={(event) => setSearchInput(event.target.value)}
                    />
                    <Button
                        className="search-button"
                        onClick={() => {
                            search();
                            Display();
                        }}>
                        Search
                    </Button>
                </InputGroup>
            </Container>
            <Container>
                <Row className="mx-2 row row-cols-4">
                    {albums.map((album, i) => {
                        return (
                            <Card
                                className="search-card"
                                key={album.id}
                                variant="primary">
                                <AlbumModal
                                    artist_id={album.artists[0]["id"]}
                                    album_id={album.id}
                                    img_url={album.images[0].url}
                                    album_name={album.name}
                                />
                            </Card>
                        );
                    })}
                </Row>
            </Container> */}
        </div>
    );
}
