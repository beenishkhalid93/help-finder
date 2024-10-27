# from django.db import models

# class User(models.Model):
#     firstname = models.CharField(max_length=100,null=True)
#     surname = models.CharField(max_length=100,null=True)
#     email = models.CharField(max_length=100, unique=True, null=True)
#     password = models.CharField(max_length=100,null=True)

#     USERNAME_FIELD = 'email'

#     def __str__(self):
#         return self.email

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)  # This hashes the password
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    firstname = models.CharField(max_length=100, null=True)
    surname = models.CharField(max_length=100, null=True)
    # email = models.EmailField(unique=True, null=False)
    email = models.EmailField(unique=True, null=False, default="unknown@example.com")  # Set default email here
    password = models.CharField(max_length=100, null=False, default="Password@123")

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['firstname', 'surname']  # Fields required when creating a superuser

    def __str__(self):
        return self.email
