import { derived, readable, writable } from 'svelte/store';
import type { DevicePixelRatioWatcher, lookoutWatcher, MouseWatcher, OrientationWatcher, ScrollWatcher, SizeWatcher, WindowWatcher } from './types';
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
	//update only if the size has changed
	if (data.width !== window.innerWidth) data.width = window.innerWidth;
	if (data.height !== window.innerHeight) data.height = window.innerHeight;
	if (data.scrollHeight !== document.body.scrollHeight) data.scrollHeight = document.body.scrollHeight;
	if (data.devicePixelRatio !== Math.max(window.devicePixelRatio || 1.0, 1.0)) data.devicePixelRatio = Math.max(window.devicePixelRatio || 1.0, 1.0);
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

const createMouseWatcher = () => {
	let lastMouseWatcher: MouseWatcher = {
		x: 0,
		y: 0,
		velocity: {
			x: 0,
			y: 0
		}
	};
	const { subscribe, set } = writable<MouseWatcher>(lastMouseWatcher);

	watcher.subscribe((data) => {
		const currentMouseWatcher = {
			x: Math.floor(last(data.mouseX)),
			y: Math.floor(last(data.mouseY)),
			velocity: {
				x: Math.floor(data.mouseVelocityX),
				y: Math.floor(data.mouseVelocityY)
			}
		};
		//compare all entries of current mouse with last mouse to see if it has changed
		if (JSON.stringify(currentMouseWatcher) === JSON.stringify(lastMouseWatcher)) return;
		lastMouseWatcher = currentMouseWatcher;
		set(currentMouseWatcher);
	});
	return {
		subscribe
	};
};

export const mouseWatcher = createMouseWatcher();

const createScrollWatcher = () => {
	let lastScrollWatcher: ScrollWatcher = {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		velocity: {
			x: 0,
			y: 0
		}
	};
	const { subscribe, set } = writable<ScrollWatcher>(lastScrollWatcher);

	watcher.subscribe((data) => {
		const currentScrollWatcher = {
			left: Math.floor(last(data.x)),
			right: Math.floor(last(data.x) + data.width),
			top: Math.floor(last(data.y)),
			bottom: Math.floor(last(data.y) + data.height),
			velocity: {
				x: Math.floor(data.scrollVelocityX),
				y: Math.floor(data.scrollVelocityY)
			}
		};
		//compare all entries of current scroll with last scroll to see if it has changed
		if (JSON.stringify(currentScrollWatcher) === JSON.stringify(lastScrollWatcher)) return;
		lastScrollWatcher = currentScrollWatcher;
		set(lastScrollWatcher);
	});
	return { subscribe };
};

export const scrollWatcher = createScrollWatcher();

const createSizeWatcher = () => {
	let lastSizeWatcher: SizeWatcher = {
		width: 0,
		height: 0,
		docH: 0
	};
	const { subscribe, set } = writable<SizeWatcher>(lastSizeWatcher);

	watcher.subscribe((data) => {
		const currentSizeWatcher = {
			width: data.width,
			height: data.height,
			docH: data.scrollHeight
		};
		//compare all entries of current size with last size to see if it has changed
		if (JSON.stringify(currentSizeWatcher) === JSON.stringify(lastSizeWatcher)) return;
		lastSizeWatcher = currentSizeWatcher;
		set(lastSizeWatcher);
	});
	return { subscribe };
};

export const sizeWatcher = createSizeWatcher();

const createWindowWatcher = () => {
	let lastWindowWatcher: WindowWatcher = {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		velocity: {
			x: 0,
			y: 0
		}
	};
	const { subscribe, set } = writable<WindowWatcher>(lastWindowWatcher);

	watcher.subscribe((data) => {
		const currentWindowWatcher = {
			left: Math.floor(last(data.windowX)),
			right: Math.floor(last(data.windowX) + data.width),
			top: Math.floor(last(data.windowY)),
			bottom: Math.floor(last(data.windowY) + data.height),
			velocity: {
				x: Math.floor(data.windowVelocityX),
				y: Math.floor(data.windowVelocityY)
			}
		};
		//compare all entries of current window with last window to see if it has changed
		if (JSON.stringify(currentWindowWatcher) === JSON.stringify(lastWindowWatcher)) return;
		lastWindowWatcher = currentWindowWatcher;
		set(lastWindowWatcher);
	});
	return { subscribe };
};

export const windowWatcher = createWindowWatcher();

const createOrientationWatcher = () => {
	let lastOrientationWatcher: OrientationWatcher = {
		alpha: 0,
		beta: 0,
		gamma: 0
	};
	const { subscribe, set } = writable<OrientationWatcher>(lastOrientationWatcher);

	watcher.subscribe((data) => {
		const currentOrientationWatcher = {
			alpha: Math.floor(last(data.alpha)),
			beta: Math.floor(last(data.beta)),
			gamma: Math.floor(last(data.gamma))
		};
		//compare all entries of current orientation with last orientation to see if it has changed
		if (JSON.stringify(currentOrientationWatcher) === JSON.stringify(lastOrientationWatcher)) return;
		lastOrientationWatcher = currentOrientationWatcher;
		set(lastOrientationWatcher);
	});
	return { subscribe };
};

export const orientationWatcher = createOrientationWatcher();

const createDevicePixelRatioWatcher = () => {
	let lastDevicePixelRatioWatcher: DevicePixelRatioWatcher = {
		devicePixelRatio: 0
	};
	const { subscribe, set } = writable<DevicePixelRatioWatcher>(lastDevicePixelRatioWatcher);

	watcher.subscribe((data) => {
		const currentDevicePixelRatioWatcher = {
			devicePixelRatio: data.devicePixelRatio
		};
		//compare all entries of current devicePixelRatio with last devicePixelRatio to see if it has changed
		if (JSON.stringify(currentDevicePixelRatioWatcher) === JSON.stringify(lastDevicePixelRatioWatcher)) return;
		lastDevicePixelRatioWatcher = currentDevicePixelRatioWatcher;
		set(lastDevicePixelRatioWatcher);
	});
	return { subscribe };
};

export const devicePixelRatioWatcher = createDevicePixelRatioWatcher();
