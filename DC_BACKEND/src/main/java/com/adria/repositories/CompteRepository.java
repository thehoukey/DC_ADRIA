package com.adria.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import com.adria.entities.Abonne;
import com.adria.entities.Compte;

@RepositoryRestResource
@Repository
public interface CompteRepository extends CrudRepository<Compte, Long>{
    Compte findByNumCompte(int numCompte);
  Iterable<Compte> findByAbonne(Abonne abonne);
}
