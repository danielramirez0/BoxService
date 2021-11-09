from django.urls import path
from . import views

app_name = "surveys"
urlpatterns = [
    path('', views.index, name='index'),
    path('submit/', views.Submit.as_view(), name='submit')
]
