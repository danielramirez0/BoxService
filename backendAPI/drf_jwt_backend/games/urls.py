from django.urls import path
from . import views

app_name = "games"
urlpatterns = [
    path('', views.index, name='index'),
    path('<int:game_id>/', views.unique_game, name='unique_game'),
    path('platforms/all/', views.PlatformsList.as_view()),
    path('publishers/all/', views.PublishersList.as_view()),
    path('genres/all/', views.GenresList.as_view())
]
