from django.db import models

class User(models.Model):
    firstname = models.CharField(max_length=100,null=True)
    surname = models.CharField(max_length=100,null=True)
    email = models.CharField(max_length=100,null=True)
    password = models.CharField(max_length=100,null=True)

    def __str__(self):
        return self.firstname
