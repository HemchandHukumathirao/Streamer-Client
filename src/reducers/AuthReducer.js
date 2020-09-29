import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
	isLoggedIn: null,
	userId: null
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SIGN_IN:
			return { ...state, isLoggedIn: true, userId: action.payload };
		case SIGN_OUT:
			return { ...state, isLoggedIn: false, userId: null };
		default:
			return state;
	}
};
