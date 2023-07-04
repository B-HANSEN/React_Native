import { useState } from 'react';
import { TextInput, View, StyleSheet, Alert } from 'react-native';

import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import Colors from '../constants/colors';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';

function StartGameScreen({ onPickNumber }) {
	const [enteredNumber, setEnteredNumber] = useState('');

	function numberInputHandler(enteredText) {
		setEnteredNumber(enteredText);
	}

	function resetInputHandler() {
		setEnteredNumber('');
	}

	function confirmInputHandler() {
		const chosenNumber = parseInt(enteredNumber); // convert string to number

		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
			Alert.alert(
				'Invalid number!', // title
				'Number has to be a number between 1 and 99.', // message
				[{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }] // configure buttons
			);
			return;
		}

		onPickNumber(chosenNumber);
	}

	return (
		<View style={styles.rootContainer}>
			<Title>Guess My Number</Title>
			<Card>
				<InstructionText>Enter a Number</InstructionText>
				<TextInput
					style={styles.numberInput}
					maxLength={2} // max 99, only 1 or 2-digit numbers
					keyboardType='number-pad' // show keyboard with numbers only
					autoCapitalize='none'
					// autoCorrect={false}
					onChangeText={numberInputHandler}
					value={enteredNumber}
				/>
				<View style={styles.buttonsContainer}>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
					</View>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
					</View>
				</View>
			</Card>
		</View>
	);
}

export default StartGameScreen;

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		marginTop: 100,
		alignItems: 'center', // use only space required, instead of 'stretch'
	},
	numberInput: {
		height: 50,
		width: 50,
		fontSize: 32,
		borderBottomColor: Colors.accent500,
		borderBottomWidth: 2,
		color: Colors.accent500,
		marginVertical: 8,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	buttonsContainer: {
		flexDirection: 'row',
	},
	buttonContainer: {
		flex: 1, // by default, element takes only as much space as needed. use flex prop to equally use space
	},
});
