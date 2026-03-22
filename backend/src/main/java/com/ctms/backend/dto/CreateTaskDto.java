package com.ctms.backend.dto;

import com.ctms.backend.entity.ComplianceTask;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Future;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateTaskDto {
    
    @NotNull(message = "Client ID is required")
    private Long clientId;
    
    @NotBlank(message = "Title is required")
    private String title;
    
    private String description;
    
    @NotBlank(message = "Category is required")
    private String category;
    
    @NotNull(message = "Due date is required")
    @Future(message = "Due date must be in the future")
    private LocalDate dueDate;
    
    @NotNull(message = "Priority is required")
    private ComplianceTask.TaskPriority priority;
}
