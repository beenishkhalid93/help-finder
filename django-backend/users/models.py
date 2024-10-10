from django.db import models

class User(models.Model):
    firstname = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100,null=True)

    def __str__(self):
        return self.firstname
