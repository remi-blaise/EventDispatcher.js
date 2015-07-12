/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Rémi Blaise <remi.blaise@gmx.fr> "http://php-zzortell.rhcloud.com/"
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * EventDispatcher
 *
 * @author Rémi Blaise (alias Zzortell) "http://php-zzortell.rhcloud.com/"
 */
function EventDispatcher () {
	var listeners = [];
	
	/**
	 * Add an event listener
	 *
	 * @param string 	name 			The name of the event
	 * @param function 	listener 		The event listener
	 * @param integer	priority = 0 	The priority of the listener
	 *
	 * @return object id The ID of the listener
	 */
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
	
	/**
	 * Detach an event listener
	 *
	 * @param object id The ID of the listener
	 */
	this.detach = function ( id ) {
		var i = listeners[id.name][id.priority].indexOf(id.listener);
		listeners[id.name][id.priority].splice(i, 1);
	}
	
	/**
	 * Dispatch an event
	 *
	 * @param string name 	The name of the event
	 * @param object event 	The event to dispatch
	 */
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
