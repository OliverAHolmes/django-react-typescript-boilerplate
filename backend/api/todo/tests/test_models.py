# todo/tests/test_models.py
from django.test import TestCase
from django.contrib.auth import get_user_model
from todo.models import TodoList, TodoItem

User = get_user_model()


class TodoListModelTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password")
        self.todo_list = TodoList.objects.create(name="Test List", user=self.user)

    def test_todolist_creation(self):
        self.assertEqual(self.todo_list.name, "Test List")
        self.assertEqual(self.todo_list.user, self.user)


class TodoItemModelTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password")
        self.todo_list = TodoList.objects.create(name="Test List", user=self.user)
        self.todo_item = TodoItem.objects.create(
            title="Test Item",
            description="Test Description",
            completed=False,
            todo_list=self.todo_list,
        )

    def test_todoitem_creation(self):
        self.assertEqual(self.todo_item.title, "Test Item")
        self.assertEqual(self.todo_item.description, "Test Description")
        self.assertFalse(self.todo_item.completed)
        self.assertEqual(self.todo_item.todo_list, self.todo_list)
