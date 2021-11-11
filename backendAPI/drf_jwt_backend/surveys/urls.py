from django.urls import path
from . import views

app_name = "surveys"
urlpatterns = [
    path('answers/', views.Answers.as_view()),
    path('answers/platform/', views.AddPlatformAnswer.as_view()),
    path('answers/publisher/', views.AddPublisherAnswer.as_view()),
    path('answers/genre/', views.AddGenreAnswer.as_view()),
]
