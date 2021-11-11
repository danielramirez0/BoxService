from django.db import models

# Create your models here.


class UserPlatform(models.Model):
    user = models.ForeignKey('authentication.User', on_delete=models.CASCADE)
    platform = models.ForeignKey('games.Platform', on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        unique_together = ['user', 'platform']
        db_table = 'user_platform'


class UserPublisher(models.Model):
    user = models.ForeignKey('authentication.User', on_delete=models.CASCADE)
    publisher = models.ForeignKey('games.Publisher', on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        unique_together = ['user', 'publisher']
        db_table = 'user_publisher'

class UserGenre(models.Model):
    user = models.ForeignKey('authentication.User', on_delete=models.CASCADE)
    genre = models.ForeignKey('games.Genre', on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        unique_together = ['user', 'genre']
        db_table = 'user_genre'