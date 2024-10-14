from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import UserViewSet, login_user  # Import login_user here

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('', views.index, name='index'),  # Add your views here
    path('login/', login_user, name='login_user'),  # Use login_user properly
]

# urlpatterns = router.urls
urlpatterns += router.urls