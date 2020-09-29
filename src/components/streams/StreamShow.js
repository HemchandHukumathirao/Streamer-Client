import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';
import flv from 'flv.js';

class StreamShow extends React.Component {
	constructor(props) {
		super(props);
		this.videoRef = React.createRef();
	}

	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	componentDidUpdate() {
		if (this.player || !this.props.stream) {
			return;
		}

		this.player = flv.createPlayer({
			type: 'flv',
			url: `http://localhost:8000/live/${this.props.stream.id}.flv`
		});
		this.player.attachMediaElement(this.videoRef.current);
		this.player.load();
	}

	componentWillUnmount() {
		this.player.destroy();
	}

	render() {
		console.log(this.videoRef.current);
		console.log(flv);
		if (!this.props.stream) {
			return <div>Loading....</div>;
		}
		const { title, description } = this.props.stream;
		return (
			<div>
				<video ref={this.videoRef} width="100%" controls />
				<h1>{title}</h1>
				<h5>{description}</h5>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
