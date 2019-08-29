package com.adria.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import com.adria.entities.Abonne;

@RepositoryRestResource
@Repository
public interface AbonneRepository extends CrudRepository<Abonne,Long>{

    Abonne findByUsername(String username);
    Abonne getById(Long id);
}
