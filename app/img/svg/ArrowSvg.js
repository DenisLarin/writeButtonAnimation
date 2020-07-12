import React from 'react';
import Svg, { Polyline } from 'react-native-svg';

const ArrowSvg = ({ width, height, color = '#000' }) => {
	return (
		<Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 255 255">
			<Polyline fill={color} points="0,63.75 127.5,191.25 255,63.75" />
		</Svg>
	);
};

export default ArrowSvg;
