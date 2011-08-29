/* 
 * Copyright (c) 2011, David Arnold
 *
 * Portions derived from jsSHA (jssha.sf.net), copyright Brian Turek
 *
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 
 *  - Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *
 *  - Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *
 *  - The names of the contributors may not be used to endorse or
 *    promote products derived from this software without specific
 *    prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 * FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */
void(function () {
    var /* Number of characters to output for final password */
        passwordLength = 14,
        /* Output symbol table for password encoding (base 58) */
        table = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
        /* Number of Bits Per character (8 for ASCII, 16 for Unicode) */
        charSize = 8,

        /*
         * Convert a string to an array of big-endian words
         * If charSize is ASCII, characters >255 have their hi-byte silently
         * ignored.
         *
         * @param {String} str String to be converted to binary representation
         * @return Integer array representation of the parameter
         */
        str2binb = function (str) {
            var bin = [],
                mask = (1 << charSize) - 1,
                length = str.length * charSize,
                i;

            for (i = 0; i < length; i += charSize) {
                bin[i >> 5] |= (str.charCodeAt(i / charSize) & mask) << (32 - charSize - (i % 32));
            }

            return bin;
        },

        /*
         * Convert an array of big-endian words to an encoded string.
         *
         * @private
         * @param {Array} binarray Array of integers to be converted to an
         *   encoded representation
         * @return Encoded representation of the parameter in String form
         */
        encode = function (binarray) {
            var base = table.length,
                s = 0x100000000,
                pass;

            pass = function (q, output) {
                var i, a, r = 0;

                if (output.length === passwordLength) {
                    return output;
                } else {
                    for (i = 0; i < q.length; i += 1) {
                        a = r * s + q[i];
                        r = a % base;
                        q[i] = (a - r) / base;
                    }

                    return pass(q, output + table[r]);
                }
            };

            return pass(binarray.map(function (n) {
                return n < 0 ? n + s : n;
            }), '');
        },

        /*
         * The 32-bit implementation of circular rotate right
         *
         * @private
         * @param {Number} x The 32-bit integer argument
         * @param {Number} n The number of bits to shift
         * @return The x shifted circularly by n bits
         */
        rotr = function (x, n) {
            return (x >>> n) | (x << (32 - n));
        },

        /*
         * The 32-bit implementation of shift right
         *
         * @private
         * @param {Number} x The 32-bit integer argument
         * @param {Number} n The number of bits to shift
         * @return The x shifted by n bits
         */
        shr = function (x, n) {
            return x >>> n;
        },

        /*
         * The 32-bit implementation of the NIST specified Ch function
         *
         * @private
         * @param {Number} x The first 32-bit integer argument
         * @param {Number} y The second 32-bit integer argument
         * @param {Number} z The third 32-bit integer argument
         * @return The NIST specified output of the function
         */
        ch = function (x, y, z) {
            return (x & y) ^ (~x & z);
        },

        /*
         * The 32-bit implementation of the NIST specified Maj function
         *
         * @private
         * @param {Number} x The first 32-bit integer argument
         * @param {Number} y The second 32-bit integer argument
         * @param {Number} z The third 32-bit integer argument
         * @return The NIST specified output of the function
         */
        maj = function (x, y, z) {
            return (x & y) ^ (x & z) ^ (y & z);
        },

        /*
         * The 32-bit implementation of the NIST specified Sigma0 function
         *
         * @private
         * @param {Number} x The 32-bit integer argument
         * @return The NIST specified output of the function
         */
        sigma0 = function (x) {
            return rotr(x, 2) ^ rotr(x, 13) ^ rotr(x, 22);
        },

        /*
         * The 32-bit implementation of the NIST specified Sigma1 function
         *
         * @private
         * @param {Number} x The 32-bit integer argument
         * @return The NIST specified output of the function
         */
        sigma1 = function (x) {
            return rotr(x, 6) ^ rotr(x, 11) ^ rotr(x, 25);
        },

        /*
         * The 32-bit implementation of the NIST specified Gamma0 function
         *
         * @private
         * @param {Number} x The 32-bit integer argument
         * @return The NIST specified output of the function
         */
        gamma0 = function (x) {
            return rotr(x, 7) ^ rotr(x, 18) ^ shr(x, 3);
        },

        /*
         * The 32-bit implementation of the NIST specified Gamma1 function
         *
         * @private
         * @param {Number} x The 32-bit integer argument
         * @return The NIST specified output of the function
         */
        gamma1 = function (x) {
            return rotr(x, 17) ^ rotr(x, 19) ^ shr(x, 10);
        },

        /*
         * Add two 32-bit integers, wrapping at 2^32. This uses 16-bit operations
         * internally to work around bugs in some JS interpreters.
         *
         * @private
         * @param {Number} x The first 32-bit integer argument to be added
         * @param {Number} y The second 32-bit integer argument to be added
         * @return The sum of x + y
         */
        safeAdd_2 = function (x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF),
                msw = (x >>> 16) + (y >>> 16) + (lsw >>> 16);

            return ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);
        },

        /*
         * Add four 32-bit integers, wrapping at 2^32. This uses 16-bit operations
         * internally to work around bugs in some JS interpreters.
         *
         * @private
         * @param {Number} a The first 32-bit integer argument to be added
         * @param {Number} b The second 32-bit integer argument to be added
         * @param {Number} c The third 32-bit integer argument to be added
         * @param {Number} d The fourth 32-bit integer argument to be added
         * @return The sum of a + b + c + d
         */
        safeAdd_4 = function (a, b, c, d) {
            var lsw = (a & 0xFFFF) + (b & 0xFFFF) + (c & 0xFFFF) + (d & 0xFFFF),
                msw = (a >>> 16) + (b >>> 16) + (c >>> 16) + (d >>> 16) + (lsw >>> 16);

            return ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);
        },

        /*
         * Add five 32-bit integers, wrapping at 2^32. This uses 16-bit operations
         * internally to work around bugs in some JS interpreters.
         *
         * @private
         * @param {Number} a The first 32-bit integer argument to be added
         * @param {Number} b The second 32-bit integer argument to be added
         * @param {Number} c The third 32-bit integer argument to be added
         * @param {Number} d The fourth 32-bit integer argument to be added
         * @param {Number} e The fifth 32-bit integer argument to be added
         * @return The sum of a + b + c + d + e
         */
        safeAdd_5 = function (a, b, c, d, e) {
            var lsw = (a & 0xFFFF) + (b & 0xFFFF) + (c & 0xFFFF) + (d & 0xFFFF) + (e & 0xFFFF),
                msw = (a >>> 16) + (b >>> 16) + (c >>> 16) + (d >>> 16) + (e >>> 16) + (lsw >>> 16);

            return ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);
        },

        /*
         * Calculates the desired SHA-2 hash of the given message.
         *
         * @private
         * @param {Array} The binary array representation of the string to hash
         * @param {Number} The number of bits in message
         * @return The array of integers representing the SHA-2 hash of message
         */
        coreSHA2 = function (message, messageLen) {
            var a, b, c, d, e, f, g, h, T1, T2, H, lengthPosition, i, t, K, W = [],
                appendedMessageLength;

            lengthPosition = (((messageLen + 65) >> 9) << 4) + 15;
            K = [0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2];
            H = [0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19];

            message[messageLen >> 5] |= 0x80 << (24 - messageLen % 32);
            message[lengthPosition] = messageLen;
            appendedMessageLength = message.length;
            for (i = 0; i < appendedMessageLength; i += 16) {
                a = H[0];
                b = H[1];
                c = H[2];
                d = H[3];
                e = H[4];
                f = H[5];
                g = H[6];
                h = H[7];
                for (t = 0; t < 64; t += 1) {
                    if (t < 16) {
                        W[t] = message[t + i];
                    } else {
                        W[t] = safeAdd_4(gamma1(W[t - 2]), W[t - 7], gamma0(W[t - 15]), W[t - 16]);
                    }
                    T1 = safeAdd_5(h, sigma1(e), ch(e, f, g), K[t], W[t]);
                    T2 = safeAdd_2(sigma0(a), maj(a, b, c));
                    h = g;
                    g = f;
                    f = e;
                    e = safeAdd_2(d, T1);
                    d = c;
                    c = b;
                    b = a;
                    a = safeAdd_2(T1, T2);
                }
                H[0] = safeAdd_2(a, H[0]);
                H[1] = safeAdd_2(b, H[1]);
                H[2] = safeAdd_2(c, H[2]);
                H[3] = safeAdd_2(d, H[3]);
                H[4] = safeAdd_2(e, H[4]);
                H[5] = safeAdd_2(f, H[5]);
                H[6] = safeAdd_2(g, H[6]);
                H[7] = safeAdd_2(h, H[7]);
            }

            return H;
        },

        /*
         * Returns the desired (RFC 2104) HMAC of the message and key.
         *
         * @param {String} message The message to be authenticated
         * @param {String} key The key used to calculate the HMAC
         * @return The string representation of the hash in the format specified
         */
        coreHMAC = function (message, key) {
            var hashBitSize, keyToUse, keyBinLen, msgToHash, msgBinLen, i, keyWithIPad = [],
                keyWithOPad = [],
                retVal;

            hashBitSize = 256;
            keyToUse = str2binb(key);
            keyBinLen = key.length * charSize;
            msgToHash = str2binb(message);
            msgBinLen = message.length * charSize;

            if (64 < (keyBinLen / 8)) {
                keyToUse = coreSHA2(keyToUse, keyBinLen);
                keyToUse[15] &= 0xFFFFFF00;
            } else if (64 > (keyBinLen / 8)) {
                keyToUse[15] &= 0xFFFFFF00;
            }
            for (i = 0; i <= 15; i += 1) {
                keyWithIPad[i] = keyToUse[i] ^ 0x36363636;
                keyWithOPad[i] = keyToUse[i] ^ 0x5C5C5C5C;
            }
            retVal = coreSHA2(keyWithIPad.concat(msgToHash), 512 + msgBinLen);
            retVal = coreSHA2(keyWithOPad.concat(retVal), 512 + hashBitSize);
            return retVal;
        },

        /*
         * The main library object. Instantiate it with the domain and
         * master passphrase to be processed.
         *
         * @constructor
         * @param {String} srcString The string to be hashed
         */
        SkeletonKey = function (domain, master) {
            this.domain = domain;
            this.master = master;
        };

    SkeletonKey.prototype = {
        getPassword: function () {
            return encode(coreHMAC(this.domain, this.master));
        }
    };

    /* Transform the current hostname into a domain name and use that
     * to generate the site password.
     */
    (function () {
        var h = location.hostname,
            domain = h.slice(h.lastIndexOf('.', h.lastIndexOf('.') - 1) + 1).toLowerCase(),
            master = prompt('Enter your master passphrase:', ''),
            password;

	if (master) {
            password = new SkeletonKey(domain, master).getPassword();
            prompt('Your site password for "' + domain + '" is:', password);
	}
    }());
}());