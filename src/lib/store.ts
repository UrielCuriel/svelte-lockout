import { derived, readable, writable } from 'svelte/store';
import type { lookoutWatcher } from './types';
import { browser, delay, diff, last, mean } from './utils';

const INITIAL_STATE: lookoutWatcher = {
	x: [0],
	y: [0],
	width: 0,
	height: 0,
	mouseX: [0],
	mouseY: [0],
	windowX: [0],
	windowY: [0],
	windowVelocityXBuffer: [0],
	windowVelocityYBuffer: [0],
	windowVelocityX: 0,
	windowVelocityY: 0,
	alpha: [0],
	beta: [0],
	gamma: [0],
	initialAlpha: 0,
	initialBeta: 0,
	initialGamma: 0,
	scrollHeight: 0,
	devicePixelRatio: 0,
	mouseVelocityXBuffer: [],
	mouseVelocityYBuffer: [],
	mouseVelocityX: 0,
	mouseVelocityY: 0,
	scrollVelocityXBuffer: [],
	scrollVelocityYBuffer: [],
	scrollVelocityX: 0,
	scrollVelocityY: 0
};

const setInitialWatcher = () => {
	let data = INITIAL_STATE;
	console.log(browser());
	if (browser()) {
		data = {
			...data,
			width: window.innerWidth,
			height: window.innerHeight,
			windowX: [window.screenX],
			windowY: [window.screenY],
			scrollHeight: document.body.scrollHeight,
			devicePixelRatio: Math.max(window.devicePixelRatio || 1.0, 1.0)
		};
	}
	return data;
};

const updateWatcher = (data: lookoutWatcher) => {
	//check mouse velocity
	if (data.mouseVelocityXBuffer.length > 5) {
		data.mouseVelocityXBuffer.shift();
	}
	data.mouseVelocityXBuffer.push(diff(data.mouseX));
	data.mouseVelocityX = mean(data.mouseVelocityXBuffer);
	if (data.mouseVelocityYBuffer.length > 5) {
		data.mouseVelocityYBuffer.shift();
	}
	data.mouseVelocityYBuffer.push(diff(data.mouseY));
	data.mouseVelocityY = mean(data.mouseVelocityYBuffer);
	if (data.mouseX.length >= 2) {
		data.mouseX.shift();
	}
	data.mouseX.push(last(data.mouseX));
	if (data.mouseY.length >= 2) {
		data.mouseY.shift();
	}
	data.mouseY.push(last(data.mouseY));

	//check scroll movement
	if (data.x.length >= 2) {
		data.x.shift();
	}
	data.x.push(window.scrollX);
	if (data.y.length >= 2) {
		data.y.shift();
	}
	data.y.push(window.scrollY);

	if (data.scrollVelocityXBuffer.length > 5) {
		data.scrollVelocityXBuffer.shift();
	}
	data.scrollVelocityXBuffer.push(diff(data.x));
	data.scrollVelocityX = mean(data.scrollVelocityXBuffer);
	if (data.scrollVelocityYBuffer.length > 5) {
		data.scrollVelocityYBuffer.shift();
	}
	data.scrollVelocityYBuffer.push(diff(data.y));
	data.scrollVelocityY = mean(data.scrollVelocityYBuffer);

	//windows position
	if (data.windowX.length >= 2) {
		data.windowX.shift();
	}
	data.windowX.push(window.screenX);
	if (data.windowY.length >= 2) {
		data.windowY.shift();
	}
	data.windowY.push(window.screenY);

	if (data.windowVelocityXBuffer.length > 5) {
		data.windowVelocityXBuffer.shift();
	}
	data.windowVelocityXBuffer.push(diff(data.windowX));
	data.windowVelocityX = mean(data.windowVelocityXBuffer);

	if (data.windowVelocityYBuffer.length > 5) {
		data.windowVelocityYBuffer.shift();
	}
	data.windowVelocityYBuffer.push(diff(data.windowY));
	data.windowVelocityY = mean(data.windowVelocityYBuffer);

	return data;
};

const tick = readable(0, (set) => {
	const interval = setInterval(() => {
		set(Date.now());
	}, 1000 / 60);
	return () => {
		clearInterval(interval);
	};
});

const mouseHandler = delay(75, (event: MouseEvent, data: lookoutWatcher) => {
	if (data.mouseX.length >= 2) {
		data.mouseX.shift();
	}
	data.mouseX.push(event.clientX);
	if (data.mouseY.length >= 2) {
		data.mouseY.shift();
	}
	data.mouseY.push(event.clientY);
	return data;
});

const resizeHandler = delay(110, (event: UIEvent, data: lookoutWatcher) => {
	data.width = window.innerWidth;
	data.height = window.innerHeight;
	data.scrollHeight = document.body.scrollHeight;
	data.devicePixelRatio = Math.max(window.devicePixelRatio || 1.0, 1.0);
	return data;
});

const orientationHandler = delay(110, (event: DeviceOrientationEvent, data: lookoutWatcher) => {
	if (data.alpha.length >= 2) {
		data.alpha.shift();
	}
	data.alpha.push(event.alpha ?? 0);
	if (data.beta.length >= 2) {
		data.beta.shift();
	}
	data.beta.push(event.beta ?? 0);
	if (data.gamma.length >= 2) {
		data.gamma.shift();
	}
	data.gamma.push(event.gamma ?? 0);
	return data;
});

function createWatcherStore() {
	const { subscribe, set, update } = writable<lookoutWatcher>(INITIAL_STATE);
	if (browser()) {
		set(setInitialWatcher());
		window.addEventListener('mousemove', (event) => {
			update((data) => mouseHandler(event, data));
		});
		window.addEventListener('resize', (event) => {
			update((data) => resizeHandler(event, data));
		});
		window.addEventListener('deviceorientation', (event) => {
			update((data) => orientationHandler(event, data));
		});
		tick.subscribe(() => {
			update(updateWatcher);
		});
	}

	return {
		subscribe
	};
}

export const watcher = createWatcherStore();

export const mouseWatcher = derived(watcher, ($watcher) => {
	return {
		x: Math.floor(last($watcher.mouseX)),
		y: Math.floor(last($watcher.mouseY)),
		velocity: {
			x: Math.floor($watcher.mouseVelocityX),
			y: Math.floor($watcher.mouseVelocityY)
		}
	};
});

export const scrollWatcher = derived(watcher, ($watcher) => {
	return {
		left: Math.floor(last($watcher.x)),
		right: Math.floor(last($watcher.x) + $watcher.width),
		top: Math.floor(last($watcher.y)),
		bottom: Math.floor(last($watcher.y) + $watcher.height),
		velocity: {
			x: Math.floor($watcher.scrollVelocityX),
			y: Math.floor($watcher.scrollVelocityY)
		}
	};
});

export const sizeWatcher = derived(watcher, ($watcher) => {
	return {
		width: $watcher.width,
		height: $watcher.height,
		docH: $watcher.scrollHeight
	};
});

export const windowWatcher = derived(watcher, ($watcher) => {
	return {
		left: Math.floor(last($watcher.windowX)),
		right: Math.floor(last($watcher.windowX) + $watcher.width),
		top: Math.floor(last($watcher.windowY)),
		bottom: Math.floor(last($watcher.windowY) + $watcher.height),
		velocity: {
			x: Math.floor($watcher.windowVelocityX),
			y: Math.floor($watcher.windowVelocityY)
		}
	};
});

export const orientationWatcher = derived(watcher, ($watcher) => {
	return {
		alpha: Math.floor(last($watcher.alpha)),
		beta: Math.floor(last($watcher.beta)),
		gamma: Math.floor(last($watcher.gamma))
	};
});

export const devicePixelRatioWatcher = derived(watcher, ($watcher) => {
	return $watcher.devicePixelRatio;
});
