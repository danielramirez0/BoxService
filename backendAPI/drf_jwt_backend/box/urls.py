from django.urls import path
from . import views

app_name = "box"
urlpatterns = [
    path('all/', views.BoxTiers.as_view(), name='all'),
]
