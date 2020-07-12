import React from 'react';

import { Path, Rect, Svg } from 'react-native-svg';

const UnderLineSvg = ({ width, height, color = '#000' }) => {
	return (
		<Svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220">
			<Path
				fill={color}
				d="M109.751,162.088c39.793,0,66.249-25.195,66.249-62.696V0h-44v96.567c0,9.133-3.005,24.453-22,24.453
		c-18.995,0-22-15.32-22-24.453V0H44v99.392c0,18.365,6.112,34.034,17.838,45.313C73.663,156.076,90.174,162.088,109.751,162.088z"
			/>
			<Rect fill={color} x="30" y="184" width="160" height="36" />
		</Svg>
	);
};

export default UnderLineSvg;
