from django.http import HttpResponse, HttpResponseRedirect
from django.http.response import Http404
from django.shortcuts import render
from django.urls import reverse
from datetime import date
from django.conf import settings
from rest_framework.views import APIView
from django.apps import apps


from .models import *


def index(request):
    pass


class Submit(APIView):
    '''Submit survey'''

    def get_platform(self, id):
        Platform = apps.get_model('games.Platform')
        try:
            return Platform.objects.get(pk=id)
        except Platform.DoesNotExist:
            raise Http404

    def get_publisher(self, id):
        Publisher = apps.get_model('games.Publisher')
        try:
            return Publisher.objects.get(pk=id)
        except Publisher.DoesNotExist:
            raise Http404

    def get_genre(self, id):
        Genre = apps.get_model('games.Genre')
        try:
            return Genre.objects.get(pk=id)
        except Genre.DoesNotExist:
            raise Http404
