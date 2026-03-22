package com.ctms.backend.controller;

import com.ctms.backend.dto.ComplianceTaskDto;
import com.ctms.backend.dto.CreateTaskDto;
import com.ctms.backend.entity.ComplianceTask;
import com.ctms.backend.service.ComplianceTaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class ComplianceTaskController {
    
    private final ComplianceTaskService taskService;
    
    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<ComplianceTaskDto>> getTasksForClient(
            @PathVariable Long clientId,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String category) {
        List<ComplianceTaskDto> tasks = taskService.getTasksForClientWithFilters(clientId, status, category);
        return ResponseEntity.ok(tasks);
    }
    
    @GetMapping("/client/{clientId}/overdue")
    public ResponseEntity<List<ComplianceTaskDto>> getOverdueTasksForClient(@PathVariable Long clientId) {
        List<ComplianceTaskDto> overdueTasks = taskService.getOverdueTasksForClient(clientId);
        return ResponseEntity.ok(overdueTasks);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ComplianceTaskDto> getTaskById(@PathVariable Long id) {
        try {
            ComplianceTaskDto task = taskService.getTaskById(id);
            return ResponseEntity.ok(task);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    
    @PostMapping
    public ResponseEntity<ComplianceTaskDto> createTask(@Valid @RequestBody CreateTaskDto createTaskDto) {
        try {
            ComplianceTaskDto createdTask = taskService.createTask(createTaskDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
        } catch (RuntimeException e) {
            System.err.println("Error creating task: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(null);
        } catch (Exception e) {
            System.err.println("Unexpected error creating task: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<ComplianceTaskDto> updateTaskStatus(
            @PathVariable Long id,
            @RequestParam ComplianceTask.TaskStatus status) {
        try {
            ComplianceTaskDto updatedTask = taskService.updateTaskStatus(id, status);
            return ResponseEntity.ok(updatedTask);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        try {
            taskService.deleteTask(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
