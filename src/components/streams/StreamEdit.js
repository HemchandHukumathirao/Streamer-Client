import React from 'react';
import StreamForm from './StreamForm';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import _ from 'lodash';

class StreamEdit extends React.Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	onSubmit = (updatedFormValues) => {
		this.props.editStream(this.props.match.params.id, updatedFormValues);
	};

	render() {
		if (!this.props.stream) {
			return <h1>Loading....</h1>;
		}

		return (
			<div>
				<h2>Edit a Stream</h2>
				<StreamForm
					onSubmit={this.onSubmit}
					initialValues={_.pick(this.props.stream, [ 'title', 'description' ])}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state, { match }) => {
	return { stream: state.streams[match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);
