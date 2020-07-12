import React from 'react';

import { Svg, Path } from 'react-native-svg';

const BoldSvg = ({ width, height, color }) => {
	return (
		<Svg
			width={width}
			height={height}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 298.667 298.667">
			<Path
				fill={color}
				d="M218.133,144.853c20.587-14.4,35.2-37.653,35.2-59.52C253.333,37.227,216.107,0,168,0H34.667v298.667h150.187
			c44.693,0,79.147-36.267,79.147-80.853C264,185.387,245.547,157.76,218.133,144.853z M98.667,53.333h64c17.707,0,32,14.293,32,32
			s-14.293,32-32,32h-64V53.333z M173.333,245.333H98.667v-64h74.667c17.707,0,32,14.293,32,32S191.04,245.333,173.333,245.333z"
			/>
		</Svg>
	);
};

export default BoldSvg;
