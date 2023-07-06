import { Pressable, View, Text, StyleSheet, Platform } from 'react-native';
// if required to navigate from within a component that is not a screen:
// import { useNavigation } from '@react-navigation/native';

function CategoryGridTile({ title, color, onPress }) {
	// const navigation = useNavigation();

	return (
		<View style={styles.gridItem}>
			<Pressable
				android_ripple={{ color: '#ccc' }} // android ripple effect
				style={({ pressed }) => [
					styles.button,
					pressed ? styles.buttonPressed : null,
				]} // iOS ripple effect
				onPress={onPress}>
				<View style={[styles.innerContainer, { backgroundColor: color }]}>
					<Text style={styles.title}>{title}</Text>
				</View>
			</Pressable>
		</View>
	);
}

export default CategoryGridTile;

const styles = StyleSheet.create({
	gridItem: {
		flex: 1, // take all space available
		margin: 16,
		height: 150,
		borderRadius: 8,
		elevation: 4, // shadow setting for android
		backgroundColor: 'white', // otherwise shadow would not show
		shadowColor: 'black', // shadow setting for iOS
		shadowOpacity: 0.25,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		overflow: Platform.OS === 'android' ? 'hidden' : 'visible', // ripple effect
	},
	button: {
		flex: 1,
	},
	buttonPressed: {
		opacity: 0.5,
	},
	innerContainer: {
		flex: 1,
		padding: 16,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 18,
	},
});
