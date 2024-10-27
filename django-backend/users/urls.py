from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import findOne, findAll, create

urlpatterns = [
    path('<int:id>/', findOne, name='retrive_user_by_ID'),
    path('', findAll, name='list_all_users'),
    path('', create, name='create_user'),
    # path('update/', list_users, name='list_users'),
    # path('remove/', list_users, name='list_users'),
]
