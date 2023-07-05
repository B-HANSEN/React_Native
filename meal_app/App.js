import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';

import CategoriesScreen from './screens/CategoriesScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';
// import FavoritesContextProvider from './store/context/favorites-context';
import { store } from './store/redux/store';

const Stack = createNativeStackNavigator(); // exposes 2 properties: Navigator and Screen
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
	return (
		// define drawer navigation
		<Drawer.Navigator
			screenOptions={{
				// applied to all screens registered in this navigator
				headerStyle: { backgroundColor: '#351401' },
				headerTintColor: 'white',
				sceneContainerStyle: { backgroundColor: '#3f2f25' }, // corresponds to contentStyle prop in stack navigation
				drawerContentStyle: { backgroundColor: '#351401' },
				drawerInactiveTintColor: 'white',
				drawerActiveTintColor: '#351401',
				drawerActiveBackgroundColor: '#e4baa1',
			}}>
			<Drawer.Screen
				name='Categories'
				component={CategoriesScreen}
				options={{
					title: 'All Categories',
					drawerIcon: (
						{ color, size } // default props
					) => <Ionicons name='list' color={color} size={size} />,
				}}
			/>
			<Drawer.Screen
				name='Favorites'
				component={FavoritesScreen}
				options={{
					drawerIcon: ({ color, size }) => (
						<Ionicons name='star' color={color} size={size} />
					),
				}}
			/>
		</Drawer.Navigator>
	);
}

export default function App() {
	return (
		<>
			<StatusBar style='light' />
			{/* define stack flow  */}
			{/* <FavoritesContextProvider> */}
			<Provider store={store}>
				<NavigationContainer>
					<Stack.Navigator
						// can accept initial screen name by using a prop: e.g. initialRouteName="ProductDetails"
						// if undefined, the first screen will be the default screen
						screenOptions={{
							headerStyle: { backgroundColor: '#351401' },
							headerTintColor: 'white',
							contentStyle: { backgroundColor: '#3f2f25' },
						}}>
						<Stack.Screen
							name='Drawer'
							component={DrawerNavigator}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name='MealsOverview'
							component={MealsOverviewScreen}
						/>
						<Stack.Screen
							name='MealDetail'
							component={MealDetailScreen}
							options={{
								title: 'About the Meal',
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		</>
	);
}

const styles = StyleSheet.create({
	container: {},
});
