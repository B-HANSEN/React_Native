import { FlatList } from 'react-native';
import CategoryGridTile from '../components/CategoryGridTile';

import { CATEGORIES } from '../data/dummy-data';

function CategoriesScreen({ navigation }) {
	// helper function
	function renderCategoryItem(itemData) {
		function pressHandler() {
			navigation.navigate('MealsOverview', {
				categoryId: itemData.item.id, // setup params object
			});
		}

		return (
			<CategoryGridTile
				title={itemData.item.title}
				color={itemData.item.color}
				onPress={pressHandler}
			/>
		);
	}

	return (
		<FlatList
			data={CATEGORIES}
			keyExtractor={item => item.id}
			renderItem={renderCategoryItem}
			numColumns={2} // 2 columns
		/>
	);
}

export default CategoriesScreen;
