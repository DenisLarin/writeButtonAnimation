const getTranslation = ({clock, gestureState, translation}) => {
	const state = {
		finished: new Value(0),
		position: translation,
		time: new Value(0),
		frameTime: new Value(0),
	};
	const config = {
		duration: 2000,
		toValue: new Value(150),
		easing: Easing.inOut(Easing.ease),
	};
	return block([
		cond(
			clockRunning(clock),
			[debug('clock is running', clock)],
			[
				debug('clock is NOT running', clock),
				set(state.finished, 0),
				set(state.position, 0),
				set(state.time, 0),
				set(state.frameTime, 0),
				startClock(clock),
			],
		),
		timing(clock, state, config),
		cond(state.finished, stopClock(clock)),
		state.position,
	]);
};

export default class App extends React.Component {
	gestureState = new Value(-1);

	clock = new Clock();

	translation = cond(
		eq(this.gestureState, State.ACTIVE), // when you start drag, the state will be ACTIVE
		[
			debug('active', this.gestureState, State.ACTIVE),
			getTranslation({clock: this.clock, translation: new Value(0)}),
		],
		[debug('not active', this.gestureState, State.ACTIVE)],
	);

	onStateChange = event([
		{
			nativeEvent: {
				state: this.gestureState,
			},
		},
	]);

	render() {
		return (
			<View style={styles.container}>
				<PanGestureHandler
					onGestureChange={this.onStateChange}
					onHandlerStateChange={this.onStateChange}>
					<Animated.View
						style={[
							styles.box,
							{
								transform: [
									{
										translateX: this.translation,
									},
								],
							},
						]}
					/>
				</PanGestureHandler>
			</View>
		);
	}
}
