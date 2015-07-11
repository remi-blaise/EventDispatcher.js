/**
 * EventDispatcher
 *
 * @author Rémi Blaise (alias Zzortell) "http://php-zzortell.rhcloud.com/"
 */
function EventDispatcher () {
	var listeners = [];
	
	this.listen = function ( name, listener, priority ) {
		priority = priority || 0;
		
		// Register listener
		listeners[name] = listeners[name] || [];
		listeners[name][priority] = listeners[name][priority] || [];
		listeners[name][priority].push(listener);
		
		// Register priority
		listeners[name].priorities = listeners[name].priorities || [];
		if ( listeners[name].priorities.indexOf(priority) === -1 ) {
			listeners[name].priorities.push(priority);
		}
		
		return {
			'name': name,
			'priority': priority,
			'listener': listener
		};
	};
	
	this.detach = function ( id ) {
		var i = listeners[id.name][id.priority].indexOf(id.listener);
		listeners[id.name][id.priority].splice(i, 1);
	}
	
	this.dispatch = function ( name, event ) {
		var priority, listener;
		
		// Iterate over priorities
		listeners[name].priorities.sort();
		for ( var i = 0, c = listeners[name].priorities.length; i < c; i++ ) {
			priority = listeners[name].priorities[i];
			
			// Iterate over events
			for ( var j = 0, d = listeners[name][priority].length; j < d; j++ ) {
				listener = listeners[name][priority][j];
				listener( event );
			}
		}
	};
}
