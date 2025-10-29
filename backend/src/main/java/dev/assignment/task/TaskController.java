package dev.assignment.task;

import dev.assignment.user.User;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<Task>> list(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(taskService.listTasks(user));
    }

    @PostMapping
    public ResponseEntity<Task> create(@AuthenticationPrincipal User user, @Valid @RequestBody Task task) {
        return ResponseEntity.ok(taskService.createTask(user, task));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> update(@AuthenticationPrincipal User user, @PathVariable Long id, @Valid @RequestBody Task task) {
        return ResponseEntity.ok(taskService.updateTask(user, id, task));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@AuthenticationPrincipal User user, @PathVariable Long id) {
        taskService.deleteTask(user, id);
        return ResponseEntity.noContent().build();
    }
}


