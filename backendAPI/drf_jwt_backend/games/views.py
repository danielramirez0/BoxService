from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.core.exceptions import ObjectDoesNotExist
from datetime import date
from django.conf import settings
from .serializers import PlatformSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Platform, Game


def index(request):
    game = Game.objects.all()

def unique_game(request, game_id):
    game = Game.objects.get(pk=game_id)

def get_platforms(request):
    platforms = Platform.objects.all()

class PlatformsList(APIView):
    '''Collect all platforms'''

    def get(self, request):
        platform = Platform.objects.all()
        serializer = PlatformSerializer(platform, many=True)
        return Response(serializer.data)
