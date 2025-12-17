package com.boot.smsbackend.Security;

import com.boot.smsbackend.AuthProviderType;
import org.springframework.stereotype.Component;

@Component
public class ProviderUtil {
    public AuthProviderType getAuthProviderTypeFromRegistrationId(String registrationId) {
        return switch(registrationId.toLowerCase()){
            case "google" -> AuthProviderType.GOOGLE;
            case "github" -> AuthProviderType.GITHUB;
            default -> throw new IllegalStateException("Unexpected value: " + registrationId);
        };
    }
}
