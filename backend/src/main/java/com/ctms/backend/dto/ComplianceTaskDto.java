package com.ctms.backend.dto;

import com.ctms.backend.entity.ComplianceTask;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComplianceTaskDto {
    private Long id;
    private Long clientId;
    private String title;
    private String description;
    private String category;
    private LocalDate dueDate;
    private ComplianceTask.TaskStatus status;
    private ComplianceTask.TaskPriority priority;
    private boolean overdue;
}
