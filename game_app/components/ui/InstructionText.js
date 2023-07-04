import { Text, StyleSheet } from 'react-native';

import Colors from '../../constants/colors';

function InstructionText({ children, style }) {
	// simulate cascading of styles by passing style prop from parent
	// sequence in array matters when clashing: later indexed item overwrites earlier ones
	return <Text style={[styles.instructionText, style]}>{children}</Text>;
}

export default InstructionText;

const styles = StyleSheet.create({
	instructionText: {
		fontFamily: 'open-sans', // use loaded fonts
		color: Colors.accent500,
		fontSize: 24,
	},
});
