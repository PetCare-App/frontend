import { TextField } from '@mui/material';
import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	background-color: white;
	border-radius: 50px;
`;

export const Content = styled.div`
	gap: 15px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 100%;
	background-color: white;
	max-width: 350px;
	padding: 20px;
`;

export const Header = styled.header`
	margin-top: 15vh;
	display: flex;
	align-items: center;
	flex-direction: column;
	margin-bottom: 40px;
	color: black;

	span {
		font-weight: 500;
		font-size: 20px;
		line-height: 24px;
		padding-top: 15px;
	}

	img {
		width: 12vh;
	}
`;

export const Form = styled.form`
	display: flex;
	align-items: center;
	flex-direction: column;
	row-gap: 8px;

	input {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		padding: 16px;
		width: 250px;
		height: 20px;
		border-radius: 12px;
		&:focus {
			border-color: black;
		}
		&:hover {
			/* background-color: aquamarine; */
		}
	}
`;

export const ErrorSpan = styled.span`
	color: red;
`;

export const LabelSignup = styled.label`
	padding: 8px;
	font-size: 16px;
	color: #676767;
`;

export const Strong = styled.strong`
	cursor: pointer;
	a {
		text-decoration: none;
		color: #676767;
	}
`;

export const StyledTextField = styled(TextField)`
	//background-color: #d4d4d4;
`;
