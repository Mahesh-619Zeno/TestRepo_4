class TodoManager:
    def __init__(self):
        self.tasks = []

    def add_task(self, task):
        """Add a new task to the list."""
        if not task or not isinstance(task, str):
            raise ValueError("Task must be a non-empty string.")
        self.tasks.append({"task": task, "completed": False})

    def complete_task(self, index):
        """Mark a task as completed."""
        if index < 0 or index >= len(self.tasks):
            raise IndexError("Invalid task index.")
        self.tasks[index]["completed"] = True

    def remove_task(self, index):
        """Remove a task by index."""
        if index < 0 or index >= len(self.tasks):
            raise IndexError("Invalid task index.")
        self.tasks.pop(index)

    def list_tasks(self):
        """List all tasks with their status."""
        return [
            f"[{'x' if t['completed'] else ' '}] {i}: {t['task']}"
            for i, t in enumerate(self.tasks)
        ]
