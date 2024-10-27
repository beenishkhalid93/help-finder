from django.urls import path
from .views import signup_user, login_user
# from .views import protected_view

urlpatterns = [
    path('signup/', signup_user, name='signup_user'),
    path('login/', login_user, name='login_user'),
    # path('register/', RegisterView.as_view(), name='register'),
    # path('protected/', protected_view, name='protected'),
]
