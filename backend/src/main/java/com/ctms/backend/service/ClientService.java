package com.ctms.backend.service;

import com.ctms.backend.dto.ClientDto;
import com.ctms.backend.entity.Client;
import com.ctms.backend.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ClientService {
    
    private final ClientRepository clientRepository;
    
    public List<ClientDto> getAllClients() {
        return clientRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public ClientDto getClientById(Long id) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client not found with id: " + id));
        return convertToDto(client);
    }
    
    public ClientDto createClient(ClientDto clientDto) {
        Client client = convertToEntity(clientDto);
        Client savedClient = clientRepository.save(client);
        return convertToDto(savedClient);
    }
    
    public ClientDto updateClient(Long id, ClientDto clientDto) {
        Client existingClient = clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client not found with id: " + id));
        
        existingClient.setCompanyName(clientDto.getCompanyName());
        existingClient.setCountry(clientDto.getCountry());
        existingClient.setEntityType(clientDto.getEntityType());
        
        Client updatedClient = clientRepository.save(existingClient);
        return convertToDto(updatedClient);
    }
    
    public void deleteClient(Long id) {
        if (!clientRepository.existsById(id)) {
            throw new RuntimeException("Client not found with id: " + id);
        }
        clientRepository.deleteById(id);
    }
    
    private ClientDto convertToDto(Client client) {
        ClientDto dto = new ClientDto();
        dto.setId(client.getId());
        dto.setCompanyName(client.getCompanyName());
        dto.setCountry(client.getCountry());
        dto.setEntityType(client.getEntityType());
        return dto;
    }
    
    private Client convertToEntity(ClientDto dto) {
        Client client = new Client();
        client.setCompanyName(dto.getCompanyName());
        client.setCountry(dto.getCountry());
        client.setEntityType(dto.getEntityType());
        return client;
    }
}
