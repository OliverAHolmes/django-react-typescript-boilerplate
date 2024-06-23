# todo/tests/test_views.py
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from todo.models import TodoList, TodoItem

User = get_user_model()


class TodoListViewSetTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password")
        self.client.login(username="testuser", password="password")
        self.token = Token.objects.create(user=self.user)
        self.todo_list = TodoList.objects.create(name="Test List", user=self.user)
        self.list_url = reverse("todolist-list")
        self.detail_url = reverse("todolist-detail", kwargs={"pk": self.todo_list.pk})

    def test_get_todolists(self):
        headers = {"Content-Type": "application/json", "Authorization": self.token}
        response = self.client.get(self.list_url, format="json", headers=headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_todolist(self):
        data = {"name": "New List"}
        headers = {"Content-Type": "application/json", "Authorization": self.token}
        response = self.client.post(self.list_url, data, format="json", headers=headers)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TodoItemViewSetTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password")
        self.client.login(username="testuser", password="password")
        self.token = Token.objects.create(user=self.user)
        self.todo_list = TodoList.objects.create(name="Test List", user=self.user)
        self.todo_item = TodoItem.objects.create(
            title="Test Item",
            description="Test Description",
            completed=False,
            todo_list=self.todo_list,
        )
        self.list_url = reverse("todoitem-list")
        self.detail_url = reverse("todoitem-detail", kwargs={"pk": self.todo_item.pk})

    def test_get_todoitems(self):
        headers = {"Content-Type": "application/json", "Authorization": self.token}
        response = self.client.get(self.list_url, format="json", headers=headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_todoitem(self):
        data = {
            "title": "New Item",
            "description": "New Description",
            "completed": False,
            "todo_list": self.todo_list.pk,
        }
        headers = {"Content-Type": "application/json", "Authorization": self.token}
        response = self.client.post(self.list_url, data, format="json", headers=headers)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
