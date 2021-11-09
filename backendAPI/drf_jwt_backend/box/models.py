from django.db import models

# Create your models here.
class BoxTier(models.Model):
    level = models.CharField(max_length=50)
    cost = models.IntegerField()
    games_per_month = models.IntegerField()
    bundled_accessories = models.BooleanField()
