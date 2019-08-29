package com.adria.services;

import com.adria.entities.Abonne;
import com.adria.repositories.AbonneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class CustomSubscriberDetailsService implements UserDetailsService {
    @Autowired
    private AbonneRepository abonneRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Abonne subscriber = abonneRepository.findByUsername(username);
        if(subscriber==null) new UsernameNotFoundException("User not found");
        return subscriber;
    }


    @Transactional
    public Abonne loadSubscriberById(Long id){
        Abonne subscriber = abonneRepository.getById(id);
        if(subscriber==null) new UsernameNotFoundException("User not found");
        return subscriber;

    }

}
