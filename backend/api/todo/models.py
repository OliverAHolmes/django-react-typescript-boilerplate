# todo/models.py
from django.db import models
from users.models import CustomUser

class TodoList(models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class TodoItem(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    completed = models.BooleanField(default=False)
    todo_list = models.ForeignKey(
        TodoList, related_name="items", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.title
