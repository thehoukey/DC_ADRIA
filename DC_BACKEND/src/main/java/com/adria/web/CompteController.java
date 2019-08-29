package com.adria.web;

import com.adria.entities.Compte;
import com.adria.services.CompteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/account")
@CrossOrigin
public class CompteController {

    @Autowired
    CompteService compteService;

    @PostMapping("")
    ResponseEntity<Compte> addAccount(@Valid @RequestBody Compte c)
    {
        Compte compte= compteService.saveOrUpdate(c);
        return new ResponseEntity<Compte>(compte, HttpStatus.CREATED);
    }
    @GetMapping("/{id}")
    ResponseEntity<Optional<Compte>> getAccount(@PathVariable Long id)
    {
        Optional<Compte> compte= compteService.findAccount(id);
        return new ResponseEntity<Optional<Compte>>(compte, HttpStatus.OK);
    }

}
