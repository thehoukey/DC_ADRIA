package com.adria.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
public class Demande implements Serializable{
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    @JsonProperty
	private Long id;
	@NotBlank(message="reason is required")
	private String motif;
	//@JsonFormat(pattern = "yyyy-mm-dd")
	@Column(updatable = false)
	private LocalDate dateCreation;
	//@JsonFormat(pattern = "yyyy-mm-dd")
	private LocalDate dateEnvoie;
	private String status;
    @NotBlank(message="Checkbook type is required")
	private  String type;
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="ID_CPT")
	private Compte compte;


	public Demande() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public String getMotif() {
		return motif;
	}

	public void setMotif(String motif) {
		this.motif = motif;
	}

	public LocalDate getDateCreation() {
		return dateCreation;
	}

	public void setDateCreation(LocalDate dateCreation) {
		this.dateCreation = dateCreation;
	}

	public LocalDate getDateEnvoie() {
		return dateEnvoie;
	}

	public void setDateEnvoie(LocalDate dateEnvoie) {
		this.dateEnvoie = dateEnvoie;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

	public Compte getCompte() {
		return compte;
	}

	public void setCompte(Compte compte) {
		this.compte = compte;
	}

	@PrePersist
	protected void OnCreate()
	{
		this.dateCreation= LocalDate.now();
	}

	@Override
	public String toString() {
		return "Demande [id=" + id + ", motif=" + motif + ", date_creation=" + dateCreation + ", date_envoie="
				+ dateEnvoie + ", status=" + status + ", compte=" + compte + "]";
	}

	

}
