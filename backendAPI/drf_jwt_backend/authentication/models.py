from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.base import Model

# Create your models here.

# To add new columns to the authentication_user table include the properties
# in the model below
# In order for the new columns to appear in the database run:
# 1. python manage.py makemigrations
# 2. python manage.py migrate


class User(AbstractUser):
    middle_name = models.CharField(max_length=20)
    subscription = models.ForeignKey('box.BoxTier', blank=True, null=True, on_delete=models.CASCADE)
    balance = models.IntegerField(default=0)
