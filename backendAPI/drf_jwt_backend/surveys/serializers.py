
from django.db.models import fields
from rest_framework import serializers
from .models import PlatformPreferences, PublisherPreferences, GenrePreferences


class PlatformPreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlatformPreferences
        fields = ['id', 'user_id', 'platform_id']


class PublisherPreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PublisherPreferences
        fields = ['id', 'user_id', 'publisher_id']


class GenrePreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = GenrePreferences
        fields = ['id', 'user_id', 'genre_id']
