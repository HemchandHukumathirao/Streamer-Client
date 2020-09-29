import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import StreamCreate from './streams/StreamCreate';
import StreamList from './streams/StreamList';
import history from '../history';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamShow from './streams/StreamShow';

const App = () => {
	return (
		<Router history={history}>
			<div className="ui container">
				<Header />
				<Switch>
					<Route path="/" exact component={StreamList} />
					<Route path="/streams" exact component={StreamList} />
					<Route path="/streams/new" exact component={StreamCreate} />
					<Route path="/streams/edit/:id" exact component={StreamEdit} />
					<Route path="/streams/delete/:id" exact component={StreamDelete} />
					<Route path="/streams/:id" exact component={StreamShow} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
