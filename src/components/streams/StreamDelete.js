import React, { Fragment } from 'react';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	renderActions() {
		return (
			<Fragment>
				<button
					onClick={() => this.props.deleteStream(this.props.match.params.id)}
					className="ui button primary"
				>
					DELETE
				</button>
				<Link to="/" className="ui button negative">
					CANCEL
				</Link>
			</Fragment>
		);
	}

	modalProps = {
		title: 'Delete Stream',
		content: `Are you sure you want to delete this stream titled : ${this.props.stream
			? this.props.stream.title
			: ''}?`,
		onDismiss: () => history.push('/'),
		actions: this.renderActions()
	};

	render() {
		return <Modal {...this.modalProps} />;
	}
}

const mapStateToProps = (state, ownProps) => {
	return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);
