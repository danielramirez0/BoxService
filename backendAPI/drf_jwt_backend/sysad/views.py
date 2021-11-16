from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.http.response import Http404
from rest_framework.views import APIView
from authentication.serializers import UserSerializer
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.apps import apps
User = get_user_model()


class Users(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class Subscriptions(APIView):
    def get(self, request):
        # BoxTier = apps.get_model('box.BoxTier')
        bronze_subscriptions = User.objects.filter(subscription=1)
        silver_subscriptions = User.objects.filter(subscription=2)
        gold_subscriptions = User.objects.filter(subscription=3)
        bronze_serializer = UserSerializer(bronze_subscriptions, many=True)
        silver_serializer = UserSerializer(silver_subscriptions, many=True)
        gold_serializer = UserSerializer(gold_subscriptions, many=True)
        serializer = {"bronze": bronze_serializer.data,
                      "silver": silver_serializer.data, "gold": gold_serializer.data}
        return Response(serializer, status=status.HTTP_200_OK)
