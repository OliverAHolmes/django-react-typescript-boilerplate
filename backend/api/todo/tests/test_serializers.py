# todo/tests/test_serializers.py
from django.test import TestCase
from django.contrib.auth import get_user_model
from todo.models import TodoList, TodoItem
from todo.serializers import TodoListSerializer, TodoItemSerializer

User = get_user_model()


class TodoListSerializerTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password")
        self.todo_list = TodoList.objects.create(name="Test List", user=self.user)
        self.serializer = TodoListSerializer(instance=self.todo_list)

    def test_todolist_serialization(self):
        data = self.serializer.data
        self.assertEqual(data["name"], "Test List")
        self.assertEqual(data["user"], self.user.pk)


class TodoItemSerializerTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password")
        self.todo_list = TodoList.objects.create(name="Test List", user=self.user)
        self.todo_item = TodoItem.objects.create(
            title="Test Item",
            description="Test Description",
            completed=False,
            todo_list=self.todo_list,
        )
        self.serializer = TodoItemSerializer(instance=self.todo_item)

    def test_todoitem_serialization(self):
        data = self.serializer.data
        self.assertEqual(data["title"], "Test Item")
        self.assertEqual(data["description"], "Test Description")
        self.assertFalse(data["completed"])
        self.assertEqual(data["todo_list"], self.todo_list.pk)
