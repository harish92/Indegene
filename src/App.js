import React from 'react';
import {
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Button,
    Row,
    Col,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Alert
} from 'reactstrap';
import classnames from 'classnames';
import './App.css';
import ReactPaginate from 'react-paginate';

import {fetchMovie, fetchMovieDetails} from "./api";

import MovieCard from "./components/MovieCard";

import Loader from "./components/Loader";

import SearchForm from "./components/SearchForm";




class App extends React.Component {

    state = {
        activeTab: '1',
        data: null,
        currentData: null,
        totalPages: 1,
        title: 'x men',
        year: 2000,
        movieInfo: null,
        modal: false,
        loading: false,
    }

    componentDidMount() {
        this._fetchMovies(this.state.title, this.state.year)
    }


    _handleSearch = ({title, year}) => this._fetchMovies(title, year)


    _fetchMovies = (title, year) => {
        this.setState({loadng: true})
        fetchMovie(title, year).then(res => {
            console.log(res)
            if (res.Response === 'True') {
                this.setState({
                    data: res.Search, currentData: res.Search.slice(0, 10),
                    totalPages: Math.ceil(res.Search.length / 10), loading: false
                })
            } else {
                alert(res.Error)
            }
        })
    }

    //Pagination change update data
    _onPageChanged = nav => {
        const {data} = this.state;
        const {selected} = nav;
        const offset = selected * 10;
        const currentData = data ? data.slice(offset, offset + 10) : [];
        console.log(currentData)
    };

    //Fetch Complete movie details
    _fetchMovieinfo = id => {
        // alert(id)
        fetchMovieDetails(id).then(res => {
            console.log(res);
            if (res.Response === "True") {
                this.setState({movieInfo: res, modal: true})
            } else {
                alert(res.Error)
            }
        })
    }

    _toggleModal = () => this.setState({modal: !this.state.modal})


    render() {
        const {
            data,
            currentData,
            currentPage,
            totalPages,
            activeTab,
            movieInfo,
            modal,
            loading
        } = this.state;


        const totalData = data && data.length;


        const headerClass = [
            "text-dark  m-0",
            currentPage ? "border-gray border-right" : ""
        ]
            .join(" ")
            .trim();

        console.log(totalPages)

        return (
            <section className="page">
                <div className="container">
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({active: activeTab === '1'})}
                                onClick={() => this.setState({activeTab: '1'})}
                            >
                                Tab1
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({active: activeTab === '2'})}
                                onClick={() => this.setState({activeTab: '2'})}
                            >
                                Tab2
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="12">

                                    <SearchForm search={this._handleSearch}/>

                                    {loading ? <Loader/> : <div id="project-comments" className="commentList">
                                        {totalData === 0 ? <h1>No Results Found</h1> :
                                            <MovieCard data={currentData} onClick={this._fetchMovieinfo}/>}
                                    </div>}


                                    <div className="d-flex flex-row py-4 justify-content-center align-items-center">

                                        <ReactPaginate
                                            previousLabel={'previous'}
                                            nextLabel={'next'}
                                            breakLabel={'...'}
                                            breakClassName={'break-me'}
                                            pageCount={totalPages}
                                            marginPagesDisplayed={1}
                                            pageRangeDisplayed={5}
                                            onPageChange={this._onPageChanged}
                                            containerClassName={'pagination'}
                                            subContainerClassName={'pages pagination'}
                                            activeClassName={'active'}
                                        />


                                    </div>

                                    <div className="d-flex flex-row py-4 justify-content-center align-items-center">

                                        <h2 className={headerClass}>
                                            <strong className="text-secondary">{data && data.length}</strong>{" "}
                                            Movies
                                        </h2>

                                    </div>

                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col sm="12">

                                    <SearchForm search={this._handleSearch}/>

                                    {loading ? <Loader/> : <div id="project-comments" className="commentList">
                                        {totalData === 0 ? <h1>No Results Found</h1> :
                                            <MovieCard data={currentData} onClick={this._fetchMovieinfo}/>}
                                    </div>}

                                </Col>
                            </Row>


                        </TabPane>
                    </TabContent>
                </div>

                {/*    Modal */}

                <Modal isOpen={modal} toggle={this._toggleModal} style={{width: '1024px', maxWidth: '1024px'}}>
                    <ModalHeader toggle={this._toggleModal}>{movieInfo && movieInfo.Title}</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col md="4">
                                <img src={movieInfo && movieInfo.Poster} className="img-poster"
                                     alt={movieInfo && movieInfo.Poster}/>
                            </Col>
                            <Col md="4">
                                <p>imdbRating: {movieInfo && !isNaN(movieInfo.imdbRating) ? (
                                    parseInt(movieInfo.imdbRating) > 7 ? <Alert color="primary">
                                        boxoffice: hit
                                    </Alert> : <Alert color="danger">
                                        boxoffice: flop
                                    </Alert>
                                ) : <Alert color="warning">
                                    {movieInfo && movieInfo.imdbRating}
                                </Alert>}</p>


                                <p>Year: {movieInfo && movieInfo.Year}</p>
                                <p>Rated: {movieInfo && movieInfo.Rated}</p>
                                <p>Released: {movieInfo && movieInfo.Released}</p>
                                <p>Runtime: {movieInfo && movieInfo.Runtime}</p>
                                <p>Genre: {movieInfo && movieInfo.Genre}</p>
                                <p>Director: {movieInfo && movieInfo.Director}</p>
                                <p>Writer: {movieInfo && movieInfo.Writer}</p>
                                <p>Actors: {movieInfo && movieInfo.Actors}</p>
                                <p>Plot: {movieInfo && movieInfo.Plot}</p>
                                <p>Language: {movieInfo && movieInfo.Language}</p>
                                <p>Country: {movieInfo && movieInfo.Country}</p>
                                <p>Awards: {movieInfo && movieInfo.Awards}</p>


                            </Col>

                            <Col md="4">

                                <p>Awards: {movieInfo && movieInfo.Ratings.length > 0 &&
                                movieInfo.Ratings.map((item) => (
                                    <ul>
                                        <li><p>{item.Source}</p><p>{item.Value}</p></li>
                                    </ul>
                                ))
                                }</p>


                                <p>Metascore: {movieInfo && movieInfo.Metascore}</p>
                                <p>imdbRating: {movieInfo && movieInfo.imdbRating}</p>
                                <p>imdbVotes: {movieInfo && movieInfo.imdbVotes}</p>
                                <p>Type: {movieInfo && movieInfo.Type}</p>
                                <p>DVD: {movieInfo && movieInfo.DVD}</p>
                                <p>BoxOffice: {movieInfo && movieInfo.BoxOffice}</p>
                                <p>Production: {movieInfo && movieInfo.Production}</p>
                                <p>Website: {movieInfo && movieInfo.Website}</p>
                                <p>Response: {movieInfo && movieInfo.Response}</p>
                            </Col>

                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this._toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>


                {/* end Modal */}

            </section>
        );


    }

}


export default App;
