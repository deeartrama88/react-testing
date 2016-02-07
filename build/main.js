"use strict";var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else {return Array.from(arr);}}(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'");}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e);},f,f.exports,e,t,n,r);}return n[o].exports;}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++){s(r[o]);}return s;})({1:[function(require,module,exports){module.exports=require('./lodash.js');},{"./lodash.js":2}],2:[function(require,module,exports){(function(global){ /**
 * @license
 * lodash 4.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash -d -o ./lodash.js`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */;(function(){ /** Used as a safe reference for `undefined` in pre-ES5 environments. */var undefined; /** Used as the semantic version number. */var VERSION='4.0.0'; /** Used to compose bitmasks for wrapper metadata. */var BIND_FLAG=1,BIND_KEY_FLAG=2,CURRY_BOUND_FLAG=4,CURRY_FLAG=8,CURRY_RIGHT_FLAG=16,PARTIAL_FLAG=32,PARTIAL_RIGHT_FLAG=64,ARY_FLAG=128,REARG_FLAG=256,FLIP_FLAG=512; /** Used to compose bitmasks for comparison styles. */var UNORDERED_COMPARE_FLAG=1,PARTIAL_COMPARE_FLAG=2; /** Used as default options for `_.truncate`. */var DEFAULT_TRUNC_LENGTH=30,DEFAULT_TRUNC_OMISSION='...'; /** Used to detect hot functions by number of calls within a span of milliseconds. */var HOT_COUNT=150,HOT_SPAN=16; /** Used as the size to enable large array optimizations. */var LARGE_ARRAY_SIZE=200; /** Used to indicate the type of lazy iteratees. */var LAZY_FILTER_FLAG=1,LAZY_MAP_FLAG=2,LAZY_WHILE_FLAG=3; /** Used as the `TypeError` message for "Functions" methods. */var FUNC_ERROR_TEXT='Expected a function'; /** Used to stand-in for `undefined` hash values. */var HASH_UNDEFINED='__lodash_hash_undefined__'; /** Used as references for various `Number` constants. */var INFINITY=1/0,MAX_SAFE_INTEGER=9007199254740991,MAX_INTEGER=1.7976931348623157e+308,NAN=0/0; /** Used as references for the maximum length and index of an array. */var MAX_ARRAY_LENGTH=4294967295,MAX_ARRAY_INDEX=MAX_ARRAY_LENGTH-1,HALF_MAX_ARRAY_LENGTH=MAX_ARRAY_LENGTH>>>1; /** Used as the internal argument placeholder. */var PLACEHOLDER='__lodash_placeholder__'; /** `Object#toString` result references. */var argsTag='[object Arguments]',arrayTag='[object Array]',boolTag='[object Boolean]',dateTag='[object Date]',errorTag='[object Error]',funcTag='[object Function]',genTag='[object GeneratorFunction]',mapTag='[object Map]',numberTag='[object Number]',objectTag='[object Object]',regexpTag='[object RegExp]',setTag='[object Set]',stringTag='[object String]',symbolTag='[object Symbol]',weakMapTag='[object WeakMap]';var arrayBufferTag='[object ArrayBuffer]',float32Tag='[object Float32Array]',float64Tag='[object Float64Array]',int8Tag='[object Int8Array]',int16Tag='[object Int16Array]',int32Tag='[object Int32Array]',uint8Tag='[object Uint8Array]',uint8ClampedTag='[object Uint8ClampedArray]',uint16Tag='[object Uint16Array]',uint32Tag='[object Uint32Array]'; /** Used to match empty string literals in compiled template source. */var reEmptyStringLeading=/\b__p \+= '';/g,reEmptyStringMiddle=/\b(__p \+=) '' \+/g,reEmptyStringTrailing=/(__e\(.*?\)|\b__t\)) \+\n'';/g; /** Used to match HTML entities and HTML characters. */var reEscapedHtml=/&(?:amp|lt|gt|quot|#39|#96);/g,reUnescapedHtml=/[&<>"'`]/g,reHasEscapedHtml=RegExp(reEscapedHtml.source),reHasUnescapedHtml=RegExp(reUnescapedHtml.source); /** Used to match template delimiters. */var reEscape=/<%-([\s\S]+?)%>/g,reEvaluate=/<%([\s\S]+?)%>/g,reInterpolate=/<%=([\s\S]+?)%>/g; /** Used to match property names within property paths. */var reIsDeepProp=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,reIsPlainProp=/^\w*$/,rePropName=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g; /** Used to match `RegExp` [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns). */var reRegExpChar=/[\\^$.*+?()[\]{}|]/g,reHasRegExpChar=RegExp(reRegExpChar.source); /** Used to match leading and trailing whitespace. */var reTrim=/^\s+|\s+$/g,reTrimStart=/^\s+/,reTrimEnd=/\s+$/; /** Used to match backslashes in property paths. */var reEscapeChar=/\\(\\)?/g; /** Used to match [ES template delimiters](http://ecma-international.org/ecma-262/6.0/#sec-template-literal-lexical-components). */var reEsTemplate=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g; /** Used to match `RegExp` flags from their coerced string values. */var reFlags=/\w*$/; /** Used to detect hexadecimal string values. */var reHasHexPrefix=/^0x/i; /** Used to detect bad signed hexadecimal string values. */var reIsBadHex=/^[-+]0x[0-9a-f]+$/i; /** Used to detect binary string values. */var reIsBinary=/^0b[01]+$/i; /** Used to detect host constructors (Safari > 5). */var reIsHostCtor=/^\[object .+?Constructor\]$/; /** Used to detect octal string values. */var reIsOctal=/^0o[0-7]+$/i; /** Used to detect unsigned integer values. */var reIsUint=/^(?:0|[1-9]\d*)$/; /** Used to match latin-1 supplementary letters (excluding mathematical operators). */var reLatin1=/[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g; /** Used to ensure capturing order of template delimiters. */var reNoMatch=/($^)/; /** Used to match unescaped characters in compiled string literals. */var reUnescapedString=/['\n\r\u2028\u2029\\]/g; /** Used to compose unicode character classes. */var rsAstralRange="\\ud800-\\udfff",rsComboRange="\\u0300-\\u036f\\ufe20-\\ufe23",rsDingbatRange="\\u2700-\\u27bf",rsLowerRange='a-z\\xdf-\\xf6\\xf8-\\xff',rsMathOpRange='\\xac\\xb1\\xd7\\xf7',rsNonCharRange='\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',rsQuoteRange="\\u2018\\u2019\\u201c\\u201d",rsSpaceRange=" \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",rsUpperRange='A-Z\\xc0-\\xd6\\xd8-\\xde',rsVarRange="\\ufe0e\\ufe0f",rsBreakRange=rsMathOpRange+rsNonCharRange+rsQuoteRange+rsSpaceRange; /** Used to compose unicode capture groups. */var rsAstral='['+rsAstralRange+']',rsBreak='['+rsBreakRange+']',rsCombo='['+rsComboRange+']',rsDigits='\\d+',rsDingbat='['+rsDingbatRange+']',rsLower='['+rsLowerRange+']',rsMisc='[^'+rsAstralRange+rsBreakRange+rsDigits+rsDingbatRange+rsLowerRange+rsUpperRange+']',rsModifier="(?:\\ud83c[\\udffb-\\udfff])",rsNonAstral='[^'+rsAstralRange+']',rsRegional="(?:\\ud83c[\\udde6-\\uddff]){2}",rsSurrPair="[\\ud800-\\udbff][\\udc00-\\udfff]",rsUpper='['+rsUpperRange+']',rsZWJ="\\u200d"; /** Used to compose unicode regexes. */var rsLowerMisc='(?:'+rsLower+'|'+rsMisc+')',rsUpperMisc='(?:'+rsUpper+'|'+rsMisc+')',reOptMod=rsModifier+'?',rsOptVar='['+rsVarRange+']?',rsOptJoin='(?:'+rsZWJ+'(?:'+[rsNonAstral,rsRegional,rsSurrPair].join('|')+')'+rsOptVar+reOptMod+')*',rsSeq=rsOptVar+reOptMod+rsOptJoin,rsEmoji='(?:'+[rsDingbat,rsRegional,rsSurrPair].join('|')+')'+rsSeq,rsSymbol='(?:'+[rsNonAstral+rsCombo+'?',rsCombo,rsRegional,rsSurrPair,rsAstral].join('|')+')'; /** Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks). */var reComboMark=RegExp(rsCombo,'g'); /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */var reComplexSymbol=RegExp(rsSymbol+rsSeq,'g'); /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */var reHasComplexSymbol=RegExp('['+rsZWJ+rsAstralRange+rsComboRange+rsVarRange+']'); /** Used to match non-compound words composed of alphanumeric characters. */var reBasicWord=/[a-zA-Z0-9]+/g; /** Used to match complex or compound words. */var reComplexWord=RegExp([rsUpper+'?'+rsLower+'+(?='+[rsBreak,rsUpper,'$'].join('|')+')',rsUpperMisc+'+(?='+[rsBreak,rsUpper+rsLowerMisc,'$'].join('|')+')',rsUpper+'?'+rsLowerMisc+'+',rsDigits+'(?:'+rsLowerMisc+'+)?',rsEmoji].join('|'),'g'); /** Used to detect strings that need a more robust regexp to match words. */var reHasComplexWord=/[a-z][A-Z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/; /** Used to assign default `context` object properties. */var contextProps=['Array','Date','Error','Float32Array','Float64Array','Function','Int8Array','Int16Array','Int32Array','Map','Math','Object','Reflect','RegExp','Set','String','Symbol','TypeError','Uint8Array','Uint8ClampedArray','Uint16Array','Uint32Array','WeakMap','_','clearTimeout','isFinite','parseInt','setTimeout']; /** Used to make template sourceURLs easier to identify. */var templateCounter=-1; /** Used to identify `toStringTag` values of typed arrays. */var typedArrayTags={};typedArrayTags[float32Tag]=typedArrayTags[float64Tag]=typedArrayTags[int8Tag]=typedArrayTags[int16Tag]=typedArrayTags[int32Tag]=typedArrayTags[uint8Tag]=typedArrayTags[uint8ClampedTag]=typedArrayTags[uint16Tag]=typedArrayTags[uint32Tag]=true;typedArrayTags[argsTag]=typedArrayTags[arrayTag]=typedArrayTags[arrayBufferTag]=typedArrayTags[boolTag]=typedArrayTags[dateTag]=typedArrayTags[errorTag]=typedArrayTags[funcTag]=typedArrayTags[mapTag]=typedArrayTags[numberTag]=typedArrayTags[objectTag]=typedArrayTags[regexpTag]=typedArrayTags[setTag]=typedArrayTags[stringTag]=typedArrayTags[weakMapTag]=false; /** Used to identify `toStringTag` values supported by `_.clone`. */var cloneableTags={};cloneableTags[argsTag]=cloneableTags[arrayTag]=cloneableTags[arrayBufferTag]=cloneableTags[boolTag]=cloneableTags[dateTag]=cloneableTags[float32Tag]=cloneableTags[float64Tag]=cloneableTags[int8Tag]=cloneableTags[int16Tag]=cloneableTags[int32Tag]=cloneableTags[mapTag]=cloneableTags[numberTag]=cloneableTags[objectTag]=cloneableTags[regexpTag]=cloneableTags[setTag]=cloneableTags[stringTag]=cloneableTags[symbolTag]=cloneableTags[uint8Tag]=cloneableTags[uint8ClampedTag]=cloneableTags[uint16Tag]=cloneableTags[uint32Tag]=true;cloneableTags[errorTag]=cloneableTags[funcTag]=cloneableTags[weakMapTag]=false; /** Used to map latin-1 supplementary letters to basic latin letters. */var deburredLetters={'\xc0':'A','\xc1':'A','\xc2':'A','\xc3':'A','\xc4':'A','\xc5':'A','\xe0':'a','\xe1':'a','\xe2':'a','\xe3':'a','\xe4':'a','\xe5':'a','\xc7':'C','\xe7':'c','\xd0':'D','\xf0':'d','\xc8':'E','\xc9':'E','\xca':'E','\xcb':'E','\xe8':'e','\xe9':'e','\xea':'e','\xeb':'e','\xcC':'I','\xcd':'I','\xce':'I','\xcf':'I','\xeC':'i','\xed':'i','\xee':'i','\xef':'i','\xd1':'N','\xf1':'n','\xd2':'O','\xd3':'O','\xd4':'O','\xd5':'O','\xd6':'O','\xd8':'O','\xf2':'o','\xf3':'o','\xf4':'o','\xf5':'o','\xf6':'o','\xf8':'o','\xd9':'U','\xda':'U','\xdb':'U','\xdc':'U','\xf9':'u','\xfa':'u','\xfb':'u','\xfc':'u','\xdd':'Y','\xfd':'y','\xff':'y','\xc6':'Ae','\xe6':'ae','\xde':'Th','\xfe':'th','\xdf':'ss'}; /** Used to map characters to HTML entities. */var htmlEscapes={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','`':'&#96;'}; /** Used to map HTML entities to characters. */var htmlUnescapes={'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&#39;':"'",'&#96;':'`'}; /** Used to determine if values are of the language type `Object`. */var objectTypes={'function':true,'object':true}; /** Used to escape characters for inclusion in compiled string literals. */var stringEscapes={'\\':'\\',"'":"'",'\n':'n','\r':'r',"\u2028":'u2028',"\u2029":'u2029'}; /** Built-in method references without a dependency on `root`. */var freeParseFloat=parseFloat,freeParseInt=parseInt; /** Detect free variable `exports`. */var freeExports=objectTypes[typeof exports==="undefined"?"undefined":_typeof(exports)]&&exports&&!exports.nodeType?exports:null; /** Detect free variable `module`. */var freeModule=objectTypes[typeof module==="undefined"?"undefined":_typeof(module)]&&module&&!module.nodeType?module:null; /** Detect free variable `global` from Node.js. */var freeGlobal=checkGlobal(freeExports&&freeModule&&(typeof global==="undefined"?"undefined":_typeof(global))=='object'&&global); /** Detect free variable `self`. */var freeSelf=checkGlobal(objectTypes[typeof self==="undefined"?"undefined":_typeof(self)]&&self); /** Detect free variable `window`. */var freeWindow=checkGlobal(objectTypes[typeof window==="undefined"?"undefined":_typeof(window)]&&window); /** Detect the popular CommonJS extension `module.exports`. */var moduleExports=freeModule&&freeModule.exports===freeExports?freeExports:null; /** Detect `this` as the global object. */var thisGlobal=checkGlobal(objectTypes[_typeof(this)]&&this); /**
   * Used as a reference to the global object.
   *
   * The `this` value is used if it's the global object to avoid Greasemonkey's
   * restricted `window` object, otherwise the `window` object is used.
   */var root=freeGlobal||freeWindow!==(thisGlobal&&thisGlobal.window)&&freeWindow||freeSelf||thisGlobal||Function('return this')(); /*--------------------------------------------------------------------------*/ /**
   * Adds the key-value `pair` to `map`.
   *
   * @private
   * @param {Object} map The map to modify.
   * @param {Array} pair The key-value pair to add.
   * @returns {Object} Returns `map`.
   */function addMapEntry(map,pair){map.set(pair[0],pair[1]);return map;} /**
   * Adds `value` to `set`.
   *
   * @private
   * @param {Object} set The set to modify.
   * @param {*} value The value to add.
   * @returns {Object} Returns `set`.
   */function addSetEntry(set,value){set.add(value);return set;} /**
   * A faster alternative to `Function#apply`, this function invokes `func`
   * with the `this` binding of `thisArg` and the arguments of `args`.
   *
   * @private
   * @param {Function} func The function to invoke.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {...*} [args] The arguments to invoke `func` with.
   * @returns {*} Returns the result of `func`.
   */function apply(func,thisArg,args){var length=args?args.length:0;switch(length){case 0:return func.call(thisArg);case 1:return func.call(thisArg,args[0]);case 2:return func.call(thisArg,args[0],args[1]);case 3:return func.call(thisArg,args[0],args[1],args[2]);}return func.apply(thisArg,args);} /**
   * Creates a new array concatenating `array` with `other`.
   *
   * @private
   * @param {Array} array The first array to concatenate.
   * @param {Array} other The second array to concatenate.
   * @returns {Array} Returns the new concatenated array.
   */function arrayConcat(array,other){var index=-1,length=array.length,othIndex=-1,othLength=other.length,result=Array(length+othLength);while(++index<length){result[index]=array[index];}while(++othIndex<othLength){result[index++]=other[othIndex];}return result;} /**
   * A specialized version of `_.forEach` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */function arrayEach(array,iteratee){var index=-1,length=array.length;while(++index<length){if(iteratee(array[index],index,array)===false){break;}}return array;} /**
   * A specialized version of `_.forEachRight` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */function arrayEachRight(array,iteratee){var length=array.length;while(length--){if(iteratee(array[length],length,array)===false){break;}}return array;} /**
   * A specialized version of `_.every` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if all elements pass the predicate check, else `false`.
   */function arrayEvery(array,predicate){var index=-1,length=array.length;while(++index<length){if(!predicate(array[index],index,array)){return false;}}return true;} /**
   * A specialized version of `_.filter` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */function arrayFilter(array,predicate){var index=-1,length=array.length,resIndex=-1,result=[];while(++index<length){var value=array[index];if(predicate(value,index,array)){result[++resIndex]=value;}}return result;} /**
   * A specialized version of `_.includes` for arrays without support for
   * specifying an index to search from.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {*} target The value to search for.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */function arrayIncludes(array,value){return !!array.length&&baseIndexOf(array,value,0)>-1;} /**
   * A specialized version of `_.includesWith` for arrays without support for
   * specifying an index to search from.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {*} target The value to search for.
   * @param {Function} comparator The comparator invoked per element.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */function arrayIncludesWith(array,value,comparator){var index=-1,length=array.length;while(++index<length){if(comparator(value,array[index])){return true;}}return false;} /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */function arrayMap(array,iteratee){var index=-1,length=array.length,result=Array(length);while(++index<length){result[index]=iteratee(array[index],index,array);}return result;} /**
   * Appends the elements of `values` to `array`.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to append.
   * @returns {Array} Returns `array`.
   */function arrayPush(array,values){var index=-1,length=values.length,offset=array.length;while(++index<length){array[offset+index]=values[index];}return array;} /**
   * A specialized version of `_.reduce` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @param {boolean} [initFromArray] Specify using the first element of `array` as the initial value.
   * @returns {*} Returns the accumulated value.
   */function arrayReduce(array,iteratee,accumulator,initFromArray){var index=-1,length=array.length;if(initFromArray&&length){accumulator=array[++index];}while(++index<length){accumulator=iteratee(accumulator,array[index],index,array);}return accumulator;} /**
   * A specialized version of `_.reduceRight` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @param {boolean} [initFromArray] Specify using the last element of `array` as the initial value.
   * @returns {*} Returns the accumulated value.
   */function arrayReduceRight(array,iteratee,accumulator,initFromArray){var length=array.length;if(initFromArray&&length){accumulator=array[--length];}while(length--){accumulator=iteratee(accumulator,array[length],length,array);}return accumulator;} /**
   * A specialized version of `_.some` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if any element passes the predicate check, else `false`.
   */function arraySome(array,predicate){var index=-1,length=array.length;while(++index<length){if(predicate(array[index],index,array)){return true;}}return false;} /**
   * The base implementation of methods like `_.max` and `_.min` which accepts a
   * `comparator` to determine the extremum value.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The iteratee invoked per iteration.
   * @param {Function} comparator The comparator used to compare values.
   * @returns {*} Returns the extremum value.
   */function baseExtremum(array,iteratee,comparator){var index=-1,length=array.length;while(++index<length){var value=array[index],current=iteratee(value);if(current!=null&&(computed===undefined?current===current:comparator(current,computed))){var computed=current,result=value;}}return result;} /**
   * The base implementation of methods like `_.find` and `_.findKey`, without
   * support for iteratee shorthands, which iterates over `collection` using
   * the provided `eachFunc`.
   *
   * @private
   * @param {Array|Object} collection The collection to search.
   * @param {Function} predicate The function invoked per iteration.
   * @param {Function} eachFunc The function to iterate over `collection`.
   * @param {boolean} [retKey] Specify returning the key of the found element instead of the element itself.
   * @returns {*} Returns the found element or its key, else `undefined`.
   */function baseFind(collection,predicate,eachFunc,retKey){var result;eachFunc(collection,function(value,key,collection){if(predicate(value,key,collection)){result=retKey?key:value;return false;}});return result;} /**
   * The base implementation of `_.findIndex` and `_.findLastIndex` without
   * support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {Function} predicate The function invoked per iteration.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */function baseFindIndex(array,predicate,fromRight){var length=array.length,index=fromRight?length:-1;while(fromRight?index--:++index<length){if(predicate(array[index],index,array)){return index;}}return -1;} /**
   * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */function baseIndexOf(array,value,fromIndex){if(value!==value){return indexOfNaN(array,fromIndex);}var index=fromIndex-1,length=array.length;while(++index<length){if(array[index]===value){return index;}}return -1;} /**
   * The base implementation of `_.reduce` and `_.reduceRight`, without support
   * for iteratee shorthands, which iterates over `collection` using the provided
   * `eachFunc`.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} accumulator The initial value.
   * @param {boolean} initFromCollection Specify using the first or last element of `collection` as the initial value.
   * @param {Function} eachFunc The function to iterate over `collection`.
   * @returns {*} Returns the accumulated value.
   */function baseReduce(collection,iteratee,accumulator,initFromCollection,eachFunc){eachFunc(collection,function(value,index,collection){accumulator=initFromCollection?(initFromCollection=false,value):iteratee(accumulator,value,index,collection);});return accumulator;} /**
   * The base implementation of `_.sortBy` which uses `comparer` to define
   * the sort order of `array` and replaces criteria objects with their
   * corresponding values.
   *
   * @private
   * @param {Array} array The array to sort.
   * @param {Function} comparer The function to define sort order.
   * @returns {Array} Returns `array`.
   */function baseSortBy(array,comparer){var length=array.length;array.sort(comparer);while(length--){array[length]=array[length].value;}return array;} /**
   * The base implementation of `_.sum` without support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {number} Returns the sum.
   */function baseSum(array,iteratee){var result,index=-1,length=array.length;while(++index<length){var current=iteratee(array[index]);if(current!==undefined){result=result===undefined?current:result+current;}}return result;} /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */function baseTimes(n,iteratee){var index=-1,result=Array(n);while(++index<n){result[index]=iteratee(index);}return result;} /**
   * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
   * of key-value pairs for `object` corresponding to the property names of `props`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} props The property names to get values for.
   * @returns {Object} Returns the new array of key-value pairs.
   */function baseToPairs(object,props){return arrayMap(props,function(key){return [key,object[key]];});} /**
   * The base implementation of `_.unary` without support for storing wrapper metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new function.
   */function baseUnary(func){return function(value){return func(value);};} /**
   * The base implementation of `_.values` and `_.valuesIn` which creates an
   * array of `object` property values corresponding to the property names
   * of `props`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} props The property names to get values for.
   * @returns {Object} Returns the array of property values.
   */function baseValues(object,props){return arrayMap(props,function(key){return object[key];});} /**
   * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
   * that is not found in the character symbols.
   *
   * @private
   * @param {Array} strSymbols The string symbols to inspect.
   * @param {Array} chrSymbols The character symbols to find.
   * @returns {number} Returns the index of the first unmatched string symbol.
   */function charsStartIndex(strSymbols,chrSymbols){var index=-1,length=strSymbols.length;while(++index<length&&baseIndexOf(chrSymbols,strSymbols[index],0)>-1){}return index;} /**
   * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
   * that is not found in the character symbols.
   *
   * @private
   * @param {Array} strSymbols The string symbols to inspect.
   * @param {Array} chrSymbols The character symbols to find.
   * @returns {number} Returns the index of the last unmatched string symbol.
   */function charsEndIndex(strSymbols,chrSymbols){var index=strSymbols.length;while(index--&&baseIndexOf(chrSymbols,strSymbols[index],0)>-1){}return index;} /**
   * Checks if `value` is a global object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {null|Object} Returns `value` if it's a global object, else `null`.
   */function checkGlobal(value){return value&&value.Object===Object?value:null;} /**
   * Compares values to sort them in ascending order.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {number} Returns the sort order indicator for `value`.
   */function compareAscending(value,other){if(value!==other){var valIsNull=value===null,valIsUndef=value===undefined,valIsReflexive=value===value;var othIsNull=other===null,othIsUndef=other===undefined,othIsReflexive=other===other;if(value>other&&!othIsNull||!valIsReflexive||valIsNull&&!othIsUndef&&othIsReflexive||valIsUndef&&othIsReflexive){return 1;}if(value<other&&!valIsNull||!othIsReflexive||othIsNull&&!valIsUndef&&valIsReflexive||othIsUndef&&valIsReflexive){return -1;}}return 0;} /**
   * Used by `_.orderBy` to compare multiple properties of a value to another
   * and stable sort them.
   *
   * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
   * specify an order of "desc" for descending or "asc" for ascending sort order
   * of corresponding values.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {boolean[]|string[]} orders The order to sort by for each property.
   * @returns {number} Returns the sort order indicator for `object`.
   */function compareMultiple(object,other,orders){var index=-1,objCriteria=object.criteria,othCriteria=other.criteria,length=objCriteria.length,ordersLength=orders.length;while(++index<length){var result=compareAscending(objCriteria[index],othCriteria[index]);if(result){if(index>=ordersLength){return result;}var order=orders[index];return result*(order=='desc'?-1:1);}} // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
// that causes it, under certain circumstances, to provide the same value for
// `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
// for more details.
//
// This also ensures a stable sort in V8 and other engines.
// See https://code.google.com/p/v8/issues/detail?id=90 for more details.
return object.index-other.index;} /**
   * Used by `_.deburr` to convert latin-1 supplementary letters to basic latin letters.
   *
   * @private
   * @param {string} letter The matched letter to deburr.
   * @returns {string} Returns the deburred letter.
   */function deburrLetter(letter){return deburredLetters[letter];} /**
   * Used by `_.escape` to convert characters to HTML entities.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */function escapeHtmlChar(chr){return htmlEscapes[chr];} /**
   * Used by `_.template` to escape characters for inclusion in compiled string literals.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */function escapeStringChar(chr){return '\\'+stringEscapes[chr];} /**
   * Gets the index at which the first occurrence of `NaN` is found in `array`.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched `NaN`, else `-1`.
   */function indexOfNaN(array,fromIndex,fromRight){var length=array.length,index=fromIndex+(fromRight?0:-1);while(fromRight?index--:++index<length){var other=array[index];if(other!==other){return index;}}return -1;} /**
   * Checks if `value` is a host object in IE < 9.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
   */function isHostObject(value){ // Many host objects are `Object` objects that can coerce to strings
// despite having improperly defined `toString` methods.
var result=false;if(value!=null&&typeof value.toString!='function'){try{result=!!(value+'');}catch(e){}}return result;} /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */function isIndex(value,length){value=typeof value=='number'||reIsUint.test(value)?+value:-1;length=length==null?MAX_SAFE_INTEGER:length;return value>-1&&value%1==0&&value<length;} /**
   * Converts `iterator` to an array.
   *
   * @private
   * @param {Object} iterator The iterator to convert.
   * @returns {Array} Returns the converted array.
   */function iteratorToArray(iterator){var data,result=[];while(!(data=iterator.next()).done){result.push(data.value);}return result;} /**
   * Converts `map` to an array.
   *
   * @private
   * @param {Object} map The map to convert.
   * @returns {Array} Returns the converted array.
   */function mapToArray(map){var index=-1,result=Array(map.size);map.forEach(function(value,key){result[++index]=[key,value];});return result;} /**
   * Replaces all `placeholder` elements in `array` with an internal placeholder
   * and returns an array of their indexes.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {*} placeholder The placeholder to replace.
   * @returns {Array} Returns the new array of placeholder indexes.
   */function replaceHolders(array,placeholder){var index=-1,length=array.length,resIndex=-1,result=[];while(++index<length){if(array[index]===placeholder){array[index]=PLACEHOLDER;result[++resIndex]=index;}}return result;} /**
   * Converts `set` to an array.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the converted array.
   */function setToArray(set){var index=-1,result=Array(set.size);set.forEach(function(value){result[++index]=value;});return result;} /**
   * Gets the number of symbols in `string`.
   *
   * @param {string} string The string to inspect.
   * @returns {number} Returns the string size.
   */function stringSize(string){if(!(string&&reHasComplexSymbol.test(string))){return string.length;}var result=reComplexSymbol.lastIndex=0;while(reComplexSymbol.test(string)){result++;}return result;} /**
   * Converts `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */function stringToArray(string){return string.match(reComplexSymbol);} /**
   * Used by `_.unescape` to convert HTML entities to characters.
   *
   * @private
   * @param {string} chr The matched character to unescape.
   * @returns {string} Returns the unescaped character.
   */function unescapeHtmlChar(chr){return htmlUnescapes[chr];} /*--------------------------------------------------------------------------*/ /**
   * Create a new pristine `lodash` function using the `context` object.
   *
   * @static
   * @memberOf _
   * @category Util
   * @param {Object} [context=root] The context object.
   * @returns {Function} Returns a new `lodash` function.
   * @example
   *
   * _.mixin({ 'foo': _.constant('foo') });
   *
   * var lodash = _.runInContext();
   * lodash.mixin({ 'bar': lodash.constant('bar') });
   *
   * _.isFunction(_.foo);
   * // => true
   * _.isFunction(_.bar);
   * // => false
   *
   * lodash.isFunction(lodash.foo);
   * // => false
   * lodash.isFunction(lodash.bar);
   * // => true
   *
   * // using `context` to mock `Date#getTime` use in `_.now`
   * var mock = _.runInContext({
   *   'Date': function() {
   *     return { 'getTime': getTimeMock };
   *   }
   * });
   *
   * // or creating a suped-up `defer` in Node.js
   * var defer = _.runInContext({ 'setTimeout': setImmediate }).defer;
   */function runInContext(context){context=context?_.defaults({},context,_.pick(root,contextProps)):root; /** Built-in constructor references. */var Date=context.Date,Error=context.Error,Math=context.Math,RegExp=context.RegExp,TypeError=context.TypeError; /** Used for built-in method references. */var arrayProto=context.Array.prototype,objectProto=context.Object.prototype; /** Used to resolve the decompiled source of functions. */var funcToString=context.Function.prototype.toString; /** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty; /** Used to generate unique IDs. */var idCounter=0; /** Used to infer the `Object` constructor. */var objectCtorString=funcToString.call(Object); /**
     * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
     * of values.
     */var objectToString=objectProto.toString; /** Used to restore the original `_` reference in `_.noConflict`. */var oldDash=root._; /** Used to detect if a method is native. */var reIsNative=RegExp('^'+funcToString.call(hasOwnProperty).replace(reRegExpChar,'\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,'$1.*?')+'$'); /** Built-in value references. */var _Symbol=context.Symbol,Reflect=context.Reflect,Uint8Array=context.Uint8Array,clearTimeout=context.clearTimeout,enumerate=Reflect?Reflect.enumerate:undefined,getPrototypeOf=Object.getPrototypeOf,getOwnPropertySymbols=Object.getOwnPropertySymbols,iteratorSymbol=_typeof(iteratorSymbol=_Symbol&&_Symbol.iterator)=='symbol'?iteratorSymbol:undefined,propertyIsEnumerable=objectProto.propertyIsEnumerable,setTimeout=context.setTimeout,splice=arrayProto.splice; /* Built-in method references for those with the same name as other `lodash` methods. */var nativeCeil=Math.ceil,nativeFloor=Math.floor,nativeIsFinite=context.isFinite,nativeJoin=arrayProto.join,nativeKeys=Object.keys,nativeMax=Math.max,nativeMin=Math.min,nativeParseInt=context.parseInt,nativeRandom=Math.random,nativeReverse=arrayProto.reverse; /* Built-in method references that are verified to be native. */var Map=getNative(context,'Map'),Set=getNative(context,'Set'),WeakMap=getNative(context,'WeakMap'),nativeCreate=getNative(Object,'create'); /** Used to store function metadata. */var metaMap=WeakMap&&new WeakMap(); /** Used to detect maps and sets. */var mapCtorString=Map?funcToString.call(Map):'',setCtorString=Set?funcToString.call(Set):''; /** Used to convert symbols to primitives and strings. */var symbolProto=_Symbol?_Symbol.prototype:undefined,symbolValueOf=_Symbol?symbolProto.valueOf:undefined,symbolToString=_Symbol?symbolProto.toString:undefined; /** Used to lookup unminified function names. */var realNames={}; /*------------------------------------------------------------------------*/ /**
     * Creates a `lodash` object which wraps `value` to enable implicit method
     * chaining. Methods that operate on and return arrays, collections, and
     * functions can be chained together. Methods that retrieve a single value or
     * may return a primitive value will automatically end the chain sequence and
     * return the unwrapped value. Otherwise, the value must be unwrapped with
     * `_#value`.
     *
     * Explicit chaining, which must be unwrapped with `_#value` in all cases,
     * may be enabled using `_.chain`.
     *
     * The execution of chained methods is lazy, that is, it's deferred until
     * `_#value` is implicitly or explicitly called.
     *
     * Lazy evaluation allows several methods to support shortcut fusion. Shortcut
     * fusion is an optimization to merge iteratee calls; this avoids the creation
     * of intermediate arrays and can greatly reduce the number of iteratee executions.
     * Sections of a chain sequence qualify for shortcut fusion if the section is
     * applied to an array of at least two hundred elements and any iteratees
     * accept only one argument. The heuristic for whether a section qualifies
     * for shortcut fusion is subject to change.
     *
     * Chaining is supported in custom builds as long as the `_#value` method is
     * directly or indirectly included in the build.
     *
     * In addition to lodash methods, wrappers have `Array` and `String` methods.
     *
     * The wrapper `Array` methods are:
     * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
     *
     * The wrapper `String` methods are:
     * `replace` and `split`
     *
     * The wrapper methods that support shortcut fusion are:
     * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
     * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
     * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
     *
     * The chainable wrapper methods are:
     * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`,
     * `at`, `before`, `bind`, `bindAll`, `bindKey`, `chain`, `chunk`, `commit`,
     * `compact`, `concat`, `conforms`,  `constant`, `countBy`, `create`, `curry`,
     * `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`, `difference`,
     * `differenceBy`, `differenceWith`,  `drop`, `dropRight`, `dropRightWhile`,
     * `dropWhile`, `fill`, `filter`, `flatten`, `flattenDeep`, `flip`, `flow`,
     * `flowRight`, `forEach`, `forEachRight`, `forIn`, `forInRight`, `forOwn`,
     * `forOwnRight`, `fromPairs`, `functions`, `functionsIn`, `groupBy`, `initial`,
     * `intersection`, `intersectionBy`, `intersectionWith`, invert`, `invokeMap`,
     * `iteratee`, `keyBy`, `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`,
     * `matches`, `matchesProperty`, `memoize`, `merge`, `mergeWith`, `method`,
     * `methodOf`, `mixin`, `negate`, `nthArg`, `omit`, `omitBy`, `once`, `orderBy`,
     * `over`, `overArgs`, `overEvery`, `overSome`, `partial`, `partialRight`,
     * `partition`, `pick`, `pickBy`, `plant`, `property`, `propertyOf`, `pull`,
     * `pullAll`, `pullAllBy`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`,
     * `reject`, `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`,
     * `shuffle`, `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`,
     * `takeRight`, `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`,
     * `toArray`, `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`,
     * `unary`, `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`,
     * `unset`, `unshift`, `unzip`, `unzipWith`, `values`, `valuesIn`, `without`,
     * `wrap`, `xor`, `xorBy`, `xorWith`, `zip`, `zipObject`, and `zipWith`
     *
     * The wrapper methods that are **not** chainable by default are:
     * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
     * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `deburr`, `endsWith`, `eq`,
     * `escape`, `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`,
     * `findLast`, `findLastIndex`, `findLastKey`, `floor`, `get`, `gt`, `gte`,
     * `has`, `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`,
     * `invoke`, `isArguments`, `isArray`, `isArrayLike`, `isArrayLikeObject`,
     * `isBoolean`, `isDate`, `isElement`, `isEmpty`, `isEqual`, `isEqualWith`,
     * `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`, `isMatch`,
     * `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`, `isNumber`,
     * `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`, `isSafeInteger`,
     * `isString`, `isUndefined`, `isTypedArray`, `join`, `kebabCase`, `last`,
     * `lastIndexOf`, `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`,
     * `mean`, `min`, `minBy`, `noConflict`, `noop`, `now`, `pad`, `padEnd`,
     * `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`, `repeat`,
     * `result`, `round`, `runInContext`, `sample`, `shift`, `size`, `snakeCase`,
     * `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`, `sortedLastIndexBy`,
     * `startCase`, `startsWith`, `subtract`, `sum`, sumBy`, `template`, `times`,
     * `toLower`, `toInteger`, `toLength`, `toNumber`, `toSafeInteger`, toString`,
     * `toUpper`, `trim`, `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`,
     * `upperCase`, `upperFirst`, `value`, and `words`
     *
     * @name _
     * @constructor
     * @category Seq
     * @param {*} value The value to wrap in a `lodash` instance.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var wrapped = _([1, 2, 3]);
     *
     * // returns an unwrapped value
     * wrapped.reduce(_.add);
     * // => 6
     *
     * // returns a wrapped value
     * var squares = wrapped.map(square);
     *
     * _.isArray(squares);
     * // => false
     *
     * _.isArray(squares.value());
     * // => true
     */function lodash(value){if(isObjectLike(value)&&!isArray(value)&&!(value instanceof LazyWrapper)){if(value instanceof LodashWrapper){return value;}if(hasOwnProperty.call(value,'__wrapped__')){return wrapperClone(value);}}return new LodashWrapper(value);} /**
     * The function whose prototype all chaining wrappers inherit from.
     *
     * @private
     */function baseLodash(){} // No operation performed.
/**
     * The base constructor for creating `lodash` wrapper objects.
     *
     * @private
     * @param {*} value The value to wrap.
     * @param {boolean} [chainAll] Enable chaining for all wrapper methods.
     */function LodashWrapper(value,chainAll){this.__wrapped__=value;this.__actions__=[];this.__chain__=!!chainAll;this.__index__=0;this.__values__=undefined;} /**
     * By default, the template delimiters used by lodash are like those in
     * embedded Ruby (ERB). Change the following template settings to use
     * alternative delimiters.
     *
     * @static
     * @memberOf _
     * @type Object
     */lodash.templateSettings={ /**
       * Used to detect `data` property values to be HTML-escaped.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */'escape':reEscape, /**
       * Used to detect code to be evaluated.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */'evaluate':reEvaluate, /**
       * Used to detect `data` property values to inject.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */'interpolate':reInterpolate, /**
       * Used to reference the data object in the template text.
       *
       * @memberOf _.templateSettings
       * @type string
       */'variable':'', /**
       * Used to import variables into the compiled template.
       *
       * @memberOf _.templateSettings
       * @type Object
       */'imports':{ /**
         * A reference to the `lodash` function.
         *
         * @memberOf _.templateSettings.imports
         * @type Function
         */'_':lodash}}; /*------------------------------------------------------------------------*/ /**
     * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
     *
     * @private
     * @param {*} value The value to wrap.
     */function LazyWrapper(value){this.__wrapped__=value;this.__actions__=[];this.__dir__=1;this.__filtered__=false;this.__iteratees__=[];this.__takeCount__=MAX_ARRAY_LENGTH;this.__views__=[];} /**
     * Creates a clone of the lazy wrapper object.
     *
     * @private
     * @name clone
     * @memberOf LazyWrapper
     * @returns {Object} Returns the cloned `LazyWrapper` object.
     */function lazyClone(){var result=new LazyWrapper(this.__wrapped__);result.__actions__=copyArray(this.__actions__);result.__dir__=this.__dir__;result.__filtered__=this.__filtered__;result.__iteratees__=copyArray(this.__iteratees__);result.__takeCount__=this.__takeCount__;result.__views__=copyArray(this.__views__);return result;} /**
     * Reverses the direction of lazy iteration.
     *
     * @private
     * @name reverse
     * @memberOf LazyWrapper
     * @returns {Object} Returns the new reversed `LazyWrapper` object.
     */function lazyReverse(){if(this.__filtered__){var result=new LazyWrapper(this);result.__dir__=-1;result.__filtered__=true;}else {result=this.clone();result.__dir__*=-1;}return result;} /**
     * Extracts the unwrapped value from its lazy wrapper.
     *
     * @private
     * @name value
     * @memberOf LazyWrapper
     * @returns {*} Returns the unwrapped value.
     */function lazyValue(){var array=this.__wrapped__.value(),dir=this.__dir__,isArr=isArray(array),isRight=dir<0,arrLength=isArr?array.length:0,view=getView(0,arrLength,this.__views__),start=view.start,end=view.end,length=end-start,index=isRight?end:start-1,iteratees=this.__iteratees__,iterLength=iteratees.length,resIndex=0,takeCount=nativeMin(length,this.__takeCount__);if(!isArr||arrLength<LARGE_ARRAY_SIZE||arrLength==length&&takeCount==length){return baseWrapperValue(array,this.__actions__);}var result=[];outer: while(length--&&resIndex<takeCount){index+=dir;var iterIndex=-1,value=array[index];while(++iterIndex<iterLength){var data=iteratees[iterIndex],iteratee=data.iteratee,type=data.type,computed=iteratee(value);if(type==LAZY_MAP_FLAG){value=computed;}else if(!computed){if(type==LAZY_FILTER_FLAG){continue outer;}else {break outer;}}}result[resIndex++]=value;}return result;} /*------------------------------------------------------------------------*/ /**
     * Creates an hash object.
     *
     * @private
     * @returns {Object} Returns the new hash object.
     */function Hash(){} /**
     * Removes `key` and its value from the hash.
     *
     * @private
     * @param {Object} hash The hash to modify.
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */function hashDelete(hash,key){return hashHas(hash,key)&&delete hash[key];} /**
     * Gets the hash value for `key`.
     *
     * @private
     * @param {Object} hash The hash to query.
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */function hashGet(hash,key){if(nativeCreate){var result=hash[key];return result===HASH_UNDEFINED?undefined:result;}return hasOwnProperty.call(hash,key)?hash[key]:undefined;} /**
     * Checks if a hash value for `key` exists.
     *
     * @private
     * @param {Object} hash The hash to query.
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */function hashHas(hash,key){return nativeCreate?hash[key]!==undefined:hasOwnProperty.call(hash,key);} /**
     * Sets the hash `key` to `value`.
     *
     * @private
     * @param {Object} hash The hash to modify.
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     */function hashSet(hash,key,value){hash[key]=nativeCreate&&value===undefined?HASH_UNDEFINED:value;} /*------------------------------------------------------------------------*/ /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @param {Array} [values] The values to cache.
     */function MapCache(values){var index=-1,length=values?values.length:0;this.clear();while(++index<length){var entry=values[index];this.set(entry[0],entry[1]);}} /**
     * Removes all key-value entries from the map.
     *
     * @private
     * @name clear
     * @memberOf MapCache
     */function mapClear(){this.__data__={'hash':new Hash(),'map':Map?new Map():[],'string':new Hash()};} /**
     * Removes `key` and its value from the map.
     *
     * @private
     * @name delete
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */function mapDelete(key){var data=this.__data__;if(isKeyable(key)){return hashDelete(typeof key=='string'?data.string:data.hash,key);}return Map?data.map['delete'](key):assocDelete(data.map,key);} /**
     * Gets the map value for `key`.
     *
     * @private
     * @name get
     * @memberOf MapCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */function mapGet(key){var data=this.__data__;if(isKeyable(key)){return hashGet(typeof key=='string'?data.string:data.hash,key);}return Map?data.map.get(key):assocGet(data.map,key);} /**
     * Checks if a map value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf MapCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */function mapHas(key){var data=this.__data__;if(isKeyable(key)){return hashHas(typeof key=='string'?data.string:data.hash,key);}return Map?data.map.has(key):assocHas(data.map,key);} /**
     * Sets the map `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache object.
     */function mapSet(key,value){var data=this.__data__;if(isKeyable(key)){hashSet(typeof key=='string'?data.string:data.hash,key,value);}else if(Map){data.map.set(key,value);}else {assocSet(data.map,key,value);}return this;} /*------------------------------------------------------------------------*/ /**
     *
     * Creates a set cache object to store unique values.
     *
     * @private
     * @param {Array} [values] The values to cache.
     */function SetCache(values){var index=-1,length=values?values.length:0;this.__data__=new MapCache();while(++index<length){this.push(values[index]);}} /**
     * Checks if `value` is in `cache`.
     *
     * @private
     * @param {Object} cache The set cache to search.
     * @param {*} value The value to search for.
     * @returns {number} Returns `true` if `value` is found, else `false`.
     */function cacheHas(cache,value){var map=cache.__data__;if(isKeyable(value)){var data=map.__data__,hash=typeof value=='string'?data.string:data.hash;return hash[value]===HASH_UNDEFINED;}return map.has(value);} /**
     * Adds `value` to the set cache.
     *
     * @private
     * @name push
     * @memberOf SetCache
     * @param {*} value The value to cache.
     */function cachePush(value){var map=this.__data__;if(isKeyable(value)){var data=map.__data__,hash=typeof value=='string'?data.string:data.hash;hash[value]=HASH_UNDEFINED;}else {map.set(value,HASH_UNDEFINED);}} /*------------------------------------------------------------------------*/ /**
     * Creates a stack cache object to store key-value pairs.
     *
     * @private
     * @param {Array} [values] The values to cache.
     */function Stack(values){var index=-1,length=values?values.length:0;this.clear();while(++index<length){var entry=values[index];this.set(entry[0],entry[1]);}} /**
     * Removes all key-value entries from the stack.
     *
     * @private
     * @name clear
     * @memberOf Stack
     */function stackClear(){this.__data__={'array':[],'map':null};} /**
     * Removes `key` and its value from the stack.
     *
     * @private
     * @name delete
     * @memberOf Stack
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */function stackDelete(key){var data=this.__data__,array=data.array;return array?assocDelete(array,key):data.map['delete'](key);} /**
     * Gets the stack value for `key`.
     *
     * @private
     * @name get
     * @memberOf Stack
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */function stackGet(key){var data=this.__data__,array=data.array;return array?assocGet(array,key):data.map.get(key);} /**
     * Checks if a stack value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Stack
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */function stackHas(key){var data=this.__data__,array=data.array;return array?assocHas(array,key):data.map.has(key);} /**
     * Sets the stack `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Stack
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the stack cache object.
     */function stackSet(key,value){var data=this.__data__,array=data.array;if(array){if(array.length<LARGE_ARRAY_SIZE-1){assocSet(array,key,value);}else {data.array=null;data.map=new MapCache(array);}}var map=data.map;if(map){map.set(key,value);}return this;} /*------------------------------------------------------------------------*/ /**
     * Removes `key` and its value from the associative array.
     *
     * @private
     * @param {Array} array The array to query.
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */function assocDelete(array,key){var index=assocIndexOf(array,key);if(index<0){return false;}var lastIndex=array.length-1;if(index==lastIndex){array.pop();}else {splice.call(array,index,1);}return true;} /**
     * Gets the associative array value for `key`.
     *
     * @private
     * @param {Array} array The array to query.
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */function assocGet(array,key){var index=assocIndexOf(array,key);return index<0?undefined:array[index][1];} /**
     * Checks if an associative array value for `key` exists.
     *
     * @private
     * @param {Array} array The array to query.
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */function assocHas(array,key){return assocIndexOf(array,key)>-1;} /**
     * Gets the index at which the first occurrence of `key` is found in `array`
     * of key-value pairs.
     *
     * @private
     * @param {Array} array The array to search.
     * @param {*} key The key to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */function assocIndexOf(array,key){var length=array.length;while(length--){if(eq(array[length][0],key)){return length;}}return -1;} /**
     * Sets the associative array `key` to `value`.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     */function assocSet(array,key,value){var index=assocIndexOf(array,key);if(index<0){array.push([key,value]);}else {array[index][1]=value;}} /*------------------------------------------------------------------------*/ /**
     * Used by `_.defaults` to customize its `_.assignIn` use.
     *
     * @private
     * @param {*} objValue The destination value.
     * @param {*} srcValue The source value.
     * @param {string} key The key of the property to assign.
     * @param {Object} object The parent object of `objValue`.
     * @returns {*} Returns the value to assign.
     */function assignInDefaults(objValue,srcValue,key,object){if(objValue===undefined||eq(objValue,objectProto[key])&&!hasOwnProperty.call(object,key)){return srcValue;}return objValue;} /**
     * This function is like `assignValue` except that it doesn't assign `undefined` values.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */function assignMergeValue(object,key,value){if(value!==undefined&&!eq(object[key],value)||typeof key=='number'&&value===undefined&&!(key in object)){object[key]=value;}} /**
     * Assigns `value` to `key` of `object` if the existing value is not equivalent
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */function assignValue(object,key,value){var objValue=object[key];if(!eq(objValue,value)||eq(objValue,objectProto[key])&&!hasOwnProperty.call(object,key)||value===undefined&&!(key in object)){object[key]=value;}} /**
     * The base implementation of `_.assign` without support for multiple sources
     * or `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */function baseAssign(object,source){return object&&copyObject(source,keys(source),object);} /**
     * The base implementation of `_.at` without support for individual paths.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {string[]} paths The property paths of elements to pick.
     * @returns {Array} Returns the new array of picked elements.
     */function baseAt(object,paths){var index=-1,isNil=object==null,length=paths.length,result=Array(length);while(++index<length){result[index]=isNil?undefined:get(object,paths[index]);}return result;} /**
     * The base implementation of `_.clamp` which doesn't coerce arguments to numbers.
     *
     * @private
     * @param {number} number The number to clamp.
     * @param {number} [lower] The lower bound.
     * @param {number} upper The upper bound.
     * @returns {number} Returns the clamped number.
     */function baseClamp(number,lower,upper){if(number===number){if(upper!==undefined){number=number<=upper?number:upper;}if(lower!==undefined){number=number>=lower?number:lower;}}return number;} /**
     * The base implementation of `_.clone` and `_.cloneDeep` which tracks
     * traversed objects.
     *
     * @private
     * @param {*} value The value to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @param {Function} [customizer] The function to customize cloning.
     * @param {string} [key] The key of `value`.
     * @param {Object} [object] The parent object of `value`.
     * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
     * @returns {*} Returns the cloned value.
     */function baseClone(value,isDeep,customizer,key,object,stack){var result;if(customizer){result=object?customizer(value,key,object,stack):customizer(value);}if(result!==undefined){return result;}if(!isObject(value)){return value;}var isArr=isArray(value);if(isArr){result=initCloneArray(value);if(!isDeep){return copyArray(value,result);}}else {var tag=getTag(value),isFunc=tag==funcTag||tag==genTag;if(tag==objectTag||tag==argsTag||isFunc&&!object){if(isHostObject(value)){return object?value:{};}result=initCloneObject(isFunc?{}:value);if(!isDeep){return copySymbols(value,baseAssign(result,value));}}else {return cloneableTags[tag]?initCloneByTag(value,tag,isDeep):object?value:{};}} // Check for circular references and return its corresponding clone.
stack||(stack=new Stack());var stacked=stack.get(value);if(stacked){return stacked;}stack.set(value,result); // Recursively populate clone (susceptible to call stack limits).
(isArr?arrayEach:baseForOwn)(value,function(subValue,key){assignValue(result,key,baseClone(subValue,isDeep,customizer,key,value,stack));});return isArr?result:copySymbols(value,result);} /**
     * The base implementation of `_.conforms` which doesn't clone `source`.
     *
     * @private
     * @param {Object} source The object of property predicates to conform to.
     * @returns {Function} Returns the new function.
     */function baseConforms(source){var props=keys(source),length=props.length;return function(object){if(object==null){return !length;}var index=length;while(index--){var key=props[index],predicate=source[key],value=object[key];if(value===undefined&&!(key in Object(object))||!predicate(value)){return false;}}return true;};} /**
     * The base implementation of `_.create` without support for assigning
     * properties to the created object.
     *
     * @private
     * @param {Object} prototype The object to inherit from.
     * @returns {Object} Returns the new object.
     */var baseCreate=function(){function object(){}return function(prototype){if(isObject(prototype)){object.prototype=prototype;var result=new object();object.prototype=undefined;}return result||{};};}(); /**
     * The base implementation of `_.delay` and `_.defer` which accepts an array
     * of `func` arguments.
     *
     * @private
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @param {Object} args The arguments provide to `func`.
     * @returns {number} Returns the timer id.
     */function baseDelay(func,wait,args){if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}return setTimeout(function(){func.apply(undefined,args);},wait);} /**
     * The base implementation of methods like `_.difference` without support for
     * excluding multiple arrays or iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Array} values The values to exclude.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     */function baseDifference(array,values,iteratee,comparator){var index=-1,includes=arrayIncludes,isCommon=true,length=array.length,result=[],valuesLength=values.length;if(!length){return result;}if(iteratee){values=arrayMap(values,baseUnary(iteratee));}if(comparator){includes=arrayIncludesWith;isCommon=false;}else if(values.length>=LARGE_ARRAY_SIZE){includes=cacheHas;isCommon=false;values=new SetCache(values);}outer: while(++index<length){var value=array[index],computed=iteratee?iteratee(value):value;if(isCommon&&computed===computed){var valuesIndex=valuesLength;while(valuesIndex--){if(values[valuesIndex]===computed){continue outer;}}result.push(value);}else if(!includes(values,computed,comparator)){result.push(value);}}return result;} /**
     * The base implementation of `_.forEach` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     */var baseEach=createBaseEach(baseForOwn); /**
     * The base implementation of `_.forEachRight` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     */var baseEachRight=createBaseEach(baseForOwnRight,true); /**
     * The base implementation of `_.every` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if all elements pass the predicate check, else `false`
     */function baseEvery(collection,predicate){var result=true;baseEach(collection,function(value,index,collection){result=!!predicate(value,index,collection);return result;});return result;} /**
     * The base implementation of `_.fill` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to fill.
     * @param {*} value The value to fill `array` with.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns `array`.
     */function baseFill(array,value,start,end){var length=array.length;start=toInteger(start);if(start<0){start=-start>length?0:length+start;}end=end===undefined||end>length?length:toInteger(end);if(end<0){end+=length;}end=start>end?0:toLength(end);while(start<end){array[start++]=value;}return array;} /**
     * The base implementation of `_.filter` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     */function baseFilter(collection,predicate){var result=[];baseEach(collection,function(value,index,collection){if(predicate(value,index,collection)){result.push(value);}});return result;} /**
     * The base implementation of `_.flatten` with support for restricting flattening.
     *
     * @private
     * @param {Array} array The array to flatten.
     * @param {boolean} [isDeep] Specify a deep flatten.
     * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
     * @param {Array} [result=[]] The initial result value.
     * @returns {Array} Returns the new flattened array.
     */function baseFlatten(array,isDeep,isStrict,result){result||(result=[]);var index=-1,length=array.length;while(++index<length){var value=array[index];if(isArrayLikeObject(value)&&(isStrict||isArray(value)||isArguments(value))){if(isDeep){ // Recursively flatten arrays (susceptible to call stack limits).
baseFlatten(value,isDeep,isStrict,result);}else {arrayPush(result,value);}}else if(!isStrict){result[result.length]=value;}}return result;} /**
     * The base implementation of `baseForIn` and `baseForOwn` which iterates
     * over `object` properties returned by `keysFunc` invoking `iteratee` for
     * each property. Iteratee functions may exit iteration early by explicitly
     * returning `false`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */var baseFor=createBaseFor(); /**
     * This function is like `baseFor` except that it iterates over properties
     * in the opposite order.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */var baseForRight=createBaseFor(true); /**
     * The base implementation of `_.forIn` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */function baseForIn(object,iteratee){return object==null?object:baseFor(object,iteratee,keysIn);} /**
     * The base implementation of `_.forOwn` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */function baseForOwn(object,iteratee){return object&&baseFor(object,iteratee,keys);} /**
     * The base implementation of `_.forOwnRight` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */function baseForOwnRight(object,iteratee){return object&&baseForRight(object,iteratee,keys);} /**
     * The base implementation of `_.functions` which creates an array of
     * `object` function property names filtered from those provided.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Array} props The property names to filter.
     * @returns {Array} Returns the new array of filtered property names.
     */function baseFunctions(object,props){return arrayFilter(props,function(key){return isFunction(object[key]);});} /**
     * The base implementation of `_.get` without support for default values.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @returns {*} Returns the resolved value.
     */function baseGet(object,path){path=isKey(path,object)?[path+'']:baseToPath(path);var index=0,length=path.length;while(object!=null&&index<length){object=object[path[index++]];}return index&&index==length?object:undefined;} /**
     * The base implementation of `_.has` without support for deep paths.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} key The key to check.
     * @returns {boolean} Returns `true` if `key` exists, else `false`.
     */function baseHas(object,key){ // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
// that are composed entirely of index properties, return `false` for
// `hasOwnProperty` checks of them.
return hasOwnProperty.call(object,key)||(typeof object==="undefined"?"undefined":_typeof(object))=='object'&&key in object&&getPrototypeOf(object)===null;} /**
     * The base implementation of `_.hasIn` without support for deep paths.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} key The key to check.
     * @returns {boolean} Returns `true` if `key` exists, else `false`.
     */function baseHasIn(object,key){return key in Object(object);} /**
     * The base implementation of `_.inRange` which doesn't coerce arguments to numbers.
     *
     * @private
     * @param {number} number The number to check.
     * @param {number} start The start of the range.
     * @param {number} end The end of the range.
     * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
     */function baseInRange(number,start,end){return number>=nativeMin(start,end)&&number<nativeMax(start,end);} /**
     * The base implementation of methods like `_.intersection`, without support
     * for iteratee shorthands, that accepts an array of arrays to inspect.
     *
     * @private
     * @param {Array} arrays The arrays to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of shared values.
     */function baseIntersection(arrays,iteratee,comparator){var includes=comparator?arrayIncludesWith:arrayIncludes,othLength=arrays.length,othIndex=othLength,caches=Array(othLength),result=[];while(othIndex--){var array=arrays[othIndex];if(othIndex&&iteratee){array=arrayMap(array,baseUnary(iteratee));}caches[othIndex]=!comparator&&(iteratee||array.length>=120)?new SetCache(othIndex&&array):undefined;}array=arrays[0];var index=-1,length=array.length,seen=caches[0];outer: while(++index<length){var value=array[index],computed=iteratee?iteratee(value):value;if(!(seen?cacheHas(seen,computed):includes(result,computed,comparator))){var othIndex=othLength;while(--othIndex){var cache=caches[othIndex];if(!(cache?cacheHas(cache,computed):includes(arrays[othIndex],computed,comparator))){continue outer;}}if(seen){seen.push(computed);}result.push(value);}}return result;} /**
     * The base implementation of `_.invoke` without support for individual
     * method arguments.
     *
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the method to invoke.
     * @param {Array} args The arguments to invoke the method with.
     * @returns {*} Returns the result of the invoked method.
     */function baseInvoke(object,path,args){if(!isKey(path,object)){path=baseToPath(path);object=parent(object,path);path=last(path);}var func=object==null?object:object[path];return func==null?undefined:apply(func,object,args);} /**
     * The base implementation of `_.isEqual` which supports partial comparisons
     * and tracks traversed objects.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {Function} [customizer] The function to customize comparisons.
     * @param {boolean} [bitmask] The bitmask of comparison flags.
     *  The bitmask may be composed of the following flags:
     *     1 - Unordered comparison
     *     2 - Partial comparison
     * @param {Object} [stack] Tracks traversed `value` and `other` objects.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     */function baseIsEqual(value,other,customizer,bitmask,stack){if(value===other){return true;}if(value==null||other==null||!isObject(value)&&!isObjectLike(other)){return value!==value&&other!==other;}return baseIsEqualDeep(value,other,baseIsEqual,customizer,bitmask,stack);} /**
     * A specialized version of `baseIsEqual` for arrays and objects which performs
     * deep comparisons and tracks traversed objects enabling objects with circular
     * references to be compared.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} [customizer] The function to customize comparisons.
     * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
     * @param {Object} [stack] Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */function baseIsEqualDeep(object,other,equalFunc,customizer,bitmask,stack){var objIsArr=isArray(object),othIsArr=isArray(other),objTag=arrayTag,othTag=arrayTag;if(!objIsArr){objTag=getTag(object);if(objTag==argsTag){objTag=objectTag;}else if(objTag!=objectTag){objIsArr=isTypedArray(object);}}if(!othIsArr){othTag=getTag(other);if(othTag==argsTag){othTag=objectTag;}else if(othTag!=objectTag){othIsArr=isTypedArray(other);}}var objIsObj=objTag==objectTag&&!isHostObject(object),othIsObj=othTag==objectTag&&!isHostObject(other),isSameTag=objTag==othTag;if(isSameTag&&!(objIsArr||objIsObj)){return equalByTag(object,other,objTag,equalFunc,customizer,bitmask);}var isPartial=bitmask&PARTIAL_COMPARE_FLAG;if(!isPartial){var objIsWrapped=objIsObj&&hasOwnProperty.call(object,'__wrapped__'),othIsWrapped=othIsObj&&hasOwnProperty.call(other,'__wrapped__');if(objIsWrapped||othIsWrapped){return equalFunc(objIsWrapped?object.value():object,othIsWrapped?other.value():other,customizer,bitmask,stack);}}if(!isSameTag){return false;}stack||(stack=new Stack());return (objIsArr?equalArrays:equalObjects)(object,other,equalFunc,customizer,bitmask,stack);} /**
     * The base implementation of `_.isMatch` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @param {Array} matchData The property names, values, and compare flags to match.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     */function baseIsMatch(object,source,matchData,customizer){var index=matchData.length,length=index,noCustomizer=!customizer;if(object==null){return !length;}object=Object(object);while(index--){var data=matchData[index];if(noCustomizer&&data[2]?data[1]!==object[data[0]]:!(data[0] in object)){return false;}}while(++index<length){data=matchData[index];var key=data[0],objValue=object[key],srcValue=data[1];if(noCustomizer&&data[2]){if(objValue===undefined&&!(key in object)){return false;}}else {var stack=new Stack(),result=customizer?customizer(objValue,srcValue,key,object,source,stack):undefined;if(!(result===undefined?baseIsEqual(srcValue,objValue,customizer,UNORDERED_COMPARE_FLAG|PARTIAL_COMPARE_FLAG,stack):result)){return false;}}}return true;} /**
     * The base implementation of `_.iteratee`.
     *
     * @private
     * @param {*} [value=_.identity] The value to convert to an iteratee.
     * @returns {Function} Returns the iteratee.
     */function baseIteratee(value){var type=typeof value==="undefined"?"undefined":_typeof(value);if(type=='function'){return value;}if(value==null){return identity;}if(type=='object'){return isArray(value)?baseMatchesProperty(value[0],value[1]):baseMatches(value);}return property(value);} /**
     * The base implementation of `_.keys` which doesn't skip the constructor
     * property of prototypes or treat sparse arrays as dense.
     *
     * @private
     * @type Function
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */function baseKeys(object){return nativeKeys(Object(object));} /**
     * The base implementation of `_.keysIn` which doesn't skip the constructor
     * property of prototypes or treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */function baseKeysIn(object){object=object==null?object:Object(object);var result=[];for(var key in object){result.push(key);}return result;} // Fallback for IE < 9 with es6-shim.
if(enumerate&&!propertyIsEnumerable.call({'valueOf':1},'valueOf')){baseKeysIn=function baseKeysIn(object){return iteratorToArray(enumerate(object));};} /**
     * The base implementation of `_.map` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */function baseMap(collection,iteratee){var index=-1,result=isArrayLike(collection)?Array(collection.length):[];baseEach(collection,function(value,key,collection){result[++index]=iteratee(value,key,collection);});return result;} /**
     * The base implementation of `_.matches` which doesn't clone `source`.
     *
     * @private
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new function.
     */function baseMatches(source){var matchData=getMatchData(source);if(matchData.length==1&&matchData[0][2]){var key=matchData[0][0],value=matchData[0][1];return function(object){if(object==null){return false;}return object[key]===value&&(value!==undefined||key in Object(object));};}return function(object){return object===source||baseIsMatch(object,source,matchData);};} /**
     * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
     *
     * @private
     * @param {string} path The path of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new function.
     */function baseMatchesProperty(path,srcValue){return function(object){var objValue=get(object,path);return objValue===undefined&&objValue===srcValue?hasIn(object,path):baseIsEqual(srcValue,objValue,undefined,UNORDERED_COMPARE_FLAG|PARTIAL_COMPARE_FLAG);};} /**
     * The base implementation of `_.merge` without support for multiple sources.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {Function} [customizer] The function to customize merged values.
     * @param {Object} [stack] Tracks traversed source values and their merged counterparts.
     */function baseMerge(object,source,customizer,stack){if(object===source){return;}var props=isArray(source)||isTypedArray(source)?undefined:keysIn(source);arrayEach(props||source,function(srcValue,key){if(props){key=srcValue;srcValue=source[key];}if(isObject(srcValue)){stack||(stack=new Stack());baseMergeDeep(object,source,key,baseMerge,customizer,stack);}else {var newValue=customizer?customizer(object[key],srcValue,key+'',object,source,stack):undefined;if(newValue===undefined){newValue=srcValue;}assignMergeValue(object,key,newValue);}});} /**
     * A specialized version of `baseMerge` for arrays and objects which performs
     * deep merges and tracks traversed objects enabling objects with circular
     * references to be merged.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {string} key The key of the value to merge.
     * @param {Function} mergeFunc The function to merge values.
     * @param {Function} [customizer] The function to customize assigned values.
     * @param {Object} [stack] Tracks traversed source values and their merged counterparts.
     */function baseMergeDeep(object,source,key,mergeFunc,customizer,stack){var objValue=object[key],srcValue=source[key],stacked=stack.get(srcValue)||stack.get(objValue);if(stacked){assignMergeValue(object,key,stacked);return;}var newValue=customizer?customizer(objValue,srcValue,key+'',object,source,stack):undefined,isCommon=newValue===undefined;if(isCommon){newValue=srcValue;if(isArray(srcValue)||isTypedArray(srcValue)){newValue=isArray(objValue)?objValue:isArrayLikeObject(objValue)?copyArray(objValue):baseClone(srcValue);}else if(isPlainObject(srcValue)||isArguments(srcValue)){newValue=isArguments(objValue)?toPlainObject(objValue):isObject(objValue)?objValue:baseClone(srcValue);}else {isCommon=isFunction(srcValue);}}stack.set(srcValue,newValue);if(isCommon){ // Recursively merge objects and arrays (susceptible to call stack limits).
mergeFunc(newValue,srcValue,customizer,stack);}assignMergeValue(object,key,newValue);} /**
     * The base implementation of `_.orderBy` without param guards.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
     * @param {string[]} orders The sort orders of `iteratees`.
     * @returns {Array} Returns the new sorted array.
     */function baseOrderBy(collection,iteratees,orders){var index=-1,toIteratee=getIteratee();iteratees=arrayMap(iteratees.length?iteratees:Array(1),function(iteratee){return toIteratee(iteratee);});var result=baseMap(collection,function(value,key,collection){var criteria=arrayMap(iteratees,function(iteratee){return iteratee(value);});return {'criteria':criteria,'index':++index,'value':value};});return baseSortBy(result,function(object,other){return compareMultiple(object,other,orders);});} /**
     * The base implementation of `_.pick` without support for individual
     * property names.
     *
     * @private
     * @param {Object} object The source object.
     * @param {string[]} props The property names to pick.
     * @returns {Object} Returns the new object.
     */function basePick(object,props){object=Object(object);return arrayReduce(props,function(result,key){if(key in object){result[key]=object[key];}return result;},{});} /**
     * The base implementation of  `_.pickBy` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The source object.
     * @param {Function} predicate The function invoked per property.
     * @returns {Object} Returns the new object.
     */function basePickBy(object,predicate){var result={};baseForIn(object,function(value,key){if(predicate(value)){result[key]=value;}});return result;} /**
     * The base implementation of `_.property` without support for deep paths.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @returns {Function} Returns the new function.
     */function baseProperty(key){return function(object){return object==null?undefined:object[key];};} /**
     * A specialized version of `baseProperty` which supports deep paths.
     *
     * @private
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new function.
     */function basePropertyDeep(path){return function(object){return baseGet(object,path);};} /**
     * The base implementation of `_.pullAll`.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @returns {Array} Returns `array`.
     */function basePullAll(array,values){return basePullAllBy(array,values);} /**
     * The base implementation of `_.pullAllBy` without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @returns {Array} Returns `array`.
     */function basePullAllBy(array,values,iteratee){var index=-1,length=values.length,seen=array;if(iteratee){seen=arrayMap(array,function(value){return iteratee(value);});}while(++index<length){var fromIndex=0,value=values[index],computed=iteratee?iteratee(value):value;while((fromIndex=baseIndexOf(seen,computed,fromIndex))>-1){if(seen!==array){splice.call(seen,fromIndex,1);}splice.call(array,fromIndex,1);}}return array;} /**
     * The base implementation of `_.pullAt` without support for individual
     * indexes or capturing the removed elements.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {number[]} indexes The indexes of elements to remove.
     * @returns {Array} Returns `array`.
     */function basePullAt(array,indexes){var length=array?indexes.length:0,lastIndex=length-1;while(length--){var index=indexes[length];if(lastIndex==length||index!=previous){var previous=index;if(isIndex(index)){splice.call(array,index,1);}else if(!isKey(index,array)){var path=baseToPath(index),object=parent(array,path);if(object!=null){delete object[last(path)];}}else {delete array[index];}}}return array;} /**
     * The base implementation of `_.random` without support for returning
     * floating-point numbers.
     *
     * @private
     * @param {number} lower The lower bound.
     * @param {number} upper The upper bound.
     * @returns {number} Returns the random number.
     */function baseRandom(lower,upper){return lower+nativeFloor(nativeRandom()*(upper-lower+1));} /**
     * The base implementation of `_.range` and `_.rangeRight` which doesn't
     * coerce arguments to numbers.
     *
     * @private
     * @param {number} start The start of the range.
     * @param {number} end The end of the range.
     * @param {number} step The value to increment or decrement by.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Array} Returns the new array of numbers.
     */function baseRange(start,end,step,fromRight){var index=-1,length=nativeMax(nativeCeil((end-start)/(step||1)),0),result=Array(length);while(length--){result[fromRight?length:++index]=start;start+=step;}return result;} /**
     * The base implementation of `_.set`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @param {Function} [customizer] The function to customize path creation.
     * @returns {Object} Returns `object`.
     */function baseSet(object,path,value,customizer){path=isKey(path,object)?[path+'']:baseToPath(path);var index=-1,length=path.length,lastIndex=length-1,nested=object;while(nested!=null&&++index<length){var key=path[index];if(isObject(nested)){var newValue=value;if(index!=lastIndex){var objValue=nested[key];newValue=customizer?customizer(objValue,key,nested):undefined;if(newValue===undefined){newValue=objValue==null?isIndex(path[index+1])?[]:{}:objValue;}}assignValue(nested,key,newValue);}nested=nested[key];}return object;} /**
     * The base implementation of `setData` without support for hot loop detection.
     *
     * @private
     * @param {Function} func The function to associate metadata with.
     * @param {*} data The metadata.
     * @returns {Function} Returns `func`.
     */var baseSetData=!metaMap?identity:function(func,data){metaMap.set(func,data);return func;}; /**
     * The base implementation of `_.slice` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */function baseSlice(array,start,end){var index=-1,length=array.length;if(start<0){start=-start>length?0:length+start;}end=end>length?length:end;if(end<0){end+=length;}length=start>end?0:end-start>>>0;start>>>=0;var result=Array(length);while(++index<length){result[index]=array[index+start];}return result;} /**
     * The base implementation of `_.some` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if any element passes the predicate check, else `false`.
     */function baseSome(collection,predicate){var result;baseEach(collection,function(value,index,collection){result=predicate(value,index,collection);return !result;});return !!result;} /**
     * The base implementation of `_.sortedIndex` and `_.sortedLastIndex` which
     * performs a binary search of `array` to determine the index at which `value`
     * should be inserted into `array` in order to maintain its sort order.
     *
     * @private
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     */function baseSortedIndex(array,value,retHighest){var low=0,high=array?array.length:low;if(typeof value=='number'&&value===value&&high<=HALF_MAX_ARRAY_LENGTH){while(low<high){var mid=low+high>>>1,computed=array[mid];if((retHighest?computed<=value:computed<value)&&computed!==null){low=mid+1;}else {high=mid;}}return high;}return baseSortedIndexBy(array,value,identity,retHighest);} /**
     * The base implementation of `_.sortedIndexBy` and `_.sortedLastIndexBy`
     * which invokes `iteratee` for `value` and each element of `array` to compute
     * their sort ranking. The iteratee is invoked with one argument; (value).
     *
     * @private
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function} iteratee The iteratee invoked per element.
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {number} Returns the index at which `value` should be inserted into `array`.
     */function baseSortedIndexBy(array,value,iteratee,retHighest){value=iteratee(value);var low=0,high=array?array.length:0,valIsNaN=value!==value,valIsNull=value===null,valIsUndef=value===undefined;while(low<high){var mid=nativeFloor((low+high)/2),computed=iteratee(array[mid]),isDef=computed!==undefined,isReflexive=computed===computed;if(valIsNaN){var setLow=isReflexive||retHighest;}else if(valIsNull){setLow=isReflexive&&isDef&&(retHighest||computed!=null);}else if(valIsUndef){setLow=isReflexive&&(retHighest||isDef);}else if(computed==null){setLow=false;}else {setLow=retHighest?computed<=value:computed<value;}if(setLow){low=mid+1;}else {high=mid;}}return nativeMin(high,MAX_ARRAY_INDEX);} /**
     * The base implementation of `_.sortedUniq`.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @returns {Array} Returns the new duplicate free array.
     */function baseSortedUniq(array){return baseSortedUniqBy(array);} /**
     * The base implementation of `_.sortedUniqBy` without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     */function baseSortedUniqBy(array,iteratee){var index=0,length=array.length,value=array[0],computed=iteratee?iteratee(value):value,seen=computed,resIndex=0,result=[value];while(++index<length){value=array[index],computed=iteratee?iteratee(value):value;if(!eq(computed,seen)){seen=computed;result[++resIndex]=value;}}return result;} /**
     * The base implementation of `_.toPath` which only converts `value` to a
     * path if it's not one.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {Array} Returns the property path array.
     */function baseToPath(value){return isArray(value)?value:stringToPath(value);} /**
     * The base implementation of `_.uniqBy` without support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     */function baseUniq(array,iteratee,comparator){var index=-1,includes=arrayIncludes,length=array.length,isCommon=true,result=[],seen=result;if(comparator){isCommon=false;includes=arrayIncludesWith;}else if(length>=LARGE_ARRAY_SIZE){var set=iteratee?null:createSet(array);if(set){return setToArray(set);}isCommon=false;includes=cacheHas;seen=new SetCache();}else {seen=iteratee?[]:result;}outer: while(++index<length){var value=array[index],computed=iteratee?iteratee(value):value;if(isCommon&&computed===computed){var seenIndex=seen.length;while(seenIndex--){if(seen[seenIndex]===computed){continue outer;}}if(iteratee){seen.push(computed);}result.push(value);}else if(!includes(seen,computed,comparator)){if(seen!==result){seen.push(computed);}result.push(value);}}return result;} /**
     * The base implementation of `_.unset`.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to unset.
     * @returns {boolean} Returns `true` if the property is deleted, else `false`.
     */function baseUnset(object,path){path=isKey(path,object)?[path+'']:baseToPath(path);object=parent(object,path);var key=last(path);return object!=null&&has(object,key)?delete object[key]:true;} /**
     * The base implementation of methods like `_.dropWhile` and `_.takeWhile`
     * without support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to query.
     * @param {Function} predicate The function invoked per iteration.
     * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Array} Returns the slice of `array`.
     */function baseWhile(array,predicate,isDrop,fromRight){var length=array.length,index=fromRight?length:-1;while((fromRight?index--:++index<length)&&predicate(array[index],index,array)){}return isDrop?baseSlice(array,fromRight?0:index,fromRight?index+1:length):baseSlice(array,fromRight?index+1:0,fromRight?length:index);} /**
     * The base implementation of `wrapperValue` which returns the result of
     * performing a sequence of actions on the unwrapped `value`, where each
     * successive action is supplied the return value of the previous.
     *
     * @private
     * @param {*} value The unwrapped value.
     * @param {Array} actions Actions to perform to resolve the unwrapped value.
     * @returns {*} Returns the resolved value.
     */function baseWrapperValue(value,actions){var result=value;if(result instanceof LazyWrapper){result=result.value();}return arrayReduce(actions,function(result,action){return action.func.apply(action.thisArg,arrayPush([result],action.args));},result);} /**
     * The base implementation of methods like `_.xor`, without support for
     * iteratee shorthands, that accepts an array of arrays to inspect.
     *
     * @private
     * @param {Array} arrays The arrays to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of values.
     */function baseXor(arrays,iteratee,comparator){var index=-1,length=arrays.length;while(++index<length){var result=result?arrayPush(baseDifference(result,arrays[index],iteratee,comparator),baseDifference(arrays[index],result,iteratee,comparator)):arrays[index];}return result&&result.length?baseUniq(result,iteratee,comparator):[];} /**
     * Creates a clone of `buffer`.
     *
     * @private
     * @param {ArrayBuffer} buffer The array buffer to clone.
     * @returns {ArrayBuffer} Returns the cloned array buffer.
     */function cloneBuffer(buffer){var Ctor=buffer.constructor,result=new Ctor(buffer.byteLength),view=new Uint8Array(result);view.set(new Uint8Array(buffer));return result;} /**
     * Creates a clone of `map`.
     *
     * @private
     * @param {Object} map The map to clone.
     * @returns {Object} Returns the cloned map.
     */function cloneMap(map){var Ctor=map.constructor;return arrayReduce(mapToArray(map),addMapEntry,new Ctor());} /**
     * Creates a clone of `regexp`.
     *
     * @private
     * @param {Object} regexp The regexp to clone.
     * @returns {Object} Returns the cloned regexp.
     */function cloneRegExp(regexp){var Ctor=regexp.constructor,result=new Ctor(regexp.source,reFlags.exec(regexp));result.lastIndex=regexp.lastIndex;return result;} /**
     * Creates a clone of `set`.
     *
     * @private
     * @param {Object} set The set to clone.
     * @returns {Object} Returns the cloned set.
     */function cloneSet(set){var Ctor=set.constructor;return arrayReduce(setToArray(set),addSetEntry,new Ctor());} /**
     * Creates a clone of the `symbol` object.
     *
     * @private
     * @param {Object} symbol The symbol object to clone.
     * @returns {Object} Returns the cloned symbol object.
     */function cloneSymbol(symbol){return _Symbol?Object(symbolValueOf.call(symbol)):{};} /**
     * Creates a clone of `typedArray`.
     *
     * @private
     * @param {Object} typedArray The typed array to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned typed array.
     */function cloneTypedArray(typedArray,isDeep){var buffer=typedArray.buffer,Ctor=typedArray.constructor;return new Ctor(isDeep?cloneBuffer(buffer):buffer,typedArray.byteOffset,typedArray.length);} /**
     * Creates an array that is the composition of partially applied arguments,
     * placeholders, and provided arguments into a single array of arguments.
     *
     * @private
     * @param {Array|Object} args The provided arguments.
     * @param {Array} partials The arguments to prepend to those provided.
     * @param {Array} holders The `partials` placeholder indexes.
     * @returns {Array} Returns the new array of composed arguments.
     */function composeArgs(args,partials,holders){var holdersLength=holders.length,argsIndex=-1,argsLength=nativeMax(args.length-holdersLength,0),leftIndex=-1,leftLength=partials.length,result=Array(leftLength+argsLength);while(++leftIndex<leftLength){result[leftIndex]=partials[leftIndex];}while(++argsIndex<holdersLength){result[holders[argsIndex]]=args[argsIndex];}while(argsLength--){result[leftIndex++]=args[argsIndex++];}return result;} /**
     * This function is like `composeArgs` except that the arguments composition
     * is tailored for `_.partialRight`.
     *
     * @private
     * @param {Array|Object} args The provided arguments.
     * @param {Array} partials The arguments to append to those provided.
     * @param {Array} holders The `partials` placeholder indexes.
     * @returns {Array} Returns the new array of composed arguments.
     */function composeArgsRight(args,partials,holders){var holdersIndex=-1,holdersLength=holders.length,argsIndex=-1,argsLength=nativeMax(args.length-holdersLength,0),rightIndex=-1,rightLength=partials.length,result=Array(argsLength+rightLength);while(++argsIndex<argsLength){result[argsIndex]=args[argsIndex];}var offset=argsIndex;while(++rightIndex<rightLength){result[offset+rightIndex]=partials[rightIndex];}while(++holdersIndex<holdersLength){result[offset+holders[holdersIndex]]=args[argsIndex++];}return result;} /**
     * Copies the values of `source` to `array`.
     *
     * @private
     * @param {Array} source The array to copy values from.
     * @param {Array} [array=[]] The array to copy values to.
     * @returns {Array} Returns `array`.
     */function copyArray(source,array){var index=-1,length=source.length;array||(array=Array(length));while(++index<length){array[index]=source[index];}return array;} /**
     * Copies properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy properties from.
     * @param {Array} props The property names to copy.
     * @param {Object} [object={}] The object to copy properties to.
     * @returns {Object} Returns `object`.
     */function copyObject(source,props,object){return copyObjectWith(source,props,object);} /**
     * This function is like `copyObject` except that it accepts a function to
     * customize copied values.
     *
     * @private
     * @param {Object} source The object to copy properties from.
     * @param {Array} props The property names to copy.
     * @param {Object} [object={}] The object to copy properties to.
     * @param {Function} [customizer] The function to customize copied values.
     * @returns {Object} Returns `object`.
     */function copyObjectWith(source,props,object,customizer){object||(object={});var index=-1,length=props.length;while(++index<length){var key=props[index],newValue=customizer?customizer(object[key],source[key],key,object,source):source[key];assignValue(object,key,newValue);}return object;} /**
     * Copies own symbol properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy symbols from.
     * @param {Object} [object={}] The object to copy symbols to.
     * @returns {Object} Returns `object`.
     */function copySymbols(source,object){return copyObject(source,getSymbols(source),object);} /**
     * Creates a function like `_.groupBy`.
     *
     * @private
     * @param {Function} setter The function to set keys and values of the accumulator object.
     * @param {Function} [initializer] The function to initialize the accumulator object.
     * @returns {Function} Returns the new aggregator function.
     */function createAggregator(setter,initializer){return function(collection,iteratee){var result=initializer?initializer():{};iteratee=getIteratee(iteratee);if(isArray(collection)){var index=-1,length=collection.length;while(++index<length){var value=collection[index];setter(result,value,iteratee(value),collection);}}else {baseEach(collection,function(value,key,collection){setter(result,value,iteratee(value),collection);});}return result;};} /**
     * Creates a function like `_.assign`.
     *
     * @private
     * @param {Function} assigner The function to assign values.
     * @returns {Function} Returns the new assigner function.
     */function createAssigner(assigner){return rest(function(object,sources){var index=-1,length=sources.length,customizer=length>1?sources[length-1]:undefined,guard=length>2?sources[2]:undefined;customizer=typeof customizer=='function'?(length--,customizer):undefined;if(guard&&isIterateeCall(sources[0],sources[1],guard)){customizer=length<3?undefined:customizer;length=1;}object=Object(object);while(++index<length){var source=sources[index];if(source){assigner(object,source,customizer);}}return object;});} /**
     * Creates a `baseEach` or `baseEachRight` function.
     *
     * @private
     * @param {Function} eachFunc The function to iterate over a collection.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */function createBaseEach(eachFunc,fromRight){return function(collection,iteratee){if(collection==null){return collection;}if(!isArrayLike(collection)){return eachFunc(collection,iteratee);}var length=collection.length,index=fromRight?length:-1,iterable=Object(collection);while(fromRight?index--:++index<length){if(iteratee(iterable[index],index,iterable)===false){break;}}return collection;};} /**
     * Creates a base function for methods like `_.forIn`.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */function createBaseFor(fromRight){return function(object,iteratee,keysFunc){var index=-1,iterable=Object(object),props=keysFunc(object),length=props.length;while(length--){var key=props[fromRight?length:++index];if(iteratee(iterable[key],key,iterable)===false){break;}}return object;};} /**
     * Creates a function that wraps `func` to invoke it with the optional `this`
     * binding of `thisArg`.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper` for more details.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @returns {Function} Returns the new wrapped function.
     */function createBaseWrapper(func,bitmask,thisArg){var isBind=bitmask&BIND_FLAG,Ctor=createCtorWrapper(func);function wrapper(){var fn=this&&this!==root&&this instanceof wrapper?Ctor:func;return fn.apply(isBind?thisArg:this,arguments);}return wrapper;} /**
     * Creates a function like `_.lowerFirst`.
     *
     * @private
     * @param {string} methodName The name of the `String` case method to use.
     * @returns {Function} Returns the new function.
     */function createCaseFirst(methodName){return function(string){string=toString(string);var strSymbols=reHasComplexSymbol.test(string)?stringToArray(string):undefined,chr=strSymbols?strSymbols[0]:string.charAt(0),trailing=strSymbols?strSymbols.slice(1).join(''):string.slice(1);return chr[methodName]()+trailing;};} /**
     * Creates a function like `_.camelCase`.
     *
     * @private
     * @param {Function} callback The function to combine each word.
     * @returns {Function} Returns the new compounder function.
     */function createCompounder(callback){return function(string){return arrayReduce(words(deburr(string)),callback,'');};} /**
     * Creates a function that produces an instance of `Ctor` regardless of
     * whether it was invoked as part of a `new` expression or by `call` or `apply`.
     *
     * @private
     * @param {Function} Ctor The constructor to wrap.
     * @returns {Function} Returns the new wrapped function.
     */function createCtorWrapper(Ctor){return function(){ // Use a `switch` statement to work with class constructors.
// See http://ecma-international.org/ecma-262/6.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
// for more details.
var args=arguments;switch(args.length){case 0:return new Ctor();case 1:return new Ctor(args[0]);case 2:return new Ctor(args[0],args[1]);case 3:return new Ctor(args[0],args[1],args[2]);case 4:return new Ctor(args[0],args[1],args[2],args[3]);case 5:return new Ctor(args[0],args[1],args[2],args[3],args[4]);case 6:return new Ctor(args[0],args[1],args[2],args[3],args[4],args[5]);case 7:return new Ctor(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);}var thisBinding=baseCreate(Ctor.prototype),result=Ctor.apply(thisBinding,args); // Mimic the constructor's `return` behavior.
// See https://es5.github.io/#x13.2.2 for more details.
return isObject(result)?result:thisBinding;};} /**
     * Creates a function that wraps `func` to enable currying.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper` for more details.
     * @param {number} arity The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */function createCurryWrapper(func,bitmask,arity){var Ctor=createCtorWrapper(func);function wrapper(){var length=arguments.length,index=length,args=Array(length),fn=this&&this!==root&&this instanceof wrapper?Ctor:func,placeholder=wrapper.placeholder;while(index--){args[index]=arguments[index];}var holders=length<3&&args[0]!==placeholder&&args[length-1]!==placeholder?[]:replaceHolders(args,placeholder);length-=holders.length;return length<arity?createRecurryWrapper(func,bitmask,createHybridWrapper,placeholder,undefined,args,holders,undefined,undefined,arity-length):apply(fn,this,args);}return wrapper;} /**
     * Creates a `_.flow` or `_.flowRight` function.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new flow function.
     */function createFlow(fromRight){return rest(function(funcs){funcs=baseFlatten(funcs);var length=funcs.length,index=length,prereq=LodashWrapper.prototype.thru;if(fromRight){funcs.reverse();}while(index--){var func=funcs[index];if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}if(prereq&&!wrapper&&getFuncName(func)=='wrapper'){var wrapper=new LodashWrapper([],true);}}index=wrapper?index:length;while(++index<length){func=funcs[index];var funcName=getFuncName(func),data=funcName=='wrapper'?getData(func):undefined;if(data&&isLaziable(data[0])&&data[1]==(ARY_FLAG|CURRY_FLAG|PARTIAL_FLAG|REARG_FLAG)&&!data[4].length&&data[9]==1){wrapper=wrapper[getFuncName(data[0])].apply(wrapper,data[3]);}else {wrapper=func.length==1&&isLaziable(func)?wrapper[funcName]():wrapper.thru(func);}}return function(){var args=arguments,value=args[0];if(wrapper&&args.length==1&&isArray(value)&&value.length>=LARGE_ARRAY_SIZE){return wrapper.plant(value).value();}var index=0,result=length?funcs[index].apply(this,args):value;while(++index<length){result=funcs[index].call(this,result);}return result;};});} /**
     * Creates a function that wraps `func` to invoke it with optional `this`
     * binding of `thisArg`, partial application, and currying.
     *
     * @private
     * @param {Function|string} func The function or method name to wrap.
     * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper` for more details.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to prepend to those provided to the new function.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [partialsRight] The arguments to append to those provided to the new function.
     * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */function createHybridWrapper(func,bitmask,thisArg,partials,holders,partialsRight,holdersRight,argPos,ary,arity){var isAry=bitmask&ARY_FLAG,isBind=bitmask&BIND_FLAG,isBindKey=bitmask&BIND_KEY_FLAG,isCurry=bitmask&CURRY_FLAG,isCurryRight=bitmask&CURRY_RIGHT_FLAG,isFlip=bitmask&FLIP_FLAG,Ctor=isBindKey?undefined:createCtorWrapper(func);function wrapper(){var length=arguments.length,index=length,args=Array(length);while(index--){args[index]=arguments[index];}if(partials){args=composeArgs(args,partials,holders);}if(partialsRight){args=composeArgsRight(args,partialsRight,holdersRight);}if(isCurry||isCurryRight){var placeholder=wrapper.placeholder,argsHolders=replaceHolders(args,placeholder);length-=argsHolders.length;if(length<arity){return createRecurryWrapper(func,bitmask,createHybridWrapper,placeholder,thisArg,args,argsHolders,argPos,ary,arity-length);}}var thisBinding=isBind?thisArg:this,fn=isBindKey?thisBinding[func]:func;if(argPos){args=reorder(args,argPos);}else if(isFlip&&args.length>1){args.reverse();}if(isAry&&ary<args.length){args.length=ary;}if(this&&this!==root&&this instanceof wrapper){fn=Ctor||createCtorWrapper(fn);}return fn.apply(thisBinding,args);}return wrapper;} /**
     * Creates a function like `_.over`.
     *
     * @private
     * @param {Function} arrayFunc The function to iterate over iteratees.
     * @returns {Function} Returns the new invoker function.
     */function createOver(arrayFunc){return rest(function(iteratees){iteratees=arrayMap(baseFlatten(iteratees),getIteratee());return rest(function(args){var thisArg=this;return arrayFunc(iteratees,function(iteratee){return apply(iteratee,thisArg,args);});});});} /**
     * Creates the padding for `string` based on `length`. The `chars` string
     * is truncated if the number of characters exceeds `length`.
     *
     * @private
     * @param {string} string The string to create padding for.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padding for `string`.
     */function createPadding(string,length,chars){length=toInteger(length);var strLength=stringSize(string);if(!length||strLength>=length){return '';}var padLength=length-strLength;chars=chars===undefined?' ':chars+'';var result=repeat(chars,nativeCeil(padLength/stringSize(chars)));return reHasComplexSymbol.test(chars)?stringToArray(result).slice(0,padLength).join(''):result.slice(0,padLength);} /**
     * Creates a function that wraps `func` to invoke it with the optional `this`
     * binding of `thisArg` and the `partials` prepended to those provided to
     * the wrapper.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper` for more details.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {Array} partials The arguments to prepend to those provided to the new function.
     * @returns {Function} Returns the new wrapped function.
     */function createPartialWrapper(func,bitmask,thisArg,partials){var isBind=bitmask&BIND_FLAG,Ctor=createCtorWrapper(func);function wrapper(){var argsIndex=-1,argsLength=arguments.length,leftIndex=-1,leftLength=partials.length,args=Array(leftLength+argsLength),fn=this&&this!==root&&this instanceof wrapper?Ctor:func;while(++leftIndex<leftLength){args[leftIndex]=partials[leftIndex];}while(argsLength--){args[leftIndex++]=arguments[++argsIndex];}return apply(fn,isBind?thisArg:this,args);}return wrapper;} /**
     * Creates a `_.range` or `_.rangeRight` function.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new range function.
     */function createRange(fromRight){return function(start,end,step){if(step&&typeof step!='number'&&isIterateeCall(start,end,step)){end=step=undefined;} // Ensure the sign of `-0` is preserved.
start=toNumber(start);start=start===start?start:0;if(end===undefined){end=start;start=0;}else {end=toNumber(end)||0;}step=step===undefined?start<end?1:-1:toNumber(step)||0;return baseRange(start,end,step,fromRight);};} /**
     * Creates a function that wraps `func` to continue currying.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper` for more details.
     * @param {Function} wrapFunc The function to create the `func` wrapper.
     * @param {*} placeholder The placeholder to replace.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to prepend to those provided to the new function.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */function createRecurryWrapper(func,bitmask,wrapFunc,placeholder,thisArg,partials,holders,argPos,ary,arity){var isCurry=bitmask&CURRY_FLAG,newArgPos=argPos?copyArray(argPos):undefined,newsHolders=isCurry?holders:undefined,newHoldersRight=isCurry?undefined:holders,newPartials=isCurry?partials:undefined,newPartialsRight=isCurry?undefined:partials;bitmask|=isCurry?PARTIAL_FLAG:PARTIAL_RIGHT_FLAG;bitmask&=~(isCurry?PARTIAL_RIGHT_FLAG:PARTIAL_FLAG);if(!(bitmask&CURRY_BOUND_FLAG)){bitmask&=~(BIND_FLAG|BIND_KEY_FLAG);}var newData=[func,bitmask,thisArg,newPartials,newsHolders,newPartialsRight,newHoldersRight,newArgPos,ary,arity],result=wrapFunc.apply(undefined,newData);if(isLaziable(func)){setData(result,newData);}result.placeholder=placeholder;return result;} /**
     * Creates a function like `_.round`.
     *
     * @private
     * @param {string} methodName The name of the `Math` method to use when rounding.
     * @returns {Function} Returns the new round function.
     */function createRound(methodName){var func=Math[methodName];return function(number,precision){number=toNumber(number);precision=toInteger(precision);if(precision){ // Shift with exponential notation to avoid floating-point issues.
// See [MDN](https://mdn.io/round#Examples) for more details.
var pair=(toString(number)+'e').split('e'),value=func(pair[0]+'e'+ (+pair[1]+precision));pair=(toString(value)+'e').split('e');return +(pair[0]+'e'+ (+pair[1]-precision));}return func(number);};} /**
     * Creates a set of `values`.
     *
     * @private
     * @param {Array} values The values to add to the set.
     * @returns {Object} Returns the new set.
     */var createSet=!(Set&&new Set([1,2]).size===2)?noop:function(values){return new Set(values);}; /**
     * Creates a function that either curries or invokes `func` with optional
     * `this` binding and partially applied arguments.
     *
     * @private
     * @param {Function|string} func The function or method name to wrap.
     * @param {number} bitmask The bitmask of wrapper flags.
     *  The bitmask may be composed of the following flags:
     *     1 - `_.bind`
     *     2 - `_.bindKey`
     *     4 - `_.curry` or `_.curryRight` of a bound function
     *     8 - `_.curry`
     *    16 - `_.curryRight`
     *    32 - `_.partial`
     *    64 - `_.partialRight`
     *   128 - `_.rearg`
     *   256 - `_.ary`
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to be partially applied.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */function createWrapper(func,bitmask,thisArg,partials,holders,argPos,ary,arity){var isBindKey=bitmask&BIND_KEY_FLAG;if(!isBindKey&&typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}var length=partials?partials.length:0;if(!length){bitmask&=~(PARTIAL_FLAG|PARTIAL_RIGHT_FLAG);partials=holders=undefined;}ary=ary===undefined?ary:nativeMax(toInteger(ary),0);arity=arity===undefined?arity:toInteger(arity);length-=holders?holders.length:0;if(bitmask&PARTIAL_RIGHT_FLAG){var partialsRight=partials,holdersRight=holders;partials=holders=undefined;}var data=isBindKey?undefined:getData(func),newData=[func,bitmask,thisArg,partials,holders,partialsRight,holdersRight,argPos,ary,arity];if(data){mergeData(newData,data);}func=newData[0];bitmask=newData[1];thisArg=newData[2];partials=newData[3];holders=newData[4];arity=newData[9]=newData[9]==null?isBindKey?0:func.length:nativeMax(newData[9]-length,0);if(!arity&&bitmask&(CURRY_FLAG|CURRY_RIGHT_FLAG)){bitmask&=~(CURRY_FLAG|CURRY_RIGHT_FLAG);}if(!bitmask||bitmask==BIND_FLAG){var result=createBaseWrapper(func,bitmask,thisArg);}else if(bitmask==CURRY_FLAG||bitmask==CURRY_RIGHT_FLAG){result=createCurryWrapper(func,bitmask,arity);}else if((bitmask==PARTIAL_FLAG||bitmask==(BIND_FLAG|PARTIAL_FLAG))&&!holders.length){result=createPartialWrapper(func,bitmask,thisArg,partials);}else {result=createHybridWrapper.apply(undefined,newData);}var setter=data?baseSetData:setData;return setter(result,newData);} /**
     * A specialized version of `baseIsEqualDeep` for arrays with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Array} array The array to compare.
     * @param {Array} other The other array to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} [customizer] The function to customize comparisons.
     * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
     * @param {Object} [stack] Tracks traversed `array` and `other` objects.
     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
     */function equalArrays(array,other,equalFunc,customizer,bitmask,stack){var index=-1,isPartial=bitmask&PARTIAL_COMPARE_FLAG,isUnordered=bitmask&UNORDERED_COMPARE_FLAG,arrLength=array.length,othLength=other.length;if(arrLength!=othLength&&!(isPartial&&othLength>arrLength)){return false;} // Assume cyclic values are equal.
var stacked=stack.get(array);if(stacked){return stacked==other;}var result=true;stack.set(array,other); // Ignore non-index properties.
while(++index<arrLength){var arrValue=array[index],othValue=other[index];if(customizer){var compared=isPartial?customizer(othValue,arrValue,index,other,array,stack):customizer(arrValue,othValue,index,array,other,stack);}if(compared!==undefined){if(compared){continue;}result=false;break;} // Recursively compare arrays (susceptible to call stack limits).
if(isUnordered){if(!arraySome(other,function(othValue){return arrValue===othValue||equalFunc(arrValue,othValue,customizer,bitmask,stack);})){result=false;break;}}else if(!(arrValue===othValue||equalFunc(arrValue,othValue,customizer,bitmask,stack))){result=false;break;}}stack['delete'](array);return result;} /**
     * A specialized version of `baseIsEqualDeep` for comparing objects of
     * the same `toStringTag`.
     *
     * **Note:** This function only supports comparing values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {string} tag The `toStringTag` of the objects to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} [customizer] The function to customize comparisons.
     * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */function equalByTag(object,other,tag,equalFunc,customizer,bitmask){switch(tag){case arrayBufferTag:if(object.byteLength!=other.byteLength||!equalFunc(new Uint8Array(object),new Uint8Array(other))){return false;}return true;case boolTag:case dateTag: // Coerce dates and booleans to numbers, dates to milliseconds and booleans
// to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
return +object==+other;case errorTag:return object.name==other.name&&object.message==other.message;case numberTag: // Treat `NaN` vs. `NaN` as equal.
return object!=+object?other!=+other:object==+other;case regexpTag:case stringTag: // Coerce regexes to strings and treat strings primitives and string
// objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
return object==other+'';case mapTag:var convert=mapToArray;case setTag:var isPartial=bitmask&PARTIAL_COMPARE_FLAG;convert||(convert=setToArray); // Recursively compare objects (susceptible to call stack limits).
return (isPartial||object.size==other.size)&&equalFunc(convert(object),convert(other),customizer,bitmask|UNORDERED_COMPARE_FLAG);case symbolTag:return !!_Symbol&&symbolValueOf.call(object)==symbolValueOf.call(other);}return false;} /**
     * A specialized version of `baseIsEqualDeep` for objects with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} [customizer] The function to customize comparisons.
     * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
     * @param {Object} [stack] Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */function equalObjects(object,other,equalFunc,customizer,bitmask,stack){var isPartial=bitmask&PARTIAL_COMPARE_FLAG,isUnordered=bitmask&UNORDERED_COMPARE_FLAG,objProps=keys(object),objLength=objProps.length,othProps=keys(other),othLength=othProps.length;if(objLength!=othLength&&!isPartial){return false;}var index=objLength;while(index--){var key=objProps[index];if(!(isPartial?key in other:baseHas(other,key))||!(isUnordered||key==othProps[index])){return false;}} // Assume cyclic values are equal.
var stacked=stack.get(object);if(stacked){return stacked==other;}var result=true;stack.set(object,other);var skipCtor=isPartial;while(++index<objLength){key=objProps[index];var objValue=object[key],othValue=other[key];if(customizer){var compared=isPartial?customizer(othValue,objValue,key,other,object,stack):customizer(objValue,othValue,key,object,other,stack);} // Recursively compare objects (susceptible to call stack limits).
if(!(compared===undefined?objValue===othValue||equalFunc(objValue,othValue,customizer,bitmask,stack):compared)){result=false;break;}skipCtor||(skipCtor=key=='constructor');}if(result&&!skipCtor){var objCtor=object.constructor,othCtor=other.constructor; // Non `Object` object instances with different constructors are not equal.
if(objCtor!=othCtor&&'constructor' in object&&'constructor' in other&&!(typeof objCtor=='function'&&objCtor instanceof objCtor&&typeof othCtor=='function'&&othCtor instanceof othCtor)){result=false;}}stack['delete'](object);return result;} /**
     * Gets metadata for `func`.
     *
     * @private
     * @param {Function} func The function to query.
     * @returns {*} Returns the metadata for `func`.
     */var getData=!metaMap?noop:function(func){return metaMap.get(func);}; /**
     * Gets the name of `func`.
     *
     * @private
     * @param {Function} func The function to query.
     * @returns {string} Returns the function name.
     */function getFuncName(func){var result=func.name+'',array=realNames[result],length=array?array.length:0;while(length--){var data=array[length],otherFunc=data.func;if(otherFunc==null||otherFunc==func){return data.name;}}return result;} /**
     * Gets the appropriate "iteratee" function. If the `_.iteratee` method is
     * customized this function returns the custom method, otherwise it returns
     * `baseIteratee`. If arguments are provided the chosen function is invoked
     * with them and its result is returned.
     *
     * @private
     * @param {*} [value] The value to convert to an iteratee.
     * @param {number} [arity] The arity of the created iteratee.
     * @returns {Function} Returns the chosen function or its result.
     */function getIteratee(){var result=lodash.iteratee||iteratee;result=result===iteratee?baseIteratee:result;return arguments.length?result(arguments[0],arguments[1]):result;} /**
     * Gets the "length" property value of `object`.
     *
     * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
     * that affects Safari on at least iOS 8.1-8.3 ARM64.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {*} Returns the "length" value.
     */var getLength=baseProperty('length'); /**
     * Gets the property names, values, and compare flags of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the match data of `object`.
     */function getMatchData(object){var result=toPairs(object),length=result.length;while(length--){result[length][2]=isStrictComparable(result[length][1]);}return result;} /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */function getNative(object,key){var value=object==null?undefined:object[key];return isNative(value)?value:undefined;} /**
     * Creates an array of the own symbol properties of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of symbols.
     */var getSymbols=getOwnPropertySymbols||function(){return [];}; /**
     * Gets the `toStringTag` of `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */function getTag(value){return objectToString.call(value);} // Fallback for IE 11 providing `toStringTag` values for maps and sets.
if(Map&&getTag(new Map())!=mapTag||Set&&getTag(new Set())!=setTag){getTag=function getTag(value){var result=objectToString.call(value),Ctor=result==objectTag?value.constructor:null,ctorString=typeof Ctor=='function'?funcToString.call(Ctor):'';if(ctorString){if(ctorString==mapCtorString){return mapTag;}if(ctorString==setCtorString){return setTag;}}return result;};} /**
     * Gets the view, applying any `transforms` to the `start` and `end` positions.
     *
     * @private
     * @param {number} start The start of the view.
     * @param {number} end The end of the view.
     * @param {Array} transforms The transformations to apply to the view.
     * @returns {Object} Returns an object containing the `start` and `end`
     *  positions of the view.
     */function getView(start,end,transforms){var index=-1,length=transforms.length;while(++index<length){var data=transforms[index],size=data.size;switch(data.type){case 'drop':start+=size;break;case 'dropRight':end-=size;break;case 'take':end=nativeMin(end,start+size);break;case 'takeRight':start=nativeMax(start,end-size);break;}}return {'start':start,'end':end};} /**
     * Checks if `path` exists on `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @param {Function} hasFunc The function to check properties.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     */function hasPath(object,path,hasFunc){if(object==null){return false;}var result=hasFunc(object,path);if(!result&&!isKey(path)){path=baseToPath(path);object=parent(object,path);if(object!=null){path=last(path);result=hasFunc(object,path);}}return result||isLength(object&&object.length)&&isIndex(path,object.length)&&(isArray(object)||isString(object)||isArguments(object));} /**
     * Initializes an array clone.
     *
     * @private
     * @param {Array} array The array to clone.
     * @returns {Array} Returns the initialized clone.
     */function initCloneArray(array){var length=array.length,result=array.constructor(length); // Add properties assigned by `RegExp#exec`.
if(length&&typeof array[0]=='string'&&hasOwnProperty.call(array,'index')){result.index=array.index;result.input=array.input;}return result;} /**
     * Initializes an object clone.
     *
     * @private
     * @param {Object} object The object to clone.
     * @returns {Object} Returns the initialized clone.
     */function initCloneObject(object){var Ctor=object.constructor;return baseCreate(isFunction(Ctor)?Ctor.prototype:undefined);} /**
     * Initializes an object clone based on its `toStringTag`.
     *
     * **Note:** This function only supports cloning values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to clone.
     * @param {string} tag The `toStringTag` of the object to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the initialized clone.
     */function initCloneByTag(object,tag,isDeep){var Ctor=object.constructor;switch(tag){case arrayBufferTag:return cloneBuffer(object);case boolTag:case dateTag:return new Ctor(+object);case float32Tag:case float64Tag:case int8Tag:case int16Tag:case int32Tag:case uint8Tag:case uint8ClampedTag:case uint16Tag:case uint32Tag:return cloneTypedArray(object,isDeep);case mapTag:return cloneMap(object);case numberTag:case stringTag:return new Ctor(object);case regexpTag:return cloneRegExp(object);case setTag:return cloneSet(object);case symbolTag:return cloneSymbol(object);}} /**
     * Creates an array of index keys for `object` values of arrays,
     * `arguments` objects, and strings, otherwise `null` is returned.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array|null} Returns index keys, else `null`.
     */function indexKeys(object){var length=object?object.length:undefined;return isLength(length)&&(isArray(object)||isString(object)||isArguments(object))?baseTimes(length,String):null;} /**
     * Checks if the provided arguments are from an iteratee call.
     *
     * @private
     * @param {*} value The potential iteratee value argument.
     * @param {*} index The potential iteratee index or key argument.
     * @param {*} object The potential iteratee object argument.
     * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
     */function isIterateeCall(value,index,object){if(!isObject(object)){return false;}var type=typeof index==="undefined"?"undefined":_typeof(index);if(type=='number'?isArrayLike(object)&&isIndex(index,object.length):type=='string'&&index in object){return eq(object[index],value);}return false;} /**
     * Checks if `value` is a property name and not a property path.
     *
     * @private
     * @param {*} value The value to check.
     * @param {Object} [object] The object to query keys on.
     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
     */function isKey(value,object){if(typeof value=='number'){return true;}return !isArray(value)&&(reIsPlainProp.test(value)||!reIsDeepProp.test(value)||object!=null&&value in Object(object));} /**
     * Checks if `value` is suitable for use as unique object key.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
     */function isKeyable(value){var type=typeof value==="undefined"?"undefined":_typeof(value);return type=='number'||type=='boolean'||type=='string'&&value!=='__proto__'||value==null;} /**
     * Checks if `func` has a lazy counterpart.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` has a lazy counterpart, else `false`.
     */function isLaziable(func){var funcName=getFuncName(func),other=lodash[funcName];if(typeof other!='function'||!(funcName in LazyWrapper.prototype)){return false;}if(func===other){return true;}var data=getData(other);return !!data&&func===data[0];} /**
     * Checks if `value` is likely a prototype object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
     */function isPrototype(value){var Ctor=value&&value.constructor,proto=typeof Ctor=='function'&&Ctor.prototype||objectProto;return value===proto;} /**
     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` if suitable for strict
     *  equality comparisons, else `false`.
     */function isStrictComparable(value){return value===value&&!isObject(value);} /**
     * Merges the function metadata of `source` into `data`.
     *
     * Merging metadata reduces the number of wrappers used to invoke a function.
     * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
     * may be applied regardless of execution order. Methods like `_.ary` and `_.rearg`
     * modify function arguments, making the order in which they are executed important,
     * preventing the merging of metadata. However, we make an exception for a safe
     * combined case where curried functions have `_.ary` and or `_.rearg` applied.
     *
     * @private
     * @param {Array} data The destination metadata.
     * @param {Array} source The source metadata.
     * @returns {Array} Returns `data`.
     */function mergeData(data,source){var bitmask=data[1],srcBitmask=source[1],newBitmask=bitmask|srcBitmask,isCommon=newBitmask<(BIND_FLAG|BIND_KEY_FLAG|ARY_FLAG);var isCombo=srcBitmask==ARY_FLAG&&bitmask==CURRY_FLAG||srcBitmask==ARY_FLAG&&bitmask==REARG_FLAG&&data[7].length<=source[8]||srcBitmask==(ARY_FLAG|REARG_FLAG)&&source[7].length<=source[8]&&bitmask==CURRY_FLAG; // Exit early if metadata can't be merged.
if(!(isCommon||isCombo)){return data;} // Use source `thisArg` if available.
if(srcBitmask&BIND_FLAG){data[2]=source[2]; // Set when currying a bound function.
newBitmask|=bitmask&BIND_FLAG?0:CURRY_BOUND_FLAG;} // Compose partial arguments.
var value=source[3];if(value){var partials=data[3];data[3]=partials?composeArgs(partials,value,source[4]):copyArray(value);data[4]=partials?replaceHolders(data[3],PLACEHOLDER):copyArray(source[4]);} // Compose partial right arguments.
value=source[5];if(value){partials=data[5];data[5]=partials?composeArgsRight(partials,value,source[6]):copyArray(value);data[6]=partials?replaceHolders(data[5],PLACEHOLDER):copyArray(source[6]);} // Use source `argPos` if available.
value=source[7];if(value){data[7]=copyArray(value);} // Use source `ary` if it's smaller.
if(srcBitmask&ARY_FLAG){data[8]=data[8]==null?source[8]:nativeMin(data[8],source[8]);} // Use source `arity` if one is not provided.
if(data[9]==null){data[9]=source[9];} // Use source `func` and merge bitmasks.
data[0]=source[0];data[1]=newBitmask;return data;} /**
     * Used by `_.defaultsDeep` to customize its `_.merge` use.
     *
     * @private
     * @param {*} objValue The destination value.
     * @param {*} srcValue The source value.
     * @param {string} key The key of the property to merge.
     * @param {Object} object The parent object of `objValue`.
     * @param {Object} source The parent object of `srcValue`.
     * @param {Object} [stack] Tracks traversed source values and their merged counterparts.
     * @returns {*} Returns the value to assign.
     */function mergeDefaults(objValue,srcValue,key,object,source,stack){if(isObject(objValue)&&isObject(srcValue)){stack.set(srcValue,objValue);baseMerge(objValue,srcValue,mergeDefaults,stack);}return objValue===undefined?baseClone(srcValue):objValue;} /**
     * Gets the parent value at `path` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} path The path to get the parent value of.
     * @returns {*} Returns the parent value.
     */function parent(object,path){return path.length==1?object:get(object,baseSlice(path,0,-1));} /**
     * Reorder `array` according to the specified indexes where the element at
     * the first index is assigned as the first element, the element at
     * the second index is assigned as the second element, and so on.
     *
     * @private
     * @param {Array} array The array to reorder.
     * @param {Array} indexes The arranged array indexes.
     * @returns {Array} Returns `array`.
     */function reorder(array,indexes){var arrLength=array.length,length=nativeMin(indexes.length,arrLength),oldArray=copyArray(array);while(length--){var index=indexes[length];array[length]=isIndex(index,arrLength)?oldArray[index]:undefined;}return array;} /**
     * Sets metadata for `func`.
     *
     * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
     * period of time, it will trip its breaker and transition to an identity function
     * to avoid garbage collection pauses in V8. See [V8 issue 2070](https://code.google.com/p/v8/issues/detail?id=2070)
     * for more details.
     *
     * @private
     * @param {Function} func The function to associate metadata with.
     * @param {*} data The metadata.
     * @returns {Function} Returns `func`.
     */var setData=function(){var count=0,lastCalled=0;return function(key,value){var stamp=now(),remaining=HOT_SPAN-(stamp-lastCalled);lastCalled=stamp;if(remaining>0){if(++count>=HOT_COUNT){return key;}}else {count=0;}return baseSetData(key,value);};}(); /**
     * Converts `string` to a property path array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the property path array.
     */function stringToPath(string){var result=[];toString(string).replace(rePropName,function(match,number,quote,string){result.push(quote?string.replace(reEscapeChar,'$1'):number||match);});return result;} /**
     * Converts `value` to an array-like object if it's not one.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {Array} Returns the array-like object.
     */function toArrayLikeObject(value){return isArrayLikeObject(value)?value:[];} /**
     * Converts `value` to a function if it's not one.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {Function} Returns the function.
     */function toFunction(value){return typeof value=='function'?value:identity;} /**
     * Creates a clone of `wrapper`.
     *
     * @private
     * @param {Object} wrapper The wrapper to clone.
     * @returns {Object} Returns the cloned wrapper.
     */function wrapperClone(wrapper){if(wrapper instanceof LazyWrapper){return wrapper.clone();}var result=new LodashWrapper(wrapper.__wrapped__,wrapper.__chain__);result.__actions__=copyArray(wrapper.__actions__);result.__index__=wrapper.__index__;result.__values__=wrapper.__values__;return result;} /*------------------------------------------------------------------------*/ /**
     * Creates an array of elements split into groups the length of `size`.
     * If `array` can't be split evenly, the final chunk will be the remaining
     * elements.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to process.
     * @param {number} [size=0] The length of each chunk.
     * @returns {Array} Returns the new array containing chunks.
     * @example
     *
     * _.chunk(['a', 'b', 'c', 'd'], 2);
     * // => [['a', 'b'], ['c', 'd']]
     *
     * _.chunk(['a', 'b', 'c', 'd'], 3);
     * // => [['a', 'b', 'c'], ['d']]
     */function chunk(array,size){size=nativeMax(toInteger(size),0);var length=array?array.length:0;if(!length||size<1){return [];}var index=0,resIndex=-1,result=Array(nativeCeil(length/size));while(index<length){result[++resIndex]=baseSlice(array,index,index+=size);}return result;} /**
     * Creates an array with all falsey values removed. The values `false`, `null`,
     * `0`, `""`, `undefined`, and `NaN` are falsey.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to compact.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.compact([0, 1, false, 2, '', 3]);
     * // => [1, 2, 3]
     */function compact(array){var index=-1,length=array?array.length:0,resIndex=-1,result=[];while(++index<length){var value=array[index];if(value){result[++resIndex]=value;}}return result;} /**
     * Creates a new array concatenating `array` with any additional arrays
     * and/or values.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to concatenate.
     * @param {...*} [values] The values to concatenate.
     * @returns {Array} Returns the new concatenated array.
     * @example
     *
     * var array = [1];
     * var other = _.concat(array, 2, [3], [[4]]);
     *
     * console.log(other);
     * // => [1, 2, 3, [4]]
     *
     * console.log(array);
     * // => [1]
     */var concat=rest(function(array,values){values=baseFlatten(values);return arrayConcat(isArray(array)?array:[Object(array)],values);}); /**
     * Creates an array of unique `array` values not included in the other
     * provided arrays using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.difference([3, 2, 1], [4, 2]);
     * // => [3, 1]
     */var difference=rest(function(array,values){return isArrayLikeObject(array)?baseDifference(array,baseFlatten(values,false,true)):[];}); /**
     * This method is like `_.difference` except that it accepts `iteratee` which
     * is invoked for each element of `array` and `values` to generate the criterion
     * by which uniqueness is computed. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The values to exclude.
     * @param {Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.differenceBy([3.1, 2.2, 1.3], [4.4, 2.5], Math.floor);
     * // => [3.1, 1.3]
     *
     * // using the `_.property` iteratee shorthand
     * _.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
     * // => [{ 'x': 2 }]
     */var differenceBy=rest(function(array,values){var iteratee=last(values);if(isArrayLikeObject(iteratee)){iteratee=undefined;}return isArrayLikeObject(array)?baseDifference(array,baseFlatten(values,false,true),getIteratee(iteratee)):[];}); /**
     * This method is like `_.difference` except that it accepts `comparator`
     * which is invoked to compare elements of `array` to `values`. The comparator
     * is invoked with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The values to exclude.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     *
     * _.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
     * // => [{ 'x': 2, 'y': 1 }]
     */var differenceWith=rest(function(array,values){var comparator=last(values);if(isArrayLikeObject(comparator)){comparator=undefined;}return isArrayLikeObject(array)?baseDifference(array,baseFlatten(values,false,true),undefined,comparator):[];}); /**
     * Creates a slice of `array` with `n` elements dropped from the beginning.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to drop.
     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.drop([1, 2, 3]);
     * // => [2, 3]
     *
     * _.drop([1, 2, 3], 2);
     * // => [3]
     *
     * _.drop([1, 2, 3], 5);
     * // => []
     *
     * _.drop([1, 2, 3], 0);
     * // => [1, 2, 3]
     */function drop(array,n,guard){var length=array?array.length:0;if(!length){return [];}n=guard||n===undefined?1:toInteger(n);return baseSlice(array,n<0?0:n,length);} /**
     * Creates a slice of `array` with `n` elements dropped from the end.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to drop.
     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.dropRight([1, 2, 3]);
     * // => [1, 2]
     *
     * _.dropRight([1, 2, 3], 2);
     * // => [1]
     *
     * _.dropRight([1, 2, 3], 5);
     * // => []
     *
     * _.dropRight([1, 2, 3], 0);
     * // => [1, 2, 3]
     */function dropRight(array,n,guard){var length=array?array.length:0;if(!length){return [];}n=guard||n===undefined?1:toInteger(n);n=length-n;return baseSlice(array,0,n<0?0:n);} /**
     * Creates a slice of `array` excluding elements dropped from the end.
     * Elements are dropped until `predicate` returns falsey. The predicate is
     * invoked with three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.dropRightWhile(users, function(o) { return !o.active; });
     * // => objects for ['barney']
     *
     * // using the `_.matches` iteratee shorthand
     * _.dropRightWhile(users, { 'user': 'pebbles', 'active': false });
     * // => objects for ['barney', 'fred']
     *
     * // using the `_.matchesProperty` iteratee shorthand
     * _.dropRightWhile(users, ['active', false]);
     * // => objects for ['barney']
     *
     * // using the `_.property` iteratee shorthand
     * _.dropRightWhile(users, 'active');
     * // => objects for ['barney', 'fred', 'pebbles']
     */function dropRightWhile(array,predicate){return array&&array.length?baseWhile(array,getIteratee(predicate,3),true,true):[];} /**
     * Creates a slice of `array` excluding elements dropped from the beginning.
     * Elements are dropped until `predicate` returns falsey. The predicate is
     * invoked with three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.dropWhile(users, function(o) { return !o.active; });
     * // => objects for ['pebbles']
     *
     * // using the `_.matches` iteratee shorthand
     * _.dropWhile(users, { 'user': 'barney', 'active': false });
     * // => objects for ['fred', 'pebbles']
     *
     * // using the `_.matchesProperty` iteratee shorthand
     * _.dropWhile(users, ['active', false]);
     * // => objects for ['pebbles']
     *
     * // using the `_.property` iteratee shorthand
     * _.dropWhile(users, 'active');
     * // => objects for ['barney', 'fred', 'pebbles']
     */function dropWhile(array,predicate){return array&&array.length?baseWhile(array,getIteratee(predicate,3),true):[];} /**
     * Fills elements of `array` with `value` from `start` up to, but not
     * including, `end`.
     *
     * **Note:** This method mutates `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to fill.
     * @param {*} value The value to fill `array` with.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _.fill(array, 'a');
     * console.log(array);
     * // => ['a', 'a', 'a']
     *
     * _.fill(Array(3), 2);
     * // => [2, 2, 2]
     *
     * _.fill([4, 6, 8, 10], '*', 1, 3);
     * // => [4, '*', '*', 10]
     */function fill(array,value,start,end){var length=array?array.length:0;if(!length){return [];}if(start&&typeof start!='number'&&isIterateeCall(array,value,start)){start=0;end=length;}return baseFill(array,value,start,end);} /**
     * This method is like `_.find` except that it returns the index of the first
     * element `predicate` returns truthy for instead of the element itself.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.findIndex(users, function(o) { return o.user == 'barney'; });
     * // => 0
     *
     * // using the `_.matches` iteratee shorthand
     * _.findIndex(users, { 'user': 'fred', 'active': false });
     * // => 1
     *
     * // using the `_.matchesProperty` iteratee shorthand
     * _.findIndex(users, ['active', false]);
     * // => 0
     *
     * // using the `_.property` iteratee shorthand
     * _.findIndex(users, 'active');
     * // => 2
     */function findIndex(array,predicate){return array&&array.length?baseFindIndex(array,getIteratee(predicate,3)):-1;} /**
     * This method is like `_.findIndex` except that it iterates over elements
     * of `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
     * // => 2
     *
     * // using the `_.matches` iteratee shorthand
     * _.findLastIndex(users, { 'user': 'barney', 'active': true });
     * // => 0
     *
     * // using the `_.matchesProperty` iteratee shorthand
     * _.findLastIndex(users, ['active', false]);
     * // => 2
     *
     * // using the `_.property` iteratee shorthand
     * _.findLastIndex(users, 'active');
     * // => 0
     */function findLastIndex(array,predicate){return array&&array.length?baseFindIndex(array,getIteratee(predicate,3),true):-1;} /**
     * Creates an array of flattened values by running each element in `array`
     * through `iteratee` and concating its result to the other mapped values.
     * The iteratee is invoked with three arguments: (value, index|key, array).
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new array.
     * @example
     *
     * function duplicate(n) {
     *   return [n, n];
     * }
     *
     * _.flatMap([1, 2], duplicate);
     * // => [1, 1, 2, 2]
     */function flatMap(array,iteratee){var length=array?array.length:0;return length?baseFlatten(arrayMap(array,getIteratee(iteratee,3))):[];} /**
     * Flattens `array` a single level.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flatten([1, [2, 3, [4]]]);
     * // => [1, 2, 3, [4]]
     */function flatten(array){var length=array?array.length:0;return length?baseFlatten(array):[];} /**
     * This method is like `_.flatten` except that it recursively flattens `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to recursively flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flattenDeep([1, [2, 3, [4]]]);
     * // => [1, 2, 3, 4]
     */function flattenDeep(array){var length=array?array.length:0;return length?baseFlatten(array,true):[];} /**
     * The inverse of `_.toPairs`; this method returns an object composed
     * from key-value `pairs`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} pairs The key-value pairs.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.fromPairs([['fred', 30], ['barney', 40]]);
     * // => { 'fred': 30, 'barney': 40 }
     */function fromPairs(pairs){var index=-1,length=pairs?pairs.length:0,result={};while(++index<length){var pair=pairs[index];baseSet(result,pair[0],pair[1]);}return result;} /**
     * Gets the first element of `array`.
     *
     * @static
     * @memberOf _
     * @alias first
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the first element of `array`.
     * @example
     *
     * _.head([1, 2, 3]);
     * // => 1
     *
     * _.head([]);
     * // => undefined
     */function head(array){return array?array[0]:undefined;} /**
     * Gets the index at which the first occurrence of `value` is found in `array`
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons. If `fromIndex` is negative, it's used as the offset
     * from the end of `array`. If `array` is sorted providing `true` for `fromIndex`
     * performs a faster binary search.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to search.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.indexOf([1, 2, 1, 2], 2);
     * // => 1
     *
     * // using `fromIndex`
     * _.indexOf([1, 2, 1, 2], 2, 2);
     * // => 3
     */function indexOf(array,value,fromIndex){var length=array?array.length:0;if(!length){return -1;}fromIndex=toInteger(fromIndex);if(fromIndex<0){fromIndex=nativeMax(length+fromIndex,0);}return baseIndexOf(array,value,fromIndex);} /**
     * Gets all but the last element of `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.initial([1, 2, 3]);
     * // => [1, 2]
     */function initial(array){return dropRight(array,1);} /**
     * Creates an array of unique values that are included in all of the provided
     * arrays using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of shared values.
     * @example
     * _.intersection([2, 1], [4, 2], [1, 2]);
     * // => [2]
     */var intersection=rest(function(arrays){var mapped=arrayMap(arrays,toArrayLikeObject);return mapped.length&&mapped[0]===arrays[0]?baseIntersection(mapped):[];}); /**
     * This method is like `_.intersection` except that it accepts `iteratee`
     * which is invoked for each element of each `arrays` to generate the criterion
     * by which uniqueness is computed. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of shared values.
     * @example
     *
     * _.intersectionBy([2.1, 1.2], [4.3, 2.4], Math.floor);
     * // => [2.1]
     *
     * // using the `_.property` iteratee shorthand
     * _.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }]
     */var intersectionBy=rest(function(arrays){var iteratee=last(arrays),mapped=arrayMap(arrays,toArrayLikeObject);if(iteratee===last(mapped)){iteratee=undefined;}else {mapped.pop();}return mapped.length&&mapped[0]===arrays[0]?baseIntersection(mapped,getIteratee(iteratee)):[];}); /**
     * This method is like `_.intersection` except that it accepts `comparator`
     * which is invoked to compare elements of `arrays`. The comparator is invoked
     * with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of shared values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.intersectionWith(objects, others, _.isEqual);
     * // => [{ 'x': 1, 'y': 2 }]
     */var intersectionWith=rest(function(arrays){var comparator=last(arrays),mapped=arrayMap(arrays,toArrayLikeObject);if(comparator===last(mapped)){comparator=undefined;}else {mapped.pop();}return mapped.length&&mapped[0]===arrays[0]?baseIntersection(mapped,undefined,comparator):[];}); /**
     * Converts all elements in `array` into a string separated by `separator`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to convert.
     * @param {string} [separator=','] The element separator.
     * @returns {string} Returns the joined string.
     * @example
     *
     * _.join(['a', 'b', 'c'], '~');
     * // => 'a~b~c'
     */function join(array,separator){return array?nativeJoin.call(array,separator):'';} /**
     * Gets the last element of `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the last element of `array`.
     * @example
     *
     * _.last([1, 2, 3]);
     * // => 3
     */function last(array){var length=array?array.length:0;return length?array[length-1]:undefined;} /**
     * This method is like `_.indexOf` except that it iterates over elements of
     * `array` from right to left.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to search.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=array.length-1] The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.lastIndexOf([1, 2, 1, 2], 2);
     * // => 3
     *
     * // using `fromIndex`
     * _.lastIndexOf([1, 2, 1, 2], 2, 2);
     * // => 1
     */function lastIndexOf(array,value,fromIndex){var length=array?array.length:0;if(!length){return -1;}var index=length;if(fromIndex!==undefined){index=toInteger(fromIndex);index=(index<0?nativeMax(length+index,0):nativeMin(index,length-1))+1;}if(value!==value){return indexOfNaN(array,index,true);}while(index--){if(array[index]===value){return index;}}return -1;} /**
     * Removes all provided values from `array` using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * **Note:** Unlike `_.without`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to modify.
     * @param {...*} [values] The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3, 1, 2, 3];
     *
     * _.pull(array, 2, 3);
     * console.log(array);
     * // => [1, 1]
     */var pull=rest(pullAll); /**
     * This method is like `_.pull` except that it accepts an array of values to remove.
     *
     * **Note:** Unlike `_.difference`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3, 1, 2, 3];
     *
     * _.pull(array, [2, 3]);
     * console.log(array);
     * // => [1, 1]
     */function pullAll(array,values){return array&&array.length&&values&&values.length?basePullAll(array,values):array;} /**
     * This method is like `_.pullAll` except that it accepts `iteratee` which is
     * invoked for each element of `array` and `values` to to generate the criterion
     * by which uniqueness is computed. The iteratee is invoked with one argument: (value).
     *
     * **Note:** Unlike `_.differenceBy`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @param {Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
     *
     * _.pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
     * console.log(array);
     * // => [{ 'x': 2 }]
     */function pullAllBy(array,values,iteratee){return array&&array.length&&values&&values.length?basePullAllBy(array,values,getIteratee(iteratee)):array;} /**
     * Removes elements from `array` corresponding to `indexes` and returns an
     * array of removed elements.
     *
     * **Note:** Unlike `_.at`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to modify.
     * @param {...(number|number[])} [indexes] The indexes of elements to remove,
     *  specified individually or in arrays.
     * @returns {Array} Returns the new array of removed elements.
     * @example
     *
     * var array = [5, 10, 15, 20];
     * var evens = _.pullAt(array, 1, 3);
     *
     * console.log(array);
     * // => [5, 15]
     *
     * console.log(evens);
     * // => [10, 20]
     */var pullAt=rest(function(array,indexes){indexes=arrayMap(baseFlatten(indexes),String);var result=baseAt(array,indexes);basePullAt(array,indexes.sort(compareAscending));return result;}); /**
     * Removes all elements from `array` that `predicate` returns truthy for
     * and returns an array of the removed elements. The predicate is invoked with
     * three arguments: (value, index, array).
     *
     * **Note:** Unlike `_.filter`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new array of removed elements.
     * @example
     *
     * var array = [1, 2, 3, 4];
     * var evens = _.remove(array, function(n) {
     *   return n % 2 == 0;
     * });
     *
     * console.log(array);
     * // => [1, 3]
     *
     * console.log(evens);
     * // => [2, 4]
     */function remove(array,predicate){var result=[];if(!(array&&array.length)){return result;}var index=-1,indexes=[],length=array.length;predicate=getIteratee(predicate,3);while(++index<length){var value=array[index];if(predicate(value,index,array)){result.push(value);indexes.push(index);}}basePullAt(array,indexes);return result;} /**
     * Reverses `array` so that the first element becomes the last, the second
     * element becomes the second to last, and so on.
     *
     * **Note:** This method mutates `array` and is based on
     * [`Array#reverse`](https://mdn.io/Array/reverse).
     *
     * @memberOf _
     * @category Array
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _.reverse(array);
     * // => [3, 2, 1]
     *
     * console.log(array);
     * // => [3, 2, 1]
     */function reverse(array){return array?nativeReverse.call(array):array;} /**
     * Creates a slice of `array` from `start` up to, but not including, `end`.
     *
     * **Note:** This method is used instead of [`Array#slice`](https://mdn.io/Array/slice)
     * to ensure dense arrays are returned.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */function slice(array,start,end){var length=array?array.length:0;if(!length){return [];}if(end&&typeof end!='number'&&isIterateeCall(array,start,end)){start=0;end=length;}else {start=start==null?0:toInteger(start);end=end===undefined?length:toInteger(end);}return baseSlice(array,start,end);} /**
     * Uses a binary search to determine the lowest index at which `value` should
     * be inserted into `array` in order to maintain its sort order.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @returns {number} Returns the index at which `value` should be inserted into `array`.
     * @example
     *
     * _.sortedIndex([30, 50], 40);
     * // => 1
     *
     * _.sortedIndex([4, 5], 4);
     * // => 0
     */function sortedIndex(array,value){return baseSortedIndex(array,value);} /**
     * This method is like `_.sortedIndex` except that it accepts `iteratee`
     * which is invoked for `value` and each element of `array` to compute their
     * sort ranking. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the index at which `value` should be inserted into `array`.
     * @example
     *
     * var dict = { 'thirty': 30, 'forty': 40, 'fifty': 50 };
     *
     * _.sortedIndexBy(['thirty', 'fifty'], 'forty', _.propertyOf(dict));
     * // => 1
     *
     * // using the `_.property` iteratee shorthand
     * _.sortedIndexBy([{ 'x': 4 }, { 'x': 5 }], { 'x': 4 }, 'x');
     * // => 0
     */function sortedIndexBy(array,value,iteratee){return baseSortedIndexBy(array,value,getIteratee(iteratee));} /**
     * This method is like `_.indexOf` except that it performs a binary
     * search on a sorted `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to search.
     * @param {*} value The value to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.sortedIndexOf([1, 1, 2, 2], 2);
     * // => 2
     */function sortedIndexOf(array,value){var length=array?array.length:0;if(length){var index=baseSortedIndex(array,value);if(index<length&&eq(array[index],value)){return index;}}return -1;} /**
     * This method is like `_.sortedIndex` except that it returns the highest
     * index at which `value` should be inserted into `array` in order to
     * maintain its sort order.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @returns {number} Returns the index at which `value` should be inserted into `array`.
     * @example
     *
     * _.sortedLastIndex([4, 5], 4);
     * // => 1
     */function sortedLastIndex(array,value){return baseSortedIndex(array,value,true);} /**
     * This method is like `_.sortedLastIndex` except that it accepts `iteratee`
     * which is invoked for `value` and each element of `array` to compute their
     * sort ranking. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the index at which `value` should be inserted into `array`.
     * @example
     *
     * // using the `_.property` iteratee shorthand
     * _.sortedLastIndexBy([{ 'x': 4 }, { 'x': 5 }], { 'x': 4 }, 'x');
     * // => 1
     */function sortedLastIndexBy(array,value,iteratee){return baseSortedIndexBy(array,value,getIteratee(iteratee),true);} /**
     * This method is like `_.lastIndexOf` except that it performs a binary
     * search on a sorted `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to search.
     * @param {*} value The value to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.sortedLastIndexOf([1, 1, 2, 2], 2);
     * // => 3
     */function sortedLastIndexOf(array,value){var length=array?array.length:0;if(length){var index=baseSortedIndex(array,value,true)-1;if(eq(array[index],value)){return index;}}return -1;} /**
     * This method is like `_.uniq` except that it's designed and optimized
     * for sorted arrays.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to inspect.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.sortedUniq([1, 1, 2]);
     * // => [1, 2]
     */function sortedUniq(array){return array&&array.length?baseSortedUniq(array):[];} /**
     * This method is like `_.uniqBy` except that it's designed and optimized
     * for sorted arrays.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
     * // => [1.1, 2.2]
     */function sortedUniqBy(array,iteratee){return array&&array.length?baseSortedUniqBy(array,getIteratee(iteratee)):[];} /**
     * Gets all but the first element of `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.tail([1, 2, 3]);
     * // => [2, 3]
     */function tail(array){return drop(array,1);} /**
     * Creates a slice of `array` with `n` elements taken from the beginning.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to take.
     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.take([1, 2, 3]);
     * // => [1]
     *
     * _.take([1, 2, 3], 2);
     * // => [1, 2]
     *
     * _.take([1, 2, 3], 5);
     * // => [1, 2, 3]
     *
     * _.take([1, 2, 3], 0);
     * // => []
     */function take(array,n,guard){if(!(array&&array.length)){return [];}n=guard||n===undefined?1:toInteger(n);return baseSlice(array,0,n<0?0:n);} /**
     * Creates a slice of `array` with `n` elements taken from the end.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to take.
     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.takeRight([1, 2, 3]);
     * // => [3]
     *
     * _.takeRight([1, 2, 3], 2);
     * // => [2, 3]
     *
     * _.takeRight([1, 2, 3], 5);
     * // => [1, 2, 3]
     *
     * _.takeRight([1, 2, 3], 0);
     * // => []
     */function takeRight(array,n,guard){var length=array?array.length:0;if(!length){return [];}n=guard||n===undefined?1:toInteger(n);n=length-n;return baseSlice(array,n<0?0:n,length);} /**
     * Creates a slice of `array` with elements taken from the end. Elements are
     * taken until `predicate` returns falsey. The predicate is invoked with three
     * arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.takeRightWhile(users, function(o) { return !o.active; });
     * // => objects for ['fred', 'pebbles']
     *
     * // using the `_.matches` iteratee shorthand
     * _.takeRightWhile(users, { 'user': 'pebbles', 'active': false });
     * // => objects for ['pebbles']
     *
     * // using the `_.matchesProperty` iteratee shorthand
     * _.takeRightWhile(users, ['active', false]);
     * // => objects for ['fred', 'pebbles']
     *
     * // using the `_.property` iteratee shorthand
     * _.takeRightWhile(users, 'active');
     * // => []
     */function takeRightWhile(array,predicate){return array&&array.length?baseWhile(array,getIteratee(predicate,3),false,true):[];} /**
     * Creates a slice of `array` with elements taken from the beginning. Elements
     * are taken until `predicate` returns falsey. The predicate is invoked with
     * three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false},
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.takeWhile(users, function(o) { return !o.active; });
     * // => objects for ['barney', 'fred']
     *
     * // using the `_.matches` iteratee shorthand
     * _.takeWhile(users, { 'user': 'barney', 'active': false });
     * // => objects for ['barney']
     *
     * // using the `_.matchesProperty` iteratee shorthand
     * _.takeWhile(users, ['active', false]);
     * // => objects for ['barney', 'fred']
     *
     * // using the `_.property` iteratee shorthand
     * _.takeWhile(users, 'active');
     * // => []
     */function takeWhile(array,predicate){return array&&array.length?baseWhile(array,getIteratee(predicate,3)):[];} /**
     * Creates an array of unique values, in order, from all of the provided arrays
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * _.union([2, 1], [4, 2], [1, 2]);
     * // => [2, 1, 4]
     */var union=rest(function(arrays){return baseUniq(baseFlatten(arrays,false,true));}); /**
     * This method is like `_.union` except that it accepts `iteratee` which is
     * invoked for each element of each `arrays` to generate the criterion by which
     * uniqueness is computed. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * _.unionBy([2.1, 1.2], [4.3, 2.4], Math.floor);
     * // => [2.1, 1.2, 4.3]
     *
     * // using the `_.property` iteratee shorthand
     * _.unionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }, { 'x': 2 }]
     */var unionBy=rest(function(arrays){var iteratee=last(arrays);if(isArrayLikeObject(iteratee)){iteratee=undefined;}return baseUniq(baseFlatten(arrays,false,true),getIteratee(iteratee));}); /**
     * This method is like `_.union` except that it accepts `comparator` which
     * is invoked to compare elements of `arrays`. The comparator is invoked
     * with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.unionWith(objects, others, _.isEqual);
     * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
     */var unionWith=rest(function(arrays){var comparator=last(arrays);if(isArrayLikeObject(comparator)){comparator=undefined;}return baseUniq(baseFlatten(arrays,false,true),undefined,comparator);}); /**
     * Creates a duplicate-free version of an array, using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons, in which only the first occurrence of each element
     * is kept.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to inspect.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.uniq([2, 1, 2]);
     * // => [2, 1]
     */function uniq(array){return array&&array.length?baseUniq(array):[];} /**
     * This method is like `_.uniq` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the criterion by which
     * uniqueness is computed. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
     * // => [2.1, 1.2]
     *
     * // using the `_.property` iteratee shorthand
     * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }, { 'x': 2 }]
     */function uniqBy(array,iteratee){return array&&array.length?baseUniq(array,getIteratee(iteratee)):[];} /**
     * This method is like `_.uniq` except that it accepts `comparator` which
     * is invoked to compare elements of `array`. The comparator is invoked with
     * two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 },  { 'x': 1, 'y': 2 }];
     *
     * _.uniqWith(objects, _.isEqual);
     * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
     */function uniqWith(array,comparator){return array&&array.length?baseUniq(array,undefined,comparator):[];} /**
     * This method is like `_.zip` except that it accepts an array of grouped
     * elements and creates an array regrouping the elements to their pre-zip
     * configuration.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array of grouped elements to process.
     * @returns {Array} Returns the new array of regrouped elements.
     * @example
     *
     * var zipped = _.zip(['fred', 'barney'], [30, 40], [true, false]);
     * // => [['fred', 30, true], ['barney', 40, false]]
     *
     * _.unzip(zipped);
     * // => [['fred', 'barney'], [30, 40], [true, false]]
     */function unzip(array){if(!(array&&array.length)){return [];}var length=0;array=arrayFilter(array,function(group){if(isArrayLikeObject(group)){length=nativeMax(group.length,length);return true;}});return baseTimes(length,function(index){return arrayMap(array,baseProperty(index));});} /**
     * This method is like `_.unzip` except that it accepts `iteratee` to specify
     * how regrouped values should be combined. The iteratee is invoked with the
     * elements of each group: (...group).
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array of grouped elements to process.
     * @param {Function} [iteratee=_.identity] The function to combine regrouped values.
     * @returns {Array} Returns the new array of regrouped elements.
     * @example
     *
     * var zipped = _.zip([1, 2], [10, 20], [100, 200]);
     * // => [[1, 10, 100], [2, 20, 200]]
     *
     * _.unzipWith(zipped, _.add);
     * // => [3, 30, 300]
     */function unzipWith(array,iteratee){if(!(array&&array.length)){return [];}var result=unzip(array);if(iteratee==null){return result;}return arrayMap(result,function(group){return apply(iteratee,undefined,group);});} /**
     * Creates an array excluding all provided values using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to filter.
     * @param {...*} [values] The values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.without([1, 2, 1, 3], 1, 2);
     * // => [3]
     */var without=rest(function(array,values){return isArrayLikeObject(array)?baseDifference(array,values):[];}); /**
     * Creates an array of unique values that is the [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
     * of the provided arrays.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of values.
     * @example
     *
     * _.xor([2, 1], [4, 2]);
     * // => [1, 4]
     */var xor=rest(function(arrays){return baseXor(arrayFilter(arrays,isArrayLikeObject));}); /**
     * This method is like `_.xor` except that it accepts `iteratee` which is
     * invoked for each element of each `arrays` to generate the criterion by which
     * uniqueness is computed. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of values.
     * @example
     *
     * _.xorBy([2.1, 1.2], [4.3, 2.4], Math.floor);
     * // => [1.2, 4.3]
     *
     * // using the `_.property` iteratee shorthand
     * _.xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 2 }]
     */var xorBy=rest(function(arrays){var iteratee=last(arrays);if(isArrayLikeObject(iteratee)){iteratee=undefined;}return baseXor(arrayFilter(arrays,isArrayLikeObject),getIteratee(iteratee));}); /**
     * This method is like `_.xor` except that it accepts `comparator` which is
     * invoked to compare elements of `arrays`. The comparator is invoked with
     * two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.xorWith(objects, others, _.isEqual);
     * // => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
     */var xorWith=rest(function(arrays){var comparator=last(arrays);if(isArrayLikeObject(comparator)){comparator=undefined;}return baseXor(arrayFilter(arrays,isArrayLikeObject),undefined,comparator);}); /**
     * Creates an array of grouped elements, the first of which contains the first
     * elements of the given arrays, the second of which contains the second elements
     * of the given arrays, and so on.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to process.
     * @returns {Array} Returns the new array of grouped elements.
     * @example
     *
     * _.zip(['fred', 'barney'], [30, 40], [true, false]);
     * // => [['fred', 30, true], ['barney', 40, false]]
     */var zip=rest(unzip); /**
     * This method is like `_.fromPairs` except that it accepts two arrays,
     * one of property names and one of corresponding values.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} [props=[]] The property names.
     * @param {Array} [values=[]] The property values.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.zipObject(['fred', 'barney'], [30, 40]);
     * // => { 'fred': 30, 'barney': 40 }
     */function zipObject(props,values){var index=-1,length=props?props.length:0,valsLength=values?values.length:0,result={};while(++index<length){baseSet(result,props[index],index<valsLength?values[index]:undefined);}return result;} /**
     * This method is like `_.zip` except that it accepts `iteratee` to specify
     * how grouped values should be combined. The iteratee is invoked with the
     * elements of each group: (...group).
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to process.
     * @param {Function} [iteratee=_.identity] The function to combine grouped values.
     * @returns {Array} Returns the new array of grouped elements.
     * @example
     *
     * _.zipWith([1, 2], [10, 20], [100, 200], function(a, b, c) {
     *   return a + b + c;
     * });
     * // => [111, 222]
     */var zipWith=rest(function(arrays){var length=arrays.length,iteratee=length>1?arrays[length-1]:undefined;iteratee=typeof iteratee=='function'?(arrays.pop(),iteratee):undefined;return unzipWith(arrays,iteratee);}); /*------------------------------------------------------------------------*/ /**
     * Creates a `lodash` object that wraps `value` with explicit method chaining enabled.
     * The result of such method chaining must be unwrapped with `_#value`.
     *
     * @static
     * @memberOf _
     * @category Seq
     * @param {*} value The value to wrap.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36 },
     *   { 'user': 'fred',    'age': 40 },
     *   { 'user': 'pebbles', 'age': 1 }
     * ];
     *
     * var youngest = _
     *   .chain(users)
     *   .sortBy('age')
     *   .map(function(o) {
     *     return o.user + ' is ' + o.age;
     *   })
     *   .head()
     *   .value();
     * // => 'pebbles is 1'
     */function chain(value){var result=lodash(value);result.__chain__=true;return result;} /**
     * This method invokes `interceptor` and returns `value`. The interceptor is
     * invoked with one argument; (value). The purpose of this method is to "tap into"
     * a method chain in order to perform operations on intermediate results within
     * the chain.
     *
     * @static
     * @memberOf _
     * @category Seq
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @returns {*} Returns `value`.
     * @example
     *
     * _([1, 2, 3])
     *  .tap(function(array) {
     *    array.pop();
     *  })
     *  .reverse()
     *  .value();
     * // => [2, 1]
     */function tap(value,interceptor){interceptor(value);return value;} /**
     * This method is like `_.tap` except that it returns the result of `interceptor`.
     *
     * @static
     * @memberOf _
     * @category Seq
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @returns {*} Returns the result of `interceptor`.
     * @example
     *
     * _('  abc  ')
     *  .chain()
     *  .trim()
     *  .thru(function(value) {
     *    return [value];
     *  })
     *  .value();
     * // => ['abc']
     */function thru(value,interceptor){return interceptor(value);} /**
     * This method is the wrapper version of `_.at`.
     *
     * @name at
     * @memberOf _
     * @category Seq
     * @param {...(string|string[])} [paths] The property paths of elements to pick,
     *  specified individually or in arrays.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
     *
     * _(object).at(['a[0].b.c', 'a[1]']).value();
     * // => [3, 4]
     *
     * _(['a', 'b', 'c']).at(0, 2).value();
     * // => ['a', 'c']
     */var wrapperAt=rest(function(paths){paths=baseFlatten(paths);var length=paths.length,start=length?paths[0]:0,value=this.__wrapped__,interceptor=function interceptor(object){return baseAt(object,paths);};if(length>1||this.__actions__.length||!(value instanceof LazyWrapper)||!isIndex(start)){return this.thru(interceptor);}value=value.slice(start,+start+(length?1:0));value.__actions__.push({'func':thru,'args':[interceptor],'thisArg':undefined});return new LodashWrapper(value,this.__chain__).thru(function(array){if(length&&!array.length){array.push(undefined);}return array;});}); /**
     * Enables explicit method chaining on the wrapper object.
     *
     * @name chain
     * @memberOf _
     * @category Seq
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * // without explicit chaining
     * _(users).head();
     * // => { 'user': 'barney', 'age': 36 }
     *
     * // with explicit chaining
     * _(users)
     *   .chain()
     *   .head()
     *   .pick('user')
     *   .value();
     * // => { 'user': 'barney' }
     */function wrapperChain(){return chain(this);} /**
     * Executes the chained sequence and returns the wrapped result.
     *
     * @name commit
     * @memberOf _
     * @category Seq
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2];
     * var wrapped = _(array).push(3);
     *
     * console.log(array);
     * // => [1, 2]
     *
     * wrapped = wrapped.commit();
     * console.log(array);
     * // => [1, 2, 3]
     *
     * wrapped.last();
     * // => 3
     *
     * console.log(array);
     * // => [1, 2, 3]
     */function wrapperCommit(){return new LodashWrapper(this.value(),this.__chain__);} /**
     * This method is the wrapper version of `_.flatMap`.
     *
     * @static
     * @memberOf _
     * @category Seq
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * function duplicate(n) {
     *   return [n, n];
     * }
     *
     * _([1, 2]).flatMap(duplicate).value();
     * // => [1, 1, 2, 2]
     */function wrapperFlatMap(iteratee){return this.map(iteratee).flatten();} /**
     * Gets the next value on a wrapped object following the
     * [iterator protocol](https://mdn.io/iteration_protocols#iterator).
     *
     * @name next
     * @memberOf _
     * @category Seq
     * @returns {Object} Returns the next iterator value.
     * @example
     *
     * var wrapped = _([1, 2]);
     *
     * wrapped.next();
     * // => { 'done': false, 'value': 1 }
     *
     * wrapped.next();
     * // => { 'done': false, 'value': 2 }
     *
     * wrapped.next();
     * // => { 'done': true, 'value': undefined }
     */function wrapperNext(){if(this.__values__===undefined){this.__values__=toArray(this.value());}var done=this.__index__>=this.__values__.length,value=done?undefined:this.__values__[this.__index__++];return {'done':done,'value':value};} /**
     * Enables the wrapper to be iterable.
     *
     * @name Symbol.iterator
     * @memberOf _
     * @category Seq
     * @returns {Object} Returns the wrapper object.
     * @example
     *
     * var wrapped = _([1, 2]);
     *
     * wrapped[Symbol.iterator]() === wrapped;
     * // => true
     *
     * Array.from(wrapped);
     * // => [1, 2]
     */function wrapperToIterator(){return this;} /**
     * Creates a clone of the chained sequence planting `value` as the wrapped value.
     *
     * @name plant
     * @memberOf _
     * @category Seq
     * @param {*} value The value to plant.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var wrapped = _([1, 2]).map(square);
     * var other = wrapped.plant([3, 4]);
     *
     * other.value();
     * // => [9, 16]
     *
     * wrapped.value();
     * // => [1, 4]
     */function wrapperPlant(value){var result,parent=this;while(parent instanceof baseLodash){var clone=wrapperClone(parent);clone.__index__=0;clone.__values__=undefined;if(result){previous.__wrapped__=clone;}else {result=clone;}var previous=clone;parent=parent.__wrapped__;}previous.__wrapped__=value;return result;} /**
     * This method is the wrapper version of `_.reverse`.
     *
     * **Note:** This method mutates the wrapped array.
     *
     * @name reverse
     * @memberOf _
     * @category Seq
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _(array).reverse().value()
     * // => [3, 2, 1]
     *
     * console.log(array);
     * // => [3, 2, 1]
     */function wrapperReverse(){var value=this.__wrapped__;if(value instanceof LazyWrapper){var wrapped=value;if(this.__actions__.length){wrapped=new LazyWrapper(this);}wrapped=wrapped.reverse();wrapped.__actions__.push({'func':thru,'args':[reverse],'thisArg':undefined});return new LodashWrapper(wrapped,this.__chain__);}return this.thru(reverse);} /**
     * Executes the chained sequence to extract the unwrapped value.
     *
     * @name value
     * @memberOf _
     * @alias run, toJSON, valueOf
     * @category Seq
     * @returns {*} Returns the resolved unwrapped value.
     * @example
     *
     * _([1, 2, 3]).value();
     * // => [1, 2, 3]
     */function wrapperValue(){return baseWrapperValue(this.__wrapped__,this.__actions__);} /*------------------------------------------------------------------------*/ /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` through `iteratee`. The corresponding value
     * of each key is the number of times the key was returned by `iteratee`.
     * The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.countBy([6.1, 4.2, 6.3], Math.floor);
     * // => { '4': 1, '6': 2 }
     *
     * _.countBy(['one', 'two', 'three'], 'length');
     * // => { '3': 2, '5': 1 }
     */var countBy=createAggregator(function(result,value,key){hasOwnProperty.call(result,key)?++result[key]:result[key]=1;}); /**
     * Checks if `predicate` returns truthy for **all** elements of `collection`.
     * Iteration is stopped once `predicate` returns falsey. The predicate is
     * invoked with three arguments: (value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
     * @returns {boolean} Returns `true` if all elements pass the predicate check, else `false`.
     * @example
     *
     * _.every([true, 1, null, 'yes'], Boolean);
     * // => false
     *
     * var users = [
     *   { 'user': 'barney', 'active': false },
     *   { 'user': 'fred',   'active': false }
     * ];
     *
     * // using the `_.matches` iteratee shorthand
     * _.every(users, { 'user': 'barney', 'active': false });
     * // => false
     *
     * // using the `_.matchesProperty` iteratee shorthand
     * _.every(users, ['active', false]);
     * // => true
     *
     * // using the `_.property` iteratee shorthand
     * _.every(users, 'active');
     * // => false
     */function every(collection,predicate,guard){var func=isArray(collection)?arrayEvery:baseEvery;if(guard&&isIterateeCall(collection,predicate,guard)){predicate=undefined;}return func(collection,getIteratee(predicate,3));} /**
     * Iterates over elements of `collection`, returning an array of all elements
     * `predicate` returns truthy for. The predicate is invoked with three arguments:
     * (value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * _.filter(users, function(o) { return !o.active; });
     * // => objects for ['fred']
     *
     * // using the `_.matches` iteratee shorthand
     * _.filter(users, { 'age': 36, 'active': true });
     * // => objects for ['barney']
     *
     * // using the `_.matchesProperty` iteratee shorthand
     * _.filter(users, ['active', false]);
     * // => objects for ['fred']
     *
     * // using the `_.property` iteratee shorthand
     * _.filter(users, 'active');
     * // => objects for ['barney']
     */function filter(collection,predicate){var func=isArray(collection)?arrayFilter:baseFilter;return func(collection,getIteratee(predicate,3));} /**
     * Iterates over elements of `collection`, returning the first element
     * `predicate` returns truthy for. The predicate is invoked with three arguments:
     * (value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object} collection The collection to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36, 'active': true },
     *   { 'user': 'fred',    'age': 40, 'active': false },
     *   { 'user': 'pebbles', 'age': 1,  'active': true }
     * ];
     *
     * _.find(users, function(o) { return o.age < 40; });
     * // => object for 'barney'
     *
     * // using the `_.matches` iteratee shorthand
     * _.find(users, { 'age': 1, 'active': true });
     * // => object for 'pebbles'
     *
     * // using the `_.matchesProperty` iteratee shorthand
     * _.find(users, ['active', false]);
     * // => object for 'fred'
     *
     * // using the `_.property` iteratee shorthand
     * _.find(users, 'active');
     * // => object for 'barney'
     */function find(collection,predicate){predicate=getIteratee(predicate,3);if(isArray(collection)){var index=baseFindIndex(collection,predicate);return index>-1?collection[index]:undefined;}return baseFind(collection,predicate,baseEach);} /**
     * This method is like `_.find` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object} collection The collection to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * _.findLast([1, 2, 3, 4], function(n) {
     *   return n % 2 == 1;
     * });
     * // => 3
     */function findLast(collection,predicate){predicate=getIteratee(predicate,3);if(isArray(collection)){var index=baseFindIndex(collection,predicate,true);return index>-1?collection[index]:undefined;}return baseFind(collection,predicate,baseEachRight);} /**
     * Iterates over elements of `collection` invoking `iteratee` for each element.
     * The iteratee is invoked with three arguments: (value, index|key, collection).
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * **Note:** As with other "Collections" methods, objects with a "length" property
     * are iterated like arrays. To avoid this behavior use `_.forIn` or `_.forOwn`
     * for object iteration.
     *
     * @static
     * @memberOf _
     * @alias each
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     * @example
     *
     * _([1, 2]).forEach(function(value) {
     *   console.log(value);
     * });
     * // => logs `1` then `2`
     *
     * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'a' then 'b' (iteration order is not guaranteed)
     */function forEach(collection,iteratee){return typeof iteratee=='function'&&isArray(collection)?arrayEach(collection,iteratee):baseEach(collection,toFunction(iteratee));} /**
     * This method is like `_.forEach` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @alias eachRight
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     * @example
     *
     * _.forEachRight([1, 2], function(value) {
     *   console.log(value);
     * });
     * // => logs `2` then `1`
     */function forEachRight(collection,iteratee){return typeof iteratee=='function'&&isArray(collection)?arrayEachRight(collection,iteratee):baseEachRight(collection,toFunction(iteratee));} /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` through `iteratee`. The corresponding value
     * of each key is an array of the elements responsible for generating the key.
     * The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.groupBy([6.1, 4.2, 6.3], Math.floor);
     * // => { '4': [4.2], '6': [6.1, 6.3] }
     *
     * // using the `_.property` iteratee shorthand
     * _.groupBy(['one', 'two', 'three'], 'length');
     * // => { '3': ['one', 'two'], '5': ['three'] }
     */var groupBy=createAggregator(function(result,value,key){if(hasOwnProperty.call(result,key)){result[key].push(value);}else {result[key]=[value];}}); /**
     * Checks if `value` is in `collection`. If `collection` is a string it's checked
     * for a substring of `value`, otherwise [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * is used for equality comparisons. If `fromIndex` is negative, it's used as
     * the offset from the end of `collection`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to search.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=0] The index to search from.
     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.reduce`.
     * @returns {boolean} Returns `true` if `value` is found, else `false`.
     * @example
     *
     * _.includes([1, 2, 3], 1);
     * // => true
     *
     * _.includes([1, 2, 3], 1, 2);
     * // => false
     *
     * _.includes({ 'user': 'fred', 'age': 40 }, 'fred');
     * // => true
     *
     * _.includes('pebbles', 'eb');
     * // => true
     */function includes(collection,value,fromIndex,guard){collection=isArrayLike(collection)?collection:values(collection);fromIndex=fromIndex&&!guard?toInteger(fromIndex):0;var length=collection.length;if(fromIndex<0){fromIndex=nativeMax(length+fromIndex,0);}return isString(collection)?fromIndex<=length&&collection.indexOf(value,fromIndex)>-1:!!length&&baseIndexOf(collection,value,fromIndex)>-1;} /**
     * Invokes the method at `path` of each element in `collection`, returning
     * an array of the results of each invoked method. Any additional arguments
     * are provided to each invoked method. If `methodName` is a function it's
     * invoked for, and `this` bound to, each element in `collection`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Array|Function|string} path The path of the method to invoke or
     *  the function invoked per iteration.
     * @param {...*} [args] The arguments to invoke each method with.
     * @returns {Array} Returns the array of results.
     * @example
     *
     * _.invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
     * // => [[1, 5, 7], [1, 2, 3]]
     *
     * _.invokeMap([123, 456], String.prototype.split, '');
     * // => [['1', '2', '3'], ['4', '5', '6']]
     */var invokeMap=rest(function(collection,path,args){var index=-1,isFunc=typeof path=='function',isProp=isKey(path),result=isArrayLike(collection)?Array(collection.length):[];baseEach(collection,function(value){var func=isFunc?path:isProp&&value!=null?value[path]:undefined;result[++index]=func?apply(func,value,args):baseInvoke(value,path,args);});return result;}); /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` through `iteratee`. The corresponding value
     * of each key is the last element responsible for generating the key. The
     * iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * var keyData = [
     *   { 'dir': 'left', 'code': 97 },
     *   { 'dir': 'right', 'code': 100 }
     * ];
     *
     * _.keyBy(keyData, 'dir');
     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
     *
     * _.keyBy(keyData, function(o) {
     *   return String.fromCharCode(o.code);
     * });
     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
     */var keyBy=createAggregator(function(result,value,key){result[key]=value;}); /**
     * Creates an array of values by running each element in `collection` through
     * `iteratee`. The iteratee is invoked with three arguments:
     * (value, index|key, collection).
     *
     * Many lodash methods are guarded to work as iteratees for methods like
     * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
     *
     * The guarded methods are:
     * `ary`, `curry`, `curryRight`, `drop`, `dropRight`, `every`, `fill`,
     * `invert`, `parseInt`, `random`, `range`, `rangeRight`, `slice`, `some`,
     * `sortBy`, `take`, `takeRight`, `template`, `trim`, `trimEnd`, `trimStart`,
     * and `words`
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * _.map([1, 2], square);
     * // => [3, 6]
     *
     * _.map({ 'a': 1, 'b': 2 }, square);
     * // => [3, 6] (iteration order is not guaranteed)
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * // using the `_.property` iteratee shorthand
     * _.map(users, 'user');
     * // => ['barney', 'fred']
     */function map(collection,iteratee){var func=isArray(collection)?arrayMap:baseMap;return func(collection,getIteratee(iteratee,3));} /**
     * This method is like `_.sortBy` except that it allows specifying the sort
     * orders of the iteratees to sort by. If `orders` is unspecified, all values
     * are sorted in ascending order. Otherwise, specify an order of "desc" for
     * descending or "asc" for ascending sort order of corresponding values.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function[]|Object[]|string[]} [iteratees=[_.identity]] The iteratees to sort by.
     * @param {string[]} [orders] The sort orders of `iteratees`.
     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.reduce`.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * var users = [
     *   { 'user': 'fred',   'age': 48 },
     *   { 'user': 'barney', 'age': 34 },
     *   { 'user': 'fred',   'age': 42 },
     *   { 'user': 'barney', 'age': 36 }
     * ];
     *
     * // sort by `user` in ascending order and by `age` in descending order
     * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
     */function orderBy(collection,iteratees,orders,guard){if(collection==null){return [];}if(!isArray(iteratees)){iteratees=iteratees==null?[]:[iteratees];}orders=guard?undefined:orders;if(!isArray(orders)){orders=orders==null?[]:[orders];}return baseOrderBy(collection,iteratees,orders);} /**
     * Creates an array of elements split into two groups, the first of which
     * contains elements `predicate` returns truthy for, while the second of which
     * contains elements `predicate` returns falsey for. The predicate is invoked
     * with three arguments: (value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the array of grouped elements.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36, 'active': false },
     *   { 'user': 'fred',    'age': 40, 'active': true },
     *   { 'user': 'pebbles', 'age': 1,  'active': false }
     * ];
     *
     * _.partition(users, function(o) { return o.active; });
     * // => objects for [['fred'], ['barney', 'pebbles']]
     *
     * // using the `_.matches` iteratee shorthand
     * _.partition(users, { 'age': 1, 'active': false });
     * // => objects for [['pebbles'], ['barney', 'fred']]
     *
     * // using the `_.matchesProperty` iteratee shorthand
     * _.partition(users, ['active', false]);
     * // => objects for [['barney', 'pebbles'], ['fred']]
     *
     * // using the `_.property` iteratee shorthand
     * _.partition(users, 'active');
     * // => objects for [['fred'], ['barney', 'pebbles']]
     */var partition=createAggregator(function(result,value,key){result[key?0:1].push(value);},function(){return [[],[]];}); /**
     * Reduces `collection` to a value which is the accumulated result of running
     * each element in `collection` through `iteratee`, where each successive
     * invocation is supplied the return value of the previous. If `accumulator`
     * is not provided the first element of `collection` is used as the initial
     * value. The iteratee is invoked with four arguments:
     * (accumulator, value, index|key, collection).
     *
     * Many lodash methods are guarded to work as iteratees for methods like
     * `_.reduce`, `_.reduceRight`, and `_.transform`.
     *
     * The guarded methods are:
     * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
     * and `sortBy`
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * _.reduce([1, 2], function(sum, n) {
     *   return sum + n;
     * });
     * // => 3
     *
     * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
     *   (result[value] || (result[value] = [])).push(key);
     *   return result;
     * }, {});
     * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
     */function reduce(collection,iteratee,accumulator){var func=isArray(collection)?arrayReduce:baseReduce,initFromCollection=arguments.length<3;return func(collection,getIteratee(iteratee,4),accumulator,initFromCollection,baseEach);} /**
     * This method is like `_.reduce` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * var array = [[0, 1], [2, 3], [4, 5]];
     *
     * _.reduceRight(array, function(flattened, other) {
     *   return flattened.concat(other);
     * }, []);
     * // => [4, 5, 2, 3, 0, 1]
     */function reduceRight(collection,iteratee,accumulator){var func=isArray(collection)?arrayReduceRight:baseReduce,initFromCollection=arguments.length<3;return func(collection,getIteratee(iteratee,4),accumulator,initFromCollection,baseEachRight);} /**
     * The opposite of `_.filter`; this method returns the elements of `collection`
     * that `predicate` does **not** return truthy for.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': false },
     *   { 'user': 'fred',   'age': 40, 'active': true }
     * ];
     *
     * _.reject(users, function(o) { return !o.active; });
     * // => objects for ['fred']
     *
     * // using the `_.matches` iteratee shorthand
     * _.reject(users, { 'age': 40, 'active': true });
     * // => objects for ['barney']
     *
     * // using the `_.matchesProperty` iteratee shorthand
     * _.reject(users, ['active', false]);
     * // => objects for ['fred']
     *
     * // using the `_.property` iteratee shorthand
     * _.reject(users, 'active');
     * // => objects for ['barney']
     */function reject(collection,predicate){var func=isArray(collection)?arrayFilter:baseFilter;predicate=getIteratee(predicate,3);return func(collection,function(value,index,collection){return !predicate(value,index,collection);});} /**
     * Gets a random element from `collection`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object} collection The collection to sample.
     * @returns {*} Returns the random element.
     * @example
     *
     * _.sample([1, 2, 3, 4]);
     * // => 2
     */function sample(collection){var array=isArrayLike(collection)?collection:values(collection),length=array.length;return length>0?array[baseRandom(0,length-1)]:undefined;} /**
     * Gets `n` random elements from `collection`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object} collection The collection to sample.
     * @param {number} [n=0] The number of elements to sample.
     * @returns {Array} Returns the random elements.
     * @example
     *
     * _.sampleSize([1, 2, 3, 4], 2);
     * // => [3, 1]
     */function sampleSize(collection,n){var index=-1,result=toArray(collection),length=result.length,lastIndex=length-1;n=baseClamp(toInteger(n),0,length);while(++index<n){var rand=baseRandom(index,lastIndex),value=result[rand];result[rand]=result[index];result[index]=value;}result.length=n;return result;} /**
     * Creates an array of shuffled values, using a version of the
     * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object} collection The collection to shuffle.
     * @returns {Array} Returns the new shuffled array.
     * @example
     *
     * _.shuffle([1, 2, 3, 4]);
     * // => [4, 1, 3, 2]
     */function shuffle(collection){return sampleSize(collection,MAX_ARRAY_LENGTH);} /**
     * Gets the size of `collection` by returning its length for array-like
     * values or the number of own enumerable properties for objects.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object} collection The collection to inspect.
     * @returns {number} Returns the collection size.
     * @example
     *
     * _.size([1, 2, 3]);
     * // => 3
     *
     * _.size({ 'a': 1, 'b': 2 });
     * // => 2
     *
     * _.size('pebbles');
     * // => 7
     */function size(collection){if(collection==null){return 0;}if(isArrayLike(collection)){var result=collection.length;return result&&isString(collection)?stringSize(collection):result;}return keys(collection).length;} /**
     * Checks if `predicate` returns truthy for **any** element of `collection`.
     * Iteration is stopped once `predicate` returns truthy. The predicate is
     * invoked with three arguments: (value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
     * @returns {boolean} Returns `true` if any element passes the predicate check, else `false`.
     * @example
     *
     * _.some([null, 0, 'yes', false], Boolean);
     * // => true
     *
     * var users = [
     *   { 'user': 'barney', 'active': true },
     *   { 'user': 'fred',   'active': false }
     * ];
     *
     * // using the `_.matches` iteratee shorthand
     * _.some(users, { 'user': 'barney', 'active': false });
     * // => false
     *
     * // using the `_.matchesProperty` iteratee shorthand
     * _.some(users, ['active', false]);
     * // => true
     *
     * // using the `_.property` iteratee shorthand
     * _.some(users, 'active');
     * // => true
     */function some(collection,predicate,guard){var func=isArray(collection)?arraySome:baseSome;if(guard&&isIterateeCall(collection,predicate,guard)){predicate=undefined;}return func(collection,getIteratee(predicate,3));} /**
     * Creates an array of elements, sorted in ascending order by the results of
     * running each element in a collection through each iteratee. This method
     * performs a stable sort, that is, it preserves the original sort order of
     * equal elements. The iteratees are invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {...(Function|Function[]|Object|Object[]|string|string[])} [iteratees=[_.identity]]
     *  The iteratees to sort by, specified individually or in arrays.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * var users = [
     *   { 'user': 'fred',   'age': 48 },
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 42 },
     *   { 'user': 'barney', 'age': 34 }
     * ];
     *
     * _.sortBy(users, function(o) { return o.user; });
     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
     *
     * _.sortBy(users, ['user', 'age']);
     * // => objects for [['barney', 34], ['barney', 36], ['fred', 42], ['fred', 48]]
     *
     * _.sortBy(users, 'user', function(o) {
     *   return Math.floor(o.age / 10);
     * });
     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
     */var sortBy=rest(function(collection,iteratees){if(collection==null){return [];}var length=iteratees.length;if(length>1&&isIterateeCall(collection,iteratees[0],iteratees[1])){iteratees=[];}else if(length>2&&isIterateeCall(iteratees[0],iteratees[1],iteratees[2])){iteratees.length=1;}return baseOrderBy(collection,baseFlatten(iteratees),[]);}); /*------------------------------------------------------------------------*/ /**
     * Gets the timestamp of the number of milliseconds that have elapsed since
     * the Unix epoch (1 January 1970 00:00:00 UTC).
     *
     * @static
     * @memberOf _
     * @type Function
     * @category Date
     * @returns {number} Returns the timestamp.
     * @example
     *
     * _.defer(function(stamp) {
     *   console.log(_.now() - stamp);
     * }, _.now());
     * // => logs the number of milliseconds it took for the deferred function to be invoked
     */var now=Date.now; /*------------------------------------------------------------------------*/ /**
     * The opposite of `_.before`; this method creates a function that invokes
     * `func` once it's called `n` or more times.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {number} n The number of calls before `func` is invoked.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var saves = ['profile', 'settings'];
     *
     * var done = _.after(saves.length, function() {
     *   console.log('done saving!');
     * });
     *
     * _.forEach(saves, function(type) {
     *   asyncSave({ 'type': type, 'complete': done });
     * });
     * // => logs 'done saving!' after the two async saves have completed
     */function after(n,func){if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}n=toInteger(n);return function(){if(--n<1){return func.apply(this,arguments);}};} /**
     * Creates a function that accepts up to `n` arguments, ignoring any
     * additional arguments.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to cap arguments for.
     * @param {number} [n=func.length] The arity cap.
     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
     * @returns {Function} Returns the new function.
     * @example
     *
     * _.map(['6', '8', '10'], _.ary(parseInt, 1));
     * // => [6, 8, 10]
     */function ary(func,n,guard){n=guard?undefined:n;n=func&&n==null?func.length:n;return createWrapper(func,ARY_FLAG,undefined,undefined,undefined,undefined,n);} /**
     * Creates a function that invokes `func`, with the `this` binding and arguments
     * of the created function, while it's called less than `n` times. Subsequent
     * calls to the created function return the result of the last `func` invocation.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {number} n The number of calls at which `func` is no longer invoked.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * jQuery(element).on('click', _.before(5, addContactToList));
     * // => allows adding up to 4 contacts to the list
     */function before(n,func){var result;if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}n=toInteger(n);return function(){if(--n>0){result=func.apply(this,arguments);}if(n<=1){func=undefined;}return result;};} /**
     * Creates a function that invokes `func` with the `this` binding of `thisArg`
     * and prepends any additional `_.bind` arguments to those provided to the
     * bound function.
     *
     * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
     * may be used as a placeholder for partially applied arguments.
     *
     * **Note:** Unlike native `Function#bind` this method doesn't set the "length"
     * property of bound functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to bind.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * var greet = function(greeting, punctuation) {
     *   return greeting + ' ' + this.user + punctuation;
     * };
     *
     * var object = { 'user': 'fred' };
     *
     * var bound = _.bind(greet, object, 'hi');
     * bound('!');
     * // => 'hi fred!'
     *
     * // using placeholders
     * var bound = _.bind(greet, object, _, '!');
     * bound('hi');
     * // => 'hi fred!'
     */var bind=rest(function(func,thisArg,partials){var bitmask=BIND_FLAG;if(partials.length){var holders=replaceHolders(partials,bind.placeholder);bitmask|=PARTIAL_FLAG;}return createWrapper(func,bitmask,thisArg,partials,holders);}); /**
     * Creates a function that invokes the method at `object[key]` and prepends
     * any additional `_.bindKey` arguments to those provided to the bound function.
     *
     * This method differs from `_.bind` by allowing bound functions to reference
     * methods that may be redefined or don't yet exist.
     * See [Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern)
     * for more details.
     *
     * The `_.bindKey.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Object} object The object to invoke the method on.
     * @param {string} key The key of the method.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * var object = {
     *   'user': 'fred',
     *   'greet': function(greeting, punctuation) {
     *     return greeting + ' ' + this.user + punctuation;
     *   }
     * };
     *
     * var bound = _.bindKey(object, 'greet', 'hi');
     * bound('!');
     * // => 'hi fred!'
     *
     * object.greet = function(greeting, punctuation) {
     *   return greeting + 'ya ' + this.user + punctuation;
     * };
     *
     * bound('!');
     * // => 'hiya fred!'
     *
     * // using placeholders
     * var bound = _.bindKey(object, 'greet', _, '!');
     * bound('hi');
     * // => 'hiya fred!'
     */var bindKey=rest(function(object,key,partials){var bitmask=BIND_FLAG|BIND_KEY_FLAG;if(partials.length){var holders=replaceHolders(partials,bindKey.placeholder);bitmask|=PARTIAL_FLAG;}return createWrapper(key,bitmask,object,partials,holders);}); /**
     * Creates a function that accepts arguments of `func` and either invokes
     * `func` returning its result, if at least `arity` number of arguments have
     * been provided, or returns a function that accepts the remaining `func`
     * arguments, and so on. The arity of `func` may be specified if `func.length`
     * is not sufficient.
     *
     * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
     * may be used as a placeholder for provided arguments.
     *
     * **Note:** This method doesn't set the "length" property of curried functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var abc = function(a, b, c) {
     *   return [a, b, c];
     * };
     *
     * var curried = _.curry(abc);
     *
     * curried(1)(2)(3);
     * // => [1, 2, 3]
     *
     * curried(1, 2)(3);
     * // => [1, 2, 3]
     *
     * curried(1, 2, 3);
     * // => [1, 2, 3]
     *
     * // using placeholders
     * curried(1)(_, 3)(2);
     * // => [1, 2, 3]
     */function curry(func,arity,guard){arity=guard?undefined:arity;var result=createWrapper(func,CURRY_FLAG,undefined,undefined,undefined,undefined,undefined,arity);result.placeholder=curry.placeholder;return result;} /**
     * This method is like `_.curry` except that arguments are applied to `func`
     * in the manner of `_.partialRight` instead of `_.partial`.
     *
     * The `_.curryRight.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for provided arguments.
     *
     * **Note:** This method doesn't set the "length" property of curried functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var abc = function(a, b, c) {
     *   return [a, b, c];
     * };
     *
     * var curried = _.curryRight(abc);
     *
     * curried(3)(2)(1);
     * // => [1, 2, 3]
     *
     * curried(2, 3)(1);
     * // => [1, 2, 3]
     *
     * curried(1, 2, 3);
     * // => [1, 2, 3]
     *
     * // using placeholders
     * curried(3)(1, _)(2);
     * // => [1, 2, 3]
     */function curryRight(func,arity,guard){arity=guard?undefined:arity;var result=createWrapper(func,CURRY_RIGHT_FLAG,undefined,undefined,undefined,undefined,undefined,arity);result.placeholder=curryRight.placeholder;return result;} /**
     * Creates a debounced function that delays invoking `func` until after `wait`
     * milliseconds have elapsed since the last time the debounced function was
     * invoked. The debounced function comes with a `cancel` method to cancel
     * delayed `func` invocations and a `flush` method to immediately invoke them.
     * Provide an options object to indicate whether `func` should be invoked on
     * the leading and/or trailing edge of the `wait` timeout. The `func` is invoked
     * with the last arguments provided to the debounced function. Subsequent calls
     * to the debounced function return the result of the last `func` invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
     * on the trailing edge of the timeout only if the the debounced function is
     * invoked more than once during the `wait` timeout.
     *
     * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
     * for details over the differences between `_.debounce` and `_.throttle`.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to debounce.
     * @param {number} [wait=0] The number of milliseconds to delay.
     * @param {Object} [options] The options object.
     * @param {boolean} [options.leading=false] Specify invoking on the leading
     *  edge of the timeout.
     * @param {number} [options.maxWait] The maximum time `func` is allowed to be
     *  delayed before it's invoked.
     * @param {boolean} [options.trailing=true] Specify invoking on the trailing
     *  edge of the timeout.
     * @returns {Function} Returns the new debounced function.
     * @example
     *
     * // avoid costly calculations while the window size is in flux
     * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
     *
     * // invoke `sendMail` when clicked, debouncing subsequent calls
     * jQuery(element).on('click', _.debounce(sendMail, 300, {
     *   'leading': true,
     *   'trailing': false
     * }));
     *
     * // ensure `batchLog` is invoked once after 1 second of debounced calls
     * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
     * var source = new EventSource('/stream');
     * jQuery(source).on('message', debounced);
     *
     * // cancel a trailing debounced invocation
     * jQuery(window).on('popstate', debounced.cancel);
     */function debounce(func,wait,options){var args,maxTimeoutId,result,stamp,thisArg,timeoutId,trailingCall,lastCalled=0,leading=false,maxWait=false,trailing=true;if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}wait=toNumber(wait)||0;if(isObject(options)){leading=!!options.leading;maxWait='maxWait' in options&&nativeMax(toNumber(options.maxWait)||0,wait);trailing='trailing' in options?!!options.trailing:trailing;}function cancel(){if(timeoutId){clearTimeout(timeoutId);}if(maxTimeoutId){clearTimeout(maxTimeoutId);}lastCalled=0;args=maxTimeoutId=thisArg=timeoutId=trailingCall=undefined;}function complete(isCalled,id){if(id){clearTimeout(id);}maxTimeoutId=timeoutId=trailingCall=undefined;if(isCalled){lastCalled=now();result=func.apply(thisArg,args);if(!timeoutId&&!maxTimeoutId){args=thisArg=undefined;}}}function delayed(){var remaining=wait-(now()-stamp);if(remaining<=0||remaining>wait){complete(trailingCall,maxTimeoutId);}else {timeoutId=setTimeout(delayed,remaining);}}function flush(){if(timeoutId&&trailingCall||maxTimeoutId&&trailing){result=func.apply(thisArg,args);}cancel();return result;}function maxDelayed(){complete(trailing,timeoutId);}function debounced(){args=arguments;stamp=now();thisArg=this;trailingCall=trailing&&(timeoutId||!leading);if(maxWait===false){var leadingCall=leading&&!timeoutId;}else {if(!maxTimeoutId&&!leading){lastCalled=stamp;}var remaining=maxWait-(stamp-lastCalled),isCalled=remaining<=0||remaining>maxWait;if(isCalled){if(maxTimeoutId){maxTimeoutId=clearTimeout(maxTimeoutId);}lastCalled=stamp;result=func.apply(thisArg,args);}else if(!maxTimeoutId){maxTimeoutId=setTimeout(maxDelayed,remaining);}}if(isCalled&&timeoutId){timeoutId=clearTimeout(timeoutId);}else if(!timeoutId&&wait!==maxWait){timeoutId=setTimeout(delayed,wait);}if(leadingCall){isCalled=true;result=func.apply(thisArg,args);}if(isCalled&&!timeoutId&&!maxTimeoutId){args=thisArg=undefined;}return result;}debounced.cancel=cancel;debounced.flush=flush;return debounced;} /**
     * Defers invoking the `func` until the current call stack has cleared. Any
     * additional arguments are provided to `func` when it's invoked.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to defer.
     * @param {...*} [args] The arguments to invoke `func` with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.defer(function(text) {
     *   console.log(text);
     * }, 'deferred');
     * // logs 'deferred' after one or more milliseconds
     */var defer=rest(function(func,args){return baseDelay(func,1,args);}); /**
     * Invokes `func` after `wait` milliseconds. Any additional arguments are
     * provided to `func` when it's invoked.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @param {...*} [args] The arguments to invoke `func` with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.delay(function(text) {
     *   console.log(text);
     * }, 1000, 'later');
     * // => logs 'later' after one second
     */var delay=rest(function(func,wait,args){return baseDelay(func,toNumber(wait)||0,args);}); /**
     * Creates a function that invokes `func` with arguments reversed.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to flip arguments for.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var flipped = _.flip(function() {
     *   return _.toArray(arguments);
     * });
     *
     * flipped('a', 'b', 'c', 'd');
     * // => ['d', 'c', 'b', 'a']
     */function flip(func){return createWrapper(func,FLIP_FLAG);} /**
     * Creates a function that memoizes the result of `func`. If `resolver` is
     * provided it determines the cache key for storing the result based on the
     * arguments provided to the memoized function. By default, the first argument
     * provided to the memoized function is used as the map cache key. The `func`
     * is invoked with the `this` binding of the memoized function.
     *
     * **Note:** The cache is exposed as the `cache` property on the memoized
     * function. Its creation may be customized by replacing the `_.memoize.Cache`
     * constructor with one whose instances implement the [`Map`](http://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-map-prototype-object)
     * method interface of `delete`, `get`, `has`, and `set`.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to have its output memoized.
     * @param {Function} [resolver] The function to resolve the cache key.
     * @returns {Function} Returns the new memoizing function.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     * var other = { 'c': 3, 'd': 4 };
     *
     * var values = _.memoize(_.values);
     * values(object);
     * // => [1, 2]
     *
     * values(other);
     * // => [3, 4]
     *
     * object.a = 2;
     * values(object);
     * // => [1, 2]
     *
     * // modifying the result cache
     * values.cache.set(object, ['a', 'b']);
     * values(object);
     * // => ['a', 'b']
     *
     * // replacing `_.memoize.Cache`
     * _.memoize.Cache = WeakMap;
     */function memoize(func,resolver){if(typeof func!='function'||resolver&&typeof resolver!='function'){throw new TypeError(FUNC_ERROR_TEXT);}var memoized=function memoized(){var args=arguments,key=resolver?resolver.apply(this,args):args[0],cache=memoized.cache;if(cache.has(key)){return cache.get(key);}var result=func.apply(this,args);memoized.cache=cache.set(key,result);return result;};memoized.cache=new memoize.Cache();return memoized;} /**
     * Creates a function that negates the result of the predicate `func`. The
     * `func` predicate is invoked with the `this` binding and arguments of the
     * created function.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} predicate The predicate to negate.
     * @returns {Function} Returns the new function.
     * @example
     *
     * function isEven(n) {
     *   return n % 2 == 0;
     * }
     *
     * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
     * // => [1, 3, 5]
     */function negate(predicate){if(typeof predicate!='function'){throw new TypeError(FUNC_ERROR_TEXT);}return function(){return !predicate.apply(this,arguments);};} /**
     * Creates a function that is restricted to invoking `func` once. Repeat calls
     * to the function return the value of the first invocation. The `func` is
     * invoked with the `this` binding and arguments of the created function.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var initialize = _.once(createApplication);
     * initialize();
     * initialize();
     * // `initialize` invokes `createApplication` once
     */function once(func){return before(2,func);} /**
     * Creates a function that invokes `func` with arguments transformed by
     * corresponding `transforms`.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to wrap.
     * @param {...(Function|Function[])} [transforms] The functions to transform
     * arguments, specified individually or in arrays.
     * @returns {Function} Returns the new function.
     * @example
     *
     * function doubled(n) {
     *   return n * 2;
     * }
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var func = _.overArgs(function(x, y) {
     *   return [x, y];
     * }, square, doubled);
     *
     * func(9, 3);
     * // => [81, 6]
     *
     * func(10, 5);
     * // => [100, 10]
     */var overArgs=rest(function(func,transforms){transforms=arrayMap(baseFlatten(transforms),getIteratee());var funcsLength=transforms.length;return rest(function(args){var index=-1,length=nativeMin(args.length,funcsLength);while(++index<length){args[index]=transforms[index].call(this,args[index]);}return apply(func,this,args);});}); /**
     * Creates a function that invokes `func` with `partial` arguments prepended
     * to those provided to the new function. This method is like `_.bind` except
     * it does **not** alter the `this` binding.
     *
     * The `_.partial.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * **Note:** This method doesn't set the "length" property of partially
     * applied functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * var greet = function(greeting, name) {
     *   return greeting + ' ' + name;
     * };
     *
     * var sayHelloTo = _.partial(greet, 'hello');
     * sayHelloTo('fred');
     * // => 'hello fred'
     *
     * // using placeholders
     * var greetFred = _.partial(greet, _, 'fred');
     * greetFred('hi');
     * // => 'hi fred'
     */var partial=rest(function(func,partials){var holders=replaceHolders(partials,partial.placeholder);return createWrapper(func,PARTIAL_FLAG,undefined,partials,holders);}); /**
     * This method is like `_.partial` except that partially applied arguments
     * are appended to those provided to the new function.
     *
     * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * **Note:** This method doesn't set the "length" property of partially
     * applied functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * var greet = function(greeting, name) {
     *   return greeting + ' ' + name;
     * };
     *
     * var greetFred = _.partialRight(greet, 'fred');
     * greetFred('hi');
     * // => 'hi fred'
     *
     * // using placeholders
     * var sayHelloTo = _.partialRight(greet, 'hello', _);
     * sayHelloTo('fred');
     * // => 'hello fred'
     */var partialRight=rest(function(func,partials){var holders=replaceHolders(partials,partialRight.placeholder);return createWrapper(func,PARTIAL_RIGHT_FLAG,undefined,partials,holders);}); /**
     * Creates a function that invokes `func` with arguments arranged according
     * to the specified indexes where the argument value at the first index is
     * provided as the first argument, the argument value at the second index is
     * provided as the second argument, and so on.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to rearrange arguments for.
     * @param {...(number|number[])} indexes The arranged argument indexes,
     *  specified individually or in arrays.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var rearged = _.rearg(function(a, b, c) {
     *   return [a, b, c];
     * }, 2, 0, 1);
     *
     * rearged('b', 'c', 'a')
     * // => ['a', 'b', 'c']
     */var rearg=rest(function(func,indexes){return createWrapper(func,REARG_FLAG,undefined,undefined,undefined,baseFlatten(indexes));}); /**
     * Creates a function that invokes `func` with the `this` binding of the
     * created function and arguments from `start` and beyond provided as an array.
     *
     * **Note:** This method is based on the [rest parameter](https://mdn.io/rest_parameters).
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.rest(function(what, names) {
     *   return what + ' ' + _.initial(names).join(', ') +
     *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
     * });
     *
     * say('hello', 'fred', 'barney', 'pebbles');
     * // => 'hello fred, barney, & pebbles'
     */function rest(func,start){if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}start=nativeMax(start===undefined?func.length-1:toInteger(start),0);return function(){var args=arguments,index=-1,length=nativeMax(args.length-start,0),array=Array(length);while(++index<length){array[index]=args[start+index];}switch(start){case 0:return func.call(this,array);case 1:return func.call(this,args[0],array);case 2:return func.call(this,args[0],args[1],array);}var otherArgs=Array(start+1);index=-1;while(++index<start){otherArgs[index]=args[index];}otherArgs[start]=array;return apply(func,this,otherArgs);};} /**
     * Creates a function that invokes `func` with the `this` binding of the created
     * function and an array of arguments much like [`Function#apply`](https://es5.github.io/#x15.3.4.3).
     *
     * **Note:** This method is based on the [spread operator](https://mdn.io/spread_operator).
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to spread arguments over.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.spread(function(who, what) {
     *   return who + ' says ' + what;
     * });
     *
     * say(['fred', 'hello']);
     * // => 'fred says hello'
     *
     * // with a Promise
     * var numbers = Promise.all([
     *   Promise.resolve(40),
     *   Promise.resolve(36)
     * ]);
     *
     * numbers.then(_.spread(function(x, y) {
     *   return x + y;
     * }));
     * // => a Promise of 76
     */function spread(func){if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}return function(array){return apply(func,this,array);};} /**
     * Creates a throttled function that only invokes `func` at most once per
     * every `wait` milliseconds. The throttled function comes with a `cancel`
     * method to cancel delayed `func` invocations and a `flush` method to
     * immediately invoke them. Provide an options object to indicate whether
     * `func` should be invoked on the leading and/or trailing edge of the `wait`
     * timeout. The `func` is invoked with the last arguments provided to the
     * throttled function. Subsequent calls to the throttled function return the
     * result of the last `func` invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
     * on the trailing edge of the timeout only if the the throttled function is
     * invoked more than once during the `wait` timeout.
     *
     * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
     * for details over the differences between `_.throttle` and `_.debounce`.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to throttle.
     * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
     * @param {Object} [options] The options object.
     * @param {boolean} [options.leading=true] Specify invoking on the leading
     *  edge of the timeout.
     * @param {boolean} [options.trailing=true] Specify invoking on the trailing
     *  edge of the timeout.
     * @returns {Function} Returns the new throttled function.
     * @example
     *
     * // avoid excessively updating the position while scrolling
     * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
     *
     * // invoke `renewToken` when the click event is fired, but not more than once every 5 minutes
     * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
     * jQuery(element).on('click', throttled);
     *
     * // cancel a trailing throttled invocation
     * jQuery(window).on('popstate', throttled.cancel);
     */function throttle(func,wait,options){var leading=true,trailing=true;if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}if(isObject(options)){leading='leading' in options?!!options.leading:leading;trailing='trailing' in options?!!options.trailing:trailing;}return debounce(func,wait,{'leading':leading,'maxWait':wait,'trailing':trailing});} /**
     * Creates a function that accepts up to one argument, ignoring any
     * additional arguments.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to cap arguments for.
     * @returns {Function} Returns the new function.
     * @example
     *
     * _.map(['6', '8', '10'], _.unary(parseInt));
     * // => [6, 8, 10]
     */function unary(func){return ary(func,1);} /**
     * Creates a function that provides `value` to the wrapper function as its
     * first argument. Any additional arguments provided to the function are
     * appended to those provided to the wrapper function. The wrapper is invoked
     * with the `this` binding of the created function.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {*} value The value to wrap.
     * @param {Function} wrapper The wrapper function.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var p = _.wrap(_.escape, function(func, text) {
     *   return '<p>' + func(text) + '</p>';
     * });
     *
     * p('fred, barney, & pebbles');
     * // => '<p>fred, barney, &amp; pebbles</p>'
     */function wrap(value,wrapper){wrapper=wrapper==null?identity:wrapper;return partial(wrapper,value);} /*------------------------------------------------------------------------*/ /**
     * Creates a shallow clone of `value`.
     *
     * **Note:** This method is loosely based on the
     * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
     * and supports cloning arrays, array buffers, booleans, date objects, maps,
     * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
     * arrays. The own enumerable properties of `arguments` objects are cloned
     * as plain objects. An empty object is returned for uncloneable values such
     * as error objects, functions, DOM nodes, and WeakMaps.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to clone.
     * @returns {*} Returns the cloned value.
     * @example
     *
     * var objects = [{ 'a': 1 }, { 'b': 2 }];
     *
     * var shallow = _.clone(objects);
     * console.log(shallow[0] === objects[0]);
     * // => true
     */function clone(value){return baseClone(value);} /**
     * This method is like `_.clone` except that it accepts `customizer` which
     * is invoked to produce the cloned value. If `customizer` returns `undefined`
     * cloning is handled by the method instead. The `customizer` is invoked with
     * up to five arguments; (value [, index|key, object, stack]).
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to clone.
     * @param {Function} [customizer] The function to customize cloning.
     * @returns {*} Returns the cloned value.
     * @example
     *
     * function customizer(value) {
     *   if (_.isElement(value)) {
     *     return value.cloneNode(false);
     *   }
     * }
     *
     * var el = _.clone(document.body, customizer);
     *
     * console.log(el === document.body);
     * // => false
     * console.log(el.nodeName);
     * // => 'BODY'
     * console.log(el.childNodes.length);
     * // => 0
     */function cloneWith(value,customizer){return baseClone(value,false,customizer);} /**
     * This method is like `_.clone` except that it recursively clones `value`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to recursively clone.
     * @returns {*} Returns the deep cloned value.
     * @example
     *
     * var objects = [{ 'a': 1 }, { 'b': 2 }];
     *
     * var deep = _.cloneDeep(objects);
     * console.log(deep[0] === objects[0]);
     * // => false
     */function cloneDeep(value){return baseClone(value,true);} /**
     * This method is like `_.cloneWith` except that it recursively clones `value`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to recursively clone.
     * @param {Function} [customizer] The function to customize cloning.
     * @returns {*} Returns the deep cloned value.
     * @example
     *
     * function customizer(value) {
     *   if (_.isElement(value)) {
     *     return value.cloneNode(true);
     *   }
     * }
     *
     * var el = _.cloneDeep(document.body, customizer);
     *
     * console.log(el === document.body);
     * // => false
     * console.log(el.nodeName);
     * // => 'BODY'
     * console.log(el.childNodes.length);
     * // => 20
     */function cloneDeepWith(value,customizer){return baseClone(value,true,customizer);} /**
     * Performs a [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'user': 'fred' };
     * var other = { 'user': 'fred' };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */function eq(value,other){return value===other||value!==value&&other!==other;} /**
     * Checks if `value` is greater than `other`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than `other`, else `false`.
     * @example
     *
     * _.gt(3, 1);
     * // => true
     *
     * _.gt(3, 3);
     * // => false
     *
     * _.gt(1, 3);
     * // => false
     */function gt(value,other){return value>other;} /**
     * Checks if `value` is greater than or equal to `other`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than or equal to `other`, else `false`.
     * @example
     *
     * _.gte(3, 1);
     * // => true
     *
     * _.gte(3, 3);
     * // => true
     *
     * _.gte(1, 3);
     * // => false
     */function gte(value,other){return value>=other;} /**
     * Checks if `value` is likely an `arguments` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */function isArguments(value){ // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
return isArrayLikeObject(value)&&hasOwnProperty.call(value,'callee')&&(!propertyIsEnumerable.call(value,'callee')||objectToString.call(value)==argsTag);} /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @type Function
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */var isArray=Array.isArray; /**
     * Checks if `value` is array-like. A value is considered array-like if it's
     * not a function and has a `value.length` that's an integer greater than or
     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
     *
     * @static
     * @memberOf _
     * @type Function
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     * @example
     *
     * _.isArrayLike([1, 2, 3]);
     * // => true
     *
     * _.isArrayLike(document.body.children);
     * // => true
     *
     * _.isArrayLike('abc');
     * // => true
     *
     * _.isArrayLike(_.noop);
     * // => false
     */function isArrayLike(value){return value!=null&&!(typeof value=='function'&&isFunction(value))&&isLength(getLength(value));} /**
     * This method is like `_.isArrayLike` except that it also checks if `value`
     * is an object.
     *
     * @static
     * @memberOf _
     * @type Function
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
     * @example
     *
     * _.isArrayLikeObject([1, 2, 3]);
     * // => true
     *
     * _.isArrayLikeObject(document.body.children);
     * // => true
     *
     * _.isArrayLikeObject('abc');
     * // => false
     *
     * _.isArrayLikeObject(_.noop);
     * // => false
     */function isArrayLikeObject(value){return isObjectLike(value)&&isArrayLike(value);} /**
     * Checks if `value` is classified as a boolean primitive or object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isBoolean(false);
     * // => true
     *
     * _.isBoolean(null);
     * // => false
     */function isBoolean(value){return value===true||value===false||isObjectLike(value)&&objectToString.call(value)==boolTag;} /**
     * Checks if `value` is classified as a `Date` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isDate(new Date);
     * // => true
     *
     * _.isDate('Mon April 23 2012');
     * // => false
     */function isDate(value){return isObjectLike(value)&&objectToString.call(value)==dateTag;} /**
     * Checks if `value` is likely a DOM element.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
     * @example
     *
     * _.isElement(document.body);
     * // => true
     *
     * _.isElement('<body>');
     * // => false
     */function isElement(value){return !!value&&value.nodeType===1&&isObjectLike(value)&&!isPlainObject(value);} /**
     * Checks if `value` is empty. A value is considered empty unless it's an
     * `arguments` object, array, string, or jQuery-like collection with a length
     * greater than `0` or an object with own enumerable properties.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {Array|Object|string} value The value to inspect.
     * @returns {boolean} Returns `true` if `value` is empty, else `false`.
     * @example
     *
     * _.isEmpty(null);
     * // => true
     *
     * _.isEmpty(true);
     * // => true
     *
     * _.isEmpty(1);
     * // => true
     *
     * _.isEmpty([1, 2, 3]);
     * // => false
     *
     * _.isEmpty({ 'a': 1 });
     * // => false
     */function isEmpty(value){return !isObjectLike(value)||isFunction(value.splice)?!size(value):!keys(value).length;} /**
     * Performs a deep comparison between two values to determine if they are
     * equivalent.
     *
     * **Note:** This method supports comparing arrays, array buffers, booleans,
     * date objects, error objects, maps, numbers, `Object` objects, regexes,
     * sets, strings, symbols, and typed arrays. `Object` objects are compared
     * by their own, not inherited, enumerable properties. Functions and DOM
     * nodes are **not** supported.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'user': 'fred' };
     * var other = { 'user': 'fred' };
     *
     * _.isEqual(object, other);
     * // => true
     *
     * object === other;
     * // => false
     */function isEqual(value,other){return baseIsEqual(value,other);} /**
     * This method is like `_.isEqual` except that it accepts `customizer` which is
     * invoked to compare values. If `customizer` returns `undefined` comparisons are
     * handled by the method instead. The `customizer` is invoked with up to seven arguments:
     * (objValue, othValue [, index|key, object, other, stack]).
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * function isGreeting(value) {
     *   return /^h(?:i|ello)$/.test(value);
     * }
     *
     * function customizer(objValue, othValue) {
     *   if (isGreeting(objValue) && isGreeting(othValue)) {
     *     return true;
     *   }
     * }
     *
     * var array = ['hello', 'goodbye'];
     * var other = ['hi', 'goodbye'];
     *
     * _.isEqualWith(array, other, customizer);
     * // => true
     */function isEqualWith(value,other,customizer){customizer=typeof customizer=='function'?customizer:undefined;var result=customizer?customizer(value,other):undefined;return result===undefined?baseIsEqual(value,other,customizer):!!result;} /**
     * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
     * `SyntaxError`, `TypeError`, or `URIError` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
     * @example
     *
     * _.isError(new Error);
     * // => true
     *
     * _.isError(Error);
     * // => false
     */function isError(value){return isObjectLike(value)&&typeof value.message=='string'&&objectToString.call(value)==errorTag;} /**
     * Checks if `value` is a finite primitive number.
     *
     * **Note:** This method is based on [`Number.isFinite`](https://mdn.io/Number/isFinite).
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
     * @example
     *
     * _.isFinite(3);
     * // => true
     *
     * _.isFinite(Number.MAX_VALUE);
     * // => true
     *
     * _.isFinite(3.14);
     * // => true
     *
     * _.isFinite(Infinity);
     * // => false
     */function isFinite(value){return typeof value=='number'&&nativeIsFinite(value);} /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */function isFunction(value){ // The use of `Object#toString` avoids issues with the `typeof` operator
// in Safari 8 which returns 'object' for typed array constructors, and
// PhantomJS 1.9 which returns 'function' for `NodeList` instances.
var tag=isObject(value)?objectToString.call(value):'';return tag==funcTag||tag==genTag;} /**
     * Checks if `value` is an integer.
     *
     * **Note:** This method is based on [`Number.isInteger`](https://mdn.io/Number/isInteger).
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
     * @example
     *
     * _.isInteger(3);
     * // => true
     *
     * _.isInteger(Number.MIN_VALUE);
     * // => false
     *
     * _.isInteger(Infinity);
     * // => false
     *
     * _.isInteger('3');
     * // => false
     */function isInteger(value){return typeof value=='number'&&value==toInteger(value);} /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     * @example
     *
     * _.isLength(3);
     * // => true
     *
     * _.isLength(Number.MIN_VALUE);
     * // => false
     *
     * _.isLength(Infinity);
     * // => false
     *
     * _.isLength('3');
     * // => false
     */function isLength(value){return typeof value=='number'&&value>-1&&value%1==0&&value<=MAX_SAFE_INTEGER;} /**
     * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
     * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */function isObject(value){ // Avoid a V8 JIT bug in Chrome 19-20.
// See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
var type=typeof value==="undefined"?"undefined":_typeof(value);return !!value&&(type=='object'||type=='function');} /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */function isObjectLike(value){return !!value&&(typeof value==="undefined"?"undefined":_typeof(value))=='object';} /**
     * Performs a deep comparison between `object` and `source` to determine if
     * `object` contains equivalent property values.
     *
     * **Note:** This method supports comparing the same values as `_.isEqual`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     * @example
     *
     * var object = { 'user': 'fred', 'age': 40 };
     *
     * _.isMatch(object, { 'age': 40 });
     * // => true
     *
     * _.isMatch(object, { 'age': 36 });
     * // => false
     */function isMatch(object,source){return object===source||baseIsMatch(object,source,getMatchData(source));} /**
     * This method is like `_.isMatch` except that it accepts `customizer` which
     * is invoked to compare values. If `customizer` returns `undefined` comparisons
     * are handled by the method instead. The `customizer` is invoked with three
     * arguments: (objValue, srcValue, index|key, object, source).
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     * @example
     *
     * function isGreeting(value) {
     *   return /^h(?:i|ello)$/.test(value);
     * }
     *
     * function customizer(objValue, srcValue) {
     *   if (isGreeting(objValue) && isGreeting(srcValue)) {
     *     return true;
     *   }
     * }
     *
     * var object = { 'greeting': 'hello' };
     * var source = { 'greeting': 'hi' };
     *
     * _.isMatchWith(object, source, customizer);
     * // => true
     */function isMatchWith(object,source,customizer){customizer=typeof customizer=='function'?customizer:undefined;return baseIsMatch(object,source,getMatchData(source),customizer);} /**
     * Checks if `value` is `NaN`.
     *
     * **Note:** This method is not the same as [`isNaN`](https://es5.github.io/#x15.1.2.4)
     * which returns `true` for `undefined` and other non-numeric values.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
     * @example
     *
     * _.isNaN(NaN);
     * // => true
     *
     * _.isNaN(new Number(NaN));
     * // => true
     *
     * isNaN(undefined);
     * // => true
     *
     * _.isNaN(undefined);
     * // => false
     */function isNaN(value){ // An `NaN` primitive is the only value that is not equal to itself.
// Perform the `toStringTag` check first to avoid errors with some ActiveX objects in IE.
return isNumber(value)&&value!=+value;} /**
     * Checks if `value` is a native function.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
     * @example
     *
     * _.isNative(Array.prototype.push);
     * // => true
     *
     * _.isNative(_);
     * // => false
     */function isNative(value){if(value==null){return false;}if(isFunction(value)){return reIsNative.test(funcToString.call(value));}return isObjectLike(value)&&(isHostObject(value)?reIsNative:reIsHostCtor).test(value);} /**
     * Checks if `value` is `null`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
     * @example
     *
     * _.isNull(null);
     * // => true
     *
     * _.isNull(void 0);
     * // => false
     */function isNull(value){return value===null;} /**
     * Checks if `value` is `null` or `undefined`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
     * @example
     *
     * _.isNil(null);
     * // => true
     *
     * _.isNil(void 0);
     * // => true
     *
     * _.isNil(NaN);
     * // => false
     */function isNil(value){return value==null;} /**
     * Checks if `value` is classified as a `Number` primitive or object.
     *
     * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
     * as numbers, use the `_.isFinite` method.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isNumber(3);
     * // => true
     *
     * _.isNumber(Number.MIN_VALUE);
     * // => true
     *
     * _.isNumber(Infinity);
     * // => true
     *
     * _.isNumber('3');
     * // => false
     */function isNumber(value){return typeof value=='number'||isObjectLike(value)&&objectToString.call(value)==numberTag;} /**
     * Checks if `value` is a plain object, that is, an object created by the
     * `Object` constructor or one with a `[[Prototype]]` of `null`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * _.isPlainObject(new Foo);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     *
     * _.isPlainObject(Object.create(null));
     * // => true
     */function isPlainObject(value){if(!isObjectLike(value)||objectToString.call(value)!=objectTag||isHostObject(value)){return false;}var proto=objectProto;if(typeof value.constructor=='function'){proto=getPrototypeOf(value);}if(proto===null){return true;}var Ctor=proto.constructor;return typeof Ctor=='function'&&Ctor instanceof Ctor&&funcToString.call(Ctor)==objectCtorString;} /**
     * Checks if `value` is classified as a `RegExp` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isRegExp(/abc/);
     * // => true
     *
     * _.isRegExp('/abc/');
     * // => false
     */function isRegExp(value){return isObject(value)&&objectToString.call(value)==regexpTag;} /**
     * Checks if `value` is a safe integer. An integer is safe if it's an IEEE-754
     * double precision number which isn't the result of a rounded unsafe integer.
     *
     * **Note:** This method is based on [`Number.isSafeInteger`](https://mdn.io/Number/isSafeInteger).
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a safe integer, else `false`.
     * @example
     *
     * _.isSafeInteger(3);
     * // => true
     *
     * _.isSafeInteger(Number.MIN_VALUE);
     * // => false
     *
     * _.isSafeInteger(Infinity);
     * // => false
     *
     * _.isSafeInteger('3');
     * // => false
     */function isSafeInteger(value){return isInteger(value)&&value>=-MAX_SAFE_INTEGER&&value<=MAX_SAFE_INTEGER;} /**
     * Checks if `value` is classified as a `String` primitive or object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isString('abc');
     * // => true
     *
     * _.isString(1);
     * // => false
     */function isString(value){return typeof value=='string'||!isArray(value)&&isObjectLike(value)&&objectToString.call(value)==stringTag;} /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */function isSymbol(value){return (typeof value==="undefined"?"undefined":_typeof(value))=='symbol'||isObjectLike(value)&&objectToString.call(value)==symbolTag;} /**
     * Checks if `value` is classified as a typed array.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isTypedArray(new Uint8Array);
     * // => true
     *
     * _.isTypedArray([]);
     * // => false
     */function isTypedArray(value){return isObjectLike(value)&&isLength(value.length)&&!!typedArrayTags[objectToString.call(value)];} /**
     * Checks if `value` is `undefined`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
     * @example
     *
     * _.isUndefined(void 0);
     * // => true
     *
     * _.isUndefined(null);
     * // => false
     */function isUndefined(value){return value===undefined;} /**
     * Checks if `value` is less than `other`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than `other`, else `false`.
     * @example
     *
     * _.lt(1, 3);
     * // => true
     *
     * _.lt(3, 3);
     * // => false
     *
     * _.lt(3, 1);
     * // => false
     */function lt(value,other){return value<other;} /**
     * Checks if `value` is less than or equal to `other`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than or equal to `other`, else `false`.
     * @example
     *
     * _.lte(1, 3);
     * // => true
     *
     * _.lte(3, 3);
     * // => true
     *
     * _.lte(3, 1);
     * // => false
     */function lte(value,other){return value<=other;} /**
     * Converts `value` to an array.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Array} Returns the converted array.
     * @example
     *
     * _.toArray({ 'a': 1, 'b': 2 });
     * // => [1, 2]
     *
     * _.toArray('abc');
     * // => ['a', 'b', 'c']
     *
     * _.toArray(1);
     * // => []
     *
     * _.toArray(null);
     * // => []
     */function toArray(value){if(!value){return [];}if(isArrayLike(value)){return isString(value)?stringToArray(value):copyArray(value);}if(iteratorSymbol&&value[iteratorSymbol]){return iteratorToArray(value[iteratorSymbol]());}var tag=getTag(value),func=tag==mapTag?mapToArray:tag==setTag?setToArray:values;return func(value);} /**
     * Converts `value` to an integer.
     *
     * **Note:** This function is loosely based on [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toInteger(3);
     * // => 3
     *
     * _.toInteger(Number.MIN_VALUE);
     * // => 0
     *
     * _.toInteger(Infinity);
     * // => 1.7976931348623157e+308
     *
     * _.toInteger('3');
     * // => 3
     */function toInteger(value){if(!value){return value===0?value:0;}value=toNumber(value);if(value===INFINITY||value===-INFINITY){var sign=value<0?-1:1;return sign*MAX_INTEGER;}var remainder=value%1;return value===value?remainder?value-remainder:value:0;} /**
     * Converts `value` to an integer suitable for use as the length of an
     * array-like object.
     *
     * **Note:** This method is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to convert.
     * @return {number} Returns the converted integer.
     * @example
     *
     * _.toLength(3);
     * // => 3
     *
     * _.toLength(Number.MIN_VALUE);
     * // => 0
     *
     * _.toLength(Infinity);
     * // => 4294967295
     *
     * _.toLength('3');
     * // => 3
     */function toLength(value){return value?baseClamp(toInteger(value),0,MAX_ARRAY_LENGTH):0;} /**
     * Converts `value` to a number.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to process.
     * @returns {number} Returns the number.
     * @example
     *
     * _.toNumber(3);
     * // => 3
     *
     * _.toNumber(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toNumber(Infinity);
     * // => Infinity
     *
     * _.toNumber('3');
     * // => 3
     */function toNumber(value){if(isObject(value)){var other=isFunction(value.valueOf)?value.valueOf():value;value=isObject(other)?other+'':other;}if(typeof value!='string'){return value===0?value:+value;}value=value.replace(reTrim,'');var isBinary=reIsBinary.test(value);return isBinary||reIsOctal.test(value)?freeParseInt(value.slice(2),isBinary?2:8):reIsBadHex.test(value)?NAN:+value;} /**
     * Converts `value` to a plain object flattening inherited enumerable
     * properties of `value` to own properties of the plain object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Object} Returns the converted plain object.
     * @example
     *
     * function Foo() {
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.assign({ 'a': 1 }, new Foo);
     * // => { 'a': 1, 'b': 2 }
     *
     * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
     * // => { 'a': 1, 'b': 2, 'c': 3 }
     */function toPlainObject(value){return copyObject(value,keysIn(value));} /**
     * Converts `value` to a safe integer. A safe integer can be compared and
     * represented correctly.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toSafeInteger(3);
     * // => 3
     *
     * _.toSafeInteger(Number.MIN_VALUE);
     * // => 0
     *
     * _.toSafeInteger(Infinity);
     * // => 9007199254740991
     *
     * _.toSafeInteger('3');
     * // => 3
     */function toSafeInteger(value){return baseClamp(toInteger(value),-MAX_SAFE_INTEGER,MAX_SAFE_INTEGER);} /**
     * Converts `value` to a string if it's not one. An empty string is returned
     * for `null` and `undefined` values. The sign of `-0` is preserved.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     * @example
     *
     * _.toString(null);
     * // => ''
     *
     * _.toString(-0);
     * // => '-0'
     *
     * _.toString([1, 2, 3]);
     * // => '1,2,3'
     */function toString(value){ // Exit early for strings to avoid a performance hit in some environments.
if(typeof value=='string'){return value;}if(value==null){return '';}if(isSymbol(value)){return _Symbol?symbolToString.call(value):'';}var result=value+'';return result=='0'&&1/value==-INFINITY?'-0':result;} /*------------------------------------------------------------------------*/ /**
     * Assigns own enumerable properties of source objects to the destination
     * object. Source objects are applied from left to right. Subsequent sources
     * overwrite property assignments of previous sources.
     *
     * **Note:** This method mutates `object` and is loosely based on
     * [`Object.assign`](https://mdn.io/Object/assign).
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Foo() {
     *   this.c = 3;
     * }
     *
     * function Bar() {
     *   this.e = 5;
     * }
     *
     * Foo.prototype.d = 4;
     * Bar.prototype.f = 6;
     *
     * _.assign({ 'a': 1 }, new Foo, new Bar);
     * // => { 'a': 1, 'c': 3, 'e': 5 }
     */var assign=createAssigner(function(object,source){copyObject(source,keys(source),object);}); /**
     * This method is like `_.assign` except that it iterates over own and
     * inherited source properties.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @alias extend
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Foo() {
     *   this.b = 2;
     * }
     *
     * function Bar() {
     *   this.d = 4;
     * }
     *
     * Foo.prototype.c = 3;
     * Bar.prototype.e = 5;
     *
     * _.assignIn({ 'a': 1 }, new Foo, new Bar);
     * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5 }
     */var assignIn=createAssigner(function(object,source){copyObject(source,keysIn(source),object);}); /**
     * This method is like `_.assignIn` except that it accepts `customizer` which
     * is invoked to produce the assigned values. If `customizer` returns `undefined`
     * assignment is handled by the method instead. The `customizer` is invoked
     * with five arguments: (objValue, srcValue, key, object, source).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @alias extendWith
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} sources The source objects.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function customizer(objValue, srcValue) {
     *   return _.isUndefined(objValue) ? srcValue : objValue;
     * }
     *
     * var defaults = _.partialRight(_.assignInWith, customizer);
     *
     * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
     * // => { 'a': 1, 'b': 2 }
     */var assignInWith=createAssigner(function(object,source,customizer){copyObjectWith(source,keysIn(source),object,customizer);}); /**
     * This method is like `_.assign` except that it accepts `customizer` which
     * is invoked to produce the assigned values. If `customizer` returns `undefined`
     * assignment is handled by the method instead. The `customizer` is invoked
     * with five arguments: (objValue, srcValue, key, object, source).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} sources The source objects.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function customizer(objValue, srcValue) {
     *   return _.isUndefined(objValue) ? srcValue : objValue;
     * }
     *
     * var defaults = _.partialRight(_.assignWith, customizer);
     *
     * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
     * // => { 'a': 1, 'b': 2 }
     */var assignWith=createAssigner(function(object,source,customizer){copyObjectWith(source,keys(source),object,customizer);}); /**
     * Creates an array of values corresponding to `paths` of `object`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {...(string|string[])} [paths] The property paths of elements to pick,
     *  specified individually or in arrays.
     * @returns {Array} Returns the new array of picked elements.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
     *
     * _.at(object, ['a[0].b.c', 'a[1]']);
     * // => [3, 4]
     *
     * _.at(['a', 'b', 'c'], 0, 2);
     * // => ['a', 'c']
     */var at=rest(function(object,paths){return baseAt(object,baseFlatten(paths));}); /**
     * Creates an object that inherits from the `prototype` object. If a `properties`
     * object is provided its own enumerable properties are assigned to the created object.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} prototype The object to inherit from.
     * @param {Object} [properties] The properties to assign to the object.
     * @returns {Object} Returns the new object.
     * @example
     *
     * function Shape() {
     *   this.x = 0;
     *   this.y = 0;
     * }
     *
     * function Circle() {
     *   Shape.call(this);
     * }
     *
     * Circle.prototype = _.create(Shape.prototype, {
     *   'constructor': Circle
     * });
     *
     * var circle = new Circle;
     * circle instanceof Circle;
     * // => true
     *
     * circle instanceof Shape;
     * // => true
     */function create(prototype,properties){var result=baseCreate(prototype);return properties?baseAssign(result,properties):result;} /**
     * Assigns own and inherited enumerable properties of source objects to the
     * destination object for all destination properties that resolve to `undefined`.
     * Source objects are applied from left to right. Once a property is set,
     * additional values of the same property are ignored.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @example
     *
     * _.defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
     * // => { 'user': 'barney', 'age': 36 }
     */var defaults=rest(function(args){args.push(undefined,assignInDefaults);return apply(assignInWith,undefined,args);}); /**
     * This method is like `_.defaults` except that it recursively assigns
     * default properties.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @example
     *
     * _.defaultsDeep({ 'user': { 'name': 'barney' } }, { 'user': { 'name': 'fred', 'age': 36 } });
     * // => { 'user': { 'name': 'barney', 'age': 36 } }
     *
     */var defaultsDeep=rest(function(args){args.push(undefined,mergeDefaults);return apply(mergeWith,undefined,args);}); /**
     * This method is like `_.find` except that it returns the key of the first
     * element `predicate` returns truthy for instead of the element itself.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
     * @returns {string|undefined} Returns the key of the matched element, else `undefined`.
     * @example
     *
     * var users = {
     *   'barney':  { 'age': 36, 'active': true },
     *   'fred':    { 'age': 40, 'active': false },
     *   'pebbles': { 'age': 1,  'active': true }
     * };
     *
     * _.findKey(users, function(o) { return o.age < 40; });
     * // => 'barney' (iteration order is not guaranteed)
     *
     * // using the `_.matches` iteratee shorthand
     * _.findKey(users, { 'age': 1, 'active': true });
     * // => 'pebbles'
     *
     * // using the `_.matchesProperty` iteratee shorthand
     * _.findKey(users, ['active', false]);
     * // => 'fred'
     *
     * // using the `_.property` iteratee shorthand
     * _.findKey(users, 'active');
     * // => 'barney'
     */function findKey(object,predicate){return baseFind(object,getIteratee(predicate,3),baseForOwn,true);} /**
     * This method is like `_.findKey` except that it iterates over elements of
     * a collection in the opposite order.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
     * @returns {string|undefined} Returns the key of the matched element, else `undefined`.
     * @example
     *
     * var users = {
     *   'barney':  { 'age': 36, 'active': true },
     *   'fred':    { 'age': 40, 'active': false },
     *   'pebbles': { 'age': 1,  'active': true }
     * };
     *
     * _.findLastKey(users, function(o) { return o.age < 40; });
     * // => returns 'pebbles' assuming `_.findKey` returns 'barney'
     *
     * // using the `_.matches` iteratee shorthand
     * _.findLastKey(users, { 'age': 36, 'active': true });
     * // => 'barney'
     *
     * // using the `_.matchesProperty` iteratee shorthand
     * _.findLastKey(users, ['active', false]);
     * // => 'fred'
     *
     * // using the `_.property` iteratee shorthand
     * _.findLastKey(users, 'active');
     * // => 'pebbles'
     */function findLastKey(object,predicate){return baseFind(object,getIteratee(predicate,3),baseForOwnRight,true);} /**
     * Iterates over own and inherited enumerable properties of an object invoking
     * `iteratee` for each property. The iteratee is invoked with three arguments:
     * (value, key, object). Iteratee functions may exit iteration early by explicitly
     * returning `false`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forIn(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'a', 'b', then 'c' (iteration order is not guaranteed)
     */function forIn(object,iteratee){return object==null?object:baseFor(object,toFunction(iteratee),keysIn);} /**
     * This method is like `_.forIn` except that it iterates over properties of
     * `object` in the opposite order.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forInRight(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'c', 'b', then 'a' assuming `_.forIn` logs 'a', 'b', then 'c'
     */function forInRight(object,iteratee){return object==null?object:baseForRight(object,toFunction(iteratee),keysIn);} /**
     * Iterates over own enumerable properties of an object invoking `iteratee`
     * for each property. The iteratee is invoked with three arguments:
     * (value, key, object). Iteratee functions may exit iteration early by
     * explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forOwn(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'a' then 'b' (iteration order is not guaranteed)
     */function forOwn(object,iteratee){return object&&baseForOwn(object,toFunction(iteratee));} /**
     * This method is like `_.forOwn` except that it iterates over properties of
     * `object` in the opposite order.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forOwnRight(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'b' then 'a' assuming `_.forOwn` logs 'a' then 'b'
     */function forOwnRight(object,iteratee){return object&&baseForOwnRight(object,toFunction(iteratee));} /**
     * Creates an array of function property names from own enumerable properties
     * of `object`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns the new array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = _.constant('a');
     *   this.b = _.constant('b');
     * }
     *
     * Foo.prototype.c = _.constant('c');
     *
     * _.functions(new Foo);
     * // => ['a', 'b']
     */function functions(object){return object==null?[]:baseFunctions(object,keys(object));} /**
     * Creates an array of function property names from own and inherited
     * enumerable properties of `object`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns the new array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = _.constant('a');
     *   this.b = _.constant('b');
     * }
     *
     * Foo.prototype.c = _.constant('c');
     *
     * _.functionsIn(new Foo);
     * // => ['a', 'b', 'c']
     */function functionsIn(object){return object==null?[]:baseFunctions(object,keysIn(object));} /**
     * Gets the value at `path` of `object`. If the resolved value is
     * `undefined` the `defaultValue` is used in its place.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.get(object, 'a[0].b.c');
     * // => 3
     *
     * _.get(object, ['a', '0', 'b', 'c']);
     * // => 3
     *
     * _.get(object, 'a.b.c', 'default');
     * // => 'default'
     */function get(object,path,defaultValue){var result=object==null?undefined:baseGet(object,path);return result===undefined?defaultValue:result;} /**
     * Checks if `path` is a direct property of `object`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     * @example
     *
     * var object = { 'a': { 'b': { 'c': 3 } } };
     * var other = _.create({ 'a': _.create({ 'b': _.create({ 'c': 3 }) }) });
     *
     * _.has(object, 'a');
     * // => true
     *
     * _.has(object, 'a.b.c');
     * // => true
     *
     * _.has(object, ['a', 'b', 'c']);
     * // => true
     *
     * _.has(other, 'a');
     * // => false
     */function has(object,path){return hasPath(object,path,baseHas);} /**
     * Checks if `path` is a direct or inherited property of `object`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     * @example
     *
     * var object = _.create({ 'a': _.create({ 'b': _.create({ 'c': 3 }) }) });
     *
     * _.hasIn(object, 'a');
     * // => true
     *
     * _.hasIn(object, 'a.b.c');
     * // => true
     *
     * _.hasIn(object, ['a', 'b', 'c']);
     * // => true
     *
     * _.hasIn(object, 'b');
     * // => false
     */function hasIn(object,path){return hasPath(object,path,baseHasIn);} /**
     * Creates an object composed of the inverted keys and values of `object`.
     * If `object` contains duplicate values, subsequent values overwrite property
     * assignments of previous values unless `multiVal` is `true`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to invert.
     * @param {boolean} [multiVal] Allow multiple values per key.
     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
     * @returns {Object} Returns the new inverted object.
     * @example
     *
     * var object = { 'a': 1, 'b': 2, 'c': 1 };
     *
     * _.invert(object);
     * // => { '1': 'c', '2': 'b' }
     *
     * // with `multiVal`
     * _.invert(object, true);
     * // => { '1': ['a', 'c'], '2': ['b'] }
     */function invert(object,multiVal,guard){return arrayReduce(keys(object),function(result,key){var value=object[key];if(multiVal&&!guard){if(hasOwnProperty.call(result,value)){result[value].push(key);}else {result[value]=[key];}}else {result[value]=key;}return result;},{});} /**
     * Invokes the method at `path` of `object`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the method to invoke.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {*} Returns the result of the invoked method.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] };
     *
     * _.invoke(object, 'a[0].b.c.slice', 1, 3);
     * // => [2, 3]
     */var invoke=rest(baseInvoke); /**
     * Creates an array of the own enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects. See the
     * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
     * for more details.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     *
     * _.keys('hi');
     * // => ['0', '1']
     */function keys(object){var isProto=isPrototype(object);if(!(isProto||isArrayLike(object))){return baseKeys(object);}var indexes=indexKeys(object),skipIndexes=!!indexes,result=indexes||[],length=result.length;for(var key in object){if(baseHas(object,key)&&!(skipIndexes&&(key=='length'||isIndex(key,length)))&&!(isProto&&key=='constructor')){result.push(key);}}return result;} /**
     * Creates an array of the own and inherited enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keysIn(new Foo);
     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
     */function keysIn(object){var index=-1,isProto=isPrototype(object),props=baseKeysIn(object),propsLength=props.length,indexes=indexKeys(object),skipIndexes=!!indexes,result=indexes||[],length=result.length;while(++index<propsLength){var key=props[index];if(!(skipIndexes&&(key=='length'||isIndex(key,length)))&&!(key=='constructor'&&(isProto||!hasOwnProperty.call(object,key)))){result.push(key);}}return result;} /**
     * The opposite of `_.mapValues`; this method creates an object with the
     * same values as `object` and keys generated by running each own enumerable
     * property of `object` through `iteratee`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns the new mapped object.
     * @example
     *
     * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
     *   return key + value;
     * });
     * // => { 'a1': 1, 'b2': 2 }
     */function mapKeys(object,iteratee){var result={};iteratee=getIteratee(iteratee,3);baseForOwn(object,function(value,key,object){result[iteratee(value,key,object)]=value;});return result;} /**
     * Creates an object with the same keys as `object` and values generated by
     * running each own enumerable property of `object` through `iteratee`. The
     * iteratee function is invoked with three arguments: (value, key, object).
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns the new mapped object.
     * @example
     *
     * var users = {
     *   'fred':    { 'user': 'fred',    'age': 40 },
     *   'pebbles': { 'user': 'pebbles', 'age': 1 }
     * };
     *
     * _.mapValues(users, function(o) { return o.age; });
     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
     *
     * // using the `_.property` iteratee shorthand
     * _.mapValues(users, 'age');
     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
     */function mapValues(object,iteratee){var result={};iteratee=getIteratee(iteratee,3);baseForOwn(object,function(value,key,object){result[key]=iteratee(value,key,object);});return result;} /**
     * Recursively merges own and inherited enumerable properties of source
     * objects into the destination object, skipping source properties that resolve
     * to `undefined`. Array and plain object properties are merged recursively.
     * Other objects and value types are overridden by assignment. Source objects
     * are applied from left to right. Subsequent sources overwrite property
     * assignments of previous sources.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var users = {
     *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
     * };
     *
     * var ages = {
     *   'data': [{ 'age': 36 }, { 'age': 40 }]
     * };
     *
     * _.merge(users, ages);
     * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
     */var merge=createAssigner(function(object,source){baseMerge(object,source);}); /**
     * This method is like `_.merge` except that it accepts `customizer` which
     * is invoked to produce the merged values of the destination and source
     * properties. If `customizer` returns `undefined` merging is handled by the
     * method instead. The `customizer` is invoked with seven arguments:
     * (objValue, srcValue, key, object, source, stack).
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} sources The source objects.
     * @param {Function} customizer The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function customizer(objValue, srcValue) {
     *   if (_.isArray(objValue)) {
     *     return objValue.concat(srcValue);
     *   }
     * }
     *
     * var object = {
     *   'fruits': ['apple'],
     *   'vegetables': ['beet']
     * };
     *
     * var other = {
     *   'fruits': ['banana'],
     *   'vegetables': ['carrot']
     * };
     *
     * _.mergeWith(object, other, customizer);
     * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
     */var mergeWith=createAssigner(function(object,source,customizer){baseMerge(object,source,customizer);}); /**
     * The opposite of `_.pick`; this method creates an object composed of the
     * own and inherited enumerable properties of `object` that are not omitted.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {...(string|string[])} [props] The property names to omit, specified
     *  individually or in arrays..
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.omit(object, ['a', 'c']);
     * // => { 'b': '2' }
     */var omit=rest(function(object,props){if(object==null){return {};}props=arrayMap(baseFlatten(props),String);return basePick(object,baseDifference(keysIn(object),props));}); /**
     * The opposite of `_.pickBy`; this method creates an object composed of the
     * own and inherited enumerable properties of `object` that `predicate`
     * doesn't return truthy for.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked per property.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.omitBy(object, _.isNumber);
     * // => { 'b': '2' }
     */function omitBy(object,predicate){predicate=getIteratee(predicate);return basePickBy(object,function(value){return !predicate(value);});} /**
     * Creates an object composed of the picked `object` properties.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {...(string|string[])} [props] The property names to pick, specified
     *  individually or in arrays.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.pick(object, ['a', 'c']);
     * // => { 'a': 1, 'c': 3 }
     */var pick=rest(function(object,props){return object==null?{}:basePick(object,baseFlatten(props));}); /**
     * Creates an object composed of the `object` properties `predicate` returns
     * truthy for. The predicate is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked per property.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.pickBy(object, _.isNumber);
     * // => { 'a': 1, 'c': 3 }
     */function pickBy(object,predicate){return object==null?{}:basePickBy(object,getIteratee(predicate));} /**
     * This method is like `_.get` except that if the resolved value is a function
     * it's invoked with the `this` binding of its parent object and its result
     * is returned.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to resolve.
     * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
     *
     * _.result(object, 'a[0].b.c1');
     * // => 3
     *
     * _.result(object, 'a[0].b.c2');
     * // => 4
     *
     * _.result(object, 'a[0].b.c3', 'default');
     * // => 'default'
     *
     * _.result(object, 'a[0].b.c3', _.constant('default'));
     * // => 'default'
     */function result(object,path,defaultValue){if(!isKey(path,object)){path=baseToPath(path);var result=get(object,path);object=parent(object,path);}else {result=object==null?undefined:object[path];}if(result===undefined){result=defaultValue;}return isFunction(result)?result.call(object):result;} /**
     * Sets the value at `path` of `object`. If a portion of `path` doesn't exist
     * it's created. Arrays are created for missing index properties while objects
     * are created for all other missing properties. Use `_.setWith` to customize
     * `path` creation.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.set(object, 'a[0].b.c', 4);
     * console.log(object.a[0].b.c);
     * // => 4
     *
     * _.set(object, 'x[0].y.z', 5);
     * console.log(object.x[0].y.z);
     * // => 5
     */function set(object,path,value){return object==null?object:baseSet(object,path,value);} /**
     * This method is like `_.set` except that it accepts `customizer` which is
     * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
     * path creation is handled by the method instead. The `customizer` is invoked
     * with three arguments: (nsValue, key, nsObject).
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @example
     *
     * _.setWith({ '0': { 'length': 2 } }, '[0][1][2]', 3, Object);
     * // => { '0': { '1': { '2': 3 }, 'length': 2 } }
     */function setWith(object,path,value,customizer){customizer=typeof customizer=='function'?customizer:undefined;return object==null?object:baseSet(object,path,value,customizer);} /**
     * Creates an array of own enumerable key-value pairs for `object`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the new array of key-value pairs.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.toPairs(new Foo);
     * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
     */function toPairs(object){return baseToPairs(object,keys(object));} /**
     * Creates an array of own and inherited enumerable key-value pairs for `object`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the new array of key-value pairs.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.toPairsIn(new Foo);
     * // => [['a', 1], ['b', 2], ['c', 1]] (iteration order is not guaranteed)
     */function toPairsIn(object){return baseToPairs(object,keysIn(object));} /**
     * An alternative to `_.reduce`; this method transforms `object` to a new
     * `accumulator` object which is the result of running each of its own enumerable
     * properties through `iteratee`, with each invocation potentially mutating
     * the `accumulator` object. The iteratee is invoked with four arguments:
     * (accumulator, value, key, object). Iteratee functions may exit iteration
     * early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Array|Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The custom accumulator value.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * _.transform([2, 3, 4], function(result, n) {
     *   result.push(n *= n);
     *   return n % 2 == 0;
     * });
     * // => [4, 9]
     *
     * _.transform({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
     *   (result[value] || (result[value] = [])).push(key);
     * });
     * // => { '1': ['a', 'c'], '2': ['b'] }
     */function transform(object,iteratee,accumulator){var isArr=isArray(object)||isTypedArray(object);iteratee=getIteratee(iteratee,4);if(accumulator==null){if(isArr||isObject(object)){var Ctor=object.constructor;if(isArr){accumulator=isArray(object)?new Ctor():[];}else {accumulator=baseCreate(isFunction(Ctor)?Ctor.prototype:undefined);}}else {accumulator={};}}(isArr?arrayEach:baseForOwn)(object,function(value,index,object){return iteratee(accumulator,value,index,object);});return accumulator;} /**
     * Removes the property at `path` of `object`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to unset.
     * @returns {boolean} Returns `true` if the property is deleted, else `false`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 7 } }] };
     * _.unset(object, 'a[0].b.c');
     * // => true
     *
     * console.log(object);
     * // => { 'a': [{ 'b': {} }] };
     *
     * _.unset(object, 'a[0].b.c');
     * // => true
     *
     * console.log(object);
     * // => { 'a': [{ 'b': {} }] };
     */function unset(object,path){return object==null?true:baseUnset(object,path);} /**
     * Creates an array of the own enumerable property values of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property values.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.values(new Foo);
     * // => [1, 2] (iteration order is not guaranteed)
     *
     * _.values('hi');
     * // => ['h', 'i']
     */function values(object){return object?baseValues(object,keys(object)):[];} /**
     * Creates an array of the own and inherited enumerable property values of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property values.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.valuesIn(new Foo);
     * // => [1, 2, 3] (iteration order is not guaranteed)
     */function valuesIn(object){return object==null?baseValues(object,keysIn(object)):[];} /*------------------------------------------------------------------------*/ /**
     * Clamps `number` within the inclusive `lower` and `upper` bounds.
     *
     * @static
     * @memberOf _
     * @category Number
     * @param {number} number The number to clamp.
     * @param {number} [lower] The lower bound.
     * @param {number} upper The upper bound.
     * @returns {number} Returns the clamped number.
     * @example
     *
     * _.clamp(-10, -5, 5);
     * // => -5
     *
     * _.clamp(10, -5, 5);
     * // => 5
     */function clamp(number,lower,upper){if(upper===undefined){upper=lower;lower=undefined;}if(upper!==undefined){upper=toNumber(upper);upper=upper===upper?upper:0;}if(lower!==undefined){lower=toNumber(lower);lower=lower===lower?lower:0;}return baseClamp(toNumber(number),lower,upper);} /**
     * Checks if `n` is between `start` and up to but not including, `end`. If
     * `end` is not specified it's set to `start` with `start` then set to `0`.
     * If `start` is greater than `end` the params are swapped to support
     * negative ranges.
     *
     * @static
     * @memberOf _
     * @category Number
     * @param {number} number The number to check.
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
     * @example
     *
     * _.inRange(3, 2, 4);
     * // => true
     *
     * _.inRange(4, 8);
     * // => true
     *
     * _.inRange(4, 2);
     * // => false
     *
     * _.inRange(2, 2);
     * // => false
     *
     * _.inRange(1.2, 2);
     * // => true
     *
     * _.inRange(5.2, 4);
     * // => false
     *
     * _.inRange(-3, -2, -6);
     * // => true
     */function inRange(number,start,end){start=toNumber(start)||0;if(end===undefined){end=start;start=0;}else {end=toNumber(end)||0;}number=toNumber(number);return baseInRange(number,start,end);} /**
     * Produces a random number between the inclusive `lower` and `upper` bounds.
     * If only one argument is provided a number between `0` and the given number
     * is returned. If `floating` is `true`, or either `lower` or `upper` are floats,
     * a floating-point number is returned instead of an integer.
     *
     * **Note:** JavaScript follows the IEEE-754 standard for resolving
     * floating-point values which can produce unexpected results.
     *
     * @static
     * @memberOf _
     * @category Number
     * @param {number} [lower=0] The lower bound.
     * @param {number} [upper=1] The upper bound.
     * @param {boolean} [floating] Specify returning a floating-point number.
     * @returns {number} Returns the random number.
     * @example
     *
     * _.random(0, 5);
     * // => an integer between 0 and 5
     *
     * _.random(5);
     * // => also an integer between 0 and 5
     *
     * _.random(5, true);
     * // => a floating-point number between 0 and 5
     *
     * _.random(1.2, 5.2);
     * // => a floating-point number between 1.2 and 5.2
     */function random(lower,upper,floating){if(floating&&typeof floating!='boolean'&&isIterateeCall(lower,upper,floating)){upper=floating=undefined;}if(floating===undefined){if(typeof upper=='boolean'){floating=upper;upper=undefined;}else if(typeof lower=='boolean'){floating=lower;lower=undefined;}}if(lower===undefined&&upper===undefined){lower=0;upper=1;}else {lower=toNumber(lower)||0;if(upper===undefined){upper=lower;lower=0;}else {upper=toNumber(upper)||0;}}if(lower>upper){var temp=lower;lower=upper;upper=temp;}if(floating||lower%1||upper%1){var rand=nativeRandom();return nativeMin(lower+rand*(upper-lower+freeParseFloat('1e-'+((rand+'').length-1))),upper);}return baseRandom(lower,upper);} /*------------------------------------------------------------------------*/ /**
     * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the camel cased string.
     * @example
     *
     * _.camelCase('Foo Bar');
     * // => 'fooBar'
     *
     * _.camelCase('--foo-bar');
     * // => 'fooBar'
     *
     * _.camelCase('__foo_bar__');
     * // => 'fooBar'
     */var camelCase=createCompounder(function(result,word,index){word=word.toLowerCase();return result+(index?capitalize(word):word);}); /**
     * Converts the first character of `string` to upper case and the remaining
     * to lower case.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to capitalize.
     * @returns {string} Returns the capitalized string.
     * @example
     *
     * _.capitalize('FRED');
     * // => 'Fred'
     */function capitalize(string){return upperFirst(toString(string).toLowerCase());} /**
     * Deburrs `string` by converting [latin-1 supplementary letters](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
     * to basic latin letters and removing [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to deburr.
     * @returns {string} Returns the deburred string.
     * @example
     *
     * _.deburr('déjà vu');
     * // => 'deja vu'
     */function deburr(string){string=toString(string);return string&&string.replace(reLatin1,deburrLetter).replace(reComboMark,'');} /**
     * Checks if `string` ends with the given target string.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to search.
     * @param {string} [target] The string to search for.
     * @param {number} [position=string.length] The position to search from.
     * @returns {boolean} Returns `true` if `string` ends with `target`, else `false`.
     * @example
     *
     * _.endsWith('abc', 'c');
     * // => true
     *
     * _.endsWith('abc', 'b');
     * // => false
     *
     * _.endsWith('abc', 'b', 2);
     * // => true
     */function endsWith(string,target,position){string=toString(string);target=typeof target=='string'?target:target+'';var length=string.length;position=position===undefined?length:baseClamp(toInteger(position),0,length);position-=target.length;return position>=0&&string.indexOf(target,position)==position;} /**
     * Converts the characters "&", "<", ">", '"', "'", and "\`" in `string` to
     * their corresponding HTML entities.
     *
     * **Note:** No other characters are escaped. To escape additional
     * characters use a third-party library like [_he_](https://mths.be/he).
     *
     * Though the ">" character is escaped for symmetry, characters like
     * ">" and "/" don't need escaping in HTML and have no special meaning
     * unless they're part of a tag or unquoted attribute value.
     * See [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
     * (under "semi-related fun fact") for more details.
     *
     * Backticks are escaped because in IE < 9, they can break out of
     * attribute values or HTML comments. See [#59](https://html5sec.org/#59),
     * [#102](https://html5sec.org/#102), [#108](https://html5sec.org/#108), and
     * [#133](https://html5sec.org/#133) of the [HTML5 Security Cheatsheet](https://html5sec.org/)
     * for more details.
     *
     * When working with HTML you should always [quote attribute values](http://wonko.com/post/html-escaping)
     * to reduce XSS vectors.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escape('fred, barney, & pebbles');
     * // => 'fred, barney, &amp; pebbles'
     */function escape(string){string=toString(string);return string&&reHasUnescapedHtml.test(string)?string.replace(reUnescapedHtml,escapeHtmlChar):string;} /**
     * Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
     * "?", "(", ")", "[", "]", "{", "}", and "|" in `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escapeRegExp('[lodash](https://lodash.com/)');
     * // => '\[lodash\]\(https://lodash\.com/\)'
     */function escapeRegExp(string){string=toString(string);return string&&reHasRegExpChar.test(string)?string.replace(reRegExpChar,'\\$&'):string;} /**
     * Converts `string` to [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the kebab cased string.
     * @example
     *
     * _.kebabCase('Foo Bar');
     * // => 'foo-bar'
     *
     * _.kebabCase('fooBar');
     * // => 'foo-bar'
     *
     * _.kebabCase('__foo_bar__');
     * // => 'foo-bar'
     */var kebabCase=createCompounder(function(result,word,index){return result+(index?'-':'')+word.toLowerCase();}); /**
     * Converts `string`, as space separated words, to lower case.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the lower cased string.
     * @example
     *
     * _.lowerCase('--Foo-Bar');
     * // => 'foo bar'
     *
     * _.lowerCase('fooBar');
     * // => 'foo bar'
     *
     * _.lowerCase('__FOO_BAR__');
     * // => 'foo bar'
     */var lowerCase=createCompounder(function(result,word,index){return result+(index?' ':'')+word.toLowerCase();}); /**
     * Converts the first character of `string` to lower case.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.lowerFirst('Fred');
     * // => 'fred'
     *
     * _.lowerFirst('FRED');
     * // => 'fRED'
     */var lowerFirst=createCaseFirst('toLowerCase'); /**
     * Converts the first character of `string` to upper case.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.upperFirst('fred');
     * // => 'Fred'
     *
     * _.upperFirst('FRED');
     * // => 'FRED'
     */var upperFirst=createCaseFirst('toUpperCase'); /**
     * Pads `string` on the left and right sides if it's shorter than `length`.
     * Padding characters are truncated if they can't be evenly divided by `length`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.pad('abc', 8);
     * // => '  abc   '
     *
     * _.pad('abc', 8, '_-');
     * // => '_-abc_-_'
     *
     * _.pad('abc', 3);
     * // => 'abc'
     */function pad(string,length,chars){string=toString(string);length=toInteger(length);var strLength=stringSize(string);if(!length||strLength>=length){return string;}var mid=(length-strLength)/2,leftLength=nativeFloor(mid),rightLength=nativeCeil(mid);return createPadding('',leftLength,chars)+string+createPadding('',rightLength,chars);} /**
     * Pads `string` on the right side if it's shorter than `length`. Padding
     * characters are truncated if they exceed `length`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.padEnd('abc', 6);
     * // => 'abc   '
     *
     * _.padEnd('abc', 6, '_-');
     * // => 'abc_-_'
     *
     * _.padEnd('abc', 3);
     * // => 'abc'
     */function padEnd(string,length,chars){string=toString(string);return string+createPadding(string,length,chars);} /**
     * Pads `string` on the left side if it's shorter than `length`. Padding
     * characters are truncated if they exceed `length`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.padStart('abc', 6);
     * // => '   abc'
     *
     * _.padStart('abc', 6, '_-');
     * // => '_-_abc'
     *
     * _.padStart('abc', 3);
     * // => 'abc'
     */function padStart(string,length,chars){string=toString(string);return createPadding(string,length,chars)+string;} /**
     * Converts `string` to an integer of the specified radix. If `radix` is
     * `undefined` or `0`, a `radix` of `10` is used unless `value` is a hexadecimal,
     * in which case a `radix` of `16` is used.
     *
     * **Note:** This method aligns with the [ES5 implementation](https://es5.github.io/#E)
     * of `parseInt`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} string The string to convert.
     * @param {number} [radix] The radix to interpret `value` by.
     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.parseInt('08');
     * // => 8
     *
     * _.map(['6', '08', '10'], _.parseInt);
     * // => [6, 8, 10]
     */function parseInt(string,radix,guard){ // Chrome fails to trim leading <BOM> whitespace characters.
// See https://code.google.com/p/v8/issues/detail?id=3109 for more details.
if(guard||radix==null){radix=0;}else if(radix){radix=+radix;}string=toString(string).replace(reTrim,'');return nativeParseInt(string,radix||(reHasHexPrefix.test(string)?16:10));} /**
     * Repeats the given string `n` times.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to repeat.
     * @param {number} [n=0] The number of times to repeat the string.
     * @returns {string} Returns the repeated string.
     * @example
     *
     * _.repeat('*', 3);
     * // => '***'
     *
     * _.repeat('abc', 2);
     * // => 'abcabc'
     *
     * _.repeat('abc', 0);
     * // => ''
     */function repeat(string,n){string=toString(string);n=toInteger(n);var result='';if(!string||n<1||n>MAX_SAFE_INTEGER){return result;} // Leverage the exponentiation by squaring algorithm for a faster repeat.
// See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
do {if(n%2){result+=string;}n=nativeFloor(n/2);string+=string;}while(n);return result;} /**
     * Replaces matches for `pattern` in `string` with `replacement`.
     *
     * **Note:** This method is based on [`String#replace`](https://mdn.io/String/replace).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to modify.
     * @param {RegExp|string} pattern The pattern to replace.
     * @param {Function|string} replacement The match replacement.
     * @returns {string} Returns the modified string.
     * @example
     *
     * _.replace('Hi Fred', 'Fred', 'Barney');
     * // => 'Hi Barney'
     */function replace(){var args=arguments,string=toString(args[0]);return args.length<3?string:string.replace(args[1],args[2]);} /**
     * Converts `string` to [snake case](https://en.wikipedia.org/wiki/Snake_case).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the snake cased string.
     * @example
     *
     * _.snakeCase('Foo Bar');
     * // => 'foo_bar'
     *
     * _.snakeCase('fooBar');
     * // => 'foo_bar'
     *
     * _.snakeCase('--foo-bar');
     * // => 'foo_bar'
     */var snakeCase=createCompounder(function(result,word,index){return result+(index?'_':'')+word.toLowerCase();}); /**
     * Splits `string` by `separator`.
     *
     * **Note:** This method is based on [`String#split`](https://mdn.io/String/split).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to split.
     * @param {RegExp|string} separator The separator pattern to split by.
     * @param {number} [limit] The length to truncate results to.
     * @returns {Array} Returns the new array of string segments.
     * @example
     *
     * _.split('a-b-c', '-', 2);
     * // => ['a', 'b']
     */function split(string,separator,limit){return toString(string).split(separator,limit);} /**
     * Converts `string` to [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the start cased string.
     * @example
     *
     * _.startCase('--foo-bar');
     * // => 'Foo Bar'
     *
     * _.startCase('fooBar');
     * // => 'Foo Bar'
     *
     * _.startCase('__foo_bar__');
     * // => 'Foo Bar'
     */var startCase=createCompounder(function(result,word,index){return result+(index?' ':'')+capitalize(word);}); /**
     * Checks if `string` starts with the given target string.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to search.
     * @param {string} [target] The string to search for.
     * @param {number} [position=0] The position to search from.
     * @returns {boolean} Returns `true` if `string` starts with `target`, else `false`.
     * @example
     *
     * _.startsWith('abc', 'a');
     * // => true
     *
     * _.startsWith('abc', 'b');
     * // => false
     *
     * _.startsWith('abc', 'b', 1);
     * // => true
     */function startsWith(string,target,position){string=toString(string);position=baseClamp(toInteger(position),0,string.length);return string.lastIndexOf(target,position)==position;} /**
     * Creates a compiled template function that can interpolate data properties
     * in "interpolate" delimiters, HTML-escape interpolated data properties in
     * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
     * properties may be accessed as free variables in the template. If a setting
     * object is provided it takes precedence over `_.templateSettings` values.
     *
     * **Note:** In the development build `_.template` utilizes
     * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
     * for easier debugging.
     *
     * For more information on precompiling templates see
     * [lodash's custom builds documentation](https://lodash.com/custom-builds).
     *
     * For more information on Chrome extension sandboxes see
     * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The template string.
     * @param {Object} [options] The options object.
     * @param {RegExp} [options.escape] The HTML "escape" delimiter.
     * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
     * @param {Object} [options.imports] An object to import into the template as free variables.
     * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
     * @param {string} [options.sourceURL] The sourceURL of the template's compiled source.
     * @param {string} [options.variable] The data object variable name.
     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
     * @returns {Function} Returns the compiled template function.
     * @example
     *
     * // using the "interpolate" delimiter to create a compiled template
     * var compiled = _.template('hello <%= user %>!');
     * compiled({ 'user': 'fred' });
     * // => 'hello fred!'
     *
     * // using the HTML "escape" delimiter to escape data property values
     * var compiled = _.template('<b><%- value %></b>');
     * compiled({ 'value': '<script>' });
     * // => '<b>&lt;script&gt;</b>'
     *
     * // using the "evaluate" delimiter to execute JavaScript and generate HTML
     * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // using the internal `print` function in "evaluate" delimiters
     * var compiled = _.template('<% print("hello " + user); %>!');
     * compiled({ 'user': 'barney' });
     * // => 'hello barney!'
     *
     * // using the ES delimiter as an alternative to the default "interpolate" delimiter
     * var compiled = _.template('hello ${ user }!');
     * compiled({ 'user': 'pebbles' });
     * // => 'hello pebbles!'
     *
     * // using custom template delimiters
     * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
     * var compiled = _.template('hello {{ user }}!');
     * compiled({ 'user': 'mustache' });
     * // => 'hello mustache!'
     *
     * // using backslashes to treat delimiters as plain text
     * var compiled = _.template('<%= "\\<%- value %\\>" %>');
     * compiled({ 'value': 'ignored' });
     * // => '<%- value %>'
     *
     * // using the `imports` option to import `jQuery` as `jq`
     * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
     * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // using the `sourceURL` option to specify a custom sourceURL for the template
     * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
     * compiled(data);
     * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
     *
     * // using the `variable` option to ensure a with-statement isn't used in the compiled template
     * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
     * compiled.source;
     * // => function(data) {
     * //   var __t, __p = '';
     * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
     * //   return __p;
     * // }
     *
     * // using the `source` property to inline compiled templates for meaningful
     * // line numbers in error messages and a stack trace
     * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
     *   var JST = {\
     *     "main": ' + _.template(mainText).source + '\
     *   };\
     * ');
     */function template(string,options,guard){ // Based on John Resig's `tmpl` implementation (http://ejohn.org/blog/javascript-micro-templating/)
// and Laura Doktorova's doT.js (https://github.com/olado/doT).
var settings=lodash.templateSettings;if(guard&&isIterateeCall(string,options,guard)){options=undefined;}string=toString(string);options=assignInWith({},options,settings,assignInDefaults);var imports=assignInWith({},options.imports,settings.imports,assignInDefaults),importsKeys=keys(imports),importsValues=baseValues(imports,importsKeys);var isEscaping,isEvaluating,index=0,interpolate=options.interpolate||reNoMatch,source="__p += '"; // Compile the regexp to match each delimiter.
var reDelimiters=RegExp((options.escape||reNoMatch).source+'|'+interpolate.source+'|'+(interpolate===reInterpolate?reEsTemplate:reNoMatch).source+'|'+(options.evaluate||reNoMatch).source+'|$','g'); // Use a sourceURL for easier debugging.
var sourceURL='//# sourceURL='+('sourceURL' in options?options.sourceURL:'lodash.templateSources['+ ++templateCounter+']')+'\n';string.replace(reDelimiters,function(match,escapeValue,interpolateValue,esTemplateValue,evaluateValue,offset){interpolateValue||(interpolateValue=esTemplateValue); // Escape characters that can't be included in string literals.
source+=string.slice(index,offset).replace(reUnescapedString,escapeStringChar); // Replace delimiters with snippets.
if(escapeValue){isEscaping=true;source+="' +\n__e("+escapeValue+") +\n'";}if(evaluateValue){isEvaluating=true;source+="';\n"+evaluateValue+";\n__p += '";}if(interpolateValue){source+="' +\n((__t = ("+interpolateValue+")) == null ? '' : __t) +\n'";}index=offset+match.length; // The JS engine embedded in Adobe products needs `match` returned in
// order to produce the correct `offset` value.
return match;});source+="';\n"; // If `variable` is not specified wrap a with-statement around the generated
// code to add the data object to the top of the scope chain.
var variable=options.variable;if(!variable){source='with (obj) {\n'+source+'\n}\n';} // Cleanup code by stripping empty strings.
source=(isEvaluating?source.replace(reEmptyStringLeading,''):source).replace(reEmptyStringMiddle,'$1').replace(reEmptyStringTrailing,'$1;'); // Frame code as the function body.
source='function('+(variable||'obj')+') {\n'+(variable?'':'obj || (obj = {});\n')+"var __t, __p = ''"+(isEscaping?', __e = _.escape':'')+(isEvaluating?', __j = Array.prototype.join;\n'+"function print() { __p += __j.call(arguments, '') }\n":';\n')+source+'return __p\n}';var result=attempt(function(){return Function(importsKeys,sourceURL+'return '+source).apply(undefined,importsValues);}); // Provide the compiled function's source by its `toString` method or
// the `source` property as a convenience for inlining compiled templates.
result.source=source;if(isError(result)){throw result;}return result;} /**
     * Converts `string`, as a whole, to lower case.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the lower cased string.
     * @example
     *
     * _.toLower('--Foo-Bar');
     * // => '--foo-bar'
     *
     * _.toLower('fooBar');
     * // => 'foobar'
     *
     * _.toLower('__FOO_BAR__');
     * // => '__foo_bar__'
     */function toLower(value){return toString(value).toLowerCase();} /**
     * Converts `string`, as a whole, to upper case.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the upper cased string.
     * @example
     *
     * _.toUpper('--foo-bar');
     * // => '--FOO-BAR'
     *
     * _.toUpper('fooBar');
     * // => 'FOOBAR'
     *
     * _.toUpper('__foo_bar__');
     * // => '__FOO_BAR__'
     */function toUpper(value){return toString(value).toUpperCase();} /**
     * Removes leading and trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trim('  abc  ');
     * // => 'abc'
     *
     * _.trim('-_-abc-_-', '_-');
     * // => 'abc'
     *
     * _.map(['  foo  ', '  bar  '], _.trim);
     * // => ['foo', 'bar']
     */function trim(string,chars,guard){string=toString(string);if(!string){return string;}if(guard||chars===undefined){return string.replace(reTrim,'');}chars=chars+'';if(!chars){return string;}var strSymbols=stringToArray(string),chrSymbols=stringToArray(chars);return strSymbols.slice(charsStartIndex(strSymbols,chrSymbols),charsEndIndex(strSymbols,chrSymbols)+1).join('');} /**
     * Removes trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trimEnd('  abc  ');
     * // => '  abc'
     *
     * _.trimEnd('-_-abc-_-', '_-');
     * // => '-_-abc'
     */function trimEnd(string,chars,guard){string=toString(string);if(!string){return string;}if(guard||chars===undefined){return string.replace(reTrimEnd,'');}chars=chars+'';if(!chars){return string;}var strSymbols=stringToArray(string);return strSymbols.slice(0,charsEndIndex(strSymbols,stringToArray(chars))+1).join('');} /**
     * Removes leading whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trimStart('  abc  ');
     * // => 'abc  '
     *
     * _.trimStart('-_-abc-_-', '_-');
     * // => 'abc-_-'
     */function trimStart(string,chars,guard){string=toString(string);if(!string){return string;}if(guard||chars===undefined){return string.replace(reTrimStart,'');}chars=chars+'';if(!chars){return string;}var strSymbols=stringToArray(string);return strSymbols.slice(charsStartIndex(strSymbols,stringToArray(chars))).join('');} /**
     * Truncates `string` if it's longer than the given maximum string length.
     * The last characters of the truncated string are replaced with the omission
     * string which defaults to "...".
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to truncate.
     * @param {Object} [options] The options object.
     * @param {number} [options.length=30] The maximum string length.
     * @param {string} [options.omission='...'] The string to indicate text is omitted.
     * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
     * @returns {string} Returns the truncated string.
     * @example
     *
     * _.truncate('hi-diddly-ho there, neighborino');
     * // => 'hi-diddly-ho there, neighbo...'
     *
     * _.truncate('hi-diddly-ho there, neighborino', {
     *   'length': 24,
     *   'separator': ' '
     * });
     * // => 'hi-diddly-ho there,...'
     *
     * _.truncate('hi-diddly-ho there, neighborino', {
     *   'length': 24,
     *   'separator': /,? +/
     * });
     * // => 'hi-diddly-ho there...'
     *
     * _.truncate('hi-diddly-ho there, neighborino', {
     *   'omission': ' [...]'
     * });
     * // => 'hi-diddly-ho there, neig [...]'
     */function truncate(string,options){var length=DEFAULT_TRUNC_LENGTH,omission=DEFAULT_TRUNC_OMISSION;if(isObject(options)){var separator='separator' in options?options.separator:separator;length='length' in options?toInteger(options.length):length;omission='omission' in options?toString(options.omission):omission;}string=toString(string);var strLength=string.length;if(reHasComplexSymbol.test(string)){var strSymbols=stringToArray(string);strLength=strSymbols.length;}if(length>=strLength){return string;}var end=length-stringSize(omission);if(end<1){return omission;}var result=strSymbols?strSymbols.slice(0,end).join(''):string.slice(0,end);if(separator===undefined){return result+omission;}if(strSymbols){end+=result.length-end;}if(isRegExp(separator)){if(string.slice(end).search(separator)){var match,substring=result;if(!separator.global){separator=RegExp(separator.source,toString(reFlags.exec(separator))+'g');}separator.lastIndex=0;while(match=separator.exec(substring)){var newEnd=match.index;}result=result.slice(0,newEnd===undefined?end:newEnd);}}else if(string.indexOf(separator,end)!=end){var index=result.lastIndexOf(separator);if(index>-1){result=result.slice(0,index);}}return result+omission;} /**
     * The inverse of `_.escape`; this method converts the HTML entities
     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;`, and `&#96;` in `string` to their
     * corresponding characters.
     *
     * **Note:** No other HTML entities are unescaped. To unescape additional HTML
     * entities use a third-party library like [_he_](https://mths.be/he).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to unescape.
     * @returns {string} Returns the unescaped string.
     * @example
     *
     * _.unescape('fred, barney, &amp; pebbles');
     * // => 'fred, barney, & pebbles'
     */function unescape(string){string=toString(string);return string&&reHasEscapedHtml.test(string)?string.replace(reEscapedHtml,unescapeHtmlChar):string;} /**
     * Converts `string`, as space separated words, to upper case.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the upper cased string.
     * @example
     *
     * _.upperCase('--foo-bar');
     * // => 'FOO BAR'
     *
     * _.upperCase('fooBar');
     * // => 'FOO BAR'
     *
     * _.upperCase('__foo_bar__');
     * // => 'FOO BAR'
     */var upperCase=createCompounder(function(result,word,index){return result+(index?' ':'')+word.toUpperCase();}); /**
     * Splits `string` into an array of its words.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {RegExp|string} [pattern] The pattern to match words.
     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
     * @returns {Array} Returns the words of `string`.
     * @example
     *
     * _.words('fred, barney, & pebbles');
     * // => ['fred', 'barney', 'pebbles']
     *
     * _.words('fred, barney, & pebbles', /[^, ]+/g);
     * // => ['fred', 'barney', '&', 'pebbles']
     */function words(string,pattern,guard){string=toString(string);pattern=guard?undefined:pattern;if(pattern===undefined){pattern=reHasComplexWord.test(string)?reComplexWord:reBasicWord;}return string.match(pattern)||[];} /*------------------------------------------------------------------------*/ /**
     * Attempts to invoke `func`, returning either the result or the caught error
     * object. Any additional arguments are provided to `func` when it's invoked.
     *
     * @static
     * @memberOf _
     * @category Util
     * @param {Function} func The function to attempt.
     * @returns {*} Returns the `func` result or error object.
     * @example
     *
     * // avoid throwing errors for invalid selectors
     * var elements = _.attempt(function(selector) {
     *   return document.querySelectorAll(selector);
     * }, '>_>');
     *
     * if (_.isError(elements)) {
     *   elements = [];
     * }
     */var attempt=rest(function(func,args){try{return apply(func,undefined,args);}catch(e){return isError(e)?e:new Error(e);}}); /**
     * Binds methods of an object to the object itself, overwriting the existing
     * method.
     *
     * **Note:** This method doesn't set the "length" property of bound functions.
     *
     * @static
     * @memberOf _
     * @category Util
     * @param {Object} object The object to bind and assign the bound methods to.
     * @param {...(string|string[])} methodNames The object method names to bind,
     *  specified individually or in arrays.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var view = {
     *   'label': 'docs',
     *   'onClick': function() {
     *     console.log('clicked ' + this.label);
     *   }
     * };
     *
     * _.bindAll(view, 'onClick');
     * jQuery(element).on('click', view.onClick);
     * // => logs 'clicked docs' when clicked
     */var bindAll=rest(function(object,methodNames){arrayEach(baseFlatten(methodNames),function(key){object[key]=bind(object[key],object);});return object;}); /**
     * Creates a function that iterates over `pairs` invoking the corresponding
     * function of the first predicate to return truthy. The predicate-function
     * pairs are invoked with the `this` binding and arguments of the created
     * function.
     *
     * @static
     * @memberOf _
     * @category Util
     * @param {Array} pairs The predicate-function pairs.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var func = _.cond([
     *   [_.matches({ 'a': 1 }),           _.constant('matches A')],
     *   [_.conforms({ 'b': _.isNumber }), _.constant('matches B')],
     *   [_.constant(true),                _.constant('no match')]
     * ])
     *
     * func({ 'a': 1, 'b': 2 });
     * // => 'matches A'
     *
     * func({ 'a': 0, 'b': 1 });
     * // => 'matches B'
     *
     * func({ 'a': '1', 'b': '2' });
     * // => 'no match'
     */function cond(pairs){var length=pairs?pairs.length:0,toIteratee=getIteratee();pairs=!length?[]:arrayMap(pairs,function(pair){if(typeof pair[1]!='function'){throw new TypeError(FUNC_ERROR_TEXT);}return [toIteratee(pair[0]),pair[1]];});return rest(function(args){var index=-1;while(++index<length){var pair=pairs[index];if(apply(pair[0],this,args)){return apply(pair[1],this,args);}}});} /**
     * Creates a function that invokes the predicate properties of `source` with
     * the corresponding property values of a given object, returning `true` if
     * all predicates return truthy, else `false`.
     *
     * @static
     * @memberOf _
     * @category Util
     * @param {Object} source The object of property predicates to conform to.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * _.filter(users, _.conforms({ 'age': _.partial(_.gt, _, 38) }));
     * // => [{ 'user': 'fred', 'age': 40 }]
     */function conforms(source){return baseConforms(baseClone(source,true));} /**
     * Creates a function that returns `value`.
     *
     * @static
     * @memberOf _
     * @category Util
     * @param {*} value The value to return from the new function.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var object = { 'user': 'fred' };
     * var getter = _.constant(object);
     *
     * getter() === object;
     * // => true
     */function constant(value){return function(){return value;};} /**
     * Creates a function that returns the result of invoking the provided
     * functions with the `this` binding of the created function, where each
     * successive invocation is supplied the return value of the previous.
     *
     * @static
     * @memberOf _
     * @category Util
     * @param {...(Function|Function[])} [funcs] Functions to invoke.
     * @returns {Function} Returns the new function.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var addSquare = _.flow(_.add, square);
     * addSquare(1, 2);
     * // => 9
     */var flow=createFlow(); /**
     * This method is like `_.flow` except that it creates a function that
     * invokes the provided functions from right to left.
     *
     * @static
     * @memberOf _
     * @category Util
     * @param {...(Function|Function[])} [funcs] Functions to invoke.
     * @returns {Function} Returns the new function.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var addSquare = _.flowRight(square, _.add);
     * addSquare(1, 2);
     * // => 9
     */var flowRight=createFlow(true); /**
     * This method returns the first argument provided to it.
     *
     * @static
     * @memberOf _
     * @category Util
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'user': 'fred' };
     *
     * _.identity(object) === object;
     * // => true
     */function identity(value){return value;} /**
     * Creates a function that invokes `func` with the arguments of the created
     * function. If `func` is a property name the created callback returns the
     * property value for a given element. If `func` is an object the created
     * callback returns `true` for elements that contain the equivalent object properties, otherwise it returns `false`.
     *
     * @static
     * @memberOf _
     * @category Util
     * @param {*} [func=_.identity] The value to convert to a callback.
     * @returns {Function} Returns the callback.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * // create custom iteratee shorthands
     * _.iteratee = _.wrap(_.iteratee, function(callback, func) {
     *   var p = /^(\S+)\s*([<>])\s*(\S+)$/.exec(func);
     *   return !p ? callback(func) : function(object) {
     *     return (p[2] == '>' ? object[p[1]] > p[3] : object[p[1]] < p[3]);
     *   };
     * });
     *
     * _.filter(users, 'age > 36');
     * // => [{ 'user': 'fred', 'age': 40 }]
     */function iteratee(func){return isObjectLike(func)&&!isArray(func)?matches(func):baseIteratee(func);} /**
     * Creates a function that performs a deep partial comparison between a given
     * object and `source`, returning `true` if the given object has equivalent
     * property values, else `false`.
     *
     * **Note:** This method supports comparing the same values as `_.isEqual`.
     *
     * @static
     * @memberOf _
     * @category Util
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * _.filter(users, _.matches({ 'age': 40, 'active': false }));
     * // => [{ 'user': 'fred', 'age': 40, 'active': false }]
     */function matches(source){return baseMatches(baseClone(source,true));} /**
     * Creates a function that performs a deep partial comparison between the
     * value at `path` of a given object to `srcValue`, returning `true` if the
     * object value is equivalent, else `false`.
     *
     * **Note:** This method supports comparing the same values as `_.isEqual`.
     *
     * @static
     * @memberOf _
     * @category Util
     * @param {Array|string} path The path of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * _.find(users, _.matchesProperty('user', 'fred'));
     * // => { 'user': 'fred' }
     */function matchesProperty(path,srcValue){return baseMatchesProperty(path,baseClone(srcValue,true));} /**
     * Creates a function that invokes the method at `path` of a given object.
     * Any additional arguments are provided to the invoked method.
     *
     * @static
     * @memberOf _
     * @category Util
     * @param {Array|string} path The path of the method to invoke.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': { 'c': _.constant(2) } } },
     *   { 'a': { 'b': { 'c': _.constant(1) } } }
     * ];
     *
     * _.map(objects, _.method('a.b.c'));
     * // => [2, 1]
     *
     * _.invokeMap(_.sortBy(objects, _.method(['a', 'b', 'c'])), 'a.b.c');
     * // => [1, 2]
     */var method=rest(function(path,args){return function(object){return baseInvoke(object,path,args);};}); /**
     * The opposite of `_.method`; this method creates a function that invokes
     * the method at a given path of `object`. Any additional arguments are
     * provided to the invoked method.
     *
     * @static
     * @memberOf _
     * @category Util
     * @param {Object} object The object to query.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var array = _.times(3, _.constant),
     *     object = { 'a': array, 'b': array, 'c': array };
     *
     * _.map(['a[2]', 'c[0]'], _.methodOf(object));
     * // => [2, 0]
     *
     * _.map([['a', '2'], ['c', '0']], _.methodOf(object));
     * // => [2, 0]
     */var methodOf=rest(function(object,args){return function(path){return baseInvoke(object,path,args);};}); /**
     * Adds all own enumerable function properties of a source object to the
     * destination object. If `object` is a function then methods are added to
     * its prototype as well.
     *
     * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
     * avoid conflicts caused by modifying the original.
     *
     * @static
     * @memberOf _
     * @category Util
     * @param {Function|Object} [object=lodash] The destination object.
     * @param {Object} source The object of functions to add.
     * @param {Object} [options] The options object.
     * @param {boolean} [options.chain=true] Specify whether the functions added
     *  are chainable.
     * @returns {Function|Object} Returns `object`.
     * @example
     *
     * function vowels(string) {
     *   return _.filter(string, function(v) {
     *     return /[aeiou]/i.test(v);
     *   });
     * }
     *
     * _.mixin({ 'vowels': vowels });
     * _.vowels('fred');
     * // => ['e']
     *
     * _('fred').vowels().value();
     * // => ['e']
     *
     * _.mixin({ 'vowels': vowels }, { 'chain': false });
     * _('fred').vowels();
     * // => ['e']
     */function mixin(object,source,options){var props=keys(source),methodNames=baseFunctions(source,props);if(options==null&&!(isObject(source)&&(methodNames.length||!props.length))){options=source;source=object;object=this;methodNames=baseFunctions(source,keys(source));}var chain=isObject(options)&&'chain' in options?options.chain:true,isFunc=isFunction(object);arrayEach(methodNames,function(methodName){var func=source[methodName];object[methodName]=func;if(isFunc){object.prototype[methodName]=function(){var chainAll=this.__chain__;if(chain||chainAll){var result=object(this.__wrapped__),actions=result.__actions__=copyArray(this.__actions__);actions.push({'func':func,'args':arguments,'thisArg':object});result.__chain__=chainAll;return result;}return func.apply(object,arrayPush([this.value()],arguments));};}});return object;} /**
     * Reverts the `_` variable to its previous value and returns a reference to
     * the `lodash` function.
     *
     * @static
     * @memberOf _
     * @category Util
     * @returns {Function} Returns the `lodash` function.
     * @example
     *
     * var lodash = _.noConflict();
     */function noConflict(){root._=oldDash;return this;} /**
     * A no-operation function that returns `undefined` regardless of the
     * arguments it receives.
     *
     * @static
     * @memberOf _
     * @category Util
     * @example
     *
     * var object = { 'user': 'fred' };
     *
     * _.noop(object) === undefined;
     * // => true
     */function noop(){} // No operation performed.
/**
     * Creates a function that returns its nth argument.
     *
     * @static
     * @memberOf _
     * @category Util
     * @param {number} [n=0] The index of the argument to return.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var func = _.nthArg(1);
     *
     * func('a', 'b', 'c');
     * // => 'b'
     */function nthArg(n){n=toInteger(n);return function(){return arguments[n];};} /**
     * Creates a function that invokes `iteratees` with the arguments provided
     * to the created function and returns their results.
     *
     * @static
     * @memberOf _
     * @category Util
     * @param {...(Function|Function[])} iteratees The iteratees to invoke.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var func = _.over(Math.max, Math.min);
     *
     * func(1, 2, 3, 4);
     * // => [4, 1]
     */var over=createOver(arrayMap); /**
     * Creates a function that checks if **all** of the `predicates` return
     * truthy when invoked with the arguments provided to the created function.
     *
     * @static
     * @memberOf _
     * @category Util
     * @param {...(Function|Function[])} predicates The predicates to check.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var func = _.overEvery(Boolean, isFinite);
     *
     * func('1');
     * // => true
     *
     * func(null);
     * // => false
     *
     * func(NaN);
     * // => false
     */var overEvery=createOver(arrayEvery); /**
     * Creates a function that checks if **any** of the `predicates` return
     * truthy when invoked with the arguments provided to the created function.
     *
     * @static
     * @memberOf _
     * @category Util
     * @param {...(Function|Function[])} predicates The predicates to check.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var func = _.overSome(Boolean, isFinite);
     *
     * func('1');
     * // => true
     *
     * func(null);
     * // => true
     *
     * func(NaN);
     * // => false
     */var overSome=createOver(arraySome); /**
     * Creates a function that returns the value at `path` of a given object.
     *
     * @static
     * @memberOf _
     * @category Util
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': { 'c': 2 } } },
     *   { 'a': { 'b': { 'c': 1 } } }
     * ];
     *
     * _.map(objects, _.property('a.b.c'));
     * // => [2, 1]
     *
     * _.map(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
     * // => [1, 2]
     */function property(path){return isKey(path)?baseProperty(path):basePropertyDeep(path);} /**
     * The opposite of `_.property`; this method creates a function that returns
     * the value at a given path of `object`.
     *
     * @static
     * @memberOf _
     * @category Util
     * @param {Object} object The object to query.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var array = [0, 1, 2],
     *     object = { 'a': array, 'b': array, 'c': array };
     *
     * _.map(['a[2]', 'c[0]'], _.propertyOf(object));
     * // => [2, 0]
     *
     * _.map([['a', '2'], ['c', '0']], _.propertyOf(object));
     * // => [2, 0]
     */function propertyOf(object){return function(path){return object==null?undefined:baseGet(object,path);};} /**
     * Creates an array of numbers (positive and/or negative) progressing from
     * `start` up to, but not including, `end`. A step of `-1` is used if a negative
     * `start` is specified without an `end` or `step`. If `end` is not specified
     * it's set to `start` with `start` then set to `0`.  If `end` is less than
     * `start` a zero-length range is created unless a negative `step` is specified.
     *
     * **Note:** JavaScript follows the IEEE-754 standard for resolving
     * floating-point values which can produce unexpected results.
     *
     * @static
     * @memberOf _
     * @category Util
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @param {number} [step=1] The value to increment or decrement by.
     * @returns {Array} Returns the new array of numbers.
     * @example
     *
     * _.range(4);
     * // => [0, 1, 2, 3]
     *
     * _.range(-4);
     * // => [0, -1, -2, -3]
     *
     * _.range(1, 5);
     * // => [1, 2, 3, 4]
     *
     * _.range(0, 20, 5);
     * // => [0, 5, 10, 15]
     *
     * _.range(0, -4, -1);
     * // => [0, -1, -2, -3]
     *
     * _.range(1, 4, 0);
     * // => [1, 1, 1]
     *
     * _.range(0);
     * // => []
     */var range=createRange(); /**
     * This method is like `_.range` except that it populates values in
     * descending order.
     *
     * @static
     * @memberOf _
     * @category Util
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @param {number} [step=1] The value to increment or decrement by.
     * @returns {Array} Returns the new array of numbers.
     * @example
     *
     * _.rangeRight(4);
     * // => [3, 2, 1, 0]
     *
     * _.rangeRight(-4);
     * // => [-3, -2, -1, 0]
     *
     * _.rangeRight(1, 5);
     * // => [4, 3, 2, 1]
     *
     * _.rangeRight(0, 20, 5);
     * // => [15, 10, 5, 0]
     *
     * _.rangeRight(0, -4, -1);
     * // => [-3, -2, -1, 0]
     *
     * _.rangeRight(1, 4, 0);
     * // => [1, 1, 1]
     *
     * _.rangeRight(0);
     * // => []
     */var rangeRight=createRange(true); /**
     * Invokes the iteratee function `n` times, returning an array of the results
     * of each invocation. The iteratee is invoked with one argument; (index).
     *
     * @static
     * @memberOf _
     * @category Util
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     * @example
     *
     * _.times(3, String);
     * // => ['0', '1', '2']
     *
     *  _.times(4, _.constant(true));
     * // => [true, true, true, true]
     */function times(n,iteratee){n=toInteger(n);if(n<1||n>MAX_SAFE_INTEGER){return [];}var index=MAX_ARRAY_LENGTH,length=nativeMin(n,MAX_ARRAY_LENGTH);iteratee=toFunction(iteratee);n-=MAX_ARRAY_LENGTH;var result=baseTimes(length,iteratee);while(++index<n){iteratee(index);}return result;} /**
     * Converts `value` to a property path array.
     *
     * @static
     * @memberOf _
     * @category Util
     * @param {*} value The value to convert.
     * @returns {Array} Returns the new property path array.
     * @example
     *
     * _.toPath('a.b.c');
     * // => ['a', 'b', 'c']
     *
     * _.toPath('a[0].b.c');
     * // => ['a', '0', 'b', 'c']
     *
     * var path = ['a', 'b', 'c'],
     *     newPath = _.toPath(path);
     *
     * console.log(newPath);
     * // => ['a', 'b', 'c']
     *
     * console.log(path === newPath);
     * // => false
     */function toPath(value){return isArray(value)?arrayMap(value,String):stringToPath(value);} /**
     * Generates a unique ID. If `prefix` is provided the ID is appended to it.
     *
     * @static
     * @memberOf _
     * @category Util
     * @param {string} [prefix] The value to prefix the ID with.
     * @returns {string} Returns the unique ID.
     * @example
     *
     * _.uniqueId('contact_');
     * // => 'contact_104'
     *
     * _.uniqueId();
     * // => '105'
     */function uniqueId(prefix){var id=++idCounter;return toString(prefix)+id;} /*------------------------------------------------------------------------*/ /**
     * Adds two numbers.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {number} augend The first number in an addition.
     * @param {number} addend The second number in an addition.
     * @returns {number} Returns the total.
     * @example
     *
     * _.add(6, 4);
     * // => 10
     */function add(augend,addend){var result;if(augend!==undefined){result=augend;}if(addend!==undefined){result=result===undefined?addend:result+addend;}return result;} /**
     * Computes `number` rounded up to `precision`.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {number} number The number to round up.
     * @param {number} [precision=0] The precision to round up to.
     * @returns {number} Returns the rounded up number.
     * @example
     *
     * _.ceil(4.006);
     * // => 5
     *
     * _.ceil(6.004, 2);
     * // => 6.01
     *
     * _.ceil(6040, -2);
     * // => 6100
     */var ceil=createRound('ceil'); /**
     * Computes `number` rounded down to `precision`.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {number} number The number to round down.
     * @param {number} [precision=0] The precision to round down to.
     * @returns {number} Returns the rounded down number.
     * @example
     *
     * _.floor(4.006);
     * // => 4
     *
     * _.floor(0.046, 2);
     * // => 0.04
     *
     * _.floor(4060, -2);
     * // => 4000
     */var floor=createRound('floor'); /**
     * Computes the maximum value of `array`. If `array` is empty or falsey
     * `undefined` is returned.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {*} Returns the maximum value.
     * @example
     *
     * _.max([4, 2, 8, 6]);
     * // => 8
     *
     * _.max([]);
     * // => undefined
     */function max(array){return array&&array.length?baseExtremum(array,identity,gt):undefined;} /**
     * This method is like `_.max` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the criterion by which
     * the value is ranked. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {*} Returns the maximum value.
     * @example
     *
     * var objects = [{ 'n': 1 }, { 'n': 2 }];
     *
     * _.maxBy(objects, function(o) { return o.a; });
     * // => { 'n': 2 }
     *
     * // using the `_.property` iteratee shorthand
     * _.maxBy(objects, 'n');
     * // => { 'n': 2 }
     */function maxBy(array,iteratee){return array&&array.length?baseExtremum(array,getIteratee(iteratee),gt):undefined;} /**
     * Computes the mean of the values in `array`.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {number} Returns the mean.
     * @example
     *
     * _.mean([4, 2, 8, 6]);
     * // => 5
     */function mean(array){return sum(array)/(array?array.length:0);} /**
     * Computes the minimum value of `array`. If `array` is empty or falsey
     * `undefined` is returned.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {*} Returns the minimum value.
     * @example
     *
     * _.min([4, 2, 8, 6]);
     * // => 2
     *
     * _.min([]);
     * // => undefined
     */function min(array){return array&&array.length?baseExtremum(array,identity,lt):undefined;} /**
     * This method is like `_.min` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the criterion by which
     * the value is ranked. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {*} Returns the minimum value.
     * @example
     *
     * var objects = [{ 'n': 1 }, { 'n': 2 }];
     *
     * _.minBy(objects, function(o) { return o.a; });
     * // => { 'n': 1 }
     *
     * // using the `_.property` iteratee shorthand
     * _.minBy(objects, 'n');
     * // => { 'n': 1 }
     */function minBy(array,iteratee){return array&&array.length?baseExtremum(array,getIteratee(iteratee),lt):undefined;} /**
     * Computes `number` rounded to `precision`.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {number} number The number to round.
     * @param {number} [precision=0] The precision to round to.
     * @returns {number} Returns the rounded number.
     * @example
     *
     * _.round(4.006);
     * // => 4
     *
     * _.round(4.006, 2);
     * // => 4.01
     *
     * _.round(4060, -2);
     * // => 4100
     */var round=createRound('round'); /**
     * Subtract two numbers.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {number} minuend The first number in a subtraction.
     * @param {number} subtrahend The second number in a subtraction.
     * @returns {number} Returns the difference.
     * @example
     *
     * _.subtract(6, 4);
     * // => 2
     */function subtract(minuend,subtrahend){var result;if(minuend!==undefined){result=minuend;}if(subtrahend!==undefined){result=result===undefined?subtrahend:result-subtrahend;}return result;} /**
     * Computes the sum of the values in `array`.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {number} Returns the sum.
     * @example
     *
     * _.sum([4, 2, 8, 6]);
     * // => 20
     */function sum(array){return array&&array.length?baseSum(array,identity):undefined;} /**
     * This method is like `_.sum` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the value to be summed.
     * The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the sum.
     * @example
     *
     * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
     *
     * _.sumBy(objects, function(o) { return o.n; });
     * // => 20
     *
     * // using the `_.property` iteratee shorthand
     * _.sumBy(objects, 'n');
     * // => 20
     */function sumBy(array,iteratee){return array&&array.length?baseSum(array,getIteratee(iteratee)):undefined;} /*------------------------------------------------------------------------*/ // Ensure wrappers are instances of `baseLodash`.
lodash.prototype=baseLodash.prototype;LodashWrapper.prototype=baseCreate(baseLodash.prototype);LodashWrapper.prototype.constructor=LodashWrapper;LazyWrapper.prototype=baseCreate(baseLodash.prototype);LazyWrapper.prototype.constructor=LazyWrapper; // Avoid inheriting from `Object.prototype` when possible.
Hash.prototype=nativeCreate?nativeCreate(null):objectProto; // Add functions to the `MapCache`.
MapCache.prototype.clear=mapClear;MapCache.prototype['delete']=mapDelete;MapCache.prototype.get=mapGet;MapCache.prototype.has=mapHas;MapCache.prototype.set=mapSet; // Add functions to the `SetCache`.
SetCache.prototype.push=cachePush; // Add functions to the `Stack` cache.
Stack.prototype.clear=stackClear;Stack.prototype['delete']=stackDelete;Stack.prototype.get=stackGet;Stack.prototype.has=stackHas;Stack.prototype.set=stackSet; // Assign cache to `_.memoize`.
memoize.Cache=MapCache; // Add functions that return wrapped values when chaining.
lodash.after=after;lodash.ary=ary;lodash.assign=assign;lodash.assignIn=assignIn;lodash.assignInWith=assignInWith;lodash.assignWith=assignWith;lodash.at=at;lodash.before=before;lodash.bind=bind;lodash.bindAll=bindAll;lodash.bindKey=bindKey;lodash.chain=chain;lodash.chunk=chunk;lodash.compact=compact;lodash.concat=concat;lodash.cond=cond;lodash.conforms=conforms;lodash.constant=constant;lodash.countBy=countBy;lodash.create=create;lodash.curry=curry;lodash.curryRight=curryRight;lodash.debounce=debounce;lodash.defaults=defaults;lodash.defaultsDeep=defaultsDeep;lodash.defer=defer;lodash.delay=delay;lodash.difference=difference;lodash.differenceBy=differenceBy;lodash.differenceWith=differenceWith;lodash.drop=drop;lodash.dropRight=dropRight;lodash.dropRightWhile=dropRightWhile;lodash.dropWhile=dropWhile;lodash.fill=fill;lodash.filter=filter;lodash.flatMap=flatMap;lodash.flatten=flatten;lodash.flattenDeep=flattenDeep;lodash.flip=flip;lodash.flow=flow;lodash.flowRight=flowRight;lodash.fromPairs=fromPairs;lodash.functions=functions;lodash.functionsIn=functionsIn;lodash.groupBy=groupBy;lodash.initial=initial;lodash.intersection=intersection;lodash.intersectionBy=intersectionBy;lodash.intersectionWith=intersectionWith;lodash.invert=invert;lodash.invokeMap=invokeMap;lodash.iteratee=iteratee;lodash.keyBy=keyBy;lodash.keys=keys;lodash.keysIn=keysIn;lodash.map=map;lodash.mapKeys=mapKeys;lodash.mapValues=mapValues;lodash.matches=matches;lodash.matchesProperty=matchesProperty;lodash.memoize=memoize;lodash.merge=merge;lodash.mergeWith=mergeWith;lodash.method=method;lodash.methodOf=methodOf;lodash.mixin=mixin;lodash.negate=negate;lodash.nthArg=nthArg;lodash.omit=omit;lodash.omitBy=omitBy;lodash.once=once;lodash.orderBy=orderBy;lodash.over=over;lodash.overArgs=overArgs;lodash.overEvery=overEvery;lodash.overSome=overSome;lodash.partial=partial;lodash.partialRight=partialRight;lodash.partition=partition;lodash.pick=pick;lodash.pickBy=pickBy;lodash.property=property;lodash.propertyOf=propertyOf;lodash.pull=pull;lodash.pullAll=pullAll;lodash.pullAllBy=pullAllBy;lodash.pullAt=pullAt;lodash.range=range;lodash.rangeRight=rangeRight;lodash.rearg=rearg;lodash.reject=reject;lodash.remove=remove;lodash.rest=rest;lodash.reverse=reverse;lodash.sampleSize=sampleSize;lodash.set=set;lodash.setWith=setWith;lodash.shuffle=shuffle;lodash.slice=slice;lodash.sortBy=sortBy;lodash.sortedUniq=sortedUniq;lodash.sortedUniqBy=sortedUniqBy;lodash.split=split;lodash.spread=spread;lodash.tail=tail;lodash.take=take;lodash.takeRight=takeRight;lodash.takeRightWhile=takeRightWhile;lodash.takeWhile=takeWhile;lodash.tap=tap;lodash.throttle=throttle;lodash.thru=thru;lodash.toArray=toArray;lodash.toPairs=toPairs;lodash.toPairsIn=toPairsIn;lodash.toPath=toPath;lodash.toPlainObject=toPlainObject;lodash.transform=transform;lodash.unary=unary;lodash.union=union;lodash.unionBy=unionBy;lodash.unionWith=unionWith;lodash.uniq=uniq;lodash.uniqBy=uniqBy;lodash.uniqWith=uniqWith;lodash.unset=unset;lodash.unzip=unzip;lodash.unzipWith=unzipWith;lodash.values=values;lodash.valuesIn=valuesIn;lodash.without=without;lodash.words=words;lodash.wrap=wrap;lodash.xor=xor;lodash.xorBy=xorBy;lodash.xorWith=xorWith;lodash.zip=zip;lodash.zipObject=zipObject;lodash.zipWith=zipWith; // Add aliases.
lodash.each=forEach;lodash.eachRight=forEachRight;lodash.extend=assignIn;lodash.extendWith=assignInWith; // Add functions to `lodash.prototype`.
mixin(lodash,lodash); /*------------------------------------------------------------------------*/ // Add functions that return unwrapped values when chaining.
lodash.add=add;lodash.attempt=attempt;lodash.camelCase=camelCase;lodash.capitalize=capitalize;lodash.ceil=ceil;lodash.clamp=clamp;lodash.clone=clone;lodash.cloneDeep=cloneDeep;lodash.cloneDeepWith=cloneDeepWith;lodash.cloneWith=cloneWith;lodash.deburr=deburr;lodash.endsWith=endsWith;lodash.eq=eq;lodash.escape=escape;lodash.escapeRegExp=escapeRegExp;lodash.every=every;lodash.find=find;lodash.findIndex=findIndex;lodash.findKey=findKey;lodash.findLast=findLast;lodash.findLastIndex=findLastIndex;lodash.findLastKey=findLastKey;lodash.floor=floor;lodash.forEach=forEach;lodash.forEachRight=forEachRight;lodash.forIn=forIn;lodash.forInRight=forInRight;lodash.forOwn=forOwn;lodash.forOwnRight=forOwnRight;lodash.get=get;lodash.gt=gt;lodash.gte=gte;lodash.has=has;lodash.hasIn=hasIn;lodash.head=head;lodash.identity=identity;lodash.includes=includes;lodash.indexOf=indexOf;lodash.inRange=inRange;lodash.invoke=invoke;lodash.isArguments=isArguments;lodash.isArray=isArray;lodash.isArrayLike=isArrayLike;lodash.isArrayLikeObject=isArrayLikeObject;lodash.isBoolean=isBoolean;lodash.isDate=isDate;lodash.isElement=isElement;lodash.isEmpty=isEmpty;lodash.isEqual=isEqual;lodash.isEqualWith=isEqualWith;lodash.isError=isError;lodash.isFinite=isFinite;lodash.isFunction=isFunction;lodash.isInteger=isInteger;lodash.isLength=isLength;lodash.isMatch=isMatch;lodash.isMatchWith=isMatchWith;lodash.isNaN=isNaN;lodash.isNative=isNative;lodash.isNil=isNil;lodash.isNull=isNull;lodash.isNumber=isNumber;lodash.isObject=isObject;lodash.isObjectLike=isObjectLike;lodash.isPlainObject=isPlainObject;lodash.isRegExp=isRegExp;lodash.isSafeInteger=isSafeInteger;lodash.isString=isString;lodash.isSymbol=isSymbol;lodash.isTypedArray=isTypedArray;lodash.isUndefined=isUndefined;lodash.join=join;lodash.kebabCase=kebabCase;lodash.last=last;lodash.lastIndexOf=lastIndexOf;lodash.lowerCase=lowerCase;lodash.lowerFirst=lowerFirst;lodash.lt=lt;lodash.lte=lte;lodash.max=max;lodash.maxBy=maxBy;lodash.mean=mean;lodash.min=min;lodash.minBy=minBy;lodash.noConflict=noConflict;lodash.noop=noop;lodash.now=now;lodash.pad=pad;lodash.padEnd=padEnd;lodash.padStart=padStart;lodash.parseInt=parseInt;lodash.random=random;lodash.reduce=reduce;lodash.reduceRight=reduceRight;lodash.repeat=repeat;lodash.replace=replace;lodash.result=result;lodash.round=round;lodash.runInContext=runInContext;lodash.sample=sample;lodash.size=size;lodash.snakeCase=snakeCase;lodash.some=some;lodash.sortedIndex=sortedIndex;lodash.sortedIndexBy=sortedIndexBy;lodash.sortedIndexOf=sortedIndexOf;lodash.sortedLastIndex=sortedLastIndex;lodash.sortedLastIndexBy=sortedLastIndexBy;lodash.sortedLastIndexOf=sortedLastIndexOf;lodash.startCase=startCase;lodash.startsWith=startsWith;lodash.subtract=subtract;lodash.sum=sum;lodash.sumBy=sumBy;lodash.template=template;lodash.times=times;lodash.toInteger=toInteger;lodash.toLength=toLength;lodash.toLower=toLower;lodash.toNumber=toNumber;lodash.toSafeInteger=toSafeInteger;lodash.toString=toString;lodash.toUpper=toUpper;lodash.trim=trim;lodash.trimEnd=trimEnd;lodash.trimStart=trimStart;lodash.truncate=truncate;lodash.unescape=unescape;lodash.uniqueId=uniqueId;lodash.upperCase=upperCase;lodash.upperFirst=upperFirst; // Add aliases.
lodash.first=head;mixin(lodash,function(){var source={};baseForOwn(lodash,function(func,methodName){if(!hasOwnProperty.call(lodash.prototype,methodName)){source[methodName]=func;}});return source;}(),{'chain':false}); /*------------------------------------------------------------------------*/ /**
     * The semantic version number.
     *
     * @static
     * @memberOf _
     * @type string
     */lodash.VERSION=VERSION; // Assign default placeholders.
arrayEach(['bind','bindKey','curry','curryRight','partial','partialRight'],function(methodName){lodash[methodName].placeholder=lodash;}); // Add `LazyWrapper` methods for `_.drop` and `_.take` variants.
arrayEach(['drop','take'],function(methodName,index){LazyWrapper.prototype[methodName]=function(n){var filtered=this.__filtered__;if(filtered&&!index){return new LazyWrapper(this);}n=n===undefined?1:nativeMax(toInteger(n),0);var result=this.clone();if(filtered){result.__takeCount__=nativeMin(n,result.__takeCount__);}else {result.__views__.push({'size':nativeMin(n,MAX_ARRAY_LENGTH),'type':methodName+(result.__dir__<0?'Right':'')});}return result;};LazyWrapper.prototype[methodName+'Right']=function(n){return this.reverse()[methodName](n).reverse();};}); // Add `LazyWrapper` methods that accept an `iteratee` value.
arrayEach(['filter','map','takeWhile'],function(methodName,index){var type=index+1,isFilter=type==LAZY_FILTER_FLAG||type==LAZY_WHILE_FLAG;LazyWrapper.prototype[methodName]=function(iteratee){var result=this.clone();result.__iteratees__.push({'iteratee':getIteratee(iteratee,3),'type':type});result.__filtered__=result.__filtered__||isFilter;return result;};}); // Add `LazyWrapper` methods for `_.head` and `_.last`.
arrayEach(['head','last'],function(methodName,index){var takeName='take'+(index?'Right':'');LazyWrapper.prototype[methodName]=function(){return this[takeName](1).value()[0];};}); // Add `LazyWrapper` methods for `_.initial` and `_.tail`.
arrayEach(['initial','tail'],function(methodName,index){var dropName='drop'+(index?'':'Right');LazyWrapper.prototype[methodName]=function(){return this.__filtered__?new LazyWrapper(this):this[dropName](1);};});LazyWrapper.prototype.compact=function(){return this.filter(identity);};LazyWrapper.prototype.find=function(predicate){return this.filter(predicate).head();};LazyWrapper.prototype.findLast=function(predicate){return this.reverse().find(predicate);};LazyWrapper.prototype.invokeMap=rest(function(path,args){if(typeof path=='function'){return new LazyWrapper(this);}return this.map(function(value){return baseInvoke(value,path,args);});});LazyWrapper.prototype.reject=function(predicate){predicate=getIteratee(predicate,3);return this.filter(function(value){return !predicate(value);});};LazyWrapper.prototype.slice=function(start,end){start=toInteger(start);var result=this;if(result.__filtered__&&(start>0||end<0)){return new LazyWrapper(result);}if(start<0){result=result.takeRight(-start);}else if(start){result=result.drop(start);}if(end!==undefined){end=toInteger(end);result=end<0?result.dropRight(-end):result.take(end-start);}return result;};LazyWrapper.prototype.takeRightWhile=function(predicate){return this.reverse().takeWhile(predicate).reverse();};LazyWrapper.prototype.toArray=function(){return this.take(MAX_ARRAY_LENGTH);}; // Add `LazyWrapper` methods to `lodash.prototype`.
baseForOwn(LazyWrapper.prototype,function(func,methodName){var checkIteratee=/^(?:filter|find|map|reject)|While$/.test(methodName),isTaker=/^(?:head|last)$/.test(methodName),lodashFunc=lodash[isTaker?'take'+(methodName=='last'?'Right':''):methodName],retUnwrapped=isTaker||/^find/.test(methodName);if(!lodashFunc){return;}lodash.prototype[methodName]=function(){var value=this.__wrapped__,args=isTaker?[1]:arguments,isLazy=value instanceof LazyWrapper,iteratee=args[0],useLazy=isLazy||isArray(value);var interceptor=function interceptor(value){var result=lodashFunc.apply(lodash,arrayPush([value],args));return isTaker&&chainAll?result[0]:result;};if(useLazy&&checkIteratee&&typeof iteratee=='function'&&iteratee.length!=1){ // Avoid lazy use if the iteratee has a "length" value other than `1`.
isLazy=useLazy=false;}var chainAll=this.__chain__,isHybrid=!!this.__actions__.length,isUnwrapped=retUnwrapped&&!chainAll,onlyLazy=isLazy&&!isHybrid;if(!retUnwrapped&&useLazy){value=onlyLazy?value:new LazyWrapper(this);var result=func.apply(value,args);result.__actions__.push({'func':thru,'args':[interceptor],'thisArg':undefined});return new LodashWrapper(result,chainAll);}if(isUnwrapped&&onlyLazy){return func.apply(this,args);}result=this.thru(interceptor);return isUnwrapped?isTaker?result.value()[0]:result.value():result;};}); // Add `Array` and `String` methods to `lodash.prototype`.
arrayEach(['pop','push','shift','sort','splice','unshift'],function(methodName){var func=arrayProto[methodName],chainName=/^(?:push|sort|unshift)$/.test(methodName)?'tap':'thru',retUnwrapped=/^(?:pop|shift)$/.test(methodName);lodash.prototype[methodName]=function(){var args=arguments;if(retUnwrapped&&!this.__chain__){return func.apply(this.value(),args);}return this[chainName](function(value){return func.apply(value,args);});};}); // Map minified function names to their real names.
baseForOwn(LazyWrapper.prototype,function(func,methodName){var lodashFunc=lodash[methodName];if(lodashFunc){var key=lodashFunc.name+'',names=realNames[key]||(realNames[key]=[]);names.push({'name':methodName,'func':lodashFunc});}});realNames[createHybridWrapper(undefined,BIND_KEY_FLAG).name]=[{'name':'wrapper','func':undefined}]; // Add functions to the lazy wrapper.
LazyWrapper.prototype.clone=lazyClone;LazyWrapper.prototype.reverse=lazyReverse;LazyWrapper.prototype.value=lazyValue; // Add chaining functions to the `lodash` wrapper.
lodash.prototype.at=wrapperAt;lodash.prototype.chain=wrapperChain;lodash.prototype.commit=wrapperCommit;lodash.prototype.flatMap=wrapperFlatMap;lodash.prototype.next=wrapperNext;lodash.prototype.plant=wrapperPlant;lodash.prototype.reverse=wrapperReverse;lodash.prototype.toJSON=lodash.prototype.valueOf=lodash.prototype.value=wrapperValue;if(iteratorSymbol){lodash.prototype[iteratorSymbol]=wrapperToIterator;}return lodash;} /*--------------------------------------------------------------------------*/ // Export lodash.
var _=runInContext(); // Expose lodash on the free variable `window` or `self` when available. This
// prevents errors in cases where lodash is loaded by a script tag in the presence
// of an AMD loader. See http://requirejs.org/docs/errors.html#mismatch for more details.
(freeWindow||freeSelf||{})._=_; // Some AMD build optimizers like r.js check for condition patterns like the following:
if(typeof define=='function'&&_typeof(define.amd)=='object'&&define.amd){ // Define as an anonymous module so, through path mapping, it can be
// referenced as the "underscore" module.
define(function(){return _;});} // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
else if(freeExports&&freeModule){ // Export for Node.js.
if(moduleExports){(freeModule.exports=_)._=_;} // Export for CommonJS support.
freeExports._=_;}else { // Export to the global object.
root._=_;}}).call(this);}).call(this,typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{}],3:[function(require,module,exports){ // shim for using process in browser
var process=module.exports={};process.nextTick=function(){var canSetImmediate=typeof window!=='undefined'&&window.setImmediate;var canPost=typeof window!=='undefined'&&window.postMessage&&window.addEventListener;if(canSetImmediate){return function(f){return window.setImmediate(f);};}if(canPost){var queue=[];window.addEventListener('message',function(ev){var source=ev.source;if((source===window||source===null)&&ev.data==='process-tick'){ev.stopPropagation();if(queue.length>0){var fn=queue.shift();fn();}}},true);return function nextTick(fn){queue.push(fn);window.postMessage('process-tick','*');};}return function nextTick(fn){setTimeout(fn,0);};}();process.title='browser';process.browser=true;process.env={};process.argv=[];function noop(){}process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.binding=function(name){throw new Error('process.binding is not supported');}; // TODO(shtylman)
process.cwd=function(){return '/';};process.chdir=function(dir){throw new Error('process.chdir is not supported');};},{}],4:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule AutoFocusMixin
 * @typechecks static-only
 */"use strict";var focusNode=require("./focusNode");var AutoFocusMixin={componentDidMount:function componentDidMount(){if(this.props.autoFocus){focusNode(this.getDOMNode());}}};module.exports=AutoFocusMixin;},{"./focusNode":109}],5:[function(require,module,exports){ /**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule BeforeInputEventPlugin
 * @typechecks static-only
 */"use strict";var EventConstants=require("./EventConstants");var EventPropagators=require("./EventPropagators");var ExecutionEnvironment=require("./ExecutionEnvironment");var SyntheticInputEvent=require("./SyntheticInputEvent");var keyOf=require("./keyOf");var canUseTextInputEvent=ExecutionEnvironment.canUseDOM&&'TextEvent' in window&&!('documentMode' in document||isPresto()); /**
 * Opera <= 12 includes TextEvent in window, but does not fire
 * text input events. Rely on keypress instead.
 */function isPresto(){var opera=window.opera;return (typeof opera==="undefined"?"undefined":_typeof(opera))==='object'&&typeof opera.version==='function'&&parseInt(opera.version(),10)<=12;}var SPACEBAR_CODE=32;var SPACEBAR_CHAR=String.fromCharCode(SPACEBAR_CODE);var topLevelTypes=EventConstants.topLevelTypes; // Events and their corresponding property names.
var eventTypes={beforeInput:{phasedRegistrationNames:{bubbled:keyOf({onBeforeInput:null}),captured:keyOf({onBeforeInputCapture:null})},dependencies:[topLevelTypes.topCompositionEnd,topLevelTypes.topKeyPress,topLevelTypes.topTextInput,topLevelTypes.topPaste]}}; // Track characters inserted via keypress and composition events.
var fallbackChars=null; /**
 * Return whether a native keypress event is assumed to be a command.
 * This is required because Firefox fires `keypress` events for key commands
 * (cut, copy, select-all, etc.) even though no character is inserted.
 */function isKeypressCommand(nativeEvent){return (nativeEvent.ctrlKey||nativeEvent.altKey||nativeEvent.metaKey)&& // ctrlKey && altKey is equivalent to AltGr, and is not a command.
!(nativeEvent.ctrlKey&&nativeEvent.altKey);} /**
 * Create an `onBeforeInput` event to match
 * http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105/#events-inputevents.
 *
 * This event plugin is based on the native `textInput` event
 * available in Chrome, Safari, Opera, and IE. This event fires after
 * `onKeyPress` and `onCompositionEnd`, but before `onInput`.
 *
 * `beforeInput` is spec'd but not implemented in any browsers, and
 * the `input` event does not provide any useful information about what has
 * actually been added, contrary to the spec. Thus, `textInput` is the best
 * available event to identify the characters that have actually been inserted
 * into the target node.
 */var BeforeInputEventPlugin={eventTypes:eventTypes, /**
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {*} An accumulation of synthetic events.
   * @see {EventPluginHub.extractEvents}
   */extractEvents:function extractEvents(topLevelType,topLevelTarget,topLevelTargetID,nativeEvent){var chars;if(canUseTextInputEvent){switch(topLevelType){case topLevelTypes.topKeyPress: /**
           * If native `textInput` events are available, our goal is to make
           * use of them. However, there is a special case: the spacebar key.
           * In Webkit, preventing default on a spacebar `textInput` event
           * cancels character insertion, but it *also* causes the browser
           * to fall back to its default spacebar behavior of scrolling the
           * page.
           *
           * Tracking at:
           * https://code.google.com/p/chromium/issues/detail?id=355103
           *
           * To avoid this issue, use the keypress event as if no `textInput`
           * event is available.
           */var which=nativeEvent.which;if(which!==SPACEBAR_CODE){return;}chars=String.fromCharCode(which);break;case topLevelTypes.topTextInput: // Record the characters to be added to the DOM.
chars=nativeEvent.data; // If it's a spacebar character, assume that we have already handled
// it at the keypress level and bail immediately.
if(chars===SPACEBAR_CHAR){return;} // Otherwise, carry on.
break;default: // For other native event types, do nothing.
return;}}else {switch(topLevelType){case topLevelTypes.topPaste: // If a paste event occurs after a keypress, throw out the input
// chars. Paste events should not lead to BeforeInput events.
fallbackChars=null;break;case topLevelTypes.topKeyPress: /**
           * As of v27, Firefox may fire keypress events even when no character
           * will be inserted. A few possibilities:
           *
           * - `which` is `0`. Arrow keys, Esc key, etc.
           *
           * - `which` is the pressed key code, but no char is available.
           *   Ex: 'AltGr + d` in Polish. There is no modified character for
           *   this key combination and no character is inserted into the
           *   document, but FF fires the keypress for char code `100` anyway.
           *   No `input` event will occur.
           *
           * - `which` is the pressed key code, but a command combination is
           *   being used. Ex: `Cmd+C`. No character is inserted, and no
           *   `input` event will occur.
           */if(nativeEvent.which&&!isKeypressCommand(nativeEvent)){fallbackChars=String.fromCharCode(nativeEvent.which);}break;case topLevelTypes.topCompositionEnd:fallbackChars=nativeEvent.data;break;} // If no changes have occurred to the fallback string, no relevant
// event has fired and we're done.
if(fallbackChars===null){return;}chars=fallbackChars;} // If no characters are being inserted, no BeforeInput event should
// be fired.
if(!chars){return;}var event=SyntheticInputEvent.getPooled(eventTypes.beforeInput,topLevelTargetID,nativeEvent);event.data=chars;fallbackChars=null;EventPropagators.accumulateTwoPhaseDispatches(event);return event;}};module.exports=BeforeInputEventPlugin;},{"./EventConstants":18,"./EventPropagators":23,"./ExecutionEnvironment":24,"./SyntheticInputEvent":89,"./keyOf":130}],6:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule CSSProperty
 */"use strict"; /**
 * CSS properties which accept numbers but are not in units of "px".
 */var isUnitlessNumber={columnCount:true,fillOpacity:true,flex:true,flexGrow:true,flexShrink:true,fontWeight:true,lineClamp:true,lineHeight:true,opacity:true,order:true,orphans:true,widows:true,zIndex:true,zoom:true}; /**
 * @param {string} prefix vendor-specific prefix, eg: Webkit
 * @param {string} key style name, eg: transitionDuration
 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
 * WebkitTransitionDuration
 */function prefixKey(prefix,key){return prefix+key.charAt(0).toUpperCase()+key.substring(1);} /**
 * Support style names that may come passed in prefixed by adding permutations
 * of vendor prefixes.
 */var prefixes=['Webkit','ms','Moz','O']; // Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
// infinite loop, because it iterates over the newly added props too.
Object.keys(isUnitlessNumber).forEach(function(prop){prefixes.forEach(function(prefix){isUnitlessNumber[prefixKey(prefix,prop)]=isUnitlessNumber[prop];});}); /**
 * Most style properties can be unset by doing .style[prop] = '' but IE8
 * doesn't like doing that with shorthand properties so for the properties that
 * IE8 breaks on, which are listed here, we instead unset each of the
 * individual properties. See http://bugs.jquery.com/ticket/12385.
 * The 4-value 'clock' properties like margin, padding, border-width seem to
 * behave without any problems. Curiously, list-style works too without any
 * special prodding.
 */var shorthandPropertyExpansions={background:{backgroundImage:true,backgroundPosition:true,backgroundRepeat:true,backgroundColor:true},border:{borderWidth:true,borderStyle:true,borderColor:true},borderBottom:{borderBottomWidth:true,borderBottomStyle:true,borderBottomColor:true},borderLeft:{borderLeftWidth:true,borderLeftStyle:true,borderLeftColor:true},borderRight:{borderRightWidth:true,borderRightStyle:true,borderRightColor:true},borderTop:{borderTopWidth:true,borderTopStyle:true,borderTopColor:true},font:{fontStyle:true,fontVariant:true,fontWeight:true,fontSize:true,lineHeight:true,fontFamily:true}};var CSSProperty={isUnitlessNumber:isUnitlessNumber,shorthandPropertyExpansions:shorthandPropertyExpansions};module.exports=CSSProperty;},{}],7:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule CSSPropertyOperations
 * @typechecks static-only
 */"use strict";var CSSProperty=require("./CSSProperty");var dangerousStyleValue=require("./dangerousStyleValue");var hyphenateStyleName=require("./hyphenateStyleName");var memoizeStringOnly=require("./memoizeStringOnly");var processStyleName=memoizeStringOnly(function(styleName){return hyphenateStyleName(styleName);}); /**
 * Operations for dealing with CSS properties.
 */var CSSPropertyOperations={ /**
   * Serializes a mapping of style properties for use as inline styles:
   *
   *   > createMarkupForStyles({width: '200px', height: 0})
   *   "width:200px;height:0;"
   *
   * Undefined values are ignored so that declarative programming is easier.
   * The result should be HTML-escaped before insertion into the DOM.
   *
   * @param {object} styles
   * @return {?string}
   */createMarkupForStyles:function createMarkupForStyles(styles){var serialized='';for(var styleName in styles){if(!styles.hasOwnProperty(styleName)){continue;}var styleValue=styles[styleName];if(styleValue!=null){serialized+=processStyleName(styleName)+':';serialized+=dangerousStyleValue(styleName,styleValue)+';';}}return serialized||null;}, /**
   * Sets the value for multiple styles on a node.  If a value is specified as
   * '' (empty string), the corresponding style property will be unset.
   *
   * @param {DOMElement} node
   * @param {object} styles
   */setValueForStyles:function setValueForStyles(node,styles){var style=node.style;for(var styleName in styles){if(!styles.hasOwnProperty(styleName)){continue;}var styleValue=dangerousStyleValue(styleName,styles[styleName]);if(styleValue){style[styleName]=styleValue;}else {var expansion=CSSProperty.shorthandPropertyExpansions[styleName];if(expansion){ // Shorthand property that IE8 won't like unsetting, so unset each
// component to placate it
for(var individualStyleName in expansion){style[individualStyleName]='';}}else {style[styleName]='';}}}}};module.exports=CSSPropertyOperations;},{"./CSSProperty":6,"./dangerousStyleValue":104,"./hyphenateStyleName":121,"./memoizeStringOnly":132}],8:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule CallbackQueue
 */"use strict";var PooledClass=require("./PooledClass");var invariant=require("./invariant");var mixInto=require("./mixInto"); /**
 * A specialized pseudo-event module to help keep track of components waiting to
 * be notified when their DOM representations are available for use.
 *
 * This implements `PooledClass`, so you should never need to instantiate this.
 * Instead, use `CallbackQueue.getPooled()`.
 *
 * @class ReactMountReady
 * @implements PooledClass
 * @internal
 */function CallbackQueue(){this._callbacks=null;this._contexts=null;}mixInto(CallbackQueue,{ /**
   * Enqueues a callback to be invoked when `notifyAll` is invoked.
   *
   * @param {function} callback Invoked when `notifyAll` is invoked.
   * @param {?object} context Context to call `callback` with.
   * @internal
   */enqueue:function enqueue(callback,context){this._callbacks=this._callbacks||[];this._contexts=this._contexts||[];this._callbacks.push(callback);this._contexts.push(context);}, /**
   * Invokes all enqueued callbacks and clears the queue. This is invoked after
   * the DOM representation of a component has been created or updated.
   *
   * @internal
   */notifyAll:function notifyAll(){var callbacks=this._callbacks;var contexts=this._contexts;if(callbacks){"production"!==process.env.NODE_ENV?invariant(callbacks.length===contexts.length,"Mismatched list of contexts in callback queue"):invariant(callbacks.length===contexts.length);this._callbacks=null;this._contexts=null;for(var i=0,l=callbacks.length;i<l;i++){callbacks[i].call(contexts[i]);}callbacks.length=0;contexts.length=0;}}, /**
   * Resets the internal queue.
   *
   * @internal
   */reset:function reset(){this._callbacks=null;this._contexts=null;}, /**
   * `PooledClass` looks for this.
   */destructor:function destructor(){this.reset();}});PooledClass.addPoolingTo(CallbackQueue);module.exports=CallbackQueue;}).call(this,require("e/U+97"));},{"./PooledClass":29,"./invariant":123,"./mixInto":136,"e/U+97":3}],9:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ChangeEventPlugin
 */"use strict";var EventConstants=require("./EventConstants");var EventPluginHub=require("./EventPluginHub");var EventPropagators=require("./EventPropagators");var ExecutionEnvironment=require("./ExecutionEnvironment");var ReactUpdates=require("./ReactUpdates");var SyntheticEvent=require("./SyntheticEvent");var isEventSupported=require("./isEventSupported");var isTextInputElement=require("./isTextInputElement");var keyOf=require("./keyOf");var topLevelTypes=EventConstants.topLevelTypes;var eventTypes={change:{phasedRegistrationNames:{bubbled:keyOf({onChange:null}),captured:keyOf({onChangeCapture:null})},dependencies:[topLevelTypes.topBlur,topLevelTypes.topChange,topLevelTypes.topClick,topLevelTypes.topFocus,topLevelTypes.topInput,topLevelTypes.topKeyDown,topLevelTypes.topKeyUp,topLevelTypes.topSelectionChange]}}; /**
 * For IE shims
 */var activeElement=null;var activeElementID=null;var activeElementValue=null;var activeElementValueProp=null; /**
 * SECTION: handle `change` event
 */function shouldUseChangeEvent(elem){return elem.nodeName==='SELECT'||elem.nodeName==='INPUT'&&elem.type==='file';}var doesChangeEventBubble=false;if(ExecutionEnvironment.canUseDOM){ // See `handleChange` comment below
doesChangeEventBubble=isEventSupported('change')&&(!('documentMode' in document)||document.documentMode>8);}function manualDispatchChangeEvent(nativeEvent){var event=SyntheticEvent.getPooled(eventTypes.change,activeElementID,nativeEvent);EventPropagators.accumulateTwoPhaseDispatches(event); // If change and propertychange bubbled, we'd just bind to it like all the
// other events and have it go through ReactBrowserEventEmitter. Since it
// doesn't, we manually listen for the events and so we have to enqueue and
// process the abstract event manually.
//
// Batching is necessary here in order to ensure that all event handlers run
// before the next rerender (including event handlers attached to ancestor
// elements instead of directly on the input). Without this, controlled
// components don't work properly in conjunction with event bubbling because
// the component is rerendered and the value reverted before all the event
// handlers can run. See https://github.com/facebook/react/issues/708.
ReactUpdates.batchedUpdates(runEventInBatch,event);}function runEventInBatch(event){EventPluginHub.enqueueEvents(event);EventPluginHub.processEventQueue();}function startWatchingForChangeEventIE8(target,targetID){activeElement=target;activeElementID=targetID;activeElement.attachEvent('onchange',manualDispatchChangeEvent);}function stopWatchingForChangeEventIE8(){if(!activeElement){return;}activeElement.detachEvent('onchange',manualDispatchChangeEvent);activeElement=null;activeElementID=null;}function getTargetIDForChangeEvent(topLevelType,topLevelTarget,topLevelTargetID){if(topLevelType===topLevelTypes.topChange){return topLevelTargetID;}}function handleEventsForChangeEventIE8(topLevelType,topLevelTarget,topLevelTargetID){if(topLevelType===topLevelTypes.topFocus){ // stopWatching() should be a noop here but we call it just in case we
// missed a blur event somehow.
stopWatchingForChangeEventIE8();startWatchingForChangeEventIE8(topLevelTarget,topLevelTargetID);}else if(topLevelType===topLevelTypes.topBlur){stopWatchingForChangeEventIE8();}} /**
 * SECTION: handle `input` event
 */var isInputEventSupported=false;if(ExecutionEnvironment.canUseDOM){ // IE9 claims to support the input event but fails to trigger it when
// deleting text, so we ignore its input events
isInputEventSupported=isEventSupported('input')&&(!('documentMode' in document)||document.documentMode>9);} /**
 * (For old IE.) Replacement getter/setter for the `value` property that gets
 * set on the active element.
 */var newValueProp={get:function get(){return activeElementValueProp.get.call(this);},set:function set(val){ // Cast to a string so we can do equality checks.
activeElementValue=''+val;activeElementValueProp.set.call(this,val);}}; /**
 * (For old IE.) Starts tracking propertychange events on the passed-in element
 * and override the value property so that we can distinguish user events from
 * value changes in JS.
 */function startWatchingForValueChange(target,targetID){activeElement=target;activeElementID=targetID;activeElementValue=target.value;activeElementValueProp=Object.getOwnPropertyDescriptor(target.constructor.prototype,'value');Object.defineProperty(activeElement,'value',newValueProp);activeElement.attachEvent('onpropertychange',handlePropertyChange);} /**
 * (For old IE.) Removes the event listeners from the currently-tracked element,
 * if any exists.
 */function stopWatchingForValueChange(){if(!activeElement){return;} // delete restores the original property definition
delete activeElement.value;activeElement.detachEvent('onpropertychange',handlePropertyChange);activeElement=null;activeElementID=null;activeElementValue=null;activeElementValueProp=null;} /**
 * (For old IE.) Handles a propertychange event, sending a `change` event if
 * the value of the active element has changed.
 */function handlePropertyChange(nativeEvent){if(nativeEvent.propertyName!=='value'){return;}var value=nativeEvent.srcElement.value;if(value===activeElementValue){return;}activeElementValue=value;manualDispatchChangeEvent(nativeEvent);} /**
 * If a `change` event should be fired, returns the target's ID.
 */function getTargetIDForInputEvent(topLevelType,topLevelTarget,topLevelTargetID){if(topLevelType===topLevelTypes.topInput){ // In modern browsers (i.e., not IE8 or IE9), the input event is exactly
// what we want so fall through here and trigger an abstract event
return topLevelTargetID;}} // For IE8 and IE9.
function handleEventsForInputEventIE(topLevelType,topLevelTarget,topLevelTargetID){if(topLevelType===topLevelTypes.topFocus){ // In IE8, we can capture almost all .value changes by adding a
// propertychange handler and looking for events with propertyName
// equal to 'value'
// In IE9, propertychange fires for most input events but is buggy and
// doesn't fire when text is deleted, but conveniently, selectionchange
// appears to fire in all of the remaining cases so we catch those and
// forward the event if the value has changed
// In either case, we don't want to call the event handler if the value
// is changed from JS so we redefine a setter for `.value` that updates
// our activeElementValue variable, allowing us to ignore those changes
//
// stopWatching() should be a noop here but we call it just in case we
// missed a blur event somehow.
stopWatchingForValueChange();startWatchingForValueChange(topLevelTarget,topLevelTargetID);}else if(topLevelType===topLevelTypes.topBlur){stopWatchingForValueChange();}} // For IE8 and IE9.
function getTargetIDForInputEventIE(topLevelType,topLevelTarget,topLevelTargetID){if(topLevelType===topLevelTypes.topSelectionChange||topLevelType===topLevelTypes.topKeyUp||topLevelType===topLevelTypes.topKeyDown){ // On the selectionchange event, the target is just document which isn't
// helpful for us so just check activeElement instead.
//
// 99% of the time, keydown and keyup aren't necessary. IE8 fails to fire
// propertychange on the first input event after setting `value` from a
// script and fires only keydown, keypress, keyup. Catching keyup usually
// gets it and catching keydown lets us fire an event for the first
// keystroke if user does a key repeat (it'll be a little delayed: right
// before the second keystroke). Other input methods (e.g., paste) seem to
// fire selectionchange normally.
if(activeElement&&activeElement.value!==activeElementValue){activeElementValue=activeElement.value;return activeElementID;}}} /**
 * SECTION: handle `click` event
 */function shouldUseClickEvent(elem){ // Use the `click` event to detect changes to checkbox and radio inputs.
// This approach works across all browsers, whereas `change` does not fire
// until `blur` in IE8.
return elem.nodeName==='INPUT'&&(elem.type==='checkbox'||elem.type==='radio');}function getTargetIDForClickEvent(topLevelType,topLevelTarget,topLevelTargetID){if(topLevelType===topLevelTypes.topClick){return topLevelTargetID;}} /**
 * This plugin creates an `onChange` event that normalizes change events
 * across form elements. This event fires at a time when it's possible to
 * change the element's value without seeing a flicker.
 *
 * Supported elements are:
 * - input (see `isTextInputElement`)
 * - textarea
 * - select
 */var ChangeEventPlugin={eventTypes:eventTypes, /**
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {*} An accumulation of synthetic events.
   * @see {EventPluginHub.extractEvents}
   */extractEvents:function extractEvents(topLevelType,topLevelTarget,topLevelTargetID,nativeEvent){var getTargetIDFunc,handleEventFunc;if(shouldUseChangeEvent(topLevelTarget)){if(doesChangeEventBubble){getTargetIDFunc=getTargetIDForChangeEvent;}else {handleEventFunc=handleEventsForChangeEventIE8;}}else if(isTextInputElement(topLevelTarget)){if(isInputEventSupported){getTargetIDFunc=getTargetIDForInputEvent;}else {getTargetIDFunc=getTargetIDForInputEventIE;handleEventFunc=handleEventsForInputEventIE;}}else if(shouldUseClickEvent(topLevelTarget)){getTargetIDFunc=getTargetIDForClickEvent;}if(getTargetIDFunc){var targetID=getTargetIDFunc(topLevelType,topLevelTarget,topLevelTargetID);if(targetID){var event=SyntheticEvent.getPooled(eventTypes.change,targetID,nativeEvent);EventPropagators.accumulateTwoPhaseDispatches(event);return event;}}if(handleEventFunc){handleEventFunc(topLevelType,topLevelTarget,topLevelTargetID);}}};module.exports=ChangeEventPlugin;},{"./EventConstants":18,"./EventPluginHub":20,"./EventPropagators":23,"./ExecutionEnvironment":24,"./ReactUpdates":79,"./SyntheticEvent":87,"./isEventSupported":124,"./isTextInputElement":126,"./keyOf":130}],10:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ClientReactRootIndex
 * @typechecks
 */"use strict";var nextReactRootIndex=0;var ClientReactRootIndex={createReactRootIndex:function createReactRootIndex(){return nextReactRootIndex++;}};module.exports=ClientReactRootIndex;},{}],11:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule CompositionEventPlugin
 * @typechecks static-only
 */"use strict";var EventConstants=require("./EventConstants");var EventPropagators=require("./EventPropagators");var ExecutionEnvironment=require("./ExecutionEnvironment");var ReactInputSelection=require("./ReactInputSelection");var SyntheticCompositionEvent=require("./SyntheticCompositionEvent");var getTextContentAccessor=require("./getTextContentAccessor");var keyOf=require("./keyOf");var END_KEYCODES=[9,13,27,32]; // Tab, Return, Esc, Space
var START_KEYCODE=229;var useCompositionEvent=ExecutionEnvironment.canUseDOM&&'CompositionEvent' in window; // In IE9+, we have access to composition events, but the data supplied
// by the native compositionend event may be incorrect. In Korean, for example,
// the compositionend event contains only one character regardless of
// how many characters have been composed since compositionstart.
// We therefore use the fallback data while still using the native
// events as triggers.
var useFallbackData=!useCompositionEvent||'documentMode' in document&&document.documentMode>8&&document.documentMode<=11;var topLevelTypes=EventConstants.topLevelTypes;var currentComposition=null; // Events and their corresponding property names.
var eventTypes={compositionEnd:{phasedRegistrationNames:{bubbled:keyOf({onCompositionEnd:null}),captured:keyOf({onCompositionEndCapture:null})},dependencies:[topLevelTypes.topBlur,topLevelTypes.topCompositionEnd,topLevelTypes.topKeyDown,topLevelTypes.topKeyPress,topLevelTypes.topKeyUp,topLevelTypes.topMouseDown]},compositionStart:{phasedRegistrationNames:{bubbled:keyOf({onCompositionStart:null}),captured:keyOf({onCompositionStartCapture:null})},dependencies:[topLevelTypes.topBlur,topLevelTypes.topCompositionStart,topLevelTypes.topKeyDown,topLevelTypes.topKeyPress,topLevelTypes.topKeyUp,topLevelTypes.topMouseDown]},compositionUpdate:{phasedRegistrationNames:{bubbled:keyOf({onCompositionUpdate:null}),captured:keyOf({onCompositionUpdateCapture:null})},dependencies:[topLevelTypes.topBlur,topLevelTypes.topCompositionUpdate,topLevelTypes.topKeyDown,topLevelTypes.topKeyPress,topLevelTypes.topKeyUp,topLevelTypes.topMouseDown]}}; /**
 * Translate native top level events into event types.
 *
 * @param {string} topLevelType
 * @return {object}
 */function getCompositionEventType(topLevelType){switch(topLevelType){case topLevelTypes.topCompositionStart:return eventTypes.compositionStart;case topLevelTypes.topCompositionEnd:return eventTypes.compositionEnd;case topLevelTypes.topCompositionUpdate:return eventTypes.compositionUpdate;}} /**
 * Does our fallback best-guess model think this event signifies that
 * composition has begun?
 *
 * @param {string} topLevelType
 * @param {object} nativeEvent
 * @return {boolean}
 */function isFallbackStart(topLevelType,nativeEvent){return topLevelType===topLevelTypes.topKeyDown&&nativeEvent.keyCode===START_KEYCODE;} /**
 * Does our fallback mode think that this event is the end of composition?
 *
 * @param {string} topLevelType
 * @param {object} nativeEvent
 * @return {boolean}
 */function isFallbackEnd(topLevelType,nativeEvent){switch(topLevelType){case topLevelTypes.topKeyUp: // Command keys insert or clear IME input.
return END_KEYCODES.indexOf(nativeEvent.keyCode)!==-1;case topLevelTypes.topKeyDown: // Expect IME keyCode on each keydown. If we get any other
// code we must have exited earlier.
return nativeEvent.keyCode!==START_KEYCODE;case topLevelTypes.topKeyPress:case topLevelTypes.topMouseDown:case topLevelTypes.topBlur: // Events are not possible without cancelling IME.
return true;default:return false;}} /**
 * Helper class stores information about selection and document state
 * so we can figure out what changed at a later date.
 *
 * @param {DOMEventTarget} root
 */function FallbackCompositionState(root){this.root=root;this.startSelection=ReactInputSelection.getSelection(root);this.startValue=this.getText();} /**
 * Get current text of input.
 *
 * @return {string}
 */FallbackCompositionState.prototype.getText=function(){return this.root.value||this.root[getTextContentAccessor()];}; /**
 * Text that has changed since the start of composition.
 *
 * @return {string}
 */FallbackCompositionState.prototype.getData=function(){var endValue=this.getText();var prefixLength=this.startSelection.start;var suffixLength=this.startValue.length-this.startSelection.end;return endValue.substr(prefixLength,endValue.length-suffixLength-prefixLength);}; /**
 * This plugin creates `onCompositionStart`, `onCompositionUpdate` and
 * `onCompositionEnd` events on inputs, textareas and contentEditable
 * nodes.
 */var CompositionEventPlugin={eventTypes:eventTypes, /**
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {*} An accumulation of synthetic events.
   * @see {EventPluginHub.extractEvents}
   */extractEvents:function extractEvents(topLevelType,topLevelTarget,topLevelTargetID,nativeEvent){var eventType;var data;if(useCompositionEvent){eventType=getCompositionEventType(topLevelType);}else if(!currentComposition){if(isFallbackStart(topLevelType,nativeEvent)){eventType=eventTypes.compositionStart;}}else if(isFallbackEnd(topLevelType,nativeEvent)){eventType=eventTypes.compositionEnd;}if(useFallbackData){ // The current composition is stored statically and must not be
// overwritten while composition continues.
if(!currentComposition&&eventType===eventTypes.compositionStart){currentComposition=new FallbackCompositionState(topLevelTarget);}else if(eventType===eventTypes.compositionEnd){if(currentComposition){data=currentComposition.getData();currentComposition=null;}}}if(eventType){var event=SyntheticCompositionEvent.getPooled(eventType,topLevelTargetID,nativeEvent);if(data){ // Inject data generated from fallback path into the synthetic event.
// This matches the property of native CompositionEventInterface.
event.data=data;}EventPropagators.accumulateTwoPhaseDispatches(event);return event;}}};module.exports=CompositionEventPlugin;},{"./EventConstants":18,"./EventPropagators":23,"./ExecutionEnvironment":24,"./ReactInputSelection":61,"./SyntheticCompositionEvent":85,"./getTextContentAccessor":118,"./keyOf":130}],12:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule DOMChildrenOperations
 * @typechecks static-only
 */"use strict";var Danger=require("./Danger");var ReactMultiChildUpdateTypes=require("./ReactMultiChildUpdateTypes");var getTextContentAccessor=require("./getTextContentAccessor");var invariant=require("./invariant"); /**
 * The DOM property to use when setting text content.
 *
 * @type {string}
 * @private
 */var textContentAccessor=getTextContentAccessor(); /**
 * Inserts `childNode` as a child of `parentNode` at the `index`.
 *
 * @param {DOMElement} parentNode Parent node in which to insert.
 * @param {DOMElement} childNode Child node to insert.
 * @param {number} index Index at which to insert the child.
 * @internal
 */function insertChildAt(parentNode,childNode,index){ // By exploiting arrays returning `undefined` for an undefined index, we can
// rely exclusively on `insertBefore(node, null)` instead of also using
// `appendChild(node)`. However, using `undefined` is not allowed by all
// browsers so we must replace it with `null`.
parentNode.insertBefore(childNode,parentNode.childNodes[index]||null);}var updateTextContent;if(textContentAccessor==='textContent'){ /**
   * Sets the text content of `node` to `text`.
   *
   * @param {DOMElement} node Node to change
   * @param {string} text New text content
   */updateTextContent=function updateTextContent(node,text){node.textContent=text;};}else { /**
   * Sets the text content of `node` to `text`.
   *
   * @param {DOMElement} node Node to change
   * @param {string} text New text content
   */updateTextContent=function updateTextContent(node,text){ // In order to preserve newlines correctly, we can't use .innerText to set
// the contents (see #1080), so we empty the element then append a text node
while(node.firstChild){node.removeChild(node.firstChild);}if(text){var doc=node.ownerDocument||document;node.appendChild(doc.createTextNode(text));}};} /**
 * Operations for updating with DOM children.
 */var DOMChildrenOperations={dangerouslyReplaceNodeWithMarkup:Danger.dangerouslyReplaceNodeWithMarkup,updateTextContent:updateTextContent, /**
   * Updates a component's children by processing a series of updates. The
   * update configurations are each expected to have a `parentNode` property.
   *
   * @param {array<object>} updates List of update configurations.
   * @param {array<string>} markupList List of markup strings.
   * @internal
   */processUpdates:function processUpdates(updates,markupList){var update; // Mapping from parent IDs to initial child orderings.
var initialChildren=null; // List of children that will be moved or removed.
var updatedChildren=null;for(var i=0;update=updates[i];i++){if(update.type===ReactMultiChildUpdateTypes.MOVE_EXISTING||update.type===ReactMultiChildUpdateTypes.REMOVE_NODE){var updatedIndex=update.fromIndex;var updatedChild=update.parentNode.childNodes[updatedIndex];var parentID=update.parentID;"production"!==process.env.NODE_ENV?invariant(updatedChild,'processUpdates(): Unable to find child %s of element. This '+'probably means the DOM was unexpectedly mutated (e.g., by the '+'browser), usually due to forgetting a <tbody> when using tables, '+'nesting <p> or <a> tags, or using non-SVG elements in an <svg> '+'parent. Try inspecting the child nodes of the element with React '+'ID `%s`.',updatedIndex,parentID):invariant(updatedChild);initialChildren=initialChildren||{};initialChildren[parentID]=initialChildren[parentID]||[];initialChildren[parentID][updatedIndex]=updatedChild;updatedChildren=updatedChildren||[];updatedChildren.push(updatedChild);}}var renderedMarkup=Danger.dangerouslyRenderMarkup(markupList); // Remove updated children first so that `toIndex` is consistent.
if(updatedChildren){for(var j=0;j<updatedChildren.length;j++){updatedChildren[j].parentNode.removeChild(updatedChildren[j]);}}for(var k=0;update=updates[k];k++){switch(update.type){case ReactMultiChildUpdateTypes.INSERT_MARKUP:insertChildAt(update.parentNode,renderedMarkup[update.markupIndex],update.toIndex);break;case ReactMultiChildUpdateTypes.MOVE_EXISTING:insertChildAt(update.parentNode,initialChildren[update.parentID][update.fromIndex],update.toIndex);break;case ReactMultiChildUpdateTypes.TEXT_CONTENT:updateTextContent(update.parentNode,update.textContent);break;case ReactMultiChildUpdateTypes.REMOVE_NODE: // Already removed by the for-loop above.
break;}}}};module.exports=DOMChildrenOperations;}).call(this,require("e/U+97"));},{"./Danger":15,"./ReactMultiChildUpdateTypes":66,"./getTextContentAccessor":118,"./invariant":123,"e/U+97":3}],13:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule DOMProperty
 * @typechecks static-only
 */ /*jslint bitwise: true */"use strict";var invariant=require("./invariant");var DOMPropertyInjection={ /**
   * Mapping from normalized, camelcased property names to a configuration that
   * specifies how the associated DOM property should be accessed or rendered.
   */MUST_USE_ATTRIBUTE:0x1,MUST_USE_PROPERTY:0x2,HAS_SIDE_EFFECTS:0x4,HAS_BOOLEAN_VALUE:0x8,HAS_NUMERIC_VALUE:0x10,HAS_POSITIVE_NUMERIC_VALUE:0x20|0x10,HAS_OVERLOADED_BOOLEAN_VALUE:0x40, /**
   * Inject some specialized knowledge about the DOM. This takes a config object
   * with the following properties:
   *
   * isCustomAttribute: function that given an attribute name will return true
   * if it can be inserted into the DOM verbatim. Useful for data-* or aria-*
   * attributes where it's impossible to enumerate all of the possible
   * attribute names,
   *
   * Properties: object mapping DOM property name to one of the
   * DOMPropertyInjection constants or null. If your attribute isn't in here,
   * it won't get written to the DOM.
   *
   * DOMAttributeNames: object mapping React attribute name to the DOM
   * attribute name. Attribute names not specified use the **lowercase**
   * normalized name.
   *
   * DOMPropertyNames: similar to DOMAttributeNames but for DOM properties.
   * Property names not specified use the normalized name.
   *
   * DOMMutationMethods: Properties that require special mutation methods. If
   * `value` is undefined, the mutation method should unset the property.
   *
   * @param {object} domPropertyConfig the config as described above.
   */injectDOMPropertyConfig:function injectDOMPropertyConfig(domPropertyConfig){var Properties=domPropertyConfig.Properties||{};var DOMAttributeNames=domPropertyConfig.DOMAttributeNames||{};var DOMPropertyNames=domPropertyConfig.DOMPropertyNames||{};var DOMMutationMethods=domPropertyConfig.DOMMutationMethods||{};if(domPropertyConfig.isCustomAttribute){DOMProperty._isCustomAttributeFunctions.push(domPropertyConfig.isCustomAttribute);}for(var propName in Properties){"production"!==process.env.NODE_ENV?invariant(!DOMProperty.isStandardName.hasOwnProperty(propName),'injectDOMPropertyConfig(...): You\'re trying to inject DOM property '+'\'%s\' which has already been injected. You may be accidentally '+'injecting the same DOM property config twice, or you may be '+'injecting two configs that have conflicting property names.',propName):invariant(!DOMProperty.isStandardName.hasOwnProperty(propName));DOMProperty.isStandardName[propName]=true;var lowerCased=propName.toLowerCase();DOMProperty.getPossibleStandardName[lowerCased]=propName;if(DOMAttributeNames.hasOwnProperty(propName)){var attributeName=DOMAttributeNames[propName];DOMProperty.getPossibleStandardName[attributeName]=propName;DOMProperty.getAttributeName[propName]=attributeName;}else {DOMProperty.getAttributeName[propName]=lowerCased;}DOMProperty.getPropertyName[propName]=DOMPropertyNames.hasOwnProperty(propName)?DOMPropertyNames[propName]:propName;if(DOMMutationMethods.hasOwnProperty(propName)){DOMProperty.getMutationMethod[propName]=DOMMutationMethods[propName];}else {DOMProperty.getMutationMethod[propName]=null;}var propConfig=Properties[propName];DOMProperty.mustUseAttribute[propName]=propConfig&DOMPropertyInjection.MUST_USE_ATTRIBUTE;DOMProperty.mustUseProperty[propName]=propConfig&DOMPropertyInjection.MUST_USE_PROPERTY;DOMProperty.hasSideEffects[propName]=propConfig&DOMPropertyInjection.HAS_SIDE_EFFECTS;DOMProperty.hasBooleanValue[propName]=propConfig&DOMPropertyInjection.HAS_BOOLEAN_VALUE;DOMProperty.hasNumericValue[propName]=propConfig&DOMPropertyInjection.HAS_NUMERIC_VALUE;DOMProperty.hasPositiveNumericValue[propName]=propConfig&DOMPropertyInjection.HAS_POSITIVE_NUMERIC_VALUE;DOMProperty.hasOverloadedBooleanValue[propName]=propConfig&DOMPropertyInjection.HAS_OVERLOADED_BOOLEAN_VALUE;"production"!==process.env.NODE_ENV?invariant(!DOMProperty.mustUseAttribute[propName]||!DOMProperty.mustUseProperty[propName],'DOMProperty: Cannot require using both attribute and property: %s',propName):invariant(!DOMProperty.mustUseAttribute[propName]||!DOMProperty.mustUseProperty[propName]);"production"!==process.env.NODE_ENV?invariant(DOMProperty.mustUseProperty[propName]||!DOMProperty.hasSideEffects[propName],'DOMProperty: Properties that have side effects must use property: %s',propName):invariant(DOMProperty.mustUseProperty[propName]||!DOMProperty.hasSideEffects[propName]);"production"!==process.env.NODE_ENV?invariant(!!DOMProperty.hasBooleanValue[propName]+!!DOMProperty.hasNumericValue[propName]+!!DOMProperty.hasOverloadedBooleanValue[propName]<=1,'DOMProperty: Value can be one of boolean, overloaded boolean, or '+'numeric value, but not a combination: %s',propName):invariant(!!DOMProperty.hasBooleanValue[propName]+!!DOMProperty.hasNumericValue[propName]+!!DOMProperty.hasOverloadedBooleanValue[propName]<=1);}}};var defaultValueCache={}; /**
 * DOMProperty exports lookup objects that can be used like functions:
 *
 *   > DOMProperty.isValid['id']
 *   true
 *   > DOMProperty.isValid['foobar']
 *   undefined
 *
 * Although this may be confusing, it performs better in general.
 *
 * @see http://jsperf.com/key-exists
 * @see http://jsperf.com/key-missing
 */var DOMProperty={ID_ATTRIBUTE_NAME:'data-reactid', /**
   * Checks whether a property name is a standard property.
   * @type {Object}
   */isStandardName:{}, /**
   * Mapping from lowercase property names to the properly cased version, used
   * to warn in the case of missing properties.
   * @type {Object}
   */getPossibleStandardName:{}, /**
   * Mapping from normalized names to attribute names that differ. Attribute
   * names are used when rendering markup or with `*Attribute()`.
   * @type {Object}
   */getAttributeName:{}, /**
   * Mapping from normalized names to properties on DOM node instances.
   * (This includes properties that mutate due to external factors.)
   * @type {Object}
   */getPropertyName:{}, /**
   * Mapping from normalized names to mutation methods. This will only exist if
   * mutation cannot be set simply by the property or `setAttribute()`.
   * @type {Object}
   */getMutationMethod:{}, /**
   * Whether the property must be accessed and mutated as an object property.
   * @type {Object}
   */mustUseAttribute:{}, /**
   * Whether the property must be accessed and mutated using `*Attribute()`.
   * (This includes anything that fails `<propName> in <element>`.)
   * @type {Object}
   */mustUseProperty:{}, /**
   * Whether or not setting a value causes side effects such as triggering
   * resources to be loaded or text selection changes. We must ensure that
   * the value is only set if it has changed.
   * @type {Object}
   */hasSideEffects:{}, /**
   * Whether the property should be removed when set to a falsey value.
   * @type {Object}
   */hasBooleanValue:{}, /**
   * Whether the property must be numeric or parse as a
   * numeric and should be removed when set to a falsey value.
   * @type {Object}
   */hasNumericValue:{}, /**
   * Whether the property must be positive numeric or parse as a positive
   * numeric and should be removed when set to a falsey value.
   * @type {Object}
   */hasPositiveNumericValue:{}, /**
   * Whether the property can be used as a flag as well as with a value. Removed
   * when strictly equal to false; present without a value when strictly equal
   * to true; present with a value otherwise.
   * @type {Object}
   */hasOverloadedBooleanValue:{}, /**
   * All of the isCustomAttribute() functions that have been injected.
   */_isCustomAttributeFunctions:[], /**
   * Checks whether a property name is a custom attribute.
   * @method
   */isCustomAttribute:function isCustomAttribute(attributeName){for(var i=0;i<DOMProperty._isCustomAttributeFunctions.length;i++){var isCustomAttributeFn=DOMProperty._isCustomAttributeFunctions[i];if(isCustomAttributeFn(attributeName)){return true;}}return false;}, /**
   * Returns the default property value for a DOM property (i.e., not an
   * attribute). Most default values are '' or false, but not all. Worse yet,
   * some (in particular, `type`) vary depending on the type of element.
   *
   * TODO: Is it better to grab all the possible properties when creating an
   * element to avoid having to create the same element twice?
   */getDefaultValueForProperty:function getDefaultValueForProperty(nodeName,prop){var nodeDefaults=defaultValueCache[nodeName];var testElement;if(!nodeDefaults){defaultValueCache[nodeName]=nodeDefaults={};}if(!(prop in nodeDefaults)){testElement=document.createElement(nodeName);nodeDefaults[prop]=testElement[prop];}return nodeDefaults[prop];},injection:DOMPropertyInjection};module.exports=DOMProperty;}).call(this,require("e/U+97"));},{"./invariant":123,"e/U+97":3}],14:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule DOMPropertyOperations
 * @typechecks static-only
 */"use strict";var DOMProperty=require("./DOMProperty");var escapeTextForBrowser=require("./escapeTextForBrowser");var memoizeStringOnly=require("./memoizeStringOnly");var warning=require("./warning");function shouldIgnoreValue(name,value){return value==null||DOMProperty.hasBooleanValue[name]&&!value||DOMProperty.hasNumericValue[name]&&isNaN(value)||DOMProperty.hasPositiveNumericValue[name]&&value<1||DOMProperty.hasOverloadedBooleanValue[name]&&value===false;}var processAttributeNameAndPrefix=memoizeStringOnly(function(name){return escapeTextForBrowser(name)+'="';});if("production"!==process.env.NODE_ENV){var reactProps={children:true,dangerouslySetInnerHTML:true,key:true,ref:true};var warnedProperties={};var warnUnknownProperty=function warnUnknownProperty(name){if(reactProps.hasOwnProperty(name)&&reactProps[name]||warnedProperties.hasOwnProperty(name)&&warnedProperties[name]){return;}warnedProperties[name]=true;var lowerCasedName=name.toLowerCase(); // data-* attributes should be lowercase; suggest the lowercase version
var standardName=DOMProperty.isCustomAttribute(lowerCasedName)?lowerCasedName:DOMProperty.getPossibleStandardName.hasOwnProperty(lowerCasedName)?DOMProperty.getPossibleStandardName[lowerCasedName]:null; // For now, only warn when we have a suggested correction. This prevents
// logging too much when using transferPropsTo.
"production"!==process.env.NODE_ENV?warning(standardName==null,'Unknown DOM property '+name+'. Did you mean '+standardName+'?'):null;};} /**
 * Operations for dealing with DOM properties.
 */var DOMPropertyOperations={ /**
   * Creates markup for the ID property.
   *
   * @param {string} id Unescaped ID.
   * @return {string} Markup string.
   */createMarkupForID:function createMarkupForID(id){return processAttributeNameAndPrefix(DOMProperty.ID_ATTRIBUTE_NAME)+escapeTextForBrowser(id)+'"';}, /**
   * Creates markup for a property.
   *
   * @param {string} name
   * @param {*} value
   * @return {?string} Markup string, or null if the property was invalid.
   */createMarkupForProperty:function createMarkupForProperty(name,value){if(DOMProperty.isStandardName.hasOwnProperty(name)&&DOMProperty.isStandardName[name]){if(shouldIgnoreValue(name,value)){return '';}var attributeName=DOMProperty.getAttributeName[name];if(DOMProperty.hasBooleanValue[name]||DOMProperty.hasOverloadedBooleanValue[name]&&value===true){return escapeTextForBrowser(attributeName);}return processAttributeNameAndPrefix(attributeName)+escapeTextForBrowser(value)+'"';}else if(DOMProperty.isCustomAttribute(name)){if(value==null){return '';}return processAttributeNameAndPrefix(name)+escapeTextForBrowser(value)+'"';}else if("production"!==process.env.NODE_ENV){warnUnknownProperty(name);}return null;}, /**
   * Sets the value for a property on a node.
   *
   * @param {DOMElement} node
   * @param {string} name
   * @param {*} value
   */setValueForProperty:function setValueForProperty(node,name,value){if(DOMProperty.isStandardName.hasOwnProperty(name)&&DOMProperty.isStandardName[name]){var mutationMethod=DOMProperty.getMutationMethod[name];if(mutationMethod){mutationMethod(node,value);}else if(shouldIgnoreValue(name,value)){this.deleteValueForProperty(node,name);}else if(DOMProperty.mustUseAttribute[name]){node.setAttribute(DOMProperty.getAttributeName[name],''+value);}else {var propName=DOMProperty.getPropertyName[name];if(!DOMProperty.hasSideEffects[name]||node[propName]!==value){node[propName]=value;}}}else if(DOMProperty.isCustomAttribute(name)){if(value==null){node.removeAttribute(name);}else {node.setAttribute(name,''+value);}}else if("production"!==process.env.NODE_ENV){warnUnknownProperty(name);}}, /**
   * Deletes the value for a property on a node.
   *
   * @param {DOMElement} node
   * @param {string} name
   */deleteValueForProperty:function deleteValueForProperty(node,name){if(DOMProperty.isStandardName.hasOwnProperty(name)&&DOMProperty.isStandardName[name]){var mutationMethod=DOMProperty.getMutationMethod[name];if(mutationMethod){mutationMethod(node,undefined);}else if(DOMProperty.mustUseAttribute[name]){node.removeAttribute(DOMProperty.getAttributeName[name]);}else {var propName=DOMProperty.getPropertyName[name];var defaultValue=DOMProperty.getDefaultValueForProperty(node.nodeName,propName);if(!DOMProperty.hasSideEffects[name]||node[propName]!==defaultValue){node[propName]=defaultValue;}}}else if(DOMProperty.isCustomAttribute(name)){node.removeAttribute(name);}else if("production"!==process.env.NODE_ENV){warnUnknownProperty(name);}}};module.exports=DOMPropertyOperations;}).call(this,require("e/U+97"));},{"./DOMProperty":13,"./escapeTextForBrowser":107,"./memoizeStringOnly":132,"./warning":146,"e/U+97":3}],15:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule Danger
 * @typechecks static-only
 */ /*jslint evil: true, sub: true */"use strict";var ExecutionEnvironment=require("./ExecutionEnvironment");var createNodesFromMarkup=require("./createNodesFromMarkup");var emptyFunction=require("./emptyFunction");var getMarkupWrap=require("./getMarkupWrap");var invariant=require("./invariant");var OPEN_TAG_NAME_EXP=/^(<[^ \/>]+)/;var RESULT_INDEX_ATTR='data-danger-index'; /**
 * Extracts the `nodeName` from a string of markup.
 *
 * NOTE: Extracting the `nodeName` does not require a regular expression match
 * because we make assumptions about React-generated markup (i.e. there are no
 * spaces surrounding the opening tag and there is at least one attribute).
 *
 * @param {string} markup String of markup.
 * @return {string} Node name of the supplied markup.
 * @see http://jsperf.com/extract-nodename
 */function getNodeName(markup){return markup.substring(1,markup.indexOf(' '));}var Danger={ /**
   * Renders markup into an array of nodes. The markup is expected to render
   * into a list of root nodes. Also, the length of `resultList` and
   * `markupList` should be the same.
   *
   * @param {array<string>} markupList List of markup strings to render.
   * @return {array<DOMElement>} List of rendered nodes.
   * @internal
   */dangerouslyRenderMarkup:function dangerouslyRenderMarkup(markupList){"production"!==process.env.NODE_ENV?invariant(ExecutionEnvironment.canUseDOM,'dangerouslyRenderMarkup(...): Cannot render markup in a Worker '+'thread. This is likely a bug in the framework. Please report '+'immediately.'):invariant(ExecutionEnvironment.canUseDOM);var nodeName;var markupByNodeName={}; // Group markup by `nodeName` if a wrap is necessary, else by '*'.
for(var i=0;i<markupList.length;i++){"production"!==process.env.NODE_ENV?invariant(markupList[i],'dangerouslyRenderMarkup(...): Missing markup.'):invariant(markupList[i]);nodeName=getNodeName(markupList[i]);nodeName=getMarkupWrap(nodeName)?nodeName:'*';markupByNodeName[nodeName]=markupByNodeName[nodeName]||[];markupByNodeName[nodeName][i]=markupList[i];}var resultList=[];var resultListAssignmentCount=0;for(nodeName in markupByNodeName){if(!markupByNodeName.hasOwnProperty(nodeName)){continue;}var markupListByNodeName=markupByNodeName[nodeName]; // This for-in loop skips the holes of the sparse array. The order of
// iteration should follow the order of assignment, which happens to match
// numerical index order, but we don't rely on that.
for(var resultIndex in markupListByNodeName){if(markupListByNodeName.hasOwnProperty(resultIndex)){var markup=markupListByNodeName[resultIndex]; // Push the requested markup with an additional RESULT_INDEX_ATTR
// attribute.  If the markup does not start with a < character, it
// will be discarded below (with an appropriate console.error).
markupListByNodeName[resultIndex]=markup.replace(OPEN_TAG_NAME_EXP, // This index will be parsed back out below.
'$1 '+RESULT_INDEX_ATTR+'="'+resultIndex+'" ');}} // Render each group of markup with similar wrapping `nodeName`.
var renderNodes=createNodesFromMarkup(markupListByNodeName.join(''),emptyFunction // Do nothing special with <script> tags.
);for(i=0;i<renderNodes.length;++i){var renderNode=renderNodes[i];if(renderNode.hasAttribute&&renderNode.hasAttribute(RESULT_INDEX_ATTR)){resultIndex=+renderNode.getAttribute(RESULT_INDEX_ATTR);renderNode.removeAttribute(RESULT_INDEX_ATTR);"production"!==process.env.NODE_ENV?invariant(!resultList.hasOwnProperty(resultIndex),'Danger: Assigning to an already-occupied result index.'):invariant(!resultList.hasOwnProperty(resultIndex));resultList[resultIndex]=renderNode; // This should match resultList.length and markupList.length when
// we're done.
resultListAssignmentCount+=1;}else if("production"!==process.env.NODE_ENV){console.error("Danger: Discarding unexpected node:",renderNode);}}} // Although resultList was populated out of order, it should now be a dense
// array.
"production"!==process.env.NODE_ENV?invariant(resultListAssignmentCount===resultList.length,'Danger: Did not assign to every index of resultList.'):invariant(resultListAssignmentCount===resultList.length);"production"!==process.env.NODE_ENV?invariant(resultList.length===markupList.length,'Danger: Expected markup to render %s nodes, but rendered %s.',markupList.length,resultList.length):invariant(resultList.length===markupList.length);return resultList;}, /**
   * Replaces a node with a string of markup at its current position within its
   * parent. The markup must render into a single root node.
   *
   * @param {DOMElement} oldChild Child node to replace.
   * @param {string} markup Markup to render in place of the child node.
   * @internal
   */dangerouslyReplaceNodeWithMarkup:function dangerouslyReplaceNodeWithMarkup(oldChild,markup){"production"!==process.env.NODE_ENV?invariant(ExecutionEnvironment.canUseDOM,'dangerouslyReplaceNodeWithMarkup(...): Cannot render markup in a '+'worker thread. This is likely a bug in the framework. Please report '+'immediately.'):invariant(ExecutionEnvironment.canUseDOM);"production"!==process.env.NODE_ENV?invariant(markup,'dangerouslyReplaceNodeWithMarkup(...): Missing markup.'):invariant(markup);"production"!==process.env.NODE_ENV?invariant(oldChild.tagName.toLowerCase()!=='html','dangerouslyReplaceNodeWithMarkup(...): Cannot replace markup of the '+'<html> node. This is because browser quirks make this unreliable '+'and/or slow. If you want to render to the root you must use '+'server rendering. See renderComponentToString().'):invariant(oldChild.tagName.toLowerCase()!=='html');var newChild=createNodesFromMarkup(markup,emptyFunction)[0];oldChild.parentNode.replaceChild(newChild,oldChild);}};module.exports=Danger;}).call(this,require("e/U+97"));},{"./ExecutionEnvironment":24,"./createNodesFromMarkup":103,"./emptyFunction":105,"./getMarkupWrap":115,"./invariant":123,"e/U+97":3}],16:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule DefaultEventPluginOrder
 */"use strict";var keyOf=require("./keyOf"); /**
 * Module that is injectable into `EventPluginHub`, that specifies a
 * deterministic ordering of `EventPlugin`s. A convenient way to reason about
 * plugins, without having to package every one of them. This is better than
 * having plugins be ordered in the same order that they are injected because
 * that ordering would be influenced by the packaging order.
 * `ResponderEventPlugin` must occur before `SimpleEventPlugin` so that
 * preventing default on events is convenient in `SimpleEventPlugin` handlers.
 */var DefaultEventPluginOrder=[keyOf({ResponderEventPlugin:null}),keyOf({SimpleEventPlugin:null}),keyOf({TapEventPlugin:null}),keyOf({EnterLeaveEventPlugin:null}),keyOf({ChangeEventPlugin:null}),keyOf({SelectEventPlugin:null}),keyOf({CompositionEventPlugin:null}),keyOf({BeforeInputEventPlugin:null}),keyOf({AnalyticsEventPlugin:null}),keyOf({MobileSafariClickEventPlugin:null})];module.exports=DefaultEventPluginOrder;},{"./keyOf":130}],17:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule EnterLeaveEventPlugin
 * @typechecks static-only
 */"use strict";var EventConstants=require("./EventConstants");var EventPropagators=require("./EventPropagators");var SyntheticMouseEvent=require("./SyntheticMouseEvent");var ReactMount=require("./ReactMount");var keyOf=require("./keyOf");var topLevelTypes=EventConstants.topLevelTypes;var getFirstReactDOM=ReactMount.getFirstReactDOM;var eventTypes={mouseEnter:{registrationName:keyOf({onMouseEnter:null}),dependencies:[topLevelTypes.topMouseOut,topLevelTypes.topMouseOver]},mouseLeave:{registrationName:keyOf({onMouseLeave:null}),dependencies:[topLevelTypes.topMouseOut,topLevelTypes.topMouseOver]}};var extractedEvents=[null,null];var EnterLeaveEventPlugin={eventTypes:eventTypes, /**
   * For almost every interaction we care about, there will be both a top-level
   * `mouseover` and `mouseout` event that occurs. Only use `mouseout` so that
   * we do not extract duplicate events. However, moving the mouse into the
   * browser from outside will not fire a `mouseout` event. In this case, we use
   * the `mouseover` top-level event.
   *
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {*} An accumulation of synthetic events.
   * @see {EventPluginHub.extractEvents}
   */extractEvents:function extractEvents(topLevelType,topLevelTarget,topLevelTargetID,nativeEvent){if(topLevelType===topLevelTypes.topMouseOver&&(nativeEvent.relatedTarget||nativeEvent.fromElement)){return null;}if(topLevelType!==topLevelTypes.topMouseOut&&topLevelType!==topLevelTypes.topMouseOver){ // Must not be a mouse in or mouse out - ignoring.
return null;}var win;if(topLevelTarget.window===topLevelTarget){ // `topLevelTarget` is probably a window object.
win=topLevelTarget;}else { // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
var doc=topLevelTarget.ownerDocument;if(doc){win=doc.defaultView||doc.parentWindow;}else {win=window;}}var from,to;if(topLevelType===topLevelTypes.topMouseOut){from=topLevelTarget;to=getFirstReactDOM(nativeEvent.relatedTarget||nativeEvent.toElement)||win;}else {from=win;to=topLevelTarget;}if(from===to){ // Nothing pertains to our managed components.
return null;}var fromID=from?ReactMount.getID(from):'';var toID=to?ReactMount.getID(to):'';var leave=SyntheticMouseEvent.getPooled(eventTypes.mouseLeave,fromID,nativeEvent);leave.type='mouseleave';leave.target=from;leave.relatedTarget=to;var enter=SyntheticMouseEvent.getPooled(eventTypes.mouseEnter,toID,nativeEvent);enter.type='mouseenter';enter.target=to;enter.relatedTarget=from;EventPropagators.accumulateEnterLeaveDispatches(leave,enter,fromID,toID);extractedEvents[0]=leave;extractedEvents[1]=enter;return extractedEvents;}};module.exports=EnterLeaveEventPlugin;},{"./EventConstants":18,"./EventPropagators":23,"./ReactMount":64,"./SyntheticMouseEvent":91,"./keyOf":130}],18:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule EventConstants
 */"use strict";var keyMirror=require("./keyMirror");var PropagationPhases=keyMirror({bubbled:null,captured:null}); /**
 * Types of raw signals from the browser caught at the top level.
 */var topLevelTypes=keyMirror({topBlur:null,topChange:null,topClick:null,topCompositionEnd:null,topCompositionStart:null,topCompositionUpdate:null,topContextMenu:null,topCopy:null,topCut:null,topDoubleClick:null,topDrag:null,topDragEnd:null,topDragEnter:null,topDragExit:null,topDragLeave:null,topDragOver:null,topDragStart:null,topDrop:null,topError:null,topFocus:null,topInput:null,topKeyDown:null,topKeyPress:null,topKeyUp:null,topLoad:null,topMouseDown:null,topMouseMove:null,topMouseOut:null,topMouseOver:null,topMouseUp:null,topPaste:null,topReset:null,topScroll:null,topSelectionChange:null,topSubmit:null,topTextInput:null,topTouchCancel:null,topTouchEnd:null,topTouchMove:null,topTouchStart:null,topWheel:null});var EventConstants={topLevelTypes:topLevelTypes,PropagationPhases:PropagationPhases};module.exports=EventConstants;},{"./keyMirror":129}],19:[function(require,module,exports){(function(process){ /**
 * @providesModule EventListener
 * @typechecks
 */var emptyFunction=require("./emptyFunction"); /**
 * Upstream version of event listener. Does not take into account specific
 * nature of platform.
 */var EventListener={ /**
   * Listen to DOM events during the bubble phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */listen:function listen(target,eventType,callback){if(target.addEventListener){target.addEventListener(eventType,callback,false);return {remove:function remove(){target.removeEventListener(eventType,callback,false);}};}else if(target.attachEvent){target.attachEvent('on'+eventType,callback);return {remove:function remove(){target.detachEvent('on'+eventType,callback);}};}}, /**
   * Listen to DOM events during the capture phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */capture:function capture(target,eventType,callback){if(!target.addEventListener){if("production"!==process.env.NODE_ENV){console.error('Attempted to listen to events during the capture phase on a '+'browser that does not support the capture phase. Your application '+'will not receive some events.');}return {remove:emptyFunction};}else {target.addEventListener(eventType,callback,true);return {remove:function remove(){target.removeEventListener(eventType,callback,true);}};}},registerDefault:function registerDefault(){}};module.exports=EventListener;}).call(this,require("e/U+97"));},{"./emptyFunction":105,"e/U+97":3}],20:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule EventPluginHub
 */"use strict";var EventPluginRegistry=require("./EventPluginRegistry");var EventPluginUtils=require("./EventPluginUtils");var accumulate=require("./accumulate");var forEachAccumulated=require("./forEachAccumulated");var invariant=require("./invariant");var isEventSupported=require("./isEventSupported");var monitorCodeUse=require("./monitorCodeUse"); /**
 * Internal store for event listeners
 */var listenerBank={}; /**
 * Internal queue of events that have accumulated their dispatches and are
 * waiting to have their dispatches executed.
 */var eventQueue=null; /**
 * Dispatches an event and releases it back into the pool, unless persistent.
 *
 * @param {?object} event Synthetic event to be dispatched.
 * @private
 */var executeDispatchesAndRelease=function executeDispatchesAndRelease(event){if(event){var executeDispatch=EventPluginUtils.executeDispatch; // Plugins can provide custom behavior when dispatching events.
var PluginModule=EventPluginRegistry.getPluginModuleForEvent(event);if(PluginModule&&PluginModule.executeDispatch){executeDispatch=PluginModule.executeDispatch;}EventPluginUtils.executeDispatchesInOrder(event,executeDispatch);if(!event.isPersistent()){event.constructor.release(event);}}}; /**
 * - `InstanceHandle`: [required] Module that performs logical traversals of DOM
 *   hierarchy given ids of the logical DOM elements involved.
 */var InstanceHandle=null;function validateInstanceHandle(){var invalid=!InstanceHandle||!InstanceHandle.traverseTwoPhase||!InstanceHandle.traverseEnterLeave;if(invalid){throw new Error('InstanceHandle not injected before use!');}} /**
 * This is a unified interface for event plugins to be installed and configured.
 *
 * Event plugins can implement the following properties:
 *
 *   `extractEvents` {function(string, DOMEventTarget, string, object): *}
 *     Required. When a top-level event is fired, this method is expected to
 *     extract synthetic events that will in turn be queued and dispatched.
 *
 *   `eventTypes` {object}
 *     Optional, plugins that fire events must publish a mapping of registration
 *     names that are used to register listeners. Values of this mapping must
 *     be objects that contain `registrationName` or `phasedRegistrationNames`.
 *
 *   `executeDispatch` {function(object, function, string)}
 *     Optional, allows plugins to override how an event gets dispatched. By
 *     default, the listener is simply invoked.
 *
 * Each plugin that is injected into `EventsPluginHub` is immediately operable.
 *
 * @public
 */var EventPluginHub={ /**
   * Methods for injecting dependencies.
   */injection:{ /**
     * @param {object} InjectedMount
     * @public
     */injectMount:EventPluginUtils.injection.injectMount, /**
     * @param {object} InjectedInstanceHandle
     * @public
     */injectInstanceHandle:function injectInstanceHandle(InjectedInstanceHandle){InstanceHandle=InjectedInstanceHandle;if("production"!==process.env.NODE_ENV){validateInstanceHandle();}},getInstanceHandle:function getInstanceHandle(){if("production"!==process.env.NODE_ENV){validateInstanceHandle();}return InstanceHandle;}, /**
     * @param {array} InjectedEventPluginOrder
     * @public
     */injectEventPluginOrder:EventPluginRegistry.injectEventPluginOrder, /**
     * @param {object} injectedNamesToPlugins Map from names to plugin modules.
     */injectEventPluginsByName:EventPluginRegistry.injectEventPluginsByName},eventNameDispatchConfigs:EventPluginRegistry.eventNameDispatchConfigs,registrationNameModules:EventPluginRegistry.registrationNameModules, /**
   * Stores `listener` at `listenerBank[registrationName][id]`. Is idempotent.
   *
   * @param {string} id ID of the DOM element.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   * @param {?function} listener The callback to store.
   */putListener:function putListener(id,registrationName,listener){"production"!==process.env.NODE_ENV?invariant(!listener||typeof listener==='function','Expected %s listener to be a function, instead got type %s',registrationName,typeof listener==="undefined"?"undefined":_typeof(listener)):invariant(!listener||typeof listener==='function');if("production"!==process.env.NODE_ENV){ // IE8 has no API for event capturing and the `onScroll` event doesn't
// bubble.
if(registrationName==='onScroll'&&!isEventSupported('scroll',true)){monitorCodeUse('react_no_scroll_event');console.warn('This browser doesn\'t support the `onScroll` event');}}var bankForRegistrationName=listenerBank[registrationName]||(listenerBank[registrationName]={});bankForRegistrationName[id]=listener;}, /**
   * @param {string} id ID of the DOM element.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   * @return {?function} The stored callback.
   */getListener:function getListener(id,registrationName){var bankForRegistrationName=listenerBank[registrationName];return bankForRegistrationName&&bankForRegistrationName[id];}, /**
   * Deletes a listener from the registration bank.
   *
   * @param {string} id ID of the DOM element.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   */deleteListener:function deleteListener(id,registrationName){var bankForRegistrationName=listenerBank[registrationName];if(bankForRegistrationName){delete bankForRegistrationName[id];}}, /**
   * Deletes all listeners for the DOM element with the supplied ID.
   *
   * @param {string} id ID of the DOM element.
   */deleteAllListeners:function deleteAllListeners(id){for(var registrationName in listenerBank){delete listenerBank[registrationName][id];}}, /**
   * Allows registered plugins an opportunity to extract events from top-level
   * native browser events.
   *
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {*} An accumulation of synthetic events.
   * @internal
   */extractEvents:function extractEvents(topLevelType,topLevelTarget,topLevelTargetID,nativeEvent){var events;var plugins=EventPluginRegistry.plugins;for(var i=0,l=plugins.length;i<l;i++){ // Not every plugin in the ordering may be loaded at runtime.
var possiblePlugin=plugins[i];if(possiblePlugin){var extractedEvents=possiblePlugin.extractEvents(topLevelType,topLevelTarget,topLevelTargetID,nativeEvent);if(extractedEvents){events=accumulate(events,extractedEvents);}}}return events;}, /**
   * Enqueues a synthetic event that should be dispatched when
   * `processEventQueue` is invoked.
   *
   * @param {*} events An accumulation of synthetic events.
   * @internal
   */enqueueEvents:function enqueueEvents(events){if(events){eventQueue=accumulate(eventQueue,events);}}, /**
   * Dispatches all synthetic events on the event queue.
   *
   * @internal
   */processEventQueue:function processEventQueue(){ // Set `eventQueue` to null before processing it so that we can tell if more
// events get enqueued while processing.
var processingEventQueue=eventQueue;eventQueue=null;forEachAccumulated(processingEventQueue,executeDispatchesAndRelease);"production"!==process.env.NODE_ENV?invariant(!eventQueue,'processEventQueue(): Additional events were enqueued while processing '+'an event queue. Support for this has not yet been implemented.'):invariant(!eventQueue);}, /**
   * These are needed for tests only. Do not use!
   */__purge:function __purge(){listenerBank={};},__getListenerBank:function __getListenerBank(){return listenerBank;}};module.exports=EventPluginHub;}).call(this,require("e/U+97"));},{"./EventPluginRegistry":21,"./EventPluginUtils":22,"./accumulate":97,"./forEachAccumulated":110,"./invariant":123,"./isEventSupported":124,"./monitorCodeUse":137,"e/U+97":3}],21:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule EventPluginRegistry
 * @typechecks static-only
 */"use strict";var invariant=require("./invariant"); /**
 * Injectable ordering of event plugins.
 */var EventPluginOrder=null; /**
 * Injectable mapping from names to event plugin modules.
 */var namesToPlugins={}; /**
 * Recomputes the plugin list using the injected plugins and plugin ordering.
 *
 * @private
 */function recomputePluginOrdering(){if(!EventPluginOrder){ // Wait until an `EventPluginOrder` is injected.
return;}for(var pluginName in namesToPlugins){var PluginModule=namesToPlugins[pluginName];var pluginIndex=EventPluginOrder.indexOf(pluginName);"production"!==process.env.NODE_ENV?invariant(pluginIndex>-1,'EventPluginRegistry: Cannot inject event plugins that do not exist in '+'the plugin ordering, `%s`.',pluginName):invariant(pluginIndex>-1);if(EventPluginRegistry.plugins[pluginIndex]){continue;}"production"!==process.env.NODE_ENV?invariant(PluginModule.extractEvents,'EventPluginRegistry: Event plugins must implement an `extractEvents` '+'method, but `%s` does not.',pluginName):invariant(PluginModule.extractEvents);EventPluginRegistry.plugins[pluginIndex]=PluginModule;var publishedEvents=PluginModule.eventTypes;for(var eventName in publishedEvents){"production"!==process.env.NODE_ENV?invariant(publishEventForPlugin(publishedEvents[eventName],PluginModule,eventName),'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.',eventName,pluginName):invariant(publishEventForPlugin(publishedEvents[eventName],PluginModule,eventName));}}} /**
 * Publishes an event so that it can be dispatched by the supplied plugin.
 *
 * @param {object} dispatchConfig Dispatch configuration for the event.
 * @param {object} PluginModule Plugin publishing the event.
 * @return {boolean} True if the event was successfully published.
 * @private
 */function publishEventForPlugin(dispatchConfig,PluginModule,eventName){"production"!==process.env.NODE_ENV?invariant(!EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName),'EventPluginHub: More than one plugin attempted to publish the same '+'event name, `%s`.',eventName):invariant(!EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName));EventPluginRegistry.eventNameDispatchConfigs[eventName]=dispatchConfig;var phasedRegistrationNames=dispatchConfig.phasedRegistrationNames;if(phasedRegistrationNames){for(var phaseName in phasedRegistrationNames){if(phasedRegistrationNames.hasOwnProperty(phaseName)){var phasedRegistrationName=phasedRegistrationNames[phaseName];publishRegistrationName(phasedRegistrationName,PluginModule,eventName);}}return true;}else if(dispatchConfig.registrationName){publishRegistrationName(dispatchConfig.registrationName,PluginModule,eventName);return true;}return false;} /**
 * Publishes a registration name that is used to identify dispatched events and
 * can be used with `EventPluginHub.putListener` to register listeners.
 *
 * @param {string} registrationName Registration name to add.
 * @param {object} PluginModule Plugin publishing the event.
 * @private
 */function publishRegistrationName(registrationName,PluginModule,eventName){"production"!==process.env.NODE_ENV?invariant(!EventPluginRegistry.registrationNameModules[registrationName],'EventPluginHub: More than one plugin attempted to publish the same '+'registration name, `%s`.',registrationName):invariant(!EventPluginRegistry.registrationNameModules[registrationName]);EventPluginRegistry.registrationNameModules[registrationName]=PluginModule;EventPluginRegistry.registrationNameDependencies[registrationName]=PluginModule.eventTypes[eventName].dependencies;} /**
 * Registers plugins so that they can extract and dispatch events.
 *
 * @see {EventPluginHub}
 */var EventPluginRegistry={ /**
   * Ordered list of injected plugins.
   */plugins:[], /**
   * Mapping from event name to dispatch config
   */eventNameDispatchConfigs:{}, /**
   * Mapping from registration name to plugin module
   */registrationNameModules:{}, /**
   * Mapping from registration name to event name
   */registrationNameDependencies:{}, /**
   * Injects an ordering of plugins (by plugin name). This allows the ordering
   * to be decoupled from injection of the actual plugins so that ordering is
   * always deterministic regardless of packaging, on-the-fly injection, etc.
   *
   * @param {array} InjectedEventPluginOrder
   * @internal
   * @see {EventPluginHub.injection.injectEventPluginOrder}
   */injectEventPluginOrder:function injectEventPluginOrder(InjectedEventPluginOrder){"production"!==process.env.NODE_ENV?invariant(!EventPluginOrder,'EventPluginRegistry: Cannot inject event plugin ordering more than '+'once. You are likely trying to load more than one copy of React.'):invariant(!EventPluginOrder); // Clone the ordering so it cannot be dynamically mutated.
EventPluginOrder=Array.prototype.slice.call(InjectedEventPluginOrder);recomputePluginOrdering();}, /**
   * Injects plugins to be used by `EventPluginHub`. The plugin names must be
   * in the ordering injected by `injectEventPluginOrder`.
   *
   * Plugins can be injected as part of page initialization or on-the-fly.
   *
   * @param {object} injectedNamesToPlugins Map from names to plugin modules.
   * @internal
   * @see {EventPluginHub.injection.injectEventPluginsByName}
   */injectEventPluginsByName:function injectEventPluginsByName(injectedNamesToPlugins){var isOrderingDirty=false;for(var pluginName in injectedNamesToPlugins){if(!injectedNamesToPlugins.hasOwnProperty(pluginName)){continue;}var PluginModule=injectedNamesToPlugins[pluginName];if(!namesToPlugins.hasOwnProperty(pluginName)||namesToPlugins[pluginName]!==PluginModule){"production"!==process.env.NODE_ENV?invariant(!namesToPlugins[pluginName],'EventPluginRegistry: Cannot inject two different event plugins '+'using the same name, `%s`.',pluginName):invariant(!namesToPlugins[pluginName]);namesToPlugins[pluginName]=PluginModule;isOrderingDirty=true;}}if(isOrderingDirty){recomputePluginOrdering();}}, /**
   * Looks up the plugin for the supplied event.
   *
   * @param {object} event A synthetic event.
   * @return {?object} The plugin that created the supplied event.
   * @internal
   */getPluginModuleForEvent:function getPluginModuleForEvent(event){var dispatchConfig=event.dispatchConfig;if(dispatchConfig.registrationName){return EventPluginRegistry.registrationNameModules[dispatchConfig.registrationName]||null;}for(var phase in dispatchConfig.phasedRegistrationNames){if(!dispatchConfig.phasedRegistrationNames.hasOwnProperty(phase)){continue;}var PluginModule=EventPluginRegistry.registrationNameModules[dispatchConfig.phasedRegistrationNames[phase]];if(PluginModule){return PluginModule;}}return null;}, /**
   * Exposed for unit testing.
   * @private
   */_resetEventPlugins:function _resetEventPlugins(){EventPluginOrder=null;for(var pluginName in namesToPlugins){if(namesToPlugins.hasOwnProperty(pluginName)){delete namesToPlugins[pluginName];}}EventPluginRegistry.plugins.length=0;var eventNameDispatchConfigs=EventPluginRegistry.eventNameDispatchConfigs;for(var eventName in eventNameDispatchConfigs){if(eventNameDispatchConfigs.hasOwnProperty(eventName)){delete eventNameDispatchConfigs[eventName];}}var registrationNameModules=EventPluginRegistry.registrationNameModules;for(var registrationName in registrationNameModules){if(registrationNameModules.hasOwnProperty(registrationName)){delete registrationNameModules[registrationName];}}}};module.exports=EventPluginRegistry;}).call(this,require("e/U+97"));},{"./invariant":123,"e/U+97":3}],22:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule EventPluginUtils
 */"use strict";var EventConstants=require("./EventConstants");var invariant=require("./invariant"); /**
 * Injected dependencies:
 */ /**
 * - `Mount`: [required] Module that can convert between React dom IDs and
 *   actual node references.
 */var injection={Mount:null,injectMount:function injectMount(InjectedMount){injection.Mount=InjectedMount;if("production"!==process.env.NODE_ENV){"production"!==process.env.NODE_ENV?invariant(InjectedMount&&InjectedMount.getNode,'EventPluginUtils.injection.injectMount(...): Injected Mount module '+'is missing getNode.'):invariant(InjectedMount&&InjectedMount.getNode);}}};var topLevelTypes=EventConstants.topLevelTypes;function isEndish(topLevelType){return topLevelType===topLevelTypes.topMouseUp||topLevelType===topLevelTypes.topTouchEnd||topLevelType===topLevelTypes.topTouchCancel;}function isMoveish(topLevelType){return topLevelType===topLevelTypes.topMouseMove||topLevelType===topLevelTypes.topTouchMove;}function isStartish(topLevelType){return topLevelType===topLevelTypes.topMouseDown||topLevelType===topLevelTypes.topTouchStart;}var validateEventDispatches;if("production"!==process.env.NODE_ENV){validateEventDispatches=function validateEventDispatches(event){var dispatchListeners=event._dispatchListeners;var dispatchIDs=event._dispatchIDs;var listenersIsArr=Array.isArray(dispatchListeners);var idsIsArr=Array.isArray(dispatchIDs);var IDsLen=idsIsArr?dispatchIDs.length:dispatchIDs?1:0;var listenersLen=listenersIsArr?dispatchListeners.length:dispatchListeners?1:0;"production"!==process.env.NODE_ENV?invariant(idsIsArr===listenersIsArr&&IDsLen===listenersLen,'EventPluginUtils: Invalid `event`.'):invariant(idsIsArr===listenersIsArr&&IDsLen===listenersLen);};} /**
 * Invokes `cb(event, listener, id)`. Avoids using call if no scope is
 * provided. The `(listener,id)` pair effectively forms the "dispatch" but are
 * kept separate to conserve memory.
 */function forEachEventDispatch(event,cb){var dispatchListeners=event._dispatchListeners;var dispatchIDs=event._dispatchIDs;if("production"!==process.env.NODE_ENV){validateEventDispatches(event);}if(Array.isArray(dispatchListeners)){for(var i=0;i<dispatchListeners.length;i++){if(event.isPropagationStopped()){break;} // Listeners and IDs are two parallel arrays that are always in sync.
cb(event,dispatchListeners[i],dispatchIDs[i]);}}else if(dispatchListeners){cb(event,dispatchListeners,dispatchIDs);}} /**
 * Default implementation of PluginModule.executeDispatch().
 * @param {SyntheticEvent} SyntheticEvent to handle
 * @param {function} Application-level callback
 * @param {string} domID DOM id to pass to the callback.
 */function executeDispatch(event,listener,domID){event.currentTarget=injection.Mount.getNode(domID);var returnValue=listener(event,domID);event.currentTarget=null;return returnValue;} /**
 * Standard/simple iteration through an event's collected dispatches.
 */function executeDispatchesInOrder(event,executeDispatch){forEachEventDispatch(event,executeDispatch);event._dispatchListeners=null;event._dispatchIDs=null;} /**
 * Standard/simple iteration through an event's collected dispatches, but stops
 * at the first dispatch execution returning true, and returns that id.
 *
 * @return id of the first dispatch execution who's listener returns true, or
 * null if no listener returned true.
 */function executeDispatchesInOrderStopAtTrueImpl(event){var dispatchListeners=event._dispatchListeners;var dispatchIDs=event._dispatchIDs;if("production"!==process.env.NODE_ENV){validateEventDispatches(event);}if(Array.isArray(dispatchListeners)){for(var i=0;i<dispatchListeners.length;i++){if(event.isPropagationStopped()){break;} // Listeners and IDs are two parallel arrays that are always in sync.
if(dispatchListeners[i](event,dispatchIDs[i])){return dispatchIDs[i];}}}else if(dispatchListeners){if(dispatchListeners(event,dispatchIDs)){return dispatchIDs;}}return null;} /**
 * @see executeDispatchesInOrderStopAtTrueImpl
 */function executeDispatchesInOrderStopAtTrue(event){var ret=executeDispatchesInOrderStopAtTrueImpl(event);event._dispatchIDs=null;event._dispatchListeners=null;return ret;} /**
 * Execution of a "direct" dispatch - there must be at most one dispatch
 * accumulated on the event or it is considered an error. It doesn't really make
 * sense for an event with multiple dispatches (bubbled) to keep track of the
 * return values at each dispatch execution, but it does tend to make sense when
 * dealing with "direct" dispatches.
 *
 * @return The return value of executing the single dispatch.
 */function executeDirectDispatch(event){if("production"!==process.env.NODE_ENV){validateEventDispatches(event);}var dispatchListener=event._dispatchListeners;var dispatchID=event._dispatchIDs;"production"!==process.env.NODE_ENV?invariant(!Array.isArray(dispatchListener),'executeDirectDispatch(...): Invalid `event`.'):invariant(!Array.isArray(dispatchListener));var res=dispatchListener?dispatchListener(event,dispatchID):null;event._dispatchListeners=null;event._dispatchIDs=null;return res;} /**
 * @param {SyntheticEvent} event
 * @return {bool} True iff number of dispatches accumulated is greater than 0.
 */function hasDispatches(event){return !!event._dispatchListeners;} /**
 * General utilities that are useful in creating custom Event Plugins.
 */var EventPluginUtils={isEndish:isEndish,isMoveish:isMoveish,isStartish:isStartish,executeDirectDispatch:executeDirectDispatch,executeDispatch:executeDispatch,executeDispatchesInOrder:executeDispatchesInOrder,executeDispatchesInOrderStopAtTrue:executeDispatchesInOrderStopAtTrue,hasDispatches:hasDispatches,injection:injection,useTouchEvents:false};module.exports=EventPluginUtils;}).call(this,require("e/U+97"));},{"./EventConstants":18,"./invariant":123,"e/U+97":3}],23:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule EventPropagators
 */"use strict";var EventConstants=require("./EventConstants");var EventPluginHub=require("./EventPluginHub");var accumulate=require("./accumulate");var forEachAccumulated=require("./forEachAccumulated");var PropagationPhases=EventConstants.PropagationPhases;var getListener=EventPluginHub.getListener; /**
 * Some event types have a notion of different registration names for different
 * "phases" of propagation. This finds listeners by a given phase.
 */function listenerAtPhase(id,event,propagationPhase){var registrationName=event.dispatchConfig.phasedRegistrationNames[propagationPhase];return getListener(id,registrationName);} /**
 * Tags a `SyntheticEvent` with dispatched listeners. Creating this function
 * here, allows us to not have to bind or create functions for each event.
 * Mutating the event's members allows us to not have to create a wrapping
 * "dispatch" object that pairs the event with the listener.
 */function accumulateDirectionalDispatches(domID,upwards,event){if("production"!==process.env.NODE_ENV){if(!domID){throw new Error('Dispatching id must not be null');}}var phase=upwards?PropagationPhases.bubbled:PropagationPhases.captured;var listener=listenerAtPhase(domID,event,phase);if(listener){event._dispatchListeners=accumulate(event._dispatchListeners,listener);event._dispatchIDs=accumulate(event._dispatchIDs,domID);}} /**
 * Collect dispatches (must be entirely collected before dispatching - see unit
 * tests). Lazily allocate the array to conserve memory.  We must loop through
 * each event and perform the traversal for each one. We can not perform a
 * single traversal for the entire collection of events because each event may
 * have a different target.
 */function accumulateTwoPhaseDispatchesSingle(event){if(event&&event.dispatchConfig.phasedRegistrationNames){EventPluginHub.injection.getInstanceHandle().traverseTwoPhase(event.dispatchMarker,accumulateDirectionalDispatches,event);}} /**
 * Accumulates without regard to direction, does not look for phased
 * registration names. Same as `accumulateDirectDispatchesSingle` but without
 * requiring that the `dispatchMarker` be the same as the dispatched ID.
 */function accumulateDispatches(id,ignoredDirection,event){if(event&&event.dispatchConfig.registrationName){var registrationName=event.dispatchConfig.registrationName;var listener=getListener(id,registrationName);if(listener){event._dispatchListeners=accumulate(event._dispatchListeners,listener);event._dispatchIDs=accumulate(event._dispatchIDs,id);}}} /**
 * Accumulates dispatches on an `SyntheticEvent`, but only for the
 * `dispatchMarker`.
 * @param {SyntheticEvent} event
 */function accumulateDirectDispatchesSingle(event){if(event&&event.dispatchConfig.registrationName){accumulateDispatches(event.dispatchMarker,null,event);}}function accumulateTwoPhaseDispatches(events){forEachAccumulated(events,accumulateTwoPhaseDispatchesSingle);}function accumulateEnterLeaveDispatches(leave,enter,fromID,toID){EventPluginHub.injection.getInstanceHandle().traverseEnterLeave(fromID,toID,accumulateDispatches,leave,enter);}function accumulateDirectDispatches(events){forEachAccumulated(events,accumulateDirectDispatchesSingle);} /**
 * A small set of propagation patterns, each of which will accept a small amount
 * of information, and generate a set of "dispatch ready event objects" - which
 * are sets of events that have already been annotated with a set of dispatched
 * listener functions/ids. The API is designed this way to discourage these
 * propagation strategies from actually executing the dispatches, since we
 * always want to collect the entire set of dispatches before executing event a
 * single one.
 *
 * @constructor EventPropagators
 */var EventPropagators={accumulateTwoPhaseDispatches:accumulateTwoPhaseDispatches,accumulateDirectDispatches:accumulateDirectDispatches,accumulateEnterLeaveDispatches:accumulateEnterLeaveDispatches};module.exports=EventPropagators;}).call(this,require("e/U+97"));},{"./EventConstants":18,"./EventPluginHub":20,"./accumulate":97,"./forEachAccumulated":110,"e/U+97":3}],24:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ExecutionEnvironment
 */ /*jslint evil: true */"use strict";var canUseDOM=!!(typeof window!=='undefined'&&window.document&&window.document.createElement); /**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */var ExecutionEnvironment={canUseDOM:canUseDOM,canUseWorkers:typeof Worker!=='undefined',canUseEventListeners:canUseDOM&&!!(window.addEventListener||window.attachEvent),canUseViewport:canUseDOM&&!!window.screen,isInWorker:!canUseDOM // For now, this is true - might change in the future.
};module.exports=ExecutionEnvironment;},{}],25:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule HTMLDOMPropertyConfig
 */ /*jslint bitwise: true*/"use strict";var DOMProperty=require("./DOMProperty");var ExecutionEnvironment=require("./ExecutionEnvironment");var MUST_USE_ATTRIBUTE=DOMProperty.injection.MUST_USE_ATTRIBUTE;var MUST_USE_PROPERTY=DOMProperty.injection.MUST_USE_PROPERTY;var HAS_BOOLEAN_VALUE=DOMProperty.injection.HAS_BOOLEAN_VALUE;var HAS_SIDE_EFFECTS=DOMProperty.injection.HAS_SIDE_EFFECTS;var HAS_NUMERIC_VALUE=DOMProperty.injection.HAS_NUMERIC_VALUE;var HAS_POSITIVE_NUMERIC_VALUE=DOMProperty.injection.HAS_POSITIVE_NUMERIC_VALUE;var HAS_OVERLOADED_BOOLEAN_VALUE=DOMProperty.injection.HAS_OVERLOADED_BOOLEAN_VALUE;var hasSVG;if(ExecutionEnvironment.canUseDOM){var implementation=document.implementation;hasSVG=implementation&&implementation.hasFeature&&implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure','1.1');}var HTMLDOMPropertyConfig={isCustomAttribute:RegExp.prototype.test.bind(/^(data|aria)-[a-z_][a-z\d_.\-]*$/),Properties:{ /**
     * Standard Properties
     */accept:null,accessKey:null,action:null,allowFullScreen:MUST_USE_ATTRIBUTE|HAS_BOOLEAN_VALUE,allowTransparency:MUST_USE_ATTRIBUTE,alt:null,async:HAS_BOOLEAN_VALUE,autoComplete:null, // autoFocus is polyfilled/normalized by AutoFocusMixin
// autoFocus: HAS_BOOLEAN_VALUE,
autoPlay:HAS_BOOLEAN_VALUE,cellPadding:null,cellSpacing:null,charSet:MUST_USE_ATTRIBUTE,checked:MUST_USE_PROPERTY|HAS_BOOLEAN_VALUE, // To set className on SVG elements, it's necessary to use .setAttribute;
// this works on HTML elements too in all browsers except IE8. Conveniently,
// IE8 doesn't support SVG and so we can simply use the attribute in
// browsers that support SVG and the property in browsers that don't,
// regardless of whether the element is HTML or SVG.
className:hasSVG?MUST_USE_ATTRIBUTE:MUST_USE_PROPERTY,cols:MUST_USE_ATTRIBUTE|HAS_POSITIVE_NUMERIC_VALUE,colSpan:null,content:null,contentEditable:null,contextMenu:MUST_USE_ATTRIBUTE,controls:MUST_USE_PROPERTY|HAS_BOOLEAN_VALUE,coords:null,crossOrigin:null,data:null, // For `<object />` acts as `src`.
dateTime:MUST_USE_ATTRIBUTE,defer:HAS_BOOLEAN_VALUE,dir:null,disabled:MUST_USE_ATTRIBUTE|HAS_BOOLEAN_VALUE,download:HAS_OVERLOADED_BOOLEAN_VALUE,draggable:null,encType:null,form:MUST_USE_ATTRIBUTE,formNoValidate:HAS_BOOLEAN_VALUE,frameBorder:MUST_USE_ATTRIBUTE,height:MUST_USE_ATTRIBUTE,hidden:MUST_USE_ATTRIBUTE|HAS_BOOLEAN_VALUE,href:null,hrefLang:null,htmlFor:null,httpEquiv:null,icon:null,id:MUST_USE_PROPERTY,label:null,lang:null,list:null,loop:MUST_USE_PROPERTY|HAS_BOOLEAN_VALUE,max:null,maxLength:MUST_USE_ATTRIBUTE,media:MUST_USE_ATTRIBUTE,mediaGroup:null,method:null,min:null,multiple:MUST_USE_PROPERTY|HAS_BOOLEAN_VALUE,muted:MUST_USE_PROPERTY|HAS_BOOLEAN_VALUE,name:null,noValidate:HAS_BOOLEAN_VALUE,open:null,pattern:null,placeholder:null,poster:null,preload:null,radioGroup:null,readOnly:MUST_USE_PROPERTY|HAS_BOOLEAN_VALUE,rel:null,required:HAS_BOOLEAN_VALUE,role:MUST_USE_ATTRIBUTE,rows:MUST_USE_ATTRIBUTE|HAS_POSITIVE_NUMERIC_VALUE,rowSpan:null,sandbox:null,scope:null,scrollLeft:MUST_USE_PROPERTY,scrolling:null,scrollTop:MUST_USE_PROPERTY,seamless:MUST_USE_ATTRIBUTE|HAS_BOOLEAN_VALUE,selected:MUST_USE_PROPERTY|HAS_BOOLEAN_VALUE,shape:null,size:MUST_USE_ATTRIBUTE|HAS_POSITIVE_NUMERIC_VALUE,sizes:MUST_USE_ATTRIBUTE,span:HAS_POSITIVE_NUMERIC_VALUE,spellCheck:null,src:null,srcDoc:MUST_USE_PROPERTY,srcSet:MUST_USE_ATTRIBUTE,start:HAS_NUMERIC_VALUE,step:null,style:null,tabIndex:null,target:null,title:null,type:null,useMap:null,value:MUST_USE_PROPERTY|HAS_SIDE_EFFECTS,width:MUST_USE_ATTRIBUTE,wmode:MUST_USE_ATTRIBUTE, /**
     * Non-standard Properties
     */autoCapitalize:null, // Supported in Mobile Safari for keyboard hints
autoCorrect:null, // Supported in Mobile Safari for keyboard hints
itemProp:MUST_USE_ATTRIBUTE, // Microdata: http://schema.org/docs/gs.html
itemScope:MUST_USE_ATTRIBUTE|HAS_BOOLEAN_VALUE, // Microdata: http://schema.org/docs/gs.html
itemType:MUST_USE_ATTRIBUTE, // Microdata: http://schema.org/docs/gs.html
property:null // Supports OG in meta tags
},DOMAttributeNames:{className:'class',htmlFor:'for',httpEquiv:'http-equiv'},DOMPropertyNames:{autoCapitalize:'autocapitalize',autoComplete:'autocomplete',autoCorrect:'autocorrect',autoFocus:'autofocus',autoPlay:'autoplay',encType:'enctype',hrefLang:'hreflang',radioGroup:'radiogroup',spellCheck:'spellcheck',srcDoc:'srcdoc',srcSet:'srcset'}};module.exports=HTMLDOMPropertyConfig;},{"./DOMProperty":13,"./ExecutionEnvironment":24}],26:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule LinkedValueUtils
 * @typechecks static-only
 */"use strict";var ReactPropTypes=require("./ReactPropTypes");var invariant=require("./invariant");var hasReadOnlyValue={'button':true,'checkbox':true,'image':true,'hidden':true,'radio':true,'reset':true,'submit':true};function _assertSingleLink(input){"production"!==process.env.NODE_ENV?invariant(input.props.checkedLink==null||input.props.valueLink==null,'Cannot provide a checkedLink and a valueLink. If you want to use '+'checkedLink, you probably don\'t want to use valueLink and vice versa.'):invariant(input.props.checkedLink==null||input.props.valueLink==null);}function _assertValueLink(input){_assertSingleLink(input);"production"!==process.env.NODE_ENV?invariant(input.props.value==null&&input.props.onChange==null,'Cannot provide a valueLink and a value or onChange event. If you want '+'to use value or onChange, you probably don\'t want to use valueLink.'):invariant(input.props.value==null&&input.props.onChange==null);}function _assertCheckedLink(input){_assertSingleLink(input);"production"!==process.env.NODE_ENV?invariant(input.props.checked==null&&input.props.onChange==null,'Cannot provide a checkedLink and a checked property or onChange event. '+'If you want to use checked or onChange, you probably don\'t want to '+'use checkedLink'):invariant(input.props.checked==null&&input.props.onChange==null);} /**
 * @param {SyntheticEvent} e change event to handle
 */function _handleLinkedValueChange(e){ /*jshint validthis:true */this.props.valueLink.requestChange(e.target.value);} /**
  * @param {SyntheticEvent} e change event to handle
  */function _handleLinkedCheckChange(e){ /*jshint validthis:true */this.props.checkedLink.requestChange(e.target.checked);} /**
 * Provide a linked `value` attribute for controlled forms. You should not use
 * this outside of the ReactDOM controlled form components.
 */var LinkedValueUtils={Mixin:{propTypes:{value:function value(props,propName,componentName){if(!props[propName]||hasReadOnlyValue[props.type]||props.onChange||props.readOnly||props.disabled){return;}return new Error('You provided a `value` prop to a form field without an '+'`onChange` handler. This will render a read-only field. If '+'the field should be mutable use `defaultValue`. Otherwise, '+'set either `onChange` or `readOnly`.');},checked:function checked(props,propName,componentName){if(!props[propName]||props.onChange||props.readOnly||props.disabled){return;}return new Error('You provided a `checked` prop to a form field without an '+'`onChange` handler. This will render a read-only field. If '+'the field should be mutable use `defaultChecked`. Otherwise, '+'set either `onChange` or `readOnly`.');},onChange:ReactPropTypes.func}}, /**
   * @param {ReactComponent} input Form component
   * @return {*} current value of the input either from value prop or link.
   */getValue:function getValue(input){if(input.props.valueLink){_assertValueLink(input);return input.props.valueLink.value;}return input.props.value;}, /**
   * @param {ReactComponent} input Form component
   * @return {*} current checked status of the input either from checked prop
   *             or link.
   */getChecked:function getChecked(input){if(input.props.checkedLink){_assertCheckedLink(input);return input.props.checkedLink.value;}return input.props.checked;}, /**
   * @param {ReactComponent} input Form component
   * @return {function} change callback either from onChange prop or link.
   */getOnChange:function getOnChange(input){if(input.props.valueLink){_assertValueLink(input);return _handleLinkedValueChange;}else if(input.props.checkedLink){_assertCheckedLink(input);return _handleLinkedCheckChange;}return input.props.onChange;}};module.exports=LinkedValueUtils;}).call(this,require("e/U+97"));},{"./ReactPropTypes":72,"./invariant":123,"e/U+97":3}],27:[function(require,module,exports){(function(process){ /**
 * Copyright 2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule LocalEventTrapMixin
 */"use strict";var ReactBrowserEventEmitter=require("./ReactBrowserEventEmitter");var accumulate=require("./accumulate");var forEachAccumulated=require("./forEachAccumulated");var invariant=require("./invariant");function remove(event){event.remove();}var LocalEventTrapMixin={trapBubbledEvent:function trapBubbledEvent(topLevelType,handlerBaseName){"production"!==process.env.NODE_ENV?invariant(this.isMounted(),'Must be mounted to trap events'):invariant(this.isMounted());var listener=ReactBrowserEventEmitter.trapBubbledEvent(topLevelType,handlerBaseName,this.getDOMNode());this._localEventListeners=accumulate(this._localEventListeners,listener);}, // trapCapturedEvent would look nearly identical. We don't implement that
// method because it isn't currently needed.
componentWillUnmount:function componentWillUnmount(){if(this._localEventListeners){forEachAccumulated(this._localEventListeners,remove);}}};module.exports=LocalEventTrapMixin;}).call(this,require("e/U+97"));},{"./ReactBrowserEventEmitter":32,"./accumulate":97,"./forEachAccumulated":110,"./invariant":123,"e/U+97":3}],28:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule MobileSafariClickEventPlugin
 * @typechecks static-only
 */"use strict";var EventConstants=require("./EventConstants");var emptyFunction=require("./emptyFunction");var topLevelTypes=EventConstants.topLevelTypes; /**
 * Mobile Safari does not fire properly bubble click events on non-interactive
 * elements, which means delegated click listeners do not fire. The workaround
 * for this bug involves attaching an empty click listener on the target node.
 *
 * This particular plugin works around the bug by attaching an empty click
 * listener on `touchstart` (which does fire on every element).
 */var MobileSafariClickEventPlugin={eventTypes:null, /**
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {*} An accumulation of synthetic events.
   * @see {EventPluginHub.extractEvents}
   */extractEvents:function extractEvents(topLevelType,topLevelTarget,topLevelTargetID,nativeEvent){if(topLevelType===topLevelTypes.topTouchStart){var target=nativeEvent.target;if(target&&!target.onclick){target.onclick=emptyFunction;}}}};module.exports=MobileSafariClickEventPlugin;},{"./EventConstants":18,"./emptyFunction":105}],29:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule PooledClass
 */"use strict";var invariant=require("./invariant"); /**
 * Static poolers. Several custom versions for each potential number of
 * arguments. A completely generic pooler is easy to implement, but would
 * require accessing the `arguments` object. In each of these, `this` refers to
 * the Class itself, not an instance. If any others are needed, simply add them
 * here, or in their own files.
 */var oneArgumentPooler=function oneArgumentPooler(copyFieldsFrom){var Klass=this;if(Klass.instancePool.length){var instance=Klass.instancePool.pop();Klass.call(instance,copyFieldsFrom);return instance;}else {return new Klass(copyFieldsFrom);}};var twoArgumentPooler=function twoArgumentPooler(a1,a2){var Klass=this;if(Klass.instancePool.length){var instance=Klass.instancePool.pop();Klass.call(instance,a1,a2);return instance;}else {return new Klass(a1,a2);}};var threeArgumentPooler=function threeArgumentPooler(a1,a2,a3){var Klass=this;if(Klass.instancePool.length){var instance=Klass.instancePool.pop();Klass.call(instance,a1,a2,a3);return instance;}else {return new Klass(a1,a2,a3);}};var fiveArgumentPooler=function fiveArgumentPooler(a1,a2,a3,a4,a5){var Klass=this;if(Klass.instancePool.length){var instance=Klass.instancePool.pop();Klass.call(instance,a1,a2,a3,a4,a5);return instance;}else {return new Klass(a1,a2,a3,a4,a5);}};var standardReleaser=function standardReleaser(instance){var Klass=this;"production"!==process.env.NODE_ENV?invariant(instance instanceof Klass,'Trying to release an instance into a pool of a different type.'):invariant(instance instanceof Klass);if(instance.destructor){instance.destructor();}if(Klass.instancePool.length<Klass.poolSize){Klass.instancePool.push(instance);}};var DEFAULT_POOL_SIZE=10;var DEFAULT_POOLER=oneArgumentPooler; /**
 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
 * itself (statically) not adding any prototypical fields. Any CopyConstructor
 * you give this may have a `poolSize` property, and will look for a
 * prototypical `destructor` on instances (optional).
 *
 * @param {Function} CopyConstructor Constructor that can be used to reset.
 * @param {Function} pooler Customizable pooler.
 */var addPoolingTo=function addPoolingTo(CopyConstructor,pooler){var NewKlass=CopyConstructor;NewKlass.instancePool=[];NewKlass.getPooled=pooler||DEFAULT_POOLER;if(!NewKlass.poolSize){NewKlass.poolSize=DEFAULT_POOL_SIZE;}NewKlass.release=standardReleaser;return NewKlass;};var PooledClass={addPoolingTo:addPoolingTo,oneArgumentPooler:oneArgumentPooler,twoArgumentPooler:twoArgumentPooler,threeArgumentPooler:threeArgumentPooler,fiveArgumentPooler:fiveArgumentPooler};module.exports=PooledClass;}).call(this,require("e/U+97"));},{"./invariant":123,"e/U+97":3}],30:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule React
 */"use strict";var DOMPropertyOperations=require("./DOMPropertyOperations");var EventPluginUtils=require("./EventPluginUtils");var ReactChildren=require("./ReactChildren");var ReactComponent=require("./ReactComponent");var ReactCompositeComponent=require("./ReactCompositeComponent");var ReactContext=require("./ReactContext");var ReactCurrentOwner=require("./ReactCurrentOwner");var ReactDescriptor=require("./ReactDescriptor");var ReactDOM=require("./ReactDOM");var ReactDOMComponent=require("./ReactDOMComponent");var ReactDefaultInjection=require("./ReactDefaultInjection");var ReactInstanceHandles=require("./ReactInstanceHandles");var ReactMount=require("./ReactMount");var ReactMultiChild=require("./ReactMultiChild");var ReactPerf=require("./ReactPerf");var ReactPropTypes=require("./ReactPropTypes");var ReactServerRendering=require("./ReactServerRendering");var ReactTextComponent=require("./ReactTextComponent");var onlyChild=require("./onlyChild");var warning=require("./warning");ReactDefaultInjection.inject(); // Specifying arguments isn't necessary since we just use apply anyway, but it
// makes it clear for those actually consuming this API.
function _createDescriptor(type,props,children){var args=Array.prototype.slice.call(arguments,1);return type.apply(null,args);}if("production"!==process.env.NODE_ENV){var _warnedForDeprecation=false;}var React={Children:{map:ReactChildren.map,forEach:ReactChildren.forEach,count:ReactChildren.count,only:onlyChild},DOM:ReactDOM,PropTypes:ReactPropTypes,initializeTouchEvents:function initializeTouchEvents(shouldUseTouch){EventPluginUtils.useTouchEvents=shouldUseTouch;},createClass:ReactCompositeComponent.createClass,createDescriptor:function createDescriptor(){if("production"!==process.env.NODE_ENV){"production"!==process.env.NODE_ENV?warning(_warnedForDeprecation,'React.createDescriptor is deprecated and will be removed in the '+'next version of React. Use React.createElement instead.'):null;_warnedForDeprecation=true;}return _createDescriptor.apply(this,arguments);},createElement:_createDescriptor,constructAndRenderComponent:ReactMount.constructAndRenderComponent,constructAndRenderComponentByID:ReactMount.constructAndRenderComponentByID,renderComponent:ReactPerf.measure('React','renderComponent',ReactMount.renderComponent),renderComponentToString:ReactServerRendering.renderComponentToString,renderComponentToStaticMarkup:ReactServerRendering.renderComponentToStaticMarkup,unmountComponentAtNode:ReactMount.unmountComponentAtNode,isValidClass:ReactDescriptor.isValidFactory,isValidComponent:ReactDescriptor.isValidDescriptor,withContext:ReactContext.withContext,__internals:{Component:ReactComponent,CurrentOwner:ReactCurrentOwner,DOMComponent:ReactDOMComponent,DOMPropertyOperations:DOMPropertyOperations,InstanceHandles:ReactInstanceHandles,Mount:ReactMount,MultiChild:ReactMultiChild,TextComponent:ReactTextComponent}};if("production"!==process.env.NODE_ENV){var ExecutionEnvironment=require("./ExecutionEnvironment");if(ExecutionEnvironment.canUseDOM&&window.top===window.self&&navigator.userAgent.indexOf('Chrome')>-1){console.debug('Download the React DevTools for a better development experience: '+'http://fb.me/react-devtools');var expectedFeatures=[ // shims
Array.isArray,Array.prototype.every,Array.prototype.forEach,Array.prototype.indexOf,Array.prototype.map,Date.now,Function.prototype.bind,Object.keys,String.prototype.split,String.prototype.trim, // shams
Object.create,Object.freeze];for(var i in expectedFeatures){if(!expectedFeatures[i]){console.error('One or more ES5 shim/shams expected by React are not available: '+'http://fb.me/react-warning-polyfills');break;}}}} // Version exists only in the open-source version of React, not in Facebook's
// internal version.
React.version='0.11.2';module.exports=React;}).call(this,require("e/U+97"));},{"./DOMPropertyOperations":14,"./EventPluginUtils":22,"./ExecutionEnvironment":24,"./ReactChildren":33,"./ReactComponent":34,"./ReactCompositeComponent":36,"./ReactContext":37,"./ReactCurrentOwner":38,"./ReactDOM":39,"./ReactDOMComponent":41,"./ReactDefaultInjection":51,"./ReactDescriptor":54,"./ReactInstanceHandles":62,"./ReactMount":64,"./ReactMultiChild":65,"./ReactPerf":68,"./ReactPropTypes":72,"./ReactServerRendering":76,"./ReactTextComponent":78,"./onlyChild":138,"./warning":146,"e/U+97":3}],31:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactBrowserComponentMixin
 */"use strict";var ReactEmptyComponent=require("./ReactEmptyComponent");var ReactMount=require("./ReactMount");var invariant=require("./invariant");var ReactBrowserComponentMixin={ /**
   * Returns the DOM node rendered by this component.
   *
   * @return {DOMElement} The root node of this component.
   * @final
   * @protected
   */getDOMNode:function getDOMNode(){"production"!==process.env.NODE_ENV?invariant(this.isMounted(),'getDOMNode(): A component must be mounted to have a DOM node.'):invariant(this.isMounted());if(ReactEmptyComponent.isNullComponentID(this._rootNodeID)){return null;}return ReactMount.getNode(this._rootNodeID);}};module.exports=ReactBrowserComponentMixin;}).call(this,require("e/U+97"));},{"./ReactEmptyComponent":56,"./ReactMount":64,"./invariant":123,"e/U+97":3}],32:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactBrowserEventEmitter
 * @typechecks static-only
 */"use strict";var EventConstants=require("./EventConstants");var EventPluginHub=require("./EventPluginHub");var EventPluginRegistry=require("./EventPluginRegistry");var ReactEventEmitterMixin=require("./ReactEventEmitterMixin");var ViewportMetrics=require("./ViewportMetrics");var isEventSupported=require("./isEventSupported");var merge=require("./merge"); /**
 * Summary of `ReactBrowserEventEmitter` event handling:
 *
 *  - Top-level delegation is used to trap most native browser events. This
 *    may only occur in the main thread and is the responsibility of
 *    ReactEventListener, which is injected and can therefore support pluggable
 *    event sources. This is the only work that occurs in the main thread.
 *
 *  - We normalize and de-duplicate events to account for browser quirks. This
 *    may be done in the worker thread.
 *
 *  - Forward these native events (with the associated top-level type used to
 *    trap it) to `EventPluginHub`, which in turn will ask plugins if they want
 *    to extract any synthetic events.
 *
 *  - The `EventPluginHub` will then process each event by annotating them with
 *    "dispatches", a sequence of listeners and IDs that care about that event.
 *
 *  - The `EventPluginHub` then dispatches the events.
 *
 * Overview of React and the event system:
 *
 * +------------+    .
 * |    DOM     |    .
 * +------------+    .
 *       |           .
 *       v           .
 * +------------+    .
 * | ReactEvent |    .
 * |  Listener  |    .
 * +------------+    .                         +-----------+
 *       |           .               +--------+|SimpleEvent|
 *       |           .               |         |Plugin     |
 * +-----|------+    .               v         +-----------+
 * |     |      |    .    +--------------+                    +------------+
 * |     +-----------.--->|EventPluginHub|                    |    Event   |
 * |            |    .    |              |     +-----------+  | Propagators|
 * | ReactEvent |    .    |              |     |TapEvent   |  |------------|
 * |  Emitter   |    .    |              |<---+|Plugin     |  |other plugin|
 * |            |    .    |              |     +-----------+  |  utilities |
 * |     +-----------.--->|              |                    +------------+
 * |     |      |    .    +--------------+
 * +-----|------+    .                ^        +-----------+
 *       |           .                |        |Enter/Leave|
 *       +           .                +-------+|Plugin     |
 * +-------------+   .                         +-----------+
 * | application |   .
 * |-------------|   .
 * |             |   .
 * |             |   .
 * +-------------+   .
 *                   .
 *    React Core     .  General Purpose Event Plugin System
 */var alreadyListeningTo={};var isMonitoringScrollValue=false;var reactTopListenersCounter=0; // For events like 'submit' which don't consistently bubble (which we trap at a
// lower node than `document`), binding at `document` would cause duplicate
// events so we don't include them here
var topEventMapping={topBlur:'blur',topChange:'change',topClick:'click',topCompositionEnd:'compositionend',topCompositionStart:'compositionstart',topCompositionUpdate:'compositionupdate',topContextMenu:'contextmenu',topCopy:'copy',topCut:'cut',topDoubleClick:'dblclick',topDrag:'drag',topDragEnd:'dragend',topDragEnter:'dragenter',topDragExit:'dragexit',topDragLeave:'dragleave',topDragOver:'dragover',topDragStart:'dragstart',topDrop:'drop',topFocus:'focus',topInput:'input',topKeyDown:'keydown',topKeyPress:'keypress',topKeyUp:'keyup',topMouseDown:'mousedown',topMouseMove:'mousemove',topMouseOut:'mouseout',topMouseOver:'mouseover',topMouseUp:'mouseup',topPaste:'paste',topScroll:'scroll',topSelectionChange:'selectionchange',topTextInput:'textInput',topTouchCancel:'touchcancel',topTouchEnd:'touchend',topTouchMove:'touchmove',topTouchStart:'touchstart',topWheel:'wheel'}; /**
 * To ensure no conflicts with other potential React instances on the page
 */var topListenersIDKey="_reactListenersID"+String(Math.random()).slice(2);function getListeningForDocument(mountAt){ // In IE8, `mountAt` is a host object and doesn't have `hasOwnProperty`
// directly.
if(!Object.prototype.hasOwnProperty.call(mountAt,topListenersIDKey)){mountAt[topListenersIDKey]=reactTopListenersCounter++;alreadyListeningTo[mountAt[topListenersIDKey]]={};}return alreadyListeningTo[mountAt[topListenersIDKey]];} /**
 * `ReactBrowserEventEmitter` is used to attach top-level event listeners. For
 * example:
 *
 *   ReactBrowserEventEmitter.putListener('myID', 'onClick', myFunction);
 *
 * This would allocate a "registration" of `('onClick', myFunction)` on 'myID'.
 *
 * @internal
 */var ReactBrowserEventEmitter=merge(ReactEventEmitterMixin,{ /**
   * Injectable event backend
   */ReactEventListener:null,injection:{ /**
     * @param {object} ReactEventListener
     */injectReactEventListener:function injectReactEventListener(ReactEventListener){ReactEventListener.setHandleTopLevel(ReactBrowserEventEmitter.handleTopLevel);ReactBrowserEventEmitter.ReactEventListener=ReactEventListener;}}, /**
   * Sets whether or not any created callbacks should be enabled.
   *
   * @param {boolean} enabled True if callbacks should be enabled.
   */setEnabled:function setEnabled(enabled){if(ReactBrowserEventEmitter.ReactEventListener){ReactBrowserEventEmitter.ReactEventListener.setEnabled(enabled);}}, /**
   * @return {boolean} True if callbacks are enabled.
   */isEnabled:function isEnabled(){return !!(ReactBrowserEventEmitter.ReactEventListener&&ReactBrowserEventEmitter.ReactEventListener.isEnabled());}, /**
   * We listen for bubbled touch events on the document object.
   *
   * Firefox v8.01 (and possibly others) exhibited strange behavior when
   * mounting `onmousemove` events at some node that was not the document
   * element. The symptoms were that if your mouse is not moving over something
   * contained within that mount point (for example on the background) the
   * top-level listeners for `onmousemove` won't be called. However, if you
   * register the `mousemove` on the document object, then it will of course
   * catch all `mousemove`s. This along with iOS quirks, justifies restricting
   * top-level listeners to the document object only, at least for these
   * movement types of events and possibly all events.
   *
   * @see http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
   *
   * Also, `keyup`/`keypress`/`keydown` do not bubble to the window on IE, but
   * they bubble to document.
   *
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   * @param {object} contentDocumentHandle Document which owns the container
   */listenTo:function listenTo(registrationName,contentDocumentHandle){var mountAt=contentDocumentHandle;var isListening=getListeningForDocument(mountAt);var dependencies=EventPluginRegistry.registrationNameDependencies[registrationName];var topLevelTypes=EventConstants.topLevelTypes;for(var i=0,l=dependencies.length;i<l;i++){var dependency=dependencies[i];if(!(isListening.hasOwnProperty(dependency)&&isListening[dependency])){if(dependency===topLevelTypes.topWheel){if(isEventSupported('wheel')){ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topWheel,'wheel',mountAt);}else if(isEventSupported('mousewheel')){ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topWheel,'mousewheel',mountAt);}else { // Firefox needs to capture a different mouse scroll event.
// @see http://www.quirksmode.org/dom/events/tests/scroll.html
ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topWheel,'DOMMouseScroll',mountAt);}}else if(dependency===topLevelTypes.topScroll){if(isEventSupported('scroll',true)){ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelTypes.topScroll,'scroll',mountAt);}else {ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topScroll,'scroll',ReactBrowserEventEmitter.ReactEventListener.WINDOW_HANDLE);}}else if(dependency===topLevelTypes.topFocus||dependency===topLevelTypes.topBlur){if(isEventSupported('focus',true)){ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelTypes.topFocus,'focus',mountAt);ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelTypes.topBlur,'blur',mountAt);}else if(isEventSupported('focusin')){ // IE has `focusin` and `focusout` events which bubble.
// @see http://www.quirksmode.org/blog/archives/2008/04/delegating_the.html
ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topFocus,'focusin',mountAt);ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topBlur,'focusout',mountAt);} // to make sure blur and focus event listeners are only attached once
isListening[topLevelTypes.topBlur]=true;isListening[topLevelTypes.topFocus]=true;}else if(topEventMapping.hasOwnProperty(dependency)){ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(dependency,topEventMapping[dependency],mountAt);}isListening[dependency]=true;}}},trapBubbledEvent:function trapBubbledEvent(topLevelType,handlerBaseName,handle){return ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelType,handlerBaseName,handle);},trapCapturedEvent:function trapCapturedEvent(topLevelType,handlerBaseName,handle){return ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelType,handlerBaseName,handle);}, /**
   * Listens to window scroll and resize events. We cache scroll values so that
   * application code can access them without triggering reflows.
   *
   * NOTE: Scroll events do not bubble.
   *
   * @see http://www.quirksmode.org/dom/events/scroll.html
   */ensureScrollValueMonitoring:function ensureScrollValueMonitoring(){if(!isMonitoringScrollValue){var refresh=ViewportMetrics.refreshScrollValues;ReactBrowserEventEmitter.ReactEventListener.monitorScrollValue(refresh);isMonitoringScrollValue=true;}},eventNameDispatchConfigs:EventPluginHub.eventNameDispatchConfigs,registrationNameModules:EventPluginHub.registrationNameModules,putListener:EventPluginHub.putListener,getListener:EventPluginHub.getListener,deleteListener:EventPluginHub.deleteListener,deleteAllListeners:EventPluginHub.deleteAllListeners});module.exports=ReactBrowserEventEmitter;},{"./EventConstants":18,"./EventPluginHub":20,"./EventPluginRegistry":21,"./ReactEventEmitterMixin":58,"./ViewportMetrics":96,"./isEventSupported":124,"./merge":133}],33:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactChildren
 */"use strict";var PooledClass=require("./PooledClass");var traverseAllChildren=require("./traverseAllChildren");var warning=require("./warning");var twoArgumentPooler=PooledClass.twoArgumentPooler;var threeArgumentPooler=PooledClass.threeArgumentPooler; /**
 * PooledClass representing the bookkeeping associated with performing a child
 * traversal. Allows avoiding binding callbacks.
 *
 * @constructor ForEachBookKeeping
 * @param {!function} forEachFunction Function to perform traversal with.
 * @param {?*} forEachContext Context to perform context with.
 */function ForEachBookKeeping(forEachFunction,forEachContext){this.forEachFunction=forEachFunction;this.forEachContext=forEachContext;}PooledClass.addPoolingTo(ForEachBookKeeping,twoArgumentPooler);function forEachSingleChild(traverseContext,child,name,i){var forEachBookKeeping=traverseContext;forEachBookKeeping.forEachFunction.call(forEachBookKeeping.forEachContext,child,i);} /**
 * Iterates through children that are typically specified as `props.children`.
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc.
 * @param {*} forEachContext Context for forEachContext.
 */function forEachChildren(children,forEachFunc,forEachContext){if(children==null){return children;}var traverseContext=ForEachBookKeeping.getPooled(forEachFunc,forEachContext);traverseAllChildren(children,forEachSingleChild,traverseContext);ForEachBookKeeping.release(traverseContext);} /**
 * PooledClass representing the bookkeeping associated with performing a child
 * mapping. Allows avoiding binding callbacks.
 *
 * @constructor MapBookKeeping
 * @param {!*} mapResult Object containing the ordered map of results.
 * @param {!function} mapFunction Function to perform mapping with.
 * @param {?*} mapContext Context to perform mapping with.
 */function MapBookKeeping(mapResult,mapFunction,mapContext){this.mapResult=mapResult;this.mapFunction=mapFunction;this.mapContext=mapContext;}PooledClass.addPoolingTo(MapBookKeeping,threeArgumentPooler);function mapSingleChildIntoContext(traverseContext,child,name,i){var mapBookKeeping=traverseContext;var mapResult=mapBookKeeping.mapResult;var keyUnique=!mapResult.hasOwnProperty(name);"production"!==process.env.NODE_ENV?warning(keyUnique,'ReactChildren.map(...): Encountered two children with the same key, '+'`%s`. Child keys must be unique; when two children share a key, only '+'the first child will be used.',name):null;if(keyUnique){var mappedChild=mapBookKeeping.mapFunction.call(mapBookKeeping.mapContext,child,i);mapResult[name]=mappedChild;}} /**
 * Maps children that are typically specified as `props.children`.
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * TODO: This may likely break any calls to `ReactChildren.map` that were
 * previously relying on the fact that we guarded against null children.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} mapFunction.
 * @param {*} mapContext Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */function mapChildren(children,func,context){if(children==null){return children;}var mapResult={};var traverseContext=MapBookKeeping.getPooled(mapResult,func,context);traverseAllChildren(children,mapSingleChildIntoContext,traverseContext);MapBookKeeping.release(traverseContext);return mapResult;}function forEachSingleChildDummy(traverseContext,child,name,i){return null;} /**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */function countChildren(children,context){return traverseAllChildren(children,forEachSingleChildDummy,null);}var ReactChildren={forEach:forEachChildren,map:mapChildren,count:countChildren};module.exports=ReactChildren;}).call(this,require("e/U+97"));},{"./PooledClass":29,"./traverseAllChildren":145,"./warning":146,"e/U+97":3}],34:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactComponent
 */"use strict";var ReactDescriptor=require("./ReactDescriptor");var ReactOwner=require("./ReactOwner");var ReactUpdates=require("./ReactUpdates");var invariant=require("./invariant");var keyMirror=require("./keyMirror");var merge=require("./merge"); /**
 * Every React component is in one of these life cycles.
 */var ComponentLifeCycle=keyMirror({ /**
   * Mounted components have a DOM node representation and are capable of
   * receiving new props.
   */MOUNTED:null, /**
   * Unmounted components are inactive and cannot receive new props.
   */UNMOUNTED:null});var injected=false; /**
 * Optionally injectable environment dependent cleanup hook. (server vs.
 * browser etc). Example: A browser system caches DOM nodes based on component
 * ID and must remove that cache entry when this instance is unmounted.
 *
 * @private
 */var unmountIDFromEnvironment=null; /**
 * The "image" of a component tree, is the platform specific (typically
 * serialized) data that represents a tree of lower level UI building blocks.
 * On the web, this "image" is HTML markup which describes a construction of
 * low level `div` and `span` nodes. Other platforms may have different
 * encoding of this "image". This must be injected.
 *
 * @private
 */var mountImageIntoNode=null; /**
 * Components are the basic units of composition in React.
 *
 * Every component accepts a set of keyed input parameters known as "props" that
 * are initialized by the constructor. Once a component is mounted, the props
 * can be mutated using `setProps` or `replaceProps`.
 *
 * Every component is capable of the following operations:
 *
 *   `mountComponent`
 *     Initializes the component, renders markup, and registers event listeners.
 *
 *   `receiveComponent`
 *     Updates the rendered DOM nodes to match the given component.
 *
 *   `unmountComponent`
 *     Releases any resources allocated by this component.
 *
 * Components can also be "owned" by other components. Being owned by another
 * component means being constructed by that component. This is different from
 * being the child of a component, which means having a DOM representation that
 * is a child of the DOM representation of that component.
 *
 * @class ReactComponent
 */var ReactComponent={injection:{injectEnvironment:function injectEnvironment(ReactComponentEnvironment){"production"!==process.env.NODE_ENV?invariant(!injected,'ReactComponent: injectEnvironment() can only be called once.'):invariant(!injected);mountImageIntoNode=ReactComponentEnvironment.mountImageIntoNode;unmountIDFromEnvironment=ReactComponentEnvironment.unmountIDFromEnvironment;ReactComponent.BackendIDOperations=ReactComponentEnvironment.BackendIDOperations;injected=true;}}, /**
   * @internal
   */LifeCycle:ComponentLifeCycle, /**
   * Injected module that provides ability to mutate individual properties.
   * Injected into the base class because many different subclasses need access
   * to this.
   *
   * @internal
   */BackendIDOperations:null, /**
   * Base functionality for every ReactComponent constructor. Mixed into the
   * `ReactComponent` prototype, but exposed statically for easy access.
   *
   * @lends {ReactComponent.prototype}
   */Mixin:{ /**
     * Checks whether or not this component is mounted.
     *
     * @return {boolean} True if mounted, false otherwise.
     * @final
     * @protected
     */isMounted:function isMounted(){return this._lifeCycleState===ComponentLifeCycle.MOUNTED;}, /**
     * Sets a subset of the props.
     *
     * @param {object} partialProps Subset of the next props.
     * @param {?function} callback Called after props are updated.
     * @final
     * @public
     */setProps:function setProps(partialProps,callback){ // Merge with the pending descriptor if it exists, otherwise with existing
// descriptor props.
var descriptor=this._pendingDescriptor||this._descriptor;this.replaceProps(merge(descriptor.props,partialProps),callback);}, /**
     * Replaces all of the props.
     *
     * @param {object} props New props.
     * @param {?function} callback Called after props are updated.
     * @final
     * @public
     */replaceProps:function replaceProps(props,callback){"production"!==process.env.NODE_ENV?invariant(this.isMounted(),'replaceProps(...): Can only update a mounted component.'):invariant(this.isMounted());"production"!==process.env.NODE_ENV?invariant(this._mountDepth===0,'replaceProps(...): You called `setProps` or `replaceProps` on a '+'component with a parent. This is an anti-pattern since props will '+'get reactively updated when rendered. Instead, change the owner\'s '+'`render` method to pass the correct value as props to the component '+'where it is created.'):invariant(this._mountDepth===0); // This is a deoptimized path. We optimize for always having a descriptor.
// This creates an extra internal descriptor.
this._pendingDescriptor=ReactDescriptor.cloneAndReplaceProps(this._pendingDescriptor||this._descriptor,props);ReactUpdates.enqueueUpdate(this,callback);}, /**
     * Schedule a partial update to the props. Only used for internal testing.
     *
     * @param {object} partialProps Subset of the next props.
     * @param {?function} callback Called after props are updated.
     * @final
     * @internal
     */_setPropsInternal:function _setPropsInternal(partialProps,callback){ // This is a deoptimized path. We optimize for always having a descriptor.
// This creates an extra internal descriptor.
var descriptor=this._pendingDescriptor||this._descriptor;this._pendingDescriptor=ReactDescriptor.cloneAndReplaceProps(descriptor,merge(descriptor.props,partialProps));ReactUpdates.enqueueUpdate(this,callback);}, /**
     * Base constructor for all React components.
     *
     * Subclasses that override this method should make sure to invoke
     * `ReactComponent.Mixin.construct.call(this, ...)`.
     *
     * @param {ReactDescriptor} descriptor
     * @internal
     */construct:function construct(descriptor){ // This is the public exposed props object after it has been processed
// with default props. The descriptor's props represents the true internal
// state of the props.
this.props=descriptor.props; // Record the component responsible for creating this component.
// This is accessible through the descriptor but we maintain an extra
// field for compatibility with devtools and as a way to make an
// incremental update. TODO: Consider deprecating this field.
this._owner=descriptor._owner; // All components start unmounted.
this._lifeCycleState=ComponentLifeCycle.UNMOUNTED; // See ReactUpdates.
this._pendingCallbacks=null; // We keep the old descriptor and a reference to the pending descriptor
// to track updates.
this._descriptor=descriptor;this._pendingDescriptor=null;}, /**
     * Initializes the component, renders markup, and registers event listeners.
     *
     * NOTE: This does not insert any nodes into the DOM.
     *
     * Subclasses that override this method should make sure to invoke
     * `ReactComponent.Mixin.mountComponent.call(this, ...)`.
     *
     * @param {string} rootID DOM ID of the root node.
     * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
     * @param {number} mountDepth number of components in the owner hierarchy.
     * @return {?string} Rendered markup to be inserted into the DOM.
     * @internal
     */mountComponent:function mountComponent(rootID,transaction,mountDepth){"production"!==process.env.NODE_ENV?invariant(!this.isMounted(),'mountComponent(%s, ...): Can only mount an unmounted component. '+'Make sure to avoid storing components between renders or reusing a '+'single component instance in multiple places.',rootID):invariant(!this.isMounted());var props=this._descriptor.props;if(props.ref!=null){var owner=this._descriptor._owner;ReactOwner.addComponentAsRefTo(this,props.ref,owner);}this._rootNodeID=rootID;this._lifeCycleState=ComponentLifeCycle.MOUNTED;this._mountDepth=mountDepth; // Effectively: return '';
}, /**
     * Releases any resources allocated by `mountComponent`.
     *
     * NOTE: This does not remove any nodes from the DOM.
     *
     * Subclasses that override this method should make sure to invoke
     * `ReactComponent.Mixin.unmountComponent.call(this)`.
     *
     * @internal
     */unmountComponent:function unmountComponent(){"production"!==process.env.NODE_ENV?invariant(this.isMounted(),'unmountComponent(): Can only unmount a mounted component.'):invariant(this.isMounted());var props=this.props;if(props.ref!=null){ReactOwner.removeComponentAsRefFrom(this,props.ref,this._owner);}unmountIDFromEnvironment(this._rootNodeID);this._rootNodeID=null;this._lifeCycleState=ComponentLifeCycle.UNMOUNTED;}, /**
     * Given a new instance of this component, updates the rendered DOM nodes
     * as if that instance was rendered instead.
     *
     * Subclasses that override this method should make sure to invoke
     * `ReactComponent.Mixin.receiveComponent.call(this, ...)`.
     *
     * @param {object} nextComponent Next set of properties.
     * @param {ReactReconcileTransaction} transaction
     * @internal
     */receiveComponent:function receiveComponent(nextDescriptor,transaction){"production"!==process.env.NODE_ENV?invariant(this.isMounted(),'receiveComponent(...): Can only update a mounted component.'):invariant(this.isMounted());this._pendingDescriptor=nextDescriptor;this.performUpdateIfNecessary(transaction);}, /**
     * If `_pendingDescriptor` is set, update the component.
     *
     * @param {ReactReconcileTransaction} transaction
     * @internal
     */performUpdateIfNecessary:function performUpdateIfNecessary(transaction){if(this._pendingDescriptor==null){return;}var prevDescriptor=this._descriptor;var nextDescriptor=this._pendingDescriptor;this._descriptor=nextDescriptor;this.props=nextDescriptor.props;this._owner=nextDescriptor._owner;this._pendingDescriptor=null;this.updateComponent(transaction,prevDescriptor);}, /**
     * Updates the component's currently mounted representation.
     *
     * @param {ReactReconcileTransaction} transaction
     * @param {object} prevDescriptor
     * @internal
     */updateComponent:function updateComponent(transaction,prevDescriptor){var nextDescriptor=this._descriptor; // If either the owner or a `ref` has changed, make sure the newest owner
// has stored a reference to `this`, and the previous owner (if different)
// has forgotten the reference to `this`. We use the descriptor instead
// of the public this.props because the post processing cannot determine
// a ref. The ref conceptually lives on the descriptor.
// TODO: Should this even be possible? The owner cannot change because
// it's forbidden by shouldUpdateReactComponent. The ref can change
// if you swap the keys of but not the refs. Reconsider where this check
// is made. It probably belongs where the key checking and
// instantiateReactComponent is done.
if(nextDescriptor._owner!==prevDescriptor._owner||nextDescriptor.props.ref!==prevDescriptor.props.ref){if(prevDescriptor.props.ref!=null){ReactOwner.removeComponentAsRefFrom(this,prevDescriptor.props.ref,prevDescriptor._owner);} // Correct, even if the owner is the same, and only the ref has changed.
if(nextDescriptor.props.ref!=null){ReactOwner.addComponentAsRefTo(this,nextDescriptor.props.ref,nextDescriptor._owner);}}}, /**
     * Mounts this component and inserts it into the DOM.
     *
     * @param {string} rootID DOM ID of the root node.
     * @param {DOMElement} container DOM element to mount into.
     * @param {boolean} shouldReuseMarkup If true, do not insert markup
     * @final
     * @internal
     * @see {ReactMount.renderComponent}
     */mountComponentIntoNode:function mountComponentIntoNode(rootID,container,shouldReuseMarkup){var transaction=ReactUpdates.ReactReconcileTransaction.getPooled();transaction.perform(this._mountComponentIntoNode,this,rootID,container,transaction,shouldReuseMarkup);ReactUpdates.ReactReconcileTransaction.release(transaction);}, /**
     * @param {string} rootID DOM ID of the root node.
     * @param {DOMElement} container DOM element to mount into.
     * @param {ReactReconcileTransaction} transaction
     * @param {boolean} shouldReuseMarkup If true, do not insert markup
     * @final
     * @private
     */_mountComponentIntoNode:function _mountComponentIntoNode(rootID,container,transaction,shouldReuseMarkup){var markup=this.mountComponent(rootID,transaction,0);mountImageIntoNode(markup,container,shouldReuseMarkup);}, /**
     * Checks if this component is owned by the supplied `owner` component.
     *
     * @param {ReactComponent} owner Component to check.
     * @return {boolean} True if `owners` owns this component.
     * @final
     * @internal
     */isOwnedBy:function isOwnedBy(owner){return this._owner===owner;}, /**
     * Gets another component, that shares the same owner as this one, by ref.
     *
     * @param {string} ref of a sibling Component.
     * @return {?ReactComponent} the actual sibling Component.
     * @final
     * @internal
     */getSiblingByRef:function getSiblingByRef(ref){var owner=this._owner;if(!owner||!owner.refs){return null;}return owner.refs[ref];}}};module.exports=ReactComponent;}).call(this,require("e/U+97"));},{"./ReactDescriptor":54,"./ReactOwner":67,"./ReactUpdates":79,"./invariant":123,"./keyMirror":129,"./merge":133,"e/U+97":3}],35:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactComponentBrowserEnvironment
 */ /*jslint evil: true */"use strict";var ReactDOMIDOperations=require("./ReactDOMIDOperations");var ReactMarkupChecksum=require("./ReactMarkupChecksum");var ReactMount=require("./ReactMount");var ReactPerf=require("./ReactPerf");var ReactReconcileTransaction=require("./ReactReconcileTransaction");var getReactRootElementInContainer=require("./getReactRootElementInContainer");var invariant=require("./invariant");var setInnerHTML=require("./setInnerHTML");var ELEMENT_NODE_TYPE=1;var DOC_NODE_TYPE=9; /**
 * Abstracts away all functionality of `ReactComponent` requires knowledge of
 * the browser context.
 */var ReactComponentBrowserEnvironment={ReactReconcileTransaction:ReactReconcileTransaction,BackendIDOperations:ReactDOMIDOperations, /**
   * If a particular environment requires that some resources be cleaned up,
   * specify this in the injected Mixin. In the DOM, we would likely want to
   * purge any cached node ID lookups.
   *
   * @private
   */unmountIDFromEnvironment:function unmountIDFromEnvironment(rootNodeID){ReactMount.purgeID(rootNodeID);}, /**
   * @param {string} markup Markup string to place into the DOM Element.
   * @param {DOMElement} container DOM Element to insert markup into.
   * @param {boolean} shouldReuseMarkup Should reuse the existing markup in the
   * container if possible.
   */mountImageIntoNode:ReactPerf.measure('ReactComponentBrowserEnvironment','mountImageIntoNode',function(markup,container,shouldReuseMarkup){"production"!==process.env.NODE_ENV?invariant(container&&(container.nodeType===ELEMENT_NODE_TYPE||container.nodeType===DOC_NODE_TYPE),'mountComponentIntoNode(...): Target container is not valid.'):invariant(container&&(container.nodeType===ELEMENT_NODE_TYPE||container.nodeType===DOC_NODE_TYPE));if(shouldReuseMarkup){if(ReactMarkupChecksum.canReuseMarkup(markup,getReactRootElementInContainer(container))){return;}else {"production"!==process.env.NODE_ENV?invariant(container.nodeType!==DOC_NODE_TYPE,'You\'re trying to render a component to the document using '+'server rendering but the checksum was invalid. This usually '+'means you rendered a different component type or props on '+'the client from the one on the server, or your render() '+'methods are impure. React cannot handle this case due to '+'cross-browser quirks by rendering at the document root. You '+'should look for environment dependent code in your components '+'and ensure the props are the same client and server side.'):invariant(container.nodeType!==DOC_NODE_TYPE);if("production"!==process.env.NODE_ENV){console.warn('React attempted to use reuse markup in a container but the '+'checksum was invalid. This generally means that you are '+'using server rendering and the markup generated on the '+'server was not what the client was expecting. React injected '+'new markup to compensate which works but you have lost many '+'of the benefits of server rendering. Instead, figure out '+'why the markup being generated is different on the client '+'or server.');}}}"production"!==process.env.NODE_ENV?invariant(container.nodeType!==DOC_NODE_TYPE,'You\'re trying to render a component to the document but '+'you didn\'t use server rendering. We can\'t do this '+'without using server rendering due to cross-browser quirks. '+'See renderComponentToString() for server rendering.'):invariant(container.nodeType!==DOC_NODE_TYPE);setInnerHTML(container,markup);})};module.exports=ReactComponentBrowserEnvironment;}).call(this,require("e/U+97"));},{"./ReactDOMIDOperations":43,"./ReactMarkupChecksum":63,"./ReactMount":64,"./ReactPerf":68,"./ReactReconcileTransaction":74,"./getReactRootElementInContainer":117,"./invariant":123,"./setInnerHTML":141,"e/U+97":3}],36:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactCompositeComponent
 */"use strict";var ReactComponent=require("./ReactComponent");var ReactContext=require("./ReactContext");var ReactCurrentOwner=require("./ReactCurrentOwner");var ReactDescriptor=require("./ReactDescriptor");var ReactDescriptorValidator=require("./ReactDescriptorValidator");var ReactEmptyComponent=require("./ReactEmptyComponent");var ReactErrorUtils=require("./ReactErrorUtils");var ReactOwner=require("./ReactOwner");var ReactPerf=require("./ReactPerf");var ReactPropTransferer=require("./ReactPropTransferer");var ReactPropTypeLocations=require("./ReactPropTypeLocations");var ReactPropTypeLocationNames=require("./ReactPropTypeLocationNames");var ReactUpdates=require("./ReactUpdates");var instantiateReactComponent=require("./instantiateReactComponent");var invariant=require("./invariant");var keyMirror=require("./keyMirror");var merge=require("./merge");var mixInto=require("./mixInto");var monitorCodeUse=require("./monitorCodeUse");var mapObject=require("./mapObject");var shouldUpdateReactComponent=require("./shouldUpdateReactComponent");var warning=require("./warning"); /**
 * Policies that describe methods in `ReactCompositeComponentInterface`.
 */var SpecPolicy=keyMirror({ /**
   * These methods may be defined only once by the class specification or mixin.
   */DEFINE_ONCE:null, /**
   * These methods may be defined by both the class specification and mixins.
   * Subsequent definitions will be chained. These methods must return void.
   */DEFINE_MANY:null, /**
   * These methods are overriding the base ReactCompositeComponent class.
   */OVERRIDE_BASE:null, /**
   * These methods are similar to DEFINE_MANY, except we assume they return
   * objects. We try to merge the keys of the return values of all the mixed in
   * functions. If there is a key conflict we throw.
   */DEFINE_MANY_MERGED:null});var injectedMixins=[]; /**
 * Composite components are higher-level components that compose other composite
 * or native components.
 *
 * To create a new type of `ReactCompositeComponent`, pass a specification of
 * your new class to `React.createClass`. The only requirement of your class
 * specification is that you implement a `render` method.
 *
 *   var MyComponent = React.createClass({
 *     render: function() {
 *       return <div>Hello World</div>;
 *     }
 *   });
 *
 * The class specification supports a specific protocol of methods that have
 * special meaning (e.g. `render`). See `ReactCompositeComponentInterface` for
 * more the comprehensive protocol. Any other properties and methods in the
 * class specification will available on the prototype.
 *
 * @interface ReactCompositeComponentInterface
 * @internal
 */var ReactCompositeComponentInterface={ /**
   * An array of Mixin objects to include when defining your component.
   *
   * @type {array}
   * @optional
   */mixins:SpecPolicy.DEFINE_MANY, /**
   * An object containing properties and methods that should be defined on
   * the component's constructor instead of its prototype (static methods).
   *
   * @type {object}
   * @optional
   */statics:SpecPolicy.DEFINE_MANY, /**
   * Definition of prop types for this component.
   *
   * @type {object}
   * @optional
   */propTypes:SpecPolicy.DEFINE_MANY, /**
   * Definition of context types for this component.
   *
   * @type {object}
   * @optional
   */contextTypes:SpecPolicy.DEFINE_MANY, /**
   * Definition of context types this component sets for its children.
   *
   * @type {object}
   * @optional
   */childContextTypes:SpecPolicy.DEFINE_MANY, // ==== Definition methods ====
/**
   * Invoked when the component is mounted. Values in the mapping will be set on
   * `this.props` if that prop is not specified (i.e. using an `in` check).
   *
   * This method is invoked before `getInitialState` and therefore cannot rely
   * on `this.state` or use `this.setState`.
   *
   * @return {object}
   * @optional
   */getDefaultProps:SpecPolicy.DEFINE_MANY_MERGED, /**
   * Invoked once before the component is mounted. The return value will be used
   * as the initial value of `this.state`.
   *
   *   getInitialState: function() {
   *     return {
   *       isOn: false,
   *       fooBaz: new BazFoo()
   *     }
   *   }
   *
   * @return {object}
   * @optional
   */getInitialState:SpecPolicy.DEFINE_MANY_MERGED, /**
   * @return {object}
   * @optional
   */getChildContext:SpecPolicy.DEFINE_MANY_MERGED, /**
   * Uses props from `this.props` and state from `this.state` to render the
   * structure of the component.
   *
   * No guarantees are made about when or how often this method is invoked, so
   * it must not have side effects.
   *
   *   render: function() {
   *     var name = this.props.name;
   *     return <div>Hello, {name}!</div>;
   *   }
   *
   * @return {ReactComponent}
   * @nosideeffects
   * @required
   */render:SpecPolicy.DEFINE_ONCE, // ==== Delegate methods ====
/**
   * Invoked when the component is initially created and about to be mounted.
   * This may have side effects, but any external subscriptions or data created
   * by this method must be cleaned up in `componentWillUnmount`.
   *
   * @optional
   */componentWillMount:SpecPolicy.DEFINE_MANY, /**
   * Invoked when the component has been mounted and has a DOM representation.
   * However, there is no guarantee that the DOM node is in the document.
   *
   * Use this as an opportunity to operate on the DOM when the component has
   * been mounted (initialized and rendered) for the first time.
   *
   * @param {DOMElement} rootNode DOM element representing the component.
   * @optional
   */componentDidMount:SpecPolicy.DEFINE_MANY, /**
   * Invoked before the component receives new props.
   *
   * Use this as an opportunity to react to a prop transition by updating the
   * state using `this.setState`. Current props are accessed via `this.props`.
   *
   *   componentWillReceiveProps: function(nextProps, nextContext) {
   *     this.setState({
   *       likesIncreasing: nextProps.likeCount > this.props.likeCount
   *     });
   *   }
   *
   * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
   * transition may cause a state change, but the opposite is not true. If you
   * need it, you are probably looking for `componentWillUpdate`.
   *
   * @param {object} nextProps
   * @optional
   */componentWillReceiveProps:SpecPolicy.DEFINE_MANY, /**
   * Invoked while deciding if the component should be updated as a result of
   * receiving new props, state and/or context.
   *
   * Use this as an opportunity to `return false` when you're certain that the
   * transition to the new props/state/context will not require a component
   * update.
   *
   *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
   *     return !equal(nextProps, this.props) ||
   *       !equal(nextState, this.state) ||
   *       !equal(nextContext, this.context);
   *   }
   *
   * @param {object} nextProps
   * @param {?object} nextState
   * @param {?object} nextContext
   * @return {boolean} True if the component should update.
   * @optional
   */shouldComponentUpdate:SpecPolicy.DEFINE_ONCE, /**
   * Invoked when the component is about to update due to a transition from
   * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
   * and `nextContext`.
   *
   * Use this as an opportunity to perform preparation before an update occurs.
   *
   * NOTE: You **cannot** use `this.setState()` in this method.
   *
   * @param {object} nextProps
   * @param {?object} nextState
   * @param {?object} nextContext
   * @param {ReactReconcileTransaction} transaction
   * @optional
   */componentWillUpdate:SpecPolicy.DEFINE_MANY, /**
   * Invoked when the component's DOM representation has been updated.
   *
   * Use this as an opportunity to operate on the DOM when the component has
   * been updated.
   *
   * @param {object} prevProps
   * @param {?object} prevState
   * @param {?object} prevContext
   * @param {DOMElement} rootNode DOM element representing the component.
   * @optional
   */componentDidUpdate:SpecPolicy.DEFINE_MANY, /**
   * Invoked when the component is about to be removed from its parent and have
   * its DOM representation destroyed.
   *
   * Use this as an opportunity to deallocate any external resources.
   *
   * NOTE: There is no `componentDidUnmount` since your component will have been
   * destroyed by that point.
   *
   * @optional
   */componentWillUnmount:SpecPolicy.DEFINE_MANY, // ==== Advanced methods ====
/**
   * Updates the component's currently mounted DOM representation.
   *
   * By default, this implements React's rendering and reconciliation algorithm.
   * Sophisticated clients may wish to override this.
   *
   * @param {ReactReconcileTransaction} transaction
   * @internal
   * @overridable
   */updateComponent:SpecPolicy.OVERRIDE_BASE}; /**
 * Mapping from class specification keys to special processing functions.
 *
 * Although these are declared like instance properties in the specification
 * when defining classes using `React.createClass`, they are actually static
 * and are accessible on the constructor instead of the prototype. Despite
 * being static, they must be defined outside of the "statics" key under
 * which all other static methods are defined.
 */var RESERVED_SPEC_KEYS={displayName:function displayName(Constructor,_displayName){Constructor.displayName=_displayName;},mixins:function mixins(Constructor,_mixins){if(_mixins){for(var i=0;i<_mixins.length;i++){mixSpecIntoComponent(Constructor,_mixins[i]);}}},childContextTypes:function childContextTypes(Constructor,_childContextTypes){validateTypeDef(Constructor,_childContextTypes,ReactPropTypeLocations.childContext);Constructor.childContextTypes=merge(Constructor.childContextTypes,_childContextTypes);},contextTypes:function contextTypes(Constructor,_contextTypes){validateTypeDef(Constructor,_contextTypes,ReactPropTypeLocations.context);Constructor.contextTypes=merge(Constructor.contextTypes,_contextTypes);}, /**
   * Special case getDefaultProps which should move into statics but requires
   * automatic merging.
   */getDefaultProps:function getDefaultProps(Constructor,_getDefaultProps){if(Constructor.getDefaultProps){Constructor.getDefaultProps=createMergedResultFunction(Constructor.getDefaultProps,_getDefaultProps);}else {Constructor.getDefaultProps=_getDefaultProps;}},propTypes:function propTypes(Constructor,_propTypes){validateTypeDef(Constructor,_propTypes,ReactPropTypeLocations.prop);Constructor.propTypes=merge(Constructor.propTypes,_propTypes);},statics:function statics(Constructor,_statics){mixStaticSpecIntoComponent(Constructor,_statics);}};function getDeclarationErrorAddendum(component){var owner=component._owner||null;if(owner&&owner.constructor&&owner.constructor.displayName){return ' Check the render method of `'+owner.constructor.displayName+'`.';}return '';}function validateTypeDef(Constructor,typeDef,location){for(var propName in typeDef){if(typeDef.hasOwnProperty(propName)){"production"!==process.env.NODE_ENV?invariant(typeof typeDef[propName]=='function','%s: %s type `%s` is invalid; it must be a function, usually from '+'React.PropTypes.',Constructor.displayName||'ReactCompositeComponent',ReactPropTypeLocationNames[location],propName):invariant(typeof typeDef[propName]=='function');}}}function validateMethodOverride(proto,name){var specPolicy=ReactCompositeComponentInterface.hasOwnProperty(name)?ReactCompositeComponentInterface[name]:null; // Disallow overriding of base class methods unless explicitly allowed.
if(ReactCompositeComponentMixin.hasOwnProperty(name)){"production"!==process.env.NODE_ENV?invariant(specPolicy===SpecPolicy.OVERRIDE_BASE,'ReactCompositeComponentInterface: You are attempting to override '+'`%s` from your class specification. Ensure that your method names '+'do not overlap with React methods.',name):invariant(specPolicy===SpecPolicy.OVERRIDE_BASE);} // Disallow defining methods more than once unless explicitly allowed.
if(proto.hasOwnProperty(name)){"production"!==process.env.NODE_ENV?invariant(specPolicy===SpecPolicy.DEFINE_MANY||specPolicy===SpecPolicy.DEFINE_MANY_MERGED,'ReactCompositeComponentInterface: You are attempting to define '+'`%s` on your component more than once. This conflict may be due '+'to a mixin.',name):invariant(specPolicy===SpecPolicy.DEFINE_MANY||specPolicy===SpecPolicy.DEFINE_MANY_MERGED);}}function validateLifeCycleOnReplaceState(instance){var compositeLifeCycleState=instance._compositeLifeCycleState;"production"!==process.env.NODE_ENV?invariant(instance.isMounted()||compositeLifeCycleState===CompositeLifeCycle.MOUNTING,'replaceState(...): Can only update a mounted or mounting component.'):invariant(instance.isMounted()||compositeLifeCycleState===CompositeLifeCycle.MOUNTING);"production"!==process.env.NODE_ENV?invariant(compositeLifeCycleState!==CompositeLifeCycle.RECEIVING_STATE,'replaceState(...): Cannot update during an existing state transition '+'(such as within `render`). This could potentially cause an infinite '+'loop so it is forbidden.'):invariant(compositeLifeCycleState!==CompositeLifeCycle.RECEIVING_STATE);"production"!==process.env.NODE_ENV?invariant(compositeLifeCycleState!==CompositeLifeCycle.UNMOUNTING,'replaceState(...): Cannot update while unmounting component. This '+'usually means you called setState() on an unmounted component.'):invariant(compositeLifeCycleState!==CompositeLifeCycle.UNMOUNTING);} /**
 * Custom version of `mixInto` which handles policy validation and reserved
 * specification keys when building `ReactCompositeComponent` classses.
 */function mixSpecIntoComponent(Constructor,spec){"production"!==process.env.NODE_ENV?invariant(!ReactDescriptor.isValidFactory(spec),'ReactCompositeComponent: You\'re attempting to '+'use a component class as a mixin. Instead, just use a regular object.'):invariant(!ReactDescriptor.isValidFactory(spec));"production"!==process.env.NODE_ENV?invariant(!ReactDescriptor.isValidDescriptor(spec),'ReactCompositeComponent: You\'re attempting to '+'use a component as a mixin. Instead, just use a regular object.'):invariant(!ReactDescriptor.isValidDescriptor(spec));var proto=Constructor.prototype;for(var name in spec){var property=spec[name];if(!spec.hasOwnProperty(name)){continue;}validateMethodOverride(proto,name);if(RESERVED_SPEC_KEYS.hasOwnProperty(name)){RESERVED_SPEC_KEYS[name](Constructor,property);}else { // Setup methods on prototype:
// The following member methods should not be automatically bound:
// 1. Expected ReactCompositeComponent methods (in the "interface").
// 2. Overridden methods (that were mixed in).
var isCompositeComponentMethod=ReactCompositeComponentInterface.hasOwnProperty(name);var isAlreadyDefined=proto.hasOwnProperty(name);var markedDontBind=property&&property.__reactDontBind;var isFunction=typeof property==='function';var shouldAutoBind=isFunction&&!isCompositeComponentMethod&&!isAlreadyDefined&&!markedDontBind;if(shouldAutoBind){if(!proto.__reactAutoBindMap){proto.__reactAutoBindMap={};}proto.__reactAutoBindMap[name]=property;proto[name]=property;}else {if(isAlreadyDefined){var specPolicy=ReactCompositeComponentInterface[name]; // These cases should already be caught by validateMethodOverride
"production"!==process.env.NODE_ENV?invariant(isCompositeComponentMethod&&(specPolicy===SpecPolicy.DEFINE_MANY_MERGED||specPolicy===SpecPolicy.DEFINE_MANY),'ReactCompositeComponent: Unexpected spec policy %s for key %s '+'when mixing in component specs.',specPolicy,name):invariant(isCompositeComponentMethod&&(specPolicy===SpecPolicy.DEFINE_MANY_MERGED||specPolicy===SpecPolicy.DEFINE_MANY)); // For methods which are defined more than once, call the existing
// methods before calling the new property, merging if appropriate.
if(specPolicy===SpecPolicy.DEFINE_MANY_MERGED){proto[name]=createMergedResultFunction(proto[name],property);}else if(specPolicy===SpecPolicy.DEFINE_MANY){proto[name]=createChainedFunction(proto[name],property);}}else {proto[name]=property;if("production"!==process.env.NODE_ENV){ // Add verbose displayName to the function, which helps when looking
// at profiling tools.
if(typeof property==='function'&&spec.displayName){proto[name].displayName=spec.displayName+'_'+name;}}}}}}}function mixStaticSpecIntoComponent(Constructor,statics){if(!statics){return;}for(var name in statics){var property=statics[name];if(!statics.hasOwnProperty(name)){continue;}var isInherited=name in Constructor;var result=property;if(isInherited){var existingProperty=Constructor[name];var existingType=typeof existingProperty==="undefined"?"undefined":_typeof(existingProperty);var propertyType=typeof property==="undefined"?"undefined":_typeof(property);"production"!==process.env.NODE_ENV?invariant(existingType==='function'&&propertyType==='function','ReactCompositeComponent: You are attempting to define '+'`%s` on your component more than once, but that is only supported '+'for functions, which are chained together. This conflict may be '+'due to a mixin.',name):invariant(existingType==='function'&&propertyType==='function');result=createChainedFunction(existingProperty,property);}Constructor[name]=result;}} /**
 * Merge two objects, but throw if both contain the same key.
 *
 * @param {object} one The first object, which is mutated.
 * @param {object} two The second object
 * @return {object} one after it has been mutated to contain everything in two.
 */function mergeObjectsWithNoDuplicateKeys(one,two){"production"!==process.env.NODE_ENV?invariant(one&&two&&(typeof one==="undefined"?"undefined":_typeof(one))==='object'&&(typeof two==="undefined"?"undefined":_typeof(two))==='object','mergeObjectsWithNoDuplicateKeys(): Cannot merge non-objects'):invariant(one&&two&&(typeof one==="undefined"?"undefined":_typeof(one))==='object'&&(typeof two==="undefined"?"undefined":_typeof(two))==='object');mapObject(two,function(value,key){"production"!==process.env.NODE_ENV?invariant(one[key]===undefined,'mergeObjectsWithNoDuplicateKeys(): '+'Tried to merge two objects with the same key: %s',key):invariant(one[key]===undefined);one[key]=value;});return one;} /**
 * Creates a function that invokes two functions and merges their return values.
 *
 * @param {function} one Function to invoke first.
 * @param {function} two Function to invoke second.
 * @return {function} Function that invokes the two argument functions.
 * @private
 */function createMergedResultFunction(one,two){return function mergedResult(){var a=one.apply(this,arguments);var b=two.apply(this,arguments);if(a==null){return b;}else if(b==null){return a;}return mergeObjectsWithNoDuplicateKeys(a,b);};} /**
 * Creates a function that invokes two functions and ignores their return vales.
 *
 * @param {function} one Function to invoke first.
 * @param {function} two Function to invoke second.
 * @return {function} Function that invokes the two argument functions.
 * @private
 */function createChainedFunction(one,two){return function chainedFunction(){one.apply(this,arguments);two.apply(this,arguments);};} /**
 * `ReactCompositeComponent` maintains an auxiliary life cycle state in
 * `this._compositeLifeCycleState` (which can be null).
 *
 * This is different from the life cycle state maintained by `ReactComponent` in
 * `this._lifeCycleState`. The following diagram shows how the states overlap in
 * time. There are times when the CompositeLifeCycle is null - at those times it
 * is only meaningful to look at ComponentLifeCycle alone.
 *
 * Top Row: ReactComponent.ComponentLifeCycle
 * Low Row: ReactComponent.CompositeLifeCycle
 *
 * +-------+------------------------------------------------------+--------+
 * |  UN   |                    MOUNTED                           |   UN   |
 * |MOUNTED|                                                      | MOUNTED|
 * +-------+------------------------------------------------------+--------+
 * |       ^--------+   +------+   +------+   +------+   +--------^        |
 * |       |        |   |      |   |      |   |      |   |        |        |
 * |    0--|MOUNTING|-0-|RECEIV|-0-|RECEIV|-0-|RECEIV|-0-|   UN   |--->0   |
 * |       |        |   |PROPS |   | PROPS|   | STATE|   |MOUNTING|        |
 * |       |        |   |      |   |      |   |      |   |        |        |
 * |       |        |   |      |   |      |   |      |   |        |        |
 * |       +--------+   +------+   +------+   +------+   +--------+        |
 * |       |                                                      |        |
 * +-------+------------------------------------------------------+--------+
 */var CompositeLifeCycle=keyMirror({ /**
   * Components in the process of being mounted respond to state changes
   * differently.
   */MOUNTING:null, /**
   * Components in the process of being unmounted are guarded against state
   * changes.
   */UNMOUNTING:null, /**
   * Components that are mounted and receiving new props respond to state
   * changes differently.
   */RECEIVING_PROPS:null, /**
   * Components that are mounted and receiving new state are guarded against
   * additional state changes.
   */RECEIVING_STATE:null}); /**
 * @lends {ReactCompositeComponent.prototype}
 */var ReactCompositeComponentMixin={ /**
   * Base constructor for all composite component.
   *
   * @param {ReactDescriptor} descriptor
   * @final
   * @internal
   */construct:function construct(descriptor){ // Children can be either an array or more than one argument
ReactComponent.Mixin.construct.apply(this,arguments);ReactOwner.Mixin.construct.apply(this,arguments);this.state=null;this._pendingState=null; // This is the public post-processed context. The real context and pending
// context lives on the descriptor.
this.context=null;this._compositeLifeCycleState=null;}, /**
   * Checks whether or not this composite component is mounted.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */isMounted:function isMounted(){return ReactComponent.Mixin.isMounted.call(this)&&this._compositeLifeCycleState!==CompositeLifeCycle.MOUNTING;}, /**
   * Initializes the component, renders markup, and registers event listeners.
   *
   * @param {string} rootID DOM ID of the root node.
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @param {number} mountDepth number of components in the owner hierarchy
   * @return {?string} Rendered markup to be inserted into the DOM.
   * @final
   * @internal
   */mountComponent:ReactPerf.measure('ReactCompositeComponent','mountComponent',function(rootID,transaction,mountDepth){ReactComponent.Mixin.mountComponent.call(this,rootID,transaction,mountDepth);this._compositeLifeCycleState=CompositeLifeCycle.MOUNTING;if(this.__reactAutoBindMap){this._bindAutoBindMethods();}this.context=this._processContext(this._descriptor._context);this.props=this._processProps(this.props);this.state=this.getInitialState?this.getInitialState():null;"production"!==process.env.NODE_ENV?invariant(_typeof(this.state)==='object'&&!Array.isArray(this.state),'%s.getInitialState(): must return an object or null',this.constructor.displayName||'ReactCompositeComponent'):invariant(_typeof(this.state)==='object'&&!Array.isArray(this.state));this._pendingState=null;this._pendingForceUpdate=false;if(this.componentWillMount){this.componentWillMount(); // When mounting, calls to `setState` by `componentWillMount` will set
// `this._pendingState` without triggering a re-render.
if(this._pendingState){this.state=this._pendingState;this._pendingState=null;}}this._renderedComponent=instantiateReactComponent(this._renderValidatedComponent()); // Done with mounting, `setState` will now trigger UI changes.
this._compositeLifeCycleState=null;var markup=this._renderedComponent.mountComponent(rootID,transaction,mountDepth+1);if(this.componentDidMount){transaction.getReactMountReady().enqueue(this.componentDidMount,this);}return markup;}), /**
   * Releases any resources allocated by `mountComponent`.
   *
   * @final
   * @internal
   */unmountComponent:function unmountComponent(){this._compositeLifeCycleState=CompositeLifeCycle.UNMOUNTING;if(this.componentWillUnmount){this.componentWillUnmount();}this._compositeLifeCycleState=null;this._renderedComponent.unmountComponent();this._renderedComponent=null;ReactComponent.Mixin.unmountComponent.call(this); // Some existing components rely on this.props even after they've been
// destroyed (in event handlers).
// TODO: this.props = null;
// TODO: this.state = null;
}, /**
   * Sets a subset of the state. Always use this or `replaceState` to mutate
   * state. You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * There is no guarantee that calls to `setState` will run synchronously,
   * as they may eventually be batched together.  You can provide an optional
   * callback that will be executed when the call to setState is actually
   * completed.
   *
   * @param {object} partialState Next partial state to be merged with state.
   * @param {?function} callback Called after state is updated.
   * @final
   * @protected
   */setState:function setState(partialState,callback){"production"!==process.env.NODE_ENV?invariant((typeof partialState==="undefined"?"undefined":_typeof(partialState))==='object'||partialState==null,'setState(...): takes an object of state variables to update.'):invariant((typeof partialState==="undefined"?"undefined":_typeof(partialState))==='object'||partialState==null);if("production"!==process.env.NODE_ENV){"production"!==process.env.NODE_ENV?warning(partialState!=null,'setState(...): You passed an undefined or null state object; '+'instead, use forceUpdate().'):null;} // Merge with `_pendingState` if it exists, otherwise with existing state.
this.replaceState(merge(this._pendingState||this.state,partialState),callback);}, /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {object} completeState Next state.
   * @param {?function} callback Called after state is updated.
   * @final
   * @protected
   */replaceState:function replaceState(completeState,callback){validateLifeCycleOnReplaceState(this);this._pendingState=completeState;if(this._compositeLifeCycleState!==CompositeLifeCycle.MOUNTING){ // If we're in a componentWillMount handler, don't enqueue a rerender
// because ReactUpdates assumes we're in a browser context (which is wrong
// for server rendering) and we're about to do a render anyway.
// TODO: The callback here is ignored when setState is called from
// componentWillMount. Either fix it or disallow doing so completely in
// favor of getInitialState.
ReactUpdates.enqueueUpdate(this,callback);}}, /**
   * Filters the context object to only contain keys specified in
   * `contextTypes`, and asserts that they are valid.
   *
   * @param {object} context
   * @return {?object}
   * @private
   */_processContext:function _processContext(context){var maskedContext=null;var contextTypes=this.constructor.contextTypes;if(contextTypes){maskedContext={};for(var contextName in contextTypes){maskedContext[contextName]=context[contextName];}if("production"!==process.env.NODE_ENV){this._checkPropTypes(contextTypes,maskedContext,ReactPropTypeLocations.context);}}return maskedContext;}, /**
   * @param {object} currentContext
   * @return {object}
   * @private
   */_processChildContext:function _processChildContext(currentContext){var childContext=this.getChildContext&&this.getChildContext();var displayName=this.constructor.displayName||'ReactCompositeComponent';if(childContext){"production"!==process.env.NODE_ENV?invariant(_typeof(this.constructor.childContextTypes)==='object','%s.getChildContext(): childContextTypes must be defined in order to '+'use getChildContext().',displayName):invariant(_typeof(this.constructor.childContextTypes)==='object');if("production"!==process.env.NODE_ENV){this._checkPropTypes(this.constructor.childContextTypes,childContext,ReactPropTypeLocations.childContext);}for(var name in childContext){"production"!==process.env.NODE_ENV?invariant(name in this.constructor.childContextTypes,'%s.getChildContext(): key "%s" is not defined in childContextTypes.',displayName,name):invariant(name in this.constructor.childContextTypes);}return merge(currentContext,childContext);}return currentContext;}, /**
   * Processes props by setting default values for unspecified props and
   * asserting that the props are valid. Does not mutate its argument; returns
   * a new props object with defaults merged in.
   *
   * @param {object} newProps
   * @return {object}
   * @private
   */_processProps:function _processProps(newProps){var defaultProps=this.constructor.defaultProps;var props;if(defaultProps){props=merge(newProps);for(var propName in defaultProps){if(typeof props[propName]==='undefined'){props[propName]=defaultProps[propName];}}}else {props=newProps;}if("production"!==process.env.NODE_ENV){var propTypes=this.constructor.propTypes;if(propTypes){this._checkPropTypes(propTypes,props,ReactPropTypeLocations.prop);}}return props;}, /**
   * Assert that the props are valid
   *
   * @param {object} propTypes Map of prop name to a ReactPropType
   * @param {object} props
   * @param {string} location e.g. "prop", "context", "child context"
   * @private
   */_checkPropTypes:function _checkPropTypes(propTypes,props,location){ // TODO: Stop validating prop types here and only use the descriptor
// validation.
var componentName=this.constructor.displayName;for(var propName in propTypes){if(propTypes.hasOwnProperty(propName)){var error=propTypes[propName](props,propName,componentName,location);if(error instanceof Error){ // We may want to extend this logic for similar errors in
// renderComponent calls, so I'm abstracting it away into
// a function to minimize refactoring in the future
var addendum=getDeclarationErrorAddendum(this);"production"!==process.env.NODE_ENV?warning(false,error.message+addendum):null;}}}}, /**
   * If any of `_pendingDescriptor`, `_pendingState`, or `_pendingForceUpdate`
   * is set, update the component.
   *
   * @param {ReactReconcileTransaction} transaction
   * @internal
   */performUpdateIfNecessary:function performUpdateIfNecessary(transaction){var compositeLifeCycleState=this._compositeLifeCycleState; // Do not trigger a state transition if we are in the middle of mounting or
// receiving props because both of those will already be doing this.
if(compositeLifeCycleState===CompositeLifeCycle.MOUNTING||compositeLifeCycleState===CompositeLifeCycle.RECEIVING_PROPS){return;}if(this._pendingDescriptor==null&&this._pendingState==null&&!this._pendingForceUpdate){return;}var nextContext=this.context;var nextProps=this.props;var nextDescriptor=this._descriptor;if(this._pendingDescriptor!=null){nextDescriptor=this._pendingDescriptor;nextContext=this._processContext(nextDescriptor._context);nextProps=this._processProps(nextDescriptor.props);this._pendingDescriptor=null;this._compositeLifeCycleState=CompositeLifeCycle.RECEIVING_PROPS;if(this.componentWillReceiveProps){this.componentWillReceiveProps(nextProps,nextContext);}}this._compositeLifeCycleState=CompositeLifeCycle.RECEIVING_STATE;var nextState=this._pendingState||this.state;this._pendingState=null;try{var shouldUpdate=this._pendingForceUpdate||!this.shouldComponentUpdate||this.shouldComponentUpdate(nextProps,nextState,nextContext);if("production"!==process.env.NODE_ENV){if(typeof shouldUpdate==="undefined"){console.warn((this.constructor.displayName||'ReactCompositeComponent')+'.shouldComponentUpdate(): Returned undefined instead of a '+'boolean value. Make sure to return true or false.');}}if(shouldUpdate){this._pendingForceUpdate=false; // Will set `this.props`, `this.state` and `this.context`.
this._performComponentUpdate(nextDescriptor,nextProps,nextState,nextContext,transaction);}else { // If it's determined that a component should not update, we still want
// to set props and state.
this._descriptor=nextDescriptor;this.props=nextProps;this.state=nextState;this.context=nextContext; // Owner cannot change because shouldUpdateReactComponent doesn't allow
// it. TODO: Remove this._owner completely.
this._owner=nextDescriptor._owner;}}finally {this._compositeLifeCycleState=null;}}, /**
   * Merges new props and state, notifies delegate methods of update and
   * performs update.
   *
   * @param {ReactDescriptor} nextDescriptor Next descriptor
   * @param {object} nextProps Next public object to set as properties.
   * @param {?object} nextState Next object to set as state.
   * @param {?object} nextContext Next public object to set as context.
   * @param {ReactReconcileTransaction} transaction
   * @private
   */_performComponentUpdate:function _performComponentUpdate(nextDescriptor,nextProps,nextState,nextContext,transaction){var prevDescriptor=this._descriptor;var prevProps=this.props;var prevState=this.state;var prevContext=this.context;if(this.componentWillUpdate){this.componentWillUpdate(nextProps,nextState,nextContext);}this._descriptor=nextDescriptor;this.props=nextProps;this.state=nextState;this.context=nextContext; // Owner cannot change because shouldUpdateReactComponent doesn't allow
// it. TODO: Remove this._owner completely.
this._owner=nextDescriptor._owner;this.updateComponent(transaction,prevDescriptor);if(this.componentDidUpdate){transaction.getReactMountReady().enqueue(this.componentDidUpdate.bind(this,prevProps,prevState,prevContext),this);}},receiveComponent:function receiveComponent(nextDescriptor,transaction){if(nextDescriptor===this._descriptor&&nextDescriptor._owner!=null){ // Since descriptors are immutable after the owner is rendered,
// we can do a cheap identity compare here to determine if this is a
// superfluous reconcile. It's possible for state to be mutable but such
// change should trigger an update of the owner which would recreate
// the descriptor. We explicitly check for the existence of an owner since
// it's possible for a descriptor created outside a composite to be
// deeply mutated and reused.
return;}ReactComponent.Mixin.receiveComponent.call(this,nextDescriptor,transaction);}, /**
   * Updates the component's currently mounted DOM representation.
   *
   * By default, this implements React's rendering and reconciliation algorithm.
   * Sophisticated clients may wish to override this.
   *
   * @param {ReactReconcileTransaction} transaction
   * @param {ReactDescriptor} prevDescriptor
   * @internal
   * @overridable
   */updateComponent:ReactPerf.measure('ReactCompositeComponent','updateComponent',function(transaction,prevParentDescriptor){ReactComponent.Mixin.updateComponent.call(this,transaction,prevParentDescriptor);var prevComponentInstance=this._renderedComponent;var prevDescriptor=prevComponentInstance._descriptor;var nextDescriptor=this._renderValidatedComponent();if(shouldUpdateReactComponent(prevDescriptor,nextDescriptor)){prevComponentInstance.receiveComponent(nextDescriptor,transaction);}else { // These two IDs are actually the same! But nothing should rely on that.
var thisID=this._rootNodeID;var prevComponentID=prevComponentInstance._rootNodeID;prevComponentInstance.unmountComponent();this._renderedComponent=instantiateReactComponent(nextDescriptor);var nextMarkup=this._renderedComponent.mountComponent(thisID,transaction,this._mountDepth+1);ReactComponent.BackendIDOperations.dangerouslyReplaceNodeWithMarkupByID(prevComponentID,nextMarkup);}}), /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldUpdateComponent`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {?function} callback Called after update is complete.
   * @final
   * @protected
   */forceUpdate:function forceUpdate(callback){var compositeLifeCycleState=this._compositeLifeCycleState;"production"!==process.env.NODE_ENV?invariant(this.isMounted()||compositeLifeCycleState===CompositeLifeCycle.MOUNTING,'forceUpdate(...): Can only force an update on mounted or mounting '+'components.'):invariant(this.isMounted()||compositeLifeCycleState===CompositeLifeCycle.MOUNTING);"production"!==process.env.NODE_ENV?invariant(compositeLifeCycleState!==CompositeLifeCycle.RECEIVING_STATE&&compositeLifeCycleState!==CompositeLifeCycle.UNMOUNTING,'forceUpdate(...): Cannot force an update while unmounting component '+'or during an existing state transition (such as within `render`).'):invariant(compositeLifeCycleState!==CompositeLifeCycle.RECEIVING_STATE&&compositeLifeCycleState!==CompositeLifeCycle.UNMOUNTING);this._pendingForceUpdate=true;ReactUpdates.enqueueUpdate(this,callback);}, /**
   * @private
   */_renderValidatedComponent:ReactPerf.measure('ReactCompositeComponent','_renderValidatedComponent',function(){var renderedComponent;var previousContext=ReactContext.current;ReactContext.current=this._processChildContext(this._descriptor._context);ReactCurrentOwner.current=this;try{renderedComponent=this.render();if(renderedComponent===null||renderedComponent===false){renderedComponent=ReactEmptyComponent.getEmptyComponent();ReactEmptyComponent.registerNullComponentID(this._rootNodeID);}else {ReactEmptyComponent.deregisterNullComponentID(this._rootNodeID);}}finally {ReactContext.current=previousContext;ReactCurrentOwner.current=null;}"production"!==process.env.NODE_ENV?invariant(ReactDescriptor.isValidDescriptor(renderedComponent),'%s.render(): A valid ReactComponent must be returned. You may have '+'returned undefined, an array or some other invalid object.',this.constructor.displayName||'ReactCompositeComponent'):invariant(ReactDescriptor.isValidDescriptor(renderedComponent));return renderedComponent;}), /**
   * @private
   */_bindAutoBindMethods:function _bindAutoBindMethods(){for(var autoBindKey in this.__reactAutoBindMap){if(!this.__reactAutoBindMap.hasOwnProperty(autoBindKey)){continue;}var method=this.__reactAutoBindMap[autoBindKey];this[autoBindKey]=this._bindAutoBindMethod(ReactErrorUtils.guard(method,this.constructor.displayName+'.'+autoBindKey));}}, /**
   * Binds a method to the component.
   *
   * @param {function} method Method to be bound.
   * @private
   */_bindAutoBindMethod:function _bindAutoBindMethod(method){var component=this;var boundMethod=function boundMethod(){return method.apply(component,arguments);};if("production"!==process.env.NODE_ENV){boundMethod.__reactBoundContext=component;boundMethod.__reactBoundMethod=method;boundMethod.__reactBoundArguments=null;var componentName=component.constructor.displayName;var _bind=boundMethod.bind;boundMethod.bind=function(newThis){var args=Array.prototype.slice.call(arguments,1); // User is trying to bind() an autobound method; we effectively will
// ignore the value of "this" that the user is trying to use, so
// let's warn.
if(newThis!==component&&newThis!==null){monitorCodeUse('react_bind_warning',{component:componentName});console.warn('bind(): React component methods may only be bound to the '+'component instance. See '+componentName);}else if(!args.length){monitorCodeUse('react_bind_warning',{component:componentName});console.warn('bind(): You are binding a component method to the component. '+'React does this for you automatically in a high-performance '+'way, so you can safely remove this call. See '+componentName);return boundMethod;}var reboundMethod=_bind.apply(boundMethod,arguments);reboundMethod.__reactBoundContext=component;reboundMethod.__reactBoundMethod=method;reboundMethod.__reactBoundArguments=args;return reboundMethod;};}return boundMethod;}};var ReactCompositeComponentBase=function ReactCompositeComponentBase(){};mixInto(ReactCompositeComponentBase,ReactComponent.Mixin);mixInto(ReactCompositeComponentBase,ReactOwner.Mixin);mixInto(ReactCompositeComponentBase,ReactPropTransferer.Mixin);mixInto(ReactCompositeComponentBase,ReactCompositeComponentMixin); /**
 * Module for creating composite components.
 *
 * @class ReactCompositeComponent
 * @extends ReactComponent
 * @extends ReactOwner
 * @extends ReactPropTransferer
 */var ReactCompositeComponent={LifeCycle:CompositeLifeCycle,Base:ReactCompositeComponentBase, /**
   * Creates a composite component class given a class specification.
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */createClass:function createClass(spec){var Constructor=function Constructor(props,owner){this.construct(props,owner);};Constructor.prototype=new ReactCompositeComponentBase();Constructor.prototype.constructor=Constructor;injectedMixins.forEach(mixSpecIntoComponent.bind(null,Constructor));mixSpecIntoComponent(Constructor,spec); // Initialize the defaultProps property after all mixins have been merged
if(Constructor.getDefaultProps){Constructor.defaultProps=Constructor.getDefaultProps();}"production"!==process.env.NODE_ENV?invariant(Constructor.prototype.render,'createClass(...): Class specification must implement a `render` method.'):invariant(Constructor.prototype.render);if("production"!==process.env.NODE_ENV){if(Constructor.prototype.componentShouldUpdate){monitorCodeUse('react_component_should_update_warning',{component:spec.displayName});console.warn((spec.displayName||'A component')+' has a method called '+'componentShouldUpdate(). Did you mean shouldComponentUpdate()? '+'The name is phrased as a question because the function is '+'expected to return a value.');}} // Reduce time spent doing lookups by setting these on the prototype.
for(var methodName in ReactCompositeComponentInterface){if(!Constructor.prototype[methodName]){Constructor.prototype[methodName]=null;}}var descriptorFactory=ReactDescriptor.createFactory(Constructor);if("production"!==process.env.NODE_ENV){return ReactDescriptorValidator.createFactory(descriptorFactory,Constructor.propTypes,Constructor.contextTypes);}return descriptorFactory;},injection:{injectMixin:function injectMixin(mixin){injectedMixins.push(mixin);}}};module.exports=ReactCompositeComponent;}).call(this,require("e/U+97"));},{"./ReactComponent":34,"./ReactContext":37,"./ReactCurrentOwner":38,"./ReactDescriptor":54,"./ReactDescriptorValidator":55,"./ReactEmptyComponent":56,"./ReactErrorUtils":57,"./ReactOwner":67,"./ReactPerf":68,"./ReactPropTransferer":69,"./ReactPropTypeLocationNames":70,"./ReactPropTypeLocations":71,"./ReactUpdates":79,"./instantiateReactComponent":122,"./invariant":123,"./keyMirror":129,"./mapObject":131,"./merge":133,"./mixInto":136,"./monitorCodeUse":137,"./shouldUpdateReactComponent":143,"./warning":146,"e/U+97":3}],37:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactContext
 */"use strict";var merge=require("./merge"); /**
 * Keeps track of the current context.
 *
 * The context is automatically passed down the component ownership hierarchy
 * and is accessible via `this.context` on ReactCompositeComponents.
 */var ReactContext={ /**
   * @internal
   * @type {object}
   */current:{}, /**
   * Temporarily extends the current context while executing scopedCallback.
   *
   * A typical use case might look like
   *
   *  render: function() {
   *    var children = ReactContext.withContext({foo: 'foo'} () => (
   *
   *    ));
   *    return <div>{children}</div>;
   *  }
   *
   * @param {object} newContext New context to merge into the existing context
   * @param {function} scopedCallback Callback to run with the new context
   * @return {ReactComponent|array<ReactComponent>}
   */withContext:function withContext(newContext,scopedCallback){var result;var previousContext=ReactContext.current;ReactContext.current=merge(previousContext,newContext);try{result=scopedCallback();}finally {ReactContext.current=previousContext;}return result;}};module.exports=ReactContext;},{"./merge":133}],38:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactCurrentOwner
 */"use strict"; /**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 *
 * The depth indicate how many composite components are above this render level.
 */var ReactCurrentOwner={ /**
   * @internal
   * @type {ReactComponent}
   */current:null};module.exports=ReactCurrentOwner;},{}],39:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDOM
 * @typechecks static-only
 */"use strict";var ReactDescriptor=require("./ReactDescriptor");var ReactDescriptorValidator=require("./ReactDescriptorValidator");var ReactDOMComponent=require("./ReactDOMComponent");var mergeInto=require("./mergeInto");var mapObject=require("./mapObject"); /**
 * Creates a new React class that is idempotent and capable of containing other
 * React components. It accepts event listeners and DOM properties that are
 * valid according to `DOMProperty`.
 *
 *  - Event listeners: `onClick`, `onMouseDown`, etc.
 *  - DOM properties: `className`, `name`, `title`, etc.
 *
 * The `style` property functions differently from the DOM API. It accepts an
 * object mapping of style properties to values.
 *
 * @param {boolean} omitClose True if the close tag should be omitted.
 * @param {string} tag Tag name (e.g. `div`).
 * @private
 */function createDOMComponentClass(omitClose,tag){var Constructor=function Constructor(descriptor){this.construct(descriptor);};Constructor.prototype=new ReactDOMComponent(tag,omitClose);Constructor.prototype.constructor=Constructor;Constructor.displayName=tag;var ConvenienceConstructor=ReactDescriptor.createFactory(Constructor);if("production"!==process.env.NODE_ENV){return ReactDescriptorValidator.createFactory(ConvenienceConstructor);}return ConvenienceConstructor;} /**
 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
 * This is also accessible via `React.DOM`.
 *
 * @public
 */var ReactDOM=mapObject({a:false,abbr:false,address:false,area:true,article:false,aside:false,audio:false,b:false,base:true,bdi:false,bdo:false,big:false,blockquote:false,body:false,br:true,button:false,canvas:false,caption:false,cite:false,code:false,col:true,colgroup:false,data:false,datalist:false,dd:false,del:false,details:false,dfn:false,dialog:false,div:false,dl:false,dt:false,em:false,embed:true,fieldset:false,figcaption:false,figure:false,footer:false,form:false, // NOTE: Injected, see `ReactDOMForm`.
h1:false,h2:false,h3:false,h4:false,h5:false,h6:false,head:false,header:false,hr:true,html:false,i:false,iframe:false,img:true,input:true,ins:false,kbd:false,keygen:true,label:false,legend:false,li:false,link:true,main:false,map:false,mark:false,menu:false,menuitem:false, // NOTE: Close tag should be omitted, but causes problems.
meta:true,meter:false,nav:false,noscript:false,object:false,ol:false,optgroup:false,option:false,output:false,p:false,param:true,picture:false,pre:false,progress:false,q:false,rp:false,rt:false,ruby:false,s:false,samp:false,script:false,section:false,select:false,small:false,source:true,span:false,strong:false,style:false,sub:false,summary:false,sup:false,table:false,tbody:false,td:false,textarea:false, // NOTE: Injected, see `ReactDOMTextarea`.
tfoot:false,th:false,thead:false,time:false,title:false,tr:false,track:true,u:false,ul:false,'var':false,video:false,wbr:true, // SVG
circle:false,defs:false,ellipse:false,g:false,line:false,linearGradient:false,mask:false,path:false,pattern:false,polygon:false,polyline:false,radialGradient:false,rect:false,stop:false,svg:false,text:false,tspan:false},createDOMComponentClass);var injection={injectComponentClasses:function injectComponentClasses(componentClasses){mergeInto(ReactDOM,componentClasses);}};ReactDOM.injection=injection;module.exports=ReactDOM;}).call(this,require("e/U+97"));},{"./ReactDOMComponent":41,"./ReactDescriptor":54,"./ReactDescriptorValidator":55,"./mapObject":131,"./mergeInto":135,"e/U+97":3}],40:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDOMButton
 */"use strict";var AutoFocusMixin=require("./AutoFocusMixin");var ReactBrowserComponentMixin=require("./ReactBrowserComponentMixin");var ReactCompositeComponent=require("./ReactCompositeComponent");var ReactDOM=require("./ReactDOM");var keyMirror=require("./keyMirror"); // Store a reference to the <button> `ReactDOMComponent`.
var button=ReactDOM.button;var mouseListenerNames=keyMirror({onClick:true,onDoubleClick:true,onMouseDown:true,onMouseMove:true,onMouseUp:true,onClickCapture:true,onDoubleClickCapture:true,onMouseDownCapture:true,onMouseMoveCapture:true,onMouseUpCapture:true}); /**
 * Implements a <button> native component that does not receive mouse events
 * when `disabled` is set.
 */var ReactDOMButton=ReactCompositeComponent.createClass({displayName:'ReactDOMButton',mixins:[AutoFocusMixin,ReactBrowserComponentMixin],render:function render(){var props={}; // Copy the props; except the mouse listeners if we're disabled
for(var key in this.props){if(this.props.hasOwnProperty(key)&&(!this.props.disabled||!mouseListenerNames[key])){props[key]=this.props[key];}}return button(props,this.props.children);}});module.exports=ReactDOMButton;},{"./AutoFocusMixin":4,"./ReactBrowserComponentMixin":31,"./ReactCompositeComponent":36,"./ReactDOM":39,"./keyMirror":129}],41:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDOMComponent
 * @typechecks static-only
 */"use strict";var CSSPropertyOperations=require("./CSSPropertyOperations");var DOMProperty=require("./DOMProperty");var DOMPropertyOperations=require("./DOMPropertyOperations");var ReactBrowserComponentMixin=require("./ReactBrowserComponentMixin");var ReactComponent=require("./ReactComponent");var ReactBrowserEventEmitter=require("./ReactBrowserEventEmitter");var ReactMount=require("./ReactMount");var ReactMultiChild=require("./ReactMultiChild");var ReactPerf=require("./ReactPerf");var escapeTextForBrowser=require("./escapeTextForBrowser");var invariant=require("./invariant");var keyOf=require("./keyOf");var merge=require("./merge");var mixInto=require("./mixInto");var deleteListener=ReactBrowserEventEmitter.deleteListener;var listenTo=ReactBrowserEventEmitter.listenTo;var registrationNameModules=ReactBrowserEventEmitter.registrationNameModules; // For quickly matching children type, to test if can be treated as content.
var CONTENT_TYPES={'string':true,'number':true};var STYLE=keyOf({style:null});var ELEMENT_NODE_TYPE=1; /**
 * @param {?object} props
 */function assertValidProps(props){if(!props){return;} // Note the use of `==` which checks for null or undefined.
"production"!==process.env.NODE_ENV?invariant(props.children==null||props.dangerouslySetInnerHTML==null,'Can only set one of `children` or `props.dangerouslySetInnerHTML`.'):invariant(props.children==null||props.dangerouslySetInnerHTML==null);"production"!==process.env.NODE_ENV?invariant(props.style==null||_typeof(props.style)==='object','The `style` prop expects a mapping from style properties to values, '+'not a string.'):invariant(props.style==null||_typeof(props.style)==='object');}function putListener(id,registrationName,listener,transaction){var container=ReactMount.findReactContainerForID(id);if(container){var doc=container.nodeType===ELEMENT_NODE_TYPE?container.ownerDocument:container;listenTo(registrationName,doc);}transaction.getPutListenerQueue().enqueuePutListener(id,registrationName,listener);} /**
 * @constructor ReactDOMComponent
 * @extends ReactComponent
 * @extends ReactMultiChild
 */function ReactDOMComponent(tag,omitClose){this._tagOpen='<'+tag;this._tagClose=omitClose?'':'</'+tag+'>';this.tagName=tag.toUpperCase();}ReactDOMComponent.Mixin={ /**
   * Generates root tag markup then recurses. This method has side effects and
   * is not idempotent.
   *
   * @internal
   * @param {string} rootID The root DOM ID for this node.
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @param {number} mountDepth number of components in the owner hierarchy
   * @return {string} The computed markup.
   */mountComponent:ReactPerf.measure('ReactDOMComponent','mountComponent',function(rootID,transaction,mountDepth){ReactComponent.Mixin.mountComponent.call(this,rootID,transaction,mountDepth);assertValidProps(this.props);return this._createOpenTagMarkupAndPutListeners(transaction)+this._createContentMarkup(transaction)+this._tagClose;}), /**
   * Creates markup for the open tag and all attributes.
   *
   * This method has side effects because events get registered.
   *
   * Iterating over object properties is faster than iterating over arrays.
   * @see http://jsperf.com/obj-vs-arr-iteration
   *
   * @private
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @return {string} Markup of opening tag.
   */_createOpenTagMarkupAndPutListeners:function _createOpenTagMarkupAndPutListeners(transaction){var props=this.props;var ret=this._tagOpen;for(var propKey in props){if(!props.hasOwnProperty(propKey)){continue;}var propValue=props[propKey];if(propValue==null){continue;}if(registrationNameModules.hasOwnProperty(propKey)){putListener(this._rootNodeID,propKey,propValue,transaction);}else {if(propKey===STYLE){if(propValue){propValue=props.style=merge(props.style);}propValue=CSSPropertyOperations.createMarkupForStyles(propValue);}var markup=DOMPropertyOperations.createMarkupForProperty(propKey,propValue);if(markup){ret+=' '+markup;}}} // For static pages, no need to put React ID and checksum. Saves lots of
// bytes.
if(transaction.renderToStaticMarkup){return ret+'>';}var markupForID=DOMPropertyOperations.createMarkupForID(this._rootNodeID);return ret+' '+markupForID+'>';}, /**
   * Creates markup for the content between the tags.
   *
   * @private
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @return {string} Content markup.
   */_createContentMarkup:function _createContentMarkup(transaction){ // Intentional use of != to avoid catching zero/false.
var innerHTML=this.props.dangerouslySetInnerHTML;if(innerHTML!=null){if(innerHTML.__html!=null){return innerHTML.__html;}}else {var contentToUse=CONTENT_TYPES[_typeof(this.props.children)]?this.props.children:null;var childrenToUse=contentToUse!=null?null:this.props.children;if(contentToUse!=null){return escapeTextForBrowser(contentToUse);}else if(childrenToUse!=null){var mountImages=this.mountChildren(childrenToUse,transaction);return mountImages.join('');}}return '';},receiveComponent:function receiveComponent(nextDescriptor,transaction){if(nextDescriptor===this._descriptor&&nextDescriptor._owner!=null){ // Since descriptors are immutable after the owner is rendered,
// we can do a cheap identity compare here to determine if this is a
// superfluous reconcile. It's possible for state to be mutable but such
// change should trigger an update of the owner which would recreate
// the descriptor. We explicitly check for the existence of an owner since
// it's possible for a descriptor created outside a composite to be
// deeply mutated and reused.
return;}ReactComponent.Mixin.receiveComponent.call(this,nextDescriptor,transaction);}, /**
   * Updates a native DOM component after it has already been allocated and
   * attached to the DOM. Reconciles the root DOM node, then recurses.
   *
   * @param {ReactReconcileTransaction} transaction
   * @param {ReactDescriptor} prevDescriptor
   * @internal
   * @overridable
   */updateComponent:ReactPerf.measure('ReactDOMComponent','updateComponent',function(transaction,prevDescriptor){assertValidProps(this._descriptor.props);ReactComponent.Mixin.updateComponent.call(this,transaction,prevDescriptor);this._updateDOMProperties(prevDescriptor.props,transaction);this._updateDOMChildren(prevDescriptor.props,transaction);}), /**
   * Reconciles the properties by detecting differences in property values and
   * updating the DOM as necessary. This function is probably the single most
   * critical path for performance optimization.
   *
   * TODO: Benchmark whether checking for changed values in memory actually
   *       improves performance (especially statically positioned elements).
   * TODO: Benchmark the effects of putting this at the top since 99% of props
   *       do not change for a given reconciliation.
   * TODO: Benchmark areas that can be improved with caching.
   *
   * @private
   * @param {object} lastProps
   * @param {ReactReconcileTransaction} transaction
   */_updateDOMProperties:function _updateDOMProperties(lastProps,transaction){var nextProps=this.props;var propKey;var styleName;var styleUpdates;for(propKey in lastProps){if(nextProps.hasOwnProperty(propKey)||!lastProps.hasOwnProperty(propKey)){continue;}if(propKey===STYLE){var lastStyle=lastProps[propKey];for(styleName in lastStyle){if(lastStyle.hasOwnProperty(styleName)){styleUpdates=styleUpdates||{};styleUpdates[styleName]='';}}}else if(registrationNameModules.hasOwnProperty(propKey)){deleteListener(this._rootNodeID,propKey);}else if(DOMProperty.isStandardName[propKey]||DOMProperty.isCustomAttribute(propKey)){ReactComponent.BackendIDOperations.deletePropertyByID(this._rootNodeID,propKey);}}for(propKey in nextProps){var nextProp=nextProps[propKey];var lastProp=lastProps[propKey];if(!nextProps.hasOwnProperty(propKey)||nextProp===lastProp){continue;}if(propKey===STYLE){if(nextProp){nextProp=nextProps.style=merge(nextProp);}if(lastProp){ // Unset styles on `lastProp` but not on `nextProp`.
for(styleName in lastProp){if(lastProp.hasOwnProperty(styleName)&&(!nextProp||!nextProp.hasOwnProperty(styleName))){styleUpdates=styleUpdates||{};styleUpdates[styleName]='';}} // Update styles that changed since `lastProp`.
for(styleName in nextProp){if(nextProp.hasOwnProperty(styleName)&&lastProp[styleName]!==nextProp[styleName]){styleUpdates=styleUpdates||{};styleUpdates[styleName]=nextProp[styleName];}}}else { // Relies on `updateStylesByID` not mutating `styleUpdates`.
styleUpdates=nextProp;}}else if(registrationNameModules.hasOwnProperty(propKey)){putListener(this._rootNodeID,propKey,nextProp,transaction);}else if(DOMProperty.isStandardName[propKey]||DOMProperty.isCustomAttribute(propKey)){ReactComponent.BackendIDOperations.updatePropertyByID(this._rootNodeID,propKey,nextProp);}}if(styleUpdates){ReactComponent.BackendIDOperations.updateStylesByID(this._rootNodeID,styleUpdates);}}, /**
   * Reconciles the children with the various properties that affect the
   * children content.
   *
   * @param {object} lastProps
   * @param {ReactReconcileTransaction} transaction
   */_updateDOMChildren:function _updateDOMChildren(lastProps,transaction){var nextProps=this.props;var lastContent=CONTENT_TYPES[_typeof(lastProps.children)]?lastProps.children:null;var nextContent=CONTENT_TYPES[_typeof(nextProps.children)]?nextProps.children:null;var lastHtml=lastProps.dangerouslySetInnerHTML&&lastProps.dangerouslySetInnerHTML.__html;var nextHtml=nextProps.dangerouslySetInnerHTML&&nextProps.dangerouslySetInnerHTML.__html; // Note the use of `!=` which checks for null or undefined.
var lastChildren=lastContent!=null?null:lastProps.children;var nextChildren=nextContent!=null?null:nextProps.children; // If we're switching from children to content/html or vice versa, remove
// the old content
var lastHasContentOrHtml=lastContent!=null||lastHtml!=null;var nextHasContentOrHtml=nextContent!=null||nextHtml!=null;if(lastChildren!=null&&nextChildren==null){this.updateChildren(null,transaction);}else if(lastHasContentOrHtml&&!nextHasContentOrHtml){this.updateTextContent('');}if(nextContent!=null){if(lastContent!==nextContent){this.updateTextContent(''+nextContent);}}else if(nextHtml!=null){if(lastHtml!==nextHtml){ReactComponent.BackendIDOperations.updateInnerHTMLByID(this._rootNodeID,nextHtml);}}else if(nextChildren!=null){this.updateChildren(nextChildren,transaction);}}, /**
   * Destroys all event registrations for this instance. Does not remove from
   * the DOM. That must be done by the parent.
   *
   * @internal
   */unmountComponent:function unmountComponent(){this.unmountChildren();ReactBrowserEventEmitter.deleteAllListeners(this._rootNodeID);ReactComponent.Mixin.unmountComponent.call(this);}};mixInto(ReactDOMComponent,ReactComponent.Mixin);mixInto(ReactDOMComponent,ReactDOMComponent.Mixin);mixInto(ReactDOMComponent,ReactMultiChild.Mixin);mixInto(ReactDOMComponent,ReactBrowserComponentMixin);module.exports=ReactDOMComponent;}).call(this,require("e/U+97"));},{"./CSSPropertyOperations":7,"./DOMProperty":13,"./DOMPropertyOperations":14,"./ReactBrowserComponentMixin":31,"./ReactBrowserEventEmitter":32,"./ReactComponent":34,"./ReactMount":64,"./ReactMultiChild":65,"./ReactPerf":68,"./escapeTextForBrowser":107,"./invariant":123,"./keyOf":130,"./merge":133,"./mixInto":136,"e/U+97":3}],42:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDOMForm
 */"use strict";var EventConstants=require("./EventConstants");var LocalEventTrapMixin=require("./LocalEventTrapMixin");var ReactBrowserComponentMixin=require("./ReactBrowserComponentMixin");var ReactCompositeComponent=require("./ReactCompositeComponent");var ReactDOM=require("./ReactDOM"); // Store a reference to the <form> `ReactDOMComponent`.
var form=ReactDOM.form; /**
 * Since onSubmit doesn't bubble OR capture on the top level in IE8, we need
 * to capture it on the <form> element itself. There are lots of hacks we could
 * do to accomplish this, but the most reliable is to make <form> a
 * composite component and use `componentDidMount` to attach the event handlers.
 */var ReactDOMForm=ReactCompositeComponent.createClass({displayName:'ReactDOMForm',mixins:[ReactBrowserComponentMixin,LocalEventTrapMixin],render:function render(){ // TODO: Instead of using `ReactDOM` directly, we should use JSX. However,
// `jshint` fails to parse JSX so in order for linting to work in the open
// source repo, we need to just use `ReactDOM.form`.
return this.transferPropsTo(form(null,this.props.children));},componentDidMount:function componentDidMount(){this.trapBubbledEvent(EventConstants.topLevelTypes.topReset,'reset');this.trapBubbledEvent(EventConstants.topLevelTypes.topSubmit,'submit');}});module.exports=ReactDOMForm;},{"./EventConstants":18,"./LocalEventTrapMixin":27,"./ReactBrowserComponentMixin":31,"./ReactCompositeComponent":36,"./ReactDOM":39}],43:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDOMIDOperations
 * @typechecks static-only
 */ /*jslint evil: true */"use strict";var CSSPropertyOperations=require("./CSSPropertyOperations");var DOMChildrenOperations=require("./DOMChildrenOperations");var DOMPropertyOperations=require("./DOMPropertyOperations");var ReactMount=require("./ReactMount");var ReactPerf=require("./ReactPerf");var invariant=require("./invariant");var setInnerHTML=require("./setInnerHTML"); /**
 * Errors for properties that should not be updated with `updatePropertyById()`.
 *
 * @type {object}
 * @private
 */var INVALID_PROPERTY_ERRORS={dangerouslySetInnerHTML:'`dangerouslySetInnerHTML` must be set using `updateInnerHTMLByID()`.',style:'`style` must be set using `updateStylesByID()`.'}; /**
 * Operations used to process updates to DOM nodes. This is made injectable via
 * `ReactComponent.BackendIDOperations`.
 */var ReactDOMIDOperations={ /**
   * Updates a DOM node with new property values. This should only be used to
   * update DOM properties in `DOMProperty`.
   *
   * @param {string} id ID of the node to update.
   * @param {string} name A valid property name, see `DOMProperty`.
   * @param {*} value New value of the property.
   * @internal
   */updatePropertyByID:ReactPerf.measure('ReactDOMIDOperations','updatePropertyByID',function(id,name,value){var node=ReactMount.getNode(id);"production"!==process.env.NODE_ENV?invariant(!INVALID_PROPERTY_ERRORS.hasOwnProperty(name),'updatePropertyByID(...): %s',INVALID_PROPERTY_ERRORS[name]):invariant(!INVALID_PROPERTY_ERRORS.hasOwnProperty(name)); // If we're updating to null or undefined, we should remove the property
// from the DOM node instead of inadvertantly setting to a string. This
// brings us in line with the same behavior we have on initial render.
if(value!=null){DOMPropertyOperations.setValueForProperty(node,name,value);}else {DOMPropertyOperations.deleteValueForProperty(node,name);}}), /**
   * Updates a DOM node to remove a property. This should only be used to remove
   * DOM properties in `DOMProperty`.
   *
   * @param {string} id ID of the node to update.
   * @param {string} name A property name to remove, see `DOMProperty`.
   * @internal
   */deletePropertyByID:ReactPerf.measure('ReactDOMIDOperations','deletePropertyByID',function(id,name,value){var node=ReactMount.getNode(id);"production"!==process.env.NODE_ENV?invariant(!INVALID_PROPERTY_ERRORS.hasOwnProperty(name),'updatePropertyByID(...): %s',INVALID_PROPERTY_ERRORS[name]):invariant(!INVALID_PROPERTY_ERRORS.hasOwnProperty(name));DOMPropertyOperations.deleteValueForProperty(node,name,value);}), /**
   * Updates a DOM node with new style values. If a value is specified as '',
   * the corresponding style property will be unset.
   *
   * @param {string} id ID of the node to update.
   * @param {object} styles Mapping from styles to values.
   * @internal
   */updateStylesByID:ReactPerf.measure('ReactDOMIDOperations','updateStylesByID',function(id,styles){var node=ReactMount.getNode(id);CSSPropertyOperations.setValueForStyles(node,styles);}), /**
   * Updates a DOM node's innerHTML.
   *
   * @param {string} id ID of the node to update.
   * @param {string} html An HTML string.
   * @internal
   */updateInnerHTMLByID:ReactPerf.measure('ReactDOMIDOperations','updateInnerHTMLByID',function(id,html){var node=ReactMount.getNode(id);setInnerHTML(node,html);}), /**
   * Updates a DOM node's text content set by `props.content`.
   *
   * @param {string} id ID of the node to update.
   * @param {string} content Text content.
   * @internal
   */updateTextContentByID:ReactPerf.measure('ReactDOMIDOperations','updateTextContentByID',function(id,content){var node=ReactMount.getNode(id);DOMChildrenOperations.updateTextContent(node,content);}), /**
   * Replaces a DOM node that exists in the document with markup.
   *
   * @param {string} id ID of child to be replaced.
   * @param {string} markup Dangerous markup to inject in place of child.
   * @internal
   * @see {Danger.dangerouslyReplaceNodeWithMarkup}
   */dangerouslyReplaceNodeWithMarkupByID:ReactPerf.measure('ReactDOMIDOperations','dangerouslyReplaceNodeWithMarkupByID',function(id,markup){var node=ReactMount.getNode(id);DOMChildrenOperations.dangerouslyReplaceNodeWithMarkup(node,markup);}), /**
   * Updates a component's children by processing a series of updates.
   *
   * @param {array<object>} updates List of update configurations.
   * @param {array<string>} markup List of markup strings.
   * @internal
   */dangerouslyProcessChildrenUpdates:ReactPerf.measure('ReactDOMIDOperations','dangerouslyProcessChildrenUpdates',function(updates,markup){for(var i=0;i<updates.length;i++){updates[i].parentNode=ReactMount.getNode(updates[i].parentID);}DOMChildrenOperations.processUpdates(updates,markup);})};module.exports=ReactDOMIDOperations;}).call(this,require("e/U+97"));},{"./CSSPropertyOperations":7,"./DOMChildrenOperations":12,"./DOMPropertyOperations":14,"./ReactMount":64,"./ReactPerf":68,"./invariant":123,"./setInnerHTML":141,"e/U+97":3}],44:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDOMImg
 */"use strict";var EventConstants=require("./EventConstants");var LocalEventTrapMixin=require("./LocalEventTrapMixin");var ReactBrowserComponentMixin=require("./ReactBrowserComponentMixin");var ReactCompositeComponent=require("./ReactCompositeComponent");var ReactDOM=require("./ReactDOM"); // Store a reference to the <img> `ReactDOMComponent`.
var img=ReactDOM.img; /**
 * Since onLoad doesn't bubble OR capture on the top level in IE8, we need to
 * capture it on the <img> element itself. There are lots of hacks we could do
 * to accomplish this, but the most reliable is to make <img> a composite
 * component and use `componentDidMount` to attach the event handlers.
 */var ReactDOMImg=ReactCompositeComponent.createClass({displayName:'ReactDOMImg',tagName:'IMG',mixins:[ReactBrowserComponentMixin,LocalEventTrapMixin],render:function render(){return img(this.props);},componentDidMount:function componentDidMount(){this.trapBubbledEvent(EventConstants.topLevelTypes.topLoad,'load');this.trapBubbledEvent(EventConstants.topLevelTypes.topError,'error');}});module.exports=ReactDOMImg;},{"./EventConstants":18,"./LocalEventTrapMixin":27,"./ReactBrowserComponentMixin":31,"./ReactCompositeComponent":36,"./ReactDOM":39}],45:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDOMInput
 */"use strict";var AutoFocusMixin=require("./AutoFocusMixin");var DOMPropertyOperations=require("./DOMPropertyOperations");var LinkedValueUtils=require("./LinkedValueUtils");var ReactBrowserComponentMixin=require("./ReactBrowserComponentMixin");var ReactCompositeComponent=require("./ReactCompositeComponent");var ReactDOM=require("./ReactDOM");var ReactMount=require("./ReactMount");var invariant=require("./invariant");var merge=require("./merge"); // Store a reference to the <input> `ReactDOMComponent`.
var input=ReactDOM.input;var instancesByReactID={}; /**
 * Implements an <input> native component that allows setting these optional
 * props: `checked`, `value`, `defaultChecked`, and `defaultValue`.
 *
 * If `checked` or `value` are not supplied (or null/undefined), user actions
 * that affect the checked state or value will trigger updates to the element.
 *
 * If they are supplied (and not null/undefined), the rendered element will not
 * trigger updates to the element. Instead, the props must change in order for
 * the rendered element to be updated.
 *
 * The rendered element will be initialized as unchecked (or `defaultChecked`)
 * with an empty value (or `defaultValue`).
 *
 * @see http://www.w3.org/TR/2012/WD-html5-20121025/the-input-element.html
 */var ReactDOMInput=ReactCompositeComponent.createClass({displayName:'ReactDOMInput',mixins:[AutoFocusMixin,LinkedValueUtils.Mixin,ReactBrowserComponentMixin],getInitialState:function getInitialState(){var defaultValue=this.props.defaultValue;return {checked:this.props.defaultChecked||false,value:defaultValue!=null?defaultValue:null};},shouldComponentUpdate:function shouldComponentUpdate(){ // Defer any updates to this component during the `onChange` handler.
return !this._isChanging;},render:function render(){ // Clone `this.props` so we don't mutate the input.
var props=merge(this.props);props.defaultChecked=null;props.defaultValue=null;var value=LinkedValueUtils.getValue(this);props.value=value!=null?value:this.state.value;var checked=LinkedValueUtils.getChecked(this);props.checked=checked!=null?checked:this.state.checked;props.onChange=this._handleChange;return input(props,this.props.children);},componentDidMount:function componentDidMount(){var id=ReactMount.getID(this.getDOMNode());instancesByReactID[id]=this;},componentWillUnmount:function componentWillUnmount(){var rootNode=this.getDOMNode();var id=ReactMount.getID(rootNode);delete instancesByReactID[id];},componentDidUpdate:function componentDidUpdate(prevProps,prevState,prevContext){var rootNode=this.getDOMNode();if(this.props.checked!=null){DOMPropertyOperations.setValueForProperty(rootNode,'checked',this.props.checked||false);}var value=LinkedValueUtils.getValue(this);if(value!=null){ // Cast `value` to a string to ensure the value is set correctly. While
// browsers typically do this as necessary, jsdom doesn't.
DOMPropertyOperations.setValueForProperty(rootNode,'value',''+value);}},_handleChange:function _handleChange(event){var returnValue;var onChange=LinkedValueUtils.getOnChange(this);if(onChange){this._isChanging=true;returnValue=onChange.call(this,event);this._isChanging=false;}this.setState({checked:event.target.checked,value:event.target.value});var name=this.props.name;if(this.props.type==='radio'&&name!=null){var rootNode=this.getDOMNode();var queryRoot=rootNode;while(queryRoot.parentNode){queryRoot=queryRoot.parentNode;} // If `rootNode.form` was non-null, then we could try `form.elements`,
// but that sometimes behaves strangely in IE8. We could also try using
// `form.getElementsByName`, but that will only return direct children
// and won't include inputs that use the HTML5 `form=` attribute. Since
// the input might not even be in a form, let's just use the global
// `querySelectorAll` to ensure we don't miss anything.
var group=queryRoot.querySelectorAll('input[name='+JSON.stringify(''+name)+'][type="radio"]');for(var i=0,groupLen=group.length;i<groupLen;i++){var otherNode=group[i];if(otherNode===rootNode||otherNode.form!==rootNode.form){continue;}var otherID=ReactMount.getID(otherNode);"production"!==process.env.NODE_ENV?invariant(otherID,'ReactDOMInput: Mixing React and non-React radio inputs with the '+'same `name` is not supported.'):invariant(otherID);var otherInstance=instancesByReactID[otherID];"production"!==process.env.NODE_ENV?invariant(otherInstance,'ReactDOMInput: Unknown radio button ID %s.',otherID):invariant(otherInstance); // In some cases, this will actually change the `checked` state value.
// In other cases, there's no change but this forces a reconcile upon
// which componentDidUpdate will reset the DOM property to whatever it
// should be.
otherInstance.setState({checked:false});}}return returnValue;}});module.exports=ReactDOMInput;}).call(this,require("e/U+97"));},{"./AutoFocusMixin":4,"./DOMPropertyOperations":14,"./LinkedValueUtils":26,"./ReactBrowserComponentMixin":31,"./ReactCompositeComponent":36,"./ReactDOM":39,"./ReactMount":64,"./invariant":123,"./merge":133,"e/U+97":3}],46:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDOMOption
 */"use strict";var ReactBrowserComponentMixin=require("./ReactBrowserComponentMixin");var ReactCompositeComponent=require("./ReactCompositeComponent");var ReactDOM=require("./ReactDOM");var warning=require("./warning"); // Store a reference to the <option> `ReactDOMComponent`.
var option=ReactDOM.option; /**
 * Implements an <option> native component that warns when `selected` is set.
 */var ReactDOMOption=ReactCompositeComponent.createClass({displayName:'ReactDOMOption',mixins:[ReactBrowserComponentMixin],componentWillMount:function componentWillMount(){ // TODO (yungsters): Remove support for `selected` in <option>.
if("production"!==process.env.NODE_ENV){"production"!==process.env.NODE_ENV?warning(this.props.selected==null,'Use the `defaultValue` or `value` props on <select> instead of '+'setting `selected` on <option>.'):null;}},render:function render(){return option(this.props,this.props.children);}});module.exports=ReactDOMOption;}).call(this,require("e/U+97"));},{"./ReactBrowserComponentMixin":31,"./ReactCompositeComponent":36,"./ReactDOM":39,"./warning":146,"e/U+97":3}],47:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDOMSelect
 */"use strict";var AutoFocusMixin=require("./AutoFocusMixin");var LinkedValueUtils=require("./LinkedValueUtils");var ReactBrowserComponentMixin=require("./ReactBrowserComponentMixin");var ReactCompositeComponent=require("./ReactCompositeComponent");var ReactDOM=require("./ReactDOM");var merge=require("./merge"); // Store a reference to the <select> `ReactDOMComponent`.
var select=ReactDOM.select; /**
 * Validation function for `value` and `defaultValue`.
 * @private
 */function selectValueType(props,propName,componentName){if(props[propName]==null){return;}if(props.multiple){if(!Array.isArray(props[propName])){return new Error("The `"+propName+"` prop supplied to <select> must be an array if "+"`multiple` is true.");}}else {if(Array.isArray(props[propName])){return new Error("The `"+propName+"` prop supplied to <select> must be a scalar "+"value if `multiple` is false.");}}} /**
 * If `value` is supplied, updates <option> elements on mount and update.
 * @param {ReactComponent} component Instance of ReactDOMSelect
 * @param {?*} propValue For uncontrolled components, null/undefined. For
 * controlled components, a string (or with `multiple`, a list of strings).
 * @private
 */function updateOptions(component,propValue){var multiple=component.props.multiple;var value=propValue!=null?propValue:component.state.value;var options=component.getDOMNode().options;var selectedValue,i,l;if(multiple){selectedValue={};for(i=0,l=value.length;i<l;++i){selectedValue[''+value[i]]=true;}}else {selectedValue=''+value;}for(i=0,l=options.length;i<l;i++){var selected=multiple?selectedValue.hasOwnProperty(options[i].value):options[i].value===selectedValue;if(selected!==options[i].selected){options[i].selected=selected;}}} /**
 * Implements a <select> native component that allows optionally setting the
 * props `value` and `defaultValue`. If `multiple` is false, the prop must be a
 * string. If `multiple` is true, the prop must be an array of strings.
 *
 * If `value` is not supplied (or null/undefined), user actions that change the
 * selected option will trigger updates to the rendered options.
 *
 * If it is supplied (and not null/undefined), the rendered options will not
 * update in response to user actions. Instead, the `value` prop must change in
 * order for the rendered options to update.
 *
 * If `defaultValue` is provided, any options with the supplied values will be
 * selected.
 */var ReactDOMSelect=ReactCompositeComponent.createClass({displayName:'ReactDOMSelect',mixins:[AutoFocusMixin,LinkedValueUtils.Mixin,ReactBrowserComponentMixin],propTypes:{defaultValue:selectValueType,value:selectValueType},getInitialState:function getInitialState(){return {value:this.props.defaultValue||(this.props.multiple?[]:'')};},componentWillReceiveProps:function componentWillReceiveProps(nextProps){if(!this.props.multiple&&nextProps.multiple){this.setState({value:[this.state.value]});}else if(this.props.multiple&&!nextProps.multiple){this.setState({value:this.state.value[0]});}},shouldComponentUpdate:function shouldComponentUpdate(){ // Defer any updates to this component during the `onChange` handler.
return !this._isChanging;},render:function render(){ // Clone `this.props` so we don't mutate the input.
var props=merge(this.props);props.onChange=this._handleChange;props.value=null;return select(props,this.props.children);},componentDidMount:function componentDidMount(){updateOptions(this,LinkedValueUtils.getValue(this));},componentDidUpdate:function componentDidUpdate(prevProps){var value=LinkedValueUtils.getValue(this);var prevMultiple=!!prevProps.multiple;var multiple=!!this.props.multiple;if(value!=null||prevMultiple!==multiple){updateOptions(this,value);}},_handleChange:function _handleChange(event){var returnValue;var onChange=LinkedValueUtils.getOnChange(this);if(onChange){this._isChanging=true;returnValue=onChange.call(this,event);this._isChanging=false;}var selectedValue;if(this.props.multiple){selectedValue=[];var options=event.target.options;for(var i=0,l=options.length;i<l;i++){if(options[i].selected){selectedValue.push(options[i].value);}}}else {selectedValue=event.target.value;}this.setState({value:selectedValue});return returnValue;}});module.exports=ReactDOMSelect;},{"./AutoFocusMixin":4,"./LinkedValueUtils":26,"./ReactBrowserComponentMixin":31,"./ReactCompositeComponent":36,"./ReactDOM":39,"./merge":133}],48:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDOMSelection
 */"use strict";var ExecutionEnvironment=require("./ExecutionEnvironment");var getNodeForCharacterOffset=require("./getNodeForCharacterOffset");var getTextContentAccessor=require("./getTextContentAccessor"); /**
 * While `isCollapsed` is available on the Selection object and `collapsed`
 * is available on the Range object, IE11 sometimes gets them wrong.
 * If the anchor/focus nodes and offsets are the same, the range is collapsed.
 */function isCollapsed(anchorNode,anchorOffset,focusNode,focusOffset){return anchorNode===focusNode&&anchorOffset===focusOffset;} /**
 * Get the appropriate anchor and focus node/offset pairs for IE.
 *
 * The catch here is that IE's selection API doesn't provide information
 * about whether the selection is forward or backward, so we have to
 * behave as though it's always forward.
 *
 * IE text differs from modern selection in that it behaves as though
 * block elements end with a new line. This means character offsets will
 * differ between the two APIs.
 *
 * @param {DOMElement} node
 * @return {object}
 */function getIEOffsets(node){var selection=document.selection;var selectedRange=selection.createRange();var selectedLength=selectedRange.text.length; // Duplicate selection so we can move range without breaking user selection.
var fromStart=selectedRange.duplicate();fromStart.moveToElementText(node);fromStart.setEndPoint('EndToStart',selectedRange);var startOffset=fromStart.text.length;var endOffset=startOffset+selectedLength;return {start:startOffset,end:endOffset};} /**
 * @param {DOMElement} node
 * @return {?object}
 */function getModernOffsets(node){var selection=window.getSelection();if(selection.rangeCount===0){return null;}var anchorNode=selection.anchorNode;var anchorOffset=selection.anchorOffset;var focusNode=selection.focusNode;var focusOffset=selection.focusOffset;var currentRange=selection.getRangeAt(0); // If the node and offset values are the same, the selection is collapsed.
// `Selection.isCollapsed` is available natively, but IE sometimes gets
// this value wrong.
var isSelectionCollapsed=isCollapsed(selection.anchorNode,selection.anchorOffset,selection.focusNode,selection.focusOffset);var rangeLength=isSelectionCollapsed?0:currentRange.toString().length;var tempRange=currentRange.cloneRange();tempRange.selectNodeContents(node);tempRange.setEnd(currentRange.startContainer,currentRange.startOffset);var isTempRangeCollapsed=isCollapsed(tempRange.startContainer,tempRange.startOffset,tempRange.endContainer,tempRange.endOffset);var start=isTempRangeCollapsed?0:tempRange.toString().length;var end=start+rangeLength; // Detect whether the selection is backward.
var detectionRange=document.createRange();detectionRange.setStart(anchorNode,anchorOffset);detectionRange.setEnd(focusNode,focusOffset);var isBackward=detectionRange.collapsed;detectionRange.detach();return {start:isBackward?end:start,end:isBackward?start:end};} /**
 * @param {DOMElement|DOMTextNode} node
 * @param {object} offsets
 */function setIEOffsets(node,offsets){var range=document.selection.createRange().duplicate();var start,end;if(typeof offsets.end==='undefined'){start=offsets.start;end=start;}else if(offsets.start>offsets.end){start=offsets.end;end=offsets.start;}else {start=offsets.start;end=offsets.end;}range.moveToElementText(node);range.moveStart('character',start);range.setEndPoint('EndToStart',range);range.moveEnd('character',end-start);range.select();} /**
 * In modern non-IE browsers, we can support both forward and backward
 * selections.
 *
 * Note: IE10+ supports the Selection object, but it does not support
 * the `extend` method, which means that even in modern IE, it's not possible
 * to programatically create a backward selection. Thus, for all IE
 * versions, we use the old IE API to create our selections.
 *
 * @param {DOMElement|DOMTextNode} node
 * @param {object} offsets
 */function setModernOffsets(node,offsets){var selection=window.getSelection();var length=node[getTextContentAccessor()].length;var start=Math.min(offsets.start,length);var end=typeof offsets.end==='undefined'?start:Math.min(offsets.end,length); // IE 11 uses modern selection, but doesn't support the extend method.
// Flip backward selections, so we can set with a single range.
if(!selection.extend&&start>end){var temp=end;end=start;start=temp;}var startMarker=getNodeForCharacterOffset(node,start);var endMarker=getNodeForCharacterOffset(node,end);if(startMarker&&endMarker){var range=document.createRange();range.setStart(startMarker.node,startMarker.offset);selection.removeAllRanges();if(start>end){selection.addRange(range);selection.extend(endMarker.node,endMarker.offset);}else {range.setEnd(endMarker.node,endMarker.offset);selection.addRange(range);}range.detach();}}var useIEOffsets=ExecutionEnvironment.canUseDOM&&document.selection;var ReactDOMSelection={ /**
   * @param {DOMElement} node
   */getOffsets:useIEOffsets?getIEOffsets:getModernOffsets, /**
   * @param {DOMElement|DOMTextNode} node
   * @param {object} offsets
   */setOffsets:useIEOffsets?setIEOffsets:setModernOffsets};module.exports=ReactDOMSelection;},{"./ExecutionEnvironment":24,"./getNodeForCharacterOffset":116,"./getTextContentAccessor":118}],49:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDOMTextarea
 */"use strict";var AutoFocusMixin=require("./AutoFocusMixin");var DOMPropertyOperations=require("./DOMPropertyOperations");var LinkedValueUtils=require("./LinkedValueUtils");var ReactBrowserComponentMixin=require("./ReactBrowserComponentMixin");var ReactCompositeComponent=require("./ReactCompositeComponent");var ReactDOM=require("./ReactDOM");var invariant=require("./invariant");var merge=require("./merge");var warning=require("./warning"); // Store a reference to the <textarea> `ReactDOMComponent`.
var textarea=ReactDOM.textarea; /**
 * Implements a <textarea> native component that allows setting `value`, and
 * `defaultValue`. This differs from the traditional DOM API because value is
 * usually set as PCDATA children.
 *
 * If `value` is not supplied (or null/undefined), user actions that affect the
 * value will trigger updates to the element.
 *
 * If `value` is supplied (and not null/undefined), the rendered element will
 * not trigger updates to the element. Instead, the `value` prop must change in
 * order for the rendered element to be updated.
 *
 * The rendered element will be initialized with an empty value, the prop
 * `defaultValue` if specified, or the children content (deprecated).
 */var ReactDOMTextarea=ReactCompositeComponent.createClass({displayName:'ReactDOMTextarea',mixins:[AutoFocusMixin,LinkedValueUtils.Mixin,ReactBrowserComponentMixin],getInitialState:function getInitialState(){var defaultValue=this.props.defaultValue; // TODO (yungsters): Remove support for children content in <textarea>.
var children=this.props.children;if(children!=null){if("production"!==process.env.NODE_ENV){"production"!==process.env.NODE_ENV?warning(false,'Use the `defaultValue` or `value` props instead of setting '+'children on <textarea>.'):null;}"production"!==process.env.NODE_ENV?invariant(defaultValue==null,'If you supply `defaultValue` on a <textarea>, do not pass children.'):invariant(defaultValue==null);if(Array.isArray(children)){"production"!==process.env.NODE_ENV?invariant(children.length<=1,'<textarea> can only have at most one child.'):invariant(children.length<=1);children=children[0];}defaultValue=''+children;}if(defaultValue==null){defaultValue='';}var value=LinkedValueUtils.getValue(this);return { // We save the initial value so that `ReactDOMComponent` doesn't update
// `textContent` (unnecessary since we update value).
// The initial value can be a boolean or object so that's why it's
// forced to be a string.
initialValue:''+(value!=null?value:defaultValue)};},shouldComponentUpdate:function shouldComponentUpdate(){ // Defer any updates to this component during the `onChange` handler.
return !this._isChanging;},render:function render(){ // Clone `this.props` so we don't mutate the input.
var props=merge(this.props);"production"!==process.env.NODE_ENV?invariant(props.dangerouslySetInnerHTML==null,'`dangerouslySetInnerHTML` does not make sense on <textarea>.'):invariant(props.dangerouslySetInnerHTML==null);props.defaultValue=null;props.value=null;props.onChange=this._handleChange; // Always set children to the same thing. In IE9, the selection range will
// get reset if `textContent` is mutated.
return textarea(props,this.state.initialValue);},componentDidUpdate:function componentDidUpdate(prevProps,prevState,prevContext){var value=LinkedValueUtils.getValue(this);if(value!=null){var rootNode=this.getDOMNode(); // Cast `value` to a string to ensure the value is set correctly. While
// browsers typically do this as necessary, jsdom doesn't.
DOMPropertyOperations.setValueForProperty(rootNode,'value',''+value);}},_handleChange:function _handleChange(event){var returnValue;var onChange=LinkedValueUtils.getOnChange(this);if(onChange){this._isChanging=true;returnValue=onChange.call(this,event);this._isChanging=false;}this.setState({value:event.target.value});return returnValue;}});module.exports=ReactDOMTextarea;}).call(this,require("e/U+97"));},{"./AutoFocusMixin":4,"./DOMPropertyOperations":14,"./LinkedValueUtils":26,"./ReactBrowserComponentMixin":31,"./ReactCompositeComponent":36,"./ReactDOM":39,"./invariant":123,"./merge":133,"./warning":146,"e/U+97":3}],50:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDefaultBatchingStrategy
 */"use strict";var ReactUpdates=require("./ReactUpdates");var Transaction=require("./Transaction");var emptyFunction=require("./emptyFunction");var mixInto=require("./mixInto");var RESET_BATCHED_UPDATES={initialize:emptyFunction,close:function close(){ReactDefaultBatchingStrategy.isBatchingUpdates=false;}};var FLUSH_BATCHED_UPDATES={initialize:emptyFunction,close:ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)};var TRANSACTION_WRAPPERS=[FLUSH_BATCHED_UPDATES,RESET_BATCHED_UPDATES];function ReactDefaultBatchingStrategyTransaction(){this.reinitializeTransaction();}mixInto(ReactDefaultBatchingStrategyTransaction,Transaction.Mixin);mixInto(ReactDefaultBatchingStrategyTransaction,{getTransactionWrappers:function getTransactionWrappers(){return TRANSACTION_WRAPPERS;}});var transaction=new ReactDefaultBatchingStrategyTransaction();var ReactDefaultBatchingStrategy={isBatchingUpdates:false, /**
   * Call the provided function in a context within which calls to `setState`
   * and friends are batched such that components aren't updated unnecessarily.
   */batchedUpdates:function batchedUpdates(callback,a,b){var alreadyBatchingUpdates=ReactDefaultBatchingStrategy.isBatchingUpdates;ReactDefaultBatchingStrategy.isBatchingUpdates=true; // The code is written this way to avoid extra allocations
if(alreadyBatchingUpdates){callback(a,b);}else {transaction.perform(callback,null,a,b);}}};module.exports=ReactDefaultBatchingStrategy;},{"./ReactUpdates":79,"./Transaction":95,"./emptyFunction":105,"./mixInto":136}],51:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDefaultInjection
 */"use strict";var BeforeInputEventPlugin=require("./BeforeInputEventPlugin");var ChangeEventPlugin=require("./ChangeEventPlugin");var ClientReactRootIndex=require("./ClientReactRootIndex");var CompositionEventPlugin=require("./CompositionEventPlugin");var DefaultEventPluginOrder=require("./DefaultEventPluginOrder");var EnterLeaveEventPlugin=require("./EnterLeaveEventPlugin");var ExecutionEnvironment=require("./ExecutionEnvironment");var HTMLDOMPropertyConfig=require("./HTMLDOMPropertyConfig");var MobileSafariClickEventPlugin=require("./MobileSafariClickEventPlugin");var ReactBrowserComponentMixin=require("./ReactBrowserComponentMixin");var ReactComponentBrowserEnvironment=require("./ReactComponentBrowserEnvironment");var ReactDefaultBatchingStrategy=require("./ReactDefaultBatchingStrategy");var ReactDOM=require("./ReactDOM");var ReactDOMButton=require("./ReactDOMButton");var ReactDOMForm=require("./ReactDOMForm");var ReactDOMImg=require("./ReactDOMImg");var ReactDOMInput=require("./ReactDOMInput");var ReactDOMOption=require("./ReactDOMOption");var ReactDOMSelect=require("./ReactDOMSelect");var ReactDOMTextarea=require("./ReactDOMTextarea");var ReactEventListener=require("./ReactEventListener");var ReactInjection=require("./ReactInjection");var ReactInstanceHandles=require("./ReactInstanceHandles");var ReactMount=require("./ReactMount");var SelectEventPlugin=require("./SelectEventPlugin");var ServerReactRootIndex=require("./ServerReactRootIndex");var SimpleEventPlugin=require("./SimpleEventPlugin");var SVGDOMPropertyConfig=require("./SVGDOMPropertyConfig");var createFullPageComponent=require("./createFullPageComponent");function inject(){ReactInjection.EventEmitter.injectReactEventListener(ReactEventListener); /**
   * Inject modules for resolving DOM hierarchy and plugin ordering.
   */ReactInjection.EventPluginHub.injectEventPluginOrder(DefaultEventPluginOrder);ReactInjection.EventPluginHub.injectInstanceHandle(ReactInstanceHandles);ReactInjection.EventPluginHub.injectMount(ReactMount); /**
   * Some important event plugins included by default (without having to require
   * them).
   */ReactInjection.EventPluginHub.injectEventPluginsByName({SimpleEventPlugin:SimpleEventPlugin,EnterLeaveEventPlugin:EnterLeaveEventPlugin,ChangeEventPlugin:ChangeEventPlugin,CompositionEventPlugin:CompositionEventPlugin,MobileSafariClickEventPlugin:MobileSafariClickEventPlugin,SelectEventPlugin:SelectEventPlugin,BeforeInputEventPlugin:BeforeInputEventPlugin});ReactInjection.DOM.injectComponentClasses({button:ReactDOMButton,form:ReactDOMForm,img:ReactDOMImg,input:ReactDOMInput,option:ReactDOMOption,select:ReactDOMSelect,textarea:ReactDOMTextarea,html:createFullPageComponent(ReactDOM.html),head:createFullPageComponent(ReactDOM.head),body:createFullPageComponent(ReactDOM.body)}); // This needs to happen after createFullPageComponent() otherwise the mixin
// gets double injected.
ReactInjection.CompositeComponent.injectMixin(ReactBrowserComponentMixin);ReactInjection.DOMProperty.injectDOMPropertyConfig(HTMLDOMPropertyConfig);ReactInjection.DOMProperty.injectDOMPropertyConfig(SVGDOMPropertyConfig);ReactInjection.EmptyComponent.injectEmptyComponent(ReactDOM.noscript);ReactInjection.Updates.injectReconcileTransaction(ReactComponentBrowserEnvironment.ReactReconcileTransaction);ReactInjection.Updates.injectBatchingStrategy(ReactDefaultBatchingStrategy);ReactInjection.RootIndex.injectCreateReactRootIndex(ExecutionEnvironment.canUseDOM?ClientReactRootIndex.createReactRootIndex:ServerReactRootIndex.createReactRootIndex);ReactInjection.Component.injectEnvironment(ReactComponentBrowserEnvironment);if("production"!==process.env.NODE_ENV){var url=ExecutionEnvironment.canUseDOM&&window.location.href||'';if(/[?&]react_perf\b/.test(url)){var ReactDefaultPerf=require("./ReactDefaultPerf");ReactDefaultPerf.start();}}}module.exports={inject:inject};}).call(this,require("e/U+97"));},{"./BeforeInputEventPlugin":5,"./ChangeEventPlugin":9,"./ClientReactRootIndex":10,"./CompositionEventPlugin":11,"./DefaultEventPluginOrder":16,"./EnterLeaveEventPlugin":17,"./ExecutionEnvironment":24,"./HTMLDOMPropertyConfig":25,"./MobileSafariClickEventPlugin":28,"./ReactBrowserComponentMixin":31,"./ReactComponentBrowserEnvironment":35,"./ReactDOM":39,"./ReactDOMButton":40,"./ReactDOMForm":42,"./ReactDOMImg":44,"./ReactDOMInput":45,"./ReactDOMOption":46,"./ReactDOMSelect":47,"./ReactDOMTextarea":49,"./ReactDefaultBatchingStrategy":50,"./ReactDefaultPerf":52,"./ReactEventListener":59,"./ReactInjection":60,"./ReactInstanceHandles":62,"./ReactMount":64,"./SVGDOMPropertyConfig":80,"./SelectEventPlugin":81,"./ServerReactRootIndex":82,"./SimpleEventPlugin":83,"./createFullPageComponent":102,"e/U+97":3}],52:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDefaultPerf
 * @typechecks static-only
 */"use strict";var DOMProperty=require("./DOMProperty");var ReactDefaultPerfAnalysis=require("./ReactDefaultPerfAnalysis");var ReactMount=require("./ReactMount");var ReactPerf=require("./ReactPerf");var performanceNow=require("./performanceNow");function roundFloat(val){return Math.floor(val*100)/100;}function addValue(obj,key,val){obj[key]=(obj[key]||0)+val;}var ReactDefaultPerf={_allMeasurements:[], // last item in the list is the current one
_mountStack:[0],_injected:false,start:function start(){if(!ReactDefaultPerf._injected){ReactPerf.injection.injectMeasure(ReactDefaultPerf.measure);}ReactDefaultPerf._allMeasurements.length=0;ReactPerf.enableMeasure=true;},stop:function stop(){ReactPerf.enableMeasure=false;},getLastMeasurements:function getLastMeasurements(){return ReactDefaultPerf._allMeasurements;},printExclusive:function printExclusive(measurements){measurements=measurements||ReactDefaultPerf._allMeasurements;var summary=ReactDefaultPerfAnalysis.getExclusiveSummary(measurements);console.table(summary.map(function(item){return {'Component class name':item.componentName,'Total inclusive time (ms)':roundFloat(item.inclusive),'Exclusive mount time (ms)':roundFloat(item.exclusive),'Exclusive render time (ms)':roundFloat(item.render),'Mount time per instance (ms)':roundFloat(item.exclusive/item.count),'Render time per instance (ms)':roundFloat(item.render/item.count),'Instances':item.count};})); // TODO: ReactDefaultPerfAnalysis.getTotalTime() does not return the correct
// number.
},printInclusive:function printInclusive(measurements){measurements=measurements||ReactDefaultPerf._allMeasurements;var summary=ReactDefaultPerfAnalysis.getInclusiveSummary(measurements);console.table(summary.map(function(item){return {'Owner > component':item.componentName,'Inclusive time (ms)':roundFloat(item.time),'Instances':item.count};}));console.log('Total time:',ReactDefaultPerfAnalysis.getTotalTime(measurements).toFixed(2)+' ms');},printWasted:function printWasted(measurements){measurements=measurements||ReactDefaultPerf._allMeasurements;var summary=ReactDefaultPerfAnalysis.getInclusiveSummary(measurements,true);console.table(summary.map(function(item){return {'Owner > component':item.componentName,'Wasted time (ms)':item.time,'Instances':item.count};}));console.log('Total time:',ReactDefaultPerfAnalysis.getTotalTime(measurements).toFixed(2)+' ms');},printDOM:function printDOM(measurements){measurements=measurements||ReactDefaultPerf._allMeasurements;var summary=ReactDefaultPerfAnalysis.getDOMSummary(measurements);console.table(summary.map(function(item){var result={};result[DOMProperty.ID_ATTRIBUTE_NAME]=item.id;result['type']=item.type;result['args']=JSON.stringify(item.args);return result;}));console.log('Total time:',ReactDefaultPerfAnalysis.getTotalTime(measurements).toFixed(2)+' ms');},_recordWrite:function _recordWrite(id,fnName,totalTime,args){ // TODO: totalTime isn't that useful since it doesn't count paints/reflows
var writes=ReactDefaultPerf._allMeasurements[ReactDefaultPerf._allMeasurements.length-1].writes;writes[id]=writes[id]||[];writes[id].push({type:fnName,time:totalTime,args:args});},measure:function measure(moduleName,fnName,func){return function(){var args=Array.prototype.slice.call(arguments,0);var totalTime;var rv;var start;if(fnName==='_renderNewRootComponent'||fnName==='flushBatchedUpdates'){ // A "measurement" is a set of metrics recorded for each flush. We want
// to group the metrics for a given flush together so we can look at the
// components that rendered and the DOM operations that actually
// happened to determine the amount of "wasted work" performed.
ReactDefaultPerf._allMeasurements.push({exclusive:{},inclusive:{},render:{},counts:{},writes:{},displayNames:{},totalTime:0});start=performanceNow();rv=func.apply(this,args);ReactDefaultPerf._allMeasurements[ReactDefaultPerf._allMeasurements.length-1].totalTime=performanceNow()-start;return rv;}else if(moduleName==='ReactDOMIDOperations'||moduleName==='ReactComponentBrowserEnvironment'){start=performanceNow();rv=func.apply(this,args);totalTime=performanceNow()-start;if(fnName==='mountImageIntoNode'){var mountID=ReactMount.getID(args[1]);ReactDefaultPerf._recordWrite(mountID,fnName,totalTime,args[0]);}else if(fnName==='dangerouslyProcessChildrenUpdates'){ // special format
args[0].forEach(function(update){var writeArgs={};if(update.fromIndex!==null){writeArgs.fromIndex=update.fromIndex;}if(update.toIndex!==null){writeArgs.toIndex=update.toIndex;}if(update.textContent!==null){writeArgs.textContent=update.textContent;}if(update.markupIndex!==null){writeArgs.markup=args[1][update.markupIndex];}ReactDefaultPerf._recordWrite(update.parentID,update.type,totalTime,writeArgs);});}else { // basic format
ReactDefaultPerf._recordWrite(args[0],fnName,totalTime,Array.prototype.slice.call(args,1));}return rv;}else if(moduleName==='ReactCompositeComponent'&&(fnName==='mountComponent'||fnName==='updateComponent'|| // TODO: receiveComponent()?
fnName==='_renderValidatedComponent')){var rootNodeID=fnName==='mountComponent'?args[0]:this._rootNodeID;var isRender=fnName==='_renderValidatedComponent';var isMount=fnName==='mountComponent';var mountStack=ReactDefaultPerf._mountStack;var entry=ReactDefaultPerf._allMeasurements[ReactDefaultPerf._allMeasurements.length-1];if(isRender){addValue(entry.counts,rootNodeID,1);}else if(isMount){mountStack.push(0);}start=performanceNow();rv=func.apply(this,args);totalTime=performanceNow()-start;if(isRender){addValue(entry.render,rootNodeID,totalTime);}else if(isMount){var subMountTime=mountStack.pop();mountStack[mountStack.length-1]+=totalTime;addValue(entry.exclusive,rootNodeID,totalTime-subMountTime);addValue(entry.inclusive,rootNodeID,totalTime);}else {addValue(entry.inclusive,rootNodeID,totalTime);}entry.displayNames[rootNodeID]={current:this.constructor.displayName,owner:this._owner?this._owner.constructor.displayName:'<root>'};return rv;}else {return func.apply(this,args);}};}};module.exports=ReactDefaultPerf;},{"./DOMProperty":13,"./ReactDefaultPerfAnalysis":53,"./ReactMount":64,"./ReactPerf":68,"./performanceNow":140}],53:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDefaultPerfAnalysis
 */var merge=require("./merge"); // Don't try to save users less than 1.2ms (a number I made up)
var DONT_CARE_THRESHOLD=1.2;var DOM_OPERATION_TYPES={'mountImageIntoNode':'set innerHTML',INSERT_MARKUP:'set innerHTML',MOVE_EXISTING:'move',REMOVE_NODE:'remove',TEXT_CONTENT:'set textContent','updatePropertyByID':'update attribute','deletePropertyByID':'delete attribute','updateStylesByID':'update styles','updateInnerHTMLByID':'set innerHTML','dangerouslyReplaceNodeWithMarkupByID':'replace'};function getTotalTime(measurements){ // TODO: return number of DOM ops? could be misleading.
// TODO: measure dropped frames after reconcile?
// TODO: log total time of each reconcile and the top-level component
// class that triggered it.
var totalTime=0;for(var i=0;i<measurements.length;i++){var measurement=measurements[i];totalTime+=measurement.totalTime;}return totalTime;}function getDOMSummary(measurements){var items=[];for(var i=0;i<measurements.length;i++){var measurement=measurements[i];var id;for(id in measurement.writes){measurement.writes[id].forEach(function(write){items.push({id:id,type:DOM_OPERATION_TYPES[write.type]||write.type,args:write.args});});}}return items;}function getExclusiveSummary(measurements){var candidates={};var displayName;for(var i=0;i<measurements.length;i++){var measurement=measurements[i];var allIDs=merge(measurement.exclusive,measurement.inclusive);for(var id in allIDs){displayName=measurement.displayNames[id].current;candidates[displayName]=candidates[displayName]||{componentName:displayName,inclusive:0,exclusive:0,render:0,count:0};if(measurement.render[id]){candidates[displayName].render+=measurement.render[id];}if(measurement.exclusive[id]){candidates[displayName].exclusive+=measurement.exclusive[id];}if(measurement.inclusive[id]){candidates[displayName].inclusive+=measurement.inclusive[id];}if(measurement.counts[id]){candidates[displayName].count+=measurement.counts[id];}}} // Now make a sorted array with the results.
var arr=[];for(displayName in candidates){if(candidates[displayName].exclusive>=DONT_CARE_THRESHOLD){arr.push(candidates[displayName]);}}arr.sort(function(a,b){return b.exclusive-a.exclusive;});return arr;}function getInclusiveSummary(measurements,onlyClean){var candidates={};var inclusiveKey;for(var i=0;i<measurements.length;i++){var measurement=measurements[i];var allIDs=merge(measurement.exclusive,measurement.inclusive);var cleanComponents;if(onlyClean){cleanComponents=getUnchangedComponents(measurement);}for(var id in allIDs){if(onlyClean&&!cleanComponents[id]){continue;}var displayName=measurement.displayNames[id]; // Inclusive time is not useful for many components without knowing where
// they are instantiated. So we aggregate inclusive time with both the
// owner and current displayName as the key.
inclusiveKey=displayName.owner+' > '+displayName.current;candidates[inclusiveKey]=candidates[inclusiveKey]||{componentName:inclusiveKey,time:0,count:0};if(measurement.inclusive[id]){candidates[inclusiveKey].time+=measurement.inclusive[id];}if(measurement.counts[id]){candidates[inclusiveKey].count+=measurement.counts[id];}}} // Now make a sorted array with the results.
var arr=[];for(inclusiveKey in candidates){if(candidates[inclusiveKey].time>=DONT_CARE_THRESHOLD){arr.push(candidates[inclusiveKey]);}}arr.sort(function(a,b){return b.time-a.time;});return arr;}function getUnchangedComponents(measurement){ // For a given reconcile, look at which components did not actually
// render anything to the DOM and return a mapping of their ID to
// the amount of time it took to render the entire subtree.
var cleanComponents={};var dirtyLeafIDs=Object.keys(measurement.writes);var allIDs=merge(measurement.exclusive,measurement.inclusive);for(var id in allIDs){var isDirty=false; // For each component that rendered, see if a component that triggerd
// a DOM op is in its subtree.
for(var i=0;i<dirtyLeafIDs.length;i++){if(dirtyLeafIDs[i].indexOf(id)===0){isDirty=true;break;}}if(!isDirty&&measurement.counts[id]>0){cleanComponents[id]=true;}}return cleanComponents;}var ReactDefaultPerfAnalysis={getExclusiveSummary:getExclusiveSummary,getInclusiveSummary:getInclusiveSummary,getDOMSummary:getDOMSummary,getTotalTime:getTotalTime};module.exports=ReactDefaultPerfAnalysis;},{"./merge":133}],54:[function(require,module,exports){(function(process){ /**
 * Copyright 2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDescriptor
 */"use strict";var ReactContext=require("./ReactContext");var ReactCurrentOwner=require("./ReactCurrentOwner");var merge=require("./merge");var warning=require("./warning"); /**
 * Warn for mutations.
 *
 * @internal
 * @param {object} object
 * @param {string} key
 */function defineWarningProperty(object,key){Object.defineProperty(object,key,{configurable:false,enumerable:true,get:function get(){if(!this._store){return null;}return this._store[key];},set:function set(value){"production"!==process.env.NODE_ENV?warning(false,'Don\'t set the '+key+' property of the component. '+'Mutate the existing props object instead.'):null;this._store[key]=value;}});} /**
 * This is updated to true if the membrane is successfully created.
 */var useMutationMembrane=false; /**
 * Warn for mutations.
 *
 * @internal
 * @param {object} descriptor
 */function defineMutationMembrane(prototype){try{var pseudoFrozenProperties={props:true};for(var key in pseudoFrozenProperties){defineWarningProperty(prototype,key);}useMutationMembrane=true;}catch(x){ // IE will fail on defineProperty
}} /**
 * Transfer static properties from the source to the target. Functions are
 * rebound to have this reflect the original source.
 */function proxyStaticMethods(target,source){if(typeof source!=='function'){return;}for(var key in source){if(source.hasOwnProperty(key)){var value=source[key];if(typeof value==='function'){var bound=value.bind(source); // Copy any properties defined on the function, such as `isRequired` on
// a PropTypes validator. (mergeInto refuses to work on functions.)
for(var k in value){if(value.hasOwnProperty(k)){bound[k]=value[k];}}target[key]=bound;}else {target[key]=value;}}}} /**
 * Base constructor for all React descriptors. This is only used to make this
 * work with a dynamic instanceof check. Nothing should live on this prototype.
 *
 * @param {*} type
 * @internal
 */var ReactDescriptor=function ReactDescriptor(){};if("production"!==process.env.NODE_ENV){defineMutationMembrane(ReactDescriptor.prototype);}ReactDescriptor.createFactory=function(type){var descriptorPrototype=Object.create(ReactDescriptor.prototype);var factory=function factory(props,children){ // For consistency we currently allocate a new object for every descriptor.
// This protects the descriptor from being mutated by the original props
// object being mutated. It also protects the original props object from
// being mutated by children arguments and default props. This behavior
// comes with a performance cost and could be deprecated in the future.
// It could also be optimized with a smarter JSX transform.
if(props==null){props={};}else if((typeof props==="undefined"?"undefined":_typeof(props))==='object'){props=merge(props);} // Children can be more than one argument, and those are transferred onto
// the newly allocated props object.
var childrenLength=arguments.length-1;if(childrenLength===1){props.children=children;}else if(childrenLength>1){var childArray=Array(childrenLength);for(var i=0;i<childrenLength;i++){childArray[i]=arguments[i+1];}props.children=childArray;} // Initialize the descriptor object
var descriptor=Object.create(descriptorPrototype); // Record the component responsible for creating this descriptor.
descriptor._owner=ReactCurrentOwner.current; // TODO: Deprecate withContext, and then the context becomes accessible
// through the owner.
descriptor._context=ReactContext.current;if("production"!==process.env.NODE_ENV){ // The validation flag and props are currently mutative. We put them on
// an external backing store so that we can freeze the whole object.
// This can be replaced with a WeakMap once they are implemented in
// commonly used development environments.
descriptor._store={validated:false,props:props}; // We're not allowed to set props directly on the object so we early
// return and rely on the prototype membrane to forward to the backing
// store.
if(useMutationMembrane){Object.freeze(descriptor);return descriptor;}}descriptor.props=props;return descriptor;}; // Currently we expose the prototype of the descriptor so that
// <Foo /> instanceof Foo works. This is controversial pattern.
factory.prototype=descriptorPrototype; // Expose the type on the factory and the prototype so that it can be
// easily accessed on descriptors. E.g. <Foo />.type === Foo.type and for
// static methods like <Foo />.type.staticMethod();
// This should not be named constructor since this may not be the function
// that created the descriptor, and it may not even be a constructor.
factory.type=type;descriptorPrototype.type=type;proxyStaticMethods(factory,type); // Expose a unique constructor on the prototype is that this works with type
// systems that compare constructor properties: <Foo />.constructor === Foo
// This may be controversial since it requires a known factory function.
descriptorPrototype.constructor=factory;return factory;};ReactDescriptor.cloneAndReplaceProps=function(oldDescriptor,newProps){var newDescriptor=Object.create(oldDescriptor.constructor.prototype); // It's important that this property order matches the hidden class of the
// original descriptor to maintain perf.
newDescriptor._owner=oldDescriptor._owner;newDescriptor._context=oldDescriptor._context;if("production"!==process.env.NODE_ENV){newDescriptor._store={validated:oldDescriptor._store.validated,props:newProps};if(useMutationMembrane){Object.freeze(newDescriptor);return newDescriptor;}}newDescriptor.props=newProps;return newDescriptor;}; /**
 * Checks if a value is a valid descriptor constructor.
 *
 * @param {*}
 * @return {boolean}
 * @public
 */ReactDescriptor.isValidFactory=function(factory){return typeof factory==='function'&&factory.prototype instanceof ReactDescriptor;}; /**
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */ReactDescriptor.isValidDescriptor=function(object){return object instanceof ReactDescriptor;};module.exports=ReactDescriptor;}).call(this,require("e/U+97"));},{"./ReactContext":37,"./ReactCurrentOwner":38,"./merge":133,"./warning":146,"e/U+97":3}],55:[function(require,module,exports){ /**
 * Copyright 2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDescriptorValidator
 */ /**
 * ReactDescriptorValidator provides a wrapper around a descriptor factory
 * which validates the props passed to the descriptor. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */"use strict";var ReactDescriptor=require("./ReactDescriptor");var ReactPropTypeLocations=require("./ReactPropTypeLocations");var ReactCurrentOwner=require("./ReactCurrentOwner");var monitorCodeUse=require("./monitorCodeUse"); /**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */var ownerHasKeyUseWarning={'react_key_warning':{},'react_numeric_key_warning':{}};var ownerHasMonitoredObjectMap={};var loggedTypeFailures={};var NUMERIC_PROPERTY_REGEX=/^\d+$/; /**
 * Gets the current owner's displayName for use in warnings.
 *
 * @internal
 * @return {?string} Display name or undefined
 */function getCurrentOwnerDisplayName(){var current=ReactCurrentOwner.current;return current&&current.constructor.displayName||undefined;} /**
 * Warn if the component doesn't have an explicit key assigned to it.
 * This component is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it.
 *
 * @internal
 * @param {ReactComponent} component Component that requires a key.
 * @param {*} parentType component's parent's type.
 */function validateExplicitKey(component,parentType){if(component._store.validated||component.props.key!=null){return;}component._store.validated=true;warnAndMonitorForKeyUse('react_key_warning','Each child in an array should have a unique "key" prop.',component,parentType);} /**
 * Warn if the key is being defined as an object property but has an incorrect
 * value.
 *
 * @internal
 * @param {string} name Property name of the key.
 * @param {ReactComponent} component Component that requires a key.
 * @param {*} parentType component's parent's type.
 */function validatePropertyKey(name,component,parentType){if(!NUMERIC_PROPERTY_REGEX.test(name)){return;}warnAndMonitorForKeyUse('react_numeric_key_warning','Child objects should have non-numeric keys so ordering is preserved.',component,parentType);} /**
 * Shared warning and monitoring code for the key warnings.
 *
 * @internal
 * @param {string} warningID The id used when logging.
 * @param {string} message The base warning that gets output.
 * @param {ReactComponent} component Component that requires a key.
 * @param {*} parentType component's parent's type.
 */function warnAndMonitorForKeyUse(warningID,message,component,parentType){var ownerName=getCurrentOwnerDisplayName();var parentName=parentType.displayName;var useName=ownerName||parentName;var memoizer=ownerHasKeyUseWarning[warningID];if(memoizer.hasOwnProperty(useName)){return;}memoizer[useName]=true;message+=ownerName?" Check the render method of "+ownerName+".":" Check the renderComponent call using <"+parentName+">."; // Usually the current owner is the offender, but if it accepts children as a
// property, it may be the creator of the child that's responsible for
// assigning it a key.
var childOwnerName=null;if(component._owner&&component._owner!==ReactCurrentOwner.current){ // Name of the component that originally created this child.
childOwnerName=component._owner.constructor.displayName;message+=" It was passed a child from "+childOwnerName+".";}message+=' See http://fb.me/react-warning-keys for more information.';monitorCodeUse(warningID,{component:useName,componentOwner:childOwnerName});console.warn(message);} /**
 * Log that we're using an object map. We're considering deprecating this
 * feature and replace it with proper Map and ImmutableMap data structures.
 *
 * @internal
 */function monitorUseOfObjectMap(){var currentName=getCurrentOwnerDisplayName()||'';if(ownerHasMonitoredObjectMap.hasOwnProperty(currentName)){return;}ownerHasMonitoredObjectMap[currentName]=true;monitorCodeUse('react_object_map_children');} /**
 * Ensure that every component either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {*} component Statically passed child of any type.
 * @param {*} parentType component's parent's type.
 * @return {boolean}
 */function validateChildKeys(component,parentType){if(Array.isArray(component)){for(var i=0;i<component.length;i++){var child=component[i];if(ReactDescriptor.isValidDescriptor(child)){validateExplicitKey(child,parentType);}}}else if(ReactDescriptor.isValidDescriptor(component)){ // This component was passed in a valid location.
component._store.validated=true;}else if(component&&(typeof component==="undefined"?"undefined":_typeof(component))==='object'){monitorUseOfObjectMap();for(var name in component){validatePropertyKey(name,component[name],parentType);}}} /**
 * Assert that the props are valid
 *
 * @param {string} componentName Name of the component for error messages.
 * @param {object} propTypes Map of prop name to a ReactPropType
 * @param {object} props
 * @param {string} location e.g. "prop", "context", "child context"
 * @private
 */function checkPropTypes(componentName,propTypes,props,location){for(var propName in propTypes){if(propTypes.hasOwnProperty(propName)){var error; // Prop type validation may throw. In case they do, we don't want to
// fail the render phase where it didn't fail before. So we log it.
// After these have been cleaned up, we'll let them throw.
try{error=propTypes[propName](props,propName,componentName,location);}catch(ex){error=ex;}if(error instanceof Error&&!(error.message in loggedTypeFailures)){ // Only monitor this failure once because there tends to be a lot of the
// same error.
loggedTypeFailures[error.message]=true; // This will soon use the warning module
monitorCodeUse('react_failed_descriptor_type_check',{message:error.message});}}}}var ReactDescriptorValidator={ /**
   * Wraps a descriptor factory function in another function which validates
   * the props and context of the descriptor and warns about any failed type
   * checks.
   *
   * @param {function} factory The original descriptor factory
   * @param {object?} propTypes A prop type definition set
   * @param {object?} contextTypes A context type definition set
   * @return {object} The component descriptor, which may be invalid.
   * @private
   */createFactory:function createFactory(factory,propTypes,contextTypes){var validatedFactory=function validatedFactory(props,children){var descriptor=factory.apply(this,arguments);for(var i=1;i<arguments.length;i++){validateChildKeys(arguments[i],descriptor.type);}var name=descriptor.type.displayName;if(propTypes){checkPropTypes(name,propTypes,descriptor.props,ReactPropTypeLocations.prop);}if(contextTypes){checkPropTypes(name,contextTypes,descriptor._context,ReactPropTypeLocations.context);}return descriptor;};validatedFactory.prototype=factory.prototype;validatedFactory.type=factory.type; // Copy static properties
for(var key in factory){if(factory.hasOwnProperty(key)){validatedFactory[key]=factory[key];}}return validatedFactory;}};module.exports=ReactDescriptorValidator;},{"./ReactCurrentOwner":38,"./ReactDescriptor":54,"./ReactPropTypeLocations":71,"./monitorCodeUse":137}],56:[function(require,module,exports){(function(process){ /**
 * Copyright 2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactEmptyComponent
 */"use strict";var invariant=require("./invariant");var component; // This registry keeps track of the React IDs of the components that rendered to
// `null` (in reality a placeholder such as `noscript`)
var nullComponentIdsRegistry={};var ReactEmptyComponentInjection={injectEmptyComponent:function injectEmptyComponent(emptyComponent){component=emptyComponent;}}; /**
 * @return {ReactComponent} component The injected empty component.
 */function getEmptyComponent(){"production"!==process.env.NODE_ENV?invariant(component,'Trying to return null from a render, but no null placeholder component '+'was injected.'):invariant(component);return component();} /**
 * Mark the component as having rendered to null.
 * @param {string} id Component's `_rootNodeID`.
 */function registerNullComponentID(id){nullComponentIdsRegistry[id]=true;} /**
 * Unmark the component as having rendered to null: it renders to something now.
 * @param {string} id Component's `_rootNodeID`.
 */function deregisterNullComponentID(id){delete nullComponentIdsRegistry[id];} /**
 * @param {string} id Component's `_rootNodeID`.
 * @return {boolean} True if the component is rendered to null.
 */function isNullComponentID(id){return nullComponentIdsRegistry[id];}var ReactEmptyComponent={deregisterNullComponentID:deregisterNullComponentID,getEmptyComponent:getEmptyComponent,injection:ReactEmptyComponentInjection,isNullComponentID:isNullComponentID,registerNullComponentID:registerNullComponentID};module.exports=ReactEmptyComponent;}).call(this,require("e/U+97"));},{"./invariant":123,"e/U+97":3}],57:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactErrorUtils
 * @typechecks
 */"use strict";var ReactErrorUtils={ /**
   * Creates a guarded version of a function. This is supposed to make debugging
   * of event handlers easier. To aid debugging with the browser's debugger,
   * this currently simply returns the original function.
   *
   * @param {function} func Function to be executed
   * @param {string} name The name of the guard
   * @return {function}
   */guard:function guard(func,name){return func;}};module.exports=ReactErrorUtils;},{}],58:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactEventEmitterMixin
 */"use strict";var EventPluginHub=require("./EventPluginHub");function runEventQueueInBatch(events){EventPluginHub.enqueueEvents(events);EventPluginHub.processEventQueue();}var ReactEventEmitterMixin={ /**
   * Streams a fired top-level event to `EventPluginHub` where plugins have the
   * opportunity to create `ReactEvent`s to be dispatched.
   *
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {object} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native environment event.
   */handleTopLevel:function handleTopLevel(topLevelType,topLevelTarget,topLevelTargetID,nativeEvent){var events=EventPluginHub.extractEvents(topLevelType,topLevelTarget,topLevelTargetID,nativeEvent);runEventQueueInBatch(events);}};module.exports=ReactEventEmitterMixin;},{"./EventPluginHub":20}],59:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactEventListener
 * @typechecks static-only
 */"use strict";var EventListener=require("./EventListener");var ExecutionEnvironment=require("./ExecutionEnvironment");var PooledClass=require("./PooledClass");var ReactInstanceHandles=require("./ReactInstanceHandles");var ReactMount=require("./ReactMount");var ReactUpdates=require("./ReactUpdates");var getEventTarget=require("./getEventTarget");var getUnboundedScrollPosition=require("./getUnboundedScrollPosition");var mixInto=require("./mixInto"); /**
 * Finds the parent React component of `node`.
 *
 * @param {*} node
 * @return {?DOMEventTarget} Parent container, or `null` if the specified node
 *                           is not nested.
 */function findParent(node){ // TODO: It may be a good idea to cache this to prevent unnecessary DOM
// traversal, but caching is difficult to do correctly without using a
// mutation observer to listen for all DOM changes.
var nodeID=ReactMount.getID(node);var rootID=ReactInstanceHandles.getReactRootIDFromNodeID(nodeID);var container=ReactMount.findReactContainerForID(rootID);var parent=ReactMount.getFirstReactDOM(container);return parent;} // Used to store ancestor hierarchy in top level callback
function TopLevelCallbackBookKeeping(topLevelType,nativeEvent){this.topLevelType=topLevelType;this.nativeEvent=nativeEvent;this.ancestors=[];}mixInto(TopLevelCallbackBookKeeping,{destructor:function destructor(){this.topLevelType=null;this.nativeEvent=null;this.ancestors.length=0;}});PooledClass.addPoolingTo(TopLevelCallbackBookKeeping,PooledClass.twoArgumentPooler);function handleTopLevelImpl(bookKeeping){var topLevelTarget=ReactMount.getFirstReactDOM(getEventTarget(bookKeeping.nativeEvent))||window; // Loop through the hierarchy, in case there's any nested components.
// It's important that we build the array of ancestors before calling any
// event handlers, because event handlers can modify the DOM, leading to
// inconsistencies with ReactMount's node cache. See #1105.
var ancestor=topLevelTarget;while(ancestor){bookKeeping.ancestors.push(ancestor);ancestor=findParent(ancestor);}for(var i=0,l=bookKeeping.ancestors.length;i<l;i++){topLevelTarget=bookKeeping.ancestors[i];var topLevelTargetID=ReactMount.getID(topLevelTarget)||'';ReactEventListener._handleTopLevel(bookKeeping.topLevelType,topLevelTarget,topLevelTargetID,bookKeeping.nativeEvent);}}function scrollValueMonitor(cb){var scrollPosition=getUnboundedScrollPosition(window);cb(scrollPosition);}var ReactEventListener={_enabled:true,_handleTopLevel:null,WINDOW_HANDLE:ExecutionEnvironment.canUseDOM?window:null,setHandleTopLevel:function setHandleTopLevel(handleTopLevel){ReactEventListener._handleTopLevel=handleTopLevel;},setEnabled:function setEnabled(enabled){ReactEventListener._enabled=!!enabled;},isEnabled:function isEnabled(){return ReactEventListener._enabled;}, /**
   * Traps top-level events by using event bubbling.
   *
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {string} handlerBaseName Event name (e.g. "click").
   * @param {object} handle Element on which to attach listener.
   * @return {object} An object with a remove function which will forcefully
   *                  remove the listener.
   * @internal
   */trapBubbledEvent:function trapBubbledEvent(topLevelType,handlerBaseName,handle){var element=handle;if(!element){return;}return EventListener.listen(element,handlerBaseName,ReactEventListener.dispatchEvent.bind(null,topLevelType));}, /**
   * Traps a top-level event by using event capturing.
   *
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {string} handlerBaseName Event name (e.g. "click").
   * @param {object} handle Element on which to attach listener.
   * @return {object} An object with a remove function which will forcefully
   *                  remove the listener.
   * @internal
   */trapCapturedEvent:function trapCapturedEvent(topLevelType,handlerBaseName,handle){var element=handle;if(!element){return;}return EventListener.capture(element,handlerBaseName,ReactEventListener.dispatchEvent.bind(null,topLevelType));},monitorScrollValue:function monitorScrollValue(refresh){var callback=scrollValueMonitor.bind(null,refresh);EventListener.listen(window,'scroll',callback);EventListener.listen(window,'resize',callback);},dispatchEvent:function dispatchEvent(topLevelType,nativeEvent){if(!ReactEventListener._enabled){return;}var bookKeeping=TopLevelCallbackBookKeeping.getPooled(topLevelType,nativeEvent);try{ // Event queue being processed in the same cycle allows
// `preventDefault`.
ReactUpdates.batchedUpdates(handleTopLevelImpl,bookKeeping);}finally {TopLevelCallbackBookKeeping.release(bookKeeping);}}};module.exports=ReactEventListener;},{"./EventListener":19,"./ExecutionEnvironment":24,"./PooledClass":29,"./ReactInstanceHandles":62,"./ReactMount":64,"./ReactUpdates":79,"./getEventTarget":114,"./getUnboundedScrollPosition":119,"./mixInto":136}],60:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactInjection
 */"use strict";var DOMProperty=require("./DOMProperty");var EventPluginHub=require("./EventPluginHub");var ReactComponent=require("./ReactComponent");var ReactCompositeComponent=require("./ReactCompositeComponent");var ReactDOM=require("./ReactDOM");var ReactEmptyComponent=require("./ReactEmptyComponent");var ReactBrowserEventEmitter=require("./ReactBrowserEventEmitter");var ReactPerf=require("./ReactPerf");var ReactRootIndex=require("./ReactRootIndex");var ReactUpdates=require("./ReactUpdates");var ReactInjection={Component:ReactComponent.injection,CompositeComponent:ReactCompositeComponent.injection,DOMProperty:DOMProperty.injection,EmptyComponent:ReactEmptyComponent.injection,EventPluginHub:EventPluginHub.injection,DOM:ReactDOM.injection,EventEmitter:ReactBrowserEventEmitter.injection,Perf:ReactPerf.injection,RootIndex:ReactRootIndex.injection,Updates:ReactUpdates.injection};module.exports=ReactInjection;},{"./DOMProperty":13,"./EventPluginHub":20,"./ReactBrowserEventEmitter":32,"./ReactComponent":34,"./ReactCompositeComponent":36,"./ReactDOM":39,"./ReactEmptyComponent":56,"./ReactPerf":68,"./ReactRootIndex":75,"./ReactUpdates":79}],61:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactInputSelection
 */"use strict";var ReactDOMSelection=require("./ReactDOMSelection");var containsNode=require("./containsNode");var focusNode=require("./focusNode");var getActiveElement=require("./getActiveElement");function isInDocument(node){return containsNode(document.documentElement,node);} /**
 * @ReactInputSelection: React input selection module. Based on Selection.js,
 * but modified to be suitable for react and has a couple of bug fixes (doesn't
 * assume buttons have range selections allowed).
 * Input selection module for React.
 */var ReactInputSelection={hasSelectionCapabilities:function hasSelectionCapabilities(elem){return elem&&(elem.nodeName==='INPUT'&&elem.type==='text'||elem.nodeName==='TEXTAREA'||elem.contentEditable==='true');},getSelectionInformation:function getSelectionInformation(){var focusedElem=getActiveElement();return {focusedElem:focusedElem,selectionRange:ReactInputSelection.hasSelectionCapabilities(focusedElem)?ReactInputSelection.getSelection(focusedElem):null};}, /**
   * @restoreSelection: If any selection information was potentially lost,
   * restore it. This is useful when performing operations that could remove dom
   * nodes and place them back in, resulting in focus being lost.
   */restoreSelection:function restoreSelection(priorSelectionInformation){var curFocusedElem=getActiveElement();var priorFocusedElem=priorSelectionInformation.focusedElem;var priorSelectionRange=priorSelectionInformation.selectionRange;if(curFocusedElem!==priorFocusedElem&&isInDocument(priorFocusedElem)){if(ReactInputSelection.hasSelectionCapabilities(priorFocusedElem)){ReactInputSelection.setSelection(priorFocusedElem,priorSelectionRange);}focusNode(priorFocusedElem);}}, /**
   * @getSelection: Gets the selection bounds of a focused textarea, input or
   * contentEditable node.
   * -@input: Look up selection bounds of this input
   * -@return {start: selectionStart, end: selectionEnd}
   */getSelection:function getSelection(input){var selection;if('selectionStart' in input){ // Modern browser with input or textarea.
selection={start:input.selectionStart,end:input.selectionEnd};}else if(document.selection&&input.nodeName==='INPUT'){ // IE8 input.
var range=document.selection.createRange(); // There can only be one selection per document in IE, so it must
// be in our element.
if(range.parentElement()===input){selection={start:-range.moveStart('character',-input.value.length),end:-range.moveEnd('character',-input.value.length)};}}else { // Content editable or old IE textarea.
selection=ReactDOMSelection.getOffsets(input);}return selection||{start:0,end:0};}, /**
   * @setSelection: Sets the selection bounds of a textarea or input and focuses
   * the input.
   * -@input     Set selection bounds of this input or textarea
   * -@offsets   Object of same form that is returned from get*
   */setSelection:function setSelection(input,offsets){var start=offsets.start;var end=offsets.end;if(typeof end==='undefined'){end=start;}if('selectionStart' in input){input.selectionStart=start;input.selectionEnd=Math.min(end,input.value.length);}else if(document.selection&&input.nodeName==='INPUT'){var range=input.createTextRange();range.collapse(true);range.moveStart('character',start);range.moveEnd('character',end-start);range.select();}else {ReactDOMSelection.setOffsets(input,offsets);}}};module.exports=ReactInputSelection;},{"./ReactDOMSelection":48,"./containsNode":99,"./focusNode":109,"./getActiveElement":111}],62:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactInstanceHandles
 * @typechecks static-only
 */"use strict";var ReactRootIndex=require("./ReactRootIndex");var invariant=require("./invariant");var SEPARATOR='.';var SEPARATOR_LENGTH=SEPARATOR.length; /**
 * Maximum depth of traversals before we consider the possibility of a bad ID.
 */var MAX_TREE_DEPTH=100; /**
 * Creates a DOM ID prefix to use when mounting React components.
 *
 * @param {number} index A unique integer
 * @return {string} React root ID.
 * @internal
 */function getReactRootIDString(index){return SEPARATOR+index.toString(36);} /**
 * Checks if a character in the supplied ID is a separator or the end.
 *
 * @param {string} id A React DOM ID.
 * @param {number} index Index of the character to check.
 * @return {boolean} True if the character is a separator or end of the ID.
 * @private
 */function isBoundary(id,index){return id.charAt(index)===SEPARATOR||index===id.length;} /**
 * Checks if the supplied string is a valid React DOM ID.
 *
 * @param {string} id A React DOM ID, maybe.
 * @return {boolean} True if the string is a valid React DOM ID.
 * @private
 */function isValidID(id){return id===''||id.charAt(0)===SEPARATOR&&id.charAt(id.length-1)!==SEPARATOR;} /**
 * Checks if the first ID is an ancestor of or equal to the second ID.
 *
 * @param {string} ancestorID
 * @param {string} descendantID
 * @return {boolean} True if `ancestorID` is an ancestor of `descendantID`.
 * @internal
 */function isAncestorIDOf(ancestorID,descendantID){return descendantID.indexOf(ancestorID)===0&&isBoundary(descendantID,ancestorID.length);} /**
 * Gets the parent ID of the supplied React DOM ID, `id`.
 *
 * @param {string} id ID of a component.
 * @return {string} ID of the parent, or an empty string.
 * @private
 */function getParentID(id){return id?id.substr(0,id.lastIndexOf(SEPARATOR)):'';} /**
 * Gets the next DOM ID on the tree path from the supplied `ancestorID` to the
 * supplied `destinationID`. If they are equal, the ID is returned.
 *
 * @param {string} ancestorID ID of an ancestor node of `destinationID`.
 * @param {string} destinationID ID of the destination node.
 * @return {string} Next ID on the path from `ancestorID` to `destinationID`.
 * @private
 */function getNextDescendantID(ancestorID,destinationID){"production"!==process.env.NODE_ENV?invariant(isValidID(ancestorID)&&isValidID(destinationID),'getNextDescendantID(%s, %s): Received an invalid React DOM ID.',ancestorID,destinationID):invariant(isValidID(ancestorID)&&isValidID(destinationID));"production"!==process.env.NODE_ENV?invariant(isAncestorIDOf(ancestorID,destinationID),'getNextDescendantID(...): React has made an invalid assumption about '+'the DOM hierarchy. Expected `%s` to be an ancestor of `%s`.',ancestorID,destinationID):invariant(isAncestorIDOf(ancestorID,destinationID));if(ancestorID===destinationID){return ancestorID;} // Skip over the ancestor and the immediate separator. Traverse until we hit
// another separator or we reach the end of `destinationID`.
var start=ancestorID.length+SEPARATOR_LENGTH;for(var i=start;i<destinationID.length;i++){if(isBoundary(destinationID,i)){break;}}return destinationID.substr(0,i);} /**
 * Gets the nearest common ancestor ID of two IDs.
 *
 * Using this ID scheme, the nearest common ancestor ID is the longest common
 * prefix of the two IDs that immediately preceded a "marker" in both strings.
 *
 * @param {string} oneID
 * @param {string} twoID
 * @return {string} Nearest common ancestor ID, or the empty string if none.
 * @private
 */function getFirstCommonAncestorID(oneID,twoID){var minLength=Math.min(oneID.length,twoID.length);if(minLength===0){return '';}var lastCommonMarkerIndex=0; // Use `<=` to traverse until the "EOL" of the shorter string.
for(var i=0;i<=minLength;i++){if(isBoundary(oneID,i)&&isBoundary(twoID,i)){lastCommonMarkerIndex=i;}else if(oneID.charAt(i)!==twoID.charAt(i)){break;}}var longestCommonID=oneID.substr(0,lastCommonMarkerIndex);"production"!==process.env.NODE_ENV?invariant(isValidID(longestCommonID),'getFirstCommonAncestorID(%s, %s): Expected a valid React DOM ID: %s',oneID,twoID,longestCommonID):invariant(isValidID(longestCommonID));return longestCommonID;} /**
 * Traverses the parent path between two IDs (either up or down). The IDs must
 * not be the same, and there must exist a parent path between them. If the
 * callback returns `false`, traversal is stopped.
 *
 * @param {?string} start ID at which to start traversal.
 * @param {?string} stop ID at which to end traversal.
 * @param {function} cb Callback to invoke each ID with.
 * @param {?boolean} skipFirst Whether or not to skip the first node.
 * @param {?boolean} skipLast Whether or not to skip the last node.
 * @private
 */function traverseParentPath(start,stop,cb,arg,skipFirst,skipLast){start=start||'';stop=stop||'';"production"!==process.env.NODE_ENV?invariant(start!==stop,'traverseParentPath(...): Cannot traverse from and to the same ID, `%s`.',start):invariant(start!==stop);var traverseUp=isAncestorIDOf(stop,start);"production"!==process.env.NODE_ENV?invariant(traverseUp||isAncestorIDOf(start,stop),'traverseParentPath(%s, %s, ...): Cannot traverse from two IDs that do '+'not have a parent path.',start,stop):invariant(traverseUp||isAncestorIDOf(start,stop)); // Traverse from `start` to `stop` one depth at a time.
var depth=0;var traverse=traverseUp?getParentID:getNextDescendantID;for(var id=start;; /* until break */id=traverse(id,stop)){var ret;if((!skipFirst||id!==start)&&(!skipLast||id!==stop)){ret=cb(id,traverseUp,arg);}if(ret===false||id===stop){ // Only break //after// visiting `stop`.
break;}"production"!==process.env.NODE_ENV?invariant(depth++<MAX_TREE_DEPTH,'traverseParentPath(%s, %s, ...): Detected an infinite loop while '+'traversing the React DOM ID tree. This may be due to malformed IDs: %s',start,stop):invariant(depth++<MAX_TREE_DEPTH);}} /**
 * Manages the IDs assigned to DOM representations of React components. This
 * uses a specific scheme in order to traverse the DOM efficiently (e.g. in
 * order to simulate events).
 *
 * @internal
 */var ReactInstanceHandles={ /**
   * Constructs a React root ID
   * @return {string} A React root ID.
   */createReactRootID:function createReactRootID(){return getReactRootIDString(ReactRootIndex.createReactRootIndex());}, /**
   * Constructs a React ID by joining a root ID with a name.
   *
   * @param {string} rootID Root ID of a parent component.
   * @param {string} name A component's name (as flattened children).
   * @return {string} A React ID.
   * @internal
   */createReactID:function createReactID(rootID,name){return rootID+name;}, /**
   * Gets the DOM ID of the React component that is the root of the tree that
   * contains the React component with the supplied DOM ID.
   *
   * @param {string} id DOM ID of a React component.
   * @return {?string} DOM ID of the React component that is the root.
   * @internal
   */getReactRootIDFromNodeID:function getReactRootIDFromNodeID(id){if(id&&id.charAt(0)===SEPARATOR&&id.length>1){var index=id.indexOf(SEPARATOR,1);return index>-1?id.substr(0,index):id;}return null;}, /**
   * Traverses the ID hierarchy and invokes the supplied `cb` on any IDs that
   * should would receive a `mouseEnter` or `mouseLeave` event.
   *
   * NOTE: Does not invoke the callback on the nearest common ancestor because
   * nothing "entered" or "left" that element.
   *
   * @param {string} leaveID ID being left.
   * @param {string} enterID ID being entered.
   * @param {function} cb Callback to invoke on each entered/left ID.
   * @param {*} upArg Argument to invoke the callback with on left IDs.
   * @param {*} downArg Argument to invoke the callback with on entered IDs.
   * @internal
   */traverseEnterLeave:function traverseEnterLeave(leaveID,enterID,cb,upArg,downArg){var ancestorID=getFirstCommonAncestorID(leaveID,enterID);if(ancestorID!==leaveID){traverseParentPath(leaveID,ancestorID,cb,upArg,false,true);}if(ancestorID!==enterID){traverseParentPath(ancestorID,enterID,cb,downArg,true,false);}}, /**
   * Simulates the traversal of a two-phase, capture/bubble event dispatch.
   *
   * NOTE: This traversal happens on IDs without touching the DOM.
   *
   * @param {string} targetID ID of the target node.
   * @param {function} cb Callback to invoke.
   * @param {*} arg Argument to invoke the callback with.
   * @internal
   */traverseTwoPhase:function traverseTwoPhase(targetID,cb,arg){if(targetID){traverseParentPath('',targetID,cb,arg,true,false);traverseParentPath(targetID,'',cb,arg,false,true);}}, /**
   * Traverse a node ID, calling the supplied `cb` for each ancestor ID. For
   * example, passing `.0.$row-0.1` would result in `cb` getting called
   * with `.0`, `.0.$row-0`, and `.0.$row-0.1`.
   *
   * NOTE: This traversal happens on IDs without touching the DOM.
   *
   * @param {string} targetID ID of the target node.
   * @param {function} cb Callback to invoke.
   * @param {*} arg Argument to invoke the callback with.
   * @internal
   */traverseAncestors:function traverseAncestors(targetID,cb,arg){traverseParentPath('',targetID,cb,arg,true,false);}, /**
   * Exposed for unit testing.
   * @private
   */_getFirstCommonAncestorID:getFirstCommonAncestorID, /**
   * Exposed for unit testing.
   * @private
   */_getNextDescendantID:getNextDescendantID,isAncestorIDOf:isAncestorIDOf,SEPARATOR:SEPARATOR};module.exports=ReactInstanceHandles;}).call(this,require("e/U+97"));},{"./ReactRootIndex":75,"./invariant":123,"e/U+97":3}],63:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactMarkupChecksum
 */"use strict";var adler32=require("./adler32");var ReactMarkupChecksum={CHECKSUM_ATTR_NAME:'data-react-checksum', /**
   * @param {string} markup Markup string
   * @return {string} Markup string with checksum attribute attached
   */addChecksumToMarkup:function addChecksumToMarkup(markup){var checksum=adler32(markup);return markup.replace('>',' '+ReactMarkupChecksum.CHECKSUM_ATTR_NAME+'="'+checksum+'">');}, /**
   * @param {string} markup to use
   * @param {DOMElement} element root React element
   * @returns {boolean} whether or not the markup is the same
   */canReuseMarkup:function canReuseMarkup(markup,element){var existingChecksum=element.getAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);existingChecksum=existingChecksum&&parseInt(existingChecksum,10);var markupChecksum=adler32(markup);return markupChecksum===existingChecksum;}};module.exports=ReactMarkupChecksum;},{"./adler32":98}],64:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactMount
 */"use strict";var DOMProperty=require("./DOMProperty");var ReactBrowserEventEmitter=require("./ReactBrowserEventEmitter");var ReactCurrentOwner=require("./ReactCurrentOwner");var ReactDescriptor=require("./ReactDescriptor");var ReactInstanceHandles=require("./ReactInstanceHandles");var ReactPerf=require("./ReactPerf");var containsNode=require("./containsNode");var getReactRootElementInContainer=require("./getReactRootElementInContainer");var instantiateReactComponent=require("./instantiateReactComponent");var invariant=require("./invariant");var shouldUpdateReactComponent=require("./shouldUpdateReactComponent");var warning=require("./warning");var SEPARATOR=ReactInstanceHandles.SEPARATOR;var ATTR_NAME=DOMProperty.ID_ATTRIBUTE_NAME;var nodeCache={};var ELEMENT_NODE_TYPE=1;var DOC_NODE_TYPE=9; /** Mapping from reactRootID to React component instance. */var instancesByReactRootID={}; /** Mapping from reactRootID to `container` nodes. */var containersByReactRootID={};if("production"!==process.env.NODE_ENV){ /** __DEV__-only mapping from reactRootID to root elements. */var rootElementsByReactRootID={};} // Used to store breadth-first search state in findComponentRoot.
var findComponentRootReusableArray=[]; /**
 * @param {DOMElement} container DOM element that may contain a React component.
 * @return {?string} A "reactRoot" ID, if a React component is rendered.
 */function getReactRootID(container){var rootElement=getReactRootElementInContainer(container);return rootElement&&ReactMount.getID(rootElement);} /**
 * Accessing node[ATTR_NAME] or calling getAttribute(ATTR_NAME) on a form
 * element can return its control whose name or ID equals ATTR_NAME. All
 * DOM nodes support `getAttributeNode` but this can also get called on
 * other objects so just return '' if we're given something other than a
 * DOM node (such as window).
 *
 * @param {?DOMElement|DOMWindow|DOMDocument|DOMTextNode} node DOM node.
 * @return {string} ID of the supplied `domNode`.
 */function getID(node){var id=internalGetID(node);if(id){if(nodeCache.hasOwnProperty(id)){var cached=nodeCache[id];if(cached!==node){"production"!==process.env.NODE_ENV?invariant(!isValid(cached,id),'ReactMount: Two valid but unequal nodes with the same `%s`: %s',ATTR_NAME,id):invariant(!isValid(cached,id));nodeCache[id]=node;}}else {nodeCache[id]=node;}}return id;}function internalGetID(node){ // If node is something like a window, document, or text node, none of
// which support attributes or a .getAttribute method, gracefully return
// the empty string, as if the attribute were missing.
return node&&node.getAttribute&&node.getAttribute(ATTR_NAME)||'';} /**
 * Sets the React-specific ID of the given node.
 *
 * @param {DOMElement} node The DOM node whose ID will be set.
 * @param {string} id The value of the ID attribute.
 */function setID(node,id){var oldID=internalGetID(node);if(oldID!==id){delete nodeCache[oldID];}node.setAttribute(ATTR_NAME,id);nodeCache[id]=node;} /**
 * Finds the node with the supplied React-generated DOM ID.
 *
 * @param {string} id A React-generated DOM ID.
 * @return {DOMElement} DOM node with the suppled `id`.
 * @internal
 */function getNode(id){if(!nodeCache.hasOwnProperty(id)||!isValid(nodeCache[id],id)){nodeCache[id]=ReactMount.findReactNodeByID(id);}return nodeCache[id];} /**
 * A node is "valid" if it is contained by a currently mounted container.
 *
 * This means that the node does not have to be contained by a document in
 * order to be considered valid.
 *
 * @param {?DOMElement} node The candidate DOM node.
 * @param {string} id The expected ID of the node.
 * @return {boolean} Whether the node is contained by a mounted container.
 */function isValid(node,id){if(node){"production"!==process.env.NODE_ENV?invariant(internalGetID(node)===id,'ReactMount: Unexpected modification of `%s`',ATTR_NAME):invariant(internalGetID(node)===id);var container=ReactMount.findReactContainerForID(id);if(container&&containsNode(container,node)){return true;}}return false;} /**
 * Causes the cache to forget about one React-specific ID.
 *
 * @param {string} id The ID to forget.
 */function purgeID(id){delete nodeCache[id];}var deepestNodeSoFar=null;function findDeepestCachedAncestorImpl(ancestorID){var ancestor=nodeCache[ancestorID];if(ancestor&&isValid(ancestor,ancestorID)){deepestNodeSoFar=ancestor;}else { // This node isn't populated in the cache, so presumably none of its
// descendants are. Break out of the loop.
return false;}} /**
 * Return the deepest cached node whose ID is a prefix of `targetID`.
 */function findDeepestCachedAncestor(targetID){deepestNodeSoFar=null;ReactInstanceHandles.traverseAncestors(targetID,findDeepestCachedAncestorImpl);var foundNode=deepestNodeSoFar;deepestNodeSoFar=null;return foundNode;} /**
 * Mounting is the process of initializing a React component by creatings its
 * representative DOM elements and inserting them into a supplied `container`.
 * Any prior content inside `container` is destroyed in the process.
 *
 *   ReactMount.renderComponent(
 *     component,
 *     document.getElementById('container')
 *   );
 *
 *   <div id="container">                   <-- Supplied `container`.
 *     <div data-reactid=".3">              <-- Rendered reactRoot of React
 *       // ...                                 component.
 *     </div>
 *   </div>
 *
 * Inside of `container`, the first element rendered is the "reactRoot".
 */var ReactMount={ /** Exposed for debugging purposes **/_instancesByReactRootID:instancesByReactRootID, /**
   * This is a hook provided to support rendering React components while
   * ensuring that the apparent scroll position of its `container` does not
   * change.
   *
   * @param {DOMElement} container The `container` being rendered into.
   * @param {function} renderCallback This must be called once to do the render.
   */scrollMonitor:function scrollMonitor(container,renderCallback){renderCallback();}, /**
   * Take a component that's already mounted into the DOM and replace its props
   * @param {ReactComponent} prevComponent component instance already in the DOM
   * @param {ReactComponent} nextComponent component instance to render
   * @param {DOMElement} container container to render into
   * @param {?function} callback function triggered on completion
   */_updateRootComponent:function _updateRootComponent(prevComponent,nextComponent,container,callback){var nextProps=nextComponent.props;ReactMount.scrollMonitor(container,function(){prevComponent.replaceProps(nextProps,callback);});if("production"!==process.env.NODE_ENV){ // Record the root element in case it later gets transplanted.
rootElementsByReactRootID[getReactRootID(container)]=getReactRootElementInContainer(container);}return prevComponent;}, /**
   * Register a component into the instance map and starts scroll value
   * monitoring
   * @param {ReactComponent} nextComponent component instance to render
   * @param {DOMElement} container container to render into
   * @return {string} reactRoot ID prefix
   */_registerComponent:function _registerComponent(nextComponent,container){"production"!==process.env.NODE_ENV?invariant(container&&(container.nodeType===ELEMENT_NODE_TYPE||container.nodeType===DOC_NODE_TYPE),'_registerComponent(...): Target container is not a DOM element.'):invariant(container&&(container.nodeType===ELEMENT_NODE_TYPE||container.nodeType===DOC_NODE_TYPE));ReactBrowserEventEmitter.ensureScrollValueMonitoring();var reactRootID=ReactMount.registerContainer(container);instancesByReactRootID[reactRootID]=nextComponent;return reactRootID;}, /**
   * Render a new component into the DOM.
   * @param {ReactComponent} nextComponent component instance to render
   * @param {DOMElement} container container to render into
   * @param {boolean} shouldReuseMarkup if we should skip the markup insertion
   * @return {ReactComponent} nextComponent
   */_renderNewRootComponent:ReactPerf.measure('ReactMount','_renderNewRootComponent',function(nextComponent,container,shouldReuseMarkup){ // Various parts of our code (such as ReactCompositeComponent's
// _renderValidatedComponent) assume that calls to render aren't nested;
// verify that that's the case.
"production"!==process.env.NODE_ENV?warning(ReactCurrentOwner.current==null,'_renderNewRootComponent(): Render methods should be a pure function '+'of props and state; triggering nested component updates from '+'render is not allowed. If necessary, trigger nested updates in '+'componentDidUpdate.'):null;var componentInstance=instantiateReactComponent(nextComponent);var reactRootID=ReactMount._registerComponent(componentInstance,container);componentInstance.mountComponentIntoNode(reactRootID,container,shouldReuseMarkup);if("production"!==process.env.NODE_ENV){ // Record the root element in case it later gets transplanted.
rootElementsByReactRootID[reactRootID]=getReactRootElementInContainer(container);}return componentInstance;}), /**
   * Renders a React component into the DOM in the supplied `container`.
   *
   * If the React component was previously rendered into `container`, this will
   * perform an update on it and only mutate the DOM as necessary to reflect the
   * latest React component.
   *
   * @param {ReactDescriptor} nextDescriptor Component descriptor to render.
   * @param {DOMElement} container DOM element to render into.
   * @param {?function} callback function triggered on completion
   * @return {ReactComponent} Component instance rendered in `container`.
   */renderComponent:function renderComponent(nextDescriptor,container,callback){"production"!==process.env.NODE_ENV?invariant(ReactDescriptor.isValidDescriptor(nextDescriptor),'renderComponent(): Invalid component descriptor.%s',ReactDescriptor.isValidFactory(nextDescriptor)?' Instead of passing a component class, make sure to instantiate '+'it first by calling it with props.': // Check if it quacks like a descriptor
typeof nextDescriptor.props!=="undefined"?' This may be caused by unintentionally loading two independent '+'copies of React.':''):invariant(ReactDescriptor.isValidDescriptor(nextDescriptor));var prevComponent=instancesByReactRootID[getReactRootID(container)];if(prevComponent){var prevDescriptor=prevComponent._descriptor;if(shouldUpdateReactComponent(prevDescriptor,nextDescriptor)){return ReactMount._updateRootComponent(prevComponent,nextDescriptor,container,callback);}else {ReactMount.unmountComponentAtNode(container);}}var reactRootElement=getReactRootElementInContainer(container);var containerHasReactMarkup=reactRootElement&&ReactMount.isRenderedByReact(reactRootElement);var shouldReuseMarkup=containerHasReactMarkup&&!prevComponent;var component=ReactMount._renderNewRootComponent(nextDescriptor,container,shouldReuseMarkup);callback&&callback.call(component);return component;}, /**
   * Constructs a component instance of `constructor` with `initialProps` and
   * renders it into the supplied `container`.
   *
   * @param {function} constructor React component constructor.
   * @param {?object} props Initial props of the component instance.
   * @param {DOMElement} container DOM element to render into.
   * @return {ReactComponent} Component instance rendered in `container`.
   */constructAndRenderComponent:function constructAndRenderComponent(constructor,props,container){return ReactMount.renderComponent(constructor(props),container);}, /**
   * Constructs a component instance of `constructor` with `initialProps` and
   * renders it into a container node identified by supplied `id`.
   *
   * @param {function} componentConstructor React component constructor
   * @param {?object} props Initial props of the component instance.
   * @param {string} id ID of the DOM element to render into.
   * @return {ReactComponent} Component instance rendered in the container node.
   */constructAndRenderComponentByID:function constructAndRenderComponentByID(constructor,props,id){var domNode=document.getElementById(id);"production"!==process.env.NODE_ENV?invariant(domNode,'Tried to get element with id of "%s" but it is not present on the page.',id):invariant(domNode);return ReactMount.constructAndRenderComponent(constructor,props,domNode);}, /**
   * Registers a container node into which React components will be rendered.
   * This also creates the "reactRoot" ID that will be assigned to the element
   * rendered within.
   *
   * @param {DOMElement} container DOM element to register as a container.
   * @return {string} The "reactRoot" ID of elements rendered within.
   */registerContainer:function registerContainer(container){var reactRootID=getReactRootID(container);if(reactRootID){ // If one exists, make sure it is a valid "reactRoot" ID.
reactRootID=ReactInstanceHandles.getReactRootIDFromNodeID(reactRootID);}if(!reactRootID){ // No valid "reactRoot" ID found, create one.
reactRootID=ReactInstanceHandles.createReactRootID();}containersByReactRootID[reactRootID]=container;return reactRootID;}, /**
   * Unmounts and destroys the React component rendered in the `container`.
   *
   * @param {DOMElement} container DOM element containing a React component.
   * @return {boolean} True if a component was found in and unmounted from
   *                   `container`
   */unmountComponentAtNode:function unmountComponentAtNode(container){ // Various parts of our code (such as ReactCompositeComponent's
// _renderValidatedComponent) assume that calls to render aren't nested;
// verify that that's the case. (Strictly speaking, unmounting won't cause a
// render but we still don't expect to be in a render call here.)
"production"!==process.env.NODE_ENV?warning(ReactCurrentOwner.current==null,'unmountComponentAtNode(): Render methods should be a pure function of '+'props and state; triggering nested component updates from render is '+'not allowed. If necessary, trigger nested updates in '+'componentDidUpdate.'):null;var reactRootID=getReactRootID(container);var component=instancesByReactRootID[reactRootID];if(!component){return false;}ReactMount.unmountComponentFromNode(component,container);delete instancesByReactRootID[reactRootID];delete containersByReactRootID[reactRootID];if("production"!==process.env.NODE_ENV){delete rootElementsByReactRootID[reactRootID];}return true;}, /**
   * Unmounts a component and removes it from the DOM.
   *
   * @param {ReactComponent} instance React component instance.
   * @param {DOMElement} container DOM element to unmount from.
   * @final
   * @internal
   * @see {ReactMount.unmountComponentAtNode}
   */unmountComponentFromNode:function unmountComponentFromNode(instance,container){instance.unmountComponent();if(container.nodeType===DOC_NODE_TYPE){container=container.documentElement;} // http://jsperf.com/emptying-a-node
while(container.lastChild){container.removeChild(container.lastChild);}}, /**
   * Finds the container DOM element that contains React component to which the
   * supplied DOM `id` belongs.
   *
   * @param {string} id The ID of an element rendered by a React component.
   * @return {?DOMElement} DOM element that contains the `id`.
   */findReactContainerForID:function findReactContainerForID(id){var reactRootID=ReactInstanceHandles.getReactRootIDFromNodeID(id);var container=containersByReactRootID[reactRootID];if("production"!==process.env.NODE_ENV){var rootElement=rootElementsByReactRootID[reactRootID];if(rootElement&&rootElement.parentNode!==container){"production"!==process.env.NODE_ENV?invariant( // Call internalGetID here because getID calls isValid which calls
// findReactContainerForID (this function).
internalGetID(rootElement)===reactRootID,'ReactMount: Root element ID differed from reactRootID.'):invariant( // Call internalGetID here because getID calls isValid which calls
// findReactContainerForID (this function).
internalGetID(rootElement)===reactRootID);var containerChild=container.firstChild;if(containerChild&&reactRootID===internalGetID(containerChild)){ // If the container has a new child with the same ID as the old
// root element, then rootElementsByReactRootID[reactRootID] is
// just stale and needs to be updated. The case that deserves a
// warning is when the container is empty.
rootElementsByReactRootID[reactRootID]=containerChild;}else {console.warn('ReactMount: Root element has been removed from its original '+'container. New container:',rootElement.parentNode);}}}return container;}, /**
   * Finds an element rendered by React with the supplied ID.
   *
   * @param {string} id ID of a DOM node in the React component.
   * @return {DOMElement} Root DOM node of the React component.
   */findReactNodeByID:function findReactNodeByID(id){var reactRoot=ReactMount.findReactContainerForID(id);return ReactMount.findComponentRoot(reactRoot,id);}, /**
   * True if the supplied `node` is rendered by React.
   *
   * @param {*} node DOM Element to check.
   * @return {boolean} True if the DOM Element appears to be rendered by React.
   * @internal
   */isRenderedByReact:function isRenderedByReact(node){if(node.nodeType!==1){ // Not a DOMElement, therefore not a React component
return false;}var id=ReactMount.getID(node);return id?id.charAt(0)===SEPARATOR:false;}, /**
   * Traverses up the ancestors of the supplied node to find a node that is a
   * DOM representation of a React component.
   *
   * @param {*} node
   * @return {?DOMEventTarget}
   * @internal
   */getFirstReactDOM:function getFirstReactDOM(node){var current=node;while(current&&current.parentNode!==current){if(ReactMount.isRenderedByReact(current)){return current;}current=current.parentNode;}return null;}, /**
   * Finds a node with the supplied `targetID` inside of the supplied
   * `ancestorNode`.  Exploits the ID naming scheme to perform the search
   * quickly.
   *
   * @param {DOMEventTarget} ancestorNode Search from this root.
   * @pararm {string} targetID ID of the DOM representation of the component.
   * @return {DOMEventTarget} DOM node with the supplied `targetID`.
   * @internal
   */findComponentRoot:function findComponentRoot(ancestorNode,targetID){var firstChildren=findComponentRootReusableArray;var childIndex=0;var deepestAncestor=findDeepestCachedAncestor(targetID)||ancestorNode;firstChildren[0]=deepestAncestor.firstChild;firstChildren.length=1;while(childIndex<firstChildren.length){var child=firstChildren[childIndex++];var targetChild;while(child){var childID=ReactMount.getID(child);if(childID){ // Even if we find the node we're looking for, we finish looping
// through its siblings to ensure they're cached so that we don't have
// to revisit this node again. Otherwise, we make n^2 calls to getID
// when visiting the many children of a single node in order.
if(targetID===childID){targetChild=child;}else if(ReactInstanceHandles.isAncestorIDOf(childID,targetID)){ // If we find a child whose ID is an ancestor of the given ID,
// then we can be sure that we only want to search the subtree
// rooted at this child, so we can throw out the rest of the
// search state.
firstChildren.length=childIndex=0;firstChildren.push(child.firstChild);}}else { // If this child had no ID, then there's a chance that it was
// injected automatically by the browser, as when a `<table>`
// element sprouts an extra `<tbody>` child as a side effect of
// `.innerHTML` parsing. Optimistically continue down this
// branch, but not before examining the other siblings.
firstChildren.push(child.firstChild);}child=child.nextSibling;}if(targetChild){ // Emptying firstChildren/findComponentRootReusableArray is
// not necessary for correctness, but it helps the GC reclaim
// any nodes that were left at the end of the search.
firstChildren.length=0;return targetChild;}}firstChildren.length=0;"production"!==process.env.NODE_ENV?invariant(false,'findComponentRoot(..., %s): Unable to find element. This probably '+'means the DOM was unexpectedly mutated (e.g., by the browser), '+'usually due to forgetting a <tbody> when using tables, nesting <p> '+'or <a> tags, or using non-SVG elements in an <svg> parent. Try '+'inspecting the child nodes of the element with React ID `%s`.',targetID,ReactMount.getID(ancestorNode)):invariant(false);}, /**
   * React ID utilities.
   */getReactRootID:getReactRootID,getID:getID,setID:setID,getNode:getNode,purgeID:purgeID};module.exports=ReactMount;}).call(this,require("e/U+97"));},{"./DOMProperty":13,"./ReactBrowserEventEmitter":32,"./ReactCurrentOwner":38,"./ReactDescriptor":54,"./ReactInstanceHandles":62,"./ReactPerf":68,"./containsNode":99,"./getReactRootElementInContainer":117,"./instantiateReactComponent":122,"./invariant":123,"./shouldUpdateReactComponent":143,"./warning":146,"e/U+97":3}],65:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactMultiChild
 * @typechecks static-only
 */"use strict";var ReactComponent=require("./ReactComponent");var ReactMultiChildUpdateTypes=require("./ReactMultiChildUpdateTypes");var flattenChildren=require("./flattenChildren");var instantiateReactComponent=require("./instantiateReactComponent");var shouldUpdateReactComponent=require("./shouldUpdateReactComponent"); /**
 * Updating children of a component may trigger recursive updates. The depth is
 * used to batch recursive updates to render markup more efficiently.
 *
 * @type {number}
 * @private
 */var updateDepth=0; /**
 * Queue of update configuration objects.
 *
 * Each object has a `type` property that is in `ReactMultiChildUpdateTypes`.
 *
 * @type {array<object>}
 * @private
 */var updateQueue=[]; /**
 * Queue of markup to be rendered.
 *
 * @type {array<string>}
 * @private
 */var markupQueue=[]; /**
 * Enqueues markup to be rendered and inserted at a supplied index.
 *
 * @param {string} parentID ID of the parent component.
 * @param {string} markup Markup that renders into an element.
 * @param {number} toIndex Destination index.
 * @private
 */function enqueueMarkup(parentID,markup,toIndex){ // NOTE: Null values reduce hidden classes.
updateQueue.push({parentID:parentID,parentNode:null,type:ReactMultiChildUpdateTypes.INSERT_MARKUP,markupIndex:markupQueue.push(markup)-1,textContent:null,fromIndex:null,toIndex:toIndex});} /**
 * Enqueues moving an existing element to another index.
 *
 * @param {string} parentID ID of the parent component.
 * @param {number} fromIndex Source index of the existing element.
 * @param {number} toIndex Destination index of the element.
 * @private
 */function enqueueMove(parentID,fromIndex,toIndex){ // NOTE: Null values reduce hidden classes.
updateQueue.push({parentID:parentID,parentNode:null,type:ReactMultiChildUpdateTypes.MOVE_EXISTING,markupIndex:null,textContent:null,fromIndex:fromIndex,toIndex:toIndex});} /**
 * Enqueues removing an element at an index.
 *
 * @param {string} parentID ID of the parent component.
 * @param {number} fromIndex Index of the element to remove.
 * @private
 */function enqueueRemove(parentID,fromIndex){ // NOTE: Null values reduce hidden classes.
updateQueue.push({parentID:parentID,parentNode:null,type:ReactMultiChildUpdateTypes.REMOVE_NODE,markupIndex:null,textContent:null,fromIndex:fromIndex,toIndex:null});} /**
 * Enqueues setting the text content.
 *
 * @param {string} parentID ID of the parent component.
 * @param {string} textContent Text content to set.
 * @private
 */function enqueueTextContent(parentID,textContent){ // NOTE: Null values reduce hidden classes.
updateQueue.push({parentID:parentID,parentNode:null,type:ReactMultiChildUpdateTypes.TEXT_CONTENT,markupIndex:null,textContent:textContent,fromIndex:null,toIndex:null});} /**
 * Processes any enqueued updates.
 *
 * @private
 */function processQueue(){if(updateQueue.length){ReactComponent.BackendIDOperations.dangerouslyProcessChildrenUpdates(updateQueue,markupQueue);clearQueue();}} /**
 * Clears any enqueued updates.
 *
 * @private
 */function clearQueue(){updateQueue.length=0;markupQueue.length=0;} /**
 * ReactMultiChild are capable of reconciling multiple children.
 *
 * @class ReactMultiChild
 * @internal
 */var ReactMultiChild={ /**
   * Provides common functionality for components that must reconcile multiple
   * children. This is used by `ReactDOMComponent` to mount, update, and
   * unmount child components.
   *
   * @lends {ReactMultiChild.prototype}
   */Mixin:{ /**
     * Generates a "mount image" for each of the supplied children. In the case
     * of `ReactDOMComponent`, a mount image is a string of markup.
     *
     * @param {?object} nestedChildren Nested child maps.
     * @return {array} An array of mounted representations.
     * @internal
     */mountChildren:function mountChildren(nestedChildren,transaction){var children=flattenChildren(nestedChildren);var mountImages=[];var index=0;this._renderedChildren=children;for(var name in children){var child=children[name];if(children.hasOwnProperty(name)){ // The rendered children must be turned into instances as they're
// mounted.
var childInstance=instantiateReactComponent(child);children[name]=childInstance; // Inlined for performance, see `ReactInstanceHandles.createReactID`.
var rootID=this._rootNodeID+name;var mountImage=childInstance.mountComponent(rootID,transaction,this._mountDepth+1);childInstance._mountIndex=index;mountImages.push(mountImage);index++;}}return mountImages;}, /**
     * Replaces any rendered children with a text content string.
     *
     * @param {string} nextContent String of content.
     * @internal
     */updateTextContent:function updateTextContent(nextContent){updateDepth++;var errorThrown=true;try{var prevChildren=this._renderedChildren; // Remove any rendered children.
for(var name in prevChildren){if(prevChildren.hasOwnProperty(name)){this._unmountChildByName(prevChildren[name],name);}} // Set new text content.
this.setTextContent(nextContent);errorThrown=false;}finally {updateDepth--;if(!updateDepth){errorThrown?clearQueue():processQueue();}}}, /**
     * Updates the rendered children with new children.
     *
     * @param {?object} nextNestedChildren Nested child maps.
     * @param {ReactReconcileTransaction} transaction
     * @internal
     */updateChildren:function updateChildren(nextNestedChildren,transaction){updateDepth++;var errorThrown=true;try{this._updateChildren(nextNestedChildren,transaction);errorThrown=false;}finally {updateDepth--;if(!updateDepth){errorThrown?clearQueue():processQueue();}}}, /**
     * Improve performance by isolating this hot code path from the try/catch
     * block in `updateChildren`.
     *
     * @param {?object} nextNestedChildren Nested child maps.
     * @param {ReactReconcileTransaction} transaction
     * @final
     * @protected
     */_updateChildren:function _updateChildren(nextNestedChildren,transaction){var nextChildren=flattenChildren(nextNestedChildren);var prevChildren=this._renderedChildren;if(!nextChildren&&!prevChildren){return;}var name; // `nextIndex` will increment for each child in `nextChildren`, but
// `lastIndex` will be the last index visited in `prevChildren`.
var lastIndex=0;var nextIndex=0;for(name in nextChildren){if(!nextChildren.hasOwnProperty(name)){continue;}var prevChild=prevChildren&&prevChildren[name];var prevDescriptor=prevChild&&prevChild._descriptor;var nextDescriptor=nextChildren[name];if(shouldUpdateReactComponent(prevDescriptor,nextDescriptor)){this.moveChild(prevChild,nextIndex,lastIndex);lastIndex=Math.max(prevChild._mountIndex,lastIndex);prevChild.receiveComponent(nextDescriptor,transaction);prevChild._mountIndex=nextIndex;}else {if(prevChild){ // Update `lastIndex` before `_mountIndex` gets unset by unmounting.
lastIndex=Math.max(prevChild._mountIndex,lastIndex);this._unmountChildByName(prevChild,name);} // The child must be instantiated before it's mounted.
var nextChildInstance=instantiateReactComponent(nextDescriptor);this._mountChildByNameAtIndex(nextChildInstance,name,nextIndex,transaction);}nextIndex++;} // Remove children that are no longer present.
for(name in prevChildren){if(prevChildren.hasOwnProperty(name)&&!(nextChildren&&nextChildren[name])){this._unmountChildByName(prevChildren[name],name);}}}, /**
     * Unmounts all rendered children. This should be used to clean up children
     * when this component is unmounted.
     *
     * @internal
     */unmountChildren:function unmountChildren(){var renderedChildren=this._renderedChildren;for(var name in renderedChildren){var renderedChild=renderedChildren[name]; // TODO: When is this not true?
if(renderedChild.unmountComponent){renderedChild.unmountComponent();}}this._renderedChildren=null;}, /**
     * Moves a child component to the supplied index.
     *
     * @param {ReactComponent} child Component to move.
     * @param {number} toIndex Destination index of the element.
     * @param {number} lastIndex Last index visited of the siblings of `child`.
     * @protected
     */moveChild:function moveChild(child,toIndex,lastIndex){ // If the index of `child` is less than `lastIndex`, then it needs to
// be moved. Otherwise, we do not need to move it because a child will be
// inserted or moved before `child`.
if(child._mountIndex<lastIndex){enqueueMove(this._rootNodeID,child._mountIndex,toIndex);}}, /**
     * Creates a child component.
     *
     * @param {ReactComponent} child Component to create.
     * @param {string} mountImage Markup to insert.
     * @protected
     */createChild:function createChild(child,mountImage){enqueueMarkup(this._rootNodeID,mountImage,child._mountIndex);}, /**
     * Removes a child component.
     *
     * @param {ReactComponent} child Child to remove.
     * @protected
     */removeChild:function removeChild(child){enqueueRemove(this._rootNodeID,child._mountIndex);}, /**
     * Sets this text content string.
     *
     * @param {string} textContent Text content to set.
     * @protected
     */setTextContent:function setTextContent(textContent){enqueueTextContent(this._rootNodeID,textContent);}, /**
     * Mounts a child with the supplied name.
     *
     * NOTE: This is part of `updateChildren` and is here for readability.
     *
     * @param {ReactComponent} child Component to mount.
     * @param {string} name Name of the child.
     * @param {number} index Index at which to insert the child.
     * @param {ReactReconcileTransaction} transaction
     * @private
     */_mountChildByNameAtIndex:function _mountChildByNameAtIndex(child,name,index,transaction){ // Inlined for performance, see `ReactInstanceHandles.createReactID`.
var rootID=this._rootNodeID+name;var mountImage=child.mountComponent(rootID,transaction,this._mountDepth+1);child._mountIndex=index;this.createChild(child,mountImage);this._renderedChildren=this._renderedChildren||{};this._renderedChildren[name]=child;}, /**
     * Unmounts a rendered child by name.
     *
     * NOTE: This is part of `updateChildren` and is here for readability.
     *
     * @param {ReactComponent} child Component to unmount.
     * @param {string} name Name of the child in `this._renderedChildren`.
     * @private
     */_unmountChildByName:function _unmountChildByName(child,name){this.removeChild(child);child._mountIndex=null;child.unmountComponent();delete this._renderedChildren[name];}}};module.exports=ReactMultiChild;},{"./ReactComponent":34,"./ReactMultiChildUpdateTypes":66,"./flattenChildren":108,"./instantiateReactComponent":122,"./shouldUpdateReactComponent":143}],66:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactMultiChildUpdateTypes
 */"use strict";var keyMirror=require("./keyMirror"); /**
 * When a component's children are updated, a series of update configuration
 * objects are created in order to batch and serialize the required changes.
 *
 * Enumerates all the possible types of update configurations.
 *
 * @internal
 */var ReactMultiChildUpdateTypes=keyMirror({INSERT_MARKUP:null,MOVE_EXISTING:null,REMOVE_NODE:null,TEXT_CONTENT:null});module.exports=ReactMultiChildUpdateTypes;},{"./keyMirror":129}],67:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactOwner
 */"use strict";var emptyObject=require("./emptyObject");var invariant=require("./invariant"); /**
 * ReactOwners are capable of storing references to owned components.
 *
 * All components are capable of //being// referenced by owner components, but
 * only ReactOwner components are capable of //referencing// owned components.
 * The named reference is known as a "ref".
 *
 * Refs are available when mounted and updated during reconciliation.
 *
 *   var MyComponent = React.createClass({
 *     render: function() {
 *       return (
 *         <div onClick={this.handleClick}>
 *           <CustomComponent ref="custom" />
 *         </div>
 *       );
 *     },
 *     handleClick: function() {
 *       this.refs.custom.handleClick();
 *     },
 *     componentDidMount: function() {
 *       this.refs.custom.initialize();
 *     }
 *   });
 *
 * Refs should rarely be used. When refs are used, they should only be done to
 * control data that is not handled by React's data flow.
 *
 * @class ReactOwner
 */var ReactOwner={ /**
   * @param {?object} object
   * @return {boolean} True if `object` is a valid owner.
   * @final
   */isValidOwner:function isValidOwner(object){return !!(object&&typeof object.attachRef==='function'&&typeof object.detachRef==='function');}, /**
   * Adds a component by ref to an owner component.
   *
   * @param {ReactComponent} component Component to reference.
   * @param {string} ref Name by which to refer to the component.
   * @param {ReactOwner} owner Component on which to record the ref.
   * @final
   * @internal
   */addComponentAsRefTo:function addComponentAsRefTo(component,ref,owner){"production"!==process.env.NODE_ENV?invariant(ReactOwner.isValidOwner(owner),'addComponentAsRefTo(...): Only a ReactOwner can have refs. This '+'usually means that you\'re trying to add a ref to a component that '+'doesn\'t have an owner (that is, was not created inside of another '+'component\'s `render` method). Try rendering this component inside of '+'a new top-level component which will hold the ref.'):invariant(ReactOwner.isValidOwner(owner));owner.attachRef(ref,component);}, /**
   * Removes a component by ref from an owner component.
   *
   * @param {ReactComponent} component Component to dereference.
   * @param {string} ref Name of the ref to remove.
   * @param {ReactOwner} owner Component on which the ref is recorded.
   * @final
   * @internal
   */removeComponentAsRefFrom:function removeComponentAsRefFrom(component,ref,owner){"production"!==process.env.NODE_ENV?invariant(ReactOwner.isValidOwner(owner),'removeComponentAsRefFrom(...): Only a ReactOwner can have refs. This '+'usually means that you\'re trying to remove a ref to a component that '+'doesn\'t have an owner (that is, was not created inside of another '+'component\'s `render` method). Try rendering this component inside of '+'a new top-level component which will hold the ref.'):invariant(ReactOwner.isValidOwner(owner)); // Check that `component` is still the current ref because we do not want to
// detach the ref if another component stole it.
if(owner.refs[ref]===component){owner.detachRef(ref);}}, /**
   * A ReactComponent must mix this in to have refs.
   *
   * @lends {ReactOwner.prototype}
   */Mixin:{construct:function construct(){this.refs=emptyObject;}, /**
     * Lazily allocates the refs object and stores `component` as `ref`.
     *
     * @param {string} ref Reference name.
     * @param {component} component Component to store as `ref`.
     * @final
     * @private
     */attachRef:function attachRef(ref,component){"production"!==process.env.NODE_ENV?invariant(component.isOwnedBy(this),'attachRef(%s, ...): Only a component\'s owner can store a ref to it.',ref):invariant(component.isOwnedBy(this));var refs=this.refs===emptyObject?this.refs={}:this.refs;refs[ref]=component;}, /**
     * Detaches a reference name.
     *
     * @param {string} ref Name to dereference.
     * @final
     * @private
     */detachRef:function detachRef(ref){delete this.refs[ref];}}};module.exports=ReactOwner;}).call(this,require("e/U+97"));},{"./emptyObject":106,"./invariant":123,"e/U+97":3}],68:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactPerf
 * @typechecks static-only
 */"use strict"; /**
 * ReactPerf is a general AOP system designed to measure performance. This
 * module only has the hooks: see ReactDefaultPerf for the analysis tool.
 */var ReactPerf={ /**
   * Boolean to enable/disable measurement. Set to false by default to prevent
   * accidental logging and perf loss.
   */enableMeasure:false, /**
   * Holds onto the measure function in use. By default, don't measure
   * anything, but we'll override this if we inject a measure function.
   */storedMeasure:_noMeasure, /**
   * Use this to wrap methods you want to measure. Zero overhead in production.
   *
   * @param {string} objName
   * @param {string} fnName
   * @param {function} func
   * @return {function}
   */measure:function measure(objName,fnName,func){if("production"!==process.env.NODE_ENV){var measuredFunc=null;return function(){if(ReactPerf.enableMeasure){if(!measuredFunc){measuredFunc=ReactPerf.storedMeasure(objName,fnName,func);}return measuredFunc.apply(this,arguments);}return func.apply(this,arguments);};}return func;},injection:{ /**
     * @param {function} measure
     */injectMeasure:function injectMeasure(measure){ReactPerf.storedMeasure=measure;}}}; /**
 * Simply passes through the measured function, without measuring it.
 *
 * @param {string} objName
 * @param {string} fnName
 * @param {function} func
 * @return {function}
 */function _noMeasure(objName,fnName,func){return func;}module.exports=ReactPerf;}).call(this,require("e/U+97"));},{"e/U+97":3}],69:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactPropTransferer
 */"use strict";var emptyFunction=require("./emptyFunction");var invariant=require("./invariant");var joinClasses=require("./joinClasses");var merge=require("./merge"); /**
 * Creates a transfer strategy that will merge prop values using the supplied
 * `mergeStrategy`. If a prop was previously unset, this just sets it.
 *
 * @param {function} mergeStrategy
 * @return {function}
 */function createTransferStrategy(mergeStrategy){return function(props,key,value){if(!props.hasOwnProperty(key)){props[key]=value;}else {props[key]=mergeStrategy(props[key],value);}};}var transferStrategyMerge=createTransferStrategy(function(a,b){ // `merge` overrides the first object's (`props[key]` above) keys using the
// second object's (`value`) keys. An object's style's existing `propA` would
// get overridden. Flip the order here.
return merge(b,a);}); /**
 * Transfer strategies dictate how props are transferred by `transferPropsTo`.
 * NOTE: if you add any more exceptions to this list you should be sure to
 * update `cloneWithProps()` accordingly.
 */var TransferStrategies={ /**
   * Never transfer `children`.
   */children:emptyFunction, /**
   * Transfer the `className` prop by merging them.
   */className:createTransferStrategy(joinClasses), /**
   * Never transfer the `key` prop.
   */key:emptyFunction, /**
   * Never transfer the `ref` prop.
   */ref:emptyFunction, /**
   * Transfer the `style` prop (which is an object) by merging them.
   */style:transferStrategyMerge}; /**
 * Mutates the first argument by transferring the properties from the second
 * argument.
 *
 * @param {object} props
 * @param {object} newProps
 * @return {object}
 */function transferInto(props,newProps){for(var thisKey in newProps){if(!newProps.hasOwnProperty(thisKey)){continue;}var transferStrategy=TransferStrategies[thisKey];if(transferStrategy&&TransferStrategies.hasOwnProperty(thisKey)){transferStrategy(props,thisKey,newProps[thisKey]);}else if(!props.hasOwnProperty(thisKey)){props[thisKey]=newProps[thisKey];}}return props;} /**
 * ReactPropTransferer are capable of transferring props to another component
 * using a `transferPropsTo` method.
 *
 * @class ReactPropTransferer
 */var ReactPropTransferer={TransferStrategies:TransferStrategies, /**
   * Merge two props objects using TransferStrategies.
   *
   * @param {object} oldProps original props (they take precedence)
   * @param {object} newProps new props to merge in
   * @return {object} a new object containing both sets of props merged.
   */mergeProps:function mergeProps(oldProps,newProps){return transferInto(merge(oldProps),newProps);}, /**
   * @lends {ReactPropTransferer.prototype}
   */Mixin:{ /**
     * Transfer props from this component to a target component.
     *
     * Props that do not have an explicit transfer strategy will be transferred
     * only if the target component does not already have the prop set.
     *
     * This is usually used to pass down props to a returned root component.
     *
     * @param {ReactDescriptor} descriptor Component receiving the properties.
     * @return {ReactDescriptor} The supplied `component`.
     * @final
     * @protected
     */transferPropsTo:function transferPropsTo(descriptor){"production"!==process.env.NODE_ENV?invariant(descriptor._owner===this,'%s: You can\'t call transferPropsTo() on a component that you '+'don\'t own, %s. This usually means you are calling '+'transferPropsTo() on a component passed in as props or children.',this.constructor.displayName,descriptor.type.displayName):invariant(descriptor._owner===this); // Because descriptors are immutable we have to merge into the existing
// props object rather than clone it.
transferInto(descriptor.props,this.props);return descriptor;}}};module.exports=ReactPropTransferer;}).call(this,require("e/U+97"));},{"./emptyFunction":105,"./invariant":123,"./joinClasses":128,"./merge":133,"e/U+97":3}],70:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactPropTypeLocationNames
 */"use strict";var ReactPropTypeLocationNames={};if("production"!==process.env.NODE_ENV){ReactPropTypeLocationNames={prop:'prop',context:'context',childContext:'child context'};}module.exports=ReactPropTypeLocationNames;}).call(this,require("e/U+97"));},{"e/U+97":3}],71:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactPropTypeLocations
 */"use strict";var keyMirror=require("./keyMirror");var ReactPropTypeLocations=keyMirror({prop:null,context:null,childContext:null});module.exports=ReactPropTypeLocations;},{"./keyMirror":129}],72:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactPropTypes
 */"use strict";var ReactDescriptor=require("./ReactDescriptor");var ReactPropTypeLocationNames=require("./ReactPropTypeLocationNames");var emptyFunction=require("./emptyFunction"); /**
 * Collection of methods that allow declaration and validation of props that are
 * supplied to React components. Example usage:
 *
 *   var Props = require('ReactPropTypes');
 *   var MyArticle = React.createClass({
 *     propTypes: {
 *       // An optional string prop named "description".
 *       description: Props.string,
 *
 *       // A required enum prop named "category".
 *       category: Props.oneOf(['News','Photos']).isRequired,
 *
 *       // A prop named "dialog" that requires an instance of Dialog.
 *       dialog: Props.instanceOf(Dialog).isRequired
 *     },
 *     render: function() { ... }
 *   });
 *
 * A more formal specification of how these methods are used:
 *
 *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
 *   decl := ReactPropTypes.{type}(.isRequired)?
 *
 * Each and every declaration produces a function with the same signature. This
 * allows the creation of custom validation functions. For example:
 *
 *  var MyLink = React.createClass({
 *    propTypes: {
 *      // An optional string or URI prop named "href".
 *      href: function(props, propName, componentName) {
 *        var propValue = props[propName];
 *        if (propValue != null && typeof propValue !== 'string' &&
 *            !(propValue instanceof URI)) {
 *          return new Error(
 *            'Expected a string or an URI for ' + propName + ' in ' +
 *            componentName
 *          );
 *        }
 *      }
 *    },
 *    render: function() {...}
 *  });
 *
 * @internal
 */var ANONYMOUS='<<anonymous>>';var ReactPropTypes={array:createPrimitiveTypeChecker('array'),bool:createPrimitiveTypeChecker('boolean'),func:createPrimitiveTypeChecker('function'),number:createPrimitiveTypeChecker('number'),object:createPrimitiveTypeChecker('object'),string:createPrimitiveTypeChecker('string'),any:createAnyTypeChecker(),arrayOf:createArrayOfTypeChecker,component:createComponentTypeChecker(),instanceOf:createInstanceTypeChecker,objectOf:createObjectOfTypeChecker,oneOf:createEnumTypeChecker,oneOfType:createUnionTypeChecker,renderable:createRenderableTypeChecker(),shape:createShapeTypeChecker};function createChainableTypeChecker(validate){function checkType(isRequired,props,propName,componentName,location){componentName=componentName||ANONYMOUS;if(props[propName]==null){var locationName=ReactPropTypeLocationNames[location];if(isRequired){return new Error("Required "+locationName+" `"+propName+"` was not specified in "+("`"+componentName+"`."));}}else {return validate(props,propName,componentName,location);}}var chainedCheckType=checkType.bind(null,false);chainedCheckType.isRequired=checkType.bind(null,true);return chainedCheckType;}function createPrimitiveTypeChecker(expectedType){function validate(props,propName,componentName,location){var propValue=props[propName];var propType=getPropType(propValue);if(propType!==expectedType){var locationName=ReactPropTypeLocationNames[location]; // `propValue` being instance of, say, date/regexp, pass the 'object'
// check, but we can offer a more precise error message here rather than
// 'of type `object`'.
var preciseType=getPreciseType(propValue);return new Error("Invalid "+locationName+" `"+propName+"` of type `"+preciseType+"` "+("supplied to `"+componentName+"`, expected `"+expectedType+"`."));}}return createChainableTypeChecker(validate);}function createAnyTypeChecker(){return createChainableTypeChecker(emptyFunction.thatReturns());}function createArrayOfTypeChecker(typeChecker){function validate(props,propName,componentName,location){var propValue=props[propName];if(!Array.isArray(propValue)){var locationName=ReactPropTypeLocationNames[location];var propType=getPropType(propValue);return new Error("Invalid "+locationName+" `"+propName+"` of type "+("`"+propType+"` supplied to `"+componentName+"`, expected an array."));}for(var i=0;i<propValue.length;i++){var error=typeChecker(propValue,i,componentName,location);if(error instanceof Error){return error;}}}return createChainableTypeChecker(validate);}function createComponentTypeChecker(){function validate(props,propName,componentName,location){if(!ReactDescriptor.isValidDescriptor(props[propName])){var locationName=ReactPropTypeLocationNames[location];return new Error("Invalid "+locationName+" `"+propName+"` supplied to "+("`"+componentName+"`, expected a React component."));}}return createChainableTypeChecker(validate);}function createInstanceTypeChecker(expectedClass){function validate(props,propName,componentName,location){if(!(props[propName] instanceof expectedClass)){var locationName=ReactPropTypeLocationNames[location];var expectedClassName=expectedClass.name||ANONYMOUS;return new Error("Invalid "+locationName+" `"+propName+"` supplied to "+("`"+componentName+"`, expected instance of `"+expectedClassName+"`."));}}return createChainableTypeChecker(validate);}function createEnumTypeChecker(expectedValues){function validate(props,propName,componentName,location){var propValue=props[propName];for(var i=0;i<expectedValues.length;i++){if(propValue===expectedValues[i]){return;}}var locationName=ReactPropTypeLocationNames[location];var valuesString=JSON.stringify(expectedValues);return new Error("Invalid "+locationName+" `"+propName+"` of value `"+propValue+"` "+("supplied to `"+componentName+"`, expected one of "+valuesString+"."));}return createChainableTypeChecker(validate);}function createObjectOfTypeChecker(typeChecker){function validate(props,propName,componentName,location){var propValue=props[propName];var propType=getPropType(propValue);if(propType!=='object'){var locationName=ReactPropTypeLocationNames[location];return new Error("Invalid "+locationName+" `"+propName+"` of type "+("`"+propType+"` supplied to `"+componentName+"`, expected an object."));}for(var key in propValue){if(propValue.hasOwnProperty(key)){var error=typeChecker(propValue,key,componentName,location);if(error instanceof Error){return error;}}}}return createChainableTypeChecker(validate);}function createUnionTypeChecker(arrayOfTypeCheckers){function validate(props,propName,componentName,location){for(var i=0;i<arrayOfTypeCheckers.length;i++){var checker=arrayOfTypeCheckers[i];if(checker(props,propName,componentName,location)==null){return;}}var locationName=ReactPropTypeLocationNames[location];return new Error("Invalid "+locationName+" `"+propName+"` supplied to "+("`"+componentName+"`."));}return createChainableTypeChecker(validate);}function createRenderableTypeChecker(){function validate(props,propName,componentName,location){if(!isRenderable(props[propName])){var locationName=ReactPropTypeLocationNames[location];return new Error("Invalid "+locationName+" `"+propName+"` supplied to "+("`"+componentName+"`, expected a renderable prop."));}}return createChainableTypeChecker(validate);}function createShapeTypeChecker(shapeTypes){function validate(props,propName,componentName,location){var propValue=props[propName];var propType=getPropType(propValue);if(propType!=='object'){var locationName=ReactPropTypeLocationNames[location];return new Error("Invalid "+locationName+" `"+propName+"` of type `"+propType+"` "+("supplied to `"+componentName+"`, expected `object`."));}for(var key in shapeTypes){var checker=shapeTypes[key];if(!checker){continue;}var error=checker(propValue,key,componentName,location);if(error){return error;}}}return createChainableTypeChecker(validate,'expected `object`');}function isRenderable(propValue){switch(typeof propValue==="undefined"?"undefined":_typeof(propValue)){ // TODO: this was probably written with the assumption that we're not
// returning `this.props.component` directly from `render`. This is
// currently not supported but we should, to make it consistent.
case 'number':case 'string':return true;case 'boolean':return !propValue;case 'object':if(Array.isArray(propValue)){return propValue.every(isRenderable);}if(ReactDescriptor.isValidDescriptor(propValue)){return true;}for(var k in propValue){if(!isRenderable(propValue[k])){return false;}}return true;default:return false;}} // Equivalent of `typeof` but with special handling for array and regexp.
function getPropType(propValue){var propType=typeof propValue==="undefined"?"undefined":_typeof(propValue);if(Array.isArray(propValue)){return 'array';}if(propValue instanceof RegExp){ // Old webkits (at least until Android 4.0) return 'function' rather than
// 'object' for typeof a RegExp. We'll normalize this here so that /bla/
// passes PropTypes.object.
return 'object';}return propType;} // This handles more types than `getPropType`. Only used for error messages.
// See `createPrimitiveTypeChecker`.
function getPreciseType(propValue){var propType=getPropType(propValue);if(propType==='object'){if(propValue instanceof Date){return 'date';}else if(propValue instanceof RegExp){return 'regexp';}}return propType;}module.exports=ReactPropTypes;},{"./ReactDescriptor":54,"./ReactPropTypeLocationNames":70,"./emptyFunction":105}],73:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactPutListenerQueue
 */"use strict";var PooledClass=require("./PooledClass");var ReactBrowserEventEmitter=require("./ReactBrowserEventEmitter");var mixInto=require("./mixInto");function ReactPutListenerQueue(){this.listenersToPut=[];}mixInto(ReactPutListenerQueue,{enqueuePutListener:function enqueuePutListener(rootNodeID,propKey,propValue){this.listenersToPut.push({rootNodeID:rootNodeID,propKey:propKey,propValue:propValue});},putListeners:function putListeners(){for(var i=0;i<this.listenersToPut.length;i++){var listenerToPut=this.listenersToPut[i];ReactBrowserEventEmitter.putListener(listenerToPut.rootNodeID,listenerToPut.propKey,listenerToPut.propValue);}},reset:function reset(){this.listenersToPut.length=0;},destructor:function destructor(){this.reset();}});PooledClass.addPoolingTo(ReactPutListenerQueue);module.exports=ReactPutListenerQueue;},{"./PooledClass":29,"./ReactBrowserEventEmitter":32,"./mixInto":136}],74:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactReconcileTransaction
 * @typechecks static-only
 */"use strict";var CallbackQueue=require("./CallbackQueue");var PooledClass=require("./PooledClass");var ReactBrowserEventEmitter=require("./ReactBrowserEventEmitter");var ReactInputSelection=require("./ReactInputSelection");var ReactPutListenerQueue=require("./ReactPutListenerQueue");var Transaction=require("./Transaction");var mixInto=require("./mixInto"); /**
 * Ensures that, when possible, the selection range (currently selected text
 * input) is not disturbed by performing the transaction.
 */var SELECTION_RESTORATION={ /**
   * @return {Selection} Selection information.
   */initialize:ReactInputSelection.getSelectionInformation, /**
   * @param {Selection} sel Selection information returned from `initialize`.
   */close:ReactInputSelection.restoreSelection}; /**
 * Suppresses events (blur/focus) that could be inadvertently dispatched due to
 * high level DOM manipulations (like temporarily removing a text input from the
 * DOM).
 */var EVENT_SUPPRESSION={ /**
   * @return {boolean} The enabled status of `ReactBrowserEventEmitter` before
   * the reconciliation.
   */initialize:function initialize(){var currentlyEnabled=ReactBrowserEventEmitter.isEnabled();ReactBrowserEventEmitter.setEnabled(false);return currentlyEnabled;}, /**
   * @param {boolean} previouslyEnabled Enabled status of
   *   `ReactBrowserEventEmitter` before the reconciliation occured. `close`
   *   restores the previous value.
   */close:function close(previouslyEnabled){ReactBrowserEventEmitter.setEnabled(previouslyEnabled);}}; /**
 * Provides a queue for collecting `componentDidMount` and
 * `componentDidUpdate` callbacks during the the transaction.
 */var ON_DOM_READY_QUEUEING={ /**
   * Initializes the internal `onDOMReady` queue.
   */initialize:function initialize(){this.reactMountReady.reset();}, /**
   * After DOM is flushed, invoke all registered `onDOMReady` callbacks.
   */close:function close(){this.reactMountReady.notifyAll();}};var PUT_LISTENER_QUEUEING={initialize:function initialize(){this.putListenerQueue.reset();},close:function close(){this.putListenerQueue.putListeners();}}; /**
 * Executed within the scope of the `Transaction` instance. Consider these as
 * being member methods, but with an implied ordering while being isolated from
 * each other.
 */var TRANSACTION_WRAPPERS=[PUT_LISTENER_QUEUEING,SELECTION_RESTORATION,EVENT_SUPPRESSION,ON_DOM_READY_QUEUEING]; /**
 * Currently:
 * - The order that these are listed in the transaction is critical:
 * - Suppresses events.
 * - Restores selection range.
 *
 * Future:
 * - Restore document/overflow scroll positions that were unintentionally
 *   modified via DOM insertions above the top viewport boundary.
 * - Implement/integrate with customized constraint based layout system and keep
 *   track of which dimensions must be remeasured.
 *
 * @class ReactReconcileTransaction
 */function ReactReconcileTransaction(){this.reinitializeTransaction(); // Only server-side rendering really needs this option (see
// `ReactServerRendering`), but server-side uses
// `ReactServerRenderingTransaction` instead. This option is here so that it's
// accessible and defaults to false when `ReactDOMComponent` and
// `ReactTextComponent` checks it in `mountComponent`.`
this.renderToStaticMarkup=false;this.reactMountReady=CallbackQueue.getPooled(null);this.putListenerQueue=ReactPutListenerQueue.getPooled();}var Mixin={ /**
   * @see Transaction
   * @abstract
   * @final
   * @return {array<object>} List of operation wrap proceedures.
   *   TODO: convert to array<TransactionWrapper>
   */getTransactionWrappers:function getTransactionWrappers(){return TRANSACTION_WRAPPERS;}, /**
   * @return {object} The queue to collect `onDOMReady` callbacks with.
   */getReactMountReady:function getReactMountReady(){return this.reactMountReady;},getPutListenerQueue:function getPutListenerQueue(){return this.putListenerQueue;}, /**
   * `PooledClass` looks for this, and will invoke this before allowing this
   * instance to be resused.
   */destructor:function destructor(){CallbackQueue.release(this.reactMountReady);this.reactMountReady=null;ReactPutListenerQueue.release(this.putListenerQueue);this.putListenerQueue=null;}};mixInto(ReactReconcileTransaction,Transaction.Mixin);mixInto(ReactReconcileTransaction,Mixin);PooledClass.addPoolingTo(ReactReconcileTransaction);module.exports=ReactReconcileTransaction;},{"./CallbackQueue":8,"./PooledClass":29,"./ReactBrowserEventEmitter":32,"./ReactInputSelection":61,"./ReactPutListenerQueue":73,"./Transaction":95,"./mixInto":136}],75:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactRootIndex
 * @typechecks
 */"use strict";var ReactRootIndexInjection={ /**
   * @param {function} _createReactRootIndex
   */injectCreateReactRootIndex:function injectCreateReactRootIndex(_createReactRootIndex){ReactRootIndex.createReactRootIndex=_createReactRootIndex;}};var ReactRootIndex={createReactRootIndex:null,injection:ReactRootIndexInjection};module.exports=ReactRootIndex;},{}],76:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @typechecks static-only
 * @providesModule ReactServerRendering
 */"use strict";var ReactDescriptor=require("./ReactDescriptor");var ReactInstanceHandles=require("./ReactInstanceHandles");var ReactMarkupChecksum=require("./ReactMarkupChecksum");var ReactServerRenderingTransaction=require("./ReactServerRenderingTransaction");var instantiateReactComponent=require("./instantiateReactComponent");var invariant=require("./invariant"); /**
 * @param {ReactComponent} component
 * @return {string} the HTML markup
 */function renderComponentToString(component){"production"!==process.env.NODE_ENV?invariant(ReactDescriptor.isValidDescriptor(component),'renderComponentToString(): You must pass a valid ReactComponent.'):invariant(ReactDescriptor.isValidDescriptor(component));"production"!==process.env.NODE_ENV?invariant(!(arguments.length===2&&typeof arguments[1]==='function'),'renderComponentToString(): This function became synchronous and now '+'returns the generated markup. Please remove the second parameter.'):invariant(!(arguments.length===2&&typeof arguments[1]==='function'));var transaction;try{var id=ReactInstanceHandles.createReactRootID();transaction=ReactServerRenderingTransaction.getPooled(false);return transaction.perform(function(){var componentInstance=instantiateReactComponent(component);var markup=componentInstance.mountComponent(id,transaction,0);return ReactMarkupChecksum.addChecksumToMarkup(markup);},null);}finally {ReactServerRenderingTransaction.release(transaction);}} /**
 * @param {ReactComponent} component
 * @return {string} the HTML markup, without the extra React ID and checksum
* (for generating static pages)
 */function renderComponentToStaticMarkup(component){"production"!==process.env.NODE_ENV?invariant(ReactDescriptor.isValidDescriptor(component),'renderComponentToStaticMarkup(): You must pass a valid ReactComponent.'):invariant(ReactDescriptor.isValidDescriptor(component));var transaction;try{var id=ReactInstanceHandles.createReactRootID();transaction=ReactServerRenderingTransaction.getPooled(true);return transaction.perform(function(){var componentInstance=instantiateReactComponent(component);return componentInstance.mountComponent(id,transaction,0);},null);}finally {ReactServerRenderingTransaction.release(transaction);}}module.exports={renderComponentToString:renderComponentToString,renderComponentToStaticMarkup:renderComponentToStaticMarkup};}).call(this,require("e/U+97"));},{"./ReactDescriptor":54,"./ReactInstanceHandles":62,"./ReactMarkupChecksum":63,"./ReactServerRenderingTransaction":77,"./instantiateReactComponent":122,"./invariant":123,"e/U+97":3}],77:[function(require,module,exports){ /**
 * Copyright 2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactServerRenderingTransaction
 * @typechecks
 */"use strict";var PooledClass=require("./PooledClass");var CallbackQueue=require("./CallbackQueue");var ReactPutListenerQueue=require("./ReactPutListenerQueue");var Transaction=require("./Transaction");var emptyFunction=require("./emptyFunction");var mixInto=require("./mixInto"); /**
 * Provides a `CallbackQueue` queue for collecting `onDOMReady` callbacks
 * during the performing of the transaction.
 */var ON_DOM_READY_QUEUEING={ /**
   * Initializes the internal `onDOMReady` queue.
   */initialize:function initialize(){this.reactMountReady.reset();},close:emptyFunction};var PUT_LISTENER_QUEUEING={initialize:function initialize(){this.putListenerQueue.reset();},close:emptyFunction}; /**
 * Executed within the scope of the `Transaction` instance. Consider these as
 * being member methods, but with an implied ordering while being isolated from
 * each other.
 */var TRANSACTION_WRAPPERS=[PUT_LISTENER_QUEUEING,ON_DOM_READY_QUEUEING]; /**
 * @class ReactServerRenderingTransaction
 * @param {boolean} renderToStaticMarkup
 */function ReactServerRenderingTransaction(renderToStaticMarkup){this.reinitializeTransaction();this.renderToStaticMarkup=renderToStaticMarkup;this.reactMountReady=CallbackQueue.getPooled(null);this.putListenerQueue=ReactPutListenerQueue.getPooled();}var Mixin={ /**
   * @see Transaction
   * @abstract
   * @final
   * @return {array} Empty list of operation wrap proceedures.
   */getTransactionWrappers:function getTransactionWrappers(){return TRANSACTION_WRAPPERS;}, /**
   * @return {object} The queue to collect `onDOMReady` callbacks with.
   */getReactMountReady:function getReactMountReady(){return this.reactMountReady;},getPutListenerQueue:function getPutListenerQueue(){return this.putListenerQueue;}, /**
   * `PooledClass` looks for this, and will invoke this before allowing this
   * instance to be resused.
   */destructor:function destructor(){CallbackQueue.release(this.reactMountReady);this.reactMountReady=null;ReactPutListenerQueue.release(this.putListenerQueue);this.putListenerQueue=null;}};mixInto(ReactServerRenderingTransaction,Transaction.Mixin);mixInto(ReactServerRenderingTransaction,Mixin);PooledClass.addPoolingTo(ReactServerRenderingTransaction);module.exports=ReactServerRenderingTransaction;},{"./CallbackQueue":8,"./PooledClass":29,"./ReactPutListenerQueue":73,"./Transaction":95,"./emptyFunction":105,"./mixInto":136}],78:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactTextComponent
 * @typechecks static-only
 */"use strict";var DOMPropertyOperations=require("./DOMPropertyOperations");var ReactBrowserComponentMixin=require("./ReactBrowserComponentMixin");var ReactComponent=require("./ReactComponent");var ReactDescriptor=require("./ReactDescriptor");var escapeTextForBrowser=require("./escapeTextForBrowser");var mixInto=require("./mixInto"); /**
 * Text nodes violate a couple assumptions that React makes about components:
 *
 *  - When mounting text into the DOM, adjacent text nodes are merged.
 *  - Text nodes cannot be assigned a React root ID.
 *
 * This component is used to wrap strings in elements so that they can undergo
 * the same reconciliation that is applied to elements.
 *
 * TODO: Investigate representing React components in the DOM with text nodes.
 *
 * @class ReactTextComponent
 * @extends ReactComponent
 * @internal
 */var ReactTextComponent=function ReactTextComponent(descriptor){this.construct(descriptor);};mixInto(ReactTextComponent,ReactComponent.Mixin);mixInto(ReactTextComponent,ReactBrowserComponentMixin);mixInto(ReactTextComponent,{ /**
   * Creates the markup for this text node. This node is not intended to have
   * any features besides containing text content.
   *
   * @param {string} rootID DOM ID of the root node.
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @param {number} mountDepth number of components in the owner hierarchy
   * @return {string} Markup for this text node.
   * @internal
   */mountComponent:function mountComponent(rootID,transaction,mountDepth){ReactComponent.Mixin.mountComponent.call(this,rootID,transaction,mountDepth);var escapedText=escapeTextForBrowser(this.props);if(transaction.renderToStaticMarkup){ // Normally we'd wrap this in a `span` for the reasons stated above, but
// since this is a situation where React won't take over (static pages),
// we can simply return the text as it is.
return escapedText;}return '<span '+DOMPropertyOperations.createMarkupForID(rootID)+'>'+escapedText+'</span>';}, /**
   * Updates this component by updating the text content.
   *
   * @param {object} nextComponent Contains the next text content.
   * @param {ReactReconcileTransaction} transaction
   * @internal
   */receiveComponent:function receiveComponent(nextComponent,transaction){var nextProps=nextComponent.props;if(nextProps!==this.props){this.props=nextProps;ReactComponent.BackendIDOperations.updateTextContentByID(this._rootNodeID,nextProps);}}});module.exports=ReactDescriptor.createFactory(ReactTextComponent);},{"./DOMPropertyOperations":14,"./ReactBrowserComponentMixin":31,"./ReactComponent":34,"./ReactDescriptor":54,"./escapeTextForBrowser":107,"./mixInto":136}],79:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactUpdates
 */"use strict";var CallbackQueue=require("./CallbackQueue");var PooledClass=require("./PooledClass");var ReactCurrentOwner=require("./ReactCurrentOwner");var ReactPerf=require("./ReactPerf");var Transaction=require("./Transaction");var invariant=require("./invariant");var mixInto=require("./mixInto");var warning=require("./warning");var dirtyComponents=[];var batchingStrategy=null;function ensureInjected(){"production"!==process.env.NODE_ENV?invariant(ReactUpdates.ReactReconcileTransaction&&batchingStrategy,'ReactUpdates: must inject a reconcile transaction class and batching '+'strategy'):invariant(ReactUpdates.ReactReconcileTransaction&&batchingStrategy);}var NESTED_UPDATES={initialize:function initialize(){this.dirtyComponentsLength=dirtyComponents.length;},close:function close(){if(this.dirtyComponentsLength!==dirtyComponents.length){ // Additional updates were enqueued by componentDidUpdate handlers or
// similar; before our own UPDATE_QUEUEING wrapper closes, we want to run
// these new updates so that if A's componentDidUpdate calls setState on
// B, B will update before the callback A's updater provided when calling
// setState.
dirtyComponents.splice(0,this.dirtyComponentsLength);flushBatchedUpdates();}else {dirtyComponents.length=0;}}};var UPDATE_QUEUEING={initialize:function initialize(){this.callbackQueue.reset();},close:function close(){this.callbackQueue.notifyAll();}};var TRANSACTION_WRAPPERS=[NESTED_UPDATES,UPDATE_QUEUEING];function ReactUpdatesFlushTransaction(){this.reinitializeTransaction();this.dirtyComponentsLength=null;this.callbackQueue=CallbackQueue.getPooled(null);this.reconcileTransaction=ReactUpdates.ReactReconcileTransaction.getPooled();}mixInto(ReactUpdatesFlushTransaction,Transaction.Mixin);mixInto(ReactUpdatesFlushTransaction,{getTransactionWrappers:function getTransactionWrappers(){return TRANSACTION_WRAPPERS;},destructor:function destructor(){this.dirtyComponentsLength=null;CallbackQueue.release(this.callbackQueue);this.callbackQueue=null;ReactUpdates.ReactReconcileTransaction.release(this.reconcileTransaction);this.reconcileTransaction=null;},perform:function perform(method,scope,a){ // Essentially calls `this.reconcileTransaction.perform(method, scope, a)`
// with this transaction's wrappers around it.
return Transaction.Mixin.perform.call(this,this.reconcileTransaction.perform,this.reconcileTransaction,method,scope,a);}});PooledClass.addPoolingTo(ReactUpdatesFlushTransaction);function batchedUpdates(callback,a,b){ensureInjected();batchingStrategy.batchedUpdates(callback,a,b);} /**
 * Array comparator for ReactComponents by owner depth
 *
 * @param {ReactComponent} c1 first component you're comparing
 * @param {ReactComponent} c2 second component you're comparing
 * @return {number} Return value usable by Array.prototype.sort().
 */function mountDepthComparator(c1,c2){return c1._mountDepth-c2._mountDepth;}function runBatchedUpdates(transaction){var len=transaction.dirtyComponentsLength;"production"!==process.env.NODE_ENV?invariant(len===dirtyComponents.length,'Expected flush transaction\'s stored dirty-components length (%s) to '+'match dirty-components array length (%s).',len,dirtyComponents.length):invariant(len===dirtyComponents.length); // Since reconciling a component higher in the owner hierarchy usually (not
// always -- see shouldComponentUpdate()) will reconcile children, reconcile
// them before their children by sorting the array.
dirtyComponents.sort(mountDepthComparator);for(var i=0;i<len;i++){ // If a component is unmounted before pending changes apply, ignore them
// TODO: Queue unmounts in the same list to avoid this happening at all
var component=dirtyComponents[i];if(component.isMounted()){ // If performUpdateIfNecessary happens to enqueue any new updates, we
// shouldn't execute the callbacks until the next render happens, so
// stash the callbacks first
var callbacks=component._pendingCallbacks;component._pendingCallbacks=null;component.performUpdateIfNecessary(transaction.reconcileTransaction);if(callbacks){for(var j=0;j<callbacks.length;j++){transaction.callbackQueue.enqueue(callbacks[j],component);}}}}}var flushBatchedUpdates=ReactPerf.measure('ReactUpdates','flushBatchedUpdates',function(){ // ReactUpdatesFlushTransaction's wrappers will clear the dirtyComponents
// array and perform any updates enqueued by mount-ready handlers (i.e.,
// componentDidUpdate) but we need to check here too in order to catch
// updates enqueued by setState callbacks.
while(dirtyComponents.length){var transaction=ReactUpdatesFlushTransaction.getPooled();transaction.perform(runBatchedUpdates,null,transaction);ReactUpdatesFlushTransaction.release(transaction);}}); /**
 * Mark a component as needing a rerender, adding an optional callback to a
 * list of functions which will be executed once the rerender occurs.
 */function enqueueUpdate(component,callback){"production"!==process.env.NODE_ENV?invariant(!callback||typeof callback==="function",'enqueueUpdate(...): You called `setProps`, `replaceProps`, '+'`setState`, `replaceState`, or `forceUpdate` with a callback that '+'isn\'t callable.'):invariant(!callback||typeof callback==="function");ensureInjected(); // Various parts of our code (such as ReactCompositeComponent's
// _renderValidatedComponent) assume that calls to render aren't nested;
// verify that that's the case. (This is called by each top-level update
// function, like setProps, setState, forceUpdate, etc.; creation and
// destruction of top-level components is guarded in ReactMount.)
"production"!==process.env.NODE_ENV?warning(ReactCurrentOwner.current==null,'enqueueUpdate(): Render methods should be a pure function of props '+'and state; triggering nested component updates from render is not '+'allowed. If necessary, trigger nested updates in '+'componentDidUpdate.'):null;if(!batchingStrategy.isBatchingUpdates){batchingStrategy.batchedUpdates(enqueueUpdate,component,callback);return;}dirtyComponents.push(component);if(callback){if(component._pendingCallbacks){component._pendingCallbacks.push(callback);}else {component._pendingCallbacks=[callback];}}}var ReactUpdatesInjection={injectReconcileTransaction:function injectReconcileTransaction(ReconcileTransaction){"production"!==process.env.NODE_ENV?invariant(ReconcileTransaction,'ReactUpdates: must provide a reconcile transaction class'):invariant(ReconcileTransaction);ReactUpdates.ReactReconcileTransaction=ReconcileTransaction;},injectBatchingStrategy:function injectBatchingStrategy(_batchingStrategy){"production"!==process.env.NODE_ENV?invariant(_batchingStrategy,'ReactUpdates: must provide a batching strategy'):invariant(_batchingStrategy);"production"!==process.env.NODE_ENV?invariant(typeof _batchingStrategy.batchedUpdates==='function','ReactUpdates: must provide a batchedUpdates() function'):invariant(typeof _batchingStrategy.batchedUpdates==='function');"production"!==process.env.NODE_ENV?invariant(typeof _batchingStrategy.isBatchingUpdates==='boolean','ReactUpdates: must provide an isBatchingUpdates boolean attribute'):invariant(typeof _batchingStrategy.isBatchingUpdates==='boolean');batchingStrategy=_batchingStrategy;}};var ReactUpdates={ /**
   * React references `ReactReconcileTransaction` using this property in order
   * to allow dependency injection.
   *
   * @internal
   */ReactReconcileTransaction:null,batchedUpdates:batchedUpdates,enqueueUpdate:enqueueUpdate,flushBatchedUpdates:flushBatchedUpdates,injection:ReactUpdatesInjection};module.exports=ReactUpdates;}).call(this,require("e/U+97"));},{"./CallbackQueue":8,"./PooledClass":29,"./ReactCurrentOwner":38,"./ReactPerf":68,"./Transaction":95,"./invariant":123,"./mixInto":136,"./warning":146,"e/U+97":3}],80:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SVGDOMPropertyConfig
 */ /*jslint bitwise: true*/"use strict";var DOMProperty=require("./DOMProperty");var MUST_USE_ATTRIBUTE=DOMProperty.injection.MUST_USE_ATTRIBUTE;var SVGDOMPropertyConfig={Properties:{cx:MUST_USE_ATTRIBUTE,cy:MUST_USE_ATTRIBUTE,d:MUST_USE_ATTRIBUTE,dx:MUST_USE_ATTRIBUTE,dy:MUST_USE_ATTRIBUTE,fill:MUST_USE_ATTRIBUTE,fillOpacity:MUST_USE_ATTRIBUTE,fontFamily:MUST_USE_ATTRIBUTE,fontSize:MUST_USE_ATTRIBUTE,fx:MUST_USE_ATTRIBUTE,fy:MUST_USE_ATTRIBUTE,gradientTransform:MUST_USE_ATTRIBUTE,gradientUnits:MUST_USE_ATTRIBUTE,markerEnd:MUST_USE_ATTRIBUTE,markerMid:MUST_USE_ATTRIBUTE,markerStart:MUST_USE_ATTRIBUTE,offset:MUST_USE_ATTRIBUTE,opacity:MUST_USE_ATTRIBUTE,patternContentUnits:MUST_USE_ATTRIBUTE,patternUnits:MUST_USE_ATTRIBUTE,points:MUST_USE_ATTRIBUTE,preserveAspectRatio:MUST_USE_ATTRIBUTE,r:MUST_USE_ATTRIBUTE,rx:MUST_USE_ATTRIBUTE,ry:MUST_USE_ATTRIBUTE,spreadMethod:MUST_USE_ATTRIBUTE,stopColor:MUST_USE_ATTRIBUTE,stopOpacity:MUST_USE_ATTRIBUTE,stroke:MUST_USE_ATTRIBUTE,strokeDasharray:MUST_USE_ATTRIBUTE,strokeLinecap:MUST_USE_ATTRIBUTE,strokeOpacity:MUST_USE_ATTRIBUTE,strokeWidth:MUST_USE_ATTRIBUTE,textAnchor:MUST_USE_ATTRIBUTE,transform:MUST_USE_ATTRIBUTE,version:MUST_USE_ATTRIBUTE,viewBox:MUST_USE_ATTRIBUTE,x1:MUST_USE_ATTRIBUTE,x2:MUST_USE_ATTRIBUTE,x:MUST_USE_ATTRIBUTE,y1:MUST_USE_ATTRIBUTE,y2:MUST_USE_ATTRIBUTE,y:MUST_USE_ATTRIBUTE},DOMAttributeNames:{fillOpacity:'fill-opacity',fontFamily:'font-family',fontSize:'font-size',gradientTransform:'gradientTransform',gradientUnits:'gradientUnits',markerEnd:'marker-end',markerMid:'marker-mid',markerStart:'marker-start',patternContentUnits:'patternContentUnits',patternUnits:'patternUnits',preserveAspectRatio:'preserveAspectRatio',spreadMethod:'spreadMethod',stopColor:'stop-color',stopOpacity:'stop-opacity',strokeDasharray:'stroke-dasharray',strokeLinecap:'stroke-linecap',strokeOpacity:'stroke-opacity',strokeWidth:'stroke-width',textAnchor:'text-anchor',viewBox:'viewBox'}};module.exports=SVGDOMPropertyConfig;},{"./DOMProperty":13}],81:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SelectEventPlugin
 */"use strict";var EventConstants=require("./EventConstants");var EventPropagators=require("./EventPropagators");var ReactInputSelection=require("./ReactInputSelection");var SyntheticEvent=require("./SyntheticEvent");var getActiveElement=require("./getActiveElement");var isTextInputElement=require("./isTextInputElement");var keyOf=require("./keyOf");var shallowEqual=require("./shallowEqual");var topLevelTypes=EventConstants.topLevelTypes;var eventTypes={select:{phasedRegistrationNames:{bubbled:keyOf({onSelect:null}),captured:keyOf({onSelectCapture:null})},dependencies:[topLevelTypes.topBlur,topLevelTypes.topContextMenu,topLevelTypes.topFocus,topLevelTypes.topKeyDown,topLevelTypes.topMouseDown,topLevelTypes.topMouseUp,topLevelTypes.topSelectionChange]}};var activeElement=null;var activeElementID=null;var lastSelection=null;var mouseDown=false; /**
 * Get an object which is a unique representation of the current selection.
 *
 * The return value will not be consistent across nodes or browsers, but
 * two identical selections on the same node will return identical objects.
 *
 * @param {DOMElement} node
 * @param {object}
 */function getSelection(node){if('selectionStart' in node&&ReactInputSelection.hasSelectionCapabilities(node)){return {start:node.selectionStart,end:node.selectionEnd};}else if(document.selection){var range=document.selection.createRange();return {parentElement:range.parentElement(),text:range.text,top:range.boundingTop,left:range.boundingLeft};}else {var selection=window.getSelection();return {anchorNode:selection.anchorNode,anchorOffset:selection.anchorOffset,focusNode:selection.focusNode,focusOffset:selection.focusOffset};}} /**
 * Poll selection to see whether it's changed.
 *
 * @param {object} nativeEvent
 * @return {?SyntheticEvent}
 */function constructSelectEvent(nativeEvent){ // Ensure we have the right element, and that the user is not dragging a
// selection (this matches native `select` event behavior). In HTML5, select
// fires only on input and textarea thus if there's no focused element we
// won't dispatch.
if(mouseDown||activeElement==null||activeElement!=getActiveElement()){return;} // Only fire when selection has actually changed.
var currentSelection=getSelection(activeElement);if(!lastSelection||!shallowEqual(lastSelection,currentSelection)){lastSelection=currentSelection;var syntheticEvent=SyntheticEvent.getPooled(eventTypes.select,activeElementID,nativeEvent);syntheticEvent.type='select';syntheticEvent.target=activeElement;EventPropagators.accumulateTwoPhaseDispatches(syntheticEvent);return syntheticEvent;}} /**
 * This plugin creates an `onSelect` event that normalizes select events
 * across form elements.
 *
 * Supported elements are:
 * - input (see `isTextInputElement`)
 * - textarea
 * - contentEditable
 *
 * This differs from native browser implementations in the following ways:
 * - Fires on contentEditable fields as well as inputs.
 * - Fires for collapsed selection.
 * - Fires after user input.
 */var SelectEventPlugin={eventTypes:eventTypes, /**
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {*} An accumulation of synthetic events.
   * @see {EventPluginHub.extractEvents}
   */extractEvents:function extractEvents(topLevelType,topLevelTarget,topLevelTargetID,nativeEvent){switch(topLevelType){ // Track the input node that has focus.
case topLevelTypes.topFocus:if(isTextInputElement(topLevelTarget)||topLevelTarget.contentEditable==='true'){activeElement=topLevelTarget;activeElementID=topLevelTargetID;lastSelection=null;}break;case topLevelTypes.topBlur:activeElement=null;activeElementID=null;lastSelection=null;break; // Don't fire the event while the user is dragging. This matches the
// semantics of the native select event.
case topLevelTypes.topMouseDown:mouseDown=true;break;case topLevelTypes.topContextMenu:case topLevelTypes.topMouseUp:mouseDown=false;return constructSelectEvent(nativeEvent); // Chrome and IE fire non-standard event when selection is changed (and
// sometimes when it hasn't).
// Firefox doesn't support selectionchange, so check selection status
// after each key entry. The selection changes after keydown and before
// keyup, but we check on keydown as well in the case of holding down a
// key, when multiple keydown events are fired but only one keyup is.
case topLevelTypes.topSelectionChange:case topLevelTypes.topKeyDown:case topLevelTypes.topKeyUp:return constructSelectEvent(nativeEvent);}}};module.exports=SelectEventPlugin;},{"./EventConstants":18,"./EventPropagators":23,"./ReactInputSelection":61,"./SyntheticEvent":87,"./getActiveElement":111,"./isTextInputElement":126,"./keyOf":130,"./shallowEqual":142}],82:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ServerReactRootIndex
 * @typechecks
 */"use strict"; /**
 * Size of the reactRoot ID space. We generate random numbers for React root
 * IDs and if there's a collision the events and DOM update system will
 * get confused. In the future we need a way to generate GUIDs but for
 * now this will work on a smaller scale.
 */var GLOBAL_MOUNT_POINT_MAX=Math.pow(2,53);var ServerReactRootIndex={createReactRootIndex:function createReactRootIndex(){return Math.ceil(Math.random()*GLOBAL_MOUNT_POINT_MAX);}};module.exports=ServerReactRootIndex;},{}],83:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SimpleEventPlugin
 */"use strict";var EventConstants=require("./EventConstants");var EventPluginUtils=require("./EventPluginUtils");var EventPropagators=require("./EventPropagators");var SyntheticClipboardEvent=require("./SyntheticClipboardEvent");var SyntheticEvent=require("./SyntheticEvent");var SyntheticFocusEvent=require("./SyntheticFocusEvent");var SyntheticKeyboardEvent=require("./SyntheticKeyboardEvent");var SyntheticMouseEvent=require("./SyntheticMouseEvent");var SyntheticDragEvent=require("./SyntheticDragEvent");var SyntheticTouchEvent=require("./SyntheticTouchEvent");var SyntheticUIEvent=require("./SyntheticUIEvent");var SyntheticWheelEvent=require("./SyntheticWheelEvent");var invariant=require("./invariant");var keyOf=require("./keyOf");var topLevelTypes=EventConstants.topLevelTypes;var eventTypes={blur:{phasedRegistrationNames:{bubbled:keyOf({onBlur:true}),captured:keyOf({onBlurCapture:true})}},click:{phasedRegistrationNames:{bubbled:keyOf({onClick:true}),captured:keyOf({onClickCapture:true})}},contextMenu:{phasedRegistrationNames:{bubbled:keyOf({onContextMenu:true}),captured:keyOf({onContextMenuCapture:true})}},copy:{phasedRegistrationNames:{bubbled:keyOf({onCopy:true}),captured:keyOf({onCopyCapture:true})}},cut:{phasedRegistrationNames:{bubbled:keyOf({onCut:true}),captured:keyOf({onCutCapture:true})}},doubleClick:{phasedRegistrationNames:{bubbled:keyOf({onDoubleClick:true}),captured:keyOf({onDoubleClickCapture:true})}},drag:{phasedRegistrationNames:{bubbled:keyOf({onDrag:true}),captured:keyOf({onDragCapture:true})}},dragEnd:{phasedRegistrationNames:{bubbled:keyOf({onDragEnd:true}),captured:keyOf({onDragEndCapture:true})}},dragEnter:{phasedRegistrationNames:{bubbled:keyOf({onDragEnter:true}),captured:keyOf({onDragEnterCapture:true})}},dragExit:{phasedRegistrationNames:{bubbled:keyOf({onDragExit:true}),captured:keyOf({onDragExitCapture:true})}},dragLeave:{phasedRegistrationNames:{bubbled:keyOf({onDragLeave:true}),captured:keyOf({onDragLeaveCapture:true})}},dragOver:{phasedRegistrationNames:{bubbled:keyOf({onDragOver:true}),captured:keyOf({onDragOverCapture:true})}},dragStart:{phasedRegistrationNames:{bubbled:keyOf({onDragStart:true}),captured:keyOf({onDragStartCapture:true})}},drop:{phasedRegistrationNames:{bubbled:keyOf({onDrop:true}),captured:keyOf({onDropCapture:true})}},focus:{phasedRegistrationNames:{bubbled:keyOf({onFocus:true}),captured:keyOf({onFocusCapture:true})}},input:{phasedRegistrationNames:{bubbled:keyOf({onInput:true}),captured:keyOf({onInputCapture:true})}},keyDown:{phasedRegistrationNames:{bubbled:keyOf({onKeyDown:true}),captured:keyOf({onKeyDownCapture:true})}},keyPress:{phasedRegistrationNames:{bubbled:keyOf({onKeyPress:true}),captured:keyOf({onKeyPressCapture:true})}},keyUp:{phasedRegistrationNames:{bubbled:keyOf({onKeyUp:true}),captured:keyOf({onKeyUpCapture:true})}},load:{phasedRegistrationNames:{bubbled:keyOf({onLoad:true}),captured:keyOf({onLoadCapture:true})}},error:{phasedRegistrationNames:{bubbled:keyOf({onError:true}),captured:keyOf({onErrorCapture:true})}}, // Note: We do not allow listening to mouseOver events. Instead, use the
// onMouseEnter/onMouseLeave created by `EnterLeaveEventPlugin`.
mouseDown:{phasedRegistrationNames:{bubbled:keyOf({onMouseDown:true}),captured:keyOf({onMouseDownCapture:true})}},mouseMove:{phasedRegistrationNames:{bubbled:keyOf({onMouseMove:true}),captured:keyOf({onMouseMoveCapture:true})}},mouseOut:{phasedRegistrationNames:{bubbled:keyOf({onMouseOut:true}),captured:keyOf({onMouseOutCapture:true})}},mouseOver:{phasedRegistrationNames:{bubbled:keyOf({onMouseOver:true}),captured:keyOf({onMouseOverCapture:true})}},mouseUp:{phasedRegistrationNames:{bubbled:keyOf({onMouseUp:true}),captured:keyOf({onMouseUpCapture:true})}},paste:{phasedRegistrationNames:{bubbled:keyOf({onPaste:true}),captured:keyOf({onPasteCapture:true})}},reset:{phasedRegistrationNames:{bubbled:keyOf({onReset:true}),captured:keyOf({onResetCapture:true})}},scroll:{phasedRegistrationNames:{bubbled:keyOf({onScroll:true}),captured:keyOf({onScrollCapture:true})}},submit:{phasedRegistrationNames:{bubbled:keyOf({onSubmit:true}),captured:keyOf({onSubmitCapture:true})}},touchCancel:{phasedRegistrationNames:{bubbled:keyOf({onTouchCancel:true}),captured:keyOf({onTouchCancelCapture:true})}},touchEnd:{phasedRegistrationNames:{bubbled:keyOf({onTouchEnd:true}),captured:keyOf({onTouchEndCapture:true})}},touchMove:{phasedRegistrationNames:{bubbled:keyOf({onTouchMove:true}),captured:keyOf({onTouchMoveCapture:true})}},touchStart:{phasedRegistrationNames:{bubbled:keyOf({onTouchStart:true}),captured:keyOf({onTouchStartCapture:true})}},wheel:{phasedRegistrationNames:{bubbled:keyOf({onWheel:true}),captured:keyOf({onWheelCapture:true})}}};var topLevelEventsToDispatchConfig={topBlur:eventTypes.blur,topClick:eventTypes.click,topContextMenu:eventTypes.contextMenu,topCopy:eventTypes.copy,topCut:eventTypes.cut,topDoubleClick:eventTypes.doubleClick,topDrag:eventTypes.drag,topDragEnd:eventTypes.dragEnd,topDragEnter:eventTypes.dragEnter,topDragExit:eventTypes.dragExit,topDragLeave:eventTypes.dragLeave,topDragOver:eventTypes.dragOver,topDragStart:eventTypes.dragStart,topDrop:eventTypes.drop,topError:eventTypes.error,topFocus:eventTypes.focus,topInput:eventTypes.input,topKeyDown:eventTypes.keyDown,topKeyPress:eventTypes.keyPress,topKeyUp:eventTypes.keyUp,topLoad:eventTypes.load,topMouseDown:eventTypes.mouseDown,topMouseMove:eventTypes.mouseMove,topMouseOut:eventTypes.mouseOut,topMouseOver:eventTypes.mouseOver,topMouseUp:eventTypes.mouseUp,topPaste:eventTypes.paste,topReset:eventTypes.reset,topScroll:eventTypes.scroll,topSubmit:eventTypes.submit,topTouchCancel:eventTypes.touchCancel,topTouchEnd:eventTypes.touchEnd,topTouchMove:eventTypes.touchMove,topTouchStart:eventTypes.touchStart,topWheel:eventTypes.wheel};for(var topLevelType in topLevelEventsToDispatchConfig){topLevelEventsToDispatchConfig[topLevelType].dependencies=[topLevelType];}var SimpleEventPlugin={eventTypes:eventTypes, /**
   * Same as the default implementation, except cancels the event when return
   * value is false.
   *
   * @param {object} Event to be dispatched.
   * @param {function} Application-level callback.
   * @param {string} domID DOM ID to pass to the callback.
   */executeDispatch:function executeDispatch(event,listener,domID){var returnValue=EventPluginUtils.executeDispatch(event,listener,domID);if(returnValue===false){event.stopPropagation();event.preventDefault();}}, /**
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {*} An accumulation of synthetic events.
   * @see {EventPluginHub.extractEvents}
   */extractEvents:function extractEvents(topLevelType,topLevelTarget,topLevelTargetID,nativeEvent){var dispatchConfig=topLevelEventsToDispatchConfig[topLevelType];if(!dispatchConfig){return null;}var EventConstructor;switch(topLevelType){case topLevelTypes.topInput:case topLevelTypes.topLoad:case topLevelTypes.topError:case topLevelTypes.topReset:case topLevelTypes.topSubmit: // HTML Events
// @see http://www.w3.org/TR/html5/index.html#events-0
EventConstructor=SyntheticEvent;break;case topLevelTypes.topKeyPress: // FireFox creates a keypress event for function keys too. This removes
// the unwanted keypress events.
if(nativeEvent.charCode===0){return null;} /* falls through */case topLevelTypes.topKeyDown:case topLevelTypes.topKeyUp:EventConstructor=SyntheticKeyboardEvent;break;case topLevelTypes.topBlur:case topLevelTypes.topFocus:EventConstructor=SyntheticFocusEvent;break;case topLevelTypes.topClick: // Firefox creates a click event on right mouse clicks. This removes the
// unwanted click events.
if(nativeEvent.button===2){return null;} /* falls through */case topLevelTypes.topContextMenu:case topLevelTypes.topDoubleClick:case topLevelTypes.topMouseDown:case topLevelTypes.topMouseMove:case topLevelTypes.topMouseOut:case topLevelTypes.topMouseOver:case topLevelTypes.topMouseUp:EventConstructor=SyntheticMouseEvent;break;case topLevelTypes.topDrag:case topLevelTypes.topDragEnd:case topLevelTypes.topDragEnter:case topLevelTypes.topDragExit:case topLevelTypes.topDragLeave:case topLevelTypes.topDragOver:case topLevelTypes.topDragStart:case topLevelTypes.topDrop:EventConstructor=SyntheticDragEvent;break;case topLevelTypes.topTouchCancel:case topLevelTypes.topTouchEnd:case topLevelTypes.topTouchMove:case topLevelTypes.topTouchStart:EventConstructor=SyntheticTouchEvent;break;case topLevelTypes.topScroll:EventConstructor=SyntheticUIEvent;break;case topLevelTypes.topWheel:EventConstructor=SyntheticWheelEvent;break;case topLevelTypes.topCopy:case topLevelTypes.topCut:case topLevelTypes.topPaste:EventConstructor=SyntheticClipboardEvent;break;}"production"!==process.env.NODE_ENV?invariant(EventConstructor,'SimpleEventPlugin: Unhandled event type, `%s`.',topLevelType):invariant(EventConstructor);var event=EventConstructor.getPooled(dispatchConfig,topLevelTargetID,nativeEvent);EventPropagators.accumulateTwoPhaseDispatches(event);return event;}};module.exports=SimpleEventPlugin;}).call(this,require("e/U+97"));},{"./EventConstants":18,"./EventPluginUtils":22,"./EventPropagators":23,"./SyntheticClipboardEvent":84,"./SyntheticDragEvent":86,"./SyntheticEvent":87,"./SyntheticFocusEvent":88,"./SyntheticKeyboardEvent":90,"./SyntheticMouseEvent":91,"./SyntheticTouchEvent":92,"./SyntheticUIEvent":93,"./SyntheticWheelEvent":94,"./invariant":123,"./keyOf":130,"e/U+97":3}],84:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SyntheticClipboardEvent
 * @typechecks static-only
 */"use strict";var SyntheticEvent=require("./SyntheticEvent"); /**
 * @interface Event
 * @see http://www.w3.org/TR/clipboard-apis/
 */var ClipboardEventInterface={clipboardData:function clipboardData(event){return 'clipboardData' in event?event.clipboardData:window.clipboardData;}}; /**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */function SyntheticClipboardEvent(dispatchConfig,dispatchMarker,nativeEvent){SyntheticEvent.call(this,dispatchConfig,dispatchMarker,nativeEvent);}SyntheticEvent.augmentClass(SyntheticClipboardEvent,ClipboardEventInterface);module.exports=SyntheticClipboardEvent;},{"./SyntheticEvent":87}],85:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SyntheticCompositionEvent
 * @typechecks static-only
 */"use strict";var SyntheticEvent=require("./SyntheticEvent"); /**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/#events-compositionevents
 */var CompositionEventInterface={data:null}; /**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */function SyntheticCompositionEvent(dispatchConfig,dispatchMarker,nativeEvent){SyntheticEvent.call(this,dispatchConfig,dispatchMarker,nativeEvent);}SyntheticEvent.augmentClass(SyntheticCompositionEvent,CompositionEventInterface);module.exports=SyntheticCompositionEvent;},{"./SyntheticEvent":87}],86:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SyntheticDragEvent
 * @typechecks static-only
 */"use strict";var SyntheticMouseEvent=require("./SyntheticMouseEvent"); /**
 * @interface DragEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var DragEventInterface={dataTransfer:null}; /**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */function SyntheticDragEvent(dispatchConfig,dispatchMarker,nativeEvent){SyntheticMouseEvent.call(this,dispatchConfig,dispatchMarker,nativeEvent);}SyntheticMouseEvent.augmentClass(SyntheticDragEvent,DragEventInterface);module.exports=SyntheticDragEvent;},{"./SyntheticMouseEvent":91}],87:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SyntheticEvent
 * @typechecks static-only
 */"use strict";var PooledClass=require("./PooledClass");var emptyFunction=require("./emptyFunction");var getEventTarget=require("./getEventTarget");var merge=require("./merge");var mergeInto=require("./mergeInto"); /**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var EventInterface={type:null,target:getEventTarget, // currentTarget is set when dispatching; no use in copying it here
currentTarget:emptyFunction.thatReturnsNull,eventPhase:null,bubbles:null,cancelable:null,timeStamp:function timeStamp(event){return event.timeStamp||Date.now();},defaultPrevented:null,isTrusted:null}; /**
 * Synthetic events are dispatched by event plugins, typically in response to a
 * top-level event delegation handler.
 *
 * These systems should generally use pooling to reduce the frequency of garbage
 * collection. The system should check `isPersistent` to determine whether the
 * event should be released into the pool after being dispatched. Users that
 * need a persisted event should invoke `persist`.
 *
 * Synthetic events (and subclasses) implement the DOM Level 3 Events API by
 * normalizing browser quirks. Subclasses do not necessarily have to implement a
 * DOM interface; custom application-specific events can also subclass this.
 *
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 */function SyntheticEvent(dispatchConfig,dispatchMarker,nativeEvent){this.dispatchConfig=dispatchConfig;this.dispatchMarker=dispatchMarker;this.nativeEvent=nativeEvent;var Interface=this.constructor.Interface;for(var propName in Interface){if(!Interface.hasOwnProperty(propName)){continue;}var normalize=Interface[propName];if(normalize){this[propName]=normalize(nativeEvent);}else {this[propName]=nativeEvent[propName];}}var defaultPrevented=nativeEvent.defaultPrevented!=null?nativeEvent.defaultPrevented:nativeEvent.returnValue===false;if(defaultPrevented){this.isDefaultPrevented=emptyFunction.thatReturnsTrue;}else {this.isDefaultPrevented=emptyFunction.thatReturnsFalse;}this.isPropagationStopped=emptyFunction.thatReturnsFalse;}mergeInto(SyntheticEvent.prototype,{preventDefault:function preventDefault(){this.defaultPrevented=true;var event=this.nativeEvent;event.preventDefault?event.preventDefault():event.returnValue=false;this.isDefaultPrevented=emptyFunction.thatReturnsTrue;},stopPropagation:function stopPropagation(){var event=this.nativeEvent;event.stopPropagation?event.stopPropagation():event.cancelBubble=true;this.isPropagationStopped=emptyFunction.thatReturnsTrue;}, /**
   * We release all dispatched `SyntheticEvent`s after each event loop, adding
   * them back into the pool. This allows a way to hold onto a reference that
   * won't be added back into the pool.
   */persist:function persist(){this.isPersistent=emptyFunction.thatReturnsTrue;}, /**
   * Checks if this event should be released back into the pool.
   *
   * @return {boolean} True if this should not be released, false otherwise.
   */isPersistent:emptyFunction.thatReturnsFalse, /**
   * `PooledClass` looks for `destructor` on each instance it releases.
   */destructor:function destructor(){var Interface=this.constructor.Interface;for(var propName in Interface){this[propName]=null;}this.dispatchConfig=null;this.dispatchMarker=null;this.nativeEvent=null;}});SyntheticEvent.Interface=EventInterface; /**
 * Helper to reduce boilerplate when creating subclasses.
 *
 * @param {function} Class
 * @param {?object} Interface
 */SyntheticEvent.augmentClass=function(Class,Interface){var Super=this;var prototype=Object.create(Super.prototype);mergeInto(prototype,Class.prototype);Class.prototype=prototype;Class.prototype.constructor=Class;Class.Interface=merge(Super.Interface,Interface);Class.augmentClass=Super.augmentClass;PooledClass.addPoolingTo(Class,PooledClass.threeArgumentPooler);};PooledClass.addPoolingTo(SyntheticEvent,PooledClass.threeArgumentPooler);module.exports=SyntheticEvent;},{"./PooledClass":29,"./emptyFunction":105,"./getEventTarget":114,"./merge":133,"./mergeInto":135}],88:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SyntheticFocusEvent
 * @typechecks static-only
 */"use strict";var SyntheticUIEvent=require("./SyntheticUIEvent"); /**
 * @interface FocusEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var FocusEventInterface={relatedTarget:null}; /**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */function SyntheticFocusEvent(dispatchConfig,dispatchMarker,nativeEvent){SyntheticUIEvent.call(this,dispatchConfig,dispatchMarker,nativeEvent);}SyntheticUIEvent.augmentClass(SyntheticFocusEvent,FocusEventInterface);module.exports=SyntheticFocusEvent;},{"./SyntheticUIEvent":93}],89:[function(require,module,exports){ /**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SyntheticInputEvent
 * @typechecks static-only
 */"use strict";var SyntheticEvent=require("./SyntheticEvent"); /**
 * @interface Event
 * @see http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105
 *      /#events-inputevents
 */var InputEventInterface={data:null}; /**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */function SyntheticInputEvent(dispatchConfig,dispatchMarker,nativeEvent){SyntheticEvent.call(this,dispatchConfig,dispatchMarker,nativeEvent);}SyntheticEvent.augmentClass(SyntheticInputEvent,InputEventInterface);module.exports=SyntheticInputEvent;},{"./SyntheticEvent":87}],90:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SyntheticKeyboardEvent
 * @typechecks static-only
 */"use strict";var SyntheticUIEvent=require("./SyntheticUIEvent");var getEventKey=require("./getEventKey");var getEventModifierState=require("./getEventModifierState"); /**
 * @interface KeyboardEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var KeyboardEventInterface={key:getEventKey,location:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,repeat:null,locale:null,getModifierState:getEventModifierState, // Legacy Interface
charCode:function charCode(event){ // `charCode` is the result of a KeyPress event and represents the value of
// the actual printable character.
// KeyPress is deprecated but its replacement is not yet final and not
// implemented in any major browser.
if(event.type==='keypress'){ // IE8 does not implement "charCode", but "keyCode" has the correct value.
return 'charCode' in event?event.charCode:event.keyCode;}return 0;},keyCode:function keyCode(event){ // `keyCode` is the result of a KeyDown/Up event and represents the value of
// physical keyboard key.
// The actual meaning of the value depends on the users' keyboard layout
// which cannot be detected. Assuming that it is a US keyboard layout
// provides a surprisingly accurate mapping for US and European users.
// Due to this, it is left to the user to implement at this time.
if(event.type==='keydown'||event.type==='keyup'){return event.keyCode;}return 0;},which:function which(event){ // `which` is an alias for either `keyCode` or `charCode` depending on the
// type of the event. There is no need to determine the type of the event
// as `keyCode` and `charCode` are either aliased or default to zero.
return event.keyCode||event.charCode;}}; /**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */function SyntheticKeyboardEvent(dispatchConfig,dispatchMarker,nativeEvent){SyntheticUIEvent.call(this,dispatchConfig,dispatchMarker,nativeEvent);}SyntheticUIEvent.augmentClass(SyntheticKeyboardEvent,KeyboardEventInterface);module.exports=SyntheticKeyboardEvent;},{"./SyntheticUIEvent":93,"./getEventKey":112,"./getEventModifierState":113}],91:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SyntheticMouseEvent
 * @typechecks static-only
 */"use strict";var SyntheticUIEvent=require("./SyntheticUIEvent");var ViewportMetrics=require("./ViewportMetrics");var getEventModifierState=require("./getEventModifierState"); /**
 * @interface MouseEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var MouseEventInterface={screenX:null,screenY:null,clientX:null,clientY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:getEventModifierState,button:function button(event){ // Webkit, Firefox, IE9+
// which:  1 2 3
// button: 0 1 2 (standard)
var button=event.button;if('which' in event){return button;} // IE<9
// which:  undefined
// button: 0 0 0
// button: 1 4 2 (onmouseup)
return button===2?2:button===4?1:0;},buttons:null,relatedTarget:function relatedTarget(event){return event.relatedTarget||(event.fromElement===event.srcElement?event.toElement:event.fromElement);}, // "Proprietary" Interface.
pageX:function pageX(event){return 'pageX' in event?event.pageX:event.clientX+ViewportMetrics.currentScrollLeft;},pageY:function pageY(event){return 'pageY' in event?event.pageY:event.clientY+ViewportMetrics.currentScrollTop;}}; /**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */function SyntheticMouseEvent(dispatchConfig,dispatchMarker,nativeEvent){SyntheticUIEvent.call(this,dispatchConfig,dispatchMarker,nativeEvent);}SyntheticUIEvent.augmentClass(SyntheticMouseEvent,MouseEventInterface);module.exports=SyntheticMouseEvent;},{"./SyntheticUIEvent":93,"./ViewportMetrics":96,"./getEventModifierState":113}],92:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SyntheticTouchEvent
 * @typechecks static-only
 */"use strict";var SyntheticUIEvent=require("./SyntheticUIEvent");var getEventModifierState=require("./getEventModifierState"); /**
 * @interface TouchEvent
 * @see http://www.w3.org/TR/touch-events/
 */var TouchEventInterface={touches:null,targetTouches:null,changedTouches:null,altKey:null,metaKey:null,ctrlKey:null,shiftKey:null,getModifierState:getEventModifierState}; /**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */function SyntheticTouchEvent(dispatchConfig,dispatchMarker,nativeEvent){SyntheticUIEvent.call(this,dispatchConfig,dispatchMarker,nativeEvent);}SyntheticUIEvent.augmentClass(SyntheticTouchEvent,TouchEventInterface);module.exports=SyntheticTouchEvent;},{"./SyntheticUIEvent":93,"./getEventModifierState":113}],93:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SyntheticUIEvent
 * @typechecks static-only
 */"use strict";var SyntheticEvent=require("./SyntheticEvent");var getEventTarget=require("./getEventTarget"); /**
 * @interface UIEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var UIEventInterface={view:function view(event){if(event.view){return event.view;}var target=getEventTarget(event);if(target!=null&&target.window===target){ // target is a window object
return target;}var doc=target.ownerDocument; // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
if(doc){return doc.defaultView||doc.parentWindow;}else {return window;}},detail:function detail(event){return event.detail||0;}}; /**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */function SyntheticUIEvent(dispatchConfig,dispatchMarker,nativeEvent){SyntheticEvent.call(this,dispatchConfig,dispatchMarker,nativeEvent);}SyntheticEvent.augmentClass(SyntheticUIEvent,UIEventInterface);module.exports=SyntheticUIEvent;},{"./SyntheticEvent":87,"./getEventTarget":114}],94:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SyntheticWheelEvent
 * @typechecks static-only
 */"use strict";var SyntheticMouseEvent=require("./SyntheticMouseEvent"); /**
 * @interface WheelEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var WheelEventInterface={deltaX:function deltaX(event){return 'deltaX' in event?event.deltaX: // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
'wheelDeltaX' in event?-event.wheelDeltaX:0;},deltaY:function deltaY(event){return 'deltaY' in event?event.deltaY: // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
'wheelDeltaY' in event?-event.wheelDeltaY: // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
'wheelDelta' in event?-event.wheelDelta:0;},deltaZ:null, // Browsers without "deltaMode" is reporting in raw wheel delta where one
// notch on the scroll is always +/- 120, roughly equivalent to pixels.
// A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
// ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
deltaMode:null}; /**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticMouseEvent}
 */function SyntheticWheelEvent(dispatchConfig,dispatchMarker,nativeEvent){SyntheticMouseEvent.call(this,dispatchConfig,dispatchMarker,nativeEvent);}SyntheticMouseEvent.augmentClass(SyntheticWheelEvent,WheelEventInterface);module.exports=SyntheticWheelEvent;},{"./SyntheticMouseEvent":91}],95:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule Transaction
 */"use strict";var invariant=require("./invariant"); /**
 * `Transaction` creates a black box that is able to wrap any method such that
 * certain invariants are maintained before and after the method is invoked
 * (Even if an exception is thrown while invoking the wrapped method). Whoever
 * instantiates a transaction can provide enforcers of the invariants at
 * creation time. The `Transaction` class itself will supply one additional
 * automatic invariant for you - the invariant that any transaction instance
 * should not be run while it is already being run. You would typically create a
 * single instance of a `Transaction` for reuse multiple times, that potentially
 * is used to wrap several different methods. Wrappers are extremely simple -
 * they only require implementing two methods.
 *
 * <pre>
 *                       wrappers (injected at creation time)
 *                                      +        +
 *                                      |        |
 *                    +-----------------|--------|--------------+
 *                    |                 v        |              |
 *                    |      +---------------+   |              |
 *                    |   +--|    wrapper1   |---|----+         |
 *                    |   |  +---------------+   v    |         |
 *                    |   |          +-------------+  |         |
 *                    |   |     +----|   wrapper2  |--------+   |
 *                    |   |     |    +-------------+  |     |   |
 *                    |   |     |                     |     |   |
 *                    |   v     v                     v     v   | wrapper
 *                    | +---+ +---+   +---------+   +---+ +---+ | invariants
 * perform(anyMethod) | |   | |   |   |         |   |   | |   | | maintained
 * +----------------->|-|---|-|---|-->|anyMethod|---|---|-|---|-|-------->
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | +---+ +---+   +---------+   +---+ +---+ |
 *                    |  initialize                    close    |
 *                    +-----------------------------------------+
 * </pre>
 *
 * Use cases:
 * - Preserving the input selection ranges before/after reconciliation.
 *   Restoring selection even in the event of an unexpected error.
 * - Deactivating events while rearranging the DOM, preventing blurs/focuses,
 *   while guaranteeing that afterwards, the event system is reactivated.
 * - Flushing a queue of collected DOM mutations to the main UI thread after a
 *   reconciliation takes place in a worker thread.
 * - Invoking any collected `componentDidUpdate` callbacks after rendering new
 *   content.
 * - (Future use case): Wrapping particular flushes of the `ReactWorker` queue
 *   to preserve the `scrollTop` (an automatic scroll aware DOM).
 * - (Future use case): Layout calculations before and after DOM upates.
 *
 * Transactional plugin API:
 * - A module that has an `initialize` method that returns any precomputation.
 * - and a `close` method that accepts the precomputation. `close` is invoked
 *   when the wrapped process is completed, or has failed.
 *
 * @param {Array<TransactionalWrapper>} transactionWrapper Wrapper modules
 * that implement `initialize` and `close`.
 * @return {Transaction} Single transaction for reuse in thread.
 *
 * @class Transaction
 */var Mixin={ /**
   * Sets up this instance so that it is prepared for collecting metrics. Does
   * so such that this setup method may be used on an instance that is already
   * initialized, in a way that does not consume additional memory upon reuse.
   * That can be useful if you decide to make your subclass of this mixin a
   * "PooledClass".
   */reinitializeTransaction:function reinitializeTransaction(){this.transactionWrappers=this.getTransactionWrappers();if(!this.wrapperInitData){this.wrapperInitData=[];}else {this.wrapperInitData.length=0;}this._isInTransaction=false;},_isInTransaction:false, /**
   * @abstract
   * @return {Array<TransactionWrapper>} Array of transaction wrappers.
   */getTransactionWrappers:null,isInTransaction:function isInTransaction(){return !!this._isInTransaction;}, /**
   * Executes the function within a safety window. Use this for the top level
   * methods that result in large amounts of computation/mutations that would
   * need to be safety checked.
   *
   * @param {function} method Member of scope to call.
   * @param {Object} scope Scope to invoke from.
   * @param {Object?=} args... Arguments to pass to the method (optional).
   *                           Helps prevent need to bind in many cases.
   * @return Return value from `method`.
   */perform:function perform(method,scope,a,b,c,d,e,f){"production"!==process.env.NODE_ENV?invariant(!this.isInTransaction(),'Transaction.perform(...): Cannot initialize a transaction when there '+'is already an outstanding transaction.'):invariant(!this.isInTransaction());var errorThrown;var ret;try{this._isInTransaction=true; // Catching errors makes debugging more difficult, so we start with
// errorThrown set to true before setting it to false after calling
// close -- if it's still set to true in the finally block, it means
// one of these calls threw.
errorThrown=true;this.initializeAll(0);ret=method.call(scope,a,b,c,d,e,f);errorThrown=false;}finally {try{if(errorThrown){ // If `method` throws, prefer to show that stack trace over any thrown
// by invoking `closeAll`.
try{this.closeAll(0);}catch(err){}}else { // Since `method` didn't throw, we don't want to silence the exception
// here.
this.closeAll(0);}}finally {this._isInTransaction=false;}}return ret;},initializeAll:function initializeAll(startIndex){var transactionWrappers=this.transactionWrappers;for(var i=startIndex;i<transactionWrappers.length;i++){var wrapper=transactionWrappers[i];try{ // Catching errors makes debugging more difficult, so we start with the
// OBSERVED_ERROR state before overwriting it with the real return value
// of initialize -- if it's still set to OBSERVED_ERROR in the finally
// block, it means wrapper.initialize threw.
this.wrapperInitData[i]=Transaction.OBSERVED_ERROR;this.wrapperInitData[i]=wrapper.initialize?wrapper.initialize.call(this):null;}finally {if(this.wrapperInitData[i]===Transaction.OBSERVED_ERROR){ // The initializer for wrapper i threw an error; initialize the
// remaining wrappers but silence any exceptions from them to ensure
// that the first error is the one to bubble up.
try{this.initializeAll(i+1);}catch(err){}}}}}, /**
   * Invokes each of `this.transactionWrappers.close[i]` functions, passing into
   * them the respective return values of `this.transactionWrappers.init[i]`
   * (`close`rs that correspond to initializers that failed will not be
   * invoked).
   */closeAll:function closeAll(startIndex){"production"!==process.env.NODE_ENV?invariant(this.isInTransaction(),'Transaction.closeAll(): Cannot close transaction when none are open.'):invariant(this.isInTransaction());var transactionWrappers=this.transactionWrappers;for(var i=startIndex;i<transactionWrappers.length;i++){var wrapper=transactionWrappers[i];var initData=this.wrapperInitData[i];var errorThrown;try{ // Catching errors makes debugging more difficult, so we start with
// errorThrown set to true before setting it to false after calling
// close -- if it's still set to true in the finally block, it means
// wrapper.close threw.
errorThrown=true;if(initData!==Transaction.OBSERVED_ERROR){wrapper.close&&wrapper.close.call(this,initData);}errorThrown=false;}finally {if(errorThrown){ // The closer for wrapper i threw an error; close the remaining
// wrappers but silence any exceptions from them to ensure that the
// first error is the one to bubble up.
try{this.closeAll(i+1);}catch(e){}}}}this.wrapperInitData.length=0;}};var Transaction={Mixin:Mixin, /**
   * Token to look for to determine if an error occured.
   */OBSERVED_ERROR:{}};module.exports=Transaction;}).call(this,require("e/U+97"));},{"./invariant":123,"e/U+97":3}],96:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ViewportMetrics
 */"use strict";var getUnboundedScrollPosition=require("./getUnboundedScrollPosition");var ViewportMetrics={currentScrollLeft:0,currentScrollTop:0,refreshScrollValues:function refreshScrollValues(){var scrollPosition=getUnboundedScrollPosition(window);ViewportMetrics.currentScrollLeft=scrollPosition.x;ViewportMetrics.currentScrollTop=scrollPosition.y;}};module.exports=ViewportMetrics;},{"./getUnboundedScrollPosition":119}],97:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule accumulate
 */"use strict";var invariant=require("./invariant"); /**
 * Accumulates items that must not be null or undefined.
 *
 * This is used to conserve memory by avoiding array allocations.
 *
 * @return {*|array<*>} An accumulation of items.
 */function accumulate(current,next){"production"!==process.env.NODE_ENV?invariant(next!=null,'accumulate(...): Accumulated items must be not be null or undefined.'):invariant(next!=null);if(current==null){return next;}else { // Both are not empty. Warning: Never call x.concat(y) when you are not
// certain that x is an Array (x could be a string with concat method).
var currentIsArray=Array.isArray(current);var nextIsArray=Array.isArray(next);if(currentIsArray){return current.concat(next);}else {if(nextIsArray){return [current].concat(next);}else {return [current,next];}}}}module.exports=accumulate;}).call(this,require("e/U+97"));},{"./invariant":123,"e/U+97":3}],98:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule adler32
 */ /* jslint bitwise:true */"use strict";var MOD=65521; // This is a clean-room implementation of adler32 designed for detecting
// if markup is not what we expect it to be. It does not need to be
// cryptographically strong, only reasonable good at detecting if markup
// generated on the server is different than that on the client.
function adler32(data){var a=1;var b=0;for(var i=0;i<data.length;i++){a=(a+data.charCodeAt(i))%MOD;b=(b+a)%MOD;}return a|b<<16;}module.exports=adler32;},{}],99:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule containsNode
 * @typechecks
 */var isTextNode=require("./isTextNode"); /*jslint bitwise:true */ /**
 * Checks if a given DOM node contains or is another DOM node.
 *
 * @param {?DOMNode} outerNode Outer DOM node.
 * @param {?DOMNode} innerNode Inner DOM node.
 * @return {boolean} True if `outerNode` contains or is `innerNode`.
 */function containsNode(outerNode,innerNode){if(!outerNode||!innerNode){return false;}else if(outerNode===innerNode){return true;}else if(isTextNode(outerNode)){return false;}else if(isTextNode(innerNode)){return containsNode(outerNode,innerNode.parentNode);}else if(outerNode.contains){return outerNode.contains(innerNode);}else if(outerNode.compareDocumentPosition){return !!(outerNode.compareDocumentPosition(innerNode)&16);}else {return false;}}module.exports=containsNode;},{"./isTextNode":127}],100:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule copyProperties
 */ /**
 * Copy properties from one or more objects (up to 5) into the first object.
 * This is a shallow copy. It mutates the first object and also returns it.
 *
 * NOTE: `arguments` has a very significant performance penalty, which is why
 * we don't support unlimited arguments.
 */function copyProperties(obj,a,b,c,d,e,f){obj=obj||{};if("production"!==process.env.NODE_ENV){if(f){throw new Error('Too many arguments passed to copyProperties');}}var args=[a,b,c,d,e];var ii=0,v;while(args[ii]){v=args[ii++];for(var k in v){obj[k]=v[k];} // IE ignores toString in object iteration.. See:
// webreflection.blogspot.com/2007/07/quick-fix-internet-explorer-and.html
if(v.hasOwnProperty&&v.hasOwnProperty('toString')&&typeof v.toString!='undefined'&&obj.toString!==v.toString){obj.toString=v.toString;}}return obj;}module.exports=copyProperties;}).call(this,require("e/U+97"));},{"e/U+97":3}],101:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule createArrayFrom
 * @typechecks
 */var toArray=require("./toArray"); /**
 * Perform a heuristic test to determine if an object is "array-like".
 *
 *   A monk asked Joshu, a Zen master, "Has a dog Buddha nature?"
 *   Joshu replied: "Mu."
 *
 * This function determines if its argument has "array nature": it returns
 * true if the argument is an actual array, an `arguments' object, or an
 * HTMLCollection (e.g. node.childNodes or node.getElementsByTagName()).
 *
 * It will return false for other array-like objects like Filelist.
 *
 * @param {*} obj
 * @return {boolean}
 */function hasArrayNature(obj){return  (// not null/false
!!obj&&( // arrays are objects, NodeLists are functions in Safari
(typeof obj==="undefined"?"undefined":_typeof(obj))=='object'||typeof obj=='function')&& // quacks like an array
'length' in obj&& // not window
!('setInterval' in obj)&& // no DOM node should be considered an array-like
// a 'select' element has 'length' and 'item' properties on IE8
typeof obj.nodeType!='number'&&( // a real array
// HTMLCollection/NodeList
Array.isArray(obj)|| // arguments
'callee' in obj||'item' in obj));} /**
 * Ensure that the argument is an array by wrapping it in an array if it is not.
 * Creates a copy of the argument if it is already an array.
 *
 * This is mostly useful idiomatically:
 *
 *   var createArrayFrom = require('createArrayFrom');
 *
 *   function takesOneOrMoreThings(things) {
 *     things = createArrayFrom(things);
 *     ...
 *   }
 *
 * This allows you to treat `things' as an array, but accept scalars in the API.
 *
 * If you need to convert an array-like object, like `arguments`, into an array
 * use toArray instead.
 *
 * @param {*} obj
 * @return {array}
 */function createArrayFrom(obj){if(!hasArrayNature(obj)){return [obj];}else if(Array.isArray(obj)){return obj.slice();}else {return toArray(obj);}}module.exports=createArrayFrom;},{"./toArray":144}],102:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule createFullPageComponent
 * @typechecks
 */"use strict"; // Defeat circular references by requiring this directly.
var ReactCompositeComponent=require("./ReactCompositeComponent");var invariant=require("./invariant"); /**
 * Create a component that will throw an exception when unmounted.
 *
 * Components like <html> <head> and <body> can't be removed or added
 * easily in a cross-browser way, however it's valuable to be able to
 * take advantage of React's reconciliation for styling and <title>
 * management. So we just document it and throw in dangerous cases.
 *
 * @param {function} componentClass convenience constructor to wrap
 * @return {function} convenience constructor of new component
 */function createFullPageComponent(componentClass){var FullPageComponent=ReactCompositeComponent.createClass({displayName:'ReactFullPageComponent'+(componentClass.type.displayName||''),componentWillUnmount:function componentWillUnmount(){"production"!==process.env.NODE_ENV?invariant(false,'%s tried to unmount. Because of cross-browser quirks it is '+'impossible to unmount some top-level components (eg <html>, <head>, '+'and <body>) reliably and efficiently. To fix this, have a single '+'top-level component that never unmounts render these elements.',this.constructor.displayName):invariant(false);},render:function render(){return this.transferPropsTo(componentClass(null,this.props.children));}});return FullPageComponent;}module.exports=createFullPageComponent;}).call(this,require("e/U+97"));},{"./ReactCompositeComponent":36,"./invariant":123,"e/U+97":3}],103:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule createNodesFromMarkup
 * @typechecks
 */ /*jslint evil: true, sub: true */var ExecutionEnvironment=require("./ExecutionEnvironment");var createArrayFrom=require("./createArrayFrom");var getMarkupWrap=require("./getMarkupWrap");var invariant=require("./invariant"); /**
 * Dummy container used to render all markup.
 */var dummyNode=ExecutionEnvironment.canUseDOM?document.createElement('div'):null; /**
 * Pattern used by `getNodeName`.
 */var nodeNamePattern=/^\s*<(\w+)/; /**
 * Extracts the `nodeName` of the first element in a string of markup.
 *
 * @param {string} markup String of markup.
 * @return {?string} Node name of the supplied markup.
 */function getNodeName(markup){var nodeNameMatch=markup.match(nodeNamePattern);return nodeNameMatch&&nodeNameMatch[1].toLowerCase();} /**
 * Creates an array containing the nodes rendered from the supplied markup. The
 * optionally supplied `handleScript` function will be invoked once for each
 * <script> element that is rendered. If no `handleScript` function is supplied,
 * an exception is thrown if any <script> elements are rendered.
 *
 * @param {string} markup A string of valid HTML markup.
 * @param {?function} handleScript Invoked once for each rendered <script>.
 * @return {array<DOMElement|DOMTextNode>} An array of rendered nodes.
 */function createNodesFromMarkup(markup,handleScript){var node=dummyNode;"production"!==process.env.NODE_ENV?invariant(!!dummyNode,'createNodesFromMarkup dummy not initialized'):invariant(!!dummyNode);var nodeName=getNodeName(markup);var wrap=nodeName&&getMarkupWrap(nodeName);if(wrap){node.innerHTML=wrap[1]+markup+wrap[2];var wrapDepth=wrap[0];while(wrapDepth--){node=node.lastChild;}}else {node.innerHTML=markup;}var scripts=node.getElementsByTagName('script');if(scripts.length){"production"!==process.env.NODE_ENV?invariant(handleScript,'createNodesFromMarkup(...): Unexpected <script> element rendered.'):invariant(handleScript);createArrayFrom(scripts).forEach(handleScript);}var nodes=createArrayFrom(node.childNodes);while(node.lastChild){node.removeChild(node.lastChild);}return nodes;}module.exports=createNodesFromMarkup;}).call(this,require("e/U+97"));},{"./ExecutionEnvironment":24,"./createArrayFrom":101,"./getMarkupWrap":115,"./invariant":123,"e/U+97":3}],104:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule dangerousStyleValue
 * @typechecks static-only
 */"use strict";var CSSProperty=require("./CSSProperty");var isUnitlessNumber=CSSProperty.isUnitlessNumber; /**
 * Convert a value into the proper css writable value. The style name `name`
 * should be logical (no hyphens), as specified
 * in `CSSProperty.isUnitlessNumber`.
 *
 * @param {string} name CSS property name such as `topMargin`.
 * @param {*} value CSS property value such as `10px`.
 * @return {string} Normalized style value with dimensions applied.
 */function dangerousStyleValue(name,value){ // Note that we've removed escapeTextForBrowser() calls here since the
// whole string will be escaped when the attribute is injected into
// the markup. If you provide unsafe user data here they can inject
// arbitrary CSS which may be problematic (I couldn't repro this):
// https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
// http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
// This is not an XSS hole but instead a potential CSS injection issue
// which has lead to a greater discussion about how we're going to
// trust URLs moving forward. See #2115901
var isEmpty=value==null||typeof value==='boolean'||value==='';if(isEmpty){return '';}var isNonNumeric=isNaN(value);if(isNonNumeric||value===0||isUnitlessNumber.hasOwnProperty(name)&&isUnitlessNumber[name]){return ''+value; // cast to string
}if(typeof value==='string'){value=value.trim();}return value+'px';}module.exports=dangerousStyleValue;},{"./CSSProperty":6}],105:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule emptyFunction
 */var copyProperties=require("./copyProperties");function makeEmptyFunction(arg){return function(){return arg;};} /**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */function emptyFunction(){}copyProperties(emptyFunction,{thatReturns:makeEmptyFunction,thatReturnsFalse:makeEmptyFunction(false),thatReturnsTrue:makeEmptyFunction(true),thatReturnsNull:makeEmptyFunction(null),thatReturnsThis:function thatReturnsThis(){return this;},thatReturnsArgument:function thatReturnsArgument(arg){return arg;}});module.exports=emptyFunction;},{"./copyProperties":100}],106:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule emptyObject
 */"use strict";var emptyObject={};if("production"!==process.env.NODE_ENV){Object.freeze(emptyObject);}module.exports=emptyObject;}).call(this,require("e/U+97"));},{"e/U+97":3}],107:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule escapeTextForBrowser
 * @typechecks static-only
 */"use strict";var ESCAPE_LOOKUP={"&":"&amp;",">":"&gt;","<":"&lt;","\"":"&quot;","'":"&#x27;"};var ESCAPE_REGEX=/[&><"']/g;function escaper(match){return ESCAPE_LOOKUP[match];} /**
 * Escapes text to prevent scripting attacks.
 *
 * @param {*} text Text value to escape.
 * @return {string} An escaped string.
 */function escapeTextForBrowser(text){return (''+text).replace(ESCAPE_REGEX,escaper);}module.exports=escapeTextForBrowser;},{}],108:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule flattenChildren
 */"use strict";var traverseAllChildren=require("./traverseAllChildren");var warning=require("./warning"); /**
 * @param {function} traverseContext Context passed through traversal.
 * @param {?ReactComponent} child React child component.
 * @param {!string} name String name of key path to child.
 */function flattenSingleChildIntoContext(traverseContext,child,name){ // We found a component instance.
var result=traverseContext;var keyUnique=!result.hasOwnProperty(name);"production"!==process.env.NODE_ENV?warning(keyUnique,'flattenChildren(...): Encountered two children with the same key, '+'`%s`. Child keys must be unique; when two children share a key, only '+'the first child will be used.',name):null;if(keyUnique&&child!=null){result[name]=child;}} /**
 * Flattens children that are typically specified as `props.children`. Any null
 * children will not be included in the resulting object.
 * @return {!object} flattened children keyed by name.
 */function flattenChildren(children){if(children==null){return children;}var result={};traverseAllChildren(children,flattenSingleChildIntoContext,result);return result;}module.exports=flattenChildren;}).call(this,require("e/U+97"));},{"./traverseAllChildren":145,"./warning":146,"e/U+97":3}],109:[function(require,module,exports){ /**
 * Copyright 2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule focusNode
 */"use strict"; /**
 * IE8 throws if an input/textarea is disabled and we try to focus it.
 * Focus only when necessary.
 *
 * @param {DOMElement} node input/textarea to focus
 */function focusNode(node){if(!node.disabled){node.focus();}}module.exports=focusNode;},{}],110:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule forEachAccumulated
 */"use strict"; /**
 * @param {array} an "accumulation" of items which is either an Array or
 * a single item. Useful when paired with the `accumulate` module. This is a
 * simple utility that allows us to reason about a collection of items, but
 * handling the case when there is exactly one item (and we do not need to
 * allocate an array).
 */var forEachAccumulated=function forEachAccumulated(arr,cb,scope){if(Array.isArray(arr)){arr.forEach(cb,scope);}else if(arr){cb.call(scope,arr);}};module.exports=forEachAccumulated;},{}],111:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule getActiveElement
 * @typechecks
 */ /**
 * Same as document.activeElement but wraps in a try-catch block. In IE it is
 * not safe to call document.activeElement if there is nothing focused.
 *
 * The activeElement will be null only if the document body is not yet defined.
 */function getActiveElement() /*?DOMElement*/{try{return document.activeElement||document.body;}catch(e){return document.body;}}module.exports=getActiveElement;},{}],112:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule getEventKey
 * @typechecks static-only
 */"use strict";var invariant=require("./invariant"); /**
 * Normalization of deprecated HTML5 `key` values
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
 */var normalizeKey={'Esc':'Escape','Spacebar':' ','Left':'ArrowLeft','Up':'ArrowUp','Right':'ArrowRight','Down':'ArrowDown','Del':'Delete','Win':'OS','Menu':'ContextMenu','Apps':'ContextMenu','Scroll':'ScrollLock','MozPrintableKey':'Unidentified'}; /**
 * Translation from legacy `which`/`keyCode` to HTML5 `key`
 * Only special keys supported, all others depend on keyboard layout or browser
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
 */var translateToKey={8:'Backspace',9:'Tab',12:'Clear',13:'Enter',16:'Shift',17:'Control',18:'Alt',19:'Pause',20:'CapsLock',27:'Escape',32:' ',33:'PageUp',34:'PageDown',35:'End',36:'Home',37:'ArrowLeft',38:'ArrowUp',39:'ArrowRight',40:'ArrowDown',45:'Insert',46:'Delete',112:'F1',113:'F2',114:'F3',115:'F4',116:'F5',117:'F6',118:'F7',119:'F8',120:'F9',121:'F10',122:'F11',123:'F12',144:'NumLock',145:'ScrollLock',224:'Meta'}; /**
 * @param {object} nativeEvent Native browser event.
 * @return {string} Normalized `key` property.
 */function getEventKey(nativeEvent){if(nativeEvent.key){ // Normalize inconsistent values reported by browsers due to
// implementations of a working draft specification.
// FireFox implements `key` but returns `MozPrintableKey` for all
// printable characters (normalized to `Unidentified`), ignore it.
var key=normalizeKey[nativeEvent.key]||nativeEvent.key;if(key!=='Unidentified'){return key;}} // Browser does not implement `key`, polyfill as much of it as we can.
if(nativeEvent.type==='keypress'){ // Create the character from the `charCode` ourselves and use as an almost
// perfect replacement.
var charCode='charCode' in nativeEvent?nativeEvent.charCode:nativeEvent.keyCode; // The enter-key is technically both printable and non-printable and can
// thus be captured by `keypress`, no other non-printable key should.
return charCode===13?'Enter':String.fromCharCode(charCode);}if(nativeEvent.type==='keydown'||nativeEvent.type==='keyup'){ // While user keyboard layout determines the actual meaning of each
// `keyCode` value, almost all function keys have a universal value.
return translateToKey[nativeEvent.keyCode]||'Unidentified';}"production"!==process.env.NODE_ENV?invariant(false,"Unexpected keyboard event type: %s",nativeEvent.type):invariant(false);}module.exports=getEventKey;}).call(this,require("e/U+97"));},{"./invariant":123,"e/U+97":3}],113:[function(require,module,exports){ /**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule getEventModifierState
 * @typechecks static-only
 */"use strict"; /**
 * Translation from modifier key to the associated property in the event.
 * @see http://www.w3.org/TR/DOM-Level-3-Events/#keys-Modifiers
 */var modifierKeyToProp={'Alt':'altKey','Control':'ctrlKey','Meta':'metaKey','Shift':'shiftKey'}; // IE8 does not implement getModifierState so we simply map it to the only
// modifier keys exposed by the event itself, does not support Lock-keys.
// Currently, all major browsers except Chrome seems to support Lock-keys.
function modifierStateGetter(keyArg){ /*jshint validthis:true */var syntheticEvent=this;var nativeEvent=syntheticEvent.nativeEvent;if(nativeEvent.getModifierState){return nativeEvent.getModifierState(keyArg);}var keyProp=modifierKeyToProp[keyArg];return keyProp?!!nativeEvent[keyProp]:false;}function getEventModifierState(nativeEvent){return modifierStateGetter;}module.exports=getEventModifierState;},{}],114:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule getEventTarget
 * @typechecks static-only
 */"use strict"; /**
 * Gets the target node from a native browser event by accounting for
 * inconsistencies in browser DOM APIs.
 *
 * @param {object} nativeEvent Native browser event.
 * @return {DOMEventTarget} Target node.
 */function getEventTarget(nativeEvent){var target=nativeEvent.target||nativeEvent.srcElement||window; // Safari may fire events on text nodes (Node.TEXT_NODE is 3).
// @see http://www.quirksmode.org/js/events_properties.html
return target.nodeType===3?target.parentNode:target;}module.exports=getEventTarget;},{}],115:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule getMarkupWrap
 */var ExecutionEnvironment=require("./ExecutionEnvironment");var invariant=require("./invariant"); /**
 * Dummy container used to detect which wraps are necessary.
 */var dummyNode=ExecutionEnvironment.canUseDOM?document.createElement('div'):null; /**
 * Some browsers cannot use `innerHTML` to render certain elements standalone,
 * so we wrap them, render the wrapped nodes, then extract the desired node.
 *
 * In IE8, certain elements cannot render alone, so wrap all elements ('*').
 */var shouldWrap={ // Force wrapping for SVG elements because if they get created inside a <div>,
// they will be initialized in the wrong namespace (and will not display).
'circle':true,'defs':true,'ellipse':true,'g':true,'line':true,'linearGradient':true,'path':true,'polygon':true,'polyline':true,'radialGradient':true,'rect':true,'stop':true,'text':true};var selectWrap=[1,'<select multiple="true">','</select>'];var tableWrap=[1,'<table>','</table>'];var trWrap=[3,'<table><tbody><tr>','</tr></tbody></table>'];var svgWrap=[1,'<svg>','</svg>'];var markupWrap={'*':[1,'?<div>','</div>'],'area':[1,'<map>','</map>'],'col':[2,'<table><tbody></tbody><colgroup>','</colgroup></table>'],'legend':[1,'<fieldset>','</fieldset>'],'param':[1,'<object>','</object>'],'tr':[2,'<table><tbody>','</tbody></table>'],'optgroup':selectWrap,'option':selectWrap,'caption':tableWrap,'colgroup':tableWrap,'tbody':tableWrap,'tfoot':tableWrap,'thead':tableWrap,'td':trWrap,'th':trWrap,'circle':svgWrap,'defs':svgWrap,'ellipse':svgWrap,'g':svgWrap,'line':svgWrap,'linearGradient':svgWrap,'path':svgWrap,'polygon':svgWrap,'polyline':svgWrap,'radialGradient':svgWrap,'rect':svgWrap,'stop':svgWrap,'text':svgWrap}; /**
 * Gets the markup wrap configuration for the supplied `nodeName`.
 *
 * NOTE: This lazily detects which wraps are necessary for the current browser.
 *
 * @param {string} nodeName Lowercase `nodeName`.
 * @return {?array} Markup wrap configuration, if applicable.
 */function getMarkupWrap(nodeName){"production"!==process.env.NODE_ENV?invariant(!!dummyNode,'Markup wrapping node not initialized'):invariant(!!dummyNode);if(!markupWrap.hasOwnProperty(nodeName)){nodeName='*';}if(!shouldWrap.hasOwnProperty(nodeName)){if(nodeName==='*'){dummyNode.innerHTML='<link />';}else {dummyNode.innerHTML='<'+nodeName+'></'+nodeName+'>';}shouldWrap[nodeName]=!dummyNode.firstChild;}return shouldWrap[nodeName]?markupWrap[nodeName]:null;}module.exports=getMarkupWrap;}).call(this,require("e/U+97"));},{"./ExecutionEnvironment":24,"./invariant":123,"e/U+97":3}],116:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule getNodeForCharacterOffset
 */"use strict"; /**
 * Given any node return the first leaf node without children.
 *
 * @param {DOMElement|DOMTextNode} node
 * @return {DOMElement|DOMTextNode}
 */function getLeafNode(node){while(node&&node.firstChild){node=node.firstChild;}return node;} /**
 * Get the next sibling within a container. This will walk up the
 * DOM if a node's siblings have been exhausted.
 *
 * @param {DOMElement|DOMTextNode} node
 * @return {?DOMElement|DOMTextNode}
 */function getSiblingNode(node){while(node){if(node.nextSibling){return node.nextSibling;}node=node.parentNode;}} /**
 * Get object describing the nodes which contain characters at offset.
 *
 * @param {DOMElement|DOMTextNode} root
 * @param {number} offset
 * @return {?object}
 */function getNodeForCharacterOffset(root,offset){var node=getLeafNode(root);var nodeStart=0;var nodeEnd=0;while(node){if(node.nodeType==3){nodeEnd=nodeStart+node.textContent.length;if(nodeStart<=offset&&nodeEnd>=offset){return {node:node,offset:offset-nodeStart};}nodeStart=nodeEnd;}node=getLeafNode(getSiblingNode(node));}}module.exports=getNodeForCharacterOffset;},{}],117:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule getReactRootElementInContainer
 */"use strict";var DOC_NODE_TYPE=9; /**
 * @param {DOMElement|DOMDocument} container DOM element that may contain
 *                                           a React component
 * @return {?*} DOM element that may have the reactRoot ID, or null.
 */function getReactRootElementInContainer(container){if(!container){return null;}if(container.nodeType===DOC_NODE_TYPE){return container.documentElement;}else {return container.firstChild;}}module.exports=getReactRootElementInContainer;},{}],118:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule getTextContentAccessor
 */"use strict";var ExecutionEnvironment=require("./ExecutionEnvironment");var contentKey=null; /**
 * Gets the key used to access text content on a DOM node.
 *
 * @return {?string} Key used to access text content.
 * @internal
 */function getTextContentAccessor(){if(!contentKey&&ExecutionEnvironment.canUseDOM){ // Prefer textContent to innerText because many browsers support both but
// SVG <text> elements don't support innerText even when <div> does.
contentKey='textContent' in document.documentElement?'textContent':'innerText';}return contentKey;}module.exports=getTextContentAccessor;},{"./ExecutionEnvironment":24}],119:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule getUnboundedScrollPosition
 * @typechecks
 */"use strict"; /**
 * Gets the scroll position of the supplied element or window.
 *
 * The return values are unbounded, unlike `getScrollPosition`. This means they
 * may be negative or exceed the element boundaries (which is possible using
 * inertial scrolling).
 *
 * @param {DOMWindow|DOMElement} scrollable
 * @return {object} Map with `x` and `y` keys.
 */function getUnboundedScrollPosition(scrollable){if(scrollable===window){return {x:window.pageXOffset||document.documentElement.scrollLeft,y:window.pageYOffset||document.documentElement.scrollTop};}return {x:scrollable.scrollLeft,y:scrollable.scrollTop};}module.exports=getUnboundedScrollPosition;},{}],120:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule hyphenate
 * @typechecks
 */var _uppercasePattern=/([A-Z])/g; /**
 * Hyphenates a camelcased string, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *
 * For CSS style names, use `hyphenateStyleName` instead which works properly
 * with all vendor prefixes, including `ms`.
 *
 * @param {string} string
 * @return {string}
 */function hyphenate(string){return string.replace(_uppercasePattern,'-$1').toLowerCase();}module.exports=hyphenate;},{}],121:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule hyphenateStyleName
 * @typechecks
 */"use strict";var hyphenate=require("./hyphenate");var msPattern=/^ms-/; /**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *   > hyphenate('MozTransition')
 *   < "-moz-transition"
 *   > hyphenate('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 *
 * @param {string} string
 * @return {string}
 */function hyphenateStyleName(string){return hyphenate(string).replace(msPattern,'-ms-');}module.exports=hyphenateStyleName;},{"./hyphenate":120}],122:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule instantiateReactComponent
 * @typechecks static-only
 */"use strict";var invariant=require("./invariant"); /**
 * Validate a `componentDescriptor`. This should be exposed publicly in a follow
 * up diff.
 *
 * @param {object} descriptor
 * @return {boolean} Returns true if this is a valid descriptor of a Component.
 */function isValidComponentDescriptor(descriptor){return descriptor&&typeof descriptor.type==='function'&&typeof descriptor.type.prototype.mountComponent==='function'&&typeof descriptor.type.prototype.receiveComponent==='function';} /**
 * Given a `componentDescriptor` create an instance that will actually be
 * mounted. Currently it just extracts an existing clone from composite
 * components but this is an implementation detail which will change.
 *
 * @param {object} descriptor
 * @return {object} A new instance of componentDescriptor's constructor.
 * @protected
 */function instantiateReactComponent(descriptor){ // TODO: Make warning
// if (__DEV__) {
"production"!==process.env.NODE_ENV?invariant(isValidComponentDescriptor(descriptor),'Only React Components are valid for mounting.'):invariant(isValidComponentDescriptor(descriptor)); // }
return new descriptor.type(descriptor);}module.exports=instantiateReactComponent;}).call(this,require("e/U+97"));},{"./invariant":123,"e/U+97":3}],123:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule invariant
 */"use strict"; /**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */var invariant=function invariant(condition,format,a,b,c,d,e,f){if("production"!==process.env.NODE_ENV){if(format===undefined){throw new Error('invariant requires an error message argument');}}if(!condition){var error;if(format===undefined){error=new Error('Minified exception occurred; use the non-minified dev environment '+'for the full error message and additional helpful warnings.');}else {var args=[a,b,c,d,e,f];var argIndex=0;error=new Error('Invariant Violation: '+format.replace(/%s/g,function(){return args[argIndex++];}));}error.framesToPop=1; // we don't care about invariant's own frame
throw error;}};module.exports=invariant;}).call(this,require("e/U+97"));},{"e/U+97":3}],124:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule isEventSupported
 */"use strict";var ExecutionEnvironment=require("./ExecutionEnvironment");var useHasFeature;if(ExecutionEnvironment.canUseDOM){useHasFeature=document.implementation&&document.implementation.hasFeature&& // always returns true in newer browsers as per the standard.
// @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
document.implementation.hasFeature('','')!==true;} /**
 * Checks if an event is supported in the current execution environment.
 *
 * NOTE: This will not work correctly for non-generic events such as `change`,
 * `reset`, `load`, `error`, and `select`.
 *
 * Borrows from Modernizr.
 *
 * @param {string} eventNameSuffix Event name, e.g. "click".
 * @param {?boolean} capture Check if the capture phase is supported.
 * @return {boolean} True if the event is supported.
 * @internal
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */function isEventSupported(eventNameSuffix,capture){if(!ExecutionEnvironment.canUseDOM||capture&&!('addEventListener' in document)){return false;}var eventName='on'+eventNameSuffix;var isSupported=eventName in document;if(!isSupported){var element=document.createElement('div');element.setAttribute(eventName,'return;');isSupported=typeof element[eventName]==='function';}if(!isSupported&&useHasFeature&&eventNameSuffix==='wheel'){ // This is the only way to test support for the `wheel` event in IE9+.
isSupported=document.implementation.hasFeature('Events.wheel','3.0');}return isSupported;}module.exports=isEventSupported;},{"./ExecutionEnvironment":24}],125:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule isNode
 * @typechecks
 */ /**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM node.
 */function isNode(object){return !!(object&&(typeof Node==='function'?object instanceof Node:(typeof object==="undefined"?"undefined":_typeof(object))==='object'&&typeof object.nodeType==='number'&&typeof object.nodeName==='string'));}module.exports=isNode;},{}],126:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule isTextInputElement
 */"use strict"; /**
 * @see http://www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary
 */var supportedInputTypes={'color':true,'date':true,'datetime':true,'datetime-local':true,'email':true,'month':true,'number':true,'password':true,'range':true,'search':true,'tel':true,'text':true,'time':true,'url':true,'week':true};function isTextInputElement(elem){return elem&&(elem.nodeName==='INPUT'&&supportedInputTypes[elem.type]||elem.nodeName==='TEXTAREA');}module.exports=isTextInputElement;},{}],127:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule isTextNode
 * @typechecks
 */var isNode=require("./isNode"); /**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM text node.
 */function isTextNode(object){return isNode(object)&&object.nodeType==3;}module.exports=isTextNode;},{"./isNode":125}],128:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule joinClasses
 * @typechecks static-only
 */"use strict"; /**
 * Combines multiple className strings into one.
 * http://jsperf.com/joinclasses-args-vs-array
 *
 * @param {...?string} classes
 * @return {string}
 */function joinClasses(className /*, ... */){if(!className){className='';}var nextClass;var argLength=arguments.length;if(argLength>1){for(var ii=1;ii<argLength;ii++){nextClass=arguments[ii];nextClass&&(className+=' '+nextClass);}}return className;}module.exports=joinClasses;},{}],129:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule keyMirror
 * @typechecks static-only
 */"use strict";var invariant=require("./invariant"); /**
 * Constructs an enumeration with keys equal to their value.
 *
 * For example:
 *
 *   var COLORS = keyMirror({blue: null, red: null});
 *   var myColor = COLORS.blue;
 *   var isColorValid = !!COLORS[myColor];
 *
 * The last line could not be performed if the values of the generated enum were
 * not equal to their keys.
 *
 *   Input:  {key1: val1, key2: val2}
 *   Output: {key1: key1, key2: key2}
 *
 * @param {object} obj
 * @return {object}
 */var keyMirror=function keyMirror(obj){var ret={};var key;"production"!==process.env.NODE_ENV?invariant(obj instanceof Object&&!Array.isArray(obj),'keyMirror(...): Argument must be an object.'):invariant(obj instanceof Object&&!Array.isArray(obj));for(key in obj){if(!obj.hasOwnProperty(key)){continue;}ret[key]=key;}return ret;};module.exports=keyMirror;}).call(this,require("e/U+97"));},{"./invariant":123,"e/U+97":3}],130:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule keyOf
 */ /**
 * Allows extraction of a minified key. Let's the build system minify keys
 * without loosing the ability to dynamically use key strings as values
 * themselves. Pass in an object with a single key/val pair and it will return
 * you the string key of that single record. Suppose you want to grab the
 * value for a key 'className' inside of an object. Key/val minification may
 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
 * reuse those resolutions.
 */var keyOf=function keyOf(oneKeyObj){var key;for(key in oneKeyObj){if(!oneKeyObj.hasOwnProperty(key)){continue;}return key;}return null;};module.exports=keyOf;},{}],131:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule mapObject
 */"use strict"; /**
 * For each key/value pair, invokes callback func and constructs a resulting
 * object which contains, for every key in obj, values that are the result of
 * of invoking the function:
 *
 *   func(value, key, iteration)
 *
 * Grepable names:
 *
 *   function objectMap()
 *   function objMap()
 *
 * @param {?object} obj Object to map keys over
 * @param {function} func Invoked for each key/val pair.
 * @param {?*} context
 * @return {?object} Result of mapping or null if obj is falsey
 */function mapObject(obj,func,context){if(!obj){return null;}var i=0;var ret={};for(var key in obj){if(obj.hasOwnProperty(key)){ret[key]=func.call(context,obj[key],key,i++);}}return ret;}module.exports=mapObject;},{}],132:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule memoizeStringOnly
 * @typechecks static-only
 */"use strict"; /**
 * Memoizes the return value of a function that accepts one string argument.
 *
 * @param {function} callback
 * @return {function}
 */function memoizeStringOnly(callback){var cache={};return function(string){if(cache.hasOwnProperty(string)){return cache[string];}else {return cache[string]=callback.call(this,string);}};}module.exports=memoizeStringOnly;},{}],133:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule merge
 */"use strict";var mergeInto=require("./mergeInto"); /**
 * Shallow merges two structures into a return value, without mutating either.
 *
 * @param {?object} one Optional object with properties to merge from.
 * @param {?object} two Optional object with properties to merge from.
 * @return {object} The shallow extension of one by two.
 */var merge=function merge(one,two){var result={};mergeInto(result,one);mergeInto(result,two);return result;};module.exports=merge;},{"./mergeInto":135}],134:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule mergeHelpers
 *
 * requiresPolyfills: Array.isArray
 */"use strict";var invariant=require("./invariant");var keyMirror=require("./keyMirror"); /**
 * Maximum number of levels to traverse. Will catch circular structures.
 * @const
 */var MAX_MERGE_DEPTH=36; /**
 * We won't worry about edge cases like new String('x') or new Boolean(true).
 * Functions are considered terminals, and arrays are not.
 * @param {*} o The item/object/value to test.
 * @return {boolean} true iff the argument is a terminal.
 */var isTerminal=function isTerminal(o){return (typeof o==="undefined"?"undefined":_typeof(o))!=='object'||o===null;};var mergeHelpers={MAX_MERGE_DEPTH:MAX_MERGE_DEPTH,isTerminal:isTerminal, /**
   * Converts null/undefined values into empty object.
   *
   * @param {?Object=} arg Argument to be normalized (nullable optional)
   * @return {!Object}
   */normalizeMergeArg:function normalizeMergeArg(arg){return arg===undefined||arg===null?{}:arg;}, /**
   * If merging Arrays, a merge strategy *must* be supplied. If not, it is
   * likely the caller's fault. If this function is ever called with anything
   * but `one` and `two` being `Array`s, it is the fault of the merge utilities.
   *
   * @param {*} one Array to merge into.
   * @param {*} two Array to merge from.
   */checkMergeArrayArgs:function checkMergeArrayArgs(one,two){"production"!==process.env.NODE_ENV?invariant(Array.isArray(one)&&Array.isArray(two),'Tried to merge arrays, instead got %s and %s.',one,two):invariant(Array.isArray(one)&&Array.isArray(two));}, /**
   * @param {*} one Object to merge into.
   * @param {*} two Object to merge from.
   */checkMergeObjectArgs:function checkMergeObjectArgs(one,two){mergeHelpers.checkMergeObjectArg(one);mergeHelpers.checkMergeObjectArg(two);}, /**
   * @param {*} arg
   */checkMergeObjectArg:function checkMergeObjectArg(arg){"production"!==process.env.NODE_ENV?invariant(!isTerminal(arg)&&!Array.isArray(arg),'Tried to merge an object, instead got %s.',arg):invariant(!isTerminal(arg)&&!Array.isArray(arg));}, /**
   * @param {*} arg
   */checkMergeIntoObjectArg:function checkMergeIntoObjectArg(arg){"production"!==process.env.NODE_ENV?invariant((!isTerminal(arg)||typeof arg==='function')&&!Array.isArray(arg),'Tried to merge into an object, instead got %s.',arg):invariant((!isTerminal(arg)||typeof arg==='function')&&!Array.isArray(arg));}, /**
   * Checks that a merge was not given a circular object or an object that had
   * too great of depth.
   *
   * @param {number} Level of recursion to validate against maximum.
   */checkMergeLevel:function checkMergeLevel(level){"production"!==process.env.NODE_ENV?invariant(level<MAX_MERGE_DEPTH,'Maximum deep merge depth exceeded. You may be attempting to merge '+'circular structures in an unsupported way.'):invariant(level<MAX_MERGE_DEPTH);}, /**
   * Checks that the supplied merge strategy is valid.
   *
   * @param {string} Array merge strategy.
   */checkArrayStrategy:function checkArrayStrategy(strategy){"production"!==process.env.NODE_ENV?invariant(strategy===undefined||strategy in mergeHelpers.ArrayStrategies,'You must provide an array strategy to deep merge functions to '+'instruct the deep merge how to resolve merging two arrays.'):invariant(strategy===undefined||strategy in mergeHelpers.ArrayStrategies);}, /**
   * Set of possible behaviors of merge algorithms when encountering two Arrays
   * that must be merged together.
   * - `clobber`: The left `Array` is ignored.
   * - `indexByIndex`: The result is achieved by recursively deep merging at
   *   each index. (not yet supported.)
   */ArrayStrategies:keyMirror({Clobber:true,IndexByIndex:true})};module.exports=mergeHelpers;}).call(this,require("e/U+97"));},{"./invariant":123,"./keyMirror":129,"e/U+97":3}],135:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule mergeInto
 * @typechecks static-only
 */"use strict";var mergeHelpers=require("./mergeHelpers");var checkMergeObjectArg=mergeHelpers.checkMergeObjectArg;var checkMergeIntoObjectArg=mergeHelpers.checkMergeIntoObjectArg; /**
 * Shallow merges two structures by mutating the first parameter.
 *
 * @param {object|function} one Object to be merged into.
 * @param {?object} two Optional object with properties to merge from.
 */function mergeInto(one,two){checkMergeIntoObjectArg(one);if(two!=null){checkMergeObjectArg(two);for(var key in two){if(!two.hasOwnProperty(key)){continue;}one[key]=two[key];}}}module.exports=mergeInto;},{"./mergeHelpers":134}],136:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule mixInto
 */"use strict"; /**
 * Simply copies properties to the prototype.
 */var mixInto=function mixInto(constructor,methodBag){var methodName;for(methodName in methodBag){if(!methodBag.hasOwnProperty(methodName)){continue;}constructor.prototype[methodName]=methodBag[methodName];}};module.exports=mixInto;},{}],137:[function(require,module,exports){(function(process){ /**
 * Copyright 2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule monitorCodeUse
 */"use strict";var invariant=require("./invariant"); /**
 * Provides open-source compatible instrumentation for monitoring certain API
 * uses before we're ready to issue a warning or refactor. It accepts an event
 * name which may only contain the characters [a-z0-9_] and an optional data
 * object with further information.
 */function monitorCodeUse(eventName,data){"production"!==process.env.NODE_ENV?invariant(eventName&&!/[^a-z0-9_]/.test(eventName),'You must provide an eventName using only the characters [a-z0-9_]'):invariant(eventName&&!/[^a-z0-9_]/.test(eventName));}module.exports=monitorCodeUse;}).call(this,require("e/U+97"));},{"./invariant":123,"e/U+97":3}],138:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule onlyChild
 */"use strict";var ReactDescriptor=require("./ReactDescriptor");var invariant=require("./invariant"); /**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection. The current implementation of this
 * function assumes that a single child gets passed without a wrapper, but the
 * purpose of this helper function is to abstract away the particular structure
 * of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactComponent} The first and only `ReactComponent` contained in the
 * structure.
 */function onlyChild(children){"production"!==process.env.NODE_ENV?invariant(ReactDescriptor.isValidDescriptor(children),'onlyChild must be passed a children with exactly one child.'):invariant(ReactDescriptor.isValidDescriptor(children));return children;}module.exports=onlyChild;}).call(this,require("e/U+97"));},{"./ReactDescriptor":54,"./invariant":123,"e/U+97":3}],139:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule performance
 * @typechecks
 */"use strict";var ExecutionEnvironment=require("./ExecutionEnvironment");var performance;if(ExecutionEnvironment.canUseDOM){performance=window.performance||window.msPerformance||window.webkitPerformance;}module.exports=performance||{};},{"./ExecutionEnvironment":24}],140:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule performanceNow
 * @typechecks
 */var performance=require("./performance"); /**
 * Detect if we can use `window.performance.now()` and gracefully fallback to
 * `Date.now()` if it doesn't exist. We need to support Firefox < 15 for now
 * because of Facebook's testing infrastructure.
 */if(!performance||!performance.now){performance=Date;}var performanceNow=performance.now.bind(performance);module.exports=performanceNow;},{"./performance":139}],141:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule setInnerHTML
 */"use strict";var ExecutionEnvironment=require("./ExecutionEnvironment"); /**
 * Set the innerHTML property of a node, ensuring that whitespace is preserved
 * even in IE8.
 *
 * @param {DOMElement} node
 * @param {string} html
 * @internal
 */var setInnerHTML=function setInnerHTML(node,html){node.innerHTML=html;};if(ExecutionEnvironment.canUseDOM){ // IE8: When updating a just created node with innerHTML only leading
// whitespace is removed. When updating an existing node with innerHTML
// whitespace in root TextNodes is also collapsed.
// @see quirksmode.org/bugreports/archives/2004/11/innerhtml_and_t.html
// Feature detection; only IE8 is known to behave improperly like this.
var testElement=document.createElement('div');testElement.innerHTML=' ';if(testElement.innerHTML===''){setInnerHTML=function setInnerHTML(node,html){ // Magic theory: IE8 supposedly differentiates between added and updated
// nodes when processing innerHTML, innerHTML on updated nodes suffers
// from worse whitespace behavior. Re-adding a node like this triggers
// the initial and more favorable whitespace behavior.
// TODO: What to do on a detached node?
if(node.parentNode){node.parentNode.replaceChild(node,node);} // We also implement a workaround for non-visible tags disappearing into
// thin air on IE8, this only happens if there is no visible text
// in-front of the non-visible tags. Piggyback on the whitespace fix
// and simply check if any non-visible tags appear in the source.
if(html.match(/^[ \r\n\t\f]/)||html[0]==='<'&&(html.indexOf('<noscript')!==-1||html.indexOf('<script')!==-1||html.indexOf('<style')!==-1||html.indexOf('<meta')!==-1||html.indexOf('<link')!==-1)){ // Recover leading whitespace by temporarily prepending any character.
// \uFEFF has the potential advantage of being zero-width/invisible.
node.innerHTML="﻿"+html; // deleteData leaves an empty `TextNode` which offsets the index of all
// children. Definitely want to avoid this.
var textNode=node.firstChild;if(textNode.data.length===1){node.removeChild(textNode);}else {textNode.deleteData(0,1);}}else {node.innerHTML=html;}};}}module.exports=setInnerHTML;},{"./ExecutionEnvironment":24}],142:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule shallowEqual
 */"use strict"; /**
 * Performs equality by iterating through keys on an object and returning
 * false when any key has values which are not strictly equal between
 * objA and objB. Returns true when the values of all keys are strictly equal.
 *
 * @return {boolean}
 */function shallowEqual(objA,objB){if(objA===objB){return true;}var key; // Test for A's keys different from B.
for(key in objA){if(objA.hasOwnProperty(key)&&(!objB.hasOwnProperty(key)||objA[key]!==objB[key])){return false;}} // Test for B'a keys missing from A.
for(key in objB){if(objB.hasOwnProperty(key)&&!objA.hasOwnProperty(key)){return false;}}return true;}module.exports=shallowEqual;},{}],143:[function(require,module,exports){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule shouldUpdateReactComponent
 * @typechecks static-only
 */"use strict"; /**
 * Given a `prevDescriptor` and `nextDescriptor`, determines if the existing
 * instance should be updated as opposed to being destroyed or replaced by a new
 * instance. Both arguments are descriptors. This ensures that this logic can
 * operate on stateless trees without any backing instance.
 *
 * @param {?object} prevDescriptor
 * @param {?object} nextDescriptor
 * @return {boolean} True if the existing instance should be updated.
 * @protected
 */function shouldUpdateReactComponent(prevDescriptor,nextDescriptor){if(prevDescriptor&&nextDescriptor&&prevDescriptor.type===nextDescriptor.type&&(prevDescriptor.props&&prevDescriptor.props.key)===(nextDescriptor.props&&nextDescriptor.props.key)&&prevDescriptor._owner===nextDescriptor._owner){return true;}return false;}module.exports=shouldUpdateReactComponent;},{}],144:[function(require,module,exports){(function(process){ /**
 * Copyright 2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule toArray
 * @typechecks
 */var invariant=require("./invariant"); /**
 * Convert array-like objects to arrays.
 *
 * This API assumes the caller knows the contents of the data type. For less
 * well defined inputs use createArrayFrom.
 *
 * @param {object|function|filelist} obj
 * @return {array}
 */function toArray(obj){var length=obj.length; // Some browse builtin objects can report typeof 'function' (e.g. NodeList in
// old versions of Safari).
"production"!==process.env.NODE_ENV?invariant(!Array.isArray(obj)&&((typeof obj==="undefined"?"undefined":_typeof(obj))==='object'||typeof obj==='function'),'toArray: Array-like object expected'):invariant(!Array.isArray(obj)&&((typeof obj==="undefined"?"undefined":_typeof(obj))==='object'||typeof obj==='function'));"production"!==process.env.NODE_ENV?invariant(typeof length==='number','toArray: Object needs a length property'):invariant(typeof length==='number');"production"!==process.env.NODE_ENV?invariant(length===0||length-1 in obj,'toArray: Object should have keys for indices'):invariant(length===0||length-1 in obj); // Old IE doesn't give collections access to hasOwnProperty. Assume inputs
// without method will throw during the slice call and skip straight to the
// fallback.
if(obj.hasOwnProperty){try{return Array.prototype.slice.call(obj);}catch(e){ // IE < 9 does not support Array#slice on collections objects
}} // Fall back to copying key by key. This assumes all keys have a value,
// so will not preserve sparsely populated inputs.
var ret=Array(length);for(var ii=0;ii<length;ii++){ret[ii]=obj[ii];}return ret;}module.exports=toArray;}).call(this,require("e/U+97"));},{"./invariant":123,"e/U+97":3}],145:[function(require,module,exports){(function(process){ /**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule traverseAllChildren
 */"use strict";var ReactInstanceHandles=require("./ReactInstanceHandles");var ReactTextComponent=require("./ReactTextComponent");var invariant=require("./invariant");var SEPARATOR=ReactInstanceHandles.SEPARATOR;var SUBSEPARATOR=':'; /**
 * TODO: Test that:
 * 1. `mapChildren` transforms strings and numbers into `ReactTextComponent`.
 * 2. it('should fail when supplied duplicate key', function() {
 * 3. That a single child and an array with one item have the same key pattern.
 * });
 */var userProvidedKeyEscaperLookup={'=':'=0','.':'=1',':':'=2'};var userProvidedKeyEscapeRegex=/[=.:]/g;function userProvidedKeyEscaper(match){return userProvidedKeyEscaperLookup[match];} /**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */function getComponentKey(component,index){if(component&&component.props&&component.props.key!=null){ // Explicit key
return wrapUserProvidedKey(component.props.key);} // Implicit key determined by the index in the set
return index.toString(36);} /**
 * Escape a component key so that it is safe to use in a reactid.
 *
 * @param {*} key Component key to be escaped.
 * @return {string} An escaped string.
 */function escapeUserProvidedKey(text){return (''+text).replace(userProvidedKeyEscapeRegex,userProvidedKeyEscaper);} /**
 * Wrap a `key` value explicitly provided by the user to distinguish it from
 * implicitly-generated keys generated by a component's index in its parent.
 *
 * @param {string} key Value of a user-provided `key` attribute
 * @return {string}
 */function wrapUserProvidedKey(key){return '$'+escapeUserProvidedKey(key);} /**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!number} indexSoFar Number of children encountered until this point.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */var traverseAllChildrenImpl=function traverseAllChildrenImpl(children,nameSoFar,indexSoFar,callback,traverseContext){var subtreeCount=0; // Count of children found in the current subtree.
if(Array.isArray(children)){for(var i=0;i<children.length;i++){var child=children[i];var nextName=nameSoFar+(nameSoFar?SUBSEPARATOR:SEPARATOR)+getComponentKey(child,i);var nextIndex=indexSoFar+subtreeCount;subtreeCount+=traverseAllChildrenImpl(child,nextName,nextIndex,callback,traverseContext);}}else {var type=typeof children==="undefined"?"undefined":_typeof(children);var isOnlyChild=nameSoFar===''; // If it's the only child, treat the name as if it was wrapped in an array
// so that it's consistent if the number of children grows
var storageName=isOnlyChild?SEPARATOR+getComponentKey(children,0):nameSoFar;if(children==null||type==='boolean'){ // All of the above are perceived as null.
callback(traverseContext,null,storageName,indexSoFar);subtreeCount=1;}else if(children.type&&children.type.prototype&&children.type.prototype.mountComponentIntoNode){callback(traverseContext,children,storageName,indexSoFar);subtreeCount=1;}else {if(type==='object'){"production"!==process.env.NODE_ENV?invariant(!children||children.nodeType!==1,'traverseAllChildren(...): Encountered an invalid child; DOM '+'elements are not valid children of React components.'):invariant(!children||children.nodeType!==1);for(var key in children){if(children.hasOwnProperty(key)){subtreeCount+=traverseAllChildrenImpl(children[key],nameSoFar+(nameSoFar?SUBSEPARATOR:SEPARATOR)+wrapUserProvidedKey(key)+SUBSEPARATOR+getComponentKey(children[key],0),indexSoFar+subtreeCount,callback,traverseContext);}}}else if(type==='string'){var normalizedText=ReactTextComponent(children);callback(traverseContext,normalizedText,storageName,indexSoFar);subtreeCount+=1;}else if(type==='number'){var normalizedNumber=ReactTextComponent(''+children);callback(traverseContext,normalizedNumber,storageName,indexSoFar);subtreeCount+=1;}}}return subtreeCount;}; /**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */function traverseAllChildren(children,callback,traverseContext){if(children==null){return 0;}return traverseAllChildrenImpl(children,'',0,callback,traverseContext);}module.exports=traverseAllChildren;}).call(this,require("e/U+97"));},{"./ReactInstanceHandles":62,"./ReactTextComponent":78,"./invariant":123,"e/U+97":3}],146:[function(require,module,exports){(function(process){ /**
 * Copyright 2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule warning
 */"use strict";var emptyFunction=require("./emptyFunction"); /**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */var warning=emptyFunction;if("production"!==process.env.NODE_ENV){warning=function warning(condition,format){var args=Array.prototype.slice.call(arguments,2);if(format===undefined){throw new Error('`warning(condition, format, ...args)` requires a warning '+'message argument');}if(!condition){var argIndex=0;console.warn('Warning: '+format.replace(/%s/g,function(){return args[argIndex++];}));}};}module.exports=warning;}).call(this,require("e/U+97"));},{"./emptyFunction":105,"e/U+97":3}],147:[function(require,module,exports){module.exports=require('./lib/React');},{"./lib/React":30}],148:[function(require,module,exports){ /** @jsx React.DOM */var React=require('react');var FormList=React.createClass({displayName:'FormList',componentDidUpdate:function componentDidUpdate(prevProps,prevState){this.refs.bla.getDOMNode().focus();},clickHandle:function clickHandle(e){var value=this.refs.bla.getDOMNode().value;var func=this.props.func;func(value);},addNewItem:function addNewItem(e){e.preventDefault();var value=this.refs.bla.getDOMNode().value;var func=this.props.add_func;func(value);this.refs.bla.getDOMNode().value="";},render:function render(){var disabled=this.props.disabled?"true":"";var hide=this.props.hide?'none':'block';var autoFocus=this.props.hide?false:true;var style={display:hide};return React.DOM.div({style:style,className:"new_item_from"},React.DOM.form(null,React.DOM.label(null,"Add new ToDo:"),React.DOM.input({onChange:this.clickHandle,autoFocus:autoFocus,type:"text",placeholder:"title",ref:"bla"}),React.DOM.button({onClick:this.addNewItem,disabled:disabled,className:"btn btn-primary"},"add new item")));}});module.exports=FormList;},{"react":147}],149:[function(require,module,exports){ /** @jsx React.DOM */var React=require('react');var FromList=require('./FormList');var FormOpenBtn=React.createClass({displayName:'FormOpenBtn',hideOpen:function hideOpen(){var func=this.props.func;func();this.refs.bla.getDOMNode().focus();},render:function render(){return React.DOM.button({onClick:this.hideOpen,className:"btn btn-success form_open_btn"},"Add new ToDo");}});module.exports=FormOpenBtn;},{"./FormList":148,"react":147}],150:[function(require,module,exports){ /** @jsx React.DOM */var React=require('react');var Item=React.createClass({displayName:'Item',componentDidUpdate:function componentDidUpdate(prevProps,prevState){this.refs.change_title.getDOMNode().focus();},open_textarea:function open_textarea(){textarea_open=!textarea_open;},delete_func:function delete_func(){var func=this.props.delete_func;func(this.props.this_item);},done_func:function done_func(){var func=this.props.done_func;func(this.props.this_item);},open_li_func:function open_li_func(){var func=this.props.open_li_style_func;func(this.props.this_item);this.refs.change_title.getDOMNode().value=this.props.this_item.title;},update_func:function update_func(){var func=this.props.update_func;var updated=this.props.this_item;updated.title=this.refs.change_title.getDOMNode().value;func(updated);var close_func=this.open_li_func;close_func();},cancel_func:function cancel_func(){var close_func=this.open_li_func;close_func();},render:function render(){var check_icon_class=this.props.done?'fa fa-undo':'fa fa-check _check';var style_color=this.props.done?'#8E8D8D':'#2D2D2D';var style_bg=this.props.done?'#EAEAEA':'#C1C1C1';var style_tt=this.props.done?'line-through':'none';var style={color:style_color,background:style_bg,textDecoration:style_tt};var open_li_style=this.props.open_li_style?'block':'none';var style2={display:open_li_style};return React.DOM.li({style:style}," ",this.props.item_title,React.DOM.div({className:"buttons"},React.DOM.i({onClick:this.done_func,className:check_icon_class}),React.DOM.i({onClick:this.open_li_func,className:"fa fa-pencil"}),React.DOM.i({onClick:this.delete_func,className:"fa fa-trash"})),React.DOM.div({style:style2,className:"change_title_todo"},React.DOM.textarea({ref:"change_title",rows:"3"}),React.DOM.div({className:"buttons_change"},React.DOM.button({onClick:this.update_func,className:"btn btn-primary btn-lg"},"update"),React.DOM.button({onClick:this.cancel_func,className:"btn btn-danger btn-lg"},"cancel"))));}});module.exports=Item;},{"react":147}],151:[function(require,module,exports){ /** @jsx React.DOM */var React=require('react');var Item=require('./Item');var _=require('lodash');var FormOpenBtn=require('./FormOpenBtn');var FormList=require('./FormList');var List=React.createClass({displayName:'List',getInitialState:function getInitialState(){var all_data=[{title:'Javascript is CooL!!!',done:false,open:false},{title:'PHP is not so fun!!',done:false,open:false},{title:'Redux i think is awesome to.',done:false,open:false},{title:'Ecmasript 2015 is cool thing too..',done:false,open:false},{title:'REACT is awesome of course!!!',done:false,open:false}];return { // all list of items
data:all_data, // style to make submit button desable if form is empty(input)
form_disabled:true, // id's to add in every new ToDo
id:0, // style to hide form
form_hide:false,open_li_style:false};}, // add new ToDo in list
addNewItem:function addNewItem(element){var new_el={title:element,id:this.state.id};var new_items=[new_el].concat(_toConsumableArray(this.state.data));this.setState({data:new_items,form_disabled:true,id:this.state.id+1});}, // update toDo
update_func:function update_func(item){var arr_=this.state.data;var index=_.findIndex(arr_,function(o){return o===item;});arr_[index]=item;this.setState({data:arr_});}, // delete ToDo 
deleteToDo:function deleteToDo(element){var newList=_.without(this.state.data,element);this.setState({data:newList});}, // make submit button able if input is not empty
disabledForm:function disabledForm(element){if(element===""){this.setState({form_disabled:true});}else {this.setState({form_disabled:false});}}, // hide/open fomr on click
HideOpenForm:function HideOpenForm(){this.setState({form_hide:!this.state.form_hide});},done_func:function done_func(item){var arr_=this.state.data;var index=_.findIndex(arr_,function(o){return o===item;});var check=arr_[index].done;var check2=check?false:true;arr_[index].done=check2;this.setState({data:arr_});},open_li_style_func:function open_li_style_func(item){var arr_=this.state.data;var index=_.findIndex(arr_,function(o){return o===item;});var check=arr_[index].open;var check2=check?false:true;arr_[index].open=check2;this.setState({data:arr_});},render:function render(){var delete_func_=this.deleteToDo;var done_func=this.done_func;var update_func=this.update_func;var open_li_style=this.state.open_li_style;var open_li_style_func=this.open_li_style_func; // create list of items
var items=this.state.data.map(function(item){return Item({item_title:item.title,this_item:item,update_func:update_func,done:item.done,done_func:done_func,open_li_style:item.open,open_li_style_func:open_li_style_func,delete_func:delete_func_});});return React.DOM.div(null,FormOpenBtn({func:this.HideOpenForm}),FormList({ // add new item functin 
add_func:this.addNewItem, // disable submit button style(prop) in form
disabled:this.state.form_disabled, // hide propperty to open/hide form on open/close btn 
hide:this.state.form_hide, // function to make submit button able if input is not empty
func:this.disabledForm}),React.DOM.ol(null,items));}});module.exports=List;},{"./FormList":148,"./FormOpenBtn":149,"./Item":150,"lodash":1,"react":147}],152:[function(require,module,exports){ /** @jsx React.DOM */var React=require('react');var List=require('./components/List/List');React.renderComponent(List(null),document.getElementById('app'));},{"./components/List/List":151,"react":147}]},{},[152]);