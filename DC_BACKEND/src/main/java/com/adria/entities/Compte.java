package com.adria.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.Collection;

import javax.persistence.*;
import javax.validation.constraints.NotNull;


@Entity
public class Compte implements Serializable{
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	//@NotBlank(message="account number is required")
	//@Size(min=4,max=10,message="plz use 4 to 5 characters")
	@Column(unique = true)
	private int numCompte;
	private double soldeCompte;
	//@NotBlank(message = "accounting balance is required")
	private double soldeComptable;
	//@NotBlank(message = "accounting balance is required")
	private boolean beneficiaire;
	private String devise;
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="ID_ABN")
	private Abonne abonne;
	@JsonIgnore
	@OneToMany(mappedBy="compte",fetch=FetchType.LAZY,cascade = CascadeType.MERGE)
	private Collection<Demande> demandes;
	
	//getters & setters 
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public int getNumCompte() {
		return numCompte;
	}
	public void setNumCompte(int numCompte) {
		this.numCompte = numCompte;
	}
	public double getSoldeCompte() {
		return soldeCompte;
	}
	public void setSoldeCompte(double soldeCompte) {
		this.soldeCompte = soldeCompte;
	}
	public double getSoldeComptable() {
		return soldeComptable;
	}
	public void setSoldeComptable(double soldeComptable) {
		this.soldeComptable = soldeComptable;
	}
	public boolean isBeneficiaire() { return beneficiaire; }
	public void setBeneficiaire(boolean beneficiaire) { this.beneficiaire = beneficiaire; }
	public String getDevise(){return devise;}
	public void setDevise(String devise){ this.devise=devise;}
	public Abonne getAbonne() {
		return abonne;
	}
	public void setAbonne(Abonne abonne) {
		this.abonne = abonne;
	}
	public Collection<Demande> getDemandes() {
		return demandes;
	}
	public void setDemandes(Collection<Demande> demandes) {
		this.demandes = demandes;
	}
	public Compte() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "Compte [id=" + id + ", numCompte=" + numCompte + ", soldeCompte=" + soldeCompte + ", soldeComptable="
				+ soldeComptable + ", abonne=" + abonne + "]";
	}




}
