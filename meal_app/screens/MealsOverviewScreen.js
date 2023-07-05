import { useLayoutEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
// import { useRoute } from '@react-navigation/native'; // as alternative to route.params

import MealItem from '../components/MealItem';
import { MEALS, CATEGORIES } from '../data/dummy-data';

function MealsOverviewScreen({ route, navigation }) {
	// Screen components automatically receive 'route' and 'navigation' by react-navigation
	// const route = useRoute(); // use hook as alternative to prop
	// const catId = route.params.categoryId;

	const catId = route.params.categoryId; // accessing params object

	const displayedMeals = MEALS.filter(mealItem => {
		return mealItem.categoryIds.indexOf(catId) >= 0;
	});

	// useLayoutEffect: run simultaneously with the component execution
	// alternatively set title in Screen with options prop: const catId = route.params.categoryId
	useLayoutEffect(() => {
		const categoryTitle = CATEGORIES.find(
			category => category.id === catId
		).title;

		navigation.setOptions({
			title: categoryTitle,
		});
	}, [catId, navigation]);

	function renderMealItem(itemData) {
		const item = itemData.item;

		const mealItemProps = {
			id: item.id,
			title: item.title,
			imageUrl: item.imageUrl,
			affordability: item.affordability,
			complexity: item.complexity,
			duration: item.duration,
		};
		return <MealItem {...mealItemProps} />;
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={displayedMeals}
				keyExtractor={item => item.id}
				renderItem={renderMealItem}
			/>
		</View>
	);
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
});
