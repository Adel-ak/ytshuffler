import styled from 'styled-components';

import {Pill} from '../Buttons/';
import main from '../../style/main';

export const Wrapper = styled.div`
	display: flex;
	color: ${main.colors.color3};
	margin-bottom: 10px;
	font-size: .75em;
	transition: all 0.3s ease-out;

	@media (min-width: 576px) {
		font-size: .85em;
	}

	@media (min-width: 768px) {
		font-size: 1em;
	}

	:hover p {
		opacity: 0.85;
	}

	:hover button {
		opacity: 1;
		transform: scale(1);
	}
`;

export const InfoWrapper = styled.div`
	margin-left: 14px;
`;

export const ButtonsWrapper = styled.div`
	align-self: center;
	margin-left: auto;
`;

export const Img = styled.img`
	width: 70px;
	height: 70px;
`;

export const Info = styled.p`
	margin-bottom: 0;
	font-size: 1.2em;
	font-weight: bold;
`;

export const Artist = styled(Info)`
	font-weight: 500;
`;

export const Duration = styled(Info)`
	font-weight: 500;
	align-self: center;
	margin: 0 14px;
	visibility: hidden;
	position: absolute;

	@media (min-width: 576px) {
		visibility: visible;
		position: static;
	}
`;

export const SongButton = styled(Pill)`
	margin-right: 5px;
	transform: scale(0);
	opacity: 0;
	transition: all 0.3s ease-out;
`;