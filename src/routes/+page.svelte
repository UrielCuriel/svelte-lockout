<script lang="ts">
	import { mouseWatcher, scrollWatcher, sizeWatcher, windowWatcher, orientationWatcher, devicePixelRatioWatcher } from '$lib/store';
</script>

<div class=" m-auto px-4">
	<div class="grid md:grid-flow-col grid-flow-row  gap-4 w-full md:w-3/4 xl:w-2/3 m-auto">
		<div class="text-center">
			<img src="/logo.svg" alt="SvelteKit" class="w-auto h-72 m-auto" />
		</div>
		<div>
			<h1 class="text-3xl text-primary-500 font-medium">Welcome to svelte lookout</h1>
			<p class="text-justify">This is a library for "watch" some windows changes like resize mouse move scroll etc using stores an actions for svelte and sveltekit</p>
		</div>
	</div>
	<div class="m-auto w-full md:w-3/4 xl:w-2/3 my-8">
		<h2 class="text-2xl text-primary-500 font-medium">Installation</h2>
		<p class="text-justify">Install the library using npm or yarn</p>
		<p class="text-left font-mono bg-neutral-200 p-4 rounded-lg font-medium text-neutral-500 mt-4">
			<span class="text-primary-500">npm</span> install svelte-lookout
		</p>
	</div>
	<div class="m-auto w-full md:w-3/4 xl:w-2/3 my-8">
		<h2 class="text-2xl text-primary-500 font-medium">Watchers (svelte stores)</h2>
	</div>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-auto w-full md:w-2/3 xl:w-1/2 relative">
		<div class="w-full min-w-fit bg-white shadow-md rounded-xl text-center">
			<i class="fa-light fa-arrow-pointer text-10xl p-8 text-center mx-auto mt-4 text-primary-teal-500" />

			<span class="block">Mouse Watcher</span>
			<div class="grid grid-cols-2 p-4 gap-x-8 gap-y-2 text-left">
				<div class="bg-primary-teal-100 rounded-xl overflow-hidden flex justify-between">
					<span class="text-center bg-primary-teal-500 text-white w-10 inline-block">
						<i class="fa-light fa-x" />
					</span>
					<span class="px-2">{$mouseWatcher.x}</span>
				</div>
				<div class="bg-primary-teal-100 rounded-xl overflow-hidden flex justify-between">
					<span class="text-center bg-primary-teal-500 text-white w-10 inline-block">
						<i class="fa-light fa-y" />
					</span>
					<span class="px-2">{$mouseWatcher.y}</span>
				</div>
				<div class="bg-primary-teal-100 rounded-xl overflow-hidden h-6 flex justify-between">
					<span class="text-center bg-primary-teal-500 text-white w-10 inline-block">
						{#if $mouseWatcher.velocity.x < 0}
							<i class="fa-light fa-angles-left" />
						{:else if $mouseWatcher.velocity.x > 0}
							<i class="fa-light fa-angles-right" />
						{:else}
							<i class="fa-light fa-dash" />
						{/if}
					</span>

					<span class="px-2">{Math.abs($mouseWatcher.velocity.x)}</span>
				</div>
				<div class="bg-primary-teal-100 rounded-xl overflow-hidden h-6 flex justify-between">
					<span class="text-center bg-primary-teal-500 text-white w-10 inline-block">
						{#if $mouseWatcher.velocity.y < 0}
							<i class="fa-light fa-angles-up" />
						{:else if $mouseWatcher.velocity.y > 0}
							<i class="fa-light fa-angles-down" />
						{:else}
							<i class="fa-light fa-pipe" />
						{/if}
					</span>
					<span class="px-2">{Math.abs($mouseWatcher.velocity.y)}</span>
				</div>
			</div>
		</div>
		<div class="w-full min-w-fit bg-white shadow-md rounded-xl text-center">
			<i class="fa-light fa-computer-mouse-scrollwheel text-10xl p-8 text-center mx-auto mt-4 text-primary-teal-500" />

			<span class="block">Scroll Watcher</span>
			<div class="grid grid-cols-2 p-4 gap-x-8 gap-y-2 text-left">
				<div class="bg-primary-teal-100 rounded-xl overflow-hidden flex justify-between">
					<span class="text-center bg-primary-teal-500 text-white w-10 inline-block"><i class="fa-light fa-border-top" /></span>
					<span class="px-2">{$scrollWatcher.top}</span>
				</div>
				<div class="bg-primary-teal-100 rounded-xl overflow-hidden flex justify-between">
					<span class="text-center bg-primary-teal-500 text-white w-10 inline-block"><i class="fa-light fa-border-bottom" /></span>
					<span class="px-2">{$scrollWatcher.bottom}</span>
				</div>
				<div class="bg-primary-teal-100 rounded-xl overflow-hidden flex justify-between">
					<span class="text-center bg-primary-teal-500 text-white w-10 inline-block">
						<i class="fa-light fa-border-left" />
					</span>
					<span class="px-2">{$scrollWatcher.left}</span>
				</div>
				<div class="bg-primary-teal-100 rounded-xl overflow-hidden flex justify-between">
					<span class="text-center bg-primary-teal-500 text-white w-10 inline-block">
						<i class="fa-light fa-border-right" />
					</span>
					<span class="px-2">{$scrollWatcher.right}</span>
				</div>
				<div class="bg-primary-teal-100 rounded-xl overflow-hidden flex justify-between">
					<span class="text-center bg-primary-teal-500 text-white w-10 inline-block">
						{#if $scrollWatcher.velocity.x < 0}
							<i class="fa-light fa-angles-left" />
						{:else if $scrollWatcher.velocity.x > 0}
							<i class="fa-light fa-angles-right" />
						{:else}
							<i class="fa-light fa-dash" />
						{/if}
					</span>
					<span class="px-2">{$scrollWatcher.velocity.x}</span>
				</div>
				<div class="bg-primary-teal-100 rounded-xl overflow-hidden flex justify-between">
					<span class="text-center bg-primary-teal-500 text-white w-10 inline-block">
						{#if $scrollWatcher.velocity.y < 0}
							<i class="fa-light fa-angles-up" />
						{:else if $scrollWatcher.velocity.y > 0}
							<i class="fa-light fa-angles-down" />
						{:else}
							<i class="fa-light fa-pipe" />
						{/if}
					</span>
					<span class="px-2">{$scrollWatcher.velocity.y}</span>
				</div>
			</div>
		</div>
		<div class="w-full min-w-fit bg-white shadow-md rounded-xl text-center">
			<i class="fa-light fa-arrows-maximize text-10xl p-8 text-center mx-auto mt-4 text-primary-teal-500" />
			<span class="block">Size Watcher</span>
			<div class="grid grid-cols-2 p-4 gap-x-8 gap-y-2 text-left">
				<div class="bg-primary-teal-100 rounded-xl overflow-hidden flex justify-between">
					<span class="text-center bg-primary-teal-500 text-white w-10 inline-block">
						<i class="fa-light fa-arrows-left-right" />
					</span>
					<span class="px-2">{$sizeWatcher.width}</span>
				</div>
				<div class="bg-primary-teal-100 rounded-xl overflow-hidden flex justify-between">
					<span class="text-center bg-primary-teal-500 text-white w-10 inline-block">
						<i class="fa-light fa-arrows-up-down" />
					</span>
					<span class="px-2">{$sizeWatcher.height}</span>
				</div>
				<div class="bg-primary-teal-100 rounded-xl overflow-hidden flex justify-between">
					<span class="text-center bg-primary-teal-500 text-white w-10 inline-block">
						<i class="fa-light fa-arrow-down-to-line" />
					</span>
					<span class="px-2">{$sizeWatcher.docH}</span>
				</div>
			</div>
		</div>
		<div class="w-full min-w-fit bg-white shadow-md rounded-xl text-center">
			<i class="fa-light fa-window text-10xl p-8 text-center mx-auto mt-4 text-primary-teal-500" />
			<span class="block">Window Watcher</span>
			<div class="grid grid-cols-2 p-4 gap-x-8 gap-y-2 text-left">
				<div class="bg-primary-teal-100 rounded-xl overflow-hidden flex justify-between">
					<span class="text-center bg-primary-teal-500 text-white w-10 inline-block"><i class="fa-light fa-border-top" /></span>
					<span class="px-2">{$windowWatcher.top}</span>
				</div>
				<div class="bg-primary-teal-100 rounded-xl overflow-hidden flex justify-between">
					<span class="text-center bg-primary-teal-500 text-white w-10 inline-block"><i class="fa-light fa-border-bottom" /></span>
					<span class="px-2">{$windowWatcher.bottom}</span>
				</div>
				<div class="bg-primary-teal-100 rounded-xl overflow-hidden flex justify-between">
					<span class="text-center bg-primary-teal-500 text-white w-10 inline-block">
						<i class="fa-light fa-border-left" />
					</span>
					<span class="px-2">{$windowWatcher.left}</span>
				</div>
				<div class="bg-primary-teal-100 rounded-xl overflow-hidden flex justify-between">
					<span class="text-center bg-primary-teal-500 text-white w-10 inline-block">
						<i class="fa-light fa-border-right" />
					</span>
					<span class="px-2">{$windowWatcher.right}</span>
				</div>
				<div class="bg-primary-teal-100 rounded-xl overflow-hidden flex justify-between">
					<span class="text-center bg-primary-teal-500 text-white w-10 inline-block">
						{#if $windowWatcher.velocity.x < 0}
							<i class="fa-light fa-angles-left" />
						{:else if $windowWatcher.velocity.x > 0}
							<i class="fa-light fa-angles-right" />
						{:else}
							<i class="fa-light fa-dash" />
						{/if}
					</span>
					<span class="px-2">{$windowWatcher.velocity.x}</span>
				</div>
				<div class="bg-primary-teal-100 rounded-xl overflow-hidden flex justify-between">
					<span class="text-center bg-primary-teal-500 text-white w-10 inline-block">
						{#if $windowWatcher.velocity.y < 0}
							<i class="fa-light fa-angles-up" />
						{:else if $windowWatcher.velocity.y > 0}
							<i class="fa-light fa-angles-down" />
						{:else}
							<i class="fa-light fa-pipe" />
						{/if}
					</span>
					<span class="px-2">{$windowWatcher.velocity.y}</span>
				</div>
			</div>
		</div>
		<div class="w-full min-h-fit bg-white shadow-md rounded-xl text-center">
			<i class="fa-light fa-cube text-10xl p-8 text-center mx-auto mt-4 text-primary-teal-500" />
			<span class="block">Orientation Watcher</span>
			<div class="grid grid-cols-2 p-4 gap-x-8 gap-y-2 text-left">
				<div class="bg-primary-teal-100 rounded-xl overflow-hidden flex justify-between">
					<span class="text-center bg-primary-teal-500 text-white w-10 inline-block">
						<span class="fa-stack text-right ">
							<i class="fa-light fa-angle-90 fa-stack-1x" />
							<i class="fa-light fa-z inline-block align-top text-[8px] mr-2 mt-1" />
						</span>
					</span>
					<span class="px-2">{$orientationWatcher.alpha}</span>
				</div>
				<div class="bg-primary-teal-100 rounded-xl overflow-hidden flex justify-between">
					<span class="text-center bg-primary-teal-500 text-white w-10 inline-block">
						<span class="fa-stack text-right ">
							<i class="fa-light fa-angle-90 fa-stack-1x" />
							<i class="fa-light fa-x inline-block align-top text-[8px] mr-2 mt-1" />
						</span>
					</span>
					<span class="px-2">{$orientationWatcher.beta}</span>
				</div>
				<div class="bg-primary-teal-100 rounded-xl overflow-hidden flex justify-between">
					<span class="text-center bg-primary-teal-500 text-white w-10 inline-block">
						<span class="fa-stack text-right ">
							<i class="fa-light fa-angle-90 fa-stack-1x" />
							<i class="fa-light fa-y inline-block align-top text-[8px] mr-2 mt-1" />
						</span>
					</span>
					<span class="px-2">{$orientationWatcher.gamma}</span>
				</div>
			</div>
		</div>
		<div class="w-full min-h-fit bg-white shadow-md rounded-xl text-center">
			<i class="fa-sharp fa-percent text-10xl p-8 text-center mx-auto mt-4 text-primary-teal-500" />
			<span class="block">Pixel Ratio Watcher</span>
			<div class="grid grid-cols-2 p-4 gap-x-8 gap-y-2 text-left justify-center items-center align-middle">
				<div class="bg-primary-teal-100 rounded-xl overflow-hidden flex justify-between">
					<span class="text-center bg-primary-teal-500 text-white w-10 inline-block">
						<i class="fa-light fa-border-left" />
					</span>
					<span class="px-2">{$devicePixelRatioWatcher.devicePixelRatio}</span>
				</div>
			</div>
		</div>
	</div>
</div>
