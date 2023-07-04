import { View, Text, Pressable, StyleSheet } from 'react-native';

import Colors from '../../constants/colors';

function PrimaryButton({ children, onPress }) {
	return (
		// with custom button, usually have to work with combined container stylings
		<View style={styles.buttonOuterContainer}>
			<Pressable // replaces Touchable
				style={(
					{ pressed } // style prop takes an object or a function
				) =>
					pressed
						? [styles.buttonInnerContainer, styles.pressed] // if pressed, provide 2 different styles in an array
						: styles.buttonInnerContainer
				}
				onPress={onPress}
				android_ripple={{ color: Colors.primary600 }}>
				<Text style={styles.buttonText}>{children}</Text>
			</Pressable>
		</View>
	);
}

export default PrimaryButton;

const styles = StyleSheet.create({
	buttonOuterContainer: {
		borderRadius: 28,
		margin: 4,
		overflow: 'hidden', // any effects, like ripple effect, would only be shown in the container
	},
	buttonInnerContainer: {
		backgroundColor: Colors.primary500,
		paddingVertical: 8,
		paddingHorizontal: 16,
		elevation: 2,
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
	},
	pressed: {
		opacity: 0.75, // dedicated iOS button styling
	},
});
