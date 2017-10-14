import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const title = "A Pokémon resources site";

ReactDOM.render(<App title={title} author="Yaoqi" />, document.getElementById('root'));
registerServiceWorker();
