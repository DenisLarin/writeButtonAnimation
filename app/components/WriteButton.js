import React, {useRef, useState} from 'react';
import {
	View,
	StyleSheet,
	SectionList,
	Dimensions,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	Button,
	Keyboard,
} from 'react-native';
import BoldSvg from '../img/svg/BoldSvg';
import ItalicSvg from '../img/svg/ItalicSvg';
import UnderLineSvg from '../img/svg/UnderlineSvg';
import ListSvg from '../img/svg/ListSvg';
import SetupSvg from '../img/svg/SetupSvg';
import PhotoSvg from '../img/svg/PhotoSvg';
import PaperClipSvg from '../img/svg/PaperClipSvg';
import ArrowSvg from '../img/svg/ArrowSvg';
import Animated, {
	block,
	Clock,
	clockRunning,
	cond,
	debug,
	Easing,
	eq,
	Extrapolate,
	interpolate,
	set,
	startClock,
	stopClock,
	timing,
	useCode,
	Value,
} from 'react-native-reanimated';

function runTiming(clock, value, dest) {
	const state = {
		finished: new Value(0),
		position: new Value(0),
		time: new Value(0),
		frameTime: new Value(0),
	};

	const config = {
		duration: 300,
		toValue: new Value(0),
		easing: Easing.bezier(0.5, 0.64, 1, 0.52),
	};

	return block([
		cond(
			clockRunning(clock),
			[
				// if the clock is already running we update the toValue, in case a new dest has been passed in
				set(config.toValue, dest),
			],
			[
				// if the clock isn't running we reset all the animation params and start the clock
				set(state.finished, 0),
				set(state.time, 0),
				set(state.position, value),
				set(state.frameTime, 0),
				set(config.toValue, dest),
				startClock(clock),
			],
		),
		// we run the step here that is going to update position
		timing(clock, state, config),
		// if the animation is over we stop the clock
		cond(state.finished, debug('stop clock', stopClock(clock))),
		// we made the block return the updated position
		state.position,
	]);
}

const svgsize = 20;
const svgColor = '#fff';
const {width} = Dimensions.get('window');

const WriteButton = () => {
	const inputRef = useRef();
	const animationHelper = new Value(0);
	const animation = new Value(0);
	const animationClock = new Clock();
	const buttonContainerWidth = interpolate(animation, {
		inputRange: [0, 0.5],
		outputRange: [150, width - 20],
		extrapolate: Extrapolate.CLAMP,
	});
	const toolBarOptionsOpacity = interpolate(animation, {
		inputRange: [0, 0.5],
		outputRange: [0, 1],
		extrapolate: Extrapolate.CLAMP,
	});
	const inputAreaHeight = interpolate(animation, {
		inputRange: [0.5, 1],
		outputRange: [0, 150],
		extrapolate: Extrapolate.CLAMP,
	});
	const inputAreaOpacity = interpolate(animation, {
		inputRange: [0, 0.5],
		outputRange: [0, 1],
		extrapolate: Extrapolate.CLAMP,
	});
	const inputBtnTextOpacity = interpolate(animation, {
		inputRange: [0, 0.5],
		outputRange: [1, 0],
		extrapolate: Extrapolate.CLAMP,
	});

	useCode(() => [
		cond(eq(animationHelper, 1), [
			set(animation, runTiming(animationClock, animation, 1)),
		]),
		cond(eq(animationHelper, 0), [
			set(animation, runTiming(animationClock, animation, 0)),
		]),
	]);
	const toggleForm = () => {
		animationHelper.setValue(1);
		inputRef.current.focus();
	};
	return (
		<Animated.View style={[styles.container, {width: buttonContainerWidth}]}>
			<View style={styles.toolBar}>
				<TouchableWithoutFeedback onPress={toggleForm}>
					<Animated.View
						style={[
							StyleSheet.absoluteFill,
							styles.center,
							{opacity: inputBtnTextOpacity},
						]}>
						<Text style={styles.textButton}>Write</Text>
					</Animated.View>
				</TouchableWithoutFeedback>
				<Animated.View
					style={[styles.toolBarLeft, {opacity: toolBarOptionsOpacity}]}>
					<BoldSvg width={svgsize} height={svgsize} color={svgColor} />
					<ItalicSvg width={svgsize} height={svgsize} color={svgColor} />
					<UnderLineSvg width={svgsize} height={svgsize} color={svgColor} />
					<ListSvg width={svgsize} height={svgsize} color={svgColor} />
					<SetupSvg width={svgsize} height={svgsize} color={svgColor} />
				</Animated.View>
				<Animated.View
					style={[styles.toolBarRight, {opacity: toolBarOptionsOpacity}]}>
					<PaperClipSvg width={svgsize} height={svgsize} color={svgColor} />
					<PhotoSvg width={svgsize} height={svgsize} color={svgColor} />
					<ArrowSvg width={svgsize} height={svgsize} color={svgColor} />
				</Animated.View>
			</View>
			<Animated.View
				style={[
					styles.inputContainer,
					{height: inputAreaHeight, opacity: inputAreaOpacity},
				]}>
				<TextInput
					multiline={true}
					placeholder="Write here..."
					style={styles.input}
					focusable={true}
					ref={inputRef}
				/>
			</Animated.View>
			<Button
				title={'reset'}
				onPress={() => {
					animationHelper.setValue(0);
					Keyboard.dismiss();
				}}
			/>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: width - 20,
	},
	toolBar: {
		backgroundColor: '#1539AE',
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: svgsize + 20,
		alignItems: 'center',
		paddingHorizontal: 10,
	},
	toolBarLeft: {
		flexDirection: 'row',
		width: (svgsize + 10) * 5,
		justifyContent: 'space-between',
	},
	toolBarRight: {
		flexDirection: 'row',
		width: (svgsize + 10) * 3,
		justifyContent: 'space-between',
	},
	inputContainer: {
		height: 150,
		borderWidth: 1,
		borderColor: '#cacaca',
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		overflow: 'hidden',
	},
	input: {
		...StyleSheet.absoluteFill,
		fontSize: 20,
		padding: 10,
	},
	center: {
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 100,
	},
	textButton: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#fff',
		textTransform: 'uppercase',
	},
});
export default WriteButton;
