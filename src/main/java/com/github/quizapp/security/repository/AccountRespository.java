package com.github.quizapp.security.repository;

import com.github.quizapp.security.users.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRespository extends JpaRepository<Account,Long> {
}
