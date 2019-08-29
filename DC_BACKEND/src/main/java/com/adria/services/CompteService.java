package com.adria.services;

import com.adria.entities.Abonne;
import com.adria.entities.Compte;
import com.adria.repositories.AbonneRepository;
import com.adria.repositories.CompteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CompteService {
    @Autowired
    CompteRepository compteRepository;
    @Autowired
    AbonneRepository abonneRepository;
    public Compte saveOrUpdate(Compte compte) { return compteRepository.save(compte); }
    public Iterable<Compte> findAllAccounts(String username){
        Abonne abonne=abonneRepository.findByUsername(username);
        return compteRepository.findByAbonne(abonne);
    }
    public Optional<Compte> findAccount(long num){ return compteRepository.findById(num);}
}
