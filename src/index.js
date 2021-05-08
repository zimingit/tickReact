import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect  } from 'react-router-dom';
import './index.scss';

const App = lazy(() => import('./routes/App'));
const Detailed = lazy(() => import('./routes/Detailed'));

ReactDOM.render(
  <Router basename="/tickReact">
    <Suspense fallback={<h1>Загрузка...</h1>}>
      <Switch>
        <Route exact path="/" component={App}/>
        <Route path="/:folder/:id" component={Detailed}/>
        <Redirect to="/"/>
      </Switch>
    </Suspense>
  </Router>,
  document.getElementById('root')
);
