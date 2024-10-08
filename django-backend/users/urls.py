from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet
from . import views

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('', views.index, name='index'),  # Add your views here
]

urlpatterns = router.urls