import './styles/site.sass';
import 'sugar';
import './lib';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from './routes';

ReactDOM.render(
  <Router onUpdate={() => window.scrollTo(0, 0)} routes={routes} history={browserHistory} />,
  document.getElementById('app')
);
