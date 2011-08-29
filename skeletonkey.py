#!/usr/bin/env python

import hmac
import hashlib

passwordLength = 14
table = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

def encode(hexstr):
    password = ''
    base = len(table)
    q = int(hexstr, 16)

    while len(password) < passwordLength:
        r = q % base
        q = (q - r) / base
        password += table[r]

    return password

domain = raw_input('Enter domain: ')
master = raw_input('Enter master passphrase: ')
print encode(hmac.new(master, domain, hashlib.sha256).hexdigest())

