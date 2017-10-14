import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Pagination } from 'react-bootstrap';
import Pokedex from 'pokedex-promise-v2'
import NotFound from "../../404";

class Pokemons extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activePage: undefined,
            pokemons: [],
            loading: false
        };
    }

    async loadPokemons(page) {

        var options = {
            protocol: 'https',
        }
        var interval = {
            limit: 9,
            offset: 10 * page + 1
        }
        let pokes = [];
        const P = new Pokedex(options);

        await P.getPokemonsList(interval)
            .then(function (response) {
                pokes = response.results;

            })
            .catch(function (error) {
                pokes = [];
            });

        this.setState({ pokemons: pokes });
    }

    async handleSelect(eventKey) {
        this.setState({activePage: eventKey});
        await this.loadPokemons(this.state.activePage);
    }

    async componentDidMount() {
        this.setState({ loading: true });
        const page = this.props.match.params.page;
        this.setState({ activePage: page });
        await this.loadPokemons(page);
        this.setState({ loading: false });
        
    }

    async componentWillReceiveProps(nextProps) {
        const page = nextProps.match.params.page;
        const oldPage = this.props.match.params.page;

        if (page !== oldPage) {
            await this.loadPokemons(page);
        }
    }

    render() {

        const pokemons = this.state.pokemons;
        let body = null;
        

        if (this.state.loading) {
            body = <div>Loading...</div>;
        } else if (pokemons.length !== 0) {
            const pokemonDisplays = pokemons.map(pokemon => {
                const str = pokemon.url.split("/");
                const id = parseInt(str[str.length - 2]);
                const name = pokemon.name;
                let pictureId = id;
                if(pictureId < 10){
                    pictureId = "00" + pictureId;
                } else if (pictureId < 100){
                    pictureId = "0" + pictureId;
                }
                const picture = (
                    <img
                        className="img-responsive"
                        src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pictureId}.png`}
                        alt={`${name}`}
                    />
                );

                return (
                    <div className="col-sm-6 col-md-4" key={id}>
                        <h3>
                            <Link to={`/pokemon/${id}`}>{name}</Link>
                        </h3>
                        {picture}
                    </div>
                );
            });
            body = (
                <div>
                    <section>
                        <div className="row">
                            <div className="col-sm-8">
                                <h2>Pokémons</h2>
                                <div className="row">{pokemonDisplays}</div>
                            </div>
                        </div>
                    </section>
                    <Pagination
                        prev
                        next
                        first
                        ellipsis
                        boundaryLinks
                        items={10}
                        maxButtons={5}
                        activePage={this.state.activePage}
                        onSelect={this.handleSelect} />
                </div>

            );
        } else {
            body = <NotFound />
        }

        return <div className="single-character-page">{body}</div>;

        // return <h3>pokemons</h3>;
    }
}

export default Pokemons;

