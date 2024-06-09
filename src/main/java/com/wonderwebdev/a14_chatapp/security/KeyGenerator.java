package com.wonderwebdev.a14_chatapp.security;

import javax.crypto.SecretKey;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class KeyGenerator {
    public static void main(String[] args) {
        SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256); // or HS512
        System.out.println("Secret Key: " + new String(java.util.Base64.getEncoder().encode(key.getEncoded())));
    }

}
