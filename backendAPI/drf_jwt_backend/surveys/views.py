from django.http import HttpResponse, HttpResponseRedirect
from django.http.response import Http404
from django.shortcuts import render
from django.urls import reverse
from datetime import date
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from django.apps import apps
from .serializers import UserPlatformSerializer, UserPublisherSerializer, UserGenreSerializer

from .models import *


class Answers(APIView):

    def get(self, request):
        data = JSONParser().parse(request)
        

    def post(self, request):
        data = JSONParser().parse(request)
        type = request.query_params.get('type')
        if type == 'platform':
            serializer = UserPlatformSerializer(data=data)
        elif type == 'publisher':
            serializer = UserPublisherSerializer(data=data)
        elif type == 'genre':
            serializer = UserGenreSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AddPlatformAnswer(APIView):
    '''Submit platform preference'''

    def post(self, request):
        data = JSONParser().parse(request)
        serializer = UserPlatformSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AddPublisherAnswer(APIView):

    def get_user(self, id):
        User = apps.get_model('authentication.User')
        try:
            return User.objects.get(pk=id)
        except User.DoesNotExist:
            raise Http404

    def get_publisher(self, id):
        Publisher = apps.get_model('games.Publisher')
        try:
            return Publisher.objects.get(pk=id)
        except Publisher.DoesNotExist:
            raise Http404
        
class AddGenreAnswer(APIView):

    def get_user(self, id):
        User = apps.get_model('authentication.User')
        try:
            return User.objects.get(pk=id)
        except User.DoesNotExist:
            raise Http404

    def get_genre(self, id):
        Genre = apps.get_model('games.Genre')
        try:
            return Genre.objects.get(pk=id)
        except Genre.DoesNotExist:
            raise Http404

