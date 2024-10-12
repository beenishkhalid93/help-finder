from django.db import models

class Case(models.Model):
    title = models.CharField(max_length=200,null=True)
    name = models.CharField(max_length=100,null=True)
    dateOpened = models.DateField()
    status = models.CharField(max_length=50,null=True)

    def __str__(self):
        return self.title


# Create your models here.
