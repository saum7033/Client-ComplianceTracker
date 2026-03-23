package com.ctms.backend.repository;

import com.ctms.backend.entity.ComplianceTask;
import com.ctms.backend.entity.ComplianceTask.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ComplianceTaskRepository extends JpaRepository<ComplianceTask, Long> {
    List<ComplianceTask> findByClientId(Long clientId);
    List<ComplianceTask> findByClientIdAndStatus(Long clientId, TaskStatus status);
    List<ComplianceTask> findByClientIdAndCategory(Long clientId, String category);
    List<ComplianceTask> findByClientIdAndStatusAndCategory(Long clientId, TaskStatus status, String category);
    
    @Query("SELECT t FROM ComplianceTask t WHERE t.client.id = :clientId AND t.dueDate < :currentDate AND t.status != 'COMPLETED'")
    List<ComplianceTask> findOverdueTasks(@Param("clientId") Long clientId, @Param("currentDate") LocalDate currentDate);
}
