from django.urls import path
from . import views

app_name = "sysad"
urlpatterns = [
    path('', views.Users.as_view(), name="users"),
    path('subscriptions/', views.Subscriptions.as_view(), name="subscriptions")
]
