import { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import Colors from './constants/colors';

export default function App() {
	const [userNumber, setUserNumber] = useState();
	const [gameIsOver, setGameIsOver] = useState(true);
	const [guessRounds, setGuessRounds] = useState(0);

	const [fontsLoaded] = useFonts({
		// useFonts hook to point to custom fonts
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
	});

	if (!fontsLoaded) {
		// if fonts not yet loaded, show loading screen
		return <AppLoading />;
	}

	function pickedNumberHandler(pickedNumber) {
		setUserNumber(pickedNumber);
		setGameIsOver(false);
	}

	function gameOverHandler(numberOfRounds) {
		setGameIsOver(true);
		setGuessRounds(numberOfRounds);
	}

	function startNewGameHandler() {
		setUserNumber(null); // navigate back to start game screen
		setGuessRounds(0);
	}

	let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

	if (userNumber) {
		screen = (
			<GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
		);
	}

	if (gameIsOver && userNumber) {
		screen = (
			<GameOverScreen
				userNumber={userNumber}
				roundsNumber={guessRounds}
				onStartNewGame={startNewGameHandler}
			/>
		);
	}

	return (
		<LinearGradient
			colors={[Colors.primary700, Colors.accent500]} // can use 2 or more colors
			style={styles.rootScreen}>
			<ImageBackground // Image tag renders image in the foreground
				source={require('./assets/images/background.png')} // point at it by requiring it
				resizeMode='cover' // zoom in or out when size does not match with available space
				style={styles.rootScreen}
				imageStyle={styles.backgroundImage} // radient to shine through the image, here only 15%. Gradient to be dominant
			>
				{/* consider notch: component to provide appropriate spacing depending on the device */}
				<SafeAreaView style={styles.rootScreen}>
					{/* render conditional screen  */}
					{screen}
				</SafeAreaView>
			</ImageBackground>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	rootScreen: {
		flex: 1, // takes up as much space as available
	},
	backgroundImage: {
		opacity: 0.15,
	},
});
