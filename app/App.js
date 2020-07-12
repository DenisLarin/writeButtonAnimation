import React from 'react';
import {
	SafeAreaView,
	View,
	Keyboard,
	TouchableWithoutFeedback,
} from 'react-native';
import WriteButton from './components/WriteButton';

const App = () => {
	return (
		<SafeAreaView>
			<View style={{justifyContent: 'center', alignItems: 'center'}}>
				<WriteButton />
			</View>
		</SafeAreaView>
	);
};
export default App;
