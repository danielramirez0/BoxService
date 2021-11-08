from django.db import models

# Create your models here.


class UserPlatform(models.Model):
    user = models.ForeignKey('authentication.User', on_delete=models.CASCADE)
    platform = models.ForeignKey('games.Platform', on_delete=models.CASCADE, blank=True, null=True)
    platform_name = models.CharField(max_length=50, blank=True, null=True)




class UserPublisher(models.Model):
    user = models.ForeignKey('authentication.User', on_delete=models.CASCADE)
    publisher_name = models.CharField(max_length=50, blank=True, null=True)


class UserGenre(models.Model):
    user = models.ForeignKey('authentication.User', on_delete=models.CASCADE)
    genre_name = models.CharField(max_length=50, blank=True, null=True)
