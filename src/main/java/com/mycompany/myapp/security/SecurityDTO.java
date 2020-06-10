package com.mycompany.myapp.security;

import com.mycompany.myapp.domain.Authority;
import org.springframework.security.core.GrantedAuthority;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class SecurityDTO {
    private String login;
    private List<GrantedAuthority> authorities;
    private Long org;

    public SecurityDTO() {
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public Long getOrg() {
        return org;
    }

    public void setOrg(Long org) {
        this.org = org;
    }

    public SecurityDTO(String login, Long org, Set<GrantedAuthority> authorities) {
        this.login = login;
        this.org = org;
        this.authorities = new ArrayList<GrantedAuthority>(authorities);
    }

    public SecurityDTO(String login) {
        this.login = login;
    }

    public List<GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(List<GrantedAuthority> authorities) {
        this.authorities = authorities;
    }
}
