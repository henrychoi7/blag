(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~twemoji"],{

/***/ "./node_modules/twemoji/2/twemoji.npm.js":
/*!***********************************************!*\
  !*** ./node_modules/twemoji/2/twemoji.npm.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {var location = global.location || {};\n/*jslint indent: 2, browser: true, bitwise: true, plusplus: true */\nvar twemoji = (function (\n  /*! Copyright Twitter Inc. and other contributors. Licensed under MIT *//*\n    https://github.com/twitter/twemoji/blob/gh-pages/LICENSE\n  */\n\n  // WARNING:   this file is generated automatically via\n  //            `node twemoji-generator.js`\n  //            please update its `createTwemoji` function\n  //            at the bottom of the same file instead.\n\n) {\n  'use strict';\n\n  /*jshint maxparams:4 */\n\n  var\n    // the exported module object\n    twemoji = {\n\n\n    /////////////////////////\n    //      properties     //\n    /////////////////////////\n\n      // default assets url, by default will be Twitter Inc. CDN\n      base: 'https://twemoji.maxcdn.com/2/',\n\n      // default assets file extensions, by default '.png'\n      ext: '.png',\n\n      // default assets/folder size, by default \"72x72\"\n      // available via Twitter CDN: 72\n      size: '72x72',\n\n      // default class name, by default 'emoji'\n      className: 'emoji',\n\n      // basic utilities / helpers to convert code points\n      // to JavaScript surrogates and vice versa\n      convert: {\n\n        /**\n         * Given an HEX codepoint, returns UTF16 surrogate pairs.\n         *\n         * @param   string  generic codepoint, i.e. '1F4A9'\n         * @return  string  codepoint transformed into utf16 surrogates pair,\n         *          i.e. \\uD83D\\uDCA9\n         *\n         * @example\n         *  twemoji.convert.fromCodePoint('1f1e8');\n         *  // \"\\ud83c\\udde8\"\n         *\n         *  '1f1e8-1f1f3'.split('-').map(twemoji.convert.fromCodePoint).join('')\n         *  // \"\\ud83c\\udde8\\ud83c\\uddf3\"\n         */\n        fromCodePoint: fromCodePoint,\n\n        /**\n         * Given UTF16 surrogate pairs, returns the equivalent HEX codepoint.\n         *\n         * @param   string  generic utf16 surrogates pair, i.e. \\uD83D\\uDCA9\n         * @param   string  optional separator for double code points, default='-'\n         * @return  string  utf16 transformed into codepoint, i.e. '1F4A9'\n         *\n         * @example\n         *  twemoji.convert.toCodePoint('\\ud83c\\udde8\\ud83c\\uddf3');\n         *  // \"1f1e8-1f1f3\"\n         *\n         *  twemoji.convert.toCodePoint('\\ud83c\\udde8\\ud83c\\uddf3', '~');\n         *  // \"1f1e8~1f1f3\"\n         */\n        toCodePoint: toCodePoint\n      },\n\n\n    /////////////////////////\n    //       methods       //\n    /////////////////////////\n\n      /**\n       * User first: used to remove missing images\n       * preserving the original text intent when\n       * a fallback for network problems is desired.\n       * Automatically added to Image nodes via DOM\n       * It could be recycled for string operations via:\n       *  $('img.emoji').on('error', twemoji.onerror)\n       */\n      onerror: function onerror() {\n        if (this.parentNode) {\n          this.parentNode.replaceChild(createText(this.alt, false), this);\n        }\n      },\n\n      /**\n       * Main method/logic to generate either <img> tags or HTMLImage nodes.\n       *  \"emojify\" a generic text or DOM Element.\n       *\n       * @overloads\n       *\n       * String replacement for `innerHTML` or server side operations\n       *  twemoji.parse(string);\n       *  twemoji.parse(string, Function);\n       *  twemoji.parse(string, Object);\n       *\n       * HTMLElement tree parsing for safer operations over existing DOM\n       *  twemoji.parse(HTMLElement);\n       *  twemoji.parse(HTMLElement, Function);\n       *  twemoji.parse(HTMLElement, Object);\n       *\n       * @param   string|HTMLElement  the source to parse and enrich with emoji.\n       *\n       *          string              replace emoji matches with <img> tags.\n       *                              Mainly used to inject emoji via `innerHTML`\n       *                              It does **not** parse the string or validate it,\n       *                              it simply replaces found emoji with a tag.\n       *                              NOTE: be sure this won't affect security.\n       *\n       *          HTMLElement         walk through the DOM tree and find emoji\n       *                              that are inside **text node only** (nodeType === 3)\n       *                              Mainly used to put emoji in already generated DOM\n       *                              without compromising surrounding nodes and\n       *                              **avoiding** the usage of `innerHTML`.\n       *                              NOTE: Using DOM elements instead of strings should\n       *                              improve security without compromising too much\n       *                              performance compared with a less safe `innerHTML`.\n       *\n       * @param   Function|Object  [optional]\n       *                              either the callback that will be invoked or an object\n       *                              with all properties to use per each found emoji.\n       *\n       *          Function            if specified, this will be invoked per each emoji\n       *                              that has been found through the RegExp except\n       *                              those follwed by the invariant \\uFE0E (\"as text\").\n       *                              Once invoked, parameters will be:\n       *\n       *                                iconId:string     the lower case HEX code point\n       *                                                  i.e. \"1f4a9\"\n       *\n       *                                options:Object    all info for this parsing operation\n       *\n       *                                variant:char      the optional \\uFE0F (\"as image\")\n       *                                                  variant, in case this info\n       *                                                  is anyhow meaningful.\n       *                                                  By default this is ignored.\n       *\n       *                              If such callback will return a falsy value instead\n       *                              of a valid `src` to use for the image, nothing will\n       *                              actually change for that specific emoji.\n       *\n       *\n       *          Object              if specified, an object containing the following properties\n       *\n       *            callback   Function  the callback to invoke per each found emoji.\n       *            base       string    the base url, by default twemoji.base\n       *            ext        string    the image extension, by default twemoji.ext\n       *            size       string    the assets size, by default twemoji.size\n       *\n       * @example\n       *\n       *  twemoji.parse(\"I \\u2764\\uFE0F emoji!\");\n       *  // I <img class=\"emoji\" draggable=\"false\" alt=\"❤️\" src=\"/assets/2764.gif\"/> emoji!\n       *\n       *\n       *  twemoji.parse(\"I \\u2764\\uFE0F emoji!\", function(iconId, options) {\n       *    return '/assets/' + iconId + '.gif';\n       *  });\n       *  // I <img class=\"emoji\" draggable=\"false\" alt=\"❤️\" src=\"/assets/2764.gif\"/> emoji!\n       *\n       *\n       * twemoji.parse(\"I \\u2764\\uFE0F emoji!\", {\n       *   size: 72,\n       *   callback: function(iconId, options) {\n       *     return '/assets/' + options.size + '/' + iconId + options.ext;\n       *   }\n       * });\n       *  // I <img class=\"emoji\" draggable=\"false\" alt=\"❤️\" src=\"/assets/72x72/2764.png\"/> emoji!\n       *\n       */\n      parse: parse,\n\n      /**\n       * Given a string, invokes the callback argument\n       *  per each emoji found in such string.\n       * This is the most raw version used by\n       *  the .parse(string) method itself.\n       *\n       * @param   string    generic string to parse\n       * @param   Function  a generic callback that will be\n       *                    invoked to replace the content.\n       *                    This calback wil receive standard\n       *                    String.prototype.replace(str, callback)\n       *                    arguments such:\n       *  callback(\n       *    rawText,  // the emoji match\n       *  );\n       *\n       *                    and others commonly received via replace.\n       */\n      replace: replace,\n\n      /**\n       * Simplify string tests against emoji.\n       *\n       * @param   string  some text that might contain emoji\n       * @return  boolean true if any emoji was found, false otherwise.\n       *\n       * @example\n       *\n       *  if (twemoji.test(someContent)) {\n       *    console.log(\"emoji All The Things!\");\n       *  }\n       */\n      test: test\n    },\n\n    // used to escape HTML special chars in attributes\n    escaper = {\n      '&': '&amp;',\n      '<': '&lt;',\n      '>': '&gt;',\n      \"'\": '&#39;',\n      '\"': '&quot;'\n    },\n\n    // RegExp based on emoji's official Unicode standards\n    // http://www.unicode.org/Public/UNIDATA/EmojiSources.txt\n    re = /\\ud83d[\\udc68-\\udc69](?:\\ud83c[\\udffb-\\udfff])?\\u200d(?:\\u2695\\ufe0f|\\u2696\\ufe0f|\\u2708\\ufe0f|\\ud83c[\\udf3e\\udf73\\udf93\\udfa4\\udfa8\\udfeb\\udfed]|\\ud83d[\\udcbb\\udcbc\\udd27\\udd2c\\ude80\\ude92])|(?:\\ud83c[\\udfcb\\udfcc]|\\ud83d[\\udd74\\udd75]|\\u26f9)(?:\\ufe0f|\\ud83c[\\udffb-\\udfff])\\u200d[\\u2640\\u2642]\\ufe0f|(?:\\ud83c[\\udfc3\\udfc4\\udfca]|\\ud83d[\\udc6e\\udc71\\udc73\\udc77\\udc81\\udc82\\udc86\\udc87\\ude45-\\ude47\\ude4b\\ude4d\\ude4e\\udea3\\udeb4-\\udeb6]|\\ud83e[\\udd26\\udd35\\udd37-\\udd39\\udd3d\\udd3e\\uddd6-\\udddd])(?:\\ud83c[\\udffb-\\udfff])?\\u200d[\\u2640\\u2642]\\ufe0f|\\ud83d\\udc68\\u200d\\u2764\\ufe0f\\u200d\\ud83d\\udc8b\\u200d\\ud83d\\udc68|\\ud83d\\udc68\\u200d\\ud83d\\udc68\\u200d\\ud83d\\udc66\\u200d\\ud83d\\udc66|\\ud83d\\udc68\\u200d\\ud83d\\udc68\\u200d\\ud83d\\udc67\\u200d\\ud83d[\\udc66\\udc67]|\\ud83d\\udc68\\u200d\\ud83d\\udc69\\u200d\\ud83d\\udc66\\u200d\\ud83d\\udc66|\\ud83d\\udc68\\u200d\\ud83d\\udc69\\u200d\\ud83d\\udc67\\u200d\\ud83d[\\udc66\\udc67]|\\ud83d\\udc69\\u200d\\u2764\\ufe0f\\u200d\\ud83d\\udc8b\\u200d\\ud83d[\\udc68\\udc69]|\\ud83d\\udc69\\u200d\\ud83d\\udc69\\u200d\\ud83d\\udc66\\u200d\\ud83d\\udc66|\\ud83d\\udc69\\u200d\\ud83d\\udc69\\u200d\\ud83d\\udc67\\u200d\\ud83d[\\udc66\\udc67]|\\ud83d\\udc68\\u200d\\u2764\\ufe0f\\u200d\\ud83d\\udc68|\\ud83d\\udc68\\u200d\\ud83d\\udc66\\u200d\\ud83d\\udc66|\\ud83d\\udc68\\u200d\\ud83d\\udc67\\u200d\\ud83d[\\udc66\\udc67]|\\ud83d\\udc68\\u200d\\ud83d\\udc68\\u200d\\ud83d[\\udc66\\udc67]|\\ud83d\\udc68\\u200d\\ud83d\\udc69\\u200d\\ud83d[\\udc66\\udc67]|\\ud83d\\udc69\\u200d\\u2764\\ufe0f\\u200d\\ud83d[\\udc68\\udc69]|\\ud83d\\udc69\\u200d\\ud83d\\udc66\\u200d\\ud83d\\udc66|\\ud83d\\udc69\\u200d\\ud83d\\udc67\\u200d\\ud83d[\\udc66\\udc67]|\\ud83d\\udc69\\u200d\\ud83d\\udc69\\u200d\\ud83d[\\udc66\\udc67]|\\ud83c\\udff3\\ufe0f\\u200d\\ud83c\\udf08|\\ud83c\\udff4\\u200d\\u2620\\ufe0f|\\ud83d\\udc41\\u200d\\ud83d\\udde8|\\ud83d\\udc68\\u200d\\ud83d[\\udc66\\udc67]|\\ud83d\\udc69\\u200d\\ud83d[\\udc66\\udc67]|\\ud83d\\udc6f\\u200d\\u2640\\ufe0f|\\ud83d\\udc6f\\u200d\\u2642\\ufe0f|\\ud83e\\udd3c\\u200d\\u2640\\ufe0f|\\ud83e\\udd3c\\u200d\\u2642\\ufe0f|\\ud83e\\uddde\\u200d\\u2640\\ufe0f|\\ud83e\\uddde\\u200d\\u2642\\ufe0f|\\ud83e\\udddf\\u200d\\u2640\\ufe0f|\\ud83e\\udddf\\u200d\\u2642\\ufe0f|(?:\\u002a)\\ufe0f?\\u20e3|(?:\\ud83c[\\udf85\\udfc2-\\udfc4\\udfc7\\udfca-\\udfcc]|\\ud83d[\\udc42\\udc43\\udc46-\\udc50\\udc66-\\udc69\\udc6e\\udc70-\\udc78\\udc7c\\udc81-\\udc83\\udc85-\\udc87\\udcaa\\udd74\\udd75\\udd7a\\udd90\\udd95\\udd96\\ude45-\\ude47\\ude4b-\\ude4f\\udea3\\udeb4-\\udeb6\\udec0\\udecc]|\\ud83e[\\udd18-\\udd1c\\udd1e\\udd1f\\udd26\\udd30-\\udd39\\udd3d\\udd3e\\uddd1-\\udddd]|[\\u261d\\u26f7\\u26f9\\u270a-\\u270d])(?:\\ud83c[\\udffb-\\udfff]|)|\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40\\udc65\\udb40\\udc6e\\udb40\\udc67\\udb40\\udc7f|\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40\\udc73\\udb40\\udc63\\udb40\\udc74\\udb40\\udc7f|\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40\\udc77\\udb40\\udc6c\\udb40\\udc73\\udb40\\udc7f|\\ud83c\\udde6\\ud83c[\\udde8-\\uddec\\uddee\\uddf1\\uddf2\\uddf4\\uddf6-\\uddfa\\uddfc\\uddfd\\uddff]|\\ud83c\\udde7\\ud83c[\\udde6\\udde7\\udde9-\\uddef\\uddf1-\\uddf4\\uddf6-\\uddf9\\uddfb\\uddfc\\uddfe\\uddff]|\\ud83c\\udde8\\ud83c[\\udde6\\udde8\\udde9\\uddeb-\\uddee\\uddf0-\\uddf5\\uddf7\\uddfa-\\uddff]|\\ud83c\\udde9\\ud83c[\\uddea\\uddec\\uddef\\uddf0\\uddf2\\uddf4\\uddff]|\\ud83c\\uddea\\ud83c[\\udde6\\udde8\\uddea\\uddec\\udded\\uddf7-\\uddfa]|\\ud83c\\uddeb\\ud83c[\\uddee-\\uddf0\\uddf2\\uddf4\\uddf7]|\\ud83c\\uddec\\ud83c[\\udde6\\udde7\\udde9-\\uddee\\uddf1-\\uddf3\\uddf5-\\uddfa\\uddfc\\uddfe]|\\ud83c\\udded\\ud83c[\\uddf0\\uddf2\\uddf3\\uddf7\\uddf9\\uddfa]|\\ud83c\\uddee\\ud83c[\\udde8-\\uddea\\uddf1-\\uddf4\\uddf6-\\uddf9]|\\ud83c\\uddef\\ud83c[\\uddea\\uddf2\\uddf4\\uddf5]|\\ud83c\\uddf0\\ud83c[\\uddea\\uddec-\\uddee\\uddf2\\uddf3\\uddf5\\uddf7\\uddfc\\uddfe\\uddff]|\\ud83c\\uddf1\\ud83c[\\udde6-\\udde8\\uddee\\uddf0\\uddf7-\\uddfb\\uddfe]|\\ud83c\\uddf2\\ud83c[\\udde6\\udde8-\\udded\\uddf0-\\uddff]|\\ud83c\\uddf3\\ud83c[\\udde6\\udde8\\uddea-\\uddec\\uddee\\uddf1\\uddf4\\uddf5\\uddf7\\uddfa\\uddff]|\\ud83c\\uddf4\\ud83c\\uddf2|\\ud83c\\uddf5\\ud83c[\\udde6\\uddea-\\udded\\uddf0-\\uddf3\\uddf7-\\uddf9\\uddfc\\uddfe]|\\ud83c\\uddf6\\ud83c\\udde6|\\ud83c\\uddf7\\ud83c[\\uddea\\uddf4\\uddf8\\uddfa\\uddfc]|\\ud83c\\uddf8\\ud83c[\\udde6-\\uddea\\uddec-\\uddf4\\uddf7-\\uddf9\\uddfb\\uddfd-\\uddff]|\\ud83c\\uddf9\\ud83c[\\udde6\\udde8\\udde9\\uddeb-\\udded\\uddef-\\uddf4\\uddf7\\uddf9\\uddfb\\uddfc\\uddff]|\\ud83c\\uddfa\\ud83c[\\udde6\\uddec\\uddf2\\uddf3\\uddf8\\uddfe\\uddff]|\\ud83c\\uddfb\\ud83c[\\udde6\\udde8\\uddea\\uddec\\uddee\\uddf3\\uddfa]|\\ud83c\\uddfc\\ud83c[\\uddeb\\uddf8]|\\ud83c\\uddfd\\ud83c\\uddf0|\\ud83c\\uddfe\\ud83c[\\uddea\\uddf9]|\\ud83c\\uddff\\ud83c[\\udde6\\uddf2\\uddfc]|\\u0023\\u20e3|\\u0030\\u20e3|\\u0031\\u20e3|\\u0032\\u20e3|\\u0033\\u20e3|\\u0034\\u20e3|\\u0035\\u20e3|\\u0036\\u20e3|\\u0037\\u20e3|\\u0038\\u20e3|\\u0039\\u20e3|\\ud800\\udc00|\\ud83c[\\udc04\\udccf\\udd70\\udd71\\udd7e\\udd7f\\udd8e\\udd91-\\udd9a\\udde6-\\uddff\\ude01\\ude02\\ude1a\\ude2f\\ude32-\\ude3a\\ude50\\ude51\\udf00-\\udf21\\udf24-\\udf84\\udf86-\\udf93\\udf96\\udf97\\udf99-\\udf9b\\udf9e-\\udfc1\\udfc5\\udfc6\\udfc8\\udfc9\\udfcd-\\udff0\\udff3-\\udff5\\udff7-\\udfff]|\\ud83d[\\udc00-\\udc41\\udc44\\udc45\\udc51-\\udc65\\udc6a-\\udc6d\\udc6f\\udc79-\\udc7b\\udc7d-\\udc80\\udc84\\udc88-\\udca9\\udcab-\\udcfd\\udcff-\\udd3d\\udd49-\\udd4e\\udd50-\\udd67\\udd6f\\udd70\\udd73\\udd76-\\udd79\\udd87\\udd8a-\\udd8d\\udda4\\udda5\\udda8\\uddb1\\uddb2\\uddbc\\uddc2-\\uddc4\\uddd1-\\uddd3\\udddc-\\uddde\\udde1\\udde3\\udde8\\uddef\\uddf3\\uddfa-\\ude44\\ude48-\\ude4a\\ude80-\\udea2\\udea4-\\udeb3\\udeb7-\\udebf\\udec1-\\udec5\\udecb\\udecd-\\uded2\\udee0-\\udee5\\udee9\\udeeb\\udeec\\udef0\\udef3-\\udef8]|\\ud83e[\\udd10-\\udd17\\udd1d\\udd20-\\udd25\\udd27-\\udd2f\\udd3a\\udd3c\\udd40-\\udd45\\udd47-\\udd4c\\udd50-\\udd6b\\udd80-\\udd97\\uddc0\\uddd0\\uddde-\\udde6]|[\\u00a9\\u00ae\\u203c\\u2049\\u2122\\u2139\\u2194-\\u2199\\u21a9\\u21aa\\u231a\\u231b\\u2328\\u23cf\\u23e9-\\u23f3\\u23f8-\\u23fa\\u24c2\\u25aa\\u25ab\\u25b6\\u25c0\\u25fb-\\u25fe\\u2600-\\u2604\\u260e\\u2611\\u2614\\u2615\\u2618\\u2620\\u2622\\u2623\\u2626\\u262a\\u262e\\u262f\\u2638\\u263a\\u2640\\u2642\\u2648-\\u2653\\u2660\\u2663\\u2665\\u2666\\u2668\\u267b\\u267f\\u2692-\\u2697\\u2699\\u269b\\u269c\\u26a0\\u26a1\\u26aa\\u26ab\\u26b0\\u26b1\\u26bd\\u26be\\u26c4\\u26c5\\u26c8\\u26ce\\u26cf\\u26d1\\u26d3\\u26d4\\u26e9\\u26ea\\u26f0-\\u26f5\\u26f8\\u26fa\\u26fd\\u2702\\u2705\\u2708\\u2709\\u270f\\u2712\\u2714\\u2716\\u271d\\u2721\\u2728\\u2733\\u2734\\u2744\\u2747\\u274c\\u274e\\u2753-\\u2755\\u2757\\u2763\\u2764\\u2795-\\u2797\\u27a1\\u27b0\\u27bf\\u2934\\u2935\\u2b05-\\u2b07\\u2b1b\\u2b1c\\u2b50\\u2b55\\u3030\\u303d\\u3297\\u3299\\ue50a]|(?:\\u2639)(?:\\ufe0f|(?!\\ufe0e))/g,\n\n    // avoid runtime RegExp creation for not so smart,\n    // not JIT based, and old browsers / engines\n    UFE0Fg = /\\uFE0F/g,\n\n    // avoid using a string literal like '\\u200D' here because minifiers expand it inline\n    U200D = String.fromCharCode(0x200D),\n\n    // used to find HTML special chars in attributes\n    rescaper = /[&<>'\"]/g,\n\n    // nodes with type 1 which should **not** be parsed\n    shouldntBeParsed = /^(?:iframe|noframes|noscript|script|select|style|textarea)$/,\n\n    // just a private shortcut\n    fromCharCode = String.fromCharCode;\n\n  return twemoji;\n\n\n  /////////////////////////\n  //  private functions  //\n  //     declaration     //\n  /////////////////////////\n\n  /**\n   * Shortcut to create text nodes\n   * @param   string  text used to create DOM text node\n   * @return  Node  a DOM node with that text\n   */\n  function createText(text, clean) {\n    return document.createTextNode(clean ? text.replace(UFE0Fg, '') : text);\n  }\n\n  /**\n   * Utility function to escape html attribute text\n   * @param   string  text use in HTML attribute\n   * @return  string  text encoded to use in HTML attribute\n   */\n  function escapeHTML(s) {\n    return s.replace(rescaper, replacer);\n  }\n\n  /**\n   * Default callback used to generate emoji src\n   *  based on Twitter CDN\n   * @param   string    the emoji codepoint string\n   * @param   string    the default size to use, i.e. \"36x36\"\n   * @return  string    the image source to use\n   */\n  function defaultImageSrcGenerator(icon, options) {\n    return ''.concat(options.base, options.size, '/', icon, options.ext);\n  }\n\n  /**\n   * Given a generic DOM nodeType 1, walk through all children\n   * and store every nodeType 3 (#text) found in the tree.\n   * @param   Element a DOM Element with probably some text in it\n   * @param   Array the list of previously discovered text nodes\n   * @return  Array same list with new discovered nodes, if any\n   */\n  function grabAllTextNodes(node, allText) {\n    var\n      childNodes = node.childNodes,\n      length = childNodes.length,\n      subnode,\n      nodeType;\n    while (length--) {\n      subnode = childNodes[length];\n      nodeType = subnode.nodeType;\n      // parse emoji only in text nodes\n      if (nodeType === 3) {\n        // collect them to process emoji later\n        allText.push(subnode);\n      }\n      // ignore all nodes that are not type 1, that are svg, or that\n      // should not be parsed as script, style, and others\n      else if (nodeType === 1 && !('ownerSVGElement' in subnode) &&\n          !shouldntBeParsed.test(subnode.nodeName.toLowerCase())) {\n        grabAllTextNodes(subnode, allText);\n      }\n    }\n    return allText;\n  }\n\n  /**\n   * Used to both remove the possible variant\n   *  and to convert utf16 into code points.\n   *  If there is a zero-width-joiner (U+200D), leave the variants in.\n   * @param   string    the raw text of the emoji match\n   * @return  string    the code point\n   */\n  function grabTheRightIcon(rawText) {\n    // if variant is present as \\uFE0F\n    return toCodePoint(rawText.indexOf(U200D) < 0 ?\n      rawText.replace(UFE0Fg, '') :\n      rawText\n    );\n  }\n\n  /**\n   * DOM version of the same logic / parser:\n   *  emojify all found sub-text nodes placing images node instead.\n   * @param   Element   generic DOM node with some text in some child node\n   * @param   Object    options  containing info about how to parse\n    *\n    *            .callback   Function  the callback to invoke per each found emoji.\n    *            .base       string    the base url, by default twemoji.base\n    *            .ext        string    the image extension, by default twemoji.ext\n    *            .size       string    the assets size, by default twemoji.size\n    *\n   * @return  Element same generic node with emoji in place, if any.\n   */\n  function parseNode(node, options) {\n    var\n      allText = grabAllTextNodes(node, []),\n      length = allText.length,\n      attrib,\n      attrname,\n      modified,\n      fragment,\n      subnode,\n      text,\n      match,\n      i,\n      index,\n      img,\n      rawText,\n      iconId,\n      src;\n    while (length--) {\n      modified = false;\n      fragment = document.createDocumentFragment();\n      subnode = allText[length];\n      text = subnode.nodeValue;\n      i = 0;\n      while ((match = re.exec(text))) {\n        index = match.index;\n        if (index !== i) {\n          fragment.appendChild(\n            createText(text.slice(i, index), true)\n          );\n        }\n        rawText = match[0];\n        iconId = grabTheRightIcon(rawText);\n        i = index + rawText.length;\n        src = options.callback(iconId, options);\n        if (src) {\n          img = new Image();\n          img.onerror = options.onerror;\n          img.setAttribute('draggable', 'false');\n          attrib = options.attributes(rawText, iconId);\n          for (attrname in attrib) {\n            if (\n              attrib.hasOwnProperty(attrname) &&\n              // don't allow any handlers to be set + don't allow overrides\n              attrname.indexOf('on') !== 0 &&\n              !img.hasAttribute(attrname)\n            ) {\n              img.setAttribute(attrname, attrib[attrname]);\n            }\n          }\n          img.className = options.className;\n          img.alt = rawText;\n          img.src = src;\n          modified = true;\n          fragment.appendChild(img);\n        }\n        if (!img) fragment.appendChild(createText(rawText, false));\n        img = null;\n      }\n      // is there actually anything to replace in here ?\n      if (modified) {\n        // any text left to be added ?\n        if (i < text.length) {\n          fragment.appendChild(\n            createText(text.slice(i), true)\n          );\n        }\n        // replace the text node only, leave intact\n        // anything else surrounding such text\n        subnode.parentNode.replaceChild(fragment, subnode);\n      }\n    }\n    return node;\n  }\n\n  /**\n   * String/HTML version of the same logic / parser:\n   *  emojify a generic text placing images tags instead of surrogates pair.\n   * @param   string    generic string with possibly some emoji in it\n   * @param   Object    options  containing info about how to parse\n   *\n   *            .callback   Function  the callback to invoke per each found emoji.\n   *            .base       string    the base url, by default twemoji.base\n   *            .ext        string    the image extension, by default twemoji.ext\n   *            .size       string    the assets size, by default twemoji.size\n   *\n   * @return  the string with <img tags> replacing all found and parsed emoji\n   */\n  function parseString(str, options) {\n    return replace(str, function (rawText) {\n      var\n        ret = rawText,\n        iconId = grabTheRightIcon(rawText),\n        src = options.callback(iconId, options),\n        attrib,\n        attrname;\n      if (src) {\n        // recycle the match string replacing the emoji\n        // with its image counter part\n        ret = '<img '.concat(\n          'class=\"', options.className, '\" ',\n          'draggable=\"false\" ',\n          // needs to preserve user original intent\n          // when variants should be copied and pasted too\n          'alt=\"',\n          rawText,\n          '\"',\n          ' src=\"',\n          src,\n          '\"'\n        );\n        attrib = options.attributes(rawText, iconId);\n        for (attrname in attrib) {\n          if (\n            attrib.hasOwnProperty(attrname) &&\n            // don't allow any handlers to be set + don't allow overrides\n            attrname.indexOf('on') !== 0 &&\n            ret.indexOf(' ' + attrname + '=') === -1\n          ) {\n            ret = ret.concat(' ', attrname, '=\"', escapeHTML(attrib[attrname]), '\"');\n          }\n        }\n        ret = ret.concat('/>');\n      }\n      return ret;\n    });\n  }\n\n  /**\n   * Function used to actually replace HTML special chars\n   * @param   string  HTML special char\n   * @return  string  encoded HTML special char\n   */\n  function replacer(m) {\n    return escaper[m];\n  }\n\n  /**\n   * Default options.attribute callback\n   * @return  null\n   */\n  function returnNull() {\n    return null;\n  }\n\n  /**\n   * Given a generic value, creates its squared counterpart if it's a number.\n   *  As example, number 36 will return '36x36'.\n   * @param   any     a generic value.\n   * @return  any     a string representing asset size, i.e. \"36x36\"\n   *                  only in case the value was a number.\n   *                  Returns initial value otherwise.\n   */\n  function toSizeSquaredAsset(value) {\n    return typeof value === 'number' ?\n      value + 'x' + value :\n      value;\n  }\n\n\n  /////////////////////////\n  //  exported functions //\n  //     declaration     //\n  /////////////////////////\n\n  function fromCodePoint(codepoint) {\n    var code = typeof codepoint === 'string' ?\n          parseInt(codepoint, 16) : codepoint;\n    if (code < 0x10000) {\n      return fromCharCode(code);\n    }\n    code -= 0x10000;\n    return fromCharCode(\n      0xD800 + (code >> 10),\n      0xDC00 + (code & 0x3FF)\n    );\n  }\n\n  function parse(what, how) {\n    if (!how || typeof how === 'function') {\n      how = {callback: how};\n    }\n    // if first argument is string, inject html <img> tags\n    // otherwise use the DOM tree and parse text nodes only\n    return (typeof what === 'string' ? parseString : parseNode)(what, {\n      callback:   how.callback || defaultImageSrcGenerator,\n      attributes: typeof how.attributes === 'function' ? how.attributes : returnNull,\n      base:       typeof how.base === 'string' ? how.base : twemoji.base,\n      ext:        how.ext || twemoji.ext,\n      size:       how.folder || toSizeSquaredAsset(how.size || twemoji.size),\n      className:  how.className || twemoji.className,\n      onerror:    how.onerror || twemoji.onerror\n    });\n  }\n\n  function replace(text, callback) {\n    return String(text).replace(re, callback);\n  }\n\n  function test(text) {\n    // IE6 needs a reset before too\n    re.lastIndex = 0;\n    var result = re.test(text);\n    re.lastIndex = 0;\n    return result;\n  }\n\n  function toCodePoint(unicodeSurrogates, sep) {\n    var\n      r = [],\n      c = 0,\n      p = 0,\n      i = 0;\n    while (i < unicodeSurrogates.length) {\n      c = unicodeSurrogates.charCodeAt(i++);\n      if (p) {\n        r.push((0x10000 + ((p - 0xD800) << 10) + (c - 0xDC00)).toString(16));\n        p = 0;\n      } else if (0xD800 <= c && c <= 0xDBFF) {\n        p = c;\n      } else {\n        r.push(c.toString(16));\n      }\n    }\n    return r.join(sep || '-');\n  }\n\n}());\nif (!location.protocol) {\n  twemoji.base = twemoji.base.replace(/^http:/, \"\");\n}\nmodule.exports = twemoji;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./node_modules/twemoji/2/twemoji.npm.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ })

}]);