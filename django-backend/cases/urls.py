from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CaseViewSet
from . import views

router = DefaultRouter()
router.register(r'cases', CaseViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # path('', views.index, name='index'),  # Add your views here
]

urlpatterns = router.urls
