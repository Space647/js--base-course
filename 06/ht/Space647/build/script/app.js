"use strict";

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);throw new Error("Cannot find module '" + o + "'");
      }var f = n[o] = { exports: {} };t[o][0].call(f.exports, function (e) {
        var n = t[o][1][e];return s(n ? n : e);
      }, f, f.exports, e, t, n, r);
    }return n[o].exports;
  }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
    s(r[o]);
  }return s;
})({ 1: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

      ;(function (exports) {
        'use strict';

        var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

        var PLUS = '+'.charCodeAt(0);
        var SLASH = '/'.charCodeAt(0);
        var NUMBER = '0'.charCodeAt(0);
        var LOWER = 'a'.charCodeAt(0);
        var UPPER = 'A'.charCodeAt(0);
        var PLUS_URL_SAFE = '-'.charCodeAt(0);
        var SLASH_URL_SAFE = '_'.charCodeAt(0);

        function decode(elt) {
          var code = elt.charCodeAt(0);
          if (code === PLUS || code === PLUS_URL_SAFE) return 62; // '+'
          if (code === SLASH || code === SLASH_URL_SAFE) return 63; // '/'
          if (code < NUMBER) return -1; //no match
          if (code < NUMBER + 10) return code - NUMBER + 26 + 26;
          if (code < UPPER + 26) return code - UPPER;
          if (code < LOWER + 26) return code - LOWER + 26;
        }

        function b64ToByteArray(b64) {
          var i, j, l, tmp, placeHolders, arr;

          if (b64.length % 4 > 0) {
            throw new Error('Invalid string. Length must be a multiple of 4');
          }

          // the number of equal signs (place holders)
          // if there are two placeholders, than the two characters before it
          // represent one byte
          // if there is only one, then the three characters before it represent 2 bytes
          // this is just a cheap hack to not do indexOf twice
          var len = b64.length;
          placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0;

          // base64 is 4/3 + up to two characters of the original data
          arr = new Arr(b64.length * 3 / 4 - placeHolders);

          // if there are placeholders, only get up to the last complete 4 chars
          l = placeHolders > 0 ? b64.length - 4 : b64.length;

          var L = 0;

          function push(v) {
            arr[L++] = v;
          }

          for (i = 0, j = 0; i < l; i += 4, j += 3) {
            tmp = decode(b64.charAt(i)) << 18 | decode(b64.charAt(i + 1)) << 12 | decode(b64.charAt(i + 2)) << 6 | decode(b64.charAt(i + 3));
            push((tmp & 0xFF0000) >> 16);
            push((tmp & 0xFF00) >> 8);
            push(tmp & 0xFF);
          }

          if (placeHolders === 2) {
            tmp = decode(b64.charAt(i)) << 2 | decode(b64.charAt(i + 1)) >> 4;
            push(tmp & 0xFF);
          } else if (placeHolders === 1) {
            tmp = decode(b64.charAt(i)) << 10 | decode(b64.charAt(i + 1)) << 4 | decode(b64.charAt(i + 2)) >> 2;
            push(tmp >> 8 & 0xFF);
            push(tmp & 0xFF);
          }

          return arr;
        }

        function uint8ToBase64(uint8) {
          var i,
              extraBytes = uint8.length % 3,

          // if we have 1 byte left, pad 2 bytes
          output = "",
              temp,
              length;

          function encode(num) {
            return lookup.charAt(num);
          }

          function tripletToBase64(num) {
            return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F);
          }

          // go through the array every three bytes, we'll deal with trailing stuff later
          for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
            temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
            output += tripletToBase64(temp);
          }

          // pad the end with zeros, but make sure to not forget the extra bytes
          switch (extraBytes) {
            case 1:
              temp = uint8[uint8.length - 1];
              output += encode(temp >> 2);
              output += encode(temp << 4 & 0x3F);
              output += '==';
              break;
            case 2:
              temp = (uint8[uint8.length - 2] << 8) + uint8[uint8.length - 1];
              output += encode(temp >> 10);
              output += encode(temp >> 4 & 0x3F);
              output += encode(temp << 2 & 0x3F);
              output += '=';
              break;
          }

          return output;
        }

        exports.toByteArray = b64ToByteArray;
        exports.fromByteArray = uint8ToBase64;
      })(typeof exports === 'undefined' ? undefined.base64js = {} : exports);
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/..\\..\\node_modules\\base64-js\\lib\\b64.js", "/..\\..\\node_modules\\base64-js\\lib");
  }, { "buffer": 2, "e/U+97": 4 }], 2: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
        return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
      };

      /*!
       * The buffer module from node.js, for the browser.
       *
       * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
       * @license  MIT
       */

      var base64 = require('base64-js');
      var ieee754 = require('ieee754');

      exports.Buffer = Buffer;
      exports.SlowBuffer = Buffer;
      exports.INSPECT_MAX_BYTES = 50;
      Buffer.poolSize = 8192;

      /**
       * If `Buffer._useTypedArrays`:
       *   === true    Use Uint8Array implementation (fastest)
       *   === false   Use Object implementation (compatible down to IE6)
       */
      Buffer._useTypedArrays = function () {
        // Detect if browser supports Typed Arrays. Supported browsers are IE 10+, Firefox 4+,
        // Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+. If the browser does not support adding
        // properties to `Uint8Array` instances, then that's the same as no `Uint8Array` support
        // because we need to be able to add all the node Buffer API methods. This is an issue
        // in Firefox 4-29. Now fixed: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
        try {
          var buf = new ArrayBuffer(0);
          var arr = new Uint8Array(buf);
          arr.foo = function () {
            return 42;
          };
          return 42 === arr.foo() && typeof arr.subarray === 'function'; // Chrome 9-10 lack `subarray`
        } catch (e) {
          return false;
        }
      }();

      /**
       * Class: Buffer
       * =============
       *
       * The Buffer constructor returns instances of `Uint8Array` that are augmented
       * with function properties for all the node `Buffer` API functions. We use
       * `Uint8Array` so that square bracket notation works as expected -- it returns
       * a single octet.
       *
       * By augmenting the instances, we can avoid modifying the `Uint8Array`
       * prototype.
       */
      function Buffer(subject, encoding, noZero) {
        if (!(this instanceof Buffer)) return new Buffer(subject, encoding, noZero);

        var type = typeof subject === 'undefined' ? 'undefined' : _typeof(subject);

        // Workaround: node's base64 implementation allows for non-padded strings
        // while base64-js does not.
        if (encoding === 'base64' && type === 'string') {
          subject = stringtrim(subject);
          while (subject.length % 4 !== 0) {
            subject = subject + '=';
          }
        }

        // Find the length
        var length;
        if (type === 'number') length = coerce(subject);else if (type === 'string') length = Buffer.byteLength(subject, encoding);else if (type === 'object') length = coerce(subject.length); // assume that object is array-like
        else throw new Error('First argument needs to be a number, array or string.');

        var buf;
        if (Buffer._useTypedArrays) {
          // Preferred: Return an augmented `Uint8Array` instance for best performance
          buf = Buffer._augment(new Uint8Array(length));
        } else {
          // Fallback: Return THIS instance of Buffer (created by `new`)
          buf = this;
          buf.length = length;
          buf._isBuffer = true;
        }

        var i;
        if (Buffer._useTypedArrays && typeof subject.byteLength === 'number') {
          // Speed optimization -- use set if we're copying from a typed array
          buf._set(subject);
        } else if (isArrayish(subject)) {
          // Treat array-ish objects as a byte array
          for (i = 0; i < length; i++) {
            if (Buffer.isBuffer(subject)) buf[i] = subject.readUInt8(i);else buf[i] = subject[i];
          }
        } else if (type === 'string') {
          buf.write(subject, 0, encoding);
        } else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
          for (i = 0; i < length; i++) {
            buf[i] = 0;
          }
        }

        return buf;
      }

      // STATIC METHODS
      // ==============

      Buffer.isEncoding = function (encoding) {
        switch (String(encoding).toLowerCase()) {
          case 'hex':
          case 'utf8':
          case 'utf-8':
          case 'ascii':
          case 'binary':
          case 'base64':
          case 'raw':
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return true;
          default:
            return false;
        }
      };

      Buffer.isBuffer = function (b) {
        return !!(b !== null && b !== undefined && b._isBuffer);
      };

      Buffer.byteLength = function (str, encoding) {
        var ret;
        str = str + '';
        switch (encoding || 'utf8') {
          case 'hex':
            ret = str.length / 2;
            break;
          case 'utf8':
          case 'utf-8':
            ret = utf8ToBytes(str).length;
            break;
          case 'ascii':
          case 'binary':
          case 'raw':
            ret = str.length;
            break;
          case 'base64':
            ret = base64ToBytes(str).length;
            break;
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            ret = str.length * 2;
            break;
          default:
            throw new Error('Unknown encoding');
        }
        return ret;
      };

      Buffer.concat = function (list, totalLength) {
        assert(isArray(list), 'Usage: Buffer.concat(list, [totalLength])\n' + 'list should be an Array.');

        if (list.length === 0) {
          return new Buffer(0);
        } else if (list.length === 1) {
          return list[0];
        }

        var i;
        if (typeof totalLength !== 'number') {
          totalLength = 0;
          for (i = 0; i < list.length; i++) {
            totalLength += list[i].length;
          }
        }

        var buf = new Buffer(totalLength);
        var pos = 0;
        for (i = 0; i < list.length; i++) {
          var item = list[i];
          item.copy(buf, pos);
          pos += item.length;
        }
        return buf;
      };

      // BUFFER INSTANCE METHODS
      // =======================

      function _hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        var remaining = buf.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }

        // must be an even number of digits
        var strLen = string.length;
        assert(strLen % 2 === 0, 'Invalid hex string');

        if (length > strLen / 2) {
          length = strLen / 2;
        }
        for (var i = 0; i < length; i++) {
          var byte = parseInt(string.substr(i * 2, 2), 16);
          assert(!isNaN(byte), 'Invalid hex string');
          buf[offset + i] = byte;
        }
        Buffer._charsWritten = i * 2;
        return i;
      }

      function _utf8Write(buf, string, offset, length) {
        var charsWritten = Buffer._charsWritten = blitBuffer(utf8ToBytes(string), buf, offset, length);
        return charsWritten;
      }

      function _asciiWrite(buf, string, offset, length) {
        var charsWritten = Buffer._charsWritten = blitBuffer(asciiToBytes(string), buf, offset, length);
        return charsWritten;
      }

      function _binaryWrite(buf, string, offset, length) {
        return _asciiWrite(buf, string, offset, length);
      }

      function _base64Write(buf, string, offset, length) {
        var charsWritten = Buffer._charsWritten = blitBuffer(base64ToBytes(string), buf, offset, length);
        return charsWritten;
      }

      function _utf16leWrite(buf, string, offset, length) {
        var charsWritten = Buffer._charsWritten = blitBuffer(utf16leToBytes(string), buf, offset, length);
        return charsWritten;
      }

      Buffer.prototype.write = function (string, offset, length, encoding) {
        // Support both (string, offset, length, encoding)
        // and the legacy (string, encoding, offset, length)
        if (isFinite(offset)) {
          if (!isFinite(length)) {
            encoding = length;
            length = undefined;
          }
        } else {
          // legacy
          var swap = encoding;
          encoding = offset;
          offset = length;
          length = swap;
        }

        offset = Number(offset) || 0;
        var remaining = this.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }
        encoding = String(encoding || 'utf8').toLowerCase();

        var ret;
        switch (encoding) {
          case 'hex':
            ret = _hexWrite(this, string, offset, length);
            break;
          case 'utf8':
          case 'utf-8':
            ret = _utf8Write(this, string, offset, length);
            break;
          case 'ascii':
            ret = _asciiWrite(this, string, offset, length);
            break;
          case 'binary':
            ret = _binaryWrite(this, string, offset, length);
            break;
          case 'base64':
            ret = _base64Write(this, string, offset, length);
            break;
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            ret = _utf16leWrite(this, string, offset, length);
            break;
          default:
            throw new Error('Unknown encoding');
        }
        return ret;
      };

      Buffer.prototype.toString = function (encoding, start, end) {
        var self = this;

        encoding = String(encoding || 'utf8').toLowerCase();
        start = Number(start) || 0;
        end = end !== undefined ? Number(end) : end = self.length;

        // Fastpath empty strings
        if (end === start) return '';

        var ret;
        switch (encoding) {
          case 'hex':
            ret = _hexSlice(self, start, end);
            break;
          case 'utf8':
          case 'utf-8':
            ret = _utf8Slice(self, start, end);
            break;
          case 'ascii':
            ret = _asciiSlice(self, start, end);
            break;
          case 'binary':
            ret = _binarySlice(self, start, end);
            break;
          case 'base64':
            ret = _base64Slice(self, start, end);
            break;
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            ret = _utf16leSlice(self, start, end);
            break;
          default:
            throw new Error('Unknown encoding');
        }
        return ret;
      };

      Buffer.prototype.toJSON = function () {
        return {
          type: 'Buffer',
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };

      // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
      Buffer.prototype.copy = function (target, target_start, start, end) {
        var source = this;

        if (!start) start = 0;
        if (!end && end !== 0) end = this.length;
        if (!target_start) target_start = 0;

        // Copy 0 bytes; we're done
        if (end === start) return;
        if (target.length === 0 || source.length === 0) return;

        // Fatal error conditions
        assert(end >= start, 'sourceEnd < sourceStart');
        assert(target_start >= 0 && target_start < target.length, 'targetStart out of bounds');
        assert(start >= 0 && start < source.length, 'sourceStart out of bounds');
        assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds');

        // Are we oob?
        if (end > this.length) end = this.length;
        if (target.length - target_start < end - start) end = target.length - target_start + start;

        var len = end - start;

        if (len < 100 || !Buffer._useTypedArrays) {
          for (var i = 0; i < len; i++) {
            target[i + target_start] = this[i + start];
          }
        } else {
          target._set(this.subarray(start, start + len), target_start);
        }
      };

      function _base64Slice(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return base64.fromByteArray(buf);
        } else {
          return base64.fromByteArray(buf.slice(start, end));
        }
      }

      function _utf8Slice(buf, start, end) {
        var res = '';
        var tmp = '';
        end = Math.min(buf.length, end);

        for (var i = start; i < end; i++) {
          if (buf[i] <= 0x7F) {
            res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i]);
            tmp = '';
          } else {
            tmp += '%' + buf[i].toString(16);
          }
        }

        return res + decodeUtf8Char(tmp);
      }

      function _asciiSlice(buf, start, end) {
        var ret = '';
        end = Math.min(buf.length, end);

        for (var i = start; i < end; i++) {
          ret += String.fromCharCode(buf[i]);
        }return ret;
      }

      function _binarySlice(buf, start, end) {
        return _asciiSlice(buf, start, end);
      }

      function _hexSlice(buf, start, end) {
        var len = buf.length;

        if (!start || start < 0) start = 0;
        if (!end || end < 0 || end > len) end = len;

        var out = '';
        for (var i = start; i < end; i++) {
          out += toHex(buf[i]);
        }
        return out;
      }

      function _utf16leSlice(buf, start, end) {
        var bytes = buf.slice(start, end);
        var res = '';
        for (var i = 0; i < bytes.length; i += 2) {
          res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
        }
        return res;
      }

      Buffer.prototype.slice = function (start, end) {
        var len = this.length;
        start = clamp(start, len, 0);
        end = clamp(end, len, len);

        if (Buffer._useTypedArrays) {
          return Buffer._augment(this.subarray(start, end));
        } else {
          var sliceLen = end - start;
          var newBuf = new Buffer(sliceLen, undefined, true);
          for (var i = 0; i < sliceLen; i++) {
            newBuf[i] = this[i + start];
          }
          return newBuf;
        }
      };

      // `get` will be removed in Node 0.13+
      Buffer.prototype.get = function (offset) {
        console.log('.get() is deprecated. Access using array indexes instead.');
        return this.readUInt8(offset);
      };

      // `set` will be removed in Node 0.13+
      Buffer.prototype.set = function (v, offset) {
        console.log('.set() is deprecated. Access using array indexes instead.');
        return this.writeUInt8(v, offset);
      };

      Buffer.prototype.readUInt8 = function (offset, noAssert) {
        if (!noAssert) {
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset < this.length, 'Trying to read beyond buffer length');
        }

        if (offset >= this.length) return;

        return this[offset];
      };

      function _readUInt16(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 1 < buf.length, 'Trying to read beyond buffer length');
        }

        var len = buf.length;
        if (offset >= len) return;

        var val;
        if (littleEndian) {
          val = buf[offset];
          if (offset + 1 < len) val |= buf[offset + 1] << 8;
        } else {
          val = buf[offset] << 8;
          if (offset + 1 < len) val |= buf[offset + 1];
        }
        return val;
      }

      Buffer.prototype.readUInt16LE = function (offset, noAssert) {
        return _readUInt16(this, offset, true, noAssert);
      };

      Buffer.prototype.readUInt16BE = function (offset, noAssert) {
        return _readUInt16(this, offset, false, noAssert);
      };

      function _readUInt32(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 3 < buf.length, 'Trying to read beyond buffer length');
        }

        var len = buf.length;
        if (offset >= len) return;

        var val;
        if (littleEndian) {
          if (offset + 2 < len) val = buf[offset + 2] << 16;
          if (offset + 1 < len) val |= buf[offset + 1] << 8;
          val |= buf[offset];
          if (offset + 3 < len) val = val + (buf[offset + 3] << 24 >>> 0);
        } else {
          if (offset + 1 < len) val = buf[offset + 1] << 16;
          if (offset + 2 < len) val |= buf[offset + 2] << 8;
          if (offset + 3 < len) val |= buf[offset + 3];
          val = val + (buf[offset] << 24 >>> 0);
        }
        return val;
      }

      Buffer.prototype.readUInt32LE = function (offset, noAssert) {
        return _readUInt32(this, offset, true, noAssert);
      };

      Buffer.prototype.readUInt32BE = function (offset, noAssert) {
        return _readUInt32(this, offset, false, noAssert);
      };

      Buffer.prototype.readInt8 = function (offset, noAssert) {
        if (!noAssert) {
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset < this.length, 'Trying to read beyond buffer length');
        }

        if (offset >= this.length) return;

        var neg = this[offset] & 0x80;
        if (neg) return (0xff - this[offset] + 1) * -1;else return this[offset];
      };

      function _readInt16(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 1 < buf.length, 'Trying to read beyond buffer length');
        }

        var len = buf.length;
        if (offset >= len) return;

        var val = _readUInt16(buf, offset, littleEndian, true);
        var neg = val & 0x8000;
        if (neg) return (0xffff - val + 1) * -1;else return val;
      }

      Buffer.prototype.readInt16LE = function (offset, noAssert) {
        return _readInt16(this, offset, true, noAssert);
      };

      Buffer.prototype.readInt16BE = function (offset, noAssert) {
        return _readInt16(this, offset, false, noAssert);
      };

      function _readInt32(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 3 < buf.length, 'Trying to read beyond buffer length');
        }

        var len = buf.length;
        if (offset >= len) return;

        var val = _readUInt32(buf, offset, littleEndian, true);
        var neg = val & 0x80000000;
        if (neg) return (0xffffffff - val + 1) * -1;else return val;
      }

      Buffer.prototype.readInt32LE = function (offset, noAssert) {
        return _readInt32(this, offset, true, noAssert);
      };

      Buffer.prototype.readInt32BE = function (offset, noAssert) {
        return _readInt32(this, offset, false, noAssert);
      };

      function _readFloat(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset + 3 < buf.length, 'Trying to read beyond buffer length');
        }

        return ieee754.read(buf, offset, littleEndian, 23, 4);
      }

      Buffer.prototype.readFloatLE = function (offset, noAssert) {
        return _readFloat(this, offset, true, noAssert);
      };

      Buffer.prototype.readFloatBE = function (offset, noAssert) {
        return _readFloat(this, offset, false, noAssert);
      };

      function _readDouble(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset + 7 < buf.length, 'Trying to read beyond buffer length');
        }

        return ieee754.read(buf, offset, littleEndian, 52, 8);
      }

      Buffer.prototype.readDoubleLE = function (offset, noAssert) {
        return _readDouble(this, offset, true, noAssert);
      };

      Buffer.prototype.readDoubleBE = function (offset, noAssert) {
        return _readDouble(this, offset, false, noAssert);
      };

      Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset < this.length, 'trying to write beyond buffer length');
          verifuint(value, 0xff);
        }

        if (offset >= this.length) return;

        this[offset] = value;
      };

      function _writeUInt16(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 1 < buf.length, 'trying to write beyond buffer length');
          verifuint(value, 0xffff);
        }

        var len = buf.length;
        if (offset >= len) return;

        for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
          buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
        }
      }

      Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
        _writeUInt16(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
        _writeUInt16(this, value, offset, false, noAssert);
      };

      function _writeUInt32(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 3 < buf.length, 'trying to write beyond buffer length');
          verifuint(value, 0xffffffff);
        }

        var len = buf.length;
        if (offset >= len) return;

        for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
          buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
        }
      }

      Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
        _writeUInt32(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
        _writeUInt32(this, value, offset, false, noAssert);
      };

      Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset < this.length, 'Trying to write beyond buffer length');
          verifsint(value, 0x7f, -0x80);
        }

        if (offset >= this.length) return;

        if (value >= 0) this.writeUInt8(value, offset, noAssert);else this.writeUInt8(0xff + value + 1, offset, noAssert);
      };

      function _writeInt16(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 1 < buf.length, 'Trying to write beyond buffer length');
          verifsint(value, 0x7fff, -0x8000);
        }

        var len = buf.length;
        if (offset >= len) return;

        if (value >= 0) _writeUInt16(buf, value, offset, littleEndian, noAssert);else _writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert);
      }

      Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
        _writeInt16(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
        _writeInt16(this, value, offset, false, noAssert);
      };

      function _writeInt32(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 3 < buf.length, 'Trying to write beyond buffer length');
          verifsint(value, 0x7fffffff, -0x80000000);
        }

        var len = buf.length;
        if (offset >= len) return;

        if (value >= 0) _writeUInt32(buf, value, offset, littleEndian, noAssert);else _writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert);
      }

      Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
        _writeInt32(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
        _writeInt32(this, value, offset, false, noAssert);
      };

      function _writeFloat(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 3 < buf.length, 'Trying to write beyond buffer length');
          verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38);
        }

        var len = buf.length;
        if (offset >= len) return;

        ieee754.write(buf, value, offset, littleEndian, 23, 4);
      }

      Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
        _writeFloat(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
        _writeFloat(this, value, offset, false, noAssert);
      };

      function _writeDouble(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 7 < buf.length, 'Trying to write beyond buffer length');
          verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308);
        }

        var len = buf.length;
        if (offset >= len) return;

        ieee754.write(buf, value, offset, littleEndian, 52, 8);
      }

      Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
        _writeDouble(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
        _writeDouble(this, value, offset, false, noAssert);
      };

      // fill(value, start=0, end=buffer.length)
      Buffer.prototype.fill = function (value, start, end) {
        if (!value) value = 0;
        if (!start) start = 0;
        if (!end) end = this.length;

        if (typeof value === 'string') {
          value = value.charCodeAt(0);
        }

        assert(typeof value === 'number' && !isNaN(value), 'value is not a number');
        assert(end >= start, 'end < start');

        // Fill 0 bytes; we're done
        if (end === start) return;
        if (this.length === 0) return;

        assert(start >= 0 && start < this.length, 'start out of bounds');
        assert(end >= 0 && end <= this.length, 'end out of bounds');

        for (var i = start; i < end; i++) {
          this[i] = value;
        }
      };

      Buffer.prototype.inspect = function () {
        var out = [];
        var len = this.length;
        for (var i = 0; i < len; i++) {
          out[i] = toHex(this[i]);
          if (i === exports.INSPECT_MAX_BYTES) {
            out[i + 1] = '...';
            break;
          }
        }
        return '<Buffer ' + out.join(' ') + '>';
      };

      /**
       * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
       * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
       */
      Buffer.prototype.toArrayBuffer = function () {
        if (typeof Uint8Array !== 'undefined') {
          if (Buffer._useTypedArrays) {
            return new Buffer(this).buffer;
          } else {
            var buf = new Uint8Array(this.length);
            for (var i = 0, len = buf.length; i < len; i += 1) {
              buf[i] = this[i];
            }return buf.buffer;
          }
        } else {
          throw new Error('Buffer.toArrayBuffer not supported in this browser');
        }
      };

      // HELPER FUNCTIONS
      // ================

      function stringtrim(str) {
        if (str.trim) return str.trim();
        return str.replace(/^\s+|\s+$/g, '');
      }

      var BP = Buffer.prototype;

      /**
       * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
       */
      Buffer._augment = function (arr) {
        arr._isBuffer = true;

        // save reference to original Uint8Array get/set methods before overwriting
        arr._get = arr.get;
        arr._set = arr.set;

        // deprecated, will be removed in node 0.13+
        arr.get = BP.get;
        arr.set = BP.set;

        arr.write = BP.write;
        arr.toString = BP.toString;
        arr.toLocaleString = BP.toString;
        arr.toJSON = BP.toJSON;
        arr.copy = BP.copy;
        arr.slice = BP.slice;
        arr.readUInt8 = BP.readUInt8;
        arr.readUInt16LE = BP.readUInt16LE;
        arr.readUInt16BE = BP.readUInt16BE;
        arr.readUInt32LE = BP.readUInt32LE;
        arr.readUInt32BE = BP.readUInt32BE;
        arr.readInt8 = BP.readInt8;
        arr.readInt16LE = BP.readInt16LE;
        arr.readInt16BE = BP.readInt16BE;
        arr.readInt32LE = BP.readInt32LE;
        arr.readInt32BE = BP.readInt32BE;
        arr.readFloatLE = BP.readFloatLE;
        arr.readFloatBE = BP.readFloatBE;
        arr.readDoubleLE = BP.readDoubleLE;
        arr.readDoubleBE = BP.readDoubleBE;
        arr.writeUInt8 = BP.writeUInt8;
        arr.writeUInt16LE = BP.writeUInt16LE;
        arr.writeUInt16BE = BP.writeUInt16BE;
        arr.writeUInt32LE = BP.writeUInt32LE;
        arr.writeUInt32BE = BP.writeUInt32BE;
        arr.writeInt8 = BP.writeInt8;
        arr.writeInt16LE = BP.writeInt16LE;
        arr.writeInt16BE = BP.writeInt16BE;
        arr.writeInt32LE = BP.writeInt32LE;
        arr.writeInt32BE = BP.writeInt32BE;
        arr.writeFloatLE = BP.writeFloatLE;
        arr.writeFloatBE = BP.writeFloatBE;
        arr.writeDoubleLE = BP.writeDoubleLE;
        arr.writeDoubleBE = BP.writeDoubleBE;
        arr.fill = BP.fill;
        arr.inspect = BP.inspect;
        arr.toArrayBuffer = BP.toArrayBuffer;

        return arr;
      };

      // slice(start, end)
      function clamp(index, len, defaultValue) {
        if (typeof index !== 'number') return defaultValue;
        index = ~~index; // Coerce to integer.
        if (index >= len) return len;
        if (index >= 0) return index;
        index += len;
        if (index >= 0) return index;
        return 0;
      }

      function coerce(length) {
        // Coerce length to a number (possibly NaN), round up
        // in case it's fractional (e.g. 123.456) then do a
        // double negate to coerce a NaN to 0. Easy, right?
        length = ~~Math.ceil(+length);
        return length < 0 ? 0 : length;
      }

      function isArray(subject) {
        return (Array.isArray || function (subject) {
          return Object.prototype.toString.call(subject) === '[object Array]';
        })(subject);
      }

      function isArrayish(subject) {
        return isArray(subject) || Buffer.isBuffer(subject) || subject && (typeof subject === 'undefined' ? 'undefined' : _typeof(subject)) === 'object' && typeof subject.length === 'number';
      }

      function toHex(n) {
        if (n < 16) return '0' + n.toString(16);
        return n.toString(16);
      }

      function utf8ToBytes(str) {
        var byteArray = [];
        for (var i = 0; i < str.length; i++) {
          var b = str.charCodeAt(i);
          if (b <= 0x7F) byteArray.push(str.charCodeAt(i));else {
            var start = i;
            if (b >= 0xD800 && b <= 0xDFFF) i++;
            var h = encodeURIComponent(str.slice(start, i + 1)).substr(1).split('%');
            for (var j = 0; j < h.length; j++) {
              byteArray.push(parseInt(h[j], 16));
            }
          }
        }
        return byteArray;
      }

      function asciiToBytes(str) {
        var byteArray = [];
        for (var i = 0; i < str.length; i++) {
          // Node's code seems to be doing this and not & 0x7F..
          byteArray.push(str.charCodeAt(i) & 0xFF);
        }
        return byteArray;
      }

      function utf16leToBytes(str) {
        var c, hi, lo;
        var byteArray = [];
        for (var i = 0; i < str.length; i++) {
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }

        return byteArray;
      }

      function base64ToBytes(str) {
        return base64.toByteArray(str);
      }

      function blitBuffer(src, dst, offset, length) {
        var pos;
        for (var i = 0; i < length; i++) {
          if (i + offset >= dst.length || i >= src.length) break;
          dst[i + offset] = src[i];
        }
        return i;
      }

      function decodeUtf8Char(str) {
        try {
          return decodeURIComponent(str);
        } catch (err) {
          return String.fromCharCode(0xFFFD); // UTF 8 invalid char
        }
      }

      /*
       * We have to make sure that the value is a valid integer. This means that it
       * is non-negative. It has no fractional component and that it does not
       * exceed the maximum allowed value.
       */
      function verifuint(value, max) {
        assert(typeof value === 'number', 'cannot write a non-number as a number');
        assert(value >= 0, 'specified a negative value for writing an unsigned value');
        assert(value <= max, 'value is larger than maximum value for type');
        assert(Math.floor(value) === value, 'value has a fractional component');
      }

      function verifsint(value, max, min) {
        assert(typeof value === 'number', 'cannot write a non-number as a number');
        assert(value <= max, 'value larger than maximum allowed value');
        assert(value >= min, 'value smaller than minimum allowed value');
        assert(Math.floor(value) === value, 'value has a fractional component');
      }

      function verifIEEE754(value, max, min) {
        assert(typeof value === 'number', 'cannot write a non-number as a number');
        assert(value <= max, 'value larger than maximum allowed value');
        assert(value >= min, 'value smaller than minimum allowed value');
      }

      function assert(test, message) {
        if (!test) throw new Error(message || 'Failed assertion');
      }
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/..\\..\\node_modules\\buffer\\index.js", "/..\\..\\node_modules\\buffer");
  }, { "base64-js": 1, "buffer": 2, "e/U+97": 4, "ieee754": 3 }], 3: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      "use strict";

      exports.read = function (buffer, offset, isLE, mLen, nBytes) {
        var e, m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? nBytes - 1 : 0;
        var d = isLE ? -1 : 1;
        var s = buffer[offset + i];

        i += d;

        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : (s ? -1 : 1) * Infinity;
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };

      exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE ? 0 : nBytes - 1;
        var d = isLE ? 1 : -1;
        var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;

        value = Math.abs(value);

        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }

          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }

        for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

        e = e << mLen | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

        buffer[offset + i - d] |= s * 128;
      };
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/..\\..\\node_modules\\ieee754\\index.js", "/..\\..\\node_modules\\ieee754");
  }, { "buffer": 2, "e/U+97": 4 }], 4: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      // shim for using process in browser

      var process = module.exports = {};

      process.nextTick = function () {
        var canSetImmediate = typeof window !== 'undefined' && window.setImmediate;
        var canPost = typeof window !== 'undefined' && window.postMessage && window.addEventListener;

        if (canSetImmediate) {
          return function (f) {
            return window.setImmediate(f);
          };
        }

        if (canPost) {
          var queue = [];
          window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
              ev.stopPropagation();
              if (queue.length > 0) {
                var fn = queue.shift();
                fn();
              }
            }
          }, true);

          return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
          };
        }

        return function nextTick(fn) {
          setTimeout(fn, 0);
        };
      }();

      process.title = 'browser';
      process.browser = true;
      process.env = {};
      process.argv = [];

      function noop() {}

      process.on = noop;
      process.addListener = noop;
      process.once = noop;
      process.off = noop;
      process.removeListener = noop;
      process.removeAllListeners = noop;
      process.emit = noop;

      process.binding = function (name) {
        throw new Error('process.binding is not supported');
      };

      // TODO(shtylman)
      process.cwd = function () {
        return '/';
      };
      process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
      };
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/..\\..\\node_modules\\process\\browser.js", "/..\\..\\node_modules\\process");
  }, { "buffer": 2, "e/U+97": 4 }], 5: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      /**
       * Created by andre on 29-Jun-17.
       */

      function Enemy(ctx) {
        var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;
        var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 30;
        var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'red';
        var x = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 50;
        var y = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 50;

        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;

        this.x1 = Math.floor(Math.random() * 3 + 1);
        this.y1 = Math.floor(Math.random() * 3 + 1);
      }
      Enemy.prototype = {
        update: function update(ctx) {
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.fillStyle = this.color;
          ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
          ctx.restore();
          return this;
        },
        newPos: function newPos(width, height) {
          this.x += this.x1;
          this.y += this.y1;

          if (this.y > height) {
            this.y = 0;
          } else if (this.y < 0) {
            this.y = height;
          } else if (this.x > width) {
            this.x = 0;
          } else if (this.x < 0) {
            this.x = width;
          }
          return this;
        }
      };

      exports.default = Enemy;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\enemy.js", "/components");
  }, { "buffer": 2, "e/U+97": 4 }], 6: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function GameArena(element, lvl, timer, width, height, Player, Enemy, eventBus) {
        var _this = this;

        this.canvas = element;
        this.lvl = lvl;
        this.timer = timer;
        this.ctx = this.canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.player = new Player(this.ctx);
        this.enemy = [];
        var level = 0;
        this.enemyInterval = setInterval(function () {
          _this.enemy.push(new Enemy(_this.ctx));
          level++;
          _this.lvl.innerHTML = ' Level: ' + level;
        }, 5000);
        this.eventBus = eventBus;

        this.start();
      }

      GameArena.prototype = {
        start: function start() {
          var _this2 = this;

          this.canvas.width = this.width;
          this.canvas.height = this.height;
          this.interval = setInterval(this.updateState.bind(this), 20);
          window.addEventListener('keydown', function (e) {
            e.preventDefault();
            _this2.keys = _this2.keys || [];
            _this2.keys[e.keyCode] = e.type === 'keydown';
          });
          window.addEventListener('keyup', function (e) {
            _this2.keys[e.keyCode] = e.type === 'keydown';
          });
        },
        stop: function stop() {
          clearInterval(this.interval);
          clearInterval(this.enemyInterval);
          clearInterval(this.timer.timer);
          this.lvl.innerHTML += "<span style=\"color: red; font-weight: bold; font-size: 5em;\"> THE END!!! \u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043E\u0447\u043A\u043E\u0432 = " + this.timer.time + '</span>';
          this.eventBus.trigger('game:finish');
        },
        updateState: function updateState() {
          var _this3 = this;

          this.clear();
          this.player.newPos({
            right: this.keys && this.keys[68],
            left: this.keys && this.keys[65],
            up: this.keys && this.keys[87],
            down: this.keys && this.keys[83]
          }, this.width, this.height).update(this.ctx);
          this.enemy.map(function (item) {
            var newX = Math.abs(item.x - _this3.player.x);
            var newY = Math.abs(item.y - _this3.player.y);
            if (newX < 25 && newY < 25) {
              _this3.stop();
            }
            item.newPos(_this3.width, _this3.height).update(_this3.ctx);
          });
        },
        clear: function clear() {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
      };

      exports.default = GameArena;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\gameArena.js", "/components");
  }, { "buffer": 2, "e/U+97": 4 }], 7: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      /**
       * Created by andre on 29-Jun-17.
       */

      var addScoreLS = exports.addScoreLS = function addScoreLS(score, name) {
        var LS = JSON.parse(localStorage.getItem('GameScore')) || {};
        LS[score] = LS[score] || [];
        LS[score].push(name);
        localStorage.setItem('GameScore', JSON.stringify(LS));
      };

      var renderScoreFromLS = exports.renderScoreFromLS = function renderScoreFromLS() {
        var recObj = JSON.parse(localStorage.getItem('GameScore'));
        var div = document.querySelector('div.main');
        for (var key in recObj) {
          div.innerHTML += "<span>\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0432\u043E \u043E\u0447\u043A\u043E\u0435\u0432 " + key + " \u0418\u043C\u044F: " + recObj[key] + '</span><br>';
        }
      };
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\localStorage.js", "/components");
  }, { "buffer": 2, "e/U+97": 4 }], 8: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      /**
       * Created by andre on 28-Jun-17.
       */
      function Player(ctx) {
        var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;
        var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 30;
        var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'green';
        var x = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 50;
        var y = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 50;

        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;

        this.speed = 0;
        this.angle = 0;
        this.moveAngle = 0;
      }

      Player.prototype = {
        update: function update(ctx) {
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate(this.angle);
          ctx.fillStyle = this.color;
          ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
          ctx.restore();
          return this;
        },
        newPos: function newPos(option, width, height) {
          this.moveAngle = 0;
          this.speed = 0;

          option.left && (this.moveAngle = -5);
          option.right && (this.moveAngle = 5);
          option.up && (this.speed = 5);
          option.down && (this.speed = -5);

          this.angle += this.moveAngle * Math.PI / 180;
          this.x += this.speed * Math.sin(this.angle);
          this.y -= this.speed * Math.cos(this.angle);

          if (this.y > height) {
            this.y = 0;
          } else if (this.y < 0) {
            this.y = height;
          } else if (this.x > width) {
            this.x = 0;
          } else if (this.x < 0) {
            this.x = width;
          }
          return this;
        }
      };

      exports.default = Player;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\player.js", "/components");
  }, { "buffer": 2, "e/U+97": 4 }], 9: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      /**
       * Created by andre on 29-Jun-17.
       */

      function Timer(element) {
        this.element = element;

        this.time = 0;
        this.startTimer();
      }

      Timer.prototype = {
        startTimer: function startTimer() {
          var _this = this;

          this.element.innerHTML = '';

          this.timer = setInterval(function () {
            _this.time++;
            _this.element.innerHTML = _this.time;
          }, 1000);
        }
      };

      exports.default = Timer;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\timer.js", "/components");
  }, { "buffer": 2, "e/U+97": 4 }], 10: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      var _eventBus = require('./utils/eventBus');

      var _eventBus2 = _interopRequireDefault(_eventBus);

      var _router = require('./utils/router');

      var _router2 = _interopRequireDefault(_router);

      var _index = require('./routes/index');

      var _about = require('./routes/about');

      var _game = require('./routes/game');

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var routes = [_index.index, _about.about, _game.game];

      var eventBus = new _eventBus2.default();

      new _router2.default({ routes: routes }, eventBus);
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/fake_f65f3777.js", "/");
  }, { "./routes/about": 11, "./routes/game": 12, "./routes/index": 13, "./utils/eventBus": 14, "./utils/router": 15, "buffer": 2, "e/U+97": 4 }], 11: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.about = undefined;

      var _localStorage = require('../components/localStorage');

      var div = document.querySelector('div.main');
      var about = {
        name: 'about',
        match: function match(text) {
          return text === 'about';
        },
        onBeforeEnter: function onBeforeEnter() {
          return console.log('onBeforeEnter about');
        },
        onEnter: function onEnter() {
          div.innerHTML = '<p>Г.Г.Борисевич</p> <a href="https://vk.com/id55569389" target="_blank">VK</a><br><hr>';
          (0, _localStorage.renderScoreFromLS)();
        },
        onLeave: function onLeave() {
          return div.innerHTML = '';
        }
      };

      exports.about = about;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/routes\\about.js", "/routes");
  }, { "../components/localStorage": 7, "buffer": 2, "e/U+97": 4 }], 12: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.game = undefined;

      var _gameArena = require('../components/gameArena');

      var _gameArena2 = _interopRequireDefault(_gameArena);

      var _player = require('../components/player');

      var _player2 = _interopRequireDefault(_player);

      var _enemy = require('../components/enemy');

      var _enemy2 = _interopRequireDefault(_enemy);

      var _timer = require('../components/timer');

      var _timer2 = _interopRequireDefault(_timer);

      var _localStorage = require('../components/localStorage');

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var ARENA_WIDTH = 700;
      var ARENA_HEIGHT = 400;

      var div = document.querySelector('div.main');
      var game = {
        name: 'game',
        match: function match(text) {
          return text === 'game';
        },
        onEnter: function onEnter(eventBus) {
          div.innerHTML = '\n<h2>Game</h2> <hr>\n<button class="start">Start</button>\n\n';
          var btn = document.querySelector('button.start');
          btn.addEventListener('click', function () {
            div.innerHTML += '<span class="score"></span><span class="lvl"> Level: 0</span><div><canvas style="border: solid 1px red"></canvas></div>';
            var canvas = document.querySelector('canvas');
            var score = document.querySelector('span.score');
            var lvl = document.querySelector('span.lvl');
            var timer = new _timer2.default(score);
            var gameArena = new _gameArena2.default(canvas, lvl, timer, ARENA_WIDTH, ARENA_HEIGHT, _player2.default, _enemy2.default, eventBus);

            eventBus.on('game:finish', function () {
              var name = prompt('Введите ваше имя', 'Andrey');
              (0, _localStorage.addScoreLS)(score.innerText, name);
            });
          });
        },
        onLeave: function onLeave() {
          return div.innerHTML = '';
        }
      };

      exports.game = game;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/routes\\game.js", "/routes");
  }, { "../components/enemy": 5, "../components/gameArena": 6, "../components/localStorage": 7, "../components/player": 8, "../components/timer": 9, "buffer": 2, "e/U+97": 4 }], 13: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var div = document.querySelector('div.main');
      var index = {
        name: 'index',
        match: '',
        onBeforeEnter: function onBeforeEnter() {
          return console.log('onBeforeEnter index');
        },
        onEnter: function onEnter() {
          return div.innerHTML = 'Это самая крутая игра в Мире. Правил в ней нет, делай что хочешь P.S. Я сам не знаю )';
        },
        onLeave: function onLeave() {
          return console.log('onLeave index');
        }
      };

      exports.index = index;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/routes\\index.js", "/routes");
  }, { "buffer": 2, "e/U+97": 4 }], 14: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      /*
       d1. Реализовать EventBus
      
       создать конструктор
       создать метод on
       coздать метод off
       создать метод trigger
       создать метод once
       вызвать конструктор
       */

      function EventBus() {
        this.listeners = {};
      }

      EventBus.prototype.on = function (ev, handler) {
        this.listeners[ev] = this.listeners[ev] || [];
        this.listeners[ev].push(handler);
      };
      EventBus.prototype.trigger = function (ev) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        (this.listeners[ev] || []).forEach(function (handler) {
          return handler.apply(null, args);
        });
      };
      EventBus.prototype.off = function (ev, handler) {
        (this.listeners[ev] || []).forEach(function (item, i) {
          if (item === handler) {
            this.listeners[ev].splice(i, 1);
          }
        }, this);
      };
      EventBus.prototype.once = function (ev, handler) {
        var that = this;
        this.on(ev, function offMethod() {
          handler.apply(null, arguments);
          that.off(ev, offMethod);
        });
      };

      exports.default = EventBus;

      // var eventBus = new EventBus();
      // var handler = (a, b, c) => console.log('Handler', a, b, c);
      // eventBus.once('one', handler);
      // eventBus.trigger('one', 1,2,3);
      // // Handler 1 2 3
      // eventBus.trigger('one');
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/utils\\eventBus.js", "/utils");
  }, { "buffer": 2, "e/U+97": 4 }], 15: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      /*
       Реализовать Router
      
       создать конструктор
       обработчик изменения адреса
       при создании выплнил обработчик изменения адреса
       научиться определять роут по адресу ( какой роут нужно активировать )
       находить/сохранять последний активный роут
       вызвать onLeave
       вызвать onBeforeEnter
       вызвать onEnter
       обрабатывать отсутствие фукнций-хуков
       поддерживать promise из onBeforeEnter
       поддерживать promise из onLeave
       */
      var Router = function Router(options, eventBus) {
        this.routes = options.routes;
        this.eventBus = eventBus;
        this.init();
      };

      Router.prototype = {
        init: function init() {
          var _this = this;

          window.addEventListener('hashchange', function (ev) {
            return _this.handleUrl(ev.oldURL.split('#')[1] || '', ev.newURL.split('#')[1]);
          });
          this.handleUrl(undefined, window.location.hash.slice(1));
        },
        getParam: function getParam(newRoute, currentRoute) {
          var param = newRoute.match(currentRoute.match) || [];
          return param[1];
        },
        handleUrl: function handleUrl(oldRoute, newRoute) {
          var _this2 = this;

          var currentRoute = this.routes.find(function (item) {
            if (typeof item.match === 'string') {
              return newRoute === item.match;
            } else if (typeof item.match === 'function') {
              return item.match(newRoute);
            } else if (item.match instanceof RegExp) {
              return newRoute.match(item.match);
            }
          });
          if (oldRoute !== undefined) {
            var previousRoute = this.routes.find(function (item) {
              if (typeof item.match === 'string') {
                return oldRoute === item.match;
              } else if (typeof item.match === 'function') {
                return item.match(oldRoute);
              } else if (item.match instanceof RegExp) {
                return oldRoute.match(item.match);
              }
            });
          }
          var currentParam = this.getParam(newRoute, currentRoute);
          console.log('---> router oldURL: ' + oldRoute);
          console.log('---> router findNewActiveRoute: ' + newRoute + ' -- ' + (currentRoute || {}).name);
          Promise.resolve().then(function () {
            return previousRoute && previousRoute.onLeave && previousRoute.onLeave(oldRoute.split('=')[1]);
          }).then(function () {
            return currentRoute && currentRoute.onBeforeEnter && currentRoute.onBeforeEnter(currentParam);
          }).then(function () {
            return currentRoute && currentRoute.onEnter && currentRoute.onEnter(_this2.eventBus, currentParam);
          });
        }
      };

      exports.default = Router;

      // var router = new Router({
      //     routes: [{
      //         name: 'index',
      //         match: '',
      //         onBeforeEnter: () => console.log('onBeforeEnter index'),
      //         onEnter: () => console.log('onEnter index'),
      //         onLeave: () => console.log('onLeave index')
      //     }, {
      //         name: 'city',
      //         match: /city=(.+)/,
      //         onBeforeEnter: (city) => console.log(`onBeforeEnter city:${city}`),
      //         onEnter: (city) => console.log(`onEnter city:${city}`),
      //         onLeave: (city) => console.log(`onLeave city:${city}`)
      //     }, {
      //         name: 'about',
      //         match: (text) => text === 'about',
      //         onBeforeEnter: () => console.log(`onBeforeEnter about`),
      //         onEnter: () => {
      //             console.log(`onEnter about`);
      //             //document.querySelector('#content').innerHTML = '<h1>About</h1>';
      //         },
      //         onLeave: () => {
      //             console.log(`onLeave about`);
      //             document.querySelector('#content').innerHTML = '';
      //         }
      //     }]
      // });
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/utils\\router.js", "/utils");
  }, { "buffer": 2, "e/U+97": 4 }] }, {}, [10]);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L0pzL0dhbWUvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIkQ6L0pzL0dhbWUvbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9saWIvYjY0LmpzIiwiRDovSnMvR2FtZS9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzIiwiRDovSnMvR2FtZS9ub2RlX21vZHVsZXMvaWVlZTc1NC9pbmRleC5qcyIsIkQ6L0pzL0dhbWUvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIkQ6L0pzL0dhbWUvc3JjL3NjcmlwdC9jb21wb25lbnRzL2VuZW15LmpzIiwiRDovSnMvR2FtZS9zcmMvc2NyaXB0L2NvbXBvbmVudHMvZ2FtZUFyZW5hLmpzIiwiRDovSnMvR2FtZS9zcmMvc2NyaXB0L2NvbXBvbmVudHMvbG9jYWxTdG9yYWdlLmpzIiwiRDovSnMvR2FtZS9zcmMvc2NyaXB0L2NvbXBvbmVudHMvcGxheWVyLmpzIiwiRDovSnMvR2FtZS9zcmMvc2NyaXB0L2NvbXBvbmVudHMvdGltZXIuanMiLCJEOi9Kcy9HYW1lL3NyYy9zY3JpcHQvZmFrZV9mNjVmMzc3Ny5qcyIsIkQ6L0pzL0dhbWUvc3JjL3NjcmlwdC9yb3V0ZXMvYWJvdXQuanMiLCJEOi9Kcy9HYW1lL3NyYy9zY3JpcHQvcm91dGVzL2dhbWUuanMiLCJEOi9Kcy9HYW1lL3NyYy9zY3JpcHQvcm91dGVzL2luZGV4LmpzIiwiRDovSnMvR2FtZS9zcmMvc2NyaXB0L3V0aWxzL2V2ZW50QnVzLmpzIiwiRDovSnMvR2FtZS9zcmMvc2NyaXB0L3V0aWxzL3JvdXRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBLEFBQ0E7O0FBQ0EsbUJBQ0E7O0FBQ0EsMkJBQ0E7QUFDQSxBQUNBOzttRUFDQSxBQUNBOztrQ0FDQTttQ0FDQTtvQ0FDQTttQ0FDQTttQ0FDQTsyQ0FDQTs0Q0FDQSxBQUNBOzs2QkFDQTtvQ0FDQTtrRUFDQTtvRUFDQTt3Q0FDQTs4REFDQTsrQ0FDQTt1REFDQTtBQUNBLEFBQ0E7O3FDQUNBOzBDQUNBLEFBQ0E7O2tDQUNBOzRCQUNBO0FBQ0EsQUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO3dCQUNBOzZGQUNBLEFBQ0E7O0FBQ0E7NkNBQ0EsQUFDQTs7QUFDQTtzREFDQSxBQUNBOztrQkFDQSxBQUNBOzsyQkFDQTt1QkFDQTtBQUNBLEFBQ0E7O29EQUNBO3lJQUNBO3FDQUNBO21DQUNBO3VCQUNBO0FBQ0EsQUFDQTs7a0NBQ0E7NEVBQ0E7dUJBQ0E7eUNBQ0E7OEdBQ0E7NEJBQ0E7dUJBQ0E7QUFDQSxBQUNBOztpQkFDQTtBQUNBLEFBQ0E7O3NDQUNBO2NBQ0E7MENBQ0E7O0FBQ0E7bUJBQ0E7Y0FDQTtjQUNBLEFBQ0E7OytCQUNBO2lDQUNBO0FBQ0EsQUFDQTs7d0NBQ0E7Z0hBQ0E7QUFDQSxBQUNBOztBQUNBOzhFQUNBO3NFQUNBO3NDQUNBO0FBQ0EsQUFDQTs7QUFDQTtrQkFDQTtpQkFDQTswQ0FDQTt1Q0FDQTsyQ0FDQTt3QkFDQTtBQUNBO2lCQUNBOzJFQUNBO3VDQUNBOzJDQUNBOzJDQUNBO3dCQUNBO0FBQ0EsQUFDQSxBQUNBOzs7aUJBQ0E7QUFDQSxBQUNBOzs4QkFDQTtnQ0FDQTtvRUFDQSxBQUNBOzs7QUN4SEE7QUFDQSxBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0E7Ozs7Ozs7QUFDQTtBQUNBLDRCQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUNBOztBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0E7Ozs7O0FBQ0EsMkNBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO1lBQ0E7b0NBQ0E7bUNBQ0E7Z0NBQ0E7bUJBQ0E7QUFDQTt5RUFDQTtvQkFDQTtpQkFDQTtBQUNBO0FBQ0E7O0FBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBOzs7Ozs7Ozs7Ozs7QUFDQSxpREFDQTs0RUFDQSxBQUNBOzswRUFDQSxBQUNBOztBQUNBO0FBQ0E7d0RBQ0E7K0JBQ0E7MkNBQ0E7Z0NBQ0E7QUFDQTtBQUNBLEFBQ0E7O0FBQ0E7WUFDQTsrTEFDQTs2QkFDQSxBQUNBOztZQUNBO29DQUNBO0FBQ0E7K0NBQ0E7ZUFDQTtBQUNBO2dCQUNBO3VCQUNBOzBCQUNBO0FBQ0EsQUFDQTs7WUFDQTs4RUFDQTtBQUNBO21CQUNBO3dDQUNBO0FBQ0E7dUNBQ0E7OEZBQ0E7QUFDQTtzQ0FDQTtnQ0FDQTs0RUFDQTt1Q0FDQTtxQkFDQTtBQUNBO0FBQ0EsQUFDQTs7ZUFDQTtBQUNBOztBQUNBO0FBQ0EsQUFDQTs7QUFDQSw4Q0FDQTtpQ0FDQTtlQUNBO2VBQ0E7ZUFDQTtlQUNBO2VBQ0E7ZUFDQTtlQUNBO2VBQ0E7ZUFDQTtlQUNBO2VBQ0E7bUJBQ0E7QUFDQTttQkFDQSxBQUNBOztBQUNBOztBQUNBLHFDQUNBO3FEQUNBO0FBQ0E7O0FBQ0EsbURBQ0E7WUFDQTtvQkFDQTs0QkFDQTtlQUNBOytCQUNBO0FBQ0E7ZUFDQTtlQUNBO21DQUNBO0FBQ0E7ZUFDQTtlQUNBO2VBQ0E7c0JBQ0E7QUFDQTtlQUNBO3FDQUNBO0FBQ0E7ZUFDQTtlQUNBO2VBQ0E7ZUFDQTsrQkFDQTtBQUNBO0FBQ0E7NEJBQ0EsQUFDQTs7ZUFDQTtBQUNBOztBQUNBLG1EQUNBOzhFQUNBLEFBQ0E7OytCQUNBOzRCQUNBO3NDQUNBO3NCQUNBO0FBQ0EsQUFDQTs7WUFDQTs2Q0FDQTt3QkFDQTs0Q0FDQTttQ0FDQTtBQUNBO0FBQ0EsQUFDQTs7NkJBQ0E7a0JBQ0E7MENBQ0E7MEJBQ0E7eUJBQ0E7c0JBQ0E7QUFDQTtlQUNBO0FBQ0E7O0FBQ0E7QUFDQSxBQUNBOztBQUNBLHNEQUNBO21DQUNBO3FDQUNBO3FCQUNBO21CQUNBO2VBQ0E7MEJBQ0E7a0NBQ0E7cUJBQ0E7QUFDQTtBQUNBLEFBQ0E7O0FBQ0E7NEJBQ0E7aUNBQ0EsQUFDQTs7aUNBQ0E7NEJBQ0E7QUFDQTt5Q0FDQTt1REFDQTsrQkFDQTs0QkFDQTtBQUNBO21DQUNBO2VBQ0E7QUFDQTs7QUFDQSx1REFDQTsrRkFDQTtlQUNBO0FBQ0E7O0FBQ0Esd0RBQ0E7Z0dBQ0E7ZUFDQTtBQUNBOztBQUNBLHlEQUNBO2dEQUNBO0FBQ0E7O0FBQ0EseURBQ0E7aUdBQ0E7ZUFDQTtBQUNBOztBQUNBLDBEQUNBO2tHQUNBO2VBQ0E7QUFDQTs7QUFDQSwyRUFDQTtBQUNBO0FBQ0E7OEJBQ0E7aUNBQ0E7dUJBQ0E7cUJBQ0E7QUFDQTtlQUNBO0FBQ0E7cUJBQ0E7cUJBQ0E7bUJBQ0E7bUJBQ0E7QUFDQSxBQUNBOzttQ0FDQTtzQ0FDQTtxQkFDQTttQkFDQTtlQUNBOzBCQUNBO2tDQUNBO3FCQUNBO0FBQ0E7QUFDQTs4Q0FDQSxBQUNBOztZQUNBO2dCQUNBO2VBQ0E7a0RBQ0E7QUFDQTtlQUNBO2VBQ0E7bURBQ0E7QUFDQTtlQUNBO29EQUNBO0FBQ0E7ZUFDQTtxREFDQTtBQUNBO2VBQ0E7cURBQ0E7QUFDQTtlQUNBO2VBQ0E7ZUFDQTtlQUNBO3NEQUNBO0FBQ0E7QUFDQTs0QkFDQSxBQUNBOztlQUNBO0FBQ0E7O0FBQ0Esa0VBQ0E7bUJBQ0EsQUFDQTs7OENBQ0E7aUNBQ0E7MkRBQ0EsQUFDQTs7QUFDQTtrQ0FDQSxBQUNBOztZQUNBO2dCQUNBO2VBQ0E7eUNBQ0E7QUFDQTtlQUNBO2VBQ0E7MENBQ0E7QUFDQTtlQUNBOzJDQUNBO0FBQ0E7ZUFDQTs0Q0FDQTtBQUNBO2VBQ0E7NENBQ0E7QUFDQTtlQUNBO2VBQ0E7ZUFDQTtlQUNBOzZDQUNBO0FBQ0E7QUFDQTs0QkFDQSxBQUNBOztlQUNBO0FBQ0E7O0FBQ0EsNENBQ0E7O2dCQUVBOzhEQUNBLEFBQ0E7QUFIQTtBQUlBOztBQUNBO0FBQ0EsMEVBQ0E7cUJBQ0EsQUFDQTs7NEJBQ0E7MENBQ0E7MENBQ0EsQUFDQTs7QUFDQTsyQkFDQTt3REFDQSxBQUNBOztBQUNBOzZCQUNBO2tFQUNBO29EQUNBO2lEQUNBLEFBQ0E7O0FBQ0E7MENBQ0E7NkZBQ0EsQUFDQTs7d0JBQ0EsQUFDQTs7a0RBQ0E7d0NBQ0E7Z0RBQ0E7QUFDQTtlQUNBO3lEQUNBO0FBQ0E7QUFDQTs7QUFDQSw2Q0FDQTsrQ0FDQTtzQ0FDQTtlQUNBO3VEQUNBO0FBQ0E7QUFDQTs7QUFDQSwyQ0FDQTtrQkFDQTtrQkFDQTttQ0FDQSxBQUNBOzswQ0FDQTs4QkFDQTtpRUFDQTtrQkFDQTtpQkFDQTt5Q0FDQTtBQUNBO0FBQ0EsQUFDQTs7b0NBQ0E7QUFDQTs7QUFDQSw0Q0FDQTtrQkFDQTttQ0FDQSxBQUNBOzswQ0FDQTt5Q0FDQTtnQkFDQTtBQUNBOztBQUNBLDZDQUNBO3VDQUNBO0FBQ0E7O0FBQ0EsMENBQ0E7c0JBQ0EsQUFDQTs7eUNBQ0E7Z0RBQ0EsQUFDQTs7a0JBQ0E7MENBQ0E7MkJBQ0E7QUFDQTtlQUNBO0FBQ0E7O0FBQ0EsOENBQ0E7cUNBQ0E7a0JBQ0E7a0RBQ0E7K0RBQ0E7QUFDQTtlQUNBO0FBQ0E7O0FBQ0EscURBQ0E7dUJBQ0E7a0NBQ0E7OEJBQ0EsQUFDQTs7b0NBQ0E7c0RBQ0E7ZUFDQTsrQkFDQTt1REFDQTs2Q0FDQTtpQ0FDQTtBQUNBO2lCQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBLCtDQUNBO29CQUNBOzhCQUNBO0FBQ0E7O0FBQ0E7QUFDQSxrREFDQTtvQkFDQTtrQ0FDQTtBQUNBOztBQUNBLCtEQUNBO3VCQUNBOzBEQUNBO3VDQUNBO0FBQ0EsQUFDQTs7bUNBQ0EsQUFDQTs7b0JBQ0E7QUFDQTs7QUFDQSxnRUFDQTt1QkFDQTtvREFDQTswREFDQTswQ0FDQTtBQUNBLEFBQ0E7O3NCQUNBOzJCQUNBLEFBQ0E7O1lBQ0E7MEJBQ0E7b0JBQ0E7MERBQ0E7ZUFDQTsrQkFDQTtvREFDQTtBQUNBO2VBQ0E7QUFDQTs7QUFDQSxrRUFDQTsrQ0FDQTtBQUNBOztBQUNBLGtFQUNBO2dEQUNBO0FBQ0E7O0FBQ0EsZ0VBQ0E7dUJBQ0E7b0RBQ0E7MERBQ0E7MENBQ0E7QUFDQSxBQUNBOztzQkFDQTsyQkFDQSxBQUNBOztZQUNBOzBCQUNBO3lEQUNBOzBEQUNBO3FCQUNBO3VFQUNBO2VBQ0E7eURBQ0E7MERBQ0E7b0RBQ0E7NkNBQ0E7QUFDQTtlQUNBO0FBQ0E7O0FBQ0Esa0VBQ0E7K0NBQ0E7QUFDQTs7QUFDQSxrRUFDQTtnREFDQTtBQUNBOztBQUNBLDhEQUNBO3VCQUNBOzBEQUNBO3VDQUNBO0FBQ0EsQUFDQTs7bUNBQ0EsQUFDQTs7aUNBQ0E7d0VBQ0E7QUFDQTs7QUFDQSwrREFDQTt1QkFDQTtvREFDQTswREFDQTswQ0FDQTtBQUNBLEFBQ0E7O3NCQUNBOzJCQUNBLEFBQ0E7O3lEQUNBO3dCQUNBOzREQUNBO0FBQ0E7O0FBQ0EsaUVBQ0E7OENBQ0E7QUFDQTs7QUFDQSxpRUFDQTsrQ0FDQTtBQUNBOztBQUNBLCtEQUNBO3VCQUNBO29EQUNBOzBEQUNBOzBDQUNBO0FBQ0EsQUFDQTs7c0JBQ0E7MkJBQ0EsQUFDQTs7eURBQ0E7d0JBQ0E7Z0VBQ0E7QUFDQTs7QUFDQSxpRUFDQTs4Q0FDQTtBQUNBOztBQUNBLGlFQUNBOytDQUNBO0FBQ0E7O0FBQ0EsK0RBQ0E7dUJBQ0E7b0RBQ0E7MENBQ0E7QUFDQSxBQUNBOzsyREFDQTtBQUNBOztBQUNBLGlFQUNBOzhDQUNBO0FBQ0E7O0FBQ0EsaUVBQ0E7K0NBQ0E7QUFDQTs7QUFDQSxnRUFDQTt1QkFDQTtvREFDQTswQ0FDQTtBQUNBLEFBQ0E7OzJEQUNBO0FBQ0E7O0FBQ0Esa0VBQ0E7K0NBQ0E7QUFDQTs7QUFDQSxrRUFDQTtnREFDQTtBQUNBOztBQUNBLHVFQUNBO3VCQUNBO3dEQUNBOzBEQUNBO3VDQUNBOzJCQUNBO0FBQ0EsQUFDQTs7bUNBQ0EsQUFDQTs7dUJBQ0E7QUFDQTs7QUFDQSx3RUFDQTt1QkFDQTt3REFDQTtvREFDQTswREFDQTswQ0FDQTsyQkFDQTtBQUNBLEFBQ0E7O3NCQUNBOzJCQUNBLEFBQ0E7O21FQUNBOzhHQUNBO0FBQ0E7QUFDQTs7QUFDQSwwRUFDQTtnREFDQTtBQUNBOztBQUNBLDBFQUNBO2lEQUNBO0FBQ0E7O0FBQ0Esd0VBQ0E7dUJBQ0E7d0RBQ0E7b0RBQ0E7MERBQ0E7MENBQ0E7MkJBQ0E7QUFDQSxBQUNBOztzQkFDQTsyQkFDQSxBQUNBOzttRUFDQTt1RUFDQTtBQUNBO0FBQ0E7O0FBQ0EsMEVBQ0E7Z0RBQ0E7QUFDQTs7QUFDQSwwRUFDQTtpREFDQTtBQUNBOztBQUNBLHNFQUNBO3VCQUNBO3dEQUNBOzBEQUNBO3VDQUNBO2tDQUNBO0FBQ0EsQUFDQTs7bUNBQ0EsQUFDQTs7Z0hBQ0E7QUFDQTs7QUFDQSx1RUFDQTt1QkFDQTt3REFDQTtvREFDQTswREFDQTswQ0FDQTtvQ0FDQTtBQUNBLEFBQ0E7O3NCQUNBOzJCQUNBLEFBQ0E7O2tKQUNBO0FBQ0E7O0FBQ0EseUVBQ0E7K0NBQ0E7QUFDQTs7QUFDQSx5RUFDQTtnREFDQTtBQUNBOztBQUNBLHVFQUNBO3VCQUNBO3dEQUNBO29EQUNBOzBEQUNBOzBDQUNBO3dDQUNBO0FBQ0EsQUFDQTs7c0JBQ0E7MkJBQ0EsQUFDQTs7c0pBQ0E7QUFDQTs7QUFDQSx5RUFDQTsrQ0FDQTtBQUNBOztBQUNBLHlFQUNBO2dEQUNBO0FBQ0E7O0FBQ0EsdUVBQ0E7dUJBQ0E7d0RBQ0E7b0RBQ0E7MERBQ0E7MENBQ0E7dURBQ0E7QUFDQSxBQUNBOztzQkFDQTsyQkFDQSxBQUNBOzs0REFDQTtBQUNBOztBQUNBLHlFQUNBOytDQUNBO0FBQ0E7O0FBQ0EseUVBQ0E7Z0RBQ0E7QUFDQTs7QUFDQSx3RUFDQTt1QkFDQTt3REFDQTtvREFDQTswREFDQTswQ0FDQTt3REFDQTtBQUNBLEFBQ0E7O3NCQUNBOzJCQUNBLEFBQ0E7OzREQUNBO0FBQ0E7O0FBQ0EsMEVBQ0E7Z0RBQ0E7QUFDQTs7QUFDQSwwRUFDQTtpREFDQTtBQUNBOztBQUNBO0FBQ0EsMkRBQ0E7NEJBQ0E7NEJBQ0E7NkJBQ0EsQUFDQTs7dUNBQ0E7bUNBQ0E7QUFDQSxBQUNBOzsyREFDQTs2QkFDQSxBQUNBOztBQUNBOzJCQUNBOytCQUNBLEFBQ0E7O2tEQUNBOytDQUNBLEFBQ0E7OzBDQUNBO29CQUNBO0FBQ0E7QUFDQTs7QUFDQSw2Q0FDQTtrQkFDQTt1QkFDQTtzQ0FDQTs4QkFDQTsrQ0FDQTt5QkFDQTtBQUNBO0FBQ0E7QUFDQTs0Q0FDQTtBQUNBOztBQUNBLEFBQ0EsQUFDQSxBQUNBOzs7O0FBQ0EsbURBQ0E7K0NBQ0E7c0NBQ0E7b0NBQ0E7aUJBQ0E7MENBQ0E7K0RBQ0E7NEJBQ0E7d0JBQ0E7QUFDQTtlQUNBOzBCQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBLEFBQ0E7O0FBQ0EsK0JBQ0E7aUNBQ0E7eUNBQ0E7QUFDQTs7QUFDQSxzQkFDQTs7QUFDQSxBQUNBLEFBQ0E7OztBQUNBLHVDQUNBO3dCQUNBLEFBQ0E7O0FBQ0E7dUJBQ0E7dUJBQ0EsQUFDQTs7QUFDQTtxQkFDQTtxQkFDQSxBQUNBOzt1QkFDQTswQkFDQTtnQ0FDQTt3QkFDQTtzQkFDQTt1QkFDQTsyQkFDQTs4QkFDQTs4QkFDQTs4QkFDQTs4QkFDQTswQkFDQTs2QkFDQTs2QkFDQTs2QkFDQTs2QkFDQTs2QkFDQTs2QkFDQTs4QkFDQTs4QkFDQTs0QkFDQTsrQkFDQTsrQkFDQTsrQkFDQTsrQkFDQTsyQkFDQTs4QkFDQTs4QkFDQTs4QkFDQTs4QkFDQTs4QkFDQTs4QkFDQTsrQkFDQTsrQkFDQTtzQkFDQTt5QkFDQTsrQkFDQSxBQUNBOztlQUNBO0FBQ0E7O0FBQ0E7QUFDQTs4Q0FFQTt3QkFEQSxDQUVBO2lDQUNBOytCQUNBO2lCQUNBOytCQUNBO2VBQ0E7QUFDQTs7QUFDQSw4QkFDQTtBQUNBO0FBQ0E7QUFDQTs4QkFDQTtnQ0FDQTtBQUNBOztBQUNBLGdDQUNBO29EQUNBOzZEQUNBO1dBQ0E7QUFDQTs7QUFDQSxtQ0FDQTtzTEFDQTtBQUNBOztBQUNBLHdCQUNBOzRDQUNBOzBCQUNBO0FBQ0E7O0FBQ0EsZ0NBQ0E7d0JBQ0E7NkNBQ0E7aUNBQ0E7Z0VBQ0E7d0JBQ0E7NENBQ0E7Z0ZBQ0E7K0NBQ0E7NENBQ0E7QUFDQTtBQUNBO0FBQ0E7ZUFDQTtBQUNBOztBQUNBLGlDQUNBO3dCQUNBOzZDQUNBO0FBQ0E7NkNBQ0E7QUFDQTtlQUNBO0FBQ0E7O0FBQ0EsbUNBQ0E7bUJBQ0E7d0JBQ0E7NkNBQ0E7NkJBQ0E7b0JBQ0E7bUJBQ0E7eUJBQ0E7eUJBQ0E7QUFDQSxBQUNBOztlQUNBO0FBQ0E7O0FBQ0Esa0NBQ0E7a0NBQ0E7QUFDQTs7QUFDQSxvREFDQTtZQUNBO3lDQUNBOzJEQUNBO2dDQUNBO0FBQ0E7ZUFDQTtBQUNBOztBQUNBLG1DQUNBO1lBQ0E7b0NBQ0E7c0JBQ0E7OENBQ0E7QUFDQTtBQUNBOztBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0E7Ozs7O0FBQ0EscUNBQ0E7MENBQ0E7MkJBQ0E7NkJBQ0E7NENBQ0E7QUFDQTs7QUFDQSwwQ0FDQTswQ0FDQTs2QkFDQTs2QkFDQTs0Q0FDQTtBQUNBOztBQUNBLDZDQUNBOzBDQUNBOzZCQUNBOzZCQUNBO0FBQ0E7O0FBQ0EscUNBQ0E7OENBQ0E7QUFDQSxBQUNBOzs7QUN6aENBO0FBQ0EsQUFDQTs7QUFDQSxtRUFDQTtlQUNBO3VDQUNBO2lDQUNBOzRCQUNBO3FCQUNBO29DQUNBOzRCQUNBO2dDQUNBLEFBQ0E7O2FBQ0EsQUFDQTs7Z0NBQ0E7ZUFDQTtpQkFDQTtpRkFDQSxBQUNBOztnQ0FDQTtlQUNBO2lCQUNBO2lGQUNBLEFBQ0E7O3FCQUNBO2tCQUNBOytCQUNBOzBDQUNBO2VBQ0E7OEJBQ0E7a0JBQ0E7QUFDQTtrREFDQTtBQUNBOztBQUNBLDJFQUNBO2tCQUNBO3VDQUNBO2lDQUNBOzRCQUNBO3FFQUNBO29DQUNBOzRCQUNBO2dFQUNBLEFBQ0E7O3lCQUNBLEFBQ0E7O2dEQUNBO2lDQUNBO2NBQ0E7ZUFDQTtnREFDQTtpREFDQTtBQUNBO2lCQUNBO0FBQ0E7OEJBQ0E7MEJBQ0E7aUJBQ0E7MENBQ0E7QUFDQTs4QkFDQTtBQUNBO2lCQUNBO0FBQ0EsQUFDQTs7aUNBQ0E7Z0JBQ0E7Z0JBQ0E7cUNBQ0E7OENBQ0E7b0JBQ0E7aUJBQ0E7NkRBQ0E7Z0JBQ0E7QUFDQTtBQUNBLEFBQ0E7O3VGQUNBLEFBQ0E7O3dCQUNBO2dCQUNBO3NGQUNBLEFBQ0E7O3NDQUNBO0FBQ0EsQUFDQTs7O0FDeEZBO0FBQ0EsQUFDQTs7QUFDQSxBQUNBOztBQUNBLHFDQUNBOztBQUNBLHFDQUNBO3NFQUNBO29GQUNBLEFBQ0E7OzZCQUNBOzhCQUNBO3VDQUNBO0FBQ0E7QUFDQSxBQUNBOztxQkFDQTtzQkFDQTsyREFDQTs0QkFDQTtzRkFDQTtpQkFDQTtvQ0FDQTsrQkFDQTtBQUNBO0FBQ0E7QUFDQTthQUNBLEFBQ0E7O3VDQUNBO3VCQUNBOytDQUNBO0FBQ0E7QUFDQSxBQUNBOztxQ0FDQTt5QkFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQ0E7O0FBQ0EsdUJBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQ0E7O0FBQ0Esd0NBQ0E7d0JBQ0E7QUFDQTs7QUFDQTtBQUNBLGdDQUNBO2VBQ0E7O0FBQ0EscUNBQ0E7d0JBQ0E7QUFDQSxBQUNBOzs7QUNwRUE7QUFDQSxBQUNBOztBQUNBO2VBRUE7QUFEQTtBQUVBLEFBQ0EsQUFDQSxBQUNBOzs7O0FBQ0EsMEJBQ0E7d0ZBQ0E7eUZBQ0E7d0ZBQ0E7b0ZBQ0E7b0ZBQ0EsQUFDQTs7bUJBQ0E7cUJBQ0E7c0JBQ0E7cUJBQ0E7aUJBQ0E7aUJBQ0EsQUFDQTs7aURBQ0E7aURBQ0E7O0FBQ0E7cUNBRUE7Y0FDQTtxQ0FDQTsrQkFDQTsyRUFDQTtjQUNBO2lCQUNBO0FBQ0E7K0NBQ0E7eUJBQ0E7eUJBQ0EsQUFDQTs7K0JBQ0E7cUJBQ0E7aUNBQ0E7cUJBQ0E7cUNBQ0E7cUJBQ0E7aUNBQ0E7cUJBQ0E7QUFDQTtpQkFDQTtBQUNBLEFBQ0E7QUF4QkE7O0FBeUJBLHdCQUNBLEFBQ0E7OztBQ3ZEQTtBQUNBLEFBQ0E7O0FBQ0E7ZUFFQTtBQURBO0FBRUEsc0ZBQ0E7b0JBQ0EsQUFDQTs7c0JBQ0E7bUJBQ0E7cUJBQ0E7MENBQ0E7cUJBQ0E7c0JBQ0E7c0NBQ0E7cUJBQ0E7b0JBQ0E7cURBQ0E7MkNBQ0E7QUFDQTs2Q0FDQTtXQUNBO3dCQUNBLEFBQ0E7O2FBQ0E7QUFDQTs7QUFDQTtnQ0FFQTt1QkFDQSxBQUNBOzttQ0FDQTtvQ0FDQTttRUFDQTswREFDQTtjQUNBO3lDQUNBO2dEQUNBO0FBQ0E7d0RBQ0E7Z0RBQ0E7QUFDQTtBQUNBOzhCQUNBOzZCQUNBOzZCQUNBO21DQUNBO2dPQUNBO2dDQUNBO0FBQ0E7NENBQ0E7dUJBQ0EsQUFDQTs7ZUFDQTs7MENBRUE7eUNBQ0E7dUNBQ0E7eUNBQ0E7QUFKQSxrREFLQTt5Q0FDQTt1REFDQTt1REFDQTt3Q0FDQTtxQkFDQTtBQUNBO21FQUNBO0FBQ0E7QUFDQTtnQ0FDQTtrRUFDQTtBQUNBLEFBQ0E7QUE3Q0E7O0FBOENBLHdCQUNBLEFBQ0E7OztBQzdFQTtBQUNBLEFBQ0E7O0FBQ0E7ZUFFQTtBQURBO0FBRUEsQUFDQSxBQUNBLEFBQ0E7Ozs7QUFDQSw2RUFDQTtrRUFDQTtpQ0FDQTt1QkFDQTt5REFDQTtBQUNBOztBQUNBLHVGQUNBO3FEQUNBO3lDQUNBO2dDQUNBO2dMQUNBO0FBQ0E7QUFDQSxBQUNBOzs7QUN6QkE7QUFDQSxBQUNBOztBQUNBO2VBRUE7QUFEQTtBQUVBLEFBQ0EsQUFDQTs7O0FBQ0EsMkJBQ0E7d0ZBQ0E7eUZBQ0E7d0ZBQ0E7b0ZBQ0E7b0ZBQ0EsQUFDQTs7bUJBQ0E7cUJBQ0E7c0JBQ0E7cUJBQ0E7aUJBQ0E7aUJBQ0EsQUFDQTs7cUJBQ0E7cUJBQ0E7eUJBQ0E7QUFDQTs7QUFDQTtxQ0FFQTtjQUNBO3FDQUNBOzBCQUNBOytCQUNBOzJFQUNBO2NBQ0E7aUJBQ0E7QUFDQTt1REFDQTsyQkFDQTt1QkFDQSxBQUNBOzs0Q0FDQTs0Q0FDQTtxQ0FDQTt3Q0FDQSxBQUNBOzttREFDQTsrQ0FDQTsrQ0FDQSxBQUNBOzsrQkFDQTtxQkFDQTtpQ0FDQTtxQkFDQTtxQ0FDQTtxQkFDQTtpQ0FDQTtxQkFDQTtBQUNBO2lCQUNBO0FBQ0EsQUFDQTtBQWxDQTs7QUFtQ0Esd0JBQ0EsQUFDQTs7O0FDbEVBO0FBQ0EsQUFDQTs7QUFDQTtlQUVBO0FBREE7QUFFQSxBQUNBLEFBQ0EsQUFDQTs7OztBQUNBLDhCQUNBO3VCQUNBLEFBQ0E7O29CQUNBO2FBQ0E7QUFDQTs7QUFDQTswQ0FFQTtzQkFDQSxBQUNBOzttQ0FDQSxBQUNBOzsrQ0FDQTtrQkFDQTs0Q0FDQTthQUNBO0FBQ0EsQUFDQTtBQVhBOztBQVlBLHdCQUNBLEFBQ0E7OztBQ2hDQTtBQUNBLEFBQ0E7O0FBQ0EsOEJBQ0E7O0FBQ0EsOENBQ0E7O0FBQ0EsNEJBQ0E7O0FBQ0EsNENBQ0E7O0FBQ0EsMkJBQ0E7O0FBQ0EsMkJBQ0E7O0FBQ0EsMEJBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0Esc0RBQ0E7O0FBQ0Esb0NBQ0E7O0FBQ0EsK0NBQ0EsQUFDQTs7O0FDekJBO0FBQ0EsQUFDQTs7QUFDQTtlQUVBO0FBREE7QUFFQSxzQkFDQTs7QUFDQSxrQ0FDQTs7QUFDQTtBQUNBO2NBRUE7b0NBQ0E7MEJBQ0E7QUFDQTtnREFDQTs2QkFDQTtBQUNBO29DQUNBOzBCQUNBOzRCQUNBO0FBQ0E7b0NBQ0E7aUNBQ0E7QUFDQSxBQUNBO0FBZkE7O0FBZ0JBLHNCQUNBLEFBQ0E7OztBQzlCQTtBQUNBLEFBQ0E7O0FBQ0E7ZUFFQTtBQURBO0FBRUEscUJBQ0E7O0FBQ0EsK0JBQ0E7O0FBQ0EsK0NBQ0E7O0FBQ0EsNEJBQ0E7O0FBQ0EsNENBQ0E7O0FBQ0EsMkJBQ0E7O0FBQ0EsMkNBQ0E7O0FBQ0EsMkJBQ0E7O0FBQ0EsMkNBQ0E7O0FBQ0Esa0NBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7QUFDQSx5QkFDQTs7QUFDQTtBQUNBO2NBRUE7b0NBQ0E7MEJBQ0E7QUFDQTs0Q0FDQTswQkFDQTsyQ0FDQTtvREFDQTs2QkFDQTtnREFDQTsrQ0FDQTs2Q0FDQTs0Q0FDQTtzSUFDQSxBQUNBOzttREFDQTtvREFDQTs2REFDQTtBQUNBO0FBQ0E7QUFDQTtvQ0FDQTtpQ0FDQTtBQUNBLEFBQ0E7QUF6QkE7O0FBMEJBLHFCQUNBLEFBQ0E7OztBQzdEQTtBQUNBLEFBQ0E7O0FBQ0E7ZUFFQTtBQURBO0FBRUE7QUFDQTtjQUVBO2VBQ0E7Z0RBQ0E7NkJBQ0E7QUFDQTtvQ0FDQTtpQ0FDQTtBQUNBO29DQUNBOzZCQUNBO0FBQ0EsQUFDQTtBQVpBOztBQWFBLHNCQUNBLEFBQ0E7OztBQ3ZCQTtBQUNBLEFBQ0E7O0FBQ0E7ZUFFQTtBQURBO0FBRUEsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQTs7Ozs7Ozs7Ozs7QUFDQSwwQkFDQTt5QkFDQTtBQUNBOztBQUNBLHFEQUNBO21EQUNBO2dDQUNBOztBQUNBLGlEQUNBO2dIQUNBO3FDQUNBO0FBQ0EsQUFDQTs7OERBQ0E7cUNBQ0E7QUFDQTs7QUFDQSxzREFDQTs4REFDQTtnQ0FDQTt5Q0FDQTtBQUNBO1dBQ0E7O0FBQ0EsdURBQ0E7bUJBQ0E7eUNBQ0E7OEJBQ0E7dUJBQ0E7QUFDQTtBQUNBOztBQUNBLHdCQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxBQUNBLEFBQ0E7OztBQzFEQTtBQUNBLEFBQ0E7O0FBQ0E7ZUFFQTtBQURBO0FBRUEsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSxzREFDQTs4QkFDQTt3QkFDQTthQUNBO0FBQ0E7O0FBQ0E7OEJBRUE7c0JBQ0EsQUFDQTs7OERBQ0E7dUZBQ0E7QUFDQTsrREFDQTtBQUNBOzREQUNBOzREQUNBO3VCQUNBO0FBQ0E7MERBQ0E7dUJBQ0EsQUFDQTs7OERBQ0E7Z0RBQ0E7dUNBQ0E7eURBQ0E7Z0NBQ0E7cURBQ0E7eUNBQ0E7QUFDQTtBQUNBO3NDQUNBO2lFQUNBO2tEQUNBO3lDQUNBOzJEQUNBO2tDQUNBO3VEQUNBOzJDQUNBO0FBQ0E7QUFDQTtBQUNBO3FEQUNBOytDQUNBO29HQUNBOzZDQUNBO3VHQUNBOzhCQUNBOzRGQUNBOzhCQUNBO2lHQUNBO0FBQ0E7QUFDQSxBQUNBO0FBL0NBOztBQWdEQSx3QkFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQUFDQSxBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgbG9va3VwID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nO1xuXG47KGZ1bmN0aW9uIChleHBvcnRzKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnID8gVWludDhBcnJheSA6IEFycmF5O1xuXG5cdHZhciBQTFVTID0gJysnLmNoYXJDb2RlQXQoMCk7XG5cdHZhciBTTEFTSCA9ICcvJy5jaGFyQ29kZUF0KDApO1xuXHR2YXIgTlVNQkVSID0gJzAnLmNoYXJDb2RlQXQoMCk7XG5cdHZhciBMT1dFUiA9ICdhJy5jaGFyQ29kZUF0KDApO1xuXHR2YXIgVVBQRVIgPSAnQScuY2hhckNvZGVBdCgwKTtcblx0dmFyIFBMVVNfVVJMX1NBRkUgPSAnLScuY2hhckNvZGVBdCgwKTtcblx0dmFyIFNMQVNIX1VSTF9TQUZFID0gJ18nLmNoYXJDb2RlQXQoMCk7XG5cblx0ZnVuY3Rpb24gZGVjb2RlKGVsdCkge1xuXHRcdHZhciBjb2RlID0gZWx0LmNoYXJDb2RlQXQoMCk7XG5cdFx0aWYgKGNvZGUgPT09IFBMVVMgfHwgY29kZSA9PT0gUExVU19VUkxfU0FGRSkgcmV0dXJuIDYyOyAvLyAnKydcblx0XHRpZiAoY29kZSA9PT0gU0xBU0ggfHwgY29kZSA9PT0gU0xBU0hfVVJMX1NBRkUpIHJldHVybiA2MzsgLy8gJy8nXG5cdFx0aWYgKGNvZGUgPCBOVU1CRVIpIHJldHVybiAtMTsgLy9ubyBtYXRjaFxuXHRcdGlmIChjb2RlIDwgTlVNQkVSICsgMTApIHJldHVybiBjb2RlIC0gTlVNQkVSICsgMjYgKyAyNjtcblx0XHRpZiAoY29kZSA8IFVQUEVSICsgMjYpIHJldHVybiBjb2RlIC0gVVBQRVI7XG5cdFx0aWYgKGNvZGUgPCBMT1dFUiArIDI2KSByZXR1cm4gY29kZSAtIExPV0VSICsgMjY7XG5cdH1cblxuXHRmdW5jdGlvbiBiNjRUb0J5dGVBcnJheShiNjQpIHtcblx0XHR2YXIgaSwgaiwgbCwgdG1wLCBwbGFjZUhvbGRlcnMsIGFycjtcblxuXHRcdGlmIChiNjQubGVuZ3RoICUgNCA+IDApIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCcpO1xuXHRcdH1cblxuXHRcdC8vIHRoZSBudW1iZXIgb2YgZXF1YWwgc2lnbnMgKHBsYWNlIGhvbGRlcnMpXG5cdFx0Ly8gaWYgdGhlcmUgYXJlIHR3byBwbGFjZWhvbGRlcnMsIHRoYW4gdGhlIHR3byBjaGFyYWN0ZXJzIGJlZm9yZSBpdFxuXHRcdC8vIHJlcHJlc2VudCBvbmUgYnl0ZVxuXHRcdC8vIGlmIHRoZXJlIGlzIG9ubHkgb25lLCB0aGVuIHRoZSB0aHJlZSBjaGFyYWN0ZXJzIGJlZm9yZSBpdCByZXByZXNlbnQgMiBieXRlc1xuXHRcdC8vIHRoaXMgaXMganVzdCBhIGNoZWFwIGhhY2sgdG8gbm90IGRvIGluZGV4T2YgdHdpY2Vcblx0XHR2YXIgbGVuID0gYjY0Lmxlbmd0aDtcblx0XHRwbGFjZUhvbGRlcnMgPSAnPScgPT09IGI2NC5jaGFyQXQobGVuIC0gMikgPyAyIDogJz0nID09PSBiNjQuY2hhckF0KGxlbiAtIDEpID8gMSA6IDA7XG5cblx0XHQvLyBiYXNlNjQgaXMgNC8zICsgdXAgdG8gdHdvIGNoYXJhY3RlcnMgb2YgdGhlIG9yaWdpbmFsIGRhdGFcblx0XHRhcnIgPSBuZXcgQXJyKGI2NC5sZW5ndGggKiAzIC8gNCAtIHBsYWNlSG9sZGVycyk7XG5cblx0XHQvLyBpZiB0aGVyZSBhcmUgcGxhY2Vob2xkZXJzLCBvbmx5IGdldCB1cCB0byB0aGUgbGFzdCBjb21wbGV0ZSA0IGNoYXJzXG5cdFx0bCA9IHBsYWNlSG9sZGVycyA+IDAgPyBiNjQubGVuZ3RoIC0gNCA6IGI2NC5sZW5ndGg7XG5cblx0XHR2YXIgTCA9IDA7XG5cblx0XHRmdW5jdGlvbiBwdXNoKHYpIHtcblx0XHRcdGFycltMKytdID0gdjtcblx0XHR9XG5cblx0XHRmb3IgKGkgPSAwLCBqID0gMDsgaSA8IGw7IGkgKz0gNCwgaiArPSAzKSB7XG5cdFx0XHR0bXAgPSBkZWNvZGUoYjY0LmNoYXJBdChpKSkgPDwgMTggfCBkZWNvZGUoYjY0LmNoYXJBdChpICsgMSkpIDw8IDEyIHwgZGVjb2RlKGI2NC5jaGFyQXQoaSArIDIpKSA8PCA2IHwgZGVjb2RlKGI2NC5jaGFyQXQoaSArIDMpKTtcblx0XHRcdHB1c2goKHRtcCAmIDB4RkYwMDAwKSA+PiAxNik7XG5cdFx0XHRwdXNoKCh0bXAgJiAweEZGMDApID4+IDgpO1xuXHRcdFx0cHVzaCh0bXAgJiAweEZGKTtcblx0XHR9XG5cblx0XHRpZiAocGxhY2VIb2xkZXJzID09PSAyKSB7XG5cdFx0XHR0bXAgPSBkZWNvZGUoYjY0LmNoYXJBdChpKSkgPDwgMiB8IGRlY29kZShiNjQuY2hhckF0KGkgKyAxKSkgPj4gNDtcblx0XHRcdHB1c2godG1wICYgMHhGRik7XG5cdFx0fSBlbHNlIGlmIChwbGFjZUhvbGRlcnMgPT09IDEpIHtcblx0XHRcdHRtcCA9IGRlY29kZShiNjQuY2hhckF0KGkpKSA8PCAxMCB8IGRlY29kZShiNjQuY2hhckF0KGkgKyAxKSkgPDwgNCB8IGRlY29kZShiNjQuY2hhckF0KGkgKyAyKSkgPj4gMjtcblx0XHRcdHB1c2godG1wID4+IDggJiAweEZGKTtcblx0XHRcdHB1c2godG1wICYgMHhGRik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGFycjtcblx0fVxuXG5cdGZ1bmN0aW9uIHVpbnQ4VG9CYXNlNjQodWludDgpIHtcblx0XHR2YXIgaSxcblx0XHQgICAgZXh0cmFCeXRlcyA9IHVpbnQ4Lmxlbmd0aCAlIDMsXG5cdFx0ICAgIC8vIGlmIHdlIGhhdmUgMSBieXRlIGxlZnQsIHBhZCAyIGJ5dGVzXG5cdFx0b3V0cHV0ID0gXCJcIixcblx0XHQgICAgdGVtcCxcblx0XHQgICAgbGVuZ3RoO1xuXG5cdFx0ZnVuY3Rpb24gZW5jb2RlKG51bSkge1xuXHRcdFx0cmV0dXJuIGxvb2t1cC5jaGFyQXQobnVtKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQobnVtKSB7XG5cdFx0XHRyZXR1cm4gZW5jb2RlKG51bSA+PiAxOCAmIDB4M0YpICsgZW5jb2RlKG51bSA+PiAxMiAmIDB4M0YpICsgZW5jb2RlKG51bSA+PiA2ICYgMHgzRikgKyBlbmNvZGUobnVtICYgMHgzRik7XG5cdFx0fVxuXG5cdFx0Ly8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuXHRcdGZvciAoaSA9IDAsIGxlbmd0aCA9IHVpbnQ4Lmxlbmd0aCAtIGV4dHJhQnl0ZXM7IGkgPCBsZW5ndGg7IGkgKz0gMykge1xuXHRcdFx0dGVtcCA9ICh1aW50OFtpXSA8PCAxNikgKyAodWludDhbaSArIDFdIDw8IDgpICsgdWludDhbaSArIDJdO1xuXHRcdFx0b3V0cHV0ICs9IHRyaXBsZXRUb0Jhc2U2NCh0ZW1wKTtcblx0XHR9XG5cblx0XHQvLyBwYWQgdGhlIGVuZCB3aXRoIHplcm9zLCBidXQgbWFrZSBzdXJlIHRvIG5vdCBmb3JnZXQgdGhlIGV4dHJhIGJ5dGVzXG5cdFx0c3dpdGNoIChleHRyYUJ5dGVzKSB7XG5cdFx0XHRjYXNlIDE6XG5cdFx0XHRcdHRlbXAgPSB1aW50OFt1aW50OC5sZW5ndGggLSAxXTtcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSh0ZW1wID4+IDIpO1xuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKHRlbXAgPDwgNCAmIDB4M0YpO1xuXHRcdFx0XHRvdXRwdXQgKz0gJz09Jztcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDI6XG5cdFx0XHRcdHRlbXAgPSAodWludDhbdWludDgubGVuZ3RoIC0gMl0gPDwgOCkgKyB1aW50OFt1aW50OC5sZW5ndGggLSAxXTtcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSh0ZW1wID4+IDEwKTtcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSh0ZW1wID4+IDQgJiAweDNGKTtcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSh0ZW1wIDw8IDIgJiAweDNGKTtcblx0XHRcdFx0b3V0cHV0ICs9ICc9Jztcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG91dHB1dDtcblx0fVxuXG5cdGV4cG9ydHMudG9CeXRlQXJyYXkgPSBiNjRUb0J5dGVBcnJheTtcblx0ZXhwb3J0cy5mcm9tQnl0ZUFycmF5ID0gdWludDhUb0Jhc2U2NDtcbn0pKHR5cGVvZiBleHBvcnRzID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZC5iYXNlNjRqcyA9IHt9IDogZXhwb3J0cyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbUkyTkM1cWN5SmRMQ0p1WVcxbGN5STZXeUpzYjI5cmRYQWlMQ0psZUhCdmNuUnpJaXdpUVhKeUlpd2lWV2x1ZERoQmNuSmhlU0lzSWtGeWNtRjVJaXdpVUV4VlV5SXNJbU5vWVhKRGIyUmxRWFFpTENKVFRFRlRTQ0lzSWs1VlRVSkZVaUlzSWt4UFYwVlNJaXdpVlZCUVJWSWlMQ0pRVEZWVFgxVlNURjlUUVVaRklpd2lVMHhCVTBoZlZWSk1YMU5CUmtVaUxDSmtaV052WkdVaUxDSmxiSFFpTENKamIyUmxJaXdpWWpZMFZHOUNlWFJsUVhKeVlYa2lMQ0ppTmpRaUxDSnBJaXdpYWlJc0ltd2lMQ0owYlhBaUxDSndiR0ZqWlVodmJHUmxjbk1pTENKaGNuSWlMQ0pzWlc1bmRHZ2lMQ0pGY25KdmNpSXNJbXhsYmlJc0ltTm9ZWEpCZENJc0lrd2lMQ0p3ZFhOb0lpd2lkaUlzSW5WcGJuUTRWRzlDWVhObE5qUWlMQ0oxYVc1ME9DSXNJbVY0ZEhKaFFubDBaWE1pTENKdmRYUndkWFFpTENKMFpXMXdJaXdpWlc1amIyUmxJaXdpYm5WdElpd2lkSEpwY0d4bGRGUnZRbUZ6WlRZMElpd2lkRzlDZVhSbFFYSnlZWGtpTENKbWNtOXRRbmwwWlVGeWNtRjVJaXdpWW1GelpUWTBhbk1pWFN3aWJXRndjR2x1WjNNaU9pSTdPMEZCUVVFc1NVRkJTVUVzVTBGQlV5eHJSVUZCWWpzN1FVRkZRU3hEUVVGRkxGZEJRVlZETEU5QlFWWXNSVUZCYlVJN1FVRkRjRUk3TzBGQlJVTXNTMEZCU1VNc1RVRkJUeXhQUVVGUFF5eFZRVUZRTEV0QlFYTkNMRmRCUVhaQ0xFZEJRMDVCTEZWQlJFMHNSMEZGVGtNc1MwRkdTanM3UVVGSlJDeExRVUZKUXl4UFFVRlRMRWxCUVVsRExGVkJRVW9zUTBGQlpTeERRVUZtTEVOQlFXSTdRVUZEUVN4TFFVRkpReXhSUVVGVExFbEJRVWxFTEZWQlFVb3NRMEZCWlN4RFFVRm1MRU5CUVdJN1FVRkRRU3hMUVVGSlJTeFRRVUZUTEVsQlFVbEdMRlZCUVVvc1EwRkJaU3hEUVVGbUxFTkJRV0k3UVVGRFFTeExRVUZKUnl4UlFVRlRMRWxCUVVsSUxGVkJRVW9zUTBGQlpTeERRVUZtTEVOQlFXSTdRVUZEUVN4TFFVRkpTU3hSUVVGVExFbEJRVWxLTEZWQlFVb3NRMEZCWlN4RFFVRm1MRU5CUVdJN1FVRkRRU3hMUVVGSlN5eG5Ra0ZCWjBJc1NVRkJTVXdzVlVGQlNpeERRVUZsTEVOQlFXWXNRMEZCY0VJN1FVRkRRU3hMUVVGSlRTeHBRa0ZCYVVJc1NVRkJTVTRzVlVGQlNpeERRVUZsTEVOQlFXWXNRMEZCY2tJN08wRkJSVUVzVlVGQlUwOHNUVUZCVkN4RFFVRnBRa01zUjBGQmFrSXNSVUZCYzBJN1FVRkRja0lzVFVGQlNVTXNUMEZCVDBRc1NVRkJTVklzVlVGQlNpeERRVUZsTEVOQlFXWXNRMEZCV0R0QlFVTkJMRTFCUVVsVExGTkJRVk5XTEVsQlFWUXNTVUZEUVZVc1UwRkJVMG9zWVVGRVlpeEZRVVZETEU5QlFVOHNSVUZCVUN4RFFVcHZRaXhEUVVsV08wRkJRMWdzVFVGQlNVa3NVMEZCVTFJc1MwRkJWQ3hKUVVOQlVTeFRRVUZUU0N4alFVUmlMRVZCUlVNc1QwRkJUeXhGUVVGUUxFTkJVRzlDTEVOQlQxWTdRVUZEV0N4TlFVRkpSeXhQUVVGUFVDeE5RVUZZTEVWQlEwTXNUMEZCVHl4RFFVRkRMRU5CUVZJc1EwRlViMElzUTBGVFZqdEJRVU5ZTEUxQlFVbFBMRTlCUVU5UUxGTkJRVk1zUlVGQmNFSXNSVUZEUXl4UFFVRlBUeXhQUVVGUFVDeE5RVUZRTEVkQlFXZENMRVZCUVdoQ0xFZEJRWEZDTEVWQlFUVkNPMEZCUTBRc1RVRkJTVThzVDBGQlQwd3NVVUZCVVN4RlFVRnVRaXhGUVVORExFOUJRVTlMTEU5QlFVOU1MRXRCUVdRN1FVRkRSQ3hOUVVGSlN5eFBRVUZQVGl4UlFVRlJMRVZCUVc1Q0xFVkJRME1zVDBGQlQwMHNUMEZCVDA0c1MwRkJVQ3hIUVVGbExFVkJRWFJDTzBGQlEwUTdPMEZCUlVRc1ZVRkJVMDhzWTBGQlZDeERRVUY1UWtNc1IwRkJla0lzUlVGQk9FSTdRVUZETjBJc1RVRkJTVU1zUTBGQlNpeEZRVUZQUXl4RFFVRlFMRVZCUVZWRExFTkJRVllzUlVGQllVTXNSMEZCWWl4RlFVRnJRa01zV1VGQmJFSXNSVUZCWjBORExFZEJRV2hET3p0QlFVVkJMRTFCUVVsT0xFbEJRVWxQTEUxQlFVb3NSMEZCWVN4RFFVRmlMRWRCUVdsQ0xFTkJRWEpDTEVWQlFYZENPMEZCUTNaQ0xGTkJRVTBzU1VGQlNVTXNTMEZCU2l4RFFVRlZMR2RFUVVGV0xFTkJRVTQ3UVVGRFFUczdRVUZGUkR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVFVGQlNVTXNUVUZCVFZRc1NVRkJTVThzVFVGQlpEdEJRVU5CUml4cFFrRkJaU3hSUVVGUlRDeEpRVUZKVlN4TlFVRktMRU5CUVZkRUxFMUJRVTBzUTBGQmFrSXNRMEZCVWl4SFFVRTRRaXhEUVVFNVFpeEhRVUZyUXl4UlFVRlJWQ3hKUVVGSlZTeE5RVUZLTEVOQlFWZEVMRTFCUVUwc1EwRkJha0lzUTBGQlVpeEhRVUU0UWl4RFFVRTVRaXhIUVVGclF5eERRVUZ1UmpzN1FVRkZRVHRCUVVOQlNDeFJRVUZOTEVsQlFVbHlRaXhIUVVGS0xFTkJRVkZsTEVsQlFVbFBMRTFCUVVvc1IwRkJZU3hEUVVGaUxFZEJRV2xDTEVOQlFXcENMRWRCUVhGQ1JpeFpRVUUzUWl4RFFVRk9PenRCUVVWQk8wRkJRMEZHTEUxQlFVbEZMR1ZCUVdVc1EwRkJaaXhIUVVGdFFrd3NTVUZCU1U4c1RVRkJTaXhIUVVGaExFTkJRV2hETEVkQlFXOURVQ3hKUVVGSlR5eE5RVUUxUXpzN1FVRkZRU3hOUVVGSlNTeEpRVUZKTEVOQlFWSTdPMEZCUlVFc1YwRkJVME1zU1VGQlZDeERRVUZsUXl4RFFVRm1MRVZCUVd0Q08wRkJRMnBDVUN4UFFVRkpTeXhIUVVGS0xFbEJRVmRGTEVOQlFWZzdRVUZEUVRzN1FVRkZSQ3hQUVVGTFdpeEpRVUZKTEVOQlFVb3NSVUZCVDBNc1NVRkJTU3hEUVVGb1FpeEZRVUZ0UWtRc1NVRkJTVVVzUTBGQmRrSXNSVUZCTUVKR0xFdEJRVXNzUTBGQlRDeEZRVUZSUXl4TFFVRkxMRU5CUVhaRExFVkJRVEJETzBGQlEzcERSU3hUUVVGUFVpeFBRVUZQU1N4SlFVRkpWU3hOUVVGS0xFTkJRVmRVTEVOQlFWZ3NRMEZCVUN4TFFVRjVRaXhGUVVFeFFpeEhRVUZwUTB3c1QwRkJUMGtzU1VGQlNWVXNUVUZCU2l4RFFVRlhWQ3hKUVVGSkxFTkJRV1lzUTBGQlVDeExRVUUyUWl4RlFVRTVSQ3hIUVVGeFJVd3NUMEZCVDBrc1NVRkJTVlVzVFVGQlNpeERRVUZYVkN4SlFVRkpMRU5CUVdZc1EwRkJVQ3hMUVVFMlFpeERRVUZzUnl4SFFVRjFSMHdzVDBGQlQwa3NTVUZCU1ZVc1RVRkJTaXhEUVVGWFZDeEpRVUZKTEVOQlFXWXNRMEZCVUN4RFFVRTNSenRCUVVOQlZ5eFJRVUZMTEVOQlFVTlNMRTFCUVUwc1VVRkJVQ3hMUVVGdlFpeEZRVUY2UWp0QlFVTkJVU3hSUVVGTExFTkJRVU5TTEUxQlFVMHNUVUZCVUN4TFFVRnJRaXhEUVVGMlFqdEJRVU5CVVN4UlFVRkxVaXhOUVVGTkxFbEJRVmc3UVVGRFFUczdRVUZGUkN4TlFVRkpReXhwUWtGQmFVSXNRMEZCY2tJc1JVRkJkMEk3UVVGRGRrSkVMRk5CUVU5U0xFOUJRVTlKTEVsQlFVbFZMRTFCUVVvc1EwRkJWMVFzUTBGQldDeERRVUZRTEV0QlFYbENMRU5CUVRGQ0xFZEJRV2REVEN4UFFVRlBTU3hKUVVGSlZTeE5RVUZLTEVOQlFWZFVMRWxCUVVrc1EwRkJaaXhEUVVGUUxFdEJRVFpDTEVOQlFXNUZPMEZCUTBGWExGRkJRVXRTTEUxQlFVMHNTVUZCV0R0QlFVTkJMRWRCU0VRc1RVRkhUeXhKUVVGSlF5eHBRa0ZCYVVJc1EwRkJja0lzUlVGQmQwSTdRVUZET1VKRUxGTkJRVTlTTEU5QlFVOUpMRWxCUVVsVkxFMUJRVW9zUTBGQlYxUXNRMEZCV0N4RFFVRlFMRXRCUVhsQ0xFVkJRVEZDTEVkQlFXbERUQ3hQUVVGUFNTeEpRVUZKVlN4TlFVRktMRU5CUVZkVUxFbEJRVWtzUTBGQlppeERRVUZRTEV0QlFUWkNMRU5CUVRsRUxFZEJRVzlGVEN4UFFVRlBTU3hKUVVGSlZTeE5RVUZLTEVOQlFWZFVMRWxCUVVrc1EwRkJaaXhEUVVGUUxFdEJRVFpDTEVOQlFYWkhPMEZCUTBGWExGRkJRVTFTTEU5QlFVOHNRMEZCVWl4SFFVRmhMRWxCUVd4Q08wRkJRMEZSTEZGQlFVdFNMRTFCUVUwc1NVRkJXRHRCUVVOQk96dEJRVVZFTEZOQlFVOUZMRWRCUVZBN1FVRkRRVHM3UVVGRlJDeFZRVUZUVVN4aFFVRlVMRU5CUVhkQ1F5eExRVUY0UWl4RlFVRXJRanRCUVVNNVFpeE5RVUZKWkN4RFFVRktPMEZCUVVFc1RVRkRRMlVzWVVGQllVUXNUVUZCVFZJc1RVRkJUaXhIUVVGbExFTkJSRGRDTzBGQlFVRXNUVUZEWjBNN1FVRkRMMEpWTEZkQlFWTXNSVUZHVmp0QlFVRkJMRTFCUjBORExFbEJTRVE3UVVGQlFTeE5RVWRQV0N4TlFVaFFPenRCUVV0QkxGZEJRVk5aTEUxQlFWUXNRMEZCYVVKRExFZEJRV3BDTEVWQlFYTkNPMEZCUTNKQ0xGVkJRVTl5UXl4UFFVRlBNa0lzVFVGQlVDeERRVUZqVlN4SFFVRmtMRU5CUVZBN1FVRkRRVHM3UVVGRlJDeFhRVUZUUXl4bFFVRlVMRU5CUVRCQ1JDeEhRVUV4UWl4RlFVRXJRanRCUVVNNVFpeFZRVUZQUkN4UFFVRlBReXhQUVVGUExFVkJRVkFzUjBGQldTeEpRVUZ1UWl4SlFVRXlRa1FzVDBGQlQwTXNUMEZCVHl4RlFVRlFMRWRCUVZrc1NVRkJia0lzUTBGQk0wSXNSMEZCYzBSRUxFOUJRVTlETEU5QlFVOHNRMEZCVUN4SFFVRlhMRWxCUVd4Q0xFTkJRWFJFTEVkQlFXZEdSQ3hQUVVGUFF5eE5RVUZOTEVsQlFXSXNRMEZCZGtZN1FVRkRRVHM3UVVGRlJEdEJRVU5CTEU5QlFVdHVRaXhKUVVGSkxFTkJRVW9zUlVGQlQwMHNVMEZCVTFFc1RVRkJUVklzVFVGQlRpeEhRVUZsVXl4VlFVRndReXhGUVVGblJHWXNTVUZCU1Uwc1RVRkJjRVFzUlVGQk5FUk9MRXRCUVVzc1EwRkJha1VzUlVGQmIwVTdRVUZEYmtWcFFpeFZRVUZQTEVOQlFVTklMRTFCUVUxa0xFTkJRVTRzUzBGQldTeEZRVUZpTEV0QlFXOUNZeXhOUVVGTlpDeEpRVUZKTEVOQlFWWXNTMEZCWjBJc1EwRkJjRU1zU1VGQk1FTmpMRTFCUVUxa0xFbEJRVWtzUTBGQlZpeERRVUZxUkR0QlFVTkJaMElzWVVGQlZVa3NaMEpCUVdkQ1NDeEpRVUZvUWl4RFFVRldPMEZCUTBFN08wRkJSVVE3UVVGRFFTeFZRVUZSUml4VlFVRlNPMEZCUTBNc1VVRkJTeXhEUVVGTU8wRkJRME5GTEZkQlFVOUlMRTFCUVUxQkxFMUJRVTFTTEUxQlFVNHNSMEZCWlN4RFFVRnlRaXhEUVVGUU8wRkJRMEZWTEdOQlFWVkZMRTlCUVU5RUxGRkJRVkVzUTBGQlppeERRVUZXTzBGQlEwRkVMR05CUVZWRkxFOUJRVkZFTEZGQlFWRXNRMEZCVkN4SFFVRmpMRWxCUVhKQ0xFTkJRVlk3UVVGRFFVUXNZMEZCVlN4SlFVRldPMEZCUTBFN1FVRkRSQ3hSUVVGTExFTkJRVXc3UVVGRFEwTXNWMEZCVHl4RFFVRkRTQ3hOUVVGTlFTeE5RVUZOVWl4TlFVRk9MRWRCUVdVc1EwRkJja0lzUzBGQk1rSXNRMEZCTlVJc1NVRkJhME5STEUxQlFVMUJMRTFCUVUxU0xFMUJRVTRzUjBGQlpTeERRVUZ5UWl4RFFVRjZRenRCUVVOQlZTeGpRVUZWUlN4UFFVRlBSQ3hSUVVGUkxFVkJRV1lzUTBGQlZqdEJRVU5CUkN4alFVRlZSU3hQUVVGUlJDeFJRVUZSTEVOQlFWUXNSMEZCWXl4SlFVRnlRaXhEUVVGV08wRkJRMEZFTEdOQlFWVkZMRTlCUVZGRUxGRkJRVkVzUTBGQlZDeEhRVUZqTEVsQlFYSkNMRU5CUVZZN1FVRkRRVVFzWTBGQlZTeEhRVUZXTzBGQlEwRTdRVUZpUmpzN1FVRm5Ra0VzVTBGQlQwRXNUVUZCVUR0QlFVTkJPenRCUVVWRWFrTXNVMEZCVVhORExGZEJRVklzUjBGQmMwSjJRaXhqUVVGMFFqdEJRVU5CWml4VFFVRlJkVU1zWVVGQlVpeEhRVUYzUWxRc1lVRkJlRUk3UVVGRFFTeERRWHBJUXl4RlFYbElRU3hQUVVGUE9VSXNUMEZCVUN4TFFVRnRRaXhYUVVGdVFpeEhRVUZyUXl4VlFVRkxkME1zVVVGQlRDeEhRVUZuUWl4RlFVRnNSQ3hIUVVGM1JIaERMRTlCZWtoNFJDeERRVUZFSWl3aVptbHNaU0k2SW1JMk5DNXFjeUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSW5aaGNpQnNiMjlyZFhBZ1BTQW5RVUpEUkVWR1IwaEpTa3RNVFU1UFVGRlNVMVJWVmxkWVdWcGhZbU5rWldabmFHbHFhMnh0Ym05d2NYSnpkSFYyZDNoNWVqQXhNak0wTlRZM09Ea3JMeWM3WEc1Y2Jqc29ablZ1WTNScGIyNGdLR1Y0Y0c5eWRITXBJSHRjYmx4MEozVnpaU0J6ZEhKcFkzUW5PMXh1WEc0Z0lIWmhjaUJCY25JZ1BTQW9kSGx3Wlc5bUlGVnBiblE0UVhKeVlYa2dJVDA5SUNkMWJtUmxabWx1WldRbktWeHVJQ0FnSUQ4Z1ZXbHVkRGhCY25KaGVWeHVJQ0FnSURvZ1FYSnlZWGxjYmx4dVhIUjJZWElnVUV4VlV5QWdJRDBnSnlzbkxtTm9ZWEpEYjJSbFFYUW9NQ2xjYmx4MGRtRnlJRk5NUVZOSUlDQTlJQ2N2Snk1amFHRnlRMjlrWlVGMEtEQXBYRzVjZEhaaGNpQk9WVTFDUlZJZ1BTQW5NQ2N1WTJoaGNrTnZaR1ZCZENnd0tWeHVYSFIyWVhJZ1RFOVhSVklnSUQwZ0oyRW5MbU5vWVhKRGIyUmxRWFFvTUNsY2JseDBkbUZ5SUZWUVVFVlNJQ0E5SUNkQkp5NWphR0Z5UTI5a1pVRjBLREFwWEc1Y2RIWmhjaUJRVEZWVFgxVlNURjlUUVVaRklEMGdKeTBuTG1Ob1lYSkRiMlJsUVhRb01DbGNibHgwZG1GeUlGTk1RVk5JWDFWU1RGOVRRVVpGSUQwZ0oxOG5MbU5vWVhKRGIyUmxRWFFvTUNsY2JseHVYSFJtZFc1amRHbHZiaUJrWldOdlpHVWdLR1ZzZENrZ2UxeHVYSFJjZEhaaGNpQmpiMlJsSUQwZ1pXeDBMbU5vWVhKRGIyUmxRWFFvTUNsY2JseDBYSFJwWmlBb1kyOWtaU0E5UFQwZ1VFeFZVeUI4ZkZ4dVhIUmNkQ0FnSUNCamIyUmxJRDA5UFNCUVRGVlRYMVZTVEY5VFFVWkZLVnh1WEhSY2RGeDBjbVYwZFhKdUlEWXlJQzh2SUNjckoxeHVYSFJjZEdsbUlDaGpiMlJsSUQwOVBTQlRURUZUU0NCOGZGeHVYSFJjZENBZ0lDQmpiMlJsSUQwOVBTQlRURUZUU0Y5VlVreGZVMEZHUlNsY2JseDBYSFJjZEhKbGRIVnliaUEyTXlBdkx5QW5MeWRjYmx4MFhIUnBaaUFvWTI5a1pTQThJRTVWVFVKRlVpbGNibHgwWEhSY2RISmxkSFZ5YmlBdE1TQXZMMjV2SUcxaGRHTm9YRzVjZEZ4MGFXWWdLR052WkdVZ1BDQk9WVTFDUlZJZ0t5QXhNQ2xjYmx4MFhIUmNkSEpsZEhWeWJpQmpiMlJsSUMwZ1RsVk5Ra1ZTSUNzZ01qWWdLeUF5Tmx4dVhIUmNkR2xtSUNoamIyUmxJRHdnVlZCUVJWSWdLeUF5TmlsY2JseDBYSFJjZEhKbGRIVnliaUJqYjJSbElDMGdWVkJRUlZKY2JseDBYSFJwWmlBb1kyOWtaU0E4SUV4UFYwVlNJQ3NnTWpZcFhHNWNkRngwWEhSeVpYUjFjbTRnWTI5a1pTQXRJRXhQVjBWU0lDc2dNalpjYmx4MGZWeHVYRzVjZEdaMWJtTjBhVzl1SUdJMk5GUnZRbmwwWlVGeWNtRjVJQ2hpTmpRcElIdGNibHgwWEhSMllYSWdhU3dnYWl3Z2JDd2dkRzF3TENCd2JHRmpaVWh2YkdSbGNuTXNJR0Z5Y2x4dVhHNWNkRngwYVdZZ0tHSTJOQzVzWlc1bmRHZ2dKU0EwSUQ0Z01Da2dlMXh1WEhSY2RGeDBkR2h5YjNjZ2JtVjNJRVZ5Y205eUtDZEpiblpoYkdsa0lITjBjbWx1Wnk0Z1RHVnVaM1JvSUcxMWMzUWdZbVVnWVNCdGRXeDBhWEJzWlNCdlppQTBKeWxjYmx4MFhIUjlYRzVjYmx4MFhIUXZMeUIwYUdVZ2JuVnRZbVZ5SUc5bUlHVnhkV0ZzSUhOcFoyNXpJQ2h3YkdGalpTQm9iMnhrWlhKektWeHVYSFJjZEM4dklHbG1JSFJvWlhKbElHRnlaU0IwZDI4Z2NHeGhZMlZvYjJ4a1pYSnpMQ0IwYUdGdUlIUm9aU0IwZDI4Z1kyaGhjbUZqZEdWeWN5QmlaV1p2Y21VZ2FYUmNibHgwWEhRdkx5QnlaWEJ5WlhObGJuUWdiMjVsSUdKNWRHVmNibHgwWEhRdkx5QnBaaUIwYUdWeVpTQnBjeUJ2Ym14NUlHOXVaU3dnZEdobGJpQjBhR1VnZEdoeVpXVWdZMmhoY21GamRHVnljeUJpWldadmNtVWdhWFFnY21Wd2NtVnpaVzUwSURJZ1lubDBaWE5jYmx4MFhIUXZMeUIwYUdseklHbHpJR3AxYzNRZ1lTQmphR1ZoY0NCb1lXTnJJSFJ2SUc1dmRDQmtieUJwYm1SbGVFOW1JSFIzYVdObFhHNWNkRngwZG1GeUlHeGxiaUE5SUdJMk5DNXNaVzVuZEdoY2JseDBYSFJ3YkdGalpVaHZiR1JsY25NZ1BTQW5QU2NnUFQwOUlHSTJOQzVqYUdGeVFYUW9iR1Z1SUMwZ01pa2dQeUF5SURvZ0p6MG5JRDA5UFNCaU5qUXVZMmhoY2tGMEtHeGxiaUF0SURFcElEOGdNU0E2SURCY2JseHVYSFJjZEM4dklHSmhjMlUyTkNCcGN5QTBMek1nS3lCMWNDQjBieUIwZDI4Z1kyaGhjbUZqZEdWeWN5QnZaaUIwYUdVZ2IzSnBaMmx1WVd3Z1pHRjBZVnh1WEhSY2RHRnljaUE5SUc1bGR5QkJjbklvWWpZMExteGxibWQwYUNBcUlETWdMeUEwSUMwZ2NHeGhZMlZJYjJ4a1pYSnpLVnh1WEc1Y2RGeDBMeThnYVdZZ2RHaGxjbVVnWVhKbElIQnNZV05sYUc5c1pHVnljeXdnYjI1c2VTQm5aWFFnZFhBZ2RHOGdkR2hsSUd4aGMzUWdZMjl0Y0d4bGRHVWdOQ0JqYUdGeWMxeHVYSFJjZEd3Z1BTQndiR0ZqWlVodmJHUmxjbk1nUGlBd0lEOGdZalkwTG14bGJtZDBhQ0F0SURRZ09pQmlOalF1YkdWdVozUm9YRzVjYmx4MFhIUjJZWElnVENBOUlEQmNibHh1WEhSY2RHWjFibU4wYVc5dUlIQjFjMmdnS0hZcElIdGNibHgwWEhSY2RHRnljbHRNS3l0ZElEMGdkbHh1WEhSY2RIMWNibHh1WEhSY2RHWnZjaUFvYVNBOUlEQXNJR29nUFNBd095QnBJRHdnYkRzZ2FTQXJQU0EwTENCcUlDczlJRE1wSUh0Y2JseDBYSFJjZEhSdGNDQTlJQ2hrWldOdlpHVW9ZalkwTG1Ob1lYSkJkQ2hwS1NrZ1BEd2dNVGdwSUh3Z0tHUmxZMjlrWlNoaU5qUXVZMmhoY2tGMEtHa2dLeUF4S1NrZ1BEd2dNVElwSUh3Z0tHUmxZMjlrWlNoaU5qUXVZMmhoY2tGMEtHa2dLeUF5S1NrZ1BEd2dOaWtnZkNCa1pXTnZaR1VvWWpZMExtTm9ZWEpCZENocElDc2dNeWtwWEc1Y2RGeDBYSFJ3ZFhOb0tDaDBiWEFnSmlBd2VFWkdNREF3TUNrZ1BqNGdNVFlwWEc1Y2RGeDBYSFJ3ZFhOb0tDaDBiWEFnSmlBd2VFWkdNREFwSUQ0K0lEZ3BYRzVjZEZ4MFhIUndkWE5vS0hSdGNDQW1JREI0UmtZcFhHNWNkRngwZlZ4dVhHNWNkRngwYVdZZ0tIQnNZV05sU0c5c1pHVnljeUE5UFQwZ01pa2dlMXh1WEhSY2RGeDBkRzF3SUQwZ0tHUmxZMjlrWlNoaU5qUXVZMmhoY2tGMEtHa3BLU0E4UENBeUtTQjhJQ2hrWldOdlpHVW9ZalkwTG1Ob1lYSkJkQ2hwSUNzZ01Ta3BJRDQrSURRcFhHNWNkRngwWEhSd2RYTm9LSFJ0Y0NBbUlEQjRSa1lwWEc1Y2RGeDBmU0JsYkhObElHbG1JQ2h3YkdGalpVaHZiR1JsY25NZ1BUMDlJREVwSUh0Y2JseDBYSFJjZEhSdGNDQTlJQ2hrWldOdlpHVW9ZalkwTG1Ob1lYSkJkQ2hwS1NrZ1BEd2dNVEFwSUh3Z0tHUmxZMjlrWlNoaU5qUXVZMmhoY2tGMEtHa2dLeUF4S1NrZ1BEd2dOQ2tnZkNBb1pHVmpiMlJsS0dJMk5DNWphR0Z5UVhRb2FTQXJJRElwS1NBK1BpQXlLVnh1WEhSY2RGeDBjSFZ6YUNnb2RHMXdJRDQrSURncElDWWdNSGhHUmlsY2JseDBYSFJjZEhCMWMyZ29kRzF3SUNZZ01IaEdSaWxjYmx4MFhIUjlYRzVjYmx4MFhIUnlaWFIxY200Z1lYSnlYRzVjZEgxY2JseHVYSFJtZFc1amRHbHZiaUIxYVc1ME9GUnZRbUZ6WlRZMElDaDFhVzUwT0NrZ2UxeHVYSFJjZEhaaGNpQnBMRnh1WEhSY2RGeDBaWGgwY21GQ2VYUmxjeUE5SUhWcGJuUTRMbXhsYm1kMGFDQWxJRE1zSUM4dklHbG1JSGRsSUdoaGRtVWdNU0JpZVhSbElHeGxablFzSUhCaFpDQXlJR0o1ZEdWelhHNWNkRngwWEhSdmRYUndkWFFnUFNCY0lsd2lMRnh1WEhSY2RGeDBkR1Z0Y0N3Z2JHVnVaM1JvWEc1Y2JseDBYSFJtZFc1amRHbHZiaUJsYm1OdlpHVWdLRzUxYlNrZ2UxeHVYSFJjZEZ4MGNtVjBkWEp1SUd4dmIydDFjQzVqYUdGeVFYUW9iblZ0S1Z4dVhIUmNkSDFjYmx4dVhIUmNkR1oxYm1OMGFXOXVJSFJ5YVhCc1pYUlViMEpoYzJVMk5DQW9iblZ0S1NCN1hHNWNkRngwWEhSeVpYUjFjbTRnWlc1amIyUmxLRzUxYlNBK1BpQXhPQ0FtSURCNE0wWXBJQ3NnWlc1amIyUmxLRzUxYlNBK1BpQXhNaUFtSURCNE0wWXBJQ3NnWlc1amIyUmxLRzUxYlNBK1BpQTJJQ1lnTUhnelJpa2dLeUJsYm1OdlpHVW9iblZ0SUNZZ01IZ3pSaWxjYmx4MFhIUjlYRzVjYmx4MFhIUXZMeUJuYnlCMGFISnZkV2RvSUhSb1pTQmhjbkpoZVNCbGRtVnllU0IwYUhKbFpTQmllWFJsY3l3Z2QyVW5iR3dnWkdWaGJDQjNhWFJvSUhSeVlXbHNhVzVuSUhOMGRXWm1JR3hoZEdWeVhHNWNkRngwWm05eUlDaHBJRDBnTUN3Z2JHVnVaM1JvSUQwZ2RXbHVkRGd1YkdWdVozUm9JQzBnWlhoMGNtRkNlWFJsY3pzZ2FTQThJR3hsYm1kMGFEc2dhU0FyUFNBektTQjdYRzVjZEZ4MFhIUjBaVzF3SUQwZ0tIVnBiblE0VzJsZElEdzhJREUyS1NBcklDaDFhVzUwT0Z0cElDc2dNVjBnUER3Z09Da2dLeUFvZFdsdWREaGJhU0FySURKZEtWeHVYSFJjZEZ4MGIzVjBjSFYwSUNzOUlIUnlhWEJzWlhSVWIwSmhjMlUyTkNoMFpXMXdLVnh1WEhSY2RIMWNibHh1WEhSY2RDOHZJSEJoWkNCMGFHVWdaVzVrSUhkcGRHZ2dlbVZ5YjNNc0lHSjFkQ0J0WVd0bElITjFjbVVnZEc4Z2JtOTBJR1p2Y21kbGRDQjBhR1VnWlhoMGNtRWdZbmwwWlhOY2JseDBYSFJ6ZDJsMFkyZ2dLR1Y0ZEhKaFFubDBaWE1wSUh0Y2JseDBYSFJjZEdOaGMyVWdNVHBjYmx4MFhIUmNkRngwZEdWdGNDQTlJSFZwYm5RNFczVnBiblE0TG14bGJtZDBhQ0F0SURGZFhHNWNkRngwWEhSY2RHOTFkSEIxZENBclBTQmxibU52WkdVb2RHVnRjQ0ErUGlBeUtWeHVYSFJjZEZ4MFhIUnZkWFJ3ZFhRZ0t6MGdaVzVqYjJSbEtDaDBaVzF3SUR3OElEUXBJQ1lnTUhnelJpbGNibHgwWEhSY2RGeDBiM1YwY0hWMElDczlJQ2M5UFNkY2JseDBYSFJjZEZ4MFluSmxZV3RjYmx4MFhIUmNkR05oYzJVZ01qcGNibHgwWEhSY2RGeDBkR1Z0Y0NBOUlDaDFhVzUwT0Z0MWFXNTBPQzVzWlc1bmRHZ2dMU0F5WFNBOFBDQTRLU0FySUNoMWFXNTBPRnQxYVc1ME9DNXNaVzVuZEdnZ0xTQXhYU2xjYmx4MFhIUmNkRngwYjNWMGNIVjBJQ3M5SUdWdVkyOWtaU2gwWlcxd0lENCtJREV3S1Z4dVhIUmNkRngwWEhSdmRYUndkWFFnS3owZ1pXNWpiMlJsS0NoMFpXMXdJRDQrSURRcElDWWdNSGd6UmlsY2JseDBYSFJjZEZ4MGIzVjBjSFYwSUNzOUlHVnVZMjlrWlNnb2RHVnRjQ0E4UENBeUtTQW1JREI0TTBZcFhHNWNkRngwWEhSY2RHOTFkSEIxZENBclBTQW5QU2RjYmx4MFhIUmNkRngwWW5KbFlXdGNibHgwWEhSOVhHNWNibHgwWEhSeVpYUjFjbTRnYjNWMGNIVjBYRzVjZEgxY2JseHVYSFJsZUhCdmNuUnpMblJ2UW5sMFpVRnljbUY1SUQwZ1lqWTBWRzlDZVhSbFFYSnlZWGxjYmx4MFpYaHdiM0owY3k1bWNtOXRRbmwwWlVGeWNtRjVJRDBnZFdsdWREaFViMEpoYzJVMk5GeHVmU2gwZVhCbGIyWWdaWGh3YjNKMGN5QTlQVDBnSjNWdVpHVm1hVzVsWkNjZ1B5QW9kR2hwY3k1aVlYTmxOalJxY3lBOUlIdDlLU0E2SUdWNGNHOXlkSE1wS1Z4dUlsMTlcbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXGJhc2U2NC1qc1xcXFxsaWJcXFxcYjY0LmpzXCIsXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXGJhc2U2NC1qc1xcXFxsaWJcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuLyohXG4gKiBUaGUgYnVmZmVyIG1vZHVsZSBmcm9tIG5vZGUuanMsIGZvciB0aGUgYnJvd3Nlci5cbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuXG52YXIgYmFzZTY0ID0gcmVxdWlyZSgnYmFzZTY0LWpzJyk7XG52YXIgaWVlZTc1NCA9IHJlcXVpcmUoJ2llZWU3NTQnKTtcblxuZXhwb3J0cy5CdWZmZXIgPSBCdWZmZXI7XG5leHBvcnRzLlNsb3dCdWZmZXIgPSBCdWZmZXI7XG5leHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTID0gNTA7XG5CdWZmZXIucG9vbFNpemUgPSA4MTkyO1xuXG4vKipcbiAqIElmIGBCdWZmZXIuX3VzZVR5cGVkQXJyYXlzYDpcbiAqICAgPT09IHRydWUgICAgVXNlIFVpbnQ4QXJyYXkgaW1wbGVtZW50YXRpb24gKGZhc3Rlc3QpXG4gKiAgID09PSBmYWxzZSAgIFVzZSBPYmplY3QgaW1wbGVtZW50YXRpb24gKGNvbXBhdGlibGUgZG93biB0byBJRTYpXG4gKi9cbkJ1ZmZlci5fdXNlVHlwZWRBcnJheXMgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIERldGVjdCBpZiBicm93c2VyIHN1cHBvcnRzIFR5cGVkIEFycmF5cy4gU3VwcG9ydGVkIGJyb3dzZXJzIGFyZSBJRSAxMCssIEZpcmVmb3ggNCssXG4gIC8vIENocm9tZSA3KywgU2FmYXJpIDUuMSssIE9wZXJhIDExLjYrLCBpT1MgNC4yKy4gSWYgdGhlIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBhZGRpbmdcbiAgLy8gcHJvcGVydGllcyB0byBgVWludDhBcnJheWAgaW5zdGFuY2VzLCB0aGVuIHRoYXQncyB0aGUgc2FtZSBhcyBubyBgVWludDhBcnJheWAgc3VwcG9ydFxuICAvLyBiZWNhdXNlIHdlIG5lZWQgdG8gYmUgYWJsZSB0byBhZGQgYWxsIHRoZSBub2RlIEJ1ZmZlciBBUEkgbWV0aG9kcy4gVGhpcyBpcyBhbiBpc3N1ZVxuICAvLyBpbiBGaXJlZm94IDQtMjkuIE5vdyBmaXhlZDogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njk1NDM4XG4gIHRyeSB7XG4gICAgdmFyIGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcigwKTtcbiAgICB2YXIgYXJyID0gbmV3IFVpbnQ4QXJyYXkoYnVmKTtcbiAgICBhcnIuZm9vID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIDQyO1xuICAgIH07XG4gICAgcmV0dXJuIDQyID09PSBhcnIuZm9vKCkgJiYgdHlwZW9mIGFyci5zdWJhcnJheSA9PT0gJ2Z1bmN0aW9uJzsgLy8gQ2hyb21lIDktMTAgbGFjayBgc3ViYXJyYXlgXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0oKTtcblxuLyoqXG4gKiBDbGFzczogQnVmZmVyXG4gKiA9PT09PT09PT09PT09XG4gKlxuICogVGhlIEJ1ZmZlciBjb25zdHJ1Y3RvciByZXR1cm5zIGluc3RhbmNlcyBvZiBgVWludDhBcnJheWAgdGhhdCBhcmUgYXVnbWVudGVkXG4gKiB3aXRoIGZ1bmN0aW9uIHByb3BlcnRpZXMgZm9yIGFsbCB0aGUgbm9kZSBgQnVmZmVyYCBBUEkgZnVuY3Rpb25zLiBXZSB1c2VcbiAqIGBVaW50OEFycmF5YCBzbyB0aGF0IHNxdWFyZSBicmFja2V0IG5vdGF0aW9uIHdvcmtzIGFzIGV4cGVjdGVkIC0tIGl0IHJldHVybnNcbiAqIGEgc2luZ2xlIG9jdGV0LlxuICpcbiAqIEJ5IGF1Z21lbnRpbmcgdGhlIGluc3RhbmNlcywgd2UgY2FuIGF2b2lkIG1vZGlmeWluZyB0aGUgYFVpbnQ4QXJyYXlgXG4gKiBwcm90b3R5cGUuXG4gKi9cbmZ1bmN0aW9uIEJ1ZmZlcihzdWJqZWN0LCBlbmNvZGluZywgbm9aZXJvKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBCdWZmZXIpKSByZXR1cm4gbmV3IEJ1ZmZlcihzdWJqZWN0LCBlbmNvZGluZywgbm9aZXJvKTtcblxuICB2YXIgdHlwZSA9IHR5cGVvZiBzdWJqZWN0ID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihzdWJqZWN0KTtcblxuICAvLyBXb3JrYXJvdW5kOiBub2RlJ3MgYmFzZTY0IGltcGxlbWVudGF0aW9uIGFsbG93cyBmb3Igbm9uLXBhZGRlZCBzdHJpbmdzXG4gIC8vIHdoaWxlIGJhc2U2NC1qcyBkb2VzIG5vdC5cbiAgaWYgKGVuY29kaW5nID09PSAnYmFzZTY0JyAmJiB0eXBlID09PSAnc3RyaW5nJykge1xuICAgIHN1YmplY3QgPSBzdHJpbmd0cmltKHN1YmplY3QpO1xuICAgIHdoaWxlIChzdWJqZWN0Lmxlbmd0aCAlIDQgIT09IDApIHtcbiAgICAgIHN1YmplY3QgPSBzdWJqZWN0ICsgJz0nO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZpbmQgdGhlIGxlbmd0aFxuICB2YXIgbGVuZ3RoO1xuICBpZiAodHlwZSA9PT0gJ251bWJlcicpIGxlbmd0aCA9IGNvZXJjZShzdWJqZWN0KTtlbHNlIGlmICh0eXBlID09PSAnc3RyaW5nJykgbGVuZ3RoID0gQnVmZmVyLmJ5dGVMZW5ndGgoc3ViamVjdCwgZW5jb2RpbmcpO2Vsc2UgaWYgKHR5cGUgPT09ICdvYmplY3QnKSBsZW5ndGggPSBjb2VyY2Uoc3ViamVjdC5sZW5ndGgpOyAvLyBhc3N1bWUgdGhhdCBvYmplY3QgaXMgYXJyYXktbGlrZVxuICBlbHNlIHRocm93IG5ldyBFcnJvcignRmlyc3QgYXJndW1lbnQgbmVlZHMgdG8gYmUgYSBudW1iZXIsIGFycmF5IG9yIHN0cmluZy4nKTtcblxuICB2YXIgYnVmO1xuICBpZiAoQnVmZmVyLl91c2VUeXBlZEFycmF5cykge1xuICAgIC8vIFByZWZlcnJlZDogUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2UgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICBidWYgPSBCdWZmZXIuX2F1Z21lbnQobmV3IFVpbnQ4QXJyYXkobGVuZ3RoKSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBUSElTIGluc3RhbmNlIG9mIEJ1ZmZlciAoY3JlYXRlZCBieSBgbmV3YClcbiAgICBidWYgPSB0aGlzO1xuICAgIGJ1Zi5sZW5ndGggPSBsZW5ndGg7XG4gICAgYnVmLl9pc0J1ZmZlciA9IHRydWU7XG4gIH1cblxuICB2YXIgaTtcbiAgaWYgKEJ1ZmZlci5fdXNlVHlwZWRBcnJheXMgJiYgdHlwZW9mIHN1YmplY3QuYnl0ZUxlbmd0aCA9PT0gJ251bWJlcicpIHtcbiAgICAvLyBTcGVlZCBvcHRpbWl6YXRpb24gLS0gdXNlIHNldCBpZiB3ZSdyZSBjb3B5aW5nIGZyb20gYSB0eXBlZCBhcnJheVxuICAgIGJ1Zi5fc2V0KHN1YmplY3QpO1xuICB9IGVsc2UgaWYgKGlzQXJyYXlpc2goc3ViamVjdCkpIHtcbiAgICAvLyBUcmVhdCBhcnJheS1pc2ggb2JqZWN0cyBhcyBhIGJ5dGUgYXJyYXlcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChCdWZmZXIuaXNCdWZmZXIoc3ViamVjdCkpIGJ1ZltpXSA9IHN1YmplY3QucmVhZFVJbnQ4KGkpO2Vsc2UgYnVmW2ldID0gc3ViamVjdFtpXTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICBidWYud3JpdGUoc3ViamVjdCwgMCwgZW5jb2RpbmcpO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdudW1iZXInICYmICFCdWZmZXIuX3VzZVR5cGVkQXJyYXlzICYmICFub1plcm8pIHtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGJ1ZltpXSA9IDA7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1Zjtcbn1cblxuLy8gU1RBVElDIE1FVEhPRFNcbi8vID09PT09PT09PT09PT09XG5cbkJ1ZmZlci5pc0VuY29kaW5nID0gZnVuY3Rpb24gKGVuY29kaW5nKSB7XG4gIHN3aXRjaCAoU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICBjYXNlICdyYXcnOlxuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5CdWZmZXIuaXNCdWZmZXIgPSBmdW5jdGlvbiAoYikge1xuICByZXR1cm4gISEoYiAhPT0gbnVsbCAmJiBiICE9PSB1bmRlZmluZWQgJiYgYi5faXNCdWZmZXIpO1xufTtcblxuQnVmZmVyLmJ5dGVMZW5ndGggPSBmdW5jdGlvbiAoc3RyLCBlbmNvZGluZykge1xuICB2YXIgcmV0O1xuICBzdHIgPSBzdHIgKyAnJztcbiAgc3dpdGNoIChlbmNvZGluZyB8fCAndXRmOCcpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgICAgcmV0ID0gc3RyLmxlbmd0aCAvIDI7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgICByZXQgPSB1dGY4VG9CeXRlcyhzdHIpLmxlbmd0aDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ3Jhdyc6XG4gICAgICByZXQgPSBzdHIubGVuZ3RoO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIHJldCA9IGJhc2U2NFRvQnl0ZXMoc3RyKS5sZW5ndGg7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0ID0gc3RyLmxlbmd0aCAqIDI7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGVuY29kaW5nJyk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn07XG5cbkJ1ZmZlci5jb25jYXQgPSBmdW5jdGlvbiAobGlzdCwgdG90YWxMZW5ndGgpIHtcbiAgYXNzZXJ0KGlzQXJyYXkobGlzdCksICdVc2FnZTogQnVmZmVyLmNvbmNhdChsaXN0LCBbdG90YWxMZW5ndGhdKVxcbicgKyAnbGlzdCBzaG91bGQgYmUgYW4gQXJyYXkuJyk7XG5cbiAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG5ldyBCdWZmZXIoMCk7XG4gIH0gZWxzZSBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gbGlzdFswXTtcbiAgfVxuXG4gIHZhciBpO1xuICBpZiAodHlwZW9mIHRvdGFsTGVuZ3RoICE9PSAnbnVtYmVyJykge1xuICAgIHRvdGFsTGVuZ3RoID0gMDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgdG90YWxMZW5ndGggKz0gbGlzdFtpXS5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgdmFyIGJ1ZiA9IG5ldyBCdWZmZXIodG90YWxMZW5ndGgpO1xuICB2YXIgcG9zID0gMDtcbiAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgaXRlbS5jb3B5KGJ1ZiwgcG9zKTtcbiAgICBwb3MgKz0gaXRlbS5sZW5ndGg7XG4gIH1cbiAgcmV0dXJuIGJ1Zjtcbn07XG5cbi8vIEJVRkZFUiBJTlNUQU5DRSBNRVRIT0RTXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PVxuXG5mdW5jdGlvbiBfaGV4V3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDA7XG4gIHZhciByZW1haW5pbmcgPSBidWYubGVuZ3RoIC0gb2Zmc2V0O1xuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZztcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKTtcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmc7XG4gICAgfVxuICB9XG5cbiAgLy8gbXVzdCBiZSBhbiBldmVuIG51bWJlciBvZiBkaWdpdHNcbiAgdmFyIHN0ckxlbiA9IHN0cmluZy5sZW5ndGg7XG4gIGFzc2VydChzdHJMZW4gJSAyID09PSAwLCAnSW52YWxpZCBoZXggc3RyaW5nJyk7XG5cbiAgaWYgKGxlbmd0aCA+IHN0ckxlbiAvIDIpIHtcbiAgICBsZW5ndGggPSBzdHJMZW4gLyAyO1xuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgYnl0ZSA9IHBhcnNlSW50KHN0cmluZy5zdWJzdHIoaSAqIDIsIDIpLCAxNik7XG4gICAgYXNzZXJ0KCFpc05hTihieXRlKSwgJ0ludmFsaWQgaGV4IHN0cmluZycpO1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9IGJ5dGU7XG4gIH1cbiAgQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPSBpICogMjtcbiAgcmV0dXJuIGk7XG59XG5cbmZ1bmN0aW9uIF91dGY4V3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9IGJsaXRCdWZmZXIodXRmOFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aCk7XG4gIHJldHVybiBjaGFyc1dyaXR0ZW47XG59XG5cbmZ1bmN0aW9uIF9hc2NpaVdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgY2hhcnNXcml0dGVuID0gQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPSBibGl0QnVmZmVyKGFzY2lpVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKTtcbiAgcmV0dXJuIGNoYXJzV3JpdHRlbjtcbn1cblxuZnVuY3Rpb24gX2JpbmFyeVdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gX2FzY2lpV3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKTtcbn1cblxuZnVuY3Rpb24gX2Jhc2U2NFdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgY2hhcnNXcml0dGVuID0gQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPSBibGl0QnVmZmVyKGJhc2U2NFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aCk7XG4gIHJldHVybiBjaGFyc1dyaXR0ZW47XG59XG5cbmZ1bmN0aW9uIF91dGYxNmxlV3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9IGJsaXRCdWZmZXIodXRmMTZsZVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aCk7XG4gIHJldHVybiBjaGFyc1dyaXR0ZW47XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpIHtcbiAgLy8gU3VwcG9ydCBib3RoIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZylcbiAgLy8gYW5kIHRoZSBsZWdhY3kgKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICBpZiAoaXNGaW5pdGUob2Zmc2V0KSkge1xuICAgIGlmICghaXNGaW5pdGUobGVuZ3RoKSkge1xuICAgICAgZW5jb2RpbmcgPSBsZW5ndGg7XG4gICAgICBsZW5ndGggPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIGxlZ2FjeVxuICAgIHZhciBzd2FwID0gZW5jb2Rpbmc7XG4gICAgZW5jb2RpbmcgPSBvZmZzZXQ7XG4gICAgb2Zmc2V0ID0gbGVuZ3RoO1xuICAgIGxlbmd0aCA9IHN3YXA7XG4gIH1cblxuICBvZmZzZXQgPSBOdW1iZXIob2Zmc2V0KSB8fCAwO1xuICB2YXIgcmVtYWluaW5nID0gdGhpcy5sZW5ndGggLSBvZmZzZXQ7XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nO1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpO1xuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZztcbiAgICB9XG4gIH1cbiAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcgfHwgJ3V0ZjgnKS50b0xvd2VyQ2FzZSgpO1xuXG4gIHZhciByZXQ7XG4gIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgICAgcmV0ID0gX2hleFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgICAgcmV0ID0gX3V0ZjhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIHJldCA9IF9hc2NpaVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgIHJldCA9IF9iaW5hcnlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICByZXQgPSBfYmFzZTY0V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0ID0gX3V0ZjE2bGVXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZW5jb2RpbmcnKTtcbiAgfVxuICByZXR1cm4gcmV0O1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChlbmNvZGluZywgc3RhcnQsIGVuZCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcgfHwgJ3V0ZjgnKS50b0xvd2VyQ2FzZSgpO1xuICBzdGFydCA9IE51bWJlcihzdGFydCkgfHwgMDtcbiAgZW5kID0gZW5kICE9PSB1bmRlZmluZWQgPyBOdW1iZXIoZW5kKSA6IGVuZCA9IHNlbGYubGVuZ3RoO1xuXG4gIC8vIEZhc3RwYXRoIGVtcHR5IHN0cmluZ3NcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVybiAnJztcblxuICB2YXIgcmV0O1xuICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICAgIHJldCA9IF9oZXhTbGljZShzZWxmLCBzdGFydCwgZW5kKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIHJldCA9IF91dGY4U2xpY2Uoc2VsZiwgc3RhcnQsIGVuZCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgICByZXQgPSBfYXNjaWlTbGljZShzZWxmLCBzdGFydCwgZW5kKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICByZXQgPSBfYmluYXJ5U2xpY2Uoc2VsZiwgc3RhcnQsIGVuZCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgcmV0ID0gX2Jhc2U2NFNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldCA9IF91dGYxNmxlU2xpY2Uoc2VsZiwgc3RhcnQsIGVuZCk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGVuY29kaW5nJyk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9O1xufTtcblxuLy8gY29weSh0YXJnZXRCdWZmZXIsIHRhcmdldFN0YXJ0PTAsIHNvdXJjZVN0YXJ0PTAsIHNvdXJjZUVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gKHRhcmdldCwgdGFyZ2V0X3N0YXJ0LCBzdGFydCwgZW5kKSB7XG4gIHZhciBzb3VyY2UgPSB0aGlzO1xuXG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMDtcbiAgaWYgKCFlbmQgJiYgZW5kICE9PSAwKSBlbmQgPSB0aGlzLmxlbmd0aDtcbiAgaWYgKCF0YXJnZXRfc3RhcnQpIHRhcmdldF9zdGFydCA9IDA7XG5cbiAgLy8gQ29weSAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm47XG4gIGlmICh0YXJnZXQubGVuZ3RoID09PSAwIHx8IHNvdXJjZS5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAvLyBGYXRhbCBlcnJvciBjb25kaXRpb25zXG4gIGFzc2VydChlbmQgPj0gc3RhcnQsICdzb3VyY2VFbmQgPCBzb3VyY2VTdGFydCcpO1xuICBhc3NlcnQodGFyZ2V0X3N0YXJ0ID49IDAgJiYgdGFyZ2V0X3N0YXJ0IDwgdGFyZ2V0Lmxlbmd0aCwgJ3RhcmdldFN0YXJ0IG91dCBvZiBib3VuZHMnKTtcbiAgYXNzZXJ0KHN0YXJ0ID49IDAgJiYgc3RhcnQgPCBzb3VyY2UubGVuZ3RoLCAnc291cmNlU3RhcnQgb3V0IG9mIGJvdW5kcycpO1xuICBhc3NlcnQoZW5kID49IDAgJiYgZW5kIDw9IHNvdXJjZS5sZW5ndGgsICdzb3VyY2VFbmQgb3V0IG9mIGJvdW5kcycpO1xuXG4gIC8vIEFyZSB3ZSBvb2I/XG4gIGlmIChlbmQgPiB0aGlzLmxlbmd0aCkgZW5kID0gdGhpcy5sZW5ndGg7XG4gIGlmICh0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0X3N0YXJ0IDwgZW5kIC0gc3RhcnQpIGVuZCA9IHRhcmdldC5sZW5ndGggLSB0YXJnZXRfc3RhcnQgKyBzdGFydDtcblxuICB2YXIgbGVuID0gZW5kIC0gc3RhcnQ7XG5cbiAgaWYgKGxlbiA8IDEwMCB8fCAhQnVmZmVyLl91c2VUeXBlZEFycmF5cykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0X3N0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGFyZ2V0Ll9zZXQodGhpcy5zdWJhcnJheShzdGFydCwgc3RhcnQgKyBsZW4pLCB0YXJnZXRfc3RhcnQpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBfYmFzZTY0U2xpY2UoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGlmIChzdGFydCA9PT0gMCAmJiBlbmQgPT09IGJ1Zi5sZW5ndGgpIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmLnNsaWNlKHN0YXJ0LCBlbmQpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfdXRmOFNsaWNlKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmVzID0gJyc7XG4gIHZhciB0bXAgPSAnJztcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKTtcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgIGlmIChidWZbaV0gPD0gMHg3Rikge1xuICAgICAgcmVzICs9IGRlY29kZVV0ZjhDaGFyKHRtcCkgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSk7XG4gICAgICB0bXAgPSAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgdG1wICs9ICclJyArIGJ1ZltpXS50b1N0cmluZygxNik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcyArIGRlY29kZVV0ZjhDaGFyKHRtcCk7XG59XG5cbmZ1bmN0aW9uIF9hc2NpaVNsaWNlKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJyc7XG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZCk7XG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0pO1xuICB9cmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gX2JpbmFyeVNsaWNlKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICByZXR1cm4gX2FzY2lpU2xpY2UoYnVmLCBzdGFydCwgZW5kKTtcbn1cblxuZnVuY3Rpb24gX2hleFNsaWNlKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gYnVmLmxlbmd0aDtcblxuICBpZiAoIXN0YXJ0IHx8IHN0YXJ0IDwgMCkgc3RhcnQgPSAwO1xuICBpZiAoIWVuZCB8fCBlbmQgPCAwIHx8IGVuZCA+IGxlbikgZW5kID0gbGVuO1xuXG4gIHZhciBvdXQgPSAnJztcbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICBvdXQgKz0gdG9IZXgoYnVmW2ldKTtcbiAgfVxuICByZXR1cm4gb3V0O1xufVxuXG5mdW5jdGlvbiBfdXRmMTZsZVNsaWNlKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgYnl0ZXMgPSBidWYuc2xpY2Uoc3RhcnQsIGVuZCk7XG4gIHZhciByZXMgPSAnJztcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldICsgYnl0ZXNbaSArIDFdICogMjU2KTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoO1xuICBzdGFydCA9IGNsYW1wKHN0YXJ0LCBsZW4sIDApO1xuICBlbmQgPSBjbGFtcChlbmQsIGxlbiwgbGVuKTtcblxuICBpZiAoQnVmZmVyLl91c2VUeXBlZEFycmF5cykge1xuICAgIHJldHVybiBCdWZmZXIuX2F1Z21lbnQodGhpcy5zdWJhcnJheShzdGFydCwgZW5kKSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHNsaWNlTGVuID0gZW5kIC0gc3RhcnQ7XG4gICAgdmFyIG5ld0J1ZiA9IG5ldyBCdWZmZXIoc2xpY2VMZW4sIHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGljZUxlbjsgaSsrKSB7XG4gICAgICBuZXdCdWZbaV0gPSB0aGlzW2kgKyBzdGFydF07XG4gICAgfVxuICAgIHJldHVybiBuZXdCdWY7XG4gIH1cbn07XG5cbi8vIGBnZXRgIHdpbGwgYmUgcmVtb3ZlZCBpbiBOb2RlIDAuMTMrXG5CdWZmZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChvZmZzZXQpIHtcbiAgY29uc29sZS5sb2coJy5nZXQoKSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdXNpbmcgYXJyYXkgaW5kZXhlcyBpbnN0ZWFkLicpO1xuICByZXR1cm4gdGhpcy5yZWFkVUludDgob2Zmc2V0KTtcbn07XG5cbi8vIGBzZXRgIHdpbGwgYmUgcmVtb3ZlZCBpbiBOb2RlIDAuMTMrXG5CdWZmZXIucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uICh2LCBvZmZzZXQpIHtcbiAgY29uc29sZS5sb2coJy5zZXQoKSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdXNpbmcgYXJyYXkgaW5kZXhlcyBpbnN0ZWFkLicpO1xuICByZXR1cm4gdGhpcy53cml0ZVVJbnQ4KHYsIG9mZnNldCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50OCA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0IDwgdGhpcy5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICB9XG5cbiAgaWYgKG9mZnNldCA+PSB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gIHJldHVybiB0aGlzW29mZnNldF07XG59O1xuXG5mdW5jdGlvbiBfcmVhZFVJbnQxNihidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKTtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0ICsgMSA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGg7XG4gIGlmIChvZmZzZXQgPj0gbGVuKSByZXR1cm47XG5cbiAgdmFyIHZhbDtcbiAgaWYgKGxpdHRsZUVuZGlhbikge1xuICAgIHZhbCA9IGJ1ZltvZmZzZXRdO1xuICAgIGlmIChvZmZzZXQgKyAxIDwgbGVuKSB2YWwgfD0gYnVmW29mZnNldCArIDFdIDw8IDg7XG4gIH0gZWxzZSB7XG4gICAgdmFsID0gYnVmW29mZnNldF0gPDwgODtcbiAgICBpZiAob2Zmc2V0ICsgMSA8IGxlbikgdmFsIHw9IGJ1ZltvZmZzZXQgKyAxXTtcbiAgfVxuICByZXR1cm4gdmFsO1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQxNih0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkVUludDE2KHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KTtcbn07XG5cbmZ1bmN0aW9uIF9yZWFkVUludDMyKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpO1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aDtcbiAgaWYgKG9mZnNldCA+PSBsZW4pIHJldHVybjtcblxuICB2YXIgdmFsO1xuICBpZiAobGl0dGxlRW5kaWFuKSB7XG4gICAgaWYgKG9mZnNldCArIDIgPCBsZW4pIHZhbCA9IGJ1ZltvZmZzZXQgKyAyXSA8PCAxNjtcbiAgICBpZiAob2Zmc2V0ICsgMSA8IGxlbikgdmFsIHw9IGJ1ZltvZmZzZXQgKyAxXSA8PCA4O1xuICAgIHZhbCB8PSBidWZbb2Zmc2V0XTtcbiAgICBpZiAob2Zmc2V0ICsgMyA8IGxlbikgdmFsID0gdmFsICsgKGJ1ZltvZmZzZXQgKyAzXSA8PCAyNCA+Pj4gMCk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKG9mZnNldCArIDEgPCBsZW4pIHZhbCA9IGJ1ZltvZmZzZXQgKyAxXSA8PCAxNjtcbiAgICBpZiAob2Zmc2V0ICsgMiA8IGxlbikgdmFsIHw9IGJ1ZltvZmZzZXQgKyAyXSA8PCA4O1xuICAgIGlmIChvZmZzZXQgKyAzIDwgbGVuKSB2YWwgfD0gYnVmW29mZnNldCArIDNdO1xuICAgIHZhbCA9IHZhbCArIChidWZbb2Zmc2V0XSA8PCAyNCA+Pj4gMCk7XG4gIH1cbiAgcmV0dXJuIHZhbDtcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyTEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRVSW50MzIodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQzMih0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQ4ID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgPCB0aGlzLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gIH1cblxuICBpZiAob2Zmc2V0ID49IHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgdmFyIG5lZyA9IHRoaXNbb2Zmc2V0XSAmIDB4ODA7XG4gIGlmIChuZWcpIHJldHVybiAoMHhmZiAtIHRoaXNbb2Zmc2V0XSArIDEpICogLTE7ZWxzZSByZXR1cm4gdGhpc1tvZmZzZXRdO1xufTtcblxuZnVuY3Rpb24gX3JlYWRJbnQxNihidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKTtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0ICsgMSA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGg7XG4gIGlmIChvZmZzZXQgPj0gbGVuKSByZXR1cm47XG5cbiAgdmFyIHZhbCA9IF9yZWFkVUludDE2KGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIHRydWUpO1xuICB2YXIgbmVnID0gdmFsICYgMHg4MDAwO1xuICBpZiAobmVnKSByZXR1cm4gKDB4ZmZmZiAtIHZhbCArIDEpICogLTE7ZWxzZSByZXR1cm4gdmFsO1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkSW50MTYodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkSW50MTYodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpO1xufTtcblxuZnVuY3Rpb24gX3JlYWRJbnQzMihidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKTtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGg7XG4gIGlmIChvZmZzZXQgPj0gbGVuKSByZXR1cm47XG5cbiAgdmFyIHZhbCA9IF9yZWFkVUludDMyKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIHRydWUpO1xuICB2YXIgbmVnID0gdmFsICYgMHg4MDAwMDAwMDtcbiAgaWYgKG5lZykgcmV0dXJuICgweGZmZmZmZmZmIC0gdmFsICsgMSkgKiAtMTtlbHNlIHJldHVybiB2YWw7XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyTEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRJbnQzMih0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyQkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRJbnQzMih0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydCk7XG59O1xuXG5mdW5jdGlvbiBfcmVhZEZsb2F0KGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpO1xuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gIH1cblxuICByZXR1cm4gaWVlZTc1NC5yZWFkKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KTtcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEZsb2F0KHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEZsb2F0KHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KTtcbn07XG5cbmZ1bmN0aW9uIF9yZWFkRG91YmxlKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpO1xuICAgIGFzc2VydChvZmZzZXQgKyA3IDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gIH1cblxuICByZXR1cm4gaWVlZTc1NC5yZWFkKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KTtcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlTEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWREb3VibGUodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZERvdWJsZSh0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDggPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpO1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgPCB0aGlzLmxlbmd0aCwgJ3RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICAgIHZlcmlmdWludCh2YWx1ZSwgMHhmZik7XG4gIH1cblxuICBpZiAob2Zmc2V0ID49IHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgdGhpc1tvZmZzZXRdID0gdmFsdWU7XG59O1xuXG5mdW5jdGlvbiBfd3JpdGVVSW50MTYoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKTtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpO1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgKyAxIDwgYnVmLmxlbmd0aCwgJ3RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICAgIHZlcmlmdWludCh2YWx1ZSwgMHhmZmZmKTtcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoO1xuICBpZiAob2Zmc2V0ID49IGxlbikgcmV0dXJuO1xuXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4obGVuIC0gb2Zmc2V0LCAyKTsgaSA8IGo7IGkrKykge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9ICh2YWx1ZSAmIDB4ZmYgPDwgOCAqIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpKSA+Pj4gKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkgKiA4O1xuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpO1xufTtcblxuZnVuY3Rpb24gX3dyaXRlVUludDMyKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJyk7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKTtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICd0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgICB2ZXJpZnVpbnQodmFsdWUsIDB4ZmZmZmZmZmYpO1xuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGg7XG4gIGlmIChvZmZzZXQgPj0gbGVuKSByZXR1cm47XG5cbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihsZW4gLSBvZmZzZXQsIDQpOyBpIDwgajsgaSsrKSB7XG4gICAgYnVmW29mZnNldCArIGldID0gdmFsdWUgPj4+IChsaXR0bGVFbmRpYW4gPyBpIDogMyAtIGkpICogOCAmIDB4ZmY7XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJyk7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCA8IHRoaXMubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gICAgdmVyaWZzaW50KHZhbHVlLCAweDdmLCAtMHg4MCk7XG4gIH1cblxuICBpZiAob2Zmc2V0ID49IHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgaWYgKHZhbHVlID49IDApIHRoaXMud3JpdGVVSW50OCh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCk7ZWxzZSB0aGlzLndyaXRlVUludDgoMHhmZiArIHZhbHVlICsgMSwgb2Zmc2V0LCBub0Fzc2VydCk7XG59O1xuXG5mdW5jdGlvbiBfd3JpdGVJbnQxNihidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpO1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJyk7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCArIDEgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gICAgdmVyaWZzaW50KHZhbHVlLCAweDdmZmYsIC0weDgwMDApO1xuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGg7XG4gIGlmIChvZmZzZXQgPj0gbGVuKSByZXR1cm47XG5cbiAgaWYgKHZhbHVlID49IDApIF93cml0ZVVJbnQxNihidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpO2Vsc2UgX3dyaXRlVUludDE2KGJ1ZiwgMHhmZmZmICsgdmFsdWUgKyAxLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpO1xufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpO1xufTtcblxuZnVuY3Rpb24gX3dyaXRlSW50MzIoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKTtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpO1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICAgIHZlcmlmc2ludCh2YWx1ZSwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApO1xuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGg7XG4gIGlmIChvZmZzZXQgPj0gbGVuKSByZXR1cm47XG5cbiAgaWYgKHZhbHVlID49IDApIF93cml0ZVVJbnQzMihidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpO2Vsc2UgX3dyaXRlVUludDMyKGJ1ZiwgMHhmZmZmZmZmZiArIHZhbHVlICsgMSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KTtcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyTEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyQkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KTtcbn07XG5cbmZ1bmN0aW9uIF93cml0ZUZsb2F0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJyk7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKTtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgICB2ZXJpZklFRUU3NTQodmFsdWUsIDMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgsIC0zLjQwMjgyMzQ2NjM4NTI4ODZlKzM4KTtcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoO1xuICBpZiAob2Zmc2V0ID49IGxlbikgcmV0dXJuO1xuXG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KTtcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0TEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0QkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KTtcbn07XG5cbmZ1bmN0aW9uIF93cml0ZURvdWJsZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpO1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJyk7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCArIDcgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gICAgdmVyaWZJRUVFNzU0KHZhbHVlLCAxLjc5NzY5MzEzNDg2MjMxNTdFKzMwOCwgLTEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4KTtcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoO1xuICBpZiAob2Zmc2V0ID49IGxlbikgcmV0dXJuO1xuXG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KTtcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlQkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydCk7XG59O1xuXG4vLyBmaWxsKHZhbHVlLCBzdGFydD0wLCBlbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uICh2YWx1ZSwgc3RhcnQsIGVuZCkge1xuICBpZiAoIXZhbHVlKSB2YWx1ZSA9IDA7XG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMDtcbiAgaWYgKCFlbmQpIGVuZCA9IHRoaXMubGVuZ3RoO1xuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFsdWUgPSB2YWx1ZS5jaGFyQ29kZUF0KDApO1xuICB9XG5cbiAgYXNzZXJ0KHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgIWlzTmFOKHZhbHVlKSwgJ3ZhbHVlIGlzIG5vdCBhIG51bWJlcicpO1xuICBhc3NlcnQoZW5kID49IHN0YXJ0LCAnZW5kIDwgc3RhcnQnKTtcblxuICAvLyBGaWxsIDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVybjtcbiAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgYXNzZXJ0KHN0YXJ0ID49IDAgJiYgc3RhcnQgPCB0aGlzLmxlbmd0aCwgJ3N0YXJ0IG91dCBvZiBib3VuZHMnKTtcbiAgYXNzZXJ0KGVuZCA+PSAwICYmIGVuZCA8PSB0aGlzLmxlbmd0aCwgJ2VuZCBvdXQgb2YgYm91bmRzJyk7XG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICB0aGlzW2ldID0gdmFsdWU7XG4gIH1cbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIG91dCA9IFtdO1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBvdXRbaV0gPSB0b0hleCh0aGlzW2ldKTtcbiAgICBpZiAoaSA9PT0gZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFUykge1xuICAgICAgb3V0W2kgKyAxXSA9ICcuLi4nO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiAnPEJ1ZmZlciAnICsgb3V0LmpvaW4oJyAnKSArICc+Jztcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBgQXJyYXlCdWZmZXJgIHdpdGggdGhlICpjb3BpZWQqIG1lbW9yeSBvZiB0aGUgYnVmZmVyIGluc3RhbmNlLlxuICogQWRkZWQgaW4gTm9kZSAwLjEyLiBPbmx5IGF2YWlsYWJsZSBpbiBicm93c2VycyB0aGF0IHN1cHBvcnQgQXJyYXlCdWZmZXIuXG4gKi9cbkJ1ZmZlci5wcm90b3R5cGUudG9BcnJheUJ1ZmZlciA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJykge1xuICAgIGlmIChCdWZmZXIuX3VzZVR5cGVkQXJyYXlzKSB7XG4gICAgICByZXR1cm4gbmV3IEJ1ZmZlcih0aGlzKS5idWZmZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBidWYgPSBuZXcgVWludDhBcnJheSh0aGlzLmxlbmd0aCk7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYnVmLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgIGJ1ZltpXSA9IHRoaXNbaV07XG4gICAgICB9cmV0dXJuIGJ1Zi5idWZmZXI7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignQnVmZmVyLnRvQXJyYXlCdWZmZXIgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXInKTtcbiAgfVxufTtcblxuLy8gSEVMUEVSIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09PVxuXG5mdW5jdGlvbiBzdHJpbmd0cmltKHN0cikge1xuICBpZiAoc3RyLnRyaW0pIHJldHVybiBzdHIudHJpbSgpO1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbn1cblxudmFyIEJQID0gQnVmZmVyLnByb3RvdHlwZTtcblxuLyoqXG4gKiBBdWdtZW50IGEgVWludDhBcnJheSAqaW5zdGFuY2UqIChub3QgdGhlIFVpbnQ4QXJyYXkgY2xhc3MhKSB3aXRoIEJ1ZmZlciBtZXRob2RzXG4gKi9cbkJ1ZmZlci5fYXVnbWVudCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgYXJyLl9pc0J1ZmZlciA9IHRydWU7XG5cbiAgLy8gc2F2ZSByZWZlcmVuY2UgdG8gb3JpZ2luYWwgVWludDhBcnJheSBnZXQvc2V0IG1ldGhvZHMgYmVmb3JlIG92ZXJ3cml0aW5nXG4gIGFyci5fZ2V0ID0gYXJyLmdldDtcbiAgYXJyLl9zZXQgPSBhcnIuc2V0O1xuXG4gIC8vIGRlcHJlY2F0ZWQsIHdpbGwgYmUgcmVtb3ZlZCBpbiBub2RlIDAuMTMrXG4gIGFyci5nZXQgPSBCUC5nZXQ7XG4gIGFyci5zZXQgPSBCUC5zZXQ7XG5cbiAgYXJyLndyaXRlID0gQlAud3JpdGU7XG4gIGFyci50b1N0cmluZyA9IEJQLnRvU3RyaW5nO1xuICBhcnIudG9Mb2NhbGVTdHJpbmcgPSBCUC50b1N0cmluZztcbiAgYXJyLnRvSlNPTiA9IEJQLnRvSlNPTjtcbiAgYXJyLmNvcHkgPSBCUC5jb3B5O1xuICBhcnIuc2xpY2UgPSBCUC5zbGljZTtcbiAgYXJyLnJlYWRVSW50OCA9IEJQLnJlYWRVSW50ODtcbiAgYXJyLnJlYWRVSW50MTZMRSA9IEJQLnJlYWRVSW50MTZMRTtcbiAgYXJyLnJlYWRVSW50MTZCRSA9IEJQLnJlYWRVSW50MTZCRTtcbiAgYXJyLnJlYWRVSW50MzJMRSA9IEJQLnJlYWRVSW50MzJMRTtcbiAgYXJyLnJlYWRVSW50MzJCRSA9IEJQLnJlYWRVSW50MzJCRTtcbiAgYXJyLnJlYWRJbnQ4ID0gQlAucmVhZEludDg7XG4gIGFyci5yZWFkSW50MTZMRSA9IEJQLnJlYWRJbnQxNkxFO1xuICBhcnIucmVhZEludDE2QkUgPSBCUC5yZWFkSW50MTZCRTtcbiAgYXJyLnJlYWRJbnQzMkxFID0gQlAucmVhZEludDMyTEU7XG4gIGFyci5yZWFkSW50MzJCRSA9IEJQLnJlYWRJbnQzMkJFO1xuICBhcnIucmVhZEZsb2F0TEUgPSBCUC5yZWFkRmxvYXRMRTtcbiAgYXJyLnJlYWRGbG9hdEJFID0gQlAucmVhZEZsb2F0QkU7XG4gIGFyci5yZWFkRG91YmxlTEUgPSBCUC5yZWFkRG91YmxlTEU7XG4gIGFyci5yZWFkRG91YmxlQkUgPSBCUC5yZWFkRG91YmxlQkU7XG4gIGFyci53cml0ZVVJbnQ4ID0gQlAud3JpdGVVSW50ODtcbiAgYXJyLndyaXRlVUludDE2TEUgPSBCUC53cml0ZVVJbnQxNkxFO1xuICBhcnIud3JpdGVVSW50MTZCRSA9IEJQLndyaXRlVUludDE2QkU7XG4gIGFyci53cml0ZVVJbnQzMkxFID0gQlAud3JpdGVVSW50MzJMRTtcbiAgYXJyLndyaXRlVUludDMyQkUgPSBCUC53cml0ZVVJbnQzMkJFO1xuICBhcnIud3JpdGVJbnQ4ID0gQlAud3JpdGVJbnQ4O1xuICBhcnIud3JpdGVJbnQxNkxFID0gQlAud3JpdGVJbnQxNkxFO1xuICBhcnIud3JpdGVJbnQxNkJFID0gQlAud3JpdGVJbnQxNkJFO1xuICBhcnIud3JpdGVJbnQzMkxFID0gQlAud3JpdGVJbnQzMkxFO1xuICBhcnIud3JpdGVJbnQzMkJFID0gQlAud3JpdGVJbnQzMkJFO1xuICBhcnIud3JpdGVGbG9hdExFID0gQlAud3JpdGVGbG9hdExFO1xuICBhcnIud3JpdGVGbG9hdEJFID0gQlAud3JpdGVGbG9hdEJFO1xuICBhcnIud3JpdGVEb3VibGVMRSA9IEJQLndyaXRlRG91YmxlTEU7XG4gIGFyci53cml0ZURvdWJsZUJFID0gQlAud3JpdGVEb3VibGVCRTtcbiAgYXJyLmZpbGwgPSBCUC5maWxsO1xuICBhcnIuaW5zcGVjdCA9IEJQLmluc3BlY3Q7XG4gIGFyci50b0FycmF5QnVmZmVyID0gQlAudG9BcnJheUJ1ZmZlcjtcblxuICByZXR1cm4gYXJyO1xufTtcblxuLy8gc2xpY2Uoc3RhcnQsIGVuZClcbmZ1bmN0aW9uIGNsYW1wKGluZGV4LCBsZW4sIGRlZmF1bHRWYWx1ZSkge1xuICBpZiAodHlwZW9mIGluZGV4ICE9PSAnbnVtYmVyJykgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgaW5kZXggPSB+fmluZGV4OyAvLyBDb2VyY2UgdG8gaW50ZWdlci5cbiAgaWYgKGluZGV4ID49IGxlbikgcmV0dXJuIGxlbjtcbiAgaWYgKGluZGV4ID49IDApIHJldHVybiBpbmRleDtcbiAgaW5kZXggKz0gbGVuO1xuICBpZiAoaW5kZXggPj0gMCkgcmV0dXJuIGluZGV4O1xuICByZXR1cm4gMDtcbn1cblxuZnVuY3Rpb24gY29lcmNlKGxlbmd0aCkge1xuICAvLyBDb2VyY2UgbGVuZ3RoIHRvIGEgbnVtYmVyIChwb3NzaWJseSBOYU4pLCByb3VuZCB1cFxuICAvLyBpbiBjYXNlIGl0J3MgZnJhY3Rpb25hbCAoZS5nLiAxMjMuNDU2KSB0aGVuIGRvIGFcbiAgLy8gZG91YmxlIG5lZ2F0ZSB0byBjb2VyY2UgYSBOYU4gdG8gMC4gRWFzeSwgcmlnaHQ/XG4gIGxlbmd0aCA9IH5+TWF0aC5jZWlsKCtsZW5ndGgpO1xuICByZXR1cm4gbGVuZ3RoIDwgMCA/IDAgOiBsZW5ndGg7XG59XG5cbmZ1bmN0aW9uIGlzQXJyYXkoc3ViamVjdCkge1xuICByZXR1cm4gKEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKHN1YmplY3QpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN1YmplY3QpID09PSAnW29iamVjdCBBcnJheV0nO1xuICB9KShzdWJqZWN0KTtcbn1cblxuZnVuY3Rpb24gaXNBcnJheWlzaChzdWJqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5KHN1YmplY3QpIHx8IEJ1ZmZlci5pc0J1ZmZlcihzdWJqZWN0KSB8fCBzdWJqZWN0ICYmICh0eXBlb2Ygc3ViamVjdCA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2Yoc3ViamVjdCkpID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygc3ViamVjdC5sZW5ndGggPT09ICdudW1iZXInO1xufVxuXG5mdW5jdGlvbiB0b0hleChuKSB7XG4gIGlmIChuIDwgMTYpIHJldHVybiAnMCcgKyBuLnRvU3RyaW5nKDE2KTtcbiAgcmV0dXJuIG4udG9TdHJpbmcoMTYpO1xufVxuXG5mdW5jdGlvbiB1dGY4VG9CeXRlcyhzdHIpIHtcbiAgdmFyIGJ5dGVBcnJheSA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIHZhciBiID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgaWYgKGIgPD0gMHg3RikgYnl0ZUFycmF5LnB1c2goc3RyLmNoYXJDb2RlQXQoaSkpO2Vsc2Uge1xuICAgICAgdmFyIHN0YXJ0ID0gaTtcbiAgICAgIGlmIChiID49IDB4RDgwMCAmJiBiIDw9IDB4REZGRikgaSsrO1xuICAgICAgdmFyIGggPSBlbmNvZGVVUklDb21wb25lbnQoc3RyLnNsaWNlKHN0YXJ0LCBpICsgMSkpLnN1YnN0cigxKS5zcGxpdCgnJScpO1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBoLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGJ5dGVBcnJheS5wdXNoKHBhcnNlSW50KGhbal0sIDE2KSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBieXRlQXJyYXk7XG59XG5cbmZ1bmN0aW9uIGFzY2lpVG9CeXRlcyhzdHIpIHtcbiAgdmFyIGJ5dGVBcnJheSA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIC8vIE5vZGUncyBjb2RlIHNlZW1zIHRvIGJlIGRvaW5nIHRoaXMgYW5kIG5vdCAmIDB4N0YuLlxuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRik7XG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheTtcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVRvQnl0ZXMoc3RyKSB7XG4gIHZhciBjLCBoaSwgbG87XG4gIHZhciBieXRlQXJyYXkgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgaGkgPSBjID4+IDg7XG4gICAgbG8gPSBjICUgMjU2O1xuICAgIGJ5dGVBcnJheS5wdXNoKGxvKTtcbiAgICBieXRlQXJyYXkucHVzaChoaSk7XG4gIH1cblxuICByZXR1cm4gYnl0ZUFycmF5O1xufVxuXG5mdW5jdGlvbiBiYXNlNjRUb0J5dGVzKHN0cikge1xuICByZXR1cm4gYmFzZTY0LnRvQnl0ZUFycmF5KHN0cik7XG59XG5cbmZ1bmN0aW9uIGJsaXRCdWZmZXIoc3JjLCBkc3QsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBwb3M7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoaSArIG9mZnNldCA+PSBkc3QubGVuZ3RoIHx8IGkgPj0gc3JjLmxlbmd0aCkgYnJlYWs7XG4gICAgZHN0W2kgKyBvZmZzZXRdID0gc3JjW2ldO1xuICB9XG4gIHJldHVybiBpO1xufVxuXG5mdW5jdGlvbiBkZWNvZGVVdGY4Q2hhcihzdHIpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHN0cik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4RkZGRCk7IC8vIFVURiA4IGludmFsaWQgY2hhclxuICB9XG59XG5cbi8qXG4gKiBXZSBoYXZlIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSB2YWx1ZSBpcyBhIHZhbGlkIGludGVnZXIuIFRoaXMgbWVhbnMgdGhhdCBpdFxuICogaXMgbm9uLW5lZ2F0aXZlLiBJdCBoYXMgbm8gZnJhY3Rpb25hbCBjb21wb25lbnQgYW5kIHRoYXQgaXQgZG9lcyBub3RcbiAqIGV4Y2VlZCB0aGUgbWF4aW11bSBhbGxvd2VkIHZhbHVlLlxuICovXG5mdW5jdGlvbiB2ZXJpZnVpbnQodmFsdWUsIG1heCkge1xuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJywgJ2Nhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXInKTtcbiAgYXNzZXJ0KHZhbHVlID49IDAsICdzcGVjaWZpZWQgYSBuZWdhdGl2ZSB2YWx1ZSBmb3Igd3JpdGluZyBhbiB1bnNpZ25lZCB2YWx1ZScpO1xuICBhc3NlcnQodmFsdWUgPD0gbWF4LCAndmFsdWUgaXMgbGFyZ2VyIHRoYW4gbWF4aW11bSB2YWx1ZSBmb3IgdHlwZScpO1xuICBhc3NlcnQoTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlLCAndmFsdWUgaGFzIGEgZnJhY3Rpb25hbCBjb21wb25lbnQnKTtcbn1cblxuZnVuY3Rpb24gdmVyaWZzaW50KHZhbHVlLCBtYXgsIG1pbikge1xuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJywgJ2Nhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXInKTtcbiAgYXNzZXJ0KHZhbHVlIDw9IG1heCwgJ3ZhbHVlIGxhcmdlciB0aGFuIG1heGltdW0gYWxsb3dlZCB2YWx1ZScpO1xuICBhc3NlcnQodmFsdWUgPj0gbWluLCAndmFsdWUgc21hbGxlciB0aGFuIG1pbmltdW0gYWxsb3dlZCB2YWx1ZScpO1xuICBhc3NlcnQoTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlLCAndmFsdWUgaGFzIGEgZnJhY3Rpb25hbCBjb21wb25lbnQnKTtcbn1cblxuZnVuY3Rpb24gdmVyaWZJRUVFNzU0KHZhbHVlLCBtYXgsIG1pbikge1xuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJywgJ2Nhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXInKTtcbiAgYXNzZXJ0KHZhbHVlIDw9IG1heCwgJ3ZhbHVlIGxhcmdlciB0aGFuIG1heGltdW0gYWxsb3dlZCB2YWx1ZScpO1xuICBhc3NlcnQodmFsdWUgPj0gbWluLCAndmFsdWUgc21hbGxlciB0aGFuIG1pbmltdW0gYWxsb3dlZCB2YWx1ZScpO1xufVxuXG5mdW5jdGlvbiBhc3NlcnQodGVzdCwgbWVzc2FnZSkge1xuICBpZiAoIXRlc3QpIHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8ICdGYWlsZWQgYXNzZXJ0aW9uJyk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbWx1WkdWNExtcHpJbDBzSW01aGJXVnpJanBiSW1KaGMyVTJOQ0lzSW5KbGNYVnBjbVVpTENKcFpXVmxOelUwSWl3aVpYaHdiM0owY3lJc0lrSjFabVpsY2lJc0lsTnNiM2RDZFdabVpYSWlMQ0pKVGxOUVJVTlVYMDFCV0Y5Q1dWUkZVeUlzSW5CdmIyeFRhWHBsSWl3aVgzVnpaVlI1Y0dWa1FYSnlZWGx6SWl3aVluVm1JaXdpUVhKeVlYbENkV1ptWlhJaUxDSmhjbklpTENKVmFXNTBPRUZ5Y21GNUlpd2labTl2SWl3aWMzVmlZWEp5WVhraUxDSmxJaXdpYzNWaWFtVmpkQ0lzSW1WdVkyOWthVzVuSWl3aWJtOWFaWEp2SWl3aWRIbHdaU0lzSW5OMGNtbHVaM1J5YVcwaUxDSnNaVzVuZEdnaUxDSmpiMlZ5WTJVaUxDSmllWFJsVEdWdVozUm9JaXdpUlhKeWIzSWlMQ0pmWVhWbmJXVnVkQ0lzSWw5cGMwSjFabVpsY2lJc0lta2lMQ0pmYzJWMElpd2lhWE5CY25KaGVXbHphQ0lzSW1selFuVm1abVZ5SWl3aWNtVmhaRlZKYm5RNElpd2lkM0pwZEdVaUxDSnBjMFZ1WTI5a2FXNW5JaXdpVTNSeWFXNW5JaXdpZEc5TWIzZGxja05oYzJVaUxDSmlJaXdpZFc1a1pXWnBibVZrSWl3aWMzUnlJaXdpY21WMElpd2lkWFJtT0ZSdlFubDBaWE1pTENKaVlYTmxOalJVYjBKNWRHVnpJaXdpWTI5dVkyRjBJaXdpYkdsemRDSXNJblJ2ZEdGc1RHVnVaM1JvSWl3aVlYTnpaWEowSWl3aWFYTkJjbkpoZVNJc0luQnZjeUlzSW1sMFpXMGlMQ0pqYjNCNUlpd2lYMmhsZUZkeWFYUmxJaXdpYzNSeWFXNW5JaXdpYjJabWMyVjBJaXdpVG5WdFltVnlJaXdpY21WdFlXbHVhVzVuSWl3aWMzUnlUR1Z1SWl3aVlubDBaU0lzSW5CaGNuTmxTVzUwSWl3aWMzVmljM1J5SWl3aWFYTk9ZVTRpTENKZlkyaGhjbk5YY21sMGRHVnVJaXdpWDNWMFpqaFhjbWwwWlNJc0ltTm9ZWEp6VjNKcGRIUmxiaUlzSW1Kc2FYUkNkV1ptWlhJaUxDSmZZWE5qYVdsWGNtbDBaU0lzSW1GelkybHBWRzlDZVhSbGN5SXNJbDlpYVc1aGNubFhjbWwwWlNJc0lsOWlZWE5sTmpSWGNtbDBaU0lzSWw5MWRHWXhObXhsVjNKcGRHVWlMQ0oxZEdZeE5teGxWRzlDZVhSbGN5SXNJbkJ5YjNSdmRIbHdaU0lzSW1selJtbHVhWFJsSWl3aWMzZGhjQ0lzSW5SdlUzUnlhVzVuSWl3aWMzUmhjblFpTENKbGJtUWlMQ0p6Wld4bUlpd2lYMmhsZUZOc2FXTmxJaXdpWDNWMFpqaFRiR2xqWlNJc0lsOWhjMk5wYVZOc2FXTmxJaXdpWDJKcGJtRnllVk5zYVdObElpd2lYMkpoYzJVMk5GTnNhV05sSWl3aVgzVjBaakUyYkdWVGJHbGpaU0lzSW5SdlNsTlBUaUlzSW1SaGRHRWlMQ0pCY25KaGVTSXNJbk5zYVdObElpd2lZMkZzYkNJc0lsOWhjbklpTENKMFlYSm5aWFFpTENKMFlYSm5aWFJmYzNSaGNuUWlMQ0p6YjNWeVkyVWlMQ0pzWlc0aUxDSm1jbTl0UW5sMFpVRnljbUY1SWl3aWNtVnpJaXdpZEcxd0lpd2lUV0YwYUNJc0ltMXBiaUlzSW1SbFkyOWtaVlYwWmpoRGFHRnlJaXdpWm5KdmJVTm9ZWEpEYjJSbElpd2liM1YwSWl3aWRHOUlaWGdpTENKaWVYUmxjeUlzSW1Oc1lXMXdJaXdpYzJ4cFkyVk1aVzRpTENKdVpYZENkV1lpTENKblpYUWlMQ0pqYjI1emIyeGxJaXdpYkc5bklpd2ljMlYwSWl3aWRpSXNJbmR5YVhSbFZVbHVkRGdpTENKdWIwRnpjMlZ5ZENJc0lsOXlaV0ZrVlVsdWRERTJJaXdpYkdsMGRHeGxSVzVrYVdGdUlpd2lkbUZzSWl3aWNtVmhaRlZKYm5ReE5reEZJaXdpY21WaFpGVkpiblF4TmtKRklpd2lYM0psWVdSVlNXNTBNeklpTENKeVpXRmtWVWx1ZERNeVRFVWlMQ0p5WldGa1ZVbHVkRE15UWtVaUxDSnlaV0ZrU1c1ME9DSXNJbTVsWnlJc0lsOXlaV0ZrU1c1ME1UWWlMQ0p5WldGa1NXNTBNVFpNUlNJc0luSmxZV1JKYm5ReE5rSkZJaXdpWDNKbFlXUkpiblF6TWlJc0luSmxZV1JKYm5Rek1reEZJaXdpY21WaFpFbHVkRE15UWtVaUxDSmZjbVZoWkVac2IyRjBJaXdpY21WaFpDSXNJbkpsWVdSR2JHOWhkRXhGSWl3aWNtVmhaRVpzYjJGMFFrVWlMQ0pmY21WaFpFUnZkV0pzWlNJc0luSmxZV1JFYjNWaWJHVk1SU0lzSW5KbFlXUkViM1ZpYkdWQ1JTSXNJblpoYkhWbElpd2lkbVZ5YVdaMWFXNTBJaXdpWDNkeWFYUmxWVWx1ZERFMklpd2lhaUlzSW5keWFYUmxWVWx1ZERFMlRFVWlMQ0ozY21sMFpWVkpiblF4TmtKRklpd2lYM2R5YVhSbFZVbHVkRE15SWl3aWQzSnBkR1ZWU1c1ME16Sk1SU0lzSW5keWFYUmxWVWx1ZERNeVFrVWlMQ0ozY21sMFpVbHVkRGdpTENKMlpYSnBabk5wYm5RaUxDSmZkM0pwZEdWSmJuUXhOaUlzSW5keWFYUmxTVzUwTVRaTVJTSXNJbmR5YVhSbFNXNTBNVFpDUlNJc0lsOTNjbWwwWlVsdWRETXlJaXdpZDNKcGRHVkpiblF6TWt4Rklpd2lkM0pwZEdWSmJuUXpNa0pGSWl3aVgzZHlhWFJsUm14dllYUWlMQ0oyWlhKcFprbEZSVVUzTlRRaUxDSjNjbWwwWlVac2IyRjBURVVpTENKM2NtbDBaVVpzYjJGMFFrVWlMQ0pmZDNKcGRHVkViM1ZpYkdVaUxDSjNjbWwwWlVSdmRXSnNaVXhGSWl3aWQzSnBkR1ZFYjNWaWJHVkNSU0lzSW1acGJHd2lMQ0pqYUdGeVEyOWtaVUYwSWl3aWFXNXpjR1ZqZENJc0ltcHZhVzRpTENKMGIwRnljbUY1UW5WbVptVnlJaXdpWW5WbVptVnlJaXdpZEhKcGJTSXNJbkpsY0d4aFkyVWlMQ0pDVUNJc0lsOW5aWFFpTENKMGIweHZZMkZzWlZOMGNtbHVaeUlzSW1sdVpHVjRJaXdpWkdWbVlYVnNkRlpoYkhWbElpd2lZMlZwYkNJc0lrOWlhbVZqZENJc0ltNGlMQ0ppZVhSbFFYSnlZWGtpTENKd2RYTm9JaXdpYUNJc0ltVnVZMjlrWlZWU1NVTnZiWEJ2Ym1WdWRDSXNJbk53YkdsMElpd2lZeUlzSW1ocElpd2liRzhpTENKMGIwSjVkR1ZCY25KaGVTSXNJbk55WXlJc0ltUnpkQ0lzSW1SbFkyOWtaVlZTU1VOdmJYQnZibVZ1ZENJc0ltVnljaUlzSW0xaGVDSXNJbVpzYjI5eUlpd2lkR1Z6ZENJc0ltMWxjM05oWjJVaVhTd2liV0Z3Y0dsdVozTWlPaUk3T3pzN1FVRkJRVHM3T3pzN096dEJRVTlCTEVsQlFVbEJMRk5CUVZORExGRkJRVkVzVjBGQlVpeERRVUZpTzBGQlEwRXNTVUZCU1VNc1ZVRkJWVVFzVVVGQlVTeFRRVUZTTEVOQlFXUTdPMEZCUlVGRkxGRkJRVkZETEUxQlFWSXNSMEZCYVVKQkxFMUJRV3BDTzBGQlEwRkVMRkZCUVZGRkxGVkJRVklzUjBGQmNVSkVMRTFCUVhKQ08wRkJRMEZFTEZGQlFWRkhMR2xDUVVGU0xFZEJRVFJDTEVWQlFUVkNPMEZCUTBGR0xFOUJRVTlITEZGQlFWQXNSMEZCYTBJc1NVRkJiRUk3TzBGQlJVRTdPenM3TzBGQlMwRklMRTlCUVU5SkxHVkJRVkFzUjBGQk1FSXNXVUZCV1R0QlFVTndRenRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNUVUZCU1R0QlFVTkdMRkZCUVVsRExFMUJRVTBzU1VGQlNVTXNWMEZCU2l4RFFVRm5RaXhEUVVGb1FpeERRVUZXTzBGQlEwRXNVVUZCU1VNc1RVRkJUU3hKUVVGSlF5eFZRVUZLTEVOQlFXVklMRWRCUVdZc1EwRkJWanRCUVVOQlJTeFJRVUZKUlN4SFFVRktMRWRCUVZVc1dVRkJXVHRCUVVGRkxHRkJRVThzUlVGQlVEdEJRVUZYTEV0QlFXNURPMEZCUTBFc1YwRkJUeXhQUVVGUFJpeEpRVUZKUlN4SFFVRktMRVZCUVZBc1NVRkRTQ3hQUVVGUFJpeEpRVUZKUnl4UlFVRllMRXRCUVhkQ0xGVkJSRFZDTEVOQlNrVXNRMEZMY1VNN1FVRkRlRU1zUjBGT1JDeERRVTFGTEU5QlFVOURMRU5CUVZBc1JVRkJWVHRCUVVOV0xGZEJRVThzUzBGQlVEdEJRVU5FTzBGQlEwWXNRMEZtZDBJc1JVRkJla0k3TzBGQmFVSkJPenM3T3pzN096czdPenM3UVVGWlFTeFRRVUZUV0N4TlFVRlVMRU5CUVdsQ1dTeFBRVUZxUWl4RlFVRXdRa01zVVVGQk1VSXNSVUZCYjBORExFMUJRWEJETEVWQlFUUkRPMEZCUXpGRExFMUJRVWtzUlVGQlJTeG5Ra0ZCWjBKa0xFMUJRV3hDTEVOQlFVb3NSVUZEUlN4UFFVRlBMRWxCUVVsQkxFMUJRVW9zUTBGQlYxa3NUMEZCV0N4RlFVRnZRa01zVVVGQmNFSXNSVUZCT0VKRExFMUJRVGxDTEVOQlFWQTdPMEZCUlVZc1RVRkJTVU1zWTBGQlkwZ3NUMEZCWkN4NVEwRkJZMEVzVDBGQlpDeERRVUZLT3p0QlFVVkJPMEZCUTBFN1FVRkRRU3hOUVVGSlF5eGhRVUZoTEZGQlFXSXNTVUZCZVVKRkxGTkJRVk1zVVVGQmRFTXNSVUZCWjBRN1FVRkRPVU5JTEdOQlFWVkpMRmRCUVZkS0xFOUJRVmdzUTBGQlZqdEJRVU5CTEZkQlFVOUJMRkZCUVZGTExFMUJRVklzUjBGQmFVSXNRMEZCYWtJc1MwRkJkVUlzUTBGQk9VSXNSVUZCYVVNN1FVRkRMMEpNTEdkQ1FVRlZRU3hWUVVGVkxFZEJRWEJDTzBGQlEwUTdRVUZEUmpzN1FVRkZSRHRCUVVOQkxFMUJRVWxMTEUxQlFVbzdRVUZEUVN4TlFVRkpSaXhUUVVGVExGRkJRV0lzUlVGRFJVVXNVMEZCVTBNc1QwRkJUMDRzVDBGQlVDeERRVUZVTEVOQlJFWXNTMEZGU3l4SlFVRkpSeXhUUVVGVExGRkJRV0lzUlVGRFNFVXNVMEZCVTJwQ0xFOUJRVTl0UWl4VlFVRlFMRU5CUVd0Q1VDeFBRVUZzUWl4RlFVRXlRa01zVVVGQk0wSXNRMEZCVkN4RFFVUkhMRXRCUlVFc1NVRkJTVVVzVTBGQlV5eFJRVUZpTEVWQlEwaEZMRk5CUVZORExFOUJRVTlPTEZGQlFWRkxMRTFCUVdZc1EwRkJWQ3hEUVVSSExFTkJRelpDTzBGQlJEZENMRTlCUjBnc1RVRkJUU3hKUVVGSlJ5eExRVUZLTEVOQlFWVXNkVVJCUVZZc1EwRkJUanM3UVVGRlJpeE5RVUZKWml4SFFVRktPMEZCUTBFc1RVRkJTVXdzVDBGQlQwa3NaVUZCV0N4RlFVRTBRanRCUVVNeFFqdEJRVU5CUXl4VlFVRk5UQ3hQUVVGUGNVSXNVVUZCVUN4RFFVRm5RaXhKUVVGSllpeFZRVUZLTEVOQlFXVlRMRTFCUVdZc1EwRkJhRUlzUTBGQlRqdEJRVU5FTEVkQlNFUXNUVUZIVHp0QlFVTk1PMEZCUTBGYUxGVkJRVTBzU1VGQlRqdEJRVU5CUVN4UlFVRkpXU3hOUVVGS0xFZEJRV0ZCTEUxQlFXSTdRVUZEUVZvc1VVRkJTV2xDTEZOQlFVb3NSMEZCWjBJc1NVRkJhRUk3UVVGRFJEczdRVUZGUkN4TlFVRkpReXhEUVVGS08wRkJRMEVzVFVGQlNYWkNMRTlCUVU5SkxHVkJRVkFzU1VGQk1FSXNUMEZCVDFFc1VVRkJVVThzVlVGQlppeExRVUU0UWl4UlFVRTFSQ3hGUVVGelJUdEJRVU53UlR0QlFVTkJaQ3hSUVVGSmJVSXNTVUZCU2l4RFFVRlRXaXhQUVVGVU8wRkJRMFFzUjBGSVJDeE5RVWRQTEVsQlFVbGhMRmRCUVZkaUxFOUJRVmdzUTBGQlNpeEZRVUY1UWp0QlFVTTVRanRCUVVOQkxGTkJRVXRYTEVsQlFVa3NRMEZCVkN4RlFVRlpRU3hKUVVGSlRpeE5RVUZvUWl4RlFVRjNRazBzUjBGQmVFSXNSVUZCTmtJN1FVRkRNMElzVlVGQlNYWkNMRTlCUVU4d1FpeFJRVUZRTEVOQlFXZENaQ3hQUVVGb1FpeERRVUZLTEVWQlEwVlFMRWxCUVVsclFpeERRVUZLTEVsQlFWTllMRkZCUVZGbExGTkJRVklzUTBGQmEwSktMRU5CUVd4Q0xFTkJRVlFzUTBGRVJpeExRVWRGYkVJc1NVRkJTV3RDTEVOQlFVb3NTVUZCVTFnc1VVRkJVVmNzUTBGQlVpeERRVUZVTzBGQlEwZzdRVUZEUml4SFFWSk5MRTFCVVVFc1NVRkJTVklzVTBGQlV5eFJRVUZpTEVWQlFYVkNPMEZCUXpWQ1ZpeFJRVUZKZFVJc1MwRkJTaXhEUVVGVmFFSXNUMEZCVml4RlFVRnRRaXhEUVVGdVFpeEZRVUZ6UWtNc1VVRkJkRUk3UVVGRFJDeEhRVVpOTEUxQlJVRXNTVUZCU1VVc1UwRkJVeXhSUVVGVUxFbEJRWEZDTEVOQlFVTm1MRTlCUVU5SkxHVkJRVGRDTEVsQlFXZEVMRU5CUVVOVkxFMUJRWEpFTEVWQlFUWkVPMEZCUTJ4RkxGTkJRVXRUTEVsQlFVa3NRMEZCVkN4RlFVRlpRU3hKUVVGSlRpeE5RVUZvUWl4RlFVRjNRazBzUjBGQmVFSXNSVUZCTmtJN1FVRkRNMEpzUWl4VlFVRkphMElzUTBGQlNpeEpRVUZUTEVOQlFWUTdRVUZEUkR0QlFVTkdPenRCUVVWRUxGTkJRVTlzUWl4SFFVRlFPMEZCUTBRN08wRkJSVVE3UVVGRFFUczdRVUZGUVV3c1QwRkJUelpDTEZWQlFWQXNSMEZCYjBJc1ZVRkJWV2hDTEZGQlFWWXNSVUZCYjBJN1FVRkRkRU1zVlVGQlVXbENMRTlCUVU5cVFpeFJRVUZRTEVWQlFXbENhMElzVjBGQmFrSXNSVUZCVWp0QlFVTkZMRk5CUVVzc1MwRkJURHRCUVVOQkxGTkJRVXNzVFVGQlREdEJRVU5CTEZOQlFVc3NUMEZCVER0QlFVTkJMRk5CUVVzc1QwRkJURHRCUVVOQkxGTkJRVXNzVVVGQlREdEJRVU5CTEZOQlFVc3NVVUZCVER0QlFVTkJMRk5CUVVzc1MwRkJURHRCUVVOQkxGTkJRVXNzVFVGQlREdEJRVU5CTEZOQlFVc3NUMEZCVER0QlFVTkJMRk5CUVVzc1UwRkJURHRCUVVOQkxGTkJRVXNzVlVGQlREdEJRVU5GTEdGQlFVOHNTVUZCVUR0QlFVTkdPMEZCUTBVc1lVRkJUeXhMUVVGUU8wRkJaRW83UVVGblFrUXNRMEZxUWtRN08wRkJiVUpCTDBJc1QwRkJUekJDTEZGQlFWQXNSMEZCYTBJc1ZVRkJWVTBzUTBGQlZpeEZRVUZoTzBGQlF6ZENMRk5CUVU4c1EwRkJReXhGUVVGRlFTeE5RVUZOTEVsQlFVNHNTVUZCWTBFc1RVRkJUVU1zVTBGQmNFSXNTVUZCYVVORUxFVkJRVVZXTEZOQlFYSkRMRU5CUVZJN1FVRkRSQ3hEUVVaRU96dEJRVWxCZEVJc1QwRkJUMjFDTEZWQlFWQXNSMEZCYjBJc1ZVRkJWV1VzUjBGQlZpeEZRVUZsY2tJc1VVRkJaaXhGUVVGNVFqdEJRVU16UXl4TlFVRkpjMElzUjBGQlNqdEJRVU5CUkN4UlFVRk5RU3hOUVVGTkxFVkJRVm83UVVGRFFTeFZRVUZSY2tJc1dVRkJXU3hOUVVGd1FqdEJRVU5GTEZOQlFVc3NTMEZCVER0QlFVTkZjMElzV1VGQlRVUXNTVUZCU1dwQ0xFMUJRVW9zUjBGQllTeERRVUZ1UWp0QlFVTkJPMEZCUTBZc1UwRkJTeXhOUVVGTU8wRkJRMEVzVTBGQlN5eFBRVUZNTzBGQlEwVnJRaXhaUVVGTlF5eFpRVUZaUml4SFFVRmFMRVZCUVdsQ2FrSXNUVUZCZGtJN1FVRkRRVHRCUVVOR0xGTkJRVXNzVDBGQlREdEJRVU5CTEZOQlFVc3NVVUZCVER0QlFVTkJMRk5CUVVzc1MwRkJURHRCUVVORmEwSXNXVUZCVFVRc1NVRkJTV3BDTEUxQlFWWTdRVUZEUVR0QlFVTkdMRk5CUVVzc1VVRkJURHRCUVVORmEwSXNXVUZCVFVVc1kwRkJZMGdzUjBGQlpDeEZRVUZ0UW1wQ0xFMUJRWHBDTzBGQlEwRTdRVUZEUml4VFFVRkxMRTFCUVV3N1FVRkRRU3hUUVVGTExFOUJRVXc3UVVGRFFTeFRRVUZMTEZOQlFVdzdRVUZEUVN4VFFVRkxMRlZCUVV3N1FVRkRSV3RDTEZsQlFVMUVMRWxCUVVscVFpeE5RVUZLTEVkQlFXRXNRMEZCYmtJN1FVRkRRVHRCUVVOR08wRkJRMFVzV1VGQlRTeEpRVUZKUnl4TFFVRktMRU5CUVZVc2EwSkJRVllzUTBGQlRqdEJRWFpDU2p0QlFYbENRU3hUUVVGUFpTeEhRVUZRTzBGQlEwUXNRMEUzUWtRN08wRkJLMEpCYmtNc1QwRkJUM05ETEUxQlFWQXNSMEZCWjBJc1ZVRkJWVU1zU1VGQlZpeEZRVUZuUWtNc1YwRkJhRUlzUlVGQk5rSTdRVUZETTBORExGTkJRVTlETEZGQlFWRklMRWxCUVZJc1EwRkJVQ3hGUVVGelFpeG5SRUZEYkVJc01FSkJSRW83TzBGQlIwRXNUVUZCU1VFc1MwRkJTM1JDTEUxQlFVd3NTMEZCWjBJc1EwRkJjRUlzUlVGQmRVSTdRVUZEY2tJc1YwRkJUeXhKUVVGSmFrSXNUVUZCU2l4RFFVRlhMRU5CUVZnc1EwRkJVRHRCUVVORUxFZEJSa1FzVFVGRlR5eEpRVUZKZFVNc1MwRkJTM1JDTEUxQlFVd3NTMEZCWjBJc1EwRkJjRUlzUlVGQmRVSTdRVUZETlVJc1YwRkJUM05DTEV0QlFVc3NRMEZCVEN4RFFVRlFPMEZCUTBRN08wRkJSVVFzVFVGQlNXaENMRU5CUVVvN1FVRkRRU3hOUVVGSkxFOUJRVTlwUWl4WFFVRlFMRXRCUVhWQ0xGRkJRVE5DTEVWQlFYRkRPMEZCUTI1RFFTeHJRa0ZCWXl4RFFVRmtPMEZCUTBFc1UwRkJTMnBDTEVsQlFVa3NRMEZCVkN4RlFVRlpRU3hKUVVGSlowSXNTMEZCUzNSQ0xFMUJRWEpDTEVWQlFUWkNUU3hIUVVFM1FpeEZRVUZyUXp0QlFVTm9RMmxDTEhGQ1FVRmxSQ3hMUVVGTGFFSXNRMEZCVEN4RlFVRlJUaXhOUVVGMlFqdEJRVU5FTzBGQlEwWTdPMEZCUlVRc1RVRkJTVm9zVFVGQlRTeEpRVUZKVEN4TlFVRktMRU5CUVZkM1F5eFhRVUZZTEVOQlFWWTdRVUZEUVN4TlFVRkpSeXhOUVVGTkxFTkJRVlk3UVVGRFFTeFBRVUZMY0VJc1NVRkJTU3hEUVVGVUxFVkJRVmxCTEVsQlFVbG5RaXhMUVVGTGRFSXNUVUZCY2tJc1JVRkJOa0pOTEVkQlFUZENMRVZCUVd0RE8wRkJRMmhETEZGQlFVbHhRaXhQUVVGUFRDeExRVUZMYUVJc1EwRkJUQ3hEUVVGWU8wRkJRMEZ4UWl4VFFVRkxReXhKUVVGTUxFTkJRVlY0UXl4SFFVRldMRVZCUVdWelF5eEhRVUZtTzBGQlEwRkJMRmRCUVU5RExFdEJRVXN6UWl4TlFVRmFPMEZCUTBRN1FVRkRSQ3hUUVVGUFdpeEhRVUZRTzBGQlEwUXNRMEV4UWtRN08wRkJORUpCTzBGQlEwRTdPMEZCUlVFc1UwRkJVM2xETEZOQlFWUXNRMEZCYjBKNlF5eEhRVUZ3UWl4RlFVRjVRakJETEUxQlFYcENMRVZCUVdsRFF5eE5RVUZxUXl4RlFVRjVReTlDTEUxQlFYcERMRVZCUVdsRU8wRkJReTlESzBJc1YwRkJVME1zVDBGQlQwUXNUVUZCVUN4TFFVRnJRaXhEUVVFelFqdEJRVU5CTEUxQlFVbEZMRmxCUVZrM1F5eEpRVUZKV1N4TlFVRktMRWRCUVdFclFpeE5RVUUzUWp0QlFVTkJMRTFCUVVrc1EwRkJReTlDTEUxQlFVd3NSVUZCWVR0QlFVTllRU3hoUVVGVGFVTXNVMEZCVkR0QlFVTkVMRWRCUmtRc1RVRkZUenRCUVVOTWFrTXNZVUZCVTJkRExFOUJRVTlvUXl4TlFVRlFMRU5CUVZRN1FVRkRRU3hSUVVGSlFTeFRRVUZUYVVNc1UwRkJZaXhGUVVGM1FqdEJRVU4wUW1wRExHVkJRVk5wUXl4VFFVRlVPMEZCUTBRN1FVRkRSanM3UVVGRlJEdEJRVU5CTEUxQlFVbERMRk5CUVZOS0xFOUJRVTg1UWl4TlFVRndRanRCUVVOQmQwSXNVMEZCVDFVc1UwRkJVeXhEUVVGVUxFdEJRV1VzUTBGQmRFSXNSVUZCZVVJc2IwSkJRWHBDT3p0QlFVVkJMRTFCUVVsc1F5eFRRVUZUYTBNc1UwRkJVeXhEUVVGMFFpeEZRVUY1UWp0QlFVTjJRbXhETEdGQlFWTnJReXhUUVVGVExFTkJRV3hDTzBGQlEwUTdRVUZEUkN4UFFVRkxMRWxCUVVrMVFpeEpRVUZKTEVOQlFXSXNSVUZCWjBKQkxFbEJRVWxPTEUxQlFYQkNMRVZCUVRSQ1RTeEhRVUUxUWl4RlFVRnBRenRCUVVNdlFpeFJRVUZKTmtJc1QwRkJUME1zVTBGQlUwNHNUMEZCVDA4c1RVRkJVQ3hEUVVGakwwSXNTVUZCU1N4RFFVRnNRaXhGUVVGeFFpeERRVUZ5UWl4RFFVRlVMRVZCUVd0RExFVkJRV3hETEVOQlFWZzdRVUZEUVd0Q0xGZEJRVThzUTBGQlEyTXNUVUZCVFVnc1NVRkJUaXhEUVVGU0xFVkJRWEZDTEc5Q1FVRnlRanRCUVVOQkwwTXNVVUZCU1RKRExGTkJRVk42UWl4RFFVRmlMRWxCUVd0Q05rSXNTVUZCYkVJN1FVRkRSRHRCUVVORWNFUXNVMEZCVDNkRUxHRkJRVkFzUjBGQmRVSnFReXhKUVVGSkxFTkJRVE5DTzBGQlEwRXNVMEZCVDBFc1EwRkJVRHRCUVVORU96dEJRVVZFTEZOQlFWTnJReXhWUVVGVUxFTkJRWEZDY0VRc1IwRkJja0lzUlVGQk1FSXdReXhOUVVFeFFpeEZRVUZyUTBNc1RVRkJiRU1zUlVGQk1FTXZRaXhOUVVFeFF5eEZRVUZyUkR0QlFVTm9SQ3hOUVVGSmVVTXNaVUZCWlRGRUxFOUJRVTkzUkN4aFFVRlFMRWRCUTJwQ1J5eFhRVUZYZGtJc1dVRkJXVmNzVFVGQldpeERRVUZZTEVWQlFXZERNVU1zUjBGQmFFTXNSVUZCY1VNeVF5eE5RVUZ5UXl4RlFVRTJReTlDTEUxQlFUZERMRU5CUkVZN1FVRkZRU3hUUVVGUGVVTXNXVUZCVUR0QlFVTkVPenRCUVVWRUxGTkJRVk5GTEZkQlFWUXNRMEZCYzBKMlJDeEhRVUYwUWl4RlFVRXlRakJETEUxQlFUTkNMRVZCUVcxRFF5eE5RVUZ1UXl4RlFVRXlReTlDTEUxQlFUTkRMRVZCUVcxRU8wRkJRMnBFTEUxQlFVbDVReXhsUVVGbE1VUXNUMEZCVDNkRUxHRkJRVkFzUjBGRGFrSkhMRmRCUVZkRkxHRkJRV0ZrTEUxQlFXSXNRMEZCV0N4RlFVRnBRekZETEVkQlFXcERMRVZCUVhORE1rTXNUVUZCZEVNc1JVRkJPRU12UWl4TlFVRTVReXhEUVVSR08wRkJSVUVzVTBGQlQzbERMRmxCUVZBN1FVRkRSRHM3UVVGRlJDeFRRVUZUU1N4WlFVRlVMRU5CUVhWQ2VrUXNSMEZCZGtJc1JVRkJORUl3UXl4TlFVRTFRaXhGUVVGdlEwTXNUVUZCY0VNc1JVRkJORU12UWl4TlFVRTFReXhGUVVGdlJEdEJRVU5zUkN4VFFVRlBNa01zV1VGQldYWkVMRWRCUVZvc1JVRkJhVUl3UXl4TlFVRnFRaXhGUVVGNVFrTXNUVUZCZWtJc1JVRkJhVU12UWl4TlFVRnFReXhEUVVGUU8wRkJRMFE3TzBGQlJVUXNVMEZCVXpoRExGbEJRVlFzUTBGQmRVSXhSQ3hIUVVGMlFpeEZRVUUwUWpCRExFMUJRVFZDTEVWQlFXOURReXhOUVVGd1F5eEZRVUUwUXk5Q0xFMUJRVFZETEVWQlFXOUVPMEZCUTJ4RUxFMUJRVWw1UXl4bFFVRmxNVVFzVDBGQlQzZEVMR0ZCUVZBc1IwRkRha0pITEZkQlFWZDBRaXhqUVVGalZTeE5RVUZrTEVOQlFWZ3NSVUZCYTBNeFF5eEhRVUZzUXl4RlFVRjFRekpETEUxQlFYWkRMRVZCUVN0REwwSXNUVUZCTDBNc1EwRkVSanRCUVVWQkxGTkJRVTk1UXl4WlFVRlFPMEZCUTBRN08wRkJSVVFzVTBGQlUwMHNZVUZCVkN4RFFVRjNRak5FTEVkQlFYaENMRVZCUVRaQ01FTXNUVUZCTjBJc1JVRkJjVU5ETEUxQlFYSkRMRVZCUVRaREwwSXNUVUZCTjBNc1JVRkJjVVE3UVVGRGJrUXNUVUZCU1hsRExHVkJRV1V4UkN4UFFVRlBkMFFzWVVGQlVDeEhRVU5xUWtjc1YwRkJWMDBzWlVGQlpXeENMRTFCUVdZc1EwRkJXQ3hGUVVGdFF6RkRMRWRCUVc1RExFVkJRWGRETWtNc1RVRkJlRU1zUlVGQlowUXZRaXhOUVVGb1JDeERRVVJHTzBGQlJVRXNVMEZCVDNsRExGbEJRVkE3UVVGRFJEczdRVUZGUkRGRUxFOUJRVTlyUlN4VFFVRlFMRU5CUVdsQ2RFTXNTMEZCYWtJc1IwRkJlVUlzVlVGQlZXMUNMRTFCUVZZc1JVRkJhMEpETEUxQlFXeENMRVZCUVRCQ0wwSXNUVUZCTVVJc1JVRkJhME5LTEZGQlFXeERMRVZCUVRSRE8wRkJRMjVGTzBGQlEwRTdRVUZEUVN4TlFVRkpjMFFzVTBGQlUyNUNMRTFCUVZRc1EwRkJTaXhGUVVGelFqdEJRVU53UWl4UlFVRkpMRU5CUVVOdFFpeFRRVUZUYkVRc1RVRkJWQ3hEUVVGTUxFVkJRWFZDTzBGQlEzSkNTaXhwUWtGQlYwa3NUVUZCV0R0QlFVTkJRU3hsUVVGVFowSXNVMEZCVkR0QlFVTkVPMEZCUTBZc1IwRk1SQ3hOUVV0UE8wRkJRVWM3UVVGRFVpeFJRVUZKYlVNc1QwRkJUM1pFTEZGQlFWZzdRVUZEUVVFc1pVRkJWMjFETEUxQlFWZzdRVUZEUVVFc1lVRkJVeTlDTEUxQlFWUTdRVUZEUVVFc1lVRkJVMjFFTEVsQlFWUTdRVUZEUkRzN1FVRkZSSEJDTEZkQlFWTkRMRTlCUVU5RUxFMUJRVkFzUzBGQmEwSXNRMEZCTTBJN1FVRkRRU3hOUVVGSlJTeFpRVUZaTEV0QlFVdHFReXhOUVVGTUxFZEJRV01yUWl4TlFVRTVRanRCUVVOQkxFMUJRVWtzUTBGQlF5OUNMRTFCUVV3c1JVRkJZVHRCUVVOWVFTeGhRVUZUYVVNc1UwRkJWRHRCUVVORUxFZEJSa1FzVFVGRlR6dEJRVU5NYWtNc1lVRkJVMmRETEU5QlFVOW9ReXhOUVVGUUxFTkJRVlE3UVVGRFFTeFJRVUZKUVN4VFFVRlRhVU1zVTBGQllpeEZRVUYzUWp0QlFVTjBRbXBETEdWQlFWTnBReXhUUVVGVU8wRkJRMFE3UVVGRFJqdEJRVU5FY2tNc1lVRkJWMmxDTEU5QlFVOXFRaXhaUVVGWkxFMUJRVzVDTEVWQlFUSkNhMElzVjBGQk0wSXNSVUZCV0RzN1FVRkZRU3hOUVVGSlNTeEhRVUZLTzBGQlEwRXNWVUZCVVhSQ0xGRkJRVkk3UVVGRFJTeFRRVUZMTEV0QlFVdzdRVUZEUlhOQ0xGbEJRVTFYTEZWQlFWVXNTVUZCVml4RlFVRm5Ra01zVFVGQmFFSXNSVUZCZDBKRExFMUJRWGhDTEVWQlFXZERMMElzVFVGQmFFTXNRMEZCVGp0QlFVTkJPMEZCUTBZc1UwRkJTeXhOUVVGTU8wRkJRMEVzVTBGQlN5eFBRVUZNTzBGQlEwVnJRaXhaUVVGTmMwSXNWMEZCVnl4SlFVRllMRVZCUVdsQ1ZpeE5RVUZxUWl4RlFVRjVRa01zVFVGQmVrSXNSVUZCYVVNdlFpeE5RVUZxUXl4RFFVRk9PMEZCUTBFN1FVRkRSaXhUUVVGTExFOUJRVXc3UVVGRFJXdENMRmxCUVUxNVFpeFpRVUZaTEVsQlFWb3NSVUZCYTBKaUxFMUJRV3hDTEVWQlFUQkNReXhOUVVFeFFpeEZRVUZyUXk5Q0xFMUJRV3hETEVOQlFVNDdRVUZEUVR0QlFVTkdMRk5CUVVzc1VVRkJURHRCUVVORmEwSXNXVUZCVFRKQ0xHRkJRV0VzU1VGQllpeEZRVUZ0UW1Zc1RVRkJia0lzUlVGQk1rSkRMRTFCUVROQ0xFVkJRVzFETDBJc1RVRkJia01zUTBGQlRqdEJRVU5CTzBGQlEwWXNVMEZCU3l4UlFVRk1PMEZCUTBWclFpeFpRVUZOTkVJc1lVRkJZU3hKUVVGaUxFVkJRVzFDYUVJc1RVRkJia0lzUlVGQk1rSkRMRTFCUVROQ0xFVkJRVzFETDBJc1RVRkJia01zUTBGQlRqdEJRVU5CTzBGQlEwWXNVMEZCU3l4TlFVRk1PMEZCUTBFc1UwRkJTeXhQUVVGTU8wRkJRMEVzVTBGQlN5eFRRVUZNTzBGQlEwRXNVMEZCU3l4VlFVRk1PMEZCUTBWclFpeFpRVUZOTmtJc1kwRkJZeXhKUVVGa0xFVkJRVzlDYWtJc1RVRkJjRUlzUlVGQk5FSkRMRTFCUVRWQ0xFVkJRVzlETDBJc1RVRkJjRU1zUTBGQlRqdEJRVU5CTzBGQlEwWTdRVUZEUlN4WlFVRk5MRWxCUVVsSExFdEJRVW9zUTBGQlZTeHJRa0ZCVml4RFFVRk9PMEZCZUVKS08wRkJNRUpCTEZOQlFVOWxMRWRCUVZBN1FVRkRSQ3hEUVhaRVJEczdRVUY1UkVGdVF5eFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFrY3NVVUZCYWtJc1IwRkJORUlzVlVGQlZYaEVMRkZCUVZZc1JVRkJiMEo1UkN4TFFVRndRaXhGUVVFeVFrTXNSMEZCTTBJc1JVRkJaME03UVVGRE1VUXNUVUZCU1VNc1QwRkJUeXhKUVVGWU96dEJRVVZCTTBRc1lVRkJWMmxDTEU5QlFVOXFRaXhaUVVGWkxFMUJRVzVDTEVWQlFUSkNhMElzVjBGQk0wSXNSVUZCV0R0QlFVTkJkVU1zVlVGQlVYSkNMRTlCUVU5eFFpeExRVUZRTEV0QlFXbENMRU5CUVhwQ08wRkJRMEZETEZGQlFVOUJMRkZCUVZGMFF5eFRRVUZVTEVkQlEwWm5RaXhQUVVGUGMwSXNSMEZCVUN4RFFVUkZMRWRCUlVaQkxFMUJRVTFETEV0QlFVdDJSQ3hOUVVabU96dEJRVWxCTzBGQlEwRXNUVUZCU1hORUxGRkJRVkZFTEV0QlFWb3NSVUZEUlN4UFFVRlBMRVZCUVZBN08wRkJSVVlzVFVGQlNXNURMRWRCUVVvN1FVRkRRU3hWUVVGUmRFSXNVVUZCVWp0QlFVTkZMRk5CUVVzc1MwRkJURHRCUVVORmMwSXNXVUZCVFhORExGVkJRVlZFTEVsQlFWWXNSVUZCWjBKR0xFdEJRV2hDTEVWQlFYVkNReXhIUVVGMlFpeERRVUZPTzBGQlEwRTdRVUZEUml4VFFVRkxMRTFCUVV3N1FVRkRRU3hUUVVGTExFOUJRVXc3UVVGRFJYQkRMRmxCUVUxMVF5eFhRVUZYUml4SlFVRllMRVZCUVdsQ1JpeExRVUZxUWl4RlFVRjNRa01zUjBGQmVFSXNRMEZCVGp0QlFVTkJPMEZCUTBZc1UwRkJTeXhQUVVGTU8wRkJRMFZ3UXl4WlFVRk5kME1zV1VGQldVZ3NTVUZCV2l4RlFVRnJRa1lzUzBGQmJFSXNSVUZCZVVKRExFZEJRWHBDTEVOQlFVNDdRVUZEUVR0QlFVTkdMRk5CUVVzc1VVRkJURHRCUVVORmNFTXNXVUZCVFhsRExHRkJRV0ZLTEVsQlFXSXNSVUZCYlVKR0xFdEJRVzVDTEVWQlFUQkNReXhIUVVFeFFpeERRVUZPTzBGQlEwRTdRVUZEUml4VFFVRkxMRkZCUVV3N1FVRkRSWEJETEZsQlFVMHdReXhoUVVGaFRDeEpRVUZpTEVWQlFXMUNSaXhMUVVGdVFpeEZRVUV3UWtNc1IwRkJNVUlzUTBGQlRqdEJRVU5CTzBGQlEwWXNVMEZCU3l4TlFVRk1PMEZCUTBFc1UwRkJTeXhQUVVGTU8wRkJRMEVzVTBGQlN5eFRRVUZNTzBGQlEwRXNVMEZCU3l4VlFVRk1PMEZCUTBWd1F5eFpRVUZOTWtNc1kwRkJZMDRzU1VGQlpDeEZRVUZ2UWtZc1MwRkJjRUlzUlVGQk1rSkRMRWRCUVROQ0xFTkJRVTQ3UVVGRFFUdEJRVU5HTzBGQlEwVXNXVUZCVFN4SlFVRkpia1FzUzBGQlNpeERRVUZWTEd0Q1FVRldMRU5CUVU0N1FVRjRRa283UVVFd1FrRXNVMEZCVDJVc1IwRkJVRHRCUVVORUxFTkJla05FT3p0QlFUSkRRVzVETEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDWVN4TlFVRnFRaXhIUVVFd1FpeFpRVUZaTzBGQlEzQkRMRk5CUVU4N1FVRkRUR2hGTEZWQlFVMHNVVUZFUkR0QlFVVk1hVVVzVlVGQlRVTXNUVUZCVFdZc1UwRkJUaXhEUVVGblFtZENMRXRCUVdoQ0xFTkJRWE5DUXl4SlFVRjBRaXhEUVVFeVFpeExRVUZMUXl4SlFVRk1MRWxCUVdFc1NVRkJlRU1zUlVGQk9FTXNRMEZCT1VNN1FVRkdSQ3hIUVVGUU8wRkJTVVFzUTBGTVJEczdRVUZQUVR0QlFVTkJjRVlzVDBGQlQydEZMRk5CUVZBc1EwRkJhVUp5UWl4SlFVRnFRaXhIUVVGM1FpeFZRVUZWZDBNc1RVRkJWaXhGUVVGclFrTXNXVUZCYkVJc1JVRkJaME5vUWl4TFFVRm9ReXhGUVVGMVEwTXNSMEZCZGtNc1JVRkJORU03UVVGRGJFVXNUVUZCU1dkQ0xGTkJRVk1zU1VGQllqczdRVUZGUVN4TlFVRkpMRU5CUVVOcVFpeExRVUZNTEVWQlFWbEJMRkZCUVZFc1EwRkJVanRCUVVOYUxFMUJRVWtzUTBGQlEwTXNSMEZCUkN4SlFVRlJRU3hSUVVGUkxFTkJRWEJDTEVWQlFYVkNRU3hOUVVGTkxFdEJRVXQwUkN4TlFVRllPMEZCUTNaQ0xFMUJRVWtzUTBGQlEzRkZMRmxCUVV3c1JVRkJiVUpCTEdWQlFXVXNRMEZCWmpzN1FVRkZia0k3UVVGRFFTeE5RVUZKWml4UlFVRlJSQ3hMUVVGYUxFVkJRVzFDTzBGQlEyNUNMRTFCUVVsbExFOUJRVTl3UlN4TlFVRlFMRXRCUVd0Q0xFTkJRV3hDTEVsQlFYVkNjMFVzVDBGQlQzUkZMRTFCUVZBc1MwRkJhMElzUTBGQk4wTXNSVUZCWjBRN08wRkJSV2hFTzBGQlEwRjNRaXhUUVVGUE9FSXNUMEZCVDBRc1MwRkJaQ3hGUVVGeFFpeDVRa0ZCY2tJN1FVRkRRVGRDTEZOQlFVODJReXhuUWtGQlowSXNRMEZCYUVJc1NVRkJjVUpCTEdWQlFXVkVMRTlCUVU5d1JTeE5RVUZzUkN4RlFVTkpMREpDUVVSS08wRkJSVUYzUWl4VFFVRlBOa0lzVTBGQlV5eERRVUZVTEVsQlFXTkJMRkZCUVZGcFFpeFBRVUZQZEVVc1RVRkJjRU1zUlVGQk5FTXNNa0pCUVRWRE8wRkJRMEYzUWl4VFFVRlBPRUlzVDBGQlR5eERRVUZRTEVsQlFWbEJMRTlCUVU5blFpeFBRVUZQZEVVc1RVRkJha01zUlVGQmVVTXNlVUpCUVhwRE96dEJRVVZCTzBGQlEwRXNUVUZCU1hORUxFMUJRVTBzUzBGQlMzUkVMRTFCUVdZc1JVRkRSWE5FTEUxQlFVMHNTMEZCUzNSRUxFMUJRVmc3UVVGRFJpeE5RVUZKYjBVc1QwRkJUM0JGTEUxQlFWQXNSMEZCWjBKeFJTeFpRVUZvUWl4SFFVRXJRbVlzVFVGQlRVUXNTMEZCZWtNc1JVRkRSVU1zVFVGQlRXTXNUMEZCVDNCRkxFMUJRVkFzUjBGQlowSnhSU3haUVVGb1FpeEhRVUVyUW1oQ0xFdEJRWEpET3p0QlFVVkdMRTFCUVVsclFpeE5RVUZOYWtJc1RVRkJUVVFzUzBGQmFFSTdPMEZCUlVFc1RVRkJTV3RDTEUxQlFVMHNSMEZCVGl4SlFVRmhMRU5CUVVONFJpeFBRVUZQU1N4bFFVRjZRaXhGUVVFd1F6dEJRVU40UXl4VFFVRkxMRWxCUVVsdFFpeEpRVUZKTEVOQlFXSXNSVUZCWjBKQkxFbEJRVWxwUlN4SFFVRndRaXhGUVVGNVFtcEZMRWRCUVhwQ08wRkJRMFU0UkN4aFFVRlBPVVFzU1VGQlNTdEVMRmxCUVZnc1NVRkJNa0lzUzBGQlN5OUVMRWxCUVVrclF5eExRVUZVTEVOQlFUTkNPMEZCUkVZN1FVRkZSQ3hIUVVoRUxFMUJSMDg3UVVGRFRHVXNWMEZCVHpkRUxFbEJRVkFzUTBGQldTeExRVUZMWkN4UlFVRk1MRU5CUVdNMFJDeExRVUZrTEVWQlFYRkNRU3hSUVVGUmEwSXNSMEZCTjBJc1EwRkJXaXhGUVVFclEwWXNXVUZCTDBNN1FVRkRSRHRCUVVOR0xFTkJhRU5FT3p0QlFXdERRU3hUUVVGVFZDeFpRVUZVTEVOQlFYVkNlRVVzUjBGQmRrSXNSVUZCTkVKcFJTeExRVUUxUWl4RlFVRnRRME1zUjBGQmJrTXNSVUZCZDBNN1FVRkRkRU1zVFVGQlNVUXNWVUZCVlN4RFFVRldMRWxCUVdWRExGRkJRVkZzUlN4SlFVRkpXU3hOUVVFdlFpeEZRVUYxUXp0QlFVTnlReXhYUVVGUGNrSXNUMEZCVHpaR0xHRkJRVkFzUTBGQmNVSndSaXhIUVVGeVFpeERRVUZRTzBGQlEwUXNSMEZHUkN4TlFVVlBPMEZCUTB3c1YwRkJUMVFzVDBGQlR6WkdMR0ZCUVZBc1EwRkJjVUp3Uml4SlFVRkpOa1VzUzBGQlNpeERRVUZWV2l4TFFVRldMRVZCUVdsQ1F5eEhRVUZxUWl4RFFVRnlRaXhEUVVGUU8wRkJRMFE3UVVGRFJqczdRVUZGUkN4VFFVRlRSeXhWUVVGVUxFTkJRWEZDY2tVc1IwRkJja0lzUlVGQk1FSnBSU3hMUVVFeFFpeEZRVUZwUTBNc1IwRkJha01zUlVGQmMwTTdRVUZEY0VNc1RVRkJTVzFDTEUxQlFVMHNSVUZCVmp0QlFVTkJMRTFCUVVsRExFMUJRVTBzUlVGQlZqdEJRVU5CY0VJc1VVRkJUWEZDTEV0QlFVdERMRWRCUVV3c1EwRkJVM2hHTEVsQlFVbFpMRTFCUVdJc1JVRkJjVUp6UkN4SFFVRnlRaXhEUVVGT096dEJRVVZCTEU5QlFVc3NTVUZCU1doRUxFbEJRVWtyUXl4TFFVRmlMRVZCUVc5Q0wwTXNTVUZCU1dkRUxFZEJRWGhDTEVWQlFUWkNhRVFzUjBGQk4wSXNSVUZCYTBNN1FVRkRhRU1zVVVGQlNXeENMRWxCUVVsclFpeERRVUZLTEV0QlFWVXNTVUZCWkN4RlFVRnZRanRCUVVOc1FtMUZMR0ZCUVU5SkxHVkJRV1ZJTEVkQlFXWXNTVUZCYzBJM1JDeFBRVUZQYVVVc1dVRkJVQ3hEUVVGdlFqRkdMRWxCUVVsclFpeERRVUZLTEVOQlFYQkNMRU5CUVRkQ08wRkJRMEZ2UlN4WlFVRk5MRVZCUVU0N1FVRkRSQ3hMUVVoRUxFMUJSMDg3UVVGRFRFRXNZVUZCVHl4TlFVRk5kRVlzU1VGQlNXdENMRU5CUVVvc1JVRkJUemhETEZGQlFWQXNRMEZCWjBJc1JVRkJhRUlzUTBGQllqdEJRVU5FTzBGQlEwWTdPMEZCUlVRc1UwRkJUM0ZDTEUxQlFVMUpMR1ZCUVdWSUxFZEJRV1lzUTBGQllqdEJRVU5FT3p0QlFVVkVMRk5CUVZOb1FpeFhRVUZVTEVOQlFYTkNkRVVzUjBGQmRFSXNSVUZCTWtKcFJTeExRVUV6UWl4RlFVRnJRME1zUjBGQmJFTXNSVUZCZFVNN1FVRkRja01zVFVGQlNYQkRMRTFCUVUwc1JVRkJWanRCUVVOQmIwTXNVVUZCVFhGQ0xFdEJRVXRETEVkQlFVd3NRMEZCVTNoR0xFbEJRVWxaTEUxQlFXSXNSVUZCY1VKelJDeEhRVUZ5UWl4RFFVRk9PenRCUVVWQkxFOUJRVXNzU1VGQlNXaEVMRWxCUVVrclF5eExRVUZpTEVWQlFXOUNMME1zU1VGQlNXZEVMRWRCUVhoQ0xFVkJRVFpDYUVRc1IwRkJOMEk3UVVGRFJWa3NWMEZCVDB3c1QwRkJUMmxGTEZsQlFWQXNRMEZCYjBJeFJpeEpRVUZKYTBJc1EwRkJTaXhEUVVGd1FpeERRVUZRTzBGQlJFWXNSMEZGUVN4UFFVRlBXU3hIUVVGUU8wRkJRMFE3TzBGQlJVUXNVMEZCVTNsRExGbEJRVlFzUTBGQmRVSjJSU3hIUVVGMlFpeEZRVUUwUW1sRkxFdEJRVFZDTEVWQlFXMURReXhIUVVGdVF5eEZRVUYzUXp0QlFVTjBReXhUUVVGUFNTeFpRVUZaZEVVc1IwRkJXaXhGUVVGcFFtbEZMRXRCUVdwQ0xFVkJRWGRDUXl4SFFVRjRRaXhEUVVGUU8wRkJRMFE3TzBGQlJVUXNVMEZCVTBVc1UwRkJWQ3hEUVVGdlFuQkZMRWRCUVhCQ0xFVkJRWGxDYVVVc1MwRkJla0lzUlVGQlowTkRMRWRCUVdoRExFVkJRWEZETzBGQlEyNURMRTFCUVVscFFpeE5RVUZOYmtZc1NVRkJTVmtzVFVGQlpEczdRVUZGUVN4TlFVRkpMRU5CUVVOeFJDeExRVUZFTEVsQlFWVkJMRkZCUVZFc1EwRkJkRUlzUlVGQmVVSkJMRkZCUVZFc1EwRkJVanRCUVVONlFpeE5RVUZKTEVOQlFVTkRMRWRCUVVRc1NVRkJVVUVzVFVGQlRTeERRVUZrTEVsQlFXMUNRU3hOUVVGTmFVSXNSMEZCTjBJc1JVRkJhME5xUWl4TlFVRk5hVUlzUjBGQlRqczdRVUZGYkVNc1RVRkJTVkVzVFVGQlRTeEZRVUZXTzBGQlEwRXNUMEZCU3l4SlFVRkpla1VzU1VGQlNTdERMRXRCUVdJc1JVRkJiMEl2UXl4SlFVRkpaMFFzUjBGQmVFSXNSVUZCTmtKb1JDeEhRVUUzUWl4RlFVRnJRenRCUVVOb1EzbEZMRmRCUVU5RExFMUJRVTAxUml4SlFVRkphMElzUTBGQlNpeERRVUZPTEVOQlFWQTdRVUZEUkR0QlFVTkVMRk5CUVU5NVJTeEhRVUZRTzBGQlEwUTdPMEZCUlVRc1UwRkJVMnhDTEdGQlFWUXNRMEZCZDBKNlJTeEhRVUY0UWl4RlFVRTJRbWxGTEV0QlFUZENMRVZCUVc5RFF5eEhRVUZ3UXl4RlFVRjVRenRCUVVOMlF5eE5RVUZKTWtJc1VVRkJVVGRHTEVsQlFVazJSU3hMUVVGS0xFTkJRVlZhTEV0QlFWWXNSVUZCYVVKRExFZEJRV3BDTEVOQlFWbzdRVUZEUVN4TlFVRkpiVUlzVFVGQlRTeEZRVUZXTzBGQlEwRXNUMEZCU3l4SlFVRkpia1VzU1VGQlNTeERRVUZpTEVWQlFXZENRU3hKUVVGSk1rVXNUVUZCVFdwR0xFMUJRVEZDTEVWQlFXdERUU3hMUVVGTExFTkJRWFpETEVWQlFUQkRPMEZCUTNoRGJVVXNWMEZCVHpWRUxFOUJRVTlwUlN4WlFVRlFMRU5CUVc5Q1J5eE5RVUZOTTBVc1EwRkJUaXhKUVVGWE1rVXNUVUZCVFRORkxFbEJRVVVzUTBGQlVpeEpRVUZoTEVkQlFUVkRMRU5CUVZBN1FVRkRSRHRCUVVORUxGTkJRVTl0UlN4SFFVRlFPMEZCUTBRN08wRkJSVVF4Uml4UFFVRlBhMFVzVTBGQlVDeERRVUZwUW1kQ0xFdEJRV3BDTEVkQlFYbENMRlZCUVZWYUxFdEJRVllzUlVGQmFVSkRMRWRCUVdwQ0xFVkJRWE5DTzBGQlF6ZERMRTFCUVVscFFpeE5RVUZOTEV0QlFVdDJSU3hOUVVGbU8wRkJRMEZ4UkN4VlFVRlJOa0lzVFVGQlRUZENMRXRCUVU0c1JVRkJZV3RDTEVkQlFXSXNSVUZCYTBJc1EwRkJiRUlzUTBGQlVqdEJRVU5CYWtJc1VVRkJUVFJDTEUxQlFVMDFRaXhIUVVGT0xFVkJRVmRwUWl4SFFVRllMRVZCUVdkQ1FTeEhRVUZvUWl4RFFVRk9PenRCUVVWQkxFMUJRVWw0Uml4UFFVRlBTU3hsUVVGWUxFVkJRVFJDTzBGQlF6RkNMRmRCUVU5S0xFOUJRVTl4UWl4UlFVRlFMRU5CUVdkQ0xFdEJRVXRZTEZGQlFVd3NRMEZCWXpSRUxFdEJRV1FzUlVGQmNVSkRMRWRCUVhKQ0xFTkJRV2hDTEVOQlFWQTdRVUZEUkN4SFFVWkVMRTFCUlU4N1FVRkRUQ3hSUVVGSk5rSXNWMEZCVnpkQ0xFMUJRVTFFTEV0QlFYSkNPMEZCUTBFc1VVRkJTU3RDTEZOQlFWTXNTVUZCU1hKSExFMUJRVW9zUTBGQlYyOUhMRkZCUVZnc1JVRkJjVUp1UlN4VFFVRnlRaXhGUVVGblF5eEpRVUZvUXl4RFFVRmlPMEZCUTBFc1UwRkJTeXhKUVVGSlZpeEpRVUZKTEVOQlFXSXNSVUZCWjBKQkxFbEJRVWsyUlN4UlFVRndRaXhGUVVFNFFqZEZMRWRCUVRsQ0xFVkJRVzFETzBGQlEycERPRVVzWVVGQlR6bEZMRU5CUVZBc1NVRkJXU3hMUVVGTFFTeEpRVUZKSzBNc1MwRkJWQ3hEUVVGYU8wRkJRMFE3UVVGRFJDeFhRVUZQSzBJc1RVRkJVRHRCUVVORU8wRkJRMFlzUTBGbVJEczdRVUZwUWtFN1FVRkRRWEpITEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDYjBNc1IwRkJha0lzUjBGQmRVSXNWVUZCVlhSRUxFMUJRVllzUlVGQmEwSTdRVUZEZGtOMVJDeFZRVUZSUXl4SFFVRlNMRU5CUVZrc01rUkJRVm83UVVGRFFTeFRRVUZQTEV0QlFVczNSU3hUUVVGTUxFTkJRV1Z4UWl4TlFVRm1MRU5CUVZBN1FVRkRSQ3hEUVVoRU96dEJRVXRCTzBGQlEwRm9SQ3hQUVVGUGEwVXNVMEZCVUN4RFFVRnBRblZETEVkQlFXcENMRWRCUVhWQ0xGVkJRVlZETEVOQlFWWXNSVUZCWVRGRUxFMUJRV0lzUlVGQmNVSTdRVUZETVVOMVJDeFZRVUZSUXl4SFFVRlNMRU5CUVZrc01rUkJRVm83UVVGRFFTeFRRVUZQTEV0QlFVdEhMRlZCUVV3c1EwRkJaMEpFTEVOQlFXaENMRVZCUVcxQ01VUXNUVUZCYmtJc1EwRkJVRHRCUVVORUxFTkJTRVE3TzBGQlMwRm9SQ3hQUVVGUGEwVXNVMEZCVUN4RFFVRnBRblpETEZOQlFXcENMRWRCUVRaQ0xGVkJRVlZ4UWl4TlFVRldMRVZCUVd0Q05FUXNVVUZCYkVJc1JVRkJORUk3UVVGRGRrUXNUVUZCU1N4RFFVRkRRU3hSUVVGTUxFVkJRV1U3UVVGRFltNUZMRmRCUVU5UExGZEJRVmRtTEZOQlFWZ3NTVUZCZDBKbExGZEJRVmNzU1VGQk1VTXNSVUZCWjBRc1owSkJRV2hFTzBGQlEwRlFMRmRCUVU5UExGTkJRVk1zUzBGQlN5OUNMRTFCUVhKQ0xFVkJRVFpDTEhGRFFVRTNRanRCUVVORU96dEJRVVZFTEUxQlFVa3JRaXhWUVVGVkxFdEJRVXN2UWl4TlFVRnVRaXhGUVVORk96dEJRVVZHTEZOQlFVOHNTMEZCU3l0Q0xFMUJRVXdzUTBGQlVEdEJRVU5FTEVOQlZrUTdPMEZCV1VFc1UwRkJVelpFTEZkQlFWUXNRMEZCYzBKNFJ5eEhRVUYwUWl4RlFVRXlRakpETEUxQlFUTkNMRVZCUVcxRE9FUXNXVUZCYmtNc1JVRkJhVVJHTEZGQlFXcEVMRVZCUVRKRU8wRkJRM3BFTEUxQlFVa3NRMEZCUTBFc1VVRkJUQ3hGUVVGbE8wRkJRMkp1UlN4WFFVRlBMRTlCUVU5eFJTeFpRVUZRTEV0QlFYZENMRk5CUVM5Q0xFVkJRVEJETERKQ1FVRXhRenRCUVVOQmNrVXNWMEZCVDA4c1YwRkJWMllzVTBGQldDeEpRVUYzUW1Vc1YwRkJWeXhKUVVFeFF5eEZRVUZuUkN4blFrRkJhRVE3UVVGRFFWQXNWMEZCVDA4c1UwRkJVeXhEUVVGVUxFZEJRV0V6UXl4SlFVRkpXU3hOUVVGNFFpeEZRVUZuUXl4eFEwRkJhRU03UVVGRFJEczdRVUZGUkN4TlFVRkpkVVVzVFVGQlRXNUdMRWxCUVVsWkxFMUJRV1E3UVVGRFFTeE5RVUZKSzBJc1ZVRkJWWGRETEVkQlFXUXNSVUZEUlRzN1FVRkZSaXhOUVVGSmRVSXNSMEZCU2p0QlFVTkJMRTFCUVVsRUxGbEJRVW9zUlVGQmEwSTdRVUZEYUVKRExGVkJRVTB4Unl4SlFVRkpNa01zVFVGQlNpeERRVUZPTzBGQlEwRXNVVUZCU1VFc1UwRkJVeXhEUVVGVUxFZEJRV0YzUXl4SFFVRnFRaXhGUVVORmRVSXNUMEZCVHpGSExFbEJRVWt5UXl4VFFVRlRMRU5CUVdJc1MwRkJiVUlzUTBGQk1VSTdRVUZEU0N4SFFVcEVMRTFCU1U4N1FVRkRUQ3RFTEZWQlFVMHhSeXhKUVVGSk1rTXNUVUZCU2l4TFFVRmxMRU5CUVhKQ08wRkJRMEVzVVVGQlNVRXNVMEZCVXl4RFFVRlVMRWRCUVdGM1F5eEhRVUZxUWl4RlFVTkZkVUlzVDBGQlR6RkhMRWxCUVVreVF5eFRRVUZUTEVOQlFXSXNRMEZCVUR0QlFVTklPMEZCUTBRc1UwRkJUeXRFTEVkQlFWQTdRVUZEUkRzN1FVRkZSQzlITEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDT0VNc1dVRkJha0lzUjBGQlowTXNWVUZCVldoRkxFMUJRVllzUlVGQmEwSTBSQ3hSUVVGc1FpeEZRVUUwUWp0QlFVTXhSQ3hUUVVGUFF5eFpRVUZaTEVsQlFWb3NSVUZCYTBJM1JDeE5RVUZzUWl4RlFVRXdRaXhKUVVFeFFpeEZRVUZuUXpSRUxGRkJRV2hETEVOQlFWQTdRVUZEUkN4RFFVWkVPenRCUVVsQk5VY3NUMEZCVDJ0RkxGTkJRVkFzUTBGQmFVSXJReXhaUVVGcVFpeEhRVUZuUXl4VlFVRlZha1VzVFVGQlZpeEZRVUZyUWpSRUxGRkJRV3hDTEVWQlFUUkNPMEZCUXpGRUxGTkJRVTlETEZsQlFWa3NTVUZCV2l4RlFVRnJRamRFTEUxQlFXeENMRVZCUVRCQ0xFdEJRVEZDTEVWQlFXbERORVFzVVVGQmFrTXNRMEZCVUR0QlFVTkVMRU5CUmtRN08wRkJTVUVzVTBGQlUwMHNWMEZCVkN4RFFVRnpRamRITEVkQlFYUkNMRVZCUVRKQ01rTXNUVUZCTTBJc1JVRkJiVU00UkN4WlFVRnVReXhGUVVGcFJFWXNVVUZCYWtRc1JVRkJNa1E3UVVGRGVrUXNUVUZCU1N4RFFVRkRRU3hSUVVGTUxFVkJRV1U3UVVGRFltNUZMRmRCUVU4c1QwRkJUM0ZGTEZsQlFWQXNTMEZCZDBJc1UwRkJMMElzUlVGQk1FTXNNa0pCUVRGRE8wRkJRMEZ5UlN4WFFVRlBUeXhYUVVGWFppeFRRVUZZTEVsQlFYZENaU3hYUVVGWExFbEJRVEZETEVWQlFXZEVMR2RDUVVGb1JEdEJRVU5CVUN4WFFVRlBUeXhUUVVGVExFTkJRVlFzUjBGQllUTkRMRWxCUVVsWkxFMUJRWGhDTEVWQlFXZERMSEZEUVVGb1F6dEJRVU5FT3p0QlFVVkVMRTFCUVVsMVJTeE5RVUZOYmtZc1NVRkJTVmtzVFVGQlpEdEJRVU5CTEUxQlFVa3JRaXhWUVVGVmQwTXNSMEZCWkN4RlFVTkZPenRCUVVWR0xFMUJRVWwxUWl4SFFVRktPMEZCUTBFc1RVRkJTVVFzV1VGQlNpeEZRVUZyUWp0QlFVTm9RaXhSUVVGSk9VUXNVMEZCVXl4RFFVRlVMRWRCUVdGM1F5eEhRVUZxUWl4RlFVTkZkVUlzVFVGQlRURkhMRWxCUVVreVF5eFRRVUZUTEVOQlFXSXNTMEZCYlVJc1JVRkJla0k3UVVGRFJpeFJRVUZKUVN4VFFVRlRMRU5CUVZRc1IwRkJZWGRETEVkQlFXcENMRVZCUTBWMVFpeFBRVUZQTVVjc1NVRkJTVEpETEZOQlFWTXNRMEZCWWl4TFFVRnRRaXhEUVVFeFFqdEJRVU5HSzBRc1YwRkJUekZITEVsQlFVa3lReXhOUVVGS0xFTkJRVkE3UVVGRFFTeFJRVUZKUVN4VFFVRlRMRU5CUVZRc1IwRkJZWGRETEVkQlFXcENMRVZCUTBWMVFpeE5RVUZOUVN4UFFVRlBNVWNzU1VGQlNUSkRMRk5CUVZNc1EwRkJZaXhMUVVGdFFpeEZRVUZ1UWl4TFFVRXdRaXhEUVVGcVF5eERRVUZPTzBGQlEwZ3NSMEZTUkN4TlFWRlBPMEZCUTB3c1VVRkJTVUVzVTBGQlV5eERRVUZVTEVkQlFXRjNReXhIUVVGcVFpeEZRVU5GZFVJc1RVRkJUVEZITEVsQlFVa3lReXhUUVVGVExFTkJRV0lzUzBGQmJVSXNSVUZCZWtJN1FVRkRSaXhSUVVGSlFTeFRRVUZUTEVOQlFWUXNSMEZCWVhkRExFZEJRV3BDTEVWQlEwVjFRaXhQUVVGUE1VY3NTVUZCU1RKRExGTkJRVk1zUTBGQllpeExRVUZ0UWl4RFFVRXhRanRCUVVOR0xGRkJRVWxCTEZOQlFWTXNRMEZCVkN4SFFVRmhkME1zUjBGQmFrSXNSVUZEUlhWQ0xFOUJRVTh4Unl4SlFVRkpNa01zVTBGQlV5eERRVUZpTEVOQlFWQTdRVUZEUml0RUxGVkJRVTFCTEU5QlFVOHhSeXhKUVVGSk1rTXNUVUZCU2l4TFFVRmxMRVZCUVdZc1MwRkJjMElzUTBGQk4wSXNRMEZCVGp0QlFVTkVPMEZCUTBRc1UwRkJUeXRFTEVkQlFWQTdRVUZEUkRzN1FVRkZSQzlITEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDYVVRc1dVRkJha0lzUjBGQlowTXNWVUZCVlc1RkxFMUJRVllzUlVGQmEwSTBSQ3hSUVVGc1FpeEZRVUUwUWp0QlFVTXhSQ3hUUVVGUFRTeFpRVUZaTEVsQlFWb3NSVUZCYTBKc1JTeE5RVUZzUWl4RlFVRXdRaXhKUVVFeFFpeEZRVUZuUXpSRUxGRkJRV2hETEVOQlFWQTdRVUZEUkN4RFFVWkVPenRCUVVsQk5VY3NUMEZCVDJ0RkxGTkJRVkFzUTBGQmFVSnJSQ3haUVVGcVFpeEhRVUZuUXl4VlFVRlZjRVVzVFVGQlZpeEZRVUZyUWpSRUxGRkJRV3hDTEVWQlFUUkNPMEZCUXpGRUxGTkJRVTlOTEZsQlFWa3NTVUZCV2l4RlFVRnJRbXhGTEUxQlFXeENMRVZCUVRCQ0xFdEJRVEZDTEVWQlFXbERORVFzVVVGQmFrTXNRMEZCVUR0QlFVTkVMRU5CUmtRN08wRkJTVUUxUnl4UFFVRlBhMFVzVTBGQlVDeERRVUZwUW0xRUxGRkJRV3BDTEVkQlFUUkNMRlZCUVZWeVJTeE5RVUZXTEVWQlFXdENORVFzVVVGQmJFSXNSVUZCTkVJN1FVRkRkRVFzVFVGQlNTeERRVUZEUVN4UlFVRk1MRVZCUVdVN1FVRkRZbTVGTEZkQlFVOVBMRmRCUVZkbUxGTkJRVmdzU1VGQmQwSmxMRmRCUVZjc1NVRkJNVU1zUlVGRFNTeG5Ra0ZFU2p0QlFVVkJVQ3hYUVVGUFR5eFRRVUZUTEV0QlFVc3ZRaXhOUVVGeVFpeEZRVUUyUWl4eFEwRkJOMEk3UVVGRFJEczdRVUZGUkN4TlFVRkpLMElzVlVGQlZTeExRVUZMTDBJc1RVRkJia0lzUlVGRFJUczdRVUZGUml4TlFVRkpjVWNzVFVGQlRTeExRVUZMZEVVc1RVRkJUQ3hKUVVGbExFbEJRWHBDTzBGQlEwRXNUVUZCU1hORkxFZEJRVW9zUlVGRFJTeFBRVUZQTEVOQlFVTXNUMEZCVHl4TFFVRkxkRVVzVFVGQlRDeERRVUZRTEVkQlFYTkNMRU5CUVhaQ0xFbEJRVFJDTEVOQlFVTXNRMEZCY0VNc1EwRkVSaXhMUVVkRkxFOUJRVThzUzBGQlMwRXNUVUZCVEN4RFFVRlFPMEZCUTBnc1EwRm1SRHM3UVVGcFFrRXNVMEZCVTNWRkxGVkJRVlFzUTBGQmNVSnNTQ3hIUVVGeVFpeEZRVUV3UWpKRExFMUJRVEZDTEVWQlFXdERPRVFzV1VGQmJFTXNSVUZCWjBSR0xGRkJRV2hFTEVWQlFUQkVPMEZCUTNoRUxFMUJRVWtzUTBGQlEwRXNVVUZCVEN4RlFVRmxPMEZCUTJKdVJTeFhRVUZQTEU5QlFVOXhSU3haUVVGUUxFdEJRWGRDTEZOQlFTOUNMRVZCUVRCRExESkNRVUV4UXp0QlFVTkJja1VzVjBGQlQwOHNWMEZCVjJZc1UwRkJXQ3hKUVVGM1FtVXNWMEZCVnl4SlFVRXhReXhGUVVGblJDeG5Ra0ZCYUVRN1FVRkRRVkFzVjBGQlQwOHNVMEZCVXl4RFFVRlVMRWRCUVdFelF5eEpRVUZKV1N4TlFVRjRRaXhGUVVGblF5eHhRMEZCYUVNN1FVRkRSRHM3UVVGRlJDeE5RVUZKZFVVc1RVRkJUVzVHTEVsQlFVbFpMRTFCUVdRN1FVRkRRU3hOUVVGSkswSXNWVUZCVlhkRExFZEJRV1FzUlVGRFJUczdRVUZGUml4TlFVRkpkVUlzVFVGQlRVWXNXVUZCV1hoSExFZEJRVm9zUlVGQmFVSXlReXhOUVVGcVFpeEZRVUY1UWpoRUxGbEJRWHBDTEVWQlFYVkRMRWxCUVhaRExFTkJRVlk3UVVGRFFTeE5RVUZKVVN4TlFVRk5VQ3hOUVVGTkxFMUJRV2hDTzBGQlEwRXNUVUZCU1U4c1IwRkJTaXhGUVVORkxFOUJRVThzUTBGQlF5eFRRVUZUVUN4SFFVRlVMRWRCUVdVc1EwRkJhRUlzU1VGQmNVSXNRMEZCUXl4RFFVRTNRaXhEUVVSR0xFdEJSMFVzVDBGQlQwRXNSMEZCVUR0QlFVTklPenRCUVVWRUwwY3NUMEZCVDJ0RkxGTkJRVkFzUTBGQmFVSnpSQ3hYUVVGcVFpeEhRVUVyUWl4VlFVRlZlRVVzVFVGQlZpeEZRVUZyUWpSRUxGRkJRV3hDTEVWQlFUUkNPMEZCUTNwRUxGTkJRVTlYTEZkQlFWY3NTVUZCV0N4RlFVRnBRblpGTEUxQlFXcENMRVZCUVhsQ0xFbEJRWHBDTEVWQlFTdENORVFzVVVGQkwwSXNRMEZCVUR0QlFVTkVMRU5CUmtRN08wRkJTVUUxUnl4UFFVRlBhMFVzVTBGQlVDeERRVUZwUW5WRUxGZEJRV3BDTEVkQlFTdENMRlZCUVZWNlJTeE5RVUZXTEVWQlFXdENORVFzVVVGQmJFSXNSVUZCTkVJN1FVRkRla1FzVTBGQlQxY3NWMEZCVnl4SlFVRllMRVZCUVdsQ2RrVXNUVUZCYWtJc1JVRkJlVUlzUzBGQmVrSXNSVUZCWjBNMFJDeFJRVUZvUXl4RFFVRlFPMEZCUTBRc1EwRkdSRHM3UVVGSlFTeFRRVUZUWXl4VlFVRlVMRU5CUVhGQ2NrZ3NSMEZCY2tJc1JVRkJNRUl5UXl4TlFVRXhRaXhGUVVGclF6aEVMRmxCUVd4RExFVkJRV2RFUml4UlFVRm9SQ3hGUVVFd1JEdEJRVU40UkN4TlFVRkpMRU5CUVVOQkxGRkJRVXdzUlVGQlpUdEJRVU5pYmtVc1YwRkJUeXhQUVVGUGNVVXNXVUZCVUN4TFFVRjNRaXhUUVVFdlFpeEZRVUV3UXl3eVFrRkJNVU03UVVGRFFYSkZMRmRCUVU5UExGZEJRVmRtTEZOQlFWZ3NTVUZCZDBKbExGZEJRVmNzU1VGQk1VTXNSVUZCWjBRc1owSkJRV2hFTzBGQlEwRlFMRmRCUVU5UExGTkJRVk1zUTBGQlZDeEhRVUZoTTBNc1NVRkJTVmtzVFVGQmVFSXNSVUZCWjBNc2NVTkJRV2hETzBGQlEwUTdPMEZCUlVRc1RVRkJTWFZGTEUxQlFVMXVSaXhKUVVGSldTeE5RVUZrTzBGQlEwRXNUVUZCU1N0Q0xGVkJRVlYzUXl4SFFVRmtMRVZCUTBVN08wRkJSVVlzVFVGQlNYVkNMRTFCUVUxSExGbEJRVmszUnl4SFFVRmFMRVZCUVdsQ01rTXNUVUZCYWtJc1JVRkJlVUk0UkN4WlFVRjZRaXhGUVVGMVF5eEpRVUYyUXl4RFFVRldPMEZCUTBFc1RVRkJTVkVzVFVGQlRWQXNUVUZCVFN4VlFVRm9RanRCUVVOQkxFMUJRVWxQTEVkQlFVb3NSVUZEUlN4UFFVRlBMRU5CUVVNc1lVRkJZVkFzUjBGQllpeEhRVUZ0UWl4RFFVRndRaXhKUVVGNVFpeERRVUZETEVOQlFXcERMRU5CUkVZc1MwRkhSU3hQUVVGUFFTeEhRVUZRTzBGQlEwZzdPMEZCUlVRdlJ5eFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFubEVMRmRCUVdwQ0xFZEJRU3RDTEZWQlFWVXpSU3hOUVVGV0xFVkJRV3RDTkVRc1VVRkJiRUlzUlVGQk5FSTdRVUZEZWtRc1UwRkJUMk1zVjBGQlZ5eEpRVUZZTEVWQlFXbENNVVVzVFVGQmFrSXNSVUZCZVVJc1NVRkJla0lzUlVGQkswSTBSQ3hSUVVFdlFpeERRVUZRTzBGQlEwUXNRMEZHUkRzN1FVRkpRVFZITEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDTUVRc1YwRkJha0lzUjBGQkswSXNWVUZCVlRWRkxFMUJRVllzUlVGQmEwSTBSQ3hSUVVGc1FpeEZRVUUwUWp0QlFVTjZSQ3hUUVVGUFl5eFhRVUZYTEVsQlFWZ3NSVUZCYVVJeFJTeE5RVUZxUWl4RlFVRjVRaXhMUVVGNlFpeEZRVUZuUXpSRUxGRkJRV2hETEVOQlFWQTdRVUZEUkN4RFFVWkVPenRCUVVsQkxGTkJRVk5wUWl4VlFVRlVMRU5CUVhGQ2VFZ3NSMEZCY2tJc1JVRkJNRUl5UXl4TlFVRXhRaXhGUVVGclF6aEVMRmxCUVd4RExFVkJRV2RFUml4UlFVRm9SQ3hGUVVFd1JEdEJRVU40UkN4TlFVRkpMRU5CUVVOQkxGRkJRVXdzUlVGQlpUdEJRVU5pYmtVc1YwRkJUeXhQUVVGUGNVVXNXVUZCVUN4TFFVRjNRaXhUUVVFdlFpeEZRVUV3UXl3eVFrRkJNVU03UVVGRFFYSkZMRmRCUVU5UExGTkJRVk1zUTBGQlZDeEhRVUZoTTBNc1NVRkJTVmtzVFVGQmVFSXNSVUZCWjBNc2NVTkJRV2hETzBGQlEwUTdPMEZCUlVRc1UwRkJUMjVDTEZGQlFWRm5TU3hKUVVGU0xFTkJRV0Y2U0N4SFFVRmlMRVZCUVd0Q01rTXNUVUZCYkVJc1JVRkJNRUk0UkN4WlFVRXhRaXhGUVVGM1F5eEZRVUY0UXl4RlFVRTBReXhEUVVFMVF5eERRVUZRTzBGQlEwUTdPMEZCUlVRNVJ5eFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFqWkVMRmRCUVdwQ0xFZEJRU3RDTEZWQlFWVXZSU3hOUVVGV0xFVkJRV3RDTkVRc1VVRkJiRUlzUlVGQk5FSTdRVUZEZWtRc1UwRkJUMmxDTEZkQlFWY3NTVUZCV0N4RlFVRnBRamRGTEUxQlFXcENMRVZCUVhsQ0xFbEJRWHBDTEVWQlFTdENORVFzVVVGQkwwSXNRMEZCVUR0QlFVTkVMRU5CUmtRN08wRkJTVUUxUnl4UFFVRlBhMFVzVTBGQlVDeERRVUZwUWpoRUxGZEJRV3BDTEVkQlFTdENMRlZCUVZWb1JpeE5RVUZXTEVWQlFXdENORVFzVVVGQmJFSXNSVUZCTkVJN1FVRkRla1FzVTBGQlQybENMRmRCUVZjc1NVRkJXQ3hGUVVGcFFqZEZMRTFCUVdwQ0xFVkJRWGxDTEV0QlFYcENMRVZCUVdkRE5FUXNVVUZCYUVNc1EwRkJVRHRCUVVORUxFTkJSa1E3TzBGQlNVRXNVMEZCVTNGQ0xGZEJRVlFzUTBGQmMwSTFTQ3hIUVVGMFFpeEZRVUV5UWpKRExFMUJRVE5DTEVWQlFXMURPRVFzV1VGQmJrTXNSVUZCYVVSR0xGRkJRV3BFTEVWQlFUSkVPMEZCUTNwRUxFMUJRVWtzUTBGQlEwRXNVVUZCVEN4RlFVRmxPMEZCUTJKdVJTeFhRVUZQTEU5QlFVOXhSU3haUVVGUUxFdEJRWGRDTEZOQlFTOUNMRVZCUVRCRExESkNRVUV4UXp0QlFVTkJja1VzVjBGQlQwOHNVMEZCVXl4RFFVRlVMRWRCUVdFelF5eEpRVUZKV1N4TlFVRjRRaXhGUVVGblF5eHhRMEZCYUVNN1FVRkRSRHM3UVVGRlJDeFRRVUZQYmtJc1VVRkJVV2RKTEVsQlFWSXNRMEZCWVhwSUxFZEJRV0lzUlVGQmEwSXlReXhOUVVGc1FpeEZRVUV3UWpoRUxGbEJRVEZDTEVWQlFYZERMRVZCUVhoRExFVkJRVFJETEVOQlFUVkRMRU5CUVZBN1FVRkRSRHM3UVVGRlJEbEhMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENaMFVzV1VGQmFrSXNSMEZCWjBNc1ZVRkJWV3hHTEUxQlFWWXNSVUZCYTBJMFJDeFJRVUZzUWl4RlFVRTBRanRCUVVNeFJDeFRRVUZQY1VJc1dVRkJXU3hKUVVGYUxFVkJRV3RDYWtZc1RVRkJiRUlzUlVGQk1FSXNTVUZCTVVJc1JVRkJaME0wUkN4UlFVRm9ReXhEUVVGUU8wRkJRMFFzUTBGR1JEczdRVUZKUVRWSExFOUJRVTlyUlN4VFFVRlFMRU5CUVdsQ2FVVXNXVUZCYWtJc1IwRkJaME1zVlVGQlZXNUdMRTFCUVZZc1JVRkJhMEkwUkN4UlFVRnNRaXhGUVVFMFFqdEJRVU14UkN4VFFVRlBjVUlzV1VGQldTeEpRVUZhTEVWQlFXdENha1lzVFVGQmJFSXNSVUZCTUVJc1MwRkJNVUlzUlVGQmFVTTBSQ3hSUVVGcVF5eERRVUZRTzBGQlEwUXNRMEZHUkRzN1FVRkpRVFZITEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDZVVNc1ZVRkJha0lzUjBGQk9FSXNWVUZCVlhsQ0xFdEJRVllzUlVGQmFVSndSaXhOUVVGcVFpeEZRVUY1UWpSRUxGRkJRWHBDTEVWQlFXMURPMEZCUXk5RUxFMUJRVWtzUTBGQlEwRXNVVUZCVEN4RlFVRmxPMEZCUTJKdVJTeFhRVUZQTWtZc1ZVRkJWVzVITEZOQlFWWXNTVUZCZFVKdFJ5eFZRVUZWTEVsQlFYaERMRVZCUVRoRExHVkJRVGxETzBGQlEwRXpSaXhYUVVGUFR5eFhRVUZYWml4VFFVRllMRWxCUVhkQ1pTeFhRVUZYTEVsQlFURkRMRVZCUVdkRUxHZENRVUZvUkR0QlFVTkJVQ3hYUVVGUFR5eFRRVUZUTEV0QlFVc3ZRaXhOUVVGeVFpeEZRVUUyUWl4elEwRkJOMEk3UVVGRFFXOUlMR05CUVZWRUxFdEJRVllzUlVGQmFVSXNTVUZCYWtJN1FVRkRSRHM3UVVGRlJDeE5RVUZKY0VZc1ZVRkJWU3hMUVVGTEwwSXNUVUZCYmtJc1JVRkJNa0k3TzBGQlJUTkNMRTlCUVVzclFpeE5RVUZNTEVsQlFXVnZSaXhMUVVGbU8wRkJRMFFzUTBGWVJEczdRVUZoUVN4VFFVRlRSU3haUVVGVUxFTkJRWFZDYWtrc1IwRkJka0lzUlVGQk5FSXJTQ3hMUVVFMVFpeEZRVUZ0UTNCR0xFMUJRVzVETEVWQlFUSkRPRVFzV1VGQk0wTXNSVUZCZVVSR0xGRkJRWHBFTEVWQlFXMUZPMEZCUTJwRkxFMUJRVWtzUTBGQlEwRXNVVUZCVEN4RlFVRmxPMEZCUTJKdVJTeFhRVUZQTWtZc1ZVRkJWVzVITEZOQlFWWXNTVUZCZFVKdFJ5eFZRVUZWTEVsQlFYaERMRVZCUVRoRExHVkJRVGxETzBGQlEwRXpSaXhYUVVGUExFOUJRVTl4UlN4WlFVRlFMRXRCUVhkQ0xGTkJRUzlDTEVWQlFUQkRMREpDUVVFeFF6dEJRVU5CY2tVc1YwRkJUMDhzVjBGQlYyWXNVMEZCV0N4SlFVRjNRbVVzVjBGQlZ5eEpRVUV4UXl4RlFVRm5SQ3huUWtGQmFFUTdRVUZEUVZBc1YwRkJUMDhzVTBGQlV5eERRVUZVTEVkQlFXRXpReXhKUVVGSldTeE5RVUY0UWl4RlFVRm5ReXh6UTBGQmFFTTdRVUZEUVc5SUxHTkJRVlZFTEV0QlFWWXNSVUZCYVVJc1RVRkJha0k3UVVGRFJEczdRVUZGUkN4TlFVRkpOVU1zVFVGQlRXNUdMRWxCUVVsWkxFMUJRV1E3UVVGRFFTeE5RVUZKSzBJc1ZVRkJWWGRETEVkQlFXUXNSVUZEUlRzN1FVRkZSaXhQUVVGTExFbEJRVWxxUlN4SlFVRkpMRU5CUVZJc1JVRkJWMmRJTEVsQlFVa3pReXhMUVVGTFF5eEhRVUZNTEVOQlFWTk1MRTFCUVUxNFF5eE5RVUZtTEVWQlFYVkNMRU5CUVhaQ0xFTkJRWEJDTEVWQlFTdERla0lzU1VGQlNXZElMRU5CUVc1RUxFVkJRWE5FYUVnc1IwRkJkRVFzUlVGQk1rUTdRVUZEZWtSc1FpeFJRVUZKTWtNc1UwRkJVM3BDTEVOQlFXSXNTVUZEU1N4RFFVRkROa2NzVVVGQlV5eFJRVUZUTEV0QlFVdDBRaXhsUVVGbGRrWXNRMEZCWml4SFFVRnRRaXhKUVVGSlFTeERRVUUxUWl4RFFVRnVRaXhOUVVOSkxFTkJRVU4xUml4bFFVRmxka1lzUTBGQlppeEhRVUZ0UWl4SlFVRkpRU3hEUVVGNFFpeEpRVUUyUWl4RFFVWnlRenRCUVVkRU8wRkJRMFk3TzBGQlJVUjJRaXhQUVVGUGEwVXNVMEZCVUN4RFFVRnBRbk5GTEdGQlFXcENMRWRCUVdsRExGVkJRVlZLTEV0QlFWWXNSVUZCYVVKd1JpeE5RVUZxUWl4RlFVRjVRalJFTEZGQlFYcENMRVZCUVcxRE8wRkJRMnhGTUVJc1pVRkJZU3hKUVVGaUxFVkJRVzFDUml4TFFVRnVRaXhGUVVFd1FuQkdMRTFCUVRGQ0xFVkJRV3RETEVsQlFXeERMRVZCUVhkRE5FUXNVVUZCZUVNN1FVRkRSQ3hEUVVaRU96dEJRVWxCTlVjc1QwRkJUMnRGTEZOQlFWQXNRMEZCYVVKMVJTeGhRVUZxUWl4SFFVRnBReXhWUVVGVlRDeExRVUZXTEVWQlFXbENjRVlzVFVGQmFrSXNSVUZCZVVJMFJDeFJRVUY2UWl4RlFVRnRRenRCUVVOc1JUQkNMR1ZCUVdFc1NVRkJZaXhGUVVGdFFrWXNTMEZCYmtJc1JVRkJNRUp3Uml4TlFVRXhRaXhGUVVGclF5eExRVUZzUXl4RlFVRjVRelJFTEZGQlFYcERPMEZCUTBRc1EwRkdSRHM3UVVGSlFTeFRRVUZUT0VJc1dVRkJWQ3hEUVVGMVFuSkpMRWRCUVhaQ0xFVkJRVFJDSzBnc1MwRkJOVUlzUlVGQmJVTndSaXhOUVVGdVF5eEZRVUV5UXpoRUxGbEJRVE5ETEVWQlFYbEVSaXhSUVVGNlJDeEZRVUZ0UlR0QlFVTnFSU3hOUVVGSkxFTkJRVU5CTEZGQlFVd3NSVUZCWlR0QlFVTmlia1VzVjBGQlR6SkdMRlZCUVZWdVJ5eFRRVUZXTEVsQlFYVkNiVWNzVlVGQlZTeEpRVUY0UXl4RlFVRTRReXhsUVVFNVF6dEJRVU5CTTBZc1YwRkJUeXhQUVVGUGNVVXNXVUZCVUN4TFFVRjNRaXhUUVVFdlFpeEZRVUV3UXl3eVFrRkJNVU03UVVGRFFYSkZMRmRCUVU5UExGZEJRVmRtTEZOQlFWZ3NTVUZCZDBKbExGZEJRVmNzU1VGQk1VTXNSVUZCWjBRc1owSkJRV2hFTzBGQlEwRlFMRmRCUVU5UExGTkJRVk1zUTBGQlZDeEhRVUZoTTBNc1NVRkJTVmtzVFVGQmVFSXNSVUZCWjBNc2MwTkJRV2hETzBGQlEwRnZTQ3hqUVVGVlJDeExRVUZXTEVWQlFXbENMRlZCUVdwQ08wRkJRMFE3TzBGQlJVUXNUVUZCU1RWRExFMUJRVTF1Uml4SlFVRkpXU3hOUVVGa08wRkJRMEVzVFVGQlNTdENMRlZCUVZWM1F5eEhRVUZrTEVWQlEwVTdPMEZCUlVZc1QwRkJTeXhKUVVGSmFrVXNTVUZCU1N4RFFVRlNMRVZCUVZkblNDeEpRVUZKTTBNc1MwRkJTME1zUjBGQlRDeERRVUZUVEN4TlFVRk5lRU1zVFVGQlppeEZRVUYxUWl4RFFVRjJRaXhEUVVGd1FpeEZRVUVyUTNwQ0xFbEJRVWxuU0N4RFFVRnVSQ3hGUVVGelJHaElMRWRCUVhSRUxFVkJRVEpFTzBGQlEzcEViRUlzVVVGQlNUSkRMRk5CUVZONlFpeERRVUZpTEVsQlEwczJSeXhWUVVGVkxFTkJRVU4wUWl4bFFVRmxka1lzUTBGQlppeEhRVUZ0UWl4SlFVRkpRU3hEUVVGNFFpeEpRVUUyUWl4RFFVRjRReXhIUVVFMlF5eEpRVVJxUkR0QlFVVkVPMEZCUTBZN08wRkJSVVIyUWl4UFFVRlBhMFVzVTBGQlVDeERRVUZwUW5sRkxHRkJRV3BDTEVkQlFXbERMRlZCUVZWUUxFdEJRVllzUlVGQmFVSndSaXhOUVVGcVFpeEZRVUY1UWpSRUxGRkJRWHBDTEVWQlFXMURPMEZCUTJ4Rk9FSXNaVUZCWVN4SlFVRmlMRVZCUVcxQ1RpeExRVUZ1UWl4RlFVRXdRbkJHTEUxQlFURkNMRVZCUVd0RExFbEJRV3hETEVWQlFYZERORVFzVVVGQmVFTTdRVUZEUkN4RFFVWkVPenRCUVVsQk5VY3NUMEZCVDJ0RkxGTkJRVkFzUTBGQmFVSXdSU3hoUVVGcVFpeEhRVUZwUXl4VlFVRlZVaXhMUVVGV0xFVkJRV2xDY0VZc1RVRkJha0lzUlVGQmVVSTBSQ3hSUVVGNlFpeEZRVUZ0UXp0QlFVTnNSVGhDTEdWQlFXRXNTVUZCWWl4RlFVRnRRazRzUzBGQmJrSXNSVUZCTUVKd1JpeE5RVUV4UWl4RlFVRnJReXhMUVVGc1F5eEZRVUY1UXpSRUxGRkJRWHBETzBGQlEwUXNRMEZHUkRzN1FVRkpRVFZITEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDTWtVc1UwRkJha0lzUjBGQk5rSXNWVUZCVlZRc1MwRkJWaXhGUVVGcFFuQkdMRTFCUVdwQ0xFVkJRWGxDTkVRc1VVRkJla0lzUlVGQmJVTTdRVUZET1VRc1RVRkJTU3hEUVVGRFFTeFJRVUZNTEVWQlFXVTdRVUZEWW01RkxGZEJRVTh5Uml4VlFVRlZia2NzVTBGQlZpeEpRVUYxUW0xSExGVkJRVlVzU1VGQmVFTXNSVUZCT0VNc1pVRkJPVU03UVVGRFFUTkdMRmRCUVU5UExGZEJRVmRtTEZOQlFWZ3NTVUZCZDBKbExGZEJRVmNzU1VGQk1VTXNSVUZCWjBRc1owSkJRV2hFTzBGQlEwRlFMRmRCUVU5UExGTkJRVk1zUzBGQlN5OUNMRTFCUVhKQ0xFVkJRVFpDTEhORFFVRTNRanRCUVVOQk5rZ3NZMEZCVlZZc1MwRkJWaXhGUVVGcFFpeEpRVUZxUWl4RlFVRjFRaXhEUVVGRExFbEJRWGhDTzBGQlEwUTdPMEZCUlVRc1RVRkJTWEJHTEZWQlFWVXNTMEZCU3k5Q0xFMUJRVzVDTEVWQlEwVTdPMEZCUlVZc1RVRkJTVzFJTEZOQlFWTXNRMEZCWWl4RlFVTkZMRXRCUVV0NlFpeFZRVUZNTEVOQlFXZENlVUlzUzBGQmFFSXNSVUZCZFVKd1JpeE5RVUYyUWl4RlFVRXJRalJFTEZGQlFTOUNMRVZCUkVZc1MwRkhSU3hMUVVGTFJDeFZRVUZNTEVOQlFXZENMRTlCUVU5NVFpeExRVUZRTEVkQlFXVXNRMEZCTDBJc1JVRkJhME53Uml4TlFVRnNReXhGUVVFd1F6UkVMRkZCUVRGRE8wRkJRMGdzUTBGbVJEczdRVUZwUWtFc1UwRkJVMjFETEZkQlFWUXNRMEZCYzBJeFNTeEhRVUYwUWl4RlFVRXlRaXRJTEV0QlFUTkNMRVZCUVd0RGNFWXNUVUZCYkVNc1JVRkJNRU00UkN4WlFVRXhReXhGUVVGM1JFWXNVVUZCZUVRc1JVRkJhMFU3UVVGRGFFVXNUVUZCU1N4RFFVRkRRU3hSUVVGTUxFVkJRV1U3UVVGRFltNUZMRmRCUVU4eVJpeFZRVUZWYmtjc1UwRkJWaXhKUVVGMVFtMUhMRlZCUVZVc1NVRkJlRU1zUlVGQk9FTXNaVUZCT1VNN1FVRkRRVE5HTEZkQlFVOHNUMEZCVDNGRkxGbEJRVkFzUzBGQmQwSXNVMEZCTDBJc1JVRkJNRU1zTWtKQlFURkRPMEZCUTBGeVJTeFhRVUZQVHl4WFFVRlhaaXhUUVVGWUxFbEJRWGRDWlN4WFFVRlhMRWxCUVRGRExFVkJRV2RFTEdkQ1FVRm9SRHRCUVVOQlVDeFhRVUZQVHl4VFFVRlRMRU5CUVZRc1IwRkJZVE5ETEVsQlFVbFpMRTFCUVhoQ0xFVkJRV2RETEhORFFVRm9RenRCUVVOQk5rZ3NZMEZCVlZZc1MwRkJWaXhGUVVGcFFpeE5RVUZxUWl4RlFVRjVRaXhEUVVGRExFMUJRVEZDTzBGQlEwUTdPMEZCUlVRc1RVRkJTVFZETEUxQlFVMXVSaXhKUVVGSldTeE5RVUZrTzBGQlEwRXNUVUZCU1N0Q0xGVkJRVlYzUXl4SFFVRmtMRVZCUTBVN08wRkJSVVlzVFVGQlNUUkRMRk5CUVZNc1EwRkJZaXhGUVVORlJTeGhRVUZoYWtrc1IwRkJZaXhGUVVGclFpdElMRXRCUVd4Q0xFVkJRWGxDY0VZc1RVRkJla0lzUlVGQmFVTTRSQ3haUVVGcVF5eEZRVUVyUTBZc1VVRkJMME1zUlVGRVJpeExRVWRGTUVJc1lVRkJZV3BKTEVkQlFXSXNSVUZCYTBJc1UwRkJVeXRJTEV0QlFWUXNSMEZCYVVJc1EwRkJia01zUlVGQmMwTndSaXhOUVVGMFF5eEZRVUU0UXpoRUxGbEJRVGxETEVWQlFUUkVSaXhSUVVFMVJEdEJRVU5JT3p0QlFVVkVOVWNzVDBGQlQydEZMRk5CUVZBc1EwRkJhVUk0UlN4WlFVRnFRaXhIUVVGblF5eFZRVUZWV2l4TFFVRldMRVZCUVdsQ2NFWXNUVUZCYWtJc1JVRkJlVUkwUkN4UlFVRjZRaXhGUVVGdFF6dEJRVU5xUlcxRExHTkJRVmtzU1VGQldpeEZRVUZyUWxnc1MwRkJiRUlzUlVGQmVVSndSaXhOUVVGNlFpeEZRVUZwUXl4SlFVRnFReXhGUVVGMVF6UkVMRkZCUVhaRE8wRkJRMFFzUTBGR1JEczdRVUZKUVRWSExFOUJRVTlyUlN4VFFVRlFMRU5CUVdsQ0swVXNXVUZCYWtJc1IwRkJaME1zVlVGQlZXSXNTMEZCVml4RlFVRnBRbkJHTEUxQlFXcENMRVZCUVhsQ05FUXNVVUZCZWtJc1JVRkJiVU03UVVGRGFrVnRReXhqUVVGWkxFbEJRVm9zUlVGQmEwSllMRXRCUVd4Q0xFVkJRWGxDY0VZc1RVRkJla0lzUlVGQmFVTXNTMEZCYWtNc1JVRkJkME0wUkN4UlFVRjRRenRCUVVORUxFTkJSa1E3TzBGQlNVRXNVMEZCVTNORExGZEJRVlFzUTBGQmMwSTNTU3hIUVVGMFFpeEZRVUV5UWl0SUxFdEJRVE5DTEVWQlFXdERjRVlzVFVGQmJFTXNSVUZCTUVNNFJDeFpRVUV4UXl4RlFVRjNSRVlzVVVGQmVFUXNSVUZCYTBVN1FVRkRhRVVzVFVGQlNTeERRVUZEUVN4UlFVRk1MRVZCUVdVN1FVRkRZbTVGTEZkQlFVOHlSaXhWUVVGVmJrY3NVMEZCVml4SlFVRjFRbTFITEZWQlFWVXNTVUZCZUVNc1JVRkJPRU1zWlVGQk9VTTdRVUZEUVROR0xGZEJRVThzVDBGQlQzRkZMRmxCUVZBc1MwRkJkMElzVTBGQkwwSXNSVUZCTUVNc01rSkJRVEZETzBGQlEwRnlSU3hYUVVGUFR5eFhRVUZYWml4VFFVRllMRWxCUVhkQ1pTeFhRVUZYTEVsQlFURkRMRVZCUVdkRUxHZENRVUZvUkR0QlFVTkJVQ3hYUVVGUFR5eFRRVUZUTEVOQlFWUXNSMEZCWVRORExFbEJRVWxaTEUxQlFYaENMRVZCUVdkRExITkRRVUZvUXp0QlFVTkJOa2dzWTBGQlZWWXNTMEZCVml4RlFVRnBRaXhWUVVGcVFpeEZRVUUyUWl4RFFVRkRMRlZCUVRsQ08wRkJRMFE3TzBGQlJVUXNUVUZCU1RWRExFMUJRVTF1Uml4SlFVRkpXU3hOUVVGa08wRkJRMEVzVFVGQlNTdENMRlZCUVZWM1F5eEhRVUZrTEVWQlEwVTdPMEZCUlVZc1RVRkJTVFJETEZOQlFWTXNRMEZCWWl4RlFVTkZUU3hoUVVGaGNra3NSMEZCWWl4RlFVRnJRaXRJTEV0QlFXeENMRVZCUVhsQ2NFWXNUVUZCZWtJc1JVRkJhVU00UkN4WlFVRnFReXhGUVVFclEwWXNVVUZCTDBNc1JVRkVSaXhMUVVkRk9FSXNZVUZCWVhKSkxFZEJRV0lzUlVGQmEwSXNZVUZCWVN0SUxFdEJRV0lzUjBGQmNVSXNRMEZCZGtNc1JVRkJNRU53Uml4TlFVRXhReXhGUVVGclJEaEVMRmxCUVd4RUxFVkJRV2RGUml4UlFVRm9SVHRCUVVOSU96dEJRVVZFTlVjc1QwRkJUMnRGTEZOQlFWQXNRMEZCYVVKcFJpeFpRVUZxUWl4SFFVRm5ReXhWUVVGVlppeExRVUZXTEVWQlFXbENjRVlzVFVGQmFrSXNSVUZCZVVJMFJDeFJRVUY2UWl4RlFVRnRRenRCUVVOcVJYTkRMR05CUVZrc1NVRkJXaXhGUVVGclFtUXNTMEZCYkVJc1JVRkJlVUp3Uml4TlFVRjZRaXhGUVVGcFF5eEpRVUZxUXl4RlFVRjFRelJFTEZGQlFYWkRPMEZCUTBRc1EwRkdSRHM3UVVGSlFUVkhMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENhMFlzV1VGQmFrSXNSMEZCWjBNc1ZVRkJWV2hDTEV0QlFWWXNSVUZCYVVKd1JpeE5RVUZxUWl4RlFVRjVRalJFTEZGQlFYcENMRVZCUVcxRE8wRkJRMnBGYzBNc1kwRkJXU3hKUVVGYUxFVkJRV3RDWkN4TFFVRnNRaXhGUVVGNVFuQkdMRTFCUVhwQ0xFVkJRV2xETEV0QlFXcERMRVZCUVhkRE5FUXNVVUZCZUVNN1FVRkRSQ3hEUVVaRU96dEJRVWxCTEZOQlFWTjVReXhYUVVGVUxFTkJRWE5DYUVvc1IwRkJkRUlzUlVGQk1rSXJTQ3hMUVVFelFpeEZRVUZyUTNCR0xFMUJRV3hETEVWQlFUQkRPRVFzV1VGQk1VTXNSVUZCZDBSR0xGRkJRWGhFTEVWQlFXdEZPMEZCUTJoRkxFMUJRVWtzUTBGQlEwRXNVVUZCVEN4RlFVRmxPMEZCUTJKdVJTeFhRVUZQTWtZc1ZVRkJWVzVITEZOQlFWWXNTVUZCZFVKdFJ5eFZRVUZWTEVsQlFYaERMRVZCUVRoRExHVkJRVGxETzBGQlEwRXpSaXhYUVVGUExFOUJRVTl4UlN4WlFVRlFMRXRCUVhkQ0xGTkJRUzlDTEVWQlFUQkRMREpDUVVFeFF6dEJRVU5CY2tVc1YwRkJUMDhzVjBGQlYyWXNVMEZCV0N4SlFVRjNRbVVzVjBGQlZ5eEpRVUV4UXl4RlFVRm5SQ3huUWtGQmFFUTdRVUZEUVZBc1YwRkJUMDhzVTBGQlV5eERRVUZVTEVkQlFXRXpReXhKUVVGSldTeE5RVUY0UWl4RlFVRm5ReXh6UTBGQmFFTTdRVUZEUVhGSkxHbENRVUZoYkVJc1MwRkJZaXhGUVVGdlFpeHpRa0ZCY0VJc1JVRkJORU1zUTBGQlF5eHpRa0ZCTjBNN1FVRkRSRHM3UVVGRlJDeE5RVUZKTlVNc1RVRkJUVzVHTEVsQlFVbFpMRTFCUVdRN1FVRkRRU3hOUVVGSkswSXNWVUZCVlhkRExFZEJRV1FzUlVGRFJUczdRVUZGUmpGR0xGVkJRVkU0UWl4TFFVRlNMRU5CUVdOMlFpeEhRVUZrTEVWQlFXMUNLMGdzUzBGQmJrSXNSVUZCTUVKd1JpeE5RVUV4UWl4RlFVRnJRemhFTEZsQlFXeERMRVZCUVdkRUxFVkJRV2hFTEVWQlFXOUVMRU5CUVhCRU8wRkJRMFE3TzBGQlJVUTVSeXhQUVVGUGEwVXNVMEZCVUN4RFFVRnBRbkZHTEZsQlFXcENMRWRCUVdkRExGVkJRVlZ1UWl4TFFVRldMRVZCUVdsQ2NFWXNUVUZCYWtJc1JVRkJlVUkwUkN4UlFVRjZRaXhGUVVGdFF6dEJRVU5xUlhsRExHTkJRVmtzU1VGQldpeEZRVUZyUW1wQ0xFdEJRV3hDTEVWQlFYbENjRVlzVFVGQmVrSXNSVUZCYVVNc1NVRkJha01zUlVGQmRVTTBSQ3hSUVVGMlF6dEJRVU5FTEVOQlJrUTdPMEZCU1VFMVJ5eFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFuTkdMRmxCUVdwQ0xFZEJRV2RETEZWQlFWVndRaXhMUVVGV0xFVkJRV2xDY0VZc1RVRkJha0lzUlVGQmVVSTBSQ3hSUVVGNlFpeEZRVUZ0UXp0QlFVTnFSWGxETEdOQlFWa3NTVUZCV2l4RlFVRnJRbXBDTEV0QlFXeENMRVZCUVhsQ2NFWXNUVUZCZWtJc1JVRkJhVU1zUzBGQmFrTXNSVUZCZDBNMFJDeFJRVUY0UXp0QlFVTkVMRU5CUmtRN08wRkJTVUVzVTBGQlV6WkRMRmxCUVZRc1EwRkJkVUp3U2l4SFFVRjJRaXhGUVVFMFFpdElMRXRCUVRWQ0xFVkJRVzFEY0VZc1RVRkJia01zUlVGQk1rTTRSQ3haUVVFelF5eEZRVUY1UkVZc1VVRkJla1FzUlVGQmJVVTdRVUZEYWtVc1RVRkJTU3hEUVVGRFFTeFJRVUZNTEVWQlFXVTdRVUZEWW01RkxGZEJRVTh5Uml4VlFVRlZia2NzVTBGQlZpeEpRVUYxUW0xSExGVkJRVlVzU1VGQmVFTXNSVUZCT0VNc1pVRkJPVU03UVVGRFFUTkdMRmRCUVU4c1QwRkJUM0ZGTEZsQlFWQXNTMEZCZDBJc1UwRkJMMElzUlVGQk1FTXNNa0pCUVRGRE8wRkJRMEZ5UlN4WFFVRlBUeXhYUVVGWFppeFRRVUZZTEVsQlFYZENaU3hYUVVGWExFbEJRVEZETEVWQlFXZEVMR2RDUVVGb1JEdEJRVU5CVUN4WFFVRlBUeXhUUVVGVExFTkJRVlFzUjBGQllUTkRMRWxCUVVsWkxFMUJRWGhDTEVWQlEwa3NjME5CUkVvN1FVRkZRWEZKTEdsQ1FVRmhiRUlzUzBGQllpeEZRVUZ2UWl4MVFrRkJjRUlzUlVGQk5rTXNRMEZCUXl4MVFrRkJPVU03UVVGRFJEczdRVUZGUkN4TlFVRkpOVU1zVFVGQlRXNUdMRWxCUVVsWkxFMUJRV1E3UVVGRFFTeE5RVUZKSzBJc1ZVRkJWWGRETEVkQlFXUXNSVUZEUlRzN1FVRkZSakZHTEZWQlFWRTRRaXhMUVVGU0xFTkJRV04yUWl4SFFVRmtMRVZCUVcxQ0swZ3NTMEZCYmtJc1JVRkJNRUp3Uml4TlFVRXhRaXhGUVVGclF6aEVMRmxCUVd4RExFVkJRV2RFTEVWQlFXaEVMRVZCUVc5RUxFTkJRWEJFTzBGQlEwUTdPMEZCUlVRNVJ5eFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFuZEdMR0ZCUVdwQ0xFZEJRV2xETEZWQlFWVjBRaXhMUVVGV0xFVkJRV2xDY0VZc1RVRkJha0lzUlVGQmVVSTBSQ3hSUVVGNlFpeEZRVUZ0UXp0QlFVTnNSVFpETEdWQlFXRXNTVUZCWWl4RlFVRnRRbkpDTEV0QlFXNUNMRVZCUVRCQ2NFWXNUVUZCTVVJc1JVRkJhME1zU1VGQmJFTXNSVUZCZDBNMFJDeFJRVUY0UXp0QlFVTkVMRU5CUmtRN08wRkJTVUUxUnl4UFFVRlBhMFVzVTBGQlVDeERRVUZwUW5sR0xHRkJRV3BDTEVkQlFXbERMRlZCUVZWMlFpeExRVUZXTEVWQlFXbENjRVlzVFVGQmFrSXNSVUZCZVVJMFJDeFJRVUY2UWl4RlFVRnRRenRCUVVOc1JUWkRMR1ZCUVdFc1NVRkJZaXhGUVVGdFFuSkNMRXRCUVc1Q0xFVkJRVEJDY0VZc1RVRkJNVUlzUlVGQmEwTXNTMEZCYkVNc1JVRkJlVU0wUkN4UlFVRjZRenRCUVVORUxFTkJSa1E3TzBGQlNVRTdRVUZEUVRWSExFOUJRVTlyUlN4VFFVRlFMRU5CUVdsQ01FWXNTVUZCYWtJc1IwRkJkMElzVlVGQlZYaENMRXRCUVZZc1JVRkJhVUk1UkN4TFFVRnFRaXhGUVVGM1FrTXNSMEZCZUVJc1JVRkJOa0k3UVVGRGJrUXNUVUZCU1N4RFFVRkROa1FzUzBGQlRDeEZRVUZaUVN4UlFVRlJMRU5CUVZJN1FVRkRXaXhOUVVGSkxFTkJRVU01UkN4TFFVRk1MRVZCUVZsQkxGRkJRVkVzUTBGQlVqdEJRVU5hTEUxQlFVa3NRMEZCUTBNc1IwRkJUQ3hGUVVGVlFTeE5RVUZOTEV0QlFVdDBSQ3hOUVVGWU96dEJRVVZXTEUxQlFVa3NUMEZCVDIxSUxFdEJRVkFzUzBGQmFVSXNVVUZCY2tJc1JVRkJLMEk3UVVGRE4wSkJMRmxCUVZGQkxFMUJRVTE1UWl4VlFVRk9MRU5CUVdsQ0xFTkJRV3BDTEVOQlFWSTdRVUZEUkRzN1FVRkZSSEJJTEZOQlFVOHNUMEZCVHpKR0xFdEJRVkFzUzBGQmFVSXNVVUZCYWtJc1NVRkJOa0lzUTBGQlF6ZEZMRTFCUVUwMlJTeExRVUZPTEVOQlFYSkRMRVZCUVcxRUxIVkNRVUZ1UkR0QlFVTkJNMFlzVTBGQlR6aENMRTlCUVU5RUxFdEJRV1FzUlVGQmNVSXNZVUZCY2tJN08wRkJSVUU3UVVGRFFTeE5RVUZKUXl4UlFVRlJSQ3hMUVVGYUxFVkJRVzFDTzBGQlEyNUNMRTFCUVVrc1MwRkJTM0pFTEUxQlFVd3NTMEZCWjBJc1EwRkJjRUlzUlVGQmRVSTdPMEZCUlhaQ2QwSXNVMEZCVHpaQ0xGTkJRVk1zUTBGQlZDeEpRVUZqUVN4UlFVRlJMRXRCUVV0eVJDeE5RVUZzUXl4RlFVRXdReXh4UWtGQk1VTTdRVUZEUVhkQ0xGTkJRVTg0UWl4UFFVRlBMRU5CUVZBc1NVRkJXVUVzVDBGQlR5eExRVUZMZEVRc1RVRkJMMElzUlVGQmRVTXNiVUpCUVhaRE96dEJRVVZCTEU5QlFVc3NTVUZCU1Uwc1NVRkJTU3RETEV0QlFXSXNSVUZCYjBJdlF5eEpRVUZKWjBRc1IwRkJlRUlzUlVGQk5rSm9SQ3hIUVVFM1FpeEZRVUZyUXp0QlFVTm9ReXhUUVVGTFFTeERRVUZNTEVsQlFWVTJSeXhMUVVGV08wRkJRMFE3UVVGRFJpeERRWFJDUkRzN1FVRjNRa0Z3U1N4UFFVRlBhMFVzVTBGQlVDeERRVUZwUWpSR0xFOUJRV3BDTEVkQlFUSkNMRmxCUVZrN1FVRkRja01zVFVGQlNUbEVMRTFCUVUwc1JVRkJWanRCUVVOQkxFMUJRVWxTTEUxQlFVMHNTMEZCUzNaRkxFMUJRV1k3UVVGRFFTeFBRVUZMTEVsQlFVbE5MRWxCUVVrc1EwRkJZaXhGUVVGblFrRXNTVUZCU1dsRkxFZEJRWEJDTEVWQlFYbENha1VzUjBGQmVrSXNSVUZCT0VJN1FVRkROVUo1UlN4UlFVRkpla1VzUTBGQlNpeEpRVUZUTUVVc1RVRkJUU3hMUVVGTE1VVXNRMEZCVEN4RFFVRk9MRU5CUVZRN1FVRkRRU3hSUVVGSlFTeE5RVUZOZUVJc1VVRkJVVWNzYVVKQlFXeENMRVZCUVhGRE8wRkJRMjVET0VZc1ZVRkJTWHBGTEVsQlFVa3NRMEZCVWl4SlFVRmhMRXRCUVdJN1FVRkRRVHRCUVVORU8wRkJRMFk3UVVGRFJDeFRRVUZQTEdGQlFXRjVSU3hKUVVGSkswUXNTVUZCU2l4RFFVRlRMRWRCUVZRc1EwRkJZaXhIUVVFMlFpeEhRVUZ3UXp0QlFVTkVMRU5CV0VRN08wRkJZVUU3T3pzN1FVRkpRUzlLTEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDT0VZc1lVRkJha0lzUjBGQmFVTXNXVUZCV1R0QlFVTXpReXhOUVVGSkxFOUJRVTk0U2l4VlFVRlFMRXRCUVhOQ0xGZEJRVEZDTEVWQlFYVkRPMEZCUTNKRExGRkJRVWxTTEU5QlFVOUpMR1ZCUVZnc1JVRkJORUk3UVVGRE1VSXNZVUZCVVN4SlFVRkpTaXhOUVVGS0xFTkJRVmNzU1VGQldDeERRVUZFTEVOQlFXMUNhVXNzVFVGQk1VSTdRVUZEUkN4TFFVWkVMRTFCUlU4N1FVRkRUQ3hWUVVGSk5Vb3NUVUZCVFN4SlFVRkpSeXhWUVVGS0xFTkJRV1VzUzBGQlMxTXNUVUZCY0VJc1EwRkJWanRCUVVOQkxGZEJRVXNzU1VGQlNVMHNTVUZCU1N4RFFVRlNMRVZCUVZkcFJTeE5RVUZOYmtZc1NVRkJTVmtzVFVGQk1VSXNSVUZCYTBOTkxFbEJRVWxwUlN4SFFVRjBReXhGUVVFeVEycEZMRXRCUVVzc1EwRkJhRVE3UVVGRFJXeENMRmxCUVVsclFpeERRVUZLTEVsQlFWTXNTMEZCUzBFc1EwRkJUQ3hEUVVGVU8wRkJSRVlzVDBGRlFTeFBRVUZQYkVJc1NVRkJTVFJLTEUxQlFWZzdRVUZEUkR0QlFVTkdMRWRCVkVRc1RVRlRUenRCUVVOTUxGVkJRVTBzU1VGQlNUZEpMRXRCUVVvc1EwRkJWU3h2UkVGQlZpeERRVUZPTzBGQlEwUTdRVUZEUml4RFFXSkVPenRCUVdWQk8wRkJRMEU3TzBGQlJVRXNVMEZCVTBvc1ZVRkJWQ3hEUVVGeFFtdENMRWRCUVhKQ0xFVkJRVEJDTzBGQlEzaENMRTFCUVVsQkxFbEJRVWxuU1N4SlFVRlNMRVZCUVdNc1QwRkJUMmhKTEVsQlFVbG5TU3hKUVVGS0xFVkJRVkE3UVVGRFpDeFRRVUZQYUVrc1NVRkJTV2xKTEU5QlFVb3NRMEZCV1N4WlFVRmFMRVZCUVRCQ0xFVkJRVEZDTEVOQlFWQTdRVUZEUkRzN1FVRkZSQ3hKUVVGSlF5eExRVUZMY0Vzc1QwRkJUMnRGTEZOQlFXaENPenRCUVVWQk96czdRVUZIUVd4RkxFOUJRVTl4UWl4UlFVRlFMRWRCUVd0Q0xGVkJRVlZrTEVkQlFWWXNSVUZCWlR0QlFVTXZRa0VzVFVGQlNXVXNVMEZCU2l4SFFVRm5RaXhKUVVGb1FqczdRVUZGUVR0QlFVTkJaaXhOUVVGSk9Fb3NTVUZCU2l4SFFVRlhPVW9zU1VGQlNTdEdMRWRCUVdZN1FVRkRRUzlHTEUxQlFVbHBRaXhKUVVGS0xFZEJRVmRxUWl4SlFVRkphMGNzUjBGQlpqczdRVUZGUVR0QlFVTkJiRWNzVFVGQlNTdEdMRWRCUVVvc1IwRkJWVGhFTEVkQlFVYzVSQ3hIUVVGaU8wRkJRMEV2Uml4TlFVRkphMGNzUjBGQlNpeEhRVUZWTWtRc1IwRkJSek5FTEVkQlFXSTdPMEZCUlVGc1J5eE5RVUZKY1VJc1MwRkJTaXhIUVVGWmQwa3NSMEZCUjNoSkxFdEJRV1k3UVVGRFFYSkNMRTFCUVVrNFJDeFJRVUZLTEVkQlFXVXJSaXhIUVVGSEwwWXNVVUZCYkVJN1FVRkRRVGxFTEUxQlFVa3JTaXhqUVVGS0xFZEJRWEZDUml4SFFVRkhMMFlzVVVGQmVFSTdRVUZEUVRsRUxFMUJRVWwzUlN4TlFVRktMRWRCUVdGeFJpeEhRVUZIY2tZc1RVRkJhRUk3UVVGRFFYaEZMRTFCUVVselF5eEpRVUZLTEVkQlFWZDFTQ3hIUVVGSGRrZ3NTVUZCWkR0QlFVTkJkRU1zVFVGQlNUSkZMRXRCUVVvc1IwRkJXV3RHTEVkQlFVZHNSaXhMUVVGbU8wRkJRMEV6UlN4TlFVRkpiMElzVTBGQlNpeEhRVUZuUW5sSkxFZEJRVWQ2U1N4VFFVRnVRanRCUVVOQmNFSXNUVUZCU1hsSExGbEJRVW9zUjBGQmJVSnZSQ3hIUVVGSGNFUXNXVUZCZEVJN1FVRkRRWHBITEUxQlFVa3dSeXhaUVVGS0xFZEJRVzFDYlVRc1IwRkJSMjVFTEZsQlFYUkNPMEZCUTBFeFJ5eE5RVUZKTkVjc1dVRkJTaXhIUVVGdFFtbEVMRWRCUVVkcVJDeFpRVUYwUWp0QlFVTkJOVWNzVFVGQlNUWkhMRmxCUVVvc1IwRkJiVUpuUkN4SFFVRkhhRVFzV1VGQmRFSTdRVUZEUVRkSExFMUJRVWs0Unl4UlFVRktMRWRCUVdVclF5eEhRVUZITDBNc1VVRkJiRUk3UVVGRFFUbEhMRTFCUVVscFNDeFhRVUZLTEVkQlFXdENORU1zUjBGQlJ6VkRMRmRCUVhKQ08wRkJRMEZxU0N4TlFVRkphMGdzVjBGQlNpeEhRVUZyUWpKRExFZEJRVWN6UXl4WFFVRnlRanRCUVVOQmJFZ3NUVUZCU1c5SUxGZEJRVW9zUjBGQmEwSjVReXhIUVVGSGVrTXNWMEZCY2tJN1FVRkRRWEJJTEUxQlFVbHhTQ3hYUVVGS0xFZEJRV3RDZDBNc1IwRkJSM2hETEZkQlFYSkNPMEZCUTBGeVNDeE5RVUZKZDBnc1YwRkJTaXhIUVVGclFuRkRMRWRCUVVkeVF5eFhRVUZ5UWp0QlFVTkJlRWdzVFVGQlNYbElMRmRCUVVvc1IwRkJhMEp2UXl4SFFVRkhjRU1zVjBGQmNrSTdRVUZEUVhwSUxFMUJRVWt5U0N4WlFVRktMRWRCUVcxQ2EwTXNSMEZCUjJ4RExGbEJRWFJDTzBGQlEwRXpTQ3hOUVVGSk5FZ3NXVUZCU2l4SFFVRnRRbWxETEVkQlFVZHFReXhaUVVGMFFqdEJRVU5CTlVnc1RVRkJTVzlITEZWQlFVb3NSMEZCYVVKNVJDeEhRVUZIZWtRc1ZVRkJjRUk3UVVGRFFYQkhMRTFCUVVscFNTeGhRVUZLTEVkQlFXOUNORUlzUjBGQlJ6VkNMR0ZCUVhaQ08wRkJRMEZxU1N4TlFVRkphMGtzWVVGQlNpeEhRVUZ2UWpKQ0xFZEJRVWN6UWl4aFFVRjJRanRCUVVOQmJFa3NUVUZCU1c5SkxHRkJRVW9zUjBGQmIwSjVRaXhIUVVGSGVrSXNZVUZCZGtJN1FVRkRRWEJKTEUxQlFVbHhTU3hoUVVGS0xFZEJRVzlDZDBJc1IwRkJSM2hDTEdGQlFYWkNPMEZCUTBGeVNTeE5RVUZKYzBrc1UwRkJTaXhIUVVGblFuVkNMRWRCUVVkMlFpeFRRVUZ1UWp0QlFVTkJkRWtzVFVGQlNYbEpMRmxCUVVvc1IwRkJiVUp2UWl4SFFVRkhjRUlzV1VGQmRFSTdRVUZEUVhwSkxFMUJRVWt3U1N4WlFVRktMRWRCUVcxQ2JVSXNSMEZCUjI1Q0xGbEJRWFJDTzBGQlEwRXhTU3hOUVVGSk5Fa3NXVUZCU2l4SFFVRnRRbWxDTEVkQlFVZHFRaXhaUVVGMFFqdEJRVU5CTlVrc1RVRkJTVFpKTEZsQlFVb3NSMEZCYlVKblFpeEhRVUZIYUVJc1dVRkJkRUk3UVVGRFFUZEpMRTFCUVVsblNpeFpRVUZLTEVkQlFXMUNZU3hIUVVGSFlpeFpRVUYwUWp0QlFVTkJhRW9zVFVGQlNXbEtMRmxCUVVvc1IwRkJiVUpaTEVkQlFVZGFMRmxCUVhSQ08wRkJRMEZxU2l4TlFVRkpiVW9zWVVGQlNpeEhRVUZ2UWxVc1IwRkJSMVlzWVVGQmRrSTdRVUZEUVc1S0xFMUJRVWx2U2l4aFFVRktMRWRCUVc5Q1V5eEhRVUZIVkN4aFFVRjJRanRCUVVOQmNFb3NUVUZCU1hGS0xFbEJRVW9zUjBGQlYxRXNSMEZCUjFJc1NVRkJaRHRCUVVOQmNrb3NUVUZCU1hWS0xFOUJRVW9zUjBGQlkwMHNSMEZCUjA0c1QwRkJha0k3UVVGRFFYWktMRTFCUVVsNVNpeGhRVUZLTEVkQlFXOUNTU3hIUVVGSFNpeGhRVUYyUWpzN1FVRkZRU3hUUVVGUGVrb3NSMEZCVUR0QlFVTkVMRU5CYkVSRU96dEJRVzlFUVR0QlFVTkJMRk5CUVZNMFJpeExRVUZVTEVOQlFXZENiMFVzUzBGQmFFSXNSVUZCZFVJdlJTeEhRVUYyUWl4RlFVRTBRbWRHTEZsQlFUVkNMRVZCUVRCRE8wRkJRM2hETEUxQlFVa3NUMEZCVDBRc1MwRkJVQ3hMUVVGcFFpeFJRVUZ5UWl4RlFVRXJRaXhQUVVGUFF5eFpRVUZRTzBGQlF5OUNSQ3hWUVVGUkxFTkJRVU1zUTBGQlEwRXNTMEZCVml4RFFVWjNReXhEUVVWMFFqdEJRVU5zUWl4TlFVRkpRU3hUUVVGVEwwVXNSMEZCWWl4RlFVRnJRaXhQUVVGUFFTeEhRVUZRTzBGQlEyeENMRTFCUVVrclJTeFRRVUZUTEVOQlFXSXNSVUZCWjBJc1QwRkJUMEVzUzBGQlVEdEJRVU5vUWtFc1YwRkJVeTlGTEVkQlFWUTdRVUZEUVN4TlFVRkpLMFVzVTBGQlV5eERRVUZpTEVWQlFXZENMRTlCUVU5QkxFdEJRVkE3UVVGRGFFSXNVMEZCVHl4RFFVRlFPMEZCUTBRN08wRkJSVVFzVTBGQlUzSktMRTFCUVZRc1EwRkJhVUpFTEUxQlFXcENMRVZCUVhsQ08wRkJRM1pDTzBGQlEwRTdRVUZEUVR0QlFVTkJRU3hYUVVGVExFTkJRVU1zUTBGQlF6SkZMRXRCUVVzMlJTeEpRVUZNTEVOQlFWVXNRMEZCUTNoS0xFMUJRVmdzUTBGQldEdEJRVU5CTEZOQlFVOUJMRk5CUVZNc1EwRkJWQ3hIUVVGaExFTkJRV0lzUjBGQmFVSkJMRTFCUVhoQ08wRkJRMFE3TzBGQlJVUXNVMEZCVTNsQ0xFOUJRVlFzUTBGQmEwSTVRaXhQUVVGc1FpeEZRVUV5UWp0QlFVTjZRaXhUUVVGUExFTkJRVU54UlN4TlFVRk5ka01zVDBGQlRpeEpRVUZwUWl4VlFVRlZPVUlzVDBGQlZpeEZRVUZ0UWp0QlFVTXhReXhYUVVGUE9Fb3NUMEZCVDNoSExGTkJRVkFzUTBGQmFVSkhMRkZCUVdwQ0xFTkJRVEJDWXl4SlFVRXhRaXhEUVVFclFuWkZMRTlCUVM5Q0xFMUJRVFJETEdkQ1FVRnVSRHRCUVVORUxFZEJSazBzUlVGRlNrRXNUMEZHU1N4RFFVRlFPMEZCUjBRN08wRkJSVVFzVTBGQlUyRXNWVUZCVkN4RFFVRnhRbUlzVDBGQmNrSXNSVUZCT0VJN1FVRkROVUlzVTBGQlR6aENMRkZCUVZFNVFpeFBRVUZTTEV0QlFXOUNXaXhQUVVGUE1FSXNVVUZCVUN4RFFVRm5RbVFzVDBGQmFFSXNRMEZCY0VJc1NVRkRTRUVzVjBGQlZ5eFJRVUZQUVN4UFFVRlFMSGxEUVVGUFFTeFBRVUZRTEU5QlFXMUNMRkZCUVRsQ0xFbEJRMEVzVDBGQlQwRXNVVUZCVVVzc1RVRkJaaXhMUVVFd1FpeFJRVVk1UWp0QlFVZEVPenRCUVVWRUxGTkJRVk5uUml4TFFVRlVMRU5CUVdkQ01FVXNRMEZCYUVJc1JVRkJiVUk3UVVGRGFrSXNUVUZCU1VFc1NVRkJTU3hGUVVGU0xFVkJRVmtzVDBGQlR5eE5RVUZOUVN4RlFVRkZkRWNzVVVGQlJpeERRVUZYTEVWQlFWZ3NRMEZCWWp0QlFVTmFMRk5CUVU5elJ5eEZRVUZGZEVjc1VVRkJSaXhEUVVGWExFVkJRVmdzUTBGQlVEdEJRVU5FT3p0QlFVVkVMRk5CUVZOcVF5eFhRVUZVTEVOQlFYTkNSaXhIUVVGMFFpeEZRVUV5UWp0QlFVTjZRaXhOUVVGSk1Fa3NXVUZCV1N4RlFVRm9RanRCUVVOQkxFOUJRVXNzU1VGQlNYSktMRWxCUVVrc1EwRkJZaXhGUVVGblFrRXNTVUZCU1Zjc1NVRkJTV3BDTEUxQlFYaENMRVZCUVdkRFRTeEhRVUZvUXl4RlFVRnhRenRCUVVOdVF5eFJRVUZKVXl4SlFVRkpSU3hKUVVGSk1rZ3NWVUZCU2l4RFFVRmxkRWtzUTBGQlppeERRVUZTTzBGQlEwRXNVVUZCU1ZNc1MwRkJTeXhKUVVGVUxFVkJRMFUwU1N4VlFVRlZReXhKUVVGV0xFTkJRV1V6U1N4SlFVRkpNa2dzVlVGQlNpeERRVUZsZEVrc1EwRkJaaXhEUVVGbUxFVkJSRVlzUzBGRlN6dEJRVU5JTEZWQlFVa3JReXhSUVVGUkwwTXNRMEZCV2p0QlFVTkJMRlZCUVVsVExFdEJRVXNzVFVGQlRDeEpRVUZsUVN4TFFVRkxMRTFCUVhoQ0xFVkJRV2REVkR0QlFVTm9ReXhWUVVGSmRVb3NTVUZCU1VNc2JVSkJRVzFDTjBrc1NVRkJTV2RFTEV0QlFVb3NRMEZCVlZvc1MwRkJWaXhGUVVGcFFpOURMRWxCUVVVc1EwRkJia0lzUTBGQmJrSXNSVUZCTUVNclFpeE5RVUV4UXl4RFFVRnBSQ3hEUVVGcVJDeEZRVUZ2UkRCSUxFdEJRWEJFTEVOQlFUQkVMRWRCUVRGRUxFTkJRVkk3UVVGRFFTeFhRVUZMTEVsQlFVbDZReXhKUVVGSkxFTkJRV0lzUlVGQlowSkJMRWxCUVVsMVF5eEZRVUZGTjBvc1RVRkJkRUlzUlVGQk9FSnpTQ3hIUVVFNVFqdEJRVU5GY1VNc2EwSkJRVlZETEVsQlFWWXNRMEZCWlhoSUxGTkJRVk41U0N4RlFVRkZka01zUTBGQlJpeERRVUZVTEVWQlFXVXNSVUZCWml4RFFVRm1PMEZCUkVZN1FVRkZSRHRCUVVOR08wRkJRMFFzVTBGQlQzRkRMRk5CUVZBN1FVRkRSRHM3UVVGRlJDeFRRVUZUTDBjc1dVRkJWQ3hEUVVGMVFqTkNMRWRCUVhaQ0xFVkJRVFJDTzBGQlF6RkNMRTFCUVVrd1NTeFpRVUZaTEVWQlFXaENPMEZCUTBFc1QwRkJTeXhKUVVGSmNrb3NTVUZCU1N4RFFVRmlMRVZCUVdkQ1FTeEpRVUZKVnl4SlFVRkpha0lzVFVGQmVFSXNSVUZCWjBOTkxFZEJRV2hETEVWQlFYRkRPMEZCUTI1RE8wRkJRMEZ4U2l4alFVRlZReXhKUVVGV0xFTkJRV1V6U1N4SlFVRkpNa2dzVlVGQlNpeERRVUZsZEVrc1EwRkJaaXhKUVVGdlFpeEpRVUZ1UXp0QlFVTkVPMEZCUTBRc1UwRkJUM0ZLTEZOQlFWQTdRVUZEUkRzN1FVRkZSQ3hUUVVGVE0wY3NZMEZCVkN4RFFVRjVRaTlDTEVkQlFYcENMRVZCUVRoQ08wRkJRelZDTEUxQlFVa3JTU3hEUVVGS0xFVkJRVTlETEVWQlFWQXNSVUZCVjBNc1JVRkJXRHRCUVVOQkxFMUJRVWxRTEZsQlFWa3NSVUZCYUVJN1FVRkRRU3hQUVVGTExFbEJRVWx5U2l4SlFVRkpMRU5CUVdJc1JVRkJaMEpCTEVsQlFVbFhMRWxCUVVscVFpeE5RVUY0UWl4RlFVRm5RMDBzUjBGQmFFTXNSVUZCY1VNN1FVRkRia013U2l4UlFVRkpMMGtzU1VGQlNUSklMRlZCUVVvc1EwRkJaWFJKTEVOQlFXWXNRMEZCU2p0QlFVTkJNa29zVTBGQlMwUXNTMEZCU3l4RFFVRldPMEZCUTBGRkxGTkJRVXRHTEVsQlFVa3NSMEZCVkR0QlFVTkJUQ3hqUVVGVlF5eEpRVUZXTEVOQlFXVk5MRVZCUVdZN1FVRkRRVkFzWTBGQlZVTXNTVUZCVml4RFFVRmxTeXhGUVVGbU8wRkJRMFE3TzBGQlJVUXNVMEZCVDA0c1UwRkJVRHRCUVVORU96dEJRVVZFTEZOQlFWTjJTU3hoUVVGVUxFTkJRWGRDU0N4SFFVRjRRaXhGUVVFMlFqdEJRVU16UWl4VFFVRlBkRU1zVDBGQlQzZE1MRmRCUVZBc1EwRkJiVUpzU2l4SFFVRnVRaXhEUVVGUU8wRkJRMFE3TzBGQlJVUXNVMEZCVTNsQ0xGVkJRVlFzUTBGQmNVSXdTQ3hIUVVGeVFpeEZRVUV3UWtNc1IwRkJNVUlzUlVGQkswSjBTU3hOUVVFdlFpeEZRVUYxUXk5Q0xFMUJRWFpETEVWQlFTdERPMEZCUXpkRExFMUJRVWt3UWl4SFFVRktPMEZCUTBFc1QwRkJTeXhKUVVGSmNFSXNTVUZCU1N4RFFVRmlMRVZCUVdkQ1FTeEpRVUZKVGl4TlFVRndRaXhGUVVFMFFrMHNSMEZCTlVJc1JVRkJhVU03UVVGREwwSXNVVUZCUzBFc1NVRkJTWGxDTEUxQlFVb3NTVUZCWTNOSkxFbEJRVWx5U3l4TlFVRnVRaXhKUVVFclFrMHNTMEZCU3poS0xFbEJRVWx3U3l4TlFVRTFReXhGUVVORk8wRkJRMFp4U3l4UlFVRkpMMG9zU1VGQlNYbENMRTFCUVZJc1NVRkJhMEp4U1N4SlFVRkpPVW9zUTBGQlNpeERRVUZzUWp0QlFVTkVPMEZCUTBRc1UwRkJUMEVzUTBGQlVEdEJRVU5FT3p0QlFVVkVMRk5CUVZOMVJTeGpRVUZVTEVOQlFYbENOVVFzUjBGQmVrSXNSVUZCT0VJN1FVRkROVUlzVFVGQlNUdEJRVU5HTEZkQlFVOXhTaXh0UWtGQmJVSnlTaXhIUVVGdVFpeERRVUZRTzBGQlEwUXNSMEZHUkN4RFFVVkZMRTlCUVU5elNpeEhRVUZRTEVWQlFWazdRVUZEV2l4WFFVRlBNVW9zVDBGQlQybEZMRmxCUVZBc1EwRkJiMElzVFVGQmNFSXNRMEZCVUN4RFFVUlpMRU5CUTNWQ08wRkJRM0JETzBGQlEwWTdPMEZCUlVRN096czdPMEZCUzBFc1UwRkJVM05ETEZOQlFWUXNRMEZCYjBKRUxFdEJRWEJDTEVWQlFUSkNjVVFzUjBGQk0wSXNSVUZCWjBNN1FVRkRPVUpvU2l4VFFVRlBMRTlCUVU4eVJpeExRVUZRTEV0QlFXbENMRkZCUVhoQ0xFVkJRV3RETEhWRFFVRnNRenRCUVVOQk0wWXNVMEZCVHpKR0xGTkJRVk1zUTBGQmFFSXNSVUZCYlVJc01FUkJRVzVDTzBGQlEwRXpSaXhUUVVGUE1rWXNVMEZCVTNGRUxFZEJRV2hDTEVWQlFYRkNMRFpEUVVGeVFqdEJRVU5CYUVvc1UwRkJUMjFFTEV0QlFVczRSaXhMUVVGTUxFTkJRVmQwUkN4TFFVRllMRTFCUVhOQ1FTeExRVUUzUWl4RlFVRnZReXhyUTBGQmNFTTdRVUZEUkRzN1FVRkZSQ3hUUVVGVFZTeFRRVUZVTEVOQlFXOUNWaXhMUVVGd1FpeEZRVUV5UW5GRUxFZEJRVE5DTEVWQlFXZEROVVlzUjBGQmFFTXNSVUZCY1VNN1FVRkRia053UkN4VFFVRlBMRTlCUVU4eVJpeExRVUZRTEV0QlFXbENMRkZCUVhoQ0xFVkJRV3RETEhWRFFVRnNRenRCUVVOQk0wWXNVMEZCVHpKR0xGTkJRVk54UkN4SFFVRm9RaXhGUVVGeFFpeDVRMEZCY2tJN1FVRkRRV2hLTEZOQlFVOHlSaXhUUVVGVGRrTXNSMEZCYUVJc1JVRkJjVUlzTUVOQlFYSkNPMEZCUTBGd1JDeFRRVUZQYlVRc1MwRkJTemhHTEV0QlFVd3NRMEZCVjNSRUxFdEJRVmdzVFVGQmMwSkJMRXRCUVRkQ0xFVkJRVzlETEd0RFFVRndRenRCUVVORU96dEJRVVZFTEZOQlFWTnJRaXhaUVVGVUxFTkJRWFZDYkVJc1MwRkJka0lzUlVGQk9FSnhSQ3hIUVVFNVFpeEZRVUZ0UXpWR0xFZEJRVzVETEVWQlFYZERPMEZCUTNSRGNFUXNVMEZCVHl4UFFVRlBNa1lzUzBGQlVDeExRVUZwUWl4UlFVRjRRaXhGUVVGclF5eDFRMEZCYkVNN1FVRkRRVE5HTEZOQlFVOHlSaXhUUVVGVGNVUXNSMEZCYUVJc1JVRkJjVUlzZVVOQlFYSkNPMEZCUTBGb1NpeFRRVUZQTWtZc1UwRkJVM1pETEVkQlFXaENMRVZCUVhGQ0xEQkRRVUZ5UWp0QlFVTkVPenRCUVVWRUxGTkJRVk53UkN4TlFVRlVMRU5CUVdsQ2Ewb3NTVUZCYWtJc1JVRkJkVUpETEU5QlFYWkNMRVZCUVdkRE8wRkJRemxDTEUxQlFVa3NRMEZCUTBRc1NVRkJUQ3hGUVVGWExFMUJRVTBzU1VGQlNYWkxMRXRCUVVvc1EwRkJWWGRMTEZkQlFWY3NhMEpCUVhKQ0xFTkJRVTQ3UVVGRFdpSXNJbVpwYkdVaU9pSnBibVJsZUM1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaThxSVZ4dUlDb2dWR2hsSUdKMVptWmxjaUJ0YjJSMWJHVWdabkp2YlNCdWIyUmxMbXB6TENCbWIzSWdkR2hsSUdKeWIzZHpaWEl1WEc0Z0tseHVJQ29nUUdGMWRHaHZjaUFnSUVabGNtOXpjeUJCWW05MWEyaGhaR2xxWldnZ1BHWmxjbTl6YzBCbVpYSnZjM011YjNKblBpQThhSFIwY0RvdkwyWmxjbTl6Y3k1dmNtYytYRzRnS2lCQWJHbGpaVzV6WlNBZ1RVbFVYRzRnS2k5Y2JseHVkbUZ5SUdKaGMyVTJOQ0E5SUhKbGNYVnBjbVVvSjJKaGMyVTJOQzFxY3ljcFhHNTJZWElnYVdWbFpUYzFOQ0E5SUhKbGNYVnBjbVVvSjJsbFpXVTNOVFFuS1Z4dVhHNWxlSEJ2Y25SekxrSjFabVpsY2lBOUlFSjFabVpsY2x4dVpYaHdiM0owY3k1VGJHOTNRblZtWm1WeUlEMGdRblZtWm1WeVhHNWxlSEJ2Y25SekxrbE9VMUJGUTFSZlRVRllYMEpaVkVWVElEMGdOVEJjYmtKMVptWmxjaTV3YjI5c1UybDZaU0E5SURneE9USmNibHh1THlvcVhHNGdLaUJKWmlCZ1FuVm1abVZ5TGw5MWMyVlVlWEJsWkVGeWNtRjVjMkE2WEc0Z0tpQWdJRDA5UFNCMGNuVmxJQ0FnSUZWelpTQlZhVzUwT0VGeWNtRjVJR2x0Y0d4bGJXVnVkR0YwYVc5dUlDaG1ZWE4wWlhOMEtWeHVJQ29nSUNBOVBUMGdabUZzYzJVZ0lDQlZjMlVnVDJKcVpXTjBJR2x0Y0d4bGJXVnVkR0YwYVc5dUlDaGpiMjF3WVhScFlteGxJR1J2ZDI0Z2RHOGdTVVUyS1Z4dUlDb3ZYRzVDZFdabVpYSXVYM1Z6WlZSNWNHVmtRWEp5WVhseklEMGdLR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdMeThnUkdWMFpXTjBJR2xtSUdKeWIzZHpaWElnYzNWd2NHOXlkSE1nVkhsd1pXUWdRWEp5WVhsekxpQlRkWEJ3YjNKMFpXUWdZbkp2ZDNObGNuTWdZWEpsSUVsRklERXdLeXdnUm1seVpXWnZlQ0EwS3l4Y2JpQWdMeThnUTJoeWIyMWxJRGNyTENCVFlXWmhjbWtnTlM0eEt5d2dUM0JsY21FZ01URXVOaXNzSUdsUFV5QTBMaklyTGlCSlppQjBhR1VnWW5KdmQzTmxjaUJrYjJWeklHNXZkQ0J6ZFhCd2IzSjBJR0ZrWkdsdVoxeHVJQ0F2THlCd2NtOXdaWEowYVdWeklIUnZJR0JWYVc1ME9FRnljbUY1WUNCcGJuTjBZVzVqWlhNc0lIUm9aVzRnZEdoaGRDZHpJSFJvWlNCellXMWxJR0Z6SUc1dklHQlZhVzUwT0VGeWNtRjVZQ0J6ZFhCd2IzSjBYRzRnSUM4dklHSmxZMkYxYzJVZ2QyVWdibVZsWkNCMGJ5QmlaU0JoWW14bElIUnZJR0ZrWkNCaGJHd2dkR2hsSUc1dlpHVWdRblZtWm1WeUlFRlFTU0J0WlhSb2IyUnpMaUJVYUdseklHbHpJR0Z1SUdsemMzVmxYRzRnSUM4dklHbHVJRVpwY21WbWIzZ2dOQzB5T1M0Z1RtOTNJR1pwZUdWa09pQm9kSFJ3Y3pvdkwySjFaM3BwYkd4aExtMXZlbWxzYkdFdWIzSm5MM05vYjNkZlluVm5MbU5uYVQ5cFpEMDJPVFUwTXpoY2JpQWdkSEo1SUh0Y2JpQWdJQ0IyWVhJZ1luVm1JRDBnYm1WM0lFRnljbUY1UW5WbVptVnlLREFwWEc0Z0lDQWdkbUZ5SUdGeWNpQTlJRzVsZHlCVmFXNTBPRUZ5Y21GNUtHSjFaaWxjYmlBZ0lDQmhjbkl1Wm05dklEMGdablZ1WTNScGIyNGdLQ2tnZXlCeVpYUjFjbTRnTkRJZ2ZWeHVJQ0FnSUhKbGRIVnliaUEwTWlBOVBUMGdZWEp5TG1admJ5Z3BJQ1ltWEc0Z0lDQWdJQ0FnSUhSNWNHVnZaaUJoY25JdWMzVmlZWEp5WVhrZ1BUMDlJQ2RtZFc1amRHbHZiaWNnTHk4Z1EyaHliMjFsSURrdE1UQWdiR0ZqYXlCZ2MzVmlZWEp5WVhsZ1hHNGdJSDBnWTJGMFkyZ2dLR1VwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdabUZzYzJWY2JpQWdmVnh1ZlNrb0tWeHVYRzR2S2lwY2JpQXFJRU5zWVhOek9pQkNkV1ptWlhKY2JpQXFJRDA5UFQwOVBUMDlQVDA5UFQxY2JpQXFYRzRnS2lCVWFHVWdRblZtWm1WeUlHTnZibk4wY25WamRHOXlJSEpsZEhWeWJuTWdhVzV6ZEdGdVkyVnpJRzltSUdCVmFXNTBPRUZ5Y21GNVlDQjBhR0YwSUdGeVpTQmhkV2R0Wlc1MFpXUmNiaUFxSUhkcGRHZ2dablZ1WTNScGIyNGdjSEp2Y0dWeWRHbGxjeUJtYjNJZ1lXeHNJSFJvWlNCdWIyUmxJR0JDZFdabVpYSmdJRUZRU1NCbWRXNWpkR2x2Ym5NdUlGZGxJSFZ6WlZ4dUlDb2dZRlZwYm5RNFFYSnlZWGxnSUhOdklIUm9ZWFFnYzNGMVlYSmxJR0p5WVdOclpYUWdibTkwWVhScGIyNGdkMjl5YTNNZ1lYTWdaWGh3WldOMFpXUWdMUzBnYVhRZ2NtVjBkWEp1YzF4dUlDb2dZU0J6YVc1bmJHVWdiMk4wWlhRdVhHNGdLbHh1SUNvZ1Fua2dZWFZuYldWdWRHbHVaeUIwYUdVZ2FXNXpkR0Z1WTJWekxDQjNaU0JqWVc0Z1lYWnZhV1FnYlc5a2FXWjVhVzVuSUhSb1pTQmdWV2x1ZERoQmNuSmhlV0JjYmlBcUlIQnliM1J2ZEhsd1pTNWNiaUFxTDF4dVpuVnVZM1JwYjI0Z1FuVm1abVZ5SUNoemRXSnFaV04wTENCbGJtTnZaR2x1Wnl3Z2JtOWFaWEp2S1NCN1hHNGdJR2xtSUNnaEtIUm9hWE1nYVc1emRHRnVZMlZ2WmlCQ2RXWm1aWElwS1Z4dUlDQWdJSEpsZEhWeWJpQnVaWGNnUW5WbVptVnlLSE4xWW1wbFkzUXNJR1Z1WTI5a2FXNW5MQ0J1YjFwbGNtOHBYRzVjYmlBZ2RtRnlJSFI1Y0dVZ1BTQjBlWEJsYjJZZ2MzVmlhbVZqZEZ4dVhHNGdJQzh2SUZkdmNtdGhjbTkxYm1RNklHNXZaR1VuY3lCaVlYTmxOalFnYVcxd2JHVnRaVzUwWVhScGIyNGdZV3hzYjNkeklHWnZjaUJ1YjI0dGNHRmtaR1ZrSUhOMGNtbHVaM05jYmlBZ0x5OGdkMmhwYkdVZ1ltRnpaVFkwTFdweklHUnZaWE1nYm05MExseHVJQ0JwWmlBb1pXNWpiMlJwYm1jZ1BUMDlJQ2RpWVhObE5qUW5JQ1ltSUhSNWNHVWdQVDA5SUNkemRISnBibWNuS1NCN1hHNGdJQ0FnYzNWaWFtVmpkQ0E5SUhOMGNtbHVaM1J5YVcwb2MzVmlhbVZqZENsY2JpQWdJQ0IzYUdsc1pTQW9jM1ZpYW1WamRDNXNaVzVuZEdnZ0pTQTBJQ0U5UFNBd0tTQjdYRzRnSUNBZ0lDQnpkV0pxWldOMElEMGdjM1ZpYW1WamRDQXJJQ2M5SjF4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUM4dklFWnBibVFnZEdobElHeGxibWQwYUZ4dUlDQjJZWElnYkdWdVozUm9YRzRnSUdsbUlDaDBlWEJsSUQwOVBTQW5iblZ0WW1WeUp5bGNiaUFnSUNCc1pXNW5kR2dnUFNCamIyVnlZMlVvYzNWaWFtVmpkQ2xjYmlBZ1pXeHpaU0JwWmlBb2RIbHdaU0E5UFQwZ0ozTjBjbWx1WnljcFhHNGdJQ0FnYkdWdVozUm9JRDBnUW5WbVptVnlMbUo1ZEdWTVpXNW5kR2dvYzNWaWFtVmpkQ3dnWlc1amIyUnBibWNwWEc0Z0lHVnNjMlVnYVdZZ0tIUjVjR1VnUFQwOUlDZHZZbXBsWTNRbktWeHVJQ0FnSUd4bGJtZDBhQ0E5SUdOdlpYSmpaU2h6ZFdKcVpXTjBMbXhsYm1kMGFDa2dMeThnWVhOemRXMWxJSFJvWVhRZ2IySnFaV04wSUdseklHRnljbUY1TFd4cGEyVmNiaUFnWld4elpWeHVJQ0FnSUhSb2NtOTNJRzVsZHlCRmNuSnZjaWduUm1seWMzUWdZWEpuZFcxbGJuUWdibVZsWkhNZ2RHOGdZbVVnWVNCdWRXMWlaWElzSUdGeWNtRjVJRzl5SUhOMGNtbHVaeTRuS1Z4dVhHNGdJSFpoY2lCaWRXWmNiaUFnYVdZZ0tFSjFabVpsY2k1ZmRYTmxWSGx3WldSQmNuSmhlWE1wSUh0Y2JpQWdJQ0F2THlCUWNtVm1aWEp5WldRNklGSmxkSFZ5YmlCaGJpQmhkV2R0Wlc1MFpXUWdZRlZwYm5RNFFYSnlZWGxnSUdsdWMzUmhibU5sSUdadmNpQmlaWE4wSUhCbGNtWnZjbTFoYm1ObFhHNGdJQ0FnWW5WbUlEMGdRblZtWm1WeUxsOWhkV2R0Wlc1MEtHNWxkeUJWYVc1ME9FRnljbUY1S0d4bGJtZDBhQ2twWEc0Z0lIMGdaV3h6WlNCN1hHNGdJQ0FnTHk4Z1JtRnNiR0poWTJzNklGSmxkSFZ5YmlCVVNFbFRJR2x1YzNSaGJtTmxJRzltSUVKMVptWmxjaUFvWTNKbFlYUmxaQ0JpZVNCZ2JtVjNZQ2xjYmlBZ0lDQmlkV1lnUFNCMGFHbHpYRzRnSUNBZ1luVm1MbXhsYm1kMGFDQTlJR3hsYm1kMGFGeHVJQ0FnSUdKMVppNWZhWE5DZFdabVpYSWdQU0IwY25WbFhHNGdJSDFjYmx4dUlDQjJZWElnYVZ4dUlDQnBaaUFvUW5WbVptVnlMbDkxYzJWVWVYQmxaRUZ5Y21GNWN5QW1KaUIwZVhCbGIyWWdjM1ZpYW1WamRDNWllWFJsVEdWdVozUm9JRDA5UFNBbmJuVnRZbVZ5SnlrZ2UxeHVJQ0FnSUM4dklGTndaV1ZrSUc5d2RHbHRhWHBoZEdsdmJpQXRMU0IxYzJVZ2MyVjBJR2xtSUhkbEozSmxJR052Y0hscGJtY2dabkp2YlNCaElIUjVjR1ZrSUdGeWNtRjVYRzRnSUNBZ1luVm1MbDl6WlhRb2MzVmlhbVZqZENsY2JpQWdmU0JsYkhObElHbG1JQ2hwYzBGeWNtRjVhWE5vS0hOMVltcGxZM1FwS1NCN1hHNGdJQ0FnTHk4Z1ZISmxZWFFnWVhKeVlYa3RhWE5vSUc5aWFtVmpkSE1nWVhNZ1lTQmllWFJsSUdGeWNtRjVYRzRnSUNBZ1ptOXlJQ2hwSUQwZ01Ec2dhU0E4SUd4bGJtZDBhRHNnYVNzcktTQjdYRzRnSUNBZ0lDQnBaaUFvUW5WbVptVnlMbWx6UW5WbVptVnlLSE4xWW1wbFkzUXBLVnh1SUNBZ0lDQWdJQ0JpZFdaYmFWMGdQU0J6ZFdKcVpXTjBMbkpsWVdSVlNXNTBPQ2hwS1Z4dUlDQWdJQ0FnWld4elpWeHVJQ0FnSUNBZ0lDQmlkV1piYVYwZ1BTQnpkV0pxWldOMFcybGRYRzRnSUNBZ2ZWeHVJQ0I5SUdWc2MyVWdhV1lnS0hSNWNHVWdQVDA5SUNkemRISnBibWNuS1NCN1hHNGdJQ0FnWW5WbUxuZHlhWFJsS0hOMVltcGxZM1FzSURBc0lHVnVZMjlrYVc1bktWeHVJQ0I5SUdWc2MyVWdhV1lnS0hSNWNHVWdQVDA5SUNkdWRXMWlaWEluSUNZbUlDRkNkV1ptWlhJdVgzVnpaVlI1Y0dWa1FYSnlZWGx6SUNZbUlDRnViMXBsY204cElIdGNiaUFnSUNCbWIzSWdLR2tnUFNBd095QnBJRHdnYkdWdVozUm9PeUJwS3lzcElIdGNiaUFnSUNBZ0lHSjFabHRwWFNBOUlEQmNiaUFnSUNCOVhHNGdJSDFjYmx4dUlDQnlaWFIxY200Z1luVm1YRzU5WEc1Y2JpOHZJRk5VUVZSSlF5Qk5SVlJJVDBSVFhHNHZMeUE5UFQwOVBUMDlQVDA5UFQwOVBWeHVYRzVDZFdabVpYSXVhWE5GYm1OdlpHbHVaeUE5SUdaMWJtTjBhVzl1SUNobGJtTnZaR2x1WnlrZ2UxeHVJQ0J6ZDJsMFkyZ2dLRk4wY21sdVp5aGxibU52WkdsdVp5a3VkRzlNYjNkbGNrTmhjMlVvS1NrZ2UxeHVJQ0FnSUdOaGMyVWdKMmhsZUNjNlhHNGdJQ0FnWTJGelpTQW5kWFJtT0NjNlhHNGdJQ0FnWTJGelpTQW5kWFJtTFRnbk9seHVJQ0FnSUdOaGMyVWdKMkZ6WTJscEp6cGNiaUFnSUNCallYTmxJQ2RpYVc1aGNua25PbHh1SUNBZ0lHTmhjMlVnSjJKaGMyVTJOQ2M2WEc0Z0lDQWdZMkZ6WlNBbmNtRjNKenBjYmlBZ0lDQmpZWE5sSUNkMVkzTXlKenBjYmlBZ0lDQmpZWE5sSUNkMVkzTXRNaWM2WEc0Z0lDQWdZMkZ6WlNBbmRYUm1NVFpzWlNjNlhHNGdJQ0FnWTJGelpTQW5kWFJtTFRFMmJHVW5PbHh1SUNBZ0lDQWdjbVYwZFhKdUlIUnlkV1ZjYmlBZ0lDQmtaV1poZFd4ME9seHVJQ0FnSUNBZ2NtVjBkWEp1SUdaaGJITmxYRzRnSUgxY2JuMWNibHh1UW5WbVptVnlMbWx6UW5WbVptVnlJRDBnWm5WdVkzUnBiMjRnS0dJcElIdGNiaUFnY21WMGRYSnVJQ0VoS0dJZ0lUMDlJRzUxYkd3Z0ppWWdZaUFoUFQwZ2RXNWtaV1pwYm1Wa0lDWW1JR0l1WDJselFuVm1abVZ5S1Z4dWZWeHVYRzVDZFdabVpYSXVZbmwwWlV4bGJtZDBhQ0E5SUdaMWJtTjBhVzl1SUNoemRISXNJR1Z1WTI5a2FXNW5LU0I3WEc0Z0lIWmhjaUJ5WlhSY2JpQWdjM1J5SUQwZ2MzUnlJQ3NnSnlkY2JpQWdjM2RwZEdOb0lDaGxibU52WkdsdVp5QjhmQ0FuZFhSbU9DY3BJSHRjYmlBZ0lDQmpZWE5sSUNkb1pYZ25PbHh1SUNBZ0lDQWdjbVYwSUQwZ2MzUnlMbXhsYm1kMGFDQXZJREpjYmlBZ0lDQWdJR0p5WldGclhHNGdJQ0FnWTJGelpTQW5kWFJtT0NjNlhHNGdJQ0FnWTJGelpTQW5kWFJtTFRnbk9seHVJQ0FnSUNBZ2NtVjBJRDBnZFhSbU9GUnZRbmwwWlhNb2MzUnlLUzVzWlc1bmRHaGNiaUFnSUNBZ0lHSnlaV0ZyWEc0Z0lDQWdZMkZ6WlNBbllYTmphV2tuT2x4dUlDQWdJR05oYzJVZ0oySnBibUZ5ZVNjNlhHNGdJQ0FnWTJGelpTQW5jbUYzSnpwY2JpQWdJQ0FnSUhKbGRDQTlJSE4wY2k1c1pXNW5kR2hjYmlBZ0lDQWdJR0p5WldGclhHNGdJQ0FnWTJGelpTQW5ZbUZ6WlRZMEp6cGNiaUFnSUNBZ0lISmxkQ0E5SUdKaGMyVTJORlJ2UW5sMFpYTW9jM1J5S1M1c1pXNW5kR2hjYmlBZ0lDQWdJR0p5WldGclhHNGdJQ0FnWTJGelpTQW5kV056TWljNlhHNGdJQ0FnWTJGelpTQW5kV056TFRJbk9seHVJQ0FnSUdOaGMyVWdKM1YwWmpFMmJHVW5PbHh1SUNBZ0lHTmhjMlVnSjNWMFppMHhObXhsSnpwY2JpQWdJQ0FnSUhKbGRDQTlJSE4wY2k1c1pXNW5kR2dnS2lBeVhHNGdJQ0FnSUNCaWNtVmhhMXh1SUNBZ0lHUmxabUYxYkhRNlhHNGdJQ0FnSUNCMGFISnZkeUJ1WlhjZ1JYSnliM0lvSjFWdWEyNXZkMjRnWlc1amIyUnBibWNuS1Z4dUlDQjlYRzRnSUhKbGRIVnliaUJ5WlhSY2JuMWNibHh1UW5WbVptVnlMbU52Ym1OaGRDQTlJR1oxYm1OMGFXOXVJQ2hzYVhOMExDQjBiM1JoYkV4bGJtZDBhQ2tnZTF4dUlDQmhjM05sY25Rb2FYTkJjbkpoZVNoc2FYTjBLU3dnSjFWellXZGxPaUJDZFdabVpYSXVZMjl1WTJGMEtHeHBjM1FzSUZ0MGIzUmhiRXhsYm1kMGFGMHBYRnh1SnlBclhHNGdJQ0FnSUNBbmJHbHpkQ0J6YUc5MWJHUWdZbVVnWVc0Z1FYSnlZWGt1SnlsY2JseHVJQ0JwWmlBb2JHbHpkQzVzWlc1bmRHZ2dQVDA5SURBcElIdGNiaUFnSUNCeVpYUjFjbTRnYm1WM0lFSjFabVpsY2lnd0tWeHVJQ0I5SUdWc2MyVWdhV1lnS0d4cGMzUXViR1Z1WjNSb0lEMDlQU0F4S1NCN1hHNGdJQ0FnY21WMGRYSnVJR3hwYzNSYk1GMWNiaUFnZlZ4dVhHNGdJSFpoY2lCcFhHNGdJR2xtSUNoMGVYQmxiMllnZEc5MFlXeE1aVzVuZEdnZ0lUMDlJQ2R1ZFcxaVpYSW5LU0I3WEc0Z0lDQWdkRzkwWVd4TVpXNW5kR2dnUFNBd1hHNGdJQ0FnWm05eUlDaHBJRDBnTURzZ2FTQThJR3hwYzNRdWJHVnVaM1JvT3lCcEt5c3BJSHRjYmlBZ0lDQWdJSFJ2ZEdGc1RHVnVaM1JvSUNzOUlHeHBjM1JiYVYwdWJHVnVaM1JvWEc0Z0lDQWdmVnh1SUNCOVhHNWNiaUFnZG1GeUlHSjFaaUE5SUc1bGR5QkNkV1ptWlhJb2RHOTBZV3hNWlc1bmRHZ3BYRzRnSUhaaGNpQndiM01nUFNBd1hHNGdJR1p2Y2lBb2FTQTlJREE3SUdrZ1BDQnNhWE4wTG14bGJtZDBhRHNnYVNzcktTQjdYRzRnSUNBZ2RtRnlJR2wwWlcwZ1BTQnNhWE4wVzJsZFhHNGdJQ0FnYVhSbGJTNWpiM0I1S0dKMVppd2djRzl6S1Z4dUlDQWdJSEJ2Y3lBclBTQnBkR1Z0TG14bGJtZDBhRnh1SUNCOVhHNGdJSEpsZEhWeWJpQmlkV1pjYm4xY2JseHVMeThnUWxWR1JrVlNJRWxPVTFSQlRrTkZJRTFGVkVoUFJGTmNiaTh2SUQwOVBUMDlQVDA5UFQwOVBUMDlQVDA5UFQwOVBUMDlYRzVjYm1aMWJtTjBhVzl1SUY5b1pYaFhjbWwwWlNBb1luVm1MQ0J6ZEhKcGJtY3NJRzltWm5ObGRDd2diR1Z1WjNSb0tTQjdYRzRnSUc5bVpuTmxkQ0E5SUU1MWJXSmxjaWh2Wm1aelpYUXBJSHg4SURCY2JpQWdkbUZ5SUhKbGJXRnBibWx1WnlBOUlHSjFaaTVzWlc1bmRHZ2dMU0J2Wm1aelpYUmNiaUFnYVdZZ0tDRnNaVzVuZEdncElIdGNiaUFnSUNCc1pXNW5kR2dnUFNCeVpXMWhhVzVwYm1kY2JpQWdmU0JsYkhObElIdGNiaUFnSUNCc1pXNW5kR2dnUFNCT2RXMWlaWElvYkdWdVozUm9LVnh1SUNBZ0lHbG1JQ2hzWlc1bmRHZ2dQaUJ5WlcxaGFXNXBibWNwSUh0Y2JpQWdJQ0FnSUd4bGJtZDBhQ0E5SUhKbGJXRnBibWx1WjF4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUM4dklHMTFjM1FnWW1VZ1lXNGdaWFpsYmlCdWRXMWlaWElnYjJZZ1pHbG5hWFJ6WEc0Z0lIWmhjaUJ6ZEhKTVpXNGdQU0J6ZEhKcGJtY3ViR1Z1WjNSb1hHNGdJR0Z6YzJWeWRDaHpkSEpNWlc0Z0pTQXlJRDA5UFNBd0xDQW5TVzUyWVd4cFpDQm9aWGdnYzNSeWFXNW5KeWxjYmx4dUlDQnBaaUFvYkdWdVozUm9JRDRnYzNSeVRHVnVJQzhnTWlrZ2UxeHVJQ0FnSUd4bGJtZDBhQ0E5SUhOMGNreGxiaUF2SURKY2JpQWdmVnh1SUNCbWIzSWdLSFpoY2lCcElEMGdNRHNnYVNBOElHeGxibWQwYURzZ2FTc3JLU0I3WEc0Z0lDQWdkbUZ5SUdKNWRHVWdQU0J3WVhKelpVbHVkQ2h6ZEhKcGJtY3VjM1ZpYzNSeUtHa2dLaUF5TENBeUtTd2dNVFlwWEc0Z0lDQWdZWE56WlhKMEtDRnBjMDVoVGloaWVYUmxLU3dnSjBsdWRtRnNhV1FnYUdWNElITjBjbWx1WnljcFhHNGdJQ0FnWW5WbVcyOW1abk5sZENBcklHbGRJRDBnWW5sMFpWeHVJQ0I5WEc0Z0lFSjFabVpsY2k1ZlkyaGhjbk5YY21sMGRHVnVJRDBnYVNBcUlESmNiaUFnY21WMGRYSnVJR2xjYm4xY2JseHVablZ1WTNScGIyNGdYM1YwWmpoWGNtbDBaU0FvWW5WbUxDQnpkSEpwYm1jc0lHOW1abk5sZEN3Z2JHVnVaM1JvS1NCN1hHNGdJSFpoY2lCamFHRnljMWR5YVhSMFpXNGdQU0JDZFdabVpYSXVYMk5vWVhKelYzSnBkSFJsYmlBOVhHNGdJQ0FnWW14cGRFSjFabVpsY2loMWRHWTRWRzlDZVhSbGN5aHpkSEpwYm1jcExDQmlkV1lzSUc5bVpuTmxkQ3dnYkdWdVozUm9LVnh1SUNCeVpYUjFjbTRnWTJoaGNuTlhjbWwwZEdWdVhHNTlYRzVjYm1aMWJtTjBhVzl1SUY5aGMyTnBhVmR5YVhSbElDaGlkV1lzSUhOMGNtbHVaeXdnYjJabWMyVjBMQ0JzWlc1bmRHZ3BJSHRjYmlBZ2RtRnlJR05vWVhKelYzSnBkSFJsYmlBOUlFSjFabVpsY2k1ZlkyaGhjbk5YY21sMGRHVnVJRDFjYmlBZ0lDQmliR2wwUW5WbVptVnlLR0Z6WTJscFZHOUNlWFJsY3loemRISnBibWNwTENCaWRXWXNJRzltWm5ObGRDd2diR1Z1WjNSb0tWeHVJQ0J5WlhSMWNtNGdZMmhoY25OWGNtbDBkR1Z1WEc1OVhHNWNibVoxYm1OMGFXOXVJRjlpYVc1aGNubFhjbWwwWlNBb1luVm1MQ0J6ZEhKcGJtY3NJRzltWm5ObGRDd2diR1Z1WjNSb0tTQjdYRzRnSUhKbGRIVnliaUJmWVhOamFXbFhjbWwwWlNoaWRXWXNJSE4wY21sdVp5d2diMlptYzJWMExDQnNaVzVuZEdncFhHNTlYRzVjYm1aMWJtTjBhVzl1SUY5aVlYTmxOalJYY21sMFpTQW9ZblZtTENCemRISnBibWNzSUc5bVpuTmxkQ3dnYkdWdVozUm9LU0I3WEc0Z0lIWmhjaUJqYUdGeWMxZHlhWFIwWlc0Z1BTQkNkV1ptWlhJdVgyTm9ZWEp6VjNKcGRIUmxiaUE5WEc0Z0lDQWdZbXhwZEVKMVptWmxjaWhpWVhObE5qUlViMEo1ZEdWektITjBjbWx1Wnlrc0lHSjFaaXdnYjJabWMyVjBMQ0JzWlc1bmRHZ3BYRzRnSUhKbGRIVnliaUJqYUdGeWMxZHlhWFIwWlc1Y2JuMWNibHh1Wm5WdVkzUnBiMjRnWDNWMFpqRTJiR1ZYY21sMFpTQW9ZblZtTENCemRISnBibWNzSUc5bVpuTmxkQ3dnYkdWdVozUm9LU0I3WEc0Z0lIWmhjaUJqYUdGeWMxZHlhWFIwWlc0Z1BTQkNkV1ptWlhJdVgyTm9ZWEp6VjNKcGRIUmxiaUE5WEc0Z0lDQWdZbXhwZEVKMVptWmxjaWgxZEdZeE5teGxWRzlDZVhSbGN5aHpkSEpwYm1jcExDQmlkV1lzSUc5bVpuTmxkQ3dnYkdWdVozUm9LVnh1SUNCeVpYUjFjbTRnWTJoaGNuTlhjbWwwZEdWdVhHNTlYRzVjYmtKMVptWmxjaTV3Y205MGIzUjVjR1V1ZDNKcGRHVWdQU0JtZFc1amRHbHZiaUFvYzNSeWFXNW5MQ0J2Wm1aelpYUXNJR3hsYm1kMGFDd2daVzVqYjJScGJtY3BJSHRjYmlBZ0x5OGdVM1Z3Y0c5eWRDQmliM1JvSUNoemRISnBibWNzSUc5bVpuTmxkQ3dnYkdWdVozUm9MQ0JsYm1OdlpHbHVaeWxjYmlBZ0x5OGdZVzVrSUhSb1pTQnNaV2RoWTNrZ0tITjBjbWx1Wnl3Z1pXNWpiMlJwYm1jc0lHOW1abk5sZEN3Z2JHVnVaM1JvS1Z4dUlDQnBaaUFvYVhOR2FXNXBkR1VvYjJabWMyVjBLU2tnZTF4dUlDQWdJR2xtSUNnaGFYTkdhVzVwZEdVb2JHVnVaM1JvS1NrZ2UxeHVJQ0FnSUNBZ1pXNWpiMlJwYm1jZ1BTQnNaVzVuZEdoY2JpQWdJQ0FnSUd4bGJtZDBhQ0E5SUhWdVpHVm1hVzVsWkZ4dUlDQWdJSDFjYmlBZ2ZTQmxiSE5sSUhzZ0lDOHZJR3hsWjJGamVWeHVJQ0FnSUhaaGNpQnpkMkZ3SUQwZ1pXNWpiMlJwYm1kY2JpQWdJQ0JsYm1OdlpHbHVaeUE5SUc5bVpuTmxkRnh1SUNBZ0lHOW1abk5sZENBOUlHeGxibWQwYUZ4dUlDQWdJR3hsYm1kMGFDQTlJSE4zWVhCY2JpQWdmVnh1WEc0Z0lHOW1abk5sZENBOUlFNTFiV0psY2lodlptWnpaWFFwSUh4OElEQmNiaUFnZG1GeUlISmxiV0ZwYm1sdVp5QTlJSFJvYVhNdWJHVnVaM1JvSUMwZ2IyWm1jMlYwWEc0Z0lHbG1JQ2doYkdWdVozUm9LU0I3WEc0Z0lDQWdiR1Z1WjNSb0lEMGdjbVZ0WVdsdWFXNW5YRzRnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdiR1Z1WjNSb0lEMGdUblZ0WW1WeUtHeGxibWQwYUNsY2JpQWdJQ0JwWmlBb2JHVnVaM1JvSUQ0Z2NtVnRZV2x1YVc1bktTQjdYRzRnSUNBZ0lDQnNaVzVuZEdnZ1BTQnlaVzFoYVc1cGJtZGNiaUFnSUNCOVhHNGdJSDFjYmlBZ1pXNWpiMlJwYm1jZ1BTQlRkSEpwYm1jb1pXNWpiMlJwYm1jZ2ZId2dKM1YwWmpnbktTNTBiMHh2ZDJWeVEyRnpaU2dwWEc1Y2JpQWdkbUZ5SUhKbGRGeHVJQ0J6ZDJsMFkyZ2dLR1Z1WTI5a2FXNW5LU0I3WEc0Z0lDQWdZMkZ6WlNBbmFHVjRKenBjYmlBZ0lDQWdJSEpsZENBOUlGOW9aWGhYY21sMFpTaDBhR2x6TENCemRISnBibWNzSUc5bVpuTmxkQ3dnYkdWdVozUm9LVnh1SUNBZ0lDQWdZbkpsWVd0Y2JpQWdJQ0JqWVhObElDZDFkR1k0SnpwY2JpQWdJQ0JqWVhObElDZDFkR1l0T0NjNlhHNGdJQ0FnSUNCeVpYUWdQU0JmZFhSbU9GZHlhWFJsS0hSb2FYTXNJSE4wY21sdVp5d2diMlptYzJWMExDQnNaVzVuZEdncFhHNGdJQ0FnSUNCaWNtVmhhMXh1SUNBZ0lHTmhjMlVnSjJGelkybHBKenBjYmlBZ0lDQWdJSEpsZENBOUlGOWhjMk5wYVZkeWFYUmxLSFJvYVhNc0lITjBjbWx1Wnl3Z2IyWm1jMlYwTENCc1pXNW5kR2dwWEc0Z0lDQWdJQ0JpY21WaGExeHVJQ0FnSUdOaGMyVWdKMkpwYm1GeWVTYzZYRzRnSUNBZ0lDQnlaWFFnUFNCZlltbHVZWEo1VjNKcGRHVW9kR2hwY3l3Z2MzUnlhVzVuTENCdlptWnpaWFFzSUd4bGJtZDBhQ2xjYmlBZ0lDQWdJR0p5WldGclhHNGdJQ0FnWTJGelpTQW5ZbUZ6WlRZMEp6cGNiaUFnSUNBZ0lISmxkQ0E5SUY5aVlYTmxOalJYY21sMFpTaDBhR2x6TENCemRISnBibWNzSUc5bVpuTmxkQ3dnYkdWdVozUm9LVnh1SUNBZ0lDQWdZbkpsWVd0Y2JpQWdJQ0JqWVhObElDZDFZM015SnpwY2JpQWdJQ0JqWVhObElDZDFZM010TWljNlhHNGdJQ0FnWTJGelpTQW5kWFJtTVRac1pTYzZYRzRnSUNBZ1kyRnpaU0FuZFhSbUxURTJiR1VuT2x4dUlDQWdJQ0FnY21WMElEMGdYM1YwWmpFMmJHVlhjbWwwWlNoMGFHbHpMQ0J6ZEhKcGJtY3NJRzltWm5ObGRDd2diR1Z1WjNSb0tWeHVJQ0FnSUNBZ1luSmxZV3RjYmlBZ0lDQmtaV1poZFd4ME9seHVJQ0FnSUNBZ2RHaHliM2NnYm1WM0lFVnljbTl5S0NkVmJtdHViM2R1SUdWdVkyOWthVzVuSnlsY2JpQWdmVnh1SUNCeVpYUjFjbTRnY21WMFhHNTlYRzVjYmtKMVptWmxjaTV3Y205MGIzUjVjR1V1ZEc5VGRISnBibWNnUFNCbWRXNWpkR2x2YmlBb1pXNWpiMlJwYm1jc0lITjBZWEowTENCbGJtUXBJSHRjYmlBZ2RtRnlJSE5sYkdZZ1BTQjBhR2x6WEc1Y2JpQWdaVzVqYjJScGJtY2dQU0JUZEhKcGJtY29aVzVqYjJScGJtY2dmSHdnSjNWMFpqZ25LUzUwYjB4dmQyVnlRMkZ6WlNncFhHNGdJSE4wWVhKMElEMGdUblZ0WW1WeUtITjBZWEowS1NCOGZDQXdYRzRnSUdWdVpDQTlJQ2hsYm1RZ0lUMDlJSFZ1WkdWbWFXNWxaQ2xjYmlBZ0lDQS9JRTUxYldKbGNpaGxibVFwWEc0Z0lDQWdPaUJsYm1RZ1BTQnpaV3htTG14bGJtZDBhRnh1WEc0Z0lDOHZJRVpoYzNSd1lYUm9JR1Z0Y0hSNUlITjBjbWx1WjNOY2JpQWdhV1lnS0dWdVpDQTlQVDBnYzNSaGNuUXBYRzRnSUNBZ2NtVjBkWEp1SUNjblhHNWNiaUFnZG1GeUlISmxkRnh1SUNCemQybDBZMmdnS0dWdVkyOWthVzVuS1NCN1hHNGdJQ0FnWTJGelpTQW5hR1Y0SnpwY2JpQWdJQ0FnSUhKbGRDQTlJRjlvWlhoVGJHbGpaU2h6Wld4bUxDQnpkR0Z5ZEN3Z1pXNWtLVnh1SUNBZ0lDQWdZbkpsWVd0Y2JpQWdJQ0JqWVhObElDZDFkR1k0SnpwY2JpQWdJQ0JqWVhObElDZDFkR1l0T0NjNlhHNGdJQ0FnSUNCeVpYUWdQU0JmZFhSbU9GTnNhV05sS0hObGJHWXNJSE4wWVhKMExDQmxibVFwWEc0Z0lDQWdJQ0JpY21WaGExeHVJQ0FnSUdOaGMyVWdKMkZ6WTJscEp6cGNiaUFnSUNBZ0lISmxkQ0E5SUY5aGMyTnBhVk5zYVdObEtITmxiR1lzSUhOMFlYSjBMQ0JsYm1RcFhHNGdJQ0FnSUNCaWNtVmhhMXh1SUNBZ0lHTmhjMlVnSjJKcGJtRnllU2M2WEc0Z0lDQWdJQ0J5WlhRZ1BTQmZZbWx1WVhKNVUyeHBZMlVvYzJWc1ppd2djM1JoY25Rc0lHVnVaQ2xjYmlBZ0lDQWdJR0p5WldGclhHNGdJQ0FnWTJGelpTQW5ZbUZ6WlRZMEp6cGNiaUFnSUNBZ0lISmxkQ0E5SUY5aVlYTmxOalJUYkdsalpTaHpaV3htTENCemRHRnlkQ3dnWlc1a0tWeHVJQ0FnSUNBZ1luSmxZV3RjYmlBZ0lDQmpZWE5sSUNkMVkzTXlKenBjYmlBZ0lDQmpZWE5sSUNkMVkzTXRNaWM2WEc0Z0lDQWdZMkZ6WlNBbmRYUm1NVFpzWlNjNlhHNGdJQ0FnWTJGelpTQW5kWFJtTFRFMmJHVW5PbHh1SUNBZ0lDQWdjbVYwSUQwZ1gzVjBaakUyYkdWVGJHbGpaU2h6Wld4bUxDQnpkR0Z5ZEN3Z1pXNWtLVnh1SUNBZ0lDQWdZbkpsWVd0Y2JpQWdJQ0JrWldaaGRXeDBPbHh1SUNBZ0lDQWdkR2h5YjNjZ2JtVjNJRVZ5Y205eUtDZFZibXR1YjNkdUlHVnVZMjlrYVc1bkp5bGNiaUFnZlZ4dUlDQnlaWFIxY200Z2NtVjBYRzU5WEc1Y2JrSjFabVpsY2k1d2NtOTBiM1I1Y0dVdWRHOUtVMDlPSUQwZ1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNCeVpYUjFjbTRnZTF4dUlDQWdJSFI1Y0dVNklDZENkV1ptWlhJbkxGeHVJQ0FnSUdSaGRHRTZJRUZ5Y21GNUxuQnliM1J2ZEhsd1pTNXpiR2xqWlM1allXeHNLSFJvYVhNdVgyRnljaUI4ZkNCMGFHbHpMQ0F3S1Z4dUlDQjlYRzU5WEc1Y2JpOHZJR052Y0hrb2RHRnlaMlYwUW5WbVptVnlMQ0IwWVhKblpYUlRkR0Z5ZEQwd0xDQnpiM1Z5WTJWVGRHRnlkRDB3TENCemIzVnlZMlZGYm1ROVluVm1abVZ5TG14bGJtZDBhQ2xjYmtKMVptWmxjaTV3Y205MGIzUjVjR1V1WTI5d2VTQTlJR1oxYm1OMGFXOXVJQ2gwWVhKblpYUXNJSFJoY21kbGRGOXpkR0Z5ZEN3Z2MzUmhjblFzSUdWdVpDa2dlMXh1SUNCMllYSWdjMjkxY21ObElEMGdkR2hwYzF4dVhHNGdJR2xtSUNnaGMzUmhjblFwSUhOMFlYSjBJRDBnTUZ4dUlDQnBaaUFvSVdWdVpDQW1KaUJsYm1RZ0lUMDlJREFwSUdWdVpDQTlJSFJvYVhNdWJHVnVaM1JvWEc0Z0lHbG1JQ2doZEdGeVoyVjBYM04wWVhKMEtTQjBZWEpuWlhSZmMzUmhjblFnUFNBd1hHNWNiaUFnTHk4Z1EyOXdlU0F3SUdKNWRHVnpPeUIzWlNkeVpTQmtiMjVsWEc0Z0lHbG1JQ2hsYm1RZ1BUMDlJSE4wWVhKMEtTQnlaWFIxY201Y2JpQWdhV1lnS0hSaGNtZGxkQzVzWlc1bmRHZ2dQVDA5SURBZ2ZId2djMjkxY21ObExteGxibWQwYUNBOVBUMGdNQ2tnY21WMGRYSnVYRzVjYmlBZ0x5OGdSbUYwWVd3Z1pYSnliM0lnWTI5dVpHbDBhVzl1YzF4dUlDQmhjM05sY25Rb1pXNWtJRDQ5SUhOMFlYSjBMQ0FuYzI5MWNtTmxSVzVrSUR3Z2MyOTFjbU5sVTNSaGNuUW5LVnh1SUNCaGMzTmxjblFvZEdGeVoyVjBYM04wWVhKMElENDlJREFnSmlZZ2RHRnlaMlYwWDNOMFlYSjBJRHdnZEdGeVoyVjBMbXhsYm1kMGFDeGNiaUFnSUNBZ0lDZDBZWEpuWlhSVGRHRnlkQ0J2ZFhRZ2IyWWdZbTkxYm1Sekp5bGNiaUFnWVhOelpYSjBLSE4wWVhKMElENDlJREFnSmlZZ2MzUmhjblFnUENCemIzVnlZMlV1YkdWdVozUm9MQ0FuYzI5MWNtTmxVM1JoY25RZ2IzVjBJRzltSUdKdmRXNWtjeWNwWEc0Z0lHRnpjMlZ5ZENobGJtUWdQajBnTUNBbUppQmxibVFnUEQwZ2MyOTFjbU5sTG14bGJtZDBhQ3dnSjNOdmRYSmpaVVZ1WkNCdmRYUWdiMllnWW05MWJtUnpKeWxjYmx4dUlDQXZMeUJCY21VZ2QyVWdiMjlpUDF4dUlDQnBaaUFvWlc1a0lENGdkR2hwY3k1c1pXNW5kR2dwWEc0Z0lDQWdaVzVrSUQwZ2RHaHBjeTVzWlc1bmRHaGNiaUFnYVdZZ0tIUmhjbWRsZEM1c1pXNW5kR2dnTFNCMFlYSm5aWFJmYzNSaGNuUWdQQ0JsYm1RZ0xTQnpkR0Z5ZENsY2JpQWdJQ0JsYm1RZ1BTQjBZWEpuWlhRdWJHVnVaM1JvSUMwZ2RHRnlaMlYwWDNOMFlYSjBJQ3NnYzNSaGNuUmNibHh1SUNCMllYSWdiR1Z1SUQwZ1pXNWtJQzBnYzNSaGNuUmNibHh1SUNCcFppQW9iR1Z1SUR3Z01UQXdJSHg4SUNGQ2RXWm1aWEl1WDNWelpWUjVjR1ZrUVhKeVlYbHpLU0I3WEc0Z0lDQWdabTl5SUNoMllYSWdhU0E5SURBN0lHa2dQQ0JzWlc0N0lHa3JLeWxjYmlBZ0lDQWdJSFJoY21kbGRGdHBJQ3NnZEdGeVoyVjBYM04wWVhKMFhTQTlJSFJvYVhOYmFTQXJJSE4wWVhKMFhWeHVJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lIUmhjbWRsZEM1ZmMyVjBLSFJvYVhNdWMzVmlZWEp5WVhrb2MzUmhjblFzSUhOMFlYSjBJQ3NnYkdWdUtTd2dkR0Z5WjJWMFgzTjBZWEowS1Z4dUlDQjlYRzU5WEc1Y2JtWjFibU4wYVc5dUlGOWlZWE5sTmpSVGJHbGpaU0FvWW5WbUxDQnpkR0Z5ZEN3Z1pXNWtLU0I3WEc0Z0lHbG1JQ2h6ZEdGeWRDQTlQVDBnTUNBbUppQmxibVFnUFQwOUlHSjFaaTVzWlc1bmRHZ3BJSHRjYmlBZ0lDQnlaWFIxY200Z1ltRnpaVFkwTG1aeWIyMUNlWFJsUVhKeVlYa29ZblZtS1Z4dUlDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUhKbGRIVnliaUJpWVhObE5qUXVabkp2YlVKNWRHVkJjbkpoZVNoaWRXWXVjMnhwWTJVb2MzUmhjblFzSUdWdVpDa3BYRzRnSUgxY2JuMWNibHh1Wm5WdVkzUnBiMjRnWDNWMFpqaFRiR2xqWlNBb1luVm1MQ0J6ZEdGeWRDd2daVzVrS1NCN1hHNGdJSFpoY2lCeVpYTWdQU0FuSjF4dUlDQjJZWElnZEcxd0lEMGdKeWRjYmlBZ1pXNWtJRDBnVFdGMGFDNXRhVzRvWW5WbUxteGxibWQwYUN3Z1pXNWtLVnh1WEc0Z0lHWnZjaUFvZG1GeUlHa2dQU0J6ZEdGeWREc2dhU0E4SUdWdVpEc2dhU3NyS1NCN1hHNGdJQ0FnYVdZZ0tHSjFabHRwWFNBOFBTQXdlRGRHS1NCN1hHNGdJQ0FnSUNCeVpYTWdLejBnWkdWamIyUmxWWFJtT0VOb1lYSW9kRzF3S1NBcklGTjBjbWx1Wnk1bWNtOXRRMmhoY2tOdlpHVW9ZblZtVzJsZEtWeHVJQ0FnSUNBZ2RHMXdJRDBnSnlkY2JpQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdkRzF3SUNzOUlDY2xKeUFySUdKMVpsdHBYUzUwYjFOMGNtbHVaeWd4TmlsY2JpQWdJQ0I5WEc0Z0lIMWNibHh1SUNCeVpYUjFjbTRnY21WeklDc2daR1ZqYjJSbFZYUm1PRU5vWVhJb2RHMXdLVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmZZWE5qYVdsVGJHbGpaU0FvWW5WbUxDQnpkR0Z5ZEN3Z1pXNWtLU0I3WEc0Z0lIWmhjaUJ5WlhRZ1BTQW5KMXh1SUNCbGJtUWdQU0JOWVhSb0xtMXBiaWhpZFdZdWJHVnVaM1JvTENCbGJtUXBYRzVjYmlBZ1ptOXlJQ2gyWVhJZ2FTQTlJSE4wWVhKME95QnBJRHdnWlc1a095QnBLeXNwWEc0Z0lDQWdjbVYwSUNzOUlGTjBjbWx1Wnk1bWNtOXRRMmhoY2tOdlpHVW9ZblZtVzJsZEtWeHVJQ0J5WlhSMWNtNGdjbVYwWEc1OVhHNWNibVoxYm1OMGFXOXVJRjlpYVc1aGNubFRiR2xqWlNBb1luVm1MQ0J6ZEdGeWRDd2daVzVrS1NCN1hHNGdJSEpsZEhWeWJpQmZZWE5qYVdsVGJHbGpaU2hpZFdZc0lITjBZWEowTENCbGJtUXBYRzU5WEc1Y2JtWjFibU4wYVc5dUlGOW9aWGhUYkdsalpTQW9ZblZtTENCemRHRnlkQ3dnWlc1a0tTQjdYRzRnSUhaaGNpQnNaVzRnUFNCaWRXWXViR1Z1WjNSb1hHNWNiaUFnYVdZZ0tDRnpkR0Z5ZENCOGZDQnpkR0Z5ZENBOElEQXBJSE4wWVhKMElEMGdNRnh1SUNCcFppQW9JV1Z1WkNCOGZDQmxibVFnUENBd0lIeDhJR1Z1WkNBK0lHeGxiaWtnWlc1a0lEMGdiR1Z1WEc1Y2JpQWdkbUZ5SUc5MWRDQTlJQ2NuWEc0Z0lHWnZjaUFvZG1GeUlHa2dQU0J6ZEdGeWREc2dhU0E4SUdWdVpEc2dhU3NyS1NCN1hHNGdJQ0FnYjNWMElDczlJSFJ2U0dWNEtHSjFabHRwWFNsY2JpQWdmVnh1SUNCeVpYUjFjbTRnYjNWMFhHNTlYRzVjYm1aMWJtTjBhVzl1SUY5MWRHWXhObXhsVTJ4cFkyVWdLR0oxWml3Z2MzUmhjblFzSUdWdVpDa2dlMXh1SUNCMllYSWdZbmwwWlhNZ1BTQmlkV1l1YzJ4cFkyVW9jM1JoY25Rc0lHVnVaQ2xjYmlBZ2RtRnlJSEpsY3lBOUlDY25YRzRnSUdadmNpQW9kbUZ5SUdrZ1BTQXdPeUJwSUR3Z1lubDBaWE11YkdWdVozUm9PeUJwSUNzOUlESXBJSHRjYmlBZ0lDQnlaWE1nS3owZ1UzUnlhVzVuTG1aeWIyMURhR0Z5UTI5a1pTaGllWFJsYzF0cFhTQXJJR0o1ZEdWelcya3JNVjBnS2lBeU5UWXBYRzRnSUgxY2JpQWdjbVYwZFhKdUlISmxjMXh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuTnNhV05sSUQwZ1puVnVZM1JwYjI0Z0tITjBZWEowTENCbGJtUXBJSHRjYmlBZ2RtRnlJR3hsYmlBOUlIUm9hWE11YkdWdVozUm9YRzRnSUhOMFlYSjBJRDBnWTJ4aGJYQW9jM1JoY25Rc0lHeGxiaXdnTUNsY2JpQWdaVzVrSUQwZ1kyeGhiWEFvWlc1a0xDQnNaVzRzSUd4bGJpbGNibHh1SUNCcFppQW9RblZtWm1WeUxsOTFjMlZVZVhCbFpFRnljbUY1Y3lrZ2UxeHVJQ0FnSUhKbGRIVnliaUJDZFdabVpYSXVYMkYxWjIxbGJuUW9kR2hwY3k1emRXSmhjbkpoZVNoemRHRnlkQ3dnWlc1a0tTbGNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQjJZWElnYzJ4cFkyVk1aVzRnUFNCbGJtUWdMU0J6ZEdGeWRGeHVJQ0FnSUhaaGNpQnVaWGRDZFdZZ1BTQnVaWGNnUW5WbVptVnlLSE5zYVdObFRHVnVMQ0IxYm1SbFptbHVaV1FzSUhSeWRXVXBYRzRnSUNBZ1ptOXlJQ2gyWVhJZ2FTQTlJREE3SUdrZ1BDQnpiR2xqWlV4bGJqc2dhU3NyS1NCN1hHNGdJQ0FnSUNCdVpYZENkV1piYVYwZ1BTQjBhR2x6VzJrZ0t5QnpkR0Z5ZEYxY2JpQWdJQ0I5WEc0Z0lDQWdjbVYwZFhKdUlHNWxkMEoxWmx4dUlDQjlYRzU5WEc1Y2JpOHZJR0JuWlhSZ0lIZHBiR3dnWW1VZ2NtVnRiM1psWkNCcGJpQk9iMlJsSURBdU1UTXJYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbWRsZENBOUlHWjFibU4wYVc5dUlDaHZabVp6WlhRcElIdGNiaUFnWTI5dWMyOXNaUzVzYjJjb0p5NW5aWFFvS1NCcGN5QmtaWEJ5WldOaGRHVmtMaUJCWTJObGMzTWdkWE5wYm1jZ1lYSnlZWGtnYVc1a1pYaGxjeUJwYm5OMFpXRmtMaWNwWEc0Z0lISmxkSFZ5YmlCMGFHbHpMbkpsWVdSVlNXNTBPQ2h2Wm1aelpYUXBYRzU5WEc1Y2JpOHZJR0J6WlhSZ0lIZHBiR3dnWW1VZ2NtVnRiM1psWkNCcGJpQk9iMlJsSURBdU1UTXJYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbk5sZENBOUlHWjFibU4wYVc5dUlDaDJMQ0J2Wm1aelpYUXBJSHRjYmlBZ1kyOXVjMjlzWlM1c2IyY29KeTV6WlhRb0tTQnBjeUJrWlhCeVpXTmhkR1ZrTGlCQlkyTmxjM01nZFhOcGJtY2dZWEp5WVhrZ2FXNWtaWGhsY3lCcGJuTjBaV0ZrTGljcFhHNGdJSEpsZEhWeWJpQjBhR2x6TG5keWFYUmxWVWx1ZERnb2Rpd2diMlptYzJWMEtWeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5KbFlXUlZTVzUwT0NBOUlHWjFibU4wYVc5dUlDaHZabVp6WlhRc0lHNXZRWE56WlhKMEtTQjdYRzRnSUdsbUlDZ2hibTlCYzNObGNuUXBJSHRjYmlBZ0lDQmhjM05sY25Rb2IyWm1jMlYwSUNFOVBTQjFibVJsWm1sdVpXUWdKaVlnYjJabWMyVjBJQ0U5UFNCdWRXeHNMQ0FuYldsemMybHVaeUJ2Wm1aelpYUW5LVnh1SUNBZ0lHRnpjMlZ5ZENodlptWnpaWFFnUENCMGFHbHpMbXhsYm1kMGFDd2dKMVJ5ZVdsdVp5QjBieUJ5WldGa0lHSmxlVzl1WkNCaWRXWm1aWElnYkdWdVozUm9KeWxjYmlBZ2ZWeHVYRzRnSUdsbUlDaHZabVp6WlhRZ1BqMGdkR2hwY3k1c1pXNW5kR2dwWEc0Z0lDQWdjbVYwZFhKdVhHNWNiaUFnY21WMGRYSnVJSFJvYVhOYmIyWm1jMlYwWFZ4dWZWeHVYRzVtZFc1amRHbHZiaUJmY21WaFpGVkpiblF4TmlBb1luVm1MQ0J2Wm1aelpYUXNJR3hwZEhSc1pVVnVaR2xoYml3Z2JtOUJjM05sY25RcElIdGNiaUFnYVdZZ0tDRnViMEZ6YzJWeWRDa2dlMXh1SUNBZ0lHRnpjMlZ5ZENoMGVYQmxiMllnYkdsMGRHeGxSVzVrYVdGdUlEMDlQU0FuWW05dmJHVmhiaWNzSUNkdGFYTnphVzVuSUc5eUlHbHVkbUZzYVdRZ1pXNWthV0Z1SnlsY2JpQWdJQ0JoYzNObGNuUW9iMlptYzJWMElDRTlQU0IxYm1SbFptbHVaV1FnSmlZZ2IyWm1jMlYwSUNFOVBTQnVkV3hzTENBbmJXbHpjMmx1WnlCdlptWnpaWFFuS1Z4dUlDQWdJR0Z6YzJWeWRDaHZabVp6WlhRZ0t5QXhJRHdnWW5WbUxteGxibWQwYUN3Z0oxUnllV2x1WnlCMGJ5QnlaV0ZrSUdKbGVXOXVaQ0JpZFdabVpYSWdiR1Z1WjNSb0p5bGNiaUFnZlZ4dVhHNGdJSFpoY2lCc1pXNGdQU0JpZFdZdWJHVnVaM1JvWEc0Z0lHbG1JQ2h2Wm1aelpYUWdQajBnYkdWdUtWeHVJQ0FnSUhKbGRIVnlibHh1WEc0Z0lIWmhjaUIyWVd4Y2JpQWdhV1lnS0d4cGRIUnNaVVZ1WkdsaGJpa2dlMXh1SUNBZ0lIWmhiQ0E5SUdKMVpsdHZabVp6WlhSZFhHNGdJQ0FnYVdZZ0tHOW1abk5sZENBcklERWdQQ0JzWlc0cFhHNGdJQ0FnSUNCMllXd2dmRDBnWW5WbVcyOW1abk5sZENBcklERmRJRHc4SURoY2JpQWdmU0JsYkhObElIdGNiaUFnSUNCMllXd2dQU0JpZFdaYmIyWm1jMlYwWFNBOFBDQTRYRzRnSUNBZ2FXWWdLRzltWm5ObGRDQXJJREVnUENCc1pXNHBYRzRnSUNBZ0lDQjJZV3dnZkQwZ1luVm1XMjltWm5ObGRDQXJJREZkWEc0Z0lIMWNiaUFnY21WMGRYSnVJSFpoYkZ4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbkpsWVdSVlNXNTBNVFpNUlNBOUlHWjFibU4wYVc5dUlDaHZabVp6WlhRc0lHNXZRWE56WlhKMEtTQjdYRzRnSUhKbGRIVnliaUJmY21WaFpGVkpiblF4TmloMGFHbHpMQ0J2Wm1aelpYUXNJSFJ5ZFdVc0lHNXZRWE56WlhKMEtWeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5KbFlXUlZTVzUwTVRaQ1JTQTlJR1oxYm1OMGFXOXVJQ2h2Wm1aelpYUXNJRzV2UVhOelpYSjBLU0I3WEc0Z0lISmxkSFZ5YmlCZmNtVmhaRlZKYm5ReE5paDBhR2x6TENCdlptWnpaWFFzSUdaaGJITmxMQ0J1YjBGemMyVnlkQ2xjYm4xY2JseHVablZ1WTNScGIyNGdYM0psWVdSVlNXNTBNeklnS0dKMVppd2diMlptYzJWMExDQnNhWFIwYkdWRmJtUnBZVzRzSUc1dlFYTnpaWEowS1NCN1hHNGdJR2xtSUNnaGJtOUJjM05sY25RcElIdGNiaUFnSUNCaGMzTmxjblFvZEhsd1pXOW1JR3hwZEhSc1pVVnVaR2xoYmlBOVBUMGdKMkp2YjJ4bFlXNG5MQ0FuYldsemMybHVaeUJ2Y2lCcGJuWmhiR2xrSUdWdVpHbGhiaWNwWEc0Z0lDQWdZWE56WlhKMEtHOW1abk5sZENBaFBUMGdkVzVrWldacGJtVmtJQ1ltSUc5bVpuTmxkQ0FoUFQwZ2JuVnNiQ3dnSjIxcGMzTnBibWNnYjJabWMyVjBKeWxjYmlBZ0lDQmhjM05sY25Rb2IyWm1jMlYwSUNzZ015QThJR0oxWmk1c1pXNW5kR2dzSUNkVWNubHBibWNnZEc4Z2NtVmhaQ0JpWlhsdmJtUWdZblZtWm1WeUlHeGxibWQwYUNjcFhHNGdJSDFjYmx4dUlDQjJZWElnYkdWdUlEMGdZblZtTG14bGJtZDBhRnh1SUNCcFppQW9iMlptYzJWMElENDlJR3hsYmlsY2JpQWdJQ0J5WlhSMWNtNWNibHh1SUNCMllYSWdkbUZzWEc0Z0lHbG1JQ2hzYVhSMGJHVkZibVJwWVc0cElIdGNiaUFnSUNCcFppQW9iMlptYzJWMElDc2dNaUE4SUd4bGJpbGNiaUFnSUNBZ0lIWmhiQ0E5SUdKMVpsdHZabVp6WlhRZ0t5QXlYU0E4UENBeE5seHVJQ0FnSUdsbUlDaHZabVp6WlhRZ0t5QXhJRHdnYkdWdUtWeHVJQ0FnSUNBZ2RtRnNJSHc5SUdKMVpsdHZabVp6WlhRZ0t5QXhYU0E4UENBNFhHNGdJQ0FnZG1Gc0lIdzlJR0oxWmx0dlptWnpaWFJkWEc0Z0lDQWdhV1lnS0c5bVpuTmxkQ0FySURNZ1BDQnNaVzRwWEc0Z0lDQWdJQ0IyWVd3Z1BTQjJZV3dnS3lBb1luVm1XMjltWm5ObGRDQXJJRE5kSUR3OElESTBJRDQrUGlBd0tWeHVJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lHbG1JQ2h2Wm1aelpYUWdLeUF4SUR3Z2JHVnVLVnh1SUNBZ0lDQWdkbUZzSUQwZ1luVm1XMjltWm5ObGRDQXJJREZkSUR3OElERTJYRzRnSUNBZ2FXWWdLRzltWm5ObGRDQXJJRElnUENCc1pXNHBYRzRnSUNBZ0lDQjJZV3dnZkQwZ1luVm1XMjltWm5ObGRDQXJJREpkSUR3OElEaGNiaUFnSUNCcFppQW9iMlptYzJWMElDc2dNeUE4SUd4bGJpbGNiaUFnSUNBZ0lIWmhiQ0I4UFNCaWRXWmJiMlptYzJWMElDc2dNMTFjYmlBZ0lDQjJZV3dnUFNCMllXd2dLeUFvWW5WbVcyOW1abk5sZEYwZ1BEd2dNalFnUGo0K0lEQXBYRzRnSUgxY2JpQWdjbVYwZFhKdUlIWmhiRnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuSmxZV1JWU1c1ME16Sk1SU0E5SUdaMWJtTjBhVzl1SUNodlptWnpaWFFzSUc1dlFYTnpaWEowS1NCN1hHNGdJSEpsZEhWeWJpQmZjbVZoWkZWSmJuUXpNaWgwYUdsekxDQnZabVp6WlhRc0lIUnlkV1VzSUc1dlFYTnpaWEowS1Z4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbkpsWVdSVlNXNTBNekpDUlNBOUlHWjFibU4wYVc5dUlDaHZabVp6WlhRc0lHNXZRWE56WlhKMEtTQjdYRzRnSUhKbGRIVnliaUJmY21WaFpGVkpiblF6TWloMGFHbHpMQ0J2Wm1aelpYUXNJR1poYkhObExDQnViMEZ6YzJWeWRDbGNibjFjYmx4dVFuVm1abVZ5TG5CeWIzUnZkSGx3WlM1eVpXRmtTVzUwT0NBOUlHWjFibU4wYVc5dUlDaHZabVp6WlhRc0lHNXZRWE56WlhKMEtTQjdYRzRnSUdsbUlDZ2hibTlCYzNObGNuUXBJSHRjYmlBZ0lDQmhjM05sY25Rb2IyWm1jMlYwSUNFOVBTQjFibVJsWm1sdVpXUWdKaVlnYjJabWMyVjBJQ0U5UFNCdWRXeHNMRnh1SUNBZ0lDQWdJQ0FuYldsemMybHVaeUJ2Wm1aelpYUW5LVnh1SUNBZ0lHRnpjMlZ5ZENodlptWnpaWFFnUENCMGFHbHpMbXhsYm1kMGFDd2dKMVJ5ZVdsdVp5QjBieUJ5WldGa0lHSmxlVzl1WkNCaWRXWm1aWElnYkdWdVozUm9KeWxjYmlBZ2ZWeHVYRzRnSUdsbUlDaHZabVp6WlhRZ1BqMGdkR2hwY3k1c1pXNW5kR2dwWEc0Z0lDQWdjbVYwZFhKdVhHNWNiaUFnZG1GeUlHNWxaeUE5SUhSb2FYTmJiMlptYzJWMFhTQW1JREI0T0RCY2JpQWdhV1lnS0c1bFp5bGNiaUFnSUNCeVpYUjFjbTRnS0RCNFptWWdMU0IwYUdselcyOW1abk5sZEYwZ0t5QXhLU0FxSUMweFhHNGdJR1ZzYzJWY2JpQWdJQ0J5WlhSMWNtNGdkR2hwYzF0dlptWnpaWFJkWEc1OVhHNWNibVoxYm1OMGFXOXVJRjl5WldGa1NXNTBNVFlnS0dKMVppd2diMlptYzJWMExDQnNhWFIwYkdWRmJtUnBZVzRzSUc1dlFYTnpaWEowS1NCN1hHNGdJR2xtSUNnaGJtOUJjM05sY25RcElIdGNiaUFnSUNCaGMzTmxjblFvZEhsd1pXOW1JR3hwZEhSc1pVVnVaR2xoYmlBOVBUMGdKMkp2YjJ4bFlXNG5MQ0FuYldsemMybHVaeUJ2Y2lCcGJuWmhiR2xrSUdWdVpHbGhiaWNwWEc0Z0lDQWdZWE56WlhKMEtHOW1abk5sZENBaFBUMGdkVzVrWldacGJtVmtJQ1ltSUc5bVpuTmxkQ0FoUFQwZ2JuVnNiQ3dnSjIxcGMzTnBibWNnYjJabWMyVjBKeWxjYmlBZ0lDQmhjM05sY25Rb2IyWm1jMlYwSUNzZ01TQThJR0oxWmk1c1pXNW5kR2dzSUNkVWNubHBibWNnZEc4Z2NtVmhaQ0JpWlhsdmJtUWdZblZtWm1WeUlHeGxibWQwYUNjcFhHNGdJSDFjYmx4dUlDQjJZWElnYkdWdUlEMGdZblZtTG14bGJtZDBhRnh1SUNCcFppQW9iMlptYzJWMElENDlJR3hsYmlsY2JpQWdJQ0J5WlhSMWNtNWNibHh1SUNCMllYSWdkbUZzSUQwZ1gzSmxZV1JWU1c1ME1UWW9ZblZtTENCdlptWnpaWFFzSUd4cGRIUnNaVVZ1WkdsaGJpd2dkSEoxWlNsY2JpQWdkbUZ5SUc1bFp5QTlJSFpoYkNBbUlEQjRPREF3TUZ4dUlDQnBaaUFvYm1WbktWeHVJQ0FnSUhKbGRIVnliaUFvTUhobVptWm1JQzBnZG1Gc0lDc2dNU2tnS2lBdE1WeHVJQ0JsYkhObFhHNGdJQ0FnY21WMGRYSnVJSFpoYkZ4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbkpsWVdSSmJuUXhOa3hGSUQwZ1puVnVZM1JwYjI0Z0tHOW1abk5sZEN3Z2JtOUJjM05sY25RcElIdGNiaUFnY21WMGRYSnVJRjl5WldGa1NXNTBNVFlvZEdocGN5d2diMlptYzJWMExDQjBjblZsTENCdWIwRnpjMlZ5ZENsY2JuMWNibHh1UW5WbVptVnlMbkJ5YjNSdmRIbHdaUzV5WldGa1NXNTBNVFpDUlNBOUlHWjFibU4wYVc5dUlDaHZabVp6WlhRc0lHNXZRWE56WlhKMEtTQjdYRzRnSUhKbGRIVnliaUJmY21WaFpFbHVkREUyS0hSb2FYTXNJRzltWm5ObGRDd2dabUZzYzJVc0lHNXZRWE56WlhKMEtWeHVmVnh1WEc1bWRXNWpkR2x2YmlCZmNtVmhaRWx1ZERNeUlDaGlkV1lzSUc5bVpuTmxkQ3dnYkdsMGRHeGxSVzVrYVdGdUxDQnViMEZ6YzJWeWRDa2dlMXh1SUNCcFppQW9JVzV2UVhOelpYSjBLU0I3WEc0Z0lDQWdZWE56WlhKMEtIUjVjR1Z2WmlCc2FYUjBiR1ZGYm1ScFlXNGdQVDA5SUNkaWIyOXNaV0Z1Snl3Z0oyMXBjM05wYm1jZ2IzSWdhVzUyWVd4cFpDQmxibVJwWVc0bktWeHVJQ0FnSUdGemMyVnlkQ2h2Wm1aelpYUWdJVDA5SUhWdVpHVm1hVzVsWkNBbUppQnZabVp6WlhRZ0lUMDlJRzUxYkd3c0lDZHRhWE56YVc1bklHOW1abk5sZENjcFhHNGdJQ0FnWVhOelpYSjBLRzltWm5ObGRDQXJJRE1nUENCaWRXWXViR1Z1WjNSb0xDQW5WSEo1YVc1bklIUnZJSEpsWVdRZ1ltVjViMjVrSUdKMVptWmxjaUJzWlc1bmRHZ25LVnh1SUNCOVhHNWNiaUFnZG1GeUlHeGxiaUE5SUdKMVppNXNaVzVuZEdoY2JpQWdhV1lnS0c5bVpuTmxkQ0ErUFNCc1pXNHBYRzRnSUNBZ2NtVjBkWEp1WEc1Y2JpQWdkbUZ5SUhaaGJDQTlJRjl5WldGa1ZVbHVkRE15S0dKMVppd2diMlptYzJWMExDQnNhWFIwYkdWRmJtUnBZVzRzSUhSeWRXVXBYRzRnSUhaaGNpQnVaV2NnUFNCMllXd2dKaUF3ZURnd01EQXdNREF3WEc0Z0lHbG1JQ2h1WldjcFhHNGdJQ0FnY21WMGRYSnVJQ2d3ZUdabVptWm1abVptSUMwZ2RtRnNJQ3NnTVNrZ0tpQXRNVnh1SUNCbGJITmxYRzRnSUNBZ2NtVjBkWEp1SUhaaGJGeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5KbFlXUkpiblF6TWt4RklEMGdablZ1WTNScGIyNGdLRzltWm5ObGRDd2dibTlCYzNObGNuUXBJSHRjYmlBZ2NtVjBkWEp1SUY5eVpXRmtTVzUwTXpJb2RHaHBjeXdnYjJabWMyVjBMQ0IwY25WbExDQnViMEZ6YzJWeWRDbGNibjFjYmx4dVFuVm1abVZ5TG5CeWIzUnZkSGx3WlM1eVpXRmtTVzUwTXpKQ1JTQTlJR1oxYm1OMGFXOXVJQ2h2Wm1aelpYUXNJRzV2UVhOelpYSjBLU0I3WEc0Z0lISmxkSFZ5YmlCZmNtVmhaRWx1ZERNeUtIUm9hWE1zSUc5bVpuTmxkQ3dnWm1Gc2MyVXNJRzV2UVhOelpYSjBLVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmZjbVZoWkVac2IyRjBJQ2hpZFdZc0lHOW1abk5sZEN3Z2JHbDBkR3hsUlc1a2FXRnVMQ0J1YjBGemMyVnlkQ2tnZTF4dUlDQnBaaUFvSVc1dlFYTnpaWEowS1NCN1hHNGdJQ0FnWVhOelpYSjBLSFI1Y0dWdlppQnNhWFIwYkdWRmJtUnBZVzRnUFQwOUlDZGliMjlzWldGdUp5d2dKMjFwYzNOcGJtY2diM0lnYVc1MllXeHBaQ0JsYm1ScFlXNG5LVnh1SUNBZ0lHRnpjMlZ5ZENodlptWnpaWFFnS3lBeklEd2dZblZtTG14bGJtZDBhQ3dnSjFSeWVXbHVaeUIwYnlCeVpXRmtJR0psZVc5dVpDQmlkV1ptWlhJZ2JHVnVaM1JvSnlsY2JpQWdmVnh1WEc0Z0lISmxkSFZ5YmlCcFpXVmxOelUwTG5KbFlXUW9ZblZtTENCdlptWnpaWFFzSUd4cGRIUnNaVVZ1WkdsaGJpd2dNak1zSURRcFhHNTlYRzVjYmtKMVptWmxjaTV3Y205MGIzUjVjR1V1Y21WaFpFWnNiMkYwVEVVZ1BTQm1kVzVqZEdsdmJpQW9iMlptYzJWMExDQnViMEZ6YzJWeWRDa2dlMXh1SUNCeVpYUjFjbTRnWDNKbFlXUkdiRzloZENoMGFHbHpMQ0J2Wm1aelpYUXNJSFJ5ZFdVc0lHNXZRWE56WlhKMEtWeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5KbFlXUkdiRzloZEVKRklEMGdablZ1WTNScGIyNGdLRzltWm5ObGRDd2dibTlCYzNObGNuUXBJSHRjYmlBZ2NtVjBkWEp1SUY5eVpXRmtSbXh2WVhRb2RHaHBjeXdnYjJabWMyVjBMQ0JtWVd4elpTd2dibTlCYzNObGNuUXBYRzU5WEc1Y2JtWjFibU4wYVc5dUlGOXlaV0ZrUkc5MVlteGxJQ2hpZFdZc0lHOW1abk5sZEN3Z2JHbDBkR3hsUlc1a2FXRnVMQ0J1YjBGemMyVnlkQ2tnZTF4dUlDQnBaaUFvSVc1dlFYTnpaWEowS1NCN1hHNGdJQ0FnWVhOelpYSjBLSFI1Y0dWdlppQnNhWFIwYkdWRmJtUnBZVzRnUFQwOUlDZGliMjlzWldGdUp5d2dKMjFwYzNOcGJtY2diM0lnYVc1MllXeHBaQ0JsYm1ScFlXNG5LVnh1SUNBZ0lHRnpjMlZ5ZENodlptWnpaWFFnS3lBM0lEd2dZblZtTG14bGJtZDBhQ3dnSjFSeWVXbHVaeUIwYnlCeVpXRmtJR0psZVc5dVpDQmlkV1ptWlhJZ2JHVnVaM1JvSnlsY2JpQWdmVnh1WEc0Z0lISmxkSFZ5YmlCcFpXVmxOelUwTG5KbFlXUW9ZblZtTENCdlptWnpaWFFzSUd4cGRIUnNaVVZ1WkdsaGJpd2dOVElzSURncFhHNTlYRzVjYmtKMVptWmxjaTV3Y205MGIzUjVjR1V1Y21WaFpFUnZkV0pzWlV4RklEMGdablZ1WTNScGIyNGdLRzltWm5ObGRDd2dibTlCYzNObGNuUXBJSHRjYmlBZ2NtVjBkWEp1SUY5eVpXRmtSRzkxWW14bEtIUm9hWE1zSUc5bVpuTmxkQ3dnZEhKMVpTd2dibTlCYzNObGNuUXBYRzU5WEc1Y2JrSjFabVpsY2k1d2NtOTBiM1I1Y0dVdWNtVmhaRVJ2ZFdKc1pVSkZJRDBnWm5WdVkzUnBiMjRnS0c5bVpuTmxkQ3dnYm05QmMzTmxjblFwSUh0Y2JpQWdjbVYwZFhKdUlGOXlaV0ZrUkc5MVlteGxLSFJvYVhNc0lHOW1abk5sZEN3Z1ptRnNjMlVzSUc1dlFYTnpaWEowS1Z4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbmR5YVhSbFZVbHVkRGdnUFNCbWRXNWpkR2x2YmlBb2RtRnNkV1VzSUc5bVpuTmxkQ3dnYm05QmMzTmxjblFwSUh0Y2JpQWdhV1lnS0NGdWIwRnpjMlZ5ZENrZ2UxeHVJQ0FnSUdGemMyVnlkQ2gyWVd4MVpTQWhQVDBnZFc1a1pXWnBibVZrSUNZbUlIWmhiSFZsSUNFOVBTQnVkV3hzTENBbmJXbHpjMmx1WnlCMllXeDFaU2NwWEc0Z0lDQWdZWE56WlhKMEtHOW1abk5sZENBaFBUMGdkVzVrWldacGJtVmtJQ1ltSUc5bVpuTmxkQ0FoUFQwZ2JuVnNiQ3dnSjIxcGMzTnBibWNnYjJabWMyVjBKeWxjYmlBZ0lDQmhjM05sY25Rb2IyWm1jMlYwSUR3Z2RHaHBjeTVzWlc1bmRHZ3NJQ2QwY25scGJtY2dkRzhnZDNKcGRHVWdZbVY1YjI1a0lHSjFabVpsY2lCc1pXNW5kR2duS1Z4dUlDQWdJSFpsY21sbWRXbHVkQ2gyWVd4MVpTd2dNSGhtWmlsY2JpQWdmVnh1WEc0Z0lHbG1JQ2h2Wm1aelpYUWdQajBnZEdocGN5NXNaVzVuZEdncElISmxkSFZ5Ymx4dVhHNGdJSFJvYVhOYmIyWm1jMlYwWFNBOUlIWmhiSFZsWEc1OVhHNWNibVoxYm1OMGFXOXVJRjkzY21sMFpWVkpiblF4TmlBb1luVm1MQ0IyWVd4MVpTd2diMlptYzJWMExDQnNhWFIwYkdWRmJtUnBZVzRzSUc1dlFYTnpaWEowS1NCN1hHNGdJR2xtSUNnaGJtOUJjM05sY25RcElIdGNiaUFnSUNCaGMzTmxjblFvZG1Gc2RXVWdJVDA5SUhWdVpHVm1hVzVsWkNBbUppQjJZV3gxWlNBaFBUMGdiblZzYkN3Z0oyMXBjM05wYm1jZ2RtRnNkV1VuS1Z4dUlDQWdJR0Z6YzJWeWRDaDBlWEJsYjJZZ2JHbDBkR3hsUlc1a2FXRnVJRDA5UFNBblltOXZiR1ZoYmljc0lDZHRhWE56YVc1bklHOXlJR2x1ZG1Gc2FXUWdaVzVrYVdGdUp5bGNiaUFnSUNCaGMzTmxjblFvYjJabWMyVjBJQ0U5UFNCMWJtUmxabWx1WldRZ0ppWWdiMlptYzJWMElDRTlQU0J1ZFd4c0xDQW5iV2x6YzJsdVp5QnZabVp6WlhRbktWeHVJQ0FnSUdGemMyVnlkQ2h2Wm1aelpYUWdLeUF4SUR3Z1luVm1MbXhsYm1kMGFDd2dKM1J5ZVdsdVp5QjBieUIzY21sMFpTQmlaWGx2Ym1RZ1luVm1abVZ5SUd4bGJtZDBhQ2NwWEc0Z0lDQWdkbVZ5YVdaMWFXNTBLSFpoYkhWbExDQXdlR1ptWm1ZcFhHNGdJSDFjYmx4dUlDQjJZWElnYkdWdUlEMGdZblZtTG14bGJtZDBhRnh1SUNCcFppQW9iMlptYzJWMElENDlJR3hsYmlsY2JpQWdJQ0J5WlhSMWNtNWNibHh1SUNCbWIzSWdLSFpoY2lCcElEMGdNQ3dnYWlBOUlFMWhkR2d1YldsdUtHeGxiaUF0SUc5bVpuTmxkQ3dnTWlrN0lHa2dQQ0JxT3lCcEt5c3BJSHRjYmlBZ0lDQmlkV1piYjJabWMyVjBJQ3NnYVYwZ1BWeHVJQ0FnSUNBZ0lDQW9kbUZzZFdVZ0ppQW9NSGhtWmlBOFBDQW9PQ0FxSUNoc2FYUjBiR1ZGYm1ScFlXNGdQeUJwSURvZ01TQXRJR2twS1NrcElENCtQbHh1SUNBZ0lDQWdJQ0FnSUNBZ0tHeHBkSFJzWlVWdVpHbGhiaUEvSUdrZ09pQXhJQzBnYVNrZ0tpQTRYRzRnSUgxY2JuMWNibHh1UW5WbVptVnlMbkJ5YjNSdmRIbHdaUzUzY21sMFpWVkpiblF4Tmt4RklEMGdablZ1WTNScGIyNGdLSFpoYkhWbExDQnZabVp6WlhRc0lHNXZRWE56WlhKMEtTQjdYRzRnSUY5M2NtbDBaVlZKYm5ReE5paDBhR2x6TENCMllXeDFaU3dnYjJabWMyVjBMQ0IwY25WbExDQnViMEZ6YzJWeWRDbGNibjFjYmx4dVFuVm1abVZ5TG5CeWIzUnZkSGx3WlM1M2NtbDBaVlZKYm5ReE5rSkZJRDBnWm5WdVkzUnBiMjRnS0haaGJIVmxMQ0J2Wm1aelpYUXNJRzV2UVhOelpYSjBLU0I3WEc0Z0lGOTNjbWwwWlZWSmJuUXhOaWgwYUdsekxDQjJZV3gxWlN3Z2IyWm1jMlYwTENCbVlXeHpaU3dnYm05QmMzTmxjblFwWEc1OVhHNWNibVoxYm1OMGFXOXVJRjkzY21sMFpWVkpiblF6TWlBb1luVm1MQ0IyWVd4MVpTd2diMlptYzJWMExDQnNhWFIwYkdWRmJtUnBZVzRzSUc1dlFYTnpaWEowS1NCN1hHNGdJR2xtSUNnaGJtOUJjM05sY25RcElIdGNiaUFnSUNCaGMzTmxjblFvZG1Gc2RXVWdJVDA5SUhWdVpHVm1hVzVsWkNBbUppQjJZV3gxWlNBaFBUMGdiblZzYkN3Z0oyMXBjM05wYm1jZ2RtRnNkV1VuS1Z4dUlDQWdJR0Z6YzJWeWRDaDBlWEJsYjJZZ2JHbDBkR3hsUlc1a2FXRnVJRDA5UFNBblltOXZiR1ZoYmljc0lDZHRhWE56YVc1bklHOXlJR2x1ZG1Gc2FXUWdaVzVrYVdGdUp5bGNiaUFnSUNCaGMzTmxjblFvYjJabWMyVjBJQ0U5UFNCMWJtUmxabWx1WldRZ0ppWWdiMlptYzJWMElDRTlQU0J1ZFd4c0xDQW5iV2x6YzJsdVp5QnZabVp6WlhRbktWeHVJQ0FnSUdGemMyVnlkQ2h2Wm1aelpYUWdLeUF6SUR3Z1luVm1MbXhsYm1kMGFDd2dKM1J5ZVdsdVp5QjBieUIzY21sMFpTQmlaWGx2Ym1RZ1luVm1abVZ5SUd4bGJtZDBhQ2NwWEc0Z0lDQWdkbVZ5YVdaMWFXNTBLSFpoYkhWbExDQXdlR1ptWm1abVptWm1LVnh1SUNCOVhHNWNiaUFnZG1GeUlHeGxiaUE5SUdKMVppNXNaVzVuZEdoY2JpQWdhV1lnS0c5bVpuTmxkQ0ErUFNCc1pXNHBYRzRnSUNBZ2NtVjBkWEp1WEc1Y2JpQWdabTl5SUNoMllYSWdhU0E5SURBc0lHb2dQU0JOWVhSb0xtMXBiaWhzWlc0Z0xTQnZabVp6WlhRc0lEUXBPeUJwSUR3Z2Fqc2dhU3NyS1NCN1hHNGdJQ0FnWW5WbVcyOW1abk5sZENBcklHbGRJRDFjYmlBZ0lDQWdJQ0FnS0haaGJIVmxJRDQrUGlBb2JHbDBkR3hsUlc1a2FXRnVJRDhnYVNBNklETWdMU0JwS1NBcUlEZ3BJQ1lnTUhobVpseHVJQ0I5WEc1OVhHNWNia0oxWm1abGNpNXdjbTkwYjNSNWNHVXVkM0pwZEdWVlNXNTBNekpNUlNBOUlHWjFibU4wYVc5dUlDaDJZV3gxWlN3Z2IyWm1jMlYwTENCdWIwRnpjMlZ5ZENrZ2UxeHVJQ0JmZDNKcGRHVlZTVzUwTXpJb2RHaHBjeXdnZG1Gc2RXVXNJRzltWm5ObGRDd2dkSEoxWlN3Z2JtOUJjM05sY25RcFhHNTlYRzVjYmtKMVptWmxjaTV3Y205MGIzUjVjR1V1ZDNKcGRHVlZTVzUwTXpKQ1JTQTlJR1oxYm1OMGFXOXVJQ2gyWVd4MVpTd2diMlptYzJWMExDQnViMEZ6YzJWeWRDa2dlMXh1SUNCZmQzSnBkR1ZWU1c1ME16SW9kR2hwY3l3Z2RtRnNkV1VzSUc5bVpuTmxkQ3dnWm1Gc2MyVXNJRzV2UVhOelpYSjBLVnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuZHlhWFJsU1c1ME9DQTlJR1oxYm1OMGFXOXVJQ2gyWVd4MVpTd2diMlptYzJWMExDQnViMEZ6YzJWeWRDa2dlMXh1SUNCcFppQW9JVzV2UVhOelpYSjBLU0I3WEc0Z0lDQWdZWE56WlhKMEtIWmhiSFZsSUNFOVBTQjFibVJsWm1sdVpXUWdKaVlnZG1Gc2RXVWdJVDA5SUc1MWJHd3NJQ2R0YVhOemFXNW5JSFpoYkhWbEp5bGNiaUFnSUNCaGMzTmxjblFvYjJabWMyVjBJQ0U5UFNCMWJtUmxabWx1WldRZ0ppWWdiMlptYzJWMElDRTlQU0J1ZFd4c0xDQW5iV2x6YzJsdVp5QnZabVp6WlhRbktWeHVJQ0FnSUdGemMyVnlkQ2h2Wm1aelpYUWdQQ0IwYUdsekxteGxibWQwYUN3Z0oxUnllV2x1WnlCMGJ5QjNjbWwwWlNCaVpYbHZibVFnWW5WbVptVnlJR3hsYm1kMGFDY3BYRzRnSUNBZ2RtVnlhV1p6YVc1MEtIWmhiSFZsTENBd2VEZG1MQ0F0TUhnNE1DbGNiaUFnZlZ4dVhHNGdJR2xtSUNodlptWnpaWFFnUGowZ2RHaHBjeTVzWlc1bmRHZ3BYRzRnSUNBZ2NtVjBkWEp1WEc1Y2JpQWdhV1lnS0haaGJIVmxJRDQ5SURBcFhHNGdJQ0FnZEdocGN5NTNjbWwwWlZWSmJuUTRLSFpoYkhWbExDQnZabVp6WlhRc0lHNXZRWE56WlhKMEtWeHVJQ0JsYkhObFhHNGdJQ0FnZEdocGN5NTNjbWwwWlZWSmJuUTRLREI0Wm1ZZ0t5QjJZV3gxWlNBcklERXNJRzltWm5ObGRDd2dibTlCYzNObGNuUXBYRzU5WEc1Y2JtWjFibU4wYVc5dUlGOTNjbWwwWlVsdWRERTJJQ2hpZFdZc0lIWmhiSFZsTENCdlptWnpaWFFzSUd4cGRIUnNaVVZ1WkdsaGJpd2dibTlCYzNObGNuUXBJSHRjYmlBZ2FXWWdLQ0Z1YjBGemMyVnlkQ2tnZTF4dUlDQWdJR0Z6YzJWeWRDaDJZV3gxWlNBaFBUMGdkVzVrWldacGJtVmtJQ1ltSUhaaGJIVmxJQ0U5UFNCdWRXeHNMQ0FuYldsemMybHVaeUIyWVd4MVpTY3BYRzRnSUNBZ1lYTnpaWEowS0hSNWNHVnZaaUJzYVhSMGJHVkZibVJwWVc0Z1BUMDlJQ2RpYjI5c1pXRnVKeXdnSjIxcGMzTnBibWNnYjNJZ2FXNTJZV3hwWkNCbGJtUnBZVzRuS1Z4dUlDQWdJR0Z6YzJWeWRDaHZabVp6WlhRZ0lUMDlJSFZ1WkdWbWFXNWxaQ0FtSmlCdlptWnpaWFFnSVQwOUlHNTFiR3dzSUNkdGFYTnphVzVuSUc5bVpuTmxkQ2NwWEc0Z0lDQWdZWE56WlhKMEtHOW1abk5sZENBcklERWdQQ0JpZFdZdWJHVnVaM1JvTENBblZISjVhVzVuSUhSdklIZHlhWFJsSUdKbGVXOXVaQ0JpZFdabVpYSWdiR1Z1WjNSb0p5bGNiaUFnSUNCMlpYSnBabk5wYm5Rb2RtRnNkV1VzSURCNE4yWm1aaXdnTFRCNE9EQXdNQ2xjYmlBZ2ZWeHVYRzRnSUhaaGNpQnNaVzRnUFNCaWRXWXViR1Z1WjNSb1hHNGdJR2xtSUNodlptWnpaWFFnUGowZ2JHVnVLVnh1SUNBZ0lISmxkSFZ5Ymx4dVhHNGdJR2xtSUNoMllXeDFaU0ErUFNBd0tWeHVJQ0FnSUY5M2NtbDBaVlZKYm5ReE5paGlkV1lzSUhaaGJIVmxMQ0J2Wm1aelpYUXNJR3hwZEhSc1pVVnVaR2xoYml3Z2JtOUJjM05sY25RcFhHNGdJR1ZzYzJWY2JpQWdJQ0JmZDNKcGRHVlZTVzUwTVRZb1luVm1MQ0F3ZUdabVptWWdLeUIyWVd4MVpTQXJJREVzSUc5bVpuTmxkQ3dnYkdsMGRHeGxSVzVrYVdGdUxDQnViMEZ6YzJWeWRDbGNibjFjYmx4dVFuVm1abVZ5TG5CeWIzUnZkSGx3WlM1M2NtbDBaVWx1ZERFMlRFVWdQU0JtZFc1amRHbHZiaUFvZG1Gc2RXVXNJRzltWm5ObGRDd2dibTlCYzNObGNuUXBJSHRjYmlBZ1gzZHlhWFJsU1c1ME1UWW9kR2hwY3l3Z2RtRnNkV1VzSUc5bVpuTmxkQ3dnZEhKMVpTd2dibTlCYzNObGNuUXBYRzU5WEc1Y2JrSjFabVpsY2k1d2NtOTBiM1I1Y0dVdWQzSnBkR1ZKYm5ReE5rSkZJRDBnWm5WdVkzUnBiMjRnS0haaGJIVmxMQ0J2Wm1aelpYUXNJRzV2UVhOelpYSjBLU0I3WEc0Z0lGOTNjbWwwWlVsdWRERTJLSFJvYVhNc0lIWmhiSFZsTENCdlptWnpaWFFzSUdaaGJITmxMQ0J1YjBGemMyVnlkQ2xjYm4xY2JseHVablZ1WTNScGIyNGdYM2R5YVhSbFNXNTBNeklnS0dKMVppd2dkbUZzZFdVc0lHOW1abk5sZEN3Z2JHbDBkR3hsUlc1a2FXRnVMQ0J1YjBGemMyVnlkQ2tnZTF4dUlDQnBaaUFvSVc1dlFYTnpaWEowS1NCN1hHNGdJQ0FnWVhOelpYSjBLSFpoYkhWbElDRTlQU0IxYm1SbFptbHVaV1FnSmlZZ2RtRnNkV1VnSVQwOUlHNTFiR3dzSUNkdGFYTnphVzVuSUhaaGJIVmxKeWxjYmlBZ0lDQmhjM05sY25Rb2RIbHdaVzltSUd4cGRIUnNaVVZ1WkdsaGJpQTlQVDBnSjJKdmIyeGxZVzRuTENBbmJXbHpjMmx1WnlCdmNpQnBiblpoYkdsa0lHVnVaR2xoYmljcFhHNGdJQ0FnWVhOelpYSjBLRzltWm5ObGRDQWhQVDBnZFc1a1pXWnBibVZrSUNZbUlHOW1abk5sZENBaFBUMGdiblZzYkN3Z0oyMXBjM05wYm1jZ2IyWm1jMlYwSnlsY2JpQWdJQ0JoYzNObGNuUW9iMlptYzJWMElDc2dNeUE4SUdKMVppNXNaVzVuZEdnc0lDZFVjbmxwYm1jZ2RHOGdkM0pwZEdVZ1ltVjViMjVrSUdKMVptWmxjaUJzWlc1bmRHZ25LVnh1SUNBZ0lIWmxjbWxtYzJsdWRDaDJZV3gxWlN3Z01IZzNabVptWm1abVppd2dMVEI0T0RBd01EQXdNREFwWEc0Z0lIMWNibHh1SUNCMllYSWdiR1Z1SUQwZ1luVm1MbXhsYm1kMGFGeHVJQ0JwWmlBb2IyWm1jMlYwSUQ0OUlHeGxiaWxjYmlBZ0lDQnlaWFIxY201Y2JseHVJQ0JwWmlBb2RtRnNkV1VnUGowZ01DbGNiaUFnSUNCZmQzSnBkR1ZWU1c1ME16SW9ZblZtTENCMllXeDFaU3dnYjJabWMyVjBMQ0JzYVhSMGJHVkZibVJwWVc0c0lHNXZRWE56WlhKMEtWeHVJQ0JsYkhObFhHNGdJQ0FnWDNkeWFYUmxWVWx1ZERNeUtHSjFaaXdnTUhobVptWm1abVptWmlBcklIWmhiSFZsSUNzZ01Td2diMlptYzJWMExDQnNhWFIwYkdWRmJtUnBZVzRzSUc1dlFYTnpaWEowS1Z4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbmR5YVhSbFNXNTBNekpNUlNBOUlHWjFibU4wYVc5dUlDaDJZV3gxWlN3Z2IyWm1jMlYwTENCdWIwRnpjMlZ5ZENrZ2UxeHVJQ0JmZDNKcGRHVkpiblF6TWloMGFHbHpMQ0IyWVd4MVpTd2diMlptYzJWMExDQjBjblZsTENCdWIwRnpjMlZ5ZENsY2JuMWNibHh1UW5WbVptVnlMbkJ5YjNSdmRIbHdaUzUzY21sMFpVbHVkRE15UWtVZ1BTQm1kVzVqZEdsdmJpQW9kbUZzZFdVc0lHOW1abk5sZEN3Z2JtOUJjM05sY25RcElIdGNiaUFnWDNkeWFYUmxTVzUwTXpJb2RHaHBjeXdnZG1Gc2RXVXNJRzltWm5ObGRDd2dabUZzYzJVc0lHNXZRWE56WlhKMEtWeHVmVnh1WEc1bWRXNWpkR2x2YmlCZmQzSnBkR1ZHYkc5aGRDQW9ZblZtTENCMllXeDFaU3dnYjJabWMyVjBMQ0JzYVhSMGJHVkZibVJwWVc0c0lHNXZRWE56WlhKMEtTQjdYRzRnSUdsbUlDZ2hibTlCYzNObGNuUXBJSHRjYmlBZ0lDQmhjM05sY25Rb2RtRnNkV1VnSVQwOUlIVnVaR1ZtYVc1bFpDQW1KaUIyWVd4MVpTQWhQVDBnYm5Wc2JDd2dKMjFwYzNOcGJtY2dkbUZzZFdVbktWeHVJQ0FnSUdGemMyVnlkQ2gwZVhCbGIyWWdiR2wwZEd4bFJXNWthV0Z1SUQwOVBTQW5ZbTl2YkdWaGJpY3NJQ2R0YVhOemFXNW5JRzl5SUdsdWRtRnNhV1FnWlc1a2FXRnVKeWxjYmlBZ0lDQmhjM05sY25Rb2IyWm1jMlYwSUNFOVBTQjFibVJsWm1sdVpXUWdKaVlnYjJabWMyVjBJQ0U5UFNCdWRXeHNMQ0FuYldsemMybHVaeUJ2Wm1aelpYUW5LVnh1SUNBZ0lHRnpjMlZ5ZENodlptWnpaWFFnS3lBeklEd2dZblZtTG14bGJtZDBhQ3dnSjFSeWVXbHVaeUIwYnlCM2NtbDBaU0JpWlhsdmJtUWdZblZtWm1WeUlHeGxibWQwYUNjcFhHNGdJQ0FnZG1WeWFXWkpSVVZGTnpVMEtIWmhiSFZsTENBekxqUXdNamd5TXpRMk5qTTROVEk0T0RabEt6TTRMQ0F0TXk0ME1ESTRNak0wTmpZek9EVXlPRGcyWlNzek9DbGNiaUFnZlZ4dVhHNGdJSFpoY2lCc1pXNGdQU0JpZFdZdWJHVnVaM1JvWEc0Z0lHbG1JQ2h2Wm1aelpYUWdQajBnYkdWdUtWeHVJQ0FnSUhKbGRIVnlibHh1WEc0Z0lHbGxaV1UzTlRRdWQzSnBkR1VvWW5WbUxDQjJZV3gxWlN3Z2IyWm1jMlYwTENCc2FYUjBiR1ZGYm1ScFlXNHNJREl6TENBMEtWeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5keWFYUmxSbXh2WVhSTVJTQTlJR1oxYm1OMGFXOXVJQ2gyWVd4MVpTd2diMlptYzJWMExDQnViMEZ6YzJWeWRDa2dlMXh1SUNCZmQzSnBkR1ZHYkc5aGRDaDBhR2x6TENCMllXeDFaU3dnYjJabWMyVjBMQ0IwY25WbExDQnViMEZ6YzJWeWRDbGNibjFjYmx4dVFuVm1abVZ5TG5CeWIzUnZkSGx3WlM1M2NtbDBaVVpzYjJGMFFrVWdQU0JtZFc1amRHbHZiaUFvZG1Gc2RXVXNJRzltWm5ObGRDd2dibTlCYzNObGNuUXBJSHRjYmlBZ1gzZHlhWFJsUm14dllYUW9kR2hwY3l3Z2RtRnNkV1VzSUc5bVpuTmxkQ3dnWm1Gc2MyVXNJRzV2UVhOelpYSjBLVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmZkM0pwZEdWRWIzVmliR1VnS0dKMVppd2dkbUZzZFdVc0lHOW1abk5sZEN3Z2JHbDBkR3hsUlc1a2FXRnVMQ0J1YjBGemMyVnlkQ2tnZTF4dUlDQnBaaUFvSVc1dlFYTnpaWEowS1NCN1hHNGdJQ0FnWVhOelpYSjBLSFpoYkhWbElDRTlQU0IxYm1SbFptbHVaV1FnSmlZZ2RtRnNkV1VnSVQwOUlHNTFiR3dzSUNkdGFYTnphVzVuSUhaaGJIVmxKeWxjYmlBZ0lDQmhjM05sY25Rb2RIbHdaVzltSUd4cGRIUnNaVVZ1WkdsaGJpQTlQVDBnSjJKdmIyeGxZVzRuTENBbmJXbHpjMmx1WnlCdmNpQnBiblpoYkdsa0lHVnVaR2xoYmljcFhHNGdJQ0FnWVhOelpYSjBLRzltWm5ObGRDQWhQVDBnZFc1a1pXWnBibVZrSUNZbUlHOW1abk5sZENBaFBUMGdiblZzYkN3Z0oyMXBjM05wYm1jZ2IyWm1jMlYwSnlsY2JpQWdJQ0JoYzNObGNuUW9iMlptYzJWMElDc2dOeUE4SUdKMVppNXNaVzVuZEdnc1hHNGdJQ0FnSUNBZ0lDZFVjbmxwYm1jZ2RHOGdkM0pwZEdVZ1ltVjViMjVrSUdKMVptWmxjaUJzWlc1bmRHZ25LVnh1SUNBZ0lIWmxjbWxtU1VWRlJUYzFOQ2gyWVd4MVpTd2dNUzQzT1RjMk9UTXhNelE0TmpJek1UVTNSU3N6TURnc0lDMHhMamM1TnpZNU16RXpORGcyTWpNeE5UZEZLek13T0NsY2JpQWdmVnh1WEc0Z0lIWmhjaUJzWlc0Z1BTQmlkV1l1YkdWdVozUm9YRzRnSUdsbUlDaHZabVp6WlhRZ1BqMGdiR1Z1S1Z4dUlDQWdJSEpsZEhWeWJseHVYRzRnSUdsbFpXVTNOVFF1ZDNKcGRHVW9ZblZtTENCMllXeDFaU3dnYjJabWMyVjBMQ0JzYVhSMGJHVkZibVJwWVc0c0lEVXlMQ0E0S1Z4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbmR5YVhSbFJHOTFZbXhsVEVVZ1BTQm1kVzVqZEdsdmJpQW9kbUZzZFdVc0lHOW1abk5sZEN3Z2JtOUJjM05sY25RcElIdGNiaUFnWDNkeWFYUmxSRzkxWW14bEtIUm9hWE1zSUhaaGJIVmxMQ0J2Wm1aelpYUXNJSFJ5ZFdVc0lHNXZRWE56WlhKMEtWeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5keWFYUmxSRzkxWW14bFFrVWdQU0JtZFc1amRHbHZiaUFvZG1Gc2RXVXNJRzltWm5ObGRDd2dibTlCYzNObGNuUXBJSHRjYmlBZ1gzZHlhWFJsUkc5MVlteGxLSFJvYVhNc0lIWmhiSFZsTENCdlptWnpaWFFzSUdaaGJITmxMQ0J1YjBGemMyVnlkQ2xjYm4xY2JseHVMeThnWm1sc2JDaDJZV3gxWlN3Z2MzUmhjblE5TUN3Z1pXNWtQV0oxWm1abGNpNXNaVzVuZEdncFhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExtWnBiR3dnUFNCbWRXNWpkR2x2YmlBb2RtRnNkV1VzSUhOMFlYSjBMQ0JsYm1RcElIdGNiaUFnYVdZZ0tDRjJZV3gxWlNrZ2RtRnNkV1VnUFNBd1hHNGdJR2xtSUNnaGMzUmhjblFwSUhOMFlYSjBJRDBnTUZ4dUlDQnBaaUFvSVdWdVpDa2daVzVrSUQwZ2RHaHBjeTVzWlc1bmRHaGNibHh1SUNCcFppQW9kSGx3Wlc5bUlIWmhiSFZsSUQwOVBTQW5jM1J5YVc1bkp5a2dlMXh1SUNBZ0lIWmhiSFZsSUQwZ2RtRnNkV1V1WTJoaGNrTnZaR1ZCZENnd0tWeHVJQ0I5WEc1Y2JpQWdZWE56WlhKMEtIUjVjR1Z2WmlCMllXeDFaU0E5UFQwZ0oyNTFiV0psY2ljZ0ppWWdJV2x6VG1GT0tIWmhiSFZsS1N3Z0ozWmhiSFZsSUdseklHNXZkQ0JoSUc1MWJXSmxjaWNwWEc0Z0lHRnpjMlZ5ZENobGJtUWdQajBnYzNSaGNuUXNJQ2RsYm1RZ1BDQnpkR0Z5ZENjcFhHNWNiaUFnTHk4Z1JtbHNiQ0F3SUdKNWRHVnpPeUIzWlNkeVpTQmtiMjVsWEc0Z0lHbG1JQ2hsYm1RZ1BUMDlJSE4wWVhKMEtTQnlaWFIxY201Y2JpQWdhV1lnS0hSb2FYTXViR1Z1WjNSb0lEMDlQU0F3S1NCeVpYUjFjbTVjYmx4dUlDQmhjM05sY25Rb2MzUmhjblFnUGowZ01DQW1KaUJ6ZEdGeWRDQThJSFJvYVhNdWJHVnVaM1JvTENBbmMzUmhjblFnYjNWMElHOW1JR0p2ZFc1a2N5Y3BYRzRnSUdGemMyVnlkQ2hsYm1RZ1BqMGdNQ0FtSmlCbGJtUWdQRDBnZEdocGN5NXNaVzVuZEdnc0lDZGxibVFnYjNWMElHOW1JR0p2ZFc1a2N5Y3BYRzVjYmlBZ1ptOXlJQ2gyWVhJZ2FTQTlJSE4wWVhKME95QnBJRHdnWlc1a095QnBLeXNwSUh0Y2JpQWdJQ0IwYUdselcybGRJRDBnZG1Gc2RXVmNiaUFnZlZ4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbWx1YzNCbFkzUWdQU0JtZFc1amRHbHZiaUFvS1NCN1hHNGdJSFpoY2lCdmRYUWdQU0JiWFZ4dUlDQjJZWElnYkdWdUlEMGdkR2hwY3k1c1pXNW5kR2hjYmlBZ1ptOXlJQ2gyWVhJZ2FTQTlJREE3SUdrZ1BDQnNaVzQ3SUdrckt5a2dlMXh1SUNBZ0lHOTFkRnRwWFNBOUlIUnZTR1Y0S0hSb2FYTmJhVjBwWEc0Z0lDQWdhV1lnS0drZ1BUMDlJR1Y0Y0c5eWRITXVTVTVUVUVWRFZGOU5RVmhmUWxsVVJWTXBJSHRjYmlBZ0lDQWdJRzkxZEZ0cElDc2dNVjBnUFNBbkxpNHVKMXh1SUNBZ0lDQWdZbkpsWVd0Y2JpQWdJQ0I5WEc0Z0lIMWNiaUFnY21WMGRYSnVJQ2M4UW5WbVptVnlJQ2NnS3lCdmRYUXVhbTlwYmlnbklDY3BJQ3NnSno0blhHNTlYRzVjYmk4cUtseHVJQ29nUTNKbFlYUmxjeUJoSUc1bGR5QmdRWEp5WVhsQ2RXWm1aWEpnSUhkcGRHZ2dkR2hsSUNwamIzQnBaV1FxSUcxbGJXOXllU0J2WmlCMGFHVWdZblZtWm1WeUlHbHVjM1JoYm1ObExseHVJQ29nUVdSa1pXUWdhVzRnVG05a1pTQXdMakV5TGlCUGJteDVJR0YyWVdsc1lXSnNaU0JwYmlCaWNtOTNjMlZ5Y3lCMGFHRjBJSE4xY0hCdmNuUWdRWEp5WVhsQ2RXWm1aWEl1WEc0Z0tpOWNia0oxWm1abGNpNXdjbTkwYjNSNWNHVXVkRzlCY25KaGVVSjFabVpsY2lBOUlHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ2FXWWdLSFI1Y0dWdlppQlZhVzUwT0VGeWNtRjVJQ0U5UFNBbmRXNWtaV1pwYm1Wa0p5a2dlMXh1SUNBZ0lHbG1JQ2hDZFdabVpYSXVYM1Z6WlZSNWNHVmtRWEp5WVhsektTQjdYRzRnSUNBZ0lDQnlaWFIxY200Z0tHNWxkeUJDZFdabVpYSW9kR2hwY3lrcExtSjFabVpsY2x4dUlDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQjJZWElnWW5WbUlEMGdibVYzSUZWcGJuUTRRWEp5WVhrb2RHaHBjeTVzWlc1bmRHZ3BYRzRnSUNBZ0lDQm1iM0lnS0haaGNpQnBJRDBnTUN3Z2JHVnVJRDBnWW5WbUxteGxibWQwYURzZ2FTQThJR3hsYmpzZ2FTQXJQU0F4S1Z4dUlDQWdJQ0FnSUNCaWRXWmJhVjBnUFNCMGFHbHpXMmxkWEc0Z0lDQWdJQ0J5WlhSMWNtNGdZblZtTG1KMVptWmxjbHh1SUNBZ0lIMWNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQjBhSEp2ZHlCdVpYY2dSWEp5YjNJb0owSjFabVpsY2k1MGIwRnljbUY1UW5WbVptVnlJRzV2ZENCemRYQndiM0owWldRZ2FXNGdkR2hwY3lCaWNtOTNjMlZ5SnlsY2JpQWdmVnh1ZlZ4dVhHNHZMeUJJUlV4UVJWSWdSbFZPUTFSSlQwNVRYRzR2THlBOVBUMDlQVDA5UFQwOVBUMDlQVDA5WEc1Y2JtWjFibU4wYVc5dUlITjBjbWx1WjNSeWFXMGdLSE4wY2lrZ2UxeHVJQ0JwWmlBb2MzUnlMblJ5YVcwcElISmxkSFZ5YmlCemRISXVkSEpwYlNncFhHNGdJSEpsZEhWeWJpQnpkSEl1Y21Wd2JHRmpaU2d2WGx4Y2N5dDhYRnh6S3lRdlp5d2dKeWNwWEc1OVhHNWNiblpoY2lCQ1VDQTlJRUoxWm1abGNpNXdjbTkwYjNSNWNHVmNibHh1THlvcVhHNGdLaUJCZFdkdFpXNTBJR0VnVldsdWREaEJjbkpoZVNBcWFXNXpkR0Z1WTJVcUlDaHViM1FnZEdobElGVnBiblE0UVhKeVlYa2dZMnhoYzNNaEtTQjNhWFJvSUVKMVptWmxjaUJ0WlhSb2IyUnpYRzRnS2k5Y2JrSjFabVpsY2k1ZllYVm5iV1Z1ZENBOUlHWjFibU4wYVc5dUlDaGhjbklwSUh0Y2JpQWdZWEp5TGw5cGMwSjFabVpsY2lBOUlIUnlkV1ZjYmx4dUlDQXZMeUJ6WVhabElISmxabVZ5Wlc1alpTQjBieUJ2Y21sbmFXNWhiQ0JWYVc1ME9FRnljbUY1SUdkbGRDOXpaWFFnYldWMGFHOWtjeUJpWldadmNtVWdiM1psY25keWFYUnBibWRjYmlBZ1lYSnlMbDluWlhRZ1BTQmhjbkl1WjJWMFhHNGdJR0Z5Y2k1ZmMyVjBJRDBnWVhKeUxuTmxkRnh1WEc0Z0lDOHZJR1JsY0hKbFkyRjBaV1FzSUhkcGJHd2dZbVVnY21WdGIzWmxaQ0JwYmlCdWIyUmxJREF1TVRNclhHNGdJR0Z5Y2k1blpYUWdQU0JDVUM1blpYUmNiaUFnWVhKeUxuTmxkQ0E5SUVKUUxuTmxkRnh1WEc0Z0lHRnljaTUzY21sMFpTQTlJRUpRTG5keWFYUmxYRzRnSUdGeWNpNTBiMU4wY21sdVp5QTlJRUpRTG5SdlUzUnlhVzVuWEc0Z0lHRnljaTUwYjB4dlkyRnNaVk4wY21sdVp5QTlJRUpRTG5SdlUzUnlhVzVuWEc0Z0lHRnljaTUwYjBwVFQwNGdQU0JDVUM1MGIwcFRUMDVjYmlBZ1lYSnlMbU52Y0hrZ1BTQkNVQzVqYjNCNVhHNGdJR0Z5Y2k1emJHbGpaU0E5SUVKUUxuTnNhV05sWEc0Z0lHRnljaTV5WldGa1ZVbHVkRGdnUFNCQ1VDNXlaV0ZrVlVsdWREaGNiaUFnWVhKeUxuSmxZV1JWU1c1ME1UWk1SU0E5SUVKUUxuSmxZV1JWU1c1ME1UWk1SVnh1SUNCaGNuSXVjbVZoWkZWSmJuUXhOa0pGSUQwZ1FsQXVjbVZoWkZWSmJuUXhOa0pGWEc0Z0lHRnljaTV5WldGa1ZVbHVkRE15VEVVZ1BTQkNVQzV5WldGa1ZVbHVkRE15VEVWY2JpQWdZWEp5TG5KbFlXUlZTVzUwTXpKQ1JTQTlJRUpRTG5KbFlXUlZTVzUwTXpKQ1JWeHVJQ0JoY25JdWNtVmhaRWx1ZERnZ1BTQkNVQzV5WldGa1NXNTBPRnh1SUNCaGNuSXVjbVZoWkVsdWRERTJURVVnUFNCQ1VDNXlaV0ZrU1c1ME1UWk1SVnh1SUNCaGNuSXVjbVZoWkVsdWRERTJRa1VnUFNCQ1VDNXlaV0ZrU1c1ME1UWkNSVnh1SUNCaGNuSXVjbVZoWkVsdWRETXlURVVnUFNCQ1VDNXlaV0ZrU1c1ME16Sk1SVnh1SUNCaGNuSXVjbVZoWkVsdWRETXlRa1VnUFNCQ1VDNXlaV0ZrU1c1ME16SkNSVnh1SUNCaGNuSXVjbVZoWkVac2IyRjBURVVnUFNCQ1VDNXlaV0ZrUm14dllYUk1SVnh1SUNCaGNuSXVjbVZoWkVac2IyRjBRa1VnUFNCQ1VDNXlaV0ZrUm14dllYUkNSVnh1SUNCaGNuSXVjbVZoWkVSdmRXSnNaVXhGSUQwZ1FsQXVjbVZoWkVSdmRXSnNaVXhGWEc0Z0lHRnljaTV5WldGa1JHOTFZbXhsUWtVZ1BTQkNVQzV5WldGa1JHOTFZbXhsUWtWY2JpQWdZWEp5TG5keWFYUmxWVWx1ZERnZ1BTQkNVQzUzY21sMFpWVkpiblE0WEc0Z0lHRnljaTUzY21sMFpWVkpiblF4Tmt4RklEMGdRbEF1ZDNKcGRHVlZTVzUwTVRaTVJWeHVJQ0JoY25JdWQzSnBkR1ZWU1c1ME1UWkNSU0E5SUVKUUxuZHlhWFJsVlVsdWRERTJRa1ZjYmlBZ1lYSnlMbmR5YVhSbFZVbHVkRE15VEVVZ1BTQkNVQzUzY21sMFpWVkpiblF6TWt4RlhHNGdJR0Z5Y2k1M2NtbDBaVlZKYm5Rek1rSkZJRDBnUWxBdWQzSnBkR1ZWU1c1ME16SkNSVnh1SUNCaGNuSXVkM0pwZEdWSmJuUTRJRDBnUWxBdWQzSnBkR1ZKYm5RNFhHNGdJR0Z5Y2k1M2NtbDBaVWx1ZERFMlRFVWdQU0JDVUM1M2NtbDBaVWx1ZERFMlRFVmNiaUFnWVhKeUxuZHlhWFJsU1c1ME1UWkNSU0E5SUVKUUxuZHlhWFJsU1c1ME1UWkNSVnh1SUNCaGNuSXVkM0pwZEdWSmJuUXpNa3hGSUQwZ1FsQXVkM0pwZEdWSmJuUXpNa3hGWEc0Z0lHRnljaTUzY21sMFpVbHVkRE15UWtVZ1BTQkNVQzUzY21sMFpVbHVkRE15UWtWY2JpQWdZWEp5TG5keWFYUmxSbXh2WVhSTVJTQTlJRUpRTG5keWFYUmxSbXh2WVhSTVJWeHVJQ0JoY25JdWQzSnBkR1ZHYkc5aGRFSkZJRDBnUWxBdWQzSnBkR1ZHYkc5aGRFSkZYRzRnSUdGeWNpNTNjbWwwWlVSdmRXSnNaVXhGSUQwZ1FsQXVkM0pwZEdWRWIzVmliR1ZNUlZ4dUlDQmhjbkl1ZDNKcGRHVkViM1ZpYkdWQ1JTQTlJRUpRTG5keWFYUmxSRzkxWW14bFFrVmNiaUFnWVhKeUxtWnBiR3dnUFNCQ1VDNW1hV3hzWEc0Z0lHRnljaTVwYm5Od1pXTjBJRDBnUWxBdWFXNXpjR1ZqZEZ4dUlDQmhjbkl1ZEc5QmNuSmhlVUoxWm1abGNpQTlJRUpRTG5SdlFYSnlZWGxDZFdabVpYSmNibHh1SUNCeVpYUjFjbTRnWVhKeVhHNTlYRzVjYmk4dklITnNhV05sS0hOMFlYSjBMQ0JsYm1RcFhHNW1kVzVqZEdsdmJpQmpiR0Z0Y0NBb2FXNWtaWGdzSUd4bGJpd2daR1ZtWVhWc2RGWmhiSFZsS1NCN1hHNGdJR2xtSUNoMGVYQmxiMllnYVc1a1pYZ2dJVDA5SUNkdWRXMWlaWEluS1NCeVpYUjFjbTRnWkdWbVlYVnNkRlpoYkhWbFhHNGdJR2x1WkdWNElEMGdmbjVwYm1SbGVEc2dJQzh2SUVOdlpYSmpaU0IwYnlCcGJuUmxaMlZ5TGx4dUlDQnBaaUFvYVc1a1pYZ2dQajBnYkdWdUtTQnlaWFIxY200Z2JHVnVYRzRnSUdsbUlDaHBibVJsZUNBK1BTQXdLU0J5WlhSMWNtNGdhVzVrWlhoY2JpQWdhVzVrWlhnZ0t6MGdiR1Z1WEc0Z0lHbG1JQ2hwYm1SbGVDQStQU0F3S1NCeVpYUjFjbTRnYVc1a1pYaGNiaUFnY21WMGRYSnVJREJjYm4xY2JseHVablZ1WTNScGIyNGdZMjlsY21ObElDaHNaVzVuZEdncElIdGNiaUFnTHk4Z1EyOWxjbU5sSUd4bGJtZDBhQ0IwYnlCaElHNTFiV0psY2lBb2NHOXpjMmxpYkhrZ1RtRk9LU3dnY205MWJtUWdkWEJjYmlBZ0x5OGdhVzRnWTJGelpTQnBkQ2R6SUdaeVlXTjBhVzl1WVd3Z0tHVXVaeTRnTVRJekxqUTFOaWtnZEdobGJpQmtieUJoWEc0Z0lDOHZJR1J2ZFdKc1pTQnVaV2RoZEdVZ2RHOGdZMjlsY21ObElHRWdUbUZPSUhSdklEQXVJRVZoYzNrc0lISnBaMmgwUDF4dUlDQnNaVzVuZEdnZ1BTQitmazFoZEdndVkyVnBiQ2dyYkdWdVozUm9LVnh1SUNCeVpYUjFjbTRnYkdWdVozUm9JRHdnTUNBL0lEQWdPaUJzWlc1bmRHaGNibjFjYmx4dVpuVnVZM1JwYjI0Z2FYTkJjbkpoZVNBb2MzVmlhbVZqZENrZ2UxeHVJQ0J5WlhSMWNtNGdLRUZ5Y21GNUxtbHpRWEp5WVhrZ2ZId2dablZ1WTNScGIyNGdLSE4xWW1wbFkzUXBJSHRjYmlBZ0lDQnlaWFIxY200Z1QySnFaV04wTG5CeWIzUnZkSGx3WlM1MGIxTjBjbWx1Wnk1allXeHNLSE4xWW1wbFkzUXBJRDA5UFNBblcyOWlhbVZqZENCQmNuSmhlVjBuWEc0Z0lIMHBLSE4xWW1wbFkzUXBYRzU5WEc1Y2JtWjFibU4wYVc5dUlHbHpRWEp5WVhscGMyZ2dLSE4xWW1wbFkzUXBJSHRjYmlBZ2NtVjBkWEp1SUdselFYSnlZWGtvYzNWaWFtVmpkQ2tnZkh3Z1FuVm1abVZ5TG1selFuVm1abVZ5S0hOMVltcGxZM1FwSUh4OFhHNGdJQ0FnSUNCemRXSnFaV04wSUNZbUlIUjVjR1Z2WmlCemRXSnFaV04wSUQwOVBTQW5iMkpxWldOMEp5QW1KbHh1SUNBZ0lDQWdkSGx3Wlc5bUlITjFZbXBsWTNRdWJHVnVaM1JvSUQwOVBTQW5iblZ0WW1WeUoxeHVmVnh1WEc1bWRXNWpkR2x2YmlCMGIwaGxlQ0FvYmlrZ2UxeHVJQ0JwWmlBb2JpQThJREUyS1NCeVpYUjFjbTRnSnpBbklDc2diaTUwYjFOMGNtbHVaeWd4TmlsY2JpQWdjbVYwZFhKdUlHNHVkRzlUZEhKcGJtY29NVFlwWEc1OVhHNWNibVoxYm1OMGFXOXVJSFYwWmpoVWIwSjVkR1Z6SUNoemRISXBJSHRjYmlBZ2RtRnlJR0o1ZEdWQmNuSmhlU0E5SUZ0ZFhHNGdJR1p2Y2lBb2RtRnlJR2tnUFNBd095QnBJRHdnYzNSeUxteGxibWQwYURzZ2FTc3JLU0I3WEc0Z0lDQWdkbUZ5SUdJZ1BTQnpkSEl1WTJoaGNrTnZaR1ZCZENocEtWeHVJQ0FnSUdsbUlDaGlJRHc5SURCNE4wWXBYRzRnSUNBZ0lDQmllWFJsUVhKeVlYa3VjSFZ6YUNoemRISXVZMmhoY2tOdlpHVkJkQ2hwS1NsY2JpQWdJQ0JsYkhObElIdGNiaUFnSUNBZ0lIWmhjaUJ6ZEdGeWRDQTlJR2xjYmlBZ0lDQWdJR2xtSUNoaUlENDlJREI0UkRnd01DQW1KaUJpSUR3OUlEQjRSRVpHUmlrZ2FTc3JYRzRnSUNBZ0lDQjJZWElnYUNBOUlHVnVZMjlrWlZWU1NVTnZiWEJ2Ym1WdWRDaHpkSEl1YzJ4cFkyVW9jM1JoY25Rc0lHa3JNU2twTG5OMVluTjBjaWd4S1M1emNHeHBkQ2duSlNjcFhHNGdJQ0FnSUNCbWIzSWdLSFpoY2lCcUlEMGdNRHNnYWlBOElHZ3ViR1Z1WjNSb095QnFLeXNwWEc0Z0lDQWdJQ0FnSUdKNWRHVkJjbkpoZVM1d2RYTm9LSEJoY25ObFNXNTBLR2hiYWwwc0lERTJLU2xjYmlBZ0lDQjlYRzRnSUgxY2JpQWdjbVYwZFhKdUlHSjVkR1ZCY25KaGVWeHVmVnh1WEc1bWRXNWpkR2x2YmlCaGMyTnBhVlJ2UW5sMFpYTWdLSE4wY2lrZ2UxeHVJQ0IyWVhJZ1lubDBaVUZ5Y21GNUlEMGdXMTFjYmlBZ1ptOXlJQ2gyWVhJZ2FTQTlJREE3SUdrZ1BDQnpkSEl1YkdWdVozUm9PeUJwS3lzcElIdGNiaUFnSUNBdkx5Qk9iMlJsSjNNZ1kyOWtaU0J6WldWdGN5QjBieUJpWlNCa2IybHVaeUIwYUdseklHRnVaQ0J1YjNRZ0ppQXdlRGRHTGk1Y2JpQWdJQ0JpZVhSbFFYSnlZWGt1Y0hWemFDaHpkSEl1WTJoaGNrTnZaR1ZCZENocEtTQW1JREI0UmtZcFhHNGdJSDFjYmlBZ2NtVjBkWEp1SUdKNWRHVkJjbkpoZVZ4dWZWeHVYRzVtZFc1amRHbHZiaUIxZEdZeE5teGxWRzlDZVhSbGN5QW9jM1J5S1NCN1hHNGdJSFpoY2lCakxDQm9hU3dnYkc5Y2JpQWdkbUZ5SUdKNWRHVkJjbkpoZVNBOUlGdGRYRzRnSUdadmNpQW9kbUZ5SUdrZ1BTQXdPeUJwSUR3Z2MzUnlMbXhsYm1kMGFEc2dhU3NyS1NCN1hHNGdJQ0FnWXlBOUlITjBjaTVqYUdGeVEyOWtaVUYwS0drcFhHNGdJQ0FnYUdrZ1BTQmpJRDQrSURoY2JpQWdJQ0JzYnlBOUlHTWdKU0F5TlRaY2JpQWdJQ0JpZVhSbFFYSnlZWGt1Y0hWemFDaHNieWxjYmlBZ0lDQmllWFJsUVhKeVlYa3VjSFZ6YUNob2FTbGNiaUFnZlZ4dVhHNGdJSEpsZEhWeWJpQmllWFJsUVhKeVlYbGNibjFjYmx4dVpuVnVZM1JwYjI0Z1ltRnpaVFkwVkc5Q2VYUmxjeUFvYzNSeUtTQjdYRzRnSUhKbGRIVnliaUJpWVhObE5qUXVkRzlDZVhSbFFYSnlZWGtvYzNSeUtWeHVmVnh1WEc1bWRXNWpkR2x2YmlCaWJHbDBRblZtWm1WeUlDaHpjbU1zSUdSemRDd2diMlptYzJWMExDQnNaVzVuZEdncElIdGNiaUFnZG1GeUlIQnZjMXh1SUNCbWIzSWdLSFpoY2lCcElEMGdNRHNnYVNBOElHeGxibWQwYURzZ2FTc3JLU0I3WEc0Z0lDQWdhV1lnS0NocElDc2diMlptYzJWMElENDlJR1J6ZEM1c1pXNW5kR2dwSUh4OElDaHBJRDQ5SUhOeVl5NXNaVzVuZEdncEtWeHVJQ0FnSUNBZ1luSmxZV3RjYmlBZ0lDQmtjM1JiYVNBcklHOW1abk5sZEYwZ1BTQnpjbU5iYVYxY2JpQWdmVnh1SUNCeVpYUjFjbTRnYVZ4dWZWeHVYRzVtZFc1amRHbHZiaUJrWldOdlpHVlZkR1k0UTJoaGNpQW9jM1J5S1NCN1hHNGdJSFJ5ZVNCN1hHNGdJQ0FnY21WMGRYSnVJR1JsWTI5a1pWVlNTVU52YlhCdmJtVnVkQ2h6ZEhJcFhHNGdJSDBnWTJGMFkyZ2dLR1Z5Y2lrZ2UxeHVJQ0FnSUhKbGRIVnliaUJUZEhKcGJtY3Vabkp2YlVOb1lYSkRiMlJsS0RCNFJrWkdSQ2tnTHk4Z1ZWUkdJRGdnYVc1MllXeHBaQ0JqYUdGeVhHNGdJSDFjYm4xY2JseHVMeXBjYmlBcUlGZGxJR2hoZG1VZ2RHOGdiV0ZyWlNCemRYSmxJSFJvWVhRZ2RHaGxJSFpoYkhWbElHbHpJR0VnZG1Gc2FXUWdhVzUwWldkbGNpNGdWR2hwY3lCdFpXRnVjeUIwYUdGMElHbDBYRzRnS2lCcGN5QnViMjR0Ym1WbllYUnBkbVV1SUVsMElHaGhjeUJ1YnlCbWNtRmpkR2x2Ym1Gc0lHTnZiWEJ2Ym1WdWRDQmhibVFnZEdoaGRDQnBkQ0JrYjJWeklHNXZkRnh1SUNvZ1pYaGpaV1ZrSUhSb1pTQnRZWGhwYlhWdElHRnNiRzkzWldRZ2RtRnNkV1V1WEc0Z0tpOWNibVoxYm1OMGFXOXVJSFpsY21sbWRXbHVkQ0FvZG1Gc2RXVXNJRzFoZUNrZ2UxeHVJQ0JoYzNObGNuUW9kSGx3Wlc5bUlIWmhiSFZsSUQwOVBTQW5iblZ0WW1WeUp5d2dKMk5oYm01dmRDQjNjbWwwWlNCaElHNXZiaTF1ZFcxaVpYSWdZWE1nWVNCdWRXMWlaWEluS1Z4dUlDQmhjM05sY25Rb2RtRnNkV1VnUGowZ01Dd2dKM053WldOcFptbGxaQ0JoSUc1bFoyRjBhWFpsSUhaaGJIVmxJR1p2Y2lCM2NtbDBhVzVuSUdGdUlIVnVjMmxuYm1Wa0lIWmhiSFZsSnlsY2JpQWdZWE56WlhKMEtIWmhiSFZsSUR3OUlHMWhlQ3dnSjNaaGJIVmxJR2x6SUd4aGNtZGxjaUIwYUdGdUlHMWhlR2x0ZFcwZ2RtRnNkV1VnWm05eUlIUjVjR1VuS1Z4dUlDQmhjM05sY25Rb1RXRjBhQzVtYkc5dmNpaDJZV3gxWlNrZ1BUMDlJSFpoYkhWbExDQW5kbUZzZFdVZ2FHRnpJR0VnWm5KaFkzUnBiMjVoYkNCamIyMXdiMjVsYm5RbktWeHVmVnh1WEc1bWRXNWpkR2x2YmlCMlpYSnBabk5wYm5RZ0tIWmhiSFZsTENCdFlYZ3NJRzFwYmlrZ2UxeHVJQ0JoYzNObGNuUW9kSGx3Wlc5bUlIWmhiSFZsSUQwOVBTQW5iblZ0WW1WeUp5d2dKMk5oYm01dmRDQjNjbWwwWlNCaElHNXZiaTF1ZFcxaVpYSWdZWE1nWVNCdWRXMWlaWEluS1Z4dUlDQmhjM05sY25Rb2RtRnNkV1VnUEQwZ2JXRjRMQ0FuZG1Gc2RXVWdiR0Z5WjJWeUlIUm9ZVzRnYldGNGFXMTFiU0JoYkd4dmQyVmtJSFpoYkhWbEp5bGNiaUFnWVhOelpYSjBLSFpoYkhWbElENDlJRzFwYml3Z0ozWmhiSFZsSUhOdFlXeHNaWElnZEdoaGJpQnRhVzVwYlhWdElHRnNiRzkzWldRZ2RtRnNkV1VuS1Z4dUlDQmhjM05sY25Rb1RXRjBhQzVtYkc5dmNpaDJZV3gxWlNrZ1BUMDlJSFpoYkhWbExDQW5kbUZzZFdVZ2FHRnpJR0VnWm5KaFkzUnBiMjVoYkNCamIyMXdiMjVsYm5RbktWeHVmVnh1WEc1bWRXNWpkR2x2YmlCMlpYSnBaa2xGUlVVM05UUWdLSFpoYkhWbExDQnRZWGdzSUcxcGJpa2dlMXh1SUNCaGMzTmxjblFvZEhsd1pXOW1JSFpoYkhWbElEMDlQU0FuYm5WdFltVnlKeXdnSjJOaGJtNXZkQ0IzY21sMFpTQmhJRzV2YmkxdWRXMWlaWElnWVhNZ1lTQnVkVzFpWlhJbktWeHVJQ0JoYzNObGNuUW9kbUZzZFdVZ1BEMGdiV0Y0TENBbmRtRnNkV1VnYkdGeVoyVnlJSFJvWVc0Z2JXRjRhVzExYlNCaGJHeHZkMlZrSUhaaGJIVmxKeWxjYmlBZ1lYTnpaWEowS0haaGJIVmxJRDQ5SUcxcGJpd2dKM1poYkhWbElITnRZV3hzWlhJZ2RHaGhiaUJ0YVc1cGJYVnRJR0ZzYkc5M1pXUWdkbUZzZFdVbktWeHVmVnh1WEc1bWRXNWpkR2x2YmlCaGMzTmxjblFnS0hSbGMzUXNJRzFsYzNOaFoyVXBJSHRjYmlBZ2FXWWdLQ0YwWlhOMEtTQjBhSEp2ZHlCdVpYY2dSWEp5YjNJb2JXVnpjMkZuWlNCOGZDQW5SbUZwYkdWa0lHRnpjMlZ5ZEdsdmJpY3BYRzU5WEc0aVhYMD1cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXGJ1ZmZlclxcXFxpbmRleC5qc1wiLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxidWZmZXJcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG5cInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG07XG4gIHZhciBlTGVuID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxO1xuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMTtcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxO1xuICB2YXIgbkJpdHMgPSAtNztcbiAgdmFyIGkgPSBpc0xFID8gbkJ5dGVzIC0gMSA6IDA7XG4gIHZhciBkID0gaXNMRSA/IC0xIDogMTtcbiAgdmFyIHMgPSBidWZmZXJbb2Zmc2V0ICsgaV07XG5cbiAgaSArPSBkO1xuXG4gIGUgPSBzICYgKDEgPDwgLW5CaXRzKSAtIDE7XG4gIHMgPj49IC1uQml0cztcbiAgbkJpdHMgKz0gZUxlbjtcbiAgZm9yICg7IG5CaXRzID4gMDsgZSA9IGUgKiAyNTYgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBtID0gZSAmICgxIDw8IC1uQml0cykgLSAxO1xuICBlID4+PSAtbkJpdHM7XG4gIG5CaXRzICs9IG1MZW47XG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSBtICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgaWYgKGUgPT09IDApIHtcbiAgICBlID0gMSAtIGVCaWFzO1xuICB9IGVsc2UgaWYgKGUgPT09IGVNYXgpIHtcbiAgICByZXR1cm4gbSA/IE5hTiA6IChzID8gLTEgOiAxKSAqIEluZmluaXR5O1xuICB9IGVsc2Uge1xuICAgIG0gPSBtICsgTWF0aC5wb3coMiwgbUxlbik7XG4gICAgZSA9IGUgLSBlQmlhcztcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKTtcbn07XG5cbmV4cG9ydHMud3JpdGUgPSBmdW5jdGlvbiAoYnVmZmVyLCB2YWx1ZSwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG0sIGM7XG4gIHZhciBlTGVuID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxO1xuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMTtcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxO1xuICB2YXIgcnQgPSBtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMDtcbiAgdmFyIGkgPSBpc0xFID8gMCA6IG5CeXRlcyAtIDE7XG4gIHZhciBkID0gaXNMRSA/IDEgOiAtMTtcbiAgdmFyIHMgPSB2YWx1ZSA8IDAgfHwgdmFsdWUgPT09IDAgJiYgMSAvIHZhbHVlIDwgMCA/IDEgOiAwO1xuXG4gIHZhbHVlID0gTWF0aC5hYnModmFsdWUpO1xuXG4gIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IEluZmluaXR5KSB7XG4gICAgbSA9IGlzTmFOKHZhbHVlKSA/IDEgOiAwO1xuICAgIGUgPSBlTWF4O1xuICB9IGVsc2Uge1xuICAgIGUgPSBNYXRoLmZsb29yKE1hdGgubG9nKHZhbHVlKSAvIE1hdGguTE4yKTtcbiAgICBpZiAodmFsdWUgKiAoYyA9IE1hdGgucG93KDIsIC1lKSkgPCAxKSB7XG4gICAgICBlLS07XG4gICAgICBjICo9IDI7XG4gICAgfVxuICAgIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgdmFsdWUgKz0gcnQgLyBjO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIE1hdGgucG93KDIsIDEgLSBlQmlhcyk7XG4gICAgfVxuICAgIGlmICh2YWx1ZSAqIGMgPj0gMikge1xuICAgICAgZSsrO1xuICAgICAgYyAvPSAyO1xuICAgIH1cblxuICAgIGlmIChlICsgZUJpYXMgPj0gZU1heCkge1xuICAgICAgbSA9IDA7XG4gICAgICBlID0gZU1heDtcbiAgICB9IGVsc2UgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICBtID0gKHZhbHVlICogYyAtIDEpICogTWF0aC5wb3coMiwgbUxlbik7XG4gICAgICBlID0gZSArIGVCaWFzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gdmFsdWUgKiBNYXRoLnBvdygyLCBlQmlhcyAtIDEpICogTWF0aC5wb3coMiwgbUxlbik7XG4gICAgICBlID0gMDtcbiAgICB9XG4gIH1cblxuICBmb3IgKDsgbUxlbiA+PSA4OyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBtICYgMHhmZiwgaSArPSBkLCBtIC89IDI1NiwgbUxlbiAtPSA4KSB7fVxuXG4gIGUgPSBlIDw8IG1MZW4gfCBtO1xuICBlTGVuICs9IG1MZW47XG4gIGZvciAoOyBlTGVuID4gMDsgYnVmZmVyW29mZnNldCArIGldID0gZSAmIDB4ZmYsIGkgKz0gZCwgZSAvPSAyNTYsIGVMZW4gLT0gOCkge31cblxuICBidWZmZXJbb2Zmc2V0ICsgaSAtIGRdIHw9IHMgKiAxMjg7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW1sdVpHVjRMbXB6SWwwc0ltNWhiV1Z6SWpwYkltVjRjRzl5ZEhNaUxDSnlaV0ZrSWl3aVluVm1abVZ5SWl3aWIyWm1jMlYwSWl3aWFYTk1SU0lzSW0xTVpXNGlMQ0p1UW5sMFpYTWlMQ0psSWl3aWJTSXNJbVZNWlc0aUxDSmxUV0Y0SWl3aVpVSnBZWE1pTENKdVFtbDBjeUlzSW1raUxDSmtJaXdpY3lJc0lrNWhUaUlzSWtsdVptbHVhWFI1SWl3aVRXRjBhQ0lzSW5CdmR5SXNJbmR5YVhSbElpd2lkbUZzZFdVaUxDSmpJaXdpY25RaUxDSmhZbk1pTENKcGMwNWhUaUlzSW1ac2IyOXlJaXdpYkc5bklpd2lURTR5SWwwc0ltMWhjSEJwYm1keklqb2lPenRCUVVGQlFTeFJRVUZSUXl4SlFVRlNMRWRCUVdVc1ZVRkJWVU1zVFVGQlZpeEZRVUZyUWtNc1RVRkJiRUlzUlVGQk1FSkRMRWxCUVRGQ0xFVkJRV2REUXl4SlFVRm9ReXhGUVVGelEwTXNUVUZCZEVNc1JVRkJPRU03UVVGRE0wUXNUVUZCU1VNc1EwRkJTaXhGUVVGUFF5eERRVUZRTzBGQlEwRXNUVUZCU1VNc1QwRkJUMGdzVTBGQlV5eERRVUZVTEVkQlFXRkVMRWxCUVdJc1IwRkJiMElzUTBGQkwwSTdRVUZEUVN4TlFVRkpTeXhQUVVGUExFTkJRVU1zUzBGQlMwUXNTVUZCVGl4SlFVRmpMRU5CUVhwQ08wRkJRMEVzVFVGQlNVVXNVVUZCVVVRc1VVRkJVU3hEUVVGd1FqdEJRVU5CTEUxQlFVbEZMRkZCUVZFc1EwRkJReXhEUVVGaU8wRkJRMEVzVFVGQlNVTXNTVUZCU1ZRc1QwRkJVVVVzVTBGQlV5eERRVUZxUWl4SFFVRnpRaXhEUVVFNVFqdEJRVU5CTEUxQlFVbFJMRWxCUVVsV0xFOUJRVThzUTBGQlF5eERRVUZTTEVkQlFWa3NRMEZCY0VJN1FVRkRRU3hOUVVGSlZ5eEpRVUZKWWl4UFFVRlBReXhUUVVGVFZTeERRVUZvUWl4RFFVRlNPenRCUVVWQlFTeFBRVUZMUXl4RFFVRk1PenRCUVVWQlVDeE5RVUZKVVN4SlFVRkxMRU5CUVVNc1MwRkJUU3hEUVVGRFNDeExRVUZTTEVsQlFXdENMRU5CUVROQ08wRkJRMEZITEZGQlFVOHNRMEZCUTBnc1MwRkJVanRCUVVOQlFTeFhRVUZUU0N4SlFVRlVPMEZCUTBFc1UwRkJUMGNzVVVGQlVTeERRVUZtTEVWQlFXdENUQ3hKUVVGSlFTeEpRVUZKTEVkQlFVb3NSMEZCVlV3c1QwRkJUME1zVTBGQlUxVXNRMEZCYUVJc1EwRkJaQ3hGUVVGclEwRXNTMEZCUzBNc1EwRkJka01zUlVGQk1FTkdMRk5CUVZNc1EwRkJja1VzUlVGQmQwVXNRMEZCUlRzN1FVRkZNVVZLTEUxQlFVbEVMRWxCUVVzc1EwRkJReXhMUVVGTkxFTkJRVU5MTEV0QlFWSXNTVUZCYTBJc1EwRkJNMEk3UVVGRFFVd3NVVUZCVHl4RFFVRkRTeXhMUVVGU08wRkJRMEZCTEZkQlFWTlFMRWxCUVZRN1FVRkRRU3hUUVVGUFR5eFJRVUZSTEVOQlFXWXNSVUZCYTBKS0xFbEJRVWxCTEVsQlFVa3NSMEZCU2l4SFFVRlZUaXhQUVVGUFF5eFRRVUZUVlN4RFFVRm9RaXhEUVVGa0xFVkJRV3REUVN4TFFVRkxReXhEUVVGMlF5eEZRVUV3UTBZc1UwRkJVeXhEUVVGeVJTeEZRVUYzUlN4RFFVRkZPenRCUVVVeFJTeE5RVUZKVEN4TlFVRk5MRU5CUVZZc1JVRkJZVHRCUVVOWVFTeFJRVUZKTEVsQlFVbEpMRXRCUVZJN1FVRkRSQ3hIUVVaRUxFMUJSVThzU1VGQlNVb3NUVUZCVFVjc1NVRkJWaXhGUVVGblFqdEJRVU55UWl4WFFVRlBSaXhKUVVGSlVTeEhRVUZLTEVkQlFWY3NRMEZCUTBRc1NVRkJTU3hEUVVGRExFTkJRVXdzUjBGQlV5eERRVUZXTEVsQlFXVkZMRkZCUVdwRE8wRkJRMFFzUjBGR1RTeE5RVVZCTzBGQlEweFVMRkZCUVVsQkxFbEJRVWxWTEV0QlFVdERMRWRCUVV3c1EwRkJVeXhEUVVGVUxFVkJRVmxrTEVsQlFWb3NRMEZCVWp0QlFVTkJSU3hSUVVGSlFTeEpRVUZKU1N4TFFVRlNPMEZCUTBRN1FVRkRSQ3hUUVVGUExFTkJRVU5KTEVsQlFVa3NRMEZCUXl4RFFVRk1MRWRCUVZNc1EwRkJWaXhKUVVGbFVDeERRVUZtTEVkQlFXMUNWU3hMUVVGTFF5eEhRVUZNTEVOQlFWTXNRMEZCVkN4RlFVRlpXaXhKUVVGSlJpeEpRVUZvUWl4RFFVRXhRanRCUVVORUxFTkJMMEpFT3p0QlFXbERRVXdzVVVGQlVXOUNMRXRCUVZJc1IwRkJaMElzVlVGQlZXeENMRTFCUVZZc1JVRkJhMEp0UWl4TFFVRnNRaXhGUVVGNVFteENMRTFCUVhwQ0xFVkJRV2xEUXl4SlFVRnFReXhGUVVGMVEwTXNTVUZCZGtNc1JVRkJOa05ETEUxQlFUZERMRVZCUVhGRU8wRkJRMjVGTEUxQlFVbERMRU5CUVVvc1JVRkJUME1zUTBGQlVDeEZRVUZWWXl4RFFVRldPMEZCUTBFc1RVRkJTV0lzVDBGQlQwZ3NVMEZCVXl4RFFVRlVMRWRCUVdGRUxFbEJRV0lzUjBGQmIwSXNRMEZCTDBJN1FVRkRRU3hOUVVGSlN5eFBRVUZQTEVOQlFVTXNTMEZCUzBRc1NVRkJUaXhKUVVGakxFTkJRWHBDTzBGQlEwRXNUVUZCU1VVc1VVRkJVVVFzVVVGQlVTeERRVUZ3UWp0QlFVTkJMRTFCUVVsaExFdEJRVTFzUWl4VFFVRlRMRVZCUVZRc1IwRkJZMkVzUzBGQlMwTXNSMEZCVEN4RFFVRlRMRU5CUVZRc1JVRkJXU3hEUVVGRExFVkJRV0lzU1VGQmJVSkVMRXRCUVV0RExFZEJRVXdzUTBGQlV5eERRVUZVTEVWQlFWa3NRMEZCUXl4RlFVRmlMRU5CUVdwRExFZEJRVzlFTEVOQlFUbEVPMEZCUTBFc1RVRkJTVTRzU1VGQlNWUXNUMEZCVHl4RFFVRlFMRWRCUVZsRkxGTkJRVk1zUTBGQk4wSTdRVUZEUVN4TlFVRkpVU3hKUVVGSlZpeFBRVUZQTEVOQlFWQXNSMEZCVnl4RFFVRkRMRU5CUVhCQ08wRkJRMEVzVFVGQlNWY3NTVUZCU1Uwc1VVRkJVU3hEUVVGU0xFbEJRV05CTEZWQlFWVXNRMEZCVml4SlFVRmxMRWxCUVVsQkxFdEJRVW9zUjBGQldTeERRVUY2UXl4SFFVRTRReXhEUVVFNVF5eEhRVUZyUkN4RFFVRXhSRHM3UVVGRlFVRXNWVUZCVVVnc1MwRkJTMDBzUjBGQlRDeERRVUZUU0N4TFFVRlVMRU5CUVZJN08wRkJSVUVzVFVGQlNVa3NUVUZCVFVvc1MwRkJUaXhMUVVGblFrRXNWVUZCVlVvc1VVRkJPVUlzUlVGQmQwTTdRVUZEZEVOVUxGRkJRVWxwUWl4TlFVRk5TaXhMUVVGT0xFbEJRV1VzUTBGQlppeEhRVUZ0UWl4RFFVRjJRanRCUVVOQlpDeFJRVUZKUnl4SlFVRktPMEZCUTBRc1IwRklSQ3hOUVVkUE8wRkJRMHhJTEZGQlFVbFhMRXRCUVV0UkxFdEJRVXdzUTBGQlYxSXNTMEZCUzFNc1IwRkJUQ3hEUVVGVFRpeExRVUZVTEVsQlFXdENTQ3hMUVVGTFZTeEhRVUZzUXl4RFFVRktPMEZCUTBFc1VVRkJTVkFzVTBGQlUwTXNTVUZCU1Vvc1MwRkJTME1zUjBGQlRDeERRVUZUTEVOQlFWUXNSVUZCV1N4RFFVRkRXaXhEUVVGaUxFTkJRV0lzU1VGQlowTXNRMEZCY0VNc1JVRkJkVU03UVVGRGNrTkJPMEZCUTBGbExGZEJRVXNzUTBGQlREdEJRVU5FTzBGQlEwUXNVVUZCU1dZc1NVRkJTVWtzUzBGQlNpeEpRVUZoTEVOQlFXcENMRVZCUVc5Q08wRkJRMnhDVlN4bFFVRlRSU3hMUVVGTFJDeERRVUZrTzBGQlEwUXNTMEZHUkN4TlFVVlBPMEZCUTB4RUxHVkJRVk5GTEV0QlFVdE1MRXRCUVV0RExFZEJRVXdzUTBGQlV5eERRVUZVTEVWQlFWa3NTVUZCU1ZJc1MwRkJhRUlzUTBGQlpEdEJRVU5FTzBGQlEwUXNVVUZCU1ZVc1VVRkJVVU1zUTBGQlVpeEpRVUZoTEVOQlFXcENMRVZCUVc5Q08wRkJRMnhDWmp0QlFVTkJaU3hYUVVGTExFTkJRVXc3UVVGRFJEczdRVUZGUkN4UlFVRkpaaXhKUVVGSlNTeExRVUZLTEVsQlFXRkVMRWxCUVdwQ0xFVkJRWFZDTzBGQlEzSkNSaXhWUVVGSkxFTkJRVW83UVVGRFFVUXNWVUZCU1Vjc1NVRkJTanRCUVVORUxFdEJTRVFzVFVGSFR5eEpRVUZKU0N4SlFVRkpTU3hMUVVGS0xFbEJRV0VzUTBGQmFrSXNSVUZCYjBJN1FVRkRla0pJTEZWQlFVa3NRMEZCUTJFc1VVRkJVVU1zUTBGQlVpeEhRVUZaTEVOQlFXSXNTVUZCYTBKS0xFdEJRVXRETEVkQlFVd3NRMEZCVXl4RFFVRlVMRVZCUVZsa0xFbEJRVm9zUTBGQmRFSTdRVUZEUVVVc1ZVRkJTVUVzU1VGQlNVa3NTMEZCVWp0QlFVTkVMRXRCU0Uwc1RVRkhRVHRCUVVOTVNDeFZRVUZKWVN4UlFVRlJTQ3hMUVVGTFF5eEhRVUZNTEVOQlFWTXNRMEZCVkN4RlFVRlpVaXhSUVVGUkxFTkJRWEJDTEVOQlFWSXNSMEZCYVVOUExFdEJRVXRETEVkQlFVd3NRMEZCVXl4RFFVRlVMRVZCUVZsa0xFbEJRVm9zUTBGQmNrTTdRVUZEUVVVc1ZVRkJTU3hEUVVGS08wRkJRMFE3UVVGRFJqczdRVUZGUkN4VFFVRlBSaXhSUVVGUkxFTkJRV1lzUlVGQmEwSklMRTlCUVU5RExGTkJRVk5WTEVOQlFXaENMRWxCUVhGQ1RDeEpRVUZKTEVsQlFYcENMRVZCUVN0Q1N5eExRVUZMUXl4RFFVRndReXhGUVVGMVEwNHNTMEZCU3l4SFFVRTFReXhGUVVGcFJFZ3NVVUZCVVN4RFFVRXpSU3hGUVVFNFJTeERRVUZGT3p0QlFVVm9Sa1VzVFVGQlMwRXNTMEZCUzBZc1NVRkJUaXhIUVVGalJ5eERRVUZzUWp0QlFVTkJReXhWUVVGUlNpeEpRVUZTTzBGQlEwRXNVMEZCVDBrc1QwRkJUeXhEUVVGa0xFVkJRV2xDVUN4UFFVRlBReXhUUVVGVFZTeERRVUZvUWl4SlFVRnhRazRzU1VGQlNTeEpRVUY2UWl4RlFVRXJRazBzUzBGQlMwTXNRMEZCY0VNc1JVRkJkVU5RTEV0QlFVc3NSMEZCTlVNc1JVRkJhVVJGTEZGQlFWRXNRMEZCTVVVc1JVRkJOa1VzUTBGQlJUczdRVUZGTDBWUUxGTkJRVTlETEZOQlFWTlZMRU5CUVZRc1IwRkJZVU1zUTBGQmNFSXNTMEZCTUVKRExFbEJRVWtzUjBGQk9VSTdRVUZEUkN4RFFXeEVSQ0lzSW1acGJHVWlPaUpwYm1SbGVDNXFjeUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSW1WNGNHOXlkSE11Y21WaFpDQTlJR1oxYm1OMGFXOXVJQ2hpZFdabVpYSXNJRzltWm5ObGRDd2dhWE5NUlN3Z2JVeGxiaXdnYmtKNWRHVnpLU0I3WEc0Z0lIWmhjaUJsTENCdFhHNGdJSFpoY2lCbFRHVnVJRDBnYmtKNWRHVnpJQ29nT0NBdElHMU1aVzRnTFNBeFhHNGdJSFpoY2lCbFRXRjRJRDBnS0RFZ1BEd2daVXhsYmlrZ0xTQXhYRzRnSUhaaGNpQmxRbWxoY3lBOUlHVk5ZWGdnUGo0Z01WeHVJQ0IyWVhJZ2JrSnBkSE1nUFNBdE4xeHVJQ0IyWVhJZ2FTQTlJR2x6VEVVZ1B5QW9ia0o1ZEdWeklDMGdNU2tnT2lBd1hHNGdJSFpoY2lCa0lEMGdhWE5NUlNBL0lDMHhJRG9nTVZ4dUlDQjJZWElnY3lBOUlHSjFabVpsY2x0dlptWnpaWFFnS3lCcFhWeHVYRzRnSUdrZ0t6MGdaRnh1WEc0Z0lHVWdQU0J6SUNZZ0tDZ3hJRHc4SUNndGJrSnBkSE1wS1NBdElERXBYRzRnSUhNZ1BqNDlJQ2d0YmtKcGRITXBYRzRnSUc1Q2FYUnpJQ3M5SUdWTVpXNWNiaUFnWm05eUlDZzdJRzVDYVhSeklENGdNRHNnWlNBOUlHVWdLaUF5TlRZZ0t5QmlkV1ptWlhKYmIyWm1jMlYwSUNzZ2FWMHNJR2tnS3owZ1pDd2dia0pwZEhNZ0xUMGdPQ2tnZTMxY2JseHVJQ0J0SUQwZ1pTQW1JQ2dvTVNBOFBDQW9MVzVDYVhSektTa2dMU0F4S1Z4dUlDQmxJRDQrUFNBb0xXNUNhWFJ6S1Z4dUlDQnVRbWwwY3lBclBTQnRUR1Z1WEc0Z0lHWnZjaUFvT3lCdVFtbDBjeUErSURBN0lHMGdQU0J0SUNvZ01qVTJJQ3NnWW5WbVptVnlXMjltWm5ObGRDQXJJR2xkTENCcElDczlJR1FzSUc1Q2FYUnpJQzA5SURncElIdDlYRzVjYmlBZ2FXWWdLR1VnUFQwOUlEQXBJSHRjYmlBZ0lDQmxJRDBnTVNBdElHVkNhV0Z6WEc0Z0lIMGdaV3h6WlNCcFppQW9aU0E5UFQwZ1pVMWhlQ2tnZTF4dUlDQWdJSEpsZEhWeWJpQnRJRDhnVG1GT0lEb2dLQ2h6SUQ4Z0xURWdPaUF4S1NBcUlFbHVabWx1YVhSNUtWeHVJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lHMGdQU0J0SUNzZ1RXRjBhQzV3YjNjb01pd2diVXhsYmlsY2JpQWdJQ0JsSUQwZ1pTQXRJR1ZDYVdGelhHNGdJSDFjYmlBZ2NtVjBkWEp1SUNoeklEOGdMVEVnT2lBeEtTQXFJRzBnS2lCTllYUm9MbkJ2ZHlneUxDQmxJQzBnYlV4bGJpbGNibjFjYmx4dVpYaHdiM0owY3k1M2NtbDBaU0E5SUdaMWJtTjBhVzl1SUNoaWRXWm1aWElzSUhaaGJIVmxMQ0J2Wm1aelpYUXNJR2x6VEVVc0lHMU1aVzRzSUc1Q2VYUmxjeWtnZTF4dUlDQjJZWElnWlN3Z2JTd2dZMXh1SUNCMllYSWdaVXhsYmlBOUlHNUNlWFJsY3lBcUlEZ2dMU0J0VEdWdUlDMGdNVnh1SUNCMllYSWdaVTFoZUNBOUlDZ3hJRHc4SUdWTVpXNHBJQzBnTVZ4dUlDQjJZWElnWlVKcFlYTWdQU0JsVFdGNElENCtJREZjYmlBZ2RtRnlJSEowSUQwZ0tHMU1aVzRnUFQwOUlESXpJRDhnVFdGMGFDNXdiM2NvTWl3Z0xUSTBLU0F0SUUxaGRHZ3VjRzkzS0RJc0lDMDNOeWtnT2lBd0tWeHVJQ0IyWVhJZ2FTQTlJR2x6VEVVZ1B5QXdJRG9nS0c1Q2VYUmxjeUF0SURFcFhHNGdJSFpoY2lCa0lEMGdhWE5NUlNBL0lERWdPaUF0TVZ4dUlDQjJZWElnY3lBOUlIWmhiSFZsSUR3Z01DQjhmQ0FvZG1Gc2RXVWdQVDA5SURBZ0ppWWdNU0F2SUhaaGJIVmxJRHdnTUNrZ1B5QXhJRG9nTUZ4dVhHNGdJSFpoYkhWbElEMGdUV0YwYUM1aFluTW9kbUZzZFdVcFhHNWNiaUFnYVdZZ0tHbHpUbUZPS0haaGJIVmxLU0I4ZkNCMllXeDFaU0E5UFQwZ1NXNW1hVzVwZEhrcElIdGNiaUFnSUNCdElEMGdhWE5PWVU0b2RtRnNkV1VwSUQ4Z01TQTZJREJjYmlBZ0lDQmxJRDBnWlUxaGVGeHVJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lHVWdQU0JOWVhSb0xtWnNiMjl5S0UxaGRHZ3ViRzluS0haaGJIVmxLU0F2SUUxaGRHZ3VURTR5S1Z4dUlDQWdJR2xtSUNoMllXeDFaU0FxSUNoaklEMGdUV0YwYUM1d2IzY29NaXdnTFdVcEtTQThJREVwSUh0Y2JpQWdJQ0FnSUdVdExWeHVJQ0FnSUNBZ1l5QXFQU0F5WEc0Z0lDQWdmVnh1SUNBZ0lHbG1JQ2hsSUNzZ1pVSnBZWE1nUGowZ01Ta2dlMXh1SUNBZ0lDQWdkbUZzZFdVZ0t6MGdjblFnTHlCalhHNGdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJSFpoYkhWbElDczlJSEowSUNvZ1RXRjBhQzV3YjNjb01pd2dNU0F0SUdWQ2FXRnpLVnh1SUNBZ0lIMWNiaUFnSUNCcFppQW9kbUZzZFdVZ0tpQmpJRDQ5SURJcElIdGNiaUFnSUNBZ0lHVXJLMXh1SUNBZ0lDQWdZeUF2UFNBeVhHNGdJQ0FnZlZ4dVhHNGdJQ0FnYVdZZ0tHVWdLeUJsUW1saGN5QStQU0JsVFdGNEtTQjdYRzRnSUNBZ0lDQnRJRDBnTUZ4dUlDQWdJQ0FnWlNBOUlHVk5ZWGhjYmlBZ0lDQjlJR1ZzYzJVZ2FXWWdLR1VnS3lCbFFtbGhjeUErUFNBeEtTQjdYRzRnSUNBZ0lDQnRJRDBnS0haaGJIVmxJQ29nWXlBdElERXBJQ29nVFdGMGFDNXdiM2NvTWl3Z2JVeGxiaWxjYmlBZ0lDQWdJR1VnUFNCbElDc2daVUpwWVhOY2JpQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdiU0E5SUhaaGJIVmxJQ29nVFdGMGFDNXdiM2NvTWl3Z1pVSnBZWE1nTFNBeEtTQXFJRTFoZEdndWNHOTNLRElzSUcxTVpXNHBYRzRnSUNBZ0lDQmxJRDBnTUZ4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUdadmNpQW9PeUJ0VEdWdUlENDlJRGc3SUdKMVptWmxjbHR2Wm1aelpYUWdLeUJwWFNBOUlHMGdKaUF3ZUdabUxDQnBJQ3M5SUdRc0lHMGdMejBnTWpVMkxDQnRUR1Z1SUMwOUlEZ3BJSHQ5WEc1Y2JpQWdaU0E5SUNobElEdzhJRzFNWlc0cElId2diVnh1SUNCbFRHVnVJQ3M5SUcxTVpXNWNiaUFnWm05eUlDZzdJR1ZNWlc0Z1BpQXdPeUJpZFdabVpYSmJiMlptYzJWMElDc2dhVjBnUFNCbElDWWdNSGhtWml3Z2FTQXJQU0JrTENCbElDODlJREkxTml3Z1pVeGxiaUF0UFNBNEtTQjdmVnh1WEc0Z0lHSjFabVpsY2x0dlptWnpaWFFnS3lCcElDMGdaRjBnZkQwZ2N5QXFJREV5T0Z4dWZWeHVJbDE5XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxpZWVlNzU0XFxcXGluZGV4LmpzXCIsXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXGllZWU3NTRcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4ndXNlIHN0cmljdCc7XG5cbi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhblNldEltbWVkaWF0ZSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5zZXRJbW1lZGlhdGU7XG4gICAgdmFyIGNhblBvc3QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cucG9zdE1lc3NhZ2UgJiYgd2luZG93LmFkZEV2ZW50TGlzdGVuZXI7XG5cbiAgICBpZiAoY2FuU2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZikge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5zZXRJbW1lZGlhdGUoZik7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKGNhblBvc3QpIHtcbiAgICAgICAgdmFyIHF1ZXVlID0gW107XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB2YXIgc291cmNlID0gZXYuc291cmNlO1xuICAgICAgICAgICAgaWYgKChzb3VyY2UgPT09IHdpbmRvdyB8fCBzb3VyY2UgPT09IG51bGwpICYmIGV2LmRhdGEgPT09ICdwcm9jZXNzLXRpY2snKSB7XG4gICAgICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZuID0gcXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICAgICAgcXVldWUucHVzaChmbik7XG4gICAgICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2UoJ3Byb2Nlc3MtdGljaycsICcqJyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZm4sIDApO1xuICAgIH07XG59KCk7XG5cbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAnLyc7XG59O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltSnliM2R6WlhJdWFuTWlYU3dpYm1GdFpYTWlPbHNpY0hKdlkyVnpjeUlzSW0xdlpIVnNaU0lzSW1WNGNHOXlkSE1pTENKdVpYaDBWR2xqYXlJc0ltTmhibE5sZEVsdGJXVmthV0YwWlNJc0luZHBibVJ2ZHlJc0luTmxkRWx0YldWa2FXRjBaU0lzSW1OaGJsQnZjM1FpTENKd2IzTjBUV1Z6YzJGblpTSXNJbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSWlMQ0ptSWl3aWNYVmxkV1VpTENKbGRpSXNJbk52ZFhKalpTSXNJbVJoZEdFaUxDSnpkRzl3VUhKdmNHRm5ZWFJwYjI0aUxDSnNaVzVuZEdnaUxDSm1iaUlzSW5Ob2FXWjBJaXdpY0hWemFDSXNJbk5sZEZScGJXVnZkWFFpTENKMGFYUnNaU0lzSW1KeWIzZHpaWElpTENKbGJuWWlMQ0poY21kMklpd2libTl2Y0NJc0ltOXVJaXdpWVdSa1RHbHpkR1Z1WlhJaUxDSnZibU5sSWl3aWIyWm1JaXdpY21WdGIzWmxUR2x6ZEdWdVpYSWlMQ0p5WlcxdmRtVkJiR3hNYVhOMFpXNWxjbk1pTENKbGJXbDBJaXdpWW1sdVpHbHVaeUlzSW01aGJXVWlMQ0pGY25KdmNpSXNJbU4zWkNJc0ltTm9aR2x5SWl3aVpHbHlJbDBzSW0xaGNIQnBibWR6SWpvaU96dEJRVUZCT3p0QlFVVkJMRWxCUVVsQkxGVkJRVlZETEU5QlFVOURMRTlCUVZBc1IwRkJhVUlzUlVGQkwwSTdPMEZCUlVGR0xGRkJRVkZITEZGQlFWSXNSMEZCYjBJc1dVRkJXVHRCUVVNMVFpeFJRVUZKUXl4clFrRkJhMElzVDBGQlQwTXNUVUZCVUN4TFFVRnJRaXhYUVVGc1FpeEpRVU51UWtFc1QwRkJUME1zV1VGRVZqdEJRVVZCTEZGQlFVbERMRlZCUVZVc1QwRkJUMFlzVFVGQlVDeExRVUZyUWl4WFFVRnNRaXhKUVVOWVFTeFBRVUZQUnl4WFFVUkpMRWxCUTFkSUxFOUJRVTlKTEdkQ1FVUm9RenM3UVVGSlFTeFJRVUZKVEN4bFFVRktMRVZCUVhGQ08wRkJRMnBDTEdWQlFVOHNWVUZCVlUwc1EwRkJWaXhGUVVGaE8wRkJRVVVzYlVKQlFVOU1MRTlCUVU5RExGbEJRVkFzUTBGQmIwSkpMRU5CUVhCQ0xFTkJRVkE3UVVGQkswSXNVMEZCY2tRN1FVRkRTRHM3UVVGRlJDeFJRVUZKU0N4UFFVRktMRVZCUVdFN1FVRkRWQ3haUVVGSlNTeFJRVUZSTEVWQlFWbzdRVUZEUVU0c1pVRkJUMGtzWjBKQlFWQXNRMEZCZDBJc1UwRkJlRUlzUlVGQmJVTXNWVUZCVlVjc1JVRkJWaXhGUVVGak8wRkJRemRETEdkQ1FVRkpReXhUUVVGVFJDeEhRVUZIUXl4TlFVRm9RanRCUVVOQkxHZENRVUZKTEVOQlFVTkJMRmRCUVZkU0xFMUJRVmdzU1VGQmNVSlJMRmRCUVZjc1NVRkJha01zUzBGQk1FTkVMRWRCUVVkRkxFbEJRVWdzUzBGQldTeGpRVUV4UkN4RlFVRXdSVHRCUVVOMFJVWXNiVUpCUVVkSExHVkJRVWc3UVVGRFFTeHZRa0ZCU1Vvc1RVRkJUVXNzVFVGQlRpeEhRVUZsTEVOQlFXNUNMRVZCUVhOQ08wRkJRMnhDTEhkQ1FVRkpReXhMUVVGTFRpeE5RVUZOVHl4TFFVRk9MRVZCUVZRN1FVRkRRVVE3UVVGRFNEdEJRVU5LTzBGQlEwb3NVMEZVUkN4RlFWTkhMRWxCVkVnN08wRkJWMEVzWlVGQlR5eFRRVUZUWkN4UlFVRlVMRU5CUVd0Q1l5eEZRVUZzUWl4RlFVRnpRanRCUVVONlFrNHNhMEpCUVUxUkxFbEJRVTRzUTBGQlYwWXNSVUZCV0R0QlFVTkJXaXh0UWtGQlQwY3NWMEZCVUN4RFFVRnRRaXhqUVVGdVFpeEZRVUZ0UXl4SFFVRnVRenRCUVVOSUxGTkJTRVE3UVVGSlNEczdRVUZGUkN4WFFVRlBMRk5CUVZOTUxGRkJRVlFzUTBGQmEwSmpMRVZCUVd4Q0xFVkJRWE5DTzBGQlEzcENSeXh0UWtGQlYwZ3NSVUZCV0N4RlFVRmxMRU5CUVdZN1FVRkRTQ3hMUVVaRU8wRkJSMGdzUTBGcVEydENMRVZCUVc1Q096dEJRVzFEUVdwQ0xGRkJRVkZ4UWl4TFFVRlNMRWRCUVdkQ0xGTkJRV2hDTzBGQlEwRnlRaXhSUVVGUmMwSXNUMEZCVWl4SFFVRnJRaXhKUVVGc1FqdEJRVU5CZEVJc1VVRkJVWFZDTEVkQlFWSXNSMEZCWXl4RlFVRmtPMEZCUTBGMlFpeFJRVUZSZDBJc1NVRkJVaXhIUVVGbExFVkJRV1k3TzBGQlJVRXNVMEZCVTBNc1NVRkJWQ3hIUVVGblFpeERRVUZGT3p0QlFVVnNRbnBDTEZGQlFWRXdRaXhGUVVGU0xFZEJRV0ZFTEVsQlFXSTdRVUZEUVhwQ0xGRkJRVkV5UWl4WFFVRlNMRWRCUVhOQ1JpeEpRVUYwUWp0QlFVTkJla0lzVVVGQlVUUkNMRWxCUVZJc1IwRkJaVWdzU1VGQlpqdEJRVU5CZWtJc1VVRkJVVFpDTEVkQlFWSXNSMEZCWTBvc1NVRkJaRHRCUVVOQmVrSXNVVUZCVVRoQ0xHTkJRVklzUjBGQmVVSk1MRWxCUVhwQ08wRkJRMEY2UWl4UlFVRlJLMElzYTBKQlFWSXNSMEZCTmtKT0xFbEJRVGRDTzBGQlEwRjZRaXhSUVVGUlowTXNTVUZCVWl4SFFVRmxVQ3hKUVVGbU96dEJRVVZCZWtJc1VVRkJVV2xETEU5QlFWSXNSMEZCYTBJc1ZVRkJWVU1zU1VGQlZpeEZRVUZuUWp0QlFVTTVRaXhWUVVGTkxFbEJRVWxETEV0QlFVb3NRMEZCVlN4clEwRkJWaXhEUVVGT08wRkJRMGdzUTBGR1JEczdRVUZKUVR0QlFVTkJia01zVVVGQlVXOURMRWRCUVZJc1IwRkJZeXhaUVVGWk8wRkJRVVVzVjBGQlR5eEhRVUZRTzBGQlFWa3NRMEZCZUVNN1FVRkRRWEJETEZGQlFWRnhReXhMUVVGU0xFZEJRV2RDTEZWQlFWVkRMRWRCUVZZc1JVRkJaVHRCUVVNelFpeFZRVUZOTEVsQlFVbElMRXRCUVVvc1EwRkJWU3huUTBGQlZpeERRVUZPTzBGQlEwZ3NRMEZHUkNJc0ltWnBiR1VpT2lKaWNtOTNjMlZ5TG1weklpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lMeThnYzJocGJTQm1iM0lnZFhOcGJtY2djSEp2WTJWemN5QnBiaUJpY205M2MyVnlYRzVjYm5aaGNpQndjbTlqWlhOeklEMGdiVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQjdmVHRjYmx4dWNISnZZMlZ6Y3k1dVpYaDBWR2xqYXlBOUlDaG1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lDQWdkbUZ5SUdOaGJsTmxkRWx0YldWa2FXRjBaU0E5SUhSNWNHVnZaaUIzYVc1a2IzY2dJVDA5SUNkMWJtUmxabWx1WldRblhHNGdJQ0FnSmlZZ2QybHVaRzkzTG5ObGRFbHRiV1ZrYVdGMFpUdGNiaUFnSUNCMllYSWdZMkZ1VUc5emRDQTlJSFI1Y0dWdlppQjNhVzVrYjNjZ0lUMDlJQ2QxYm1SbFptbHVaV1FuWEc0Z0lDQWdKaVlnZDJsdVpHOTNMbkJ2YzNSTlpYTnpZV2RsSUNZbUlIZHBibVJ2ZHk1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5WEc0Z0lDQWdPMXh1WEc0Z0lDQWdhV1lnS0dOaGJsTmxkRWx0YldWa2FXRjBaU2tnZTF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnWm5WdVkzUnBiMjRnS0dZcElIc2djbVYwZFhKdUlIZHBibVJ2ZHk1elpYUkpiVzFsWkdsaGRHVW9aaWtnZlR0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0JwWmlBb1kyRnVVRzl6ZENrZ2UxeHVJQ0FnSUNBZ0lDQjJZWElnY1hWbGRXVWdQU0JiWFR0Y2JpQWdJQ0FnSUNBZ2QybHVaRzkzTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvSjIxbGMzTmhaMlVuTENCbWRXNWpkR2x2YmlBb1pYWXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJ6YjNWeVkyVWdQU0JsZGk1emIzVnlZMlU3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvS0hOdmRYSmpaU0E5UFQwZ2QybHVaRzkzSUh4OElITnZkWEpqWlNBOVBUMGdiblZzYkNrZ0ppWWdaWFl1WkdGMFlTQTlQVDBnSjNCeWIyTmxjM010ZEdsamF5Y3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JsZGk1emRHOXdVSEp2Y0dGbllYUnBiMjRvS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppQW9jWFZsZFdVdWJHVnVaM1JvSUQ0Z01Da2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMllYSWdabTRnUFNCeGRXVjFaUzV6YUdsbWRDZ3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCbWJpZ3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdmU3dnZEhKMVpTazdYRzVjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJR1oxYm1OMGFXOXVJRzVsZUhSVWFXTnJLR1p1S1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J4ZFdWMVpTNXdkWE5vS0dadUtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUhkcGJtUnZkeTV3YjNOMFRXVnpjMkZuWlNnbmNISnZZMlZ6Y3kxMGFXTnJKeXdnSnlvbktUdGNiaUFnSUNBZ0lDQWdmVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQnlaWFIxY200Z1puVnVZM1JwYjI0Z2JtVjRkRlJwWTJzb1ptNHBJSHRjYmlBZ0lDQWdJQ0FnYzJWMFZHbHRaVzkxZENobWJpd2dNQ2s3WEc0Z0lDQWdmVHRjYm4wcEtDazdYRzVjYm5CeWIyTmxjM011ZEdsMGJHVWdQU0FuWW5KdmQzTmxjaWM3WEc1d2NtOWpaWE56TG1KeWIzZHpaWElnUFNCMGNuVmxPMXh1Y0hKdlkyVnpjeTVsYm5ZZ1BTQjdmVHRjYm5CeWIyTmxjM011WVhKbmRpQTlJRnRkTzF4dVhHNW1kVzVqZEdsdmJpQnViMjl3S0NrZ2UzMWNibHh1Y0hKdlkyVnpjeTV2YmlBOUlHNXZiM0E3WEc1d2NtOWpaWE56TG1Ga1pFeHBjM1JsYm1WeUlEMGdibTl2Y0R0Y2JuQnliMk5sYzNNdWIyNWpaU0E5SUc1dmIzQTdYRzV3Y205alpYTnpMbTltWmlBOUlHNXZiM0E3WEc1d2NtOWpaWE56TG5KbGJXOTJaVXhwYzNSbGJtVnlJRDBnYm05dmNEdGNibkJ5YjJObGMzTXVjbVZ0YjNabFFXeHNUR2x6ZEdWdVpYSnpJRDBnYm05dmNEdGNibkJ5YjJObGMzTXVaVzFwZENBOUlHNXZiM0E3WEc1Y2JuQnliMk5sYzNNdVltbHVaR2x1WnlBOUlHWjFibU4wYVc5dUlDaHVZVzFsS1NCN1hHNGdJQ0FnZEdoeWIzY2dibVYzSUVWeWNtOXlLQ2R3Y205alpYTnpMbUpwYm1ScGJtY2dhWE1nYm05MElITjFjSEJ2Y25SbFpDY3BPMXh1ZlZ4dVhHNHZMeUJVVDBSUEtITm9kSGxzYldGdUtWeHVjSEp2WTJWemN5NWpkMlFnUFNCbWRXNWpkR2x2YmlBb0tTQjdJSEpsZEhWeWJpQW5MeWNnZlR0Y2JuQnliMk5sYzNNdVkyaGthWElnUFNCbWRXNWpkR2x2YmlBb1pHbHlLU0I3WEc0Z0lDQWdkR2h5YjNjZ2JtVjNJRVZ5Y205eUtDZHdjbTlqWlhOekxtTm9aR2x5SUdseklHNXZkQ0J6ZFhCd2IzSjBaV1FuS1R0Y2JuMDdYRzRpWFgwPVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxccHJvY2Vzc1xcXFxicm93c2VyLmpzXCIsXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXHByb2Nlc3NcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbi8qKlxuICogQ3JlYXRlZCBieSBhbmRyZSBvbiAyOS1KdW4tMTcuXG4gKi9cblxuZnVuY3Rpb24gRW5lbXkoY3R4KSB7XG4gICAgdmFyIHdpZHRoID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAzMDtcbiAgICB2YXIgaGVpZ2h0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiAzMDtcbiAgICB2YXIgY29sb3IgPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6ICdyZWQnO1xuICAgIHZhciB4ID0gYXJndW1lbnRzLmxlbmd0aCA+IDQgJiYgYXJndW1lbnRzWzRdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbNF0gOiA1MDtcbiAgICB2YXIgeSA9IGFyZ3VtZW50cy5sZW5ndGggPiA1ICYmIGFyZ3VtZW50c1s1XSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzVdIDogNTA7XG5cbiAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcblxuICAgIHRoaXMueDEgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzICsgMSk7XG4gICAgdGhpcy55MSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMgKyAxKTtcbn1cbkVuZW15LnByb3RvdHlwZSA9IHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShjdHgpIHtcbiAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgY3R4LnRyYW5zbGF0ZSh0aGlzLngsIHRoaXMueSk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICBjdHguZmlsbFJlY3QodGhpcy53aWR0aCAvIC0yLCB0aGlzLmhlaWdodCAvIC0yLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgbmV3UG9zOiBmdW5jdGlvbiBuZXdQb3Mod2lkdGgsIGhlaWdodCkge1xuICAgICAgICB0aGlzLnggKz0gdGhpcy54MTtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMueTE7XG5cbiAgICAgICAgaWYgKHRoaXMueSA+IGhlaWdodCkge1xuICAgICAgICAgICAgdGhpcy55ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnkgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLnkgPSBoZWlnaHQ7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy54ID4gd2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy54IDwgMCkge1xuICAgICAgICAgICAgdGhpcy54ID0gd2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gRW5lbXk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbVZ1WlcxNUxtcHpJbDBzSW01aGJXVnpJanBiSWtWdVpXMTVJaXdpWTNSNElpd2lkMmxrZEdnaUxDSm9aV2xuYUhRaUxDSmpiMnh2Y2lJc0luZ2lMQ0o1SWl3aWVERWlMQ0pOWVhSb0lpd2labXh2YjNJaUxDSnlZVzVrYjIwaUxDSjVNU0lzSW5CeWIzUnZkSGx3WlNJc0luVndaR0YwWlNJc0luTmhkbVVpTENKMGNtRnVjMnhoZEdVaUxDSm1hV3hzVTNSNWJHVWlMQ0ptYVd4c1VtVmpkQ0lzSW5KbGMzUnZjbVVpTENKdVpYZFFiM01pWFN3aWJXRndjR2x1WjNNaU9pSTdPenM3TzBGQlFVRTdPenM3UVVGSlFTeFRRVUZUUVN4TFFVRlVMRU5CUVdWRExFZEJRV1lzUlVGQk5FVTdRVUZCUVN4UlFVRjRSRU1zUzBGQmQwUXNkVVZCUVdoRUxFVkJRV2RFTzBGQlFVRXNVVUZCTlVORExFMUJRVFJETEhWRlFVRnVReXhGUVVGdFF6dEJRVUZCTEZGQlFTOUNReXhMUVVFclFpeDFSVUZCZGtJc1MwRkJkVUk3UVVGQlFTeFJRVUZvUWtNc1EwRkJaMElzZFVWQlFWb3NSVUZCV1R0QlFVRkJMRkZCUVZKRExFTkJRVkVzZFVWQlFVb3NSVUZCU1RzN1FVRkRlRVVzVTBGQlMwd3NSMEZCVEN4SFFVRlhRU3hIUVVGWU8wRkJRMEVzVTBGQlMwTXNTMEZCVEN4SFFVRmhRU3hMUVVGaU8wRkJRMEVzVTBGQlMwTXNUVUZCVEN4SFFVRmpRU3hOUVVGa08wRkJRMEVzVTBGQlMwTXNTMEZCVEN4SFFVRmhRU3hMUVVGaU8wRkJRMEVzVTBGQlMwTXNRMEZCVEN4SFFVRlRRU3hEUVVGVU8wRkJRMEVzVTBGQlMwTXNRMEZCVEN4SFFVRlRRU3hEUVVGVU96dEJRVVZCTEZOQlFVdERMRVZCUVV3c1IwRkJWVU1zUzBGQlMwTXNTMEZCVEN4RFFVRlhSQ3hMUVVGTFJTeE5RVUZNTEV0QlFXZENMRU5CUVdoQ0xFZEJRVzlDTEVOQlFTOUNMRU5CUVZZN1FVRkRRU3hUUVVGTFF5eEZRVUZNTEVkQlFWVklMRXRCUVV0RExFdEJRVXdzUTBGQlYwUXNTMEZCUzBVc1RVRkJUQ3hMUVVGblFpeERRVUZvUWl4SFFVRnZRaXhEUVVFdlFpeERRVUZXTzBGQlEwZzdRVUZEUkZZc1RVRkJUVmtzVTBGQlRpeEhRVUZyUWp0QlFVTmtReXhWUVVSakxHdENRVU5RV2l4SFFVUlBMRVZCUTBnN1FVRkRVRUVzV1VGQlNXRXNTVUZCU2p0QlFVTkJZaXhaUVVGSll5eFRRVUZLTEVOQlFXTXNTMEZCUzFZc1EwRkJia0lzUlVGQmMwSXNTMEZCUzBNc1EwRkJNMEk3UVVGRFFVd3NXVUZCU1dVc1UwRkJTaXhIUVVGblFpeExRVUZMV2l4TFFVRnlRanRCUVVOQlNDeFpRVUZKWjBJc1VVRkJTaXhEUVVGaExFdEJRVXRtTEV0QlFVd3NSMEZCWVN4RFFVRkRMRU5CUVROQ0xFVkJRVGhDTEV0QlFVdERMRTFCUVV3c1IwRkJZeXhEUVVGRExFTkJRVGRETEVWQlFXZEVMRXRCUVV0RUxFdEJRWEpFTEVWQlFUUkVMRXRCUVV0RExFMUJRV3BGTzBGQlEwRkdMRmxCUVVscFFpeFBRVUZLTzBGQlEwRXNaVUZCVHl4SlFVRlFPMEZCUTBnc1MwRlNZVHRCUVZOa1F5eFZRVlJqTEd0Q1FWTlFha0lzUzBGVVR5eEZRVk5CUXl4TlFWUkJMRVZCVTA4N1FVRkRha0lzWVVGQlMwVXNRMEZCVEN4SlFVRlZMRXRCUVV0RkxFVkJRV1k3UVVGRFFTeGhRVUZMUkN4RFFVRk1MRWxCUVZVc1MwRkJTMHNzUlVGQlpqczdRVUZGUVN4WlFVRkpMRXRCUVV0TUxFTkJRVXdzUjBGQlUwZ3NUVUZCWWl4RlFVRnZRanRCUVVOb1FpeHBRa0ZCUzBjc1EwRkJUQ3hIUVVGVExFTkJRVlE3UVVGRFNDeFRRVVpFTEUxQlJVOHNTVUZCU1N4TFFVRkxRU3hEUVVGTUxFZEJRVk1zUTBGQllpeEZRVUZsTzBGQlEyeENMR2xDUVVGTFFTeERRVUZNTEVkQlFWTklMRTFCUVZRN1FVRkRTQ3hUUVVaTkxFMUJSVUVzU1VGQlNTeExRVUZMUlN4RFFVRk1MRWRCUVZOSUxFdEJRV0lzUlVGQmJVSTdRVUZEZEVJc2FVSkJRVXRITEVOQlFVd3NSMEZCVXl4RFFVRlVPMEZCUTBnc1UwRkdUU3hOUVVWQkxFbEJRVWtzUzBGQlMwRXNRMEZCVEN4SFFVRlRMRU5CUVdJc1JVRkJaVHRCUVVOc1FpeHBRa0ZCUzBFc1EwRkJUQ3hIUVVGVFNDeExRVUZVTzBGQlEwZzdRVUZEUkN4bFFVRlBMRWxCUVZBN1FVRkRTRHRCUVhaQ1lTeERRVUZzUWpzN2EwSkJNRUpsUml4TElpd2labWxzWlNJNkltVnVaVzE1TG1weklpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lMeW9xWEc0Z0tpQkRjbVZoZEdWa0lHSjVJR0Z1WkhKbElHOXVJREk1TFVwMWJpMHhOeTVjYmlBcUwxeHVYRzVtZFc1amRHbHZiaUJGYm1WdGVTaGpkSGdzSUhkcFpIUm9JRDBnTXpBc0lHaGxhV2RvZENBOUlETXdMQ0JqYjJ4dmNpQTlJQ2R5WldRbkxDQjRJRDBnTlRBc0lIa2dQU0ExTUNrZ2UxeHVJQ0FnSUhSb2FYTXVZM1I0SUQwZ1kzUjRPMXh1SUNBZ0lIUm9hWE11ZDJsa2RHZ2dQU0IzYVdSMGFEdGNiaUFnSUNCMGFHbHpMbWhsYVdkb2RDQTlJR2hsYVdkb2REdGNiaUFnSUNCMGFHbHpMbU52Ykc5eUlEMGdZMjlzYjNJN1hHNGdJQ0FnZEdocGN5NTRJRDBnZUR0Y2JpQWdJQ0IwYUdsekxua2dQU0I1TzF4dVhHNGdJQ0FnZEdocGN5NTRNU0E5SUUxaGRHZ3VabXh2YjNJb1RXRjBhQzV5WVc1a2IyMG9LU0FxSURNZ0t5QXhLVHRjYmlBZ0lDQjBhR2x6TG5reElEMGdUV0YwYUM1bWJHOXZjaWhOWVhSb0xuSmhibVJ2YlNncElDb2dNeUFySURFcE8xeHVmVnh1Ulc1bGJYa3VjSEp2ZEc5MGVYQmxJRDBnZTF4dUlDQWdJSFZ3WkdGMFpTaGpkSGdwZTF4dUlDQWdJQ0FnSUNCamRIZ3VjMkYyWlNncE8xeHVJQ0FnSUNBZ0lDQmpkSGd1ZEhKaGJuTnNZWFJsS0hSb2FYTXVlQ3dnZEdocGN5NTVLVHRjYmlBZ0lDQWdJQ0FnWTNSNExtWnBiR3hUZEhsc1pTQTlJSFJvYVhNdVkyOXNiM0k3WEc0Z0lDQWdJQ0FnSUdOMGVDNW1hV3hzVW1WamRDaDBhR2x6TG5kcFpIUm9JQzhnTFRJc0lIUm9hWE11YUdWcFoyaDBJQzhnTFRJc0lIUm9hWE11ZDJsa2RHZ3NJSFJvYVhNdWFHVnBaMmgwS1R0Y2JpQWdJQ0FnSUNBZ1kzUjRMbkpsYzNSdmNtVW9LVHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJSFJvYVhNN1hHNGdJQ0FnZlN4Y2JpQWdJQ0J1WlhkUWIzTW9kMmxrZEdnc0lHaGxhV2RvZENsN1hHNGdJQ0FnSUNBZ0lIUm9hWE11ZUNBclBTQjBhR2x6TG5neE8xeHVJQ0FnSUNBZ0lDQjBhR2x6TG5rZ0t6MGdkR2hwY3k1NU1UdGNibHh1SUNBZ0lDQWdJQ0JwWmlBb2RHaHBjeTU1SUQ0Z2FHVnBaMmgwS1h0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFJvYVhNdWVTQTlJREE3WEc0Z0lDQWdJQ0FnSUgwZ1pXeHpaU0JwWmlBb2RHaHBjeTU1SUR3Z01DbDdYRzRnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbmtnUFNCb1pXbG5hSFE3WEc0Z0lDQWdJQ0FnSUgwZ1pXeHpaU0JwWmlBb2RHaHBjeTU0SUQ0Z2QybGtkR2dwZTF4dUlDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k1NElEMGdNRHRjYmlBZ0lDQWdJQ0FnZlNCbGJITmxJR2xtSUNoMGFHbHpMbmdnUENBd0tYdGNiaUFnSUNBZ0lDQWdJQ0FnSUhSb2FYTXVlQ0E5SUhkcFpIUm9PMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUIwYUdsek8xeHVJQ0FnSUgxY2JuMDdYRzVjYm1WNGNHOXlkQ0JrWldaaGRXeDBJRVZ1WlcxNU95SmRmUT09XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL2NvbXBvbmVudHNcXFxcZW5lbXkuanNcIixcIi9jb21wb25lbnRzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5mdW5jdGlvbiBHYW1lQXJlbmEoZWxlbWVudCwgbHZsLCB0aW1lciwgd2lkdGgsIGhlaWdodCwgUGxheWVyLCBFbmVteSwgZXZlbnRCdXMpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5jYW52YXMgPSBlbGVtZW50O1xuICAgIHRoaXMubHZsID0gbHZsO1xuICAgIHRoaXMudGltZXIgPSB0aW1lcjtcbiAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcih0aGlzLmN0eCk7XG4gICAgdGhpcy5lbmVteSA9IFtdO1xuICAgIHZhciBsZXZlbCA9IDA7XG4gICAgdGhpcy5lbmVteUludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpcy5lbmVteS5wdXNoKG5ldyBFbmVteShfdGhpcy5jdHgpKTtcbiAgICAgICAgbGV2ZWwrKztcbiAgICAgICAgX3RoaXMubHZsLmlubmVySFRNTCA9ICcgTGV2ZWw6ICcgKyBsZXZlbDtcbiAgICB9LCA1MDAwKTtcbiAgICB0aGlzLmV2ZW50QnVzID0gZXZlbnRCdXM7XG5cbiAgICB0aGlzLnN0YXJ0KCk7XG59XG5cbkdhbWVBcmVuYS5wcm90b3R5cGUgPSB7XG4gICAgc3RhcnQ6IGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHRoaXMud2lkdGg7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgICAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwodGhpcy51cGRhdGVTdGF0ZS5iaW5kKHRoaXMpLCAyMCk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIF90aGlzMi5rZXlzID0gX3RoaXMyLmtleXMgfHwgW107XG4gICAgICAgICAgICBfdGhpczIua2V5c1tlLmtleUNvZGVdID0gZS50eXBlID09PSAna2V5ZG93bic7XG4gICAgICAgIH0pO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgX3RoaXMyLmtleXNbZS5rZXlDb2RlXSA9IGUudHlwZSA9PT0gJ2tleWRvd24nO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHN0b3A6IGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5lbmVteUludGVydmFsKTtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyLnRpbWVyKTtcbiAgICAgICAgdGhpcy5sdmwuaW5uZXJIVE1MICs9ICc8c3BhbiBzdHlsZT1cImNvbG9yOiByZWQ7IGZvbnQtd2VpZ2h0OiBib2xkOyBmb250LXNpemU6IDVlbTtcIj4gVEhFIEVORCEhISBcXHUwNDFBXFx1MDQzRVxcdTA0M0JcXHUwNDM4XFx1MDQ0N1xcdTA0MzVcXHUwNDQxXFx1MDQ0MlxcdTA0MzJcXHUwNDNFIFxcdTA0M0VcXHUwNDQ3XFx1MDQzQVxcdTA0M0VcXHUwNDMyID0gJyArIHRoaXMudGltZXIudGltZSArICc8L3NwYW4+JztcbiAgICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKCdnYW1lOmZpbmlzaCcpO1xuICAgIH0sXG4gICAgdXBkYXRlU3RhdGU6IGZ1bmN0aW9uIHVwZGF0ZVN0YXRlKCkge1xuICAgICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgIHRoaXMucGxheWVyLm5ld1Bvcyh7XG4gICAgICAgICAgICByaWdodDogdGhpcy5rZXlzICYmIHRoaXMua2V5c1s2OF0sXG4gICAgICAgICAgICBsZWZ0OiB0aGlzLmtleXMgJiYgdGhpcy5rZXlzWzY1XSxcbiAgICAgICAgICAgIHVwOiB0aGlzLmtleXMgJiYgdGhpcy5rZXlzWzg3XSxcbiAgICAgICAgICAgIGRvd246IHRoaXMua2V5cyAmJiB0aGlzLmtleXNbODNdXG4gICAgICAgIH0sIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KS51cGRhdGUodGhpcy5jdHgpO1xuICAgICAgICB0aGlzLmVuZW15Lm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgdmFyIG5ld1ggPSBNYXRoLmFicyhpdGVtLnggLSBfdGhpczMucGxheWVyLngpO1xuICAgICAgICAgICAgdmFyIG5ld1kgPSBNYXRoLmFicyhpdGVtLnkgLSBfdGhpczMucGxheWVyLnkpO1xuICAgICAgICAgICAgaWYgKG5ld1ggPCAyNSAmJiBuZXdZIDwgMjUpIHtcbiAgICAgICAgICAgICAgICBfdGhpczMuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXRlbS5uZXdQb3MoX3RoaXMzLndpZHRoLCBfdGhpczMuaGVpZ2h0KS51cGRhdGUoX3RoaXMzLmN0eCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgfVxufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gR2FtZUFyZW5hO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW1kaGJXVkJjbVZ1WVM1cWN5SmRMQ0p1WVcxbGN5STZXeUpIWVcxbFFYSmxibUVpTENKbGJHVnRaVzUwSWl3aWJIWnNJaXdpZEdsdFpYSWlMQ0ozYVdSMGFDSXNJbWhsYVdkb2RDSXNJbEJzWVhsbGNpSXNJa1Z1WlcxNUlpd2laWFpsYm5SQ2RYTWlMQ0pqWVc1MllYTWlMQ0pqZEhnaUxDSm5aWFJEYjI1MFpYaDBJaXdpY0d4aGVXVnlJaXdpWlc1bGJYa2lMQ0pzWlhabGJDSXNJbVZ1WlcxNVNXNTBaWEoyWVd3aUxDSnpaWFJKYm5SbGNuWmhiQ0lzSW5CMWMyZ2lMQ0pwYm01bGNraFVUVXdpTENKemRHRnlkQ0lzSW5CeWIzUnZkSGx3WlNJc0ltbHVkR1Z5ZG1Gc0lpd2lkWEJrWVhSbFUzUmhkR1VpTENKaWFXNWtJaXdpZDJsdVpHOTNJaXdpWVdSa1JYWmxiblJNYVhOMFpXNWxjaUlzSW1VaUxDSndjbVYyWlc1MFJHVm1ZWFZzZENJc0ltdGxlWE1pTENKclpYbERiMlJsSWl3aWRIbHdaU0lzSW5OMGIzQWlMQ0pqYkdWaGNrbHVkR1Z5ZG1Gc0lpd2lkR2x0WlNJc0luUnlhV2RuWlhJaUxDSmpiR1ZoY2lJc0ltNWxkMUJ2Y3lJc0luSnBaMmgwSWl3aWJHVm1kQ0lzSW5Wd0lpd2laRzkzYmlJc0luVndaR0YwWlNJc0ltMWhjQ0lzSW01bGQxZ2lMQ0pOWVhSb0lpd2lZV0p6SWl3aWFYUmxiU0lzSW5naUxDSnVaWGRaSWl3aWVTSXNJbU5zWldGeVVtVmpkQ0pkTENKdFlYQndhVzVuY3lJNklqczdPenM3UVVGQlFTeFRRVUZUUVN4VFFVRlVMRU5CUVcxQ1F5eFBRVUZ1UWl4RlFVRTBRa01zUjBGQk5VSXNSVUZCYVVORExFdEJRV3BETEVWQlFYZERReXhMUVVGNFF5eEZRVUVyUTBNc1RVRkJMME1zUlVGQmRVUkRMRTFCUVhaRUxFVkJRU3RFUXl4TFFVRXZSQ3hGUVVGelJVTXNVVUZCZEVVc1JVRkJaMFk3UVVGQlFUczdRVUZETlVVc1UwRkJTME1zVFVGQlRDeEhRVUZqVWl4UFFVRmtPMEZCUTBFc1UwRkJTME1zUjBGQlRDeEhRVUZYUVN4SFFVRllPMEZCUTBFc1UwRkJTME1zUzBGQlRDeEhRVUZoUVN4TFFVRmlPMEZCUTBFc1UwRkJTMDhzUjBGQlRDeEhRVUZYTEV0QlFVdEVMRTFCUVV3c1EwRkJXVVVzVlVGQldpeERRVUYxUWl4SlFVRjJRaXhEUVVGWU8wRkJRMEVzVTBGQlMxQXNTMEZCVEN4SFFVRmhRU3hMUVVGaU8wRkJRMEVzVTBGQlMwTXNUVUZCVEN4SFFVRmpRU3hOUVVGa08wRkJRMEVzVTBGQlMwOHNUVUZCVEN4SFFVRmpMRWxCUVVsT0xFMUJRVW9zUTBGQlZ5eExRVUZMU1N4SFFVRm9RaXhEUVVGa08wRkJRMEVzVTBGQlMwY3NTMEZCVEN4SFFVRmhMRVZCUVdJN1FVRkRRU3hSUVVGSlF5eFJRVUZSTEVOQlFWbzdRVUZEUVN4VFFVRkxReXhoUVVGTUxFZEJRWEZDUXl4WlFVRlpMRmxCUVUwN1FVRkRia01zWTBGQlMwZ3NTMEZCVEN4RFFVRlhTU3hKUVVGWUxFTkJRV2RDTEVsQlFVbFdMRXRCUVVvc1EwRkJWU3hOUVVGTFJ5eEhRVUZtTEVOQlFXaENPMEZCUTBGSk8wRkJRMEVzWTBGQlMxb3NSMEZCVEN4RFFVRlRaMElzVTBGQlZDeG5Ra0ZCWjBOS0xFdEJRV2hETzBGQlEwZ3NTMEZLYjBJc1JVRkpiRUlzU1VGS2EwSXNRMEZCY2tJN1FVRkxRU3hUUVVGTFRpeFJRVUZNTEVkQlFXZENRU3hSUVVGb1FqczdRVUZGUVN4VFFVRkxWeXhMUVVGTU8wRkJRMGc3TzBGQlJVUnVRaXhWUVVGVmIwSXNVMEZCVml4SFFVRnpRanRCUVVOc1FrUXNVMEZFYTBJc2JVSkJRMVk3UVVGQlFUczdRVUZEU2l4aFFVRkxWaXhOUVVGTUxFTkJRVmxNTEV0QlFWb3NSMEZCYjBJc1MwRkJTMEVzUzBGQmVrSTdRVUZEUVN4aFFVRkxTeXhOUVVGTUxFTkJRVmxLTEUxQlFWb3NSMEZCY1VJc1MwRkJTMEVzVFVGQk1VSTdRVUZEUVN4aFFVRkxaMElzVVVGQlRDeEhRVUZuUWt3c1dVRkJXU3hMUVVGTFRTeFhRVUZNTEVOQlFXbENReXhKUVVGcVFpeERRVUZ6UWl4SlFVRjBRaXhEUVVGYUxFVkJRWGxETEVWQlFYcERMRU5CUVdoQ08wRkJRMEZETEdWQlFVOURMR2RDUVVGUUxFTkJRWGRDTEZOQlFYaENMRVZCUVcxRExGVkJRVU5ETEVOQlFVUXNSVUZCVHp0QlFVTjBRMEVzWTBGQlJVTXNZMEZCUmp0QlFVTkJMRzFDUVVGTFF5eEpRVUZNTEVkQlFXRXNUMEZCUzBFc1NVRkJUQ3hKUVVGaExFVkJRVEZDTzBGQlEwRXNiVUpCUVV0QkxFbEJRVXdzUTBGQlZVWXNSVUZCUlVjc1QwRkJXaXhKUVVGM1FrZ3NSVUZCUlVrc1NVRkJSaXhMUVVGWExGTkJRVzVETzBGQlEwZ3NVMEZLUkR0QlFVdEJUaXhsUVVGUFF5eG5Ra0ZCVUN4RFFVRjNRaXhQUVVGNFFpeEZRVUZwUXl4VlFVRkRReXhEUVVGRUxFVkJRVTg3UVVGRGNFTXNiVUpCUVV0RkxFbEJRVXdzUTBGQlZVWXNSVUZCUlVjc1QwRkJXaXhKUVVGM1FrZ3NSVUZCUlVrc1NVRkJSaXhMUVVGWExGTkJRVzVETzBGQlEwZ3NVMEZHUkR0QlFVZElMRXRCWW1sQ08wRkJZMnhDUXl4UlFXUnJRaXhyUWtGaldEdEJRVU5JUXl4elFrRkJZeXhMUVVGTFdDeFJRVUZ1UWp0QlFVTkJWeXh6UWtGQll5eExRVUZMYWtJc1lVRkJia0k3UVVGRFFXbENMSE5DUVVGakxFdEJRVXMzUWl4TFFVRk1MRU5CUVZkQkxFdEJRWHBDTzBGQlEwRXNZVUZCUzBRc1IwRkJUQ3hEUVVGVFowSXNVMEZCVkN4blRFRkJjVWdzUzBGQlMyWXNTMEZCVEN4RFFVRlhPRUlzU1VGQmFFazdRVUZEUVN4aFFVRkxla0lzVVVGQlRDeERRVUZqTUVJc1QwRkJaQ3hEUVVGelFpeGhRVUYwUWp0QlFVTklMRXRCY0VKcFFqdEJRWEZDYkVKYUxHVkJja0pyUWl4NVFrRnhRa283UVVGQlFUczdRVUZEVml4aFFVRkxZU3hMUVVGTU8wRkJRMEVzWVVGQlMzWkNMRTFCUVV3c1EwRkRTM2RDTEUxQlJFd3NRMEZEV1R0QlFVTktReXh0UWtGQlR5eExRVUZMVkN4SlFVRk1MRWxCUVdFc1MwRkJTMEVzU1VGQlRDeERRVUZWTEVWQlFWWXNRMEZFYUVJN1FVRkZTbFVzYTBKQlFVMHNTMEZCUzFZc1NVRkJUQ3hKUVVGaExFdEJRVXRCTEVsQlFVd3NRMEZCVlN4RlFVRldMRU5CUm1ZN1FVRkhTbGNzWjBKQlFVa3NTMEZCUzFnc1NVRkJUQ3hKUVVGaExFdEJRVXRCTEVsQlFVd3NRMEZCVlN4RlFVRldMRU5CU0dJN1FVRkpTbGtzYTBKQlFVMHNTMEZCUzFvc1NVRkJUQ3hKUVVGaExFdEJRVXRCTEVsQlFVd3NRMEZCVlN4RlFVRldPMEZCU21Zc1UwRkVXaXhGUVUxUExFdEJRVXQ0UWl4TFFVNWFMRVZCVFcxQ0xFdEJRVXRETEUxQlRuaENMRVZCVDB0dlF5eE5RVkJNTEVOQlQxa3NTMEZCU3k5Q0xFZEJVR3BDTzBGQlVVRXNZVUZCUzBjc1MwRkJUQ3hEUVVGWE5rSXNSMEZCV0N4RFFVRmxMR2RDUVVGUk8wRkJRMjVDTEdkQ1FVRkpReXhQUVVGUFF5eExRVUZMUXl4SFFVRk1MRU5CUVZORExFdEJRVXRETEVOQlFVd3NSMEZCVXl4UFFVRkxia01zVFVGQlRDeERRVUZaYlVNc1EwRkJPVUlzUTBGQldEdEJRVU5CTEdkQ1FVRkpReXhQUVVGUFNpeExRVUZMUXl4SFFVRk1MRU5CUVZORExFdEJRVXRITEVOQlFVd3NSMEZCVXl4UFFVRkxja01zVFVGQlRDeERRVUZaY1VNc1EwRkJPVUlzUTBGQldEdEJRVU5CTEdkQ1FVRkpUaXhQUVVGUExFVkJRVkFzU1VGQlkwc3NUMEZCVHl4RlFVRjZRaXhGUVVFMFFqdEJRVU40UWl4MVFrRkJTMnBDTEVsQlFVdzdRVUZEU0R0QlFVTkVaU3hwUWtGQlMxWXNUVUZCVEN4RFFVRlpMRTlCUVV0b1F5eExRVUZxUWl4RlFVRjNRaXhQUVVGTFF5eE5RVUUzUWl4RlFVRnhRMjlETEUxQlFYSkRMRU5CUVRSRExFOUJRVXN2UWl4SFFVRnFSRHRCUVVOSUxGTkJVRVE3UVVGUlNDeExRWFpEYVVJN1FVRjNRMnhDZVVJc1UwRjRRMnRDTEcxQ1FYZERWanRCUVVOS0xHRkJRVXQ2UWl4SFFVRk1MRU5CUVZOM1F5eFRRVUZVTEVOQlFXMUNMRU5CUVc1Q0xFVkJRWE5DTEVOQlFYUkNMRVZCUVhsQ0xFdEJRVXQ2UXl4TlFVRk1MRU5CUVZsTUxFdEJRWEpETEVWQlFUUkRMRXRCUVV0TExFMUJRVXdzUTBGQldVb3NUVUZCZUVRN1FVRkRTRHRCUVRGRGFVSXNRMEZCZEVJN08ydENRVFpEWlV3c1V5SXNJbVpwYkdVaU9pSm5ZVzFsUVhKbGJtRXVhbk1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lKbWRXNWpkR2x2YmlCSFlXMWxRWEpsYm1Fb1pXeGxiV1Z1ZEN3Z2JIWnNMQ0IwYVcxbGNpd2dkMmxrZEdnc0lHaGxhV2RvZEN3Z1VHeGhlV1Z5TENCRmJtVnRlU3dnWlhabGJuUkNkWE1wSUh0Y2JpQWdJQ0IwYUdsekxtTmhiblpoY3lBOUlHVnNaVzFsYm5RN1hHNGdJQ0FnZEdocGN5NXNkbXdnUFNCc2RtdzdYRzRnSUNBZ2RHaHBjeTUwYVcxbGNpQTlJSFJwYldWeU8xeHVJQ0FnSUhSb2FYTXVZM1I0SUQwZ2RHaHBjeTVqWVc1MllYTXVaMlYwUTI5dWRHVjRkQ2duTW1RbktUdGNiaUFnSUNCMGFHbHpMbmRwWkhSb0lEMGdkMmxrZEdnN1hHNGdJQ0FnZEdocGN5NW9aV2xuYUhRZ1BTQm9aV2xuYUhRN1hHNGdJQ0FnZEdocGN5NXdiR0Y1WlhJZ1BTQnVaWGNnVUd4aGVXVnlLSFJvYVhNdVkzUjRLVHRjYmlBZ0lDQjBhR2x6TG1WdVpXMTVJRDBnVzEwN1hHNGdJQ0FnZG1GeUlHeGxkbVZzSUQwZ01EdGNiaUFnSUNCMGFHbHpMbVZ1WlcxNVNXNTBaWEoyWVd3Z1BTQnpaWFJKYm5SbGNuWmhiQ2dvS1NBOVBpQjdYRzRnSUNBZ0lDQWdJSFJvYVhNdVpXNWxiWGt1Y0hWemFDaHVaWGNnUlc1bGJYa29kR2hwY3k1amRIZ3BLVHRjYmlBZ0lDQWdJQ0FnYkdWMlpXd3JLenRjYmlBZ0lDQWdJQ0FnZEdocGN5NXNkbXd1YVc1dVpYSklWRTFNSUQwZ1lDQk1aWFpsYkRvZ0pIdHNaWFpsYkgxZ08xeHVJQ0FnSUgwc0lEVXdNREFwTzF4dUlDQWdJSFJvYVhNdVpYWmxiblJDZFhNZ1BTQmxkbVZ1ZEVKMWN6dGNibHh1SUNBZ0lIUm9hWE11YzNSaGNuUW9LVHRjYm4xY2JseHVSMkZ0WlVGeVpXNWhMbkJ5YjNSdmRIbHdaU0E5SUh0Y2JpQWdJQ0J6ZEdGeWRDZ3BJSHRjYmlBZ0lDQWdJQ0FnZEdocGN5NWpZVzUyWVhNdWQybGtkR2dnUFNCMGFHbHpMbmRwWkhSb08xeHVJQ0FnSUNBZ0lDQjBhR2x6TG1OaGJuWmhjeTVvWldsbmFIUWdQU0IwYUdsekxtaGxhV2RvZER0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVwYm5SbGNuWmhiQ0E5SUhObGRFbHVkR1Z5ZG1Gc0tIUm9hWE11ZFhCa1lYUmxVM1JoZEdVdVltbHVaQ2gwYUdsektTd2dNakFwTzF4dUlDQWdJQ0FnSUNCM2FXNWtiM2N1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWduYTJWNVpHOTNiaWNzSUNobEtTQTlQaUI3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmxMbkJ5WlhabGJuUkVaV1poZFd4MEtDazdYRzRnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbXRsZVhNZ1BTQW9kR2hwY3k1clpYbHpJSHg4SUZ0ZEtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUhSb2FYTXVhMlY1YzF0bExtdGxlVU52WkdWZElEMGdLR1V1ZEhsd1pTQTlQVDBnSjJ0bGVXUnZkMjRuS1R0Y2JpQWdJQ0FnSUNBZ2ZTazdYRzRnSUNBZ0lDQWdJSGRwYm1SdmR5NWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDZHJaWGwxY0Njc0lDaGxLU0E5UGlCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxtdGxlWE5iWlM1clpYbERiMlJsWFNBOUlDaGxMblI1Y0dVZ1BUMDlJQ2RyWlhsa2IzZHVKeWxjYmlBZ0lDQWdJQ0FnZlNrN1hHNGdJQ0FnZlN4Y2JpQWdJQ0J6ZEc5d0tDa2dlMXh1SUNBZ0lDQWdJQ0JqYkdWaGNrbHVkR1Z5ZG1Gc0tIUm9hWE11YVc1MFpYSjJZV3dwTzF4dUlDQWdJQ0FnSUNCamJHVmhja2x1ZEdWeWRtRnNLSFJvYVhNdVpXNWxiWGxKYm5SbGNuWmhiQ2s3WEc0Z0lDQWdJQ0FnSUdOc1pXRnlTVzUwWlhKMllXd29kR2hwY3k1MGFXMWxjaTUwYVcxbGNpazdYRzRnSUNBZ0lDQWdJSFJvYVhNdWJIWnNMbWx1Ym1WeVNGUk5UQ0FyUFNCZ1BITndZVzRnYzNSNWJHVTlYQ0pqYjJ4dmNqb2djbVZrT3lCbWIyNTBMWGRsYVdkb2REb2dZbTlzWkRzZ1ptOXVkQzF6YVhwbE9pQTFaVzA3WENJK0lGUklSU0JGVGtRaElTRWcwSnJRdnRDNzBMalJoOUMxMFlIUmd0Q3kwTDRnMEw3Umg5QzYwTDdRc2lBOUlDUjdkR2hwY3k1MGFXMWxjaTUwYVcxbGZUd3ZjM0JoYmo1Z08xeHVJQ0FnSUNBZ0lDQjBhR2x6TG1WMlpXNTBRblZ6TG5SeWFXZG5aWElvSjJkaGJXVTZabWx1YVhOb0p5azdYRzRnSUNBZ2ZTeGNiaUFnSUNCMWNHUmhkR1ZUZEdGMFpTZ3BJSHRjYmlBZ0lDQWdJQ0FnZEdocGN5NWpiR1ZoY2lncE8xeHVJQ0FnSUNBZ0lDQjBhR2x6TG5Cc1lYbGxjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0xtNWxkMUJ2Y3loN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NtbG5hSFE2SUhSb2FYTXVhMlY1Y3lBbUppQjBhR2x6TG10bGVYTmJOamhkTEZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUd4bFpuUTZJSFJvYVhNdWEyVjVjeUFtSmlCMGFHbHpMbXRsZVhOYk5qVmRMRnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFZ3T2lCMGFHbHpMbXRsZVhNZ0ppWWdkR2hwY3k1clpYbHpXemczWFN4Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCa2IzZHVPaUIwYUdsekxtdGxlWE1nSmlZZ2RHaHBjeTVyWlhseld6Z3pYVnh1SUNBZ0lDQWdJQ0FnSUNBZ2ZTd2dkR2hwY3k1M2FXUjBhQ3dnZEdocGN5NW9aV2xuYUhRcFhHNGdJQ0FnSUNBZ0lDQWdJQ0F1ZFhCa1lYUmxLSFJvYVhNdVkzUjRLVHRjYmlBZ0lDQWdJQ0FnZEdocGN5NWxibVZ0ZVM1dFlYQW9hWFJsYlNBOVBpQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCc1pYUWdibVYzV0NBOUlFMWhkR2d1WVdKektHbDBaVzB1ZUNBdElIUm9hWE11Y0d4aGVXVnlMbmdwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdiR1YwSUc1bGQxa2dQU0JOWVhSb0xtRmljeWhwZEdWdExua2dMU0IwYUdsekxuQnNZWGxsY2k1NUtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaHVaWGRZSUR3Z01qVWdJQ1ltSUc1bGQxa2dQQ0F5TlNsN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTV6ZEc5d0tDbGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJR2wwWlcwdWJtVjNVRzl6S0hSb2FYTXVkMmxrZEdnc0lIUm9hWE11YUdWcFoyaDBLUzUxY0dSaGRHVW9kR2hwY3k1amRIZ3BPMXh1SUNBZ0lDQWdJQ0I5S1R0Y2JpQWdJQ0I5TEZ4dUlDQWdJR05zWldGeUtDa2dlMXh1SUNBZ0lDQWdJQ0IwYUdsekxtTjBlQzVqYkdWaGNsSmxZM1FvTUN3Z01Dd2dkR2hwY3k1allXNTJZWE11ZDJsa2RHZ3NJSFJvYVhNdVkyRnVkbUZ6TG1obGFXZG9kQ2xjYmlBZ0lDQjlYRzU5TzF4dVhHNWxlSEJ2Y25RZ1pHVm1ZWFZzZENCSFlXMWxRWEpsYm1FN0lsMTlcbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvY29tcG9uZW50c1xcXFxnYW1lQXJlbmEuanNcIixcIi9jb21wb25lbnRzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG4vKipcbiAqIENyZWF0ZWQgYnkgYW5kcmUgb24gMjktSnVuLTE3LlxuICovXG5cbnZhciBhZGRTY29yZUxTID0gZXhwb3J0cy5hZGRTY29yZUxTID0gZnVuY3Rpb24gYWRkU2NvcmVMUyhzY29yZSwgbmFtZSkge1xuICAgIHZhciBMUyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0dhbWVTY29yZScpKSB8fCB7fTtcbiAgICBMU1tzY29yZV0gPSBMU1tzY29yZV0gfHwgW107XG4gICAgTFNbc2NvcmVdLnB1c2gobmFtZSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0dhbWVTY29yZScsIEpTT04uc3RyaW5naWZ5KExTKSk7XG59O1xuXG52YXIgcmVuZGVyU2NvcmVGcm9tTFMgPSBleHBvcnRzLnJlbmRlclNjb3JlRnJvbUxTID0gZnVuY3Rpb24gcmVuZGVyU2NvcmVGcm9tTFMoKSB7XG4gICAgdmFyIHJlY09iaiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0dhbWVTY29yZScpKTtcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2Lm1haW4nKTtcbiAgICBmb3IgKHZhciBrZXkgaW4gcmVjT2JqKSB7XG4gICAgICAgIGRpdi5pbm5lckhUTUwgKz0gJzxzcGFuPlxcdTA0MUFcXHUwNDNFXFx1MDQzQlxcdTA0MzhcXHUwNDQ3XFx1MDQzNVxcdTA0NDFcXHUwNDMyXFx1MDQzRSBcXHUwNDNFXFx1MDQ0N1xcdTA0M0FcXHUwNDNFXFx1MDQzNVxcdTA0MzIgJyArIGtleSArICcgXFx1MDQxOFxcdTA0M0NcXHUwNDRGOiAnICsgcmVjT2JqW2tleV0gKyAnPC9zcGFuPjxicj4nO1xuICAgIH1cbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbXh2WTJGc1UzUnZjbUZuWlM1cWN5SmRMQ0p1WVcxbGN5STZXeUpoWkdSVFkyOXlaVXhUSWl3aWMyTnZjbVVpTENKdVlXMWxJaXdpVEZNaUxDSktVMDlPSWl3aWNHRnljMlVpTENKc2IyTmhiRk4wYjNKaFoyVWlMQ0puWlhSSmRHVnRJaXdpY0hWemFDSXNJbk5sZEVsMFpXMGlMQ0p6ZEhKcGJtZHBabmtpTENKeVpXNWtaWEpUWTI5eVpVWnliMjFNVXlJc0luSmxZMDlpYWlJc0ltUnBkaUlzSW1SdlkzVnRaVzUwSWl3aWNYVmxjbmxUWld4bFkzUnZjaUlzSW10bGVTSXNJbWx1Ym1WeVNGUk5UQ0pkTENKdFlYQndhVzVuY3lJNklqczdPenM3UVVGQlFUczdPenRCUVVsUExFbEJRVWxCTEd0RFFVRmhMRk5CUVdKQkxGVkJRV0VzUTBGQlZVTXNTMEZCVml4RlFVRm5Ra01zU1VGQmFFSXNSVUZCYzBJN1FVRkRNVU1zVVVGQlNVTXNTMEZCUzBNc1MwRkJTME1zUzBGQlRDeERRVUZYUXl4aFFVRmhReXhQUVVGaUxFTkJRWEZDTEZkQlFYSkNMRU5CUVZnc1MwRkJhVVFzUlVGQk1VUTdRVUZEUVVvc1QwRkJSMFlzUzBGQlNDeEpRVUZaUlN4SFFVRkhSaXhMUVVGSUxFdEJRV0VzUlVGQmVrSTdRVUZEUVVVc1QwRkJSMFlzUzBGQlNDeEZRVUZWVHl4SlFVRldMRU5CUVdWT0xFbEJRV1k3UVVGRFFVa3NhVUpCUVdGSExFOUJRV0lzUTBGQmNVSXNWMEZCY2tJc1JVRkJhME5NTEV0QlFVdE5MRk5CUVV3c1EwRkJaVkFzUlVGQlppeERRVUZzUXp0QlFVTklMRU5CVEUwN08wRkJUMEVzU1VGQlNWRXNaMFJCUVc5Q0xGTkJRWEJDUVN4cFFrRkJiMElzUjBGQldUdEJRVU4yUXl4UlFVRkpReXhUUVVGVFVpeExRVUZMUXl4TFFVRk1MRU5CUVZkRExHRkJRV0ZETEU5QlFXSXNRMEZCY1VJc1YwRkJja0lzUTBGQldDeERRVUZpTzBGQlEwRXNVVUZCU1Uwc1RVRkJUVU1zVTBGQlUwTXNZVUZCVkN4RFFVRjFRaXhWUVVGMlFpeERRVUZXTzBGQlEwRXNVMEZCU3l4SlFVRkpReXhIUVVGVUxFbEJRV2RDU2l4TlFVRm9RaXhGUVVGM1FqdEJRVU53UWtNc1dVRkJTVWtzVTBGQlNpd3lSMEZCTWtORUxFZEJRVE5ETERaQ1FVRjFSRW9zVDBGQlQwa3NSMEZCVUN4RFFVRjJSRHRCUVVOSU8wRkJRMG9zUTBGT1RTSXNJbVpwYkdVaU9pSnNiMk5oYkZOMGIzSmhaMlV1YW5NaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SXZLaXBjYmlBcUlFTnlaV0YwWldRZ1lua2dZVzVrY21VZ2IyNGdNamt0U25WdUxURTNMbHh1SUNvdlhHNWNibVY0Y0c5eWRDQjJZWElnWVdSa1UyTnZjbVZNVXlBOUlHWjFibU4wYVc5dUlDaHpZMjl5WlN4dVlXMWxLU0I3WEc0Z0lDQWdkbUZ5SUV4VElEMGdTbE5QVGk1d1lYSnpaU2hzYjJOaGJGTjBiM0poWjJVdVoyVjBTWFJsYlNnblIyRnRaVk5qYjNKbEp5a3BJSHg4SUh0OU8xeHVJQ0FnSUV4VFczTmpiM0psWFNBOUlFeFRXM05qYjNKbFhTQjhmQ0JiWFR0Y2JpQWdJQ0JNVTF0elkyOXlaVjB1Y0hWemFDaHVZVzFsS1R0Y2JpQWdJQ0JzYjJOaGJGTjBiM0poWjJVdWMyVjBTWFJsYlNnblIyRnRaVk5qYjNKbEp5d2dTbE5QVGk1emRISnBibWRwWm5rb1RGTXBLVHRjYm4wN1hHNWNibVY0Y0c5eWRDQjJZWElnY21WdVpHVnlVMk52Y21WR2NtOXRURk1nUFNCbWRXNWpkR2x2YmlBb0tTQjdYRzRnSUNBZ2RtRnlJSEpsWTA5aWFpQTlJRXBUVDA0dWNHRnljMlVvYkc5allXeFRkRzl5WVdkbExtZGxkRWwwWlcwb0owZGhiV1ZUWTI5eVpTY3BLVHRjYmlBZ0lDQjJZWElnWkdsMklEMGdaRzlqZFcxbGJuUXVjWFZsY25sVFpXeGxZM1J2Y2lnblpHbDJMbTFoYVc0bktUdGNiaUFnSUNCbWIzSWdLSFpoY2lCclpYa2dhVzRnY21WalQySnFLU0I3WEc0Z0lDQWdJQ0FnSUdScGRpNXBibTVsY2toVVRVd2dLejBnWUR4emNHRnVQdENhMEw3UXU5QzQwWWZRdGRHQjBMTFF2aURRdnRHSDBMclF2dEMxMExJZ0pIdHJaWGw5SU5DWTBMelJqem9nSkh0eVpXTlBZbXBiYTJWNVhYMDhMM053WVc0K1BHSnlQbUE3WEc0Z0lDQWdmVnh1ZlRzaVhYMD1cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvY29tcG9uZW50c1xcXFxsb2NhbFN0b3JhZ2UuanNcIixcIi9jb21wb25lbnRzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG4vKipcbiAqIENyZWF0ZWQgYnkgYW5kcmUgb24gMjgtSnVuLTE3LlxuICovXG5mdW5jdGlvbiBQbGF5ZXIoY3R4KSB7XG4gICAgdmFyIHdpZHRoID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAzMDtcbiAgICB2YXIgaGVpZ2h0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiAzMDtcbiAgICB2YXIgY29sb3IgPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6ICdncmVlbic7XG4gICAgdmFyIHggPSBhcmd1bWVudHMubGVuZ3RoID4gNCAmJiBhcmd1bWVudHNbNF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1s0XSA6IDUwO1xuICAgIHZhciB5ID0gYXJndW1lbnRzLmxlbmd0aCA+IDUgJiYgYXJndW1lbnRzWzVdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbNV0gOiA1MDtcblxuICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuXG4gICAgdGhpcy5zcGVlZCA9IDA7XG4gICAgdGhpcy5hbmdsZSA9IDA7XG4gICAgdGhpcy5tb3ZlQW5nbGUgPSAwO1xufVxuXG5QbGF5ZXIucHJvdG90eXBlID0ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGN0eCkge1xuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHgudHJhbnNsYXRlKHRoaXMueCwgdGhpcy55KTtcbiAgICAgICAgY3R4LnJvdGF0ZSh0aGlzLmFuZ2xlKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLndpZHRoIC8gLTIsIHRoaXMuaGVpZ2h0IC8gLTIsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBuZXdQb3M6IGZ1bmN0aW9uIG5ld1BvcyhvcHRpb24sIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgdGhpcy5tb3ZlQW5nbGUgPSAwO1xuICAgICAgICB0aGlzLnNwZWVkID0gMDtcblxuICAgICAgICBvcHRpb24ubGVmdCAmJiAodGhpcy5tb3ZlQW5nbGUgPSAtNSk7XG4gICAgICAgIG9wdGlvbi5yaWdodCAmJiAodGhpcy5tb3ZlQW5nbGUgPSA1KTtcbiAgICAgICAgb3B0aW9uLnVwICYmICh0aGlzLnNwZWVkID0gNSk7XG4gICAgICAgIG9wdGlvbi5kb3duICYmICh0aGlzLnNwZWVkID0gLTUpO1xuXG4gICAgICAgIHRoaXMuYW5nbGUgKz0gdGhpcy5tb3ZlQW5nbGUgKiBNYXRoLlBJIC8gMTgwO1xuICAgICAgICB0aGlzLnggKz0gdGhpcy5zcGVlZCAqIE1hdGguc2luKHRoaXMuYW5nbGUpO1xuICAgICAgICB0aGlzLnkgLT0gdGhpcy5zcGVlZCAqIE1hdGguY29zKHRoaXMuYW5nbGUpO1xuXG4gICAgICAgIGlmICh0aGlzLnkgPiBoZWlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMueSA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy55IDwgMCkge1xuICAgICAgICAgICAgdGhpcy55ID0gaGVpZ2h0O1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMueCA+IHdpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLnggPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMueCA8IDApIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHdpZHRoO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFBsYXllcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluQnNZWGxsY2k1cWN5SmRMQ0p1WVcxbGN5STZXeUpRYkdGNVpYSWlMQ0pqZEhnaUxDSjNhV1IwYUNJc0ltaGxhV2RvZENJc0ltTnZiRzl5SWl3aWVDSXNJbmtpTENKemNHVmxaQ0lzSW1GdVoyeGxJaXdpYlc5MlpVRnVaMnhsSWl3aWNISnZkRzkwZVhCbElpd2lkWEJrWVhSbElpd2ljMkYyWlNJc0luUnlZVzV6YkdGMFpTSXNJbkp2ZEdGMFpTSXNJbVpwYkd4VGRIbHNaU0lzSW1acGJHeFNaV04wSWl3aWNtVnpkRzl5WlNJc0ltNWxkMUJ2Y3lJc0ltOXdkR2x2YmlJc0lteGxablFpTENKeWFXZG9kQ0lzSW5Wd0lpd2laRzkzYmlJc0lrMWhkR2dpTENKUVNTSXNJbk5wYmlJc0ltTnZjeUpkTENKdFlYQndhVzVuY3lJNklqczdPenM3UVVGQlFUczdPMEZCUjBFc1UwRkJVMEVzVFVGQlZDeERRVUZuUWtNc1IwRkJhRUlzUlVGQkswVTdRVUZCUVN4UlFVRXhSRU1zUzBGQk1FUXNkVVZCUVd4RUxFVkJRV3RFTzBGQlFVRXNVVUZCT1VORExFMUJRVGhETEhWRlFVRnlReXhGUVVGeFF6dEJRVUZCTEZGQlFXcERReXhMUVVGcFF5eDFSVUZCZWtJc1QwRkJlVUk3UVVGQlFTeFJRVUZvUWtNc1EwRkJaMElzZFVWQlFWb3NSVUZCV1R0QlFVRkJMRkZCUVZKRExFTkJRVkVzZFVWQlFVb3NSVUZCU1RzN1FVRkRNMFVzVTBGQlMwd3NSMEZCVEN4SFFVRlhRU3hIUVVGWU8wRkJRMEVzVTBGQlMwTXNTMEZCVEN4SFFVRmhRU3hMUVVGaU8wRkJRMEVzVTBGQlMwTXNUVUZCVEN4SFFVRmpRU3hOUVVGa08wRkJRMEVzVTBGQlMwTXNTMEZCVEN4SFFVRmhRU3hMUVVGaU8wRkJRMEVzVTBGQlMwTXNRMEZCVEN4SFFVRlRRU3hEUVVGVU8wRkJRMEVzVTBGQlMwTXNRMEZCVEN4SFFVRlRRU3hEUVVGVU96dEJRVVZCTEZOQlFVdERMRXRCUVV3c1IwRkJZU3hEUVVGaU8wRkJRMEVzVTBGQlMwTXNTMEZCVEN4SFFVRmhMRU5CUVdJN1FVRkRRU3hUUVVGTFF5eFRRVUZNTEVkQlFXbENMRU5CUVdwQ08wRkJRMGc3TzBGQlJVUlVMRTlCUVU5VkxGTkJRVkFzUjBGQmJVSTdRVUZEWmtNc1ZVRkVaU3hyUWtGRFVsWXNSMEZFVVN4RlFVTktPMEZCUTFCQkxGbEJRVWxYTEVsQlFVbzdRVUZEUVZnc1dVRkJTVmtzVTBGQlNpeERRVUZqTEV0QlFVdFNMRU5CUVc1Q0xFVkJRWE5DTEV0QlFVdERMRU5CUVROQ08wRkJRMEZNTEZsQlFVbGhMRTFCUVVvc1EwRkJWeXhMUVVGTFRpeExRVUZvUWp0QlFVTkJVQ3haUVVGSll5eFRRVUZLTEVkQlFXZENMRXRCUVV0WUxFdEJRWEpDTzBGQlEwRklMRmxCUVVsbExGRkJRVW9zUTBGQllTeExRVUZMWkN4TFFVRk1MRWRCUVdFc1EwRkJReXhEUVVFelFpeEZRVUU0UWl4TFFVRkxReXhOUVVGTUxFZEJRV01zUTBGQlF5eERRVUUzUXl4RlFVRm5SQ3hMUVVGTFJDeExRVUZ5UkN4RlFVRTBSQ3hMUVVGTFF5eE5RVUZxUlR0QlFVTkJSaXhaUVVGSlowSXNUMEZCU2p0QlFVTkJMR1ZCUVU4c1NVRkJVRHRCUVVOSUxFdEJWR003UVVGVlprTXNWVUZXWlN4clFrRlZVa01zVFVGV1VTeEZRVlZCYWtJc1MwRldRU3hGUVZWUFF5eE5RVlpRTEVWQlZXTTdRVUZEZWtJc1lVRkJTMDBzVTBGQlRDeEhRVUZwUWl4RFFVRnFRanRCUVVOQkxHRkJRVXRHTEV0QlFVd3NSMEZCWVN4RFFVRmlPenRCUVVWQldTeGxRVUZQUXl4SlFVRlFMRXRCUVdkQ0xFdEJRVXRZTEZOQlFVd3NSMEZCYVVJc1EwRkJReXhEUVVGc1F6dEJRVU5CVlN4bFFVRlBSU3hMUVVGUUxFdEJRV2xDTEV0QlFVdGFMRk5CUVV3c1IwRkJhVUlzUTBGQmJFTTdRVUZEUVZVc1pVRkJUMGNzUlVGQlVDeExRVUZqTEV0QlFVdG1MRXRCUVV3c1IwRkJZU3hEUVVFelFqdEJRVU5CV1N4bFFVRlBTU3hKUVVGUUxFdEJRV2RDTEV0QlFVdG9RaXhMUVVGTUxFZEJRV0VzUTBGQlF5eERRVUU1UWpzN1FVRkZRU3hoUVVGTFF5eExRVUZNTEVsQlFXTXNTMEZCUzBNc1UwRkJUQ3hIUVVGcFFtVXNTMEZCUzBNc1JVRkJkRUlzUjBGQk1rSXNSMEZCZWtNN1FVRkRRU3hoUVVGTGNFSXNRMEZCVEN4SlFVRlZMRXRCUVV0RkxFdEJRVXdzUjBGQllXbENMRXRCUVV0RkxFZEJRVXdzUTBGQlV5eExRVUZMYkVJc1MwRkJaQ3hEUVVGMlFqdEJRVU5CTEdGQlFVdEdMRU5CUVV3c1NVRkJWU3hMUVVGTFF5eExRVUZNTEVkQlFXRnBRaXhMUVVGTFJ5eEhRVUZNTEVOQlFWTXNTMEZCUzI1Q0xFdEJRV1FzUTBGQmRrSTdPMEZCUlVFc1dVRkJTU3hMUVVGTFJpeERRVUZNTEVkQlFWTklMRTFCUVdJc1JVRkJiMEk3UVVGRGFFSXNhVUpCUVV0SExFTkJRVXdzUjBGQlV5eERRVUZVTzBGQlEwZ3NVMEZHUkN4TlFVVlBMRWxCUVVrc1MwRkJTMEVzUTBGQlRDeEhRVUZUTEVOQlFXSXNSVUZCWlR0QlFVTnNRaXhwUWtGQlMwRXNRMEZCVEN4SFFVRlRTQ3hOUVVGVU8wRkJRMGdzVTBGR1RTeE5RVVZCTEVsQlFVa3NTMEZCUzBVc1EwRkJUQ3hIUVVGVFNDeExRVUZpTEVWQlFXMUNPMEZCUTNSQ0xHbENRVUZMUnl4RFFVRk1MRWRCUVZNc1EwRkJWRHRCUVVOSUxGTkJSazBzVFVGRlFTeEpRVUZKTEV0QlFVdEJMRU5CUVV3c1IwRkJVeXhEUVVGaUxFVkJRV1U3UVVGRGJFSXNhVUpCUVV0QkxFTkJRVXdzUjBGQlUwZ3NTMEZCVkR0QlFVTklPMEZCUTBRc1pVRkJUeXhKUVVGUU8wRkJRMGc3UVVGcVEyTXNRMEZCYmtJN08ydENRVzlEWlVZc1RTSXNJbVpwYkdVaU9pSndiR0Y1WlhJdWFuTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUl2S2lwY2JpQXFJRU55WldGMFpXUWdZbmtnWVc1a2NtVWdiMjRnTWpndFNuVnVMVEUzTGx4dUlDb3ZYRzVtZFc1amRHbHZiaUJRYkdGNVpYSW9ZM1I0TENCM2FXUjBhQ0E5SURNd0xDQm9aV2xuYUhRZ1BTQXpNQ3dnWTI5c2IzSWdQU0FuWjNKbFpXNG5MQ0I0SUQwZ05UQXNJSGtnUFNBMU1Da2dlMXh1SUNBZ0lIUm9hWE11WTNSNElEMGdZM1I0TzF4dUlDQWdJSFJvYVhNdWQybGtkR2dnUFNCM2FXUjBhRHRjYmlBZ0lDQjBhR2x6TG1obGFXZG9kQ0E5SUdobGFXZG9kRHRjYmlBZ0lDQjBhR2x6TG1OdmJHOXlJRDBnWTI5c2IzSTdYRzRnSUNBZ2RHaHBjeTU0SUQwZ2VEdGNiaUFnSUNCMGFHbHpMbmtnUFNCNU8xeHVYRzRnSUNBZ2RHaHBjeTV6Y0dWbFpDQTlJREE3WEc0Z0lDQWdkR2hwY3k1aGJtZHNaU0E5SURBN1hHNGdJQ0FnZEdocGN5NXRiM1psUVc1bmJHVWdQU0F3TzF4dWZWeHVYRzVRYkdGNVpYSXVjSEp2ZEc5MGVYQmxJRDBnZTF4dUlDQWdJSFZ3WkdGMFpTaGpkSGdwZTF4dUlDQWdJQ0FnSUNCamRIZ3VjMkYyWlNncE8xeHVJQ0FnSUNBZ0lDQmpkSGd1ZEhKaGJuTnNZWFJsS0hSb2FYTXVlQ3dnZEdocGN5NTVLVHRjYmlBZ0lDQWdJQ0FnWTNSNExuSnZkR0YwWlNoMGFHbHpMbUZ1WjJ4bEtUdGNiaUFnSUNBZ0lDQWdZM1I0TG1acGJHeFRkSGxzWlNBOUlIUm9hWE11WTI5c2IzSTdYRzRnSUNBZ0lDQWdJR04wZUM1bWFXeHNVbVZqZENoMGFHbHpMbmRwWkhSb0lDOGdMVElzSUhSb2FYTXVhR1ZwWjJoMElDOGdMVElzSUhSb2FYTXVkMmxrZEdnc0lIUm9hWE11YUdWcFoyaDBLVHRjYmlBZ0lDQWdJQ0FnWTNSNExuSmxjM1J2Y21Vb0tUdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlIUm9hWE03WEc0Z0lDQWdmU3hjYmlBZ0lDQnVaWGRRYjNNb2IzQjBhVzl1TENCM2FXUjBhQ3dnYUdWcFoyaDBLWHRjYmlBZ0lDQWdJQ0FnZEdocGN5NXRiM1psUVc1bmJHVWdQU0F3TzF4dUlDQWdJQ0FnSUNCMGFHbHpMbk53WldWa0lEMGdNRHRjYmx4dUlDQWdJQ0FnSUNCdmNIUnBiMjR1YkdWbWRDQW1KaUFvZEdocGN5NXRiM1psUVc1bmJHVWdQU0F0TlNrN1hHNGdJQ0FnSUNBZ0lHOXdkR2x2Ymk1eWFXZG9kQ0FtSmlBb2RHaHBjeTV0YjNabFFXNW5iR1VnUFNBMUtUdGNiaUFnSUNBZ0lDQWdiM0IwYVc5dUxuVndJQ1ltSUNoMGFHbHpMbk53WldWa0lEMGdOU2s3WEc0Z0lDQWdJQ0FnSUc5d2RHbHZiaTVrYjNkdUlDWW1JQ2gwYUdsekxuTndaV1ZrSUQwZ0xUVXBPMXh1WEc0Z0lDQWdJQ0FnSUhSb2FYTXVZVzVuYkdVZ0t6MGdkR2hwY3k1dGIzWmxRVzVuYkdVZ0tpQk5ZWFJvTGxCSklDOGdNVGd3TzF4dUlDQWdJQ0FnSUNCMGFHbHpMbmdnS3owZ2RHaHBjeTV6Y0dWbFpDQXFJRTFoZEdndWMybHVLSFJvYVhNdVlXNW5iR1VwTzF4dUlDQWdJQ0FnSUNCMGFHbHpMbmtnTFQwZ2RHaHBjeTV6Y0dWbFpDQXFJRTFoZEdndVkyOXpLSFJvYVhNdVlXNW5iR1VwTzF4dVhHNGdJQ0FnSUNBZ0lHbG1JQ2gwYUdsekxua2dQaUJvWldsbmFIUXBlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTU1SUQwZ01EdGNiaUFnSUNBZ0lDQWdmU0JsYkhObElHbG1JQ2gwYUdsekxua2dQQ0F3S1h0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFJvYVhNdWVTQTlJR2hsYVdkb2REdGNiaUFnSUNBZ0lDQWdmU0JsYkhObElHbG1JQ2gwYUdsekxuZ2dQaUIzYVdSMGFDbDdYRzRnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbmdnUFNBd08xeHVJQ0FnSUNBZ0lDQjlJR1ZzYzJVZ2FXWWdLSFJvYVhNdWVDQThJREFwZTF4dUlDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k1NElEMGdkMmxrZEdnN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlIUm9hWE03WEc0Z0lDQWdmVnh1ZlR0Y2JseHVaWGh3YjNKMElHUmxabUYxYkhRZ1VHeGhlV1Z5T3lKZGZRPT1cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvY29tcG9uZW50c1xcXFxwbGF5ZXIuanNcIixcIi9jb21wb25lbnRzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG4vKipcbiAqIENyZWF0ZWQgYnkgYW5kcmUgb24gMjktSnVuLTE3LlxuICovXG5cbmZ1bmN0aW9uIFRpbWVyKGVsZW1lbnQpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgdGhpcy50aW1lID0gMDtcbiAgICB0aGlzLnN0YXJ0VGltZXIoKTtcbn1cblxuVGltZXIucHJvdG90eXBlID0ge1xuICAgIHN0YXJ0VGltZXI6IGZ1bmN0aW9uIHN0YXJ0VGltZXIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5lbGVtZW50LmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAgIHRoaXMudGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy50aW1lKys7XG4gICAgICAgICAgICBfdGhpcy5lbGVtZW50LmlubmVySFRNTCA9IF90aGlzLnRpbWU7XG4gICAgICAgIH0sIDEwMDApO1xuICAgIH1cbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFRpbWVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5ScGJXVnlMbXB6SWwwc0ltNWhiV1Z6SWpwYklsUnBiV1Z5SWl3aVpXeGxiV1Z1ZENJc0luUnBiV1VpTENKemRHRnlkRlJwYldWeUlpd2ljSEp2ZEc5MGVYQmxJaXdpYVc1dVpYSklWRTFNSWl3aWRHbHRaWElpTENKelpYUkpiblJsY25aaGJDSmRMQ0p0WVhCd2FXNW5jeUk2SWpzN096czdRVUZCUVRzN096dEJRVWxCTEZOQlFWTkJMRXRCUVZRc1EwRkJaVU1zVDBGQlppeEZRVUYzUWp0QlFVTndRaXhUUVVGTFFTeFBRVUZNTEVkQlFXVkJMRTlCUVdZN08wRkJSVUVzVTBGQlMwTXNTVUZCVEN4SFFVRlpMRU5CUVZvN1FVRkRRU3hUUVVGTFF5eFZRVUZNTzBGQlEwZzdPMEZCUlVSSUxFMUJRVTFKTEZOQlFVNHNSMEZCYTBJN1FVRkRaRVFzWTBGRVl5eDNRa0ZEUmp0QlFVRkJPenRCUVVOU0xHRkJRVXRHTEU5QlFVd3NRMEZCWVVrc1UwRkJZaXhIUVVGNVFpeEZRVUY2UWpzN1FVRkZRU3hoUVVGTFF5eExRVUZNTEVkQlFXRkRMRmxCUVZrc1dVRkJUVHRCUVVNelFpeHJRa0ZCUzB3c1NVRkJURHRCUVVOQkxHdENRVUZMUkN4UFFVRk1MRU5CUVdGSkxGTkJRV0lzUjBGQmVVSXNUVUZCUzBnc1NVRkJPVUk3UVVGRFNDeFRRVWhaTEVWQlIxWXNTVUZJVlN4RFFVRmlPMEZCU1VnN1FVRlNZU3hEUVVGc1FqczdhMEpCVjJWR0xFc2lMQ0ptYVd4bElqb2lkR2x0WlhJdWFuTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUl2S2lwY2JpQXFJRU55WldGMFpXUWdZbmtnWVc1a2NtVWdiMjRnTWprdFNuVnVMVEUzTGx4dUlDb3ZYRzVjYm1aMWJtTjBhVzl1SUZScGJXVnlLR1ZzWlcxbGJuUXBJSHRjYmlBZ0lDQjBhR2x6TG1Wc1pXMWxiblFnUFNCbGJHVnRaVzUwTzF4dVhHNGdJQ0FnZEdocGN5NTBhVzFsSUQwZ01EdGNiaUFnSUNCMGFHbHpMbk4wWVhKMFZHbHRaWElvS1R0Y2JuMWNibHh1VkdsdFpYSXVjSEp2ZEc5MGVYQmxJRDBnZTF4dUlDQWdJSE4wWVhKMFZHbHRaWElvS1h0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVsYkdWdFpXNTBMbWx1Ym1WeVNGUk5UQ0E5SUNjbk8xeHVYRzRnSUNBZ0lDQWdJSFJvYVhNdWRHbHRaWElnUFNCelpYUkpiblJsY25aaGJDZ29LU0E5UGlCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxuUnBiV1VyS3p0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFJvYVhNdVpXeGxiV1Z1ZEM1cGJtNWxja2hVVFV3Z1BTQjBhR2x6TG5ScGJXVTdYRzRnSUNBZ0lDQWdJSDBzSURFd01EQXBPMXh1SUNBZ0lIMWNibjA3WEc1Y2JtVjRjRzl5ZENCa1pXWmhkV3gwSUZScGJXVnlPeUpkZlE9PVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9jb21wb25lbnRzXFxcXHRpbWVyLmpzXCIsXCIvY29tcG9uZW50c1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIF9ldmVudEJ1cyA9IHJlcXVpcmUoJy4vdXRpbHMvZXZlbnRCdXMnKTtcblxudmFyIF9ldmVudEJ1czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9ldmVudEJ1cyk7XG5cbnZhciBfcm91dGVyID0gcmVxdWlyZSgnLi91dGlscy9yb3V0ZXInKTtcblxudmFyIF9yb3V0ZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcm91dGVyKTtcblxudmFyIF9pbmRleCA9IHJlcXVpcmUoJy4vcm91dGVzL2luZGV4Jyk7XG5cbnZhciBfYWJvdXQgPSByZXF1aXJlKCcuL3JvdXRlcy9hYm91dCcpO1xuXG52YXIgX2dhbWUgPSByZXF1aXJlKCcuL3JvdXRlcy9nYW1lJyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciByb3V0ZXMgPSBbX2luZGV4LmluZGV4LCBfYWJvdXQuYWJvdXQsIF9nYW1lLmdhbWVdO1xuXG52YXIgZXZlbnRCdXMgPSBuZXcgX2V2ZW50QnVzMi5kZWZhdWx0KCk7XG5cbm5ldyBfcm91dGVyMi5kZWZhdWx0KHsgcm91dGVzOiByb3V0ZXMgfSwgZXZlbnRCdXMpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW1aaGEyVmZaalkxWmpNM056Y3Vhbk1pWFN3aWJtRnRaWE1pT2xzaWNtOTFkR1Z6SWl3aVpYWmxiblJDZFhNaVhTd2liV0Z3Y0dsdVozTWlPaUk3TzBGQlEwRTdPenM3UVVGRFFUczdPenRCUVVWQk96dEJRVU5CT3p0QlFVTkJPenM3TzBGQlJVRXNTVUZCVFVFc1UwRkJVeXgzUTBGQlpqczdRVUZGUVN4SlFVRk5ReXhYUVVGWExIZENRVUZxUWpzN1FVRkZRU3h4UWtGQlZ5eEZRVUZEUkN4alFVRkVMRVZCUVZnc1JVRkJjVUpETEZGQlFYSkNJaXdpWm1sc1pTSTZJbVpoYTJWZlpqWTFaak0zTnpjdWFuTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUpjY2x4dWFXMXdiM0owSUVWMlpXNTBRblZ6SUdaeWIyMGdKeTR2ZFhScGJITXZaWFpsYm5SQ2RYTW5PMXh5WEc1cGJYQnZjblFnVW05MWRHVnlJR1p5YjIwZ0p5NHZkWFJwYkhNdmNtOTFkR1Z5Snp0Y2NseHVYSEpjYm1sdGNHOXlkQ0I3SUdsdVpHVjRJSDBnWm5KdmJTQW5MaTl5YjNWMFpYTXZhVzVrWlhnbk8xeHlYRzVwYlhCdmNuUWdleUJoWW05MWRDQjlJR1p5YjIwZ0p5NHZjbTkxZEdWekwyRmliM1YwSnp0Y2NseHVhVzF3YjNKMElIc2daMkZ0WlNCOUlHWnliMjBnSnk0dmNtOTFkR1Z6TDJkaGJXVW5PMXh5WEc1Y2NseHVZMjl1YzNRZ2NtOTFkR1Z6SUQwZ1cybHVaR1Y0TENCaFltOTFkQ3dnWjJGdFpWMDdYSEpjYmx4eVhHNWpiMjV6ZENCbGRtVnVkRUoxY3lBOUlHNWxkeUJGZG1WdWRFSjFjeWdwTzF4eVhHNWNjbHh1Ym1WM0lGSnZkWFJsY2loN2NtOTFkR1Z6ZlN3Z1pYWmxiblJDZFhNcE95SmRmUT09XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL2Zha2VfZjY1ZjM3NzcuanNcIixcIi9cIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuYWJvdXQgPSB1bmRlZmluZWQ7XG5cbnZhciBfbG9jYWxTdG9yYWdlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9sb2NhbFN0b3JhZ2UnKTtcblxudmFyIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5tYWluJyk7XG52YXIgYWJvdXQgPSB7XG4gICAgbmFtZTogJ2Fib3V0JyxcbiAgICBtYXRjaDogZnVuY3Rpb24gbWF0Y2godGV4dCkge1xuICAgICAgICByZXR1cm4gdGV4dCA9PT0gJ2Fib3V0JztcbiAgICB9LFxuICAgIG9uQmVmb3JlRW50ZXI6IGZ1bmN0aW9uIG9uQmVmb3JlRW50ZXIoKSB7XG4gICAgICAgIHJldHVybiBjb25zb2xlLmxvZygnb25CZWZvcmVFbnRlciBhYm91dCcpO1xuICAgIH0sXG4gICAgb25FbnRlcjogZnVuY3Rpb24gb25FbnRlcigpIHtcbiAgICAgICAgZGl2LmlubmVySFRNTCA9ICc8cD7Qky7Qky7QkdC+0YDQuNGB0LXQstC40Yc8L3A+IDxhIGhyZWY9XCJodHRwczovL3ZrLmNvbS9pZDU1NTY5Mzg5XCIgdGFyZ2V0PVwiX2JsYW5rXCI+Vks8L2E+PGJyPjxocj4nO1xuICAgICAgICAoMCwgX2xvY2FsU3RvcmFnZS5yZW5kZXJTY29yZUZyb21MUykoKTtcbiAgICB9LFxuICAgIG9uTGVhdmU6IGZ1bmN0aW9uIG9uTGVhdmUoKSB7XG4gICAgICAgIHJldHVybiBkaXYuaW5uZXJIVE1MID0gJyc7XG4gICAgfVxufTtcblxuZXhwb3J0cy5hYm91dCA9IGFib3V0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW1GaWIzVjBMbXB6SWwwc0ltNWhiV1Z6SWpwYkltUnBkaUlzSW1SdlkzVnRaVzUwSWl3aWNYVmxjbmxUWld4bFkzUnZjaUlzSW1GaWIzVjBJaXdpYm1GdFpTSXNJbTFoZEdOb0lpd2lkR1Y0ZENJc0ltOXVRbVZtYjNKbFJXNTBaWElpTENKamIyNXpiMnhsSWl3aWJHOW5JaXdpYjI1RmJuUmxjaUlzSW1sdWJtVnlTRlJOVENJc0ltOXVUR1ZoZG1VaVhTd2liV0Z3Y0dsdVozTWlPaUk3T3pzN096czdRVUZCUVRzN1FVRkZRU3hKUVVGSlFTeE5RVUZOUXl4VFFVRlRReXhoUVVGVUxFTkJRWFZDTEZWQlFYWkNMRU5CUVZZN1FVRkRRU3hKUVVGSlF5eFJRVUZSTzBGQlExSkRMRlZCUVUwc1QwRkVSVHRCUVVWU1F5eFhRVUZQTEdWQlFVTkRMRWxCUVVRN1FVRkJRU3hsUVVGVlFTeFRRVUZUTEU5QlFXNUNPMEZCUVVFc1MwRkdRenRCUVVkU1F5eHRRa0ZCWlR0QlFVRkJMR1ZCUVUxRExGRkJRVkZETEVkQlFWSXNkVUpCUVU0N1FVRkJRU3hMUVVoUU8wRkJTVkpETEdGQlFWTXNiVUpCUVUwN1FVRkRXRllzV1VGQlNWY3NVMEZCU2l4SFFVRm5RaXg1UmtGQmFFSTdRVUZEUVR0QlFVTklMRXRCVUU4N1FVRlJVa01zWVVGQlV6dEJRVUZCTEdWQlFVMWFMRWxCUVVsWExGTkJRVW9zUjBGQlowSXNSVUZCZEVJN1FVRkJRVHRCUVZKRUxFTkJRVm83TzFGQlYxTlNMRXNzUjBGQlFVRXNTeUlzSW1acGJHVWlPaUpoWW05MWRDNXFjeUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSW1sdGNHOXlkQ0I3Y21WdVpHVnlVMk52Y21WR2NtOXRURk45SUdaeWIyMGdKeTR1TDJOdmJYQnZibVZ1ZEhNdmJHOWpZV3hUZEc5eVlXZGxKMXh1WEc1MllYSWdaR2wySUQwZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWduWkdsMkxtMWhhVzRuS1R0Y2JuWmhjaUJoWW05MWRDQTlJSHRjYmlBZ0lDQnVZVzFsT2lBbllXSnZkWFFuTEZ4dUlDQWdJRzFoZEdOb09pQW9kR1Y0ZENrZ1BUNGdkR1Y0ZENBOVBUMGdKMkZpYjNWMEp5eGNiaUFnSUNCdmJrSmxabTl5WlVWdWRHVnlPaUFvS1NBOVBpQmpiMjV6YjJ4bExteHZaeWhnYjI1Q1pXWnZjbVZGYm5SbGNpQmhZbTkxZEdBcExGeHVJQ0FnSUc5dVJXNTBaWEk2SUNncElEMCtJSHRjYmlBZ0lDQWdJQ0FnWkdsMkxtbHVibVZ5U0ZSTlRDQTlJQ2M4Y0Q3UWt5N1FreTdRa2RDKzBZRFF1TkdCMExYUXN0QzQwWWM4TDNBK0lEeGhJR2h5WldZOVhDSm9kSFJ3Y3pvdkwzWnJMbU52YlM5cFpEVTFOVFk1TXpnNVhDSWdkR0Z5WjJWMFBWd2lYMkpzWVc1clhDSStWa3M4TDJFK1BHSnlQanhvY2o0bk8xeHVJQ0FnSUNBZ0lDQnlaVzVrWlhKVFkyOXlaVVp5YjIxTVV5Z3BPMXh1SUNBZ0lIMHNYRzRnSUNBZ2IyNU1aV0YyWlRvZ0tDa2dQVDRnWkdsMkxtbHVibVZ5U0ZSTlRDQTlJQ2NuWEc1OU8xeHVYRzVsZUhCdmNuUWdleUJoWW05MWRDQjlPeUpkZlE9PVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9yb3V0ZXNcXFxcYWJvdXQuanNcIixcIi9yb3V0ZXNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZ2FtZSA9IHVuZGVmaW5lZDtcblxudmFyIF9nYW1lQXJlbmEgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2dhbWVBcmVuYScpO1xuXG52YXIgX2dhbWVBcmVuYTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nYW1lQXJlbmEpO1xuXG52YXIgX3BsYXllciA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvcGxheWVyJyk7XG5cbnZhciBfcGxheWVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BsYXllcik7XG5cbnZhciBfZW5lbXkgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2VuZW15Jyk7XG5cbnZhciBfZW5lbXkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZW5lbXkpO1xuXG52YXIgX3RpbWVyID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy90aW1lcicpO1xuXG52YXIgX3RpbWVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RpbWVyKTtcblxudmFyIF9sb2NhbFN0b3JhZ2UgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2xvY2FsU3RvcmFnZScpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgQVJFTkFfV0lEVEggPSA3MDA7XG52YXIgQVJFTkFfSEVJR0hUID0gNDAwO1xuXG52YXIgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2Lm1haW4nKTtcbnZhciBnYW1lID0ge1xuICAgIG5hbWU6ICdnYW1lJyxcbiAgICBtYXRjaDogZnVuY3Rpb24gbWF0Y2godGV4dCkge1xuICAgICAgICByZXR1cm4gdGV4dCA9PT0gJ2dhbWUnO1xuICAgIH0sXG4gICAgb25FbnRlcjogZnVuY3Rpb24gb25FbnRlcihldmVudEJ1cykge1xuICAgICAgICBkaXYuaW5uZXJIVE1MID0gJ1xcbjxoMj5HYW1lPC9oMj4gPGhyPlxcbjxidXR0b24gY2xhc3M9XCJzdGFydFwiPlN0YXJ0PC9idXR0b24+XFxuXFxuJztcbiAgICAgICAgdmFyIGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5zdGFydCcpO1xuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkaXYuaW5uZXJIVE1MICs9ICc8c3BhbiBjbGFzcz1cInNjb3JlXCI+PC9zcGFuPjxzcGFuIGNsYXNzPVwibHZsXCI+IExldmVsOiAwPC9zcGFuPjxkaXY+PGNhbnZhcyBzdHlsZT1cImJvcmRlcjogc29saWQgMXB4IHJlZFwiPjwvY2FudmFzPjwvZGl2Pic7XG4gICAgICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJyk7XG4gICAgICAgICAgICB2YXIgc2NvcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzcGFuLnNjb3JlJyk7XG4gICAgICAgICAgICB2YXIgbHZsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc3Bhbi5sdmwnKTtcbiAgICAgICAgICAgIHZhciB0aW1lciA9IG5ldyBfdGltZXIyLmRlZmF1bHQoc2NvcmUpO1xuICAgICAgICAgICAgdmFyIGdhbWVBcmVuYSA9IG5ldyBfZ2FtZUFyZW5hMi5kZWZhdWx0KGNhbnZhcywgbHZsLCB0aW1lciwgQVJFTkFfV0lEVEgsIEFSRU5BX0hFSUdIVCwgX3BsYXllcjIuZGVmYXVsdCwgX2VuZW15Mi5kZWZhdWx0LCBldmVudEJ1cyk7XG5cbiAgICAgICAgICAgIGV2ZW50QnVzLm9uKCdnYW1lOmZpbmlzaCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IHByb21wdCgn0JLQstC10LTQuNGC0LUg0LLQsNGI0LUg0LjQvNGPJywgJ0FuZHJleScpO1xuICAgICAgICAgICAgICAgICgwLCBfbG9jYWxTdG9yYWdlLmFkZFNjb3JlTFMpKHNjb3JlLmlubmVyVGV4dCwgbmFtZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBvbkxlYXZlOiBmdW5jdGlvbiBvbkxlYXZlKCkge1xuICAgICAgICByZXR1cm4gZGl2LmlubmVySFRNTCA9ICcnO1xuICAgIH1cbn07XG5cbmV4cG9ydHMuZ2FtZSA9IGdhbWU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbWRoYldVdWFuTWlYU3dpYm1GdFpYTWlPbHNpUVZKRlRrRmZWMGxFVkVnaUxDSkJVa1ZPUVY5SVJVbEhTRlFpTENKa2FYWWlMQ0prYjJOMWJXVnVkQ0lzSW5GMVpYSjVVMlZzWldOMGIzSWlMQ0puWVcxbElpd2libUZ0WlNJc0ltMWhkR05vSWl3aWRHVjRkQ0lzSW05dVJXNTBaWElpTENKbGRtVnVkRUoxY3lJc0ltbHVibVZ5U0ZSTlRDSXNJbUowYmlJc0ltRmtaRVYyWlc1MFRHbHpkR1Z1WlhJaUxDSmpZVzUyWVhNaUxDSnpZMjl5WlNJc0lteDJiQ0lzSW5ScGJXVnlJaXdpWjJGdFpVRnlaVzVoSWl3aWIyNGlMQ0p3Y205dGNIUWlMQ0pwYm01bGNsUmxlSFFpTENKdmJreGxZWFpsSWwwc0ltMWhjSEJwYm1keklqb2lPenM3T3pzN08wRkJRVUU3T3pzN1FVRkRRVHM3T3p0QlFVTkJPenM3TzBGQlJVRTdPenM3UVVGRFFUczdPenRCUVVWQkxFbEJRVTFCTEdOQlFXTXNSMEZCY0VJN1FVRkRRU3hKUVVGTlF5eGxRVUZsTEVkQlFYSkNPenRCUVVkQkxFbEJRVWxETEUxQlFVMURMRk5CUVZORExHRkJRVlFzUTBGQmRVSXNWVUZCZGtJc1EwRkJWanRCUVVOQkxFbEJRVWxETEU5QlFVODdRVUZEVUVNc1ZVRkJUU3hOUVVSRE8wRkJSVkJETEZkQlFVOHNaVUZCUTBNc1NVRkJSRHRCUVVGQkxHVkJRVlZCTEZOQlFWTXNUVUZCYmtJN1FVRkJRU3hMUVVaQk8wRkJSMUJETEdGQlFWTXNhVUpCUVVORExGRkJRVVFzUlVGQll6dEJRVU51UWxJc1dVRkJTVk1zVTBGQlNqdEJRVXRCTEZsQlFVbERMRTFCUVUxVUxGTkJRVk5ETEdGQlFWUXNRMEZCZFVJc1kwRkJka0lzUTBGQlZqdEJRVU5CVVN4WlFVRkpReXhuUWtGQlNpeERRVUZ4UWl4UFFVRnlRaXhGUVVFNFFpeFpRVUZOTzBGQlEyaERXQ3huUWtGQlNWTXNVMEZCU2p0QlFVTkJMR2RDUVVGSlJ5eFRRVUZUV0N4VFFVRlRReXhoUVVGVUxFTkJRWFZDTEZGQlFYWkNMRU5CUVdJN1FVRkRRU3huUWtGQlNWY3NVVUZCVVZvc1UwRkJVME1zWVVGQlZDeERRVUYxUWl4WlFVRjJRaXhEUVVGYU8wRkJRMEVzWjBKQlFVbFpMRTFCUVUxaUxGTkJRVk5ETEdGQlFWUXNRMEZCZFVJc1ZVRkJka0lzUTBGQlZqdEJRVU5CTEdkQ1FVRkpZU3hSUVVGUkxHOUNRVUZWUml4TFFVRldMRU5CUVZvN1FVRkRRU3huUWtGQlNVY3NXVUZCV1N4M1FrRkJZMG9zVFVGQlpDeEZRVUZ6UWtVc1IwRkJkRUlzUlVGQk1rSkRMRXRCUVROQ0xFVkJRV3REYWtJc1YwRkJiRU1zUlVGQkswTkRMRmxCUVM5RExIRkRRVUUwUlZNc1VVRkJOVVVzUTBGQmFFSTdPMEZCUlVGQkxIRkNRVUZUVXl4RlFVRlVMRU5CUVZrc1lVRkJXaXhGUVVFeVFpeFpRVUZOTzBGQlF6ZENMRzlDUVVGSllpeFBRVUZQWXl4UFFVRlBMR3RDUVVGUUxFVkJRVEpDTEZGQlFUTkNMRU5CUVZnN1FVRkRRU3c0UTBGQlYwd3NUVUZCVFUwc1UwRkJha0lzUlVGQk5FSm1MRWxCUVRWQ08wRkJSVWdzWVVGS1JEdEJRVXRJTEZOQllrUTdRVUZqU0N4TFFYaENUVHRCUVhsQ1VHZENMR0ZCUVZNN1FVRkJRU3hsUVVGTmNFSXNTVUZCU1ZNc1UwRkJTaXhIUVVGblFpeEZRVUYwUWp0QlFVRkJPMEZCZWtKR0xFTkJRVmc3TzFGQk5FSlJUaXhKTEVkQlFVRkJMRWtpTENKbWFXeGxJam9pWjJGdFpTNXFjeUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSW1sdGNHOXlkQ0JIWVcxbFFYSmxibUVnWm5KdmJTQW5MaTR2WTI5dGNHOXVaVzUwY3k5bllXMWxRWEpsYm1Fbk8xeHVhVzF3YjNKMElGQnNZWGxsY2lCbWNtOXRJQ0FuTGk0dlkyOXRjRzl1Wlc1MGN5OXdiR0Y1WlhJbk8xeHVhVzF3YjNKMElFVnVaVzE1SUdaeWIyMGdKeTR1TDJOdmJYQnZibVZ1ZEhNdlpXNWxiWGtuTzF4dVhHNXBiWEJ2Y25RZ1ZHbHRaWElnWm5KdmJTQW5MaTR2WTI5dGNHOXVaVzUwY3k5MGFXMWxjaWM3WEc1cGJYQnZjblFnZXlCaFpHUlRZMjl5WlV4VElIMGdabkp2YlNBbkxpNHZZMjl0Y0c5dVpXNTBjeTlzYjJOaGJGTjBiM0poWjJVbk8xeHVYRzVqYjI1emRDQkJVa1ZPUVY5WFNVUlVTQ0E5SURjd01EdGNibU52Ym5OMElFRlNSVTVCWDBoRlNVZElWQ0E5SURRd01EdGNibHh1WEc1MllYSWdaR2wySUQwZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWduWkdsMkxtMWhhVzRuS1R0Y2JuWmhjaUJuWVcxbElEMGdlMXh1SUNBZ0lHNWhiV1U2SUNkbllXMWxKeXhjYmlBZ0lDQnRZWFJqYURvZ0tIUmxlSFFwSUQwK0lIUmxlSFFnUFQwOUlDZG5ZVzFsSnl4Y2JpQWdJQ0J2YmtWdWRHVnlPaUFvWlhabGJuUkNkWE1wSUQwK0lIdGNiaUFnSUNBZ0lDQWdaR2wyTG1sdWJtVnlTRlJOVENBOUlHQmNianhvTWo1SFlXMWxQQzlvTWo0Z1BHaHlQbHh1UEdKMWRIUnZiaUJqYkdGemN6MWNJbk4wWVhKMFhDSStVM1JoY25ROEwySjFkSFJ2Ymo1Y2JseHVZRHRjYmlBZ0lDQWdJQ0FnYkdWMElHSjBiaUE5SUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9KMkoxZEhSdmJpNXpkR0Z5ZENjcE8xeHVJQ0FnSUNBZ0lDQmlkRzR1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWduWTJ4cFkyc25MQ0FvS1NBOVBpQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCa2FYWXVhVzV1WlhKSVZFMU1JQ3M5SUdBOGMzQmhiaUJqYkdGemN6MWNJbk5qYjNKbFhDSStQQzl6Y0dGdVBqeHpjR0Z1SUdOc1lYTnpQVndpYkhac1hDSStJRXhsZG1Wc09pQXdQQzl6Y0dGdVBqeGthWFkrUEdOaGJuWmhjeUJ6ZEhsc1pUMWNJbUp2Y21SbGNqb2djMjlzYVdRZ01YQjRJSEpsWkZ3aVBqd3ZZMkZ1ZG1GelBqd3ZaR2wyUG1BN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ1kyRnVkbUZ6SUQwZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWduWTJGdWRtRnpKeWs3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjJZWElnYzJOdmNtVWdQU0JrYjJOMWJXVnVkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtDZHpjR0Z1TG5OamIzSmxKeWs3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjJZWElnYkhac0lEMGdaRzlqZFcxbGJuUXVjWFZsY25sVFpXeGxZM1J2Y2lnbmMzQmhiaTVzZG13bktUdGNiaUFnSUNBZ0lDQWdJQ0FnSUd4bGRDQjBhVzFsY2lBOUlHNWxkeUJVYVcxbGNpaHpZMjl5WlNrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JzWlhRZ1oyRnRaVUZ5Wlc1aElEMGdibVYzSUVkaGJXVkJjbVZ1WVNoallXNTJZWE1zSUd4MmJDd2dkR2x0WlhJc0lFRlNSVTVCWDFkSlJGUklMQ0JCVWtWT1FWOUlSVWxIU0ZRc0lGQnNZWGxsY2l3Z1JXNWxiWGtzSUdWMlpXNTBRblZ6S1R0Y2JseHVJQ0FnSUNBZ0lDQWdJQ0FnWlhabGJuUkNkWE11YjI0b0oyZGhiV1U2Wm1sdWFYTm9KeXdnS0NrZ1BUNGdlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCdVlXMWxJRDBnY0hKdmJYQjBLQ2ZRa3RDeTBMWFF0TkM0MFlMUXRTRFFzdEN3MFlqUXRTRFF1TkM4MFk4bkxDQW5RVzVrY21WNUp5azdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZV1JrVTJOdmNtVk1VeWh6WTI5eVpTNXBibTVsY2xSbGVIUXNJRzVoYldVcE8xeHVYRzRnSUNBZ0lDQWdJQ0FnSUNCOUtUdGNiaUFnSUNBZ0lDQWdmU2s3WEc0Z0lDQWdmU3hjYmlBZ0lDQnZia3hsWVhabE9pQW9LU0E5UGlCa2FYWXVhVzV1WlhKSVZFMU1JRDBnSnlkY2JuMDdYRzVjYm1WNGNHOXlkQ0I3WjJGdFpYMDdJbDE5XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL3JvdXRlc1xcXFxnYW1lLmpzXCIsXCIvcm91dGVzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2Lm1haW4nKTtcbnZhciBpbmRleCA9IHtcbiAgICBuYW1lOiAnaW5kZXgnLFxuICAgIG1hdGNoOiAnJyxcbiAgICBvbkJlZm9yZUVudGVyOiBmdW5jdGlvbiBvbkJlZm9yZUVudGVyKCkge1xuICAgICAgICByZXR1cm4gY29uc29sZS5sb2coJ29uQmVmb3JlRW50ZXIgaW5kZXgnKTtcbiAgICB9LFxuICAgIG9uRW50ZXI6IGZ1bmN0aW9uIG9uRW50ZXIoKSB7XG4gICAgICAgIHJldHVybiBkaXYuaW5uZXJIVE1MID0gJ9Ct0YLQviDRgdCw0LzQsNGPINC60YDRg9GC0LDRjyDQuNCz0YDQsCDQsiDQnNC40YDQtS4g0J/RgNCw0LLQuNC7INCyINC90LXQuSDQvdC10YIsINC00LXQu9Cw0Lkg0YfRgtC+INGF0L7Rh9C10YjRjCBQLlMuINCvINGB0LDQvCDQvdC1INC30L3QsNGOICknO1xuICAgIH0sXG4gICAgb25MZWF2ZTogZnVuY3Rpb24gb25MZWF2ZSgpIHtcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKCdvbkxlYXZlIGluZGV4Jyk7XG4gICAgfVxufTtcblxuZXhwb3J0cy5pbmRleCA9IGluZGV4O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW1sdVpHVjRMbXB6SWwwc0ltNWhiV1Z6SWpwYkltUnBkaUlzSW1SdlkzVnRaVzUwSWl3aWNYVmxjbmxUWld4bFkzUnZjaUlzSW1sdVpHVjRJaXdpYm1GdFpTSXNJbTFoZEdOb0lpd2liMjVDWldadmNtVkZiblJsY2lJc0ltTnZibk52YkdVaUxDSnNiMmNpTENKdmJrVnVkR1Z5SWl3aWFXNXVaWEpJVkUxTUlpd2liMjVNWldGMlpTSmRMQ0p0WVhCd2FXNW5jeUk2SWpzN096czdRVUZCUVN4SlFVRkpRU3hOUVVGTlF5eFRRVUZUUXl4aFFVRlVMRU5CUVhWQ0xGVkJRWFpDTEVOQlFWWTdRVUZEUVN4SlFVRkpReXhSUVVGUk8wRkJRMUpETEZWQlFVMHNUMEZFUlR0QlFVVlNReXhYUVVGUExFVkJSa003UVVGSFVrTXNiVUpCUVdVN1FVRkJRU3hsUVVGTlF5eFJRVUZSUXl4SFFVRlNMSFZDUVVGT08wRkJRVUVzUzBGSVVEdEJRVWxTUXl4aFFVRlRPMEZCUVVFc1pVRkJUVlFzU1VGQlNWVXNVMEZCU2l4SFFVRm5RaXgxUmtGQmRFSTdRVUZCUVN4TFFVcEVPMEZCUzFKRExHRkJRVk03UVVGQlFTeGxRVUZOU2l4UlFVRlJReXhIUVVGU0xFTkJRVmtzWlVGQldpeERRVUZPTzBGQlFVRTdRVUZNUkN4RFFVRmFPenRSUVZGVFRDeExMRWRCUVVGQkxFc2lMQ0ptYVd4bElqb2lhVzVrWlhndWFuTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUoyWVhJZ1pHbDJJRDBnWkc5amRXMWxiblF1Y1hWbGNubFRaV3hsWTNSdmNpZ25aR2wyTG0xaGFXNG5LVHRjYm5aaGNpQnBibVJsZUNBOUlIdGNiaUFnSUNCdVlXMWxPaUFuYVc1a1pYZ25MRnh1SUNBZ0lHMWhkR05vT2lBbkp5eGNiaUFnSUNCdmJrSmxabTl5WlVWdWRHVnlPaUFvS1NBOVBpQmpiMjV6YjJ4bExteHZaeWhnYjI1Q1pXWnZjbVZGYm5SbGNpQnBibVJsZUdBcExGeHVJQ0FnSUc5dVJXNTBaWEk2SUNncElEMCtJR1JwZGk1cGJtNWxja2hVVFV3Z1BTQW4wSzNSZ3RDK0lOR0IwTERRdk5DdzBZOGcwTHJSZ05HRDBZTFFzTkdQSU5DNDBMUFJnTkN3SU5DeUlOQ2MwTGpSZ05DMUxpRFFuOUdBMExEUXN0QzQwTHNnMExJZzBMM1F0ZEM1SU5DOTBMWFJnaXdnMExUUXRkQzcwTERRdVNEUmg5R0MwTDRnMFlYUXZ0R0gwTFhSaU5HTUlGQXVVeTRnMEs4ZzBZSFFzTkM4SU5DOTBMVWcwTGZRdmRDdzBZNGdLU2NzWEc0Z0lDQWdiMjVNWldGMlpUb2dLQ2tnUFQ0Z1kyOXVjMjlzWlM1c2IyY29KMjl1VEdWaGRtVWdhVzVrWlhnbktWeHVmVHRjYmx4dVpYaHdiM0owSUhzZ2FXNWtaWGdnZlRzaVhYMD1cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvcm91dGVzXFxcXGluZGV4LmpzXCIsXCIvcm91dGVzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbi8qXG4gZDEuINCg0LXQsNC70LjQt9C+0LLQsNGC0YwgRXZlbnRCdXNcblxuINGB0L7Qt9C00LDRgtGMINC60L7QvdGB0YLRgNGD0LrRgtC+0YBcbiDRgdC+0LfQtNCw0YLRjCDQvNC10YLQvtC0IG9uXG4gY2/Qt9C00LDRgtGMINC80LXRgtC+0LQgb2ZmXG4g0YHQvtC30LTQsNGC0Ywg0LzQtdGC0L7QtCB0cmlnZ2VyXG4g0YHQvtC30LTQsNGC0Ywg0LzQtdGC0L7QtCBvbmNlXG4g0LLRi9C30LLQsNGC0Ywg0LrQvtC90YHRgtGA0YPQutGC0L7RgFxuICovXG5cbmZ1bmN0aW9uIEV2ZW50QnVzKCkge1xuICAgIHRoaXMubGlzdGVuZXJzID0ge307XG59XG5cbkV2ZW50QnVzLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChldiwgaGFuZGxlcikge1xuICAgIHRoaXMubGlzdGVuZXJzW2V2XSA9IHRoaXMubGlzdGVuZXJzW2V2XSB8fCBbXTtcbiAgICB0aGlzLmxpc3RlbmVyc1tldl0ucHVzaChoYW5kbGVyKTtcbn07XG5FdmVudEJ1cy5wcm90b3R5cGUudHJpZ2dlciA9IGZ1bmN0aW9uIChldikge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICAodGhpcy5saXN0ZW5lcnNbZXZdIHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICAgIHJldHVybiBoYW5kbGVyLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIH0pO1xufTtcbkV2ZW50QnVzLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoZXYsIGhhbmRsZXIpIHtcbiAgICAodGhpcy5saXN0ZW5lcnNbZXZdIHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpKSB7XG4gICAgICAgIGlmIChpdGVtID09PSBoYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1tldl0uc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgfSwgdGhpcyk7XG59O1xuRXZlbnRCdXMucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiAoZXYsIGhhbmRsZXIpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgdGhpcy5vbihldiwgZnVuY3Rpb24gb2ZmTWV0aG9kKCkge1xuICAgICAgICBoYW5kbGVyLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgIHRoYXQub2ZmKGV2LCBvZmZNZXRob2QpO1xuICAgIH0pO1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gRXZlbnRCdXM7XG5cbi8vIHZhciBldmVudEJ1cyA9IG5ldyBFdmVudEJ1cygpO1xuLy8gdmFyIGhhbmRsZXIgPSAoYSwgYiwgYykgPT4gY29uc29sZS5sb2coJ0hhbmRsZXInLCBhLCBiLCBjKTtcbi8vIGV2ZW50QnVzLm9uY2UoJ29uZScsIGhhbmRsZXIpO1xuLy8gZXZlbnRCdXMudHJpZ2dlcignb25lJywgMSwyLDMpO1xuLy8gLy8gSGFuZGxlciAxIDIgM1xuLy8gZXZlbnRCdXMudHJpZ2dlcignb25lJyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbVYyWlc1MFFuVnpMbXB6SWwwc0ltNWhiV1Z6SWpwYklrVjJaVzUwUW5Weklpd2liR2x6ZEdWdVpYSnpJaXdpY0hKdmRHOTBlWEJsSWl3aWIyNGlMQ0psZGlJc0ltaGhibVJzWlhJaUxDSndkWE5vSWl3aWRISnBaMmRsY2lJc0ltRnlaM01pTENKbWIzSkZZV05vSWl3aVlYQndiSGtpTENKdlptWWlMQ0pwZEdWdElpd2lhU0lzSW5Od2JHbGpaU0lzSW05dVkyVWlMQ0owYUdGMElpd2liMlptVFdWMGFHOWtJaXdpWVhKbmRXMWxiblJ6SWwwc0ltMWhjSEJwYm1keklqb2lPenM3T3p0QlFVRkJPenM3T3pzN096czdPenRCUVZkQkxGTkJRVk5CTEZGQlFWUXNSMEZCYjBJN1FVRkRhRUlzVTBGQlMwTXNVMEZCVEN4SFFVRnBRaXhGUVVGcVFqdEJRVU5JT3p0QlFVVkVSQ3hUUVVGVFJTeFRRVUZVTEVOQlFXMUNReXhGUVVGdVFpeEhRVUYzUWl4VlFVRlZReXhGUVVGV0xFVkJRV05ETEU5QlFXUXNSVUZCZFVJN1FVRkRNME1zVTBGQlMwb3NVMEZCVEN4RFFVRmxSeXhGUVVGbUxFbEJRWEZDTEV0QlFVdElMRk5CUVV3c1EwRkJaVWNzUlVGQlppeExRVUZ6UWl4RlFVRXpRenRCUVVOQkxGTkJRVXRJTEZOQlFVd3NRMEZCWlVjc1JVRkJaaXhGUVVGdFFrVXNTVUZCYmtJc1EwRkJkMEpFTEU5QlFYaENPMEZCUTBnc1EwRklSRHRCUVVsQlRDeFRRVUZUUlN4VFFVRlVMRU5CUVcxQ1N5eFBRVUZ1UWl4SFFVRTJRaXhWUVVGVlNDeEZRVUZXTEVWQlFYVkNPMEZCUVVFc2MwTkJRVTVKTEVsQlFVMDdRVUZCVGtFc1dVRkJUVHRCUVVGQk96dEJRVU5vUkN4TFFVRkRMRXRCUVV0UUxGTkJRVXdzUTBGQlpVY3NSVUZCWml4TFFVRnpRaXhGUVVGMlFpeEZRVUV5UWtzc1QwRkJNMElzUTBGQmJVTXNWVUZCUTBvc1QwRkJSRHRCUVVGQkxHVkJRV0ZCTEZGQlFWRkxMRXRCUVZJc1EwRkJZeXhKUVVGa0xFVkJRVzlDUml4SlFVRndRaXhEUVVGaU8wRkJRVUVzUzBGQmJrTTdRVUZEU0N4RFFVWkVPMEZCUjBGU0xGTkJRVk5GTEZOQlFWUXNRMEZCYlVKVExFZEJRVzVDTEVkQlFYbENMRlZCUVZWUUxFVkJRVllzUlVGQlkwTXNUMEZCWkN4RlFVRjFRanRCUVVNMVF5eExRVUZETEV0QlFVdEtMRk5CUVV3c1EwRkJaVWNzUlVGQlppeExRVUZ6UWl4RlFVRjJRaXhGUVVFeVFrc3NUMEZCTTBJc1EwRkJiVU1zVlVGQlZVY3NTVUZCVml4RlFVRm5Ra01zUTBGQmFFSXNSVUZCYlVJN1FVRkRiRVFzV1VGQlNVUXNVMEZCVTFBc1QwRkJZaXhGUVVGelFqdEJRVU5zUWl4cFFrRkJTMG9zVTBGQlRDeERRVUZsUnl4RlFVRm1MRVZCUVcxQ1ZTeE5RVUZ1UWl4RFFVRXdRa1FzUTBGQk1VSXNSVUZCTmtJc1EwRkJOMEk3UVVGRFNEdEJRVU5LTEV0QlNrUXNSVUZKUnl4SlFVcElPMEZCUzBnc1EwRk9SRHRCUVU5QllpeFRRVUZUUlN4VFFVRlVMRU5CUVcxQ1lTeEpRVUZ1UWl4SFFVRXdRaXhWUVVGVldDeEZRVUZXTEVWQlFXTkRMRTlCUVdRc1JVRkJkVUk3UVVGRE4wTXNVVUZCU1Zjc1QwRkJUeXhKUVVGWU8wRkJRMEVzVTBGQlMySXNSVUZCVEN4RFFVRlJReXhGUVVGU0xFVkJRVmtzVTBGQlUyRXNVMEZCVkN4SFFVRnhRanRCUVVNM1Fsb3NaMEpCUVZGTExFdEJRVklzUTBGQll5eEpRVUZrTEVWQlFXOUNVU3hUUVVGd1FqdEJRVU5CUml4aFFVRkxUQ3hIUVVGTUxFTkJRVk5RTEVWQlFWUXNSVUZCWVdFc1UwRkJZanRCUVVOSUxFdEJTRVE3UVVGSlNDeERRVTVFT3p0clFrRlJaV3BDTEZFN08wRkJSV1k3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJJaXdpWm1sc1pTSTZJbVYyWlc1MFFuVnpMbXB6SWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUx5cGNiaUJrTVM0ZzBLRFF0ZEN3MEx2UXVOQzMwTDdRc3RDdzBZTFJqQ0JGZG1WdWRFSjFjMXh1WEc0ZzBZSFF2dEMzMExUUXNOR0MwWXdnMExyUXZ0QzkwWUhSZ3RHQTBZUFF1dEdDMEw3UmdGeHVJTkdCMEw3UXQ5QzAwTERSZ3RHTUlOQzgwTFhSZ3RDKzBMUWdiMjVjYmlCamI5QzMwTFRRc05HQzBZd2cwTHpRdGRHQzBMN1F0Q0J2Wm1aY2JpRFJnZEMrMExmUXROQ3cwWUxSakNEUXZOQzEwWUxRdnRDMElIUnlhV2RuWlhKY2JpRFJnZEMrMExmUXROQ3cwWUxSakNEUXZOQzEwWUxRdnRDMElHOXVZMlZjYmlEUXN0R0wwTGZRc3RDdzBZTFJqQ0RRdXRDKzBMM1JnZEdDMFlEUmc5QzYwWUxRdnRHQVhHNGdLaTljYmx4dVpuVnVZM1JwYjI0Z1JYWmxiblJDZFhNb0tTQjdYRzRnSUNBZ2RHaHBjeTVzYVhOMFpXNWxjbk1nUFNCN2ZUdGNibjFjYmx4dVJYWmxiblJDZFhNdWNISnZkRzkwZVhCbExtOXVJRDBnWm5WdVkzUnBiMjRnS0dWMkxDQm9ZVzVrYkdWeUtTQjdYRzRnSUNBZ2RHaHBjeTVzYVhOMFpXNWxjbk5iWlhaZElEMGdkR2hwY3k1c2FYTjBaVzVsY25OYlpYWmRJSHg4SUZ0ZE8xeHVJQ0FnSUhSb2FYTXViR2x6ZEdWdVpYSnpXMlYyWFM1d2RYTm9LR2hoYm1Sc1pYSXBPMXh1ZlR0Y2JrVjJaVzUwUW5WekxuQnliM1J2ZEhsd1pTNTBjbWxuWjJWeUlEMGdablZ1WTNScGIyNGdLR1YyTENBdUxpNWhjbWR6S1NCN1hHNGdJQ0FnS0hSb2FYTXViR2x6ZEdWdVpYSnpXMlYyWFNCOGZDQmJYU2t1Wm05eVJXRmphQ2dvYUdGdVpHeGxjaWtnUFQ0Z2FHRnVaR3hsY2k1aGNIQnNlU2h1ZFd4c0xDQmhjbWR6S1NrN1hHNTlPMXh1UlhabGJuUkNkWE11Y0hKdmRHOTBlWEJsTG05bVppQTlJR1oxYm1OMGFXOXVJQ2hsZGl3Z2FHRnVaR3hsY2lrZ2UxeHVJQ0FnSUNoMGFHbHpMbXhwYzNSbGJtVnljMXRsZGwwZ2ZId2dXMTBwTG1admNrVmhZMmdvWm5WdVkzUnBiMjRnS0dsMFpXMHNJR2twSUh0Y2JpQWdJQ0FnSUNBZ2FXWWdLR2wwWlcwZ1BUMDlJR2hoYm1Sc1pYSXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIUm9hWE11YkdsemRHVnVaWEp6VzJWMlhTNXpjR3hwWTJVb2FTd2dNU2s3WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0I5TENCMGFHbHpLVHRjYm4wN1hHNUZkbVZ1ZEVKMWN5NXdjbTkwYjNSNWNHVXViMjVqWlNBOUlHWjFibU4wYVc5dUlDaGxkaXdnYUdGdVpHeGxjaWtnZTF4dUlDQWdJSFpoY2lCMGFHRjBJRDBnZEdocGN6dGNiaUFnSUNCMGFHbHpMbTl1S0dWMkxDQm1kVzVqZEdsdmJpQnZabVpOWlhSb2IyUW9LU0I3WEc0Z0lDQWdJQ0FnSUdoaGJtUnNaWEl1WVhCd2JIa29iblZzYkN3Z1lYSm5kVzFsYm5SektUdGNiaUFnSUNBZ0lDQWdkR2hoZEM1dlptWW9aWFlzSUc5bVprMWxkR2h2WkNrN1hHNGdJQ0FnZlNrN1hHNTlPMXh1WEc1bGVIQnZjblFnWkdWbVlYVnNkQ0JGZG1WdWRFSjFjenRjYmx4dUx5OGdkbUZ5SUdWMlpXNTBRblZ6SUQwZ2JtVjNJRVYyWlc1MFFuVnpLQ2s3WEc0dkx5QjJZWElnYUdGdVpHeGxjaUE5SUNoaExDQmlMQ0JqS1NBOVBpQmpiMjV6YjJ4bExteHZaeWduU0dGdVpHeGxjaWNzSUdFc0lHSXNJR01wTzF4dUx5OGdaWFpsYm5SQ2RYTXViMjVqWlNnbmIyNWxKeXdnYUdGdVpHeGxjaWs3WEc0dkx5QmxkbVZ1ZEVKMWN5NTBjbWxuWjJWeUtDZHZibVVuTENBeExESXNNeWs3WEc0dkx5QXZMeUJJWVc1a2JHVnlJREVnTWlBelhHNHZMeUJsZG1WdWRFSjFjeTUwY21sbloyVnlLQ2R2Ym1VbktUdGNiaUpkZlE9PVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi91dGlsc1xcXFxldmVudEJ1cy5qc1wiLFwiL3V0aWxzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG4vKlxuINCg0LXQsNC70LjQt9C+0LLQsNGC0YwgUm91dGVyXG5cbiDRgdC+0LfQtNCw0YLRjCDQutC+0L3RgdGC0YDRg9C60YLQvtGAXG4g0L7QsdGA0LDQsdC+0YLRh9C40Log0LjQt9C80LXQvdC10L3QuNGPINCw0LTRgNC10YHQsFxuINC/0YDQuCDRgdC+0LfQtNCw0L3QuNC4INCy0YvQv9C70L3QuNC7INC+0LHRgNCw0LHQvtGC0YfQuNC6INC40LfQvNC10L3QtdC90LjRjyDQsNC00YDQtdGB0LBcbiDQvdCw0YPRh9C40YLRjNGB0Y8g0L7Qv9GA0LXQtNC10LvRj9GC0Ywg0YDQvtGD0YIg0L/QviDQsNC00YDQtdGB0YMgKCDQutCw0LrQvtC5INGA0L7Rg9GCINC90YPQttC90L4g0LDQutGC0LjQstC40YDQvtCy0LDRgtGMIClcbiDQvdCw0YXQvtC00LjRgtGML9GB0L7RhdGA0LDQvdGP0YLRjCDQv9C+0YHQu9C10LTQvdC40Lkg0LDQutGC0LjQstC90YvQuSDRgNC+0YPRglxuINCy0YvQt9Cy0LDRgtGMIG9uTGVhdmVcbiDQstGL0LfQstCw0YLRjCBvbkJlZm9yZUVudGVyXG4g0LLRi9C30LLQsNGC0Ywgb25FbnRlclxuINC+0LHRgNCw0LHQsNGC0YvQstCw0YLRjCDQvtGC0YHRg9GC0YHRgtCy0LjQtSDRhNGD0LrQvdGG0LjQuS3RhdGD0LrQvtCyXG4g0L/QvtC00LTQtdGA0LbQuNCy0LDRgtGMIHByb21pc2Ug0LjQtyBvbkJlZm9yZUVudGVyXG4g0L/QvtC00LTQtdGA0LbQuNCy0LDRgtGMIHByb21pc2Ug0LjQtyBvbkxlYXZlXG4gKi9cbnZhciBSb3V0ZXIgPSBmdW5jdGlvbiBSb3V0ZXIob3B0aW9ucywgZXZlbnRCdXMpIHtcbiAgICB0aGlzLnJvdXRlcyA9IG9wdGlvbnMucm91dGVzO1xuICAgIHRoaXMuZXZlbnRCdXMgPSBldmVudEJ1cztcbiAgICB0aGlzLmluaXQoKTtcbn07XG5cblJvdXRlci5wcm90b3R5cGUgPSB7XG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLmhhbmRsZVVybChldi5vbGRVUkwuc3BsaXQoJyMnKVsxXSB8fCAnJywgZXYubmV3VVJMLnNwbGl0KCcjJylbMV0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5oYW5kbGVVcmwodW5kZWZpbmVkLCB3aW5kb3cubG9jYXRpb24uaGFzaC5zbGljZSgxKSk7XG4gICAgfSxcbiAgICBnZXRQYXJhbTogZnVuY3Rpb24gZ2V0UGFyYW0obmV3Um91dGUsIGN1cnJlbnRSb3V0ZSkge1xuICAgICAgICB2YXIgcGFyYW0gPSBuZXdSb3V0ZS5tYXRjaChjdXJyZW50Um91dGUubWF0Y2gpIHx8IFtdO1xuICAgICAgICByZXR1cm4gcGFyYW1bMV07XG4gICAgfSxcbiAgICBoYW5kbGVVcmw6IGZ1bmN0aW9uIGhhbmRsZVVybChvbGRSb3V0ZSwgbmV3Um91dGUpIHtcbiAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgdmFyIGN1cnJlbnRSb3V0ZSA9IHRoaXMucm91dGVzLmZpbmQoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbS5tYXRjaCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3Um91dGUgPT09IGl0ZW0ubWF0Y2g7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtLm1hdGNoID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubWF0Y2gobmV3Um91dGUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLm1hdGNoIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld1JvdXRlLm1hdGNoKGl0ZW0ubWF0Y2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKG9sZFJvdXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHZhciBwcmV2aW91c1JvdXRlID0gdGhpcy5yb3V0ZXMuZmluZChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbS5tYXRjaCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9sZFJvdXRlID09PSBpdGVtLm1hdGNoO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW0ubWF0Y2ggPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubWF0Y2gob2xkUm91dGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS5tYXRjaCBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2xkUm91dGUubWF0Y2goaXRlbS5tYXRjaCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGN1cnJlbnRQYXJhbSA9IHRoaXMuZ2V0UGFyYW0obmV3Um91dGUsIGN1cnJlbnRSb3V0ZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCctLS0+IHJvdXRlciBvbGRVUkw6ICcgKyBvbGRSb3V0ZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCctLS0+IHJvdXRlciBmaW5kTmV3QWN0aXZlUm91dGU6ICcgKyBuZXdSb3V0ZSArICcgLS0gJyArIChjdXJyZW50Um91dGUgfHwge30pLm5hbWUpO1xuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBwcmV2aW91c1JvdXRlICYmIHByZXZpb3VzUm91dGUub25MZWF2ZSAmJiBwcmV2aW91c1JvdXRlLm9uTGVhdmUob2xkUm91dGUuc3BsaXQoJz0nKVsxXSk7XG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRSb3V0ZSAmJiBjdXJyZW50Um91dGUub25CZWZvcmVFbnRlciAmJiBjdXJyZW50Um91dGUub25CZWZvcmVFbnRlcihjdXJyZW50UGFyYW0pO1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50Um91dGUgJiYgY3VycmVudFJvdXRlLm9uRW50ZXIgJiYgY3VycmVudFJvdXRlLm9uRW50ZXIoX3RoaXMyLmV2ZW50QnVzLCBjdXJyZW50UGFyYW0pO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBSb3V0ZXI7XG5cbi8vIHZhciByb3V0ZXIgPSBuZXcgUm91dGVyKHtcbi8vICAgICByb3V0ZXM6IFt7XG4vLyAgICAgICAgIG5hbWU6ICdpbmRleCcsXG4vLyAgICAgICAgIG1hdGNoOiAnJyxcbi8vICAgICAgICAgb25CZWZvcmVFbnRlcjogKCkgPT4gY29uc29sZS5sb2coJ29uQmVmb3JlRW50ZXIgaW5kZXgnKSxcbi8vICAgICAgICAgb25FbnRlcjogKCkgPT4gY29uc29sZS5sb2coJ29uRW50ZXIgaW5kZXgnKSxcbi8vICAgICAgICAgb25MZWF2ZTogKCkgPT4gY29uc29sZS5sb2coJ29uTGVhdmUgaW5kZXgnKVxuLy8gICAgIH0sIHtcbi8vICAgICAgICAgbmFtZTogJ2NpdHknLFxuLy8gICAgICAgICBtYXRjaDogL2NpdHk9KC4rKS8sXG4vLyAgICAgICAgIG9uQmVmb3JlRW50ZXI6IChjaXR5KSA9PiBjb25zb2xlLmxvZyhgb25CZWZvcmVFbnRlciBjaXR5OiR7Y2l0eX1gKSxcbi8vICAgICAgICAgb25FbnRlcjogKGNpdHkpID0+IGNvbnNvbGUubG9nKGBvbkVudGVyIGNpdHk6JHtjaXR5fWApLFxuLy8gICAgICAgICBvbkxlYXZlOiAoY2l0eSkgPT4gY29uc29sZS5sb2coYG9uTGVhdmUgY2l0eToke2NpdHl9YClcbi8vICAgICB9LCB7XG4vLyAgICAgICAgIG5hbWU6ICdhYm91dCcsXG4vLyAgICAgICAgIG1hdGNoOiAodGV4dCkgPT4gdGV4dCA9PT0gJ2Fib3V0Jyxcbi8vICAgICAgICAgb25CZWZvcmVFbnRlcjogKCkgPT4gY29uc29sZS5sb2coYG9uQmVmb3JlRW50ZXIgYWJvdXRgKSxcbi8vICAgICAgICAgb25FbnRlcjogKCkgPT4ge1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coYG9uRW50ZXIgYWJvdXRgKTtcbi8vICAgICAgICAgICAgIC8vZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRlbnQnKS5pbm5lckhUTUwgPSAnPGgxPkFib3V0PC9oMT4nO1xuLy8gICAgICAgICB9LFxuLy8gICAgICAgICBvbkxlYXZlOiAoKSA9PiB7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhgb25MZWF2ZSBhYm91dGApO1xuLy8gICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRlbnQnKS5pbm5lckhUTUwgPSAnJztcbi8vICAgICAgICAgfVxuLy8gICAgIH1dXG4vLyB9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluSnZkWFJsY2k1cWN5SmRMQ0p1WVcxbGN5STZXeUpTYjNWMFpYSWlMQ0p2Y0hScGIyNXpJaXdpWlhabGJuUkNkWE1pTENKeWIzVjBaWE1pTENKcGJtbDBJaXdpY0hKdmRHOTBlWEJsSWl3aWQybHVaRzkzSWl3aVlXUmtSWFpsYm5STWFYTjBaVzVsY2lJc0ltVjJJaXdpYUdGdVpHeGxWWEpzSWl3aWIyeGtWVkpNSWl3aWMzQnNhWFFpTENKdVpYZFZVa3dpTENKMWJtUmxabWx1WldRaUxDSnNiMk5oZEdsdmJpSXNJbWhoYzJnaUxDSnpiR2xqWlNJc0ltZGxkRkJoY21GdElpd2libVYzVW05MWRHVWlMQ0pqZFhKeVpXNTBVbTkxZEdVaUxDSndZWEpoYlNJc0ltMWhkR05vSWl3aWIyeGtVbTkxZEdVaUxDSm1hVzVrSWl3aWFYUmxiU0lzSWxKbFowVjRjQ0lzSW5CeVpYWnBiM1Z6VW05MWRHVWlMQ0pqZFhKeVpXNTBVR0Z5WVcwaUxDSmpiMjV6YjJ4bElpd2liRzluSWl3aWJtRnRaU0lzSWxCeWIyMXBjMlVpTENKeVpYTnZiSFpsSWl3aWRHaGxiaUlzSW05dVRHVmhkbVVpTENKdmJrSmxabTl5WlVWdWRHVnlJaXdpYjI1RmJuUmxjaUpkTENKdFlYQndhVzVuY3lJNklqczdPenM3UVVGQlFUczdPenM3T3pzN096czdPenM3TzBGQlpVRXNTVUZCU1VFc1UwRkJVeXhUUVVGVVFTeE5RVUZUTEVOQlFWVkRMRTlCUVZZc1JVRkJiVUpETEZGQlFXNUNMRVZCUVRaQ08wRkJRM1JETEZOQlFVdERMRTFCUVV3c1IwRkJZMFlzVVVGQlVVVXNUVUZCZEVJN1FVRkRRU3hUUVVGTFJDeFJRVUZNTEVkQlFXZENRU3hSUVVGb1FqdEJRVU5CTEZOQlFVdEZMRWxCUVV3N1FVRkRTQ3hEUVVwRU96dEJRVTFCU2l4UFFVRlBTeXhUUVVGUUxFZEJRVzFDTzBGQlEyWkVMRlZCUVUwc1owSkJRVms3UVVGQlFUczdRVUZEWkVVc1pVRkJUME1zWjBKQlFWQXNRMEZCZDBJc1dVRkJlRUlzUlVGQmMwTXNWVUZCUTBNc1JVRkJSRHRCUVVGQkxHMUNRVUZSTEUxQlFVdERMRk5CUVV3c1EwRkJaVVFzUjBGQlIwVXNUVUZCU0N4RFFVRlZReXhMUVVGV0xFTkJRV2RDTEVkQlFXaENMRVZCUVhGQ0xFTkJRWEpDTEV0QlFUSkNMRVZCUVRGRExFVkJRVGhEU0N4SFFVRkhTU3hOUVVGSUxFTkJRVlZFTEV0QlFWWXNRMEZCWjBJc1IwRkJhRUlzUlVGQmNVSXNRMEZCY2tJc1EwRkJPVU1zUTBGQlVqdEJRVUZCTEZOQlFYUkRPMEZCUTBFc1lVRkJTMFlzVTBGQlRDeERRVUZsU1N4VFFVRm1MRVZCUVRCQ1VDeFBRVUZQVVN4UlFVRlFMRU5CUVdkQ1F5eEpRVUZvUWl4RFFVRnhRa01zUzBGQmNrSXNRMEZCTWtJc1EwRkJNMElzUTBGQk1VSTdRVUZEU0N4TFFVcGpPMEZCUzJaRExHTkJRVlVzYTBKQlFWVkRMRkZCUVZZc1JVRkJiMEpETEZsQlFYQkNMRVZCUVd0RE8wRkJRM2hETEZsQlFVbERMRkZCUVZGR0xGTkJRVk5ITEV0QlFWUXNRMEZCWlVZc1lVRkJZVVVzUzBGQk5VSXNTMEZCYzBNc1JVRkJiRVE3UVVGRFFTeGxRVUZQUkN4TlFVRk5MRU5CUVU0c1EwRkJVRHRCUVVOSUxFdEJVbU03UVVGVFpsZ3NaVUZCVnl4dFFrRkJWV0VzVVVGQlZpeEZRVUZ2UWtvc1VVRkJjRUlzUlVGQk9FSTdRVUZCUVRzN1FVRkRja01zV1VGQlNVTXNaVUZCWlN4TFFVRkxhRUlzVFVGQlRDeERRVUZaYjBJc1NVRkJXaXhEUVVGcFFpeFZRVUZEUXl4SlFVRkVMRVZCUVZVN1FVRkRNVU1zWjBKQlFVa3NUMEZCVDBFc1MwRkJTMGdzUzBGQldpeExRVUZ6UWl4UlFVRXhRaXhGUVVGdlF6dEJRVU5vUXl4MVFrRkJUMGdzWVVGQllVMHNTMEZCUzBnc1MwRkJla0k3UVVGRFNDeGhRVVpFTEUxQlJVOHNTVUZCU1N4UFFVRlBSeXhMUVVGTFNDeExRVUZhTEV0QlFYTkNMRlZCUVRGQ0xFVkJRWE5ETzBGQlEzcERMSFZDUVVGUFJ5eExRVUZMU0N4TFFVRk1MRU5CUVZkSUxGRkJRVmdzUTBGQlVEdEJRVU5JTEdGQlJrMHNUVUZGUVN4SlFVRkpUU3hMUVVGTFNDeExRVUZNTEZsQlFYTkNTU3hOUVVFeFFpeEZRVUZyUXp0QlFVTnlReXgxUWtGQlQxQXNVMEZCVTBjc1MwRkJWQ3hEUVVGbFJ5eExRVUZMU0N4TFFVRndRaXhEUVVGUU8wRkJRMGc3UVVGRFNpeFRRVkpyUWl4RFFVRnVRanRCUVZOQkxGbEJRVWxETEdGQlFXRlVMRk5CUVdwQ0xFVkJRVFJDTzBGQlEzaENMR2RDUVVGSllTeG5Ra0ZCWjBJc1MwRkJTM1pDTEUxQlFVd3NRMEZCV1c5Q0xFbEJRVm9zUTBGQmFVSXNWVUZCUTBNc1NVRkJSQ3hGUVVGVk8wRkJRek5ETEc5Q1FVRkpMRTlCUVU5QkxFdEJRVXRJTEV0QlFWb3NTMEZCYzBJc1VVRkJNVUlzUlVGQmIwTTdRVUZEYUVNc01rSkJRVTlETEdGQlFXRkZMRXRCUVV0SUxFdEJRWHBDTzBGQlEwZ3NhVUpCUmtRc1RVRkZUeXhKUVVGSkxFOUJRVTlITEV0QlFVdElMRXRCUVZvc1MwRkJjMElzVlVGQk1VSXNSVUZCYzBNN1FVRkRla01zTWtKQlFVOUhMRXRCUVV0SUxFdEJRVXdzUTBGQlYwTXNVVUZCV0N4RFFVRlFPMEZCUTBnc2FVSkJSazBzVFVGRlFTeEpRVUZKUlN4TFFVRkxTQ3hMUVVGTUxGbEJRWE5DU1N4TlFVRXhRaXhGUVVGclF6dEJRVU55UXl3eVFrRkJUMGdzVTBGQlUwUXNTMEZCVkN4RFFVRmxSeXhMUVVGTFNDeExRVUZ3UWl4RFFVRlFPMEZCUTBnN1FVRkRTaXhoUVZKdFFpeERRVUZ3UWp0QlFWTklPMEZCUTBRc1dVRkJTVTBzWlVGQlpTeExRVUZMVml4UlFVRk1MRU5CUVdORExGRkJRV1FzUlVGQmQwSkRMRmxCUVhoQ0xFTkJRVzVDTzBGQlEwRlRMR2RDUVVGUlF5eEhRVUZTTERCQ1FVRnRRMUFzVVVGQmJrTTdRVUZEUVUwc1owSkJRVkZETEVkQlFWSXNjME5CUVN0RFdDeFJRVUV2UXl4WlFVRTRSQ3hEUVVGRFF5eG5Ra0ZCWjBJc1JVRkJha0lzUlVGQmNVSlhMRWxCUVc1R08wRkJRMEZETEdkQ1FVRlJReXhQUVVGU0xFZEJRMHRETEVsQlJFd3NRMEZEVlR0QlFVRkJMRzFDUVVGTlVDeHBRa0ZCYVVKQkxHTkJRV05STEU5QlFTOUNMRWxCUVRCRFVpeGpRVUZqVVN4UFFVRmtMRU5CUVhOQ1dpeFRRVUZUV0N4TFFVRlVMRU5CUVdVc1IwRkJaaXhGUVVGdlFpeERRVUZ3UWl4RFFVRjBRaXhEUVVGb1JEdEJRVUZCTEZOQlJGWXNSVUZGUzNOQ0xFbEJSa3dzUTBGRlZUdEJRVUZCTEcxQ1FVRk5aQ3huUWtGQlowSkJMR0ZCUVdGblFpeGhRVUUzUWl4SlFVRTRRMmhDTEdGQlFXRm5RaXhoUVVGaUxFTkJRVEpDVWl4WlFVRXpRaXhEUVVGd1JEdEJRVUZCTEZOQlJsWXNSVUZIUzAwc1NVRklUQ3hEUVVkVk8wRkJRVUVzYlVKQlFVMWtMR2RDUVVGblFrRXNZVUZCWVdsQ0xFOUJRVGRDTEVsQlFYZERha0lzWVVGQllXbENMRTlCUVdJc1EwRkJjVUlzVDBGQlMyeERMRkZCUVRGQ0xFVkJRVzlEZVVJc1dVRkJjRU1zUTBGQk9VTTdRVUZCUVN4VFFVaFdPMEZCU1VnN1FVRnlRMk1zUTBGQmJrSTdPMnRDUVhkRFpUTkNMRTA3TzBGQlJXWTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW5KdmRYUmxjaTVxY3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYklpOHFYRzRnMEtEUXRkQ3cwTHZRdU5DMzBMN1FzdEN3MFlMUmpDQlNiM1YwWlhKY2JseHVJTkdCMEw3UXQ5QzAwTERSZ3RHTUlOQzYwTDdRdmRHQjBZTFJnTkdEMExyUmd0QyswWUJjYmlEUXZ0Q3gwWURRc05DeDBMN1JndEdIMExqUXVpRFF1TkMzMEx6UXRkQzkwTFhRdmRDNDBZOGcwTERRdE5HQTBMWFJnZEN3WEc0ZzBML1JnTkM0SU5HQjBMN1F0OUMwMExEUXZkQzQwTGdnMExMUmk5Qy8wTHZRdmRDNDBMc2cwTDdRc2RHQTBMRFFzZEMrMFlMUmg5QzQwTG9nMExqUXQ5QzgwTFhRdmRDMTBMM1F1TkdQSU5DdzBMVFJnTkMxMFlIUXNGeHVJTkM5MExEUmc5R0gwTGpSZ3RHTTBZSFJqeURRdnRDLzBZRFF0ZEMwMExYUXU5R1AwWUxSakNEUmdOQyswWVBSZ2lEUXY5QytJTkN3MExUUmdOQzEwWUhSZ3lBb0lOQzYwTERRdXRDKzBMa2cwWURRdnRHRDBZSWcwTDNSZzlDMjBMM1F2aURRc05DNjBZTFF1TkN5MExqUmdOQyswTExRc05HQzBZd2dLVnh1SU5DOTBMRFJoZEMrMExUUXVOR0MwWXd2MFlIUXZ0R0YwWURRc05DOTBZL1JndEdNSU5DLzBMN1JnZEM3MExYUXROQzkwTGpRdVNEUXNOQzYwWUxRdU5DeTBMM1JpOUM1SU5HQTBMN1JnOUdDWEc0ZzBMTFJpOUMzMExMUXNOR0MwWXdnYjI1TVpXRjJaVnh1SU5DeTBZdlF0OUN5MExEUmd0R01JRzl1UW1WbWIzSmxSVzUwWlhKY2JpRFFzdEdMMExmUXN0Q3cwWUxSakNCdmJrVnVkR1Z5WEc0ZzBMN1FzZEdBMExEUXNkQ3cwWUxSaTlDeTBMRFJndEdNSU5DKzBZTFJnZEdEMFlMUmdkR0MwTExRdU5DMUlOR0UwWVBRdXRDOTBZYlF1TkM1TGRHRjBZUFF1dEMrMExKY2JpRFF2OUMrMExUUXROQzEwWURRdHRDNDBMTFFzTkdDMFl3Z2NISnZiV2x6WlNEUXVOQzNJRzl1UW1WbWIzSmxSVzUwWlhKY2JpRFF2OUMrMExUUXROQzEwWURRdHRDNDBMTFFzTkdDMFl3Z2NISnZiV2x6WlNEUXVOQzNJRzl1VEdWaGRtVmNiaUFxTDF4dWRtRnlJRkp2ZFhSbGNpQTlJR1oxYm1OMGFXOXVJQ2h2Y0hScGIyNXpMQ0JsZG1WdWRFSjFjeWtnZTF4dUlDQWdJSFJvYVhNdWNtOTFkR1Z6SUQwZ2IzQjBhVzl1Y3k1eWIzVjBaWE03WEc0Z0lDQWdkR2hwY3k1bGRtVnVkRUoxY3lBOUlHVjJaVzUwUW5Wek8xeHVJQ0FnSUhSb2FYTXVhVzVwZENncE8xeHVmVHRjYmx4dVVtOTFkR1Z5TG5CeWIzUnZkSGx3WlNBOUlIdGNiaUFnSUNCcGJtbDBPaUJtZFc1amRHbHZiaUFvS1NCN1hHNGdJQ0FnSUNBZ0lIZHBibVJ2ZHk1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0Nkb1lYTm9ZMmhoYm1kbEp5d2dLR1YyS1NBOVBpQjBhR2x6TG1oaGJtUnNaVlZ5YkNobGRpNXZiR1JWVWt3dWMzQnNhWFFvSnlNbktWc3hYU0I4ZkNBbkp5d2daWFl1Ym1WM1ZWSk1Mbk53YkdsMEtDY2pKeWxiTVYwcEtUdGNiaUFnSUNBZ0lDQWdkR2hwY3k1b1lXNWtiR1ZWY213b2RXNWtaV1pwYm1Wa0xDQjNhVzVrYjNjdWJHOWpZWFJwYjI0dWFHRnphQzV6YkdsalpTZ3hLU2s3WEc0Z0lDQWdmU3hjYmlBZ0lDQm5aWFJRWVhKaGJUb2dablZ1WTNScGIyNGdLRzVsZDFKdmRYUmxMQ0JqZFhKeVpXNTBVbTkxZEdVcElIdGNiaUFnSUNBZ0lDQWdkbUZ5SUhCaGNtRnRJRDBnYm1WM1VtOTFkR1V1YldGMFkyZ29ZM1Z5Y21WdWRGSnZkWFJsTG0xaGRHTm9LU0I4ZkNCYlhUdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlIQmhjbUZ0V3pGZE8xeHVJQ0FnSUgwc1hHNGdJQ0FnYUdGdVpHeGxWWEpzT2lCbWRXNWpkR2x2YmlBb2IyeGtVbTkxZEdVc0lHNWxkMUp2ZFhSbEtTQjdYRzRnSUNBZ0lDQWdJSFpoY2lCamRYSnlaVzUwVW05MWRHVWdQU0IwYUdsekxuSnZkWFJsY3k1bWFXNWtLQ2hwZEdWdEtTQTlQaUI3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvZEhsd1pXOW1JR2wwWlcwdWJXRjBZMmdnUFQwOUlDZHpkSEpwYm1jbktTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlHNWxkMUp2ZFhSbElEMDlQU0JwZEdWdExtMWhkR05vTzF4dUlDQWdJQ0FnSUNBZ0lDQWdmU0JsYkhObElHbG1JQ2gwZVhCbGIyWWdhWFJsYlM1dFlYUmphQ0E5UFQwZ0oyWjFibU4wYVc5dUp5a2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQnBkR1Z0TG0xaGRHTm9LRzVsZDFKdmRYUmxLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMGdaV3h6WlNCcFppQW9hWFJsYlM1dFlYUmphQ0JwYm5OMFlXNWpaVzltSUZKbFowVjRjQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJ1WlhkU2IzVjBaUzV0WVhSamFDaHBkR1Z0TG0xaGRHTm9LVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdmU2s3WEc0Z0lDQWdJQ0FnSUdsbUlDaHZiR1JTYjNWMFpTQWhQVDBnZFc1a1pXWnBibVZrS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ2NISmxkbWx2ZFhOU2IzVjBaU0E5SUhSb2FYTXVjbTkxZEdWekxtWnBibVFvS0dsMFpXMHBJRDArSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppQW9kSGx3Wlc5bUlHbDBaVzB1YldGMFkyZ2dQVDA5SUNkemRISnBibWNuS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQnZiR1JTYjNWMFpTQTlQVDBnYVhSbGJTNXRZWFJqYUR0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOUlHVnNjMlVnYVdZZ0tIUjVjR1Z2WmlCcGRHVnRMbTFoZEdOb0lEMDlQU0FuWm5WdVkzUnBiMjRuS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQnBkR1Z0TG0xaGRHTm9LRzlzWkZKdmRYUmxLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5SUdWc2MyVWdhV1lnS0dsMFpXMHViV0YwWTJnZ2FXNXpkR0Z1WTJWdlppQlNaV2RGZUhBcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJRzlzWkZKdmRYUmxMbTFoZEdOb0tHbDBaVzB1YldGMFkyZ3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lIMHBPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUhaaGNpQmpkWEp5Wlc1MFVHRnlZVzBnUFNCMGFHbHpMbWRsZEZCaGNtRnRLRzVsZDFKdmRYUmxMQ0JqZFhKeVpXNTBVbTkxZEdVcE8xeHVJQ0FnSUNBZ0lDQmpiMjV6YjJ4bExteHZaeWhnTFMwdFBpQnliM1YwWlhJZ2IyeGtWVkpNT2lBa2UyOXNaRkp2ZFhSbGZXQXBPMXh1SUNBZ0lDQWdJQ0JqYjI1emIyeGxMbXh2WnloZ0xTMHRQaUJ5YjNWMFpYSWdabWx1WkU1bGQwRmpkR2wyWlZKdmRYUmxPaUFrZTI1bGQxSnZkWFJsZlNBdExTQWtleWhqZFhKeVpXNTBVbTkxZEdVZ2ZId2dlMzBwTG01aGJXVjlZQ2s3WEc0Z0lDQWdJQ0FnSUZCeWIyMXBjMlV1Y21WemIyeDJaU2dwWEc0Z0lDQWdJQ0FnSUNBZ0lDQXVkR2hsYmlnb0tTQTlQaUJ3Y21WMmFXOTFjMUp2ZFhSbElDWW1JSEJ5WlhacGIzVnpVbTkxZEdVdWIyNU1aV0YyWlNBbUppQndjbVYyYVc5MWMxSnZkWFJsTG05dVRHVmhkbVVvYjJ4a1VtOTFkR1V1YzNCc2FYUW9KejBuS1ZzeFhTa3BYRzRnSUNBZ0lDQWdJQ0FnSUNBdWRHaGxiaWdvS1NBOVBpQmpkWEp5Wlc1MFVtOTFkR1VnSmlZZ1kzVnljbVZ1ZEZKdmRYUmxMbTl1UW1WbWIzSmxSVzUwWlhJZ0ppWWdZM1Z5Y21WdWRGSnZkWFJsTG05dVFtVm1iM0psUlc1MFpYSW9ZM1Z5Y21WdWRGQmhjbUZ0S1NsY2JpQWdJQ0FnSUNBZ0lDQWdJQzUwYUdWdUtDZ3BJRDArSUdOMWNuSmxiblJTYjNWMFpTQW1KaUJqZFhKeVpXNTBVbTkxZEdVdWIyNUZiblJsY2lBbUppQmpkWEp5Wlc1MFVtOTFkR1V1YjI1RmJuUmxjaWgwYUdsekxtVjJaVzUwUW5WekxDQmpkWEp5Wlc1MFVHRnlZVzBwS1Z4dUlDQWdJSDFjYm4wN1hHNWNibVY0Y0c5eWRDQmtaV1poZFd4MElGSnZkWFJsY2p0Y2JseHVMeThnZG1GeUlISnZkWFJsY2lBOUlHNWxkeUJTYjNWMFpYSW9lMXh1THk4Z0lDQWdJSEp2ZFhSbGN6b2dXM3RjYmk4dklDQWdJQ0FnSUNBZ2JtRnRaVG9nSjJsdVpHVjRKeXhjYmk4dklDQWdJQ0FnSUNBZ2JXRjBZMmc2SUNjbkxGeHVMeThnSUNBZ0lDQWdJQ0J2YmtKbFptOXlaVVZ1ZEdWeU9pQW9LU0E5UGlCamIyNXpiMnhsTG14dlp5Z25iMjVDWldadmNtVkZiblJsY2lCcGJtUmxlQ2NwTEZ4dUx5OGdJQ0FnSUNBZ0lDQnZia1Z1ZEdWeU9pQW9LU0E5UGlCamIyNXpiMnhsTG14dlp5Z25iMjVGYm5SbGNpQnBibVJsZUNjcExGeHVMeThnSUNBZ0lDQWdJQ0J2Ymt4bFlYWmxPaUFvS1NBOVBpQmpiMjV6YjJ4bExteHZaeWduYjI1TVpXRjJaU0JwYm1SbGVDY3BYRzR2THlBZ0lDQWdmU3dnZTF4dUx5OGdJQ0FnSUNBZ0lDQnVZVzFsT2lBblkybDBlU2NzWEc0dkx5QWdJQ0FnSUNBZ0lHMWhkR05vT2lBdlkybDBlVDBvTGlzcEx5eGNiaTh2SUNBZ0lDQWdJQ0FnYjI1Q1pXWnZjbVZGYm5SbGNqb2dLR05wZEhrcElEMCtJR052Ym5OdmJHVXViRzluS0dCdmJrSmxabTl5WlVWdWRHVnlJR05wZEhrNkpIdGphWFI1ZldBcExGeHVMeThnSUNBZ0lDQWdJQ0J2YmtWdWRHVnlPaUFvWTJsMGVTa2dQVDRnWTI5dWMyOXNaUzVzYjJjb1lHOXVSVzUwWlhJZ1kybDBlVG9rZTJOcGRIbDlZQ2tzWEc0dkx5QWdJQ0FnSUNBZ0lHOXVUR1ZoZG1VNklDaGphWFI1S1NBOVBpQmpiMjV6YjJ4bExteHZaeWhnYjI1TVpXRjJaU0JqYVhSNU9pUjdZMmwwZVgxZ0tWeHVMeThnSUNBZ0lIMHNJSHRjYmk4dklDQWdJQ0FnSUNBZ2JtRnRaVG9nSjJGaWIzVjBKeXhjYmk4dklDQWdJQ0FnSUNBZ2JXRjBZMmc2SUNoMFpYaDBLU0E5UGlCMFpYaDBJRDA5UFNBbllXSnZkWFFuTEZ4dUx5OGdJQ0FnSUNBZ0lDQnZia0psWm05eVpVVnVkR1Z5T2lBb0tTQTlQaUJqYjI1emIyeGxMbXh2WnloZ2IyNUNaV1p2Y21WRmJuUmxjaUJoWW05MWRHQXBMRnh1THk4Z0lDQWdJQ0FnSUNCdmJrVnVkR1Z5T2lBb0tTQTlQaUI3WEc0dkx5QWdJQ0FnSUNBZ0lDQWdJQ0JqYjI1emIyeGxMbXh2WnloZ2IyNUZiblJsY2lCaFltOTFkR0FwTzF4dUx5OGdJQ0FnSUNBZ0lDQWdJQ0FnTHk5a2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLQ2NqWTI5dWRHVnVkQ2NwTG1sdWJtVnlTRlJOVENBOUlDYzhhREUrUVdKdmRYUThMMmd4UGljN1hHNHZMeUFnSUNBZ0lDQWdJSDBzWEc0dkx5QWdJQ0FnSUNBZ0lHOXVUR1ZoZG1VNklDZ3BJRDArSUh0Y2JpOHZJQ0FnSUNBZ0lDQWdJQ0FnSUdOdmJuTnZiR1V1Ykc5bktHQnZia3hsWVhabElHRmliM1YwWUNrN1hHNHZMeUFnSUNBZ0lDQWdJQ0FnSUNCa2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLQ2NqWTI5dWRHVnVkQ2NwTG1sdWJtVnlTRlJOVENBOUlDY25PMXh1THk4Z0lDQWdJQ0FnSUNCOVhHNHZMeUFnSUNBZ2ZWMWNiaTh2SUgwcE95SmRmUT09XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL3V0aWxzXFxcXHJvdXRlci5qc1wiLFwiL3V0aWxzXCIpIl19
