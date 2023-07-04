import { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native'; // unlike html-tags in React, RN elements need to be imported
import { StatusBar } from 'expo-status-bar'; // use style prop to set for all pages

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
	const [modalIsVisible, setModalIsVisible] = useState(false);
	const [courseGoals, setCourseGoals] = useState([]);

	function startAddGoalHandler() {
		setModalIsVisible(true);
	}

	function endAddGoalHandler() {
		setModalIsVisible(false);
	}

	function addGoalHandler(enteredGoalText) {
		// update state with functional approach, to consider async updates of setState:
		setCourseGoals(currentCourseGoals => [
			...currentCourseGoals,
			{ text: enteredGoalText, id: Math.random().toString() },
		]);
		endAddGoalHandler();
	}

	function deleteGoalHandler(id) {
		setCourseGoals(currentCourseGoals => {
			return currentCourseGoals.filter(goal => goal.id !== id);
		});
	}

	return (
		<>
			<StatusBar style='light' />
			<View style={styles.appContainer}>
				<Button // RN buttons cannot be styled, wrap with View component
					title='Add New Goal'
					color='#a065ec'
					onPress={startAddGoalHandler}
				/>
				<GoalInput
					visible={modalIsVisible}
					onAddGoal={addGoalHandler}
					onCancel={endAddGoalHandler}
				/>
				<View style={styles.goalsContainer}>
					<FlatList
						// RN does not share auto-scroll behaviour as browsers, need to use FlatList or ScrollView
						// FlatList more performant for large lists, only loads what is currently shown
						data={courseGoals} // use 'data, renderItem, keyExtractor' props instead of ScrollView map
						renderItem={itemData => {
							return (
								<GoalItem
									text={itemData.item.text}
									id={itemData.item.id}
									onDeleteItem={deleteGoalHandler}
								/>
							);
						}}
						keyExtractor={(item, index) => {
							return item.id;
						}}
						alwaysBounceVertical={false}
					/>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	// in RN, styles do not cascade as they do in React
	appContainer: {
		flex: 1,
		paddingTop: 50,
		paddingHorizontal: 16,
	},
	goalsContainer: {
		flex: 5,
	},
});
