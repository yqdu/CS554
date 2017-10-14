// import axiosInstance from "./utils/axiosInstance";
import Pokedex from 'pokedex-promise-v2'

// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import Character from "./Character";


// // const Pokedex = require('pokedex-promise-v2')
// // var options = {
// //   protocol: 'https',
// //   // hostName: 'localhost:3000',
// //   // versionPath: '/api/v2/',
// //   // cacheLimit: 100 * 1000, // 100s
// //   // timeout: 5 * 1000 // 5s
// // }
// // const P = new Pokedex(options);
// // P.getCharacteristicById(1)
// //   .then(function (response) {
// //     console.log(response);
// //   })
// //   .catch(function (error) {
// //     console.log('There was an ERROR: ', error);
// //   });




// class App extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       searchQuery: "",
//       character: undefined
//     };

//   }

//   changeSearchQuery(searchQuery) {
//     this.setState({ searchQuery });
//   }

//   async search() {
//     // console.log(1)    

//     // const characterId = 1;
//     // const response = await axiosInstance.get(`pokemon/1`);
//     // const resultList = response;
//     // this.setState({ character: resultList });
//     // console.log(2)    

//     // console.log(this.state.character) 
//     console.log(1)

//     // const Pokedex = require('pokedex-promise-v2')
//     var options = {
//       protocol: 'https',
//     }
//     let poke;
//     const P = new Pokedex(options);
//     await P.getCharacteristicById(1)
//       .then(function (response) {
//         // this.setState({ character: response });
//         console.log(2)

//         poke = response;
//       })
//       .catch(function (error) {
//         console.log('There was an ERROR: ', error);
//       });
//     console.log(3)

//     console.log(poke)
//     this.setState({ character: poke });
//     // console.log(this.state.character)
//   }

//   render() {


//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           on{" "}
//           {/* {this.state.character} */}
//         </p>
//         <form
//           onSubmit={e => {
//             e.preventDefault();
//             this.search();
//             console.log(4)
//             console.log(this.state.character)

//           }}
//         >
//           <input
//             type="text"
//             onChange={e => {
//               e.preventDefault();
//               this.changeSearchQuery(e.target.value);
//             }}
//             value={this.state.searchQuery}
//           />
//           <button type="submit">Search!</button>
//           <Character character={this.state.character} />

//         </form>
//       </div>
//     );

//   }
// }

// export default App;


import React, { Component } from 'react';
import NotFound from "../../404";

class SinglePokemon extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pokemon: undefined,
            loading: false
        };

    }

    async componentDidMount() {
        try {
            this.setState({ loading: true });
            const pokemonId = this.props.match.params.id;
            await this.search(pokemonId);
            this.setState({ loading: false });
        } catch (e) {
            this.setState({
                pokemon: undefined,
                loading: false
            });
        }

    }

    async search(pokemonId) {
        console.log(1)
        var options = {
            protocol: 'https',
        }
        let poke = undefined;
        const P = new Pokedex(options);
        console.log(this.props.match.params.id)
        await P.getPokemonByName(pokemonId)
            .then(function (response) {
                poke = response;
                console.log(response)
            })
            .catch(function (error) {
                poke = undefined;
            });
        console.log(2)
        this.setState({ pokemon: poke });
        // console.log(this.state.character)
    }

    async componentWillReceiveProps(nextProps) {
        const pokemonId = nextProps.match.params.id;
        const oldPokemonId = this.props.match.params.id;

        if (pokemonId !== oldPokemonId) {
            await this.search(pokemonId);
        }
    }

    render() {
        let body = null;
        if (this.state.loading) {
            body = <div>Loading...</div>;
        } else if (this.state.pokemon) {
            const pokemon = this.state.pokemon;
            let picture = pokemon.id;
            if(picture < 10){
                picture = "00" + picture;
            } else if (picture < 100){
                picture = "0" + picture;
            }
            body = (
                <div className="row">
                    <div className="col-sm-8">
                        <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${picture}.png`} alt={`${pokemon.name}`}></img>
                        <table className="table table-striped">
                            <caption>Basic deatils of this Pokémon</caption>
                            <thead>
                                <tr>
                                    <th>item</th>
                                    <th>content</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>The identifier for this Pokémon resource</td>
                                    <td>{pokemon.id}</td>
                                </tr>
                                <tr>
                                    <td>The name for this Pokémon resource</td>
                                    <td>{pokemon.name}</td>
                                </tr>
                                <tr>
                                    <td>The base experience gained for defeating this Pokémon</td>
                                    <td>{pokemon.base_experience}</td>
                                </tr>
                                <tr>
                                    <td>Order for sorting</td>
                                    <td>{pokemon.order}</td>
                                </tr>
                                <tr>
                                    <td>The height of this Pokémon</td>
                                    <td>{pokemon.height}</td>
                                </tr>
                                <tr>
                                    <td>The weight of this Pokémon</td>
                                    <td>{pokemon.weight}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            );
        } else {
            body = <NotFound />
        }
        return <div className="single-pokemon-page">{body}</div>;
    }
}

export default SinglePokemon;




