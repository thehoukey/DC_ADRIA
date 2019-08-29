package com.adria.validator;

import com.adria.entities.Abonne;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
@Component
public class AbonneValidator implements Validator {
    @Override
    public boolean supports(Class<?> aClass) {
        return Abonne.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {

        Abonne abonne = (Abonne) object;

        if (abonne.getPassword().length() < 6) {
            errors.rejectValue("password", "Length", "Password must be at least 6 characters");
        }

        if (!abonne.getPassword().equals(abonne.getConfirmPassword())) {
            errors.rejectValue("confirmPassword", "Match", "Passwords must match");

        }

    }
}
