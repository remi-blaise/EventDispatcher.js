EventDispatcher.js
==================

A very simple event dispatcher.

Usage
-----

```html
<script src="your/path/to/eventdispatcher.js"></script>
```

```js
// Create a dispatcher
dispatcher = new EventDispatcher ();

// Add an event listener
dispatcher.listen('world.ready', function ( e ) {
	console.log(e.msg);
});

// Add a second event listener
id = dispatcher.listen('world.ready', function () {
	alert('I want to die.')
}, 1); // Execute it first, let's put a lower priority than the default one (0)

// Well... don't make your visitor sad
dispatcher.detach(id);

// Ok, trigger your event
dispatcher.dispatch('world.ready', { 'msg': 'Hello World!' });

// Enjoy!
```

Links
-----

To make an object it's own event dispatcher, please see
[mrdoob/eventdispatcher.js](https://github.com/mrdoob/eventdispatcher.js/).

The same event dispatcher is written in Python: [Zzortell/EventDispatcher.py](https://github.com/Zzortell/EventDispatcher.py).

License
-------

This code is under the MIT License.
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code.

TODO
----

Add propagation system and 'all' keyword like in EventDispatcher.py
