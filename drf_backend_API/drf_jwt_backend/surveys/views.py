from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.core.exceptions import ObjectDoesNotExist
from datetime import date
from django.conf import settings

from .models import *

def index(request):
    pass

