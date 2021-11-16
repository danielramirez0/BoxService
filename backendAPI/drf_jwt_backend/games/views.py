from django.http import HttpResponse, HttpResponseRedirect
from django.http.response import Http404
from django.shortcuts import render
from django.urls import reverse
from django.core.exceptions import ObjectDoesNotExist
from datetime import date
from django.conf import settings
from rest_framework import status
from .serializers import PlatformSerializer, PublisherSerializer, GenreSerializer, GameSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Platform, Game, Publisher, Genre


def index(request):
    game = Game.objects.all()


class Detail(APIView):

    def get_unique_item(request, type, id):
        try:
            if type == 'platform':
                return Platform.objects.get(pk=id)
            elif type == 'publisher':
                return Publisher.objects.get(pk=id)
            elif type == 'genre':
                return Genre.objects.get(pk=id)
            elif type == 'game':
                return Game.objects.get(pk=id)
        except ObjectDoesNotExist:
            raise Http404

    def get(self, request, id):
        type = request.query_params.get('type')
        if type == 'platform':
            platform = self.get_unique_item('platform', id)
            serializer = PlatformSerializer(platform)
        elif type == 'publisher':
            publisher = self.get_unique_item('publisher', id)
            serializer = PublisherSerializer(publisher)
        elif type == 'genre':
            genre = self.get_unique_item('genre', id)
            serializer = GenreSerializer(genre)
        elif type == 'game':
            game = self.get_unique_item('game', id)
            serializer = GameSerializer(game)
        return Response(serializer.data, status=status.HTTP_200_OK)


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
