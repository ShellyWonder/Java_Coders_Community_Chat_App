package com.wonderwebdev.a14_chatapp.security;
import java.util.Base64;

public class KeyValidation {
    public static void main(String[] args) {
        String base64EncodedKey = "your_base64_encoded_key_here";
        byte[] decodedKey = Base64.getDecoder().decode(base64EncodedKey);
        System.out.println("Key length (in bytes): " + decodedKey.length);
    }
}

