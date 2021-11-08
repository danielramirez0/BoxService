from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.core.exceptions import ObjectDoesNotExist
from datetime import date
from django.conf import settings
from .serializers import PlatformSerializer, PublisherSerializer, GenreSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Platform, Game, Publisher, Genre


def index(request):
    game = Game.objects.all()

def unique_game(request, game_id):
    game = Game.objects.get(pk=game_id)

def get_platforms(request):
    platforms = Platform.objects.all()

class PlatformsList(APIView):
    '''Collect all platforms'''

    def get(self, request):
        platform = Platform.objects.all().order_by("platform_name")
        serializer = PlatformSerializer(platform, many=True)
        return Response(serializer.data)

class PublishersList(APIView):
    '''Collect all publishers'''

    def get(self, request):
        publisher = Publisher.objects.all()
        serializer = PublisherSerializer(publisher, many=True)
        return Response(serializer.data)

class GenresList(APIView):
    '''Collect all genres'''

    def get(self, request):
        genre = Genre.objects.all()
        serializer = GenreSerializer(genre, many=True)
        return Response(serializer.data)
