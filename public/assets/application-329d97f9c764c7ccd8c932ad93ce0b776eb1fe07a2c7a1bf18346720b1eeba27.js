/*!
 * jQuery JavaScript Library v3.6.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2022-08-26T17:52Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket trac-14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var flat = arr.flat ? function( array ) {
	return arr.flat.call( array );
} : function( array ) {
	return arr.concat.apply( [], array );
};


var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

		// Support: Chrome <=57, Firefox <=52
		// In some browsers, typeof returns "function" for HTML <object> elements
		// (i.e., `typeof document.createElement( "object" ) === "function"`).
		// We don't want to classify *any* DOM node as a function.
		// Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
		// Plus for old WebKit, typeof returns "function" for HTML collections
		// (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
		return typeof obj === "function" && typeof obj.nodeType !== "number" &&
			typeof obj.item !== "function";
	};


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};


var document = window.document;



	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.6.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	even: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return ( i + 1 ) % 2;
		} ) );
	},

	odd: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return i % 2;
		} ) );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a provided context; falls back to the global one
	// if not specified.
	globalEval: function( code, options, doc ) {
		DOMEval( code, { nonce: options && options.nonce }, doc );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
						[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return flat( ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( _i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.6
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2021-02-16
 */
( function( window ) {
var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	nonnativeSelectorCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ( {} ).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	pushNative = arr.push,
	push = arr.push,
	slice = arr.slice,

	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[ i ] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|" +
		"ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
	identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
		"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +

		// "Attribute values must be CSS identifiers [capture 5]
		// or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
		whitespace + "*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +

		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +

		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +

		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" +
		whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace +
		"*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
			whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
			whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),

		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace +
			"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
			"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rhtml = /HTML$/i,
	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g" ),
	funescape = function( escape, nonHex ) {
		var high = "0x" + escape.slice( 1 ) - 0x10000;

		return nonHex ?

			// Strip the backslash prefix from a non-hex escape sequence
			nonHex :

			// Replace a hexadecimal escape sequence with the encoded Unicode code point
			// Support: IE <=11+
			// For values outside the Basic Multilingual Plane (BMP), manually construct a
			// surrogate pair
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" +
				ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		function( elem ) {
			return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		( arr = slice.call( preferredDoc.childNodes ) ),
		preferredDoc.childNodes
	);

	// Support: Android<4.0
	// Detect silently failing push.apply
	// eslint-disable-next-line no-unused-expressions
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			pushNative.apply( target, slice.call( els ) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;

			// Can't trust NodeList.length
			while ( ( target[ j++ ] = els[ i++ ] ) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {
		setDocument( context );
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && ( match = rquickExpr.exec( selector ) ) ) {

				// ID selector
				if ( ( m = match[ 1 ] ) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( ( elem = context.getElementById( m ) ) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && ( elem = newContext.getElementById( m ) ) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[ 2 ] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( ( m = match[ 3 ] ) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!nonnativeSelectorCache[ selector + " " ] &&
				( !rbuggyQSA || !rbuggyQSA.test( selector ) ) &&

				// Support: IE 8 only
				// Exclude object elements
				( nodeType !== 1 || context.nodeName.toLowerCase() !== "object" ) ) {

				newSelector = selector;
				newContext = context;

				// qSA considers elements outside a scoping root when evaluating child or
				// descendant combinators, which is not what we want.
				// In such cases, we work around the behavior by prefixing every selector in the
				// list with an ID selector referencing the scope context.
				// The technique has to be used as well when a leading combinator is used
				// as such selectors are not recognized by querySelectorAll.
				// Thanks to Andrew Dupont for this technique.
				if ( nodeType === 1 &&
					( rdescend.test( selector ) || rcombinators.test( selector ) ) ) {

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;

					// We can use :scope instead of the ID hack if the browser
					// supports it & if we're not changing the context.
					if ( newContext !== context || !support.scope ) {

						// Capture the context ID, setting it first if necessary
						if ( ( nid = context.getAttribute( "id" ) ) ) {
							nid = nid.replace( rcssescape, fcssescape );
						} else {
							context.setAttribute( "id", ( nid = expando ) );
						}
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[ i ] = ( nid ? "#" + nid : ":scope" ) + " " +
							toSelector( groups[ i ] );
					}
					newSelector = groups.join( "," );
				}

				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch ( qsaError ) {
					nonnativeSelectorCache( selector, true );
				} finally {
					if ( nid === expando ) {
						context.removeAttribute( "id" );
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {

		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {

			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return ( cache[ key + " " ] = value );
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement( "fieldset" );

	try {
		return !!fn( el );
	} catch ( e ) {
		return false;
	} finally {

		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}

		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split( "|" ),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[ i ] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( ( cur = cur.nextSibling ) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return ( name === "input" || name === "button" ) && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
					inDisabledFieldset( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction( function( argument ) {
		argument = +argument;
		return markFunction( function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ ( j = matchIndexes[ i ] ) ] ) {
					seed[ j ] = !( matches[ j ] = seed[ j ] );
				}
			}
		} );
	} );
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	var namespace = elem && elem.namespaceURI,
		docElem = elem && ( elem.ownerDocument || elem ).documentElement;

	// Support: IE <=8
	// Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
	// https://bugs.jquery.com/ticket/4833
	return !rhtml.test( namespace || docElem && docElem.nodeName || "HTML" );
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( doc == document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9 - 11+, Edge 12 - 18+
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( preferredDoc != document &&
		( subWindow = document.defaultView ) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	// Support: IE 8 - 11+, Edge 12 - 18+, Chrome <=16 - 25 only, Firefox <=3.6 - 31 only,
	// Safari 4 - 5 only, Opera <=11.6 - 12.x only
	// IE/Edge & older browsers don't support the :scope pseudo-class.
	// Support: Safari 6.0 only
	// Safari 6.0 supports :scope but it's an alias of :root there.
	support.scope = assert( function( el ) {
		docElem.appendChild( el ).appendChild( document.createElement( "div" ) );
		return typeof el.querySelectorAll !== "undefined" &&
			!el.querySelectorAll( ":scope fieldset div" ).length;
	} );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert( function( el ) {
		el.className = "i";
		return !el.getAttribute( "className" );
	} );

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert( function( el ) {
		el.appendChild( document.createComment( "" ) );
		return !el.getElementsByTagName( "*" ).length;
	} );

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert( function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	} );

	// ID filter and find
	if ( support.getById ) {
		Expr.filter[ "ID" ] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute( "id" ) === attrId;
			};
		};
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter[ "ID" ] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode( "id" );
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode( "id" );
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( ( elem = elems[ i++ ] ) ) {
						node = elem.getAttributeNode( "id" );
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find[ "TAG" ] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,

				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( ( elem = results[ i++ ] ) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find[ "CLASS" ] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( ( support.qsa = rnative.test( document.querySelectorAll ) ) ) {

		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert( function( el ) {

			var input;

			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll( "[msallowcapture^='']" ).length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll( "[selected]" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push( "~=" );
			}

			// Support: IE 11+, Edge 15 - 18+
			// IE 11/Edge don't find elements on a `[name='']` query in some cases.
			// Adding a temporary attribute to the document before the selection works
			// around the issue.
			// Interestingly, IE 10 & older don't seem to have the issue.
			input = document.createElement( "input" );
			input.setAttribute( "name", "" );
			el.appendChild( input );
			if ( !el.querySelectorAll( "[name='']" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*name" + whitespace + "*=" +
					whitespace + "*(?:''|\"\")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll( ":checked" ).length ) {
				rbuggyQSA.push( ":checked" );
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push( ".#.+[+~]" );
			}

			// Support: Firefox <=3.6 - 5 only
			// Old Firefox doesn't throw on a badly-escaped identifier.
			el.querySelectorAll( "\\\f" );
			rbuggyQSA.push( "[\\r\\n\\f]" );
		} );

		assert( function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement( "input" );
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll( "[name=d]" ).length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll( ":enabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll( ":disabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: Opera 10 - 11 only
			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll( "*,:x" );
			rbuggyQSA.push( ",.*:" );
		} );
	}

	if ( ( support.matchesSelector = rnative.test( ( matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector ) ) ) ) {

		assert( function( el ) {

			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		} );
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join( "|" ) );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			) );
		} :
		function( a, b ) {
			if ( b ) {
				while ( ( b = b.parentNode ) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		compare = ( a.ownerDocument || a ) == ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			( !support.sortDetached && b.compareDocumentPosition( a ) === compare ) ) {

			// Choose the first element that is related to our preferred document
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( a == document || a.ownerDocument == preferredDoc &&
				contains( preferredDoc, a ) ) {
				return -1;
			}

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( b == document || b.ownerDocument == preferredDoc &&
				contains( preferredDoc, b ) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			return a == document ? -1 :
				b == document ? 1 :
				/* eslint-enable eqeqeq */
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( ( cur = cur.parentNode ) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( ( cur = cur.parentNode ) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[ i ] === bp[ i ] ) {
			i++;
		}

		return i ?

			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[ i ], bp[ i ] ) :

			// Otherwise nodes in our document sort first
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			ap[ i ] == preferredDoc ? -1 :
			bp[ i ] == preferredDoc ? 1 :
			/* eslint-enable eqeqeq */
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	setDocument( elem );

	if ( support.matchesSelector && documentIsHTML &&
		!nonnativeSelectorCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||

				// As well, disconnected nodes are said to be in a document
				// fragment in IE 9
				elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch ( e ) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( context.ownerDocument || context ) != document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( elem.ownerDocument || elem ) != document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],

		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			( val = elem.getAttributeNode( name ) ) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return ( sel + "" ).replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( ( elem = results[ i++ ] ) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {

		// If no nodeType, this is expected to be an array
		while ( ( node = elem[ i++ ] ) ) {

			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {

		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {

			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}

	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[ 1 ] = match[ 1 ].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[ 3 ] = ( match[ 3 ] || match[ 4 ] ||
				match[ 5 ] || "" ).replace( runescape, funescape );

			if ( match[ 2 ] === "~=" ) {
				match[ 3 ] = " " + match[ 3 ] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {

			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[ 1 ] = match[ 1 ].toLowerCase();

			if ( match[ 1 ].slice( 0, 3 ) === "nth" ) {

				// nth-* requires argument
				if ( !match[ 3 ] ) {
					Sizzle.error( match[ 0 ] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[ 4 ] = +( match[ 4 ] ?
					match[ 5 ] + ( match[ 6 ] || 1 ) :
					2 * ( match[ 3 ] === "even" || match[ 3 ] === "odd" ) );
				match[ 5 ] = +( ( match[ 7 ] + match[ 8 ] ) || match[ 3 ] === "odd" );

				// other types prohibit arguments
			} else if ( match[ 3 ] ) {
				Sizzle.error( match[ 0 ] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[ 6 ] && match[ 2 ];

			if ( matchExpr[ "CHILD" ].test( match[ 0 ] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[ 3 ] ) {
				match[ 2 ] = match[ 4 ] || match[ 5 ] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&

				// Get excess from tokenize (recursively)
				( excess = tokenize( unquoted, true ) ) &&

				// advance to the next closing parenthesis
				( excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length ) ) {

				// excess is a negative index
				match[ 0 ] = match[ 0 ].slice( 0, excess );
				match[ 2 ] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() {
					return true;
				} :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				( pattern = new RegExp( "(^|" + whitespace +
					")" + className + "(" + whitespace + "|$)" ) ) && classCache(
						className, function( elem ) {
							return pattern.test(
								typeof elem.className === "string" && elem.className ||
								typeof elem.getAttribute !== "undefined" &&
									elem.getAttribute( "class" ) ||
								""
							);
				} );
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				/* eslint-disable max-len */

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
				/* eslint-enable max-len */

			};
		},

		"CHILD": function( type, what, _argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, _context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( ( node = node[ dir ] ) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}

								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || ( node[ expando ] = {} );

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								( outerCache[ node.uniqueID ] = {} );

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( ( node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								( diff = nodeIndex = 0 ) || start.pop() ) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {

							// Use previously-cached element index if available
							if ( useCache ) {

								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || ( node[ expando ] = {} );

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									( outerCache[ node.uniqueID ] = {} );

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {

								// Use the same loop as above to seek `elem` from the start
								while ( ( node = ++nodeIndex && node && node[ dir ] ||
									( diff = nodeIndex = 0 ) || start.pop() ) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] ||
												( node[ expando ] = {} );

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												( outerCache[ node.uniqueID ] = {} );

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {

			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction( function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[ i ] );
							seed[ idx ] = !( matches[ idx ] = matched[ i ] );
						}
					} ) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {

		// Potentially complex pseudos
		"not": markFunction( function( selector ) {

			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction( function( seed, matches, _context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( ( elem = unmatched[ i ] ) ) {
							seed[ i ] = !( matches[ i ] = elem );
						}
					}
				} ) :
				function( elem, _context, xml ) {
					input[ 0 ] = elem;
					matcher( input, null, xml, results );

					// Don't keep the element (issue #299)
					input[ 0 ] = null;
					return !results.pop();
				};
		} ),

		"has": markFunction( function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		} ),

		"contains": markFunction( function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || getText( elem ) ).indexOf( text ) > -1;
			};
		} ),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {

			// lang value must be a valid identifier
			if ( !ridentifier.test( lang || "" ) ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( ( elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute( "xml:lang" ) || elem.getAttribute( "lang" ) ) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( ( elem = elem.parentNode ) && elem.nodeType === 1 );
				return false;
			};
		} ),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement &&
				( !document.hasFocus || document.hasFocus() ) &&
				!!( elem.type || elem.href || ~elem.tabIndex );
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {

			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return ( nodeName === "input" && !!elem.checked ) ||
				( nodeName === "option" && !!elem.selected );
		},

		"selected": function( elem ) {

			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				// eslint-disable-next-line no-unused-expressions
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {

			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos[ "empty" ]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( ( attr = elem.getAttribute( "type" ) ) == null ||
					attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo( function() {
			return [ 0 ];
		} ),

		"last": createPositionalPseudo( function( _matchIndexes, length ) {
			return [ length - 1 ];
		} ),

		"eq": createPositionalPseudo( function( _matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		} ),

		"even": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"odd": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"lt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ?
				argument + length :
				argument > length ?
					length :
					argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"gt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} )
	}
};

Expr.pseudos[ "nth" ] = Expr.pseudos[ "eq" ];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || ( match = rcomma.exec( soFar ) ) ) {
			if ( match ) {

				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[ 0 ].length ) || soFar;
			}
			groups.push( ( tokens = [] ) );
		}

		matched = false;

		// Combinators
		if ( ( match = rcombinators.exec( soFar ) ) ) {
			matched = match.shift();
			tokens.push( {
				value: matched,

				// Cast descendant combinators to space
				type: match[ 0 ].replace( rtrim, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( ( match = matchExpr[ type ].exec( soFar ) ) && ( !preFilters[ type ] ||
				( match = preFilters[ type ]( match ) ) ) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					type: type,
					matches: match
				} );
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :

			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[ i ].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?

		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( ( elem = elem[ dir ] ) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || ( elem[ expando ] = {} );

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] ||
							( outerCache[ elem.uniqueID ] = {} );

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( ( oldCache = uniqueCache[ key ] ) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return ( newCache[ 2 ] = oldCache[ 2 ] );
						} else {

							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( ( newCache[ 2 ] = matcher( elem, context, xml ) ) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[ i ]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[ 0 ];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[ i ], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( ( elem = unmatched[ i ] ) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction( function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts(
				selector || "*",
				context.nodeType ? [ context ] : context,
				[]
			),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?

				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( ( elem = temp[ i ] ) ) {
					matcherOut[ postMap[ i ] ] = !( matcherIn[ postMap[ i ] ] = elem );
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {

					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( ( elem = matcherOut[ i ] ) ) {

							// Restore matcherIn since elem is not yet a final match
							temp.push( ( matcherIn[ i ] = elem ) );
						}
					}
					postFinder( null, ( matcherOut = [] ), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( ( elem = matcherOut[ i ] ) &&
						( temp = postFinder ? indexOf( seed, elem ) : preMap[ i ] ) > -1 ) {

						seed[ temp ] = !( results[ temp ] = elem );
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	} );
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[ 0 ].type ],
		implicitRelative = leadingRelative || Expr.relative[ " " ],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				( checkContext = context ).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );

			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( ( matcher = Expr.relative[ tokens[ i ].type ] ) ) {
			matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
		} else {
			matcher = Expr.filter[ tokens[ i ].type ].apply( null, tokens[ i ].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {

				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[ j ].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(

					// If the preceding token was a descendant combinator, insert an implicit any-element `*`
					tokens
						.slice( 0, i - 1 )
						.concat( { value: tokens[ i - 2 ].type === " " ? "*" : "" } )
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( ( tokens = tokens.slice( j ) ) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,

				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find[ "TAG" ]( "*", outermost ),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = ( dirruns += contextBackup == null ? 1 : Math.random() || 0.1 ),
				len = elems.length;

			if ( outermost ) {

				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				outermostContext = context == document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && ( elem = elems[ i ] ) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;

					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
					// two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if ( !context && elem.ownerDocument != document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( ( matcher = elementMatchers[ j++ ] ) ) {
						if ( matcher( elem, context || document, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {

					// They will have gone through all possible matchers
					if ( ( elem = !matcher && elem ) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( ( matcher = setMatchers[ j++ ] ) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {

					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !( unmatched[ i ] || setMatched[ i ] ) ) {
								setMatched[ i ] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {

		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[ i ] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache(
			selector,
			matcherFromGroupMatchers( elementMatchers, setMatchers )
		);

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( ( selector = compiled.selector || selector ) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[ 0 ] = match[ 0 ].slice( 0 );
		if ( tokens.length > 2 && ( token = tokens[ 0 ] ).type === "ID" &&
			context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[ 1 ].type ] ) {

			context = ( Expr.find[ "ID" ]( token.matches[ 0 ]
				.replace( runescape, funescape ), context ) || [] )[ 0 ];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr[ "needsContext" ].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[ i ];

			// Abort if we hit a combinator
			if ( Expr.relative[ ( type = token.type ) ] ) {
				break;
			}
			if ( ( find = Expr.find[ type ] ) ) {

				// Search, expanding context for leading sibling combinators
				if ( ( seed = find(
					token.matches[ 0 ].replace( runescape, funescape ),
					rsibling.test( tokens[ 0 ].type ) && testContext( context.parentNode ) ||
						context
				) ) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split( "" ).sort( sortOrder ).join( "" ) === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert( function( el ) {

	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement( "fieldset" ) ) & 1;
} );

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert( function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute( "href" ) === "#";
} ) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	} );
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert( function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
} ) ) {
	addHandle( "value", function( elem, _name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	} );
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert( function( el ) {
	return el.getAttribute( "disabled" ) == null;
} ) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
				( val = elem.getAttributeNode( name ) ) && val.specified ?
					val.value :
					null;
		}
	} );
}

return Sizzle;

} )( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

	return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

}
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (trac-9521)
	// Strict HTML recognition (trac-11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, _i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, _i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, _i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( elem.contentDocument != null &&

			// Support: IE 11+
			// <object> elements with no `data` attribute has an object
			// `contentDocument` with a `null` prototype.
			getProto( elem.contentDocument ) ) {

			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( _i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the primary Deferred
			primary = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						primary.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, primary.done( updateFunc( i ) ).resolve, primary.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( primary.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return primary.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), primary.reject );
		}

		return primary.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See trac-6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, _key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( _all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (trac-9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see trac-8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (trac-14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



	var isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composed = { composed: true };

	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode( composed ) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached( elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = elem.nodeType &&
			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (trac-11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (trac-14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// Support: IE <=9 only
	// IE <=9 replaces <option> tags with their contents when inserted outside of
	// the select element.
	div.innerHTML = "<option></option>";
	support.option = !!div.lastChild;
} )();


// We have to close these tags to support XHTML (trac-13200)
var wrapMap = {

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: IE <=9 only
if ( !support.option ) {
	wrapMap.optgroup = wrapMap.option = [ 1, "<select multiple='multiple'>", "</select>" ];
}


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (trac-15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, attached, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (trac-12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		attached = isAttached( elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( attached ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 - 11+
// focus() and blur() are asynchronous, except when they are no-op.
// So expect focus to be synchronous when the element is already active,
// and blur to be synchronous when the element is not already active.
// (focus and blur are always synchronous in other supported browsers,
// this just defines when we can count on it).
function expectSync( elem, type ) {
	return ( elem === safeActiveElement() ) === ( type === "focus" );
}

// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Only attach events to objects that accept data
		if ( !acceptData( elem ) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = Object.create( null );
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( nativeEvent ),

			handlers = (
				dataPriv.get( this, "events" ) || Object.create( null )
			)[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// If the event is namespaced, then each handler is only invoked if it is
				// specially universal or its namespaces are a superset of the event's.
				if ( !event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (trac-13208)
				// Don't process clicks on disabled elements (trac-6911, trac-8165, trac-11382, trac-11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (trac-13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
						return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
						return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {

			// Utilize native event to ensure correct state for checkable inputs
			setup: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Claim the first handler
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					leverageNative( el, "click", returnTrue );
				}

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Force setup before triggering a click
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					leverageNative( el, "click" );
				}

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// For cross-browser consistency, suppress native .click() on links
			// Also prevent it if we're currently inside a leveraged native-event stack
			_default: function( event ) {
				var target = event.target;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( target, "click" ) ||
					nodeName( target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, expectSync ) {

	// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
	if ( !expectSync ) {
		if ( dataPriv.get( el, type ) === undefined ) {
			jQuery.event.add( el, type, returnTrue );
		}
		return;
	}

	// Register the controller as a special universal handler for all event namespaces
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		namespace: false,
		handler: function( event ) {
			var notAsync, result,
				saved = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrupt processing of the outer synthetic .trigger()ed event
				// Saved data should be false in such cases, but might be a leftover capture object
				// from an async native handler (gh-4350)
				if ( !saved.length ) {

					// Store arguments for use when handling the inner native event
					// There will always be at least one argument (an event object), so this array
					// will not be confused with a leftover capture object.
					saved = slice.call( arguments );
					dataPriv.set( this, type, saved );

					// Trigger the native event and capture its result
					// Support: IE <=9 - 11+
					// focus() and blur() are asynchronous
					notAsync = expectSync( this, type );
					this[ type ]();
					result = dataPriv.get( this, type );
					if ( saved !== result || notAsync ) {
						dataPriv.set( this, type, false );
					} else {
						result = {};
					}
					if ( saved !== result ) {

						// Cancel the outer synthetic event
						event.stopImmediatePropagation();
						event.preventDefault();

						// Support: Chrome 86+
						// In Chrome, if an element having a focusout handler is blurred by
						// clicking outside of it, it invokes the handler synchronously. If
						// that handler calls `.remove()` on the element, the data is cleared,
						// leaving `result` undefined. We need to guard against this.
						return result && result.value;
					}

				// If this is an inner synthetic event for an event with a bubbling surrogate
				// (focus or blur), assume that the surrogate already propagated from triggering the
				// native event and prevent that from happening again here.
				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
				// less bad than duplication.
				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
					event.stopPropagation();
				}

			// If this is a native event triggered above, everything is now in order
			// Fire an inner synthetic event with the original arguments
			} else if ( saved.length ) {

				// ...and capture the result
				dataPriv.set( this, type, {
					value: jQuery.event.trigger(

						// Support: IE <=9 - 11+
						// Extend with the prototype to reset the above stopImmediatePropagation()
						jQuery.extend( saved[ 0 ], jQuery.Event.prototype ),
						saved.slice( 1 ),
						this
					)
				} );

				// Abort handling of the native event
				event.stopImmediatePropagation();
			}
		}
	} );
}

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (trac-504, trac-13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	code: true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,
	which: true
}, jQuery.event.addProp );

jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {
	jQuery.event.special[ type ] = {

		// Utilize native event if possible so blur/focus sequence is correct
		setup: function() {

			// Claim the first handler
			// dataPriv.set( this, "focus", ... )
			// dataPriv.set( this, "blur", ... )
			leverageNative( this, type, expectSync );

			// Return false to allow normal processing in the caller
			return false;
		},
		trigger: function() {

			// Force setup before trigger
			leverageNative( this, type );

			// Return non-false to allow normal event-path propagation
			return true;
		},

		// Suppress native focus or blur if we're currently inside
		// a leveraged native-event stack
		_default: function( event ) {
			return dataPriv.get( event.target, type );
		},

		delegateType: delegateType
	};
} );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,

	rcleanScript = /^\s*<!\[CDATA\[|\]\]>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.get( src );
		events = pdataOld.events;

		if ( events ) {
			dataPriv.remove( dest, "handle events" );

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = flat( args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (trac-8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl && !node.noModule ) {
								jQuery._evalUrl( node.src, {
									nonce: node.nonce || node.getAttribute( "nonce" )
								}, doc );
							}
						} else {

							// Unwrap a CDATA section containing script contents. This shouldn't be
							// needed as in XML documents they're already not visible when
							// inspecting element contents and in HTML documents they have no
							// meaning but we're preserving that logic for backwards compatibility.
							// This will be removed completely in 4.0. See gh-4904.
							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && isAttached( node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html;
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = isAttached( elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var rcustomProp = /^--/;


var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (trac-15098, trac-14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.call( elem );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );

var whitespace = "[\\x20\\t\\r\\n\\f]";


var rtrimCSS = new RegExp(
	"^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$",
	"g"
);




( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		// Support: Chrome <=64
		// Don't get tricked when zoom affects offsetWidth (gh-4029)
		div.style.position = "absolute";
		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableTrDimensionsVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (trac-8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		},

		// Support: IE 9 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Behavior in IE 9 is more subtle than in newer versions & it passes
		// some versions of this test; make sure not to make it pass there!
		//
		// Support: Firefox 70+
		// Only Firefox includes border widths
		// in computed dimensions. (gh-4529)
		reliableTrDimensions: function() {
			var table, tr, trChild, trStyle;
			if ( reliableTrDimensionsVal == null ) {
				table = document.createElement( "table" );
				tr = document.createElement( "tr" );
				trChild = document.createElement( "div" );

				table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
				tr.style.cssText = "border:1px solid";

				// Support: Chrome 86+
				// Height set through cssText does not get applied.
				// Computed height then comes back as 0.
				tr.style.height = "1px";
				trChild.style.height = "9px";

				// Support: Android 8 Chrome 86+
				// In our bodyBackground.html iframe,
				// display for all div elements is set to "inline",
				// which causes a problem only in Android 8 Chrome 86.
				// Ensuring the div is display: block
				// gets around this issue.
				trChild.style.display = "block";

				documentElement
					.appendChild( table )
					.appendChild( tr )
					.appendChild( trChild );

				trStyle = window.getComputedStyle( tr );
				reliableTrDimensionsVal = ( parseInt( trStyle.height, 10 ) +
					parseInt( trStyle.borderTopWidth, 10 ) +
					parseInt( trStyle.borderBottomWidth, 10 ) ) === tr.offsetHeight;

				documentElement.removeChild( table );
			}
			return reliableTrDimensionsVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		isCustomProp = rcustomProp.test( name ),

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, trac-12537)
	//   .css('--customProperty) (gh-3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		// trim whitespace for custom property (issue gh-4926)
		if ( isCustomProp ) {

			// rtrim treats U+000D CARRIAGE RETURN and U+000C FORM FEED
			// as whitespace while CSS does not, but this is not a problem
			// because CSS preprocessing replaces them with U+000A LINE FEED
			// (which *is* CSS whitespace)
			// https://www.w3.org/TR/css-syntax-3/#input-preprocessing
			ret = ret.replace( rtrimCSS, "$1" );
		}

		if ( ret === "" && !isAttached( elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style,
	vendorProps = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name ) {

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName( name ) {
	var final = jQuery.cssProps[ name ] || vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	};

function setPositiveNumber( _elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5

		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
		// Use an explicit zero to avoid NaN (gh-3964)
		) ) || 0;
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),

		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
		// Fake content-box until we know it's needed to know the true value.
		boxSizingNeeded = !support.boxSizingReliable() || extra,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS( elem, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}


	// Support: IE 9 - 11 only
	// Use offsetWidth/offsetHeight for when box sizing is unreliable.
	// In those cases, the computed value can be trusted to be border-box.
	if ( ( !support.boxSizingReliable() && isBorderBox ||

		// Support: IE 10 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Interestingly, in some cases IE 9 doesn't suffer from this issue.
		!support.reliableTrDimensions() && nodeName( elem, "tr" ) ||

		// Fall back to offsetWidth/offsetHeight when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		val === "auto" ||

		// Support: Android <=4.1 - 4.3 only
		// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&

		// Make sure the element is visible & connected
		elem.getClientRects().length ) {

		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Where available, offsetWidth/offsetHeight approximate border box dimensions.
		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
		// retrieved value as a content box dimension.
		valueIsBorderBox = offsetProp in elem;
		if ( valueIsBorderBox ) {
			val = elem[ offsetProp ];
		}
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"gridArea": true,
		"gridColumn": true,
		"gridColumnEnd": true,
		"gridColumnStart": true,
		"gridRow": true,
		"gridRowEnd": true,
		"gridRowStart": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (trac-7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug trac-9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (trac-7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
			// "px" to a few hardcoded values.
			if ( type === "number" && !isCustomProp ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( _i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
					swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, dimension, extra );
					} ) :
					getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),

				// Only read styles.position if the test has a chance to fail
				// to avoid forcing a reflow.
				scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolute",

				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || extra,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra ?
					boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					) :
					0;

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && scrollboxSizeBuggy ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 && (
				jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

				/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (trac-12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
					animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};

		doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( _i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( _i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// Use proper attribute retrieval (trac-12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classNames, cur, curValue, className, i, finalValue;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classNames = classesToArray( value );

		if ( classNames.length ) {
			return this.each( function() {
				curValue = getClass( this );
				cur = this.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					for ( i = 0; i < classNames.length; i++ ) {
						className = classNames[ i ];
						if ( cur.indexOf( " " + className + " " ) < 0 ) {
							cur += className + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						this.setAttribute( "class", finalValue );
					}
				}
			} );
		}

		return this;
	},

	removeClass: function( value ) {
		var classNames, cur, curValue, className, i, finalValue;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classNames = classesToArray( value );

		if ( classNames.length ) {
			return this.each( function() {
				curValue = getClass( this );

				// This expression is here for better compressibility (see addClass)
				cur = this.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					for ( i = 0; i < classNames.length; i++ ) {
						className = classNames[ i ];

						// Remove *all* instances
						while ( cur.indexOf( " " + className + " " ) > -1 ) {
							cur = cur.replace( " " + className + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						this.setAttribute( "class", finalValue );
					}
				}
			} );
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var classNames, className, i, self,
			type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		classNames = classesToArray( value );

		return this.each( function() {
			if ( isValidValue ) {

				// Toggle individual class names
				self = jQuery( this );

				for ( i = 0; i < classNames.length; i++ ) {
					className = classNames[ i ];

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (trac-14686, trac-14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (trac-2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (trac-9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (trac-9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || Object.create( null ) )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (trac-6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {

				// Handle: regular nodes (via `this.ownerDocument`), window
				// (via `this.document`) & document (via `this`).
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = { guid: Date.now() };

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, parserErrorElem;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {}

	parserErrorElem = xml && xml.getElementsByTagName( "parsererror" )[ 0 ];
	if ( !xml || parserErrorElem ) {
		jQuery.error( "Invalid XML: " + (
			parserErrorElem ?
				jQuery.map( parserErrorElem.childNodes, function( el ) {
					return el.textContent;
				} ).join( "\n" ) :
				data
		) );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	if ( a == null ) {
		return "";
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} ).filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} ).map( function( _i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// trac-7653, trac-8125, trac-8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (trac-10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );

originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes trac-9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
									( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
										.concat( match[ 2 ] );
							}
						}
						match = responseHeaders[ key.toLowerCase() + " " ];
					}
					return match == null ? null : match.join( ", " );
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (trac-10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket trac-12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (trac-15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// trac-9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce.guid++ ) +
					uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Use a noop converter for missing script but not if jsonp
			if ( !isSuccess &&
				jQuery.inArray( "script", s.dataTypes ) > -1 &&
				jQuery.inArray( "json", s.dataTypes ) < 0 ) {
				s.converters[ "text script" ] = function() {};
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( _i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );

jQuery.ajaxPrefilter( function( s ) {
	var i;
	for ( i in s.headers ) {
		if ( i.toLowerCase() === "content-type" ) {
			s.contentType = s.headers[ i ] || "";
		}
	}
} );


jQuery._evalUrl = function( url, options, doc ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (trac-11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,

		// Only evaluate the response if it is successful (gh-4126)
		// dataFilter is not invoked for failure responses, so using it instead
		// of the default converter is kludgy but it works.
		converters: {
			"text script": function() {}
		},
		dataFilter: function( response ) {
			jQuery.globalEval( response, options, doc );
		}
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// trac-1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see trac-8605, trac-14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// trac-14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain or forced-by-attrs requests
	if ( s.crossDomain || s.scriptAttrs ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" )
					.attr( s.scriptAttrs || {} )
					.prop( { charset: s.scriptCharset, src: s.url } )
					.on( "load error", callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					} );

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce.guid++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( _i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( {
		padding: "inner" + name,
		content: type,
		"": "outer" + name
	}, function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( _i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );

jQuery.each(
	( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( _i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	}
);




// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
// Require that the "whitespace run" starts from a non-whitespace
// to avoid O(N^2) behavior when the engine would try matching "\s+$" at each space position.
var rtrim = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};

jQuery.trim = function( text ) {
	return text == null ?
		"" :
		( text + "" ).replace( rtrim, "$1" );
};



// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (trac-7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (trac-13566)
if ( typeof noGlobal === "undefined" ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );
/**
 * @popperjs/core v2.11.6 - MIT License
 */

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).Popper={})}(this,(function(e){"use strict";function t(e){if(null==e)return window;if("[object Window]"!==e.toString()){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function n(e){return e instanceof t(e).Element||e instanceof Element}function r(e){return e instanceof t(e).HTMLElement||e instanceof HTMLElement}function o(e){return"undefined"!=typeof ShadowRoot&&(e instanceof t(e).ShadowRoot||e instanceof ShadowRoot)}var i=Math.max,a=Math.min,s=Math.round;function f(){var e=navigator.userAgentData;return null!=e&&e.brands?e.brands.map((function(e){return e.brand+"/"+e.version})).join(" "):navigator.userAgent}function c(){return!/^((?!chrome|android).)*safari/i.test(f())}function p(e,o,i){void 0===o&&(o=!1),void 0===i&&(i=!1);var a=e.getBoundingClientRect(),f=1,p=1;o&&r(e)&&(f=e.offsetWidth>0&&s(a.width)/e.offsetWidth||1,p=e.offsetHeight>0&&s(a.height)/e.offsetHeight||1);var u=(n(e)?t(e):window).visualViewport,l=!c()&&i,d=(a.left+(l&&u?u.offsetLeft:0))/f,h=(a.top+(l&&u?u.offsetTop:0))/p,m=a.width/f,v=a.height/p;return{width:m,height:v,top:h,right:d+m,bottom:h+v,left:d,x:d,y:h}}function u(e){var n=t(e);return{scrollLeft:n.pageXOffset,scrollTop:n.pageYOffset}}function l(e){return e?(e.nodeName||"").toLowerCase():null}function d(e){return((n(e)?e.ownerDocument:e.document)||window.document).documentElement}function h(e){return p(d(e)).left+u(e).scrollLeft}function m(e){return t(e).getComputedStyle(e)}function v(e){var t=m(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function y(e,n,o){void 0===o&&(o=!1);var i,a,f=r(n),c=r(n)&&function(e){var t=e.getBoundingClientRect(),n=s(t.width)/e.offsetWidth||1,r=s(t.height)/e.offsetHeight||1;return 1!==n||1!==r}(n),m=d(n),y=p(e,c,o),g={scrollLeft:0,scrollTop:0},b={x:0,y:0};return(f||!f&&!o)&&(("body"!==l(n)||v(m))&&(g=(i=n)!==t(i)&&r(i)?{scrollLeft:(a=i).scrollLeft,scrollTop:a.scrollTop}:u(i)),r(n)?((b=p(n,!0)).x+=n.clientLeft,b.y+=n.clientTop):m&&(b.x=h(m))),{x:y.left+g.scrollLeft-b.x,y:y.top+g.scrollTop-b.y,width:y.width,height:y.height}}function g(e){var t=p(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function b(e){return"html"===l(e)?e:e.assignedSlot||e.parentNode||(o(e)?e.host:null)||d(e)}function w(e){return["html","body","#document"].indexOf(l(e))>=0?e.ownerDocument.body:r(e)&&v(e)?e:w(b(e))}function x(e,n){var r;void 0===n&&(n=[]);var o=w(e),i=o===(null==(r=e.ownerDocument)?void 0:r.body),a=t(o),s=i?[a].concat(a.visualViewport||[],v(o)?o:[]):o,f=n.concat(s);return i?f:f.concat(x(b(s)))}function O(e){return["table","td","th"].indexOf(l(e))>=0}function j(e){return r(e)&&"fixed"!==m(e).position?e.offsetParent:null}function E(e){for(var n=t(e),i=j(e);i&&O(i)&&"static"===m(i).position;)i=j(i);return i&&("html"===l(i)||"body"===l(i)&&"static"===m(i).position)?n:i||function(e){var t=/firefox/i.test(f());if(/Trident/i.test(f())&&r(e)&&"fixed"===m(e).position)return null;var n=b(e);for(o(n)&&(n=n.host);r(n)&&["html","body"].indexOf(l(n))<0;){var i=m(n);if("none"!==i.transform||"none"!==i.perspective||"paint"===i.contain||-1!==["transform","perspective"].indexOf(i.willChange)||t&&"filter"===i.willChange||t&&i.filter&&"none"!==i.filter)return n;n=n.parentNode}return null}(e)||n}var D="top",A="bottom",L="right",P="left",M="auto",k=[D,A,L,P],W="start",B="end",H="viewport",T="popper",R=k.reduce((function(e,t){return e.concat([t+"-"+W,t+"-"+B])}),[]),S=[].concat(k,[M]).reduce((function(e,t){return e.concat([t,t+"-"+W,t+"-"+B])}),[]),V=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"];function q(e){var t=new Map,n=new Set,r=[];function o(e){n.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach((function(e){if(!n.has(e)){var r=t.get(e);r&&o(r)}})),r.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){n.has(e.name)||o(e)})),r}function C(e){return e.split("-")[0]}function N(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&o(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function I(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function _(e,r,o){return r===H?I(function(e,n){var r=t(e),o=d(e),i=r.visualViewport,a=o.clientWidth,s=o.clientHeight,f=0,p=0;if(i){a=i.width,s=i.height;var u=c();(u||!u&&"fixed"===n)&&(f=i.offsetLeft,p=i.offsetTop)}return{width:a,height:s,x:f+h(e),y:p}}(e,o)):n(r)?function(e,t){var n=p(e,!1,"fixed"===t);return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}(r,o):I(function(e){var t,n=d(e),r=u(e),o=null==(t=e.ownerDocument)?void 0:t.body,a=i(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=i(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),f=-r.scrollLeft+h(e),c=-r.scrollTop;return"rtl"===m(o||n).direction&&(f+=i(n.clientWidth,o?o.clientWidth:0)-a),{width:a,height:s,x:f,y:c}}(d(e)))}function F(e,t,o,s){var f="clippingParents"===t?function(e){var t=x(b(e)),o=["absolute","fixed"].indexOf(m(e).position)>=0&&r(e)?E(e):e;return n(o)?t.filter((function(e){return n(e)&&N(e,o)&&"body"!==l(e)})):[]}(e):[].concat(t),c=[].concat(f,[o]),p=c[0],u=c.reduce((function(t,n){var r=_(e,n,s);return t.top=i(r.top,t.top),t.right=a(r.right,t.right),t.bottom=a(r.bottom,t.bottom),t.left=i(r.left,t.left),t}),_(e,p,s));return u.width=u.right-u.left,u.height=u.bottom-u.top,u.x=u.left,u.y=u.top,u}function U(e){return e.split("-")[1]}function z(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function X(e){var t,n=e.reference,r=e.element,o=e.placement,i=o?C(o):null,a=o?U(o):null,s=n.x+n.width/2-r.width/2,f=n.y+n.height/2-r.height/2;switch(i){case D:t={x:s,y:n.y-r.height};break;case A:t={x:s,y:n.y+n.height};break;case L:t={x:n.x+n.width,y:f};break;case P:t={x:n.x-r.width,y:f};break;default:t={x:n.x,y:n.y}}var c=i?z(i):null;if(null!=c){var p="y"===c?"height":"width";switch(a){case W:t[c]=t[c]-(n[p]/2-r[p]/2);break;case B:t[c]=t[c]+(n[p]/2-r[p]/2)}}return t}function Y(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},e)}function G(e,t){return t.reduce((function(t,n){return t[n]=e,t}),{})}function J(e,t){void 0===t&&(t={});var r=t,o=r.placement,i=void 0===o?e.placement:o,a=r.strategy,s=void 0===a?e.strategy:a,f=r.boundary,c=void 0===f?"clippingParents":f,u=r.rootBoundary,l=void 0===u?H:u,h=r.elementContext,m=void 0===h?T:h,v=r.altBoundary,y=void 0!==v&&v,g=r.padding,b=void 0===g?0:g,w=Y("number"!=typeof b?b:G(b,k)),x=m===T?"reference":T,O=e.rects.popper,j=e.elements[y?x:m],E=F(n(j)?j:j.contextElement||d(e.elements.popper),c,l,s),P=p(e.elements.reference),M=X({reference:P,element:O,strategy:"absolute",placement:i}),W=I(Object.assign({},O,M)),B=m===T?W:P,R={top:E.top-B.top+w.top,bottom:B.bottom-E.bottom+w.bottom,left:E.left-B.left+w.left,right:B.right-E.right+w.right},S=e.modifiersData.offset;if(m===T&&S){var V=S[i];Object.keys(R).forEach((function(e){var t=[L,A].indexOf(e)>=0?1:-1,n=[D,A].indexOf(e)>=0?"y":"x";R[e]+=V[n]*t}))}return R}var K={placement:"bottom",modifiers:[],strategy:"absolute"};function Q(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some((function(e){return!(e&&"function"==typeof e.getBoundingClientRect)}))}function Z(e){void 0===e&&(e={});var t=e,r=t.defaultModifiers,o=void 0===r?[]:r,i=t.defaultOptions,a=void 0===i?K:i;return function(e,t,r){void 0===r&&(r=a);var i,s,f={placement:"bottom",orderedModifiers:[],options:Object.assign({},K,a),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},c=[],p=!1,u={state:f,setOptions:function(r){var i="function"==typeof r?r(f.options):r;l(),f.options=Object.assign({},a,f.options,i),f.scrollParents={reference:n(e)?x(e):e.contextElement?x(e.contextElement):[],popper:x(t)};var s,p,d=function(e){var t=q(e);return V.reduce((function(e,n){return e.concat(t.filter((function(e){return e.phase===n})))}),[])}((s=[].concat(o,f.options.modifiers),p=s.reduce((function(e,t){var n=e[t.name];return e[t.name]=n?Object.assign({},n,t,{options:Object.assign({},n.options,t.options),data:Object.assign({},n.data,t.data)}):t,e}),{}),Object.keys(p).map((function(e){return p[e]}))));return f.orderedModifiers=d.filter((function(e){return e.enabled})),f.orderedModifiers.forEach((function(e){var t=e.name,n=e.options,r=void 0===n?{}:n,o=e.effect;if("function"==typeof o){var i=o({state:f,name:t,instance:u,options:r}),a=function(){};c.push(i||a)}})),u.update()},forceUpdate:function(){if(!p){var e=f.elements,t=e.reference,n=e.popper;if(Q(t,n)){f.rects={reference:y(t,E(n),"fixed"===f.options.strategy),popper:g(n)},f.reset=!1,f.placement=f.options.placement,f.orderedModifiers.forEach((function(e){return f.modifiersData[e.name]=Object.assign({},e.data)}));for(var r=0;r<f.orderedModifiers.length;r++)if(!0!==f.reset){var o=f.orderedModifiers[r],i=o.fn,a=o.options,s=void 0===a?{}:a,c=o.name;"function"==typeof i&&(f=i({state:f,options:s,name:c,instance:u})||f)}else f.reset=!1,r=-1}}},update:(i=function(){return new Promise((function(e){u.forceUpdate(),e(f)}))},function(){return s||(s=new Promise((function(e){Promise.resolve().then((function(){s=void 0,e(i())}))}))),s}),destroy:function(){l(),p=!0}};if(!Q(e,t))return u;function l(){c.forEach((function(e){return e()})),c=[]}return u.setOptions(r).then((function(e){!p&&r.onFirstUpdate&&r.onFirstUpdate(e)})),u}}var $={passive:!0};var ee={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var n=e.state,r=e.instance,o=e.options,i=o.scroll,a=void 0===i||i,s=o.resize,f=void 0===s||s,c=t(n.elements.popper),p=[].concat(n.scrollParents.reference,n.scrollParents.popper);return a&&p.forEach((function(e){e.addEventListener("scroll",r.update,$)})),f&&c.addEventListener("resize",r.update,$),function(){a&&p.forEach((function(e){e.removeEventListener("scroll",r.update,$)})),f&&c.removeEventListener("resize",r.update,$)}},data:{}};var te={name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,n=e.name;t.modifiersData[n]=X({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},ne={top:"auto",right:"auto",bottom:"auto",left:"auto"};function re(e){var n,r=e.popper,o=e.popperRect,i=e.placement,a=e.variation,f=e.offsets,c=e.position,p=e.gpuAcceleration,u=e.adaptive,l=e.roundOffsets,h=e.isFixed,v=f.x,y=void 0===v?0:v,g=f.y,b=void 0===g?0:g,w="function"==typeof l?l({x:y,y:b}):{x:y,y:b};y=w.x,b=w.y;var x=f.hasOwnProperty("x"),O=f.hasOwnProperty("y"),j=P,M=D,k=window;if(u){var W=E(r),H="clientHeight",T="clientWidth";if(W===t(r)&&"static"!==m(W=d(r)).position&&"absolute"===c&&(H="scrollHeight",T="scrollWidth"),W=W,i===D||(i===P||i===L)&&a===B)M=A,b-=(h&&W===k&&k.visualViewport?k.visualViewport.height:W[H])-o.height,b*=p?1:-1;if(i===P||(i===D||i===A)&&a===B)j=L,y-=(h&&W===k&&k.visualViewport?k.visualViewport.width:W[T])-o.width,y*=p?1:-1}var R,S=Object.assign({position:c},u&&ne),V=!0===l?function(e){var t=e.x,n=e.y,r=window.devicePixelRatio||1;return{x:s(t*r)/r||0,y:s(n*r)/r||0}}({x:y,y:b}):{x:y,y:b};return y=V.x,b=V.y,p?Object.assign({},S,((R={})[M]=O?"0":"",R[j]=x?"0":"",R.transform=(k.devicePixelRatio||1)<=1?"translate("+y+"px, "+b+"px)":"translate3d("+y+"px, "+b+"px, 0)",R)):Object.assign({},S,((n={})[M]=O?b+"px":"",n[j]=x?y+"px":"",n.transform="",n))}var oe={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=void 0===r||r,i=n.adaptive,a=void 0===i||i,s=n.roundOffsets,f=void 0===s||s,c={placement:C(t.placement),variation:U(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:"fixed"===t.options.strategy};null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,re(Object.assign({},c,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:f})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,re(Object.assign({},c,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:f})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}};var ie={name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state;Object.keys(t.elements).forEach((function(e){var n=t.styles[e]||{},o=t.attributes[e]||{},i=t.elements[e];r(i)&&l(i)&&(Object.assign(i.style,n),Object.keys(o).forEach((function(e){var t=o[e];!1===t?i.removeAttribute(e):i.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach((function(e){var o=t.elements[e],i=t.attributes[e]||{},a=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]).reduce((function(e,t){return e[t]="",e}),{});r(o)&&l(o)&&(Object.assign(o.style,a),Object.keys(i).forEach((function(e){o.removeAttribute(e)})))}))}},requires:["computeStyles"]};var ae={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=void 0===o?[0,0]:o,a=S.reduce((function(e,n){return e[n]=function(e,t,n){var r=C(e),o=[P,D].indexOf(r)>=0?-1:1,i="function"==typeof n?n(Object.assign({},t,{placement:e})):n,a=i[0],s=i[1];return a=a||0,s=(s||0)*o,[P,L].indexOf(r)>=0?{x:s,y:a}:{x:a,y:s}}(n,t.rects,i),e}),{}),s=a[t.placement],f=s.x,c=s.y;null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=f,t.modifiersData.popperOffsets.y+=c),t.modifiersData[r]=a}},se={left:"right",right:"left",bottom:"top",top:"bottom"};function fe(e){return e.replace(/left|right|bottom|top/g,(function(e){return se[e]}))}var ce={start:"end",end:"start"};function pe(e){return e.replace(/start|end/g,(function(e){return ce[e]}))}function ue(e,t){void 0===t&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,a=n.padding,s=n.flipVariations,f=n.allowedAutoPlacements,c=void 0===f?S:f,p=U(r),u=p?s?R:R.filter((function(e){return U(e)===p})):k,l=u.filter((function(e){return c.indexOf(e)>=0}));0===l.length&&(l=u);var d=l.reduce((function(t,n){return t[n]=J(e,{placement:n,boundary:o,rootBoundary:i,padding:a})[C(n)],t}),{});return Object.keys(d).sort((function(e,t){return d[e]-d[t]}))}var le={name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=void 0===o||o,a=n.altAxis,s=void 0===a||a,f=n.fallbackPlacements,c=n.padding,p=n.boundary,u=n.rootBoundary,l=n.altBoundary,d=n.flipVariations,h=void 0===d||d,m=n.allowedAutoPlacements,v=t.options.placement,y=C(v),g=f||(y===v||!h?[fe(v)]:function(e){if(C(e)===M)return[];var t=fe(e);return[pe(e),t,pe(t)]}(v)),b=[v].concat(g).reduce((function(e,n){return e.concat(C(n)===M?ue(t,{placement:n,boundary:p,rootBoundary:u,padding:c,flipVariations:h,allowedAutoPlacements:m}):n)}),[]),w=t.rects.reference,x=t.rects.popper,O=new Map,j=!0,E=b[0],k=0;k<b.length;k++){var B=b[k],H=C(B),T=U(B)===W,R=[D,A].indexOf(H)>=0,S=R?"width":"height",V=J(t,{placement:B,boundary:p,rootBoundary:u,altBoundary:l,padding:c}),q=R?T?L:P:T?A:D;w[S]>x[S]&&(q=fe(q));var N=fe(q),I=[];if(i&&I.push(V[H]<=0),s&&I.push(V[q]<=0,V[N]<=0),I.every((function(e){return e}))){E=B,j=!1;break}O.set(B,I)}if(j)for(var _=function(e){var t=b.find((function(t){var n=O.get(t);if(n)return n.slice(0,e).every((function(e){return e}))}));if(t)return E=t,"break"},F=h?3:1;F>0;F--){if("break"===_(F))break}t.placement!==E&&(t.modifiersData[r]._skip=!0,t.placement=E,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}};function de(e,t,n){return i(e,a(t,n))}var he={name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,s=void 0===o||o,f=n.altAxis,c=void 0!==f&&f,p=n.boundary,u=n.rootBoundary,l=n.altBoundary,d=n.padding,h=n.tether,m=void 0===h||h,v=n.tetherOffset,y=void 0===v?0:v,b=J(t,{boundary:p,rootBoundary:u,padding:d,altBoundary:l}),w=C(t.placement),x=U(t.placement),O=!x,j=z(w),M="x"===j?"y":"x",k=t.modifiersData.popperOffsets,B=t.rects.reference,H=t.rects.popper,T="function"==typeof y?y(Object.assign({},t.rects,{placement:t.placement})):y,R="number"==typeof T?{mainAxis:T,altAxis:T}:Object.assign({mainAxis:0,altAxis:0},T),S=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,V={x:0,y:0};if(k){if(s){var q,N="y"===j?D:P,I="y"===j?A:L,_="y"===j?"height":"width",F=k[j],X=F+b[N],Y=F-b[I],G=m?-H[_]/2:0,K=x===W?B[_]:H[_],Q=x===W?-H[_]:-B[_],Z=t.elements.arrow,$=m&&Z?g(Z):{width:0,height:0},ee=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},te=ee[N],ne=ee[I],re=de(0,B[_],$[_]),oe=O?B[_]/2-G-re-te-R.mainAxis:K-re-te-R.mainAxis,ie=O?-B[_]/2+G+re+ne+R.mainAxis:Q+re+ne+R.mainAxis,ae=t.elements.arrow&&E(t.elements.arrow),se=ae?"y"===j?ae.clientTop||0:ae.clientLeft||0:0,fe=null!=(q=null==S?void 0:S[j])?q:0,ce=F+ie-fe,pe=de(m?a(X,F+oe-fe-se):X,F,m?i(Y,ce):Y);k[j]=pe,V[j]=pe-F}if(c){var ue,le="x"===j?D:P,he="x"===j?A:L,me=k[M],ve="y"===M?"height":"width",ye=me+b[le],ge=me-b[he],be=-1!==[D,P].indexOf(w),we=null!=(ue=null==S?void 0:S[M])?ue:0,xe=be?ye:me-B[ve]-H[ve]-we+R.altAxis,Oe=be?me+B[ve]+H[ve]-we-R.altAxis:ge,je=m&&be?function(e,t,n){var r=de(e,t,n);return r>n?n:r}(xe,me,Oe):de(m?xe:ye,me,m?Oe:ge);k[M]=je,V[M]=je-me}t.modifiersData[r]=V}},requiresIfExists:["offset"]};var me={name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,a=n.modifiersData.popperOffsets,s=C(n.placement),f=z(s),c=[P,L].indexOf(s)>=0?"height":"width";if(i&&a){var p=function(e,t){return Y("number"!=typeof(e="function"==typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e)?e:G(e,k))}(o.padding,n),u=g(i),l="y"===f?D:P,d="y"===f?A:L,h=n.rects.reference[c]+n.rects.reference[f]-a[f]-n.rects.popper[c],m=a[f]-n.rects.reference[f],v=E(i),y=v?"y"===f?v.clientHeight||0:v.clientWidth||0:0,b=h/2-m/2,w=p[l],x=y-u[c]-p[d],O=y/2-u[c]/2+b,j=de(w,O,x),M=f;n.modifiersData[r]=((t={})[M]=j,t.centerOffset=j-O,t)}},effect:function(e){var t=e.state,n=e.options.element,r=void 0===n?"[data-popper-arrow]":n;null!=r&&("string"!=typeof r||(r=t.elements.popper.querySelector(r)))&&N(t.elements.popper,r)&&(t.elements.arrow=r)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function ve(e,t,n){return void 0===n&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function ye(e){return[D,L,A,P].some((function(t){return e[t]>=0}))}var ge={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,a=J(t,{elementContext:"reference"}),s=J(t,{altBoundary:!0}),f=ve(a,r),c=ve(s,o,i),p=ye(f),u=ye(c);t.modifiersData[n]={referenceClippingOffsets:f,popperEscapeOffsets:c,isReferenceHidden:p,hasPopperEscaped:u},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":p,"data-popper-escaped":u})}},be=Z({defaultModifiers:[ee,te,oe,ie]}),we=[ee,te,oe,ie,ae,le,he,me,ge],xe=Z({defaultModifiers:we});e.applyStyles=ie,e.arrow=me,e.computeStyles=oe,e.createPopper=xe,e.createPopperLite=be,e.defaultModifiers=we,e.detectOverflow=J,e.eventListeners=ee,e.flip=le,e.hide=ge,e.offset=ae,e.popperGenerator=Z,e.popperOffsets=te,e.preventOverflow=he,Object.defineProperty(e,"__esModule",{value:!0})}));
/*!
  * Bootstrap v5.2.3 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@popperjs/core')) :
  typeof define === 'function' && define.amd ? define(['@popperjs/core'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.bootstrap = factory(global.Popper));
})(this, (function (Popper) { 'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
    if (e) {
      for (const k in e) {
        if (k !== 'default') {
          const d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: () => e[k]
          });
        }
      }
    }
    n.default = e;
    return Object.freeze(n);
  }

  const Popper__namespace = /*#__PURE__*/_interopNamespace(Popper);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  const MAX_UID = 1000000;
  const MILLISECONDS_MULTIPLIER = 1000;
  const TRANSITION_END = 'transitionend'; // Shout-out Angus Croll (https://goo.gl/pxwQGp)

  const toType = object => {
    if (object === null || object === undefined) {
      return `${object}`;
    }

    return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
  };
  /**
   * Public Util API
   */


  const getUID = prefix => {
    do {
      prefix += Math.floor(Math.random() * MAX_UID);
    } while (document.getElementById(prefix));

    return prefix;
  };

  const getSelector = element => {
    let selector = element.getAttribute('data-bs-target');

    if (!selector || selector === '#') {
      let hrefAttribute = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
      // `document.querySelector` will rightfully complain it is invalid.
      // See https://github.com/twbs/bootstrap/issues/32273

      if (!hrefAttribute || !hrefAttribute.includes('#') && !hrefAttribute.startsWith('.')) {
        return null;
      } // Just in case some CMS puts out a full URL with the anchor appended


      if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
        hrefAttribute = `#${hrefAttribute.split('#')[1]}`;
      }

      selector = hrefAttribute && hrefAttribute !== '#' ? hrefAttribute.trim() : null;
    }

    return selector;
  };

  const getSelectorFromElement = element => {
    const selector = getSelector(element);

    if (selector) {
      return document.querySelector(selector) ? selector : null;
    }

    return null;
  };

  const getElementFromSelector = element => {
    const selector = getSelector(element);
    return selector ? document.querySelector(selector) : null;
  };

  const getTransitionDurationFromElement = element => {
    if (!element) {
      return 0;
    } // Get transition-duration of the element


    let {
      transitionDuration,
      transitionDelay
    } = window.getComputedStyle(element);
    const floatTransitionDuration = Number.parseFloat(transitionDuration);
    const floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    } // If multiple durations are defined, take the first


    transitionDuration = transitionDuration.split(',')[0];
    transitionDelay = transitionDelay.split(',')[0];
    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
  };

  const triggerTransitionEnd = element => {
    element.dispatchEvent(new Event(TRANSITION_END));
  };

  const isElement = object => {
    if (!object || typeof object !== 'object') {
      return false;
    }

    if (typeof object.jquery !== 'undefined') {
      object = object[0];
    }

    return typeof object.nodeType !== 'undefined';
  };

  const getElement = object => {
    // it's a jQuery object or a node element
    if (isElement(object)) {
      return object.jquery ? object[0] : object;
    }

    if (typeof object === 'string' && object.length > 0) {
      return document.querySelector(object);
    }

    return null;
  };

  const isVisible = element => {
    if (!isElement(element) || element.getClientRects().length === 0) {
      return false;
    }

    const elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible'; // Handle `details` element as its content may falsie appear visible when it is closed

    const closedDetails = element.closest('details:not([open])');

    if (!closedDetails) {
      return elementIsVisible;
    }

    if (closedDetails !== element) {
      const summary = element.closest('summary');

      if (summary && summary.parentNode !== closedDetails) {
        return false;
      }

      if (summary === null) {
        return false;
      }
    }

    return elementIsVisible;
  };

  const isDisabled = element => {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      return true;
    }

    if (element.classList.contains('disabled')) {
      return true;
    }

    if (typeof element.disabled !== 'undefined') {
      return element.disabled;
    }

    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
  };

  const findShadowRoot = element => {
    if (!document.documentElement.attachShadow) {
      return null;
    } // Can find the shadow root otherwise it'll return the document


    if (typeof element.getRootNode === 'function') {
      const root = element.getRootNode();
      return root instanceof ShadowRoot ? root : null;
    }

    if (element instanceof ShadowRoot) {
      return element;
    } // when we don't find a shadow root


    if (!element.parentNode) {
      return null;
    }

    return findShadowRoot(element.parentNode);
  };

  const noop = () => {};
  /**
   * Trick to restart an element's animation
   *
   * @param {HTMLElement} element
   * @return void
   *
   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
   */


  const reflow = element => {
    element.offsetHeight; // eslint-disable-line no-unused-expressions
  };

  const getjQuery = () => {
    if (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
      return window.jQuery;
    }

    return null;
  };

  const DOMContentLoadedCallbacks = [];

  const onDOMContentLoaded = callback => {
    if (document.readyState === 'loading') {
      // add listener on the first call when the document is in loading state
      if (!DOMContentLoadedCallbacks.length) {
        document.addEventListener('DOMContentLoaded', () => {
          for (const callback of DOMContentLoadedCallbacks) {
            callback();
          }
        });
      }

      DOMContentLoadedCallbacks.push(callback);
    } else {
      callback();
    }
  };

  const isRTL = () => document.documentElement.dir === 'rtl';

  const defineJQueryPlugin = plugin => {
    onDOMContentLoaded(() => {
      const $ = getjQuery();
      /* istanbul ignore if */

      if ($) {
        const name = plugin.NAME;
        const JQUERY_NO_CONFLICT = $.fn[name];
        $.fn[name] = plugin.jQueryInterface;
        $.fn[name].Constructor = plugin;

        $.fn[name].noConflict = () => {
          $.fn[name] = JQUERY_NO_CONFLICT;
          return plugin.jQueryInterface;
        };
      }
    });
  };

  const execute = callback => {
    if (typeof callback === 'function') {
      callback();
    }
  };

  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
    if (!waitForTransition) {
      execute(callback);
      return;
    }

    const durationPadding = 5;
    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
    let called = false;

    const handler = ({
      target
    }) => {
      if (target !== transitionElement) {
        return;
      }

      called = true;
      transitionElement.removeEventListener(TRANSITION_END, handler);
      execute(callback);
    };

    transitionElement.addEventListener(TRANSITION_END, handler);
    setTimeout(() => {
      if (!called) {
        triggerTransitionEnd(transitionElement);
      }
    }, emulatedDuration);
  };
  /**
   * Return the previous/next element of a list.
   *
   * @param {array} list    The list of elements
   * @param activeElement   The active element
   * @param shouldGetNext   Choose to get next or previous element
   * @param isCycleAllowed
   * @return {Element|elem} The proper element
   */


  const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
    const listLength = list.length;
    let index = list.indexOf(activeElement); // if the element does not exist in the list return an element
    // depending on the direction and if cycle is allowed

    if (index === -1) {
      return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
    }

    index += shouldGetNext ? 1 : -1;

    if (isCycleAllowed) {
      index = (index + listLength) % listLength;
    }

    return list[Math.max(0, Math.min(index, listLength - 1))];
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): dom/event-handler.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
  const stripNameRegex = /\..*/;
  const stripUidRegex = /::\d+$/;
  const eventRegistry = {}; // Events storage

  let uidEvent = 1;
  const customEvents = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  };
  const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
  /**
   * Private methods
   */

  function makeEventUid(element, uid) {
    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
  }

  function getElementEvents(element) {
    const uid = makeEventUid(element);
    element.uidEvent = uid;
    eventRegistry[uid] = eventRegistry[uid] || {};
    return eventRegistry[uid];
  }

  function bootstrapHandler(element, fn) {
    return function handler(event) {
      hydrateObj(event, {
        delegateTarget: element
      });

      if (handler.oneOff) {
        EventHandler.off(element, event.type, fn);
      }

      return fn.apply(element, [event]);
    };
  }

  function bootstrapDelegationHandler(element, selector, fn) {
    return function handler(event) {
      const domElements = element.querySelectorAll(selector);

      for (let {
        target
      } = event; target && target !== this; target = target.parentNode) {
        for (const domElement of domElements) {
          if (domElement !== target) {
            continue;
          }

          hydrateObj(event, {
            delegateTarget: target
          });

          if (handler.oneOff) {
            EventHandler.off(element, event.type, selector, fn);
          }

          return fn.apply(target, [event]);
        }
      }
    };
  }

  function findHandler(events, callable, delegationSelector = null) {
    return Object.values(events).find(event => event.callable === callable && event.delegationSelector === delegationSelector);
  }

  function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
    const isDelegated = typeof handler === 'string'; // todo: tooltip passes `false` instead of selector, so we need to check

    const callable = isDelegated ? delegationFunction : handler || delegationFunction;
    let typeEvent = getTypeEvent(originalTypeEvent);

    if (!nativeEvents.has(typeEvent)) {
      typeEvent = originalTypeEvent;
    }

    return [isDelegated, callable, typeEvent];
  }

  function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return;
    }

    let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction); // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
    // this prevents the handler from being dispatched the same way as mouseover or mouseout does

    if (originalTypeEvent in customEvents) {
      const wrapFunction = fn => {
        return function (event) {
          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
            return fn.call(this, event);
          }
        };
      };

      callable = wrapFunction(callable);
    }

    const events = getElementEvents(element);
    const handlers = events[typeEvent] || (events[typeEvent] = {});
    const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);

    if (previousFunction) {
      previousFunction.oneOff = previousFunction.oneOff && oneOff;
      return;
    }

    const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ''));
    const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
    fn.delegationSelector = isDelegated ? handler : null;
    fn.callable = callable;
    fn.oneOff = oneOff;
    fn.uidEvent = uid;
    handlers[uid] = fn;
    element.addEventListener(typeEvent, fn, isDelegated);
  }

  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    const fn = findHandler(events[typeEvent], handler, delegationSelector);

    if (!fn) {
      return;
    }

    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
    delete events[typeEvent][fn.uidEvent];
  }

  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    const storeElementEvent = events[typeEvent] || {};

    for (const handlerKey of Object.keys(storeElementEvent)) {
      if (handlerKey.includes(namespace)) {
        const event = storeElementEvent[handlerKey];
        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
      }
    }
  }

  function getTypeEvent(event) {
    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
    event = event.replace(stripNameRegex, '');
    return customEvents[event] || event;
  }

  const EventHandler = {
    on(element, event, handler, delegationFunction) {
      addHandler(element, event, handler, delegationFunction, false);
    },

    one(element, event, handler, delegationFunction) {
      addHandler(element, event, handler, delegationFunction, true);
    },

    off(element, originalTypeEvent, handler, delegationFunction) {
      if (typeof originalTypeEvent !== 'string' || !element) {
        return;
      }

      const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
      const inNamespace = typeEvent !== originalTypeEvent;
      const events = getElementEvents(element);
      const storeElementEvent = events[typeEvent] || {};
      const isNamespace = originalTypeEvent.startsWith('.');

      if (typeof callable !== 'undefined') {
        // Simplest case: handler is passed, remove that listener ONLY.
        if (!Object.keys(storeElementEvent).length) {
          return;
        }

        removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
        return;
      }

      if (isNamespace) {
        for (const elementEvent of Object.keys(events)) {
          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
        }
      }

      for (const keyHandlers of Object.keys(storeElementEvent)) {
        const handlerKey = keyHandlers.replace(stripUidRegex, '');

        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
          const event = storeElementEvent[keyHandlers];
          removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
        }
      }
    },

    trigger(element, event, args) {
      if (typeof event !== 'string' || !element) {
        return null;
      }

      const $ = getjQuery();
      const typeEvent = getTypeEvent(event);
      const inNamespace = event !== typeEvent;
      let jQueryEvent = null;
      let bubbles = true;
      let nativeDispatch = true;
      let defaultPrevented = false;

      if (inNamespace && $) {
        jQueryEvent = $.Event(event, args);
        $(element).trigger(jQueryEvent);
        bubbles = !jQueryEvent.isPropagationStopped();
        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
        defaultPrevented = jQueryEvent.isDefaultPrevented();
      }

      let evt = new Event(event, {
        bubbles,
        cancelable: true
      });
      evt = hydrateObj(evt, args);

      if (defaultPrevented) {
        evt.preventDefault();
      }

      if (nativeDispatch) {
        element.dispatchEvent(evt);
      }

      if (evt.defaultPrevented && jQueryEvent) {
        jQueryEvent.preventDefault();
      }

      return evt;
    }

  };

  function hydrateObj(obj, meta) {
    for (const [key, value] of Object.entries(meta || {})) {
      try {
        obj[key] = value;
      } catch (_unused) {
        Object.defineProperty(obj, key, {
          configurable: true,

          get() {
            return value;
          }

        });
      }
    }

    return obj;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): dom/data.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * Constants
   */
  const elementMap = new Map();
  const Data = {
    set(element, key, instance) {
      if (!elementMap.has(element)) {
        elementMap.set(element, new Map());
      }

      const instanceMap = elementMap.get(element); // make it clear we only want one instance per element
      // can be removed later when multiple key/instances are fine to be used

      if (!instanceMap.has(key) && instanceMap.size !== 0) {
        // eslint-disable-next-line no-console
        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
        return;
      }

      instanceMap.set(key, instance);
    },

    get(element, key) {
      if (elementMap.has(element)) {
        return elementMap.get(element).get(key) || null;
      }

      return null;
    },

    remove(element, key) {
      if (!elementMap.has(element)) {
        return;
      }

      const instanceMap = elementMap.get(element);
      instanceMap.delete(key); // free up element references if there are no instances left for an element

      if (instanceMap.size === 0) {
        elementMap.delete(element);
      }
    }

  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): dom/manipulator.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  function normalizeData(value) {
    if (value === 'true') {
      return true;
    }

    if (value === 'false') {
      return false;
    }

    if (value === Number(value).toString()) {
      return Number(value);
    }

    if (value === '' || value === 'null') {
      return null;
    }

    if (typeof value !== 'string') {
      return value;
    }

    try {
      return JSON.parse(decodeURIComponent(value));
    } catch (_unused) {
      return value;
    }
  }

  function normalizeDataKey(key) {
    return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
  }

  const Manipulator = {
    setDataAttribute(element, key, value) {
      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
    },

    removeDataAttribute(element, key) {
      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
    },

    getDataAttributes(element) {
      if (!element) {
        return {};
      }

      const attributes = {};
      const bsKeys = Object.keys(element.dataset).filter(key => key.startsWith('bs') && !key.startsWith('bsConfig'));

      for (const key of bsKeys) {
        let pureKey = key.replace(/^bs/, '');
        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
        attributes[pureKey] = normalizeData(element.dataset[key]);
      }

      return attributes;
    },

    getDataAttribute(element, key) {
      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
    }

  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): util/config.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Class definition
   */

  class Config {
    // Getters
    static get Default() {
      return {};
    }

    static get DefaultType() {
      return {};
    }

    static get NAME() {
      throw new Error('You have to implement the static method "NAME", for each component!');
    }

    _getConfig(config) {
      config = this._mergeConfigObj(config);
      config = this._configAfterMerge(config);

      this._typeCheckConfig(config);

      return config;
    }

    _configAfterMerge(config) {
      return config;
    }

    _mergeConfigObj(config, element) {
      const jsonConfig = isElement(element) ? Manipulator.getDataAttribute(element, 'config') : {}; // try to parse

      return { ...this.constructor.Default,
        ...(typeof jsonConfig === 'object' ? jsonConfig : {}),
        ...(isElement(element) ? Manipulator.getDataAttributes(element) : {}),
        ...(typeof config === 'object' ? config : {})
      };
    }

    _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
      for (const property of Object.keys(configTypes)) {
        const expectedTypes = configTypes[property];
        const value = config[property];
        const valueType = isElement(value) ? 'element' : toType(value);

        if (!new RegExp(expectedTypes).test(valueType)) {
          throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
        }
      }
    }

  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): base-component.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const VERSION = '5.2.3';
  /**
   * Class definition
   */

  class BaseComponent extends Config {
    constructor(element, config) {
      super();
      element = getElement(element);

      if (!element) {
        return;
      }

      this._element = element;
      this._config = this._getConfig(config);
      Data.set(this._element, this.constructor.DATA_KEY, this);
    } // Public


    dispose() {
      Data.remove(this._element, this.constructor.DATA_KEY);
      EventHandler.off(this._element, this.constructor.EVENT_KEY);

      for (const propertyName of Object.getOwnPropertyNames(this)) {
        this[propertyName] = null;
      }
    }

    _queueCallback(callback, element, isAnimated = true) {
      executeAfterTransition(callback, element, isAnimated);
    }

    _getConfig(config) {
      config = this._mergeConfigObj(config, this._element);
      config = this._configAfterMerge(config);

      this._typeCheckConfig(config);

      return config;
    } // Static


    static getInstance(element) {
      return Data.get(getElement(element), this.DATA_KEY);
    }

    static getOrCreateInstance(element, config = {}) {
      return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
    }

    static get VERSION() {
      return VERSION;
    }

    static get DATA_KEY() {
      return `bs.${this.NAME}`;
    }

    static get EVENT_KEY() {
      return `.${this.DATA_KEY}`;
    }

    static eventName(name) {
      return `${name}${this.EVENT_KEY}`;
    }

  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): util/component-functions.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  const enableDismissTrigger = (component, method = 'hide') => {
    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
    const name = component.NAME;
    EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
      if (['A', 'AREA'].includes(this.tagName)) {
        event.preventDefault();
      }

      if (isDisabled(this)) {
        return;
      }

      const target = getElementFromSelector(this) || this.closest(`.${name}`);
      const instance = component.getOrCreateInstance(target); // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method

      instance[method]();
    });
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$f = 'alert';
  const DATA_KEY$a = 'bs.alert';
  const EVENT_KEY$b = `.${DATA_KEY$a}`;
  const EVENT_CLOSE = `close${EVENT_KEY$b}`;
  const EVENT_CLOSED = `closed${EVENT_KEY$b}`;
  const CLASS_NAME_FADE$5 = 'fade';
  const CLASS_NAME_SHOW$8 = 'show';
  /**
   * Class definition
   */

  class Alert extends BaseComponent {
    // Getters
    static get NAME() {
      return NAME$f;
    } // Public


    close() {
      const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);

      if (closeEvent.defaultPrevented) {
        return;
      }

      this._element.classList.remove(CLASS_NAME_SHOW$8);

      const isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);

      this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
    } // Private


    _destroyElement() {
      this._element.remove();

      EventHandler.trigger(this._element, EVENT_CLOSED);
      this.dispose();
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Alert.getOrCreateInstance(this);

        if (typeof config !== 'string') {
          return;
        }

        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config](this);
      });
    }

  }
  /**
   * Data API implementation
   */


  enableDismissTrigger(Alert, 'close');
  /**
   * jQuery
   */

  defineJQueryPlugin(Alert);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$e = 'button';
  const DATA_KEY$9 = 'bs.button';
  const EVENT_KEY$a = `.${DATA_KEY$9}`;
  const DATA_API_KEY$6 = '.data-api';
  const CLASS_NAME_ACTIVE$3 = 'active';
  const SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
  const EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$a}${DATA_API_KEY$6}`;
  /**
   * Class definition
   */

  class Button extends BaseComponent {
    // Getters
    static get NAME() {
      return NAME$e;
    } // Public


    toggle() {
      // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
      this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Button.getOrCreateInstance(this);

        if (config === 'toggle') {
          data[config]();
        }
      });
    }

  }
  /**
   * Data API implementation
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, event => {
    event.preventDefault();
    const button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
    const data = Button.getOrCreateInstance(button);
    data.toggle();
  });
  /**
   * jQuery
   */

  defineJQueryPlugin(Button);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): dom/selector-engine.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const SelectorEngine = {
    find(selector, element = document.documentElement) {
      return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
    },

    findOne(selector, element = document.documentElement) {
      return Element.prototype.querySelector.call(element, selector);
    },

    children(element, selector) {
      return [].concat(...element.children).filter(child => child.matches(selector));
    },

    parents(element, selector) {
      const parents = [];
      let ancestor = element.parentNode.closest(selector);

      while (ancestor) {
        parents.push(ancestor);
        ancestor = ancestor.parentNode.closest(selector);
      }

      return parents;
    },

    prev(element, selector) {
      let previous = element.previousElementSibling;

      while (previous) {
        if (previous.matches(selector)) {
          return [previous];
        }

        previous = previous.previousElementSibling;
      }

      return [];
    },

    // TODO: this is now unused; remove later along with prev()
    next(element, selector) {
      let next = element.nextElementSibling;

      while (next) {
        if (next.matches(selector)) {
          return [next];
        }

        next = next.nextElementSibling;
      }

      return [];
    },

    focusableChildren(element) {
      const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(',');
      return this.find(focusables, element).filter(el => !isDisabled(el) && isVisible(el));
    }

  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): util/swipe.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$d = 'swipe';
  const EVENT_KEY$9 = '.bs.swipe';
  const EVENT_TOUCHSTART = `touchstart${EVENT_KEY$9}`;
  const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$9}`;
  const EVENT_TOUCHEND = `touchend${EVENT_KEY$9}`;
  const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$9}`;
  const EVENT_POINTERUP = `pointerup${EVENT_KEY$9}`;
  const POINTER_TYPE_TOUCH = 'touch';
  const POINTER_TYPE_PEN = 'pen';
  const CLASS_NAME_POINTER_EVENT = 'pointer-event';
  const SWIPE_THRESHOLD = 40;
  const Default$c = {
    endCallback: null,
    leftCallback: null,
    rightCallback: null
  };
  const DefaultType$c = {
    endCallback: '(function|null)',
    leftCallback: '(function|null)',
    rightCallback: '(function|null)'
  };
  /**
   * Class definition
   */

  class Swipe extends Config {
    constructor(element, config) {
      super();
      this._element = element;

      if (!element || !Swipe.isSupported()) {
        return;
      }

      this._config = this._getConfig(config);
      this._deltaX = 0;
      this._supportPointerEvents = Boolean(window.PointerEvent);

      this._initEvents();
    } // Getters


    static get Default() {
      return Default$c;
    }

    static get DefaultType() {
      return DefaultType$c;
    }

    static get NAME() {
      return NAME$d;
    } // Public


    dispose() {
      EventHandler.off(this._element, EVENT_KEY$9);
    } // Private


    _start(event) {
      if (!this._supportPointerEvents) {
        this._deltaX = event.touches[0].clientX;
        return;
      }

      if (this._eventIsPointerPenTouch(event)) {
        this._deltaX = event.clientX;
      }
    }

    _end(event) {
      if (this._eventIsPointerPenTouch(event)) {
        this._deltaX = event.clientX - this._deltaX;
      }

      this._handleSwipe();

      execute(this._config.endCallback);
    }

    _move(event) {
      this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
    }

    _handleSwipe() {
      const absDeltaX = Math.abs(this._deltaX);

      if (absDeltaX <= SWIPE_THRESHOLD) {
        return;
      }

      const direction = absDeltaX / this._deltaX;
      this._deltaX = 0;

      if (!direction) {
        return;
      }

      execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
    }

    _initEvents() {
      if (this._supportPointerEvents) {
        EventHandler.on(this._element, EVENT_POINTERDOWN, event => this._start(event));
        EventHandler.on(this._element, EVENT_POINTERUP, event => this._end(event));

        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
      } else {
        EventHandler.on(this._element, EVENT_TOUCHSTART, event => this._start(event));
        EventHandler.on(this._element, EVENT_TOUCHMOVE, event => this._move(event));
        EventHandler.on(this._element, EVENT_TOUCHEND, event => this._end(event));
      }
    }

    _eventIsPointerPenTouch(event) {
      return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
    } // Static


    static isSupported() {
      return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
    }

  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$c = 'carousel';
  const DATA_KEY$8 = 'bs.carousel';
  const EVENT_KEY$8 = `.${DATA_KEY$8}`;
  const DATA_API_KEY$5 = '.data-api';
  const ARROW_LEFT_KEY$1 = 'ArrowLeft';
  const ARROW_RIGHT_KEY$1 = 'ArrowRight';
  const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  const ORDER_NEXT = 'next';
  const ORDER_PREV = 'prev';
  const DIRECTION_LEFT = 'left';
  const DIRECTION_RIGHT = 'right';
  const EVENT_SLIDE = `slide${EVENT_KEY$8}`;
  const EVENT_SLID = `slid${EVENT_KEY$8}`;
  const EVENT_KEYDOWN$1 = `keydown${EVENT_KEY$8}`;
  const EVENT_MOUSEENTER$1 = `mouseenter${EVENT_KEY$8}`;
  const EVENT_MOUSELEAVE$1 = `mouseleave${EVENT_KEY$8}`;
  const EVENT_DRAG_START = `dragstart${EVENT_KEY$8}`;
  const EVENT_LOAD_DATA_API$3 = `load${EVENT_KEY$8}${DATA_API_KEY$5}`;
  const EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$8}${DATA_API_KEY$5}`;
  const CLASS_NAME_CAROUSEL = 'carousel';
  const CLASS_NAME_ACTIVE$2 = 'active';
  const CLASS_NAME_SLIDE = 'slide';
  const CLASS_NAME_END = 'carousel-item-end';
  const CLASS_NAME_START = 'carousel-item-start';
  const CLASS_NAME_NEXT = 'carousel-item-next';
  const CLASS_NAME_PREV = 'carousel-item-prev';
  const SELECTOR_ACTIVE = '.active';
  const SELECTOR_ITEM = '.carousel-item';
  const SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM;
  const SELECTOR_ITEM_IMG = '.carousel-item img';
  const SELECTOR_INDICATORS = '.carousel-indicators';
  const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
  const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
  const KEY_TO_DIRECTION = {
    [ARROW_LEFT_KEY$1]: DIRECTION_RIGHT,
    [ARROW_RIGHT_KEY$1]: DIRECTION_LEFT
  };
  const Default$b = {
    interval: 5000,
    keyboard: true,
    pause: 'hover',
    ride: false,
    touch: true,
    wrap: true
  };
  const DefaultType$b = {
    interval: '(number|boolean)',
    // TODO:v6 remove boolean support
    keyboard: 'boolean',
    pause: '(string|boolean)',
    ride: '(boolean|string)',
    touch: 'boolean',
    wrap: 'boolean'
  };
  /**
   * Class definition
   */

  class Carousel extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._interval = null;
      this._activeElement = null;
      this._isSliding = false;
      this.touchTimeout = null;
      this._swipeHelper = null;
      this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);

      this._addEventListeners();

      if (this._config.ride === CLASS_NAME_CAROUSEL) {
        this.cycle();
      }
    } // Getters


    static get Default() {
      return Default$b;
    }

    static get DefaultType() {
      return DefaultType$b;
    }

    static get NAME() {
      return NAME$c;
    } // Public


    next() {
      this._slide(ORDER_NEXT);
    }

    nextWhenVisible() {
      // FIXME TODO use `document.visibilityState`
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden && isVisible(this._element)) {
        this.next();
      }
    }

    prev() {
      this._slide(ORDER_PREV);
    }

    pause() {
      if (this._isSliding) {
        triggerTransitionEnd(this._element);
      }

      this._clearInterval();
    }

    cycle() {
      this._clearInterval();

      this._updateInterval();

      this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
    }

    _maybeEnableCycle() {
      if (!this._config.ride) {
        return;
      }

      if (this._isSliding) {
        EventHandler.one(this._element, EVENT_SLID, () => this.cycle());
        return;
      }

      this.cycle();
    }

    to(index) {
      const items = this._getItems();

      if (index > items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        EventHandler.one(this._element, EVENT_SLID, () => this.to(index));
        return;
      }

      const activeIndex = this._getItemIndex(this._getActive());

      if (activeIndex === index) {
        return;
      }

      const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;

      this._slide(order, items[index]);
    }

    dispose() {
      if (this._swipeHelper) {
        this._swipeHelper.dispose();
      }

      super.dispose();
    } // Private


    _configAfterMerge(config) {
      config.defaultInterval = config.interval;
      return config;
    }

    _addEventListeners() {
      if (this._config.keyboard) {
        EventHandler.on(this._element, EVENT_KEYDOWN$1, event => this._keydown(event));
      }

      if (this._config.pause === 'hover') {
        EventHandler.on(this._element, EVENT_MOUSEENTER$1, () => this.pause());
        EventHandler.on(this._element, EVENT_MOUSELEAVE$1, () => this._maybeEnableCycle());
      }

      if (this._config.touch && Swipe.isSupported()) {
        this._addTouchEventListeners();
      }
    }

    _addTouchEventListeners() {
      for (const img of SelectorEngine.find(SELECTOR_ITEM_IMG, this._element)) {
        EventHandler.on(img, EVENT_DRAG_START, event => event.preventDefault());
      }

      const endCallBack = () => {
        if (this._config.pause !== 'hover') {
          return;
        } // If it's a touch-enabled device, mouseenter/leave are fired as
        // part of the mouse compatibility events on first tap - the carousel
        // would stop cycling until user tapped out of it;
        // here, we listen for touchend, explicitly pause the carousel
        // (as if it's the second time we tap on it, mouseenter compat event
        // is NOT fired) and after a timeout (to allow for mouse compatibility
        // events to fire) we explicitly restart cycling


        this.pause();

        if (this.touchTimeout) {
          clearTimeout(this.touchTimeout);
        }

        this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
      };

      const swipeConfig = {
        leftCallback: () => this._slide(this._directionToOrder(DIRECTION_LEFT)),
        rightCallback: () => this._slide(this._directionToOrder(DIRECTION_RIGHT)),
        endCallback: endCallBack
      };
      this._swipeHelper = new Swipe(this._element, swipeConfig);
    }

    _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      const direction = KEY_TO_DIRECTION[event.key];

      if (direction) {
        event.preventDefault();

        this._slide(this._directionToOrder(direction));
      }
    }

    _getItemIndex(element) {
      return this._getItems().indexOf(element);
    }

    _setActiveIndicatorElement(index) {
      if (!this._indicatorsElement) {
        return;
      }

      const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
      activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
      activeIndicator.removeAttribute('aria-current');
      const newActiveIndicator = SelectorEngine.findOne(`[data-bs-slide-to="${index}"]`, this._indicatorsElement);

      if (newActiveIndicator) {
        newActiveIndicator.classList.add(CLASS_NAME_ACTIVE$2);
        newActiveIndicator.setAttribute('aria-current', 'true');
      }
    }

    _updateInterval() {
      const element = this._activeElement || this._getActive();

      if (!element) {
        return;
      }

      const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);
      this._config.interval = elementInterval || this._config.defaultInterval;
    }

    _slide(order, element = null) {
      if (this._isSliding) {
        return;
      }

      const activeElement = this._getActive();

      const isNext = order === ORDER_NEXT;
      const nextElement = element || getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);

      if (nextElement === activeElement) {
        return;
      }

      const nextElementIndex = this._getItemIndex(nextElement);

      const triggerEvent = eventName => {
        return EventHandler.trigger(this._element, eventName, {
          relatedTarget: nextElement,
          direction: this._orderToDirection(order),
          from: this._getItemIndex(activeElement),
          to: nextElementIndex
        });
      };

      const slideEvent = triggerEvent(EVENT_SLIDE);

      if (slideEvent.defaultPrevented) {
        return;
      }

      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        // todo: change tests that use empty divs to avoid this check
        return;
      }

      const isCycling = Boolean(this._interval);
      this.pause();
      this._isSliding = true;

      this._setActiveIndicatorElement(nextElementIndex);

      this._activeElement = nextElement;
      const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
      const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
      nextElement.classList.add(orderClassName);
      reflow(nextElement);
      activeElement.classList.add(directionalClassName);
      nextElement.classList.add(directionalClassName);

      const completeCallBack = () => {
        nextElement.classList.remove(directionalClassName, orderClassName);
        nextElement.classList.add(CLASS_NAME_ACTIVE$2);
        activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
        this._isSliding = false;
        triggerEvent(EVENT_SLID);
      };

      this._queueCallback(completeCallBack, activeElement, this._isAnimated());

      if (isCycling) {
        this.cycle();
      }
    }

    _isAnimated() {
      return this._element.classList.contains(CLASS_NAME_SLIDE);
    }

    _getActive() {
      return SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
    }

    _getItems() {
      return SelectorEngine.find(SELECTOR_ITEM, this._element);
    }

    _clearInterval() {
      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }
    }

    _directionToOrder(direction) {
      if (isRTL()) {
        return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
      }

      return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
    }

    _orderToDirection(order) {
      if (isRTL()) {
        return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
      }

      return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Carousel.getOrCreateInstance(this, config);

        if (typeof config === 'number') {
          data.to(config);
          return;
        }

        if (typeof config === 'string') {
          if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
            throw new TypeError(`No method named "${config}"`);
          }

          data[config]();
        }
      });
    }

  }
  /**
   * Data API implementation
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, function (event) {
    const target = getElementFromSelector(this);

    if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
      return;
    }

    event.preventDefault();
    const carousel = Carousel.getOrCreateInstance(target);
    const slideIndex = this.getAttribute('data-bs-slide-to');

    if (slideIndex) {
      carousel.to(slideIndex);

      carousel._maybeEnableCycle();

      return;
    }

    if (Manipulator.getDataAttribute(this, 'slide') === 'next') {
      carousel.next();

      carousel._maybeEnableCycle();

      return;
    }

    carousel.prev();

    carousel._maybeEnableCycle();
  });
  EventHandler.on(window, EVENT_LOAD_DATA_API$3, () => {
    const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);

    for (const carousel of carousels) {
      Carousel.getOrCreateInstance(carousel);
    }
  });
  /**
   * jQuery
   */

  defineJQueryPlugin(Carousel);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$b = 'collapse';
  const DATA_KEY$7 = 'bs.collapse';
  const EVENT_KEY$7 = `.${DATA_KEY$7}`;
  const DATA_API_KEY$4 = '.data-api';
  const EVENT_SHOW$6 = `show${EVENT_KEY$7}`;
  const EVENT_SHOWN$6 = `shown${EVENT_KEY$7}`;
  const EVENT_HIDE$6 = `hide${EVENT_KEY$7}`;
  const EVENT_HIDDEN$6 = `hidden${EVENT_KEY$7}`;
  const EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$7}${DATA_API_KEY$4}`;
  const CLASS_NAME_SHOW$7 = 'show';
  const CLASS_NAME_COLLAPSE = 'collapse';
  const CLASS_NAME_COLLAPSING = 'collapsing';
  const CLASS_NAME_COLLAPSED = 'collapsed';
  const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
  const CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
  const WIDTH = 'width';
  const HEIGHT = 'height';
  const SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
  const SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
  const Default$a = {
    parent: null,
    toggle: true
  };
  const DefaultType$a = {
    parent: '(null|element)',
    toggle: 'boolean'
  };
  /**
   * Class definition
   */

  class Collapse extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._isTransitioning = false;
      this._triggerArray = [];
      const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);

      for (const elem of toggleList) {
        const selector = getSelectorFromElement(elem);
        const filterElement = SelectorEngine.find(selector).filter(foundElement => foundElement === this._element);

        if (selector !== null && filterElement.length) {
          this._triggerArray.push(elem);
        }
      }

      this._initializeChildren();

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
      }

      if (this._config.toggle) {
        this.toggle();
      }
    } // Getters


    static get Default() {
      return Default$a;
    }

    static get DefaultType() {
      return DefaultType$a;
    }

    static get NAME() {
      return NAME$b;
    } // Public


    toggle() {
      if (this._isShown()) {
        this.hide();
      } else {
        this.show();
      }
    }

    show() {
      if (this._isTransitioning || this._isShown()) {
        return;
      }

      let activeChildren = []; // find active children

      if (this._config.parent) {
        activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter(element => element !== this._element).map(element => Collapse.getOrCreateInstance(element, {
          toggle: false
        }));
      }

      if (activeChildren.length && activeChildren[0]._isTransitioning) {
        return;
      }

      const startEvent = EventHandler.trigger(this._element, EVENT_SHOW$6);

      if (startEvent.defaultPrevented) {
        return;
      }

      for (const activeInstance of activeChildren) {
        activeInstance.hide();
      }

      const dimension = this._getDimension();

      this._element.classList.remove(CLASS_NAME_COLLAPSE);

      this._element.classList.add(CLASS_NAME_COLLAPSING);

      this._element.style[dimension] = 0;

      this._addAriaAndCollapsedClass(this._triggerArray, true);

      this._isTransitioning = true;

      const complete = () => {
        this._isTransitioning = false;

        this._element.classList.remove(CLASS_NAME_COLLAPSING);

        this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);

        this._element.style[dimension] = '';
        EventHandler.trigger(this._element, EVENT_SHOWN$6);
      };

      const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      const scrollSize = `scroll${capitalizedDimension}`;

      this._queueCallback(complete, this._element, true);

      this._element.style[dimension] = `${this._element[scrollSize]}px`;
    }

    hide() {
      if (this._isTransitioning || !this._isShown()) {
        return;
      }

      const startEvent = EventHandler.trigger(this._element, EVENT_HIDE$6);

      if (startEvent.defaultPrevented) {
        return;
      }

      const dimension = this._getDimension();

      this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
      reflow(this._element);

      this._element.classList.add(CLASS_NAME_COLLAPSING);

      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);

      for (const trigger of this._triggerArray) {
        const element = getElementFromSelector(trigger);

        if (element && !this._isShown(element)) {
          this._addAriaAndCollapsedClass([trigger], false);
        }
      }

      this._isTransitioning = true;

      const complete = () => {
        this._isTransitioning = false;

        this._element.classList.remove(CLASS_NAME_COLLAPSING);

        this._element.classList.add(CLASS_NAME_COLLAPSE);

        EventHandler.trigger(this._element, EVENT_HIDDEN$6);
      };

      this._element.style[dimension] = '';

      this._queueCallback(complete, this._element, true);
    }

    _isShown(element = this._element) {
      return element.classList.contains(CLASS_NAME_SHOW$7);
    } // Private


    _configAfterMerge(config) {
      config.toggle = Boolean(config.toggle); // Coerce string values

      config.parent = getElement(config.parent);
      return config;
    }

    _getDimension() {
      return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
    }

    _initializeChildren() {
      if (!this._config.parent) {
        return;
      }

      const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE$4);

      for (const element of children) {
        const selected = getElementFromSelector(element);

        if (selected) {
          this._addAriaAndCollapsedClass([element], this._isShown(selected));
        }
      }
    }

    _getFirstLevelChildren(selector) {
      const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent); // remove children if greater depth

      return SelectorEngine.find(selector, this._config.parent).filter(element => !children.includes(element));
    }

    _addAriaAndCollapsedClass(triggerArray, isOpen) {
      if (!triggerArray.length) {
        return;
      }

      for (const element of triggerArray) {
        element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
        element.setAttribute('aria-expanded', isOpen);
      }
    } // Static


    static jQueryInterface(config) {
      const _config = {};

      if (typeof config === 'string' && /show|hide/.test(config)) {
        _config.toggle = false;
      }

      return this.each(function () {
        const data = Collapse.getOrCreateInstance(this, _config);

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }

          data[config]();
        }
      });
    }

  }
  /**
   * Data API implementation
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
      event.preventDefault();
    }

    const selector = getSelectorFromElement(this);
    const selectorElements = SelectorEngine.find(selector);

    for (const element of selectorElements) {
      Collapse.getOrCreateInstance(element, {
        toggle: false
      }).toggle();
    }
  });
  /**
   * jQuery
   */

  defineJQueryPlugin(Collapse);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$a = 'dropdown';
  const DATA_KEY$6 = 'bs.dropdown';
  const EVENT_KEY$6 = `.${DATA_KEY$6}`;
  const DATA_API_KEY$3 = '.data-api';
  const ESCAPE_KEY$2 = 'Escape';
  const TAB_KEY$1 = 'Tab';
  const ARROW_UP_KEY$1 = 'ArrowUp';
  const ARROW_DOWN_KEY$1 = 'ArrowDown';
  const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

  const EVENT_HIDE$5 = `hide${EVENT_KEY$6}`;
  const EVENT_HIDDEN$5 = `hidden${EVENT_KEY$6}`;
  const EVENT_SHOW$5 = `show${EVENT_KEY$6}`;
  const EVENT_SHOWN$5 = `shown${EVENT_KEY$6}`;
  const EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`;
  const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$6}${DATA_API_KEY$3}`;
  const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$6}${DATA_API_KEY$3}`;
  const CLASS_NAME_SHOW$6 = 'show';
  const CLASS_NAME_DROPUP = 'dropup';
  const CLASS_NAME_DROPEND = 'dropend';
  const CLASS_NAME_DROPSTART = 'dropstart';
  const CLASS_NAME_DROPUP_CENTER = 'dropup-center';
  const CLASS_NAME_DROPDOWN_CENTER = 'dropdown-center';
  const SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
  const SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE$3}.${CLASS_NAME_SHOW$6}`;
  const SELECTOR_MENU = '.dropdown-menu';
  const SELECTOR_NAVBAR = '.navbar';
  const SELECTOR_NAVBAR_NAV = '.navbar-nav';
  const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
  const PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
  const PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
  const PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
  const PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
  const PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
  const PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';
  const PLACEMENT_TOPCENTER = 'top';
  const PLACEMENT_BOTTOMCENTER = 'bottom';
  const Default$9 = {
    autoClose: true,
    boundary: 'clippingParents',
    display: 'dynamic',
    offset: [0, 2],
    popperConfig: null,
    reference: 'toggle'
  };
  const DefaultType$9 = {
    autoClose: '(boolean|string)',
    boundary: '(string|element)',
    display: 'string',
    offset: '(array|string|function)',
    popperConfig: '(null|object|function)',
    reference: '(string|element|object)'
  };
  /**
   * Class definition
   */

  class Dropdown extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._popper = null;
      this._parent = this._element.parentNode; // dropdown wrapper
      // todo: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.2/forms/input-group/

      this._menu = SelectorEngine.next(this._element, SELECTOR_MENU)[0] || SelectorEngine.prev(this._element, SELECTOR_MENU)[0] || SelectorEngine.findOne(SELECTOR_MENU, this._parent);
      this._inNavbar = this._detectNavbar();
    } // Getters


    static get Default() {
      return Default$9;
    }

    static get DefaultType() {
      return DefaultType$9;
    }

    static get NAME() {
      return NAME$a;
    } // Public


    toggle() {
      return this._isShown() ? this.hide() : this.show();
    }

    show() {
      if (isDisabled(this._element) || this._isShown()) {
        return;
      }

      const relatedTarget = {
        relatedTarget: this._element
      };
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$5, relatedTarget);

      if (showEvent.defaultPrevented) {
        return;
      }

      this._createPopper(); // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


      if ('ontouchstart' in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.on(element, 'mouseover', noop);
        }
      }

      this._element.focus();

      this._element.setAttribute('aria-expanded', true);

      this._menu.classList.add(CLASS_NAME_SHOW$6);

      this._element.classList.add(CLASS_NAME_SHOW$6);

      EventHandler.trigger(this._element, EVENT_SHOWN$5, relatedTarget);
    }

    hide() {
      if (isDisabled(this._element) || !this._isShown()) {
        return;
      }

      const relatedTarget = {
        relatedTarget: this._element
      };

      this._completeHide(relatedTarget);
    }

    dispose() {
      if (this._popper) {
        this._popper.destroy();
      }

      super.dispose();
    }

    update() {
      this._inNavbar = this._detectNavbar();

      if (this._popper) {
        this._popper.update();
      }
    } // Private


    _completeHide(relatedTarget) {
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$5, relatedTarget);

      if (hideEvent.defaultPrevented) {
        return;
      } // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support


      if ('ontouchstart' in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.off(element, 'mouseover', noop);
        }
      }

      if (this._popper) {
        this._popper.destroy();
      }

      this._menu.classList.remove(CLASS_NAME_SHOW$6);

      this._element.classList.remove(CLASS_NAME_SHOW$6);

      this._element.setAttribute('aria-expanded', 'false');

      Manipulator.removeDataAttribute(this._menu, 'popper');
      EventHandler.trigger(this._element, EVENT_HIDDEN$5, relatedTarget);
    }

    _getConfig(config) {
      config = super._getConfig(config);

      if (typeof config.reference === 'object' && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
        // Popper virtual elements require a getBoundingClientRect method
        throw new TypeError(`${NAME$a.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
      }

      return config;
    }

    _createPopper() {
      if (typeof Popper__namespace === 'undefined') {
        throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
      }

      let referenceElement = this._element;

      if (this._config.reference === 'parent') {
        referenceElement = this._parent;
      } else if (isElement(this._config.reference)) {
        referenceElement = getElement(this._config.reference);
      } else if (typeof this._config.reference === 'object') {
        referenceElement = this._config.reference;
      }

      const popperConfig = this._getPopperConfig();

      this._popper = Popper__namespace.createPopper(referenceElement, this._menu, popperConfig);
    }

    _isShown() {
      return this._menu.classList.contains(CLASS_NAME_SHOW$6);
    }

    _getPlacement() {
      const parentDropdown = this._parent;

      if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
        return PLACEMENT_RIGHT;
      }

      if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
        return PLACEMENT_LEFT;
      }

      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
        return PLACEMENT_TOPCENTER;
      }

      if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
        return PLACEMENT_BOTTOMCENTER;
      } // We need to trim the value because custom properties can also include spaces


      const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';

      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
        return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
      }

      return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
    }

    _detectNavbar() {
      return this._element.closest(SELECTOR_NAVBAR) !== null;
    }

    _getOffset() {
      const {
        offset
      } = this._config;

      if (typeof offset === 'string') {
        return offset.split(',').map(value => Number.parseInt(value, 10));
      }

      if (typeof offset === 'function') {
        return popperData => offset(popperData, this._element);
      }

      return offset;
    }

    _getPopperConfig() {
      const defaultBsPopperConfig = {
        placement: this._getPlacement(),
        modifiers: [{
          name: 'preventOverflow',
          options: {
            boundary: this._config.boundary
          }
        }, {
          name: 'offset',
          options: {
            offset: this._getOffset()
          }
        }]
      }; // Disable Popper if we have a static display or Dropdown is in Navbar

      if (this._inNavbar || this._config.display === 'static') {
        Manipulator.setDataAttribute(this._menu, 'popper', 'static'); // todo:v6 remove

        defaultBsPopperConfig.modifiers = [{
          name: 'applyStyles',
          enabled: false
        }];
      }

      return { ...defaultBsPopperConfig,
        ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
      };
    }

    _selectMenuItem({
      key,
      target
    }) {
      const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(element => isVisible(element));

      if (!items.length) {
        return;
      } // if target isn't included in items (e.g. when expanding the dropdown)
      // allow cycling to get the last item in case key equals ARROW_UP_KEY


      getNextActiveElement(items, target, key === ARROW_DOWN_KEY$1, !items.includes(target)).focus();
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Dropdown.getOrCreateInstance(this, config);

        if (typeof config !== 'string') {
          return;
        }

        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config]();
      });
    }

    static clearMenus(event) {
      if (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY$1) {
        return;
      }

      const openToggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN);

      for (const toggle of openToggles) {
        const context = Dropdown.getInstance(toggle);

        if (!context || context._config.autoClose === false) {
          continue;
        }

        const composedPath = event.composedPath();
        const isMenuTarget = composedPath.includes(context._menu);

        if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
          continue;
        } // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu


        if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY$1 || /input|select|option|textarea|form/i.test(event.target.tagName))) {
          continue;
        }

        const relatedTarget = {
          relatedTarget: context._element
        };

        if (event.type === 'click') {
          relatedTarget.clickEvent = event;
        }

        context._completeHide(relatedTarget);
      }
    }

    static dataApiKeydownHandler(event) {
      // If not an UP | DOWN | ESCAPE key => not a dropdown command
      // If input/textarea && if key is other than ESCAPE => not a dropdown command
      const isInput = /input|textarea/i.test(event.target.tagName);
      const isEscapeEvent = event.key === ESCAPE_KEY$2;
      const isUpOrDownEvent = [ARROW_UP_KEY$1, ARROW_DOWN_KEY$1].includes(event.key);

      if (!isUpOrDownEvent && !isEscapeEvent) {
        return;
      }

      if (isInput && !isEscapeEvent) {
        return;
      }

      event.preventDefault(); // todo: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.2/forms/input-group/

      const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.next(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.findOne(SELECTOR_DATA_TOGGLE$3, event.delegateTarget.parentNode);
      const instance = Dropdown.getOrCreateInstance(getToggleButton);

      if (isUpOrDownEvent) {
        event.stopPropagation();
        instance.show();

        instance._selectMenuItem(event);

        return;
      }

      if (instance._isShown()) {
        // else is escape and we check if it is shown
        event.stopPropagation();
        instance.hide();
        getToggleButton.focus();
      }
    }

  }
  /**
   * Data API implementation
   */


  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) {
    event.preventDefault();
    Dropdown.getOrCreateInstance(this).toggle();
  });
  /**
   * jQuery
   */

  defineJQueryPlugin(Dropdown);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): util/scrollBar.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
  const SELECTOR_STICKY_CONTENT = '.sticky-top';
  const PROPERTY_PADDING = 'padding-right';
  const PROPERTY_MARGIN = 'margin-right';
  /**
   * Class definition
   */

  class ScrollBarHelper {
    constructor() {
      this._element = document.body;
    } // Public


    getWidth() {
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
      const documentWidth = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - documentWidth);
    }

    hide() {
      const width = this.getWidth();

      this._disableOverFlow(); // give padding to element to balance the hidden scrollbar width


      this._setElementAttributes(this._element, PROPERTY_PADDING, calculatedValue => calculatedValue + width); // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth


      this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, calculatedValue => calculatedValue + width);

      this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, calculatedValue => calculatedValue - width);
    }

    reset() {
      this._resetElementAttributes(this._element, 'overflow');

      this._resetElementAttributes(this._element, PROPERTY_PADDING);

      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);

      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
    }

    isOverflowing() {
      return this.getWidth() > 0;
    } // Private


    _disableOverFlow() {
      this._saveInitialAttribute(this._element, 'overflow');

      this._element.style.overflow = 'hidden';
    }

    _setElementAttributes(selector, styleProperty, callback) {
      const scrollbarWidth = this.getWidth();

      const manipulationCallBack = element => {
        if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
          return;
        }

        this._saveInitialAttribute(element, styleProperty);

        const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
        element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
      };

      this._applyManipulationCallback(selector, manipulationCallBack);
    }

    _saveInitialAttribute(element, styleProperty) {
      const actualValue = element.style.getPropertyValue(styleProperty);

      if (actualValue) {
        Manipulator.setDataAttribute(element, styleProperty, actualValue);
      }
    }

    _resetElementAttributes(selector, styleProperty) {
      const manipulationCallBack = element => {
        const value = Manipulator.getDataAttribute(element, styleProperty); // We only want to remove the property if the value is `null`; the value can also be zero

        if (value === null) {
          element.style.removeProperty(styleProperty);
          return;
        }

        Manipulator.removeDataAttribute(element, styleProperty);
        element.style.setProperty(styleProperty, value);
      };

      this._applyManipulationCallback(selector, manipulationCallBack);
    }

    _applyManipulationCallback(selector, callBack) {
      if (isElement(selector)) {
        callBack(selector);
        return;
      }

      for (const sel of SelectorEngine.find(selector, this._element)) {
        callBack(sel);
      }
    }

  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): util/backdrop.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$9 = 'backdrop';
  const CLASS_NAME_FADE$4 = 'fade';
  const CLASS_NAME_SHOW$5 = 'show';
  const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$9}`;
  const Default$8 = {
    className: 'modal-backdrop',
    clickCallback: null,
    isAnimated: false,
    isVisible: true,
    // if false, we use the backdrop helper without adding any element to the dom
    rootElement: 'body' // give the choice to place backdrop under different elements

  };
  const DefaultType$8 = {
    className: 'string',
    clickCallback: '(function|null)',
    isAnimated: 'boolean',
    isVisible: 'boolean',
    rootElement: '(element|string)'
  };
  /**
   * Class definition
   */

  class Backdrop extends Config {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
      this._isAppended = false;
      this._element = null;
    } // Getters


    static get Default() {
      return Default$8;
    }

    static get DefaultType() {
      return DefaultType$8;
    }

    static get NAME() {
      return NAME$9;
    } // Public


    show(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }

      this._append();

      const element = this._getElement();

      if (this._config.isAnimated) {
        reflow(element);
      }

      element.classList.add(CLASS_NAME_SHOW$5);

      this._emulateAnimation(() => {
        execute(callback);
      });
    }

    hide(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }

      this._getElement().classList.remove(CLASS_NAME_SHOW$5);

      this._emulateAnimation(() => {
        this.dispose();
        execute(callback);
      });
    }

    dispose() {
      if (!this._isAppended) {
        return;
      }

      EventHandler.off(this._element, EVENT_MOUSEDOWN);

      this._element.remove();

      this._isAppended = false;
    } // Private


    _getElement() {
      if (!this._element) {
        const backdrop = document.createElement('div');
        backdrop.className = this._config.className;

        if (this._config.isAnimated) {
          backdrop.classList.add(CLASS_NAME_FADE$4);
        }

        this._element = backdrop;
      }

      return this._element;
    }

    _configAfterMerge(config) {
      // use getElement() with the default "body" to get a fresh Element on each instantiation
      config.rootElement = getElement(config.rootElement);
      return config;
    }

    _append() {
      if (this._isAppended) {
        return;
      }

      const element = this._getElement();

      this._config.rootElement.append(element);

      EventHandler.on(element, EVENT_MOUSEDOWN, () => {
        execute(this._config.clickCallback);
      });
      this._isAppended = true;
    }

    _emulateAnimation(callback) {
      executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
    }

  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): util/focustrap.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$8 = 'focustrap';
  const DATA_KEY$5 = 'bs.focustrap';
  const EVENT_KEY$5 = `.${DATA_KEY$5}`;
  const EVENT_FOCUSIN$2 = `focusin${EVENT_KEY$5}`;
  const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$5}`;
  const TAB_KEY = 'Tab';
  const TAB_NAV_FORWARD = 'forward';
  const TAB_NAV_BACKWARD = 'backward';
  const Default$7 = {
    autofocus: true,
    trapElement: null // The element to trap focus inside of

  };
  const DefaultType$7 = {
    autofocus: 'boolean',
    trapElement: 'element'
  };
  /**
   * Class definition
   */

  class FocusTrap extends Config {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
      this._isActive = false;
      this._lastTabNavDirection = null;
    } // Getters


    static get Default() {
      return Default$7;
    }

    static get DefaultType() {
      return DefaultType$7;
    }

    static get NAME() {
      return NAME$8;
    } // Public


    activate() {
      if (this._isActive) {
        return;
      }

      if (this._config.autofocus) {
        this._config.trapElement.focus();
      }

      EventHandler.off(document, EVENT_KEY$5); // guard against infinite focus loop

      EventHandler.on(document, EVENT_FOCUSIN$2, event => this._handleFocusin(event));
      EventHandler.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
      this._isActive = true;
    }

    deactivate() {
      if (!this._isActive) {
        return;
      }

      this._isActive = false;
      EventHandler.off(document, EVENT_KEY$5);
    } // Private


    _handleFocusin(event) {
      const {
        trapElement
      } = this._config;

      if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
        return;
      }

      const elements = SelectorEngine.focusableChildren(trapElement);

      if (elements.length === 0) {
        trapElement.focus();
      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
        elements[elements.length - 1].focus();
      } else {
        elements[0].focus();
      }
    }

    _handleKeydown(event) {
      if (event.key !== TAB_KEY) {
        return;
      }

      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
    }

  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$7 = 'modal';
  const DATA_KEY$4 = 'bs.modal';
  const EVENT_KEY$4 = `.${DATA_KEY$4}`;
  const DATA_API_KEY$2 = '.data-api';
  const ESCAPE_KEY$1 = 'Escape';
  const EVENT_HIDE$4 = `hide${EVENT_KEY$4}`;
  const EVENT_HIDE_PREVENTED$1 = `hidePrevented${EVENT_KEY$4}`;
  const EVENT_HIDDEN$4 = `hidden${EVENT_KEY$4}`;
  const EVENT_SHOW$4 = `show${EVENT_KEY$4}`;
  const EVENT_SHOWN$4 = `shown${EVENT_KEY$4}`;
  const EVENT_RESIZE$1 = `resize${EVENT_KEY$4}`;
  const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY$4}`;
  const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$4}`;
  const EVENT_KEYDOWN_DISMISS$1 = `keydown.dismiss${EVENT_KEY$4}`;
  const EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$4}${DATA_API_KEY$2}`;
  const CLASS_NAME_OPEN = 'modal-open';
  const CLASS_NAME_FADE$3 = 'fade';
  const CLASS_NAME_SHOW$4 = 'show';
  const CLASS_NAME_STATIC = 'modal-static';
  const OPEN_SELECTOR$1 = '.modal.show';
  const SELECTOR_DIALOG = '.modal-dialog';
  const SELECTOR_MODAL_BODY = '.modal-body';
  const SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
  const Default$6 = {
    backdrop: true,
    focus: true,
    keyboard: true
  };
  const DefaultType$6 = {
    backdrop: '(boolean|string)',
    focus: 'boolean',
    keyboard: 'boolean'
  };
  /**
   * Class definition
   */

  class Modal extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
      this._backdrop = this._initializeBackDrop();
      this._focustrap = this._initializeFocusTrap();
      this._isShown = false;
      this._isTransitioning = false;
      this._scrollBar = new ScrollBarHelper();

      this._addEventListeners();
    } // Getters


    static get Default() {
      return Default$6;
    }

    static get DefaultType() {
      return DefaultType$6;
    }

    static get NAME() {
      return NAME$7;
    } // Public


    toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }

    show(relatedTarget) {
      if (this._isShown || this._isTransitioning) {
        return;
      }

      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, {
        relatedTarget
      });

      if (showEvent.defaultPrevented) {
        return;
      }

      this._isShown = true;
      this._isTransitioning = true;

      this._scrollBar.hide();

      document.body.classList.add(CLASS_NAME_OPEN);

      this._adjustDialog();

      this._backdrop.show(() => this._showElement(relatedTarget));
    }

    hide() {
      if (!this._isShown || this._isTransitioning) {
        return;
      }

      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4);

      if (hideEvent.defaultPrevented) {
        return;
      }

      this._isShown = false;
      this._isTransitioning = true;

      this._focustrap.deactivate();

      this._element.classList.remove(CLASS_NAME_SHOW$4);

      this._queueCallback(() => this._hideModal(), this._element, this._isAnimated());
    }

    dispose() {
      for (const htmlElement of [window, this._dialog]) {
        EventHandler.off(htmlElement, EVENT_KEY$4);
      }

      this._backdrop.dispose();

      this._focustrap.deactivate();

      super.dispose();
    }

    handleUpdate() {
      this._adjustDialog();
    } // Private


    _initializeBackDrop() {
      return new Backdrop({
        isVisible: Boolean(this._config.backdrop),
        // 'static' option will be translated to true, and booleans will keep their value,
        isAnimated: this._isAnimated()
      });
    }

    _initializeFocusTrap() {
      return new FocusTrap({
        trapElement: this._element
      });
    }

    _showElement(relatedTarget) {
      // try to append dynamic modal
      if (!document.body.contains(this._element)) {
        document.body.append(this._element);
      }

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      this._element.setAttribute('role', 'dialog');

      this._element.scrollTop = 0;
      const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);

      if (modalBody) {
        modalBody.scrollTop = 0;
      }

      reflow(this._element);

      this._element.classList.add(CLASS_NAME_SHOW$4);

      const transitionComplete = () => {
        if (this._config.focus) {
          this._focustrap.activate();
        }

        this._isTransitioning = false;
        EventHandler.trigger(this._element, EVENT_SHOWN$4, {
          relatedTarget
        });
      };

      this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
    }

    _addEventListeners() {
      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, event => {
        if (event.key !== ESCAPE_KEY$1) {
          return;
        }

        if (this._config.keyboard) {
          event.preventDefault();
          this.hide();
          return;
        }

        this._triggerBackdropTransition();
      });
      EventHandler.on(window, EVENT_RESIZE$1, () => {
        if (this._isShown && !this._isTransitioning) {
          this._adjustDialog();
        }
      });
      EventHandler.on(this._element, EVENT_MOUSEDOWN_DISMISS, event => {
        // a bad trick to segregate clicks that may start inside dialog but end outside, and avoid listen to scrollbar clicks
        EventHandler.one(this._element, EVENT_CLICK_DISMISS, event2 => {
          if (this._element !== event.target || this._element !== event2.target) {
            return;
          }

          if (this._config.backdrop === 'static') {
            this._triggerBackdropTransition();

            return;
          }

          if (this._config.backdrop) {
            this.hide();
          }
        });
      });
    }

    _hideModal() {
      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._element.removeAttribute('aria-modal');

      this._element.removeAttribute('role');

      this._isTransitioning = false;

      this._backdrop.hide(() => {
        document.body.classList.remove(CLASS_NAME_OPEN);

        this._resetAdjustments();

        this._scrollBar.reset();

        EventHandler.trigger(this._element, EVENT_HIDDEN$4);
      });
    }

    _isAnimated() {
      return this._element.classList.contains(CLASS_NAME_FADE$3);
    }

    _triggerBackdropTransition() {
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED$1);

      if (hideEvent.defaultPrevented) {
        return;
      }

      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
      const initialOverflowY = this._element.style.overflowY; // return if the following background transition hasn't yet completed

      if (initialOverflowY === 'hidden' || this._element.classList.contains(CLASS_NAME_STATIC)) {
        return;
      }

      if (!isModalOverflowing) {
        this._element.style.overflowY = 'hidden';
      }

      this._element.classList.add(CLASS_NAME_STATIC);

      this._queueCallback(() => {
        this._element.classList.remove(CLASS_NAME_STATIC);

        this._queueCallback(() => {
          this._element.style.overflowY = initialOverflowY;
        }, this._dialog);
      }, this._dialog);

      this._element.focus();
    }
    /**
     * The following methods are used to handle overflowing modals
     */


    _adjustDialog() {
      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      const scrollbarWidth = this._scrollBar.getWidth();

      const isBodyOverflowing = scrollbarWidth > 0;

      if (isBodyOverflowing && !isModalOverflowing) {
        const property = isRTL() ? 'paddingLeft' : 'paddingRight';
        this._element.style[property] = `${scrollbarWidth}px`;
      }

      if (!isBodyOverflowing && isModalOverflowing) {
        const property = isRTL() ? 'paddingRight' : 'paddingLeft';
        this._element.style[property] = `${scrollbarWidth}px`;
      }
    }

    _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    } // Static


    static jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        const data = Modal.getOrCreateInstance(this, config);

        if (typeof config !== 'string') {
          return;
        }

        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config](relatedTarget);
      });
    }

  }
  /**
   * Data API implementation
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
    const target = getElementFromSelector(this);

    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }

    EventHandler.one(target, EVENT_SHOW$4, showEvent => {
      if (showEvent.defaultPrevented) {
        // only register focus restorer if modal will actually get shown
        return;
      }

      EventHandler.one(target, EVENT_HIDDEN$4, () => {
        if (isVisible(this)) {
          this.focus();
        }
      });
    }); // avoid conflict when clicking modal toggler while another one is open

    const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR$1);

    if (alreadyOpen) {
      Modal.getInstance(alreadyOpen).hide();
    }

    const data = Modal.getOrCreateInstance(target);
    data.toggle(this);
  });
  enableDismissTrigger(Modal);
  /**
   * jQuery
   */

  defineJQueryPlugin(Modal);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): offcanvas.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$6 = 'offcanvas';
  const DATA_KEY$3 = 'bs.offcanvas';
  const EVENT_KEY$3 = `.${DATA_KEY$3}`;
  const DATA_API_KEY$1 = '.data-api';
  const EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$3}${DATA_API_KEY$1}`;
  const ESCAPE_KEY = 'Escape';
  const CLASS_NAME_SHOW$3 = 'show';
  const CLASS_NAME_SHOWING$1 = 'showing';
  const CLASS_NAME_HIDING = 'hiding';
  const CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
  const OPEN_SELECTOR = '.offcanvas.show';
  const EVENT_SHOW$3 = `show${EVENT_KEY$3}`;
  const EVENT_SHOWN$3 = `shown${EVENT_KEY$3}`;
  const EVENT_HIDE$3 = `hide${EVENT_KEY$3}`;
  const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$3}`;
  const EVENT_HIDDEN$3 = `hidden${EVENT_KEY$3}`;
  const EVENT_RESIZE = `resize${EVENT_KEY$3}`;
  const EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$3}${DATA_API_KEY$1}`;
  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$3}`;
  const SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
  const Default$5 = {
    backdrop: true,
    keyboard: true,
    scroll: false
  };
  const DefaultType$5 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    scroll: 'boolean'
  };
  /**
   * Class definition
   */

  class Offcanvas extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._isShown = false;
      this._backdrop = this._initializeBackDrop();
      this._focustrap = this._initializeFocusTrap();

      this._addEventListeners();
    } // Getters


    static get Default() {
      return Default$5;
    }

    static get DefaultType() {
      return DefaultType$5;
    }

    static get NAME() {
      return NAME$6;
    } // Public


    toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }

    show(relatedTarget) {
      if (this._isShown) {
        return;
      }

      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
        relatedTarget
      });

      if (showEvent.defaultPrevented) {
        return;
      }

      this._isShown = true;

      this._backdrop.show();

      if (!this._config.scroll) {
        new ScrollBarHelper().hide();
      }

      this._element.setAttribute('aria-modal', true);

      this._element.setAttribute('role', 'dialog');

      this._element.classList.add(CLASS_NAME_SHOWING$1);

      const completeCallBack = () => {
        if (!this._config.scroll || this._config.backdrop) {
          this._focustrap.activate();
        }

        this._element.classList.add(CLASS_NAME_SHOW$3);

        this._element.classList.remove(CLASS_NAME_SHOWING$1);

        EventHandler.trigger(this._element, EVENT_SHOWN$3, {
          relatedTarget
        });
      };

      this._queueCallback(completeCallBack, this._element, true);
    }

    hide() {
      if (!this._isShown) {
        return;
      }

      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);

      if (hideEvent.defaultPrevented) {
        return;
      }

      this._focustrap.deactivate();

      this._element.blur();

      this._isShown = false;

      this._element.classList.add(CLASS_NAME_HIDING);

      this._backdrop.hide();

      const completeCallback = () => {
        this._element.classList.remove(CLASS_NAME_SHOW$3, CLASS_NAME_HIDING);

        this._element.removeAttribute('aria-modal');

        this._element.removeAttribute('role');

        if (!this._config.scroll) {
          new ScrollBarHelper().reset();
        }

        EventHandler.trigger(this._element, EVENT_HIDDEN$3);
      };

      this._queueCallback(completeCallback, this._element, true);
    }

    dispose() {
      this._backdrop.dispose();

      this._focustrap.deactivate();

      super.dispose();
    } // Private


    _initializeBackDrop() {
      const clickCallback = () => {
        if (this._config.backdrop === 'static') {
          EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
          return;
        }

        this.hide();
      }; // 'static' option will be translated to true, and booleans will keep their value


      const isVisible = Boolean(this._config.backdrop);
      return new Backdrop({
        className: CLASS_NAME_BACKDROP,
        isVisible,
        isAnimated: true,
        rootElement: this._element.parentNode,
        clickCallback: isVisible ? clickCallback : null
      });
    }

    _initializeFocusTrap() {
      return new FocusTrap({
        trapElement: this._element
      });
    }

    _addEventListeners() {
      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
        if (event.key !== ESCAPE_KEY) {
          return;
        }

        if (!this._config.keyboard) {
          EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
          return;
        }

        this.hide();
      });
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Offcanvas.getOrCreateInstance(this, config);

        if (typeof config !== 'string') {
          return;
        }

        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config](this);
      });
    }

  }
  /**
   * Data API implementation
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
    const target = getElementFromSelector(this);

    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }

    if (isDisabled(this)) {
      return;
    }

    EventHandler.one(target, EVENT_HIDDEN$3, () => {
      // focus on trigger when it is closed
      if (isVisible(this)) {
        this.focus();
      }
    }); // avoid conflict when clicking a toggler of an offcanvas, while another is open

    const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);

    if (alreadyOpen && alreadyOpen !== target) {
      Offcanvas.getInstance(alreadyOpen).hide();
    }

    const data = Offcanvas.getOrCreateInstance(target);
    data.toggle(this);
  });
  EventHandler.on(window, EVENT_LOAD_DATA_API$2, () => {
    for (const selector of SelectorEngine.find(OPEN_SELECTOR)) {
      Offcanvas.getOrCreateInstance(selector).show();
    }
  });
  EventHandler.on(window, EVENT_RESIZE, () => {
    for (const element of SelectorEngine.find('[aria-modal][class*=show][class*=offcanvas-]')) {
      if (getComputedStyle(element).position !== 'fixed') {
        Offcanvas.getOrCreateInstance(element).hide();
      }
    }
  });
  enableDismissTrigger(Offcanvas);
  /**
   * jQuery
   */

  defineJQueryPlugin(Offcanvas);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): util/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  const uriAttributes = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);
  const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  /**
   * A pattern that recognizes a commonly useful subset of URLs that are safe.
   *
   * Shout-out to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
   */

  const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i;
  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shout-out to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
   */

  const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

  const allowedAttribute = (attribute, allowedAttributeList) => {
    const attributeName = attribute.nodeName.toLowerCase();

    if (allowedAttributeList.includes(attributeName)) {
      if (uriAttributes.has(attributeName)) {
        return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue) || DATA_URL_PATTERN.test(attribute.nodeValue));
      }

      return true;
    } // Check if a regular expression validates the attribute.


    return allowedAttributeList.filter(attributeRegex => attributeRegex instanceof RegExp).some(regex => regex.test(attributeName));
  };

  const DefaultAllowlist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };
  function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
    if (!unsafeHtml.length) {
      return unsafeHtml;
    }

    if (sanitizeFunction && typeof sanitizeFunction === 'function') {
      return sanitizeFunction(unsafeHtml);
    }

    const domParser = new window.DOMParser();
    const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    const elements = [].concat(...createdDocument.body.querySelectorAll('*'));

    for (const element of elements) {
      const elementName = element.nodeName.toLowerCase();

      if (!Object.keys(allowList).includes(elementName)) {
        element.remove();
        continue;
      }

      const attributeList = [].concat(...element.attributes);
      const allowedAttributes = [].concat(allowList['*'] || [], allowList[elementName] || []);

      for (const attribute of attributeList) {
        if (!allowedAttribute(attribute, allowedAttributes)) {
          element.removeAttribute(attribute.nodeName);
        }
      }
    }

    return createdDocument.body.innerHTML;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): util/template-factory.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$5 = 'TemplateFactory';
  const Default$4 = {
    allowList: DefaultAllowlist,
    content: {},
    // { selector : text ,  selector2 : text2 , }
    extraClass: '',
    html: false,
    sanitize: true,
    sanitizeFn: null,
    template: '<div></div>'
  };
  const DefaultType$4 = {
    allowList: 'object',
    content: 'object',
    extraClass: '(string|function)',
    html: 'boolean',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    template: 'string'
  };
  const DefaultContentType = {
    entry: '(string|element|function|null)',
    selector: '(string|element)'
  };
  /**
   * Class definition
   */

  class TemplateFactory extends Config {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
    } // Getters


    static get Default() {
      return Default$4;
    }

    static get DefaultType() {
      return DefaultType$4;
    }

    static get NAME() {
      return NAME$5;
    } // Public


    getContent() {
      return Object.values(this._config.content).map(config => this._resolvePossibleFunction(config)).filter(Boolean);
    }

    hasContent() {
      return this.getContent().length > 0;
    }

    changeContent(content) {
      this._checkContent(content);

      this._config.content = { ...this._config.content,
        ...content
      };
      return this;
    }

    toHtml() {
      const templateWrapper = document.createElement('div');
      templateWrapper.innerHTML = this._maybeSanitize(this._config.template);

      for (const [selector, text] of Object.entries(this._config.content)) {
        this._setContent(templateWrapper, text, selector);
      }

      const template = templateWrapper.children[0];

      const extraClass = this._resolvePossibleFunction(this._config.extraClass);

      if (extraClass) {
        template.classList.add(...extraClass.split(' '));
      }

      return template;
    } // Private


    _typeCheckConfig(config) {
      super._typeCheckConfig(config);

      this._checkContent(config.content);
    }

    _checkContent(arg) {
      for (const [selector, content] of Object.entries(arg)) {
        super._typeCheckConfig({
          selector,
          entry: content
        }, DefaultContentType);
      }
    }

    _setContent(template, content, selector) {
      const templateElement = SelectorEngine.findOne(selector, template);

      if (!templateElement) {
        return;
      }

      content = this._resolvePossibleFunction(content);

      if (!content) {
        templateElement.remove();
        return;
      }

      if (isElement(content)) {
        this._putElementInTemplate(getElement(content), templateElement);

        return;
      }

      if (this._config.html) {
        templateElement.innerHTML = this._maybeSanitize(content);
        return;
      }

      templateElement.textContent = content;
    }

    _maybeSanitize(arg) {
      return this._config.sanitize ? sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
    }

    _resolvePossibleFunction(arg) {
      return typeof arg === 'function' ? arg(this) : arg;
    }

    _putElementInTemplate(element, templateElement) {
      if (this._config.html) {
        templateElement.innerHTML = '';
        templateElement.append(element);
        return;
      }

      templateElement.textContent = element.textContent;
    }

  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): tooltip.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$4 = 'tooltip';
  const DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
  const CLASS_NAME_FADE$2 = 'fade';
  const CLASS_NAME_MODAL = 'modal';
  const CLASS_NAME_SHOW$2 = 'show';
  const SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
  const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
  const EVENT_MODAL_HIDE = 'hide.bs.modal';
  const TRIGGER_HOVER = 'hover';
  const TRIGGER_FOCUS = 'focus';
  const TRIGGER_CLICK = 'click';
  const TRIGGER_MANUAL = 'manual';
  const EVENT_HIDE$2 = 'hide';
  const EVENT_HIDDEN$2 = 'hidden';
  const EVENT_SHOW$2 = 'show';
  const EVENT_SHOWN$2 = 'shown';
  const EVENT_INSERTED = 'inserted';
  const EVENT_CLICK$1 = 'click';
  const EVENT_FOCUSIN$1 = 'focusin';
  const EVENT_FOCUSOUT$1 = 'focusout';
  const EVENT_MOUSEENTER = 'mouseenter';
  const EVENT_MOUSELEAVE = 'mouseleave';
  const AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: isRTL() ? 'left' : 'right',
    BOTTOM: 'bottom',
    LEFT: isRTL() ? 'right' : 'left'
  };
  const Default$3 = {
    allowList: DefaultAllowlist,
    animation: true,
    boundary: 'clippingParents',
    container: false,
    customClass: '',
    delay: 0,
    fallbackPlacements: ['top', 'right', 'bottom', 'left'],
    html: false,
    offset: [0, 0],
    placement: 'top',
    popperConfig: null,
    sanitize: true,
    sanitizeFn: null,
    selector: false,
    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
    title: '',
    trigger: 'hover focus'
  };
  const DefaultType$3 = {
    allowList: 'object',
    animation: 'boolean',
    boundary: '(string|element)',
    container: '(string|element|boolean)',
    customClass: '(string|function)',
    delay: '(number|object)',
    fallbackPlacements: 'array',
    html: 'boolean',
    offset: '(array|string|function)',
    placement: '(string|function)',
    popperConfig: '(null|object|function)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    selector: '(string|boolean)',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string'
  };
  /**
   * Class definition
   */

  class Tooltip extends BaseComponent {
    constructor(element, config) {
      if (typeof Popper__namespace === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
      }

      super(element, config); // Private

      this._isEnabled = true;
      this._timeout = 0;
      this._isHovered = null;
      this._activeTrigger = {};
      this._popper = null;
      this._templateFactory = null;
      this._newContent = null; // Protected

      this.tip = null;

      this._setListeners();

      if (!this._config.selector) {
        this._fixTitle();
      }
    } // Getters


    static get Default() {
      return Default$3;
    }

    static get DefaultType() {
      return DefaultType$3;
    }

    static get NAME() {
      return NAME$4;
    } // Public


    enable() {
      this._isEnabled = true;
    }

    disable() {
      this._isEnabled = false;
    }

    toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }

    toggle() {
      if (!this._isEnabled) {
        return;
      }

      this._activeTrigger.click = !this._activeTrigger.click;

      if (this._isShown()) {
        this._leave();

        return;
      }

      this._enter();
    }

    dispose() {
      clearTimeout(this._timeout);
      EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);

      if (this._element.getAttribute('data-bs-original-title')) {
        this._element.setAttribute('title', this._element.getAttribute('data-bs-original-title'));
      }

      this._disposePopper();

      super.dispose();
    }

    show() {
      if (this._element.style.display === 'none') {
        throw new Error('Please use show on visible elements');
      }

      if (!(this._isWithContent() && this._isEnabled)) {
        return;
      }

      const showEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOW$2));
      const shadowRoot = findShadowRoot(this._element);

      const isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element);

      if (showEvent.defaultPrevented || !isInTheDom) {
        return;
      } // todo v6 remove this OR make it optional


      this._disposePopper();

      const tip = this._getTipElement();

      this._element.setAttribute('aria-describedby', tip.getAttribute('id'));

      const {
        container
      } = this._config;

      if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
        container.append(tip);
        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
      }

      this._popper = this._createPopper(tip);
      tip.classList.add(CLASS_NAME_SHOW$2); // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

      if ('ontouchstart' in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.on(element, 'mouseover', noop);
        }
      }

      const complete = () => {
        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOWN$2));

        if (this._isHovered === false) {
          this._leave();
        }

        this._isHovered = false;
      };

      this._queueCallback(complete, this.tip, this._isAnimated());
    }

    hide() {
      if (!this._isShown()) {
        return;
      }

      const hideEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDE$2));

      if (hideEvent.defaultPrevented) {
        return;
      }

      const tip = this._getTipElement();

      tip.classList.remove(CLASS_NAME_SHOW$2); // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ('ontouchstart' in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.off(element, 'mouseover', noop);
        }
      }

      this._activeTrigger[TRIGGER_CLICK] = false;
      this._activeTrigger[TRIGGER_FOCUS] = false;
      this._activeTrigger[TRIGGER_HOVER] = false;
      this._isHovered = null; // it is a trick to support manual triggering

      const complete = () => {
        if (this._isWithActiveTrigger()) {
          return;
        }

        if (!this._isHovered) {
          this._disposePopper();
        }

        this._element.removeAttribute('aria-describedby');

        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDDEN$2));
      };

      this._queueCallback(complete, this.tip, this._isAnimated());
    }

    update() {
      if (this._popper) {
        this._popper.update();
      }
    } // Protected


    _isWithContent() {
      return Boolean(this._getTitle());
    }

    _getTipElement() {
      if (!this.tip) {
        this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
      }

      return this.tip;
    }

    _createTipElement(content) {
      const tip = this._getTemplateFactory(content).toHtml(); // todo: remove this check on v6


      if (!tip) {
        return null;
      }

      tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2); // todo: on v6 the following can be achieved with CSS only

      tip.classList.add(`bs-${this.constructor.NAME}-auto`);
      const tipId = getUID(this.constructor.NAME).toString();
      tip.setAttribute('id', tipId);

      if (this._isAnimated()) {
        tip.classList.add(CLASS_NAME_FADE$2);
      }

      return tip;
    }

    setContent(content) {
      this._newContent = content;

      if (this._isShown()) {
        this._disposePopper();

        this.show();
      }
    }

    _getTemplateFactory(content) {
      if (this._templateFactory) {
        this._templateFactory.changeContent(content);
      } else {
        this._templateFactory = new TemplateFactory({ ...this._config,
          // the `content` var has to be after `this._config`
          // to override config.content in case of popover
          content,
          extraClass: this._resolvePossibleFunction(this._config.customClass)
        });
      }

      return this._templateFactory;
    }

    _getContentForTemplate() {
      return {
        [SELECTOR_TOOLTIP_INNER]: this._getTitle()
      };
    }

    _getTitle() {
      return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute('data-bs-original-title');
    } // Private


    _initializeOnDelegatedTarget(event) {
      return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
    }

    _isAnimated() {
      return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE$2);
    }

    _isShown() {
      return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW$2);
    }

    _createPopper(tip) {
      const placement = typeof this._config.placement === 'function' ? this._config.placement.call(this, tip, this._element) : this._config.placement;
      const attachment = AttachmentMap[placement.toUpperCase()];
      return Popper__namespace.createPopper(this._element, tip, this._getPopperConfig(attachment));
    }

    _getOffset() {
      const {
        offset
      } = this._config;

      if (typeof offset === 'string') {
        return offset.split(',').map(value => Number.parseInt(value, 10));
      }

      if (typeof offset === 'function') {
        return popperData => offset(popperData, this._element);
      }

      return offset;
    }

    _resolvePossibleFunction(arg) {
      return typeof arg === 'function' ? arg.call(this._element) : arg;
    }

    _getPopperConfig(attachment) {
      const defaultBsPopperConfig = {
        placement: attachment,
        modifiers: [{
          name: 'flip',
          options: {
            fallbackPlacements: this._config.fallbackPlacements
          }
        }, {
          name: 'offset',
          options: {
            offset: this._getOffset()
          }
        }, {
          name: 'preventOverflow',
          options: {
            boundary: this._config.boundary
          }
        }, {
          name: 'arrow',
          options: {
            element: `.${this.constructor.NAME}-arrow`
          }
        }, {
          name: 'preSetPlacement',
          enabled: true,
          phase: 'beforeMain',
          fn: data => {
            // Pre-set Popper's placement attribute in order to read the arrow sizes properly.
            // Otherwise, Popper mixes up the width and height dimensions since the initial arrow style is for top placement
            this._getTipElement().setAttribute('data-popper-placement', data.state.placement);
          }
        }]
      };
      return { ...defaultBsPopperConfig,
        ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
      };
    }

    _setListeners() {
      const triggers = this._config.trigger.split(' ');

      for (const trigger of triggers) {
        if (trigger === 'click') {
          EventHandler.on(this._element, this.constructor.eventName(EVENT_CLICK$1), this._config.selector, event => {
            const context = this._initializeOnDelegatedTarget(event);

            context.toggle();
          });
        } else if (trigger !== TRIGGER_MANUAL) {
          const eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN$1);
          const eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT$1);
          EventHandler.on(this._element, eventIn, this._config.selector, event => {
            const context = this._initializeOnDelegatedTarget(event);

            context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;

            context._enter();
          });
          EventHandler.on(this._element, eventOut, this._config.selector, event => {
            const context = this._initializeOnDelegatedTarget(event);

            context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);

            context._leave();
          });
        }
      }

      this._hideModalHandler = () => {
        if (this._element) {
          this.hide();
        }
      };

      EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
    }

    _fixTitle() {
      const title = this._element.getAttribute('title');

      if (!title) {
        return;
      }

      if (!this._element.getAttribute('aria-label') && !this._element.textContent.trim()) {
        this._element.setAttribute('aria-label', title);
      }

      this._element.setAttribute('data-bs-original-title', title); // DO NOT USE IT. Is only for backwards compatibility


      this._element.removeAttribute('title');
    }

    _enter() {
      if (this._isShown() || this._isHovered) {
        this._isHovered = true;
        return;
      }

      this._isHovered = true;

      this._setTimeout(() => {
        if (this._isHovered) {
          this.show();
        }
      }, this._config.delay.show);
    }

    _leave() {
      if (this._isWithActiveTrigger()) {
        return;
      }

      this._isHovered = false;

      this._setTimeout(() => {
        if (!this._isHovered) {
          this.hide();
        }
      }, this._config.delay.hide);
    }

    _setTimeout(handler, timeout) {
      clearTimeout(this._timeout);
      this._timeout = setTimeout(handler, timeout);
    }

    _isWithActiveTrigger() {
      return Object.values(this._activeTrigger).includes(true);
    }

    _getConfig(config) {
      const dataAttributes = Manipulator.getDataAttributes(this._element);

      for (const dataAttribute of Object.keys(dataAttributes)) {
        if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
          delete dataAttributes[dataAttribute];
        }
      }

      config = { ...dataAttributes,
        ...(typeof config === 'object' && config ? config : {})
      };
      config = this._mergeConfigObj(config);
      config = this._configAfterMerge(config);

      this._typeCheckConfig(config);

      return config;
    }

    _configAfterMerge(config) {
      config.container = config.container === false ? document.body : getElement(config.container);

      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }

      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }

      return config;
    }

    _getDelegateConfig() {
      const config = {};

      for (const key in this._config) {
        if (this.constructor.Default[key] !== this._config[key]) {
          config[key] = this._config[key];
        }
      }

      config.selector = false;
      config.trigger = 'manual'; // In the future can be replaced with:
      // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
      // `Object.fromEntries(keysWithDifferentValues)`

      return config;
    }

    _disposePopper() {
      if (this._popper) {
        this._popper.destroy();

        this._popper = null;
      }

      if (this.tip) {
        this.tip.remove();
        this.tip = null;
      }
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Tooltip.getOrCreateInstance(this, config);

        if (typeof config !== 'string') {
          return;
        }

        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config]();
      });
    }

  }
  /**
   * jQuery
   */


  defineJQueryPlugin(Tooltip);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): popover.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$3 = 'popover';
  const SELECTOR_TITLE = '.popover-header';
  const SELECTOR_CONTENT = '.popover-body';
  const Default$2 = { ...Tooltip.Default,
    content: '',
    offset: [0, 8],
    placement: 'right',
    template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>',
    trigger: 'click'
  };
  const DefaultType$2 = { ...Tooltip.DefaultType,
    content: '(null|string|element|function)'
  };
  /**
   * Class definition
   */

  class Popover extends Tooltip {
    // Getters
    static get Default() {
      return Default$2;
    }

    static get DefaultType() {
      return DefaultType$2;
    }

    static get NAME() {
      return NAME$3;
    } // Overrides


    _isWithContent() {
      return this._getTitle() || this._getContent();
    } // Private


    _getContentForTemplate() {
      return {
        [SELECTOR_TITLE]: this._getTitle(),
        [SELECTOR_CONTENT]: this._getContent()
      };
    }

    _getContent() {
      return this._resolvePossibleFunction(this._config.content);
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Popover.getOrCreateInstance(this, config);

        if (typeof config !== 'string') {
          return;
        }

        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config]();
      });
    }

  }
  /**
   * jQuery
   */


  defineJQueryPlugin(Popover);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$2 = 'scrollspy';
  const DATA_KEY$2 = 'bs.scrollspy';
  const EVENT_KEY$2 = `.${DATA_KEY$2}`;
  const DATA_API_KEY = '.data-api';
  const EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
  const EVENT_CLICK = `click${EVENT_KEY$2}`;
  const EVENT_LOAD_DATA_API$1 = `load${EVENT_KEY$2}${DATA_API_KEY}`;
  const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
  const CLASS_NAME_ACTIVE$1 = 'active';
  const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
  const SELECTOR_TARGET_LINKS = '[href]';
  const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
  const SELECTOR_NAV_LINKS = '.nav-link';
  const SELECTOR_NAV_ITEMS = '.nav-item';
  const SELECTOR_LIST_ITEMS = '.list-group-item';
  const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_NAV_ITEMS} > ${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`;
  const SELECTOR_DROPDOWN = '.dropdown';
  const SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
  const Default$1 = {
    offset: null,
    // TODO: v6 @deprecated, keep it for backwards compatibility reasons
    rootMargin: '0px 0px -25%',
    smoothScroll: false,
    target: null,
    threshold: [0.1, 0.5, 1]
  };
  const DefaultType$1 = {
    offset: '(number|null)',
    // TODO v6 @deprecated, keep it for backwards compatibility reasons
    rootMargin: 'string',
    smoothScroll: 'boolean',
    target: 'element',
    threshold: 'array'
  };
  /**
   * Class definition
   */

  class ScrollSpy extends BaseComponent {
    constructor(element, config) {
      super(element, config); // this._element is the observablesContainer and config.target the menu links wrapper

      this._targetLinks = new Map();
      this._observableSections = new Map();
      this._rootElement = getComputedStyle(this._element).overflowY === 'visible' ? null : this._element;
      this._activeTarget = null;
      this._observer = null;
      this._previousScrollData = {
        visibleEntryTop: 0,
        parentScrollTop: 0
      };
      this.refresh(); // initialize
    } // Getters


    static get Default() {
      return Default$1;
    }

    static get DefaultType() {
      return DefaultType$1;
    }

    static get NAME() {
      return NAME$2;
    } // Public


    refresh() {
      this._initializeTargetsAndObservables();

      this._maybeEnableSmoothScroll();

      if (this._observer) {
        this._observer.disconnect();
      } else {
        this._observer = this._getNewObserver();
      }

      for (const section of this._observableSections.values()) {
        this._observer.observe(section);
      }
    }

    dispose() {
      this._observer.disconnect();

      super.dispose();
    } // Private


    _configAfterMerge(config) {
      // TODO: on v6 target should be given explicitly & remove the {target: 'ss-target'} case
      config.target = getElement(config.target) || document.body; // TODO: v6 Only for backwards compatibility reasons. Use rootMargin only

      config.rootMargin = config.offset ? `${config.offset}px 0px -30%` : config.rootMargin;

      if (typeof config.threshold === 'string') {
        config.threshold = config.threshold.split(',').map(value => Number.parseFloat(value));
      }

      return config;
    }

    _maybeEnableSmoothScroll() {
      if (!this._config.smoothScroll) {
        return;
      } // unregister any previous listeners


      EventHandler.off(this._config.target, EVENT_CLICK);
      EventHandler.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, event => {
        const observableSection = this._observableSections.get(event.target.hash);

        if (observableSection) {
          event.preventDefault();
          const root = this._rootElement || window;
          const height = observableSection.offsetTop - this._element.offsetTop;

          if (root.scrollTo) {
            root.scrollTo({
              top: height,
              behavior: 'smooth'
            });
            return;
          } // Chrome 60 doesn't support `scrollTo`


          root.scrollTop = height;
        }
      });
    }

    _getNewObserver() {
      const options = {
        root: this._rootElement,
        threshold: this._config.threshold,
        rootMargin: this._config.rootMargin
      };
      return new IntersectionObserver(entries => this._observerCallback(entries), options);
    } // The logic of selection


    _observerCallback(entries) {
      const targetElement = entry => this._targetLinks.get(`#${entry.target.id}`);

      const activate = entry => {
        this._previousScrollData.visibleEntryTop = entry.target.offsetTop;

        this._process(targetElement(entry));
      };

      const parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
      const userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
      this._previousScrollData.parentScrollTop = parentScrollTop;

      for (const entry of entries) {
        if (!entry.isIntersecting) {
          this._activeTarget = null;

          this._clearActiveClass(targetElement(entry));

          continue;
        }

        const entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop; // if we are scrolling down, pick the bigger offsetTop

        if (userScrollsDown && entryIsLowerThanPrevious) {
          activate(entry); // if parent isn't scrolled, let's keep the first visible item, breaking the iteration

          if (!parentScrollTop) {
            return;
          }

          continue;
        } // if we are scrolling up, pick the smallest offsetTop


        if (!userScrollsDown && !entryIsLowerThanPrevious) {
          activate(entry);
        }
      }
    }

    _initializeTargetsAndObservables() {
      this._targetLinks = new Map();
      this._observableSections = new Map();
      const targetLinks = SelectorEngine.find(SELECTOR_TARGET_LINKS, this._config.target);

      for (const anchor of targetLinks) {
        // ensure that the anchor has an id and is not disabled
        if (!anchor.hash || isDisabled(anchor)) {
          continue;
        }

        const observableSection = SelectorEngine.findOne(anchor.hash, this._element); // ensure that the observableSection exists & is visible

        if (isVisible(observableSection)) {
          this._targetLinks.set(anchor.hash, anchor);

          this._observableSections.set(anchor.hash, observableSection);
        }
      }
    }

    _process(target) {
      if (this._activeTarget === target) {
        return;
      }

      this._clearActiveClass(this._config.target);

      this._activeTarget = target;
      target.classList.add(CLASS_NAME_ACTIVE$1);

      this._activateParents(target);

      EventHandler.trigger(this._element, EVENT_ACTIVATE, {
        relatedTarget: target
      });
    }

    _activateParents(target) {
      // Activate dropdown parents
      if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
        SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, target.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$1);
        return;
      }

      for (const listGroup of SelectorEngine.parents(target, SELECTOR_NAV_LIST_GROUP)) {
        // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
        for (const item of SelectorEngine.prev(listGroup, SELECTOR_LINK_ITEMS)) {
          item.classList.add(CLASS_NAME_ACTIVE$1);
        }
      }
    }

    _clearActiveClass(parent) {
      parent.classList.remove(CLASS_NAME_ACTIVE$1);
      const activeNodes = SelectorEngine.find(`${SELECTOR_TARGET_LINKS}.${CLASS_NAME_ACTIVE$1}`, parent);

      for (const node of activeNodes) {
        node.classList.remove(CLASS_NAME_ACTIVE$1);
      }
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = ScrollSpy.getOrCreateInstance(this, config);

        if (typeof config !== 'string') {
          return;
        }

        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config]();
      });
    }

  }
  /**
   * Data API implementation
   */


  EventHandler.on(window, EVENT_LOAD_DATA_API$1, () => {
    for (const spy of SelectorEngine.find(SELECTOR_DATA_SPY)) {
      ScrollSpy.getOrCreateInstance(spy);
    }
  });
  /**
   * jQuery
   */

  defineJQueryPlugin(ScrollSpy);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$1 = 'tab';
  const DATA_KEY$1 = 'bs.tab';
  const EVENT_KEY$1 = `.${DATA_KEY$1}`;
  const EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
  const EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
  const EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
  const EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
  const EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}`;
  const EVENT_KEYDOWN = `keydown${EVENT_KEY$1}`;
  const EVENT_LOAD_DATA_API = `load${EVENT_KEY$1}`;
  const ARROW_LEFT_KEY = 'ArrowLeft';
  const ARROW_RIGHT_KEY = 'ArrowRight';
  const ARROW_UP_KEY = 'ArrowUp';
  const ARROW_DOWN_KEY = 'ArrowDown';
  const CLASS_NAME_ACTIVE = 'active';
  const CLASS_NAME_FADE$1 = 'fade';
  const CLASS_NAME_SHOW$1 = 'show';
  const CLASS_DROPDOWN = 'dropdown';
  const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
  const SELECTOR_DROPDOWN_MENU = '.dropdown-menu';
  const NOT_SELECTOR_DROPDOWN_TOGGLE = ':not(.dropdown-toggle)';
  const SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
  const SELECTOR_OUTER = '.nav-item, .list-group-item';
  const SELECTOR_INNER = `.nav-link${NOT_SELECTOR_DROPDOWN_TOGGLE}, .list-group-item${NOT_SELECTOR_DROPDOWN_TOGGLE}, [role="tab"]${NOT_SELECTOR_DROPDOWN_TOGGLE}`;
  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]'; // todo:v6: could be only `tab`

  const SELECTOR_INNER_ELEM = `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`;
  const SELECTOR_DATA_TOGGLE_ACTIVE = `.${CLASS_NAME_ACTIVE}[data-bs-toggle="tab"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="pill"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="list"]`;
  /**
   * Class definition
   */

  class Tab extends BaseComponent {
    constructor(element) {
      super(element);
      this._parent = this._element.closest(SELECTOR_TAB_PANEL);

      if (!this._parent) {
        return; // todo: should Throw exception on v6
        // throw new TypeError(`${element.outerHTML} has not a valid parent ${SELECTOR_INNER_ELEM}`)
      } // Set up initial aria attributes


      this._setInitialAttributes(this._parent, this._getChildren());

      EventHandler.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
    } // Getters


    static get NAME() {
      return NAME$1;
    } // Public


    show() {
      // Shows this elem and deactivate the active sibling if exists
      const innerElem = this._element;

      if (this._elemIsActive(innerElem)) {
        return;
      } // Search for active tab on same parent to deactivate it


      const active = this._getActiveElem();

      const hideEvent = active ? EventHandler.trigger(active, EVENT_HIDE$1, {
        relatedTarget: innerElem
      }) : null;
      const showEvent = EventHandler.trigger(innerElem, EVENT_SHOW$1, {
        relatedTarget: active
      });

      if (showEvent.defaultPrevented || hideEvent && hideEvent.defaultPrevented) {
        return;
      }

      this._deactivate(active, innerElem);

      this._activate(innerElem, active);
    } // Private


    _activate(element, relatedElem) {
      if (!element) {
        return;
      }

      element.classList.add(CLASS_NAME_ACTIVE);

      this._activate(getElementFromSelector(element)); // Search and activate/show the proper section


      const complete = () => {
        if (element.getAttribute('role') !== 'tab') {
          element.classList.add(CLASS_NAME_SHOW$1);
          return;
        }

        element.removeAttribute('tabindex');
        element.setAttribute('aria-selected', true);

        this._toggleDropDown(element, true);

        EventHandler.trigger(element, EVENT_SHOWN$1, {
          relatedTarget: relatedElem
        });
      };

      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
    }

    _deactivate(element, relatedElem) {
      if (!element) {
        return;
      }

      element.classList.remove(CLASS_NAME_ACTIVE);
      element.blur();

      this._deactivate(getElementFromSelector(element)); // Search and deactivate the shown section too


      const complete = () => {
        if (element.getAttribute('role') !== 'tab') {
          element.classList.remove(CLASS_NAME_SHOW$1);
          return;
        }

        element.setAttribute('aria-selected', false);
        element.setAttribute('tabindex', '-1');

        this._toggleDropDown(element, false);

        EventHandler.trigger(element, EVENT_HIDDEN$1, {
          relatedTarget: relatedElem
        });
      };

      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
    }

    _keydown(event) {
      if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY].includes(event.key)) {
        return;
      }

      event.stopPropagation(); // stopPropagation/preventDefault both added to support up/down keys without scrolling the page

      event.preventDefault();
      const isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
      const nextActiveElement = getNextActiveElement(this._getChildren().filter(element => !isDisabled(element)), event.target, isNext, true);

      if (nextActiveElement) {
        nextActiveElement.focus({
          preventScroll: true
        });
        Tab.getOrCreateInstance(nextActiveElement).show();
      }
    }

    _getChildren() {
      // collection of inner elements
      return SelectorEngine.find(SELECTOR_INNER_ELEM, this._parent);
    }

    _getActiveElem() {
      return this._getChildren().find(child => this._elemIsActive(child)) || null;
    }

    _setInitialAttributes(parent, children) {
      this._setAttributeIfNotExists(parent, 'role', 'tablist');

      for (const child of children) {
        this._setInitialAttributesOnChild(child);
      }
    }

    _setInitialAttributesOnChild(child) {
      child = this._getInnerElement(child);

      const isActive = this._elemIsActive(child);

      const outerElem = this._getOuterElement(child);

      child.setAttribute('aria-selected', isActive);

      if (outerElem !== child) {
        this._setAttributeIfNotExists(outerElem, 'role', 'presentation');
      }

      if (!isActive) {
        child.setAttribute('tabindex', '-1');
      }

      this._setAttributeIfNotExists(child, 'role', 'tab'); // set attributes to the related panel too


      this._setInitialAttributesOnTargetPanel(child);
    }

    _setInitialAttributesOnTargetPanel(child) {
      const target = getElementFromSelector(child);

      if (!target) {
        return;
      }

      this._setAttributeIfNotExists(target, 'role', 'tabpanel');

      if (child.id) {
        this._setAttributeIfNotExists(target, 'aria-labelledby', `#${child.id}`);
      }
    }

    _toggleDropDown(element, open) {
      const outerElem = this._getOuterElement(element);

      if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
        return;
      }

      const toggle = (selector, className) => {
        const element = SelectorEngine.findOne(selector, outerElem);

        if (element) {
          element.classList.toggle(className, open);
        }
      };

      toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
      toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW$1);
      outerElem.setAttribute('aria-expanded', open);
    }

    _setAttributeIfNotExists(element, attribute, value) {
      if (!element.hasAttribute(attribute)) {
        element.setAttribute(attribute, value);
      }
    }

    _elemIsActive(elem) {
      return elem.classList.contains(CLASS_NAME_ACTIVE);
    } // Try to get the inner element (usually the .nav-link)


    _getInnerElement(elem) {
      return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine.findOne(SELECTOR_INNER_ELEM, elem);
    } // Try to get the outer element (usually the .nav-item)


    _getOuterElement(elem) {
      return elem.closest(SELECTOR_OUTER) || elem;
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Tab.getOrCreateInstance(this);

        if (typeof config !== 'string') {
          return;
        }

        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config]();
      });
    }

  }
  /**
   * Data API implementation
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }

    if (isDisabled(this)) {
      return;
    }

    Tab.getOrCreateInstance(this).show();
  });
  /**
   * Initialize on focus
   */

  EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
    for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE_ACTIVE)) {
      Tab.getOrCreateInstance(element);
    }
  });
  /**
   * jQuery
   */

  defineJQueryPlugin(Tab);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): toast.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME = 'toast';
  const DATA_KEY = 'bs.toast';
  const EVENT_KEY = `.${DATA_KEY}`;
  const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
  const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
  const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
  const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
  const EVENT_HIDE = `hide${EVENT_KEY}`;
  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
  const EVENT_SHOW = `show${EVENT_KEY}`;
  const EVENT_SHOWN = `shown${EVENT_KEY}`;
  const CLASS_NAME_FADE = 'fade';
  const CLASS_NAME_HIDE = 'hide'; // @deprecated - kept here only for backwards compatibility

  const CLASS_NAME_SHOW = 'show';
  const CLASS_NAME_SHOWING = 'showing';
  const DefaultType = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  const Default = {
    animation: true,
    autohide: true,
    delay: 5000
  };
  /**
   * Class definition
   */

  class Toast extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._timeout = null;
      this._hasMouseInteraction = false;
      this._hasKeyboardInteraction = false;

      this._setListeners();
    } // Getters


    static get Default() {
      return Default;
    }

    static get DefaultType() {
      return DefaultType;
    }

    static get NAME() {
      return NAME;
    } // Public


    show() {
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW);

      if (showEvent.defaultPrevented) {
        return;
      }

      this._clearTimeout();

      if (this._config.animation) {
        this._element.classList.add(CLASS_NAME_FADE);
      }

      const complete = () => {
        this._element.classList.remove(CLASS_NAME_SHOWING);

        EventHandler.trigger(this._element, EVENT_SHOWN);

        this._maybeScheduleHide();
      };

      this._element.classList.remove(CLASS_NAME_HIDE); // @deprecated


      reflow(this._element);

      this._element.classList.add(CLASS_NAME_SHOW, CLASS_NAME_SHOWING);

      this._queueCallback(complete, this._element, this._config.animation);
    }

    hide() {
      if (!this.isShown()) {
        return;
      }

      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);

      if (hideEvent.defaultPrevented) {
        return;
      }

      const complete = () => {
        this._element.classList.add(CLASS_NAME_HIDE); // @deprecated


        this._element.classList.remove(CLASS_NAME_SHOWING, CLASS_NAME_SHOW);

        EventHandler.trigger(this._element, EVENT_HIDDEN);
      };

      this._element.classList.add(CLASS_NAME_SHOWING);

      this._queueCallback(complete, this._element, this._config.animation);
    }

    dispose() {
      this._clearTimeout();

      if (this.isShown()) {
        this._element.classList.remove(CLASS_NAME_SHOW);
      }

      super.dispose();
    }

    isShown() {
      return this._element.classList.contains(CLASS_NAME_SHOW);
    } // Private


    _maybeScheduleHide() {
      if (!this._config.autohide) {
        return;
      }

      if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
        return;
      }

      this._timeout = setTimeout(() => {
        this.hide();
      }, this._config.delay);
    }

    _onInteraction(event, isInteracting) {
      switch (event.type) {
        case 'mouseover':
        case 'mouseout':
          {
            this._hasMouseInteraction = isInteracting;
            break;
          }

        case 'focusin':
        case 'focusout':
          {
            this._hasKeyboardInteraction = isInteracting;
            break;
          }
      }

      if (isInteracting) {
        this._clearTimeout();

        return;
      }

      const nextElement = event.relatedTarget;

      if (this._element === nextElement || this._element.contains(nextElement)) {
        return;
      }

      this._maybeScheduleHide();
    }

    _setListeners() {
      EventHandler.on(this._element, EVENT_MOUSEOVER, event => this._onInteraction(event, true));
      EventHandler.on(this._element, EVENT_MOUSEOUT, event => this._onInteraction(event, false));
      EventHandler.on(this._element, EVENT_FOCUSIN, event => this._onInteraction(event, true));
      EventHandler.on(this._element, EVENT_FOCUSOUT, event => this._onInteraction(event, false));
    }

    _clearTimeout() {
      clearTimeout(this._timeout);
      this._timeout = null;
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Toast.getOrCreateInstance(this, config);

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }

          data[config](this);
        }
      });
    }

  }
  /**
   * Data API implementation
   */


  enableDismissTrigger(Toast);
  /**
   * jQuery
   */

  defineJQueryPlugin(Toast);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): index.umd.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  const index_umd = {
    Alert,
    Button,
    Carousel,
    Collapse,
    Dropdown,
    Modal,
    Offcanvas,
    Popover,
    ScrollSpy,
    Tab,
    Toast,
    Tooltip
  };

  return index_umd;

}));
/* jshint node: true */

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

(function() {
  'use strict';

  var jqueryUjsInit = function($, undefined) {

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form:not([data-turbo=true])',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form:not([data-turbo=true]) input[type=submit], form:not([data-turbo=true]) input[type=image], form:not([data-turbo=true]) button[type=submit], form:not([data-turbo=true]) button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.on('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.off('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

  };

  if (window.jQuery) {
    jqueryUjsInit(jQuery);
  } else if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = jqueryUjsInit;
  }
})();
/*
Turbolinks 5.2.0
Copyright © 2018 Basecamp, LLC
 */
(function(){var t=this;(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame&&null!=window.addEventListener}(),visit:function(t,r){return e.controller.visit(t,r)},clearCache:function(){return e.controller.clearCache()},setProgressBarDelay:function(t){return e.controller.setProgressBarDelay(t)}}}).call(this)}).call(t);var e=t.Turbolinks;(function(){(function(){var t,r,n,o=[].slice;e.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},e.closest=function(e,r){return t.call(e,r)},t=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),e.defer=function(t){return setTimeout(t,1)},e.throttle=function(t){var e;return e=null,function(){var r;return r=1<=arguments.length?o.call(arguments,0):[],null!=e?e:e=requestAnimationFrame(function(n){return function(){return e=null,t.apply(n,r)}}(this))}},e.dispatch=function(t,e){var r,o,i,s,a,u;return a=null!=e?e:{},u=a.target,r=a.cancelable,o=a.data,i=document.createEvent("Events"),i.initEvent(t,!0,r===!0),i.data=null!=o?o:{},i.cancelable&&!n&&(s=i.preventDefault,i.preventDefault=function(){return this.defaultPrevented||Object.defineProperty(this,"defaultPrevented",{get:function(){return!0}}),s.call(this)}),(null!=u?u:document).dispatchEvent(i),i},n=function(){var t;return t=document.createEvent("Events"),t.initEvent("test",!0,!0),t.preventDefault(),t.defaultPrevented}(),e.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),e.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){e.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.requestURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=t(this.requestCanceled,this),this.requestTimedOut=t(this.requestTimedOut,this),this.requestFailed=t(this.requestFailed,this),this.requestLoaded=t(this.requestLoaded,this),this.requestProgressed=t(this.requestProgressed,this),this.url=e.Location.wrap(n).requestURL,this.referrer=e.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return e.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return e.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.ProgressBar=function(){function e(){this.trickle=t(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,e.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",e.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},e.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},e.prototype.setValue=function(t){return this.value=t,this.refresh()},e.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},e.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},e.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},e.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},e.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},e.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},e.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},e.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},e.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},e.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=t(this.showProgressBar,this),this.progressBar=new e.ProgressBar}var n,o,i;return i=e.HttpRequest,n=i.NETWORK_FAILURE,o=i.TIMEOUT_FAILURE,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case o:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,this.controller.progressBarDelay)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.History=function(){function r(e){this.delegate=e,this.onPageLoad=t(this.onPageLoad,this),this.onPopState=t(this.onPopState,this)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),addEventListener("load",this.onPageLoad,!1),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),removeEventListener("load",this.onPageLoad,!1),this.started=!1):void 0},r.prototype.push=function(t,r){return t=e.Location.wrap(t),this.update("push",t,r)},r.prototype.replace=function(t,r){return t=e.Location.wrap(t),this.update("replace",t,r)},r.prototype.onPopState=function(t){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=t.state)?n.turbolinks:void 0)?(r=e.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},r.prototype.onPageLoad=function(t){return e.defer(function(t){return function(){return t.pageLoaded=!0}}(this))},r.prototype.shouldHandlePopState=function(){return this.pageIsLoaded()},r.prototype.pageIsLoaded=function(){return this.pageLoaded||"complete"===document.readyState},r.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},r}()}.call(this),function(){e.HeadDetails=function(){function t(t){var e,r,n,s,a,u;for(this.elements={},n=0,a=t.length;a>n;n++)u=t[n],u.nodeType===Node.ELEMENT_NODE&&(s=u.outerHTML,r=null!=(e=this.elements)[s]?e[s]:e[s]={type:i(u),tracked:o(u),elements:[]},r.elements.push(u))}var e,r,n,o,i;return t.fromHeadElement=function(t){var e;return new this(null!=(e=null!=t?t.childNodes:void 0)?e:[])},t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},t.prototype.getMetaValue=function(t){var e;return null!=(e=this.findMetaElementByName(t))?e.getAttribute("content"):void 0},t.prototype.findMetaElementByName=function(t){var r,n,o,i;r=void 0,i=this.elements;for(o in i)n=i[o].elements,e(n[0],t)&&(r=n[0]);return r},i=function(t){return r(t)?"script":n(t)?"stylesheet":void 0},o=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},r=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},n=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},e=function(t,e){var r;return r=t.tagName.toLowerCase(),"meta"===r&&t.getAttribute("name")===e},t}()}.call(this),function(){e.Snapshot=function(){function t(t,e){this.headDetails=t,this.bodyElement=e}return t.wrap=function(t){return t instanceof this?t:"string"==typeof t?this.fromHTMLString(t):this.fromHTMLElement(t)},t.fromHTMLString=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromHTMLElement(e)},t.fromHTMLElement=function(t){var r,n,o,i;return o=t.querySelector("head"),r=null!=(i=t.querySelector("body"))?i:document.createElement("body"),n=e.HeadDetails.fromHeadElement(o),new this(n,r)},t.prototype.clone=function(){return new this.constructor(this.headDetails,this.bodyElement.cloneNode(!0))},t.prototype.getRootLocation=function(){var t,r;return r=null!=(t=this.getSetting("root"))?t:"/",new e.Location(r)},t.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},t.prototype.getElementForAnchor=function(t){try{return this.bodyElement.querySelector("[id='"+t+"'], a[name='"+t+"']")}catch(e){}},t.prototype.getPermanentElements=function(){return this.bodyElement.querySelectorAll("[id][data-turbolinks-permanent]")},t.prototype.getPermanentElementById=function(t){return this.bodyElement.querySelector("#"+t+"[data-turbolinks-permanent]")},t.prototype.getPermanentElementsPresentInSnapshot=function(t){var e,r,n,o,i;for(o=this.getPermanentElements(),i=[],r=0,n=o.length;n>r;r++)e=o[r],t.getPermanentElementById(e.id)&&i.push(e);return i},t.prototype.findFirstAutofocusableElement=function(){return this.bodyElement.querySelector("[autofocus]")},t.prototype.hasAnchor=function(t){return null!=this.getElementForAnchor(t)},t.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},t.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},t.prototype.isVisitable=function(){return"reload"!==this.getSetting("visit-control")},t.prototype.getSetting=function(t){return this.headDetails.getMetaValue("turbolinks-"+t)},t}()}.call(this),function(){var t=[].slice;e.Renderer=function(){function e(){}var r;return e.render=function(){var e,r,n,o;return n=arguments[0],r=arguments[1],e=3<=arguments.length?t.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,e,function(){}),o.delegate=n,o.render(r),o},e.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},e.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},e.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,e.async=!1,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},e}()}.call(this),function(){var t,r,n=function(t,e){function r(){this.constructor=t}for(var n in e)o.call(e,n)&&(t[n]=e[n]);return r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype,t},o={}.hasOwnProperty;e.SnapshotRenderer=function(e){function o(t,e,r){this.currentSnapshot=t,this.newSnapshot=e,this.isPreview=r,this.currentHeadDetails=this.currentSnapshot.headDetails,this.newHeadDetails=this.newSnapshot.headDetails,this.currentBody=this.currentSnapshot.bodyElement,this.newBody=this.newSnapshot.bodyElement}return n(o,e),o.prototype.render=function(t){return this.shouldRender()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.isPreview||e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},o.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},o.prototype.replaceBody=function(){var t;return t=this.relocateCurrentBodyPermanentElements(),this.activateNewBodyScriptElements(),this.assignNewBody(),this.replacePlaceholderElementsWithClonedPermanentElements(t)},o.prototype.shouldRender=function(){return this.newSnapshot.isVisitable()&&this.trackedElementsAreIdentical()},o.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},o.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},o.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},o.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},o.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},o.prototype.relocateCurrentBodyPermanentElements=function(){var e,n,o,i,s,a,u;for(a=this.getCurrentBodyPermanentElements(),u=[],e=0,n=a.length;n>e;e++)i=a[e],s=t(i),o=this.newSnapshot.getPermanentElementById(i.id),r(i,s.element),r(o,i),u.push(s);return u},o.prototype.replacePlaceholderElementsWithClonedPermanentElements=function(t){var e,n,o,i,s,a,u;for(u=[],o=0,i=t.length;i>o;o++)a=t[o],n=a.element,s=a.permanentElement,e=s.cloneNode(!0),u.push(r(n,e));return u},o.prototype.activateNewBodyScriptElements=function(){var t,e,n,o,i,s;for(i=this.getNewBodyScriptElements(),s=[],e=0,o=i.length;o>e;e++)n=i[e],t=this.createScriptElement(n),s.push(r(n,t));return s},o.prototype.assignNewBody=function(){return document.body=this.newBody},o.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.newSnapshot.findFirstAutofocusableElement())?t.focus():void 0},o.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},o.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},o.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},o.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},o.prototype.getCurrentBodyPermanentElements=function(){return this.currentSnapshot.getPermanentElementsPresentInSnapshot(this.newSnapshot)},o.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},o}(e.Renderer),t=function(t){var e;return e=document.createElement("meta"),e.setAttribute("name","turbolinks-permanent-placeholder"),e.setAttribute("content",t.id),{element:e,permanentElement:t}},r=function(t,e){var r;return(r=t.parentNode)?r.replaceChild(e,t):void 0}}.call(this),function(){var t=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;e.ErrorRenderer=function(e){function r(t){var e;e=document.createElement("html"),e.innerHTML=t,this.newHead=e.querySelector("head"),this.newBody=e.querySelector("body")}return t(r,e),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceHeadAndBody(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceHeadAndBody=function(){var t,e;return e=document.head,t=document.body,e.parentNode.replaceChild(this.newHead,e),t.parentNode.replaceChild(this.newBody,t)},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(e.Renderer)}.call(this),function(){e.View=function(){function t(t){this.delegate=t,this.htmlElement=document.documentElement}return t.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},t.prototype.getElementForAnchor=function(t){return this.getSnapshot().getElementForAnchor(t)},t.prototype.getSnapshot=function(){return e.Snapshot.fromHTMLElement(this.htmlElement)},t.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,n,e):this.renderError(r,e)},t.prototype.markAsPreview=function(t){return t?this.htmlElement.setAttribute("data-turbolinks-preview",""):this.htmlElement.removeAttribute("data-turbolinks-preview")},t.prototype.renderSnapshot=function(t,r,n){return e.SnapshotRenderer.render(this.delegate,n,this.getSnapshot(),e.Snapshot.wrap(t),r)},t.prototype.renderError=function(t,r){return e.ErrorRenderer.render(this.delegate,r,t)},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.ScrollManager=function(){function r(r){this.delegate=r,this.onScroll=t(this.onScroll,this),this.onScroll=e.throttle(this.onScroll)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},r.prototype.scrollToElement=function(t){return t.scrollIntoView()},r.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},r.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},r.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},r}()}.call(this),function(){e.SnapshotCache=function(){function t(t){this.size=t,this.keys=[],this.snapshots={}}var r;return t.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},t.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},t.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},t.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},t.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},t.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},t.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(t){return e.Location.wrap(t).toCacheKey()},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=t(this.performScroll,this),this.identifier=e.uuid(),this.location=e.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new e.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(t,r){return this.response=t,null!=r&&(this.redirectedToLocation=e.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return e.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.Controller=function(){function r(){this.clickBubbled=t(this.clickBubbled,this),this.clickCaptured=t(this.clickCaptured,this),this.pageLoaded=t(this.pageLoaded,this),this.history=new e.History(this),this.view=new e.View(this),this.scrollManager=new e.ScrollManager(this),this.restorationData={},this.clearCache(),this.setProgressBarDelay(500)}return r.prototype.start=function(){return e.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new e.SnapshotCache(10)},r.prototype.visit=function(t,r){var n,o;return null==r&&(r={}),t=e.Location.wrap(t),this.applicationAllowsVisitingLocation(t)?this.locationIsVisitable(t)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(t,n)):window.location=t:void 0},r.prototype.startVisitToLocationWithAction=function(t,r,n){var o;return e.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(t,r,{restorationData:o})):window.location=t},r.prototype.setProgressBarDelay=function(t){return this.progressBarDelay=t},r.prototype.startHistory=function(){return this.location=e.Location.wrap(window.location),this.restorationIdentifier=e.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(t,r){return this.restorationIdentifier=r,this.location=e.Location.wrap(t),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(t,r){return this.restorationIdentifier=r,this.location=e.Location.wrap(t),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(t,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(t,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=e.Location.wrap(t)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return null!=(e=this.cache.get(t))?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable();
},r.prototype.cacheSnapshot=function(){var t,r;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),r=this.view.getSnapshot(),t=this.lastRenderedLocation,e.defer(function(e){return function(){return e.cache.put(t,r.clone())}}(this))):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=this.view.getElementForAnchor(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(t,r){return e.dispatch("turbolinks:click",{target:t,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(t){return e.dispatch("turbolinks:before-visit",{data:{url:t.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(t){return e.dispatch("turbolinks:visit",{data:{url:t.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return e.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(t){return e.dispatch("turbolinks:before-render",{data:{newBody:t}})},r.prototype.notifyApplicationAfterRender=function(){return e.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(t){return null==t&&(t={}),e.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:t}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(t,r,n){var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new e.Visit(this,t,r),u.restorationIdentifier=null!=a?a:e.uuid(),u.restorationData=e.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(t){return this.nodeIsVisitable(t)?e.closest(t,"a[href]:not([target]):not([download])"):void 0},r.prototype.getVisitableLocationForLink=function(t){var r;return r=new e.Location(t.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(t){var r;return(r=e.closest(t,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){!function(){var t,e;if((t=e=document.currentScript)&&!e.hasAttribute("data-turbolinks-suppress-warning"))for(;t=t.parentNode;)if(t===document.body)return console.warn("You are loading Turbolinks from a <script> element inside the <body> element. This is probably not what you meant to do!\n\nLoad your application\u2019s JavaScript bundle inside the <head> element instead. <script> elements in <body> are evaluated with each page change.\n\nFor more information, see: https://github.com/turbolinks/turbolinks#working-with-script-elements\n\n\u2014\u2014\nSuppress this warning by adding a `data-turbolinks-suppress-warning` attribute to: %s",e.outerHTML)}()}.call(this),function(){var t,r,n;e.start=function(){return r()?(null==e.controller&&(e.controller=t()),e.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=e),n()},t=function(){var t;return t=new e.Controller,t.adapter=new e.BrowserAdapter(t),t},n=function(){return window.Turbolinks===e},n()&&e.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=e:"function"==typeof define&&define.amd&&define(e)}).call(this);
/**
 * Encoding.js
 *
 * @description    Converts character encoding.
 * @fileoverview   Encoding library
 * @author         polygon planet
 * @version        1.0.25
 * @date           2016-11-03
 * @link           https://github.com/polygonplanet/encoding.js
 * @copyright      Copyright (c) 2013-2016 polygon planet <polygon.planet.aqua@gmail.com>
 * @license        licensed under the MIT license.
 *
 * Based:
 *   - mbstring library
 *   - posql charset library
 *   - libxml2
 *   - pot.js
 */

/*jshint bitwise:false,eqnull:true,newcap:false */

(function (name, context, factory) {

// Supports UMD. AMD, CommonJS/Node.js and browser context
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    exports[name] = factory();
  }
} else if (typeof define === 'function' && define.amd) {
  define(factory);
} else {
  context[name] = factory();
}

})('Encoding', this, function () {
'use strict';

var UTF8_UNKNOWN = '?'.charCodeAt(0);

var fromCharCode = String.fromCharCode;
var slice = Array.prototype.slice;
var toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

var HAS_TYPED = typeof Uint8Array !== 'undefined' &&
                typeof Uint16Array !== 'undefined';

// Test for String.fromCharCode.apply.
var CAN_CHARCODE_APPLY = false;
var CAN_CHARCODE_APPLY_TYPED = false;

try {
  if (fromCharCode.apply(null, [0x61]) === 'a') {
    CAN_CHARCODE_APPLY = true;
  }
} catch (e) {}

if (HAS_TYPED) {
  try {
    if (fromCharCode.apply(null, new Uint8Array([0x61])) === 'a') {
      CAN_CHARCODE_APPLY_TYPED = true;
    }
  } catch (e) {}
}

// Function.prototype.apply stack max range
var APPLY_BUFFER_SIZE = 65533;
var APPLY_BUFFER_SIZE_OK = null;


/**
 * Encoding names.
 *
 * @ignore
 */
var EncodingNames = {
  UTF32: {
    order: 0
  },
  UTF32BE: {
    alias: ['UCS4']
  },
  UTF32LE: null,
  UTF16: {
    order: 1
  },
  UTF16BE: {
    alias: ['UCS2']
  },
  UTF16LE: null,
  BINARY: {
    order: 2
  },
  ASCII: {
    order: 3,
    alias: ['ISO646', 'CP367']
  },
  JIS: {
    order: 4,
    alias: ['ISO2022JP']
  },
  UTF8: {
    order: 5
  },
  EUCJP: {
    order: 6
  },
  SJIS: {
    order: 7,
    alias: ['CP932', 'MSKANJI', 'WINDOWS31J']
  },
  UNICODE: {
    order: 8
  }
};

/**
 * Encoding alias names.
 *
 * @ignore
 */
var EncodingAliases = {};

/**
 * Encoding orders.
 *
 * @ignore
 */
var EncodingOrders = (function() {
  var aliases = EncodingAliases;

  var names = getKeys(EncodingNames);
  var orders = [];
  var name, encoding, j, l;

  for (var i = 0, len = names.length; i < len; i++) {
    name = names[i];
    aliases[name] = name;

    encoding = EncodingNames[name];
    if (encoding != null) {
      if (typeof encoding.order !== 'undefined') {
        orders[orders.length] = name;
      }

      if (encoding.alias) {
        // Create the encoding aliases.
        for (j = 0, l = encoding.alias.length; j < l; j++) {
          aliases[encoding.alias[j]] = name;
        }
      }
    }
  }

  orders.sort(function(a, b) {
    return EncodingNames[a].order - EncodingNames[b].order;
  });

  return orders;
}());


/**
 * Encoding.
 *
 * @name Encoding
 * @type {Object}
 * @public
 * @class
 */
var Encoding = {
  /**
   * @lends Encoding
   */
  /**
   * Encoding orders.
   *
   * @ignore
   */
  orders: EncodingOrders,
  /**
   * Detects character encoding.
   *
   * If encodings is "AUTO", or the encoding-list as an array, or
   *   comma separated list string it will be detected automatically.
   *
   * @param {Array.<number>|TypedArray|string} data The data being detected.
   * @param {(Object|string|Array.<string>)=} [encodings] The encoding-list of
   *   character encoding.
   * @return {string|boolean} The detected character encoding, or false.
   *
   * @public
   * @function
   */
  detect: function(data, encodings) {
    if (data == null || data.length === 0) {
      return false;
    }

    if (isObject(encodings) && !isArray(encodings)) {
      encodings = encodings.encoding;
    }

    if (isString(data)) {
      data = stringToBuffer(data);
    }

    if (encodings == null) {
      encodings = Encoding.orders;
    } else {
      if (isString(encodings)) {
        encodings = encodings.toUpperCase();
        if (encodings === 'AUTO') {
          encodings = Encoding.orders;
        } else if (~encodings.indexOf(',')) {
          encodings = encodings.split(/\s*,\s*/);
        } else {
          encodings = [encodings];
        }
      }
    }

    var len = encodings.length;
    var e, encoding, method;
    for (var i = 0; i < len; i++) {
      e = encodings[i];
      encoding = assignEncodingName(e);
      if (!encoding) {
        continue;
      }

      method = 'is' + encoding;
      if (!hasOwnProperty.call(EncodingDetect, method)) {
        throw new Error('Undefined encoding: ' + e);
      }

      if (EncodingDetect[method](data)) {
        return encoding;
      }
    }

    return false;
  },
  /**
   * Convert character encoding.
   *
   * If `from` is "AUTO", or the encoding-list as an array, or
   *   comma separated list string it will be detected automatically.
   *
   * @param {Array.<number>|TypedArray|string} data The data being converted.
   * @param {(string|Object)} to The name of encoding to.
   * @param {(string|Array.<string>)=} [from] The encoding-list of
   *   character encoding.
   * @return {Array|TypedArray|string} The converted data.
   *
   * @public
   * @function
   */
  convert: function(data, to, from) {
    var result;
    var type;
    var options = {};

    if (isObject(to)) {
      options = to;
      from = options.from;
      to = options.to;
      if (options.type) {
        type = options.type;
      }
    }

    if (isString(data)) {
      type = type || 'string';
      data = stringToBuffer(data);
    } else if (data == null || data.length === 0) {
      data = [];
    }

    var encodingFrom;
    if (from != null && isString(from) &&
        from.toUpperCase() !== 'AUTO' && !~from.indexOf(',')) {
      encodingFrom = assignEncodingName(from);
    } else {
      encodingFrom = Encoding.detect(data);
    }

    var encodingTo = assignEncodingName(to);
    var method = encodingFrom + 'To' + encodingTo;

    if (hasOwnProperty.call(EncodingConvert, method)) {
      result = EncodingConvert[method](data, options);
    } else {
      // Returns the raw data if the method is undefined.
      result = data;
    }

    switch (('' + type).toLowerCase()) {
      case 'string':
        return codeToString_fast(result);
      case 'arraybuffer':
        return codeToBuffer(result);
      case 'array':
        /* falls through */
      default:
        return bufferToCode(result);
    }
  },
  /**
   * Encode a character code array to URL string like encodeURIComponent.
   *
   * @param {Array.<number>|TypedArray} data The data being encoded.
   * @return {string} The percent encoded string.
   *
   * @public
   * @function
   */
  urlEncode: function(data) {
    if (isString(data)) {
      data = stringToBuffer(data);
    }

    var alpha = stringToCode('0123456789ABCDEF');
    var results = [];
    var i = 0;
    var len = data && data.length;
    var b;

    for (; i < len; i++) {
      b = data[i];

      //FIXME: JavaScript UTF-16 encoding
      if (b > 0xFF) {
        return encodeURIComponent(codeToString_fast(data));
      }

      if ((b >= 0x61 /*a*/ && b <= 0x7A /*z*/) ||
          (b >= 0x41 /*A*/ && b <= 0x5A /*Z*/) ||
          (b >= 0x30 /*0*/ && b <= 0x39 /*9*/) ||
          b === 0x21 /*!*/ ||
          (b >= 0x27 /*'*/ && b <= 0x2A /***/) ||
          b === 0x2D /*-*/ || b === 0x2E /*.*/ ||
          b === 0x5F /*_*/ || b === 0x7E /*~*/
      ) {
        results[results.length] = b;
      } else {
        results[results.length] = 0x25; /*%*/
        if (b < 0x10) {
          results[results.length] = 0x30; /*0*/
          results[results.length] = alpha[b];
        } else {
          results[results.length] = alpha[b >> 4 & 0xF];
          results[results.length] = alpha[b & 0xF];
        }
      }
    }

    return codeToString_fast(results);
  },
  /**
   * Decode a percent encoded string to
   *  character code array like decodeURIComponent.
   *
   * @param {string} string The data being decoded.
   * @return {Array.<number>} The decoded array.
   *
   * @public
   * @function
   */
  urlDecode: function(string) {
    var results = [];
    var i = 0;
    var len = string && string.length;
    var c;

    while (i < len) {
      c = string.charCodeAt(i++);
      if (c === 0x25 /*%*/) {
        results[results.length] = parseInt(
          string.charAt(i++) + string.charAt(i++), 16);
      } else {
        results[results.length] = c;
      }
    }

    return results;
  },
  /**
   * Encode a character code array to Base64 encoded string.
   *
   * @param {Array.<number>|TypedArray} data The data being encoded.
   * @return {string} The Base64 encoded string.
   *
   * @public
   * @function
   */
  base64Encode: function(data) {
    if (isString(data)) {
      data = stringToBuffer(data);
    }
    return base64encode(data);
  },
  /**
   * Decode a Base64 encoded string to character code array.
   *
   * @param {string} string The data being decoded.
   * @return {Array.<number>} The decoded array.
   *
   * @public
   * @function
   */
  base64Decode: function(string) {
    return base64decode(string);
  },
  /**
   * Joins a character code array to string.
   *
   * @param {Array.<number>|TypedArray} data The data being joined.
   * @return {String} The joined string.
   *
   * @public
   * @function
   */
  codeToString: codeToString_fast,
  /**
   * Splits string to an array of character codes.
   *
   * @param {string} string The input string.
   * @return {Array.<number>} The character code array.
   *
   * @public
   * @function
   */
  stringToCode: stringToCode,
  /**
   * 全角英数記号文字を半角英数記号文字に変換
   *
   * Convert the ascii symbols and alphanumeric characters to
   *   the zenkaku symbols and alphanumeric characters.
   *
   * @example
   *   console.log(Encoding.toHankakuCase('Ｈｅｌｌｏ Ｗｏｒｌｄ！ １２３４５'));
   *   // 'Hello World! 12345'
   *
   * @param {Array.<number>|TypedArray|string} data The input unicode data.
   * @return {Array.<number>|string} The conveted data.
   *
   * @public
   * @function
   */
  toHankakuCase: function(data) {
    var asString = false;
    if (isString(data)) {
      asString = true;
      data = stringToBuffer(data);
    }

    var results = [];
    var len = data && data.length;
    var i = 0;
    var c;

    while (i < len) {
      c = data[i++];
      if (c >= 0xFF01 && c <= 0xFF5E) {
        c -= 0xFEE0;
      }
      results[results.length] = c;
    }

    return asString ? codeToString_fast(results) : results;
  },
  /**
   * 半角英数記号文字を全角英数記号文字に変換
   *
   * Convert to the zenkaku symbols and alphanumeric characters
   *  from the ascii symbols and alphanumeric characters.
   *
   * @example
   *   console.log(Encoding.toZenkakuCase('Hello World! 12345'));
   *   // 'Ｈｅｌｌｏ Ｗｏｒｌｄ！ １２３４５'
   *
   * @param {Array.<number>|TypedArray|string} data The input unicode data.
   * @return {Array.<number>|string} The conveted data.
   *
   * @public
   * @function
   */
  toZenkakuCase: function(data) {
    var asString = false;
    if (isString(data)) {
      asString = true;
      data = stringToBuffer(data);
    }

    var results = [];
    var len = data && data.length;
    var i = 0;
    var c;

    while (i < len) {
      c = data[i++];
      if (c >= 0x21 && c <= 0x7E) {
        c += 0xFEE0;
      }
      results[results.length] = c;
    }

    return asString ? codeToString_fast(results) : results;
  },
  /**
   * 全角カタカナを全角ひらがなに変換
   *
   * Convert to the zenkaku hiragana from the zenkaku katakana.
   *
   * @example
   *   console.log(Encoding.toHiraganaCase('ボポヴァアィイゥウェエォオ'));
   *   // 'ぼぽう゛ぁあぃいぅうぇえぉお'
   *
   * @param {Array.<number>|TypedArray|string} data The input unicode data.
   * @return {Array.<number>|string} The conveted data.
   *
   * @public
   * @function
   */
  toHiraganaCase: function(data) {
    var asString = false;
    if (isString(data)) {
      asString = true;
      data = stringToBuffer(data);
    }

    var results = [];
    var len = data && data.length;
    var i = 0;
    var c;

    while (i < len) {
      c = data[i++];
      if (c >= 0x30A1 && c <= 0x30F6) {
        c -= 0x0060;
      // 「ワ゛」 => 「わ」 + 「゛」
      } else if (c === 0x30F7) {
        results[results.length] = 0x308F;
        c = 0x309B;
      // 「ヲ゛」 => 「を」 + 「゛」
      } else if (c === 0x30FA) {
        results[results.length] = 0x3092;
        c = 0x309B;
      }
      results[results.length] = c;
    }

    return asString ? codeToString_fast(results) : results;
  },
  /**
   * 全角ひらがなを全角カタカナに変換
   *
   * Convert to the zenkaku katakana from the zenkaku hiragana.
   *
   * @example
   *   console.log(Encoding.toKatakanaCase('ぼぽう゛ぁあぃいぅうぇえぉお'));
   *   // 'ボポヴァアィイゥウェエォオ'
   *
   * @param {Array.<number>|TypedArray|string} data The input unicode data.
   * @return {Array.<number>|string} The conveted data.
   *
   * @public
   * @function
   */
  toKatakanaCase: function(data) {
    var asString = false;
    if (isString(data)) {
      asString = true;
      data = stringToBuffer(data);
    }

    var results = [];
    var len = data && data.length;
    var i = 0;
    var c;

    while (i < len) {
      c = data[i++];
      if (c >= 0x3041 && c <= 0x3096) {
        if ((c === 0x308F || // 「わ」 + 「゛」 => 「ワ゛」
             c === 0x3092) && // 「を」 + 「゛」 => 「ヲ゛」
            i < len && data[i] === 0x309B) {
          c = c === 0x308F ? 0x30F7 : 0x30FA;
          i++;
        } else {
          c += 0x0060;
        }
      }
      results[results.length] = c;
    }

    return asString ? codeToString_fast(results) : results;
  },
  /**
   * 全角カタカナを半角ｶﾀｶﾅに変換
   *
   * Convert to the hankaku katakana from the zenkaku katakana.
   *
   * @example
   *   console.log(Encoding.toHankanaCase('ボポヴァアィイゥウェエォオ'));
   *   // 'ﾎﾞﾎﾟｳﾞｧｱｨｲｩｳｪｴｫｵ'
   *
   * @param {Array.<number>|TypedArray|string} data The input unicode data.
   * @return {Array.<number>|string} The conveted data.
   *
   * @public
   * @function
   */
  toHankanaCase: function(data) {
    var asString = false;
    if (isString(data)) {
      asString = true;
      data = stringToBuffer(data);
    }

    var results = [];
    var len = data && data.length;
    var i = 0;
    var c, d, t;

    while (i < len) {
      c = data[i++];

      if (c >= 0x3001 && c <= 0x30FC) {
        t = hankanaCase_table[c];
        if (t !== void 0) {
          results[results.length] = t;
          continue;
        }
      }

      // 「ヴ」, 「ワ」+「゛」, 「ヲ」+「゛」
      if (c === 0x30F4 || c === 0x30F7 || c === 0x30FA) {
        results[results.length] = hankanaCase_sonants[c];
        results[results.length] = 0xFF9E;
        // 「カ」 - 「ド」
      } else if (c >= 0x30AB && c <= 0x30C9) {
        results[results.length] = hankanaCase_table[c - 1];
        results[results.length] = 0xFF9E;
        // 「ハ」 - 「ポ」
      } else if (c >= 0x30CF && c <= 0x30DD) {
        d = c % 3;
        results[results.length] = hankanaCase_table[c - d];
        results[results.length] = hankanaCase_marks[d - 1];
      } else {
        results[results.length] = c;
      }
    }

    return asString ? codeToString_fast(results) : results;
  },
  /**
   * 半角ｶﾀｶﾅを全角カタカナに変換 (濁音含む)
   *
   * Convert to the zenkaku katakana from the hankaku katakana.
   *
   * @example
   *   console.log(Encoding.toZenkanaCase('ﾎﾞﾎﾟｳﾞｧｱｨｲｩｳｪｴｫｵ'));
   *   // 'ボポヴァアィイゥウェエォオ'
   *
   * @param {Array.<number>|TypedArray|string} data The input unicode data.
   * @return {Array.<number>|string} The conveted data.
   *
   * @public
   * @function
   */
  toZenkanaCase: function(data) {
    var asString = false;
    if (isString(data)) {
      asString = true;
      data = stringToBuffer(data);
    }

    var results = [];
    var len = data && data.length;
    var i = 0;
    var c, code, next;

    for (i = 0; i < len; i++) {
      c = data[i];
      // Hankaku katakana
      if (c > 0xFF60 && c < 0xFFA0) {
        code = zenkanaCase_table[c - 0xFF61];
        if (i + 1 < len) {
          next = data[i + 1];
          // 「ﾞ」 + 「ヴ」
          if (next === 0xFF9E && c === 0xFF73) {
            code = 0x30F4;
            i++;
          // 「ﾞ」 + 「ワ゛」
          } else if (next === 0xFF9E && c === 0xFF9C) {
            code = 0x30F7;
            i++;
          // 「ﾞ」 + 「ｦ゛」
          } else if (next === 0xFF9E && c === 0xFF66) {
            code = 0x30FA;
            i++;
            // 「ﾞ」 + 「カ」 - 「コ」 or 「ハ」 - 「ホ」
          } else if (next === 0xFF9E &&
                     ((c > 0xFF75 && c < 0xFF85) ||
                      (c > 0xFF89 && c < 0xFF8F))) {
            code++;
            i++;
            // 「ﾟ」 + 「ハ」 - 「ホ」
          } else if (next === 0xFF9F &&
                     (c > 0xFF89 && c < 0xFF8F)) {
            code += 2;
            i++;
          }
        }
        c = code;
      }
      results[results.length] = c;
    }

    return asString ? codeToString_fast(results) : results;
  },
  /**
   * 全角スペースを半角スペースに変換
   *
   * Convert the em space(U+3000) to the single space(U+0020).
   *
   * @param {Array.<number>|TypedArray|string} data The input unicode data.
   * @return {Array.<number>|string} The conveted data.
   *
   * @public
   * @function
   */
  toHankakuSpace: function(data) {
    if (isString(data)) {
      return data.replace(/\u3000/g, ' ');
    }

    var results = [];
    var len = data && data.length;
    var i = 0;
    var c;

    while (i < len) {
      c = data[i++];
      if (c === 0x3000) {
        c = 0x20;
      }
      results[results.length] = c;
    }

    return results;
  },
  /**
   * 半角スペースを全角スペースに変換
   *
   * Convert the single space(U+0020) to the em space(U+3000).
   *
   * @param {Array.<number>|TypedArray|string} data The input unicode data.
   * @return {Array.<number>|string} The conveted data.
   *
   * @public
   * @function
   */
  toZenkakuSpace: function(data) {
    if (isString(data)) {
      return data.replace(/\u0020/g, '\u3000');
    }

    var results = [];
    var len = data && data.length;
    var i = 0;
    var c;

    while (i < len) {
      c = data[i++];
      if (c === 0x20) {
        c = 0x3000;
      }
      results[results.length] = c;
    }

    return results;
  }
};


/**
 * @private
 * @ignore
 */
var EncodingDetect = {
  isBINARY: isBINARY,
  isASCII: isASCII,
  isJIS: isJIS,
  isEUCJP: isEUCJP,
  isSJIS: isSJIS,
  isUTF8: isUTF8,
  isUTF16: isUTF16,
  isUTF16BE: isUTF16BE,
  isUTF16LE: isUTF16LE,
  isUTF32: isUTF32,
  isUNICODE: isUNICODE
};

/**
 * @private
 * @ignore
 */
var EncodingConvert = {
  // JIS, EUCJP, SJIS
  JISToEUCJP: JISToEUCJP,
  EUCJPToJIS: EUCJPToJIS,
  JISToSJIS: JISToSJIS,
  SJISToJIS: SJISToJIS,
  EUCJPToSJIS: EUCJPToSJIS,
  SJISToEUCJP: SJISToEUCJP,

  // UTF8
  JISToUTF8: JISToUTF8,
  UTF8ToJIS: UTF8ToJIS,
  EUCJPToUTF8: EUCJPToUTF8,
  UTF8ToEUCJP: UTF8ToEUCJP,
  SJISToUTF8: SJISToUTF8,
  UTF8ToSJIS: UTF8ToSJIS,

  // UNICODE
  UNICODEToUTF8: UNICODEToUTF8,
  UTF8ToUNICODE: UTF8ToUNICODE,
  UNICODEToJIS: UNICODEToJIS,
  JISToUNICODE: JISToUNICODE,
  UNICODEToEUCJP: UNICODEToEUCJP,
  EUCJPToUNICODE: EUCJPToUNICODE,
  UNICODEToSJIS: UNICODEToSJIS,
  SJISToUNICODE: SJISToUNICODE,

  // UTF16, UNICODE
  UNICODEToUTF16: UNICODEToUTF16,
  UTF16ToUNICODE: UTF16ToUNICODE,
  UNICODEToUTF16BE: UNICODEToUTF16BE,
  UTF16BEToUNICODE: UTF16BEToUNICODE,
  UNICODEToUTF16LE: UNICODEToUTF16LE,
  UTF16LEToUNICODE: UTF16LEToUNICODE,

  // UTF16, UTF16BE, UTF16LE
  UTF8ToUTF16: UTF8ToUTF16,
  UTF16ToUTF8: UTF16ToUTF8,
  UTF8ToUTF16BE: UTF8ToUTF16BE,
  UTF16BEToUTF8: UTF16BEToUTF8,
  UTF8ToUTF16LE: UTF8ToUTF16LE,
  UTF16LEToUTF8: UTF16LEToUTF8,
  UTF16ToUTF16BE: UTF16ToUTF16BE,
  UTF16BEToUTF16: UTF16BEToUTF16,
  UTF16ToUTF16LE: UTF16ToUTF16LE,
  UTF16LEToUTF16: UTF16LEToUTF16,
  UTF16BEToUTF16LE: UTF16BEToUTF16LE,
  UTF16LEToUTF16BE: UTF16LEToUTF16BE,

  // UTF16, JIS
  JISToUTF16: JISToUTF16,
  UTF16ToJIS: UTF16ToJIS,
  JISToUTF16BE: JISToUTF16BE,
  UTF16BEToJIS: UTF16BEToJIS,
  JISToUTF16LE: JISToUTF16LE,
  UTF16LEToJIS: UTF16LEToJIS,

  // UTF16, EUCJP
  EUCJPToUTF16: EUCJPToUTF16,
  UTF16ToEUCJP: UTF16ToEUCJP,
  EUCJPToUTF16BE: EUCJPToUTF16BE,
  UTF16BEToEUCJP: UTF16BEToEUCJP,
  EUCJPToUTF16LE: EUCJPToUTF16LE,
  UTF16LEToEUCJP: UTF16LEToEUCJP,

  // UTF16, SJIS
  SJISToUTF16: SJISToUTF16,
  UTF16ToSJIS: UTF16ToSJIS,
  SJISToUTF16BE: SJISToUTF16BE,
  UTF16BEToSJIS: UTF16BEToSJIS,
  SJISToUTF16LE: SJISToUTF16LE,
  UTF16LEToSJIS: UTF16LEToSJIS
};


/**
 * Binary (exe, images and so, etc.)
 *
 * Note:
 *   This function is not considered for Unicode
 *
 * @private
 * @ignore
 */
function isBINARY(data) {
  var i = 0;
  var len = data && data.length;
  var c;

  for (; i < len; i++) {
    c = data[i];
    if (c > 0xFF) {
      return false;
    }

    if ((c >= 0x00 && c <= 0x07) || c === 0xFF) {
      return true;
    }
  }

  return false;
}

/**
 * ASCII (ISO-646)
 *
 * @private
 * @ignore
 */
function isASCII(data) {
  var i = 0;
  var len = data && data.length;
  var b;

  for (; i < len; i++) {
    b = data[i];
    if (b > 0xFF ||
        (b >= 0x80 && b <= 0xFF) ||
        b === 0x1B) {
      return false;
    }
  }

  return true;
}

/**
 * ISO-2022-JP (JIS)
 *
 * RFC1468 Japanese Character Encoding for Internet Messages
 * RFC1554 ISO-2022-JP-2: Multilingual Extension of ISO-2022-JP
 * RFC2237 Japanese Character Encoding for Internet Messages
 *
 * @private
 * @ignore
 */
function isJIS(data) {
  var i = 0;
  var len = data && data.length;
  var b, esc1, esc2;

  for (; i < len; i++) {
    b = data[i];
    if (b > 0xFF || (b >= 0x80 && b <= 0xFF)) {
      return false;
    }

    if (b === 0x1B) {
      if (i + 2 >= len) {
        return false;
      }

      esc1 = data[i + 1];
      esc2 = data[i + 2];
      if (esc1 === 0x24) {
        if (esc2 === 0x28 ||  // JIS X 0208-1990/2000/2004
            esc2 === 0x40 ||  // JIS X 0208-1978
            esc2 === 0x42) {  // JIS X 0208-1983
          return true;
        }
      } else if (esc1 === 0x26 && // JIS X 0208-1990
                 esc2 === 0x40) {
        return true;
      } else if (esc1 === 0x28) {
        if (esc2 === 0x42 || // ASCII
            esc2 === 0x49 || // JIS X 0201 Halfwidth Katakana
            esc2 === 0x4A) { // JIS X 0201-1976 Roman set
          return true;
        }
      }
    }
  }

  return false;
}

/**
 * EUC-JP
 *
 * @private
 * @ignore
 */
function isEUCJP(data) {
  var i = 0;
  var len = data && data.length;
  var b;

  for (; i < len; i++) {
    b = data[i];
    if (b < 0x80) {
      continue;
    }

    if (b > 0xFF || b < 0x8E) {
      return false;
    }

    if (b === 0x8E) {
      if (i + 1 >= len) {
        return false;
      }

      b = data[++i];
      if (b < 0xA1 || 0xDF < b) {
        return false;
      }
    } else if (b === 0x8F) {
      if (i + 2 >= len) {
        return false;
      }

      b = data[++i];
      if (b < 0xA2 || 0xED < b) {
        return false;
      }

      b = data[++i];
      if (b < 0xA1 || 0xFE < b) {
        return false;
      }
    } else if (0xA1 <= b && b <= 0xFE) {
      if (i + 1 >= len) {
        return false;
      }

      b = data[++i];
      if (b < 0xA1 || 0xFE < b) {
        return false;
      }
    } else {
      return false;
    }
  }

  return true;
}

/**
 * Shift-JIS (SJIS)
 *
 * @private
 * @ignore
 */
function isSJIS(data) {
  var i = 0;
  var len = data && data.length;
  var b;

  while (i < len && data[i] > 0x80) {
    if (data[i++] > 0xFF) {
      return false;
    }
  }

  for (; i < len; i++) {
    b = data[i];
    if (b <= 0x80 ||
        (0xA1 <= b && b <= 0xDF)) {
      continue;
    }

    if (b === 0xA0 || b > 0xEF || i + 1 >= len) {
      return false;
    }

    b = data[++i];
    if (b < 0x40 || b === 0x7F || b > 0xFC) {
      return false;
    }
  }

  return true;
}

/**
 * UTF-8
 *
 * @private
 * @ignore
 */
function isUTF8(data) {
  var i = 0;
  var len = data && data.length;
  var b;

  for (; i < len; i++) {
    b = data[i];
    if (b > 0xFF) {
      return false;
    }

    if (b === 0x09 || b === 0x0A || b === 0x0D ||
        (b >= 0x20 && b <= 0x7E)) {
      continue;
    }

    if (b >= 0xC2 && b <= 0xDF) {
      if (i + 1 >= len || data[i + 1] < 0x80 || data[i + 1] > 0xBF) {
        return false;
      }
      i++;
    } else if (b === 0xE0) {
      if (i + 2 >= len ||
          data[i + 1] < 0xA0 || data[i + 1] > 0xBF ||
          data[i + 2] < 0x80 || data[i + 2] > 0xBF) {
        return false;
      }
      i += 2;
    } else if ((b >= 0xE1 && b <= 0xEC) ||
                b === 0xEE || b === 0xEF) {
      if (i + 2 >= len ||
          data[i + 1] < 0x80 || data[i + 1] > 0xBF ||
          data[i + 2] < 0x80 || data[i + 2] > 0xBF) {
        return false;
      }
      i += 2;
    } else if (b === 0xED) {
      if (i + 2 >= len ||
          data[i + 1] < 0x80 || data[i + 1] > 0x9F ||
          data[i + 2] < 0x80 || data[i + 2] > 0xBF) {
        return false;
      }
      i += 2;
    } else if (b === 0xF0) {
      if (i + 3 >= len ||
          data[i + 1] < 0x90 || data[i + 1] > 0xBF ||
          data[i + 2] < 0x80 || data[i + 2] > 0xBF ||
          data[i + 3] < 0x80 || data[i + 3] > 0xBF) {
        return false;
      }
      i += 3;
    } else if (b >= 0xF1 && b <= 0xF3) {
      if (i + 3 >= len ||
          data[i + 1] < 0x80 || data[i + 1] > 0xBF ||
          data[i + 2] < 0x80 || data[i + 2] > 0xBF ||
          data[i + 3] < 0x80 || data[i + 3] > 0xBF) {
        return false;
      }
      i += 3;
    } else if (b === 0xF4) {
      if (i + 3 >= len ||
          data[i + 1] < 0x80 || data[i + 1] > 0x8F ||
          data[i + 2] < 0x80 || data[i + 2] > 0xBF ||
          data[i + 3] < 0x80 || data[i + 3] > 0xBF) {
        return false;
      }
      i += 3;
    } else {
      return false;
    }
  }

  return true;
}

/**
 * UTF-16 (LE or BE)
 *
 * RFC2781: UTF-16, an encoding of ISO 10646
 *
 * @link http://www.ietf.org/rfc/rfc2781.txt
 * @private
 * @ignore
 */
function isUTF16(data) {
  var i = 0;
  var len = data && data.length;
  var pos = null;
  var b1, b2, next, prev;

  if (len < 2) {
    if (data[0] > 0xFF) {
      return false;
    }
  } else {
    b1 = data[0];
    b2 = data[1];
    if (b1 === 0xFF && // BOM (little-endian)
        b2 === 0xFE) {
      return true;
    }
    if (b1 === 0xFE && // BOM (big-endian)
        b2 === 0xFF) {
      return true;
    }

    for (; i < len; i++) {
      if (data[i] === 0x00) {
        pos = i;
        break;
      } else if (data[i] > 0xFF) {
        return false;
      }
    }

    if (pos === null) {
      return false; // Non ASCII
    }

    next = data[pos + 1]; // BE
    if (next !== void 0 && next > 0x00 && next < 0x80) {
      return true;
    }

    prev = data[pos - 1]; // LE
    if (prev !== void 0 && prev > 0x00 && prev < 0x80) {
      return true;
    }
  }

  return false;
}

/**
 * UTF-16BE (big-endian)
 *
 * RFC 2781 4.3 Interpreting text labelled as UTF-16
 * Text labelled "UTF-16BE" can always be interpreted as being big-endian
 *  when BOM does not founds (SHOULD)
 *
 * @link http://www.ietf.org/rfc/rfc2781.txt
 * @private
 * @ignore
 */
function isUTF16BE(data) {
  var i = 0;
  var len = data && data.length;
  var pos = null;
  var b1, b2;

  if (len < 2) {
    if (data[0] > 0xFF) {
      return false;
    }
  } else {
    b1 = data[0];
    b2 = data[1];
    if (b1 === 0xFE && // BOM
        b2 === 0xFF) {
      return true;
    }

    for (; i < len; i++) {
      if (data[i] === 0x00) {
        pos = i;
        break;
      } else if (data[i] > 0xFF) {
        return false;
      }
    }

    if (pos === null) {
      return false; // Non ASCII
    }

    if (pos % 2 === 0) {
      return true;
    }
  }

  return false;
}

/**
 * UTF-16LE (little-endian)
 *
 * @see isUTF16BE
 * @private
 * @ignore
 */
function isUTF16LE(data) {
  var i = 0;
  var len = data && data.length;
  var pos = null;
  var b1, b2;

  if (len < 2) {
    if (data[0] > 0xFF) {
      return false;
    }
  } else {
    b1 = data[0];
    b2 = data[1];
    if (b1 === 0xFF && // BOM
        b2 === 0xFE) {
      return true;
    }

    for (; i < len; i++) {
      if (data[i] === 0x00) {
        pos = i;
        break;
      } else if (data[i] > 0xFF) {
        return false;
      }
    }

    if (pos === null) {
      return false; // Non ASCII
    }

    if (pos % 2 !== 0) {
      return true;
    }
  }

  return false;
}

/**
 * UTF-32
 *
 * Unicode 3.2.0: Unicode Standard Annex #19
 *
 * @link http://www.iana.org/assignments/charset-reg/UTF-32
 * @link http://www.unicode.org/reports/tr19/tr19-9.html
 * @private
 * @ignore
 */
function isUTF32(data) {
  var i = 0;
  var len = data && data.length;
  var pos = null;
  var b1, b2, b3, b4;
  var next, prev;

  if (len < 4) {
    for (; i < len; i++) {
      if (data[i] > 0xFF) {
        return false;
      }
    }
  } else {
    b1 = data[0];
    b2 = data[1];
    b3 = data[2];
    b4 = data[3];
    if (b1 === 0x00 && b2 === 0x00 && // BOM (big-endian)
        b3 === 0xFE && b4 === 0xFF) {
      return true;
    }

    if (b1 === 0xFF && b2 === 0xFE && // BOM (little-endian)
        b3 === 0x00 && b4 === 0x00) {
      return true;
    }

    for (; i < len; i++) {
      if (data[i] === 0x00 && data[i + 1] === 0x00 && data[i + 2] === 0x00) {
        pos = i;
        break;
      } else if (data[i] > 0xFF) {
        return false;
      }
    }

    if (pos === null) {
      return false;
    }

    // The byte order should be the big-endian when BOM is not detected.
    next = data[pos + 3];
    if (next !== void 0 && next > 0x00 && next <= 0x7F) {
      // big-endian
      return data[pos + 2] === 0x00 && data[pos + 1] === 0x00;
    }

    prev = data[pos - 1];
    if (prev !== void 0 && prev > 0x00 && prev <= 0x7F) {
      // little-endian
      return data[pos + 1] === 0x00 && data[pos + 2] === 0x00;
    }
  }

  return false;
}

/**
 * JavaScript Unicode array
 *
 * @private
 * @ignore
 */
function isUNICODE(data) {
  var i = 0;
  var len = data && data.length;
  var c;

  for (; i < len; i++) {
    c = data[i];
    if (c < 0 || c > 0x10FFFF) {
      return false;
    }
  }

  return true;
}


/**
 * JIS to SJIS
 *
 * @private
 * @ignore
 */
function JISToSJIS(data) {
  var results = [];
  var index = 0;
  var i = 0;
  var len = data && data.length;
  var b1, b2;

  for (; i < len; i++) {
    // escape sequence
    while (data[i] === 0x1B) {
      if ((data[i + 1] === 0x24 && data[i + 2] === 0x42) ||
          (data[i + 1] === 0x24 && data[i + 2] === 0x40)) {
        index = 1;
      } else if ((data[i + 1] === 0x28 && data[i + 2] === 0x49)) {
        index = 2;
      } else if (data[i + 1] === 0x24 && data[i + 2] === 0x28 &&
                 data[i + 3] === 0x44) {
        index = 3;
        i++;
      } else {
        index = 0;
      }

      i += 3;
      if (data[i] === void 0) {
        return results;
      }
    }

    if (index === 1) {
      b1 = data[i];
      b2 = data[++i];
      if (b1 & 0x01) {
        b1 >>= 1;
        if (b1 < 0x2F) {
          b1 += 0x71;
        } else {
          b1 -= 0x4F;
        }
        if (b2 > 0x5F) {
          b2 += 0x20;
        } else {
          b2 += 0x1F;
        }
      } else {
        b1 >>= 1;
        if (b1 <= 0x2F) {
          b1 += 0x70;
        } else {
          b1 -= 0x50;
        }
        b2 += 0x7E;
      }
      results[results.length] = b1 & 0xFF;
      results[results.length] = b2 & 0xFF;
    } else if (index === 2) {
      results[results.length] = data[i] + 0x80 & 0xFF;
    } else if (index === 3) {
      // Shift_JIS cannot convert JIS X 0212:1990.
      results[results.length] = UTF8_UNKNOWN;
    } else {
      results[results.length] = data[i] & 0xFF;
    }
  }

  return results;
}

/**
 * JIS to EUCJP
 *
 * @private
 * @ignore
 */
function JISToEUCJP(data) {
  var results = [];
  var index = 0;
  var len = data && data.length;
  var i = 0;

  for (; i < len; i++) {

    // escape sequence
    while (data[i] === 0x1B) {
      if ((data[i + 1] === 0x24 && data[i + 2] === 0x42) ||
          (data[i + 1] === 0x24 && data[i + 2] === 0x40)) {
        index = 1;
      } else if ((data[i + 1] === 0x28 && data[i + 2] === 0x49)) {
        index = 2;
      } else if (data[i + 1] === 0x24 && data[i + 2] === 0x28 &&
                 data[i + 3] === 0x44) {
        index = 3;
        i++;
      } else {
        index = 0;
      }

      i += 3;
      if (data[i] === void 0) {
        return results;
      }
    }

    if (index === 1) {
      results[results.length] = data[i] + 0x80 & 0xFF;
      results[results.length] = data[++i] + 0x80 & 0xFF;
    } else if (index === 2) {
      results[results.length] = 0x8E;
      results[results.length] = data[i] + 0x80 & 0xFF;
    } else if (index === 3) {
      results[results.length] = 0x8F;
      results[results.length] = data[i] + 0x80 & 0xFF;
      results[results.length] = data[++i] + 0x80 & 0xFF;
    } else {
      results[results.length] = data[i] & 0xFF;
    }
  }

  return results;
}

/**
 * SJIS to JIS
 *
 * @private
 * @ignore
 */
function SJISToJIS(data) {
  var results = [];
  var index = 0;
  var len = data && data.length;
  var i = 0;
  var b1, b2;

  var esc = [
    0x1B, 0x28, 0x42,
    0x1B, 0x24, 0x42,
    0x1B, 0x28, 0x49
  ];

  for (; i < len; i++) {
    b1 = data[i];
    if (b1 >= 0xA1 && b1 <= 0xDF) {
      if (index !== 2) {
        index = 2;
        results[results.length] = esc[6];
        results[results.length] = esc[7];
        results[results.length] = esc[8];
      }
      results[results.length] = b1 - 0x80 & 0xFF;
    } else if (b1 >= 0x80) {
      if (index !== 1) {
        index = 1;
        results[results.length] = esc[3];
        results[results.length] = esc[4];
        results[results.length] = esc[5];
      }

      b1 <<= 1;
      b2 = data[++i];
      if (b2 < 0x9F) {
        if (b1 < 0x13F) {
          b1 -= 0xE1;
        } else {
          b1 -= 0x61;
        }
        if (b2 > 0x7E) {
          b2 -= 0x20;
        } else {
          b2 -= 0x1F;
        }
      } else {
        if (b1 < 0x13F) {
          b1 -= 0xE0;
        } else {
          b1 -= 0x60;
        }
        b2 -= 0x7E;
      }
      results[results.length] = b1 & 0xFF;
      results[results.length] = b2 & 0xFF;
    } else {
      if (index !== 0) {
        index = 0;
        results[results.length] = esc[0];
        results[results.length] = esc[1];
        results[results.length] = esc[2];
      }
      results[results.length] = b1 & 0xFF;
    }
  }

  if (index !== 0) {
    results[results.length] = esc[0];
    results[results.length] = esc[1];
    results[results.length] = esc[2];
  }

  return results;
}

/**
 * SJIS to EUCJP
 *
 * @private
 * @ignore
 */
function SJISToEUCJP(data) {
  var results = [];
  var len = data && data.length;
  var i = 0;
  var b1, b2;

  for (; i < len; i++) {
    b1 = data[i];
    if (b1 >= 0xA1 && b1 <= 0xDF) {
      results[results.length] = 0x8E;
      results[results.length] = b1;
    } else if (b1 >= 0x81) {
      b2 = data[++i];
      b1 <<= 1;
      if (b2 < 0x9F) {
        if (b1 < 0x13F) {
          b1 -= 0x61;
        } else {
          b1 -= 0xE1;
        }

        if (b2 > 0x7E) {
          b2 += 0x60;
        } else {
          b2 += 0x61;
        }
      } else {
        if (b1 < 0x13F) {
          b1 -= 0x60;
        } else {
          b1 -= 0xE0;
        }
        b2 += 0x02;
      }
      results[results.length] = b1 & 0xFF;
      results[results.length] = b2 & 0xFF;
    } else {
      results[results.length] = b1 & 0xFF;
    }
  }

  return results;
}

/**
 * EUCJP to JIS
 *
 * @private
 * @ignore
 */
function EUCJPToJIS(data) {
  var results = [];
  var index = 0;
  var len = data && data.length;
  var i = 0;
  var b;

  // escape sequence
  var esc = [
    0x1B, 0x28, 0x42,
    0x1B, 0x24, 0x42,
    0x1B, 0x28, 0x49,
    0x1B, 0x24, 0x28, 0x44
  ];

  for (; i < len; i++) {
    b = data[i];
    if (b === 0x8E) {
      if (index !== 2) {
        index = 2;
        results[results.length] = esc[6];
        results[results.length] = esc[7];
        results[results.length] = esc[8];
      }
      results[results.length] = data[++i] - 0x80 & 0xFF;
    } else if (b === 0x8F) {
      if (index !== 3) {
        index = 3;
        results[results.length] = esc[9];
        results[results.length] = esc[10];
        results[results.length] = esc[11];
        results[results.length] = esc[12];
      }
      results[results.length] = data[++i] - 0x80 & 0xFF;
      results[results.length] = data[++i] - 0x80 & 0xFF;
    } else if (b > 0x8E) {
      if (index !== 1) {
        index = 1;
        results[results.length] = esc[3];
        results[results.length] = esc[4];
        results[results.length] = esc[5];
      }
      results[results.length] = b - 0x80 & 0xFF;
      results[results.length] = data[++i] - 0x80 & 0xFF;
    } else {
      if (index !== 0) {
        index = 0;
        results[results.length] = esc[0];
        results[results.length] = esc[1];
        results[results.length] = esc[2];
      }
      results[results.length] = b & 0xFF;
    }
  }

  if (index !== 0) {
    results[results.length] = esc[0];
    results[results.length] = esc[1];
    results[results.length] = esc[2];
  }

  return results;
}

/**
 * EUCJP to SJIS
 *
 * @private
 * @ignore
 */
function EUCJPToSJIS(data) {
  var results = [];
  var len = data && data.length;
  var i = 0;
  var b1, b2;

  for (; i < len; i++) {
    b1 = data[i];
    if (b1 === 0x8F) {
      results[results.length] = UTF8_UNKNOWN;
      i += 2;
    } else if (b1 > 0x8E) {
      b2 = data[++i];
      if (b1 & 0x01) {
        b1 >>= 1;
        if (b1 < 0x6F) {
          b1 += 0x31;
        } else {
          b1 += 0x71;
        }

        if (b2 > 0xDF) {
          b2 -= 0x60;
        } else {
          b2 -= 0x61;
        }
      } else {
        b1 >>= 1;
        if (b1 <= 0x6F) {
          b1 += 0x30;
        } else {
          b1 += 0x70;
        }
        b2 -= 0x02;
      }
      results[results.length] = b1 & 0xFF;
      results[results.length] = b2 & 0xFF;
    } else if (b1 === 0x8E) {
      results[results.length] = data[++i] & 0xFF;
    } else {
      results[results.length] = b1 & 0xFF;
    }
  }

  return results;
}

/**
 * SJIS To UTF-8
 *
 * @private
 * @ignore
 */
function SJISToUTF8(data) {
  init_JIS_TO_UTF8_TABLE();

  var results = [];
  var i = 0;
  var len = data && data.length;
  var b, b1, b2, u2, u3, jis, utf8;

  for (; i < len; i++) {
    b = data[i];
    if (b >= 0xA1 && b <= 0xDF) {
      b2 = b - 0x40;
      u2 = 0xBC | ((b2 >> 6) & 0x03);
      u3 = 0x80 | (b2 & 0x3F);

      results[results.length] = 0xEF;
      results[results.length] = u2 & 0xFF;
      results[results.length] = u3 & 0xFF;
    } else if (b >= 0x80) {
      b1 = b << 1;
      b2 = data[++i];

      if (b2 < 0x9F) {
        if (b1 < 0x13F) {
          b1 -= 0xE1;
        } else {
          b1 -= 0x61;
        }

        if (b2 > 0x7E) {
          b2 -= 0x20;
        } else {
          b2 -= 0x1F;
        }
      } else {
        if (b1 < 0x13F) {
          b1 -= 0xE0;
        } else {
          b1 -= 0x60;
        }
        b2 -= 0x7E;
      }

      b1 &= 0xFF;
      jis = (b1 << 8) + b2;

      utf8 = JIS_TO_UTF8_TABLE[jis];
      if (utf8 === void 0) {
        results[results.length] = UTF8_UNKNOWN;
      } else {
        if (utf8 < 0xFFFF) {
          results[results.length] = utf8 >> 8 & 0xFF;
          results[results.length] = utf8 & 0xFF;
        } else {
          results[results.length] = utf8 >> 16 & 0xFF;
          results[results.length] = utf8 >> 8 & 0xFF;
          results[results.length] = utf8 & 0xFF;
        }
      }
    } else {
      results[results.length] = data[i] & 0xFF;
    }
  }

  return results;
}

/**
 * EUC-JP to UTF-8
 *
 * @private
 * @ignore
 */
function EUCJPToUTF8(data) {
  init_JIS_TO_UTF8_TABLE();

  var results = [];
  var i = 0;
  var len = data && data.length;
  var b, b2, u2, u3, j2, j3, jis, utf8;

  for (; i < len; i++) {
    b = data[i];
    if (b === 0x8E) {
      b2 = data[++i] - 0x40;
      u2 = 0xBC | ((b2 >> 6) & 0x03);
      u3 = 0x80 | (b2 & 0x3F);

      results[results.length] = 0xEF;
      results[results.length] = u2 & 0xFF;
      results[results.length] = u3 & 0xFF;
    } else if (b === 0x8F) {
      j2 = data[++i] - 0x80;
      j3 = data[++i] - 0x80;
      jis = (j2 << 8) + j3;

      utf8 = JISX0212_TO_UTF8_TABLE[jis];
      if (utf8 === void 0) {
        results[results.length] = UTF8_UNKNOWN;
      } else {
        if (utf8 < 0xFFFF) {
          results[results.length] = utf8 >> 8 & 0xFF;
          results[results.length] = utf8 & 0xFF;
        } else {
          results[results.length] = utf8 >> 16 & 0xFF;
          results[results.length] = utf8 >>  8 & 0xFF;
          results[results.length] = utf8 & 0xFF;
        }
      }
    } else if (b >= 0x80) {
      jis = ((b - 0x80) << 8) + (data[++i] - 0x80);

      utf8 = JIS_TO_UTF8_TABLE[jis];
      if (utf8 === void 0) {
        results[results.length] = UTF8_UNKNOWN;
      } else {
        if (utf8 < 0xFFFF) {
          results[results.length] = utf8 >> 8 & 0xFF;
          results[results.length] = utf8 & 0xFF;
        } else {
          results[results.length] = utf8 >> 16 & 0xFF;
          results[results.length] = utf8 >>  8 & 0xFF;
          results[results.length] = utf8 & 0xFF;
        }
      }
    } else {
      results[results.length] = data[i] & 0xFF;
    }
  }

  return results;
}

/**
 * JIS to UTF-8
 *
 * @private
 * @ignore
 */
function JISToUTF8(data) {
  init_JIS_TO_UTF8_TABLE();

  var results = [];
  var index = 0;
  var i = 0;
  var len = data && data.length;
  var b2, u2, u3, jis, utf8;

  for (; i < len; i++) {
    while (data[i] === 0x1B) {
      if ((data[i + 1] === 0x24 && data[i + 2] === 0x42) ||
          (data[i + 1] === 0x24 && data[i + 2] === 0x40)) {
        index = 1;
      } else if (data[i + 1] === 0x28 && data[i + 2] === 0x49) {
        index = 2;
      } else if (data[i + 1] === 0x24 && data[i + 2] === 0x28 &&
                 data[i + 3] === 0x44) {
        index = 3;
        i++;
      } else {
        index = 0;
      }

      i += 3;
      if (data[i] === void 0) {
        return results;
      }
    }

    if (index === 1) {
      jis = (data[i] << 8) + data[++i];

      utf8 = JIS_TO_UTF8_TABLE[jis];
      if (utf8 === void 0) {
        results[results.length] = UTF8_UNKNOWN;
      } else {
        if (utf8 < 0xFFFF) {
          results[results.length] = utf8 >> 8 & 0xFF;
          results[results.length] = utf8 & 0xFF;
        } else {
          results[results.length] = utf8 >> 16 & 0xFF;
          results[results.length] = utf8 >>  8 & 0xFF;
          results[results.length] = utf8 & 0xFF;
        }
      }
    } else if (index === 2) {
      b2 = data[i] + 0x40;
      u2 = 0xBC | ((b2 >> 6) & 0x03);
      u3 = 0x80 | (b2 & 0x3F);

      results[results.length] = 0xEF;
      results[results.length] = u2 & 0xFF;
      results[results.length] = u3 & 0xFF;
    } else if (index === 3) {
      jis = (data[i] << 8) + data[++i];

      utf8 = JISX0212_TO_UTF8_TABLE[jis];
      if (utf8 === void 0) {
        results[results.length] = UTF8_UNKNOWN;
      } else {
        if (utf8 < 0xFFFF) {
          results[results.length] = utf8 >> 8 & 0xFF;
          results[results.length] = utf8 & 0xFF;
        } else {
          results[results.length] = utf8 >> 16 & 0xFF;
          results[results.length] = utf8 >>  8 & 0xFF;
          results[results.length] = utf8 & 0xFF;
        }
      }
    } else {
      results[results.length] = data[i] & 0xFF;
    }
  }

  return results;
}

/**
 * UTF-8 to SJIS
 *
 * @private
 * @ignore
 */
function UTF8ToSJIS(data) {
  var results = [];
  var i = 0;
  var len = data && data.length;
  var b, b1, b2, utf8, jis;

  for (; i < len; i++) {
    b = data[i];
    if (b >= 0x80) {
      if (b <= 0xDF) {
        // 2 bytes.
        utf8 = (b << 8) + data[++i];
      } else {
        // 3 bytes.
        utf8 = (b << 16) +
               (data[++i] << 8) +
               (data[++i] & 0xFF);
      }

      jis = UTF8_TO_JIS_TABLE[utf8];
      if (jis === void 0) {
        results[results.length] = UTF8_UNKNOWN;
      } else {
        if (jis < 0xFF) {
          results[results.length] = jis + 0x80;
        } else {
          if (jis > 0x10000) {
            jis -= 0x10000;
          }

          b1 = jis >> 8;
          b2 = jis & 0xFF;
          if (b1 & 0x01) {
            b1 >>= 1;
            if (b1 < 0x2F) {
              b1 += 0x71;
            } else {
              b1 -= 0x4F;
            }

            if (b2 > 0x5F) {
              b2 += 0x20;
            } else {
              b2 += 0x1F;
            }
          } else {
            b1 >>= 1;
            if (b1 <= 0x2F) {
              b1 += 0x70;
            } else {
              b1 -= 0x50;
            }
            b2 += 0x7E;
          }
          results[results.length] = b1 & 0xFF;
          results[results.length] = b2 & 0xFF;
        }
      }
    } else {
      results[results.length] = data[i] & 0xFF;
    }
  }

  return results;
}

/**
 * UTF-8 to EUC-JP
 *
 * @private
 * @ignore
 */
function UTF8ToEUCJP(data) {
  var results = [];
  var i = 0;
  var len = data && data.length;
  var b, utf8, jis;

  for (; i < len; i++) {
    b = data[i];
    if (b >= 0x80) {
      if (b <= 0xDF) {
        utf8 = (data[i++] << 8) + data[i];
      } else {
        utf8 = (data[i++] << 16) +
               (data[i++] << 8) +
               (data[i] & 0xFF);
      }

      jis = UTF8_TO_JIS_TABLE[utf8];
      if (jis === void 0) {
        jis = UTF8_TO_JISX0212_TABLE[utf8];
        if (jis === void 0) {
          results[results.length] = UTF8_UNKNOWN;
        } else {
          results[results.length] = 0x8F;
          results[results.length] = (jis >> 8) - 0x80 & 0xFF;
          results[results.length] = (jis & 0xFF) - 0x80 & 0xFF;
        }
      } else {
        if (jis > 0x10000) {
          jis -= 0x10000;
        }
        if (jis < 0xFF) {
          results[results.length] = 0x8E;
          results[results.length] = jis - 0x80 & 0xFF;
        } else {
          results[results.length] = (jis >> 8) - 0x80 & 0xFF;
          results[results.length] = (jis & 0xFF) - 0x80 & 0xFF;
        }
      }
    } else {
      results[results.length] = data[i] & 0xFF;
    }
  }

  return results;
}

/**
 * UTF-8 to JIS
 *
 * @private
 * @ignore
 */
function UTF8ToJIS(data) {
  var results = [];
  var index = 0;
  var len = data && data.length;
  var i = 0;
  var b, utf8, jis;
  var esc = [
    0x1B, 0x28, 0x42,
    0x1B, 0x24, 0x42,
    0x1B, 0x28, 0x49,
    0x1B, 0x24, 0x28, 0x44
  ];

  for (; i < len; i++) {
    b = data[i];
    if (b < 0x80) {
      if (index !== 0) {
        index = 0;
        results[results.length] = esc[0];
        results[results.length] = esc[1];
        results[results.length] = esc[2];
      }
      results[results.length] = b & 0xFF;
    } else {
      if (b <= 0xDF) {
        utf8 = (data[i] << 8) + data[++i];
      } else {
        utf8 = (data[i] << 16) + (data[++i] << 8) + data[++i];
      }

      jis = UTF8_TO_JIS_TABLE[utf8];
      if (jis === void 0) {
        jis = UTF8_TO_JISX0212_TABLE[utf8];
        if (jis === void 0) {
          if (index !== 0) {
            index = 0;
            results[results.length] = esc[0];
            results[results.length] = esc[1];
            results[results.length] = esc[2];
          }
          results[results.length] = UTF8_UNKNOWN;
        } else {
          // JIS X 0212:1990
          if (index !== 3) {
            index = 3;
            results[results.length] = esc[9];
            results[results.length] = esc[10];
            results[results.length] = esc[11];
            results[results.length] = esc[12];
          }
          results[results.length] = jis >> 8 & 0xFF;
          results[results.length] = jis & 0xFF;
        }
      } else {
        if (jis > 0x10000) {
          jis -= 0x10000;
        }
        if (jis < 0xFF) {
          // Halfwidth Katakana
          if (index !== 2) {
            index = 2;
            results[results.length] = esc[6];
            results[results.length] = esc[7];
            results[results.length] = esc[8];
          }
          results[results.length] = jis & 0xFF;
        } else {
          if (index !== 1) {
            index = 1;
            results[results.length] = esc[3];
            results[results.length] = esc[4];
            results[results.length] = esc[5];
          }
          results[results.length] = jis >> 8 & 0xFF;
          results[results.length] = jis & 0xFF;
        }
      }
    }
  }

  if (index !== 0) {
    results[results.length] = esc[0];
    results[results.length] = esc[1];
    results[results.length] = esc[2];
  }

  return results;
}

/**
 * UTF-16 (JavaScript Unicode array) to UTF-8
 *
 * @private
 * @ignore
 */
function UNICODEToUTF8(data) {
  var results = [];
  var i = 0;
  var len = data && data.length;
  var c, second;

  for (; i < len; i++) {
    c = data[i];

    // high surrogate
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < len) {
      second = data[i + 1];
      // low surrogate
      if (second >= 0xDC00 && second <= 0xDFFF) {
        c = (c - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
        i++;
      }
    }

    if (c < 0x80) {
      results[results.length] = c;
    } else if (c < 0x800) {
      results[results.length] = 0xC0 | ((c >> 6) & 0x1F);
      results[results.length] = 0x80 | (c & 0x3F);
    } else if (c < 0x10000) {
      results[results.length] = 0xE0 | ((c >> 12) & 0xF);
      results[results.length] = 0x80 | ((c >> 6) & 0x3F);
      results[results.length] = 0x80 | (c & 0x3F);
    } else if (c < 0x200000) {
      results[results.length] = 0xF0 | ((c >> 18) & 0xF);
      results[results.length] = 0x80 | ((c >> 12) & 0x3F);
      results[results.length] = 0x80 | ((c >> 6) & 0x3F);
      results[results.length] = 0x80 | (c & 0x3F);
    }
  }

  return results;
}

/**
 * UTF-8 to UTF-16 (JavaScript Unicode array)
 *
 * @private
 * @ignore
 */
function UTF8ToUNICODE(data) {
  var results = [];
  var i = 0;
  var len = data && data.length;
  var n, c, c2, c3, c4, code;

  while (i < len) {
    c = data[i++];
    n = c >> 4;
    if (n >= 0 && n <= 7) {
      // 0xxx xxxx
      code = c;
    } else if (n === 12 || n === 13) {
      // 110x xxxx
      // 10xx xxxx
      c2 = data[i++];
      code = ((c & 0x1F) << 6) | (c2 & 0x3F);
    } else if (n === 14) {
      // 1110 xxxx
      // 10xx xxxx
      // 10xx xxxx
      c2 = data[i++];
      c3 = data[i++];
      code = ((c & 0x0F) << 12) |
             ((c2 & 0x3F) << 6) |
              (c3 & 0x3F);
    } else if (n === 15) {
      // 1111 0xxx
      // 10xx xxxx
      // 10xx xxxx
      // 10xx xxxx
      c2 = data[i++];
      c3 = data[i++];
      c4 = data[i++];
      code = ((c & 0x7) << 18)   |
             ((c2 & 0x3F) << 12) |
             ((c3 & 0x3F) << 6)  |
              (c4 & 0x3F);
    }

    if (code <= 0xFFFF) {
      results[results.length] = code;
    } else {
      // Split in surrogate halves
      code -= 0x10000;
      results[results.length] = (code >> 10) + 0xD800; // High surrogate
      results[results.length] = (code % 0x400) + 0xDC00; // Low surrogate
    }
  }

  return results;
}

/**
 * UTF-16 (JavaScript Unicode array) to UTF-16
 *
 * UTF-16BE (big-endian)
 * Note: this function does not prepend the BOM by default.
 *
 * RFC 2781 4.3 Interpreting text labelled as UTF-16
 *   If the first two octets of the text is not 0xFE followed by
 *   0xFF, and is not 0xFF followed by 0xFE, then the text SHOULD be
 *   interpreted as being big-endian.
 *
 * @link https://www.ietf.org/rfc/rfc2781.txt
 * UTF-16, an encoding of ISO 10646
 *
 * @private
 * @ignore
 */
function UNICODEToUTF16(data, options) {
  var results;

  if (options && options.bom) {
    var optBom = options.bom;
    if (!isString(optBom)) {
      optBom = 'BE';
    }

    var bom, utf16;
    if (optBom.charAt(0).toUpperCase() === 'B') {
      // Big-endian
      bom = [0xFE, 0xFF];
      utf16 = UNICODEToUTF16BE(data);
    } else {
      // Little-endian
      bom = [0xFF, 0xFE];
      utf16 = UNICODEToUTF16LE(data);
    }

    results = [];
    results[0] = bom[0];
    results[1] = bom[1];

    for (var i = 0, len = utf16.length; i < len; i++) {
      results[results.length] = utf16[i];
    }
  } else {
    // Without BOM: Convert as BE (SHOULD).
    results = UNICODEToUTF16BE(data);
  }

  return results;
}

/**
 * UTF-16 (JavaScript Unicode array) to UTF-16BE
 *
 * @link https://www.ietf.org/rfc/rfc2781.txt
 * UTF-16, an encoding of ISO 10646
 *
 * @private
 * @ignore
 */
function UNICODEToUTF16BE(data) {
  var results = [];
  var i = 0;
  var len = data && data.length;
  var c;

  while (i < len) {
    c = data[i++];
    if (c <= 0xFF) {
      results[results.length] = 0;
      results[results.length] = c;
    } else if (c <= 0xFFFF) {
      results[results.length] = c >> 8 & 0xFF;
      results[results.length] = c & 0xFF;
    }
  }

  return results;
}

/**
 * UTF-16 (JavaScript Unicode array) to UTF-16LE
 *
 * @link https://www.ietf.org/rfc/rfc2781.txt
 * UTF-16, an encoding of ISO 10646
 *
 * @private
 * @ignore
 */
function UNICODEToUTF16LE(data) {
  var results = [];
  var i = 0;
  var len = data && data.length;
  var c;

  while (i < len) {
    c = data[i++];
    if (c <= 0xFF) {
      results[results.length] = c;
      results[results.length] = 0;
    } else if (c <= 0xFFFF) {
      results[results.length] = c & 0xFF;
      results[results.length] = c >> 8 & 0xFF;
    }
  }

  return results;
}

/**
 * UTF-16BE to UTF-16 (JavaScript Unicode array)
 *
 * @link https://www.ietf.org/rfc/rfc2781.txt
 * UTF-16, an encoding of ISO 10646
 *
 * @private
 * @ignore
 */
function UTF16BEToUNICODE(data) {
  var results = [];
  var i = 0;
  var len = data && data.length;
  var c1, c2;

  if (len >= 2 &&
      ((data[0] === 0xFE && data[1] === 0xFF) ||
       (data[0] === 0xFF && data[1] === 0xFE))
  ) {
    i = 2;
  }

  while (i < len) {
    c1 = data[i++];
    c2 = data[i++];
    if (c1 === 0) {
      results[results.length] = c2;
    } else {
      results[results.length] = ((c1 & 0xFF) << 8) | (c2 & 0xFF);
    }
  }

  return results;
}

/**
 * UTF-16LE to UTF-16 (JavaScript Unicode array)
 *
 * @link https://www.ietf.org/rfc/rfc2781.txt
 * UTF-16, an encoding of ISO 10646
 *
 * @private
 * @ignore
 */
function UTF16LEToUNICODE(data) {
  var results = [];
  var i = 0;
  var len = data && data.length;
  var c1, c2;

  if (len >= 2 &&
      ((data[0] === 0xFE && data[1] === 0xFF) ||
       (data[0] === 0xFF && data[1] === 0xFE))
  ) {
    i = 2;
  }

  while (i < len) {
    c1 = data[i++];
    c2 = data[i++];
    if (c2 === 0) {
      results[results.length] = c1;
    } else {
      results[results.length] = ((c2 & 0xFF) << 8) | (c1 & 0xFF);
    }
  }

  return results;
}

/**
 * UTF-16 to UTF-16 (JavaScript Unicode array)
 *
 * @link https://www.ietf.org/rfc/rfc2781.txt
 * UTF-16, an encoding of ISO 10646
 *
 * @private
 * @ignore
 */
function UTF16ToUNICODE(data) {
  var results = [];
  var i = 0;
  var len = data && data.length;
  var isLE = false;
  var first = true;
  var c1, c2;

  while (i < len) {
    c1 = data[i++];
    c2 = data[i++];

    if (first && i === 2) {
      first = false;
      if (c1 === 0xFE && c2 === 0xFF) {
        isLE = false;
      } else if (c1 === 0xFF && c2 === 0xFE) {
        // Little-endian
        isLE = true;
      } else {
        isLE = isUTF16LE(data);
        i = 0;
      }
      continue;
    }

    if (isLE) {
      if (c2 === 0) {
        results[results.length] = c1;
      } else {
        results[results.length] = ((c2 & 0xFF) << 8) | (c1 & 0xFF);
      }
    } else {
      if (c1 === 0) {
        results[results.length] = c2;
      } else {
        results[results.length] = ((c1 & 0xFF) << 8) | (c2 & 0xFF);
      }
    }
  }

  return results;
}

/**
 * UTF-16 to UTF-16BE
 *
 * @private
 * @ignore
 */
function UTF16ToUTF16BE(data) {
  var results = [];
  var i = 0;
  var len = data && data.length;
  var isLE = false;
  var first = true;
  var c1, c2;

  while (i < len) {
    c1 = data[i++];
    c2 = data[i++];

    if (first && i === 2) {
      first = false;
      if (c1 === 0xFE && c2 === 0xFF) {
        isLE = false;
      } else if (c1 === 0xFF && c2 === 0xFE) {
        // Little-endian
        isLE = true;
      } else {
        isLE = isUTF16LE(data);
        i = 0;
      }
      continue;
    }

    if (isLE) {
      results[results.length] = c2;
      results[results.length] = c1;
    } else {
      results[results.length] = c1;
      results[results.length] = c2;
    }
  }

  return results;
}

/**
 * UTF-16BE to UTF-16
 *
 * @private
 * @ignore
 */
function UTF16BEToUTF16(data, options) {
  var isLE = false;
  var bom;

  if (options && options.bom) {
    var optBom = options.bom;
    if (!isString(optBom)) {
      optBom = 'BE';
    }

    if (optBom.charAt(0).toUpperCase() === 'B') {
      // Big-endian
      bom = [0xFE, 0xFF];
    } else {
      // Little-endian
      bom = [0xFF, 0xFE];
      isLE = true;
    }
  }

  var results = [];
  var len = data && data.length;
  var i = 0;

  if (len >= 2 &&
      ((data[0] === 0xFE && data[1] === 0xFF) ||
       (data[0] === 0xFF && data[1] === 0xFE))
  ) {
    i = 2;
  }

  if (bom) {
    results[0] = bom[0];
    results[1] = bom[1];
  }

  var c1, c2;
  while (i < len) {
    c1 = data[i++];
    c2 = data[i++];

    if (isLE) {
      results[results.length] = c2;
      results[results.length] = c1;
    } else {
      results[results.length] = c1;
      results[results.length] = c2;
    }
  }

  return results;
}

/**
 * UTF-16 to UTF-16LE
 *
 * @private
 * @ignore
 */
function UTF16ToUTF16LE(data) {
  var results = [];
  var i = 0;
  var len = data && data.length;
  var isLE = false;
  var first = true;
  var c1, c2;

  while (i < len) {
    c1 = data[i++];
    c2 = data[i++];

    if (first && i === 2) {
      first = false;
      if (c1 === 0xFE && c2 === 0xFF) {
        isLE = false;
      } else if (c1 === 0xFF && c2 === 0xFE) {
        // Little-endian
        isLE = true;
      } else {
        isLE = isUTF16LE(data);
        i = 0;
      }
      continue;
    }

    if (isLE) {
      results[results.length] = c1;
      results[results.length] = c2;
    } else {
      results[results.length] = c2;
      results[results.length] = c1;
    }
  }

  return results;
}

/**
 * UTF-16LE to UTF-16
 *
 * @private
 * @ignore
 */
function UTF16LEToUTF16(data, options) {
  var isLE = false;
  var bom;

  if (options && options.bom) {
    var optBom = options.bom;
    if (!isString(optBom)) {
      optBom = 'BE';
    }

    if (optBom.charAt(0).toUpperCase() === 'B') {
      // Big-endian
      bom = [0xFE, 0xFF];
    } else {
      // Little-endian
      bom = [0xFF, 0xFE];
      isLE = true;
    }
  }

  var results = [];
  var len = data && data.length;
  var i = 0;

  if (len >= 2 &&
      ((data[0] === 0xFE && data[1] === 0xFF) ||
       (data[0] === 0xFF && data[1] === 0xFE))
  ) {
    i = 2;
  }

  if (bom) {
    results[0] = bom[0];
    results[1] = bom[1];
  }

  var c1, c2;
  while (i < len) {
    c1 = data[i++];
    c2 = data[i++];

    if (isLE) {
      results[results.length] = c1;
      results[results.length] = c2;
    } else {
      results[results.length] = c2;
      results[results.length] = c1;
    }
  }

  return results;
}

/**
 * UTF-16BE to UTF-16LE
 *
 * @private
 * @ignore
 */
function UTF16BEToUTF16LE(data) {
  var results = [];
  var i = 0;
  var len = data && data.length;
  var c1, c2;

  if (len >= 2 &&
      ((data[0] === 0xFE && data[1] === 0xFF) ||
       (data[0] === 0xFF && data[1] === 0xFE))
  ) {
    i = 2;
  }

  while (i < len) {
    c1 = data[i++];
    c2 = data[i++];
    results[results.length] = c2;
    results[results.length] = c1;
  }

  return results;
}

/**
 * UTF-16LE to UTF-16BE
 *
 * @private
 * @ignore
 */
function UTF16LEToUTF16BE(data) {
  return UTF16BEToUTF16LE(data);
}


/**
 * UTF-16 (JavaScript Unicode array) to JIS
 *
 * @private
 * @ignore
 */
function UNICODEToJIS(data) {
  return UTF8ToJIS(UNICODEToUTF8(data));
}

/**
 * JIS to UTF-16 (JavaScript Unicode array)
 *
 * @private
 * @ignore
 */
function JISToUNICODE(data) {
  return UTF8ToUNICODE(JISToUTF8(data));
}

/**
 * UTF-16 (JavaScript Unicode array) to EUCJP
 *
 * @private
 * @ignore
 */
function UNICODEToEUCJP(data) {
  return UTF8ToEUCJP(UNICODEToUTF8(data));
}

/**
 * EUCJP to UTF-16 (JavaScript Unicode array)
 *
 * @private
 * @ignore
 */
function EUCJPToUNICODE(data) {
  return UTF8ToUNICODE(EUCJPToUTF8(data));
}

/**
 * UTF-16 (JavaScript Unicode array) to SJIS
 *
 * @private
 * @ignore
 */
function UNICODEToSJIS(data) {
  return UTF8ToSJIS(UNICODEToUTF8(data));
}

/**
 * SJIS to UTF-16 (JavaScript Unicode array)
 *
 * @private
 * @ignore
 */
function SJISToUNICODE(data) {
  return UTF8ToUNICODE(SJISToUTF8(data));
}

/**
 * UTF-8 to UTF-16
 *
 * @private
 * @ignore
 */
function UTF8ToUTF16(data, options) {
  return UNICODEToUTF16(UTF8ToUNICODE(data), options);
}

/**
 * UTF-16 to UTF-8
 *
 * @private
 * @ignore
 */
function UTF16ToUTF8(data) {
  return UNICODEToUTF8(UTF16ToUNICODE(data));
}

/**
 * UTF-8 to UTF-16BE
 *
 * @private
 * @ignore
 */
function UTF8ToUTF16BE(data) {
  return UNICODEToUTF16BE(UTF8ToUNICODE(data));
}

/**
 * UTF-16BE to UTF-8
 *
 * @private
 * @ignore
 */
function UTF16BEToUTF8(data) {
  return UNICODEToUTF8(UTF16BEToUNICODE(data));
}

/**
 * UTF-8 to UTF-16LE
 *
 * @private
 * @ignore
 */
function UTF8ToUTF16LE(data) {
  return UNICODEToUTF16LE(UTF8ToUNICODE(data));
}

/**
 * UTF-16LE to UTF-8
 *
 * @private
 * @ignore
 */
function UTF16LEToUTF8(data) {
  return UNICODEToUTF8(UTF16LEToUNICODE(data));
}

/**
 * JIS to UTF-16
 *
 * @private
 * @ignore
 */
function JISToUTF16(data, options) {
  return UTF8ToUTF16(JISToUTF8(data), options);
}

/**
 * UTF-16 to JIS
 *
 * @private
 * @ignore
 */
function UTF16ToJIS(data) {
  return UTF8ToJIS(UTF16ToUTF8(data));
}

/**
 * JIS to UTF-16BE
 *
 * @private
 * @ignore
 */
function JISToUTF16BE(data) {
  return UTF8ToUTF16BE(JISToUTF8(data));
}

/**
 * UTF-16BE to JIS
 *
 * @private
 * @ignore
 */
function UTF16BEToJIS(data) {
  return UTF8ToJIS(UTF16BEToUTF8(data));
}

/**
 * JIS to UTF-16LE
 *
 * @private
 * @ignore
 */
function JISToUTF16LE(data) {
  return UTF8ToUTF16LE(JISToUTF8(data));
}

/**
 * UTF-16LE to JIS
 *
 * @private
 * @ignore
 */
function UTF16LEToJIS(data) {
  return UTF8ToJIS(UTF16LEToUTF8(data));
}

/**
 * EUC-JP to UTF-16
 *
 * @private
 * @ignore
 */
function EUCJPToUTF16(data, options) {
  return UTF8ToUTF16(EUCJPToUTF8(data), options);
}

/**
 * UTF-16 to EUC-JP
 *
 * @private
 * @ignore
 */
function UTF16ToEUCJP(data) {
  return UTF8ToEUCJP(UTF16ToUTF8(data));
}

/**
 * EUC-JP to UTF-16BE
 *
 * @private
 * @ignore
 */
function EUCJPToUTF16BE(data) {
  return UTF8ToUTF16BE(EUCJPToUTF8(data));
}

/**
 * UTF-16BE to EUC-JP
 *
 * @private
 * @ignore
 */
function UTF16BEToEUCJP(data) {
  return UTF8ToEUCJP(UTF16BEToUTF8(data));
}

/**
 * EUC-JP to UTF-16LE
 *
 * @private
 * @ignore
 */
function EUCJPToUTF16LE(data) {
  return UTF8ToUTF16LE(EUCJPToUTF8(data));
}

/**
 * UTF-16LE to EUC-JP
 *
 * @private
 * @ignore
 */
function UTF16LEToEUCJP(data) {
  return UTF8ToEUCJP(UTF16LEToUTF8(data));
}

/**
 * SJIS to UTF-16
 *
 * @private
 * @ignore
 */
function SJISToUTF16(data, options) {
  return UTF8ToUTF16(SJISToUTF8(data), options);
}

/**
 * UTF-16 to SJIS
 *
 * @private
 * @ignore
 */
function UTF16ToSJIS(data) {
  return UTF8ToSJIS(UTF16ToUTF8(data));
}

/**
 * SJIS to UTF-16BE
 *
 * @private
 * @ignore
 */
function SJISToUTF16BE(data) {
  return UTF8ToUTF16BE(SJISToUTF8(data));
}

/**
 * UTF-16BE to SJIS
 *
 * @private
 * @ignore
 */
function UTF16BEToSJIS(data) {
  return UTF8ToSJIS(UTF16BEToUTF8(data));
}

/**
 * SJIS to UTF-16LE
 *
 * @private
 * @ignore
 */
function SJISToUTF16LE(data) {
  return UTF8ToUTF16LE(SJISToUTF8(data));
}

/**
 * UTF-16LE to SJIS
 *
 * @private
 * @ignore
 */
function UTF16LEToSJIS(data) {
  return UTF8ToSJIS(UTF16LEToUTF8(data));
}


/**
 * Assign the internal encoding name from the argument encoding name.
 *
 * @private
 * @ignore
 */
function assignEncodingName(target) {
  var name = '';
  var expect = ('' + target).toUpperCase().replace(/[^A-Z0-9]+/g, '');
  var aliasNames = getKeys(EncodingAliases);
  var len = aliasNames.length;
  var hit = 0;
  var encoding, encodingLen, j;

  for (var i = 0; i < len; i++) {
    encoding = aliasNames[i];
    if (encoding === expect) {
      name = encoding;
      break;
    }

    encodingLen = encoding.length;
    for (j = hit; j < encodingLen; j++) {
      if (encoding.slice(0, j) === expect.slice(0, j) ||
          encoding.slice(-j) === expect.slice(-j)) {
        name = encoding;
        hit = j;
      }
    }
  }

  if (hasOwnProperty.call(EncodingAliases, name)) {
    return EncodingAliases[name];
  }

  return name;
}


// Helpers

function isObject(x) {
  var type = typeof x;
  return type === 'function' || type === 'object' && !!x;
}

function isArray(x) {
  return Array.isArray ? Array.isArray(x) :
    toString.call(x) === '[object Array]';
}

function isString(x) {
  return typeof x === 'string' || toString.call(x) === '[object String]';
}


function getKeys(object) {
  if (Object.keys) {
    return Object.keys(object);
  }

  var keys = [];
  for (var key in object) {
    if (hasOwnProperty.call(object, key)) {
      keys[keys.length] = key;
    }
  }

  return keys;
}


function createBuffer(bits, size) {
  if (!HAS_TYPED) {
    return new Array(size);
  }

  switch (bits) {
    case 8: return new Uint8Array(size);
    case 16: return new Uint16Array(size);
  }
}


function stringToBuffer(string) {
  var length = string.length;
  var buffer = createBuffer(16, length);

  for (var i = 0; i < length; i++) {
    buffer[i] = string.charCodeAt(i);
  }

  return buffer;
}


function codeToString_fast(code) {
  if (CAN_CHARCODE_APPLY && CAN_CHARCODE_APPLY_TYPED) {
    var len = code && code.length;
    if (len < APPLY_BUFFER_SIZE) {
      if (APPLY_BUFFER_SIZE_OK) {
        return fromCharCode.apply(null, code);
      }

      if (APPLY_BUFFER_SIZE_OK === null) {
        try {
          var s = fromCharCode.apply(null, code);
          if (len > APPLY_BUFFER_SIZE) {
            APPLY_BUFFER_SIZE_OK = true;
          }
          return s;
        } catch (e) {
          // Ignore RangeError: arguments too large
          APPLY_BUFFER_SIZE_OK = false;
        }
      }
    }
  }

  return codeToString_chunked(code);
}


function codeToString_chunked(code) {
  var string = '';
  var length = code && code.length;
  var i = 0;
  var sub;

  while (i < length) {
    if (code.subarray) {
      sub = code.subarray(i, i + APPLY_BUFFER_SIZE);
    } else {
      sub = code.slice(i, i + APPLY_BUFFER_SIZE);
    }
    i += APPLY_BUFFER_SIZE;

    if (APPLY_BUFFER_SIZE_OK) {
      string += fromCharCode.apply(null, sub);
      continue;
    }

    if (APPLY_BUFFER_SIZE_OK === null) {
      try {
        string += fromCharCode.apply(null, sub);
        if (sub.length > APPLY_BUFFER_SIZE) {
          APPLY_BUFFER_SIZE_OK = true;
        }
        continue;
      } catch (e) {
        APPLY_BUFFER_SIZE_OK = false;
      }
    }

    return codeToString_slow(code);
  }

  return string;
}


function codeToString_slow(code) {
  var string = '';
  var length = code && code.length;

  for (var i = 0; i < length; i++) {
    string += fromCharCode(code[i]);
  }

  return string;
}


function stringToCode(string) {
  var code = [];
  var len = string && string.length;

  for (var i = 0; i < len; i++) {
    code[i] = string.charCodeAt(i);
  }

  return code;
}


function codeToBuffer(code) {
  if (HAS_TYPED) {
    // Use Uint16Array for Unicode codepoint.
    return new Uint16Array(code);
  } else {
    if (isArray(code)) {
      return code;
    }
  }

  var length = code && code.length;
  var buffer = [];

  for (var i = 0; i < length; i++) {
    buffer[i] = code[i];
  }

  return buffer;
}


function bufferToCode(buffer) {
  if (isArray(buffer)) {
    return buffer;
  }

  return slice.call(buffer);
}

// Base64
/* Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
 * Version: 1.0
 * LastModified: Dec 25 1999
 * This library is free.  You can redistribute it and/or modify it.
 */
// -- Masanao Izumo Copyright 1999 "free"
// Modified to add support for Binary Array for Encoding.js

var base64EncodeChars = [
  65,  66,  67,  68,  69,  70,  71,  72,  73,  74,  75,  76,  77,
  78,  79,  80,  81,  82,  83,  84,  85,  86,  87,  88,  89,  90,
  97,  98,  99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109,
 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122,
  48,  49,  50,  51,  52,  53,  54,  55,  56,  57,  43,  47
];

var base64DecodeChars = [
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
  52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
  -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
  15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
  -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1
];

var base64EncodePadding = '='.charCodeAt(0);


function base64encode(data) {
  var out, i, len;
  var c1, c2, c3;

  len = data && data.length;
  i = 0;
  out = [];

  while (i < len) {
    c1 = data[i++];
    if (i == len) {
      out[out.length] = base64EncodeChars[c1 >> 2];
      out[out.length] = base64EncodeChars[(c1 & 0x3) << 4];
      out[out.length] = base64EncodePadding;
      out[out.length] = base64EncodePadding;
      break;
    }

    c2 = data[i++];
    if (i == len) {
      out[out.length] = base64EncodeChars[c1 >> 2];
      out[out.length] = base64EncodeChars[((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4)];
      out[out.length] = base64EncodeChars[(c2 & 0xF) << 2];
      out[out.length] = base64EncodePadding;
      break;
    }

    c3 = data[i++];
    out[out.length] = base64EncodeChars[c1 >> 2];
    out[out.length] = base64EncodeChars[((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4)];
    out[out.length] = base64EncodeChars[((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6)];
    out[out.length] = base64EncodeChars[c3 & 0x3F];
  }

  return codeToString_fast(out);
}


function base64decode(str) {
  var c1, c2, c3, c4;
  var i, len, out;

  len = str && str.length;
  i = 0;
  out = [];

  while (i < len) {
    /* c1 */
    do {
      c1 = base64DecodeChars[str.charCodeAt(i++) & 0xFF];
    } while (i < len && c1 == -1);

    if (c1 == -1) {
      break;
    }

    /* c2 */
    do {
      c2 = base64DecodeChars[str.charCodeAt(i++) & 0xFF];
    } while (i < len && c2 == -1);

    if (c2 == -1) {
      break;
    }

    out[out.length] = (c1 << 2) | ((c2 & 0x30) >> 4);

    /* c3 */
    do {
      c3 = str.charCodeAt(i++) & 0xFF;
      if (c3 == 61) {
        return out;
      }
      c3 = base64DecodeChars[c3];
    } while (i < len && c3 == -1);

    if (c3 == -1) {
      break;
    }

    out[out.length] = ((c2 & 0xF) << 4) | ((c3 & 0x3C) >> 2);

    /* c4 */
    do {
      c4 = str.charCodeAt(i++) & 0xFF;
      if (c4 == 61) {
        return out;
      }
      c4 = base64DecodeChars[c4];
    } while (i < len && c4 == -1);

    if (c4 == -1) {
      break;
    }

    out[out.length] = ((c3 & 0x03) << 6) | c4;
  }

  return out;
}


/**
 * Encoding conversion table for UTF-8 to JIS.
 *
 * @ignore
 */
var UTF8_TO_JIS_TABLE = {
0xEFBDA1:0x21,0xEFBDA2:0x22,0xEFBDA3:0x23,0xEFBDA4:0x24,0xEFBDA5:0x25,
0xEFBDA6:0x26,0xEFBDA7:0x27,0xEFBDA8:0x28,0xEFBDA9:0x29,0xEFBDAA:0x2A,
0xEFBDAB:0x2B,0xEFBDAC:0x2C,0xEFBDAD:0x2D,0xEFBDAE:0x2E,0xEFBDAF:0x2F,
0xEFBDB0:0x30,0xEFBDB1:0x31,0xEFBDB2:0x32,0xEFBDB3:0x33,0xEFBDB4:0x34,
0xEFBDB5:0x35,0xEFBDB6:0x36,0xEFBDB7:0x37,0xEFBDB8:0x38,0xEFBDB9:0x39,
0xEFBDBA:0x3A,0xEFBDBB:0x3B,0xEFBDBC:0x3C,0xEFBDBD:0x3D,0xEFBDBE:0x3E,
0xEFBDBF:0x3F,0xEFBE80:0x40,0xEFBE81:0x41,0xEFBE82:0x42,0xEFBE83:0x43,
0xEFBE84:0x44,0xEFBE85:0x45,0xEFBE86:0x46,0xEFBE87:0x47,0xEFBE88:0x48,
0xEFBE89:0x49,0xEFBE8A:0x4A,0xEFBE8B:0x4B,0xEFBE8C:0x4C,0xEFBE8D:0x4D,
0xEFBE8E:0x4E,0xEFBE8F:0x4F,0xEFBE90:0x50,0xEFBE91:0x51,0xEFBE92:0x52,
0xEFBE93:0x53,0xEFBE94:0x54,0xEFBE95:0x55,0xEFBE96:0x56,0xEFBE97:0x57,
0xEFBE98:0x58,0xEFBE99:0x59,0xEFBE9A:0x5A,0xEFBE9B:0x5B,0xEFBE9C:0x5C,
0xEFBE9D:0x5D,0xEFBE9E:0x5E,0xEFBE9F:0x5F,

0xE291A0:0x2D21,0xE291A1:0x2D22,0xE291A2:0x2D23,0xE291A3:0x2D24,0xE291A4:0x2D25,
0xE291A5:0x2D26,0xE291A6:0x2D27,0xE291A7:0x2D28,0xE291A8:0x2D29,0xE291A9:0x2D2A,
0xE291AA:0x2D2B,0xE291AB:0x2D2C,0xE291AC:0x2D2D,0xE291AD:0x2D2E,0xE291AE:0x2D2F,
0xE291AF:0x2D30,0xE291B0:0x2D31,0xE291B1:0x2D32,0xE291B2:0x2D33,0xE291B3:0x2D34,
0xE285A0:0x2D35,0xE285A1:0x2D36,0xE285A2:0x2D37,0xE285A3:0x2D38,0xE285A4:0x2D39,
0xE285A5:0x2D3A,0xE285A6:0x2D3B,0xE285A7:0x2D3C,0xE285A8:0x2D3D,0xE285A9:0x2D3E,
0xE38D89:0x2D40,0xE38C94:0x2D41,0xE38CA2:0x2D42,0xE38D8D:0x2D43,0xE38C98:0x2D44,
0xE38CA7:0x2D45,0xE38C83:0x2D46,0xE38CB6:0x2D47,0xE38D91:0x2D48,0xE38D97:0x2D49,
0xE38C8D:0x2D4A,0xE38CA6:0x2D4B,0xE38CA3:0x2D4C,0xE38CAB:0x2D4D,0xE38D8A:0x2D4E,
0xE38CBB:0x2D4F,0xE38E9C:0x2D50,0xE38E9D:0x2D51,0xE38E9E:0x2D52,0xE38E8E:0x2D53,
0xE38E8F:0x2D54,0xE38F84:0x2D55,0xE38EA1:0x2D56,0xE38DBB:0x2D5F,0xE3809D:0x2D60,
0xE3809F:0x2D61,0xE28496:0x2D62,0xE38F8D:0x2D63,0xE284A1:0x2D64,0xE38AA4:0x2D65,
0xE38AA5:0x2D66,0xE38AA6:0x2D67,0xE38AA7:0x2D68,0xE38AA8:0x2D69,0xE388B1:0x2D6A,
0xE388B2:0x2D6B,0xE388B9:0x2D6C,0xE38DBE:0x2D6D,0xE38DBD:0x2D6E,0xE38DBC:0x2D6F,
0xE288AE:0x2D73,0xE28891:0x2D74,0xE2889F:0x2D78,0xE28ABF:0x2D79,

0xE38080:0x2121,0xE38081:0x2122,0xE38082:0x2123,0xEFBC8C:0x2124,0xEFBC8E:0x2125,
0xE383BB:0x2126,0xEFBC9A:0x2127,0xEFBC9B:0x2128,0xEFBC9F:0x2129,0xEFBC81:0x212A,
0xE3829B:0x212B,0xE3829C:0x212C,0xC2B4:0x212D,0xEFBD80:0x212E,0xC2A8:0x212F,
0xEFBCBE:0x2130,0xEFBFA3:0x2131,0xEFBCBF:0x2132,0xE383BD:0x2133,0xE383BE:0x2134,
0xE3829D:0x2135,0xE3829E:0x2136,0xE38083:0x2137,0xE4BB9D:0x2138,0xE38085:0x2139,
0xE38086:0x213A,0xE38087:0x213B,0xE383BC:0x213C,0xE28095:0x213D,0xE28090:0x213E,
0xEFBC8F:0x213F,0xEFBCBC:0x2140,0xEFBD9E:0x2141,0xE28096:0x2142,0xEFBD9C:0x2143,
0xE280A6:0x2144,0xE280A5:0x2145,0xE28098:0x2146,0xE28099:0x2147,0xE2809C:0x2148,
0xE2809D:0x2149,0xEFBC88:0x214A,0xEFBC89:0x214B,0xE38094:0x214C,0xE38095:0x214D,
0xEFBCBB:0x214E,0xEFBCBD:0x214F,0xEFBD9B:0x2150,0xEFBD9D:0x2151,0xE38088:0x2152,
0xE38089:0x2153,0xE3808A:0x2154,0xE3808B:0x2155,0xE3808C:0x2156,0xE3808D:0x2157,
0xE3808E:0x2158,0xE3808F:0x2159,0xE38090:0x215A,0xE38091:0x215B,0xEFBC8B:0x215C,
0xEFBC8D:0x215D,0xC2B1:0x215E,0xC397:0x215F,0xC3B7:0x2160,0xEFBC9D:0x2161,
0xE289A0:0x2162,0xEFBC9C:0x2163,0xEFBC9E:0x2164,0xE289A6:0x2165,0xE289A7:0x2166,
0xE2889E:0x2167,0xE288B4:0x2168,0xE29982:0x2169,0xE29980:0x216A,0xC2B0:0x216B,
0xE280B2:0x216C,0xE280B3:0x216D,0xE28483:0x216E,0xEFBFA5:0x216F,0xEFBC84:0x2170,
0xEFBFA0:0x2171,0xEFBFA1:0x2172,0xEFBC85:0x2173,0xEFBC83:0x2174,0xEFBC86:0x2175,
0xEFBC8A:0x2176,0xEFBCA0:0x2177,0xC2A7:0x2178,0xE29886:0x2179,0xE29885:0x217A,
0xE2978B:0x217B,0xE2978F:0x217C,0xE2978E:0x217D,0xE29787:0x217E,0xE29786:0x2221,
0xE296A1:0x2222,0xE296A0:0x2223,0xE296B3:0x2224,0xE296B2:0x2225,0xE296BD:0x2226,
0xE296BC:0x2227,0xE280BB:0x2228,0xE38092:0x2229,0xE28692:0x222A,0xE28690:0x222B,
0xE28691:0x222C,0xE28693:0x222D,0xE38093:0x222E,0xE28888:0x223A,0xE2888B:0x223B,
0xE28A86:0x223C,0xE28A87:0x223D,0xE28A82:0x223E,0xE28A83:0x223F,0xE288AA:0x2240,
0xE288A9:0x2241,0xE288A7:0x224A,0xE288A8:0x224B,0xC2AC:0x224C,0xE28792:0x224D,
0xE28794:0x224E,0xE28880:0x224F,0xE28883:0x2250,0xE288A0:0x225C,0xE28AA5:0x225D,
0xE28C92:0x225E,0xE28882:0x225F,0xE28887:0x2260,0xE289A1:0x2261,0xE28992:0x2262,
0xE289AA:0x2263,0xE289AB:0x2264,0xE2889A:0x2265,0xE288BD:0x2266,0xE2889D:0x2267,
0xE288B5:0x2268,0xE288AB:0x2269,0xE288AC:0x226A,0xE284AB:0x2272,0xE280B0:0x2273,
0xE299AF:0x2274,0xE299AD:0x2275,0xE299AA:0x2276,0xE280A0:0x2277,0xE280A1:0x2278,
0xC2B6:0x2279,0xE297AF:0x227E,0xEFBC90:0x2330,0xEFBC91:0x2331,0xEFBC92:0x2332,
0xEFBC93:0x2333,0xEFBC94:0x2334,0xEFBC95:0x2335,0xEFBC96:0x2336,0xEFBC97:0x2337,
0xEFBC98:0x2338,0xEFBC99:0x2339,0xEFBCA1:0x2341,0xEFBCA2:0x2342,0xEFBCA3:0x2343,
0xEFBCA4:0x2344,0xEFBCA5:0x2345,0xEFBCA6:0x2346,0xEFBCA7:0x2347,0xEFBCA8:0x2348,
0xEFBCA9:0x2349,0xEFBCAA:0x234A,0xEFBCAB:0x234B,0xEFBCAC:0x234C,0xEFBCAD:0x234D,
0xEFBCAE:0x234E,0xEFBCAF:0x234F,0xEFBCB0:0x2350,0xEFBCB1:0x2351,0xEFBCB2:0x2352,
0xEFBCB3:0x2353,0xEFBCB4:0x2354,0xEFBCB5:0x2355,0xEFBCB6:0x2356,0xEFBCB7:0x2357,
0xEFBCB8:0x2358,0xEFBCB9:0x2359,0xEFBCBA:0x235A,0xEFBD81:0x2361,0xEFBD82:0x2362,
0xEFBD83:0x2363,0xEFBD84:0x2364,0xEFBD85:0x2365,0xEFBD86:0x2366,0xEFBD87:0x2367,
0xEFBD88:0x2368,0xEFBD89:0x2369,0xEFBD8A:0x236A,0xEFBD8B:0x236B,0xEFBD8C:0x236C,
0xEFBD8D:0x236D,0xEFBD8E:0x236E,0xEFBD8F:0x236F,0xEFBD90:0x2370,0xEFBD91:0x2371,
0xEFBD92:0x2372,0xEFBD93:0x2373,0xEFBD94:0x2374,0xEFBD95:0x2375,0xEFBD96:0x2376,
0xEFBD97:0x2377,0xEFBD98:0x2378,0xEFBD99:0x2379,0xEFBD9A:0x237A,0xE38181:0x2421,
0xE38182:0x2422,0xE38183:0x2423,0xE38184:0x2424,0xE38185:0x2425,0xE38186:0x2426,
0xE38187:0x2427,0xE38188:0x2428,0xE38189:0x2429,0xE3818A:0x242A,0xE3818B:0x242B,
0xE3818C:0x242C,0xE3818D:0x242D,0xE3818E:0x242E,0xE3818F:0x242F,0xE38190:0x2430,
0xE38191:0x2431,0xE38192:0x2432,0xE38193:0x2433,0xE38194:0x2434,0xE38195:0x2435,
0xE38196:0x2436,0xE38197:0x2437,0xE38198:0x2438,0xE38199:0x2439,0xE3819A:0x243A,
0xE3819B:0x243B,0xE3819C:0x243C,0xE3819D:0x243D,0xE3819E:0x243E,0xE3819F:0x243F,
0xE381A0:0x2440,0xE381A1:0x2441,0xE381A2:0x2442,0xE381A3:0x2443,0xE381A4:0x2444,
0xE381A5:0x2445,0xE381A6:0x2446,0xE381A7:0x2447,0xE381A8:0x2448,0xE381A9:0x2449,
0xE381AA:0x244A,0xE381AB:0x244B,0xE381AC:0x244C,0xE381AD:0x244D,0xE381AE:0x244E,
0xE381AF:0x244F,0xE381B0:0x2450,0xE381B1:0x2451,0xE381B2:0x2452,0xE381B3:0x2453,
0xE381B4:0x2454,0xE381B5:0x2455,0xE381B6:0x2456,0xE381B7:0x2457,0xE381B8:0x2458,
0xE381B9:0x2459,0xE381BA:0x245A,0xE381BB:0x245B,0xE381BC:0x245C,0xE381BD:0x245D,
0xE381BE:0x245E,0xE381BF:0x245F,0xE38280:0x2460,0xE38281:0x2461,0xE38282:0x2462,
0xE38283:0x2463,0xE38284:0x2464,0xE38285:0x2465,0xE38286:0x2466,0xE38287:0x2467,
0xE38288:0x2468,0xE38289:0x2469,0xE3828A:0x246A,0xE3828B:0x246B,0xE3828C:0x246C,
0xE3828D:0x246D,0xE3828E:0x246E,0xE3828F:0x246F,0xE38290:0x2470,0xE38291:0x2471,
0xE38292:0x2472,0xE38293:0x2473,0xE382A1:0x2521,0xE382A2:0x2522,0xE382A3:0x2523,
0xE382A4:0x2524,0xE382A5:0x2525,0xE382A6:0x2526,0xE382A7:0x2527,0xE382A8:0x2528,
0xE382A9:0x2529,0xE382AA:0x252A,0xE382AB:0x252B,0xE382AC:0x252C,0xE382AD:0x252D,
0xE382AE:0x252E,0xE382AF:0x252F,0xE382B0:0x2530,0xE382B1:0x2531,0xE382B2:0x2532,
0xE382B3:0x2533,0xE382B4:0x2534,0xE382B5:0x2535,0xE382B6:0x2536,0xE382B7:0x2537,
0xE382B8:0x2538,0xE382B9:0x2539,0xE382BA:0x253A,0xE382BB:0x253B,0xE382BC:0x253C,
0xE382BD:0x253D,0xE382BE:0x253E,0xE382BF:0x253F,0xE38380:0x2540,0xE38381:0x2541,
0xE38382:0x2542,0xE38383:0x2543,0xE38384:0x2544,0xE38385:0x2545,0xE38386:0x2546,
0xE38387:0x2547,0xE38388:0x2548,0xE38389:0x2549,0xE3838A:0x254A,0xE3838B:0x254B,
0xE3838C:0x254C,0xE3838D:0x254D,0xE3838E:0x254E,0xE3838F:0x254F,0xE38390:0x2550,
0xE38391:0x2551,0xE38392:0x2552,0xE38393:0x2553,0xE38394:0x2554,0xE38395:0x2555,
0xE38396:0x2556,0xE38397:0x2557,0xE38398:0x2558,0xE38399:0x2559,0xE3839A:0x255A,
0xE3839B:0x255B,0xE3839C:0x255C,0xE3839D:0x255D,0xE3839E:0x255E,0xE3839F:0x255F,
0xE383A0:0x2560,0xE383A1:0x2561,0xE383A2:0x2562,0xE383A3:0x2563,0xE383A4:0x2564,
0xE383A5:0x2565,0xE383A6:0x2566,0xE383A7:0x2567,0xE383A8:0x2568,0xE383A9:0x2569,
0xE383AA:0x256A,0xE383AB:0x256B,0xE383AC:0x256C,0xE383AD:0x256D,0xE383AE:0x256E,
0xE383AF:0x256F,0xE383B0:0x2570,0xE383B1:0x2571,0xE383B2:0x2572,0xE383B3:0x2573,
0xE383B4:0x2574,0xE383B5:0x2575,0xE383B6:0x2576,0xCE91:0x2621,0xCE92:0x2622,
0xCE93:0x2623,0xCE94:0x2624,0xCE95:0x2625,0xCE96:0x2626,0xCE97:0x2627,
0xCE98:0x2628,0xCE99:0x2629,0xCE9A:0x262A,0xCE9B:0x262B,0xCE9C:0x262C,
0xCE9D:0x262D,0xCE9E:0x262E,0xCE9F:0x262F,0xCEA0:0x2630,0xCEA1:0x2631,
0xCEA3:0x2632,0xCEA4:0x2633,0xCEA5:0x2634,0xCEA6:0x2635,0xCEA7:0x2636,
0xCEA8:0x2637,0xCEA9:0x2638,0xCEB1:0x2641,0xCEB2:0x2642,0xCEB3:0x2643,
0xCEB4:0x2644,0xCEB5:0x2645,0xCEB6:0x2646,0xCEB7:0x2647,0xCEB8:0x2648,
0xCEB9:0x2649,0xCEBA:0x264A,0xCEBB:0x264B,0xCEBC:0x264C,0xCEBD:0x264D,
0xCEBE:0x264E,0xCEBF:0x264F,0xCF80:0x2650,0xCF81:0x2651,0xCF83:0x2652,
0xCF84:0x2653,0xCF85:0x2654,0xCF86:0x2655,0xCF87:0x2656,0xCF88:0x2657,
0xCF89:0x2658,0xD090:0x2721,0xD091:0x2722,0xD092:0x2723,0xD093:0x2724,
0xD094:0x2725,0xD095:0x2726,0xD081:0x2727,0xD096:0x2728,0xD097:0x2729,
0xD098:0x272A,0xD099:0x272B,0xD09A:0x272C,0xD09B:0x272D,0xD09C:0x272E,
0xD09D:0x272F,0xD09E:0x2730,0xD09F:0x2731,0xD0A0:0x2732,0xD0A1:0x2733,
0xD0A2:0x2734,0xD0A3:0x2735,0xD0A4:0x2736,0xD0A5:0x2737,0xD0A6:0x2738,
0xD0A7:0x2739,0xD0A8:0x273A,0xD0A9:0x273B,0xD0AA:0x273C,0xD0AB:0x273D,
0xD0AC:0x273E,0xD0AD:0x273F,0xD0AE:0x2740,0xD0AF:0x2741,0xD0B0:0x2751,
0xD0B1:0x2752,0xD0B2:0x2753,0xD0B3:0x2754,0xD0B4:0x2755,0xD0B5:0x2756,
0xD191:0x2757,0xD0B6:0x2758,0xD0B7:0x2759,0xD0B8:0x275A,0xD0B9:0x275B,
0xD0BA:0x275C,0xD0BB:0x275D,0xD0BC:0x275E,0xD0BD:0x275F,0xD0BE:0x2760,
0xD0BF:0x2761,0xD180:0x2762,0xD181:0x2763,0xD182:0x2764,0xD183:0x2765,
0xD184:0x2766,0xD185:0x2767,0xD186:0x2768,0xD187:0x2769,0xD188:0x276A,
0xD189:0x276B,0xD18A:0x276C,0xD18B:0x276D,0xD18C:0x276E,0xD18D:0x276F,
0xD18E:0x2770,0xD18F:0x2771,0xE29480:0x2821,0xE29482:0x2822,0xE2948C:0x2823,
0xE29490:0x2824,0xE29498:0x2825,0xE29494:0x2826,0xE2949C:0x2827,0xE294AC:0x2828,
0xE294A4:0x2829,0xE294B4:0x282A,0xE294BC:0x282B,0xE29481:0x282C,0xE29483:0x282D,
0xE2948F:0x282E,0xE29493:0x282F,0xE2949B:0x2830,0xE29497:0x2831,0xE294A3:0x2832,
0xE294B3:0x2833,0xE294AB:0x2834,0xE294BB:0x2835,0xE2958B:0x2836,0xE294A0:0x2837,
0xE294AF:0x2838,0xE294A8:0x2839,0xE294B7:0x283A,0xE294BF:0x283B,0xE2949D:0x283C,
0xE294B0:0x283D,0xE294A5:0x283E,0xE294B8:0x283F,0xE29582:0x2840,0xE4BA9C:0x3021,
0xE59496:0x3022,0xE5A883:0x3023,0xE998BF:0x3024,0xE59380:0x3025,0xE6849B:0x3026,
0xE68CA8:0x3027,0xE5A7B6:0x3028,0xE980A2:0x3029,0xE891B5:0x302A,0xE88C9C:0x302B,
0xE7A990:0x302C,0xE682AA:0x302D,0xE68FA1:0x302E,0xE6B8A5:0x302F,0xE697AD:0x3030,
0xE891A6:0x3031,0xE88AA6:0x3032,0xE9AFB5:0x3033,0xE6A293:0x3034,0xE59CA7:0x3035,
0xE696A1:0x3036,0xE689B1:0x3037,0xE5AE9B:0x3038,0xE5A790:0x3039,0xE899BB:0x303A,
0xE9A3B4:0x303B,0xE7B5A2:0x303C,0xE7B6BE:0x303D,0xE9AE8E:0x303E,0xE68896:0x303F,
0xE7B29F:0x3040,0xE8A2B7:0x3041,0xE5AE89:0x3042,0xE5BAB5:0x3043,0xE68C89:0x3044,
0xE69A97:0x3045,0xE6A188:0x3046,0xE99787:0x3047,0xE99E8D:0x3048,0xE69D8F:0x3049,
0xE4BBA5:0x304A,0xE4BC8A:0x304B,0xE4BD8D:0x304C,0xE4BE9D:0x304D,0xE58189:0x304E,
0xE59BB2:0x304F,0xE5A4B7:0x3050,0xE5A794:0x3051,0xE5A881:0x3052,0xE5B089:0x3053,
0xE6839F:0x3054,0xE6848F:0x3055,0xE685B0:0x3056,0xE69893:0x3057,0xE6A485:0x3058,
0xE782BA:0x3059,0xE7958F:0x305A,0xE795B0:0x305B,0xE7A7BB:0x305C,0xE7B6AD:0x305D,
0xE7B7AF:0x305E,0xE88383:0x305F,0xE8908E:0x3060,0xE8A1A3:0x3061,0xE8AC82:0x3062,
0xE98195:0x3063,0xE981BA:0x3064,0xE58CBB:0x3065,0xE4BA95:0x3066,0xE4BAA5:0x3067,
0xE59F9F:0x3068,0xE882B2:0x3069,0xE98381:0x306A,0xE7A3AF:0x306B,0xE4B880:0x306C,
0xE5A3B1:0x306D,0xE6BAA2:0x306E,0xE980B8:0x306F,0xE7A8B2:0x3070,0xE88CA8:0x3071,
0xE88A8B:0x3072,0xE9B0AF:0x3073,0xE58581:0x3074,0xE58DB0:0x3075,0xE592BD:0x3076,
0xE593A1:0x3077,0xE59BA0:0x3078,0xE5A7BB:0x3079,0xE5BC95:0x307A,0xE9A3B2:0x307B,
0xE6B7AB:0x307C,0xE883A4:0x307D,0xE894AD:0x307E,0xE999A2:0x3121,0xE999B0:0x3122,
0xE99AA0:0x3123,0xE99FBB:0x3124,0xE5908B:0x3125,0xE58FB3:0x3126,0xE5AE87:0x3127,
0xE7838F:0x3128,0xE7BEBD:0x3129,0xE8BF82:0x312A,0xE99BA8:0x312B,0xE58DAF:0x312C,
0xE9B59C:0x312D,0xE7AABA:0x312E,0xE4B891:0x312F,0xE7A293:0x3130,0xE887BC:0x3131,
0xE6B8A6:0x3132,0xE59898:0x3133,0xE59484:0x3134,0xE6AC9D:0x3135,0xE8949A:0x3136,
0xE9B0BB:0x3137,0xE5A7A5:0x3138,0xE58EA9:0x3139,0xE6B5A6:0x313A,0xE7939C:0x313B,
0xE9968F:0x313C,0xE59982:0x313D,0xE4BA91:0x313E,0xE9818B:0x313F,0xE99BB2:0x3140,
0xE88D8F:0x3141,0xE9A48C:0x3142,0xE58FA1:0x3143,0xE596B6:0x3144,0xE5ACB0:0x3145,
0xE5BDB1:0x3146,0xE698A0:0x3147,0xE69BB3:0x3148,0xE6A084:0x3149,0xE6B0B8:0x314A,
0xE6B3B3:0x314B,0xE6B4A9:0x314C,0xE7919B:0x314D,0xE79B88:0x314E,0xE7A98E:0x314F,
0xE9A0B4:0x3150,0xE88BB1:0x3151,0xE8A19B:0x3152,0xE8A9A0:0x3153,0xE98BAD:0x3154,
0xE6B6B2:0x3155,0xE796AB:0x3156,0xE79B8A:0x3157,0xE9A785:0x3158,0xE682A6:0x3159,
0xE8AC81:0x315A,0xE8B68A:0x315B,0xE996B2:0x315C,0xE6A68E:0x315D,0xE58EAD:0x315E,
0xE58686:0x315F,0xE59C92:0x3160,0xE5A0B0:0x3161,0xE5A584:0x3162,0xE5AEB4:0x3163,
0xE5BBB6:0x3164,0xE680A8:0x3165,0xE68EA9:0x3166,0xE68FB4:0x3167,0xE6B2BF:0x3168,
0xE6BC94:0x3169,0xE7828E:0x316A,0xE78494:0x316B,0xE78599:0x316C,0xE78795:0x316D,
0xE78CBF:0x316E,0xE7B881:0x316F,0xE889B6:0x3170,0xE88B91:0x3171,0xE89697:0x3172,
0xE981A0:0x3173,0xE9899B:0x3174,0xE9B49B:0x3175,0xE5A1A9:0x3176,0xE696BC:0x3177,
0xE6B19A:0x3178,0xE794A5:0x3179,0xE587B9:0x317A,0xE5A4AE:0x317B,0xE5A5A5:0x317C,
0xE5BE80:0x317D,0xE5BF9C:0x317E,0xE68ABC:0x3221,0xE697BA:0x3222,0xE6A8AA:0x3223,
0xE6ACA7:0x3224,0xE6AEB4:0x3225,0xE78E8B:0x3226,0xE7BF81:0x3227,0xE8A596:0x3228,
0xE9B4AC:0x3229,0xE9B48E:0x322A,0xE9BB84:0x322B,0xE5B2A1:0x322C,0xE6B296:0x322D,
0xE88DBB:0x322E,0xE58484:0x322F,0xE5B18B:0x3230,0xE686B6:0x3231,0xE88786:0x3232,
0xE6A1B6:0x3233,0xE789A1:0x3234,0xE4B999:0x3235,0xE4BFBA:0x3236,0xE58DB8:0x3237,
0xE681A9:0x3238,0xE6B8A9:0x3239,0xE7A98F:0x323A,0xE99FB3:0x323B,0xE4B88B:0x323C,
0xE58C96:0x323D,0xE4BBAE:0x323E,0xE4BD95:0x323F,0xE4BCBD:0x3240,0xE4BEA1:0x3241,
0xE4BDB3:0x3242,0xE58AA0:0x3243,0xE58FAF:0x3244,0xE59889:0x3245,0xE5A48F:0x3246,
0xE5AB81:0x3247,0xE5AEB6:0x3248,0xE5AFA1:0x3249,0xE7A791:0x324A,0xE69A87:0x324B,
0xE69E9C:0x324C,0xE69EB6:0x324D,0xE6AD8C:0x324E,0xE6B2B3:0x324F,0xE781AB:0x3250,
0xE78F82:0x3251,0xE7A68D:0x3252,0xE7A6BE:0x3253,0xE7A8BC:0x3254,0xE7AE87:0x3255,
0xE88AB1:0x3256,0xE88B9B:0x3257,0xE88C84:0x3258,0xE88DB7:0x3259,0xE88FAF:0x325A,
0xE88F93:0x325B,0xE89DA6:0x325C,0xE8AAB2:0x325D,0xE598A9:0x325E,0xE8B2A8:0x325F,
0xE8BFA6:0x3260,0xE9818E:0x3261,0xE99C9E:0x3262,0xE89A8A:0x3263,0xE4BF84:0x3264,
0xE5B3A8:0x3265,0xE68891:0x3266,0xE78999:0x3267,0xE794BB:0x3268,0xE887A5:0x3269,
0xE88ABD:0x326A,0xE89BBE:0x326B,0xE8B380:0x326C,0xE99B85:0x326D,0xE9A493:0x326E,
0xE9A795:0x326F,0xE4BB8B:0x3270,0xE4BC9A:0x3271,0xE8A7A3:0x3272,0xE59B9E:0x3273,
0xE5A18A:0x3274,0xE5A38A:0x3275,0xE5BBBB:0x3276,0xE5BFAB:0x3277,0xE680AA:0x3278,
0xE68294:0x3279,0xE681A2:0x327A,0xE68790:0x327B,0xE68892:0x327C,0xE68B90:0x327D,
0xE694B9:0x327E,0xE9AD81:0x3321,0xE699A6:0x3322,0xE6A2B0:0x3323,0xE6B5B7:0x3324,
0xE781B0:0x3325,0xE7958C:0x3326,0xE79A86:0x3327,0xE7B5B5:0x3328,0xE88AA5:0x3329,
0xE89FB9:0x332A,0xE9968B:0x332B,0xE99A8E:0x332C,0xE8B29D:0x332D,0xE587B1:0x332E,
0xE58ABE:0x332F,0xE5A496:0x3330,0xE592B3:0x3331,0xE5AEB3:0x3332,0xE5B496:0x3333,
0xE685A8:0x3334,0xE6A682:0x3335,0xE6B6AF:0x3336,0xE7A28D:0x3337,0xE8938B:0x3338,
0xE8A197:0x3339,0xE8A9B2:0x333A,0xE98EA7:0x333B,0xE9AAB8:0x333C,0xE6B5AC:0x333D,
0xE9A6A8:0x333E,0xE89B99:0x333F,0xE59EA3:0x3340,0xE69FBF:0x3341,0xE89B8E:0x3342,
0xE9888E:0x3343,0xE58A83:0x3344,0xE59A87:0x3345,0xE59084:0x3346,0xE5BB93:0x3347,
0xE68BA1:0x3348,0xE692B9:0x3349,0xE6A0BC:0x334A,0xE6A0B8:0x334B,0xE6AEBB:0x334C,
0xE78DB2:0x334D,0xE7A2BA:0x334E,0xE7A9AB:0x334F,0xE8A69A:0x3350,0xE8A792:0x3351,
0xE8B5AB:0x3352,0xE8BC83:0x3353,0xE983AD:0x3354,0xE996A3:0x3355,0xE99A94:0x3356,
0xE99DA9:0x3357,0xE5ADA6:0x3358,0xE5B2B3:0x3359,0xE6A5BD:0x335A,0xE9A18D:0x335B,
0xE9A18E:0x335C,0xE68E9B:0x335D,0xE7ACA0:0x335E,0xE6A8AB:0x335F,0xE6A9BF:0x3360,
0xE6A2B6:0x3361,0xE9B08D:0x3362,0xE6BD9F:0x3363,0xE589B2:0x3364,0xE5969D:0x3365,
0xE681B0:0x3366,0xE68BAC:0x3367,0xE6B4BB:0x3368,0xE6B887:0x3369,0xE6BB91:0x336A,
0xE8919B:0x336B,0xE8A490:0x336C,0xE8BD84:0x336D,0xE4B894:0x336E,0xE9B0B9:0x336F,
0xE58FB6:0x3370,0xE6A49B:0x3371,0xE6A8BA:0x3372,0xE99E84:0x3373,0xE6A0AA:0x3374,
0xE5859C:0x3375,0xE7AB83:0x3376,0xE892B2:0x3377,0xE9879C:0x3378,0xE98E8C:0x3379,
0xE5999B:0x337A,0xE9B4A8:0x337B,0xE6A0A2:0x337C,0xE88C85:0x337D,0xE890B1:0x337E,
0xE7B2A5:0x3421,0xE58888:0x3422,0xE88B85:0x3423,0xE793A6:0x3424,0xE4B9BE:0x3425,
0xE4BE83:0x3426,0xE586A0:0x3427,0xE5AF92:0x3428,0xE5888A:0x3429,0xE58B98:0x342A,
0xE58BA7:0x342B,0xE5B7BB:0x342C,0xE5969A:0x342D,0xE5A0AA:0x342E,0xE5A7A6:0x342F,
0xE5AE8C:0x3430,0xE5AE98:0x3431,0xE5AF9B:0x3432,0xE5B9B2:0x3433,0xE5B9B9:0x3434,
0xE682A3:0x3435,0xE6849F:0x3436,0xE685A3:0x3437,0xE686BE:0x3438,0xE68F9B:0x3439,
0xE695A2:0x343A,0xE69F91:0x343B,0xE6A193:0x343C,0xE6A3BA:0x343D,0xE6ACBE:0x343E,
0xE6AD93:0x343F,0xE6B197:0x3440,0xE6BCA2:0x3441,0xE6BE97:0x3442,0xE6BD85:0x3443,
0xE792B0:0x3444,0xE79498:0x3445,0xE79BA3:0x3446,0xE79C8B:0x3447,0xE7ABBF:0x3448,
0xE7AEA1:0x3449,0xE7B0A1:0x344A,0xE7B7A9:0x344B,0xE7BCB6:0x344C,0xE7BFB0:0x344D,
0xE8829D:0x344E,0xE889A6:0x344F,0xE88E9E:0x3450,0xE8A6B3:0x3451,0xE8AB8C:0x3452,
0xE8B2AB:0x3453,0xE98284:0x3454,0xE99191:0x3455,0xE99693:0x3456,0xE99691:0x3457,
0xE996A2:0x3458,0xE999A5:0x3459,0xE99F93:0x345A,0xE9A4A8:0x345B,0xE88898:0x345C,
0xE4B8B8:0x345D,0xE590AB:0x345E,0xE5B2B8:0x345F,0xE5B78C:0x3460,0xE78EA9:0x3461,
0xE7998C:0x3462,0xE79CBC:0x3463,0xE5B2A9:0x3464,0xE7BFAB:0x3465,0xE8B48B:0x3466,
0xE99B81:0x3467,0xE9A091:0x3468,0xE9A194:0x3469,0xE9A198:0x346A,0xE4BC81:0x346B,
0xE4BC8E:0x346C,0xE58DB1:0x346D,0xE5969C:0x346E,0xE599A8:0x346F,0xE59FBA:0x3470,
0xE5A587:0x3471,0xE5AC89:0x3472,0xE5AF84:0x3473,0xE5B290:0x3474,0xE5B88C:0x3475,
0xE5B9BE:0x3476,0xE5BF8C:0x3477,0xE68FAE:0x3478,0xE69CBA:0x3479,0xE69797:0x347A,
0xE697A2:0x347B,0xE69C9F:0x347C,0xE6A38B:0x347D,0xE6A384:0x347E,0xE6A99F:0x3521,
0xE5B8B0:0x3522,0xE6AF85:0x3523,0xE6B097:0x3524,0xE6B1BD:0x3525,0xE795BF:0x3526,
0xE7A588:0x3527,0xE5ADA3:0x3528,0xE7A880:0x3529,0xE7B480:0x352A,0xE5BEBD:0x352B,
0xE8A68F:0x352C,0xE8A898:0x352D,0xE8B2B4:0x352E,0xE8B5B7:0x352F,0xE8BB8C:0x3530,
0xE8BC9D:0x3531,0xE9A3A2:0x3532,0xE9A88E:0x3533,0xE9ACBC:0x3534,0xE4BA80:0x3535,
0xE581BD:0x3536,0xE58480:0x3537,0xE5A693:0x3538,0xE5AE9C:0x3539,0xE688AF:0x353A,
0xE68A80:0x353B,0xE693AC:0x353C,0xE6ACBA:0x353D,0xE78AA0:0x353E,0xE79691:0x353F,
0xE7A587:0x3540,0xE7BEA9:0x3541,0xE89FBB:0x3542,0xE8AABC:0x3543,0xE8ADB0:0x3544,
0xE68EAC:0x3545,0xE88F8A:0x3546,0xE99EA0:0x3547,0xE59089:0x3548,0xE59083:0x3549,
0xE596AB:0x354A,0xE6A194:0x354B,0xE6A998:0x354C,0xE8A9B0:0x354D,0xE7A0A7:0x354E,
0xE69DB5:0x354F,0xE9BB8D:0x3550,0xE58DB4:0x3551,0xE5AEA2:0x3552,0xE8849A:0x3553,
0xE89990:0x3554,0xE98086:0x3555,0xE4B898:0x3556,0xE4B985:0x3557,0xE4BB87:0x3558,
0xE4BC91:0x3559,0xE58F8A:0x355A,0xE590B8:0x355B,0xE5AEAE:0x355C,0xE5BC93:0x355D,
0xE680A5:0x355E,0xE69591:0x355F,0xE69CBD:0x3560,0xE6B182:0x3561,0xE6B1B2:0x3562,
0xE6B3A3:0x3563,0xE781B8:0x3564,0xE79083:0x3565,0xE7A9B6:0x3566,0xE7AAAE:0x3567,
0xE7AC88:0x3568,0xE7B49A:0x3569,0xE7B3BE:0x356A,0xE7B5A6:0x356B,0xE697A7:0x356C,
0xE7899B:0x356D,0xE58EBB:0x356E,0xE5B185:0x356F,0xE5B7A8:0x3570,0xE68B92:0x3571,
0xE68BA0:0x3572,0xE68C99:0x3573,0xE6B8A0:0x3574,0xE8999A:0x3575,0xE8A8B1:0x3576,
0xE8B79D:0x3577,0xE98BB8:0x3578,0xE6BC81:0x3579,0xE7A6A6:0x357A,0xE9AD9A:0x357B,
0xE4BAA8:0x357C,0xE4BAAB:0x357D,0xE4BAAC:0x357E,0xE4BE9B:0x3621,0xE4BEA0:0x3622,
0xE58391:0x3623,0xE58587:0x3624,0xE7ABB6:0x3625,0xE585B1:0x3626,0xE587B6:0x3627,
0xE58D94:0x3628,0xE58CA1:0x3629,0xE58DBF:0x362A,0xE58FAB:0x362B,0xE596AC:0x362C,
0xE5A283:0x362D,0xE5B3A1:0x362E,0xE5BCB7:0x362F,0xE5BD8A:0x3630,0xE680AF:0x3631,
0xE68190:0x3632,0xE681AD:0x3633,0xE68C9F:0x3634,0xE69599:0x3635,0xE6A98B:0x3636,
0xE6B381:0x3637,0xE78B82:0x3638,0xE78BAD:0x3639,0xE79FAF:0x363A,0xE883B8:0x363B,
0xE88485:0x363C,0xE88888:0x363D,0xE8958E:0x363E,0xE983B7:0x363F,0xE98FA1:0x3640,
0xE99FBF:0x3641,0xE9A597:0x3642,0xE9A99A:0x3643,0xE4BBB0:0x3644,0xE5879D:0x3645,
0xE5B0AD:0x3646,0xE69A81:0x3647,0xE6A5AD:0x3648,0xE5B180:0x3649,0xE69BB2:0x364A,
0xE6A5B5:0x364B,0xE78E89:0x364C,0xE6A190:0x364D,0xE7B281:0x364E,0xE58385:0x364F,
0xE58BA4:0x3650,0xE59D87:0x3651,0xE5B7BE:0x3652,0xE98CA6:0x3653,0xE696A4:0x3654,
0xE6ACA3:0x3655,0xE6ACBD:0x3656,0xE790B4:0x3657,0xE7A681:0x3658,0xE7A6BD:0x3659,
0xE7AD8B:0x365A,0xE7B78A:0x365B,0xE88AB9:0x365C,0xE88F8C:0x365D,0xE8A1BF:0x365E,
0xE8A59F:0x365F,0xE8ACB9:0x3660,0xE8BF91:0x3661,0xE98791:0x3662,0xE5909F:0x3663,
0xE98A80:0x3664,0xE4B99D:0x3665,0xE580B6:0x3666,0xE58FA5:0x3667,0xE58CBA:0x3668,
0xE78B97:0x3669,0xE78E96:0x366A,0xE79FA9:0x366B,0xE88BA6:0x366C,0xE8BAAF:0x366D,
0xE9A786:0x366E,0xE9A788:0x366F,0xE9A792:0x3670,0xE585B7:0x3671,0xE6849A:0x3672,
0xE8999E:0x3673,0xE596B0:0x3674,0xE7A9BA:0x3675,0xE581B6:0x3676,0xE5AF93:0x3677,
0xE98187:0x3678,0xE99A85:0x3679,0xE4B8B2:0x367A,0xE6AB9B:0x367B,0xE987A7:0x367C,
0xE5B191:0x367D,0xE5B188:0x367E,0xE68E98:0x3721,0xE7AA9F:0x3722,0xE6B293:0x3723,
0xE99DB4:0x3724,0xE8BDA1:0x3725,0xE7AAAA:0x3726,0xE7868A:0x3727,0xE99A88:0x3728,
0xE7B282:0x3729,0xE6A097:0x372A,0xE7B9B0:0x372B,0xE6A191:0x372C,0xE98DAC:0x372D,
0xE58BB2:0x372E,0xE5909B:0x372F,0xE896AB:0x3730,0xE8A893:0x3731,0xE7BEA4:0x3732,
0xE8BB8D:0x3733,0xE983A1:0x3734,0xE58DA6:0x3735,0xE8A288:0x3736,0xE7A581:0x3737,
0xE4BF82:0x3738,0xE582BE:0x3739,0xE58891:0x373A,0xE58584:0x373B,0xE59593:0x373C,
0xE59CAD:0x373D,0xE78FAA:0x373E,0xE59E8B:0x373F,0xE5A591:0x3740,0xE5BDA2:0x3741,
0xE5BE84:0x3742,0xE681B5:0x3743,0xE685B6:0x3744,0xE685A7:0x3745,0xE686A9:0x3746,
0xE68EB2:0x3747,0xE690BA:0x3748,0xE695AC:0x3749,0xE699AF:0x374A,0xE6A182:0x374B,
0xE6B893:0x374C,0xE795A6:0x374D,0xE7A8BD:0x374E,0xE7B3BB:0x374F,0xE7B58C:0x3750,
0xE7B699:0x3751,0xE7B98B:0x3752,0xE7BDAB:0x3753,0xE88C8E:0x3754,0xE88D8A:0x3755,
0xE89B8D:0x3756,0xE8A888:0x3757,0xE8A9A3:0x3758,0xE8ADA6:0x3759,0xE8BBBD:0x375A,
0xE9A09A:0x375B,0xE9B68F:0x375C,0xE88AB8:0x375D,0xE8BF8E:0x375E,0xE9AFA8:0x375F,
0xE58A87:0x3760,0xE6889F:0x3761,0xE69283:0x3762,0xE6BF80:0x3763,0xE99A99:0x3764,
0xE6A181:0x3765,0xE58291:0x3766,0xE6ACA0:0x3767,0xE6B1BA:0x3768,0xE6BD94:0x3769,
0xE7A9B4:0x376A,0xE7B590:0x376B,0xE8A180:0x376C,0xE8A8A3:0x376D,0xE69C88:0x376E,
0xE4BBB6:0x376F,0xE580B9:0x3770,0xE580A6:0x3771,0xE581A5:0x3772,0xE585BC:0x3773,
0xE588B8:0x3774,0xE589A3:0x3775,0xE596A7:0x3776,0xE59C8F:0x3777,0xE5A085:0x3778,
0xE5AB8C:0x3779,0xE5BBBA:0x377A,0xE686B2:0x377B,0xE687B8:0x377C,0xE68BB3:0x377D,
0xE68DB2:0x377E,0xE6A49C:0x3821,0xE6A8A9:0x3822,0xE789BD:0x3823,0xE78AAC:0x3824,
0xE78CAE:0x3825,0xE7A094:0x3826,0xE7A1AF:0x3827,0xE7B5B9:0x3828,0xE79C8C:0x3829,
0xE882A9:0x382A,0xE8A68B:0x382B,0xE8AC99:0x382C,0xE8B3A2:0x382D,0xE8BB92:0x382E,
0xE981A3:0x382F,0xE98DB5:0x3830,0xE999BA:0x3831,0xE9A195:0x3832,0xE9A893:0x3833,
0xE9B9B8:0x3834,0xE58583:0x3835,0xE58E9F:0x3836,0xE58EB3:0x3837,0xE5B9BB:0x3838,
0xE5BCA6:0x3839,0xE6B89B:0x383A,0xE6BA90:0x383B,0xE78E84:0x383C,0xE78FBE:0x383D,
0xE7B583:0x383E,0xE888B7:0x383F,0xE8A880:0x3840,0xE8ABBA:0x3841,0xE99990:0x3842,
0xE4B98E:0x3843,0xE5808B:0x3844,0xE58FA4:0x3845,0xE591BC:0x3846,0xE59BBA:0x3847,
0xE5A791:0x3848,0xE5ADA4:0x3849,0xE5B7B1:0x384A,0xE5BAAB:0x384B,0xE5BCA7:0x384C,
0xE688B8:0x384D,0xE69585:0x384E,0xE69EAF:0x384F,0xE6B996:0x3850,0xE78B90:0x3851,
0xE7B38A:0x3852,0xE8A2B4:0x3853,0xE882A1:0x3854,0xE883A1:0x3855,0xE88FB0:0x3856,
0xE8998E:0x3857,0xE8AA87:0x3858,0xE8B7A8:0x3859,0xE988B7:0x385A,0xE99B87:0x385B,
0xE9A1A7:0x385C,0xE9BC93:0x385D,0xE4BA94:0x385E,0xE4BA92:0x385F,0xE4BC8D:0x3860,
0xE58D88:0x3861,0xE59189:0x3862,0xE590BE:0x3863,0xE5A8AF:0x3864,0xE5BE8C:0x3865,
0xE5BEA1:0x3866,0xE6829F:0x3867,0xE6A2A7:0x3868,0xE6AA8E:0x3869,0xE7919A:0x386A,
0xE7A281:0x386B,0xE8AA9E:0x386C,0xE8AAA4:0x386D,0xE8ADB7:0x386E,0xE98690:0x386F,
0xE4B99E:0x3870,0xE9AF89:0x3871,0xE4BAA4:0x3872,0xE4BDBC:0x3873,0xE4BEAF:0x3874,
0xE58099:0x3875,0xE58096:0x3876,0xE58589:0x3877,0xE585AC:0x3878,0xE58A9F:0x3879,
0xE58AB9:0x387A,0xE58BBE:0x387B,0xE58E9A:0x387C,0xE58FA3:0x387D,0xE59091:0x387E,
0xE5908E:0x3921,0xE59689:0x3922,0xE59D91:0x3923,0xE59EA2:0x3924,0xE5A5BD:0x3925,
0xE5AD94:0x3926,0xE5AD9D:0x3927,0xE5AE8F:0x3928,0xE5B7A5:0x3929,0xE5B7A7:0x392A,
0xE5B7B7:0x392B,0xE5B9B8:0x392C,0xE5BA83:0x392D,0xE5BA9A:0x392E,0xE5BAB7:0x392F,
0xE5BC98:0x3930,0xE68192:0x3931,0xE6858C:0x3932,0xE68A97:0x3933,0xE68B98:0x3934,
0xE68EA7:0x3935,0xE694BB:0x3936,0xE69882:0x3937,0xE69983:0x3938,0xE69BB4:0x3939,
0xE69DAD:0x393A,0xE6A0A1:0x393B,0xE6A297:0x393C,0xE6A78B:0x393D,0xE6B19F:0x393E,
0xE6B4AA:0x393F,0xE6B5A9:0x3940,0xE6B8AF:0x3941,0xE6BA9D:0x3942,0xE794B2:0x3943,
0xE79A87:0x3944,0xE7A1AC:0x3945,0xE7A8BF:0x3946,0xE7B3A0:0x3947,0xE7B485:0x3948,
0xE7B498:0x3949,0xE7B59E:0x394A,0xE7B6B1:0x394B,0xE88095:0x394C,0xE88083:0x394D,
0xE882AF:0x394E,0xE882B1:0x394F,0xE88594:0x3950,0xE8868F:0x3951,0xE888AA:0x3952,
0xE88D92:0x3953,0xE8A18C:0x3954,0xE8A1A1:0x3955,0xE8AC9B:0x3956,0xE8B2A2:0x3957,
0xE8B3BC:0x3958,0xE9838A:0x3959,0xE985B5:0x395A,0xE989B1:0x395B,0xE7A0BF:0x395C,
0xE98BBC:0x395D,0xE996A4:0x395E,0xE9998D:0x395F,0xE9A085:0x3960,0xE9A699:0x3961,
0xE9AB98:0x3962,0xE9B4BB:0x3963,0xE5899B:0x3964,0xE58AAB:0x3965,0xE58FB7:0x3966,
0xE59088:0x3967,0xE5A395:0x3968,0xE68BB7:0x3969,0xE6BFA0:0x396A,0xE8B1AA:0x396B,
0xE8BD9F:0x396C,0xE9BAB9:0x396D,0xE5858B:0x396E,0xE588BB:0x396F,0xE5918A:0x3970,
0xE59BBD:0x3971,0xE7A980:0x3972,0xE985B7:0x3973,0xE9B5A0:0x3974,0xE9BB92:0x3975,
0xE78D84:0x3976,0xE6BC89:0x3977,0xE885B0:0x3978,0xE79491:0x3979,0xE5BFBD:0x397A,
0xE6839A:0x397B,0xE9AAA8:0x397C,0xE78B9B:0x397D,0xE8BEBC:0x397E,0xE6ADA4:0x3A21,
0xE9A083:0x3A22,0xE4BB8A:0x3A23,0xE59BB0:0x3A24,0xE59DA4:0x3A25,0xE5A2BE:0x3A26,
0xE5A99A:0x3A27,0xE681A8:0x3A28,0xE68787:0x3A29,0xE6988F:0x3A2A,0xE69886:0x3A2B,
0xE6A0B9:0x3A2C,0xE6A2B1:0x3A2D,0xE6B7B7:0x3A2E,0xE79795:0x3A2F,0xE7B4BA:0x3A30,
0xE889AE:0x3A31,0xE9AD82:0x3A32,0xE4BA9B:0x3A33,0xE4BD90:0x3A34,0xE58F89:0x3A35,
0xE59486:0x3A36,0xE5B5AF:0x3A37,0xE5B7A6:0x3A38,0xE5B7AE:0x3A39,0xE69FBB:0x3A3A,
0xE6B299:0x3A3B,0xE791B3:0x3A3C,0xE7A082:0x3A3D,0xE8A990:0x3A3E,0xE98E96:0x3A3F,
0xE8A39F:0x3A40,0xE59D90:0x3A41,0xE5BAA7:0x3A42,0xE68CAB:0x3A43,0xE582B5:0x3A44,
0xE582AC:0x3A45,0xE5868D:0x3A46,0xE69C80:0x3A47,0xE59389:0x3A48,0xE5A19E:0x3A49,
0xE5A6BB:0x3A4A,0xE5AEB0:0x3A4B,0xE5BDA9:0x3A4C,0xE6898D:0x3A4D,0xE68EA1:0x3A4E,
0xE6A0BD:0x3A4F,0xE6ADB3:0x3A50,0xE6B888:0x3A51,0xE781BD:0x3A52,0xE98787:0x3A53,
0xE78A80:0x3A54,0xE7A095:0x3A55,0xE7A0A6:0x3A56,0xE7A5AD:0x3A57,0xE6968E:0x3A58,
0xE7B4B0:0x3A59,0xE88F9C:0x3A5A,0xE8A381:0x3A5B,0xE8BC89:0x3A5C,0xE99A9B:0x3A5D,
0xE589A4:0x3A5E,0xE59CA8:0x3A5F,0xE69D90:0x3A60,0xE7BDAA:0x3A61,0xE8B2A1:0x3A62,
0xE586B4:0x3A63,0xE59D82:0x3A64,0xE998AA:0x3A65,0xE5A0BA:0x3A66,0xE6A68A:0x3A67,
0xE882B4:0x3A68,0xE592B2:0x3A69,0xE5B48E:0x3A6A,0xE59FBC:0x3A6B,0xE7A295:0x3A6C,
0xE9B7BA:0x3A6D,0xE4BD9C:0x3A6E,0xE5898A:0x3A6F,0xE5928B:0x3A70,0xE690BE:0x3A71,
0xE698A8:0x3A72,0xE69C94:0x3A73,0xE69FB5:0x3A74,0xE7AA84:0x3A75,0xE7AD96:0x3A76,
0xE7B4A2:0x3A77,0xE98CAF:0x3A78,0xE6A19C:0x3A79,0xE9AEAD:0x3A7A,0xE7ACB9:0x3A7B,
0xE58C99:0x3A7C,0xE5868A:0x3A7D,0xE588B7:0x3A7E,0xE5AF9F:0x3B21,0xE68BB6:0x3B22,
0xE692AE:0x3B23,0xE693A6:0x3B24,0xE69CAD:0x3B25,0xE6AEBA:0x3B26,0xE896A9:0x3B27,
0xE99B91:0x3B28,0xE79A90:0x3B29,0xE9AF96:0x3B2A,0xE68D8C:0x3B2B,0xE98C86:0x3B2C,
0xE9AEAB:0x3B2D,0xE79ABF:0x3B2E,0xE69992:0x3B2F,0xE4B889:0x3B30,0xE58298:0x3B31,
0xE58F82:0x3B32,0xE5B1B1:0x3B33,0xE683A8:0x3B34,0xE69292:0x3B35,0xE695A3:0x3B36,
0xE6A19F:0x3B37,0xE787A6:0x3B38,0xE78F8A:0x3B39,0xE794A3:0x3B3A,0xE7AE97:0x3B3B,
0xE7BA82:0x3B3C,0xE89A95:0x3B3D,0xE8AE83:0x3B3E,0xE8B39B:0x3B3F,0xE985B8:0x3B40,
0xE9A490:0x3B41,0xE696AC:0x3B42,0xE69AAB:0x3B43,0xE6AE8B:0x3B44,0xE4BB95:0x3B45,
0xE4BB94:0x3B46,0xE4BCBA:0x3B47,0xE4BDBF:0x3B48,0xE588BA:0x3B49,0xE58FB8:0x3B4A,
0xE58FB2:0x3B4B,0xE597A3:0x3B4C,0xE59B9B:0x3B4D,0xE5A3AB:0x3B4E,0xE5A78B:0x3B4F,
0xE5A789:0x3B50,0xE5A7BF:0x3B51,0xE5AD90:0x3B52,0xE5B18D:0x3B53,0xE5B882:0x3B54,
0xE5B8AB:0x3B55,0xE5BF97:0x3B56,0xE6809D:0x3B57,0xE68C87:0x3B58,0xE694AF:0x3B59,
0xE5AD9C:0x3B5A,0xE696AF:0x3B5B,0xE696BD:0x3B5C,0xE697A8:0x3B5D,0xE69E9D:0x3B5E,
0xE6ADA2:0x3B5F,0xE6ADBB:0x3B60,0xE6B08F:0x3B61,0xE78D85:0x3B62,0xE7A589:0x3B63,
0xE7A781:0x3B64,0xE7B3B8:0x3B65,0xE7B499:0x3B66,0xE7B4AB:0x3B67,0xE882A2:0x3B68,
0xE88482:0x3B69,0xE887B3:0x3B6A,0xE8A696:0x3B6B,0xE8A99E:0x3B6C,0xE8A9A9:0x3B6D,
0xE8A9A6:0x3B6E,0xE8AA8C:0x3B6F,0xE8ABAE:0x3B70,0xE8B387:0x3B71,0xE8B39C:0x3B72,
0xE99B8C:0x3B73,0xE9A3BC:0x3B74,0xE6ADAF:0x3B75,0xE4BA8B:0x3B76,0xE4BCBC:0x3B77,
0xE4BE8D:0x3B78,0xE58590:0x3B79,0xE5AD97:0x3B7A,0xE5AFBA:0x3B7B,0xE68588:0x3B7C,
0xE68C81:0x3B7D,0xE69982:0x3B7E,0xE6ACA1:0x3C21,0xE6BB8B:0x3C22,0xE6B2BB:0x3C23,
0xE788BE:0x3C24,0xE792BD:0x3C25,0xE79794:0x3C26,0xE7A381:0x3C27,0xE7A4BA:0x3C28,
0xE8808C:0x3C29,0xE880B3:0x3C2A,0xE887AA:0x3C2B,0xE89294:0x3C2C,0xE8BE9E:0x3C2D,
0xE6B190:0x3C2E,0xE9B9BF:0x3C2F,0xE5BC8F:0x3C30,0xE8AD98:0x3C31,0xE9B4AB:0x3C32,
0xE7ABBA:0x3C33,0xE8BBB8:0x3C34,0xE5AE8D:0x3C35,0xE99BAB:0x3C36,0xE4B883:0x3C37,
0xE58FB1:0x3C38,0xE59FB7:0x3C39,0xE5A4B1:0x3C3A,0xE5AB89:0x3C3B,0xE5AEA4:0x3C3C,
0xE68289:0x3C3D,0xE6B9BF:0x3C3E,0xE6BC86:0x3C3F,0xE796BE:0x3C40,0xE8B3AA:0x3C41,
0xE5AE9F:0x3C42,0xE89480:0x3C43,0xE7AFA0:0x3C44,0xE581B2:0x3C45,0xE69FB4:0x3C46,
0xE88A9D:0x3C47,0xE5B1A1:0x3C48,0xE8958A:0x3C49,0xE7B89E:0x3C4A,0xE8888E:0x3C4B,
0xE58699:0x3C4C,0xE5B084:0x3C4D,0xE68DA8:0x3C4E,0xE8B5A6:0x3C4F,0xE6969C:0x3C50,
0xE785AE:0x3C51,0xE7A4BE:0x3C52,0xE7B497:0x3C53,0xE88085:0x3C54,0xE8AC9D:0x3C55,
0xE8BB8A:0x3C56,0xE981AE:0x3C57,0xE89B87:0x3C58,0xE982AA:0x3C59,0xE5809F:0x3C5A,
0xE58BBA:0x3C5B,0xE5B0BA:0x3C5C,0xE69D93:0x3C5D,0xE781BC:0x3C5E,0xE788B5:0x3C5F,
0xE9858C:0x3C60,0xE98788:0x3C61,0xE98CAB:0x3C62,0xE88BA5:0x3C63,0xE5AF82:0x3C64,
0xE5BCB1:0x3C65,0xE683B9:0x3C66,0xE4B8BB:0x3C67,0xE58F96:0x3C68,0xE5AE88:0x3C69,
0xE6898B:0x3C6A,0xE69CB1:0x3C6B,0xE6AE8A:0x3C6C,0xE78BA9:0x3C6D,0xE78FA0:0x3C6E,
0xE7A8AE:0x3C6F,0xE885AB:0x3C70,0xE8B6A3:0x3C71,0xE98592:0x3C72,0xE9A696:0x3C73,
0xE58492:0x3C74,0xE58F97:0x3C75,0xE591AA:0x3C76,0xE5AFBF:0x3C77,0xE68E88:0x3C78,
0xE6A8B9:0x3C79,0xE7B6AC:0x3C7A,0xE99C80:0x3C7B,0xE59B9A:0x3C7C,0xE58F8E:0x3C7D,
0xE591A8:0x3C7E,0xE5AE97:0x3D21,0xE5B0B1:0x3D22,0xE5B79E:0x3D23,0xE4BFAE:0x3D24,
0xE68481:0x3D25,0xE68BBE:0x3D26,0xE6B4B2:0x3D27,0xE7A780:0x3D28,0xE7A78B:0x3D29,
0xE7B582:0x3D2A,0xE7B98D:0x3D2B,0xE7BF92:0x3D2C,0xE887AD:0x3D2D,0xE8889F:0x3D2E,
0xE89290:0x3D2F,0xE8A186:0x3D30,0xE8A5B2:0x3D31,0xE8AE90:0x3D32,0xE8B9B4:0x3D33,
0xE8BCAF:0x3D34,0xE980B1:0x3D35,0xE9858B:0x3D36,0xE985AC:0x3D37,0xE99B86:0x3D38,
0xE9869C:0x3D39,0xE4BB80:0x3D3A,0xE4BD8F:0x3D3B,0xE58585:0x3D3C,0xE58D81:0x3D3D,
0xE5BE93:0x3D3E,0xE6888E:0x3D3F,0xE69F94:0x3D40,0xE6B181:0x3D41,0xE6B88B:0x3D42,
0xE78DA3:0x3D43,0xE7B8A6:0x3D44,0xE9878D:0x3D45,0xE98A83:0x3D46,0xE58F94:0x3D47,
0xE5A499:0x3D48,0xE5AEBF:0x3D49,0xE6B791:0x3D4A,0xE7A59D:0x3D4B,0xE7B8AE:0x3D4C,
0xE7B29B:0x3D4D,0xE5A1BE:0x3D4E,0xE7869F:0x3D4F,0xE587BA:0x3D50,0xE8A193:0x3D51,
0xE8BFB0:0x3D52,0xE4BF8A:0x3D53,0xE5B3BB:0x3D54,0xE698A5:0x3D55,0xE79EAC:0x3D56,
0xE7ABA3:0x3D57,0xE8889C:0x3D58,0xE9A7BF:0x3D59,0xE58786:0x3D5A,0xE5BEAA:0x3D5B,
0xE697AC:0x3D5C,0xE6A5AF:0x3D5D,0xE6AE89:0x3D5E,0xE6B7B3:0x3D5F,0xE6BA96:0x3D60,
0xE6BDA4:0x3D61,0xE79BBE:0x3D62,0xE7B494:0x3D63,0xE5B7A1:0x3D64,0xE981B5:0x3D65,
0xE98687:0x3D66,0xE9A086:0x3D67,0xE587A6:0x3D68,0xE5889D:0x3D69,0xE68980:0x3D6A,
0xE69A91:0x3D6B,0xE69B99:0x3D6C,0xE6B89A:0x3D6D,0xE5BAB6:0x3D6E,0xE7B792:0x3D6F,
0xE7BDB2:0x3D70,0xE69BB8:0x3D71,0xE896AF:0x3D72,0xE897B7:0x3D73,0xE8ABB8:0x3D74,
0xE58AA9:0x3D75,0xE58F99:0x3D76,0xE5A5B3:0x3D77,0xE5BA8F:0x3D78,0xE5BE90:0x3D79,
0xE68195:0x3D7A,0xE98BA4:0x3D7B,0xE999A4:0x3D7C,0xE582B7:0x3D7D,0xE5849F:0x3D7E,
0xE58B9D:0x3E21,0xE58CA0:0x3E22,0xE58D87:0x3E23,0xE58FAC:0x3E24,0xE593A8:0x3E25,
0xE59586:0x3E26,0xE594B1:0x3E27,0xE59897:0x3E28,0xE5A5A8:0x3E29,0xE5A6BE:0x3E2A,
0xE5A8BC:0x3E2B,0xE5AEB5:0x3E2C,0xE5B086:0x3E2D,0xE5B08F:0x3E2E,0xE5B091:0x3E2F,
0xE5B09A:0x3E30,0xE5BA84:0x3E31,0xE5BA8A:0x3E32,0xE5BBA0:0x3E33,0xE5BDB0:0x3E34,
0xE689BF:0x3E35,0xE68A84:0x3E36,0xE68B9B:0x3E37,0xE68E8C:0x3E38,0xE68DB7:0x3E39,
0xE69887:0x3E3A,0xE6988C:0x3E3B,0xE698AD:0x3E3C,0xE699B6:0x3E3D,0xE69DBE:0x3E3E,
0xE6A2A2:0x3E3F,0xE6A89F:0x3E40,0xE6A8B5:0x3E41,0xE6B2BC:0x3E42,0xE6B688:0x3E43,
0xE6B889:0x3E44,0xE6B998:0x3E45,0xE784BC:0x3E46,0xE784A6:0x3E47,0xE785A7:0x3E48,
0xE79787:0x3E49,0xE79C81:0x3E4A,0xE7A19D:0x3E4B,0xE7A481:0x3E4C,0xE7A5A5:0x3E4D,
0xE7A7B0:0x3E4E,0xE7ABA0:0x3E4F,0xE7AC91:0x3E50,0xE7B2A7:0x3E51,0xE7B4B9:0x3E52,
0xE88296:0x3E53,0xE88F96:0x3E54,0xE8928B:0x3E55,0xE89589:0x3E56,0xE8A19D:0x3E57,
0xE8A3B3:0x3E58,0xE8A89F:0x3E59,0xE8A8BC:0x3E5A,0xE8A994:0x3E5B,0xE8A9B3:0x3E5C,
0xE8B1A1:0x3E5D,0xE8B39E:0x3E5E,0xE986A4:0x3E5F,0xE989A6:0x3E60,0xE98DBE:0x3E61,
0xE99098:0x3E62,0xE99A9C:0x3E63,0xE99E98:0x3E64,0xE4B88A:0x3E65,0xE4B888:0x3E66,
0xE4B89E:0x3E67,0xE4B997:0x3E68,0xE58697:0x3E69,0xE589B0:0x3E6A,0xE59F8E:0x3E6B,
0xE5A0B4:0x3E6C,0xE5A38C:0x3E6D,0xE5ACA2:0x3E6E,0xE5B8B8:0x3E6F,0xE68385:0x3E70,
0xE693BE:0x3E71,0xE69DA1:0x3E72,0xE69D96:0x3E73,0xE6B584:0x3E74,0xE78AB6:0x3E75,
0xE795B3:0x3E76,0xE7A9A3:0x3E77,0xE892B8:0x3E78,0xE8ADB2:0x3E79,0xE986B8:0x3E7A,
0xE98CA0:0x3E7B,0xE598B1:0x3E7C,0xE59FB4:0x3E7D,0xE9A3BE:0x3E7E,0xE68BAD:0x3F21,
0xE6A48D:0x3F22,0xE6AE96:0x3F23,0xE787AD:0x3F24,0xE7B994:0x3F25,0xE881B7:0x3F26,
0xE889B2:0x3F27,0xE8A7A6:0x3F28,0xE9A39F:0x3F29,0xE89D95:0x3F2A,0xE8BEB1:0x3F2B,
0xE5B0BB:0x3F2C,0xE4BCB8:0x3F2D,0xE4BFA1:0x3F2E,0xE4BEB5:0x3F2F,0xE59487:0x3F30,
0xE5A8A0:0x3F31,0xE5AF9D:0x3F32,0xE5AFA9:0x3F33,0xE5BF83:0x3F34,0xE6858E:0x3F35,
0xE68CAF:0x3F36,0xE696B0:0x3F37,0xE6998B:0x3F38,0xE6A3AE:0x3F39,0xE6A69B:0x3F3A,
0xE6B5B8:0x3F3B,0xE6B7B1:0x3F3C,0xE794B3:0x3F3D,0xE796B9:0x3F3E,0xE79C9F:0x3F3F,
0xE7A59E:0x3F40,0xE7A7A6:0x3F41,0xE7B4B3:0x3F42,0xE887A3:0x3F43,0xE88AAF:0x3F44,
0xE896AA:0x3F45,0xE8A6AA:0x3F46,0xE8A8BA:0x3F47,0xE8BAAB:0x3F48,0xE8BE9B:0x3F49,
0xE980B2:0x3F4A,0xE9879D:0x3F4B,0xE99C87:0x3F4C,0xE4BABA:0x3F4D,0xE4BB81:0x3F4E,
0xE58883:0x3F4F,0xE5A1B5:0x3F50,0xE5A3AC:0x3F51,0xE5B08B:0x3F52,0xE7949A:0x3F53,
0xE5B0BD:0x3F54,0xE8858E:0x3F55,0xE8A88A:0x3F56,0xE8BF85:0x3F57,0xE999A3:0x3F58,
0xE99DAD:0x3F59,0xE7ACA5:0x3F5A,0xE8AB8F:0x3F5B,0xE9A088:0x3F5C,0xE985A2:0x3F5D,
0xE59BB3:0x3F5E,0xE58EA8:0x3F5F,0xE98097:0x3F60,0xE590B9:0x3F61,0xE59E82:0x3F62,
0xE5B8A5:0x3F63,0xE68EA8:0x3F64,0xE6B0B4:0x3F65,0xE7828A:0x3F66,0xE79DA1:0x3F67,
0xE7B28B:0x3F68,0xE7BFA0:0x3F69,0xE8A1B0:0x3F6A,0xE98182:0x3F6B,0xE98594:0x3F6C,
0xE98C90:0x3F6D,0xE98C98:0x3F6E,0xE99A8F:0x3F6F,0xE7919E:0x3F70,0xE9AB84:0x3F71,
0xE5B487:0x3F72,0xE5B5A9:0x3F73,0xE695B0:0x3F74,0xE69EA2:0x3F75,0xE8B6A8:0x3F76,
0xE99B9B:0x3F77,0xE68DAE:0x3F78,0xE69D89:0x3F79,0xE6A499:0x3F7A,0xE88F85:0x3F7B,
0xE9A097:0x3F7C,0xE99B80:0x3F7D,0xE8A3BE:0x3F7E,0xE6BE84:0x4021,0xE691BA:0x4022,
0xE5AFB8:0x4023,0xE4B896:0x4024,0xE780AC:0x4025,0xE7959D:0x4026,0xE698AF:0x4027,
0xE58784:0x4028,0xE588B6:0x4029,0xE58BA2:0x402A,0xE5A793:0x402B,0xE5BE81:0x402C,
0xE680A7:0x402D,0xE68890:0x402E,0xE694BF:0x402F,0xE695B4:0x4030,0xE6989F:0x4031,
0xE699B4:0x4032,0xE6A3B2:0x4033,0xE6A096:0x4034,0xE6ADA3:0x4035,0xE6B885:0x4036,
0xE789B2:0x4037,0xE7949F:0x4038,0xE79B9B:0x4039,0xE7B2BE:0x403A,0xE88196:0x403B,
0xE5A3B0:0x403C,0xE8A3BD:0x403D,0xE8A5BF:0x403E,0xE8AAA0:0x403F,0xE8AA93:0x4040,
0xE8AB8B:0x4041,0xE9809D:0x4042,0xE98692:0x4043,0xE99D92:0x4044,0xE99D99:0x4045,
0xE69689:0x4046,0xE7A88E:0x4047,0xE88486:0x4048,0xE99ABB:0x4049,0xE5B8AD:0x404A,
0xE6839C:0x404B,0xE6889A:0x404C,0xE696A5:0x404D,0xE69894:0x404E,0xE69E90:0x404F,
0xE79FB3:0x4050,0xE7A98D:0x4051,0xE7B18D:0x4052,0xE7B8BE:0x4053,0xE8848A:0x4054,
0xE8B2AC:0x4055,0xE8B5A4:0x4056,0xE8B7A1:0x4057,0xE8B99F:0x4058,0xE7A2A9:0x4059,
0xE58887:0x405A,0xE68B99:0x405B,0xE68EA5:0x405C,0xE69182:0x405D,0xE68A98:0x405E,
0xE8A8AD:0x405F,0xE7AA83:0x4060,0xE7AF80:0x4061,0xE8AAAC:0x4062,0xE99BAA:0x4063,
0xE7B5B6:0x4064,0xE8888C:0x4065,0xE89D89:0x4066,0xE4BB99:0x4067,0xE58588:0x4068,
0xE58D83:0x4069,0xE58DA0:0x406A,0xE5AEA3:0x406B,0xE5B082:0x406C,0xE5B096:0x406D,
0xE5B79D:0x406E,0xE688A6:0x406F,0xE68987:0x4070,0xE692B0:0x4071,0xE6A093:0x4072,
0xE6A0B4:0x4073,0xE6B389:0x4074,0xE6B585:0x4075,0xE6B497:0x4076,0xE69F93:0x4077,
0xE6BD9C:0x4078,0xE7858E:0x4079,0xE785BD:0x407A,0xE6978B:0x407B,0xE7A9BF:0x407C,
0xE7AEAD:0x407D,0xE7B79A:0x407E,0xE7B98A:0x4121,0xE7BEA8:0x4122,0xE885BA:0x4123,
0xE8889B:0x4124,0xE888B9:0x4125,0xE896A6:0x4126,0xE8A9AE:0x4127,0xE8B38E:0x4128,
0xE8B7B5:0x4129,0xE981B8:0x412A,0xE981B7:0x412B,0xE98AAD:0x412C,0xE98A91:0x412D,
0xE99683:0x412E,0xE9AEAE:0x412F,0xE5898D:0x4130,0xE59684:0x4131,0xE6BCB8:0x4132,
0xE784B6:0x4133,0xE585A8:0x4134,0xE7A685:0x4135,0xE7B995:0x4136,0xE886B3:0x4137,
0xE7B38E:0x4138,0xE5998C:0x4139,0xE5A191:0x413A,0xE5B2A8:0x413B,0xE68EAA:0x413C,
0xE69BBE:0x413D,0xE69BBD:0x413E,0xE6A59A:0x413F,0xE78B99:0x4140,0xE7968F:0x4141,
0xE7968E:0x4142,0xE7A48E:0x4143,0xE7A596:0x4144,0xE7A79F:0x4145,0xE7B297:0x4146,
0xE7B4A0:0x4147,0xE7B584:0x4148,0xE89887:0x4149,0xE8A8B4:0x414A,0xE998BB:0x414B,
0xE981A1:0x414C,0xE9BCA0:0x414D,0xE583A7:0x414E,0xE589B5:0x414F,0xE58F8C:0x4150,
0xE58FA2:0x4151,0xE58089:0x4152,0xE596AA:0x4153,0xE5A3AE:0x4154,0xE5A58F:0x4155,
0xE788BD:0x4156,0xE5AE8B:0x4157,0xE5B1A4:0x4158,0xE58C9D:0x4159,0xE683A3:0x415A,
0xE683B3:0x415B,0xE68D9C:0x415C,0xE68E83:0x415D,0xE68CBF:0x415E,0xE68EBB:0x415F,
0xE6938D:0x4160,0xE697A9:0x4161,0xE69BB9:0x4162,0xE5B7A3:0x4163,0xE6A78D:0x4164,
0xE6A7BD:0x4165,0xE6BC95:0x4166,0xE787A5:0x4167,0xE4BA89:0x4168,0xE797A9:0x4169,
0xE79BB8:0x416A,0xE7AA93:0x416B,0xE7B39F:0x416C,0xE7B78F:0x416D,0xE7B69C:0x416E,
0xE881A1:0x416F,0xE88D89:0x4170,0xE88D98:0x4171,0xE891AC:0x4172,0xE892BC:0x4173,
0xE897BB:0x4174,0xE8A385:0x4175,0xE8B5B0:0x4176,0xE98081:0x4177,0xE981AD:0x4178,
0xE98E97:0x4179,0xE99C9C:0x417A,0xE9A892:0x417B,0xE5838F:0x417C,0xE5A297:0x417D,
0xE6868E:0x417E,0xE88793:0x4221,0xE894B5:0x4222,0xE8B488:0x4223,0xE980A0:0x4224,
0xE4BF83:0x4225,0xE581B4:0x4226,0xE58987:0x4227,0xE58DB3:0x4228,0xE681AF:0x4229,
0xE68D89:0x422A,0xE69D9F:0x422B,0xE6B8AC:0x422C,0xE8B6B3:0x422D,0xE9809F:0x422E,
0xE4BF97:0x422F,0xE5B19E:0x4230,0xE8B38A:0x4231,0xE6978F:0x4232,0xE7B69A:0x4233,
0xE58D92:0x4234,0xE8A296:0x4235,0xE585B6:0x4236,0xE68F83:0x4237,0xE5AD98:0x4238,
0xE5ADAB:0x4239,0xE5B08A:0x423A,0xE6908D:0x423B,0xE69D91:0x423C,0xE9819C:0x423D,
0xE4BB96:0x423E,0xE5A49A:0x423F,0xE5A4AA:0x4240,0xE6B1B0:0x4241,0xE8A991:0x4242,
0xE594BE:0x4243,0xE5A095:0x4244,0xE5A6A5:0x4245,0xE683B0:0x4246,0xE68993:0x4247,
0xE69F81:0x4248,0xE888B5:0x4249,0xE6A595:0x424A,0xE99980:0x424B,0xE9A784:0x424C,
0xE9A8A8:0x424D,0xE4BD93:0x424E,0xE5A086:0x424F,0xE5AFBE:0x4250,0xE88090:0x4251,
0xE5B2B1:0x4252,0xE5B8AF:0x4253,0xE5BE85:0x4254,0xE680A0:0x4255,0xE6858B:0x4256,
0xE688B4:0x4257,0xE69BBF:0x4258,0xE6B3B0:0x4259,0xE6BB9E:0x425A,0xE8838E:0x425B,
0xE885BF:0x425C,0xE88B94:0x425D,0xE8A28B:0x425E,0xE8B2B8:0x425F,0xE98080:0x4260,
0xE980AE:0x4261,0xE99A8A:0x4262,0xE9BB9B:0x4263,0xE9AF9B:0x4264,0xE4BBA3:0x4265,
0xE58FB0:0x4266,0xE5A4A7:0x4267,0xE7ACAC:0x4268,0xE9868D:0x4269,0xE9A18C:0x426A,
0xE9B7B9:0x426B,0xE6BB9D:0x426C,0xE780A7:0x426D,0xE58D93:0x426E,0xE59584:0x426F,
0xE5AE85:0x4270,0xE68998:0x4271,0xE68A9E:0x4272,0xE68B93:0x4273,0xE6B2A2:0x4274,
0xE6BFAF:0x4275,0xE790A2:0x4276,0xE8A897:0x4277,0xE990B8:0x4278,0xE6BF81:0x4279,
0xE8ABBE:0x427A,0xE88CB8:0x427B,0xE587A7:0x427C,0xE89BB8:0x427D,0xE58FAA:0x427E,
0xE58FA9:0x4321,0xE4BD86:0x4322,0xE98194:0x4323,0xE8BEB0:0x4324,0xE5A5AA:0x4325,
0xE884B1:0x4326,0xE5B7BD:0x4327,0xE7ABAA:0x4328,0xE8BEBF:0x4329,0xE6A39A:0x432A,
0xE8B0B7:0x432B,0xE78BB8:0x432C,0xE9B188:0x432D,0xE6A8BD:0x432E,0xE8AAB0:0x432F,
0xE4B8B9:0x4330,0xE58D98:0x4331,0xE59886:0x4332,0xE59DA6:0x4333,0xE68B85:0x4334,
0xE68EA2:0x4335,0xE697A6:0x4336,0xE6AD8E:0x4337,0xE6B7A1:0x4338,0xE6B99B:0x4339,
0xE782AD:0x433A,0xE79FAD:0x433B,0xE7ABAF:0x433C,0xE7AEAA:0x433D,0xE7B6BB:0x433E,
0xE880BD:0x433F,0xE88386:0x4340,0xE89B8B:0x4341,0xE8AA95:0x4342,0xE98D9B:0x4343,
0xE59BA3:0x4344,0xE5A387:0x4345,0xE5BCBE:0x4346,0xE696AD:0x4347,0xE69A96:0x4348,
0xE6AA80:0x4349,0xE6AEB5:0x434A,0xE794B7:0x434B,0xE8AB87:0x434C,0xE580A4:0x434D,
0xE79FA5:0x434E,0xE59CB0:0x434F,0xE5BC9B:0x4350,0xE681A5:0x4351,0xE699BA:0x4352,
0xE6B1A0:0x4353,0xE797B4:0x4354,0xE7A89A:0x4355,0xE7BDAE:0x4356,0xE887B4:0x4357,
0xE89C98:0x4358,0xE98185:0x4359,0xE9A6B3:0x435A,0xE7AF89:0x435B,0xE7959C:0x435C,
0xE7ABB9:0x435D,0xE7AD91:0x435E,0xE89384:0x435F,0xE98090:0x4360,0xE7A7A9:0x4361,
0xE7AA92:0x4362,0xE88CB6:0x4363,0xE5ABA1:0x4364,0xE79D80:0x4365,0xE4B8AD:0x4366,
0xE4BBB2:0x4367,0xE5AE99:0x4368,0xE5BFA0:0x4369,0xE68ABD:0x436A,0xE698BC:0x436B,
0xE69FB1:0x436C,0xE6B3A8:0x436D,0xE899AB:0x436E,0xE8A1B7:0x436F,0xE8A8BB:0x4370,
0xE9858E:0x4371,0xE98BB3:0x4372,0xE9A790:0x4373,0xE6A897:0x4374,0xE780A6:0x4375,
0xE78CAA:0x4376,0xE88BA7:0x4377,0xE89197:0x4378,0xE8B2AF:0x4379,0xE4B881:0x437A,
0xE58586:0x437B,0xE5878B:0x437C,0xE5968B:0x437D,0xE5AFB5:0x437E,0xE5B896:0x4421,
0xE5B8B3:0x4422,0xE5BA81:0x4423,0xE5BC94:0x4424,0xE5BCB5:0x4425,0xE5BDAB:0x4426,
0xE5BEB4:0x4427,0xE687B2:0x4428,0xE68C91:0x4429,0xE69AA2:0x442A,0xE69C9D:0x442B,
0xE6BDAE:0x442C,0xE78992:0x442D,0xE794BA:0x442E,0xE79CBA:0x442F,0xE881B4:0x4430,
0xE884B9:0x4431,0xE885B8:0x4432,0xE89DB6:0x4433,0xE8AABF:0x4434,0xE8AB9C:0x4435,
0xE8B685:0x4436,0xE8B7B3:0x4437,0xE98A9A:0x4438,0xE995B7:0x4439,0xE9A082:0x443A,
0xE9B3A5:0x443B,0xE58B85:0x443C,0xE68D97:0x443D,0xE79BB4:0x443E,0xE69C95:0x443F,
0xE6B288:0x4440,0xE78F8D:0x4441,0xE8B383:0x4442,0xE98EAE:0x4443,0xE999B3:0x4444,
0xE6B4A5:0x4445,0xE5A29C:0x4446,0xE6A48E:0x4447,0xE6A78C:0x4448,0xE8BFBD:0x4449,
0xE98E9A:0x444A,0xE7979B:0x444B,0xE9809A:0x444C,0xE5A19A:0x444D,0xE6A082:0x444E,
0xE68EB4:0x444F,0xE6A7BB:0x4450,0xE4BD83:0x4451,0xE6BCAC:0x4452,0xE69F98:0x4453,
0xE8BEBB:0x4454,0xE894A6:0x4455,0xE7B6B4:0x4456,0xE98D94:0x4457,0xE6A4BF:0x4458,
0xE6BDB0:0x4459,0xE59DAA:0x445A,0xE5A3B7:0x445B,0xE5ACAC:0x445C,0xE7B4AC:0x445D,
0xE788AA:0x445E,0xE5908A:0x445F,0xE987A3:0x4460,0xE9B6B4:0x4461,0xE4BAAD:0x4462,
0xE4BD8E:0x4463,0xE5819C:0x4464,0xE581B5:0x4465,0xE58983:0x4466,0xE8B29E:0x4467,
0xE59188:0x4468,0xE5A0A4:0x4469,0xE5AE9A:0x446A,0xE5B89D:0x446B,0xE5BA95:0x446C,
0xE5BAAD:0x446D,0xE5BBB7:0x446E,0xE5BC9F:0x446F,0xE6828C:0x4470,0xE68AB5:0x4471,
0xE68CBA:0x4472,0xE68F90:0x4473,0xE6A2AF:0x4474,0xE6B180:0x4475,0xE7A287:0x4476,
0xE7A68E:0x4477,0xE7A88B:0x4478,0xE7B7A0:0x4479,0xE88987:0x447A,0xE8A882:0x447B,
0xE8ABA6:0x447C,0xE8B984:0x447D,0xE98093:0x447E,0xE982B8:0x4521,0xE984AD:0x4522,
0xE98798:0x4523,0xE9BC8E:0x4524,0xE6B3A5:0x4525,0xE69198:0x4526,0xE693A2:0x4527,
0xE695B5:0x4528,0xE6BBB4:0x4529,0xE79A84:0x452A,0xE7AC9B:0x452B,0xE981A9:0x452C,
0xE98F91:0x452D,0xE6BABA:0x452E,0xE593B2:0x452F,0xE5BEB9:0x4530,0xE692A4:0x4531,
0xE8BD8D:0x4532,0xE8BFAD:0x4533,0xE98984:0x4534,0xE585B8:0x4535,0xE5A1AB:0x4536,
0xE5A4A9:0x4537,0xE5B195:0x4538,0xE5BA97:0x4539,0xE6B7BB:0x453A,0xE7BA8F:0x453B,
0xE7949C:0x453C,0xE8B2BC:0x453D,0xE8BBA2:0x453E,0xE9A19B:0x453F,0xE782B9:0x4540,
0xE4BC9D:0x4541,0xE6AEBF:0x4542,0xE6BEB1:0x4543,0xE794B0:0x4544,0xE99BBB:0x4545,
0xE5858E:0x4546,0xE59090:0x4547,0xE5A0B5:0x4548,0xE5A197:0x4549,0xE5A6AC:0x454A,
0xE5B1A0:0x454B,0xE5BE92:0x454C,0xE69697:0x454D,0xE69D9C:0x454E,0xE6B8A1:0x454F,
0xE799BB:0x4550,0xE88F9F:0x4551,0xE8B3AD:0x4552,0xE98094:0x4553,0xE983BD:0x4554,
0xE98D8D:0x4555,0xE7A0A5:0x4556,0xE7A0BA:0x4557,0xE58AAA:0x4558,0xE5BAA6:0x4559,
0xE59C9F:0x455A,0xE5A5B4:0x455B,0xE68092:0x455C,0xE58092:0x455D,0xE5859A:0x455E,
0xE586AC:0x455F,0xE5878D:0x4560,0xE58880:0x4561,0xE59490:0x4562,0xE5A194:0x4563,
0xE5A198:0x4564,0xE5A597:0x4565,0xE5AE95:0x4566,0xE5B3B6:0x4567,0xE5B68B:0x4568,
0xE682BC:0x4569,0xE68A95:0x456A,0xE690AD:0x456B,0xE69DB1:0x456C,0xE6A183:0x456D,
0xE6A2BC:0x456E,0xE6A39F:0x456F,0xE79B97:0x4570,0xE6B798:0x4571,0xE6B9AF:0x4572,
0xE6B69B:0x4573,0xE781AF:0x4574,0xE78788:0x4575,0xE5BD93:0x4576,0xE79798:0x4577,
0xE7A5B7:0x4578,0xE7AD89:0x4579,0xE7AD94:0x457A,0xE7AD92:0x457B,0xE7B396:0x457C,
0xE7B5B1:0x457D,0xE588B0:0x457E,0xE891A3:0x4621,0xE895A9:0x4622,0xE897A4:0x4623,
0xE8A88E:0x4624,0xE8AC84:0x4625,0xE8B186:0x4626,0xE8B88F:0x4627,0xE98083:0x4628,
0xE9808F:0x4629,0xE99099:0x462A,0xE999B6:0x462B,0xE9A0AD:0x462C,0xE9A8B0:0x462D,
0xE99798:0x462E,0xE5838D:0x462F,0xE58B95:0x4630,0xE5908C:0x4631,0xE5A082:0x4632,
0xE5B08E:0x4633,0xE686A7:0x4634,0xE6929E:0x4635,0xE6B49E:0x4636,0xE79EB3:0x4637,
0xE7ABA5:0x4638,0xE883B4:0x4639,0xE89084:0x463A,0xE98193:0x463B,0xE98A85:0x463C,
0xE5B3A0:0x463D,0xE9B487:0x463E,0xE58CBF:0x463F,0xE5BE97:0x4640,0xE5BEB3:0x4641,
0xE6B69C:0x4642,0xE789B9:0x4643,0xE79DA3:0x4644,0xE7A6BF:0x4645,0xE7AFA4:0x4646,
0xE6AF92:0x4647,0xE78BAC:0x4648,0xE8AAAD:0x4649,0xE6A083:0x464A,0xE6A9A1:0x464B,
0xE587B8:0x464C,0xE7AA81:0x464D,0xE6A4B4:0x464E,0xE5B18A:0x464F,0xE9B3B6:0x4650,
0xE88BAB:0x4651,0xE5AF85:0x4652,0xE98589:0x4653,0xE7809E:0x4654,0xE599B8:0x4655,
0xE5B1AF:0x4656,0xE68387:0x4657,0xE695A6:0x4658,0xE6B28C:0x4659,0xE8B19A:0x465A,
0xE98181:0x465B,0xE9A093:0x465C,0xE59191:0x465D,0xE69B87:0x465E,0xE9888D:0x465F,
0xE5A588:0x4660,0xE982A3:0x4661,0xE58685:0x4662,0xE4B98D:0x4663,0xE587AA:0x4664,
0xE89699:0x4665,0xE8AC8E:0x4666,0xE78198:0x4667,0xE68DBA:0x4668,0xE98D8B:0x4669,
0xE6A5A2:0x466A,0xE9A6B4:0x466B,0xE7B884:0x466C,0xE795B7:0x466D,0xE58D97:0x466E,
0xE6A5A0:0x466F,0xE8BB9F:0x4670,0xE99BA3:0x4671,0xE6B19D:0x4672,0xE4BA8C:0x4673,
0xE5B0BC:0x4674,0xE5BC90:0x4675,0xE8BFA9:0x4676,0xE58C82:0x4677,0xE8B391:0x4678,
0xE88289:0x4679,0xE899B9:0x467A,0xE5BBBF:0x467B,0xE697A5:0x467C,0xE4B9B3:0x467D,
0xE585A5:0x467E,0xE5A682:0x4721,0xE5B0BF:0x4722,0xE99FAE:0x4723,0xE4BBBB:0x4724,
0xE5A68A:0x4725,0xE5BF8D:0x4726,0xE8AA8D:0x4727,0xE6BFA1:0x4728,0xE7A6B0:0x4729,
0xE7A5A2:0x472A,0xE5AFA7:0x472B,0xE891B1:0x472C,0xE78CAB:0x472D,0xE786B1:0x472E,
0xE5B9B4:0x472F,0xE5BFB5:0x4730,0xE68DBB:0x4731,0xE6929A:0x4732,0xE78783:0x4733,
0xE7B298:0x4734,0xE4B983:0x4735,0xE5BBBC:0x4736,0xE4B98B:0x4737,0xE59F9C:0x4738,
0xE59AA2:0x4739,0xE682A9:0x473A,0xE6BF83:0x473B,0xE7B48D:0x473C,0xE883BD:0x473D,
0xE884B3:0x473E,0xE886BF:0x473F,0xE8BEB2:0x4740,0xE8A697:0x4741,0xE89AA4:0x4742,
0xE5B7B4:0x4743,0xE68A8A:0x4744,0xE692AD:0x4745,0xE8A687:0x4746,0xE69DB7:0x4747,
0xE6B3A2:0x4748,0xE6B4BE:0x4749,0xE790B6:0x474A,0xE7A0B4:0x474B,0xE5A986:0x474C,
0xE7BDB5:0x474D,0xE88AAD:0x474E,0xE9A6AC:0x474F,0xE4BFB3:0x4750,0xE5BB83:0x4751,
0xE68B9D:0x4752,0xE68E92:0x4753,0xE69597:0x4754,0xE69DAF:0x4755,0xE79B83:0x4756,
0xE7898C:0x4757,0xE8838C:0x4758,0xE882BA:0x4759,0xE8BCA9:0x475A,0xE9858D:0x475B,
0xE5808D:0x475C,0xE59FB9:0x475D,0xE5AA92:0x475E,0xE6A285:0x475F,0xE6A5B3:0x4760,
0xE785A4:0x4761,0xE78BBD:0x4762,0xE8B2B7:0x4763,0xE5A3B2:0x4764,0xE8B3A0:0x4765,
0xE999AA:0x4766,0xE98099:0x4767,0xE89DBF:0x4768,0xE7A7A4:0x4769,0xE79FA7:0x476A,
0xE890A9:0x476B,0xE4BCAF:0x476C,0xE589A5:0x476D,0xE58D9A:0x476E,0xE68B8D:0x476F,
0xE69F8F:0x4770,0xE6B38A:0x4771,0xE799BD:0x4772,0xE7AE94:0x4773,0xE7B295:0x4774,
0xE888B6:0x4775,0xE89684:0x4776,0xE8BFAB:0x4777,0xE69B9D:0x4778,0xE6BCA0:0x4779,
0xE78886:0x477A,0xE7B89B:0x477B,0xE88EAB:0x477C,0xE9A781:0x477D,0xE9BAA6:0x477E,
0xE587BD:0x4821,0xE7AEB1:0x4822,0xE7A1B2:0x4823,0xE7AEB8:0x4824,0xE88287:0x4825,
0xE7AD88:0x4826,0xE6ABA8:0x4827,0xE5B9A1:0x4828,0xE8828C:0x4829,0xE79591:0x482A,
0xE795A0:0x482B,0xE585AB:0x482C,0xE989A2:0x482D,0xE6BA8C:0x482E,0xE799BA:0x482F,
0xE98697:0x4830,0xE9ABAA:0x4831,0xE4BC90:0x4832,0xE7BDB0:0x4833,0xE68A9C:0x4834,
0xE7AD8F:0x4835,0xE996A5:0x4836,0xE9B3A9:0x4837,0xE599BA:0x4838,0xE5A199:0x4839,
0xE89BA4:0x483A,0xE99ABC:0x483B,0xE4BCB4:0x483C,0xE588A4:0x483D,0xE58D8A:0x483E,
0xE58F8D:0x483F,0xE58F9B:0x4840,0xE5B886:0x4841,0xE690AC:0x4842,0xE69691:0x4843,
0xE69DBF:0x4844,0xE6B0BE:0x4845,0xE6B18E:0x4846,0xE78988:0x4847,0xE78AAF:0x4848,
0xE78FAD:0x4849,0xE79594:0x484A,0xE7B981:0x484B,0xE888AC:0x484C,0xE897A9:0x484D,
0xE8B2A9:0x484E,0xE7AF84:0x484F,0xE98786:0x4850,0xE785A9:0x4851,0xE9A092:0x4852,
0xE9A3AF:0x4853,0xE68CBD:0x4854,0xE699A9:0x4855,0xE795AA:0x4856,0xE79BA4:0x4857,
0xE7A390:0x4858,0xE89583:0x4859,0xE89BAE:0x485A,0xE58CAA:0x485B,0xE58D91:0x485C,
0xE590A6:0x485D,0xE5A683:0x485E,0xE5BA87:0x485F,0xE5BDBC:0x4860,0xE682B2:0x4861,
0xE68989:0x4862,0xE689B9:0x4863,0xE68AAB:0x4864,0xE69690:0x4865,0xE6AF94:0x4866,
0xE6B38C:0x4867,0xE796B2:0x4868,0xE79AAE:0x4869,0xE7A291:0x486A,0xE7A798:0x486B,
0xE7B78B:0x486C,0xE7BDB7:0x486D,0xE882A5:0x486E,0xE8A2AB:0x486F,0xE8AAB9:0x4870,
0xE8B2BB:0x4871,0xE981BF:0x4872,0xE99D9E:0x4873,0xE9A39B:0x4874,0xE6A88B:0x4875,
0xE7B0B8:0x4876,0xE58299:0x4877,0xE5B0BE:0x4878,0xE5BEAE:0x4879,0xE69E87:0x487A,
0xE6AF98:0x487B,0xE790B5:0x487C,0xE79C89:0x487D,0xE7BE8E:0x487E,0xE9BCBB:0x4921,
0xE69F8A:0x4922,0xE7A897:0x4923,0xE58CB9:0x4924,0xE7968B:0x4925,0xE9ABAD:0x4926,
0xE5BDA6:0x4927,0xE8869D:0x4928,0xE88FB1:0x4929,0xE88298:0x492A,0xE5BCBC:0x492B,
0xE5BF85:0x492C,0xE795A2:0x492D,0xE7AD86:0x492E,0xE980BC:0x492F,0xE6A1A7:0x4930,
0xE5A7AB:0x4931,0xE5AA9B:0x4932,0xE7B490:0x4933,0xE799BE:0x4934,0xE8ACAC:0x4935,
0xE4BFB5:0x4936,0xE5BDAA:0x4937,0xE6A899:0x4938,0xE6B0B7:0x4939,0xE6BC82:0x493A,
0xE793A2:0x493B,0xE7A5A8:0x493C,0xE8A1A8:0x493D,0xE8A995:0x493E,0xE8B1B9:0x493F,
0xE5BB9F:0x4940,0xE68F8F:0x4941,0xE79785:0x4942,0xE7A792:0x4943,0xE88B97:0x4944,
0xE98CA8:0x4945,0xE98BB2:0x4946,0xE8929C:0x4947,0xE89BAD:0x4948,0xE9B0AD:0x4949,
0xE59381:0x494A,0xE5BDAC:0x494B,0xE6968C:0x494C,0xE6B59C:0x494D,0xE78095:0x494E,
0xE8B2A7:0x494F,0xE8B393:0x4950,0xE9A0BB:0x4951,0xE6958F:0x4952,0xE793B6:0x4953,
0xE4B88D:0x4954,0xE4BB98:0x4955,0xE59FA0:0x4956,0xE5A4AB:0x4957,0xE5A9A6:0x4958,
0xE5AF8C:0x4959,0xE586A8:0x495A,0xE5B883:0x495B,0xE5BA9C:0x495C,0xE68096:0x495D,
0xE689B6:0x495E,0xE695B7:0x495F,0xE696A7:0x4960,0xE699AE:0x4961,0xE6B5AE:0x4962,
0xE788B6:0x4963,0xE7ACA6:0x4964,0xE88590:0x4965,0xE8869A:0x4966,0xE88A99:0x4967,
0xE8AD9C:0x4968,0xE8B2A0:0x4969,0xE8B3A6:0x496A,0xE8B5B4:0x496B,0xE9989C:0x496C,
0xE99984:0x496D,0xE4BEAE:0x496E,0xE692AB:0x496F,0xE6ADA6:0x4970,0xE8889E:0x4971,
0xE891A1:0x4972,0xE895AA:0x4973,0xE983A8:0x4974,0xE5B081:0x4975,0xE6A593:0x4976,
0xE9A2A8:0x4977,0xE891BA:0x4978,0xE89597:0x4979,0xE4BC8F:0x497A,0xE589AF:0x497B,
0xE5BEA9:0x497C,0xE5B985:0x497D,0xE69C8D:0x497E,0xE7A68F:0x4A21,0xE885B9:0x4A22,
0xE8A487:0x4A23,0xE8A686:0x4A24,0xE6B7B5:0x4A25,0xE5BC97:0x4A26,0xE68995:0x4A27,
0xE6B2B8:0x4A28,0xE4BB8F:0x4A29,0xE789A9:0x4A2A,0xE9AE92:0x4A2B,0xE58886:0x4A2C,
0xE590BB:0x4A2D,0xE599B4:0x4A2E,0xE5A2B3:0x4A2F,0xE686A4:0x4A30,0xE689AE:0x4A31,
0xE7849A:0x4A32,0xE5A5AE:0x4A33,0xE7B289:0x4A34,0xE7B39E:0x4A35,0xE7B49B:0x4A36,
0xE99BB0:0x4A37,0xE69687:0x4A38,0xE8819E:0x4A39,0xE4B899:0x4A3A,0xE4BDB5:0x4A3B,
0xE585B5:0x4A3C,0xE5A180:0x4A3D,0xE5B9A3:0x4A3E,0xE5B9B3:0x4A3F,0xE5BC8A:0x4A40,
0xE69F84:0x4A41,0xE4B8A6:0x4A42,0xE894BD:0x4A43,0xE99689:0x4A44,0xE9999B:0x4A45,
0xE7B1B3:0x4A46,0xE9A081:0x4A47,0xE583BB:0x4A48,0xE5A381:0x4A49,0xE79996:0x4A4A,
0xE7A2A7:0x4A4B,0xE588A5:0x4A4C,0xE79EA5:0x4A4D,0xE89491:0x4A4E,0xE7AE86:0x4A4F,
0xE5818F:0x4A50,0xE5A489:0x4A51,0xE78987:0x4A52,0xE7AF87:0x4A53,0xE7B7A8:0x4A54,
0xE8BEBA:0x4A55,0xE8BF94:0x4A56,0xE9818D:0x4A57,0xE4BEBF:0x4A58,0xE58B89:0x4A59,
0xE5A8A9:0x4A5A,0xE5BC81:0x4A5B,0xE99EAD:0x4A5C,0xE4BF9D:0x4A5D,0xE88897:0x4A5E,
0xE98BAA:0x4A5F,0xE59C83:0x4A60,0xE68D95:0x4A61,0xE6ADA9:0x4A62,0xE794AB:0x4A63,
0xE8A39C:0x4A64,0xE8BC94:0x4A65,0xE7A982:0x4A66,0xE58B9F:0x4A67,0xE5A293:0x4A68,
0xE68595:0x4A69,0xE6888A:0x4A6A,0xE69AAE:0x4A6B,0xE6AF8D:0x4A6C,0xE7B0BF:0x4A6D,
0xE88FA9:0x4A6E,0xE580A3:0x4A6F,0xE4BFB8:0x4A70,0xE58C85:0x4A71,0xE59186:0x4A72,
0xE5A0B1:0x4A73,0xE5A589:0x4A74,0xE5AE9D:0x4A75,0xE5B3B0:0x4A76,0xE5B3AF:0x4A77,
0xE5B4A9:0x4A78,0xE5BA96:0x4A79,0xE68AB1:0x4A7A,0xE68DA7:0x4A7B,0xE694BE:0x4A7C,
0xE696B9:0x4A7D,0xE69C8B:0x4A7E,0xE6B395:0x4B21,0xE6B3A1:0x4B22,0xE783B9:0x4B23,
0xE7A0B2:0x4B24,0xE7B8AB:0x4B25,0xE8839E:0x4B26,0xE88AB3:0x4B27,0xE8908C:0x4B28,
0xE893AC:0x4B29,0xE89C82:0x4B2A,0xE8A492:0x4B2B,0xE8A8AA:0x4B2C,0xE8B18A:0x4B2D,
0xE982A6:0x4B2E,0xE98B92:0x4B2F,0xE9A3BD:0x4B30,0xE9B3B3:0x4B31,0xE9B5AC:0x4B32,
0xE4B98F:0x4B33,0xE4BAA1:0x4B34,0xE5828D:0x4B35,0xE58996:0x4B36,0xE59D8A:0x4B37,
0xE5A6A8:0x4B38,0xE5B8BD:0x4B39,0xE5BF98:0x4B3A,0xE5BF99:0x4B3B,0xE688BF:0x4B3C,
0xE69AB4:0x4B3D,0xE69C9B:0x4B3E,0xE69F90:0x4B3F,0xE6A392:0x4B40,0xE58692:0x4B41,
0xE7B4A1:0x4B42,0xE882AA:0x4B43,0xE886A8:0x4B44,0xE8AC80:0x4B45,0xE8B28C:0x4B46,
0xE8B2BF:0x4B47,0xE989BE:0x4B48,0xE998B2:0x4B49,0xE590A0:0x4B4A,0xE9A0AC:0x4B4B,
0xE58C97:0x4B4C,0xE58395:0x4B4D,0xE58D9C:0x4B4E,0xE5A2A8:0x4B4F,0xE692B2:0x4B50,
0xE69CB4:0x4B51,0xE789A7:0x4B52,0xE79DA6:0x4B53,0xE7A986:0x4B54,0xE987A6:0x4B55,
0xE58B83:0x4B56,0xE6B2A1:0x4B57,0xE6AE86:0x4B58,0xE5A080:0x4B59,0xE5B98C:0x4B5A,
0xE5A594:0x4B5B,0xE69CAC:0x4B5C,0xE7BFBB:0x4B5D,0xE587A1:0x4B5E,0xE79B86:0x4B5F,
0xE691A9:0x4B60,0xE7A3A8:0x4B61,0xE9AD94:0x4B62,0xE9BABB:0x4B63,0xE59F8B:0x4B64,
0xE5A6B9:0x4B65,0xE698A7:0x4B66,0xE69E9A:0x4B67,0xE6AF8E:0x4B68,0xE593A9:0x4B69,
0xE6A799:0x4B6A,0xE5B995:0x4B6B,0xE8869C:0x4B6C,0xE69E95:0x4B6D,0xE9AEAA:0x4B6E,
0xE69FBE:0x4B6F,0xE9B192:0x4B70,0xE6A19D:0x4B71,0xE4BAA6:0x4B72,0xE4BFA3:0x4B73,
0xE58F88:0x4B74,0xE68AB9:0x4B75,0xE69CAB:0x4B76,0xE6B2AB:0x4B77,0xE8BF84:0x4B78,
0xE4BEAD:0x4B79,0xE7B9AD:0x4B7A,0xE9BABF:0x4B7B,0xE4B887:0x4B7C,0xE685A2:0x4B7D,
0xE6BA80:0x4B7E,0xE6BCAB:0x4C21,0xE89493:0x4C22,0xE591B3:0x4C23,0xE69CAA:0x4C24,
0xE9AD85:0x4C25,0xE5B7B3:0x4C26,0xE7AE95:0x4C27,0xE5B2AC:0x4C28,0xE5AF86:0x4C29,
0xE89C9C:0x4C2A,0xE6B98A:0x4C2B,0xE89391:0x4C2C,0xE7A894:0x4C2D,0xE88488:0x4C2E,
0xE5A699:0x4C2F,0xE7B28D:0x4C30,0xE6B091:0x4C31,0xE79CA0:0x4C32,0xE58B99:0x4C33,
0xE5A4A2:0x4C34,0xE784A1:0x4C35,0xE7899F:0x4C36,0xE79F9B:0x4C37,0xE99CA7:0x4C38,
0xE9B5A1:0x4C39,0xE6A48B:0x4C3A,0xE5A9BF:0x4C3B,0xE5A898:0x4C3C,0xE586A5:0x4C3D,
0xE5908D:0x4C3E,0xE591BD:0x4C3F,0xE6988E:0x4C40,0xE79B9F:0x4C41,0xE8BFB7:0x4C42,
0xE98A98:0x4C43,0xE9B3B4:0x4C44,0xE5A7AA:0x4C45,0xE7899D:0x4C46,0xE6BB85:0x4C47,
0xE5858D:0x4C48,0xE6A389:0x4C49,0xE7B6BF:0x4C4A,0xE7B7AC:0x4C4B,0xE99DA2:0x4C4C,
0xE9BABA:0x4C4D,0xE691B8:0x4C4E,0xE6A8A1:0x4C4F,0xE88C82:0x4C50,0xE5A684:0x4C51,
0xE5AD9F:0x4C52,0xE6AF9B:0x4C53,0xE78C9B:0x4C54,0xE79BB2:0x4C55,0xE7B6B2:0x4C56,
0xE88097:0x4C57,0xE89299:0x4C58,0xE584B2:0x4C59,0xE69CA8:0x4C5A,0xE9BB99:0x4C5B,
0xE79BAE:0x4C5C,0xE69DA2:0x4C5D,0xE58BBF:0x4C5E,0xE9A485:0x4C5F,0xE5B0A4:0x4C60,
0xE688BB:0x4C61,0xE7B1BE:0x4C62,0xE8B2B0:0x4C63,0xE5958F:0x4C64,0xE682B6:0x4C65,
0xE7B48B:0x4C66,0xE99680:0x4C67,0xE58C81:0x4C68,0xE4B99F:0x4C69,0xE586B6:0x4C6A,
0xE5A49C:0x4C6B,0xE788BA:0x4C6C,0xE880B6:0x4C6D,0xE9878E:0x4C6E,0xE5BCA5:0x4C6F,
0xE79FA2:0x4C70,0xE58E84:0x4C71,0xE5BDB9:0x4C72,0xE7B484:0x4C73,0xE896AC:0x4C74,
0xE8A8B3:0x4C75,0xE8BA8D:0x4C76,0xE99D96:0x4C77,0xE69FB3:0x4C78,0xE896AE:0x4C79,
0xE99193:0x4C7A,0xE68489:0x4C7B,0xE68488:0x4C7C,0xE6B2B9:0x4C7D,0xE79992:0x4C7E,
0xE8ABAD:0x4D21,0xE8BCB8:0x4D22,0xE594AF:0x4D23,0xE4BD91:0x4D24,0xE584AA:0x4D25,
0xE58B87:0x4D26,0xE58F8B:0x4D27,0xE5AEA5:0x4D28,0xE5B9BD:0x4D29,0xE682A0:0x4D2A,
0xE68682:0x4D2B,0xE68F96:0x4D2C,0xE69C89:0x4D2D,0xE69F9A:0x4D2E,0xE6B9A7:0x4D2F,
0xE6B68C:0x4D30,0xE78CB6:0x4D31,0xE78CB7:0x4D32,0xE794B1:0x4D33,0xE7A590:0x4D34,
0xE8A395:0x4D35,0xE8AA98:0x4D36,0xE9818A:0x4D37,0xE98291:0x4D38,0xE983B5:0x4D39,
0xE99B84:0x4D3A,0xE89E8D:0x4D3B,0xE5A495:0x4D3C,0xE4BA88:0x4D3D,0xE4BD99:0x4D3E,
0xE4B88E:0x4D3F,0xE8AA89:0x4D40,0xE8BCBF:0x4D41,0xE9A090:0x4D42,0xE582AD:0x4D43,
0xE5B9BC:0x4D44,0xE5A696:0x4D45,0xE5AEB9:0x4D46,0xE5BAB8:0x4D47,0xE68F9A:0x4D48,
0xE68FBA:0x4D49,0xE69381:0x4D4A,0xE69B9C:0x4D4B,0xE6A58A:0x4D4C,0xE6A798:0x4D4D,
0xE6B48B:0x4D4E,0xE6BAB6:0x4D4F,0xE78694:0x4D50,0xE794A8:0x4D51,0xE7AAAF:0x4D52,
0xE7BE8A:0x4D53,0xE88080:0x4D54,0xE89189:0x4D55,0xE89389:0x4D56,0xE8A681:0x4D57,
0xE8ACA1:0x4D58,0xE8B88A:0x4D59,0xE981A5:0x4D5A,0xE999BD:0x4D5B,0xE9A48A:0x4D5C,
0xE685BE:0x4D5D,0xE68A91:0x4D5E,0xE6ACB2:0x4D5F,0xE6B283:0x4D60,0xE6B5B4:0x4D61,
0xE7BF8C:0x4D62,0xE7BFBC:0x4D63,0xE6B780:0x4D64,0xE7BE85:0x4D65,0xE89EBA:0x4D66,
0xE8A3B8:0x4D67,0xE69DA5:0x4D68,0xE88EB1:0x4D69,0xE9A0BC:0x4D6A,0xE99BB7:0x4D6B,
0xE6B49B:0x4D6C,0xE7B5A1:0x4D6D,0xE890BD:0x4D6E,0xE985AA:0x4D6F,0xE4B9B1:0x4D70,
0xE58DB5:0x4D71,0xE5B590:0x4D72,0xE6AC84:0x4D73,0xE6BFAB:0x4D74,0xE8978D:0x4D75,
0xE898AD:0x4D76,0xE8A6A7:0x4D77,0xE588A9:0x4D78,0xE5908F:0x4D79,0xE5B1A5:0x4D7A,
0xE69D8E:0x4D7B,0xE6A2A8:0x4D7C,0xE79086:0x4D7D,0xE79283:0x4D7E,0xE797A2:0x4E21,
0xE8A38F:0x4E22,0xE8A3A1:0x4E23,0xE9878C:0x4E24,0xE99BA2:0x4E25,0xE999B8:0x4E26,
0xE5BE8B:0x4E27,0xE78E87:0x4E28,0xE7AB8B:0x4E29,0xE8918E:0x4E2A,0xE68EA0:0x4E2B,
0xE795A5:0x4E2C,0xE58A89:0x4E2D,0xE6B581:0x4E2E,0xE6BA9C:0x4E2F,0xE79089:0x4E30,
0xE79599:0x4E31,0xE7A1AB:0x4E32,0xE7B292:0x4E33,0xE99A86:0x4E34,0xE7AB9C:0x4E35,
0xE9BE8D:0x4E36,0xE4BEB6:0x4E37,0xE685AE:0x4E38,0xE69785:0x4E39,0xE8999C:0x4E3A,
0xE4BA86:0x4E3B,0xE4BAAE:0x4E3C,0xE5839A:0x4E3D,0xE4B8A1:0x4E3E,0xE5878C:0x4E3F,
0xE5AFAE:0x4E40,0xE69699:0x4E41,0xE6A281:0x4E42,0xE6B6BC:0x4E43,0xE78C9F:0x4E44,
0xE79982:0x4E45,0xE79EAD:0x4E46,0xE7A89C:0x4E47,0xE7B3A7:0x4E48,0xE889AF:0x4E49,
0xE8AB92:0x4E4A,0xE981BC:0x4E4B,0xE9878F:0x4E4C,0xE999B5:0x4E4D,0xE9A098:0x4E4E,
0xE58A9B:0x4E4F,0xE7B791:0x4E50,0xE580AB:0x4E51,0xE58E98:0x4E52,0xE69E97:0x4E53,
0xE6B78B:0x4E54,0xE78790:0x4E55,0xE790B3:0x4E56,0xE887A8:0x4E57,0xE8BCAA:0x4E58,
0xE99AA3:0x4E59,0xE9B197:0x4E5A,0xE9BA9F:0x4E5B,0xE791A0:0x4E5C,0xE5A181:0x4E5D,
0xE6B699:0x4E5E,0xE7B4AF:0x4E5F,0xE9A19E:0x4E60,0xE4BBA4:0x4E61,0xE4BCB6:0x4E62,
0xE4BE8B:0x4E63,0xE586B7:0x4E64,0xE58AB1:0x4E65,0xE5B6BA:0x4E66,0xE6809C:0x4E67,
0xE78EB2:0x4E68,0xE7A4BC:0x4E69,0xE88B93:0x4E6A,0xE988B4:0x4E6B,0xE99AB7:0x4E6C,
0xE99BB6:0x4E6D,0xE99C8A:0x4E6E,0xE9BA97:0x4E6F,0xE9BDA2:0x4E70,0xE69AA6:0x4E71,
0xE6ADB4:0x4E72,0xE58897:0x4E73,0xE58AA3:0x4E74,0xE78388:0x4E75,0xE8A382:0x4E76,
0xE5BB89:0x4E77,0xE6818B:0x4E78,0xE68690:0x4E79,0xE6BCA3:0x4E7A,0xE78589:0x4E7B,
0xE7B0BE:0x4E7C,0xE7B7B4:0x4E7D,0xE881AF:0x4E7E,0xE893AE:0x4F21,0xE980A3:0x4F22,
0xE98CAC:0x4F23,0xE59182:0x4F24,0xE9ADAF:0x4F25,0xE6AB93:0x4F26,0xE78289:0x4F27,
0xE8B382:0x4F28,0xE8B7AF:0x4F29,0xE99CB2:0x4F2A,0xE58AB4:0x4F2B,0xE5A981:0x4F2C,
0xE5BB8A:0x4F2D,0xE5BC84:0x4F2E,0xE69C97:0x4F2F,0xE6A5BC:0x4F30,0xE6A694:0x4F31,
0xE6B5AA:0x4F32,0xE6BC8F:0x4F33,0xE789A2:0x4F34,0xE78BBC:0x4F35,0xE7AFAD:0x4F36,
0xE88081:0x4F37,0xE881BE:0x4F38,0xE89D8B:0x4F39,0xE9838E:0x4F3A,0xE585AD:0x4F3B,
0xE9BA93:0x4F3C,0xE7A684:0x4F3D,0xE8828B:0x4F3E,0xE98CB2:0x4F3F,0xE8AB96:0x4F40,
0xE580AD:0x4F41,0xE5928C:0x4F42,0xE8A9B1:0x4F43,0xE6ADAA:0x4F44,0xE8B384:0x4F45,
0xE88487:0x4F46,0xE68391:0x4F47,0xE69EA0:0x4F48,0xE9B7B2:0x4F49,0xE4BA99:0x4F4A,
0xE4BA98:0x4F4B,0xE9B090:0x4F4C,0xE8A9AB:0x4F4D,0xE89781:0x4F4E,0xE895A8:0x4F4F,
0xE6A480:0x4F50,0xE6B9BE:0x4F51,0xE7A297:0x4F52,0xE88595:0x4F53,0xE5BC8C:0x5021,
0xE4B890:0x5022,0xE4B895:0x5023,0xE4B8AA:0x5024,0xE4B8B1:0x5025,0xE4B8B6:0x5026,
0xE4B8BC:0x5027,0xE4B8BF:0x5028,0xE4B982:0x5029,0xE4B996:0x502A,0xE4B998:0x502B,
0xE4BA82:0x502C,0xE4BA85:0x502D,0xE8B1AB:0x502E,0xE4BA8A:0x502F,0xE88892:0x5030,
0xE5BC8D:0x5031,0xE4BA8E:0x5032,0xE4BA9E:0x5033,0xE4BA9F:0x5034,0xE4BAA0:0x5035,
0xE4BAA2:0x5036,0xE4BAB0:0x5037,0xE4BAB3:0x5038,0xE4BAB6:0x5039,0xE4BB8E:0x503A,
0xE4BB8D:0x503B,0xE4BB84:0x503C,0xE4BB86:0x503D,0xE4BB82:0x503E,0xE4BB97:0x503F,
0xE4BB9E:0x5040,0xE4BBAD:0x5041,0xE4BB9F:0x5042,0xE4BBB7:0x5043,0xE4BC89:0x5044,
0xE4BD9A:0x5045,0xE4BCB0:0x5046,0xE4BD9B:0x5047,0xE4BD9D:0x5048,0xE4BD97:0x5049,
0xE4BD87:0x504A,0xE4BDB6:0x504B,0xE4BE88:0x504C,0xE4BE8F:0x504D,0xE4BE98:0x504E,
0xE4BDBB:0x504F,0xE4BDA9:0x5050,0xE4BDB0:0x5051,0xE4BE91:0x5052,0xE4BDAF:0x5053,
0xE4BE86:0x5054,0xE4BE96:0x5055,0xE58498:0x5056,0xE4BF94:0x5057,0xE4BF9F:0x5058,
0xE4BF8E:0x5059,0xE4BF98:0x505A,0xE4BF9B:0x505B,0xE4BF91:0x505C,0xE4BF9A:0x505D,
0xE4BF90:0x505E,0xE4BFA4:0x505F,0xE4BFA5:0x5060,0xE5809A:0x5061,0xE580A8:0x5062,
0xE58094:0x5063,0xE580AA:0x5064,0xE580A5:0x5065,0xE58085:0x5066,0xE4BC9C:0x5067,
0xE4BFB6:0x5068,0xE580A1:0x5069,0xE580A9:0x506A,0xE580AC:0x506B,0xE4BFBE:0x506C,
0xE4BFAF:0x506D,0xE58091:0x506E,0xE58086:0x506F,0xE58183:0x5070,0xE58187:0x5071,
0xE69C83:0x5072,0xE58195:0x5073,0xE58190:0x5074,0xE58188:0x5075,0xE5819A:0x5076,
0xE58196:0x5077,0xE581AC:0x5078,0xE581B8:0x5079,0xE58280:0x507A,0xE5829A:0x507B,
0xE58285:0x507C,0xE582B4:0x507D,0xE582B2:0x507E,0xE58389:0x5121,0xE5838A:0x5122,
0xE582B3:0x5123,0xE58382:0x5124,0xE58396:0x5125,0xE5839E:0x5126,0xE583A5:0x5127,
0xE583AD:0x5128,0xE583A3:0x5129,0xE583AE:0x512A,0xE583B9:0x512B,0xE583B5:0x512C,
0xE58489:0x512D,0xE58481:0x512E,0xE58482:0x512F,0xE58496:0x5130,0xE58495:0x5131,
0xE58494:0x5132,0xE5849A:0x5133,0xE584A1:0x5134,0xE584BA:0x5135,0xE584B7:0x5136,
0xE584BC:0x5137,0xE584BB:0x5138,0xE584BF:0x5139,0xE58580:0x513A,0xE58592:0x513B,
0xE5858C:0x513C,0xE58594:0x513D,0xE585A2:0x513E,0xE7ABB8:0x513F,0xE585A9:0x5140,
0xE585AA:0x5141,0xE585AE:0x5142,0xE58680:0x5143,0xE58682:0x5144,0xE59B98:0x5145,
0xE5868C:0x5146,0xE58689:0x5147,0xE5868F:0x5148,0xE58691:0x5149,0xE58693:0x514A,
0xE58695:0x514B,0xE58696:0x514C,0xE586A4:0x514D,0xE586A6:0x514E,0xE586A2:0x514F,
0xE586A9:0x5150,0xE586AA:0x5151,0xE586AB:0x5152,0xE586B3:0x5153,0xE586B1:0x5154,
0xE586B2:0x5155,0xE586B0:0x5156,0xE586B5:0x5157,0xE586BD:0x5158,0xE58785:0x5159,
0xE58789:0x515A,0xE5879B:0x515B,0xE587A0:0x515C,0xE89995:0x515D,0xE587A9:0x515E,
0xE587AD:0x515F,0xE587B0:0x5160,0xE587B5:0x5161,0xE587BE:0x5162,0xE58884:0x5163,
0xE5888B:0x5164,0xE58894:0x5165,0xE5888E:0x5166,0xE588A7:0x5167,0xE588AA:0x5168,
0xE588AE:0x5169,0xE588B3:0x516A,0xE588B9:0x516B,0xE5898F:0x516C,0xE58984:0x516D,
0xE5898B:0x516E,0xE5898C:0x516F,0xE5899E:0x5170,0xE58994:0x5171,0xE589AA:0x5172,
0xE589B4:0x5173,0xE589A9:0x5174,0xE589B3:0x5175,0xE589BF:0x5176,0xE589BD:0x5177,
0xE58A8D:0x5178,0xE58A94:0x5179,0xE58A92:0x517A,0xE589B1:0x517B,0xE58A88:0x517C,
0xE58A91:0x517D,0xE8BEA8:0x517E,0xE8BEA7:0x5221,0xE58AAC:0x5222,0xE58AAD:0x5223,
0xE58ABC:0x5224,0xE58AB5:0x5225,0xE58B81:0x5226,0xE58B8D:0x5227,0xE58B97:0x5228,
0xE58B9E:0x5229,0xE58BA3:0x522A,0xE58BA6:0x522B,0xE9A3AD:0x522C,0xE58BA0:0x522D,
0xE58BB3:0x522E,0xE58BB5:0x522F,0xE58BB8:0x5230,0xE58BB9:0x5231,0xE58C86:0x5232,
0xE58C88:0x5233,0xE794B8:0x5234,0xE58C8D:0x5235,0xE58C90:0x5236,0xE58C8F:0x5237,
0xE58C95:0x5238,0xE58C9A:0x5239,0xE58CA3:0x523A,0xE58CAF:0x523B,0xE58CB1:0x523C,
0xE58CB3:0x523D,0xE58CB8:0x523E,0xE58D80:0x523F,0xE58D86:0x5240,0xE58D85:0x5241,
0xE4B897:0x5242,0xE58D89:0x5243,0xE58D8D:0x5244,0xE58796:0x5245,0xE58D9E:0x5246,
0xE58DA9:0x5247,0xE58DAE:0x5248,0xE5A498:0x5249,0xE58DBB:0x524A,0xE58DB7:0x524B,
0xE58E82:0x524C,0xE58E96:0x524D,0xE58EA0:0x524E,0xE58EA6:0x524F,0xE58EA5:0x5250,
0xE58EAE:0x5251,0xE58EB0:0x5252,0xE58EB6:0x5253,0xE58F83:0x5254,0xE7B092:0x5255,
0xE99B99:0x5256,0xE58F9F:0x5257,0xE69BBC:0x5258,0xE787AE:0x5259,0xE58FAE:0x525A,
0xE58FA8:0x525B,0xE58FAD:0x525C,0xE58FBA:0x525D,0xE59081:0x525E,0xE590BD:0x525F,
0xE59180:0x5260,0xE590AC:0x5261,0xE590AD:0x5262,0xE590BC:0x5263,0xE590AE:0x5264,
0xE590B6:0x5265,0xE590A9:0x5266,0xE5909D:0x5267,0xE5918E:0x5268,0xE5928F:0x5269,
0xE591B5:0x526A,0xE5928E:0x526B,0xE5919F:0x526C,0xE591B1:0x526D,0xE591B7:0x526E,
0xE591B0:0x526F,0xE59292:0x5270,0xE591BB:0x5271,0xE59280:0x5272,0xE591B6:0x5273,
0xE59284:0x5274,0xE59290:0x5275,0xE59286:0x5276,0xE59387:0x5277,0xE592A2:0x5278,
0xE592B8:0x5279,0xE592A5:0x527A,0xE592AC:0x527B,0xE59384:0x527C,0xE59388:0x527D,
0xE592A8:0x527E,0xE592AB:0x5321,0xE59382:0x5322,0xE592A4:0x5323,0xE592BE:0x5324,
0xE592BC:0x5325,0xE59398:0x5326,0xE593A5:0x5327,0xE593A6:0x5328,0xE5948F:0x5329,
0xE59494:0x532A,0xE593BD:0x532B,0xE593AE:0x532C,0xE593AD:0x532D,0xE593BA:0x532E,
0xE593A2:0x532F,0xE594B9:0x5330,0xE59580:0x5331,0xE595A3:0x5332,0xE5958C:0x5333,
0xE594AE:0x5334,0xE5959C:0x5335,0xE59585:0x5336,0xE59596:0x5337,0xE59597:0x5338,
0xE594B8:0x5339,0xE594B3:0x533A,0xE5959D:0x533B,0xE59699:0x533C,0xE59680:0x533D,
0xE592AF:0x533E,0xE5968A:0x533F,0xE5969F:0x5340,0xE595BB:0x5341,0xE595BE:0x5342,
0xE59698:0x5343,0xE5969E:0x5344,0xE596AE:0x5345,0xE595BC:0x5346,0xE59683:0x5347,
0xE596A9:0x5348,0xE59687:0x5349,0xE596A8:0x534A,0xE5979A:0x534B,0xE59785:0x534C,
0xE5979F:0x534D,0xE59784:0x534E,0xE5979C:0x534F,0xE597A4:0x5350,0xE59794:0x5351,
0xE59894:0x5352,0xE597B7:0x5353,0xE59896:0x5354,0xE597BE:0x5355,0xE597BD:0x5356,
0xE5989B:0x5357,0xE597B9:0x5358,0xE5998E:0x5359,0xE59990:0x535A,0xE7879F:0x535B,
0xE598B4:0x535C,0xE598B6:0x535D,0xE598B2:0x535E,0xE598B8:0x535F,0xE599AB:0x5360,
0xE599A4:0x5361,0xE598AF:0x5362,0xE599AC:0x5363,0xE599AA:0x5364,0xE59A86:0x5365,
0xE59A80:0x5366,0xE59A8A:0x5367,0xE59AA0:0x5368,0xE59A94:0x5369,0xE59A8F:0x536A,
0xE59AA5:0x536B,0xE59AAE:0x536C,0xE59AB6:0x536D,0xE59AB4:0x536E,0xE59B82:0x536F,
0xE59ABC:0x5370,0xE59B81:0x5371,0xE59B83:0x5372,0xE59B80:0x5373,0xE59B88:0x5374,
0xE59B8E:0x5375,0xE59B91:0x5376,0xE59B93:0x5377,0xE59B97:0x5378,0xE59BAE:0x5379,
0xE59BB9:0x537A,0xE59C80:0x537B,0xE59BBF:0x537C,0xE59C84:0x537D,0xE59C89:0x537E,
0xE59C88:0x5421,0xE59C8B:0x5422,0xE59C8D:0x5423,0xE59C93:0x5424,0xE59C98:0x5425,
0xE59C96:0x5426,0xE59787:0x5427,0xE59C9C:0x5428,0xE59CA6:0x5429,0xE59CB7:0x542A,
0xE59CB8:0x542B,0xE59D8E:0x542C,0xE59CBB:0x542D,0xE59D80:0x542E,0xE59D8F:0x542F,
0xE59DA9:0x5430,0xE59F80:0x5431,0xE59E88:0x5432,0xE59DA1:0x5433,0xE59DBF:0x5434,
0xE59E89:0x5435,0xE59E93:0x5436,0xE59EA0:0x5437,0xE59EB3:0x5438,0xE59EA4:0x5439,
0xE59EAA:0x543A,0xE59EB0:0x543B,0xE59F83:0x543C,0xE59F86:0x543D,0xE59F94:0x543E,
0xE59F92:0x543F,0xE59F93:0x5440,0xE5A08A:0x5441,0xE59F96:0x5442,0xE59FA3:0x5443,
0xE5A08B:0x5444,0xE5A099:0x5445,0xE5A09D:0x5446,0xE5A1B2:0x5447,0xE5A0A1:0x5448,
0xE5A1A2:0x5449,0xE5A18B:0x544A,0xE5A1B0:0x544B,0xE6AF80:0x544C,0xE5A192:0x544D,
0xE5A0BD:0x544E,0xE5A1B9:0x544F,0xE5A285:0x5450,0xE5A2B9:0x5451,0xE5A29F:0x5452,
0xE5A2AB:0x5453,0xE5A2BA:0x5454,0xE5A39E:0x5455,0xE5A2BB:0x5456,0xE5A2B8:0x5457,
0xE5A2AE:0x5458,0xE5A385:0x5459,0xE5A393:0x545A,0xE5A391:0x545B,0xE5A397:0x545C,
0xE5A399:0x545D,0xE5A398:0x545E,0xE5A3A5:0x545F,0xE5A39C:0x5460,0xE5A3A4:0x5461,
0xE5A39F:0x5462,0xE5A3AF:0x5463,0xE5A3BA:0x5464,0xE5A3B9:0x5465,0xE5A3BB:0x5466,
0xE5A3BC:0x5467,0xE5A3BD:0x5468,0xE5A482:0x5469,0xE5A48A:0x546A,0xE5A490:0x546B,
0xE5A49B:0x546C,0xE6A2A6:0x546D,0xE5A4A5:0x546E,0xE5A4AC:0x546F,0xE5A4AD:0x5470,
0xE5A4B2:0x5471,0xE5A4B8:0x5472,0xE5A4BE:0x5473,0xE7AB92:0x5474,0xE5A595:0x5475,
0xE5A590:0x5476,0xE5A58E:0x5477,0xE5A59A:0x5478,0xE5A598:0x5479,0xE5A5A2:0x547A,
0xE5A5A0:0x547B,0xE5A5A7:0x547C,0xE5A5AC:0x547D,0xE5A5A9:0x547E,0xE5A5B8:0x5521,
0xE5A681:0x5522,0xE5A69D:0x5523,0xE4BD9E:0x5524,0xE4BEAB:0x5525,0xE5A6A3:0x5526,
0xE5A6B2:0x5527,0xE5A786:0x5528,0xE5A7A8:0x5529,0xE5A79C:0x552A,0xE5A68D:0x552B,
0xE5A799:0x552C,0xE5A79A:0x552D,0xE5A8A5:0x552E,0xE5A89F:0x552F,0xE5A891:0x5530,
0xE5A89C:0x5531,0xE5A889:0x5532,0xE5A89A:0x5533,0xE5A980:0x5534,0xE5A9AC:0x5535,
0xE5A989:0x5536,0xE5A8B5:0x5537,0xE5A8B6:0x5538,0xE5A9A2:0x5539,0xE5A9AA:0x553A,
0xE5AA9A:0x553B,0xE5AABC:0x553C,0xE5AABE:0x553D,0xE5AB8B:0x553E,0xE5AB82:0x553F,
0xE5AABD:0x5540,0xE5ABA3:0x5541,0xE5AB97:0x5542,0xE5ABA6:0x5543,0xE5ABA9:0x5544,
0xE5AB96:0x5545,0xE5ABBA:0x5546,0xE5ABBB:0x5547,0xE5AC8C:0x5548,0xE5AC8B:0x5549,
0xE5AC96:0x554A,0xE5ACB2:0x554B,0xE5AB90:0x554C,0xE5ACAA:0x554D,0xE5ACB6:0x554E,
0xE5ACBE:0x554F,0xE5AD83:0x5550,0xE5AD85:0x5551,0xE5AD80:0x5552,0xE5AD91:0x5553,
0xE5AD95:0x5554,0xE5AD9A:0x5555,0xE5AD9B:0x5556,0xE5ADA5:0x5557,0xE5ADA9:0x5558,
0xE5ADB0:0x5559,0xE5ADB3:0x555A,0xE5ADB5:0x555B,0xE5ADB8:0x555C,0xE69688:0x555D,
0xE5ADBA:0x555E,0xE5AE80:0x555F,0xE5AE83:0x5560,0xE5AEA6:0x5561,0xE5AEB8:0x5562,
0xE5AF83:0x5563,0xE5AF87:0x5564,0xE5AF89:0x5565,0xE5AF94:0x5566,0xE5AF90:0x5567,
0xE5AFA4:0x5568,0xE5AFA6:0x5569,0xE5AFA2:0x556A,0xE5AF9E:0x556B,0xE5AFA5:0x556C,
0xE5AFAB:0x556D,0xE5AFB0:0x556E,0xE5AFB6:0x556F,0xE5AFB3:0x5570,0xE5B085:0x5571,
0xE5B087:0x5572,0xE5B088:0x5573,0xE5B08D:0x5574,0xE5B093:0x5575,0xE5B0A0:0x5576,
0xE5B0A2:0x5577,0xE5B0A8:0x5578,0xE5B0B8:0x5579,0xE5B0B9:0x557A,0xE5B181:0x557B,
0xE5B186:0x557C,0xE5B18E:0x557D,0xE5B193:0x557E,0xE5B190:0x5621,0xE5B18F:0x5622,
0xE5ADB1:0x5623,0xE5B1AC:0x5624,0xE5B1AE:0x5625,0xE4B9A2:0x5626,0xE5B1B6:0x5627,
0xE5B1B9:0x5628,0xE5B28C:0x5629,0xE5B291:0x562A,0xE5B294:0x562B,0xE5A69B:0x562C,
0xE5B2AB:0x562D,0xE5B2BB:0x562E,0xE5B2B6:0x562F,0xE5B2BC:0x5630,0xE5B2B7:0x5631,
0xE5B385:0x5632,0xE5B2BE:0x5633,0xE5B387:0x5634,0xE5B399:0x5635,0xE5B3A9:0x5636,
0xE5B3BD:0x5637,0xE5B3BA:0x5638,0xE5B3AD:0x5639,0xE5B68C:0x563A,0xE5B3AA:0x563B,
0xE5B48B:0x563C,0xE5B495:0x563D,0xE5B497:0x563E,0xE5B59C:0x563F,0xE5B49F:0x5640,
0xE5B49B:0x5641,0xE5B491:0x5642,0xE5B494:0x5643,0xE5B4A2:0x5644,0xE5B49A:0x5645,
0xE5B499:0x5646,0xE5B498:0x5647,0xE5B58C:0x5648,0xE5B592:0x5649,0xE5B58E:0x564A,
0xE5B58B:0x564B,0xE5B5AC:0x564C,0xE5B5B3:0x564D,0xE5B5B6:0x564E,0xE5B687:0x564F,
0xE5B684:0x5650,0xE5B682:0x5651,0xE5B6A2:0x5652,0xE5B69D:0x5653,0xE5B6AC:0x5654,
0xE5B6AE:0x5655,0xE5B6BD:0x5656,0xE5B690:0x5657,0xE5B6B7:0x5658,0xE5B6BC:0x5659,
0xE5B789:0x565A,0xE5B78D:0x565B,0xE5B793:0x565C,0xE5B792:0x565D,0xE5B796:0x565E,
0xE5B79B:0x565F,0xE5B7AB:0x5660,0xE5B7B2:0x5661,0xE5B7B5:0x5662,0xE5B88B:0x5663,
0xE5B89A:0x5664,0xE5B899:0x5665,0xE5B891:0x5666,0xE5B89B:0x5667,0xE5B8B6:0x5668,
0xE5B8B7:0x5669,0xE5B984:0x566A,0xE5B983:0x566B,0xE5B980:0x566C,0xE5B98E:0x566D,
0xE5B997:0x566E,0xE5B994:0x566F,0xE5B99F:0x5670,0xE5B9A2:0x5671,0xE5B9A4:0x5672,
0xE5B987:0x5673,0xE5B9B5:0x5674,0xE5B9B6:0x5675,0xE5B9BA:0x5676,0xE9BABC:0x5677,
0xE5B9BF:0x5678,0xE5BAA0:0x5679,0xE5BB81:0x567A,0xE5BB82:0x567B,0xE5BB88:0x567C,
0xE5BB90:0x567D,0xE5BB8F:0x567E,0xE5BB96:0x5721,0xE5BBA3:0x5722,0xE5BB9D:0x5723,
0xE5BB9A:0x5724,0xE5BB9B:0x5725,0xE5BBA2:0x5726,0xE5BBA1:0x5727,0xE5BBA8:0x5728,
0xE5BBA9:0x5729,0xE5BBAC:0x572A,0xE5BBB1:0x572B,0xE5BBB3:0x572C,0xE5BBB0:0x572D,
0xE5BBB4:0x572E,0xE5BBB8:0x572F,0xE5BBBE:0x5730,0xE5BC83:0x5731,0xE5BC89:0x5732,
0xE5BD9D:0x5733,0xE5BD9C:0x5734,0xE5BC8B:0x5735,0xE5BC91:0x5736,0xE5BC96:0x5737,
0xE5BCA9:0x5738,0xE5BCAD:0x5739,0xE5BCB8:0x573A,0xE5BD81:0x573B,0xE5BD88:0x573C,
0xE5BD8C:0x573D,0xE5BD8E:0x573E,0xE5BCAF:0x573F,0xE5BD91:0x5740,0xE5BD96:0x5741,
0xE5BD97:0x5742,0xE5BD99:0x5743,0xE5BDA1:0x5744,0xE5BDAD:0x5745,0xE5BDB3:0x5746,
0xE5BDB7:0x5747,0xE5BE83:0x5748,0xE5BE82:0x5749,0xE5BDBF:0x574A,0xE5BE8A:0x574B,
0xE5BE88:0x574C,0xE5BE91:0x574D,0xE5BE87:0x574E,0xE5BE9E:0x574F,0xE5BE99:0x5750,
0xE5BE98:0x5751,0xE5BEA0:0x5752,0xE5BEA8:0x5753,0xE5BEAD:0x5754,0xE5BEBC:0x5755,
0xE5BF96:0x5756,0xE5BFBB:0x5757,0xE5BFA4:0x5758,0xE5BFB8:0x5759,0xE5BFB1:0x575A,
0xE5BF9D:0x575B,0xE682B3:0x575C,0xE5BFBF:0x575D,0xE680A1:0x575E,0xE681A0:0x575F,
0xE68099:0x5760,0xE68090:0x5761,0xE680A9:0x5762,0xE6808E:0x5763,0xE680B1:0x5764,
0xE6809B:0x5765,0xE68095:0x5766,0xE680AB:0x5767,0xE680A6:0x5768,0xE6808F:0x5769,
0xE680BA:0x576A,0xE6819A:0x576B,0xE68181:0x576C,0xE681AA:0x576D,0xE681B7:0x576E,
0xE6819F:0x576F,0xE6818A:0x5770,0xE68186:0x5771,0xE6818D:0x5772,0xE681A3:0x5773,
0xE68183:0x5774,0xE681A4:0x5775,0xE68182:0x5776,0xE681AC:0x5777,0xE681AB:0x5778,
0xE68199:0x5779,0xE68281:0x577A,0xE6828D:0x577B,0xE683A7:0x577C,0xE68283:0x577D,
0xE6829A:0x577E,0xE68284:0x5821,0xE6829B:0x5822,0xE68296:0x5823,0xE68297:0x5824,
0xE68292:0x5825,0xE682A7:0x5826,0xE6828B:0x5827,0xE683A1:0x5828,0xE682B8:0x5829,
0xE683A0:0x582A,0xE68393:0x582B,0xE682B4:0x582C,0xE5BFB0:0x582D,0xE682BD:0x582E,
0xE68386:0x582F,0xE682B5:0x5830,0xE68398:0x5831,0xE6858D:0x5832,0xE68495:0x5833,
0xE68486:0x5834,0xE683B6:0x5835,0xE683B7:0x5836,0xE68480:0x5837,0xE683B4:0x5838,
0xE683BA:0x5839,0xE68483:0x583A,0xE684A1:0x583B,0xE683BB:0x583C,0xE683B1:0x583D,
0xE6848D:0x583E,0xE6848E:0x583F,0xE68587:0x5840,0xE684BE:0x5841,0xE684A8:0x5842,
0xE684A7:0x5843,0xE6858A:0x5844,0xE684BF:0x5845,0xE684BC:0x5846,0xE684AC:0x5847,
0xE684B4:0x5848,0xE684BD:0x5849,0xE68582:0x584A,0xE68584:0x584B,0xE685B3:0x584C,
0xE685B7:0x584D,0xE68598:0x584E,0xE68599:0x584F,0xE6859A:0x5850,0xE685AB:0x5851,
0xE685B4:0x5852,0xE685AF:0x5853,0xE685A5:0x5854,0xE685B1:0x5855,0xE6859F:0x5856,
0xE6859D:0x5857,0xE68593:0x5858,0xE685B5:0x5859,0xE68699:0x585A,0xE68696:0x585B,
0xE68687:0x585C,0xE686AC:0x585D,0xE68694:0x585E,0xE6869A:0x585F,0xE6868A:0x5860,
0xE68691:0x5861,0xE686AB:0x5862,0xE686AE:0x5863,0xE6878C:0x5864,0xE6878A:0x5865,
0xE68789:0x5866,0xE687B7:0x5867,0xE68788:0x5868,0xE68783:0x5869,0xE68786:0x586A,
0xE686BA:0x586B,0xE6878B:0x586C,0xE7BDB9:0x586D,0xE6878D:0x586E,0xE687A6:0x586F,
0xE687A3:0x5870,0xE687B6:0x5871,0xE687BA:0x5872,0xE687B4:0x5873,0xE687BF:0x5874,
0xE687BD:0x5875,0xE687BC:0x5876,0xE687BE:0x5877,0xE68880:0x5878,0xE68888:0x5879,
0xE68889:0x587A,0xE6888D:0x587B,0xE6888C:0x587C,0xE68894:0x587D,0xE6889B:0x587E,
0xE6889E:0x5921,0xE688A1:0x5922,0xE688AA:0x5923,0xE688AE:0x5924,0xE688B0:0x5925,
0xE688B2:0x5926,0xE688B3:0x5927,0xE68981:0x5928,0xE6898E:0x5929,0xE6899E:0x592A,
0xE689A3:0x592B,0xE6899B:0x592C,0xE689A0:0x592D,0xE689A8:0x592E,0xE689BC:0x592F,
0xE68A82:0x5930,0xE68A89:0x5931,0xE689BE:0x5932,0xE68A92:0x5933,0xE68A93:0x5934,
0xE68A96:0x5935,0xE68B94:0x5936,0xE68A83:0x5937,0xE68A94:0x5938,0xE68B97:0x5939,
0xE68B91:0x593A,0xE68ABB:0x593B,0xE68B8F:0x593C,0xE68BBF:0x593D,0xE68B86:0x593E,
0xE69394:0x593F,0xE68B88:0x5940,0xE68B9C:0x5941,0xE68B8C:0x5942,0xE68B8A:0x5943,
0xE68B82:0x5944,0xE68B87:0x5945,0xE68A9B:0x5946,0xE68B89:0x5947,0xE68C8C:0x5948,
0xE68BAE:0x5949,0xE68BB1:0x594A,0xE68CA7:0x594B,0xE68C82:0x594C,0xE68C88:0x594D,
0xE68BAF:0x594E,0xE68BB5:0x594F,0xE68D90:0x5950,0xE68CBE:0x5951,0xE68D8D:0x5952,
0xE6909C:0x5953,0xE68D8F:0x5954,0xE68E96:0x5955,0xE68E8E:0x5956,0xE68E80:0x5957,
0xE68EAB:0x5958,0xE68DB6:0x5959,0xE68EA3:0x595A,0xE68E8F:0x595B,0xE68E89:0x595C,
0xE68E9F:0x595D,0xE68EB5:0x595E,0xE68DAB:0x595F,0xE68DA9:0x5960,0xE68EBE:0x5961,
0xE68FA9:0x5962,0xE68F80:0x5963,0xE68F86:0x5964,0xE68FA3:0x5965,0xE68F89:0x5966,
0xE68F92:0x5967,0xE68FB6:0x5968,0xE68F84:0x5969,0xE69096:0x596A,0xE690B4:0x596B,
0xE69086:0x596C,0xE69093:0x596D,0xE690A6:0x596E,0xE690B6:0x596F,0xE6949D:0x5970,
0xE69097:0x5971,0xE690A8:0x5972,0xE6908F:0x5973,0xE691A7:0x5974,0xE691AF:0x5975,
0xE691B6:0x5976,0xE6918E:0x5977,0xE694AA:0x5978,0xE69295:0x5979,0xE69293:0x597A,
0xE692A5:0x597B,0xE692A9:0x597C,0xE69288:0x597D,0xE692BC:0x597E,0xE6939A:0x5A21,
0xE69392:0x5A22,0xE69385:0x5A23,0xE69387:0x5A24,0xE692BB:0x5A25,0xE69398:0x5A26,
0xE69382:0x5A27,0xE693B1:0x5A28,0xE693A7:0x5A29,0xE88889:0x5A2A,0xE693A0:0x5A2B,
0xE693A1:0x5A2C,0xE68AAC:0x5A2D,0xE693A3:0x5A2E,0xE693AF:0x5A2F,0xE694AC:0x5A30,
0xE693B6:0x5A31,0xE693B4:0x5A32,0xE693B2:0x5A33,0xE693BA:0x5A34,0xE69480:0x5A35,
0xE693BD:0x5A36,0xE69498:0x5A37,0xE6949C:0x5A38,0xE69485:0x5A39,0xE694A4:0x5A3A,
0xE694A3:0x5A3B,0xE694AB:0x5A3C,0xE694B4:0x5A3D,0xE694B5:0x5A3E,0xE694B7:0x5A3F,
0xE694B6:0x5A40,0xE694B8:0x5A41,0xE7958B:0x5A42,0xE69588:0x5A43,0xE69596:0x5A44,
0xE69595:0x5A45,0xE6958D:0x5A46,0xE69598:0x5A47,0xE6959E:0x5A48,0xE6959D:0x5A49,
0xE695B2:0x5A4A,0xE695B8:0x5A4B,0xE69682:0x5A4C,0xE69683:0x5A4D,0xE8AE8A:0x5A4E,
0xE6969B:0x5A4F,0xE6969F:0x5A50,0xE696AB:0x5A51,0xE696B7:0x5A52,0xE69783:0x5A53,
0xE69786:0x5A54,0xE69781:0x5A55,0xE69784:0x5A56,0xE6978C:0x5A57,0xE69792:0x5A58,
0xE6979B:0x5A59,0xE69799:0x5A5A,0xE697A0:0x5A5B,0xE697A1:0x5A5C,0xE697B1:0x5A5D,
0xE69DB2:0x5A5E,0xE6988A:0x5A5F,0xE69883:0x5A60,0xE697BB:0x5A61,0xE69DB3:0x5A62,
0xE698B5:0x5A63,0xE698B6:0x5A64,0xE698B4:0x5A65,0xE6989C:0x5A66,0xE6998F:0x5A67,
0xE69984:0x5A68,0xE69989:0x5A69,0xE69981:0x5A6A,0xE6999E:0x5A6B,0xE6999D:0x5A6C,
0xE699A4:0x5A6D,0xE699A7:0x5A6E,0xE699A8:0x5A6F,0xE6999F:0x5A70,0xE699A2:0x5A71,
0xE699B0:0x5A72,0xE69A83:0x5A73,0xE69A88:0x5A74,0xE69A8E:0x5A75,0xE69A89:0x5A76,
0xE69A84:0x5A77,0xE69A98:0x5A78,0xE69A9D:0x5A79,0xE69B81:0x5A7A,0xE69AB9:0x5A7B,
0xE69B89:0x5A7C,0xE69ABE:0x5A7D,0xE69ABC:0x5A7E,0xE69B84:0x5B21,0xE69AB8:0x5B22,
0xE69B96:0x5B23,0xE69B9A:0x5B24,0xE69BA0:0x5B25,0xE698BF:0x5B26,0xE69BA6:0x5B27,
0xE69BA9:0x5B28,0xE69BB0:0x5B29,0xE69BB5:0x5B2A,0xE69BB7:0x5B2B,0xE69C8F:0x5B2C,
0xE69C96:0x5B2D,0xE69C9E:0x5B2E,0xE69CA6:0x5B2F,0xE69CA7:0x5B30,0xE99CB8:0x5B31,
0xE69CAE:0x5B32,0xE69CBF:0x5B33,0xE69CB6:0x5B34,0xE69D81:0x5B35,0xE69CB8:0x5B36,
0xE69CB7:0x5B37,0xE69D86:0x5B38,0xE69D9E:0x5B39,0xE69DA0:0x5B3A,0xE69D99:0x5B3B,
0xE69DA3:0x5B3C,0xE69DA4:0x5B3D,0xE69E89:0x5B3E,0xE69DB0:0x5B3F,0xE69EA9:0x5B40,
0xE69DBC:0x5B41,0xE69DAA:0x5B42,0xE69E8C:0x5B43,0xE69E8B:0x5B44,0xE69EA6:0x5B45,
0xE69EA1:0x5B46,0xE69E85:0x5B47,0xE69EB7:0x5B48,0xE69FAF:0x5B49,0xE69EB4:0x5B4A,
0xE69FAC:0x5B4B,0xE69EB3:0x5B4C,0xE69FA9:0x5B4D,0xE69EB8:0x5B4E,0xE69FA4:0x5B4F,
0xE69F9E:0x5B50,0xE69F9D:0x5B51,0xE69FA2:0x5B52,0xE69FAE:0x5B53,0xE69EB9:0x5B54,
0xE69F8E:0x5B55,0xE69F86:0x5B56,0xE69FA7:0x5B57,0xE6AA9C:0x5B58,0xE6A09E:0x5B59,
0xE6A186:0x5B5A,0xE6A0A9:0x5B5B,0xE6A180:0x5B5C,0xE6A18D:0x5B5D,0xE6A0B2:0x5B5E,
0xE6A18E:0x5B5F,0xE6A2B3:0x5B60,0xE6A0AB:0x5B61,0xE6A199:0x5B62,0xE6A1A3:0x5B63,
0xE6A1B7:0x5B64,0xE6A1BF:0x5B65,0xE6A29F:0x5B66,0xE6A28F:0x5B67,0xE6A2AD:0x5B68,
0xE6A294:0x5B69,0xE6A29D:0x5B6A,0xE6A29B:0x5B6B,0xE6A283:0x5B6C,0xE6AAAE:0x5B6D,
0xE6A2B9:0x5B6E,0xE6A1B4:0x5B6F,0xE6A2B5:0x5B70,0xE6A2A0:0x5B71,0xE6A2BA:0x5B72,
0xE6A48F:0x5B73,0xE6A28D:0x5B74,0xE6A1BE:0x5B75,0xE6A481:0x5B76,0xE6A38A:0x5B77,
0xE6A488:0x5B78,0xE6A398:0x5B79,0xE6A4A2:0x5B7A,0xE6A4A6:0x5B7B,0xE6A3A1:0x5B7C,
0xE6A48C:0x5B7D,0xE6A38D:0x5B7E,0xE6A394:0x5C21,0xE6A3A7:0x5C22,0xE6A395:0x5C23,
0xE6A4B6:0x5C24,0xE6A492:0x5C25,0xE6A484:0x5C26,0xE6A397:0x5C27,0xE6A3A3:0x5C28,
0xE6A4A5:0x5C29,0xE6A3B9:0x5C2A,0xE6A3A0:0x5C2B,0xE6A3AF:0x5C2C,0xE6A4A8:0x5C2D,
0xE6A4AA:0x5C2E,0xE6A49A:0x5C2F,0xE6A4A3:0x5C30,0xE6A4A1:0x5C31,0xE6A386:0x5C32,
0xE6A5B9:0x5C33,0xE6A5B7:0x5C34,0xE6A59C:0x5C35,0xE6A5B8:0x5C36,0xE6A5AB:0x5C37,
0xE6A594:0x5C38,0xE6A5BE:0x5C39,0xE6A5AE:0x5C3A,0xE6A4B9:0x5C3B,0xE6A5B4:0x5C3C,
0xE6A4BD:0x5C3D,0xE6A599:0x5C3E,0xE6A4B0:0x5C3F,0xE6A5A1:0x5C40,0xE6A59E:0x5C41,
0xE6A59D:0x5C42,0xE6A681:0x5C43,0xE6A5AA:0x5C44,0xE6A6B2:0x5C45,0xE6A6AE:0x5C46,
0xE6A790:0x5C47,0xE6A6BF:0x5C48,0xE6A781:0x5C49,0xE6A793:0x5C4A,0xE6A6BE:0x5C4B,
0xE6A78E:0x5C4C,0xE5AFA8:0x5C4D,0xE6A78A:0x5C4E,0xE6A79D:0x5C4F,0xE6A6BB:0x5C50,
0xE6A783:0x5C51,0xE6A6A7:0x5C52,0xE6A8AE:0x5C53,0xE6A691:0x5C54,0xE6A6A0:0x5C55,
0xE6A69C:0x5C56,0xE6A695:0x5C57,0xE6A6B4:0x5C58,0xE6A79E:0x5C59,0xE6A7A8:0x5C5A,
0xE6A882:0x5C5B,0xE6A89B:0x5C5C,0xE6A7BF:0x5C5D,0xE6AC8A:0x5C5E,0xE6A7B9:0x5C5F,
0xE6A7B2:0x5C60,0xE6A7A7:0x5C61,0xE6A885:0x5C62,0xE6A6B1:0x5C63,0xE6A89E:0x5C64,
0xE6A7AD:0x5C65,0xE6A894:0x5C66,0xE6A7AB:0x5C67,0xE6A88A:0x5C68,0xE6A892:0x5C69,
0xE6AB81:0x5C6A,0xE6A8A3:0x5C6B,0xE6A893:0x5C6C,0xE6A984:0x5C6D,0xE6A88C:0x5C6E,
0xE6A9B2:0x5C6F,0xE6A8B6:0x5C70,0xE6A9B8:0x5C71,0xE6A987:0x5C72,0xE6A9A2:0x5C73,
0xE6A999:0x5C74,0xE6A9A6:0x5C75,0xE6A988:0x5C76,0xE6A8B8:0x5C77,0xE6A8A2:0x5C78,
0xE6AA90:0x5C79,0xE6AA8D:0x5C7A,0xE6AAA0:0x5C7B,0xE6AA84:0x5C7C,0xE6AAA2:0x5C7D,
0xE6AAA3:0x5C7E,0xE6AA97:0x5D21,0xE89897:0x5D22,0xE6AABB:0x5D23,0xE6AB83:0x5D24,
0xE6AB82:0x5D25,0xE6AAB8:0x5D26,0xE6AAB3:0x5D27,0xE6AAAC:0x5D28,0xE6AB9E:0x5D29,
0xE6AB91:0x5D2A,0xE6AB9F:0x5D2B,0xE6AAAA:0x5D2C,0xE6AB9A:0x5D2D,0xE6ABAA:0x5D2E,
0xE6ABBB:0x5D2F,0xE6AC85:0x5D30,0xE89896:0x5D31,0xE6ABBA:0x5D32,0xE6AC92:0x5D33,
0xE6AC96:0x5D34,0xE9ACB1:0x5D35,0xE6AC9F:0x5D36,0xE6ACB8:0x5D37,0xE6ACB7:0x5D38,
0xE79B9C:0x5D39,0xE6ACB9:0x5D3A,0xE9A3AE:0x5D3B,0xE6AD87:0x5D3C,0xE6AD83:0x5D3D,
0xE6AD89:0x5D3E,0xE6AD90:0x5D3F,0xE6AD99:0x5D40,0xE6AD94:0x5D41,0xE6AD9B:0x5D42,
0xE6AD9F:0x5D43,0xE6ADA1:0x5D44,0xE6ADB8:0x5D45,0xE6ADB9:0x5D46,0xE6ADBF:0x5D47,
0xE6AE80:0x5D48,0xE6AE84:0x5D49,0xE6AE83:0x5D4A,0xE6AE8D:0x5D4B,0xE6AE98:0x5D4C,
0xE6AE95:0x5D4D,0xE6AE9E:0x5D4E,0xE6AEA4:0x5D4F,0xE6AEAA:0x5D50,0xE6AEAB:0x5D51,
0xE6AEAF:0x5D52,0xE6AEB2:0x5D53,0xE6AEB1:0x5D54,0xE6AEB3:0x5D55,0xE6AEB7:0x5D56,
0xE6AEBC:0x5D57,0xE6AF86:0x5D58,0xE6AF8B:0x5D59,0xE6AF93:0x5D5A,0xE6AF9F:0x5D5B,
0xE6AFAC:0x5D5C,0xE6AFAB:0x5D5D,0xE6AFB3:0x5D5E,0xE6AFAF:0x5D5F,0xE9BABE:0x5D60,
0xE6B088:0x5D61,0xE6B093:0x5D62,0xE6B094:0x5D63,0xE6B09B:0x5D64,0xE6B0A4:0x5D65,
0xE6B0A3:0x5D66,0xE6B19E:0x5D67,0xE6B195:0x5D68,0xE6B1A2:0x5D69,0xE6B1AA:0x5D6A,
0xE6B282:0x5D6B,0xE6B28D:0x5D6C,0xE6B29A:0x5D6D,0xE6B281:0x5D6E,0xE6B29B:0x5D6F,
0xE6B1BE:0x5D70,0xE6B1A8:0x5D71,0xE6B1B3:0x5D72,0xE6B292:0x5D73,0xE6B290:0x5D74,
0xE6B384:0x5D75,0xE6B3B1:0x5D76,0xE6B393:0x5D77,0xE6B2BD:0x5D78,0xE6B397:0x5D79,
0xE6B385:0x5D7A,0xE6B39D:0x5D7B,0xE6B2AE:0x5D7C,0xE6B2B1:0x5D7D,0xE6B2BE:0x5D7E,
0xE6B2BA:0x5E21,0xE6B39B:0x5E22,0xE6B3AF:0x5E23,0xE6B399:0x5E24,0xE6B3AA:0x5E25,
0xE6B49F:0x5E26,0xE8A18D:0x5E27,0xE6B4B6:0x5E28,0xE6B4AB:0x5E29,0xE6B4BD:0x5E2A,
0xE6B4B8:0x5E2B,0xE6B499:0x5E2C,0xE6B4B5:0x5E2D,0xE6B4B3:0x5E2E,0xE6B492:0x5E2F,
0xE6B48C:0x5E30,0xE6B5A3:0x5E31,0xE6B693:0x5E32,0xE6B5A4:0x5E33,0xE6B59A:0x5E34,
0xE6B5B9:0x5E35,0xE6B599:0x5E36,0xE6B68E:0x5E37,0xE6B695:0x5E38,0xE6BFA4:0x5E39,
0xE6B685:0x5E3A,0xE6B7B9:0x5E3B,0xE6B895:0x5E3C,0xE6B88A:0x5E3D,0xE6B6B5:0x5E3E,
0xE6B787:0x5E3F,0xE6B7A6:0x5E40,0xE6B6B8:0x5E41,0xE6B786:0x5E42,0xE6B7AC:0x5E43,
0xE6B79E:0x5E44,0xE6B78C:0x5E45,0xE6B7A8:0x5E46,0xE6B792:0x5E47,0xE6B785:0x5E48,
0xE6B7BA:0x5E49,0xE6B799:0x5E4A,0xE6B7A4:0x5E4B,0xE6B795:0x5E4C,0xE6B7AA:0x5E4D,
0xE6B7AE:0x5E4E,0xE6B8AD:0x5E4F,0xE6B9AE:0x5E50,0xE6B8AE:0x5E51,0xE6B899:0x5E52,
0xE6B9B2:0x5E53,0xE6B99F:0x5E54,0xE6B8BE:0x5E55,0xE6B8A3:0x5E56,0xE6B9AB:0x5E57,
0xE6B8AB:0x5E58,0xE6B9B6:0x5E59,0xE6B98D:0x5E5A,0xE6B89F:0x5E5B,0xE6B983:0x5E5C,
0xE6B8BA:0x5E5D,0xE6B98E:0x5E5E,0xE6B8A4:0x5E5F,0xE6BBBF:0x5E60,0xE6B89D:0x5E61,
0xE6B8B8:0x5E62,0xE6BA82:0x5E63,0xE6BAAA:0x5E64,0xE6BA98:0x5E65,0xE6BB89:0x5E66,
0xE6BAB7:0x5E67,0xE6BB93:0x5E68,0xE6BABD:0x5E69,0xE6BAAF:0x5E6A,0xE6BB84:0x5E6B,
0xE6BAB2:0x5E6C,0xE6BB94:0x5E6D,0xE6BB95:0x5E6E,0xE6BA8F:0x5E6F,0xE6BAA5:0x5E70,
0xE6BB82:0x5E71,0xE6BA9F:0x5E72,0xE6BD81:0x5E73,0xE6BC91:0x5E74,0xE7818C:0x5E75,
0xE6BBAC:0x5E76,0xE6BBB8:0x5E77,0xE6BBBE:0x5E78,0xE6BCBF:0x5E79,0xE6BBB2:0x5E7A,
0xE6BCB1:0x5E7B,0xE6BBAF:0x5E7C,0xE6BCB2:0x5E7D,0xE6BB8C:0x5E7E,0xE6BCBE:0x5F21,
0xE6BC93:0x5F22,0xE6BBB7:0x5F23,0xE6BE86:0x5F24,0xE6BDBA:0x5F25,0xE6BDB8:0x5F26,
0xE6BE81:0x5F27,0xE6BE80:0x5F28,0xE6BDAF:0x5F29,0xE6BD9B:0x5F2A,0xE6BFB3:0x5F2B,
0xE6BDAD:0x5F2C,0xE6BE82:0x5F2D,0xE6BDBC:0x5F2E,0xE6BD98:0x5F2F,0xE6BE8E:0x5F30,
0xE6BE91:0x5F31,0xE6BF82:0x5F32,0xE6BDA6:0x5F33,0xE6BEB3:0x5F34,0xE6BEA3:0x5F35,
0xE6BEA1:0x5F36,0xE6BEA4:0x5F37,0xE6BEB9:0x5F38,0xE6BF86:0x5F39,0xE6BEAA:0x5F3A,
0xE6BF9F:0x5F3B,0xE6BF95:0x5F3C,0xE6BFAC:0x5F3D,0xE6BF94:0x5F3E,0xE6BF98:0x5F3F,
0xE6BFB1:0x5F40,0xE6BFAE:0x5F41,0xE6BF9B:0x5F42,0xE78089:0x5F43,0xE7808B:0x5F44,
0xE6BFBA:0x5F45,0xE78091:0x5F46,0xE78081:0x5F47,0xE7808F:0x5F48,0xE6BFBE:0x5F49,
0xE7809B:0x5F4A,0xE7809A:0x5F4B,0xE6BDB4:0x5F4C,0xE7809D:0x5F4D,0xE78098:0x5F4E,
0xE7809F:0x5F4F,0xE780B0:0x5F50,0xE780BE:0x5F51,0xE780B2:0x5F52,0xE78191:0x5F53,
0xE781A3:0x5F54,0xE78299:0x5F55,0xE78292:0x5F56,0xE782AF:0x5F57,0xE783B1:0x5F58,
0xE782AC:0x5F59,0xE782B8:0x5F5A,0xE782B3:0x5F5B,0xE782AE:0x5F5C,0xE7839F:0x5F5D,
0xE7838B:0x5F5E,0xE7839D:0x5F5F,0xE78399:0x5F60,0xE78489:0x5F61,0xE783BD:0x5F62,
0xE7849C:0x5F63,0xE78499:0x5F64,0xE785A5:0x5F65,0xE78595:0x5F66,0xE78688:0x5F67,
0xE785A6:0x5F68,0xE785A2:0x5F69,0xE7858C:0x5F6A,0xE78596:0x5F6B,0xE785AC:0x5F6C,
0xE7868F:0x5F6D,0xE787BB:0x5F6E,0xE78684:0x5F6F,0xE78695:0x5F70,0xE786A8:0x5F71,
0xE786AC:0x5F72,0xE78797:0x5F73,0xE786B9:0x5F74,0xE786BE:0x5F75,0xE78792:0x5F76,
0xE78789:0x5F77,0xE78794:0x5F78,0xE7878E:0x5F79,0xE787A0:0x5F7A,0xE787AC:0x5F7B,
0xE787A7:0x5F7C,0xE787B5:0x5F7D,0xE787BC:0x5F7E,0xE787B9:0x6021,0xE787BF:0x6022,
0xE7888D:0x6023,0xE78890:0x6024,0xE7889B:0x6025,0xE788A8:0x6026,0xE788AD:0x6027,
0xE788AC:0x6028,0xE788B0:0x6029,0xE788B2:0x602A,0xE788BB:0x602B,0xE788BC:0x602C,
0xE788BF:0x602D,0xE78980:0x602E,0xE78986:0x602F,0xE7898B:0x6030,0xE78998:0x6031,
0xE789B4:0x6032,0xE789BE:0x6033,0xE78A82:0x6034,0xE78A81:0x6035,0xE78A87:0x6036,
0xE78A92:0x6037,0xE78A96:0x6038,0xE78AA2:0x6039,0xE78AA7:0x603A,0xE78AB9:0x603B,
0xE78AB2:0x603C,0xE78B83:0x603D,0xE78B86:0x603E,0xE78B84:0x603F,0xE78B8E:0x6040,
0xE78B92:0x6041,0xE78BA2:0x6042,0xE78BA0:0x6043,0xE78BA1:0x6044,0xE78BB9:0x6045,
0xE78BB7:0x6046,0xE5808F:0x6047,0xE78C97:0x6048,0xE78C8A:0x6049,0xE78C9C:0x604A,
0xE78C96:0x604B,0xE78C9D:0x604C,0xE78CB4:0x604D,0xE78CAF:0x604E,0xE78CA9:0x604F,
0xE78CA5:0x6050,0xE78CBE:0x6051,0xE78D8E:0x6052,0xE78D8F:0x6053,0xE9BB98:0x6054,
0xE78D97:0x6055,0xE78DAA:0x6056,0xE78DA8:0x6057,0xE78DB0:0x6058,0xE78DB8:0x6059,
0xE78DB5:0x605A,0xE78DBB:0x605B,0xE78DBA:0x605C,0xE78F88:0x605D,0xE78EB3:0x605E,
0xE78F8E:0x605F,0xE78EBB:0x6060,0xE78F80:0x6061,0xE78FA5:0x6062,0xE78FAE:0x6063,
0xE78F9E:0x6064,0xE792A2:0x6065,0xE79085:0x6066,0xE791AF:0x6067,0xE790A5:0x6068,
0xE78FB8:0x6069,0xE790B2:0x606A,0xE790BA:0x606B,0xE79195:0x606C,0xE790BF:0x606D,
0xE7919F:0x606E,0xE79199:0x606F,0xE79181:0x6070,0xE7919C:0x6071,0xE791A9:0x6072,
0xE791B0:0x6073,0xE791A3:0x6074,0xE791AA:0x6075,0xE791B6:0x6076,0xE791BE:0x6077,
0xE7928B:0x6078,0xE7929E:0x6079,0xE792A7:0x607A,0xE7938A:0x607B,0xE7938F:0x607C,
0xE79394:0x607D,0xE78FB1:0x607E,0xE793A0:0x6121,0xE793A3:0x6122,0xE793A7:0x6123,
0xE793A9:0x6124,0xE793AE:0x6125,0xE793B2:0x6126,0xE793B0:0x6127,0xE793B1:0x6128,
0xE793B8:0x6129,0xE793B7:0x612A,0xE79484:0x612B,0xE79483:0x612C,0xE79485:0x612D,
0xE7948C:0x612E,0xE7948E:0x612F,0xE7948D:0x6130,0xE79495:0x6131,0xE79493:0x6132,
0xE7949E:0x6133,0xE794A6:0x6134,0xE794AC:0x6135,0xE794BC:0x6136,0xE79584:0x6137,
0xE7958D:0x6138,0xE7958A:0x6139,0xE79589:0x613A,0xE7959B:0x613B,0xE79586:0x613C,
0xE7959A:0x613D,0xE795A9:0x613E,0xE795A4:0x613F,0xE795A7:0x6140,0xE795AB:0x6141,
0xE795AD:0x6142,0xE795B8:0x6143,0xE795B6:0x6144,0xE79686:0x6145,0xE79687:0x6146,
0xE795B4:0x6147,0xE7968A:0x6148,0xE79689:0x6149,0xE79682:0x614A,0xE79694:0x614B,
0xE7969A:0x614C,0xE7969D:0x614D,0xE796A5:0x614E,0xE796A3:0x614F,0xE79782:0x6150,
0xE796B3:0x6151,0xE79783:0x6152,0xE796B5:0x6153,0xE796BD:0x6154,0xE796B8:0x6155,
0xE796BC:0x6156,0xE796B1:0x6157,0xE7978D:0x6158,0xE7978A:0x6159,0xE79792:0x615A,
0xE79799:0x615B,0xE797A3:0x615C,0xE7979E:0x615D,0xE797BE:0x615E,0xE797BF:0x615F,
0xE797BC:0x6160,0xE79881:0x6161,0xE797B0:0x6162,0xE797BA:0x6163,0xE797B2:0x6164,
0xE797B3:0x6165,0xE7988B:0x6166,0xE7988D:0x6167,0xE79889:0x6168,0xE7989F:0x6169,
0xE798A7:0x616A,0xE798A0:0x616B,0xE798A1:0x616C,0xE798A2:0x616D,0xE798A4:0x616E,
0xE798B4:0x616F,0xE798B0:0x6170,0xE798BB:0x6171,0xE79987:0x6172,0xE79988:0x6173,
0xE79986:0x6174,0xE7999C:0x6175,0xE79998:0x6176,0xE799A1:0x6177,0xE799A2:0x6178,
0xE799A8:0x6179,0xE799A9:0x617A,0xE799AA:0x617B,0xE799A7:0x617C,0xE799AC:0x617D,
0xE799B0:0x617E,0xE799B2:0x6221,0xE799B6:0x6222,0xE799B8:0x6223,0xE799BC:0x6224,
0xE79A80:0x6225,0xE79A83:0x6226,0xE79A88:0x6227,0xE79A8B:0x6228,0xE79A8E:0x6229,
0xE79A96:0x622A,0xE79A93:0x622B,0xE79A99:0x622C,0xE79A9A:0x622D,0xE79AB0:0x622E,
0xE79AB4:0x622F,0xE79AB8:0x6230,0xE79AB9:0x6231,0xE79ABA:0x6232,0xE79B82:0x6233,
0xE79B8D:0x6234,0xE79B96:0x6235,0xE79B92:0x6236,0xE79B9E:0x6237,0xE79BA1:0x6238,
0xE79BA5:0x6239,0xE79BA7:0x623A,0xE79BAA:0x623B,0xE898AF:0x623C,0xE79BBB:0x623D,
0xE79C88:0x623E,0xE79C87:0x623F,0xE79C84:0x6240,0xE79CA9:0x6241,0xE79CA4:0x6242,
0xE79C9E:0x6243,0xE79CA5:0x6244,0xE79CA6:0x6245,0xE79C9B:0x6246,0xE79CB7:0x6247,
0xE79CB8:0x6248,0xE79D87:0x6249,0xE79D9A:0x624A,0xE79DA8:0x624B,0xE79DAB:0x624C,
0xE79D9B:0x624D,0xE79DA5:0x624E,0xE79DBF:0x624F,0xE79DBE:0x6250,0xE79DB9:0x6251,
0xE79E8E:0x6252,0xE79E8B:0x6253,0xE79E91:0x6254,0xE79EA0:0x6255,0xE79E9E:0x6256,
0xE79EB0:0x6257,0xE79EB6:0x6258,0xE79EB9:0x6259,0xE79EBF:0x625A,0xE79EBC:0x625B,
0xE79EBD:0x625C,0xE79EBB:0x625D,0xE79F87:0x625E,0xE79F8D:0x625F,0xE79F97:0x6260,
0xE79F9A:0x6261,0xE79F9C:0x6262,0xE79FA3:0x6263,0xE79FAE:0x6264,0xE79FBC:0x6265,
0xE7A08C:0x6266,0xE7A092:0x6267,0xE7A4A6:0x6268,0xE7A0A0:0x6269,0xE7A4AA:0x626A,
0xE7A185:0x626B,0xE7A28E:0x626C,0xE7A1B4:0x626D,0xE7A286:0x626E,0xE7A1BC:0x626F,
0xE7A29A:0x6270,0xE7A28C:0x6271,0xE7A2A3:0x6272,0xE7A2B5:0x6273,0xE7A2AA:0x6274,
0xE7A2AF:0x6275,0xE7A391:0x6276,0xE7A386:0x6277,0xE7A38B:0x6278,0xE7A394:0x6279,
0xE7A2BE:0x627A,0xE7A2BC:0x627B,0xE7A385:0x627C,0xE7A38A:0x627D,0xE7A3AC:0x627E,
0xE7A3A7:0x6321,0xE7A39A:0x6322,0xE7A3BD:0x6323,0xE7A3B4:0x6324,0xE7A487:0x6325,
0xE7A492:0x6326,0xE7A491:0x6327,0xE7A499:0x6328,0xE7A4AC:0x6329,0xE7A4AB:0x632A,
0xE7A580:0x632B,0xE7A5A0:0x632C,0xE7A597:0x632D,0xE7A59F:0x632E,0xE7A59A:0x632F,
0xE7A595:0x6330,0xE7A593:0x6331,0xE7A5BA:0x6332,0xE7A5BF:0x6333,0xE7A68A:0x6334,
0xE7A69D:0x6335,0xE7A6A7:0x6336,0xE9BD8B:0x6337,0xE7A6AA:0x6338,0xE7A6AE:0x6339,
0xE7A6B3:0x633A,0xE7A6B9:0x633B,0xE7A6BA:0x633C,0xE7A789:0x633D,0xE7A795:0x633E,
0xE7A7A7:0x633F,0xE7A7AC:0x6340,0xE7A7A1:0x6341,0xE7A7A3:0x6342,0xE7A888:0x6343,
0xE7A88D:0x6344,0xE7A898:0x6345,0xE7A899:0x6346,0xE7A8A0:0x6347,0xE7A89F:0x6348,
0xE7A680:0x6349,0xE7A8B1:0x634A,0xE7A8BB:0x634B,0xE7A8BE:0x634C,0xE7A8B7:0x634D,
0xE7A983:0x634E,0xE7A997:0x634F,0xE7A989:0x6350,0xE7A9A1:0x6351,0xE7A9A2:0x6352,
0xE7A9A9:0x6353,0xE9BE9D:0x6354,0xE7A9B0:0x6355,0xE7A9B9:0x6356,0xE7A9BD:0x6357,
0xE7AA88:0x6358,0xE7AA97:0x6359,0xE7AA95:0x635A,0xE7AA98:0x635B,0xE7AA96:0x635C,
0xE7AAA9:0x635D,0xE7AB88:0x635E,0xE7AAB0:0x635F,0xE7AAB6:0x6360,0xE7AB85:0x6361,
0xE7AB84:0x6362,0xE7AABF:0x6363,0xE98283:0x6364,0xE7AB87:0x6365,0xE7AB8A:0x6366,
0xE7AB8D:0x6367,0xE7AB8F:0x6368,0xE7AB95:0x6369,0xE7AB93:0x636A,0xE7AB99:0x636B,
0xE7AB9A:0x636C,0xE7AB9D:0x636D,0xE7ABA1:0x636E,0xE7ABA2:0x636F,0xE7ABA6:0x6370,
0xE7ABAD:0x6371,0xE7ABB0:0x6372,0xE7AC82:0x6373,0xE7AC8F:0x6374,0xE7AC8A:0x6375,
0xE7AC86:0x6376,0xE7ACB3:0x6377,0xE7AC98:0x6378,0xE7AC99:0x6379,0xE7AC9E:0x637A,
0xE7ACB5:0x637B,0xE7ACA8:0x637C,0xE7ACB6:0x637D,0xE7AD90:0x637E,0xE7ADBA:0x6421,
0xE7AC84:0x6422,0xE7AD8D:0x6423,0xE7AC8B:0x6424,0xE7AD8C:0x6425,0xE7AD85:0x6426,
0xE7ADB5:0x6427,0xE7ADA5:0x6428,0xE7ADB4:0x6429,0xE7ADA7:0x642A,0xE7ADB0:0x642B,
0xE7ADB1:0x642C,0xE7ADAC:0x642D,0xE7ADAE:0x642E,0xE7AE9D:0x642F,0xE7AE98:0x6430,
0xE7AE9F:0x6431,0xE7AE8D:0x6432,0xE7AE9C:0x6433,0xE7AE9A:0x6434,0xE7AE8B:0x6435,
0xE7AE92:0x6436,0xE7AE8F:0x6437,0xE7AD9D:0x6438,0xE7AE99:0x6439,0xE7AF8B:0x643A,
0xE7AF81:0x643B,0xE7AF8C:0x643C,0xE7AF8F:0x643D,0xE7AEB4:0x643E,0xE7AF86:0x643F,
0xE7AF9D:0x6440,0xE7AFA9:0x6441,0xE7B091:0x6442,0xE7B094:0x6443,0xE7AFA6:0x6444,
0xE7AFA5:0x6445,0xE7B1A0:0x6446,0xE7B080:0x6447,0xE7B087:0x6448,0xE7B093:0x6449,
0xE7AFB3:0x644A,0xE7AFB7:0x644B,0xE7B097:0x644C,0xE7B08D:0x644D,0xE7AFB6:0x644E,
0xE7B0A3:0x644F,0xE7B0A7:0x6450,0xE7B0AA:0x6451,0xE7B09F:0x6452,0xE7B0B7:0x6453,
0xE7B0AB:0x6454,0xE7B0BD:0x6455,0xE7B18C:0x6456,0xE7B183:0x6457,0xE7B194:0x6458,
0xE7B18F:0x6459,0xE7B180:0x645A,0xE7B190:0x645B,0xE7B198:0x645C,0xE7B19F:0x645D,
0xE7B1A4:0x645E,0xE7B196:0x645F,0xE7B1A5:0x6460,0xE7B1AC:0x6461,0xE7B1B5:0x6462,
0xE7B283:0x6463,0xE7B290:0x6464,0xE7B2A4:0x6465,0xE7B2AD:0x6466,0xE7B2A2:0x6467,
0xE7B2AB:0x6468,0xE7B2A1:0x6469,0xE7B2A8:0x646A,0xE7B2B3:0x646B,0xE7B2B2:0x646C,
0xE7B2B1:0x646D,0xE7B2AE:0x646E,0xE7B2B9:0x646F,0xE7B2BD:0x6470,0xE7B380:0x6471,
0xE7B385:0x6472,0xE7B382:0x6473,0xE7B398:0x6474,0xE7B392:0x6475,0xE7B39C:0x6476,
0xE7B3A2:0x6477,0xE9ACBB:0x6478,0xE7B3AF:0x6479,0xE7B3B2:0x647A,0xE7B3B4:0x647B,
0xE7B3B6:0x647C,0xE7B3BA:0x647D,0xE7B486:0x647E,0xE7B482:0x6521,0xE7B49C:0x6522,
0xE7B495:0x6523,0xE7B48A:0x6524,0xE7B585:0x6525,0xE7B58B:0x6526,0xE7B4AE:0x6527,
0xE7B4B2:0x6528,0xE7B4BF:0x6529,0xE7B4B5:0x652A,0xE7B586:0x652B,0xE7B5B3:0x652C,
0xE7B596:0x652D,0xE7B58E:0x652E,0xE7B5B2:0x652F,0xE7B5A8:0x6530,0xE7B5AE:0x6531,
0xE7B58F:0x6532,0xE7B5A3:0x6533,0xE7B693:0x6534,0xE7B689:0x6535,0xE7B59B:0x6536,
0xE7B68F:0x6537,0xE7B5BD:0x6538,0xE7B69B:0x6539,0xE7B6BA:0x653A,0xE7B6AE:0x653B,
0xE7B6A3:0x653C,0xE7B6B5:0x653D,0xE7B787:0x653E,0xE7B6BD:0x653F,0xE7B6AB:0x6540,
0xE7B8BD:0x6541,0xE7B6A2:0x6542,0xE7B6AF:0x6543,0xE7B79C:0x6544,0xE7B6B8:0x6545,
0xE7B69F:0x6546,0xE7B6B0:0x6547,0xE7B798:0x6548,0xE7B79D:0x6549,0xE7B7A4:0x654A,
0xE7B79E:0x654B,0xE7B7BB:0x654C,0xE7B7B2:0x654D,0xE7B7A1:0x654E,0xE7B885:0x654F,
0xE7B88A:0x6550,0xE7B8A3:0x6551,0xE7B8A1:0x6552,0xE7B892:0x6553,0xE7B8B1:0x6554,
0xE7B89F:0x6555,0xE7B889:0x6556,0xE7B88B:0x6557,0xE7B8A2:0x6558,0xE7B986:0x6559,
0xE7B9A6:0x655A,0xE7B8BB:0x655B,0xE7B8B5:0x655C,0xE7B8B9:0x655D,0xE7B983:0x655E,
0xE7B8B7:0x655F,0xE7B8B2:0x6560,0xE7B8BA:0x6561,0xE7B9A7:0x6562,0xE7B99D:0x6563,
0xE7B996:0x6564,0xE7B99E:0x6565,0xE7B999:0x6566,0xE7B99A:0x6567,0xE7B9B9:0x6568,
0xE7B9AA:0x6569,0xE7B9A9:0x656A,0xE7B9BC:0x656B,0xE7B9BB:0x656C,0xE7BA83:0x656D,
0xE7B795:0x656E,0xE7B9BD:0x656F,0xE8BEAE:0x6570,0xE7B9BF:0x6571,0xE7BA88:0x6572,
0xE7BA89:0x6573,0xE7BA8C:0x6574,0xE7BA92:0x6575,0xE7BA90:0x6576,0xE7BA93:0x6577,
0xE7BA94:0x6578,0xE7BA96:0x6579,0xE7BA8E:0x657A,0xE7BA9B:0x657B,0xE7BA9C:0x657C,
0xE7BCB8:0x657D,0xE7BCBA:0x657E,0xE7BD85:0x6621,0xE7BD8C:0x6622,0xE7BD8D:0x6623,
0xE7BD8E:0x6624,0xE7BD90:0x6625,0xE7BD91:0x6626,0xE7BD95:0x6627,0xE7BD94:0x6628,
0xE7BD98:0x6629,0xE7BD9F:0x662A,0xE7BDA0:0x662B,0xE7BDA8:0x662C,0xE7BDA9:0x662D,
0xE7BDA7:0x662E,0xE7BDB8:0x662F,0xE7BE82:0x6630,0xE7BE86:0x6631,0xE7BE83:0x6632,
0xE7BE88:0x6633,0xE7BE87:0x6634,0xE7BE8C:0x6635,0xE7BE94:0x6636,0xE7BE9E:0x6637,
0xE7BE9D:0x6638,0xE7BE9A:0x6639,0xE7BEA3:0x663A,0xE7BEAF:0x663B,0xE7BEB2:0x663C,
0xE7BEB9:0x663D,0xE7BEAE:0x663E,0xE7BEB6:0x663F,0xE7BEB8:0x6640,0xE8ADB1:0x6641,
0xE7BF85:0x6642,0xE7BF86:0x6643,0xE7BF8A:0x6644,0xE7BF95:0x6645,0xE7BF94:0x6646,
0xE7BFA1:0x6647,0xE7BFA6:0x6648,0xE7BFA9:0x6649,0xE7BFB3:0x664A,0xE7BFB9:0x664B,
0xE9A39C:0x664C,0xE88086:0x664D,0xE88084:0x664E,0xE8808B:0x664F,0xE88092:0x6650,
0xE88098:0x6651,0xE88099:0x6652,0xE8809C:0x6653,0xE880A1:0x6654,0xE880A8:0x6655,
0xE880BF:0x6656,0xE880BB:0x6657,0xE8818A:0x6658,0xE88186:0x6659,0xE88192:0x665A,
0xE88198:0x665B,0xE8819A:0x665C,0xE8819F:0x665D,0xE881A2:0x665E,0xE881A8:0x665F,
0xE881B3:0x6660,0xE881B2:0x6661,0xE881B0:0x6662,0xE881B6:0x6663,0xE881B9:0x6664,
0xE881BD:0x6665,0xE881BF:0x6666,0xE88284:0x6667,0xE88286:0x6668,0xE88285:0x6669,
0xE8829B:0x666A,0xE88293:0x666B,0xE8829A:0x666C,0xE882AD:0x666D,0xE58690:0x666E,
0xE882AC:0x666F,0xE8839B:0x6670,0xE883A5:0x6671,0xE88399:0x6672,0xE8839D:0x6673,
0xE88384:0x6674,0xE8839A:0x6675,0xE88396:0x6676,0xE88489:0x6677,0xE883AF:0x6678,
0xE883B1:0x6679,0xE8849B:0x667A,0xE884A9:0x667B,0xE884A3:0x667C,0xE884AF:0x667D,
0xE8858B:0x667E,0xE99A8B:0x6721,0xE88586:0x6722,0xE884BE:0x6723,0xE88593:0x6724,
0xE88591:0x6725,0xE883BC:0x6726,0xE885B1:0x6727,0xE885AE:0x6728,0xE885A5:0x6729,
0xE885A6:0x672A,0xE885B4:0x672B,0xE88683:0x672C,0xE88688:0x672D,0xE8868A:0x672E,
0xE88680:0x672F,0xE88682:0x6730,0xE886A0:0x6731,0xE88695:0x6732,0xE886A4:0x6733,
0xE886A3:0x6734,0xE8859F:0x6735,0xE88693:0x6736,0xE886A9:0x6737,0xE886B0:0x6738,
0xE886B5:0x6739,0xE886BE:0x673A,0xE886B8:0x673B,0xE886BD:0x673C,0xE88780:0x673D,
0xE88782:0x673E,0xE886BA:0x673F,0xE88789:0x6740,0xE8878D:0x6741,0xE88791:0x6742,
0xE88799:0x6743,0xE88798:0x6744,0xE88788:0x6745,0xE8879A:0x6746,0xE8879F:0x6747,
0xE887A0:0x6748,0xE887A7:0x6749,0xE887BA:0x674A,0xE887BB:0x674B,0xE887BE:0x674C,
0xE88881:0x674D,0xE88882:0x674E,0xE88885:0x674F,0xE88887:0x6750,0xE8888A:0x6751,
0xE8888D:0x6752,0xE88890:0x6753,0xE88896:0x6754,0xE888A9:0x6755,0xE888AB:0x6756,
0xE888B8:0x6757,0xE888B3:0x6758,0xE88980:0x6759,0xE88999:0x675A,0xE88998:0x675B,
0xE8899D:0x675C,0xE8899A:0x675D,0xE8899F:0x675E,0xE889A4:0x675F,0xE889A2:0x6760,
0xE889A8:0x6761,0xE889AA:0x6762,0xE889AB:0x6763,0xE888AE:0x6764,0xE889B1:0x6765,
0xE889B7:0x6766,0xE889B8:0x6767,0xE889BE:0x6768,0xE88A8D:0x6769,0xE88A92:0x676A,
0xE88AAB:0x676B,0xE88A9F:0x676C,0xE88ABB:0x676D,0xE88AAC:0x676E,0xE88BA1:0x676F,
0xE88BA3:0x6770,0xE88B9F:0x6771,0xE88B92:0x6772,0xE88BB4:0x6773,0xE88BB3:0x6774,
0xE88BBA:0x6775,0xE88E93:0x6776,0xE88C83:0x6777,0xE88BBB:0x6778,0xE88BB9:0x6779,
0xE88B9E:0x677A,0xE88C86:0x677B,0xE88B9C:0x677C,0xE88C89:0x677D,0xE88B99:0x677E,
0xE88CB5:0x6821,0xE88CB4:0x6822,0xE88C96:0x6823,0xE88CB2:0x6824,0xE88CB1:0x6825,
0xE88D80:0x6826,0xE88CB9:0x6827,0xE88D90:0x6828,0xE88D85:0x6829,0xE88CAF:0x682A,
0xE88CAB:0x682B,0xE88C97:0x682C,0xE88C98:0x682D,0xE88E85:0x682E,0xE88E9A:0x682F,
0xE88EAA:0x6830,0xE88E9F:0x6831,0xE88EA2:0x6832,0xE88E96:0x6833,0xE88CA3:0x6834,
0xE88E8E:0x6835,0xE88E87:0x6836,0xE88E8A:0x6837,0xE88DBC:0x6838,0xE88EB5:0x6839,
0xE88DB3:0x683A,0xE88DB5:0x683B,0xE88EA0:0x683C,0xE88E89:0x683D,0xE88EA8:0x683E,
0xE88FB4:0x683F,0xE89093:0x6840,0xE88FAB:0x6841,0xE88F8E:0x6842,0xE88FBD:0x6843,
0xE89083:0x6844,0xE88F98:0x6845,0xE8908B:0x6846,0xE88F81:0x6847,0xE88FB7:0x6848,
0xE89087:0x6849,0xE88FA0:0x684A,0xE88FB2:0x684B,0xE8908D:0x684C,0xE890A2:0x684D,
0xE890A0:0x684E,0xE88EBD:0x684F,0xE890B8:0x6850,0xE89486:0x6851,0xE88FBB:0x6852,
0xE891AD:0x6853,0xE890AA:0x6854,0xE890BC:0x6855,0xE8959A:0x6856,0xE89284:0x6857,
0xE891B7:0x6858,0xE891AB:0x6859,0xE892AD:0x685A,0xE891AE:0x685B,0xE89282:0x685C,
0xE891A9:0x685D,0xE89186:0x685E,0xE890AC:0x685F,0xE891AF:0x6860,0xE891B9:0x6861,
0xE890B5:0x6862,0xE8938A:0x6863,0xE891A2:0x6864,0xE892B9:0x6865,0xE892BF:0x6866,
0xE8929F:0x6867,0xE89399:0x6868,0xE8938D:0x6869,0xE892BB:0x686A,0xE8939A:0x686B,
0xE89390:0x686C,0xE89381:0x686D,0xE89386:0x686E,0xE89396:0x686F,0xE892A1:0x6870,
0xE894A1:0x6871,0xE893BF:0x6872,0xE893B4:0x6873,0xE89497:0x6874,0xE89498:0x6875,
0xE894AC:0x6876,0xE8949F:0x6877,0xE89495:0x6878,0xE89494:0x6879,0xE893BC:0x687A,
0xE89580:0x687B,0xE895A3:0x687C,0xE89598:0x687D,0xE89588:0x687E,0xE89581:0x6921,
0xE89882:0x6922,0xE8958B:0x6923,0xE89595:0x6924,0xE89680:0x6925,0xE896A4:0x6926,
0xE89688:0x6927,0xE89691:0x6928,0xE8968A:0x6929,0xE896A8:0x692A,0xE895AD:0x692B,
0xE89694:0x692C,0xE8969B:0x692D,0xE897AA:0x692E,0xE89687:0x692F,0xE8969C:0x6930,
0xE895B7:0x6931,0xE895BE:0x6932,0xE89690:0x6933,0xE89789:0x6934,0xE896BA:0x6935,
0xE8978F:0x6936,0xE896B9:0x6937,0xE89790:0x6938,0xE89795:0x6939,0xE8979D:0x693A,
0xE897A5:0x693B,0xE8979C:0x693C,0xE897B9:0x693D,0xE8988A:0x693E,0xE89893:0x693F,
0xE8988B:0x6940,0xE897BE:0x6941,0xE897BA:0x6942,0xE89886:0x6943,0xE898A2:0x6944,
0xE8989A:0x6945,0xE898B0:0x6946,0xE898BF:0x6947,0xE8998D:0x6948,0xE4B995:0x6949,
0xE89994:0x694A,0xE8999F:0x694B,0xE899A7:0x694C,0xE899B1:0x694D,0xE89A93:0x694E,
0xE89AA3:0x694F,0xE89AA9:0x6950,0xE89AAA:0x6951,0xE89A8B:0x6952,0xE89A8C:0x6953,
0xE89AB6:0x6954,0xE89AAF:0x6955,0xE89B84:0x6956,0xE89B86:0x6957,0xE89AB0:0x6958,
0xE89B89:0x6959,0xE8A0A3:0x695A,0xE89AAB:0x695B,0xE89B94:0x695C,0xE89B9E:0x695D,
0xE89BA9:0x695E,0xE89BAC:0x695F,0xE89B9F:0x6960,0xE89B9B:0x6961,0xE89BAF:0x6962,
0xE89C92:0x6963,0xE89C86:0x6964,0xE89C88:0x6965,0xE89C80:0x6966,0xE89C83:0x6967,
0xE89BBB:0x6968,0xE89C91:0x6969,0xE89C89:0x696A,0xE89C8D:0x696B,0xE89BB9:0x696C,
0xE89C8A:0x696D,0xE89CB4:0x696E,0xE89CBF:0x696F,0xE89CB7:0x6970,0xE89CBB:0x6971,
0xE89CA5:0x6972,0xE89CA9:0x6973,0xE89C9A:0x6974,0xE89DA0:0x6975,0xE89D9F:0x6976,
0xE89DB8:0x6977,0xE89D8C:0x6978,0xE89D8E:0x6979,0xE89DB4:0x697A,0xE89D97:0x697B,
0xE89DA8:0x697C,0xE89DAE:0x697D,0xE89D99:0x697E,0xE89D93:0x6A21,0xE89DA3:0x6A22,
0xE89DAA:0x6A23,0xE8A085:0x6A24,0xE89EA2:0x6A25,0xE89E9F:0x6A26,0xE89E82:0x6A27,
0xE89EAF:0x6A28,0xE89F8B:0x6A29,0xE89EBD:0x6A2A,0xE89F80:0x6A2B,0xE89F90:0x6A2C,
0xE99B96:0x6A2D,0xE89EAB:0x6A2E,0xE89F84:0x6A2F,0xE89EB3:0x6A30,0xE89F87:0x6A31,
0xE89F86:0x6A32,0xE89EBB:0x6A33,0xE89FAF:0x6A34,0xE89FB2:0x6A35,0xE89FA0:0x6A36,
0xE8A08F:0x6A37,0xE8A08D:0x6A38,0xE89FBE:0x6A39,0xE89FB6:0x6A3A,0xE89FB7:0x6A3B,
0xE8A08E:0x6A3C,0xE89F92:0x6A3D,0xE8A091:0x6A3E,0xE8A096:0x6A3F,0xE8A095:0x6A40,
0xE8A0A2:0x6A41,0xE8A0A1:0x6A42,0xE8A0B1:0x6A43,0xE8A0B6:0x6A44,0xE8A0B9:0x6A45,
0xE8A0A7:0x6A46,0xE8A0BB:0x6A47,0xE8A184:0x6A48,0xE8A182:0x6A49,0xE8A192:0x6A4A,
0xE8A199:0x6A4B,0xE8A19E:0x6A4C,0xE8A1A2:0x6A4D,0xE8A1AB:0x6A4E,0xE8A281:0x6A4F,
0xE8A1BE:0x6A50,0xE8A29E:0x6A51,0xE8A1B5:0x6A52,0xE8A1BD:0x6A53,0xE8A2B5:0x6A54,
0xE8A1B2:0x6A55,0xE8A282:0x6A56,0xE8A297:0x6A57,0xE8A292:0x6A58,0xE8A2AE:0x6A59,
0xE8A299:0x6A5A,0xE8A2A2:0x6A5B,0xE8A28D:0x6A5C,0xE8A2A4:0x6A5D,0xE8A2B0:0x6A5E,
0xE8A2BF:0x6A5F,0xE8A2B1:0x6A60,0xE8A383:0x6A61,0xE8A384:0x6A62,0xE8A394:0x6A63,
0xE8A398:0x6A64,0xE8A399:0x6A65,0xE8A39D:0x6A66,0xE8A3B9:0x6A67,0xE8A482:0x6A68,
0xE8A3BC:0x6A69,0xE8A3B4:0x6A6A,0xE8A3A8:0x6A6B,0xE8A3B2:0x6A6C,0xE8A484:0x6A6D,
0xE8A48C:0x6A6E,0xE8A48A:0x6A6F,0xE8A493:0x6A70,0xE8A583:0x6A71,0xE8A49E:0x6A72,
0xE8A4A5:0x6A73,0xE8A4AA:0x6A74,0xE8A4AB:0x6A75,0xE8A581:0x6A76,0xE8A584:0x6A77,
0xE8A4BB:0x6A78,0xE8A4B6:0x6A79,0xE8A4B8:0x6A7A,0xE8A58C:0x6A7B,0xE8A49D:0x6A7C,
0xE8A5A0:0x6A7D,0xE8A59E:0x6A7E,0xE8A5A6:0x6B21,0xE8A5A4:0x6B22,0xE8A5AD:0x6B23,
0xE8A5AA:0x6B24,0xE8A5AF:0x6B25,0xE8A5B4:0x6B26,0xE8A5B7:0x6B27,0xE8A5BE:0x6B28,
0xE8A683:0x6B29,0xE8A688:0x6B2A,0xE8A68A:0x6B2B,0xE8A693:0x6B2C,0xE8A698:0x6B2D,
0xE8A6A1:0x6B2E,0xE8A6A9:0x6B2F,0xE8A6A6:0x6B30,0xE8A6AC:0x6B31,0xE8A6AF:0x6B32,
0xE8A6B2:0x6B33,0xE8A6BA:0x6B34,0xE8A6BD:0x6B35,0xE8A6BF:0x6B36,0xE8A780:0x6B37,
0xE8A79A:0x6B38,0xE8A79C:0x6B39,0xE8A79D:0x6B3A,0xE8A7A7:0x6B3B,0xE8A7B4:0x6B3C,
0xE8A7B8:0x6B3D,0xE8A883:0x6B3E,0xE8A896:0x6B3F,0xE8A890:0x6B40,0xE8A88C:0x6B41,
0xE8A89B:0x6B42,0xE8A89D:0x6B43,0xE8A8A5:0x6B44,0xE8A8B6:0x6B45,0xE8A981:0x6B46,
0xE8A99B:0x6B47,0xE8A992:0x6B48,0xE8A986:0x6B49,0xE8A988:0x6B4A,0xE8A9BC:0x6B4B,
0xE8A9AD:0x6B4C,0xE8A9AC:0x6B4D,0xE8A9A2:0x6B4E,0xE8AA85:0x6B4F,0xE8AA82:0x6B50,
0xE8AA84:0x6B51,0xE8AAA8:0x6B52,0xE8AAA1:0x6B53,0xE8AA91:0x6B54,0xE8AAA5:0x6B55,
0xE8AAA6:0x6B56,0xE8AA9A:0x6B57,0xE8AAA3:0x6B58,0xE8AB84:0x6B59,0xE8AB8D:0x6B5A,
0xE8AB82:0x6B5B,0xE8AB9A:0x6B5C,0xE8ABAB:0x6B5D,0xE8ABB3:0x6B5E,0xE8ABA7:0x6B5F,
0xE8ABA4:0x6B60,0xE8ABB1:0x6B61,0xE8AC94:0x6B62,0xE8ABA0:0x6B63,0xE8ABA2:0x6B64,
0xE8ABB7:0x6B65,0xE8AB9E:0x6B66,0xE8AB9B:0x6B67,0xE8AC8C:0x6B68,0xE8AC87:0x6B69,
0xE8AC9A:0x6B6A,0xE8ABA1:0x6B6B,0xE8AC96:0x6B6C,0xE8AC90:0x6B6D,0xE8AC97:0x6B6E,
0xE8ACA0:0x6B6F,0xE8ACB3:0x6B70,0xE99EAB:0x6B71,0xE8ACA6:0x6B72,0xE8ACAB:0x6B73,
0xE8ACBE:0x6B74,0xE8ACA8:0x6B75,0xE8AD81:0x6B76,0xE8AD8C:0x6B77,0xE8AD8F:0x6B78,
0xE8AD8E:0x6B79,0xE8AD89:0x6B7A,0xE8AD96:0x6B7B,0xE8AD9B:0x6B7C,0xE8AD9A:0x6B7D,
0xE8ADAB:0x6B7E,0xE8AD9F:0x6C21,0xE8ADAC:0x6C22,0xE8ADAF:0x6C23,0xE8ADB4:0x6C24,
0xE8ADBD:0x6C25,0xE8AE80:0x6C26,0xE8AE8C:0x6C27,0xE8AE8E:0x6C28,0xE8AE92:0x6C29,
0xE8AE93:0x6C2A,0xE8AE96:0x6C2B,0xE8AE99:0x6C2C,0xE8AE9A:0x6C2D,0xE8B0BA:0x6C2E,
0xE8B181:0x6C2F,0xE8B0BF:0x6C30,0xE8B188:0x6C31,0xE8B18C:0x6C32,0xE8B18E:0x6C33,
0xE8B190:0x6C34,0xE8B195:0x6C35,0xE8B1A2:0x6C36,0xE8B1AC:0x6C37,0xE8B1B8:0x6C38,
0xE8B1BA:0x6C39,0xE8B282:0x6C3A,0xE8B289:0x6C3B,0xE8B285:0x6C3C,0xE8B28A:0x6C3D,
0xE8B28D:0x6C3E,0xE8B28E:0x6C3F,0xE8B294:0x6C40,0xE8B1BC:0x6C41,0xE8B298:0x6C42,
0xE6889D:0x6C43,0xE8B2AD:0x6C44,0xE8B2AA:0x6C45,0xE8B2BD:0x6C46,0xE8B2B2:0x6C47,
0xE8B2B3:0x6C48,0xE8B2AE:0x6C49,0xE8B2B6:0x6C4A,0xE8B388:0x6C4B,0xE8B381:0x6C4C,
0xE8B3A4:0x6C4D,0xE8B3A3:0x6C4E,0xE8B39A:0x6C4F,0xE8B3BD:0x6C50,0xE8B3BA:0x6C51,
0xE8B3BB:0x6C52,0xE8B484:0x6C53,0xE8B485:0x6C54,0xE8B48A:0x6C55,0xE8B487:0x6C56,
0xE8B48F:0x6C57,0xE8B48D:0x6C58,0xE8B490:0x6C59,0xE9BD8E:0x6C5A,0xE8B493:0x6C5B,
0xE8B38D:0x6C5C,0xE8B494:0x6C5D,0xE8B496:0x6C5E,0xE8B5A7:0x6C5F,0xE8B5AD:0x6C60,
0xE8B5B1:0x6C61,0xE8B5B3:0x6C62,0xE8B681:0x6C63,0xE8B699:0x6C64,0xE8B782:0x6C65,
0xE8B6BE:0x6C66,0xE8B6BA:0x6C67,0xE8B78F:0x6C68,0xE8B79A:0x6C69,0xE8B796:0x6C6A,
0xE8B78C:0x6C6B,0xE8B79B:0x6C6C,0xE8B78B:0x6C6D,0xE8B7AA:0x6C6E,0xE8B7AB:0x6C6F,
0xE8B79F:0x6C70,0xE8B7A3:0x6C71,0xE8B7BC:0x6C72,0xE8B888:0x6C73,0xE8B889:0x6C74,
0xE8B7BF:0x6C75,0xE8B89D:0x6C76,0xE8B89E:0x6C77,0xE8B890:0x6C78,0xE8B89F:0x6C79,
0xE8B982:0x6C7A,0xE8B8B5:0x6C7B,0xE8B8B0:0x6C7C,0xE8B8B4:0x6C7D,0xE8B98A:0x6C7E,
0xE8B987:0x6D21,0xE8B989:0x6D22,0xE8B98C:0x6D23,0xE8B990:0x6D24,0xE8B988:0x6D25,
0xE8B999:0x6D26,0xE8B9A4:0x6D27,0xE8B9A0:0x6D28,0xE8B8AA:0x6D29,0xE8B9A3:0x6D2A,
0xE8B995:0x6D2B,0xE8B9B6:0x6D2C,0xE8B9B2:0x6D2D,0xE8B9BC:0x6D2E,0xE8BA81:0x6D2F,
0xE8BA87:0x6D30,0xE8BA85:0x6D31,0xE8BA84:0x6D32,0xE8BA8B:0x6D33,0xE8BA8A:0x6D34,
0xE8BA93:0x6D35,0xE8BA91:0x6D36,0xE8BA94:0x6D37,0xE8BA99:0x6D38,0xE8BAAA:0x6D39,
0xE8BAA1:0x6D3A,0xE8BAAC:0x6D3B,0xE8BAB0:0x6D3C,0xE8BB86:0x6D3D,0xE8BAB1:0x6D3E,
0xE8BABE:0x6D3F,0xE8BB85:0x6D40,0xE8BB88:0x6D41,0xE8BB8B:0x6D42,0xE8BB9B:0x6D43,
0xE8BBA3:0x6D44,0xE8BBBC:0x6D45,0xE8BBBB:0x6D46,0xE8BBAB:0x6D47,0xE8BBBE:0x6D48,
0xE8BC8A:0x6D49,0xE8BC85:0x6D4A,0xE8BC95:0x6D4B,0xE8BC92:0x6D4C,0xE8BC99:0x6D4D,
0xE8BC93:0x6D4E,0xE8BC9C:0x6D4F,0xE8BC9F:0x6D50,0xE8BC9B:0x6D51,0xE8BC8C:0x6D52,
0xE8BCA6:0x6D53,0xE8BCB3:0x6D54,0xE8BCBB:0x6D55,0xE8BCB9:0x6D56,0xE8BD85:0x6D57,
0xE8BD82:0x6D58,0xE8BCBE:0x6D59,0xE8BD8C:0x6D5A,0xE8BD89:0x6D5B,0xE8BD86:0x6D5C,
0xE8BD8E:0x6D5D,0xE8BD97:0x6D5E,0xE8BD9C:0x6D5F,0xE8BDA2:0x6D60,0xE8BDA3:0x6D61,
0xE8BDA4:0x6D62,0xE8BE9C:0x6D63,0xE8BE9F:0x6D64,0xE8BEA3:0x6D65,0xE8BEAD:0x6D66,
0xE8BEAF:0x6D67,0xE8BEB7:0x6D68,0xE8BF9A:0x6D69,0xE8BFA5:0x6D6A,0xE8BFA2:0x6D6B,
0xE8BFAA:0x6D6C,0xE8BFAF:0x6D6D,0xE98287:0x6D6E,0xE8BFB4:0x6D6F,0xE98085:0x6D70,
0xE8BFB9:0x6D71,0xE8BFBA:0x6D72,0xE98091:0x6D73,0xE98095:0x6D74,0xE980A1:0x6D75,
0xE9808D:0x6D76,0xE9809E:0x6D77,0xE98096:0x6D78,0xE9808B:0x6D79,0xE980A7:0x6D7A,
0xE980B6:0x6D7B,0xE980B5:0x6D7C,0xE980B9:0x6D7D,0xE8BFB8:0x6D7E,0xE9818F:0x6E21,
0xE98190:0x6E22,0xE98191:0x6E23,0xE98192:0x6E24,0xE9808E:0x6E25,0xE98189:0x6E26,
0xE980BE:0x6E27,0xE98196:0x6E28,0xE98198:0x6E29,0xE9819E:0x6E2A,0xE981A8:0x6E2B,
0xE981AF:0x6E2C,0xE981B6:0x6E2D,0xE99AA8:0x6E2E,0xE981B2:0x6E2F,0xE98282:0x6E30,
0xE981BD:0x6E31,0xE98281:0x6E32,0xE98280:0x6E33,0xE9828A:0x6E34,0xE98289:0x6E35,
0xE9828F:0x6E36,0xE982A8:0x6E37,0xE982AF:0x6E38,0xE982B1:0x6E39,0xE982B5:0x6E3A,
0xE983A2:0x6E3B,0xE983A4:0x6E3C,0xE68988:0x6E3D,0xE9839B:0x6E3E,0xE98482:0x6E3F,
0xE98492:0x6E40,0xE98499:0x6E41,0xE984B2:0x6E42,0xE984B0:0x6E43,0xE9858A:0x6E44,
0xE98596:0x6E45,0xE98598:0x6E46,0xE985A3:0x6E47,0xE985A5:0x6E48,0xE985A9:0x6E49,
0xE985B3:0x6E4A,0xE985B2:0x6E4B,0xE9868B:0x6E4C,0xE98689:0x6E4D,0xE98682:0x6E4E,
0xE986A2:0x6E4F,0xE986AB:0x6E50,0xE986AF:0x6E51,0xE986AA:0x6E52,0xE986B5:0x6E53,
0xE986B4:0x6E54,0xE986BA:0x6E55,0xE98780:0x6E56,0xE98781:0x6E57,0xE98789:0x6E58,
0xE9878B:0x6E59,0xE98790:0x6E5A,0xE98796:0x6E5B,0xE9879F:0x6E5C,0xE987A1:0x6E5D,
0xE9879B:0x6E5E,0xE987BC:0x6E5F,0xE987B5:0x6E60,0xE987B6:0x6E61,0xE9889E:0x6E62,
0xE987BF:0x6E63,0xE98894:0x6E64,0xE988AC:0x6E65,0xE98895:0x6E66,0xE98891:0x6E67,
0xE9899E:0x6E68,0xE98997:0x6E69,0xE98985:0x6E6A,0xE98989:0x6E6B,0xE989A4:0x6E6C,
0xE98988:0x6E6D,0xE98A95:0x6E6E,0xE988BF:0x6E6F,0xE9898B:0x6E70,0xE98990:0x6E71,
0xE98A9C:0x6E72,0xE98A96:0x6E73,0xE98A93:0x6E74,0xE98A9B:0x6E75,0xE9899A:0x6E76,
0xE98B8F:0x6E77,0xE98AB9:0x6E78,0xE98AB7:0x6E79,0xE98BA9:0x6E7A,0xE98C8F:0x6E7B,
0xE98BBA:0x6E7C,0xE98D84:0x6E7D,0xE98CAE:0x6E7E,0xE98C99:0x6F21,0xE98CA2:0x6F22,
0xE98C9A:0x6F23,0xE98CA3:0x6F24,0xE98CBA:0x6F25,0xE98CB5:0x6F26,0xE98CBB:0x6F27,
0xE98D9C:0x6F28,0xE98DA0:0x6F29,0xE98DBC:0x6F2A,0xE98DAE:0x6F2B,0xE98D96:0x6F2C,
0xE98EB0:0x6F2D,0xE98EAC:0x6F2E,0xE98EAD:0x6F2F,0xE98E94:0x6F30,0xE98EB9:0x6F31,
0xE98F96:0x6F32,0xE98F97:0x6F33,0xE98FA8:0x6F34,0xE98FA5:0x6F35,0xE98F98:0x6F36,
0xE98F83:0x6F37,0xE98F9D:0x6F38,0xE98F90:0x6F39,0xE98F88:0x6F3A,0xE98FA4:0x6F3B,
0xE9909A:0x6F3C,0xE99094:0x6F3D,0xE99093:0x6F3E,0xE99083:0x6F3F,0xE99087:0x6F40,
0xE99090:0x6F41,0xE990B6:0x6F42,0xE990AB:0x6F43,0xE990B5:0x6F44,0xE990A1:0x6F45,
0xE990BA:0x6F46,0xE99181:0x6F47,0xE99192:0x6F48,0xE99184:0x6F49,0xE9919B:0x6F4A,
0xE991A0:0x6F4B,0xE991A2:0x6F4C,0xE9919E:0x6F4D,0xE991AA:0x6F4E,0xE988A9:0x6F4F,
0xE991B0:0x6F50,0xE991B5:0x6F51,0xE991B7:0x6F52,0xE991BD:0x6F53,0xE9919A:0x6F54,
0xE991BC:0x6F55,0xE991BE:0x6F56,0xE99281:0x6F57,0xE991BF:0x6F58,0xE99682:0x6F59,
0xE99687:0x6F5A,0xE9968A:0x6F5B,0xE99694:0x6F5C,0xE99696:0x6F5D,0xE99698:0x6F5E,
0xE99699:0x6F5F,0xE996A0:0x6F60,0xE996A8:0x6F61,0xE996A7:0x6F62,0xE996AD:0x6F63,
0xE996BC:0x6F64,0xE996BB:0x6F65,0xE996B9:0x6F66,0xE996BE:0x6F67,0xE9978A:0x6F68,
0xE6BFB6:0x6F69,0xE99783:0x6F6A,0xE9978D:0x6F6B,0xE9978C:0x6F6C,0xE99795:0x6F6D,
0xE99794:0x6F6E,0xE99796:0x6F6F,0xE9979C:0x6F70,0xE997A1:0x6F71,0xE997A5:0x6F72,
0xE997A2:0x6F73,0xE998A1:0x6F74,0xE998A8:0x6F75,0xE998AE:0x6F76,0xE998AF:0x6F77,
0xE99982:0x6F78,0xE9998C:0x6F79,0xE9998F:0x6F7A,0xE9998B:0x6F7B,0xE999B7:0x6F7C,
0xE9999C:0x6F7D,0xE9999E:0x6F7E,0xE9999D:0x7021,0xE9999F:0x7022,0xE999A6:0x7023,
0xE999B2:0x7024,0xE999AC:0x7025,0xE99A8D:0x7026,0xE99A98:0x7027,0xE99A95:0x7028,
0xE99A97:0x7029,0xE99AAA:0x702A,0xE99AA7:0x702B,0xE99AB1:0x702C,0xE99AB2:0x702D,
0xE99AB0:0x702E,0xE99AB4:0x702F,0xE99AB6:0x7030,0xE99AB8:0x7031,0xE99AB9:0x7032,
0xE99B8E:0x7033,0xE99B8B:0x7034,0xE99B89:0x7035,0xE99B8D:0x7036,0xE8A58D:0x7037,
0xE99B9C:0x7038,0xE99C8D:0x7039,0xE99B95:0x703A,0xE99BB9:0x703B,0xE99C84:0x703C,
0xE99C86:0x703D,0xE99C88:0x703E,0xE99C93:0x703F,0xE99C8E:0x7040,0xE99C91:0x7041,
0xE99C8F:0x7042,0xE99C96:0x7043,0xE99C99:0x7044,0xE99CA4:0x7045,0xE99CAA:0x7046,
0xE99CB0:0x7047,0xE99CB9:0x7048,0xE99CBD:0x7049,0xE99CBE:0x704A,0xE99D84:0x704B,
0xE99D86:0x704C,0xE99D88:0x704D,0xE99D82:0x704E,0xE99D89:0x704F,0xE99D9C:0x7050,
0xE99DA0:0x7051,0xE99DA4:0x7052,0xE99DA6:0x7053,0xE99DA8:0x7054,0xE58B92:0x7055,
0xE99DAB:0x7056,0xE99DB1:0x7057,0xE99DB9:0x7058,0xE99E85:0x7059,0xE99DBC:0x705A,
0xE99E81:0x705B,0xE99DBA:0x705C,0xE99E86:0x705D,0xE99E8B:0x705E,0xE99E8F:0x705F,
0xE99E90:0x7060,0xE99E9C:0x7061,0xE99EA8:0x7062,0xE99EA6:0x7063,0xE99EA3:0x7064,
0xE99EB3:0x7065,0xE99EB4:0x7066,0xE99F83:0x7067,0xE99F86:0x7068,0xE99F88:0x7069,
0xE99F8B:0x706A,0xE99F9C:0x706B,0xE99FAD:0x706C,0xE9BD8F:0x706D,0xE99FB2:0x706E,
0xE7AB9F:0x706F,0xE99FB6:0x7070,0xE99FB5:0x7071,0xE9A08F:0x7072,0xE9A08C:0x7073,
0xE9A0B8:0x7074,0xE9A0A4:0x7075,0xE9A0A1:0x7076,0xE9A0B7:0x7077,0xE9A0BD:0x7078,
0xE9A186:0x7079,0xE9A18F:0x707A,0xE9A18B:0x707B,0xE9A1AB:0x707C,0xE9A1AF:0x707D,
0xE9A1B0:0x707E,0xE9A1B1:0x7121,0xE9A1B4:0x7122,0xE9A1B3:0x7123,0xE9A2AA:0x7124,
0xE9A2AF:0x7125,0xE9A2B1:0x7126,0xE9A2B6:0x7127,0xE9A384:0x7128,0xE9A383:0x7129,
0xE9A386:0x712A,0xE9A3A9:0x712B,0xE9A3AB:0x712C,0xE9A483:0x712D,0xE9A489:0x712E,
0xE9A492:0x712F,0xE9A494:0x7130,0xE9A498:0x7131,0xE9A4A1:0x7132,0xE9A49D:0x7133,
0xE9A49E:0x7134,0xE9A4A4:0x7135,0xE9A4A0:0x7136,0xE9A4AC:0x7137,0xE9A4AE:0x7138,
0xE9A4BD:0x7139,0xE9A4BE:0x713A,0xE9A582:0x713B,0xE9A589:0x713C,0xE9A585:0x713D,
0xE9A590:0x713E,0xE9A58B:0x713F,0xE9A591:0x7140,0xE9A592:0x7141,0xE9A58C:0x7142,
0xE9A595:0x7143,0xE9A697:0x7144,0xE9A698:0x7145,0xE9A6A5:0x7146,0xE9A6AD:0x7147,
0xE9A6AE:0x7148,0xE9A6BC:0x7149,0xE9A79F:0x714A,0xE9A79B:0x714B,0xE9A79D:0x714C,
0xE9A798:0x714D,0xE9A791:0x714E,0xE9A7AD:0x714F,0xE9A7AE:0x7150,0xE9A7B1:0x7151,
0xE9A7B2:0x7152,0xE9A7BB:0x7153,0xE9A7B8:0x7154,0xE9A881:0x7155,0xE9A88F:0x7156,
0xE9A885:0x7157,0xE9A7A2:0x7158,0xE9A899:0x7159,0xE9A8AB:0x715A,0xE9A8B7:0x715B,
0xE9A985:0x715C,0xE9A982:0x715D,0xE9A980:0x715E,0xE9A983:0x715F,0xE9A8BE:0x7160,
0xE9A995:0x7161,0xE9A98D:0x7162,0xE9A99B:0x7163,0xE9A997:0x7164,0xE9A99F:0x7165,
0xE9A9A2:0x7166,0xE9A9A5:0x7167,0xE9A9A4:0x7168,0xE9A9A9:0x7169,0xE9A9AB:0x716A,
0xE9A9AA:0x716B,0xE9AAAD:0x716C,0xE9AAB0:0x716D,0xE9AABC:0x716E,0xE9AB80:0x716F,
0xE9AB8F:0x7170,0xE9AB91:0x7171,0xE9AB93:0x7172,0xE9AB94:0x7173,0xE9AB9E:0x7174,
0xE9AB9F:0x7175,0xE9ABA2:0x7176,0xE9ABA3:0x7177,0xE9ABA6:0x7178,0xE9ABAF:0x7179,
0xE9ABAB:0x717A,0xE9ABAE:0x717B,0xE9ABB4:0x717C,0xE9ABB1:0x717D,0xE9ABB7:0x717E,
0xE9ABBB:0x7221,0xE9AC86:0x7222,0xE9AC98:0x7223,0xE9AC9A:0x7224,0xE9AC9F:0x7225,
0xE9ACA2:0x7226,0xE9ACA3:0x7227,0xE9ACA5:0x7228,0xE9ACA7:0x7229,0xE9ACA8:0x722A,
0xE9ACA9:0x722B,0xE9ACAA:0x722C,0xE9ACAE:0x722D,0xE9ACAF:0x722E,0xE9ACB2:0x722F,
0xE9AD84:0x7230,0xE9AD83:0x7231,0xE9AD8F:0x7232,0xE9AD8D:0x7233,0xE9AD8E:0x7234,
0xE9AD91:0x7235,0xE9AD98:0x7236,0xE9ADB4:0x7237,0xE9AE93:0x7238,0xE9AE83:0x7239,
0xE9AE91:0x723A,0xE9AE96:0x723B,0xE9AE97:0x723C,0xE9AE9F:0x723D,0xE9AEA0:0x723E,
0xE9AEA8:0x723F,0xE9AEB4:0x7240,0xE9AF80:0x7241,0xE9AF8A:0x7242,0xE9AEB9:0x7243,
0xE9AF86:0x7244,0xE9AF8F:0x7245,0xE9AF91:0x7246,0xE9AF92:0x7247,0xE9AFA3:0x7248,
0xE9AFA2:0x7249,0xE9AFA4:0x724A,0xE9AF94:0x724B,0xE9AFA1:0x724C,0xE9B0BA:0x724D,
0xE9AFB2:0x724E,0xE9AFB1:0x724F,0xE9AFB0:0x7250,0xE9B095:0x7251,0xE9B094:0x7252,
0xE9B089:0x7253,0xE9B093:0x7254,0xE9B08C:0x7255,0xE9B086:0x7256,0xE9B088:0x7257,
0xE9B092:0x7258,0xE9B08A:0x7259,0xE9B084:0x725A,0xE9B0AE:0x725B,0xE9B09B:0x725C,
0xE9B0A5:0x725D,0xE9B0A4:0x725E,0xE9B0A1:0x725F,0xE9B0B0:0x7260,0xE9B187:0x7261,
0xE9B0B2:0x7262,0xE9B186:0x7263,0xE9B0BE:0x7264,0xE9B19A:0x7265,0xE9B1A0:0x7266,
0xE9B1A7:0x7267,0xE9B1B6:0x7268,0xE9B1B8:0x7269,0xE9B3A7:0x726A,0xE9B3AC:0x726B,
0xE9B3B0:0x726C,0xE9B489:0x726D,0xE9B488:0x726E,0xE9B3AB:0x726F,0xE9B483:0x7270,
0xE9B486:0x7271,0xE9B4AA:0x7272,0xE9B4A6:0x7273,0xE9B6AF:0x7274,0xE9B4A3:0x7275,
0xE9B49F:0x7276,0xE9B584:0x7277,0xE9B495:0x7278,0xE9B492:0x7279,0xE9B581:0x727A,
0xE9B4BF:0x727B,0xE9B4BE:0x727C,0xE9B586:0x727D,0xE9B588:0x727E,0xE9B59D:0x7321,
0xE9B59E:0x7322,0xE9B5A4:0x7323,0xE9B591:0x7324,0xE9B590:0x7325,0xE9B599:0x7326,
0xE9B5B2:0x7327,0xE9B689:0x7328,0xE9B687:0x7329,0xE9B6AB:0x732A,0xE9B5AF:0x732B,
0xE9B5BA:0x732C,0xE9B69A:0x732D,0xE9B6A4:0x732E,0xE9B6A9:0x732F,0xE9B6B2:0x7330,
0xE9B784:0x7331,0xE9B781:0x7332,0xE9B6BB:0x7333,0xE9B6B8:0x7334,0xE9B6BA:0x7335,
0xE9B786:0x7336,0xE9B78F:0x7337,0xE9B782:0x7338,0xE9B799:0x7339,0xE9B793:0x733A,
0xE9B7B8:0x733B,0xE9B7A6:0x733C,0xE9B7AD:0x733D,0xE9B7AF:0x733E,0xE9B7BD:0x733F,
0xE9B89A:0x7340,0xE9B89B:0x7341,0xE9B89E:0x7342,0xE9B9B5:0x7343,0xE9B9B9:0x7344,
0xE9B9BD:0x7345,0xE9BA81:0x7346,0xE9BA88:0x7347,0xE9BA8B:0x7348,0xE9BA8C:0x7349,
0xE9BA92:0x734A,0xE9BA95:0x734B,0xE9BA91:0x734C,0xE9BA9D:0x734D,0xE9BAA5:0x734E,
0xE9BAA9:0x734F,0xE9BAB8:0x7350,0xE9BAAA:0x7351,0xE9BAAD:0x7352,0xE99DA1:0x7353,
0xE9BB8C:0x7354,0xE9BB8E:0x7355,0xE9BB8F:0x7356,0xE9BB90:0x7357,0xE9BB94:0x7358,
0xE9BB9C:0x7359,0xE9BB9E:0x735A,0xE9BB9D:0x735B,0xE9BBA0:0x735C,0xE9BBA5:0x735D,
0xE9BBA8:0x735E,0xE9BBAF:0x735F,0xE9BBB4:0x7360,0xE9BBB6:0x7361,0xE9BBB7:0x7362,
0xE9BBB9:0x7363,0xE9BBBB:0x7364,0xE9BBBC:0x7365,0xE9BBBD:0x7366,0xE9BC87:0x7367,
0xE9BC88:0x7368,0xE79AB7:0x7369,0xE9BC95:0x736A,0xE9BCA1:0x736B,0xE9BCAC:0x736C,
0xE9BCBE:0x736D,0xE9BD8A:0x736E,0xE9BD92:0x736F,0xE9BD94:0x7370,0xE9BDA3:0x7371,
0xE9BD9F:0x7372,0xE9BDA0:0x7373,0xE9BDA1:0x7374,0xE9BDA6:0x7375,0xE9BDA7:0x7376,
0xE9BDAC:0x7377,0xE9BDAA:0x7378,0xE9BDB7:0x7379,0xE9BDB2:0x737A,0xE9BDB6:0x737B,
0xE9BE95:0x737C,0xE9BE9C:0x737D,0xE9BEA0:0x737E,0xE5A0AF:0x7421,0xE6A787:0x7422,
0xE98199:0x7423,0xE791A4:0x7424,0xE5879C:0x7425,0xE78699:0x7426,

0xE7BA8A:0x7921,0xE8A49C:0x7922,0xE98D88:0x7923,0xE98A88:0x7924,0xE8939C:0x7925,
0xE4BF89:0x7926,0xE782BB:0x7927,0xE698B1:0x7928,0xE6A388:0x7929,0xE98BB9:0x792A,
0xE69BBB:0x792B,0xE5BD85:0x792C,0xE4B8A8:0x792D,0xE4BBA1:0x792E,0xE4BBBC:0x792F,
0xE4BC80:0x7930,0xE4BC83:0x7931,0xE4BCB9:0x7932,0xE4BD96:0x7933,0xE4BE92:0x7934,
0xE4BE8A:0x7935,0xE4BE9A:0x7936,0xE4BE94:0x7937,0xE4BF8D:0x7938,0xE58180:0x7939,
0xE580A2:0x793A,0xE4BFBF:0x793B,0xE5809E:0x793C,0xE58186:0x793D,0xE581B0:0x793E,
0xE58182:0x793F,0xE58294:0x7940,0xE583B4:0x7941,0xE58398:0x7942,0xE5858A:0x7943,
0xE585A4:0x7944,0xE5869D:0x7945,0xE586BE:0x7946,0xE587AC:0x7947,0xE58895:0x7948,
0xE58A9C:0x7949,0xE58AA6:0x794A,0xE58B80:0x794B,0xE58B9B:0x794C,0xE58C80:0x794D,
0xE58C87:0x794E,0xE58CA4:0x794F,0xE58DB2:0x7950,0xE58E93:0x7951,0xE58EB2:0x7952,
0xE58F9D:0x7953,0xEFA88E:0x7954,0xE5929C:0x7955,0xE5928A:0x7956,0xE592A9:0x7957,
0xE593BF:0x7958,0xE59686:0x7959,0xE59D99:0x795A,0xE59DA5:0x795B,0xE59EAC:0x795C,
0xE59F88:0x795D,0xE59F87:0x795E,0xEFA88F:0x795F,0xEFA890:0x7960,0xE5A29E:0x7961,
0xE5A2B2:0x7962,0xE5A48B:0x7963,0xE5A593:0x7964,0xE5A59B:0x7965,0xE5A59D:0x7966,
0xE5A5A3:0x7967,0xE5A6A4:0x7968,0xE5A6BA:0x7969,0xE5AD96:0x796A,0xE5AF80:0x796B,
0xE794AF:0x796C,0xE5AF98:0x796D,0xE5AFAC:0x796E,0xE5B09E:0x796F,0xE5B2A6:0x7970,
0xE5B2BA:0x7971,0xE5B3B5:0x7972,0xE5B4A7:0x7973,0xE5B593:0x7974,0xEFA891:0x7975,
0xE5B582:0x7976,0xE5B5AD:0x7977,0xE5B6B8:0x7978,0xE5B6B9:0x7979,0xE5B790:0x797A,
0xE5BCA1:0x797B,0xE5BCB4:0x797C,0xE5BDA7:0x797D,0xE5BEB7:0x797E,0xE5BF9E:0x7A21,
0xE6819D:0x7A22,0xE68285:0x7A23,0xE6828A:0x7A24,0xE6839E:0x7A25,0xE68395:0x7A26,
0xE684A0:0x7A27,0xE683B2:0x7A28,0xE68491:0x7A29,0xE684B7:0x7A2A,0xE684B0:0x7A2B,
0xE68698:0x7A2C,0xE68893:0x7A2D,0xE68AA6:0x7A2E,0xE68FB5:0x7A2F,0xE691A0:0x7A30,
0xE6929D:0x7A31,0xE6938E:0x7A32,0xE6958E:0x7A33,0xE69880:0x7A34,0xE69895:0x7A35,
0xE698BB:0x7A36,0xE69889:0x7A37,0xE698AE:0x7A38,0xE6989E:0x7A39,0xE698A4:0x7A3A,
0xE699A5:0x7A3B,0xE69997:0x7A3C,0xE69999:0x7A3D,0xEFA892:0x7A3E,0xE699B3:0x7A3F,
0xE69A99:0x7A40,0xE69AA0:0x7A41,0xE69AB2:0x7A42,0xE69ABF:0x7A43,0xE69BBA:0x7A44,
0xE69C8E:0x7A45,0xEFA4A9:0x7A46,0xE69DA6:0x7A47,0xE69EBB:0x7A48,0xE6A192:0x7A49,
0xE69F80:0x7A4A,0xE6A081:0x7A4B,0xE6A184:0x7A4C,0xE6A38F:0x7A4D,0xEFA893:0x7A4E,
0xE6A5A8:0x7A4F,0xEFA894:0x7A50,0xE6A698:0x7A51,0xE6A7A2:0x7A52,0xE6A8B0:0x7A53,
0xE6A9AB:0x7A54,0xE6A986:0x7A55,0xE6A9B3:0x7A56,0xE6A9BE:0x7A57,0xE6ABA2:0x7A58,
0xE6ABA4:0x7A59,0xE6AF96:0x7A5A,0xE6B0BF:0x7A5B,0xE6B19C:0x7A5C,0xE6B286:0x7A5D,
0xE6B1AF:0x7A5E,0xE6B39A:0x7A5F,0xE6B484:0x7A60,0xE6B687:0x7A61,0xE6B5AF:0x7A62,
0xE6B696:0x7A63,0xE6B6AC:0x7A64,0xE6B78F:0x7A65,0xE6B7B8:0x7A66,0xE6B7B2:0x7A67,
0xE6B7BC:0x7A68,0xE6B8B9:0x7A69,0xE6B99C:0x7A6A,0xE6B8A7:0x7A6B,0xE6B8BC:0x7A6C,
0xE6BABF:0x7A6D,0xE6BE88:0x7A6E,0xE6BEB5:0x7A6F,0xE6BFB5:0x7A70,0xE78085:0x7A71,
0xE78087:0x7A72,0xE780A8:0x7A73,0xE78285:0x7A74,0xE782AB:0x7A75,0xE7848F:0x7A76,
0xE78484:0x7A77,0xE7859C:0x7A78,0xE78586:0x7A79,0xE78587:0x7A7A,0xEFA895:0x7A7B,
0xE78781:0x7A7C,0xE787BE:0x7A7D,0xE78AB1:0x7A7E,0xE78ABE:0x7B21,0xE78CA4:0x7B22,
0xEFA896:0x7B23,0xE78DB7:0x7B24,0xE78EBD:0x7B25,0xE78F89:0x7B26,0xE78F96:0x7B27,
0xE78FA3:0x7B28,0xE78F92:0x7B29,0xE79087:0x7B2A,0xE78FB5:0x7B2B,0xE790A6:0x7B2C,
0xE790AA:0x7B2D,0xE790A9:0x7B2E,0xE790AE:0x7B2F,0xE791A2:0x7B30,0xE79289:0x7B31,
0xE7929F:0x7B32,0xE79481:0x7B33,0xE795AF:0x7B34,0xE79A82:0x7B35,0xE79A9C:0x7B36,
0xE79A9E:0x7B37,0xE79A9B:0x7B38,0xE79AA6:0x7B39,0xEFA897:0x7B3A,0xE79D86:0x7B3B,
0xE58AAF:0x7B3C,0xE7A0A1:0x7B3D,0xE7A18E:0x7B3E,0xE7A1A4:0x7B3F,0xE7A1BA:0x7B40,
0xE7A4B0:0x7B41,0xEFA898:0x7B42,0xEFA899:0x7B43,0xEFA89A:0x7B44,0xE7A694:0x7B45,
0xEFA89B:0x7B46,0xE7A69B:0x7B47,0xE7AB91:0x7B48,0xE7ABA7:0x7B49,0xEFA89C:0x7B4A,
0xE7ABAB:0x7B4B,0xE7AE9E:0x7B4C,0xEFA89D:0x7B4D,0xE7B588:0x7B4E,0xE7B59C:0x7B4F,
0xE7B6B7:0x7B50,0xE7B6A0:0x7B51,0xE7B796:0x7B52,0xE7B992:0x7B53,0xE7BD87:0x7B54,
0xE7BEA1:0x7B55,0xEFA89E:0x7B56,0xE88C81:0x7B57,0xE88DA2:0x7B58,0xE88DBF:0x7B59,
0xE88F87:0x7B5A,0xE88FB6:0x7B5B,0xE89188:0x7B5C,0xE892B4:0x7B5D,0xE89593:0x7B5E,
0xE89599:0x7B5F,0xE895AB:0x7B60,0xEFA89F:0x7B61,0xE896B0:0x7B62,0xEFA8A0:0x7B63,
0xEFA8A1:0x7B64,0xE8A087:0x7B65,0xE8A3B5:0x7B66,0xE8A892:0x7B67,0xE8A8B7:0x7B68,
0xE8A9B9:0x7B69,0xE8AAA7:0x7B6A,0xE8AABE:0x7B6B,0xE8AB9F:0x7B6C,0xEFA8A2:0x7B6D,
0xE8ABB6:0x7B6E,0xE8AD93:0x7B6F,0xE8ADBF:0x7B70,0xE8B3B0:0x7B71,0xE8B3B4:0x7B72,
0xE8B492:0x7B73,0xE8B5B6:0x7B74,0xEFA8A3:0x7B75,0xE8BB8F:0x7B76,0xEFA8A4:0x7B77,
0xEFA8A5:0x7B78,0xE981A7:0x7B79,0xE9839E:0x7B7A,0xEFA8A6:0x7B7B,0xE98495:0x7B7C,
0xE984A7:0x7B7D,0xE9879A:0x7B7E,0xE98797:0x7C21,0xE9879E:0x7C22,0xE987AD:0x7C23,
0xE987AE:0x7C24,0xE987A4:0x7C25,0xE987A5:0x7C26,0xE98886:0x7C27,0xE98890:0x7C28,
0xE9888A:0x7C29,0xE988BA:0x7C2A,0xE98980:0x7C2B,0xE988BC:0x7C2C,0xE9898E:0x7C2D,
0xE98999:0x7C2E,0xE98991:0x7C2F,0xE988B9:0x7C30,0xE989A7:0x7C31,0xE98AA7:0x7C32,
0xE989B7:0x7C33,0xE989B8:0x7C34,0xE98BA7:0x7C35,0xE98B97:0x7C36,0xE98B99:0x7C37,
0xE98B90:0x7C38,0xEFA8A7:0x7C39,0xE98B95:0x7C3A,0xE98BA0:0x7C3B,0xE98B93:0x7C3C,
0xE98CA5:0x7C3D,0xE98CA1:0x7C3E,0xE98BBB:0x7C3F,0xEFA8A8:0x7C40,0xE98C9E:0x7C41,
0xE98BBF:0x7C42,0xE98C9D:0x7C43,0xE98C82:0x7C44,0xE98DB0:0x7C45,0xE98D97:0x7C46,
0xE98EA4:0x7C47,0xE98F86:0x7C48,0xE98F9E:0x7C49,0xE98FB8:0x7C4A,0xE990B1:0x7C4B,
0xE99185:0x7C4C,0xE99188:0x7C4D,0xE99692:0x7C4E,0xEFA79C:0x7C4F,0xEFA8A9:0x7C50,
0xE99A9D:0x7C51,0xE99AAF:0x7C52,0xE99CB3:0x7C53,0xE99CBB:0x7C54,0xE99D83:0x7C55,
0xE99D8D:0x7C56,0xE99D8F:0x7C57,0xE99D91:0x7C58,0xE99D95:0x7C59,0xE9A197:0x7C5A,
0xE9A1A5:0x7C5B,0xEFA8AA:0x7C5C,0xEFA8AB:0x7C5D,0xE9A4A7:0x7C5E,0xEFA8AC:0x7C5F,
0xE9A69E:0x7C60,0xE9A98E:0x7C61,0xE9AB99:0x7C62,0xE9AB9C:0x7C63,0xE9ADB5:0x7C64,
0xE9ADB2:0x7C65,0xE9AE8F:0x7C66,0xE9AEB1:0x7C67,0xE9AEBB:0x7C68,0xE9B080:0x7C69,
0xE9B5B0:0x7C6A,0xE9B5AB:0x7C6B,0xEFA8AD:0x7C6C,0xE9B899:0x7C6D,0xE9BB91:0x7C6E,
0xE285B0:0x7C71,0xE285B1:0x7C72,0xE285B2:0x7C73,0xE285B3:0x7C74,0xE285B4:0x7C75,
0xE285B5:0x7C76,0xE285B6:0x7C77,0xE285B7:0x7C78,0xE285B8:0x7C79,0xE285B9:0x7C7A,
0xEFBFA4:0x7C7C,0xEFBC87:0x7C7D,0xEFBC82:0x7C7E,

//FIXME: mojibake
0xE288A5:0x2142,
0xEFBFA2:0x224C,
0xE28892:0x1215D
};

/**
 * The encoding conversion table for UTF-8 to JIS X 0212:1990 (Hojo-Kanji).
 *
 * @ignore
 */
var UTF8_TO_JISX0212_TABLE = {
0xCB98:0x222F,0xCB87:0x2230,0xC2B8:0x2231,0xCB99:0x2232,0xCB9D:0x2233,
0xC2AF:0x2234,0xCB9B:0x2235,0xCB9A:0x2236,0x7E:0x2237,0xCE84:0x2238,
0xCE85:0x2239,0xC2A1:0x2242,0xC2A6:0x2243,0xC2BF:0x2244,0xC2BA:0x226B,
0xC2AA:0x226C,0xC2A9:0x226D,0xC2AE:0x226E,0xE284A2:0x226F,0xC2A4:0x2270,
0xE28496:0x2271,0xCE86:0x2661,0xCE88:0x2662,0xCE89:0x2663,0xCE8A:0x2664,
0xCEAA:0x2665,0xCE8C:0x2667,0xCE8E:0x2669,0xCEAB:0x266A,0xCE8F:0x266C,
0xCEAC:0x2671,0xCEAD:0x2672,0xCEAE:0x2673,0xCEAF:0x2674,0xCF8A:0x2675,
0xCE90:0x2676,0xCF8C:0x2677,0xCF82:0x2678,0xCF8D:0x2679,0xCF8B:0x267A,
0xCEB0:0x267B,0xCF8E:0x267C,0xD082:0x2742,0xD083:0x2743,0xD084:0x2744,
0xD085:0x2745,0xD086:0x2746,0xD087:0x2747,0xD088:0x2748,0xD089:0x2749,
0xD08A:0x274A,0xD08B:0x274B,0xD08C:0x274C,0xD08E:0x274D,0xD08F:0x274E,
0xD192:0x2772,0xD193:0x2773,0xD194:0x2774,0xD195:0x2775,0xD196:0x2776,
0xD197:0x2777,0xD198:0x2778,0xD199:0x2779,0xD19A:0x277A,0xD19B:0x277B,
0xD19C:0x277C,0xD19E:0x277D,0xD19F:0x277E,0xC386:0x2921,0xC490:0x2922,
0xC4A6:0x2924,0xC4B2:0x2926,0xC581:0x2928,0xC4BF:0x2929,0xC58A:0x292B,
0xC398:0x292C,0xC592:0x292D,0xC5A6:0x292F,0xC39E:0x2930,0xC3A6:0x2941,
0xC491:0x2942,0xC3B0:0x2943,0xC4A7:0x2944,0xC4B1:0x2945,0xC4B3:0x2946,
0xC4B8:0x2947,0xC582:0x2948,0xC580:0x2949,0xC589:0x294A,0xC58B:0x294B,
0xC3B8:0x294C,0xC593:0x294D,0xC39F:0x294E,0xC5A7:0x294F,0xC3BE:0x2950,
0xC381:0x2A21,0xC380:0x2A22,0xC384:0x2A23,0xC382:0x2A24,0xC482:0x2A25,
0xC78D:0x2A26,0xC480:0x2A27,0xC484:0x2A28,0xC385:0x2A29,0xC383:0x2A2A,
0xC486:0x2A2B,0xC488:0x2A2C,0xC48C:0x2A2D,0xC387:0x2A2E,0xC48A:0x2A2F,
0xC48E:0x2A30,0xC389:0x2A31,0xC388:0x2A32,0xC38B:0x2A33,0xC38A:0x2A34,
0xC49A:0x2A35,0xC496:0x2A36,0xC492:0x2A37,0xC498:0x2A38,0xC49C:0x2A3A,
0xC49E:0x2A3B,0xC4A2:0x2A3C,0xC4A0:0x2A3D,0xC4A4:0x2A3E,0xC38D:0x2A3F,
0xC38C:0x2A40,0xC38F:0x2A41,0xC38E:0x2A42,0xC78F:0x2A43,0xC4B0:0x2A44,
0xC4AA:0x2A45,0xC4AE:0x2A46,0xC4A8:0x2A47,0xC4B4:0x2A48,0xC4B6:0x2A49,
0xC4B9:0x2A4A,0xC4BD:0x2A4B,0xC4BB:0x2A4C,0xC583:0x2A4D,0xC587:0x2A4E,
0xC585:0x2A4F,0xC391:0x2A50,0xC393:0x2A51,0xC392:0x2A52,0xC396:0x2A53,
0xC394:0x2A54,0xC791:0x2A55,0xC590:0x2A56,0xC58C:0x2A57,0xC395:0x2A58,
0xC594:0x2A59,0xC598:0x2A5A,0xC596:0x2A5B,0xC59A:0x2A5C,0xC59C:0x2A5D,
0xC5A0:0x2A5E,0xC59E:0x2A5F,0xC5A4:0x2A60,0xC5A2:0x2A61,0xC39A:0x2A62,
0xC399:0x2A63,0xC39C:0x2A64,0xC39B:0x2A65,0xC5AC:0x2A66,0xC793:0x2A67,
0xC5B0:0x2A68,0xC5AA:0x2A69,0xC5B2:0x2A6A,0xC5AE:0x2A6B,0xC5A8:0x2A6C,
0xC797:0x2A6D,0xC79B:0x2A6E,0xC799:0x2A6F,0xC795:0x2A70,0xC5B4:0x2A71,
0xC39D:0x2A72,0xC5B8:0x2A73,0xC5B6:0x2A74,0xC5B9:0x2A75,0xC5BD:0x2A76,
0xC5BB:0x2A77,0xC3A1:0x2B21,0xC3A0:0x2B22,0xC3A4:0x2B23,0xC3A2:0x2B24,
0xC483:0x2B25,0xC78E:0x2B26,0xC481:0x2B27,0xC485:0x2B28,0xC3A5:0x2B29,
0xC3A3:0x2B2A,0xC487:0x2B2B,0xC489:0x2B2C,0xC48D:0x2B2D,0xC3A7:0x2B2E,
0xC48B:0x2B2F,0xC48F:0x2B30,0xC3A9:0x2B31,0xC3A8:0x2B32,0xC3AB:0x2B33,
0xC3AA:0x2B34,0xC49B:0x2B35,0xC497:0x2B36,0xC493:0x2B37,0xC499:0x2B38,
0xC7B5:0x2B39,0xC49D:0x2B3A,0xC49F:0x2B3B,0xC4A1:0x2B3D,0xC4A5:0x2B3E,
0xC3AD:0x2B3F,0xC3AC:0x2B40,0xC3AF:0x2B41,0xC3AE:0x2B42,0xC790:0x2B43,
0xC4AB:0x2B45,0xC4AF:0x2B46,0xC4A9:0x2B47,0xC4B5:0x2B48,0xC4B7:0x2B49,
0xC4BA:0x2B4A,0xC4BE:0x2B4B,0xC4BC:0x2B4C,0xC584:0x2B4D,0xC588:0x2B4E,
0xC586:0x2B4F,0xC3B1:0x2B50,0xC3B3:0x2B51,0xC3B2:0x2B52,0xC3B6:0x2B53,
0xC3B4:0x2B54,0xC792:0x2B55,0xC591:0x2B56,0xC58D:0x2B57,0xC3B5:0x2B58,
0xC595:0x2B59,0xC599:0x2B5A,0xC597:0x2B5B,0xC59B:0x2B5C,0xC59D:0x2B5D,
0xC5A1:0x2B5E,0xC59F:0x2B5F,0xC5A5:0x2B60,0xC5A3:0x2B61,0xC3BA:0x2B62,
0xC3B9:0x2B63,0xC3BC:0x2B64,0xC3BB:0x2B65,0xC5AD:0x2B66,0xC794:0x2B67,
0xC5B1:0x2B68,0xC5AB:0x2B69,0xC5B3:0x2B6A,0xC5AF:0x2B6B,0xC5A9:0x2B6C,
0xC798:0x2B6D,0xC79C:0x2B6E,0xC79A:0x2B6F,0xC796:0x2B70,0xC5B5:0x2B71,
0xC3BD:0x2B72,0xC3BF:0x2B73,0xC5B7:0x2B74,0xC5BA:0x2B75,0xC5BE:0x2B76,
0xC5BC:0x2B77,
0xE4B882:0x3021,0xE4B884:0x3022,0xE4B885:0x3023,0xE4B88C:0x3024,
0xE4B892:0x3025,0xE4B89F:0x3026,0xE4B8A3:0x3027,0xE4B8A4:0x3028,0xE4B8A8:0x3029,
0xE4B8AB:0x302A,0xE4B8AE:0x302B,0xE4B8AF:0x302C,0xE4B8B0:0x302D,0xE4B8B5:0x302E,
0xE4B980:0x302F,0xE4B981:0x3030,0xE4B984:0x3031,0xE4B987:0x3032,0xE4B991:0x3033,
0xE4B99A:0x3034,0xE4B99C:0x3035,0xE4B9A3:0x3036,0xE4B9A8:0x3037,0xE4B9A9:0x3038,
0xE4B9B4:0x3039,0xE4B9B5:0x303A,0xE4B9B9:0x303B,0xE4B9BF:0x303C,0xE4BA8D:0x303D,
0xE4BA96:0x303E,0xE4BA97:0x303F,0xE4BA9D:0x3040,0xE4BAAF:0x3041,0xE4BAB9:0x3042,
0xE4BB83:0x3043,0xE4BB90:0x3044,0xE4BB9A:0x3045,0xE4BB9B:0x3046,0xE4BBA0:0x3047,
0xE4BBA1:0x3048,0xE4BBA2:0x3049,0xE4BBA8:0x304A,0xE4BBAF:0x304B,0xE4BBB1:0x304C,
0xE4BBB3:0x304D,0xE4BBB5:0x304E,0xE4BBBD:0x304F,0xE4BBBE:0x3050,0xE4BBBF:0x3051,
0xE4BC80:0x3052,0xE4BC82:0x3053,0xE4BC83:0x3054,0xE4BC88:0x3055,0xE4BC8B:0x3056,
0xE4BC8C:0x3057,0xE4BC92:0x3058,0xE4BC95:0x3059,0xE4BC96:0x305A,0xE4BC97:0x305B,
0xE4BC99:0x305C,0xE4BCAE:0x305D,0xE4BCB1:0x305E,0xE4BDA0:0x305F,0xE4BCB3:0x3060,
0xE4BCB5:0x3061,0xE4BCB7:0x3062,0xE4BCB9:0x3063,0xE4BCBB:0x3064,0xE4BCBE:0x3065,
0xE4BD80:0x3066,0xE4BD82:0x3067,0xE4BD88:0x3068,0xE4BD89:0x3069,0xE4BD8B:0x306A,
0xE4BD8C:0x306B,0xE4BD92:0x306C,0xE4BD94:0x306D,0xE4BD96:0x306E,0xE4BD98:0x306F,
0xE4BD9F:0x3070,0xE4BDA3:0x3071,0xE4BDAA:0x3072,0xE4BDAC:0x3073,0xE4BDAE:0x3074,
0xE4BDB1:0x3075,0xE4BDB7:0x3076,0xE4BDB8:0x3077,0xE4BDB9:0x3078,0xE4BDBA:0x3079,
0xE4BDBD:0x307A,0xE4BDBE:0x307B,0xE4BE81:0x307C,0xE4BE82:0x307D,0xE4BE84:0x307E,
0xE4BE85:0x3121,0xE4BE89:0x3122,0xE4BE8A:0x3123,0xE4BE8C:0x3124,0xE4BE8E:0x3125,
0xE4BE90:0x3126,0xE4BE92:0x3127,0xE4BE93:0x3128,0xE4BE94:0x3129,0xE4BE97:0x312A,
0xE4BE99:0x312B,0xE4BE9A:0x312C,0xE4BE9E:0x312D,0xE4BE9F:0x312E,0xE4BEB2:0x312F,
0xE4BEB7:0x3130,0xE4BEB9:0x3131,0xE4BEBB:0x3132,0xE4BEBC:0x3133,0xE4BEBD:0x3134,
0xE4BEBE:0x3135,0xE4BF80:0x3136,0xE4BF81:0x3137,0xE4BF85:0x3138,0xE4BF86:0x3139,
0xE4BF88:0x313A,0xE4BF89:0x313B,0xE4BF8B:0x313C,0xE4BF8C:0x313D,0xE4BF8D:0x313E,
0xE4BF8F:0x313F,0xE4BF92:0x3140,0xE4BF9C:0x3141,0xE4BFA0:0x3142,0xE4BFA2:0x3143,
0xE4BFB0:0x3144,0xE4BFB2:0x3145,0xE4BFBC:0x3146,0xE4BFBD:0x3147,0xE4BFBF:0x3148,
0xE58080:0x3149,0xE58081:0x314A,0xE58084:0x314B,0xE58087:0x314C,0xE5808A:0x314D,
0xE5808C:0x314E,0xE5808E:0x314F,0xE58090:0x3150,0xE58093:0x3151,0xE58097:0x3152,
0xE58098:0x3153,0xE5809B:0x3154,0xE5809C:0x3155,0xE5809D:0x3156,0xE5809E:0x3157,
0xE580A2:0x3158,0xE580A7:0x3159,0xE580AE:0x315A,0xE580B0:0x315B,0xE580B2:0x315C,
0xE580B3:0x315D,0xE580B5:0x315E,0xE58180:0x315F,0xE58181:0x3160,0xE58182:0x3161,
0xE58185:0x3162,0xE58186:0x3163,0xE5818A:0x3164,0xE5818C:0x3165,0xE5818E:0x3166,
0xE58191:0x3167,0xE58192:0x3168,0xE58193:0x3169,0xE58197:0x316A,0xE58199:0x316B,
0xE5819F:0x316C,0xE581A0:0x316D,0xE581A2:0x316E,0xE581A3:0x316F,0xE581A6:0x3170,
0xE581A7:0x3171,0xE581AA:0x3172,0xE581AD:0x3173,0xE581B0:0x3174,0xE581B1:0x3175,
0xE580BB:0x3176,0xE58281:0x3177,0xE58283:0x3178,0xE58284:0x3179,0xE58286:0x317A,
0xE5828A:0x317B,0xE5828E:0x317C,0xE5828F:0x317D,0xE58290:0x317E,0xE58292:0x3221,
0xE58293:0x3222,0xE58294:0x3223,0xE58296:0x3224,0xE5829B:0x3225,0xE5829C:0x3226,
0xE5829E:0x3227,0xE5829F:0x3228,0xE582A0:0x3229,0xE582A1:0x322A,0xE582A2:0x322B,
0xE582AA:0x322C,0xE582AF:0x322D,0xE582B0:0x322E,0xE582B9:0x322F,0xE582BA:0x3230,
0xE582BD:0x3231,0xE58380:0x3232,0xE58383:0x3233,0xE58384:0x3234,0xE58387:0x3235,
0xE5838C:0x3236,0xE5838E:0x3237,0xE58390:0x3238,0xE58393:0x3239,0xE58394:0x323A,
0xE58398:0x323B,0xE5839C:0x323C,0xE5839D:0x323D,0xE5839F:0x323E,0xE583A2:0x323F,
0xE583A4:0x3240,0xE583A6:0x3241,0xE583A8:0x3242,0xE583A9:0x3243,0xE583AF:0x3244,
0xE583B1:0x3245,0xE583B6:0x3246,0xE583BA:0x3247,0xE583BE:0x3248,0xE58483:0x3249,
0xE58486:0x324A,0xE58487:0x324B,0xE58488:0x324C,0xE5848B:0x324D,0xE5848C:0x324E,
0xE5848D:0x324F,0xE5848E:0x3250,0xE583B2:0x3251,0xE58490:0x3252,0xE58497:0x3253,
0xE58499:0x3254,0xE5849B:0x3255,0xE5849C:0x3256,0xE5849D:0x3257,0xE5849E:0x3258,
0xE584A3:0x3259,0xE584A7:0x325A,0xE584A8:0x325B,0xE584AC:0x325C,0xE584AD:0x325D,
0xE584AF:0x325E,0xE584B1:0x325F,0xE584B3:0x3260,0xE584B4:0x3261,0xE584B5:0x3262,
0xE584B8:0x3263,0xE584B9:0x3264,0xE58582:0x3265,0xE5858A:0x3266,0xE5858F:0x3267,
0xE58593:0x3268,0xE58595:0x3269,0xE58597:0x326A,0xE58598:0x326B,0xE5859F:0x326C,
0xE585A4:0x326D,0xE585A6:0x326E,0xE585BE:0x326F,0xE58683:0x3270,0xE58684:0x3271,
0xE5868B:0x3272,0xE5868E:0x3273,0xE58698:0x3274,0xE5869D:0x3275,0xE586A1:0x3276,
0xE586A3:0x3277,0xE586AD:0x3278,0xE586B8:0x3279,0xE586BA:0x327A,0xE586BC:0x327B,
0xE586BE:0x327C,0xE586BF:0x327D,0xE58782:0x327E,0xE58788:0x3321,0xE5878F:0x3322,
0xE58791:0x3323,0xE58792:0x3324,0xE58793:0x3325,0xE58795:0x3326,0xE58798:0x3327,
0xE5879E:0x3328,0xE587A2:0x3329,0xE587A5:0x332A,0xE587AE:0x332B,0xE587B2:0x332C,
0xE587B3:0x332D,0xE587B4:0x332E,0xE587B7:0x332F,0xE58881:0x3330,0xE58882:0x3331,
0xE58885:0x3332,0xE58892:0x3333,0xE58893:0x3334,0xE58895:0x3335,0xE58896:0x3336,
0xE58898:0x3337,0xE588A2:0x3338,0xE588A8:0x3339,0xE588B1:0x333A,0xE588B2:0x333B,
0xE588B5:0x333C,0xE588BC:0x333D,0xE58985:0x333E,0xE58989:0x333F,0xE58995:0x3340,
0xE58997:0x3341,0xE58998:0x3342,0xE5899A:0x3343,0xE5899C:0x3344,0xE5899F:0x3345,
0xE589A0:0x3346,0xE589A1:0x3347,0xE589A6:0x3348,0xE589AE:0x3349,0xE589B7:0x334A,
0xE589B8:0x334B,0xE589B9:0x334C,0xE58A80:0x334D,0xE58A82:0x334E,0xE58A85:0x334F,
0xE58A8A:0x3350,0xE58A8C:0x3351,0xE58A93:0x3352,0xE58A95:0x3353,0xE58A96:0x3354,
0xE58A97:0x3355,0xE58A98:0x3356,0xE58A9A:0x3357,0xE58A9C:0x3358,0xE58AA4:0x3359,
0xE58AA5:0x335A,0xE58AA6:0x335B,0xE58AA7:0x335C,0xE58AAF:0x335D,0xE58AB0:0x335E,
0xE58AB6:0x335F,0xE58AB7:0x3360,0xE58AB8:0x3361,0xE58ABA:0x3362,0xE58ABB:0x3363,
0xE58ABD:0x3364,0xE58B80:0x3365,0xE58B84:0x3366,0xE58B86:0x3367,0xE58B88:0x3368,
0xE58B8C:0x3369,0xE58B8F:0x336A,0xE58B91:0x336B,0xE58B94:0x336C,0xE58B96:0x336D,
0xE58B9B:0x336E,0xE58B9C:0x336F,0xE58BA1:0x3370,0xE58BA5:0x3371,0xE58BA8:0x3372,
0xE58BA9:0x3373,0xE58BAA:0x3374,0xE58BAC:0x3375,0xE58BB0:0x3376,0xE58BB1:0x3377,
0xE58BB4:0x3378,0xE58BB6:0x3379,0xE58BB7:0x337A,0xE58C80:0x337B,0xE58C83:0x337C,
0xE58C8A:0x337D,0xE58C8B:0x337E,0xE58C8C:0x3421,0xE58C91:0x3422,0xE58C93:0x3423,
0xE58C98:0x3424,0xE58C9B:0x3425,0xE58C9C:0x3426,0xE58C9E:0x3427,0xE58C9F:0x3428,
0xE58CA5:0x3429,0xE58CA7:0x342A,0xE58CA8:0x342B,0xE58CA9:0x342C,0xE58CAB:0x342D,
0xE58CAC:0x342E,0xE58CAD:0x342F,0xE58CB0:0x3430,0xE58CB2:0x3431,0xE58CB5:0x3432,
0xE58CBC:0x3433,0xE58CBD:0x3434,0xE58CBE:0x3435,0xE58D82:0x3436,0xE58D8C:0x3437,
0xE58D8B:0x3438,0xE58D99:0x3439,0xE58D9B:0x343A,0xE58DA1:0x343B,0xE58DA3:0x343C,
0xE58DA5:0x343D,0xE58DAC:0x343E,0xE58DAD:0x343F,0xE58DB2:0x3440,0xE58DB9:0x3441,
0xE58DBE:0x3442,0xE58E83:0x3443,0xE58E87:0x3444,0xE58E88:0x3445,0xE58E8E:0x3446,
0xE58E93:0x3447,0xE58E94:0x3448,0xE58E99:0x3449,0xE58E9D:0x344A,0xE58EA1:0x344B,
0xE58EA4:0x344C,0xE58EAA:0x344D,0xE58EAB:0x344E,0xE58EAF:0x344F,0xE58EB2:0x3450,
0xE58EB4:0x3451,0xE58EB5:0x3452,0xE58EB7:0x3453,0xE58EB8:0x3454,0xE58EBA:0x3455,
0xE58EBD:0x3456,0xE58F80:0x3457,0xE58F85:0x3458,0xE58F8F:0x3459,0xE58F92:0x345A,
0xE58F93:0x345B,0xE58F95:0x345C,0xE58F9A:0x345D,0xE58F9D:0x345E,0xE58F9E:0x345F,
0xE58FA0:0x3460,0xE58FA6:0x3461,0xE58FA7:0x3462,0xE58FB5:0x3463,0xE59082:0x3464,
0xE59093:0x3465,0xE5909A:0x3466,0xE590A1:0x3467,0xE590A7:0x3468,0xE590A8:0x3469,
0xE590AA:0x346A,0xE590AF:0x346B,0xE590B1:0x346C,0xE590B4:0x346D,0xE590B5:0x346E,
0xE59183:0x346F,0xE59184:0x3470,0xE59187:0x3471,0xE5918D:0x3472,0xE5918F:0x3473,
0xE5919E:0x3474,0xE591A2:0x3475,0xE591A4:0x3476,0xE591A6:0x3477,0xE591A7:0x3478,
0xE591A9:0x3479,0xE591AB:0x347A,0xE591AD:0x347B,0xE591AE:0x347C,0xE591B4:0x347D,
0xE591BF:0x347E,0xE59281:0x3521,0xE59283:0x3522,0xE59285:0x3523,0xE59288:0x3524,
0xE59289:0x3525,0xE5928D:0x3526,0xE59291:0x3527,0xE59295:0x3528,0xE59296:0x3529,
0xE5929C:0x352A,0xE5929F:0x352B,0xE592A1:0x352C,0xE592A6:0x352D,0xE592A7:0x352E,
0xE592A9:0x352F,0xE592AA:0x3530,0xE592AD:0x3531,0xE592AE:0x3532,0xE592B1:0x3533,
0xE592B7:0x3534,0xE592B9:0x3535,0xE592BA:0x3536,0xE592BB:0x3537,0xE592BF:0x3538,
0xE59386:0x3539,0xE5938A:0x353A,0xE5938D:0x353B,0xE5938E:0x353C,0xE593A0:0x353D,
0xE593AA:0x353E,0xE593AC:0x353F,0xE593AF:0x3540,0xE593B6:0x3541,0xE593BC:0x3542,
0xE593BE:0x3543,0xE593BF:0x3544,0xE59480:0x3545,0xE59481:0x3546,0xE59485:0x3547,
0xE59488:0x3548,0xE59489:0x3549,0xE5948C:0x354A,0xE5948D:0x354B,0xE5948E:0x354C,
0xE59495:0x354D,0xE594AA:0x354E,0xE594AB:0x354F,0xE594B2:0x3550,0xE594B5:0x3551,
0xE594B6:0x3552,0xE594BB:0x3553,0xE594BC:0x3554,0xE594BD:0x3555,0xE59581:0x3556,
0xE59587:0x3557,0xE59589:0x3558,0xE5958A:0x3559,0xE5958D:0x355A,0xE59590:0x355B,
0xE59591:0x355C,0xE59598:0x355D,0xE5959A:0x355E,0xE5959B:0x355F,0xE5959E:0x3560,
0xE595A0:0x3561,0xE595A1:0x3562,0xE595A4:0x3563,0xE595A6:0x3564,0xE595BF:0x3565,
0xE59681:0x3566,0xE59682:0x3567,0xE59686:0x3568,0xE59688:0x3569,0xE5968E:0x356A,
0xE5968F:0x356B,0xE59691:0x356C,0xE59692:0x356D,0xE59693:0x356E,0xE59694:0x356F,
0xE59697:0x3570,0xE596A3:0x3571,0xE596A4:0x3572,0xE596AD:0x3573,0xE596B2:0x3574,
0xE596BF:0x3575,0xE59781:0x3576,0xE59783:0x3577,0xE59786:0x3578,0xE59789:0x3579,
0xE5978B:0x357A,0xE5978C:0x357B,0xE5978E:0x357C,0xE59791:0x357D,0xE59792:0x357E,
0xE59793:0x3621,0xE59797:0x3622,0xE59798:0x3623,0xE5979B:0x3624,0xE5979E:0x3625,
0xE597A2:0x3626,0xE597A9:0x3627,0xE597B6:0x3628,0xE597BF:0x3629,0xE59885:0x362A,
0xE59888:0x362B,0xE5988A:0x362C,0xE5988D:0x362D,0xE5988E:0x362E,0xE5988F:0x362F,
0xE59890:0x3630,0xE59891:0x3631,0xE59892:0x3632,0xE59899:0x3633,0xE598AC:0x3634,
0xE598B0:0x3635,0xE598B3:0x3636,0xE598B5:0x3637,0xE598B7:0x3638,0xE598B9:0x3639,
0xE598BB:0x363A,0xE598BC:0x363B,0xE598BD:0x363C,0xE598BF:0x363D,0xE59980:0x363E,
0xE59981:0x363F,0xE59983:0x3640,0xE59984:0x3641,0xE59986:0x3642,0xE59989:0x3643,
0xE5998B:0x3644,0xE5998D:0x3645,0xE5998F:0x3646,0xE59994:0x3647,0xE5999E:0x3648,
0xE599A0:0x3649,0xE599A1:0x364A,0xE599A2:0x364B,0xE599A3:0x364C,0xE599A6:0x364D,
0xE599A9:0x364E,0xE599AD:0x364F,0xE599AF:0x3650,0xE599B1:0x3651,0xE599B2:0x3652,
0xE599B5:0x3653,0xE59A84:0x3654,0xE59A85:0x3655,0xE59A88:0x3656,0xE59A8B:0x3657,
0xE59A8C:0x3658,0xE59A95:0x3659,0xE59A99:0x365A,0xE59A9A:0x365B,0xE59A9D:0x365C,
0xE59A9E:0x365D,0xE59A9F:0x365E,0xE59AA6:0x365F,0xE59AA7:0x3660,0xE59AA8:0x3661,
0xE59AA9:0x3662,0xE59AAB:0x3663,0xE59AAC:0x3664,0xE59AAD:0x3665,0xE59AB1:0x3666,
0xE59AB3:0x3667,0xE59AB7:0x3668,0xE59ABE:0x3669,0xE59B85:0x366A,0xE59B89:0x366B,
0xE59B8A:0x366C,0xE59B8B:0x366D,0xE59B8F:0x366E,0xE59B90:0x366F,0xE59B8C:0x3670,
0xE59B8D:0x3671,0xE59B99:0x3672,0xE59B9C:0x3673,0xE59B9D:0x3674,0xE59B9F:0x3675,
0xE59BA1:0x3676,0xE59BA4:0x3677,0xE59BA5:0x3678,0xE59BA6:0x3679,0xE59BA7:0x367A,
0xE59BA8:0x367B,0xE59BB1:0x367C,0xE59BAB:0x367D,0xE59BAD:0x367E,0xE59BB6:0x3721,
0xE59BB7:0x3722,0xE59C81:0x3723,0xE59C82:0x3724,0xE59C87:0x3725,0xE59C8A:0x3726,
0xE59C8C:0x3727,0xE59C91:0x3728,0xE59C95:0x3729,0xE59C9A:0x372A,0xE59C9B:0x372B,
0xE59C9D:0x372C,0xE59CA0:0x372D,0xE59CA2:0x372E,0xE59CA3:0x372F,0xE59CA4:0x3730,
0xE59CA5:0x3731,0xE59CA9:0x3732,0xE59CAA:0x3733,0xE59CAC:0x3734,0xE59CAE:0x3735,
0xE59CAF:0x3736,0xE59CB3:0x3737,0xE59CB4:0x3738,0xE59CBD:0x3739,0xE59CBE:0x373A,
0xE59CBF:0x373B,0xE59D85:0x373C,0xE59D86:0x373D,0xE59D8C:0x373E,0xE59D8D:0x373F,
0xE59D92:0x3740,0xE59DA2:0x3741,0xE59DA5:0x3742,0xE59DA7:0x3743,0xE59DA8:0x3744,
0xE59DAB:0x3745,0xE59DAD:0x3746,0xE59DAE:0x3747,0xE59DAF:0x3748,0xE59DB0:0x3749,
0xE59DB1:0x374A,0xE59DB3:0x374B,0xE59DB4:0x374C,0xE59DB5:0x374D,0xE59DB7:0x374E,
0xE59DB9:0x374F,0xE59DBA:0x3750,0xE59DBB:0x3751,0xE59DBC:0x3752,0xE59DBE:0x3753,
0xE59E81:0x3754,0xE59E83:0x3755,0xE59E8C:0x3756,0xE59E94:0x3757,0xE59E97:0x3758,
0xE59E99:0x3759,0xE59E9A:0x375A,0xE59E9C:0x375B,0xE59E9D:0x375C,0xE59E9E:0x375D,
0xE59E9F:0x375E,0xE59EA1:0x375F,0xE59E95:0x3760,0xE59EA7:0x3761,0xE59EA8:0x3762,
0xE59EA9:0x3763,0xE59EAC:0x3764,0xE59EB8:0x3765,0xE59EBD:0x3766,0xE59F87:0x3767,
0xE59F88:0x3768,0xE59F8C:0x3769,0xE59F8F:0x376A,0xE59F95:0x376B,0xE59F9D:0x376C,
0xE59F9E:0x376D,0xE59FA4:0x376E,0xE59FA6:0x376F,0xE59FA7:0x3770,0xE59FA9:0x3771,
0xE59FAD:0x3772,0xE59FB0:0x3773,0xE59FB5:0x3774,0xE59FB6:0x3775,0xE59FB8:0x3776,
0xE59FBD:0x3777,0xE59FBE:0x3778,0xE59FBF:0x3779,0xE5A083:0x377A,0xE5A084:0x377B,
0xE5A088:0x377C,0xE5A089:0x377D,0xE59FA1:0x377E,0xE5A08C:0x3821,0xE5A08D:0x3822,
0xE5A09B:0x3823,0xE5A09E:0x3824,0xE5A09F:0x3825,0xE5A0A0:0x3826,0xE5A0A6:0x3827,
0xE5A0A7:0x3828,0xE5A0AD:0x3829,0xE5A0B2:0x382A,0xE5A0B9:0x382B,0xE5A0BF:0x382C,
0xE5A189:0x382D,0xE5A18C:0x382E,0xE5A18D:0x382F,0xE5A18F:0x3830,0xE5A190:0x3831,
0xE5A195:0x3832,0xE5A19F:0x3833,0xE5A1A1:0x3834,0xE5A1A4:0x3835,0xE5A1A7:0x3836,
0xE5A1A8:0x3837,0xE5A1B8:0x3838,0xE5A1BC:0x3839,0xE5A1BF:0x383A,0xE5A280:0x383B,
0xE5A281:0x383C,0xE5A287:0x383D,0xE5A288:0x383E,0xE5A289:0x383F,0xE5A28A:0x3840,
0xE5A28C:0x3841,0xE5A28D:0x3842,0xE5A28F:0x3843,0xE5A290:0x3844,0xE5A294:0x3845,
0xE5A296:0x3846,0xE5A29D:0x3847,0xE5A2A0:0x3848,0xE5A2A1:0x3849,0xE5A2A2:0x384A,
0xE5A2A6:0x384B,0xE5A2A9:0x384C,0xE5A2B1:0x384D,0xE5A2B2:0x384E,0xE5A384:0x384F,
0xE5A2BC:0x3850,0xE5A382:0x3851,0xE5A388:0x3852,0xE5A38D:0x3853,0xE5A38E:0x3854,
0xE5A390:0x3855,0xE5A392:0x3856,0xE5A394:0x3857,0xE5A396:0x3858,0xE5A39A:0x3859,
0xE5A39D:0x385A,0xE5A3A1:0x385B,0xE5A3A2:0x385C,0xE5A3A9:0x385D,0xE5A3B3:0x385E,
0xE5A485:0x385F,0xE5A486:0x3860,0xE5A48B:0x3861,0xE5A48C:0x3862,0xE5A492:0x3863,
0xE5A493:0x3864,0xE5A494:0x3865,0xE89981:0x3866,0xE5A49D:0x3867,0xE5A4A1:0x3868,
0xE5A4A3:0x3869,0xE5A4A4:0x386A,0xE5A4A8:0x386B,0xE5A4AF:0x386C,0xE5A4B0:0x386D,
0xE5A4B3:0x386E,0xE5A4B5:0x386F,0xE5A4B6:0x3870,0xE5A4BF:0x3871,0xE5A583:0x3872,
0xE5A586:0x3873,0xE5A592:0x3874,0xE5A593:0x3875,0xE5A599:0x3876,0xE5A59B:0x3877,
0xE5A59D:0x3878,0xE5A59E:0x3879,0xE5A59F:0x387A,0xE5A5A1:0x387B,0xE5A5A3:0x387C,
0xE5A5AB:0x387D,0xE5A5AD:0x387E,0xE5A5AF:0x3921,0xE5A5B2:0x3922,0xE5A5B5:0x3923,
0xE5A5B6:0x3924,0xE5A5B9:0x3925,0xE5A5BB:0x3926,0xE5A5BC:0x3927,0xE5A68B:0x3928,
0xE5A68C:0x3929,0xE5A68E:0x392A,0xE5A692:0x392B,0xE5A695:0x392C,0xE5A697:0x392D,
0xE5A69F:0x392E,0xE5A6A4:0x392F,0xE5A6A7:0x3930,0xE5A6AD:0x3931,0xE5A6AE:0x3932,
0xE5A6AF:0x3933,0xE5A6B0:0x3934,0xE5A6B3:0x3935,0xE5A6B7:0x3936,0xE5A6BA:0x3937,
0xE5A6BC:0x3938,0xE5A781:0x3939,0xE5A783:0x393A,0xE5A784:0x393B,0xE5A788:0x393C,
0xE5A78A:0x393D,0xE5A78D:0x393E,0xE5A792:0x393F,0xE5A79D:0x3940,0xE5A79E:0x3941,
0xE5A79F:0x3942,0xE5A7A3:0x3943,0xE5A7A4:0x3944,0xE5A7A7:0x3945,0xE5A7AE:0x3946,
0xE5A7AF:0x3947,0xE5A7B1:0x3948,0xE5A7B2:0x3949,0xE5A7B4:0x394A,0xE5A7B7:0x394B,
0xE5A880:0x394C,0xE5A884:0x394D,0xE5A88C:0x394E,0xE5A88D:0x394F,0xE5A88E:0x3950,
0xE5A892:0x3951,0xE5A893:0x3952,0xE5A89E:0x3953,0xE5A8A3:0x3954,0xE5A8A4:0x3955,
0xE5A8A7:0x3956,0xE5A8A8:0x3957,0xE5A8AA:0x3958,0xE5A8AD:0x3959,0xE5A8B0:0x395A,
0xE5A984:0x395B,0xE5A985:0x395C,0xE5A987:0x395D,0xE5A988:0x395E,0xE5A98C:0x395F,
0xE5A990:0x3960,0xE5A995:0x3961,0xE5A99E:0x3962,0xE5A9A3:0x3963,0xE5A9A5:0x3964,
0xE5A9A7:0x3965,0xE5A9AD:0x3966,0xE5A9B7:0x3967,0xE5A9BA:0x3968,0xE5A9BB:0x3969,
0xE5A9BE:0x396A,0xE5AA8B:0x396B,0xE5AA90:0x396C,0xE5AA93:0x396D,0xE5AA96:0x396E,
0xE5AA99:0x396F,0xE5AA9C:0x3970,0xE5AA9E:0x3971,0xE5AA9F:0x3972,0xE5AAA0:0x3973,
0xE5AAA2:0x3974,0xE5AAA7:0x3975,0xE5AAAC:0x3976,0xE5AAB1:0x3977,0xE5AAB2:0x3978,
0xE5AAB3:0x3979,0xE5AAB5:0x397A,0xE5AAB8:0x397B,0xE5AABA:0x397C,0xE5AABB:0x397D,
0xE5AABF:0x397E,0xE5AB84:0x3A21,0xE5AB86:0x3A22,0xE5AB88:0x3A23,0xE5AB8F:0x3A24,
0xE5AB9A:0x3A25,0xE5AB9C:0x3A26,0xE5ABA0:0x3A27,0xE5ABA5:0x3A28,0xE5ABAA:0x3A29,
0xE5ABAE:0x3A2A,0xE5ABB5:0x3A2B,0xE5ABB6:0x3A2C,0xE5ABBD:0x3A2D,0xE5AC80:0x3A2E,
0xE5AC81:0x3A2F,0xE5AC88:0x3A30,0xE5AC97:0x3A31,0xE5ACB4:0x3A32,0xE5AC99:0x3A33,
0xE5AC9B:0x3A34,0xE5AC9D:0x3A35,0xE5ACA1:0x3A36,0xE5ACA5:0x3A37,0xE5ACAD:0x3A38,
0xE5ACB8:0x3A39,0xE5AD81:0x3A3A,0xE5AD8B:0x3A3B,0xE5AD8C:0x3A3C,0xE5AD92:0x3A3D,
0xE5AD96:0x3A3E,0xE5AD9E:0x3A3F,0xE5ADA8:0x3A40,0xE5ADAE:0x3A41,0xE5ADAF:0x3A42,
0xE5ADBC:0x3A43,0xE5ADBD:0x3A44,0xE5ADBE:0x3A45,0xE5ADBF:0x3A46,0xE5AE81:0x3A47,
0xE5AE84:0x3A48,0xE5AE86:0x3A49,0xE5AE8A:0x3A4A,0xE5AE8E:0x3A4B,0xE5AE90:0x3A4C,
0xE5AE91:0x3A4D,0xE5AE93:0x3A4E,0xE5AE94:0x3A4F,0xE5AE96:0x3A50,0xE5AEA8:0x3A51,
0xE5AEA9:0x3A52,0xE5AEAC:0x3A53,0xE5AEAD:0x3A54,0xE5AEAF:0x3A55,0xE5AEB1:0x3A56,
0xE5AEB2:0x3A57,0xE5AEB7:0x3A58,0xE5AEBA:0x3A59,0xE5AEBC:0x3A5A,0xE5AF80:0x3A5B,
0xE5AF81:0x3A5C,0xE5AF8D:0x3A5D,0xE5AF8F:0x3A5E,0xE5AF96:0x3A5F,0xE5AF97:0x3A60,
0xE5AF98:0x3A61,0xE5AF99:0x3A62,0xE5AF9A:0x3A63,0xE5AFA0:0x3A64,0xE5AFAF:0x3A65,
0xE5AFB1:0x3A66,0xE5AFB4:0x3A67,0xE5AFBD:0x3A68,0xE5B08C:0x3A69,0xE5B097:0x3A6A,
0xE5B09E:0x3A6B,0xE5B09F:0x3A6C,0xE5B0A3:0x3A6D,0xE5B0A6:0x3A6E,0xE5B0A9:0x3A6F,
0xE5B0AB:0x3A70,0xE5B0AC:0x3A71,0xE5B0AE:0x3A72,0xE5B0B0:0x3A73,0xE5B0B2:0x3A74,
0xE5B0B5:0x3A75,0xE5B0B6:0x3A76,0xE5B199:0x3A77,0xE5B19A:0x3A78,0xE5B19C:0x3A79,
0xE5B1A2:0x3A7A,0xE5B1A3:0x3A7B,0xE5B1A7:0x3A7C,0xE5B1A8:0x3A7D,0xE5B1A9:0x3A7E,
0xE5B1AD:0x3B21,0xE5B1B0:0x3B22,0xE5B1B4:0x3B23,0xE5B1B5:0x3B24,0xE5B1BA:0x3B25,
0xE5B1BB:0x3B26,0xE5B1BC:0x3B27,0xE5B1BD:0x3B28,0xE5B287:0x3B29,0xE5B288:0x3B2A,
0xE5B28A:0x3B2B,0xE5B28F:0x3B2C,0xE5B292:0x3B2D,0xE5B29D:0x3B2E,0xE5B29F:0x3B2F,
0xE5B2A0:0x3B30,0xE5B2A2:0x3B31,0xE5B2A3:0x3B32,0xE5B2A6:0x3B33,0xE5B2AA:0x3B34,
0xE5B2B2:0x3B35,0xE5B2B4:0x3B36,0xE5B2B5:0x3B37,0xE5B2BA:0x3B38,0xE5B389:0x3B39,
0xE5B38B:0x3B3A,0xE5B392:0x3B3B,0xE5B39D:0x3B3C,0xE5B397:0x3B3D,0xE5B3AE:0x3B3E,
0xE5B3B1:0x3B3F,0xE5B3B2:0x3B40,0xE5B3B4:0x3B41,0xE5B481:0x3B42,0xE5B486:0x3B43,
0xE5B48D:0x3B44,0xE5B492:0x3B45,0xE5B4AB:0x3B46,0xE5B4A3:0x3B47,0xE5B4A4:0x3B48,
0xE5B4A6:0x3B49,0xE5B4A7:0x3B4A,0xE5B4B1:0x3B4B,0xE5B4B4:0x3B4C,0xE5B4B9:0x3B4D,
0xE5B4BD:0x3B4E,0xE5B4BF:0x3B4F,0xE5B582:0x3B50,0xE5B583:0x3B51,0xE5B586:0x3B52,
0xE5B588:0x3B53,0xE5B595:0x3B54,0xE5B591:0x3B55,0xE5B599:0x3B56,0xE5B58A:0x3B57,
0xE5B59F:0x3B58,0xE5B5A0:0x3B59,0xE5B5A1:0x3B5A,0xE5B5A2:0x3B5B,0xE5B5A4:0x3B5C,
0xE5B5AA:0x3B5D,0xE5B5AD:0x3B5E,0xE5B5B0:0x3B5F,0xE5B5B9:0x3B60,0xE5B5BA:0x3B61,
0xE5B5BE:0x3B62,0xE5B5BF:0x3B63,0xE5B681:0x3B64,0xE5B683:0x3B65,0xE5B688:0x3B66,
0xE5B68A:0x3B67,0xE5B692:0x3B68,0xE5B693:0x3B69,0xE5B694:0x3B6A,0xE5B695:0x3B6B,
0xE5B699:0x3B6C,0xE5B69B:0x3B6D,0xE5B69F:0x3B6E,0xE5B6A0:0x3B6F,0xE5B6A7:0x3B70,
0xE5B6AB:0x3B71,0xE5B6B0:0x3B72,0xE5B6B4:0x3B73,0xE5B6B8:0x3B74,0xE5B6B9:0x3B75,
0xE5B783:0x3B76,0xE5B787:0x3B77,0xE5B78B:0x3B78,0xE5B790:0x3B79,0xE5B78E:0x3B7A,
0xE5B798:0x3B7B,0xE5B799:0x3B7C,0xE5B7A0:0x3B7D,0xE5B7A4:0x3B7E,0xE5B7A9:0x3C21,
0xE5B7B8:0x3C22,0xE5B7B9:0x3C23,0xE5B880:0x3C24,0xE5B887:0x3C25,0xE5B88D:0x3C26,
0xE5B892:0x3C27,0xE5B894:0x3C28,0xE5B895:0x3C29,0xE5B898:0x3C2A,0xE5B89F:0x3C2B,
0xE5B8A0:0x3C2C,0xE5B8AE:0x3C2D,0xE5B8A8:0x3C2E,0xE5B8B2:0x3C2F,0xE5B8B5:0x3C30,
0xE5B8BE:0x3C31,0xE5B98B:0x3C32,0xE5B990:0x3C33,0xE5B989:0x3C34,0xE5B991:0x3C35,
0xE5B996:0x3C36,0xE5B998:0x3C37,0xE5B99B:0x3C38,0xE5B99C:0x3C39,0xE5B99E:0x3C3A,
0xE5B9A8:0x3C3B,0xE5B9AA:0x3C3C,0xE5B9AB:0x3C3D,0xE5B9AC:0x3C3E,0xE5B9AD:0x3C3F,
0xE5B9AE:0x3C40,0xE5B9B0:0x3C41,0xE5BA80:0x3C42,0xE5BA8B:0x3C43,0xE5BA8E:0x3C44,
0xE5BAA2:0x3C45,0xE5BAA4:0x3C46,0xE5BAA5:0x3C47,0xE5BAA8:0x3C48,0xE5BAAA:0x3C49,
0xE5BAAC:0x3C4A,0xE5BAB1:0x3C4B,0xE5BAB3:0x3C4C,0xE5BABD:0x3C4D,0xE5BABE:0x3C4E,
0xE5BABF:0x3C4F,0xE5BB86:0x3C50,0xE5BB8C:0x3C51,0xE5BB8B:0x3C52,0xE5BB8E:0x3C53,
0xE5BB91:0x3C54,0xE5BB92:0x3C55,0xE5BB94:0x3C56,0xE5BB95:0x3C57,0xE5BB9C:0x3C58,
0xE5BB9E:0x3C59,0xE5BBA5:0x3C5A,0xE5BBAB:0x3C5B,0xE5BC82:0x3C5C,0xE5BC86:0x3C5D,
0xE5BC87:0x3C5E,0xE5BC88:0x3C5F,0xE5BC8E:0x3C60,0xE5BC99:0x3C61,0xE5BC9C:0x3C62,
0xE5BC9D:0x3C63,0xE5BCA1:0x3C64,0xE5BCA2:0x3C65,0xE5BCA3:0x3C66,0xE5BCA4:0x3C67,
0xE5BCA8:0x3C68,0xE5BCAB:0x3C69,0xE5BCAC:0x3C6A,0xE5BCAE:0x3C6B,0xE5BCB0:0x3C6C,
0xE5BCB4:0x3C6D,0xE5BCB6:0x3C6E,0xE5BCBB:0x3C6F,0xE5BCBD:0x3C70,0xE5BCBF:0x3C71,
0xE5BD80:0x3C72,0xE5BD84:0x3C73,0xE5BD85:0x3C74,0xE5BD87:0x3C75,0xE5BD8D:0x3C76,
0xE5BD90:0x3C77,0xE5BD94:0x3C78,0xE5BD98:0x3C79,0xE5BD9B:0x3C7A,0xE5BDA0:0x3C7B,
0xE5BDA3:0x3C7C,0xE5BDA4:0x3C7D,0xE5BDA7:0x3C7E,0xE5BDAF:0x3D21,0xE5BDB2:0x3D22,
0xE5BDB4:0x3D23,0xE5BDB5:0x3D24,0xE5BDB8:0x3D25,0xE5BDBA:0x3D26,0xE5BDBD:0x3D27,
0xE5BDBE:0x3D28,0xE5BE89:0x3D29,0xE5BE8D:0x3D2A,0xE5BE8F:0x3D2B,0xE5BE96:0x3D2C,
0xE5BE9C:0x3D2D,0xE5BE9D:0x3D2E,0xE5BEA2:0x3D2F,0xE5BEA7:0x3D30,0xE5BEAB:0x3D31,
0xE5BEA4:0x3D32,0xE5BEAC:0x3D33,0xE5BEAF:0x3D34,0xE5BEB0:0x3D35,0xE5BEB1:0x3D36,
0xE5BEB8:0x3D37,0xE5BF84:0x3D38,0xE5BF87:0x3D39,0xE5BF88:0x3D3A,0xE5BF89:0x3D3B,
0xE5BF8B:0x3D3C,0xE5BF90:0x3D3D,0xE5BF91:0x3D3E,0xE5BF92:0x3D3F,0xE5BF93:0x3D40,
0xE5BF94:0x3D41,0xE5BF9E:0x3D42,0xE5BFA1:0x3D43,0xE5BFA2:0x3D44,0xE5BFA8:0x3D45,
0xE5BFA9:0x3D46,0xE5BFAA:0x3D47,0xE5BFAC:0x3D48,0xE5BFAD:0x3D49,0xE5BFAE:0x3D4A,
0xE5BFAF:0x3D4B,0xE5BFB2:0x3D4C,0xE5BFB3:0x3D4D,0xE5BFB6:0x3D4E,0xE5BFBA:0x3D4F,
0xE5BFBC:0x3D50,0xE68087:0x3D51,0xE6808A:0x3D52,0xE6808D:0x3D53,0xE68093:0x3D54,
0xE68094:0x3D55,0xE68097:0x3D56,0xE68098:0x3D57,0xE6809A:0x3D58,0xE6809F:0x3D59,
0xE680A4:0x3D5A,0xE680AD:0x3D5B,0xE680B3:0x3D5C,0xE680B5:0x3D5D,0xE68180:0x3D5E,
0xE68187:0x3D5F,0xE68188:0x3D60,0xE68189:0x3D61,0xE6818C:0x3D62,0xE68191:0x3D63,
0xE68194:0x3D64,0xE68196:0x3D65,0xE68197:0x3D66,0xE6819D:0x3D67,0xE681A1:0x3D68,
0xE681A7:0x3D69,0xE681B1:0x3D6A,0xE681BE:0x3D6B,0xE681BF:0x3D6C,0xE68282:0x3D6D,
0xE68286:0x3D6E,0xE68288:0x3D6F,0xE6828A:0x3D70,0xE6828E:0x3D71,0xE68291:0x3D72,
0xE68293:0x3D73,0xE68295:0x3D74,0xE68298:0x3D75,0xE6829D:0x3D76,0xE6829E:0x3D77,
0xE682A2:0x3D78,0xE682A4:0x3D79,0xE682A5:0x3D7A,0xE682A8:0x3D7B,0xE682B0:0x3D7C,
0xE682B1:0x3D7D,0xE682B7:0x3D7E,0xE682BB:0x3E21,0xE682BE:0x3E22,0xE68382:0x3E23,
0xE68384:0x3E24,0xE68388:0x3E25,0xE68389:0x3E26,0xE6838A:0x3E27,0xE6838B:0x3E28,
0xE6838E:0x3E29,0xE6838F:0x3E2A,0xE68394:0x3E2B,0xE68395:0x3E2C,0xE68399:0x3E2D,
0xE6839B:0x3E2E,0xE6839D:0x3E2F,0xE6839E:0x3E30,0xE683A2:0x3E31,0xE683A5:0x3E32,
0xE683B2:0x3E33,0xE683B5:0x3E34,0xE683B8:0x3E35,0xE683BC:0x3E36,0xE683BD:0x3E37,
0xE68482:0x3E38,0xE68487:0x3E39,0xE6848A:0x3E3A,0xE6848C:0x3E3B,0xE68490:0x3E3C,
0xE68491:0x3E3D,0xE68492:0x3E3E,0xE68493:0x3E3F,0xE68494:0x3E40,0xE68496:0x3E41,
0xE68497:0x3E42,0xE68499:0x3E43,0xE6849C:0x3E44,0xE6849E:0x3E45,0xE684A2:0x3E46,
0xE684AA:0x3E47,0xE684AB:0x3E48,0xE684B0:0x3E49,0xE684B1:0x3E4A,0xE684B5:0x3E4B,
0xE684B6:0x3E4C,0xE684B7:0x3E4D,0xE684B9:0x3E4E,0xE68581:0x3E4F,0xE68585:0x3E50,
0xE68586:0x3E51,0xE68589:0x3E52,0xE6859E:0x3E53,0xE685A0:0x3E54,0xE685AC:0x3E55,
0xE685B2:0x3E56,0xE685B8:0x3E57,0xE685BB:0x3E58,0xE685BC:0x3E59,0xE685BF:0x3E5A,
0xE68680:0x3E5B,0xE68681:0x3E5C,0xE68683:0x3E5D,0xE68684:0x3E5E,0xE6868B:0x3E5F,
0xE6868D:0x3E60,0xE68692:0x3E61,0xE68693:0x3E62,0xE68697:0x3E63,0xE68698:0x3E64,
0xE6869C:0x3E65,0xE6869D:0x3E66,0xE6869F:0x3E67,0xE686A0:0x3E68,0xE686A5:0x3E69,
0xE686A8:0x3E6A,0xE686AA:0x3E6B,0xE686AD:0x3E6C,0xE686B8:0x3E6D,0xE686B9:0x3E6E,
0xE686BC:0x3E6F,0xE68780:0x3E70,0xE68781:0x3E71,0xE68782:0x3E72,0xE6878E:0x3E73,
0xE6878F:0x3E74,0xE68795:0x3E75,0xE6879C:0x3E76,0xE6879D:0x3E77,0xE6879E:0x3E78,
0xE6879F:0x3E79,0xE687A1:0x3E7A,0xE687A2:0x3E7B,0xE687A7:0x3E7C,0xE687A9:0x3E7D,
0xE687A5:0x3E7E,0xE687AC:0x3F21,0xE687AD:0x3F22,0xE687AF:0x3F23,0xE68881:0x3F24,
0xE68883:0x3F25,0xE68884:0x3F26,0xE68887:0x3F27,0xE68893:0x3F28,0xE68895:0x3F29,
0xE6889C:0x3F2A,0xE688A0:0x3F2B,0xE688A2:0x3F2C,0xE688A3:0x3F2D,0xE688A7:0x3F2E,
0xE688A9:0x3F2F,0xE688AB:0x3F30,0xE688B9:0x3F31,0xE688BD:0x3F32,0xE68982:0x3F33,
0xE68983:0x3F34,0xE68984:0x3F35,0xE68986:0x3F36,0xE6898C:0x3F37,0xE68990:0x3F38,
0xE68991:0x3F39,0xE68992:0x3F3A,0xE68994:0x3F3B,0xE68996:0x3F3C,0xE6899A:0x3F3D,
0xE6899C:0x3F3E,0xE689A4:0x3F3F,0xE689AD:0x3F40,0xE689AF:0x3F41,0xE689B3:0x3F42,
0xE689BA:0x3F43,0xE689BD:0x3F44,0xE68A8D:0x3F45,0xE68A8E:0x3F46,0xE68A8F:0x3F47,
0xE68A90:0x3F48,0xE68AA6:0x3F49,0xE68AA8:0x3F4A,0xE68AB3:0x3F4B,0xE68AB6:0x3F4C,
0xE68AB7:0x3F4D,0xE68ABA:0x3F4E,0xE68ABE:0x3F4F,0xE68ABF:0x3F50,0xE68B84:0x3F51,
0xE68B8E:0x3F52,0xE68B95:0x3F53,0xE68B96:0x3F54,0xE68B9A:0x3F55,0xE68BAA:0x3F56,
0xE68BB2:0x3F57,0xE68BB4:0x3F58,0xE68BBC:0x3F59,0xE68BBD:0x3F5A,0xE68C83:0x3F5B,
0xE68C84:0x3F5C,0xE68C8A:0x3F5D,0xE68C8B:0x3F5E,0xE68C8D:0x3F5F,0xE68C90:0x3F60,
0xE68C93:0x3F61,0xE68C96:0x3F62,0xE68C98:0x3F63,0xE68CA9:0x3F64,0xE68CAA:0x3F65,
0xE68CAD:0x3F66,0xE68CB5:0x3F67,0xE68CB6:0x3F68,0xE68CB9:0x3F69,0xE68CBC:0x3F6A,
0xE68D81:0x3F6B,0xE68D82:0x3F6C,0xE68D83:0x3F6D,0xE68D84:0x3F6E,0xE68D86:0x3F6F,
0xE68D8A:0x3F70,0xE68D8B:0x3F71,0xE68D8E:0x3F72,0xE68D92:0x3F73,0xE68D93:0x3F74,
0xE68D94:0x3F75,0xE68D98:0x3F76,0xE68D9B:0x3F77,0xE68DA5:0x3F78,0xE68DA6:0x3F79,
0xE68DAC:0x3F7A,0xE68DAD:0x3F7B,0xE68DB1:0x3F7C,0xE68DB4:0x3F7D,0xE68DB5:0x3F7E,
0xE68DB8:0x4021,0xE68DBC:0x4022,0xE68DBD:0x4023,0xE68DBF:0x4024,0xE68E82:0x4025,
0xE68E84:0x4026,0xE68E87:0x4027,0xE68E8A:0x4028,0xE68E90:0x4029,0xE68E94:0x402A,
0xE68E95:0x402B,0xE68E99:0x402C,0xE68E9A:0x402D,0xE68E9E:0x402E,0xE68EA4:0x402F,
0xE68EA6:0x4030,0xE68EAD:0x4031,0xE68EAE:0x4032,0xE68EAF:0x4033,0xE68EBD:0x4034,
0xE68F81:0x4035,0xE68F85:0x4036,0xE68F88:0x4037,0xE68F8E:0x4038,0xE68F91:0x4039,
0xE68F93:0x403A,0xE68F94:0x403B,0xE68F95:0x403C,0xE68F9C:0x403D,0xE68FA0:0x403E,
0xE68FA5:0x403F,0xE68FAA:0x4040,0xE68FAC:0x4041,0xE68FB2:0x4042,0xE68FB3:0x4043,
0xE68FB5:0x4044,0xE68FB8:0x4045,0xE68FB9:0x4046,0xE69089:0x4047,0xE6908A:0x4048,
0xE69090:0x4049,0xE69092:0x404A,0xE69094:0x404B,0xE69098:0x404C,0xE6909E:0x404D,
0xE690A0:0x404E,0xE690A2:0x404F,0xE690A4:0x4050,0xE690A5:0x4051,0xE690A9:0x4052,
0xE690AA:0x4053,0xE690AF:0x4054,0xE690B0:0x4055,0xE690B5:0x4056,0xE690BD:0x4057,
0xE690BF:0x4058,0xE6918B:0x4059,0xE6918F:0x405A,0xE69191:0x405B,0xE69192:0x405C,
0xE69193:0x405D,0xE69194:0x405E,0xE6919A:0x405F,0xE6919B:0x4060,0xE6919C:0x4061,
0xE6919D:0x4062,0xE6919F:0x4063,0xE691A0:0x4064,0xE691A1:0x4065,0xE691A3:0x4066,
0xE691AD:0x4067,0xE691B3:0x4068,0xE691B4:0x4069,0xE691BB:0x406A,0xE691BD:0x406B,
0xE69285:0x406C,0xE69287:0x406D,0xE6928F:0x406E,0xE69290:0x406F,0xE69291:0x4070,
0xE69298:0x4071,0xE69299:0x4072,0xE6929B:0x4073,0xE6929D:0x4074,0xE6929F:0x4075,
0xE692A1:0x4076,0xE692A3:0x4077,0xE692A6:0x4078,0xE692A8:0x4079,0xE692AC:0x407A,
0xE692B3:0x407B,0xE692BD:0x407C,0xE692BE:0x407D,0xE692BF:0x407E,0xE69384:0x4121,
0xE69389:0x4122,0xE6938A:0x4123,0xE6938B:0x4124,0xE6938C:0x4125,0xE6938E:0x4126,
0xE69390:0x4127,0xE69391:0x4128,0xE69395:0x4129,0xE69397:0x412A,0xE693A4:0x412B,
0xE693A5:0x412C,0xE693A9:0x412D,0xE693AA:0x412E,0xE693AD:0x412F,0xE693B0:0x4130,
0xE693B5:0x4131,0xE693B7:0x4132,0xE693BB:0x4133,0xE693BF:0x4134,0xE69481:0x4135,
0xE69484:0x4136,0xE69488:0x4137,0xE69489:0x4138,0xE6948A:0x4139,0xE6948F:0x413A,
0xE69493:0x413B,0xE69494:0x413C,0xE69496:0x413D,0xE69499:0x413E,0xE6949B:0x413F,
0xE6949E:0x4140,0xE6949F:0x4141,0xE694A2:0x4142,0xE694A6:0x4143,0xE694A9:0x4144,
0xE694AE:0x4145,0xE694B1:0x4146,0xE694BA:0x4147,0xE694BC:0x4148,0xE694BD:0x4149,
0xE69583:0x414A,0xE69587:0x414B,0xE69589:0x414C,0xE69590:0x414D,0xE69592:0x414E,
0xE69594:0x414F,0xE6959F:0x4150,0xE695A0:0x4151,0xE695A7:0x4152,0xE695AB:0x4153,
0xE695BA:0x4154,0xE695BD:0x4155,0xE69681:0x4156,0xE69685:0x4157,0xE6968A:0x4158,
0xE69692:0x4159,0xE69695:0x415A,0xE69698:0x415B,0xE6969D:0x415C,0xE696A0:0x415D,
0xE696A3:0x415E,0xE696A6:0x415F,0xE696AE:0x4160,0xE696B2:0x4161,0xE696B3:0x4162,
0xE696B4:0x4163,0xE696BF:0x4164,0xE69782:0x4165,0xE69788:0x4166,0xE69789:0x4167,
0xE6978E:0x4168,0xE69790:0x4169,0xE69794:0x416A,0xE69796:0x416B,0xE69798:0x416C,
0xE6979F:0x416D,0xE697B0:0x416E,0xE697B2:0x416F,0xE697B4:0x4170,0xE697B5:0x4171,
0xE697B9:0x4172,0xE697BE:0x4173,0xE697BF:0x4174,0xE69880:0x4175,0xE69884:0x4176,
0xE69888:0x4177,0xE69889:0x4178,0xE6988D:0x4179,0xE69891:0x417A,0xE69892:0x417B,
0xE69895:0x417C,0xE69896:0x417D,0xE6989D:0x417E,0xE6989E:0x4221,0xE698A1:0x4222,
0xE698A2:0x4223,0xE698A3:0x4224,0xE698A4:0x4225,0xE698A6:0x4226,0xE698A9:0x4227,
0xE698AA:0x4228,0xE698AB:0x4229,0xE698AC:0x422A,0xE698AE:0x422B,0xE698B0:0x422C,
0xE698B1:0x422D,0xE698B3:0x422E,0xE698B9:0x422F,0xE698B7:0x4230,0xE69980:0x4231,
0xE69985:0x4232,0xE69986:0x4233,0xE6998A:0x4234,0xE6998C:0x4235,0xE69991:0x4236,
0xE6998E:0x4237,0xE69997:0x4238,0xE69998:0x4239,0xE69999:0x423A,0xE6999B:0x423B,
0xE6999C:0x423C,0xE699A0:0x423D,0xE699A1:0x423E,0xE69BBB:0x423F,0xE699AA:0x4240,
0xE699AB:0x4241,0xE699AC:0x4242,0xE699BE:0x4243,0xE699B3:0x4244,0xE699B5:0x4245,
0xE699BF:0x4246,0xE699B7:0x4247,0xE699B8:0x4248,0xE699B9:0x4249,0xE699BB:0x424A,
0xE69A80:0x424B,0xE699BC:0x424C,0xE69A8B:0x424D,0xE69A8C:0x424E,0xE69A8D:0x424F,
0xE69A90:0x4250,0xE69A92:0x4251,0xE69A99:0x4252,0xE69A9A:0x4253,0xE69A9B:0x4254,
0xE69A9C:0x4255,0xE69A9F:0x4256,0xE69AA0:0x4257,0xE69AA4:0x4258,0xE69AAD:0x4259,
0xE69AB1:0x425A,0xE69AB2:0x425B,0xE69AB5:0x425C,0xE69ABB:0x425D,0xE69ABF:0x425E,
0xE69B80:0x425F,0xE69B82:0x4260,0xE69B83:0x4261,0xE69B88:0x4262,0xE69B8C:0x4263,
0xE69B8E:0x4264,0xE69B8F:0x4265,0xE69B94:0x4266,0xE69B9B:0x4267,0xE69B9F:0x4268,
0xE69BA8:0x4269,0xE69BAB:0x426A,0xE69BAC:0x426B,0xE69BAE:0x426C,0xE69BBA:0x426D,
0xE69C85:0x426E,0xE69C87:0x426F,0xE69C8E:0x4270,0xE69C93:0x4271,0xE69C99:0x4272,
0xE69C9C:0x4273,0xE69CA0:0x4274,0xE69CA2:0x4275,0xE69CB3:0x4276,0xE69CBE:0x4277,
0xE69D85:0x4278,0xE69D87:0x4279,0xE69D88:0x427A,0xE69D8C:0x427B,0xE69D94:0x427C,
0xE69D95:0x427D,0xE69D9D:0x427E,0xE69DA6:0x4321,0xE69DAC:0x4322,0xE69DAE:0x4323,
0xE69DB4:0x4324,0xE69DB6:0x4325,0xE69DBB:0x4326,0xE69E81:0x4327,0xE69E84:0x4328,
0xE69E8E:0x4329,0xE69E8F:0x432A,0xE69E91:0x432B,0xE69E93:0x432C,0xE69E96:0x432D,
0xE69E98:0x432E,0xE69E99:0x432F,0xE69E9B:0x4330,0xE69EB0:0x4331,0xE69EB1:0x4332,
0xE69EB2:0x4333,0xE69EB5:0x4334,0xE69EBB:0x4335,0xE69EBC:0x4336,0xE69EBD:0x4337,
0xE69FB9:0x4338,0xE69F80:0x4339,0xE69F82:0x433A,0xE69F83:0x433B,0xE69F85:0x433C,
0xE69F88:0x433D,0xE69F89:0x433E,0xE69F92:0x433F,0xE69F97:0x4340,0xE69F99:0x4341,
0xE69F9C:0x4342,0xE69FA1:0x4343,0xE69FA6:0x4344,0xE69FB0:0x4345,0xE69FB2:0x4346,
0xE69FB6:0x4347,0xE69FB7:0x4348,0xE6A192:0x4349,0xE6A094:0x434A,0xE6A099:0x434B,
0xE6A09D:0x434C,0xE6A09F:0x434D,0xE6A0A8:0x434E,0xE6A0A7:0x434F,0xE6A0AC:0x4350,
0xE6A0AD:0x4351,0xE6A0AF:0x4352,0xE6A0B0:0x4353,0xE6A0B1:0x4354,0xE6A0B3:0x4355,
0xE6A0BB:0x4356,0xE6A0BF:0x4357,0xE6A184:0x4358,0xE6A185:0x4359,0xE6A18A:0x435A,
0xE6A18C:0x435B,0xE6A195:0x435C,0xE6A197:0x435D,0xE6A198:0x435E,0xE6A19B:0x435F,
0xE6A1AB:0x4360,0xE6A1AE:0x4361,0xE6A1AF:0x4362,0xE6A1B0:0x4363,0xE6A1B1:0x4364,
0xE6A1B2:0x4365,0xE6A1B5:0x4366,0xE6A1B9:0x4367,0xE6A1BA:0x4368,0xE6A1BB:0x4369,
0xE6A1BC:0x436A,0xE6A282:0x436B,0xE6A284:0x436C,0xE6A286:0x436D,0xE6A288:0x436E,
0xE6A296:0x436F,0xE6A298:0x4370,0xE6A29A:0x4371,0xE6A29C:0x4372,0xE6A2A1:0x4373,
0xE6A2A3:0x4374,0xE6A2A5:0x4375,0xE6A2A9:0x4376,0xE6A2AA:0x4377,0xE6A2AE:0x4378,
0xE6A2B2:0x4379,0xE6A2BB:0x437A,0xE6A385:0x437B,0xE6A388:0x437C,0xE6A38C:0x437D,
0xE6A38F:0x437E,0xE6A390:0x4421,0xE6A391:0x4422,0xE6A393:0x4423,0xE6A396:0x4424,
0xE6A399:0x4425,0xE6A39C:0x4426,0xE6A39D:0x4427,0xE6A3A5:0x4428,0xE6A3A8:0x4429,
0xE6A3AA:0x442A,0xE6A3AB:0x442B,0xE6A3AC:0x442C,0xE6A3AD:0x442D,0xE6A3B0:0x442E,
0xE6A3B1:0x442F,0xE6A3B5:0x4430,0xE6A3B6:0x4431,0xE6A3BB:0x4432,0xE6A3BC:0x4433,
0xE6A3BD:0x4434,0xE6A486:0x4435,0xE6A489:0x4436,0xE6A48A:0x4437,0xE6A490:0x4438,
0xE6A491:0x4439,0xE6A493:0x443A,0xE6A496:0x443B,0xE6A497:0x443C,0xE6A4B1:0x443D,
0xE6A4B3:0x443E,0xE6A4B5:0x443F,0xE6A4B8:0x4440,0xE6A4BB:0x4441,0xE6A582:0x4442,
0xE6A585:0x4443,0xE6A589:0x4444,0xE6A58E:0x4445,0xE6A597:0x4446,0xE6A59B:0x4447,
0xE6A5A3:0x4448,0xE6A5A4:0x4449,0xE6A5A5:0x444A,0xE6A5A6:0x444B,0xE6A5A8:0x444C,
0xE6A5A9:0x444D,0xE6A5AC:0x444E,0xE6A5B0:0x444F,0xE6A5B1:0x4450,0xE6A5B2:0x4451,
0xE6A5BA:0x4452,0xE6A5BB:0x4453,0xE6A5BF:0x4454,0xE6A680:0x4455,0xE6A68D:0x4456,
0xE6A692:0x4457,0xE6A696:0x4458,0xE6A698:0x4459,0xE6A6A1:0x445A,0xE6A6A5:0x445B,
0xE6A6A6:0x445C,0xE6A6A8:0x445D,0xE6A6AB:0x445E,0xE6A6AD:0x445F,0xE6A6AF:0x4460,
0xE6A6B7:0x4461,0xE6A6B8:0x4462,0xE6A6BA:0x4463,0xE6A6BC:0x4464,0xE6A785:0x4465,
0xE6A788:0x4466,0xE6A791:0x4467,0xE6A796:0x4468,0xE6A797:0x4469,0xE6A7A2:0x446A,
0xE6A7A5:0x446B,0xE6A7AE:0x446C,0xE6A7AF:0x446D,0xE6A7B1:0x446E,0xE6A7B3:0x446F,
0xE6A7B5:0x4470,0xE6A7BE:0x4471,0xE6A880:0x4472,0xE6A881:0x4473,0xE6A883:0x4474,
0xE6A88F:0x4475,0xE6A891:0x4476,0xE6A895:0x4477,0xE6A89A:0x4478,0xE6A89D:0x4479,
0xE6A8A0:0x447A,0xE6A8A4:0x447B,0xE6A8A8:0x447C,0xE6A8B0:0x447D,0xE6A8B2:0x447E,
0xE6A8B4:0x4521,0xE6A8B7:0x4522,0xE6A8BB:0x4523,0xE6A8BE:0x4524,0xE6A8BF:0x4525,
0xE6A985:0x4526,0xE6A986:0x4527,0xE6A989:0x4528,0xE6A98A:0x4529,0xE6A98E:0x452A,
0xE6A990:0x452B,0xE6A991:0x452C,0xE6A992:0x452D,0xE6A995:0x452E,0xE6A996:0x452F,
0xE6A99B:0x4530,0xE6A9A4:0x4531,0xE6A9A7:0x4532,0xE6A9AA:0x4533,0xE6A9B1:0x4534,
0xE6A9B3:0x4535,0xE6A9BE:0x4536,0xE6AA81:0x4537,0xE6AA83:0x4538,0xE6AA86:0x4539,
0xE6AA87:0x453A,0xE6AA89:0x453B,0xE6AA8B:0x453C,0xE6AA91:0x453D,0xE6AA9B:0x453E,
0xE6AA9D:0x453F,0xE6AA9E:0x4540,0xE6AA9F:0x4541,0xE6AAA5:0x4542,0xE6AAAB:0x4543,
0xE6AAAF:0x4544,0xE6AAB0:0x4545,0xE6AAB1:0x4546,0xE6AAB4:0x4547,0xE6AABD:0x4548,
0xE6AABE:0x4549,0xE6AABF:0x454A,0xE6AB86:0x454B,0xE6AB89:0x454C,0xE6AB88:0x454D,
0xE6AB8C:0x454E,0xE6AB90:0x454F,0xE6AB94:0x4550,0xE6AB95:0x4551,0xE6AB96:0x4552,
0xE6AB9C:0x4553,0xE6AB9D:0x4554,0xE6ABA4:0x4555,0xE6ABA7:0x4556,0xE6ABAC:0x4557,
0xE6ABB0:0x4558,0xE6ABB1:0x4559,0xE6ABB2:0x455A,0xE6ABBC:0x455B,0xE6ABBD:0x455C,
0xE6AC82:0x455D,0xE6AC83:0x455E,0xE6AC86:0x455F,0xE6AC87:0x4560,0xE6AC89:0x4561,
0xE6AC8F:0x4562,0xE6AC90:0x4563,0xE6AC91:0x4564,0xE6AC97:0x4565,0xE6AC9B:0x4566,
0xE6AC9E:0x4567,0xE6ACA4:0x4568,0xE6ACA8:0x4569,0xE6ACAB:0x456A,0xE6ACAC:0x456B,
0xE6ACAF:0x456C,0xE6ACB5:0x456D,0xE6ACB6:0x456E,0xE6ACBB:0x456F,0xE6ACBF:0x4570,
0xE6AD86:0x4571,0xE6AD8A:0x4572,0xE6AD8D:0x4573,0xE6AD92:0x4574,0xE6AD96:0x4575,
0xE6AD98:0x4576,0xE6AD9D:0x4577,0xE6ADA0:0x4578,0xE6ADA7:0x4579,0xE6ADAB:0x457A,
0xE6ADAE:0x457B,0xE6ADB0:0x457C,0xE6ADB5:0x457D,0xE6ADBD:0x457E,0xE6ADBE:0x4621,
0xE6AE82:0x4622,0xE6AE85:0x4623,0xE6AE97:0x4624,0xE6AE9B:0x4625,0xE6AE9F:0x4626,
0xE6AEA0:0x4627,0xE6AEA2:0x4628,0xE6AEA3:0x4629,0xE6AEA8:0x462A,0xE6AEA9:0x462B,
0xE6AEAC:0x462C,0xE6AEAD:0x462D,0xE6AEAE:0x462E,0xE6AEB0:0x462F,0xE6AEB8:0x4630,
0xE6AEB9:0x4631,0xE6AEBD:0x4632,0xE6AEBE:0x4633,0xE6AF83:0x4634,0xE6AF84:0x4635,
0xE6AF89:0x4636,0xE6AF8C:0x4637,0xE6AF96:0x4638,0xE6AF9A:0x4639,0xE6AFA1:0x463A,
0xE6AFA3:0x463B,0xE6AFA6:0x463C,0xE6AFA7:0x463D,0xE6AFAE:0x463E,0xE6AFB1:0x463F,
0xE6AFB7:0x4640,0xE6AFB9:0x4641,0xE6AFBF:0x4642,0xE6B082:0x4643,0xE6B084:0x4644,
0xE6B085:0x4645,0xE6B089:0x4646,0xE6B08D:0x4647,0xE6B08E:0x4648,0xE6B090:0x4649,
0xE6B092:0x464A,0xE6B099:0x464B,0xE6B09F:0x464C,0xE6B0A6:0x464D,0xE6B0A7:0x464E,
0xE6B0A8:0x464F,0xE6B0AC:0x4650,0xE6B0AE:0x4651,0xE6B0B3:0x4652,0xE6B0B5:0x4653,
0xE6B0B6:0x4654,0xE6B0BA:0x4655,0xE6B0BB:0x4656,0xE6B0BF:0x4657,0xE6B18A:0x4658,
0xE6B18B:0x4659,0xE6B18D:0x465A,0xE6B18F:0x465B,0xE6B192:0x465C,0xE6B194:0x465D,
0xE6B199:0x465E,0xE6B19B:0x465F,0xE6B19C:0x4660,0xE6B1AB:0x4661,0xE6B1AD:0x4662,
0xE6B1AF:0x4663,0xE6B1B4:0x4664,0xE6B1B6:0x4665,0xE6B1B8:0x4666,0xE6B1B9:0x4667,
0xE6B1BB:0x4668,0xE6B285:0x4669,0xE6B286:0x466A,0xE6B287:0x466B,0xE6B289:0x466C,
0xE6B294:0x466D,0xE6B295:0x466E,0xE6B297:0x466F,0xE6B298:0x4670,0xE6B29C:0x4671,
0xE6B29F:0x4672,0xE6B2B0:0x4673,0xE6B2B2:0x4674,0xE6B2B4:0x4675,0xE6B382:0x4676,
0xE6B386:0x4677,0xE6B38D:0x4678,0xE6B38F:0x4679,0xE6B390:0x467A,0xE6B391:0x467B,
0xE6B392:0x467C,0xE6B394:0x467D,0xE6B396:0x467E,0xE6B39A:0x4721,0xE6B39C:0x4722,
0xE6B3A0:0x4723,0xE6B3A7:0x4724,0xE6B3A9:0x4725,0xE6B3AB:0x4726,0xE6B3AC:0x4727,
0xE6B3AE:0x4728,0xE6B3B2:0x4729,0xE6B3B4:0x472A,0xE6B484:0x472B,0xE6B487:0x472C,
0xE6B48A:0x472D,0xE6B48E:0x472E,0xE6B48F:0x472F,0xE6B491:0x4730,0xE6B493:0x4731,
0xE6B49A:0x4732,0xE6B4A6:0x4733,0xE6B4A7:0x4734,0xE6B4A8:0x4735,0xE6B1A7:0x4736,
0xE6B4AE:0x4737,0xE6B4AF:0x4738,0xE6B4B1:0x4739,0xE6B4B9:0x473A,0xE6B4BC:0x473B,
0xE6B4BF:0x473C,0xE6B597:0x473D,0xE6B59E:0x473E,0xE6B59F:0x473F,0xE6B5A1:0x4740,
0xE6B5A5:0x4741,0xE6B5A7:0x4742,0xE6B5AF:0x4743,0xE6B5B0:0x4744,0xE6B5BC:0x4745,
0xE6B682:0x4746,0xE6B687:0x4747,0xE6B691:0x4748,0xE6B692:0x4749,0xE6B694:0x474A,
0xE6B696:0x474B,0xE6B697:0x474C,0xE6B698:0x474D,0xE6B6AA:0x474E,0xE6B6AC:0x474F,
0xE6B6B4:0x4750,0xE6B6B7:0x4751,0xE6B6B9:0x4752,0xE6B6BD:0x4753,0xE6B6BF:0x4754,
0xE6B784:0x4755,0xE6B788:0x4756,0xE6B78A:0x4757,0xE6B78E:0x4758,0xE6B78F:0x4759,
0xE6B796:0x475A,0xE6B79B:0x475B,0xE6B79D:0x475C,0xE6B79F:0x475D,0xE6B7A0:0x475E,
0xE6B7A2:0x475F,0xE6B7A5:0x4760,0xE6B7A9:0x4761,0xE6B7AF:0x4762,0xE6B7B0:0x4763,
0xE6B7B4:0x4764,0xE6B7B6:0x4765,0xE6B7BC:0x4766,0xE6B880:0x4767,0xE6B884:0x4768,
0xE6B89E:0x4769,0xE6B8A2:0x476A,0xE6B8A7:0x476B,0xE6B8B2:0x476C,0xE6B8B6:0x476D,
0xE6B8B9:0x476E,0xE6B8BB:0x476F,0xE6B8BC:0x4770,0xE6B984:0x4771,0xE6B985:0x4772,
0xE6B988:0x4773,0xE6B989:0x4774,0xE6B98B:0x4775,0xE6B98F:0x4776,0xE6B991:0x4777,
0xE6B992:0x4778,0xE6B993:0x4779,0xE6B994:0x477A,0xE6B997:0x477B,0xE6B99C:0x477C,
0xE6B99D:0x477D,0xE6B99E:0x477E,0xE6B9A2:0x4821,0xE6B9A3:0x4822,0xE6B9A8:0x4823,
0xE6B9B3:0x4824,0xE6B9BB:0x4825,0xE6B9BD:0x4826,0xE6BA8D:0x4827,0xE6BA93:0x4828,
0xE6BA99:0x4829,0xE6BAA0:0x482A,0xE6BAA7:0x482B,0xE6BAAD:0x482C,0xE6BAAE:0x482D,
0xE6BAB1:0x482E,0xE6BAB3:0x482F,0xE6BABB:0x4830,0xE6BABF:0x4831,0xE6BB80:0x4832,
0xE6BB81:0x4833,0xE6BB83:0x4834,0xE6BB87:0x4835,0xE6BB88:0x4836,0xE6BB8A:0x4837,
0xE6BB8D:0x4838,0xE6BB8E:0x4839,0xE6BB8F:0x483A,0xE6BBAB:0x483B,0xE6BBAD:0x483C,
0xE6BBAE:0x483D,0xE6BBB9:0x483E,0xE6BBBB:0x483F,0xE6BBBD:0x4840,0xE6BC84:0x4841,
0xE6BC88:0x4842,0xE6BC8A:0x4843,0xE6BC8C:0x4844,0xE6BC8D:0x4845,0xE6BC96:0x4846,
0xE6BC98:0x4847,0xE6BC9A:0x4848,0xE6BC9B:0x4849,0xE6BCA6:0x484A,0xE6BCA9:0x484B,
0xE6BCAA:0x484C,0xE6BCAF:0x484D,0xE6BCB0:0x484E,0xE6BCB3:0x484F,0xE6BCB6:0x4850,
0xE6BCBB:0x4851,0xE6BCBC:0x4852,0xE6BCAD:0x4853,0xE6BD8F:0x4854,0xE6BD91:0x4855,
0xE6BD92:0x4856,0xE6BD93:0x4857,0xE6BD97:0x4858,0xE6BD99:0x4859,0xE6BD9A:0x485A,
0xE6BD9D:0x485B,0xE6BD9E:0x485C,0xE6BDA1:0x485D,0xE6BDA2:0x485E,0xE6BDA8:0x485F,
0xE6BDAC:0x4860,0xE6BDBD:0x4861,0xE6BDBE:0x4862,0xE6BE83:0x4863,0xE6BE87:0x4864,
0xE6BE88:0x4865,0xE6BE8B:0x4866,0xE6BE8C:0x4867,0xE6BE8D:0x4868,0xE6BE90:0x4869,
0xE6BE92:0x486A,0xE6BE93:0x486B,0xE6BE94:0x486C,0xE6BE96:0x486D,0xE6BE9A:0x486E,
0xE6BE9F:0x486F,0xE6BEA0:0x4870,0xE6BEA5:0x4871,0xE6BEA6:0x4872,0xE6BEA7:0x4873,
0xE6BEA8:0x4874,0xE6BEAE:0x4875,0xE6BEAF:0x4876,0xE6BEB0:0x4877,0xE6BEB5:0x4878,
0xE6BEB6:0x4879,0xE6BEBC:0x487A,0xE6BF85:0x487B,0xE6BF87:0x487C,0xE6BF88:0x487D,
0xE6BF8A:0x487E,0xE6BF9A:0x4921,0xE6BF9E:0x4922,0xE6BFA8:0x4923,0xE6BFA9:0x4924,
0xE6BFB0:0x4925,0xE6BFB5:0x4926,0xE6BFB9:0x4927,0xE6BFBC:0x4928,0xE6BFBD:0x4929,
0xE78080:0x492A,0xE78085:0x492B,0xE78086:0x492C,0xE78087:0x492D,0xE7808D:0x492E,
0xE78097:0x492F,0xE780A0:0x4930,0xE780A3:0x4931,0xE780AF:0x4932,0xE780B4:0x4933,
0xE780B7:0x4934,0xE780B9:0x4935,0xE780BC:0x4936,0xE78183:0x4937,0xE78184:0x4938,
0xE78188:0x4939,0xE78189:0x493A,0xE7818A:0x493B,0xE7818B:0x493C,0xE78194:0x493D,
0xE78195:0x493E,0xE7819D:0x493F,0xE7819E:0x4940,0xE7818E:0x4941,0xE781A4:0x4942,
0xE781A5:0x4943,0xE781AC:0x4944,0xE781AE:0x4945,0xE781B5:0x4946,0xE781B6:0x4947,
0xE781BE:0x4948,0xE78281:0x4949,0xE78285:0x494A,0xE78286:0x494B,0xE78294:0x494C,
0xE78295:0x494D,0xE78296:0x494E,0xE78297:0x494F,0xE78298:0x4950,0xE7829B:0x4951,
0xE782A4:0x4952,0xE782AB:0x4953,0xE782B0:0x4954,0xE782B1:0x4955,0xE782B4:0x4956,
0xE782B7:0x4957,0xE7838A:0x4958,0xE78391:0x4959,0xE78393:0x495A,0xE78394:0x495B,
0xE78395:0x495C,0xE78396:0x495D,0xE78398:0x495E,0xE7839C:0x495F,0xE783A4:0x4960,
0xE783BA:0x4961,0xE78483:0x4962,0xE78484:0x4963,0xE78485:0x4964,0xE78486:0x4965,
0xE78487:0x4966,0xE7848B:0x4967,0xE7848C:0x4968,0xE7848F:0x4969,0xE7849E:0x496A,
0xE784A0:0x496B,0xE784AB:0x496C,0xE784AD:0x496D,0xE784AF:0x496E,0xE784B0:0x496F,
0xE784B1:0x4970,0xE784B8:0x4971,0xE78581:0x4972,0xE78585:0x4973,0xE78586:0x4974,
0xE78587:0x4975,0xE7858A:0x4976,0xE7858B:0x4977,0xE78590:0x4978,0xE78592:0x4979,
0xE78597:0x497A,0xE7859A:0x497B,0xE7859C:0x497C,0xE7859E:0x497D,0xE785A0:0x497E,
0xE785A8:0x4A21,0xE785B9:0x4A22,0xE78680:0x4A23,0xE78685:0x4A24,0xE78687:0x4A25,
0xE7868C:0x4A26,0xE78692:0x4A27,0xE7869A:0x4A28,0xE7869B:0x4A29,0xE786A0:0x4A2A,
0xE786A2:0x4A2B,0xE786AF:0x4A2C,0xE786B0:0x4A2D,0xE786B2:0x4A2E,0xE786B3:0x4A2F,
0xE786BA:0x4A30,0xE786BF:0x4A31,0xE78780:0x4A32,0xE78781:0x4A33,0xE78784:0x4A34,
0xE7878B:0x4A35,0xE7878C:0x4A36,0xE78793:0x4A37,0xE78796:0x4A38,0xE78799:0x4A39,
0xE7879A:0x4A3A,0xE7879C:0x4A3B,0xE787B8:0x4A3C,0xE787BE:0x4A3D,0xE78880:0x4A3E,
0xE78887:0x4A3F,0xE78888:0x4A40,0xE78889:0x4A41,0xE78893:0x4A42,0xE78897:0x4A43,
0xE7889A:0x4A44,0xE7889D:0x4A45,0xE7889F:0x4A46,0xE788A4:0x4A47,0xE788AB:0x4A48,
0xE788AF:0x4A49,0xE788B4:0x4A4A,0xE788B8:0x4A4B,0xE788B9:0x4A4C,0xE78981:0x4A4D,
0xE78982:0x4A4E,0xE78983:0x4A4F,0xE78985:0x4A50,0xE7898E:0x4A51,0xE7898F:0x4A52,
0xE78990:0x4A53,0xE78993:0x4A54,0xE78995:0x4A55,0xE78996:0x4A56,0xE7899A:0x4A57,
0xE7899C:0x4A58,0xE7899E:0x4A59,0xE789A0:0x4A5A,0xE789A3:0x4A5B,0xE789A8:0x4A5C,
0xE789AB:0x4A5D,0xE789AE:0x4A5E,0xE789AF:0x4A5F,0xE789B1:0x4A60,0xE789B7:0x4A61,
0xE789B8:0x4A62,0xE789BB:0x4A63,0xE789BC:0x4A64,0xE789BF:0x4A65,0xE78A84:0x4A66,
0xE78A89:0x4A67,0xE78A8D:0x4A68,0xE78A8E:0x4A69,0xE78A93:0x4A6A,0xE78A9B:0x4A6B,
0xE78AA8:0x4A6C,0xE78AAD:0x4A6D,0xE78AAE:0x4A6E,0xE78AB1:0x4A6F,0xE78AB4:0x4A70,
0xE78ABE:0x4A71,0xE78B81:0x4A72,0xE78B87:0x4A73,0xE78B89:0x4A74,0xE78B8C:0x4A75,
0xE78B95:0x4A76,0xE78B96:0x4A77,0xE78B98:0x4A78,0xE78B9F:0x4A79,0xE78BA5:0x4A7A,
0xE78BB3:0x4A7B,0xE78BB4:0x4A7C,0xE78BBA:0x4A7D,0xE78BBB:0x4A7E,0xE78BBE:0x4B21,
0xE78C82:0x4B22,0xE78C84:0x4B23,0xE78C85:0x4B24,0xE78C87:0x4B25,0xE78C8B:0x4B26,
0xE78C8D:0x4B27,0xE78C92:0x4B28,0xE78C93:0x4B29,0xE78C98:0x4B2A,0xE78C99:0x4B2B,
0xE78C9E:0x4B2C,0xE78CA2:0x4B2D,0xE78CA4:0x4B2E,0xE78CA7:0x4B2F,0xE78CA8:0x4B30,
0xE78CAC:0x4B31,0xE78CB1:0x4B32,0xE78CB2:0x4B33,0xE78CB5:0x4B34,0xE78CBA:0x4B35,
0xE78CBB:0x4B36,0xE78CBD:0x4B37,0xE78D83:0x4B38,0xE78D8D:0x4B39,0xE78D90:0x4B3A,
0xE78D92:0x4B3B,0xE78D96:0x4B3C,0xE78D98:0x4B3D,0xE78D9D:0x4B3E,0xE78D9E:0x4B3F,
0xE78D9F:0x4B40,0xE78DA0:0x4B41,0xE78DA6:0x4B42,0xE78DA7:0x4B43,0xE78DA9:0x4B44,
0xE78DAB:0x4B45,0xE78DAC:0x4B46,0xE78DAE:0x4B47,0xE78DAF:0x4B48,0xE78DB1:0x4B49,
0xE78DB7:0x4B4A,0xE78DB9:0x4B4B,0xE78DBC:0x4B4C,0xE78E80:0x4B4D,0xE78E81:0x4B4E,
0xE78E83:0x4B4F,0xE78E85:0x4B50,0xE78E86:0x4B51,0xE78E8E:0x4B52,0xE78E90:0x4B53,
0xE78E93:0x4B54,0xE78E95:0x4B55,0xE78E97:0x4B56,0xE78E98:0x4B57,0xE78E9C:0x4B58,
0xE78E9E:0x4B59,0xE78E9F:0x4B5A,0xE78EA0:0x4B5B,0xE78EA2:0x4B5C,0xE78EA5:0x4B5D,
0xE78EA6:0x4B5E,0xE78EAA:0x4B5F,0xE78EAB:0x4B60,0xE78EAD:0x4B61,0xE78EB5:0x4B62,
0xE78EB7:0x4B63,0xE78EB9:0x4B64,0xE78EBC:0x4B65,0xE78EBD:0x4B66,0xE78EBF:0x4B67,
0xE78F85:0x4B68,0xE78F86:0x4B69,0xE78F89:0x4B6A,0xE78F8B:0x4B6B,0xE78F8C:0x4B6C,
0xE78F8F:0x4B6D,0xE78F92:0x4B6E,0xE78F93:0x4B6F,0xE78F96:0x4B70,0xE78F99:0x4B71,
0xE78F9D:0x4B72,0xE78FA1:0x4B73,0xE78FA3:0x4B74,0xE78FA6:0x4B75,0xE78FA7:0x4B76,
0xE78FA9:0x4B77,0xE78FB4:0x4B78,0xE78FB5:0x4B79,0xE78FB7:0x4B7A,0xE78FB9:0x4B7B,
0xE78FBA:0x4B7C,0xE78FBB:0x4B7D,0xE78FBD:0x4B7E,0xE78FBF:0x4C21,0xE79080:0x4C22,
0xE79081:0x4C23,0xE79084:0x4C24,0xE79087:0x4C25,0xE7908A:0x4C26,0xE79091:0x4C27,
0xE7909A:0x4C28,0xE7909B:0x4C29,0xE790A4:0x4C2A,0xE790A6:0x4C2B,0xE790A8:0x4C2C,
0xE790A9:0x4C2D,0xE790AA:0x4C2E,0xE790AB:0x4C2F,0xE790AC:0x4C30,0xE790AD:0x4C31,
0xE790AE:0x4C32,0xE790AF:0x4C33,0xE790B0:0x4C34,0xE790B1:0x4C35,0xE790B9:0x4C36,
0xE79180:0x4C37,0xE79183:0x4C38,0xE79184:0x4C39,0xE79186:0x4C3A,0xE79187:0x4C3B,
0xE7918B:0x4C3C,0xE7918D:0x4C3D,0xE79191:0x4C3E,0xE79192:0x4C3F,0xE79197:0x4C40,
0xE7919D:0x4C41,0xE791A2:0x4C42,0xE791A6:0x4C43,0xE791A7:0x4C44,0xE791A8:0x4C45,
0xE791AB:0x4C46,0xE791AD:0x4C47,0xE791AE:0x4C48,0xE791B1:0x4C49,0xE791B2:0x4C4A,
0xE79280:0x4C4B,0xE79281:0x4C4C,0xE79285:0x4C4D,0xE79286:0x4C4E,0xE79287:0x4C4F,
0xE79289:0x4C50,0xE7928F:0x4C51,0xE79290:0x4C52,0xE79291:0x4C53,0xE79292:0x4C54,
0xE79298:0x4C55,0xE79299:0x4C56,0xE7929A:0x4C57,0xE7929C:0x4C58,0xE7929F:0x4C59,
0xE792A0:0x4C5A,0xE792A1:0x4C5B,0xE792A3:0x4C5C,0xE792A6:0x4C5D,0xE792A8:0x4C5E,
0xE792A9:0x4C5F,0xE792AA:0x4C60,0xE792AB:0x4C61,0xE792AE:0x4C62,0xE792AF:0x4C63,
0xE792B1:0x4C64,0xE792B2:0x4C65,0xE792B5:0x4C66,0xE792B9:0x4C67,0xE792BB:0x4C68,
0xE792BF:0x4C69,0xE79388:0x4C6A,0xE79389:0x4C6B,0xE7938C:0x4C6C,0xE79390:0x4C6D,
0xE79393:0x4C6E,0xE79398:0x4C6F,0xE7939A:0x4C70,0xE7939B:0x4C71,0xE7939E:0x4C72,
0xE7939F:0x4C73,0xE793A4:0x4C74,0xE793A8:0x4C75,0xE793AA:0x4C76,0xE793AB:0x4C77,
0xE793AF:0x4C78,0xE793B4:0x4C79,0xE793BA:0x4C7A,0xE793BB:0x4C7B,0xE793BC:0x4C7C,
0xE793BF:0x4C7D,0xE79486:0x4C7E,0xE79492:0x4D21,0xE79496:0x4D22,0xE79497:0x4D23,
0xE794A0:0x4D24,0xE794A1:0x4D25,0xE794A4:0x4D26,0xE794A7:0x4D27,0xE794A9:0x4D28,
0xE794AA:0x4D29,0xE794AF:0x4D2A,0xE794B6:0x4D2B,0xE794B9:0x4D2C,0xE794BD:0x4D2D,
0xE794BE:0x4D2E,0xE794BF:0x4D2F,0xE79580:0x4D30,0xE79583:0x4D31,0xE79587:0x4D32,
0xE79588:0x4D33,0xE7958E:0x4D34,0xE79590:0x4D35,0xE79592:0x4D36,0xE79597:0x4D37,
0xE7959E:0x4D38,0xE7959F:0x4D39,0xE795A1:0x4D3A,0xE795AF:0x4D3B,0xE795B1:0x4D3C,
0xE795B9:0x4D3D,0xE795BA:0x4D3E,0xE795BB:0x4D3F,0xE795BC:0x4D40,0xE795BD:0x4D41,
0xE795BE:0x4D42,0xE79681:0x4D43,0xE79685:0x4D44,0xE79690:0x4D45,0xE79692:0x4D46,
0xE79693:0x4D47,0xE79695:0x4D48,0xE79699:0x4D49,0xE7969C:0x4D4A,0xE796A2:0x4D4B,
0xE796A4:0x4D4C,0xE796B4:0x4D4D,0xE796BA:0x4D4E,0xE796BF:0x4D4F,0xE79780:0x4D50,
0xE79781:0x4D51,0xE79784:0x4D52,0xE79786:0x4D53,0xE7978C:0x4D54,0xE7978E:0x4D55,
0xE7978F:0x4D56,0xE79797:0x4D57,0xE7979C:0x4D58,0xE7979F:0x4D59,0xE797A0:0x4D5A,
0xE797A1:0x4D5B,0xE797A4:0x4D5C,0xE797A7:0x4D5D,0xE797AC:0x4D5E,0xE797AE:0x4D5F,
0xE797AF:0x4D60,0xE797B1:0x4D61,0xE797B9:0x4D62,0xE79880:0x4D63,0xE79882:0x4D64,
0xE79883:0x4D65,0xE79884:0x4D66,0xE79887:0x4D67,0xE79888:0x4D68,0xE7988A:0x4D69,
0xE7988C:0x4D6A,0xE7988F:0x4D6B,0xE79892:0x4D6C,0xE79893:0x4D6D,0xE79895:0x4D6E,
0xE79896:0x4D6F,0xE79899:0x4D70,0xE7989B:0x4D71,0xE7989C:0x4D72,0xE7989D:0x4D73,
0xE7989E:0x4D74,0xE798A3:0x4D75,0xE798A5:0x4D76,0xE798A6:0x4D77,0xE798A9:0x4D78,
0xE798AD:0x4D79,0xE798B2:0x4D7A,0xE798B3:0x4D7B,0xE798B5:0x4D7C,0xE798B8:0x4D7D,
0xE798B9:0x4D7E,0xE798BA:0x4E21,0xE798BC:0x4E22,0xE7998A:0x4E23,0xE79980:0x4E24,
0xE79981:0x4E25,0xE79983:0x4E26,0xE79984:0x4E27,0xE79985:0x4E28,0xE79989:0x4E29,
0xE7998B:0x4E2A,0xE79995:0x4E2B,0xE79999:0x4E2C,0xE7999F:0x4E2D,0xE799A4:0x4E2E,
0xE799A5:0x4E2F,0xE799AD:0x4E30,0xE799AE:0x4E31,0xE799AF:0x4E32,0xE799B1:0x4E33,
0xE799B4:0x4E34,0xE79A81:0x4E35,0xE79A85:0x4E36,0xE79A8C:0x4E37,0xE79A8D:0x4E38,
0xE79A95:0x4E39,0xE79A9B:0x4E3A,0xE79A9C:0x4E3B,0xE79A9D:0x4E3C,0xE79A9F:0x4E3D,
0xE79AA0:0x4E3E,0xE79AA2:0x4E3F,0xE79AA3:0x4E40,0xE79AA4:0x4E41,0xE79AA5:0x4E42,
0xE79AA6:0x4E43,0xE79AA7:0x4E44,0xE79AA8:0x4E45,0xE79AAA:0x4E46,0xE79AAD:0x4E47,
0xE79ABD:0x4E48,0xE79B81:0x4E49,0xE79B85:0x4E4A,0xE79B89:0x4E4B,0xE79B8B:0x4E4C,
0xE79B8C:0x4E4D,0xE79B8E:0x4E4E,0xE79B94:0x4E4F,0xE79B99:0x4E50,0xE79BA0:0x4E51,
0xE79BA6:0x4E52,0xE79BA8:0x4E53,0xE79BAC:0x4E54,0xE79BB0:0x4E55,0xE79BB1:0x4E56,
0xE79BB6:0x4E57,0xE79BB9:0x4E58,0xE79BBC:0x4E59,0xE79C80:0x4E5A,0xE79C86:0x4E5B,
0xE79C8A:0x4E5C,0xE79C8E:0x4E5D,0xE79C92:0x4E5E,0xE79C94:0x4E5F,0xE79C95:0x4E60,
0xE79C97:0x4E61,0xE79C99:0x4E62,0xE79C9A:0x4E63,0xE79C9C:0x4E64,0xE79CA2:0x4E65,
0xE79CA8:0x4E66,0xE79CAD:0x4E67,0xE79CAE:0x4E68,0xE79CAF:0x4E69,0xE79CB4:0x4E6A,
0xE79CB5:0x4E6B,0xE79CB6:0x4E6C,0xE79CB9:0x4E6D,0xE79CBD:0x4E6E,0xE79CBE:0x4E6F,
0xE79D82:0x4E70,0xE79D85:0x4E71,0xE79D86:0x4E72,0xE79D8A:0x4E73,0xE79D8D:0x4E74,
0xE79D8E:0x4E75,0xE79D8F:0x4E76,0xE79D92:0x4E77,0xE79D96:0x4E78,0xE79D97:0x4E79,
0xE79D9C:0x4E7A,0xE79D9E:0x4E7B,0xE79D9F:0x4E7C,0xE79DA0:0x4E7D,0xE79DA2:0x4E7E,
0xE79DA4:0x4F21,0xE79DA7:0x4F22,0xE79DAA:0x4F23,0xE79DAC:0x4F24,0xE79DB0:0x4F25,
0xE79DB2:0x4F26,0xE79DB3:0x4F27,0xE79DB4:0x4F28,0xE79DBA:0x4F29,0xE79DBD:0x4F2A,
0xE79E80:0x4F2B,0xE79E84:0x4F2C,0xE79E8C:0x4F2D,0xE79E8D:0x4F2E,0xE79E94:0x4F2F,
0xE79E95:0x4F30,0xE79E96:0x4F31,0xE79E9A:0x4F32,0xE79E9F:0x4F33,0xE79EA2:0x4F34,
0xE79EA7:0x4F35,0xE79EAA:0x4F36,0xE79EAE:0x4F37,0xE79EAF:0x4F38,0xE79EB1:0x4F39,
0xE79EB5:0x4F3A,0xE79EBE:0x4F3B,0xE79F83:0x4F3C,0xE79F89:0x4F3D,0xE79F91:0x4F3E,
0xE79F92:0x4F3F,0xE79F95:0x4F40,0xE79F99:0x4F41,0xE79F9E:0x4F42,0xE79F9F:0x4F43,
0xE79FA0:0x4F44,0xE79FA4:0x4F45,0xE79FA6:0x4F46,0xE79FAA:0x4F47,0xE79FAC:0x4F48,
0xE79FB0:0x4F49,0xE79FB1:0x4F4A,0xE79FB4:0x4F4B,0xE79FB8:0x4F4C,0xE79FBB:0x4F4D,
0xE7A085:0x4F4E,0xE7A086:0x4F4F,0xE7A089:0x4F50,0xE7A08D:0x4F51,0xE7A08E:0x4F52,
0xE7A091:0x4F53,0xE7A09D:0x4F54,0xE7A0A1:0x4F55,0xE7A0A2:0x4F56,0xE7A0A3:0x4F57,
0xE7A0AD:0x4F58,0xE7A0AE:0x4F59,0xE7A0B0:0x4F5A,0xE7A0B5:0x4F5B,0xE7A0B7:0x4F5C,
0xE7A183:0x4F5D,0xE7A184:0x4F5E,0xE7A187:0x4F5F,0xE7A188:0x4F60,0xE7A18C:0x4F61,
0xE7A18E:0x4F62,0xE7A192:0x4F63,0xE7A19C:0x4F64,0xE7A19E:0x4F65,0xE7A1A0:0x4F66,
0xE7A1A1:0x4F67,0xE7A1A3:0x4F68,0xE7A1A4:0x4F69,0xE7A1A8:0x4F6A,0xE7A1AA:0x4F6B,
0xE7A1AE:0x4F6C,0xE7A1BA:0x4F6D,0xE7A1BE:0x4F6E,0xE7A28A:0x4F6F,0xE7A28F:0x4F70,
0xE7A294:0x4F71,0xE7A298:0x4F72,0xE7A2A1:0x4F73,0xE7A29D:0x4F74,0xE7A29E:0x4F75,
0xE7A29F:0x4F76,0xE7A2A4:0x4F77,0xE7A2A8:0x4F78,0xE7A2AC:0x4F79,0xE7A2AD:0x4F7A,
0xE7A2B0:0x4F7B,0xE7A2B1:0x4F7C,0xE7A2B2:0x4F7D,0xE7A2B3:0x4F7E,0xE7A2BB:0x5021,
0xE7A2BD:0x5022,0xE7A2BF:0x5023,0xE7A387:0x5024,0xE7A388:0x5025,0xE7A389:0x5026,
0xE7A38C:0x5027,0xE7A38E:0x5028,0xE7A392:0x5029,0xE7A393:0x502A,0xE7A395:0x502B,
0xE7A396:0x502C,0xE7A3A4:0x502D,0xE7A39B:0x502E,0xE7A39F:0x502F,0xE7A3A0:0x5030,
0xE7A3A1:0x5031,0xE7A3A6:0x5032,0xE7A3AA:0x5033,0xE7A3B2:0x5034,0xE7A3B3:0x5035,
0xE7A480:0x5036,0xE7A3B6:0x5037,0xE7A3B7:0x5038,0xE7A3BA:0x5039,0xE7A3BB:0x503A,
0xE7A3BF:0x503B,0xE7A486:0x503C,0xE7A48C:0x503D,0xE7A490:0x503E,0xE7A49A:0x503F,
0xE7A49C:0x5040,0xE7A49E:0x5041,0xE7A49F:0x5042,0xE7A4A0:0x5043,0xE7A4A5:0x5044,
0xE7A4A7:0x5045,0xE7A4A9:0x5046,0xE7A4AD:0x5047,0xE7A4B1:0x5048,0xE7A4B4:0x5049,
0xE7A4B5:0x504A,0xE7A4BB:0x504B,0xE7A4BD:0x504C,0xE7A4BF:0x504D,0xE7A584:0x504E,
0xE7A585:0x504F,0xE7A586:0x5050,0xE7A58A:0x5051,0xE7A58B:0x5052,0xE7A58F:0x5053,
0xE7A591:0x5054,0xE7A594:0x5055,0xE7A598:0x5056,0xE7A59B:0x5057,0xE7A59C:0x5058,
0xE7A5A7:0x5059,0xE7A5A9:0x505A,0xE7A5AB:0x505B,0xE7A5B2:0x505C,0xE7A5B9:0x505D,
0xE7A5BB:0x505E,0xE7A5BC:0x505F,0xE7A5BE:0x5060,0xE7A68B:0x5061,0xE7A68C:0x5062,
0xE7A691:0x5063,0xE7A693:0x5064,0xE7A694:0x5065,0xE7A695:0x5066,0xE7A696:0x5067,
0xE7A698:0x5068,0xE7A69B:0x5069,0xE7A69C:0x506A,0xE7A6A1:0x506B,0xE7A6A8:0x506C,
0xE7A6A9:0x506D,0xE7A6AB:0x506E,0xE7A6AF:0x506F,0xE7A6B1:0x5070,0xE7A6B4:0x5071,
0xE7A6B8:0x5072,0xE7A6BB:0x5073,0xE7A782:0x5074,0xE7A784:0x5075,0xE7A787:0x5076,
0xE7A788:0x5077,0xE7A78A:0x5078,0xE7A78F:0x5079,0xE7A794:0x507A,0xE7A796:0x507B,
0xE7A79A:0x507C,0xE7A79D:0x507D,0xE7A79E:0x507E,0xE7A7A0:0x5121,0xE7A7A2:0x5122,
0xE7A7A5:0x5123,0xE7A7AA:0x5124,0xE7A7AB:0x5125,0xE7A7AD:0x5126,0xE7A7B1:0x5127,
0xE7A7B8:0x5128,0xE7A7BC:0x5129,0xE7A882:0x512A,0xE7A883:0x512B,0xE7A887:0x512C,
0xE7A889:0x512D,0xE7A88A:0x512E,0xE7A88C:0x512F,0xE7A891:0x5130,0xE7A895:0x5131,
0xE7A89B:0x5132,0xE7A89E:0x5133,0xE7A8A1:0x5134,0xE7A8A7:0x5135,0xE7A8AB:0x5136,
0xE7A8AD:0x5137,0xE7A8AF:0x5138,0xE7A8B0:0x5139,0xE7A8B4:0x513A,0xE7A8B5:0x513B,
0xE7A8B8:0x513C,0xE7A8B9:0x513D,0xE7A8BA:0x513E,0xE7A984:0x513F,0xE7A985:0x5140,
0xE7A987:0x5141,0xE7A988:0x5142,0xE7A98C:0x5143,0xE7A995:0x5144,0xE7A996:0x5145,
0xE7A999:0x5146,0xE7A99C:0x5147,0xE7A99D:0x5148,0xE7A99F:0x5149,0xE7A9A0:0x514A,
0xE7A9A5:0x514B,0xE7A9A7:0x514C,0xE7A9AA:0x514D,0xE7A9AD:0x514E,0xE7A9B5:0x514F,
0xE7A9B8:0x5150,0xE7A9BE:0x5151,0xE7AA80:0x5152,0xE7AA82:0x5153,0xE7AA85:0x5154,
0xE7AA86:0x5155,0xE7AA8A:0x5156,0xE7AA8B:0x5157,0xE7AA90:0x5158,0xE7AA91:0x5159,
0xE7AA94:0x515A,0xE7AA9E:0x515B,0xE7AAA0:0x515C,0xE7AAA3:0x515D,0xE7AAAC:0x515E,
0xE7AAB3:0x515F,0xE7AAB5:0x5160,0xE7AAB9:0x5161,0xE7AABB:0x5162,0xE7AABC:0x5163,
0xE7AB86:0x5164,0xE7AB89:0x5165,0xE7AB8C:0x5166,0xE7AB8E:0x5167,0xE7AB91:0x5168,
0xE7AB9B:0x5169,0xE7ABA8:0x516A,0xE7ABA9:0x516B,0xE7ABAB:0x516C,0xE7ABAC:0x516D,
0xE7ABB1:0x516E,0xE7ABB4:0x516F,0xE7ABBB:0x5170,0xE7ABBD:0x5171,0xE7ABBE:0x5172,
0xE7AC87:0x5173,0xE7AC94:0x5174,0xE7AC9F:0x5175,0xE7ACA3:0x5176,0xE7ACA7:0x5177,
0xE7ACA9:0x5178,0xE7ACAA:0x5179,0xE7ACAB:0x517A,0xE7ACAD:0x517B,0xE7ACAE:0x517C,
0xE7ACAF:0x517D,0xE7ACB0:0x517E,0xE7ACB1:0x5221,0xE7ACB4:0x5222,0xE7ACBD:0x5223,
0xE7ACBF:0x5224,0xE7AD80:0x5225,0xE7AD81:0x5226,0xE7AD87:0x5227,0xE7AD8E:0x5228,
0xE7AD95:0x5229,0xE7ADA0:0x522A,0xE7ADA4:0x522B,0xE7ADA6:0x522C,0xE7ADA9:0x522D,
0xE7ADAA:0x522E,0xE7ADAD:0x522F,0xE7ADAF:0x5230,0xE7ADB2:0x5231,0xE7ADB3:0x5232,
0xE7ADB7:0x5233,0xE7AE84:0x5234,0xE7AE89:0x5235,0xE7AE8E:0x5236,0xE7AE90:0x5237,
0xE7AE91:0x5238,0xE7AE96:0x5239,0xE7AE9B:0x523A,0xE7AE9E:0x523B,0xE7AEA0:0x523C,
0xE7AEA5:0x523D,0xE7AEAC:0x523E,0xE7AEAF:0x523F,0xE7AEB0:0x5240,0xE7AEB2:0x5241,
0xE7AEB5:0x5242,0xE7AEB6:0x5243,0xE7AEBA:0x5244,0xE7AEBB:0x5245,0xE7AEBC:0x5246,
0xE7AEBD:0x5247,0xE7AF82:0x5248,0xE7AF85:0x5249,0xE7AF88:0x524A,0xE7AF8A:0x524B,
0xE7AF94:0x524C,0xE7AF96:0x524D,0xE7AF97:0x524E,0xE7AF99:0x524F,0xE7AF9A:0x5250,
0xE7AF9B:0x5251,0xE7AFA8:0x5252,0xE7AFAA:0x5253,0xE7AFB2:0x5254,0xE7AFB4:0x5255,
0xE7AFB5:0x5256,0xE7AFB8:0x5257,0xE7AFB9:0x5258,0xE7AFBA:0x5259,0xE7AFBC:0x525A,
0xE7AFBE:0x525B,0xE7B081:0x525C,0xE7B082:0x525D,0xE7B083:0x525E,0xE7B084:0x525F,
0xE7B086:0x5260,0xE7B089:0x5261,0xE7B08B:0x5262,0xE7B08C:0x5263,0xE7B08E:0x5264,
0xE7B08F:0x5265,0xE7B099:0x5266,0xE7B09B:0x5267,0xE7B0A0:0x5268,0xE7B0A5:0x5269,
0xE7B0A6:0x526A,0xE7B0A8:0x526B,0xE7B0AC:0x526C,0xE7B0B1:0x526D,0xE7B0B3:0x526E,
0xE7B0B4:0x526F,0xE7B0B6:0x5270,0xE7B0B9:0x5271,0xE7B0BA:0x5272,0xE7B186:0x5273,
0xE7B18A:0x5274,0xE7B195:0x5275,0xE7B191:0x5276,0xE7B192:0x5277,0xE7B193:0x5278,
0xE7B199:0x5279,0xE7B19A:0x527A,0xE7B19B:0x527B,0xE7B19C:0x527C,0xE7B19D:0x527D,
0xE7B19E:0x527E,0xE7B1A1:0x5321,0xE7B1A3:0x5322,0xE7B1A7:0x5323,0xE7B1A9:0x5324,
0xE7B1AD:0x5325,0xE7B1AE:0x5326,0xE7B1B0:0x5327,0xE7B1B2:0x5328,0xE7B1B9:0x5329,
0xE7B1BC:0x532A,0xE7B1BD:0x532B,0xE7B286:0x532C,0xE7B287:0x532D,0xE7B28F:0x532E,
0xE7B294:0x532F,0xE7B29E:0x5330,0xE7B2A0:0x5331,0xE7B2A6:0x5332,0xE7B2B0:0x5333,
0xE7B2B6:0x5334,0xE7B2B7:0x5335,0xE7B2BA:0x5336,0xE7B2BB:0x5337,0xE7B2BC:0x5338,
0xE7B2BF:0x5339,0xE7B384:0x533A,0xE7B387:0x533B,0xE7B388:0x533C,0xE7B389:0x533D,
0xE7B38D:0x533E,0xE7B38F:0x533F,0xE7B393:0x5340,0xE7B394:0x5341,0xE7B395:0x5342,
0xE7B397:0x5343,0xE7B399:0x5344,0xE7B39A:0x5345,0xE7B39D:0x5346,0xE7B3A6:0x5347,
0xE7B3A9:0x5348,0xE7B3AB:0x5349,0xE7B3B5:0x534A,0xE7B483:0x534B,0xE7B487:0x534C,
0xE7B488:0x534D,0xE7B489:0x534E,0xE7B48F:0x534F,0xE7B491:0x5350,0xE7B492:0x5351,
0xE7B493:0x5352,0xE7B496:0x5353,0xE7B49D:0x5354,0xE7B49E:0x5355,0xE7B4A3:0x5356,
0xE7B4A6:0x5357,0xE7B4AA:0x5358,0xE7B4AD:0x5359,0xE7B4B1:0x535A,0xE7B4BC:0x535B,
0xE7B4BD:0x535C,0xE7B4BE:0x535D,0xE7B580:0x535E,0xE7B581:0x535F,0xE7B587:0x5360,
0xE7B588:0x5361,0xE7B58D:0x5362,0xE7B591:0x5363,0xE7B593:0x5364,0xE7B597:0x5365,
0xE7B599:0x5366,0xE7B59A:0x5367,0xE7B59C:0x5368,0xE7B59D:0x5369,0xE7B5A5:0x536A,
0xE7B5A7:0x536B,0xE7B5AA:0x536C,0xE7B5B0:0x536D,0xE7B5B8:0x536E,0xE7B5BA:0x536F,
0xE7B5BB:0x5370,0xE7B5BF:0x5371,0xE7B681:0x5372,0xE7B682:0x5373,0xE7B683:0x5374,
0xE7B685:0x5375,0xE7B686:0x5376,0xE7B688:0x5377,0xE7B68B:0x5378,0xE7B68C:0x5379,
0xE7B68D:0x537A,0xE7B691:0x537B,0xE7B696:0x537C,0xE7B697:0x537D,0xE7B69D:0x537E,
0xE7B69E:0x5421,0xE7B6A6:0x5422,0xE7B6A7:0x5423,0xE7B6AA:0x5424,0xE7B6B3:0x5425,
0xE7B6B6:0x5426,0xE7B6B7:0x5427,0xE7B6B9:0x5428,0xE7B782:0x5429,0xE7B783:0x542A,
0xE7B784:0x542B,0xE7B785:0x542C,0xE7B786:0x542D,0xE7B78C:0x542E,0xE7B78D:0x542F,
0xE7B78E:0x5430,0xE7B797:0x5431,0xE7B799:0x5432,0xE7B880:0x5433,0xE7B7A2:0x5434,
0xE7B7A5:0x5435,0xE7B7A6:0x5436,0xE7B7AA:0x5437,0xE7B7AB:0x5438,0xE7B7AD:0x5439,
0xE7B7B1:0x543A,0xE7B7B5:0x543B,0xE7B7B6:0x543C,0xE7B7B9:0x543D,0xE7B7BA:0x543E,
0xE7B888:0x543F,0xE7B890:0x5440,0xE7B891:0x5441,0xE7B895:0x5442,0xE7B897:0x5443,
0xE7B89C:0x5444,0xE7B89D:0x5445,0xE7B8A0:0x5446,0xE7B8A7:0x5447,0xE7B8A8:0x5448,
0xE7B8AC:0x5449,0xE7B8AD:0x544A,0xE7B8AF:0x544B,0xE7B8B3:0x544C,0xE7B8B6:0x544D,
0xE7B8BF:0x544E,0xE7B984:0x544F,0xE7B985:0x5450,0xE7B987:0x5451,0xE7B98E:0x5452,
0xE7B990:0x5453,0xE7B992:0x5454,0xE7B998:0x5455,0xE7B99F:0x5456,0xE7B9A1:0x5457,
0xE7B9A2:0x5458,0xE7B9A5:0x5459,0xE7B9AB:0x545A,0xE7B9AE:0x545B,0xE7B9AF:0x545C,
0xE7B9B3:0x545D,0xE7B9B8:0x545E,0xE7B9BE:0x545F,0xE7BA81:0x5460,0xE7BA86:0x5461,
0xE7BA87:0x5462,0xE7BA8A:0x5463,0xE7BA8D:0x5464,0xE7BA91:0x5465,0xE7BA95:0x5466,
0xE7BA98:0x5467,0xE7BA9A:0x5468,0xE7BA9D:0x5469,0xE7BA9E:0x546A,0xE7BCBC:0x546B,
0xE7BCBB:0x546C,0xE7BCBD:0x546D,0xE7BCBE:0x546E,0xE7BCBF:0x546F,0xE7BD83:0x5470,
0xE7BD84:0x5471,0xE7BD87:0x5472,0xE7BD8F:0x5473,0xE7BD92:0x5474,0xE7BD93:0x5475,
0xE7BD9B:0x5476,0xE7BD9C:0x5477,0xE7BD9D:0x5478,0xE7BDA1:0x5479,0xE7BDA3:0x547A,
0xE7BDA4:0x547B,0xE7BDA5:0x547C,0xE7BDA6:0x547D,0xE7BDAD:0x547E,0xE7BDB1:0x5521,
0xE7BDBD:0x5522,0xE7BDBE:0x5523,0xE7BDBF:0x5524,0xE7BE80:0x5525,0xE7BE8B:0x5526,
0xE7BE8D:0x5527,0xE7BE8F:0x5528,0xE7BE90:0x5529,0xE7BE91:0x552A,0xE7BE96:0x552B,
0xE7BE97:0x552C,0xE7BE9C:0x552D,0xE7BEA1:0x552E,0xE7BEA2:0x552F,0xE7BEA6:0x5530,
0xE7BEAA:0x5531,0xE7BEAD:0x5532,0xE7BEB4:0x5533,0xE7BEBC:0x5534,0xE7BEBF:0x5535,
0xE7BF80:0x5536,0xE7BF83:0x5537,0xE7BF88:0x5538,0xE7BF8E:0x5539,0xE7BF8F:0x553A,
0xE7BF9B:0x553B,0xE7BF9F:0x553C,0xE7BFA3:0x553D,0xE7BFA5:0x553E,0xE7BFA8:0x553F,
0xE7BFAC:0x5540,0xE7BFAE:0x5541,0xE7BFAF:0x5542,0xE7BFB2:0x5543,0xE7BFBA:0x5544,
0xE7BFBD:0x5545,0xE7BFBE:0x5546,0xE7BFBF:0x5547,0xE88087:0x5548,0xE88088:0x5549,
0xE8808A:0x554A,0xE8808D:0x554B,0xE8808E:0x554C,0xE8808F:0x554D,0xE88091:0x554E,
0xE88093:0x554F,0xE88094:0x5550,0xE88096:0x5551,0xE8809D:0x5552,0xE8809E:0x5553,
0xE8809F:0x5554,0xE880A0:0x5555,0xE880A4:0x5556,0xE880A6:0x5557,0xE880AC:0x5558,
0xE880AE:0x5559,0xE880B0:0x555A,0xE880B4:0x555B,0xE880B5:0x555C,0xE880B7:0x555D,
0xE880B9:0x555E,0xE880BA:0x555F,0xE880BC:0x5560,0xE880BE:0x5561,0xE88180:0x5562,
0xE88184:0x5563,0xE881A0:0x5564,0xE881A4:0x5565,0xE881A6:0x5566,0xE881AD:0x5567,
0xE881B1:0x5568,0xE881B5:0x5569,0xE88281:0x556A,0xE88288:0x556B,0xE8828E:0x556C,
0xE8829C:0x556D,0xE8829E:0x556E,0xE882A6:0x556F,0xE882A7:0x5570,0xE882AB:0x5571,
0xE882B8:0x5572,0xE882B9:0x5573,0xE88388:0x5574,0xE8838D:0x5575,0xE8838F:0x5576,
0xE88392:0x5577,0xE88394:0x5578,0xE88395:0x5579,0xE88397:0x557A,0xE88398:0x557B,
0xE883A0:0x557C,0xE883AD:0x557D,0xE883AE:0x557E,0xE883B0:0x5621,0xE883B2:0x5622,
0xE883B3:0x5623,0xE883B6:0x5624,0xE883B9:0x5625,0xE883BA:0x5626,0xE883BE:0x5627,
0xE88483:0x5628,0xE8848B:0x5629,0xE88496:0x562A,0xE88497:0x562B,0xE88498:0x562C,
0xE8849C:0x562D,0xE8849E:0x562E,0xE884A0:0x562F,0xE884A4:0x5630,0xE884A7:0x5631,
0xE884AC:0x5632,0xE884B0:0x5633,0xE884B5:0x5634,0xE884BA:0x5635,0xE884BC:0x5636,
0xE88585:0x5637,0xE88587:0x5638,0xE8858A:0x5639,0xE8858C:0x563A,0xE88592:0x563B,
0xE88597:0x563C,0xE885A0:0x563D,0xE885A1:0x563E,0xE885A7:0x563F,0xE885A8:0x5640,
0xE885A9:0x5641,0xE885AD:0x5642,0xE885AF:0x5643,0xE885B7:0x5644,0xE88681:0x5645,
0xE88690:0x5646,0xE88684:0x5647,0xE88685:0x5648,0xE88686:0x5649,0xE8868B:0x564A,
0xE8868E:0x564B,0xE88696:0x564C,0xE88698:0x564D,0xE8869B:0x564E,0xE8869E:0x564F,
0xE886A2:0x5650,0xE886AE:0x5651,0xE886B2:0x5652,0xE886B4:0x5653,0xE886BB:0x5654,
0xE8878B:0x5655,0xE88783:0x5656,0xE88785:0x5657,0xE8878A:0x5658,0xE8878E:0x5659,
0xE8878F:0x565A,0xE88795:0x565B,0xE88797:0x565C,0xE8879B:0x565D,0xE8879D:0x565E,
0xE8879E:0x565F,0xE887A1:0x5660,0xE887A4:0x5661,0xE887AB:0x5662,0xE887AC:0x5663,
0xE887B0:0x5664,0xE887B1:0x5665,0xE887B2:0x5666,0xE887B5:0x5667,0xE887B6:0x5668,
0xE887B8:0x5669,0xE887B9:0x566A,0xE887BD:0x566B,0xE887BF:0x566C,0xE88880:0x566D,
0xE88883:0x566E,0xE8888F:0x566F,0xE88893:0x5670,0xE88894:0x5671,0xE88899:0x5672,
0xE8889A:0x5673,0xE8889D:0x5674,0xE888A1:0x5675,0xE888A2:0x5676,0xE888A8:0x5677,
0xE888B2:0x5678,0xE888B4:0x5679,0xE888BA:0x567A,0xE88983:0x567B,0xE88984:0x567C,
0xE88985:0x567D,0xE88986:0x567E,0xE8898B:0x5721,0xE8898E:0x5722,0xE8898F:0x5723,
0xE88991:0x5724,0xE88996:0x5725,0xE8899C:0x5726,0xE889A0:0x5727,0xE889A3:0x5728,
0xE889A7:0x5729,0xE889AD:0x572A,0xE889B4:0x572B,0xE889BB:0x572C,0xE889BD:0x572D,
0xE889BF:0x572E,0xE88A80:0x572F,0xE88A81:0x5730,0xE88A83:0x5731,0xE88A84:0x5732,
0xE88A87:0x5733,0xE88A89:0x5734,0xE88A8A:0x5735,0xE88A8E:0x5736,0xE88A91:0x5737,
0xE88A94:0x5738,0xE88A96:0x5739,0xE88A98:0x573A,0xE88A9A:0x573B,0xE88A9B:0x573C,
0xE88AA0:0x573D,0xE88AA1:0x573E,0xE88AA3:0x573F,0xE88AA4:0x5740,0xE88AA7:0x5741,
0xE88AA8:0x5742,0xE88AA9:0x5743,0xE88AAA:0x5744,0xE88AAE:0x5745,0xE88AB0:0x5746,
0xE88AB2:0x5747,0xE88AB4:0x5748,0xE88AB7:0x5749,0xE88ABA:0x574A,0xE88ABC:0x574B,
0xE88ABE:0x574C,0xE88ABF:0x574D,0xE88B86:0x574E,0xE88B90:0x574F,0xE88B95:0x5750,
0xE88B9A:0x5751,0xE88BA0:0x5752,0xE88BA2:0x5753,0xE88BA4:0x5754,0xE88BA8:0x5755,
0xE88BAA:0x5756,0xE88BAD:0x5757,0xE88BAF:0x5758,0xE88BB6:0x5759,0xE88BB7:0x575A,
0xE88BBD:0x575B,0xE88BBE:0x575C,0xE88C80:0x575D,0xE88C81:0x575E,0xE88C87:0x575F,
0xE88C88:0x5760,0xE88C8A:0x5761,0xE88C8B:0x5762,0xE88D94:0x5763,0xE88C9B:0x5764,
0xE88C9D:0x5765,0xE88C9E:0x5766,0xE88C9F:0x5767,0xE88CA1:0x5768,0xE88CA2:0x5769,
0xE88CAC:0x576A,0xE88CAD:0x576B,0xE88CAE:0x576C,0xE88CB0:0x576D,0xE88CB3:0x576E,
0xE88CB7:0x576F,0xE88CBA:0x5770,0xE88CBC:0x5771,0xE88CBD:0x5772,0xE88D82:0x5773,
0xE88D83:0x5774,0xE88D84:0x5775,0xE88D87:0x5776,0xE88D8D:0x5777,0xE88D8E:0x5778,
0xE88D91:0x5779,0xE88D95:0x577A,0xE88D96:0x577B,0xE88D97:0x577C,0xE88DB0:0x577D,
0xE88DB8:0x577E,0xE88DBD:0x5821,0xE88DBF:0x5822,0xE88E80:0x5823,0xE88E82:0x5824,
0xE88E84:0x5825,0xE88E86:0x5826,0xE88E8D:0x5827,0xE88E92:0x5828,0xE88E94:0x5829,
0xE88E95:0x582A,0xE88E98:0x582B,0xE88E99:0x582C,0xE88E9B:0x582D,0xE88E9C:0x582E,
0xE88E9D:0x582F,0xE88EA6:0x5830,0xE88EA7:0x5831,0xE88EA9:0x5832,0xE88EAC:0x5833,
0xE88EBE:0x5834,0xE88EBF:0x5835,0xE88F80:0x5836,0xE88F87:0x5837,0xE88F89:0x5838,
0xE88F8F:0x5839,0xE88F90:0x583A,0xE88F91:0x583B,0xE88F94:0x583C,0xE88F9D:0x583D,
0xE88D93:0x583E,0xE88FA8:0x583F,0xE88FAA:0x5840,0xE88FB6:0x5841,0xE88FB8:0x5842,
0xE88FB9:0x5843,0xE88FBC:0x5844,0xE89081:0x5845,0xE89086:0x5846,0xE8908A:0x5847,
0xE8908F:0x5848,0xE89091:0x5849,0xE89095:0x584A,0xE89099:0x584B,0xE88EAD:0x584C,
0xE890AF:0x584D,0xE890B9:0x584E,0xE89185:0x584F,0xE89187:0x5850,0xE89188:0x5851,
0xE8918A:0x5852,0xE8918D:0x5853,0xE8918F:0x5854,0xE89191:0x5855,0xE89192:0x5856,
0xE89196:0x5857,0xE89198:0x5858,0xE89199:0x5859,0xE8919A:0x585A,0xE8919C:0x585B,
0xE891A0:0x585C,0xE891A4:0x585D,0xE891A5:0x585E,0xE891A7:0x585F,0xE891AA:0x5860,
0xE891B0:0x5861,0xE891B3:0x5862,0xE891B4:0x5863,0xE891B6:0x5864,0xE891B8:0x5865,
0xE891BC:0x5866,0xE891BD:0x5867,0xE89281:0x5868,0xE89285:0x5869,0xE89292:0x586A,
0xE89293:0x586B,0xE89295:0x586C,0xE8929E:0x586D,0xE892A6:0x586E,0xE892A8:0x586F,
0xE892A9:0x5870,0xE892AA:0x5871,0xE892AF:0x5872,0xE892B1:0x5873,0xE892B4:0x5874,
0xE892BA:0x5875,0xE892BD:0x5876,0xE892BE:0x5877,0xE89380:0x5878,0xE89382:0x5879,
0xE89387:0x587A,0xE89388:0x587B,0xE8938C:0x587C,0xE8938F:0x587D,0xE89393:0x587E,
0xE8939C:0x5921,0xE893A7:0x5922,0xE893AA:0x5923,0xE893AF:0x5924,0xE893B0:0x5925,
0xE893B1:0x5926,0xE893B2:0x5927,0xE893B7:0x5928,0xE894B2:0x5929,0xE893BA:0x592A,
0xE893BB:0x592B,0xE893BD:0x592C,0xE89482:0x592D,0xE89483:0x592E,0xE89487:0x592F,
0xE8948C:0x5930,0xE8948E:0x5931,0xE89490:0x5932,0xE8949C:0x5933,0xE8949E:0x5934,
0xE894A2:0x5935,0xE894A3:0x5936,0xE894A4:0x5937,0xE894A5:0x5938,0xE894A7:0x5939,
0xE894AA:0x593A,0xE894AB:0x593B,0xE894AF:0x593C,0xE894B3:0x593D,0xE894B4:0x593E,
0xE894B6:0x593F,0xE894BF:0x5940,0xE89586:0x5941,0xE8958F:0x5942,0xE89590:0x5943,
0xE89591:0x5944,0xE89592:0x5945,0xE89593:0x5946,0xE89596:0x5947,0xE89599:0x5948,
0xE8959C:0x5949,0xE8959D:0x594A,0xE8959E:0x594B,0xE8959F:0x594C,0xE895A0:0x594D,
0xE895A1:0x594E,0xE895A2:0x594F,0xE895A4:0x5950,0xE895AB:0x5951,0xE895AF:0x5952,
0xE895B9:0x5953,0xE895BA:0x5954,0xE895BB:0x5955,0xE895BD:0x5956,0xE895BF:0x5957,
0xE89681:0x5958,0xE89685:0x5959,0xE89686:0x595A,0xE89689:0x595B,0xE8968B:0x595C,
0xE8968C:0x595D,0xE8968F:0x595E,0xE89693:0x595F,0xE89698:0x5960,0xE8969D:0x5961,
0xE8969F:0x5962,0xE896A0:0x5963,0xE896A2:0x5964,0xE896A5:0x5965,0xE896A7:0x5966,
0xE896B4:0x5967,0xE896B6:0x5968,0xE896B7:0x5969,0xE896B8:0x596A,0xE896BC:0x596B,
0xE896BD:0x596C,0xE896BE:0x596D,0xE896BF:0x596E,0xE89782:0x596F,0xE89787:0x5970,
0xE8978A:0x5971,0xE8978B:0x5972,0xE8978E:0x5973,0xE896AD:0x5974,0xE89798:0x5975,
0xE8979A:0x5976,0xE8979F:0x5977,0xE897A0:0x5978,0xE897A6:0x5979,0xE897A8:0x597A,
0xE897AD:0x597B,0xE897B3:0x597C,0xE897B6:0x597D,0xE897BC:0x597E,0xE897BF:0x5A21,
0xE89880:0x5A22,0xE89884:0x5A23,0xE89885:0x5A24,0xE8988D:0x5A25,0xE8988E:0x5A26,
0xE89890:0x5A27,0xE89891:0x5A28,0xE89892:0x5A29,0xE89898:0x5A2A,0xE89899:0x5A2B,
0xE8989B:0x5A2C,0xE8989E:0x5A2D,0xE898A1:0x5A2E,0xE898A7:0x5A2F,0xE898A9:0x5A30,
0xE898B6:0x5A31,0xE898B8:0x5A32,0xE898BA:0x5A33,0xE898BC:0x5A34,0xE898BD:0x5A35,
0xE89980:0x5A36,0xE89982:0x5A37,0xE89986:0x5A38,0xE89992:0x5A39,0xE89993:0x5A3A,
0xE89996:0x5A3B,0xE89997:0x5A3C,0xE89998:0x5A3D,0xE89999:0x5A3E,0xE8999D:0x5A3F,
0xE899A0:0x5A40,0xE899A1:0x5A41,0xE899A2:0x5A42,0xE899A3:0x5A43,0xE899A4:0x5A44,
0xE899A9:0x5A45,0xE899AC:0x5A46,0xE899AF:0x5A47,0xE899B5:0x5A48,0xE899B6:0x5A49,
0xE899B7:0x5A4A,0xE899BA:0x5A4B,0xE89A8D:0x5A4C,0xE89A91:0x5A4D,0xE89A96:0x5A4E,
0xE89A98:0x5A4F,0xE89A9A:0x5A50,0xE89A9C:0x5A51,0xE89AA1:0x5A52,0xE89AA6:0x5A53,
0xE89AA7:0x5A54,0xE89AA8:0x5A55,0xE89AAD:0x5A56,0xE89AB1:0x5A57,0xE89AB3:0x5A58,
0xE89AB4:0x5A59,0xE89AB5:0x5A5A,0xE89AB7:0x5A5B,0xE89AB8:0x5A5C,0xE89AB9:0x5A5D,
0xE89ABF:0x5A5E,0xE89B80:0x5A5F,0xE89B81:0x5A60,0xE89B83:0x5A61,0xE89B85:0x5A62,
0xE89B91:0x5A63,0xE89B92:0x5A64,0xE89B95:0x5A65,0xE89B97:0x5A66,0xE89B9A:0x5A67,
0xE89B9C:0x5A68,0xE89BA0:0x5A69,0xE89BA3:0x5A6A,0xE89BA5:0x5A6B,0xE89BA7:0x5A6C,
0xE89A88:0x5A6D,0xE89BBA:0x5A6E,0xE89BBC:0x5A6F,0xE89BBD:0x5A70,0xE89C84:0x5A71,
0xE89C85:0x5A72,0xE89C87:0x5A73,0xE89C8B:0x5A74,0xE89C8E:0x5A75,0xE89C8F:0x5A76,
0xE89C90:0x5A77,0xE89C93:0x5A78,0xE89C94:0x5A79,0xE89C99:0x5A7A,0xE89C9E:0x5A7B,
0xE89C9F:0x5A7C,0xE89CA1:0x5A7D,0xE89CA3:0x5A7E,0xE89CA8:0x5B21,0xE89CAE:0x5B22,
0xE89CAF:0x5B23,0xE89CB1:0x5B24,0xE89CB2:0x5B25,0xE89CB9:0x5B26,0xE89CBA:0x5B27,
0xE89CBC:0x5B28,0xE89CBD:0x5B29,0xE89CBE:0x5B2A,0xE89D80:0x5B2B,0xE89D83:0x5B2C,
0xE89D85:0x5B2D,0xE89D8D:0x5B2E,0xE89D98:0x5B2F,0xE89D9D:0x5B30,0xE89DA1:0x5B31,
0xE89DA4:0x5B32,0xE89DA5:0x5B33,0xE89DAF:0x5B34,0xE89DB1:0x5B35,0xE89DB2:0x5B36,
0xE89DBB:0x5B37,0xE89E83:0x5B38,0xE89E84:0x5B39,0xE89E85:0x5B3A,0xE89E86:0x5B3B,
0xE89E87:0x5B3C,0xE89E88:0x5B3D,0xE89E89:0x5B3E,0xE89E8B:0x5B3F,0xE89E8C:0x5B40,
0xE89E90:0x5B41,0xE89E93:0x5B42,0xE89E95:0x5B43,0xE89E97:0x5B44,0xE89E98:0x5B45,
0xE89E99:0x5B46,0xE89E9E:0x5B47,0xE89EA0:0x5B48,0xE89EA3:0x5B49,0xE89EA7:0x5B4A,
0xE89EAC:0x5B4B,0xE89EAD:0x5B4C,0xE89EAE:0x5B4D,0xE89EB1:0x5B4E,0xE89EB5:0x5B4F,
0xE89EBE:0x5B50,0xE89EBF:0x5B51,0xE89F81:0x5B52,0xE89F88:0x5B53,0xE89F89:0x5B54,
0xE89F8A:0x5B55,0xE89F8E:0x5B56,0xE89F95:0x5B57,0xE89F96:0x5B58,0xE89F99:0x5B59,
0xE89F9A:0x5B5A,0xE89F9C:0x5B5B,0xE89F9F:0x5B5C,0xE89FA2:0x5B5D,0xE89FA3:0x5B5E,
0xE89FA4:0x5B5F,0xE89FAA:0x5B60,0xE89FAB:0x5B61,0xE89FAD:0x5B62,0xE89FB1:0x5B63,
0xE89FB3:0x5B64,0xE89FB8:0x5B65,0xE89FBA:0x5B66,0xE89FBF:0x5B67,0xE8A081:0x5B68,
0xE8A083:0x5B69,0xE8A086:0x5B6A,0xE8A089:0x5B6B,0xE8A08A:0x5B6C,0xE8A08B:0x5B6D,
0xE8A090:0x5B6E,0xE8A099:0x5B6F,0xE8A092:0x5B70,0xE8A093:0x5B71,0xE8A094:0x5B72,
0xE8A098:0x5B73,0xE8A09A:0x5B74,0xE8A09B:0x5B75,0xE8A09C:0x5B76,0xE8A09E:0x5B77,
0xE8A09F:0x5B78,0xE8A0A8:0x5B79,0xE8A0AD:0x5B7A,0xE8A0AE:0x5B7B,0xE8A0B0:0x5B7C,
0xE8A0B2:0x5B7D,0xE8A0B5:0x5B7E,0xE8A0BA:0x5C21,0xE8A0BC:0x5C22,0xE8A181:0x5C23,
0xE8A183:0x5C24,0xE8A185:0x5C25,0xE8A188:0x5C26,0xE8A189:0x5C27,0xE8A18A:0x5C28,
0xE8A18B:0x5C29,0xE8A18E:0x5C2A,0xE8A191:0x5C2B,0xE8A195:0x5C2C,0xE8A196:0x5C2D,
0xE8A198:0x5C2E,0xE8A19A:0x5C2F,0xE8A19C:0x5C30,0xE8A19F:0x5C31,0xE8A1A0:0x5C32,
0xE8A1A4:0x5C33,0xE8A1A9:0x5C34,0xE8A1B1:0x5C35,0xE8A1B9:0x5C36,0xE8A1BB:0x5C37,
0xE8A280:0x5C38,0xE8A298:0x5C39,0xE8A29A:0x5C3A,0xE8A29B:0x5C3B,0xE8A29C:0x5C3C,
0xE8A29F:0x5C3D,0xE8A2A0:0x5C3E,0xE8A2A8:0x5C3F,0xE8A2AA:0x5C40,0xE8A2BA:0x5C41,
0xE8A2BD:0x5C42,0xE8A2BE:0x5C43,0xE8A380:0x5C44,0xE8A38A:0x5C45,0xE8A38B:0x5C46,
0xE8A38C:0x5C47,0xE8A38D:0x5C48,0xE8A38E:0x5C49,0xE8A391:0x5C4A,0xE8A392:0x5C4B,
0xE8A393:0x5C4C,0xE8A39B:0x5C4D,0xE8A39E:0x5C4E,0xE8A3A7:0x5C4F,0xE8A3AF:0x5C50,
0xE8A3B0:0x5C51,0xE8A3B1:0x5C52,0xE8A3B5:0x5C53,0xE8A3B7:0x5C54,0xE8A481:0x5C55,
0xE8A486:0x5C56,0xE8A48D:0x5C57,0xE8A48E:0x5C58,0xE8A48F:0x5C59,0xE8A495:0x5C5A,
0xE8A496:0x5C5B,0xE8A498:0x5C5C,0xE8A499:0x5C5D,0xE8A49A:0x5C5E,0xE8A49C:0x5C5F,
0xE8A4A0:0x5C60,0xE8A4A6:0x5C61,0xE8A4A7:0x5C62,0xE8A4A8:0x5C63,0xE8A4B0:0x5C64,
0xE8A4B1:0x5C65,0xE8A4B2:0x5C66,0xE8A4B5:0x5C67,0xE8A4B9:0x5C68,0xE8A4BA:0x5C69,
0xE8A4BE:0x5C6A,0xE8A580:0x5C6B,0xE8A582:0x5C6C,0xE8A585:0x5C6D,0xE8A586:0x5C6E,
0xE8A589:0x5C6F,0xE8A58F:0x5C70,0xE8A592:0x5C71,0xE8A597:0x5C72,0xE8A59A:0x5C73,
0xE8A59B:0x5C74,0xE8A59C:0x5C75,0xE8A5A1:0x5C76,0xE8A5A2:0x5C77,0xE8A5A3:0x5C78,
0xE8A5AB:0x5C79,0xE8A5AE:0x5C7A,0xE8A5B0:0x5C7B,0xE8A5B3:0x5C7C,0xE8A5B5:0x5C7D,
0xE8A5BA:0x5C7E,0xE8A5BB:0x5D21,0xE8A5BC:0x5D22,0xE8A5BD:0x5D23,0xE8A689:0x5D24,
0xE8A68D:0x5D25,0xE8A690:0x5D26,0xE8A694:0x5D27,0xE8A695:0x5D28,0xE8A69B:0x5D29,
0xE8A69C:0x5D2A,0xE8A69F:0x5D2B,0xE8A6A0:0x5D2C,0xE8A6A5:0x5D2D,0xE8A6B0:0x5D2E,
0xE8A6B4:0x5D2F,0xE8A6B5:0x5D30,0xE8A6B6:0x5D31,0xE8A6B7:0x5D32,0xE8A6BC:0x5D33,
0xE8A794:0x5D34,0xE8A795:0x5D35,0xE8A796:0x5D36,0xE8A797:0x5D37,0xE8A798:0x5D38,
0xE8A7A5:0x5D39,0xE8A7A9:0x5D3A,0xE8A7AB:0x5D3B,0xE8A7AD:0x5D3C,0xE8A7B1:0x5D3D,
0xE8A7B3:0x5D3E,0xE8A7B6:0x5D3F,0xE8A7B9:0x5D40,0xE8A7BD:0x5D41,0xE8A7BF:0x5D42,
0xE8A884:0x5D43,0xE8A885:0x5D44,0xE8A887:0x5D45,0xE8A88F:0x5D46,0xE8A891:0x5D47,
0xE8A892:0x5D48,0xE8A894:0x5D49,0xE8A895:0x5D4A,0xE8A89E:0x5D4B,0xE8A8A0:0x5D4C,
0xE8A8A2:0x5D4D,0xE8A8A4:0x5D4E,0xE8A8A6:0x5D4F,0xE8A8AB:0x5D50,0xE8A8AC:0x5D51,
0xE8A8AF:0x5D52,0xE8A8B5:0x5D53,0xE8A8B7:0x5D54,0xE8A8BD:0x5D55,0xE8A8BE:0x5D56,
0xE8A980:0x5D57,0xE8A983:0x5D58,0xE8A985:0x5D59,0xE8A987:0x5D5A,0xE8A989:0x5D5B,
0xE8A98D:0x5D5C,0xE8A98E:0x5D5D,0xE8A993:0x5D5E,0xE8A996:0x5D5F,0xE8A997:0x5D60,
0xE8A998:0x5D61,0xE8A99C:0x5D62,0xE8A99D:0x5D63,0xE8A9A1:0x5D64,0xE8A9A5:0x5D65,
0xE8A9A7:0x5D66,0xE8A9B5:0x5D67,0xE8A9B6:0x5D68,0xE8A9B7:0x5D69,0xE8A9B9:0x5D6A,
0xE8A9BA:0x5D6B,0xE8A9BB:0x5D6C,0xE8A9BE:0x5D6D,0xE8A9BF:0x5D6E,0xE8AA80:0x5D6F,
0xE8AA83:0x5D70,0xE8AA86:0x5D71,0xE8AA8B:0x5D72,0xE8AA8F:0x5D73,0xE8AA90:0x5D74,
0xE8AA92:0x5D75,0xE8AA96:0x5D76,0xE8AA97:0x5D77,0xE8AA99:0x5D78,0xE8AA9F:0x5D79,
0xE8AAA7:0x5D7A,0xE8AAA9:0x5D7B,0xE8AAAE:0x5D7C,0xE8AAAF:0x5D7D,0xE8AAB3:0x5D7E,
0xE8AAB6:0x5E21,0xE8AAB7:0x5E22,0xE8AABB:0x5E23,0xE8AABE:0x5E24,0xE8AB83:0x5E25,
0xE8AB86:0x5E26,0xE8AB88:0x5E27,0xE8AB89:0x5E28,0xE8AB8A:0x5E29,0xE8AB91:0x5E2A,
0xE8AB93:0x5E2B,0xE8AB94:0x5E2C,0xE8AB95:0x5E2D,0xE8AB97:0x5E2E,0xE8AB9D:0x5E2F,
0xE8AB9F:0x5E30,0xE8ABAC:0x5E31,0xE8ABB0:0x5E32,0xE8ABB4:0x5E33,0xE8ABB5:0x5E34,
0xE8ABB6:0x5E35,0xE8ABBC:0x5E36,0xE8ABBF:0x5E37,0xE8AC85:0x5E38,0xE8AC86:0x5E39,
0xE8AC8B:0x5E3A,0xE8AC91:0x5E3B,0xE8AC9C:0x5E3C,0xE8AC9E:0x5E3D,0xE8AC9F:0x5E3E,
0xE8AC8A:0x5E3F,0xE8ACAD:0x5E40,0xE8ACB0:0x5E41,0xE8ACB7:0x5E42,0xE8ACBC:0x5E43,
0xE8AD82:0x5E44,0xE8AD83:0x5E45,0xE8AD84:0x5E46,0xE8AD85:0x5E47,0xE8AD86:0x5E48,
0xE8AD88:0x5E49,0xE8AD92:0x5E4A,0xE8AD93:0x5E4B,0xE8AD94:0x5E4C,0xE8AD99:0x5E4D,
0xE8AD8D:0x5E4E,0xE8AD9E:0x5E4F,0xE8ADA3:0x5E50,0xE8ADAD:0x5E51,0xE8ADB6:0x5E52,
0xE8ADB8:0x5E53,0xE8ADB9:0x5E54,0xE8ADBC:0x5E55,0xE8ADBE:0x5E56,0xE8AE81:0x5E57,
0xE8AE84:0x5E58,0xE8AE85:0x5E59,0xE8AE8B:0x5E5A,0xE8AE8D:0x5E5B,0xE8AE8F:0x5E5C,
0xE8AE94:0x5E5D,0xE8AE95:0x5E5E,0xE8AE9C:0x5E5F,0xE8AE9E:0x5E60,0xE8AE9F:0x5E61,
0xE8B0B8:0x5E62,0xE8B0B9:0x5E63,0xE8B0BD:0x5E64,0xE8B0BE:0x5E65,0xE8B185:0x5E66,
0xE8B187:0x5E67,0xE8B189:0x5E68,0xE8B18B:0x5E69,0xE8B18F:0x5E6A,0xE8B191:0x5E6B,
0xE8B193:0x5E6C,0xE8B194:0x5E6D,0xE8B197:0x5E6E,0xE8B198:0x5E6F,0xE8B19B:0x5E70,
0xE8B19D:0x5E71,0xE8B199:0x5E72,0xE8B1A3:0x5E73,0xE8B1A4:0x5E74,0xE8B1A6:0x5E75,
0xE8B1A8:0x5E76,0xE8B1A9:0x5E77,0xE8B1AD:0x5E78,0xE8B1B3:0x5E79,0xE8B1B5:0x5E7A,
0xE8B1B6:0x5E7B,0xE8B1BB:0x5E7C,0xE8B1BE:0x5E7D,0xE8B286:0x5E7E,0xE8B287:0x5F21,
0xE8B28B:0x5F22,0xE8B290:0x5F23,0xE8B292:0x5F24,0xE8B293:0x5F25,0xE8B299:0x5F26,
0xE8B29B:0x5F27,0xE8B29C:0x5F28,0xE8B2A4:0x5F29,0xE8B2B9:0x5F2A,0xE8B2BA:0x5F2B,
0xE8B385:0x5F2C,0xE8B386:0x5F2D,0xE8B389:0x5F2E,0xE8B38B:0x5F2F,0xE8B38F:0x5F30,
0xE8B396:0x5F31,0xE8B395:0x5F32,0xE8B399:0x5F33,0xE8B39D:0x5F34,0xE8B3A1:0x5F35,
0xE8B3A8:0x5F36,0xE8B3AC:0x5F37,0xE8B3AF:0x5F38,0xE8B3B0:0x5F39,0xE8B3B2:0x5F3A,
0xE8B3B5:0x5F3B,0xE8B3B7:0x5F3C,0xE8B3B8:0x5F3D,0xE8B3BE:0x5F3E,0xE8B3BF:0x5F3F,
0xE8B481:0x5F40,0xE8B483:0x5F41,0xE8B489:0x5F42,0xE8B492:0x5F43,0xE8B497:0x5F44,
0xE8B49B:0x5F45,0xE8B5A5:0x5F46,0xE8B5A9:0x5F47,0xE8B5AC:0x5F48,0xE8B5AE:0x5F49,
0xE8B5BF:0x5F4A,0xE8B682:0x5F4B,0xE8B684:0x5F4C,0xE8B688:0x5F4D,0xE8B68D:0x5F4E,
0xE8B690:0x5F4F,0xE8B691:0x5F50,0xE8B695:0x5F51,0xE8B69E:0x5F52,0xE8B69F:0x5F53,
0xE8B6A0:0x5F54,0xE8B6A6:0x5F55,0xE8B6AB:0x5F56,0xE8B6AC:0x5F57,0xE8B6AF:0x5F58,
0xE8B6B2:0x5F59,0xE8B6B5:0x5F5A,0xE8B6B7:0x5F5B,0xE8B6B9:0x5F5C,0xE8B6BB:0x5F5D,
0xE8B780:0x5F5E,0xE8B785:0x5F5F,0xE8B786:0x5F60,0xE8B787:0x5F61,0xE8B788:0x5F62,
0xE8B78A:0x5F63,0xE8B78E:0x5F64,0xE8B791:0x5F65,0xE8B794:0x5F66,0xE8B795:0x5F67,
0xE8B797:0x5F68,0xE8B799:0x5F69,0xE8B7A4:0x5F6A,0xE8B7A5:0x5F6B,0xE8B7A7:0x5F6C,
0xE8B7AC:0x5F6D,0xE8B7B0:0x5F6E,0xE8B6BC:0x5F6F,0xE8B7B1:0x5F70,0xE8B7B2:0x5F71,
0xE8B7B4:0x5F72,0xE8B7BD:0x5F73,0xE8B881:0x5F74,0xE8B884:0x5F75,0xE8B885:0x5F76,
0xE8B886:0x5F77,0xE8B88B:0x5F78,0xE8B891:0x5F79,0xE8B894:0x5F7A,0xE8B896:0x5F7B,
0xE8B8A0:0x5F7C,0xE8B8A1:0x5F7D,0xE8B8A2:0x5F7E,0xE8B8A3:0x6021,0xE8B8A6:0x6022,
0xE8B8A7:0x6023,0xE8B8B1:0x6024,0xE8B8B3:0x6025,0xE8B8B6:0x6026,0xE8B8B7:0x6027,
0xE8B8B8:0x6028,0xE8B8B9:0x6029,0xE8B8BD:0x602A,0xE8B980:0x602B,0xE8B981:0x602C,
0xE8B98B:0x602D,0xE8B98D:0x602E,0xE8B98E:0x602F,0xE8B98F:0x6030,0xE8B994:0x6031,
0xE8B99B:0x6032,0xE8B99C:0x6033,0xE8B99D:0x6034,0xE8B99E:0x6035,0xE8B9A1:0x6036,
0xE8B9A2:0x6037,0xE8B9A9:0x6038,0xE8B9AC:0x6039,0xE8B9AD:0x603A,0xE8B9AF:0x603B,
0xE8B9B0:0x603C,0xE8B9B1:0x603D,0xE8B9B9:0x603E,0xE8B9BA:0x603F,0xE8B9BB:0x6040,
0xE8BA82:0x6041,0xE8BA83:0x6042,0xE8BA89:0x6043,0xE8BA90:0x6044,0xE8BA92:0x6045,
0xE8BA95:0x6046,0xE8BA9A:0x6047,0xE8BA9B:0x6048,0xE8BA9D:0x6049,0xE8BA9E:0x604A,
0xE8BAA2:0x604B,0xE8BAA7:0x604C,0xE8BAA9:0x604D,0xE8BAAD:0x604E,0xE8BAAE:0x604F,
0xE8BAB3:0x6050,0xE8BAB5:0x6051,0xE8BABA:0x6052,0xE8BABB:0x6053,0xE8BB80:0x6054,
0xE8BB81:0x6055,0xE8BB83:0x6056,0xE8BB84:0x6057,0xE8BB87:0x6058,0xE8BB8F:0x6059,
0xE8BB91:0x605A,0xE8BB94:0x605B,0xE8BB9C:0x605C,0xE8BBA8:0x605D,0xE8BBAE:0x605E,
0xE8BBB0:0x605F,0xE8BBB1:0x6060,0xE8BBB7:0x6061,0xE8BBB9:0x6062,0xE8BBBA:0x6063,
0xE8BBAD:0x6064,0xE8BC80:0x6065,0xE8BC82:0x6066,0xE8BC87:0x6067,0xE8BC88:0x6068,
0xE8BC8F:0x6069,0xE8BC90:0x606A,0xE8BC96:0x606B,0xE8BC97:0x606C,0xE8BC98:0x606D,
0xE8BC9E:0x606E,0xE8BCA0:0x606F,0xE8BCA1:0x6070,0xE8BCA3:0x6071,0xE8BCA5:0x6072,
0xE8BCA7:0x6073,0xE8BCA8:0x6074,0xE8BCAC:0x6075,0xE8BCAD:0x6076,0xE8BCAE:0x6077,
0xE8BCB4:0x6078,0xE8BCB5:0x6079,0xE8BCB6:0x607A,0xE8BCB7:0x607B,0xE8BCBA:0x607C,
0xE8BD80:0x607D,0xE8BD81:0x607E,0xE8BD83:0x6121,0xE8BD87:0x6122,0xE8BD8F:0x6123,
0xE8BD91:0x6124,0xE8BD92:0x6125,0xE8BD93:0x6126,0xE8BD94:0x6127,0xE8BD95:0x6128,
0xE8BD98:0x6129,0xE8BD9D:0x612A,0xE8BD9E:0x612B,0xE8BDA5:0x612C,0xE8BE9D:0x612D,
0xE8BEA0:0x612E,0xE8BEA1:0x612F,0xE8BEA4:0x6130,0xE8BEA5:0x6131,0xE8BEA6:0x6132,
0xE8BEB5:0x6133,0xE8BEB6:0x6134,0xE8BEB8:0x6135,0xE8BEBE:0x6136,0xE8BF80:0x6137,
0xE8BF81:0x6138,0xE8BF86:0x6139,0xE8BF8A:0x613A,0xE8BF8B:0x613B,0xE8BF8D:0x613C,
0xE8BF90:0x613D,0xE8BF92:0x613E,0xE8BF93:0x613F,0xE8BF95:0x6140,0xE8BFA0:0x6141,
0xE8BFA3:0x6142,0xE8BFA4:0x6143,0xE8BFA8:0x6144,0xE8BFAE:0x6145,0xE8BFB1:0x6146,
0xE8BFB5:0x6147,0xE8BFB6:0x6148,0xE8BFBB:0x6149,0xE8BFBE:0x614A,0xE98082:0x614B,
0xE98084:0x614C,0xE98088:0x614D,0xE9808C:0x614E,0xE98098:0x614F,0xE9809B:0x6150,
0xE980A8:0x6151,0xE980A9:0x6152,0xE980AF:0x6153,0xE980AA:0x6154,0xE980AC:0x6155,
0xE980AD:0x6156,0xE980B3:0x6157,0xE980B4:0x6158,0xE980B7:0x6159,0xE980BF:0x615A,
0xE98183:0x615B,0xE98184:0x615C,0xE9818C:0x615D,0xE9819B:0x615E,0xE9819D:0x615F,
0xE981A2:0x6160,0xE981A6:0x6161,0xE981A7:0x6162,0xE981AC:0x6163,0xE981B0:0x6164,
0xE981B4:0x6165,0xE981B9:0x6166,0xE98285:0x6167,0xE98288:0x6168,0xE9828B:0x6169,
0xE9828C:0x616A,0xE9828E:0x616B,0xE98290:0x616C,0xE98295:0x616D,0xE98297:0x616E,
0xE98298:0x616F,0xE98299:0x6170,0xE9829B:0x6171,0xE982A0:0x6172,0xE982A1:0x6173,
0xE982A2:0x6174,0xE982A5:0x6175,0xE982B0:0x6176,0xE982B2:0x6177,0xE982B3:0x6178,
0xE982B4:0x6179,0xE982B6:0x617A,0xE982BD:0x617B,0xE9838C:0x617C,0xE982BE:0x617D,
0xE98383:0x617E,0xE98384:0x6221,0xE98385:0x6222,0xE98387:0x6223,0xE98388:0x6224,
0xE98395:0x6225,0xE98397:0x6226,0xE98398:0x6227,0xE98399:0x6228,0xE9839C:0x6229,
0xE9839D:0x622A,0xE9839F:0x622B,0xE983A5:0x622C,0xE98392:0x622D,0xE983B6:0x622E,
0xE983AB:0x622F,0xE983AF:0x6230,0xE983B0:0x6231,0xE983B4:0x6232,0xE983BE:0x6233,
0xE983BF:0x6234,0xE98480:0x6235,0xE98484:0x6236,0xE98485:0x6237,0xE98486:0x6238,
0xE98488:0x6239,0xE9848D:0x623A,0xE98490:0x623B,0xE98494:0x623C,0xE98496:0x623D,
0xE98497:0x623E,0xE98498:0x623F,0xE9849A:0x6240,0xE9849C:0x6241,0xE9849E:0x6242,
0xE984A0:0x6243,0xE984A5:0x6244,0xE984A2:0x6245,0xE984A3:0x6246,0xE984A7:0x6247,
0xE984A9:0x6248,0xE984AE:0x6249,0xE984AF:0x624A,0xE984B1:0x624B,0xE984B4:0x624C,
0xE984B6:0x624D,0xE984B7:0x624E,0xE984B9:0x624F,0xE984BA:0x6250,0xE984BC:0x6251,
0xE984BD:0x6252,0xE98583:0x6253,0xE98587:0x6254,0xE98588:0x6255,0xE9858F:0x6256,
0xE98593:0x6257,0xE98597:0x6258,0xE98599:0x6259,0xE9859A:0x625A,0xE9859B:0x625B,
0xE985A1:0x625C,0xE985A4:0x625D,0xE985A7:0x625E,0xE985AD:0x625F,0xE985B4:0x6260,
0xE985B9:0x6261,0xE985BA:0x6262,0xE985BB:0x6263,0xE98681:0x6264,0xE98683:0x6265,
0xE98685:0x6266,0xE98686:0x6267,0xE9868A:0x6268,0xE9868E:0x6269,0xE98691:0x626A,
0xE98693:0x626B,0xE98694:0x626C,0xE98695:0x626D,0xE98698:0x626E,0xE9869E:0x626F,
0xE986A1:0x6270,0xE986A6:0x6271,0xE986A8:0x6272,0xE986AC:0x6273,0xE986AD:0x6274,
0xE986AE:0x6275,0xE986B0:0x6276,0xE986B1:0x6277,0xE986B2:0x6278,0xE986B3:0x6279,
0xE986B6:0x627A,0xE986BB:0x627B,0xE986BC:0x627C,0xE986BD:0x627D,0xE986BF:0x627E,
0xE98782:0x6321,0xE98783:0x6322,0xE98785:0x6323,0xE98793:0x6324,0xE98794:0x6325,
0xE98797:0x6326,0xE98799:0x6327,0xE9879A:0x6328,0xE9879E:0x6329,0xE987A4:0x632A,
0xE987A5:0x632B,0xE987A9:0x632C,0xE987AA:0x632D,0xE987AC:0x632E,0xE987AD:0x632F,
0xE987AE:0x6330,0xE987AF:0x6331,0xE987B0:0x6332,0xE987B1:0x6333,0xE987B7:0x6334,
0xE987B9:0x6335,0xE987BB:0x6336,0xE987BD:0x6337,0xE98880:0x6338,0xE98881:0x6339,
0xE98884:0x633A,0xE98885:0x633B,0xE98886:0x633C,0xE98887:0x633D,0xE98889:0x633E,
0xE9888A:0x633F,0xE9888C:0x6340,0xE98890:0x6341,0xE98892:0x6342,0xE98893:0x6343,
0xE98896:0x6344,0xE98898:0x6345,0xE9889C:0x6346,0xE9889D:0x6347,0xE988A3:0x6348,
0xE988A4:0x6349,0xE988A5:0x634A,0xE988A6:0x634B,0xE988A8:0x634C,0xE988AE:0x634D,
0xE988AF:0x634E,0xE988B0:0x634F,0xE988B3:0x6350,0xE988B5:0x6351,0xE988B6:0x6352,
0xE988B8:0x6353,0xE988B9:0x6354,0xE988BA:0x6355,0xE988BC:0x6356,0xE988BE:0x6357,
0xE98980:0x6358,0xE98982:0x6359,0xE98983:0x635A,0xE98986:0x635B,0xE98987:0x635C,
0xE9898A:0x635D,0xE9898D:0x635E,0xE9898E:0x635F,0xE9898F:0x6360,0xE98991:0x6361,
0xE98998:0x6362,0xE98999:0x6363,0xE9899C:0x6364,0xE9899D:0x6365,0xE989A0:0x6366,
0xE989A1:0x6367,0xE989A5:0x6368,0xE989A7:0x6369,0xE989A8:0x636A,0xE989A9:0x636B,
0xE989AE:0x636C,0xE989AF:0x636D,0xE989B0:0x636E,0xE989B5:0x636F,0xE989B6:0x6370,
0xE989B7:0x6371,0xE989B8:0x6372,0xE989B9:0x6373,0xE989BB:0x6374,0xE989BC:0x6375,
0xE989BD:0x6376,0xE989BF:0x6377,0xE98A88:0x6378,0xE98A89:0x6379,0xE98A8A:0x637A,
0xE98A8D:0x637B,0xE98A8E:0x637C,0xE98A92:0x637D,0xE98A97:0x637E,0xE98A99:0x6421,
0xE98A9F:0x6422,0xE98AA0:0x6423,0xE98AA4:0x6424,0xE98AA5:0x6425,0xE98AA7:0x6426,
0xE98AA8:0x6427,0xE98AAB:0x6428,0xE98AAF:0x6429,0xE98AB2:0x642A,0xE98AB6:0x642B,
0xE98AB8:0x642C,0xE98ABA:0x642D,0xE98ABB:0x642E,0xE98ABC:0x642F,0xE98ABD:0x6430,
0xE98ABF:0x6431,0xE98B80:0x6432,0xE98B81:0x6433,0xE98B82:0x6434,0xE98B83:0x6435,
0xE98B85:0x6436,0xE98B86:0x6437,0xE98B87:0x6438,0xE98B88:0x6439,0xE98B8B:0x643A,
0xE98B8C:0x643B,0xE98B8D:0x643C,0xE98B8E:0x643D,0xE98B90:0x643E,0xE98B93:0x643F,
0xE98B95:0x6440,0xE98B97:0x6441,0xE98B98:0x6442,0xE98B99:0x6443,0xE98B9C:0x6444,
0xE98B9D:0x6445,0xE98B9F:0x6446,0xE98BA0:0x6447,0xE98BA1:0x6448,0xE98BA3:0x6449,
0xE98BA5:0x644A,0xE98BA7:0x644B,0xE98BA8:0x644C,0xE98BAC:0x644D,0xE98BAE:0x644E,
0xE98BB0:0x644F,0xE98BB9:0x6450,0xE98BBB:0x6451,0xE98BBF:0x6452,0xE98C80:0x6453,
0xE98C82:0x6454,0xE98C88:0x6455,0xE98C8D:0x6456,0xE98C91:0x6457,0xE98C94:0x6458,
0xE98C95:0x6459,0xE98C9C:0x645A,0xE98C9D:0x645B,0xE98C9E:0x645C,0xE98C9F:0x645D,
0xE98CA1:0x645E,0xE98CA4:0x645F,0xE98CA5:0x6460,0xE98CA7:0x6461,0xE98CA9:0x6462,
0xE98CAA:0x6463,0xE98CB3:0x6464,0xE98CB4:0x6465,0xE98CB6:0x6466,0xE98CB7:0x6467,
0xE98D87:0x6468,0xE98D88:0x6469,0xE98D89:0x646A,0xE98D90:0x646B,0xE98D91:0x646C,
0xE98D92:0x646D,0xE98D95:0x646E,0xE98D97:0x646F,0xE98D98:0x6470,0xE98D9A:0x6471,
0xE98D9E:0x6472,0xE98DA4:0x6473,0xE98DA5:0x6474,0xE98DA7:0x6475,0xE98DA9:0x6476,
0xE98DAA:0x6477,0xE98DAD:0x6478,0xE98DAF:0x6479,0xE98DB0:0x647A,0xE98DB1:0x647B,
0xE98DB3:0x647C,0xE98DB4:0x647D,0xE98DB6:0x647E,0xE98DBA:0x6521,0xE98DBD:0x6522,
0xE98DBF:0x6523,0xE98E80:0x6524,0xE98E81:0x6525,0xE98E82:0x6526,0xE98E88:0x6527,
0xE98E8A:0x6528,0xE98E8B:0x6529,0xE98E8D:0x652A,0xE98E8F:0x652B,0xE98E92:0x652C,
0xE98E95:0x652D,0xE98E98:0x652E,0xE98E9B:0x652F,0xE98E9E:0x6530,0xE98EA1:0x6531,
0xE98EA3:0x6532,0xE98EA4:0x6533,0xE98EA6:0x6534,0xE98EA8:0x6535,0xE98EAB:0x6536,
0xE98EB4:0x6537,0xE98EB5:0x6538,0xE98EB6:0x6539,0xE98EBA:0x653A,0xE98EA9:0x653B,
0xE98F81:0x653C,0xE98F84:0x653D,0xE98F85:0x653E,0xE98F86:0x653F,0xE98F87:0x6540,
0xE98F89:0x6541,0xE98F8A:0x6542,0xE98F8B:0x6543,0xE98F8C:0x6544,0xE98F8D:0x6545,
0xE98F93:0x6546,0xE98F99:0x6547,0xE98F9C:0x6548,0xE98F9E:0x6549,0xE98F9F:0x654A,
0xE98FA2:0x654B,0xE98FA6:0x654C,0xE98FA7:0x654D,0xE98FB9:0x654E,0xE98FB7:0x654F,
0xE98FB8:0x6550,0xE98FBA:0x6551,0xE98FBB:0x6552,0xE98FBD:0x6553,0xE99081:0x6554,
0xE99082:0x6555,0xE99084:0x6556,0xE99088:0x6557,0xE99089:0x6558,0xE9908D:0x6559,
0xE9908E:0x655A,0xE9908F:0x655B,0xE99095:0x655C,0xE99096:0x655D,0xE99097:0x655E,
0xE9909F:0x655F,0xE990AE:0x6560,0xE990AF:0x6561,0xE990B1:0x6562,0xE990B2:0x6563,
0xE990B3:0x6564,0xE990B4:0x6565,0xE990BB:0x6566,0xE990BF:0x6567,0xE990BD:0x6568,
0xE99183:0x6569,0xE99185:0x656A,0xE99188:0x656B,0xE9918A:0x656C,0xE9918C:0x656D,
0xE99195:0x656E,0xE99199:0x656F,0xE9919C:0x6570,0xE9919F:0x6571,0xE991A1:0x6572,
0xE991A3:0x6573,0xE991A8:0x6574,0xE991AB:0x6575,0xE991AD:0x6576,0xE991AE:0x6577,
0xE991AF:0x6578,0xE991B1:0x6579,0xE991B2:0x657A,0xE99284:0x657B,0xE99283:0x657C,
0xE995B8:0x657D,0xE995B9:0x657E,0xE995BE:0x6621,0xE99684:0x6622,0xE99688:0x6623,
0xE9968C:0x6624,0xE9968D:0x6625,0xE9968E:0x6626,0xE9969D:0x6627,0xE9969E:0x6628,
0xE9969F:0x6629,0xE996A1:0x662A,0xE996A6:0x662B,0xE996A9:0x662C,0xE996AB:0x662D,
0xE996AC:0x662E,0xE996B4:0x662F,0xE996B6:0x6630,0xE996BA:0x6631,0xE996BD:0x6632,
0xE996BF:0x6633,0xE99786:0x6634,0xE99788:0x6635,0xE99789:0x6636,0xE9978B:0x6637,
0xE99790:0x6638,0xE99791:0x6639,0xE99792:0x663A,0xE99793:0x663B,0xE99799:0x663C,
0xE9979A:0x663D,0xE9979D:0x663E,0xE9979E:0x663F,0xE9979F:0x6640,0xE997A0:0x6641,
0xE997A4:0x6642,0xE997A6:0x6643,0xE9989D:0x6644,0xE9989E:0x6645,0xE998A2:0x6646,
0xE998A4:0x6647,0xE998A5:0x6648,0xE998A6:0x6649,0xE998AC:0x664A,0xE998B1:0x664B,
0xE998B3:0x664C,0xE998B7:0x664D,0xE998B8:0x664E,0xE998B9:0x664F,0xE998BA:0x6650,
0xE998BC:0x6651,0xE998BD:0x6652,0xE99981:0x6653,0xE99992:0x6654,0xE99994:0x6655,
0xE99996:0x6656,0xE99997:0x6657,0xE99998:0x6658,0xE999A1:0x6659,0xE999AE:0x665A,
0xE999B4:0x665B,0xE999BB:0x665C,0xE999BC:0x665D,0xE999BE:0x665E,0xE999BF:0x665F,
0xE99A81:0x6660,0xE99A82:0x6661,0xE99A83:0x6662,0xE99A84:0x6663,0xE99A89:0x6664,
0xE99A91:0x6665,0xE99A96:0x6666,0xE99A9A:0x6667,0xE99A9D:0x6668,0xE99A9F:0x6669,
0xE99AA4:0x666A,0xE99AA5:0x666B,0xE99AA6:0x666C,0xE99AA9:0x666D,0xE99AAE:0x666E,
0xE99AAF:0x666F,0xE99AB3:0x6670,0xE99ABA:0x6671,0xE99B8A:0x6672,0xE99B92:0x6673,
0xE5B6B2:0x6674,0xE99B98:0x6675,0xE99B9A:0x6676,0xE99B9D:0x6677,0xE99B9E:0x6678,
0xE99B9F:0x6679,0xE99BA9:0x667A,0xE99BAF:0x667B,0xE99BB1:0x667C,0xE99BBA:0x667D,
0xE99C82:0x667E,0xE99C83:0x6721,0xE99C85:0x6722,0xE99C89:0x6723,0xE99C9A:0x6724,
0xE99C9B:0x6725,0xE99C9D:0x6726,0xE99CA1:0x6727,0xE99CA2:0x6728,0xE99CA3:0x6729,
0xE99CA8:0x672A,0xE99CB1:0x672B,0xE99CB3:0x672C,0xE99D81:0x672D,0xE99D83:0x672E,
0xE99D8A:0x672F,0xE99D8E:0x6730,0xE99D8F:0x6731,0xE99D95:0x6732,0xE99D97:0x6733,
0xE99D98:0x6734,0xE99D9A:0x6735,0xE99D9B:0x6736,0xE99DA3:0x6737,0xE99DA7:0x6738,
0xE99DAA:0x6739,0xE99DAE:0x673A,0xE99DB3:0x673B,0xE99DB6:0x673C,0xE99DB7:0x673D,
0xE99DB8:0x673E,0xE99DBB:0x673F,0xE99DBD:0x6740,0xE99DBF:0x6741,0xE99E80:0x6742,
0xE99E89:0x6743,0xE99E95:0x6744,0xE99E96:0x6745,0xE99E97:0x6746,0xE99E99:0x6747,
0xE99E9A:0x6748,0xE99E9E:0x6749,0xE99E9F:0x674A,0xE99EA2:0x674B,0xE99EAC:0x674C,
0xE99EAE:0x674D,0xE99EB1:0x674E,0xE99EB2:0x674F,0xE99EB5:0x6750,0xE99EB6:0x6751,
0xE99EB8:0x6752,0xE99EB9:0x6753,0xE99EBA:0x6754,0xE99EBC:0x6755,0xE99EBE:0x6756,
0xE99EBF:0x6757,0xE99F81:0x6758,0xE99F84:0x6759,0xE99F85:0x675A,0xE99F87:0x675B,
0xE99F89:0x675C,0xE99F8A:0x675D,0xE99F8C:0x675E,0xE99F8D:0x675F,0xE99F8E:0x6760,
0xE99F90:0x6761,0xE99F91:0x6762,0xE99F94:0x6763,0xE99F97:0x6764,0xE99F98:0x6765,
0xE99F99:0x6766,0xE99F9D:0x6767,0xE99F9E:0x6768,0xE99FA0:0x6769,0xE99F9B:0x676A,
0xE99FA1:0x676B,0xE99FA4:0x676C,0xE99FAF:0x676D,0xE99FB1:0x676E,0xE99FB4:0x676F,
0xE99FB7:0x6770,0xE99FB8:0x6771,0xE99FBA:0x6772,0xE9A087:0x6773,0xE9A08A:0x6774,
0xE9A099:0x6775,0xE9A08D:0x6776,0xE9A08E:0x6777,0xE9A094:0x6778,0xE9A096:0x6779,
0xE9A09C:0x677A,0xE9A09E:0x677B,0xE9A0A0:0x677C,0xE9A0A3:0x677D,0xE9A0A6:0x677E,
0xE9A0AB:0x6821,0xE9A0AE:0x6822,0xE9A0AF:0x6823,0xE9A0B0:0x6824,0xE9A0B2:0x6825,
0xE9A0B3:0x6826,0xE9A0B5:0x6827,0xE9A0A5:0x6828,0xE9A0BE:0x6829,0xE9A184:0x682A,
0xE9A187:0x682B,0xE9A18A:0x682C,0xE9A191:0x682D,0xE9A192:0x682E,0xE9A193:0x682F,
0xE9A196:0x6830,0xE9A197:0x6831,0xE9A199:0x6832,0xE9A19A:0x6833,0xE9A1A2:0x6834,
0xE9A1A3:0x6835,0xE9A1A5:0x6836,0xE9A1A6:0x6837,0xE9A1AA:0x6838,0xE9A1AC:0x6839,
0xE9A2AB:0x683A,0xE9A2AD:0x683B,0xE9A2AE:0x683C,0xE9A2B0:0x683D,0xE9A2B4:0x683E,
0xE9A2B7:0x683F,0xE9A2B8:0x6840,0xE9A2BA:0x6841,0xE9A2BB:0x6842,0xE9A2BF:0x6843,
0xE9A382:0x6844,0xE9A385:0x6845,0xE9A388:0x6846,0xE9A38C:0x6847,0xE9A3A1:0x6848,
0xE9A3A3:0x6849,0xE9A3A5:0x684A,0xE9A3A6:0x684B,0xE9A3A7:0x684C,0xE9A3AA:0x684D,
0xE9A3B3:0x684E,0xE9A3B6:0x684F,0xE9A482:0x6850,0xE9A487:0x6851,0xE9A488:0x6852,
0xE9A491:0x6853,0xE9A495:0x6854,0xE9A496:0x6855,0xE9A497:0x6856,0xE9A49A:0x6857,
0xE9A49B:0x6858,0xE9A49C:0x6859,0xE9A49F:0x685A,0xE9A4A2:0x685B,0xE9A4A6:0x685C,
0xE9A4A7:0x685D,0xE9A4AB:0x685E,0xE9A4B1:0x685F,0xE9A4B2:0x6860,0xE9A4B3:0x6861,
0xE9A4B4:0x6862,0xE9A4B5:0x6863,0xE9A4B9:0x6864,0xE9A4BA:0x6865,0xE9A4BB:0x6866,
0xE9A4BC:0x6867,0xE9A580:0x6868,0xE9A581:0x6869,0xE9A586:0x686A,0xE9A587:0x686B,
0xE9A588:0x686C,0xE9A58D:0x686D,0xE9A58E:0x686E,0xE9A594:0x686F,0xE9A598:0x6870,
0xE9A599:0x6871,0xE9A59B:0x6872,0xE9A59C:0x6873,0xE9A59E:0x6874,0xE9A59F:0x6875,
0xE9A5A0:0x6876,0xE9A69B:0x6877,0xE9A69D:0x6878,0xE9A69F:0x6879,0xE9A6A6:0x687A,
0xE9A6B0:0x687B,0xE9A6B1:0x687C,0xE9A6B2:0x687D,0xE9A6B5:0x687E,0xE9A6B9:0x6921,
0xE9A6BA:0x6922,0xE9A6BD:0x6923,0xE9A6BF:0x6924,0xE9A783:0x6925,0xE9A789:0x6926,
0xE9A793:0x6927,0xE9A794:0x6928,0xE9A799:0x6929,0xE9A79A:0x692A,0xE9A79C:0x692B,
0xE9A79E:0x692C,0xE9A7A7:0x692D,0xE9A7AA:0x692E,0xE9A7AB:0x692F,0xE9A7AC:0x6930,
0xE9A7B0:0x6931,0xE9A7B4:0x6932,0xE9A7B5:0x6933,0xE9A7B9:0x6934,0xE9A7BD:0x6935,
0xE9A7BE:0x6936,0xE9A882:0x6937,0xE9A883:0x6938,0xE9A884:0x6939,0xE9A88B:0x693A,
0xE9A88C:0x693B,0xE9A890:0x693C,0xE9A891:0x693D,0xE9A896:0x693E,0xE9A89E:0x693F,
0xE9A8A0:0x6940,0xE9A8A2:0x6941,0xE9A8A3:0x6942,0xE9A8A4:0x6943,0xE9A8A7:0x6944,
0xE9A8AD:0x6945,0xE9A8AE:0x6946,0xE9A8B3:0x6947,0xE9A8B5:0x6948,0xE9A8B6:0x6949,
0xE9A8B8:0x694A,0xE9A987:0x694B,0xE9A981:0x694C,0xE9A984:0x694D,0xE9A98A:0x694E,
0xE9A98B:0x694F,0xE9A98C:0x6950,0xE9A98E:0x6951,0xE9A991:0x6952,0xE9A994:0x6953,
0xE9A996:0x6954,0xE9A99D:0x6955,0xE9AAAA:0x6956,0xE9AAAC:0x6957,0xE9AAAE:0x6958,
0xE9AAAF:0x6959,0xE9AAB2:0x695A,0xE9AAB4:0x695B,0xE9AAB5:0x695C,0xE9AAB6:0x695D,
0xE9AAB9:0x695E,0xE9AABB:0x695F,0xE9AABE:0x6960,0xE9AABF:0x6961,0xE9AB81:0x6962,
0xE9AB83:0x6963,0xE9AB86:0x6964,0xE9AB88:0x6965,0xE9AB8E:0x6966,0xE9AB90:0x6967,
0xE9AB92:0x6968,0xE9AB95:0x6969,0xE9AB96:0x696A,0xE9AB97:0x696B,0xE9AB9B:0x696C,
0xE9AB9C:0x696D,0xE9ABA0:0x696E,0xE9ABA4:0x696F,0xE9ABA5:0x6970,0xE9ABA7:0x6971,
0xE9ABA9:0x6972,0xE9ABAC:0x6973,0xE9ABB2:0x6974,0xE9ABB3:0x6975,0xE9ABB5:0x6976,
0xE9ABB9:0x6977,0xE9ABBA:0x6978,0xE9ABBD:0x6979,0xE9ABBF:0x697A,0xE9AC80:0x697B,
0xE9AC81:0x697C,0xE9AC82:0x697D,0xE9AC83:0x697E,0xE9AC84:0x6A21,0xE9AC85:0x6A22,
0xE9AC88:0x6A23,0xE9AC89:0x6A24,0xE9AC8B:0x6A25,0xE9AC8C:0x6A26,0xE9AC8D:0x6A27,
0xE9AC8E:0x6A28,0xE9AC90:0x6A29,0xE9AC92:0x6A2A,0xE9AC96:0x6A2B,0xE9AC99:0x6A2C,
0xE9AC9B:0x6A2D,0xE9AC9C:0x6A2E,0xE9ACA0:0x6A2F,0xE9ACA6:0x6A30,0xE9ACAB:0x6A31,
0xE9ACAD:0x6A32,0xE9ACB3:0x6A33,0xE9ACB4:0x6A34,0xE9ACB5:0x6A35,0xE9ACB7:0x6A36,
0xE9ACB9:0x6A37,0xE9ACBA:0x6A38,0xE9ACBD:0x6A39,0xE9AD88:0x6A3A,0xE9AD8B:0x6A3B,
0xE9AD8C:0x6A3C,0xE9AD95:0x6A3D,0xE9AD96:0x6A3E,0xE9AD97:0x6A3F,0xE9AD9B:0x6A40,
0xE9AD9E:0x6A41,0xE9ADA1:0x6A42,0xE9ADA3:0x6A43,0xE9ADA5:0x6A44,0xE9ADA6:0x6A45,
0xE9ADA8:0x6A46,0xE9ADAA:0x6A47,0xE9ADAB:0x6A48,0xE9ADAC:0x6A49,0xE9ADAD:0x6A4A,
0xE9ADAE:0x6A4B,0xE9ADB3:0x6A4C,0xE9ADB5:0x6A4D,0xE9ADB7:0x6A4E,0xE9ADB8:0x6A4F,
0xE9ADB9:0x6A50,0xE9ADBF:0x6A51,0xE9AE80:0x6A52,0xE9AE84:0x6A53,0xE9AE85:0x6A54,
0xE9AE86:0x6A55,0xE9AE87:0x6A56,0xE9AE89:0x6A57,0xE9AE8A:0x6A58,0xE9AE8B:0x6A59,
0xE9AE8D:0x6A5A,0xE9AE8F:0x6A5B,0xE9AE90:0x6A5C,0xE9AE94:0x6A5D,0xE9AE9A:0x6A5E,
0xE9AE9D:0x6A5F,0xE9AE9E:0x6A60,0xE9AEA6:0x6A61,0xE9AEA7:0x6A62,0xE9AEA9:0x6A63,
0xE9AEAC:0x6A64,0xE9AEB0:0x6A65,0xE9AEB1:0x6A66,0xE9AEB2:0x6A67,0xE9AEB7:0x6A68,
0xE9AEB8:0x6A69,0xE9AEBB:0x6A6A,0xE9AEBC:0x6A6B,0xE9AEBE:0x6A6C,0xE9AEBF:0x6A6D,
0xE9AF81:0x6A6E,0xE9AF87:0x6A6F,0xE9AF88:0x6A70,0xE9AF8E:0x6A71,0xE9AF90:0x6A72,
0xE9AF97:0x6A73,0xE9AF98:0x6A74,0xE9AF9D:0x6A75,0xE9AF9F:0x6A76,0xE9AFA5:0x6A77,
0xE9AFA7:0x6A78,0xE9AFAA:0x6A79,0xE9AFAB:0x6A7A,0xE9AFAF:0x6A7B,0xE9AFB3:0x6A7C,
0xE9AFB7:0x6A7D,0xE9AFB8:0x6A7E,0xE9AFB9:0x6B21,0xE9AFBA:0x6B22,0xE9AFBD:0x6B23,
0xE9AFBF:0x6B24,0xE9B080:0x6B25,0xE9B082:0x6B26,0xE9B08B:0x6B27,0xE9B08F:0x6B28,
0xE9B091:0x6B29,0xE9B096:0x6B2A,0xE9B098:0x6B2B,0xE9B099:0x6B2C,0xE9B09A:0x6B2D,
0xE9B09C:0x6B2E,0xE9B09E:0x6B2F,0xE9B0A2:0x6B30,0xE9B0A3:0x6B31,0xE9B0A6:0x6B32,
0xE9B0A7:0x6B33,0xE9B0A8:0x6B34,0xE9B0A9:0x6B35,0xE9B0AA:0x6B36,0xE9B0B1:0x6B37,
0xE9B0B5:0x6B38,0xE9B0B6:0x6B39,0xE9B0B7:0x6B3A,0xE9B0BD:0x6B3B,0xE9B181:0x6B3C,
0xE9B183:0x6B3D,0xE9B184:0x6B3E,0xE9B185:0x6B3F,0xE9B189:0x6B40,0xE9B18A:0x6B41,
0xE9B18E:0x6B42,0xE9B18F:0x6B43,0xE9B190:0x6B44,0xE9B193:0x6B45,0xE9B194:0x6B46,
0xE9B196:0x6B47,0xE9B198:0x6B48,0xE9B19B:0x6B49,0xE9B19D:0x6B4A,0xE9B19E:0x6B4B,
0xE9B19F:0x6B4C,0xE9B1A3:0x6B4D,0xE9B1A9:0x6B4E,0xE9B1AA:0x6B4F,0xE9B19C:0x6B50,
0xE9B1AB:0x6B51,0xE9B1A8:0x6B52,0xE9B1AE:0x6B53,0xE9B1B0:0x6B54,0xE9B1B2:0x6B55,
0xE9B1B5:0x6B56,0xE9B1B7:0x6B57,0xE9B1BB:0x6B58,0xE9B3A6:0x6B59,0xE9B3B2:0x6B5A,
0xE9B3B7:0x6B5B,0xE9B3B9:0x6B5C,0xE9B48B:0x6B5D,0xE9B482:0x6B5E,0xE9B491:0x6B5F,
0xE9B497:0x6B60,0xE9B498:0x6B61,0xE9B49C:0x6B62,0xE9B49D:0x6B63,0xE9B49E:0x6B64,
0xE9B4AF:0x6B65,0xE9B4B0:0x6B66,0xE9B4B2:0x6B67,0xE9B4B3:0x6B68,0xE9B4B4:0x6B69,
0xE9B4BA:0x6B6A,0xE9B4BC:0x6B6B,0xE9B585:0x6B6C,0xE9B4BD:0x6B6D,0xE9B582:0x6B6E,
0xE9B583:0x6B6F,0xE9B587:0x6B70,0xE9B58A:0x6B71,0xE9B593:0x6B72,0xE9B594:0x6B73,
0xE9B59F:0x6B74,0xE9B5A3:0x6B75,0xE9B5A2:0x6B76,0xE9B5A5:0x6B77,0xE9B5A9:0x6B78,
0xE9B5AA:0x6B79,0xE9B5AB:0x6B7A,0xE9B5B0:0x6B7B,0xE9B5B6:0x6B7C,0xE9B5B7:0x6B7D,
0xE9B5BB:0x6B7E,0xE9B5BC:0x6C21,0xE9B5BE:0x6C22,0xE9B683:0x6C23,0xE9B684:0x6C24,
0xE9B686:0x6C25,0xE9B68A:0x6C26,0xE9B68D:0x6C27,0xE9B68E:0x6C28,0xE9B692:0x6C29,
0xE9B693:0x6C2A,0xE9B695:0x6C2B,0xE9B696:0x6C2C,0xE9B697:0x6C2D,0xE9B698:0x6C2E,
0xE9B6A1:0x6C2F,0xE9B6AA:0x6C30,0xE9B6AC:0x6C31,0xE9B6AE:0x6C32,0xE9B6B1:0x6C33,
0xE9B6B5:0x6C34,0xE9B6B9:0x6C35,0xE9B6BC:0x6C36,0xE9B6BF:0x6C37,0xE9B783:0x6C38,
0xE9B787:0x6C39,0xE9B789:0x6C3A,0xE9B78A:0x6C3B,0xE9B794:0x6C3C,0xE9B795:0x6C3D,
0xE9B796:0x6C3E,0xE9B797:0x6C3F,0xE9B79A:0x6C40,0xE9B79E:0x6C41,0xE9B79F:0x6C42,
0xE9B7A0:0x6C43,0xE9B7A5:0x6C44,0xE9B7A7:0x6C45,0xE9B7A9:0x6C46,0xE9B7AB:0x6C47,
0xE9B7AE:0x6C48,0xE9B7B0:0x6C49,0xE9B7B3:0x6C4A,0xE9B7B4:0x6C4B,0xE9B7BE:0x6C4C,
0xE9B88A:0x6C4D,0xE9B882:0x6C4E,0xE9B887:0x6C4F,0xE9B88E:0x6C50,0xE9B890:0x6C51,
0xE9B891:0x6C52,0xE9B892:0x6C53,0xE9B895:0x6C54,0xE9B896:0x6C55,0xE9B899:0x6C56,
0xE9B89C:0x6C57,0xE9B89D:0x6C58,0xE9B9BA:0x6C59,0xE9B9BB:0x6C5A,0xE9B9BC:0x6C5B,
0xE9BA80:0x6C5C,0xE9BA82:0x6C5D,0xE9BA83:0x6C5E,0xE9BA84:0x6C5F,0xE9BA85:0x6C60,
0xE9BA87:0x6C61,0xE9BA8E:0x6C62,0xE9BA8F:0x6C63,0xE9BA96:0x6C64,0xE9BA98:0x6C65,
0xE9BA9B:0x6C66,0xE9BA9E:0x6C67,0xE9BAA4:0x6C68,0xE9BAA8:0x6C69,0xE9BAAC:0x6C6A,
0xE9BAAE:0x6C6B,0xE9BAAF:0x6C6C,0xE9BAB0:0x6C6D,0xE9BAB3:0x6C6E,0xE9BAB4:0x6C6F,
0xE9BAB5:0x6C70,0xE9BB86:0x6C71,0xE9BB88:0x6C72,0xE9BB8B:0x6C73,0xE9BB95:0x6C74,
0xE9BB9F:0x6C75,0xE9BBA4:0x6C76,0xE9BBA7:0x6C77,0xE9BBAC:0x6C78,0xE9BBAD:0x6C79,
0xE9BBAE:0x6C7A,0xE9BBB0:0x6C7B,0xE9BBB1:0x6C7C,0xE9BBB2:0x6C7D,0xE9BBB5:0x6C7E,
0xE9BBB8:0x6D21,0xE9BBBF:0x6D22,0xE9BC82:0x6D23,0xE9BC83:0x6D24,0xE9BC89:0x6D25,
0xE9BC8F:0x6D26,0xE9BC90:0x6D27,0xE9BC91:0x6D28,0xE9BC92:0x6D29,0xE9BC94:0x6D2A,
0xE9BC96:0x6D2B,0xE9BC97:0x6D2C,0xE9BC99:0x6D2D,0xE9BC9A:0x6D2E,0xE9BC9B:0x6D2F,
0xE9BC9F:0x6D30,0xE9BCA2:0x6D31,0xE9BCA6:0x6D32,0xE9BCAA:0x6D33,0xE9BCAB:0x6D34,
0xE9BCAF:0x6D35,0xE9BCB1:0x6D36,0xE9BCB2:0x6D37,0xE9BCB4:0x6D38,0xE9BCB7:0x6D39,
0xE9BCB9:0x6D3A,0xE9BCBA:0x6D3B,0xE9BCBC:0x6D3C,0xE9BCBD:0x6D3D,0xE9BCBF:0x6D3E,
0xE9BD81:0x6D3F,0xE9BD83:0x6D40,0xE9BD84:0x6D41,0xE9BD85:0x6D42,0xE9BD86:0x6D43,
0xE9BD87:0x6D44,0xE9BD93:0x6D45,0xE9BD95:0x6D46,0xE9BD96:0x6D47,0xE9BD97:0x6D48,
0xE9BD98:0x6D49,0xE9BD9A:0x6D4A,0xE9BD9D:0x6D4B,0xE9BD9E:0x6D4C,0xE9BDA8:0x6D4D,
0xE9BDA9:0x6D4E,0xE9BDAD:0x6D4F,0xE9BDAE:0x6D50,0xE9BDAF:0x6D51,0xE9BDB0:0x6D52,
0xE9BDB1:0x6D53,0xE9BDB3:0x6D54,0xE9BDB5:0x6D55,0xE9BDBA:0x6D56,0xE9BDBD:0x6D57,
0xE9BE8F:0x6D58,0xE9BE90:0x6D59,0xE9BE91:0x6D5A,0xE9BE92:0x6D5B,0xE9BE94:0x6D5C,
0xE9BE96:0x6D5D,0xE9BE97:0x6D5E,0xE9BE9E:0x6D5F,0xE9BEA1:0x6D60,0xE9BEA2:0x6D61,
0xE9BEA3:0x6D62,0xE9BEA5:0x6D63,

//FIXME: mojibake
0xE3809C:0x2141
};


/**
 * Encoding conversion table for JIS to UTF-8.
 *
 * @ignore
 */
var JIS_TO_UTF8_TABLE = null;

/**
 * The encoding conversion table for JIS X 0212:1990 (Hojo-Kanji) to UTF-8.
 *
 * @ignore
 */
var JISX0212_TO_UTF8_TABLE = null;

function init_JIS_TO_UTF8_TABLE() {
  if (JIS_TO_UTF8_TABLE === null) {
    JIS_TO_UTF8_TABLE = {};

    var keys = getKeys(UTF8_TO_JIS_TABLE);
    var i = 0;
    var len = keys.length;
    var key, value;

    for (; i < len; i++) {
      key = keys[i];
      value = UTF8_TO_JIS_TABLE[key];
      if (value > 0x5F) {
        JIS_TO_UTF8_TABLE[value] = key | 0;
      }
    }

    JISX0212_TO_UTF8_TABLE = {};
    keys = getKeys(UTF8_TO_JISX0212_TABLE);
    len = keys.length;

    for (i = 0; i < len; i++) {
      key = keys[i];
      value = UTF8_TO_JISX0212_TABLE[key];
      JISX0212_TO_UTF8_TABLE[value] = key | 0;
    }
  }
}

/**
 * Katakana table
 *
 * @ignore
 */
var hankanaCase_table = {
  0x3001:0xFF64,0x3002:0xFF61,0x300C:0xFF62,0x300D:0xFF63,0x309B:0xFF9E,
  0x309C:0xFF9F,0x30A1:0xFF67,0x30A2:0xFF71,0x30A3:0xFF68,0x30A4:0xFF72,
  0x30A5:0xFF69,0x30A6:0xFF73,0x30A7:0xFF6A,0x30A8:0xFF74,0x30A9:0xFF6B,
  0x30AA:0xFF75,0x30AB:0xFF76,0x30AD:0xFF77,0x30AF:0xFF78,0x30B1:0xFF79,
  0x30B3:0xFF7A,0x30B5:0xFF7B,0x30B7:0xFF7C,0x30B9:0xFF7D,0x30BB:0xFF7E,
  0x30BD:0xFF7F,0x30BF:0xFF80,0x30C1:0xFF81,0x30C3:0xFF6F,0x30C4:0xFF82,
  0x30C6:0xFF83,0x30C8:0xFF84,0x30CA:0xFF85,0x30CB:0xFF86,0x30CC:0xFF87,
  0x30CD:0xFF88,0x30CE:0xFF89,0x30CF:0xFF8A,0x30D2:0xFF8B,0x30D5:0xFF8C,
  0x30D8:0xFF8D,0x30DB:0xFF8E,0x30DE:0xFF8F,0x30DF:0xFF90,0x30E0:0xFF91,
  0x30E1:0xFF92,0x30E2:0xFF93,0x30E3:0xFF6C,0x30E4:0xFF94,0x30E5:0xFF6D,
  0x30E6:0xFF95,0x30E7:0xFF6E,0x30E8:0xFF96,0x30E9:0xFF97,0x30EA:0xFF98,
  0x30EB:0xFF99,0x30EC:0xFF9A,0x30ED:0xFF9B,0x30EF:0xFF9C,0x30F2:0xFF66,
  0x30F3:0xFF9D,0x30FB:0xFF65,0x30FC:0xFF70
};

/**
 * @ignore
 */
var hankanaCase_sonants = {
  0x30F4:0xFF73,
  0x30F7:0xFF9C,
  0x30FA:0xFF66
};

/**
 * Sonant marks.
 *
 * @ignore
 */
var hankanaCase_marks = [0xFF9E, 0xFF9F];

/**
 * Zenkaku table [U+FF61] - [U+FF9F]
 *
 * @ignore
 */
var zenkanaCase_table = [
  0x3002, 0x300C, 0x300D, 0x3001, 0x30FB, 0x30F2, 0x30A1, 0x30A3,
  0x30A5, 0x30A7, 0x30A9, 0x30E3, 0x30E5, 0x30E7, 0x30C3, 0x30FC,
  0x30A2, 0x30A4, 0x30A6, 0x30A8, 0x30AA, 0x30AB, 0x30AD, 0x30AF,
  0x30B1, 0x30B3, 0x30B5, 0x30B7, 0x30B9, 0x30BB, 0x30BD, 0x30BF,
  0x30C1, 0x30C4, 0x30C6, 0x30C8, 0x30CA, 0x30CB, 0x30CC, 0x30CD,
  0x30CE, 0x30CF, 0x30D2, 0x30D5, 0x30D8, 0x30DB, 0x30DE, 0x30DF,
  0x30E0, 0x30E1, 0x30E2, 0x30E4, 0x30E6, 0x30E8, 0x30E9, 0x30EA,
  0x30EB, 0x30EC, 0x30ED, 0x30EF, 0x30F3, 0x309B, 0x309C
];

return Encoding;
});
(function() {


}).call(this);
function IsMatch(target, str) {
  var r = new RegExp(str, 'i');
  return target.match(r);
};

function IsHide(target, searchKey) {
  for (var i = 0; i < target.length; i++) {
    if (IsMatch(target[i], searchKey)) return false;
  }
  return true;
};

$(function () {
    $('#search').focus();
    var trList = $('tr', '#item_table tbody');

    $('#search').keypress(function (e) {

      if ( e.which == 13 ){
      $("body").css("cursor", "wait");
      // 全角スペースも検索ワードセパレータとする
      var searchKey = this.value.replace(" ", " ");
      if (searchKey.match(/ $/)) return true;

      var keys = searchKey.split(" ");
      $.each(trList, function () {
        var ary = [];
        if(nisilove){
          ary.push($('td:nth-child(4)', $(this)).text());
          ary.push($('td:nth-child(5)', $(this)).text());
        }else{
          ary.push($('td:nth-child(2)', $(this)).text());
          ary.push($('td:nth-child(3)', $(this)).text());
        }

        if (IsHide(ary, keys[0])) {
        $(this).hide();
        } else {
        $(this).show();
        if (keys.length > 1) {
        for (var idx = 1; idx < keys.length; idx++) {
        if (IsHide(ary, keys[idx])) {
        $(this).hide();
        }
        }
        }
        }
        });
      $("body").css("cursor", "auto");
      return false;
      }
    });
});
(function() {


}).call(this);
(function() {


}).call(this);
$(document).ready(function(){
$("body").on("drop",function(e){
  e.preventDefault();
});

$(".dnd").on("drop",function(e){
  e.preventDefault();
  var file = e.originalEvent.dataTransfer.files[0];
  var fileName = file.name.replace(/(.text|.txt)/g , "");
  var fileUrl = nowTextDate();
  var fileType = file.type;
  if(fileType.match(/text.*/)){
    var fileReader = new FileReader();
    fileReader.onload = function(event) {
      var text = encodeString(event.target.result);
      $.ajax({
        url: "texshare/upload",
        type: "POST",
        data: {name:fileUrl,title: fileName ,text:text},
        success:function(){
          $(".tes").append("<a href='/page/" + fileUrl + "'>" + fileName + "</a><br>");
        }
      });
    }
    fileReader.readAsArrayBuffer(file);
  }else{
    alert("textファイルのみ");

  }
});

$("body").on("dragover",function(e){
  e.preventDefault();
});
});


//文字コード変換関数
function encodeString(str){
  var array = new Uint8Array(str);
  //UTF16と32は別の配列変換をかける 
  switch (Encoding.detect(array)) {
    case 'UTF16':  
      array = new Uint16Array(str);
      break;
    case 'UTF32':
      array = new Uint32Array(str);
      break;
  }
  //Unicodeへ変換
  var unicodeArray = Encoding.convert(array, 'UNICODE');
  //文字列へ変換
  var text = Encoding.codeToString(unicodeArray);
  return text;
}

//ファイル名用の日時
function nowTextDate(){
  var now = new Date();
  timeText = sprintf("{0}{1}{2}{3}", [
      paddingLeft((String)(now.getHours()), 2),
      paddingLeft((String)(now.getMinutes()), 2),
      paddingLeft((String)(now.getSeconds()), 2),
      paddingLeft((String)(now.getMilliseconds()), 3),
      ]);
  return timeText;
}

//パディング
function paddingLeft(text, figure) {
  var ret = String(text);

  while (true) {
    if (ret.length >= figure) {
      break;
    }
    ret = "0" + ret;
  }
  return ret;
}

//簡易sprintf
function sprintf(text, values) {
  var ret = text;

  for (var i = 0;i < values.length;i++) {
    ret = ret.replace(new RegExp("\\{" + i + "\\}", "g"), values[i]);
  }

  return ret;
};
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//





;
