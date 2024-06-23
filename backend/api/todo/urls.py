from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TodoListViewSet, TodoItemViewSet

router = DefaultRouter()
router.register(r"lists", TodoListViewSet, basename="todolist")
router.register(r"items", TodoItemViewSet, basename="todoitem")

urlpatterns = [
    path("", include(router.urls)),
]
