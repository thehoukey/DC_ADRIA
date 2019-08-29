package com.adria.web;

import com.adria.entities.Compte;
import com.adria.entities.Demande;
import com.adria.services.CompteService;
import com.adria.services.DemandeService;
import com.adria.services.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.time.LocalDate;
import java.util.Collection;

@RestController
@RequestMapping("/api/demand")
@CrossOrigin
public class DemandeController {

    @Autowired
    DemandeService demandeService;

    @Autowired
    CompteService compteService;

    @Autowired
    MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    ResponseEntity<?> addDemand(@Valid @RequestBody Demande d, BindingResult result)
    {
       // System.out.println(principal);
        ResponseEntity<?> ValidationErrors=mapValidationErrorService.MapValidationService(result);
        if(ValidationErrors!=null) return ValidationErrors;
        Demande demande=demandeService.saveOrUpdate(d);
        return new ResponseEntity<Demande>(demande, HttpStatus.CREATED);

    }
    @GetMapping("/all/accounts/username")
    ResponseEntity<?> getAllAccounts(Principal principal)
    {
        Iterable<Compte> accounts = compteService.findAllAccounts(principal.getName());
        return new ResponseEntity<Iterable<Compte>>(accounts,HttpStatus.OK);
    }

    @GetMapping("/all/username")
    ResponseEntity<?> getAllDemands(Principal principal)
    {
       Collection<Demande> demande =demandeService.findDemandeBySubscriber(principal.getName());
       return new ResponseEntity<Collection<Demande>>(demande,HttpStatus.OK);
    }

    @GetMapping("/account/{num}")
    ResponseEntity<?> getDemandsByAccount(@PathVariable int num)
    {
        Iterable<Demande> demande =demandeService.findDemandByAccount(num);
        return new ResponseEntity<Iterable<Demande>>(demande,HttpStatus.OK);
    }
    @GetMapping("/account/{num}/{status}")
    ResponseEntity<?> getDemandsByStatusAndAccount(@PathVariable int num,@PathVariable String status)
    {
        Collection<Demande> demande =demandeService.findDemandByStatusAndAccount(num,status);
        return new ResponseEntity<Collection<Demande>>(demande,HttpStatus.OK);
    }
    @GetMapping("/account/{num}/{date1}/{date2}")
    ResponseEntity<?> getDemandsByCreationDateAndAccount(@PathVariable int num,@PathVariable String date1,@PathVariable String date2)
    {
        LocalDate date_a=LocalDate.parse(date1);
        LocalDate date_b=LocalDate.parse(date2);
        Collection<Demande> demande =demandeService.findDemandByCreationDateAndAccount(date_a,date_b,num);
        return new ResponseEntity<Collection<Demande>>(demande,HttpStatus.OK);
    }
    @GetMapping("/account/{num}/{status}/{date1}/{date2}")
    ResponseEntity<?> getDemandsByStatusAndCreationDate(@PathVariable int num,@PathVariable String status,@PathVariable String date1,@PathVariable String date2)
    {
        LocalDate date_a=LocalDate.parse(date1);
        LocalDate date_b=LocalDate.parse(date2);
        Collection<Demande> demande =demandeService.findDemandeByCreationDateAndStatusAndAccount(num,status,date_a,date_b);
        return new ResponseEntity<Collection<Demande>>(demande,HttpStatus.OK);
    }

    //-----------------------------
    @GetMapping("/{id}")
    ResponseEntity<?> getDemandById(@PathVariable long id)
    {
        Demande demande =demandeService.findDemandById(id);
        return new ResponseEntity<Demande>(demande,HttpStatus.OK);
    }
    @GetMapping("/username/{status}")
    ResponseEntity<?> getDemandsByStatus(Principal principal,@PathVariable String status)
    {
        Collection<Demande> demande =demandeService.findDemandByStatusAndUsername(principal.getName(),status);
        return new ResponseEntity<Collection<Demande>>(demande,HttpStatus.OK);
    }

    @GetMapping("/username/{date1}/{date2}")
    ResponseEntity<?> getDemandsByCreationDate(Principal principal,@PathVariable String date1,@PathVariable String date2)
    {
        LocalDate date_a=LocalDate.parse(date1);
        LocalDate date_b=LocalDate.parse(date2);
        Collection<Demande> demande =demandeService.findDemandByCreationDateAndUsername(date_a,date_b,principal.getName());
        return new ResponseEntity<Collection<Demande>>(demande,HttpStatus.OK);
    }
    @GetMapping("/username/{status}/{date1}/{date2}")
    ResponseEntity<?> getDemandsByStatusAndCreationDate(Principal principal,@PathVariable String status,@PathVariable String date1,@PathVariable String date2)
    {
        LocalDate date_a=LocalDate.parse(date1);
        LocalDate date_b=LocalDate.parse(date2);
        Collection<Demande> demande =demandeService.findDemandeByCreationDateAndStatusAndUsername(principal.getName(),status,date_a,date_b);
        return new ResponseEntity<Collection<Demande>>(demande,HttpStatus.OK);
    }



}
