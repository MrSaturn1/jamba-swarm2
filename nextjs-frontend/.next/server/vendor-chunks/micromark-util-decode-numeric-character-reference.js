"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/micromark-util-decode-numeric-character-reference";
exports.ids = ["vendor-chunks/micromark-util-decode-numeric-character-reference"];
exports.modules = {

/***/ "(ssr)/./node_modules/micromark-util-decode-numeric-character-reference/dev/index.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/micromark-util-decode-numeric-character-reference/dev/index.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   decodeNumericCharacterReference: () => (/* binding */ decodeNumericCharacterReference)\n/* harmony export */ });\n/* harmony import */ var micromark_util_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! micromark-util-symbol */ \"(ssr)/./node_modules/micromark-util-symbol/lib/codes.js\");\n/* harmony import */ var micromark_util_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-symbol */ \"(ssr)/./node_modules/micromark-util-symbol/lib/values.js\");\n\n\n/**\n * Turn the number (in string form as either hexa- or plain decimal) coming from\n * a numeric character reference into a character.\n *\n * Sort of like `String.fromCodePoint(Number.parseInt(value, base))`, but makes\n * non-characters and control characters safe.\n *\n * @param {string} value\n *   Value to decode.\n * @param {number} base\n *   Numeric base.\n * @returns {string}\n *   Character.\n */\nfunction decodeNumericCharacterReference(value, base) {\n  const code = Number.parseInt(value, base)\n\n  if (\n    // C0 except for HT, LF, FF, CR, space.\n    code < micromark_util_symbol__WEBPACK_IMPORTED_MODULE_0__.codes.ht ||\n    code === micromark_util_symbol__WEBPACK_IMPORTED_MODULE_0__.codes.vt ||\n    (code > micromark_util_symbol__WEBPACK_IMPORTED_MODULE_0__.codes.cr && code < micromark_util_symbol__WEBPACK_IMPORTED_MODULE_0__.codes.space) ||\n    // Control character (DEL) of C0, and C1 controls.\n    (code > micromark_util_symbol__WEBPACK_IMPORTED_MODULE_0__.codes.tilde && code < 160) ||\n    // Lone high surrogates and low surrogates.\n    (code > 55_295 && code < 57_344) ||\n    // Noncharacters.\n    (code > 64_975 && code < 65_008) ||\n    /* eslint-disable no-bitwise */\n    (code & 65_535) === 65_535 ||\n    (code & 65_535) === 65_534 ||\n    /* eslint-enable no-bitwise */\n    // Out of range\n    code > 1_114_111\n  ) {\n    return micromark_util_symbol__WEBPACK_IMPORTED_MODULE_1__.values.replacementCharacter\n  }\n\n  return String.fromCodePoint(code)\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbWljcm9tYXJrLXV0aWwtZGVjb2RlLW51bWVyaWMtY2hhcmFjdGVyLXJlZmVyZW5jZS9kZXYvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQW1EOztBQUVuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ087QUFDUDs7QUFFQTtBQUNBO0FBQ0EsV0FBVyx3REFBSztBQUNoQixhQUFhLHdEQUFLO0FBQ2xCLFlBQVksd0RBQUssY0FBYyx3REFBSztBQUNwQztBQUNBLFlBQVksd0RBQUs7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcseURBQU07QUFDakI7O0FBRUE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3N3YXJtLWJ1aWxkZXIvLi9ub2RlX21vZHVsZXMvbWljcm9tYXJrLXV0aWwtZGVjb2RlLW51bWVyaWMtY2hhcmFjdGVyLXJlZmVyZW5jZS9kZXYvaW5kZXguanM/MTg2MyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2NvZGVzLCB2YWx1ZXN9IGZyb20gJ21pY3JvbWFyay11dGlsLXN5bWJvbCdcblxuLyoqXG4gKiBUdXJuIHRoZSBudW1iZXIgKGluIHN0cmluZyBmb3JtIGFzIGVpdGhlciBoZXhhLSBvciBwbGFpbiBkZWNpbWFsKSBjb21pbmcgZnJvbVxuICogYSBudW1lcmljIGNoYXJhY3RlciByZWZlcmVuY2UgaW50byBhIGNoYXJhY3Rlci5cbiAqXG4gKiBTb3J0IG9mIGxpa2UgYFN0cmluZy5mcm9tQ29kZVBvaW50KE51bWJlci5wYXJzZUludCh2YWx1ZSwgYmFzZSkpYCwgYnV0IG1ha2VzXG4gKiBub24tY2hhcmFjdGVycyBhbmQgY29udHJvbCBjaGFyYWN0ZXJzIHNhZmUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiAgIFZhbHVlIHRvIGRlY29kZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiYXNlXG4gKiAgIE51bWVyaWMgYmFzZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKiAgIENoYXJhY3Rlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlY29kZU51bWVyaWNDaGFyYWN0ZXJSZWZlcmVuY2UodmFsdWUsIGJhc2UpIHtcbiAgY29uc3QgY29kZSA9IE51bWJlci5wYXJzZUludCh2YWx1ZSwgYmFzZSlcblxuICBpZiAoXG4gICAgLy8gQzAgZXhjZXB0IGZvciBIVCwgTEYsIEZGLCBDUiwgc3BhY2UuXG4gICAgY29kZSA8IGNvZGVzLmh0IHx8XG4gICAgY29kZSA9PT0gY29kZXMudnQgfHxcbiAgICAoY29kZSA+IGNvZGVzLmNyICYmIGNvZGUgPCBjb2Rlcy5zcGFjZSkgfHxcbiAgICAvLyBDb250cm9sIGNoYXJhY3RlciAoREVMKSBvZiBDMCwgYW5kIEMxIGNvbnRyb2xzLlxuICAgIChjb2RlID4gY29kZXMudGlsZGUgJiYgY29kZSA8IDE2MCkgfHxcbiAgICAvLyBMb25lIGhpZ2ggc3Vycm9nYXRlcyBhbmQgbG93IHN1cnJvZ2F0ZXMuXG4gICAgKGNvZGUgPiA1NV8yOTUgJiYgY29kZSA8IDU3XzM0NCkgfHxcbiAgICAvLyBOb25jaGFyYWN0ZXJzLlxuICAgIChjb2RlID4gNjRfOTc1ICYmIGNvZGUgPCA2NV8wMDgpIHx8XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tYml0d2lzZSAqL1xuICAgIChjb2RlICYgNjVfNTM1KSA9PT0gNjVfNTM1IHx8XG4gICAgKGNvZGUgJiA2NV81MzUpID09PSA2NV81MzQgfHxcbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLWJpdHdpc2UgKi9cbiAgICAvLyBPdXQgb2YgcmFuZ2VcbiAgICBjb2RlID4gMV8xMTRfMTExXG4gICkge1xuICAgIHJldHVybiB2YWx1ZXMucmVwbGFjZW1lbnRDaGFyYWN0ZXJcbiAgfVxuXG4gIHJldHVybiBTdHJpbmcuZnJvbUNvZGVQb2ludChjb2RlKVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/micromark-util-decode-numeric-character-reference/dev/index.js\n");

/***/ })

};
;