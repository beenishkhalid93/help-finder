from django.db import models

class User(models.Model):
    title = models.CharField(max_length=200)
    name = models.CharField(max_length=100)
    date_opened = models.DateField()
    status = models.CharField(max_length=50)
    
    def __str__(self):
        return self.title


# Create your models here.
