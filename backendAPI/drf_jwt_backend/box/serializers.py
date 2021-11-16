from rest_framework import serializers
from .models import BoxTier


class BoxTierSerializer(serializers.ModelSerializer):
    class Meta:
        model = BoxTier
        fields = ['id', 'level', 'cost', 'games_per_month', 'bundled_accessories']
