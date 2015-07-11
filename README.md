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
