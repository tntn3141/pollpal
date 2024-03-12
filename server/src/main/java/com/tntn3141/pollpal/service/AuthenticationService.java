package com.tntn3141.pollpal.service;

import com.tntn3141.pollpal.dao.JwtAuthenticationResponse;
import com.tntn3141.pollpal.dao.LoginRequest;
import com.tntn3141.pollpal.dao.RegisterRequest;

public interface AuthenticationService {

  JwtAuthenticationResponse register(RegisterRequest request);
  JwtAuthenticationResponse login(LoginRequest request);
  
}
