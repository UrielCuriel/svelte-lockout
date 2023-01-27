<!-- Work in progress -->
<div class="container mx-auto prose prose-h1:text-3xl prose-h1:text-primary-500 prose-h1:font-medium prose-h2:text-primary-400 prose-h2:font-medium prose-h3:text-primary-teal-500">
	<h1 id="svelte-lookout">Svelte Lookout</h1>
	<p>
		<a href="https://github.com/UrielCuriel/svelte-lookout/actions/workflows/release-please.yml"
			><img src="https://github.com/UrielCuriel/svelte-lookout/actions/workflows/release-please.yml/badge.svg?branch=main" alt="Build Status" /></a
		>
	</p>
	<p>this is a svelte library to easily access <code>window</code> events, such as mouse position and movement, screen size, among others</p>
	<p>this library is inspired by <a href="https://github.com/robb0wen/tornis">tornis</a></p>
	<p>visit this <a href="https://svelte-lookout.urielcuriel.dev/">site</a> to see the watchers in action</p>
	<h1 id="installation">Installation</h1>
	<pre><code class="lang-bash"
			>npm install svelte-lookout
yard <span class="hljs-keyword">add</span><span class="bash"> svelte-lookout
</span>pnpm <span class="hljs-keyword">add</span><span class="bash"> svelte-lookout</span>
</code></pre>
	<h1 id="watchers">Watchers</h1>
	<p>the <code>watchers</code> available are the following:</p>
	<h2 id="mousewatcher">mouseWatcher</h2>
	<p>this watcher will return the mouse position and movement</p>
	<h3 id="returns-">returns:</h3>
	<pre><code class="lang-json"
			>&#123;
    <span class="hljs-attribute">x</span>: number;
    <span class="hljs-attribute">y</span>: number;
    <span class="hljs-attribute">velocity</span>: &#123;
        x: number;
        <span class="hljs-attribute">y</span>: number;
    &#125;
&#125;
</code></pre>
	<h3 id="usage-">usage:</h3>
	<pre><code class="lang-html"
			><span class="xml"
				><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-meta"><span class="hljs-meta-keyword">import</span> </span></span
				></span
			><span class="hljs-template-variable">&#123; mouseWatcher &#125;</span><span class="xml"
				><span class="javascript"> <span class="hljs-keyword">from</span> <span class="hljs-string">'svelte-lookout'</span>;
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</span><span class="hljs-template-tag">&#123;#<span class="hljs-name">if</span> $mouseWatcher&#125;</span><span class="xml">
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Mouse position: </span><span class="hljs-template-variable">&#123;$mouseWatcher.x&#125;</span><span
				class="xml"
				>, </span><span class="hljs-template-variable">&#123;$mouseWatcher.y&#125;</span><span class="xml"
				><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Mouse movement: </span><span class="hljs-template-variable">&#123;$mouseWatcher.velocity.x&#125;</span><span
				class="xml"
				>, </span><span class="hljs-template-variable">&#123;$mouseWatcher.velocity.y&#125;</span><span class="xml"
				><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
</span><span class="hljs-template-tag">&#123;/<span class="hljs-name">if</span>&#125;</span><span class="xml" />
</code></pre>
	<h2 id="scrollwatcher">scrollWatcher</h2>
	<p>this watcher will return the scroll movement in left, right, top and bottom directions and velocity of movement</p>
	<h3 id="returns-">returns:</h3>
	<pre><code class="lang-ts"
			>&#123;
    <span class="hljs-attribute">left</span>: number;
    <span class="hljs-attribute">right</span>: number;
    <span class="hljs-attribute">top</span>: number;
    <span class="hljs-attribute">bottom</span>: number;
    velocity: &#123;
        x: number; <span class="hljs-comment">// left and right movement negative and positive respectively</span>
        y: number; <span class="hljs-comment">// top and bottom movement negative and positive respectively</span>
    &#125;
&#125;
</code></pre>
	<h3 id="usage-">usage:</h3>
	<pre><code class="lang-html"
			><span class="xml"
				><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-meta"><span class="hljs-meta-keyword">import</span> </span></span
				></span
			><span class="hljs-template-variable">&#123; scrollWatcher &#125;</span><span class="xml"
				><span class="javascript"> <span class="hljs-keyword">from</span> <span class="hljs-string">'svelte-lookout'</span>;
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</span><span class="hljs-template-tag">&#123;#<span class="hljs-name">if</span> $scrollWatcher&#125;</span><span class="xml">
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Scroll left: </span><span class="hljs-template-variable">&#123;$scrollWatcher.left&#125;</span><span
				class="xml"
				><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Scroll right: </span><span class="hljs-template-variable">&#123;$scrollWatcher.right&#125;</span><span
				class="xml"
				><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Scroll top: </span><span class="hljs-template-variable">&#123;$scrollWatcher.top&#125;</span><span class="xml"
				><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Scroll bottom: </span><span class="hljs-template-variable">&#123;$scrollWatcher.bottom&#125;</span><span
				class="xml"
				><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Scroll velocity: </span><span class="hljs-template-variable">&#123;$scrollWatcher.velocity.x&#125;</span><span
				class="xml"
				>, </span><span class="hljs-template-variable">&#123;$scrollWatcher.velocity.y&#125;</span><span class="xml"
				><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
</span><span class="hljs-template-tag">&#123;/<span class="hljs-name">if</span>&#125;</span><span class="xml" />
</code></pre>
	<h2 id="sizewatcher">sizeWatcher</h2>
	<p>this watcher will return the screen size</p>
	<h3 id="returns-">returns:</h3>
	<pre><code class="lang-ts"
			>&#123;
    <span class="hljs-attribute">width</span>: number;
    <span class="hljs-attribute">height</span>: number;
    docH: number; <span class="hljs-comment">// total height of the document</span>
&#125;
</code></pre>
	<h3 id="usage-">usage:</h3>
	<pre><code class="lang-html"
			><span class="xml"
				><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-meta"><span class="hljs-meta-keyword">import</span> </span></span
				></span
			><span class="hljs-template-variable">&#123; sizeWatcher &#125;</span><span class="xml"
				><span class="javascript"> <span class="hljs-keyword">from</span> <span class="hljs-string">'svelte-lookout'</span>;
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</span><span class="hljs-template-tag">&#123;#<span class="hljs-name">if</span> $sizeWatcher&#125;</span><span class="xml">
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Screen width: </span><span class="hljs-template-variable">&#123;$sizeWatcher.width&#125;</span><span
				class="xml"
				><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Screen height: </span><span class="hljs-template-variable">&#123;$sizeWatcher.height&#125;</span><span
				class="xml"
				><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Document height: </span><span class="hljs-template-variable">&#123;$sizeWatcher.docH&#125;</span><span
				class="xml"
				><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
</span><span class="hljs-template-tag">&#123;/<span class="hljs-name">if</span>&#125;</span><span class="xml" />
</code></pre>
	<h2 id="windowwatcher">windowWatcher</h2>
	<p>this watcher will return the window top, bottom, left and right positions and velocity of movement</p>
	<h3 id="returns-">returns:</h3>
	<pre><code class="lang-ts"
			>&#123;
    <span class="hljs-attribute">top</span>: number;
    <span class="hljs-attribute">bottom</span>: number;
    <span class="hljs-attribute">left</span>: number;
    <span class="hljs-attribute">right</span>: number;
    velocity: &#123;
        x: number; <span class="hljs-comment">// left and right movement negative and positive respectively</span>
        y: number; <span class="hljs-comment">// top and bottom movement negative and positive respectively</span>
    &#125;
&#125;
</code></pre>
	<h3 id="usage-">usage:</h3>
	<pre><code class="lang-html"
			><span class="xml"
				><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-meta"><span class="hljs-meta-keyword">import</span> </span></span
				></span
			><span class="hljs-template-variable">&#123; windowWatcher &#125;</span><span class="xml"
				><span class="javascript"> <span class="hljs-keyword">from</span> <span class="hljs-string">'svelte-lookout'</span>;
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</span><span class="hljs-template-tag">&#123;#<span class="hljs-name">if</span> $windowWatcher&#125;</span><span class="xml">
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Window top: </span><span class="hljs-template-variable">&#123;$windowWatcher.top&#125;</span><span class="xml"
				><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Window bottom: </span><span class="hljs-template-variable">&#123;$windowWatcher.bottom&#125;</span><span
				class="xml"
				><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Window left: </span><span class="hljs-template-variable">&#123;$windowWatcher.left&#125;</span><span
				class="xml"
				><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Window right: </span><span class="hljs-template-variable">&#123;$windowWatcher.right&#125;</span><span
				class="xml"
				><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Window velocity: </span><span class="hljs-template-variable">&#123;$windowWatcher.velocity.x&#125;</span><span
				class="xml"
				>, </span><span class="hljs-template-variable">&#123;$windowWatcher.velocity.y&#125;</span><span class="xml"
				><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
</span><span class="hljs-template-tag">&#123;/<span class="hljs-name">if</span>&#125;</span><span class="xml" />
</code></pre>
	<h2 id="orientationwatcher">orientationWatcher</h2>
	<p>this watcher will return the device orientation</p>
	<h3 id="returns-">returns:</h3>
	<pre><code class="lang-ts"
			>&#123;
    <span class="hljs-attribute">alpha</span>: number;
    <span class="hljs-attribute">beta</span>: number;
    <span class="hljs-attribute">gamma</span>: number;
&#125;
</code></pre>
	<h3 id="usage-">usage:</h3>
	<pre><code class="lang-html"
			><span class="xml"
				><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-meta"><span class="hljs-meta-keyword">import</span> </span></span
				></span
			><span class="hljs-template-variable">&#123; orientationWatcher &#125;</span><span class="xml"
				><span class="javascript"> <span class="hljs-keyword">from</span> <span class="hljs-string">'svelte-lookout'</span>;
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</span><span class="hljs-template-tag">&#123;#<span class="hljs-name">if</span> $orientationWatcher&#125;</span><span class="xml">
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Alpha: </span><span class="hljs-template-variable">&#123;$orientationWatcher.alpha&#125;</span><span
				class="xml"
				><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Beta: </span><span class="hljs-template-variable">&#123;$orientationWatcher.beta&#125;</span><span class="xml"
				><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Gamma: </span><span class="hljs-template-variable">&#123;$orientationWatcher.gamma&#125;</span><span
				class="xml"
				><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
</span><span class="hljs-template-tag">&#123;/<span class="hljs-name">if</span>&#125;</span><span class="xml" />
</code></pre>
	<h2 id="devicepixelratiowatcher">devicePixelRatioWatcher</h2>
	<p>this watcher will return the device pixel ratio</p>
	<h3 id="returns-">returns:</h3>
	<pre><code class="lang-ts"
			>&#123;
    <span class="hljs-attribute">devicePixelRatio</span>: number;
&#125;
</code></pre>
	<h3 id="usage-">usage:</h3>
	<pre><code class="lang-html"
			><span class="xml"
				><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-meta"><span class="hljs-meta-keyword">import</span> </span></span
				></span
			><span class="hljs-template-variable">&#123; devicePixelRatioWatcher &#125;</span><span class="xml"
				><span class="javascript"> <span class="hljs-keyword">from</span> <span class="hljs-string">'svelte-lookout'</span>;
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</span><span class="hljs-template-tag">&#123;#<span class="hljs-name">if</span> $devicePixelRatioWatcher&#125;</span><span class="xml">
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Device Pixel Ratio: </span><span class="hljs-template-variable"
				>&#123;$devicePixelRatioWatcher.devicePixelRatio&#125;</span
			><span class="xml"
				><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
</span><span class="hljs-template-tag">&#123;/<span class="hljs-name">if</span>&#125;</span><span class="xml" />
</code></pre>
</div>
