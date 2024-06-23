# todo/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import TodoList, TodoItem
from .serializers import TodoListSerializer, TodoItemSerializer


class TodoListViewSet(viewsets.ModelViewSet):
    serializer_class = TodoListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TodoList.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TodoItemViewSet(viewsets.ModelViewSet):
    serializer_class = TodoItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TodoItem.objects.filter(todo_list__user=self.request.user)
