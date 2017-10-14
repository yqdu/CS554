import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import Pokemons from "./Pokemon/Pokemons";
import SinglePokemon from "./Pokemon/SinglePokemon";
import Berries from "./Berries/Berries";
import SingleBerry from "./Berries/SingleBerry";
import Machines from "./Machines/Machines";
import SingleMachine from "./Machines/SingleMachine";
import NotFound from "../404";
import Home from "./Home"
class Pokedex extends Component {
    render() {
        const { match } = this.props;
        // const match = this.props.match
        const { url } = match;
        //const url = match.url
        console.log(url)
        return (
            <div className="row">
                <div className="col-sm-3">
                    <div className="list-group">
                        <Link className="list-group-item" to={`/`}>
                            Back to Home
                        </Link>
                        <Link className="list-group-item" to={`/pokemon/page/0`}>
                            Pokemon
                        </Link>
                        <Link className="list-group-item" to={`/berries/page/0`}>
                            Berries
                        </Link>
                        <Link className="list-group-item" to={`/machines/page/0`}>
                            Machines
                        </Link>
                    </div>
                </div>
                <div className="col-sm-8 col-sm-offset-1">
                    <Switch>
                        <Route exact path={`/`}  component={Home}/>
                        <Route path={`/pokemon/page/:page`} component={Pokemons} />
                        <Route path={`/pokemon/:id`} component={SinglePokemon} />
                        <Route path={`/berries/page/:page`} component={Berries} />
                        <Route path={`/berries/:id`} component={SingleBerry} />
                        <Route path={`/machines/page/:page`} component={Machines} />
                        <Route path={`/machines/:id`} component={SingleMachine} />
                        {/* <Redirect from="*" to="/" /> */}

                        
                        <Route component={NotFound} />
                        {/* <Route path={`${url}/pokemon/page/:page`} component={Pokemons} /> */}
                        {/* <Redirect from="*" to="/" /> */}
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Pokedex;
