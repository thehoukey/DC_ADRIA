package com.adria.services;

import com.adria.entities.Compte;
import com.adria.entities.Demande;
import com.adria.exceptions.UsernameAlreadyExistsException;
import com.adria.repositories.DemandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.adria.entities.Abonne;
import com.adria.repositories.AbonneRepository;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class AbonneService {
	
	@Autowired
	AbonneRepository abonneRepository;

	@Autowired
    DemandeRepository demandeRepository;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

	
	public Iterable<Abonne> findAllSubscribers(){
        return abonneRepository.findAll();
    }

    public Abonne saveOrUpdate(Abonne abonne){
        try{
             abonne.setPassword(bCryptPasswordEncoder.encode(abonne.getPassword()));

            //Username has to be unique (exception)
            abonne.setUsername(abonne.getUsername());
            // Make sure that password and confirmPassword match
            // We don't persist or show the confirmPassword

            return abonneRepository.save(abonne);

        }catch (Exception e){
           throw new UsernameAlreadyExistsException("Username '"+abonne.getUsername()+"' already exists");
        }

    }


}
