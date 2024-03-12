package com.tntn3141.pollpal.service.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tntn3141.pollpal.dao.JwtAuthenticationResponse;
import com.tntn3141.pollpal.dao.LoginRequest;
import com.tntn3141.pollpal.dao.RegisterRequest;
import com.tntn3141.pollpal.entity.Role;
import com.tntn3141.pollpal.entity.User;
import com.tntn3141.pollpal.repository.UserRepository;
import com.tntn3141.pollpal.service.AuthenticationService;
import com.tntn3141.pollpal.service.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;

  @Override
  public JwtAuthenticationResponse register(RegisterRequest request) {
    var user = User
        .builder()
        .name(request.getName())
        .email(request.getEmail())
        .password(passwordEncoder.encode(request.getPassword()))
        .role(Role.USER).build();
    userRepository.save(user);
    var jwt = jwtService.generateToken(user);
    return JwtAuthenticationResponse
      .builder()
      .token(jwt)
      .name(user.getName())
      .build();
  }

  @Override
  public JwtAuthenticationResponse login(LoginRequest request) {
    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
    var user = userRepository
      .findByEmail(request.getEmail())
      .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));
    var jwt = jwtService.generateToken(user);
    return JwtAuthenticationResponse
      .builder()
      .token(jwt)
      .name(user.getName())
      .build();
  }

}
