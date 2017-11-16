import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './services/registerServiceWorker';

import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');
moment.relativeTimeThreshold('s', 60);
moment.relativeTimeThreshold('ss', 0);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
