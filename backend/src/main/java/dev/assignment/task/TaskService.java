package dev.assignment.task;

import dev.assignment.user.Role;
import dev.assignment.user.User;
import dev.assignment.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public List<Task> listTasks(User currentUser) {
        if (currentUser.getRole() == Role.ADMIN) {
            return taskRepository.findAll();
        }
        return taskRepository.findByOwner(currentUser);
    }

    public Task createTask(User currentUser, Task task) {
        task.setId(null);
        task.setOwner(currentUser);
        return taskRepository.save(task);
    }

    public Task updateTask(User currentUser, Long id, Task update) {
        Task existing = taskRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Task not found"));
        if (!existing.getOwner().getId().equals(currentUser.getId()) && currentUser.getRole() != Role.ADMIN) {
            throw new AccessDeniedException("Forbidden");
        }
        existing.setTitle(update.getTitle());
        existing.setDescription(update.getDescription());
        existing.setCompleted(update.isCompleted());
        return taskRepository.save(existing);
    }

    public void deleteTask(User currentUser, Long id) {
        Task existing = taskRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Task not found"));
        if (!existing.getOwner().getId().equals(currentUser.getId()) && currentUser.getRole() != Role.ADMIN) {
            throw new AccessDeniedException("Forbidden");
        }
        taskRepository.delete(existing);
    }
}


