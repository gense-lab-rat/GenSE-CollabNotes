package com.gense.service;

import com.gense.model.User;

public interface UserService {
    User register(User user);
    boolean login(String email, String password);
}
