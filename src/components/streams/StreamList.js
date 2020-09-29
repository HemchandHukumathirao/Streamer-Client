import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams, deleteStream } from '../../actions';
import { Link } from 'react-router-dom';

class StreamList extends React.Component {
	componentDidMount() {
		this.props.fetchStreams();
	}

	renderEditDeleteButtons(stream) {
		if (stream.userId === this.props.currentUserId) {
			return (
				<div className="right floated content">
					<Link to={`/streams/edit/${stream.id}`} className="ui button primary">
						Edit
					</Link>
					<Link to={`/streams/delete/${stream.id}`} className="ui button negative">
						Delete
					</Link>
				</div>
			);
		}
	}

	renderCreateStream() {
		if (this.props.isLoggedIn) {
			return (
				<Link to="/streams/new" className="ui button primary">
					Create Stream
				</Link>
			);
		}
	}

	renderStreams() {
		return this.props.streams.map((stream) => {
			return (
				<div className="item" key={stream.id}>
					{this.renderEditDeleteButtons(stream)}
					<i className="large middle aligned icon camera" />
					<div className="content">
						<Link to={`/streams/${stream.id}`} className="header">
							{stream.title}
						</Link>
						<div className="description">{stream.description}</div>
					</div>
				</div>
			);
		});
	}

	render() {
		return (
			<div>
				<h2>Streams</h2>
				<div className="ui celled list">{this.renderStreams()}</div>
				<div style={{ textAlign: 'right' }}>{this.renderCreateStream()}</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		streams: Object.values(state.streams),
		currentUserId: state.auth.userId,
		isLoggedIn: state.auth.isLoggedIn
	};
};

export default connect(mapStateToProps, { fetchStreams, deleteStream })(StreamList);
