import React from 'react';

import { Polygon, Svg } from 'react-native-svg';

const ItalicSvg = ({ width, height, color = '#000' }) => {
	return (
		<Svg
			width={width}
			height={height}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 298.667 298.667">
			<Polygon
				fill={color}
				points="106.667,0 106.667,64 153.92,64 80.747,234.667 21.333,234.667 21.333,298.667 192,298.667 192,234.667
			144.747,234.667 217.92,64 277.333,64 277.333,0 		"
			/>
		</Svg>
	);
};

export default ItalicSvg;
