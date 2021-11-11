# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Game(models.Model):
    genre = models.ForeignKey(
        'Genre', models.DO_NOTHING, blank=True, null=True)
    game_name = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'game'


class GamePlatform(models.Model):
    game_publisher = models.ForeignKey(
        'GamePublisher', models.DO_NOTHING, blank=True, null=True)
    platform = models.ForeignKey(
        'Platform', models.DO_NOTHING, blank=True, null=True)
    release_year = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'game_platform'


class GamePublisher(models.Model):
    game = models.ForeignKey(Game, models.DO_NOTHING, blank=True, null=True)
    publisher = models.ForeignKey(
        'Publisher', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'game_publisher'


class Genre(models.Model):
    id = models.IntegerField(primary_key=True)
    genre_name = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'genre'


class Platform(models.Model):
    id = models.IntegerField(primary_key=True)
    platform_name = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'platform'


class Publisher(models.Model):
    id = models.IntegerField(primary_key=True)
    publisher_name = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'publisher'


class Region(models.Model):
    region_name = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'region'


class RegionSales(models.Model):
    region = models.ForeignKey(
        Region, models.DO_NOTHING, blank=True, null=True)
    game_platform = models.ForeignKey(
        GamePlatform, models.DO_NOTHING, blank=True, null=True)
    num_sales = models.DecimalField(
        max_digits=5, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'region_sales'
