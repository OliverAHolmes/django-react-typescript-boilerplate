from rest_framework import serializers
from .models import TodoList, TodoItem
from users.models import CustomUser


class TodoItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoItem
        fields = ["id", "title", "description", "completed", "todo_list"]


class TodoListSerializer(serializers.ModelSerializer):
    items = TodoItemSerializer(many=True, read_only=True)
    user = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.all(), required=False
    )

    class Meta:
        model = TodoList
        fields = ["id", "name", "user", "items"]
