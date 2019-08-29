package com.adria.web;

import com.adria.entities.Demande;
import com.adria.payload.JWTLoginSucessReponse;
import com.adria.payload.LoginRequest;
import com.adria.security.JwtTokenProvider;
import com.adria.services.MapValidationErrorService;
import com.adria.validator.AbonneValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.adria.entities.Abonne;
import com.adria.repositories.AbonneRepository;
import com.adria.services.AbonneService;

import javax.validation.Valid;

import static com.adria.security.SecurityConstants.TOKEN_PREFIX;

@RestController
@RequestMapping("/api/subscriber")
@CrossOrigin
public class AbonneController {

	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@Autowired
	private AbonneService abonneService;

	@Autowired
	private AbonneValidator abonneValidator;
	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	private AuthenticationManager authenticationManager;



	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result){
		System.out.println("ok");
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if(errorMap != null) return errorMap;

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						loginRequest.getUsername(),
						loginRequest.getPassword()
				)
		);


		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = TOKEN_PREFIX +  tokenProvider.generateToken(authentication);

		return ResponseEntity.ok(new JWTLoginSucessReponse(true, jwt));
	}

	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@Valid @RequestBody Abonne abonne, BindingResult result) {
		// Validate passwords match
		abonneValidator.validate(abonne,result);
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null) return errorMap;

		Abonne newSubscriber = abonneService.saveOrUpdate(abonne);

		return new ResponseEntity<Abonne>(newSubscriber, HttpStatus.CREATED);
	}

}
