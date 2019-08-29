package com.adria.services;

import com.adria.entities.Abonne;
import com.adria.entities.Compte;
import com.adria.entities.Demande;
import com.adria.repositories.AbonneRepository;
import com.adria.repositories.CompteRepository;
import com.adria.repositories.DemandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class DemandeService {

    @Autowired
    DemandeRepository demandeRepository;
    @Autowired
    CompteService compteService;
    @Autowired
    CompteRepository compteRepository;

    @Autowired
    AbonneRepository abonneRepository;

    @Autowired
    AbonneService abonneService;


    public Demande saveOrUpdate(Demande demande)
    {
        String username=demande.getCompte().getAbonne().getUsername();
        int numCompte=demande.getCompte().getNumCompte();
        demande.setCompte(compteRepository.findByNumCompte(numCompte));
        demande.getCompte().setAbonne(abonneRepository.findByUsername(username));
        return demandeRepository.save(demande);
    }
    public Demande findDemandById(long id) { return demandeRepository.findById(id); }
    public Iterable<Demande> findAllDemands(){return demandeRepository.findAll();}

    public Demande findDemand(long id){return demandeRepository.findById(id);}

    public Collection<Demande> findDemandByAccount(int num){
        return demandeRepository.findByCompte(compteRepository.findByNumCompte(num));
    }
    public Collection<Demande> findDemandByCreationDateAndAccount(LocalDate date1, LocalDate date2,int num){
        Compte compte=compteRepository.findByNumCompte(num);
        return demandeRepository.findByCompteAndDateCreationBetween(compte,date1,date2);
    }

    public Collection<Demande> findDemandByStatusAndAccount(int num,String status){
        Compte compte=compteRepository.findByNumCompte(num);
        return demandeRepository.findByCompteAndStatus(compte,status);
    }

    public Collection<Demande> findDemandeByCreationDateAndStatusAndAccount(int num,String status,LocalDate date1,LocalDate date2){
        Compte compte=compteRepository.findByNumCompte(num);
        return demandeRepository.findByCompteAndStatusAndDateCreationBetween(compte,status,date1,date2);
    }

    public Collection<Demande> findDemandeBySubscriber(String username){
        Collection<Compte> comptes= abonneRepository.findByUsername(username).getComptes();
        List<Demande> demandes=new ArrayList<>();
        comptes.forEach((compte)->demandeRepository.findByCompte(compte).forEach(demande -> demandes.add(demande)));
        return demandes;
    }
    public Collection<Demande> findDemandByCreationDateAndUsername(LocalDate date1, LocalDate date2,String username){
        Collection<Compte> comptes= abonneRepository.findByUsername(username).getComptes();
        List<Demande> demandes=new ArrayList<>();
        comptes.forEach((compte)->demandeRepository.findByCompteAndDateCreationBetween(compte,date1,date2).forEach(demande -> demandes.add(demande)));
        return  demandes;
    }

    public Collection<Demande> findDemandByStatusAndUsername(String username,String status){
        Collection<Compte> comptes= abonneRepository.findByUsername(username).getComptes();
        List<Demande> demandes=new ArrayList<>();
        comptes.forEach((compte)->demandeRepository.findByCompteAndStatus(compte,status).forEach(demande -> demandes.add(demande)));
        return  demandes;
    }



    public Collection<Demande> findDemandeByCreationDateAndStatusAndUsername(String username,String status,LocalDate date1,LocalDate date2){
        Collection<Compte> comptes= abonneRepository.findByUsername(username).getComptes();
        List<Demande> demandes=new ArrayList<>();
        comptes.forEach(
                (compte)->demandeRepository.findByCompteAndStatusAndDateCreationBetween(compte,status,date1,date2).
                forEach(
                        demande -> demandes.add(demande)));
        return demandes;
    }


   // public Collection<Demande> findDemandBySentDate(LocalDate date){return demandeRepository.findByDateEnvoie(date);}


}
