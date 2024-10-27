from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import findOne, findAll, create, remove, update

urlpatterns = [
    path('<int:id>/', findOne, name='retrive_user_by_ID'),
    path('', findAll, name='list_all_users'),
    path('create/', create, name='create_user'),
    path('update/<int:id>/', update, name='update_user'),
    path('delete/<int:id>/', remove, name='delete_user'),
]
