
from rest_framework import serializers
from .models import UserPlatform, UserPublisher, UserGenre


class UserPlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPlatform
        fields = ['id', 'user', 'platform']


class UserPublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPublisher
        fields = ['id', 'user', 'publisher']


class UserGenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserGenre
        fields = ['id', 'user', 'genre']
