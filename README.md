Skeleton Key
============

A simple bookmarklet for generating site-specific passwords.

Install
-------

Simply add this link to your bookmarks: [Site Password]

  [Site Password]: javascript:void%20function()%7Bvar%20a=14,b=%22123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz%22,c=8,d=function(a)%7Bvar%20b=%5B%5D,d=(1%3C%3Cc)-1,e=a.length*c,f;for(f=0;f%3Ce;f+=c)b%5Bf%3E%3E5%5D%7C=(a.charCodeAt(f/c)&d)%3C%3C32-c-f%2532;return%20b%7D,e=function(c)%7Bvar%20d=b.length,e=4294967296,f;return%20f=function(c,g)%7Bvar%20h,i,j=0;if(g.length===a)return%20g;for(h=0;h%3Cc.length;h+=1)i=j*e+c%5Bh%5D,j=i%25d,c%5Bh%5D=(i-j)/d;return%20f(c,g+b%5Bj%5D)%7D,f(c.map(function(a)%7Breturn%20a%3C0?a+e:a%7D),%22%22)%7D,f=function(a,b)%7Breturn%20a%3E%3E%3Eb%7Ca%3C%3C32-b%7D,g=function(a,b)%7Breturn%20a%3E%3E%3Eb%7D,h=function(a,b,c)%7Breturn%20a&b%5E~a&c%7D,i=function(a,b,c)%7Breturn%20a&b%5Ea&c%5Eb&c%7D,j=function(a)%7Breturn%20f(a,2)%5Ef(a,13)%5Ef(a,22)%7D,k=function(a)%7Breturn%20f(a,6)%5Ef(a,11)%5Ef(a,25)%7D,l=function(a)%7Breturn%20f(a,7)%5Ef(a,18)%5Eg(a,3)%7D,m=function(a)%7Breturn%20f(a,17)%5Ef(a,19)%5Eg(a,10)%7D,n=function(a,b)%7Bvar%20c=(a&65535)+(b&65535),d=(a%3E%3E%3E16)+(b%3E%3E%3E16)+(c%3E%3E%3E16);return(d&65535)%3C%3C16%7Cc&65535%7D,o=function(a,b,c,d)%7Bvar%20e=(a&65535)+(b&65535)+(c&65535)+(d&65535),f=(a%3E%3E%3E16)+(b%3E%3E%3E16)+(c%3E%3E%3E16)+(d%3E%3E%3E16)+(e%3E%3E%3E16);return(f&65535)%3C%3C16%7Ce&65535%7D,p=function(a,b,c,d,e)%7Bvar%20f=(a&65535)+(b&65535)+(c&65535)+(d&65535)+(e&65535),g=(a%3E%3E%3E16)+(b%3E%3E%3E16)+(c%3E%3E%3E16)+(d%3E%3E%3E16)+(e%3E%3E%3E16)+(f%3E%3E%3E16);return(g&65535)%3C%3C16%7Cf&65535%7D,q=function(a,b)%7Bvar%20c,d,e,f,g,q,r,s,t,u,v,w,x,y,z,A=%5B%5D,B;w=(b+65%3E%3E9%3C%3C4)+15,z=%5B1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298%5D,v=%5B1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225%5D,a%5Bb%3E%3E5%5D%7C=128%3C%3C24-b%2532,a%5Bw%5D=b,B=a.length;for(x=0;x%3CB;x+=16)%7Bc=v%5B0%5D,d=v%5B1%5D,e=v%5B2%5D,f=v%5B3%5D,g=v%5B4%5D,q=v%5B5%5D,r=v%5B6%5D,s=v%5B7%5D;for(y=0;y%3C64;y+=1)y%3C16?A%5By%5D=a%5By+x%5D:A%5By%5D=o(m(A%5By-2%5D),A%5By-7%5D,l(A%5By-15%5D),A%5By-16%5D),t=p(s,k(g),h(g,q,r),z%5By%5D,A%5By%5D),u=n(j(c),i(c,d,e)),s=r,r=q,q=g,g=n(f,t),f=e,e=d,d=c,c=n(t,u);v%5B0%5D=n(c,v%5B0%5D),v%5B1%5D=n(d,v%5B1%5D),v%5B2%5D=n(e,v%5B2%5D),v%5B3%5D=n(f,v%5B3%5D),v%5B4%5D=n(g,v%5B4%5D),v%5B5%5D=n(q,v%5B5%5D),v%5B6%5D=n(r,v%5B6%5D),v%5B7%5D=n(s,v%5B7%5D)%7Dreturn%20v%7D,r=function(a,b)%7Bvar%20e,f,g,h,i,j,k=%5B%5D,l=%5B%5D,m;e=256,f=d(b),g=b.length*c,h=d(a),i=a.length*c,64%3Cg/8?(f=q(f,g),f%5B15%5D&=4294967040):64%3Eg/8&&(f%5B15%5D&=4294967040);for(j=0;j%3C=15;j+=1)k%5Bj%5D=f%5Bj%5D%5E909522486,l%5Bj%5D=f%5Bj%5D%5E1549556828;return%20m=q(k.concat(h),512+i),m=q(l.concat(m),512+e),m%7D,s=function(a,b)%7Bthis.domain=a,this.master=b%7D;s.prototype=%7BgetPassword:function()%7Breturn%20e(r(this.domain,this.master))%7D%7D,function()%7Bvar%20a=location.hostname,b=a.slice(a.lastIndexOf(%22.%22,a.lastIndexOf(%22.%22)-1)+1).toLowerCase(),c=prompt(%22Enter%20your%20master%20passphrase:%22,%22%22),d;c&&(d=(new%20s(b,c)).getPassword(),prompt('Your%20site%20password%20for%20%22'+b+'%22%20is:',d))%7D()%7D()

Usage
-----

When you need to enter a password, click the bookmarklet link, enter a long passphrase at the prompt, and hit OK.

Paste the displayed password into the page's password field.

Details
-------

Skeleton Key uses the [SHA-256](http://en.wikipedia.org/wiki/SHA-2) and [RFC 2104](http://www.ietf.org/rfc/rfc2104.txt) HMAC algorithms to combine the site domain and passphrase.

By default, the site password is 14 characters of base 58 encoded text.  This generates about 82 bits of entropy and complies with most sites' password rules.

If you need to generate a shorter password or include special characters due to more restrictive site rules, just make the change before you paste it into the password field.  Of course, you can always modify the bookmarklet source code to better suit your needs.

Building
--------

The project includes a `build.js` file which simply minifies the Javascript source and then URI encodes it.  The script requires [Node](https://github.com/joyent/node) and [UglifyJS](https://github.com/mishoo/UglifyJS).

You can use the included Python version of the algorithm to verify the correctness of the final bookmarklet.

Credits
-------

Javascript cryptographic algorithms are based on the [jsSHA](http://jssha.sf.net) library by Brian Turek.

License
-------

Skeleton Key is released under the BSD license:
 
    Copyright (c) 2011, David Arnold
 
    Portions derived from jsSHA (jssha.sf.net), copyright Brian Turek
 
    All rights reserved.
    
    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions
    are met:
    
     - Redistributions of source code must retain the above copyright
       notice, this list of conditions and the following disclaimer.
 
     - Redistributions in binary form must reproduce the above
       copyright notice, this list of conditions and the following
       disclaimer in the documentation and/or other materials provided
       with the distribution.

     - The names of the contributors may not be used to endorse or
       promote products derived from this software without specific
       prior written permission.
    
    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
    "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
    LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
    FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
    COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
    INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
    (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
    SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
    HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
    STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
    ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
    OF THE POSSIBILITY OF SUCH DAMAGE.