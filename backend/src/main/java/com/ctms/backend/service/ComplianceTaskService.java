package com.ctms.backend.service;

import com.ctms.backend.dto.ComplianceTaskDto;
import com.ctms.backend.dto.CreateTaskDto;
import com.ctms.backend.entity.Client;
import com.ctms.backend.entity.ComplianceTask;
import com.ctms.backend.repository.ClientRepository;
import com.ctms.backend.repository.ComplianceTaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ComplianceTaskService {
    
    private final ComplianceTaskRepository taskRepository;
    private final ClientRepository clientRepository;
    
    public List<ComplianceTaskDto> getTasksForClient(Long clientId) {
        return taskRepository.findByClientId(clientId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<ComplianceTaskDto> getTasksForClientWithFilters(Long clientId, String status, String category) {
        List<ComplianceTask> tasks;
        
        if (status != null && category != null) {
            ComplianceTask.TaskStatus statusEnum = ComplianceTask.TaskStatus.valueOf(status.toUpperCase());
            tasks = taskRepository.findByClientIdAndStatusAndCategory(clientId, statusEnum, category);
        } else if (status != null) {
            ComplianceTask.TaskStatus statusEnum = ComplianceTask.TaskStatus.valueOf(status.toUpperCase());
            tasks = taskRepository.findByClientIdAndStatus(clientId, statusEnum);
        } else if (category != null) {
            tasks = taskRepository.findByClientIdAndCategory(clientId, category);
        } else {
            tasks = taskRepository.findByClientId(clientId);
        }
        
        return tasks.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<ComplianceTaskDto> getOverdueTasksForClient(Long clientId) {
        LocalDate today = LocalDate.now();
        return taskRepository.findOverdueTasks(clientId, today).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public ComplianceTaskDto getTaskById(Long id) {
        ComplianceTask task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
        return convertToDto(task);
    }
    
    public ComplianceTaskDto createTask(CreateTaskDto createTaskDto) {
        Client client = clientRepository.findById(createTaskDto.getClientId())
                .orElseThrow(() -> new RuntimeException("Client not found with id: " + createTaskDto.getClientId()));
        
        ComplianceTask task = new ComplianceTask();
        task.setClient(client);
        task.setTitle(createTaskDto.getTitle());
        task.setDescription(createTaskDto.getDescription());
        task.setCategory(createTaskDto.getCategory());
        task.setDueDate(createTaskDto.getDueDate());
        task.setPriority(createTaskDto.getPriority());
        task.setStatus(ComplianceTask.TaskStatus.PENDING);
        
        ComplianceTask savedTask = taskRepository.save(task);
        return convertToDto(savedTask);
    }
    
    public ComplianceTaskDto updateTaskStatus(Long id, ComplianceTask.TaskStatus newStatus) {
        ComplianceTask task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
        
        task.setStatus(newStatus);
        ComplianceTask updatedTask = taskRepository.save(task);
        return convertToDto(updatedTask);
    }
    
    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new RuntimeException("Task not found with id: " + id);
        }
        taskRepository.deleteById(id);
    }
    
    private ComplianceTaskDto convertToDto(ComplianceTask task) {
        ComplianceTaskDto dto = new ComplianceTaskDto();
        dto.setId(task.getId());
        dto.setClientId(task.getClient().getId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setCategory(task.getCategory());
        dto.setDueDate(task.getDueDate());
        dto.setStatus(task.getStatus());
        dto.setPriority(task.getPriority());
        dto.setOverdue(isOverdue(task));
        return dto;
    }
    
    private boolean isOverdue(ComplianceTask task) {
        return task.getDueDate().isBefore(LocalDate.now()) && 
               task.getStatus() != ComplianceTask.TaskStatus.COMPLETED;
    }
}
