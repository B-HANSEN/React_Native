import { useLayoutEffect } from 'react';
// import { useRoute } from '@react-navigation/native'; // as alternative to route.params

import MealsList from '../components/MealsList/MealsList';
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

	return <MealsList items={displayedMeals} />;
}

export default MealsOverviewScreen;
