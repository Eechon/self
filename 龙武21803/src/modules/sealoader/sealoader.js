var jqueryDefined = false;
function ready(callback) {
	var jQuery = window.jQuery;
	if (!jqueryDefined && jQuery) {
		jqueryDefined = true;
		var factory = function() {
			return jQuery;
		};
		seajs.define('jquery', factory);
		seajs.define('$', factory);
		seajs.define('$-debug', factory);
		if (jQuery.browser) {
			seajs.define('gallery/jquery-plugin/jquery-migrate', factory);
		}
	}

	if (callback) {
		callback(seajs);
	}
}

if (window.seajs) {
	module.exports = ready;
} else {
	var loadScript = (function() {
		var READY_STATE_RE = /loaded|complete/;

		var head = document.getElementsByTagName("head")[0] || document.documentElement, baseElement = head.getElementsByTagName("base")[0];

		return function(url, callback, id) {
			var script = document.createElement("script");

			function onload() {
				// Ensure only run once and handle memory leak in IE
				script.onload = script.onerror = script.onreadystatechange = null;

				// Remove the script to reduce memory leak
				head.removeChild(script);

				// Dereference the script
				script = null;

				if (callback) {
					callback()
				}
			}

			if ("onload" in script) {
				script.onerror = script.onload = onload;
			} else {
				script.onreadystatechange = function() {
					if (READY_STATE_RE.test(script.readyState)) {
						onload();
					}
				}
			}

			script.async = true;
			script.src = url;
			if (id) {
				script.id = id;
			}

			baseElement ? head.insertBefore(script, baseElement) : head.appendChild(script)
		}
	})();

	var queue = true;
	module.exports = function(callback) {
		if (queue) {
			if (queue === true) {
				queue = [callback];
				loadScript('http://assets.dwstatic.com/amkit/entry.js', function() {
					var c;
					for (var i = 0, len = queue.length; i < len; i++) {
						c = queue[i];
						if (c) {
							ready(c);
						}
					}
					queue = null;
				});
			} else {
				queue.push(callback);
			}
		} else {
			ready(callback);
		}
	};
}