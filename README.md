# Svelte Lookout

[![Build Status](https://github.com/UrielCuriel/svelte-lookout/actions/workflows/release-please.yml/badge.svg?branch=main)](https://github.com/UrielCuriel/svelte-lookout/actions/workflows/release-please.yml)

this is a svelte library to easily access `window` events, such as mouse position and movement, screen size, among others

this library is inspired by [tornis](https://github.com/robb0wen/tornis)

visit this [site](https://svelte-lookout.urielcuriel.dev/) to see the watchers in action

# Installation

```bash
npm install svelte-lookout
yard add svelte-lookout
pnpm add svelte-lookout
```

# Watchers

the `watchers` available are the following:

## mouseWatcher

this watcher will return the mouse position and movement

### returns:

```ts
{
	x: number;
	y: number;
	velocity: {
		x: number;
		y: number;
	}
}
```

### usage:

```html
<script>
	import { mouseWatcher } from 'svelte-lookout';
</script>

{#if $mouseWatcher}
<p>Mouse position: {$mouseWatcher.x}, {$mouseWatcher.y}</p>
<p>Mouse movement: {$mouseWatcher.velocity.x}, {$mouseWatcher.velocity.y}</p>
{/if}
```

## scrollWatcher

this watcher will return the scroll movement in left, right, top and bottom directions and velocity of movement

### returns:

```ts
{
	left: number;
	right: number;
	top: number;
	bottom: number;
	velocity: {
		x: number; // left and right movement negative and positive respectively
		y: number; // top and bottom movement negative and positive respectively
	}
}
```

### usage:

```html
<script>
	import { scrollWatcher } from 'svelte-lookout';
</script>

{#if $scrollWatcher}
<p>Scroll left: {$scrollWatcher.left}</p>
<p>Scroll right: {$scrollWatcher.right}</p>
<p>Scroll top: {$scrollWatcher.top}</p>
<p>Scroll bottom: {$scrollWatcher.bottom}</p>
<p>Scroll velocity: {$scrollWatcher.velocity.x}, {$scrollWatcher.velocity.y}</p>
{/if}
```

## sizeWatcher

this watcher will return the screen size

### returns:

```ts
{
	width: number;
	height: number;
	docH: number; // total height of the document
}
```

### usage:

```html
<script>
	import { sizeWatcher } from 'svelte-lookout';
</script>

{#if $sizeWatcher}
<p>Screen width: {$sizeWatcher.width}</p>
<p>Screen height: {$sizeWatcher.height}</p>
<p>Document height: {$sizeWatcher.docH}</p>
{/if}
```

## windowWatcher

this watcher will return the window top, bottom, left and right positions and velocity of movement

### returns:

```ts
{
	top: number;
	bottom: number;
	left: number;
	right: number;
	velocity: {
		x: number; // left and right movement negative and positive respectively
		y: number; // top and bottom movement negative and positive respectively
	}
}
```

### usage:

```html
<script>
	import { windowWatcher } from 'svelte-lookout';
</script>

{#if $windowWatcher}
<p>Window top: {$windowWatcher.top}</p>
<p>Window bottom: {$windowWatcher.bottom}</p>
<p>Window left: {$windowWatcher.left}</p>
<p>Window right: {$windowWatcher.right}</p>
<p>Window velocity: {$windowWatcher.velocity.x}, {$windowWatcher.velocity.y}</p>
{/if}
```

## orientationWatcher

this watcher will return the device orientation

### returns:

```ts
{
	alpha: number;
	beta: number;
	gamma: number;
}
```

### usage:

```html
<script>
	import { orientationWatcher } from 'svelte-lookout';
</script>

{#if $orientationWatcher}
<p>Alpha: {$orientationWatcher.alpha}</p>
<p>Beta: {$orientationWatcher.beta}</p>
<p>Gamma: {$orientationWatcher.gamma}</p>
{/if}
```

## devicePixelRatioWatcher

this watcher will return the device pixel ratio

### returns:

```ts
{
	devicePixelRatio: number;
}
```

### usage:

```html
<script>
	import { devicePixelRatioWatcher } from 'svelte-lookout';
</script>

{#if $devicePixelRatioWatcher}
<p>Device Pixel Ratio: {$devicePixelRatioWatcher.devicePixelRatio}</p>
{/if}
```
