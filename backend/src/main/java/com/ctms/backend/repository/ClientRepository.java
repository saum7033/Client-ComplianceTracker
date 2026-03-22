package com.ctms.backend.repository;

import com.ctms.backend.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    List<Client> findByCompanyNameContainingIgnoreCase(String companyName);
    List<Client> findByCountry(String country);
    List<Client> findByEntityType(String entityType);
}
