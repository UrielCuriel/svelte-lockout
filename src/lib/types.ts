export type lookoutWatcher = {
	x: number[];
	y: number[];
	width: number;
	height: number;
	mouseX: number[];
	mouseY: number[];
	windowX: number[];
	windowY: number[];
	windowVelocityX: number;
	windowVelocityY: number;
	windowVelocityXBuffer: number[];
	windowVelocityYBuffer: number[];
	alpha: number[];
	beta: number[];
	gamma: number[];
	initialAlpha: number;
	initialBeta: number;
	initialGamma: number;
	scrollHeight: number;
	devicePixelRatio: number;
	mouseVelocityXBuffer: number[];
	mouseVelocityYBuffer: number[];
	mouseVelocityX: number;
	mouseVelocityY: number;
	scrollVelocityXBuffer: number[];
	scrollVelocityYBuffer: number[];
	scrollVelocityX: number;
	scrollVelocityY: number;
};

export type MouseWatcher = {
	x: number;
	y: number;
	velocity: {
		x: number;
		y: number;
	};
};

export type ScrollWatcher = {
	left: number;
	right: number;
	top: number;
	bottom: number;
	velocity: {
		x: number;
		y: number;
	};
};

export type SizeWatcher = {
	width: number;
	height: number;
	docH: number;
};

export type WindowWatcher = {
	left: number;
	right: number;
	top: number;
	bottom: number;
	velocity: {
		x: number;
		y: number;
	};
};

export type OrientationWatcher = {
	alpha: number;
	beta: number;
	gamma: number;
};

export type DevicePixelRatioWatcher = {
	devicePixelRatio: number;
};
