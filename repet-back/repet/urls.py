from django.urls import path

from . import views
from .views import UserView, PetView, MyPetView

urlpatterns = [
    path("", views.index, name="index"),
    path('users/', UserView.as_view()),
    path('users/<int:pk>/', UserView.as_view()),
    path('pets/', PetView.as_view()),
    path('pets/<int:pk>/', PetView.as_view()),
    path('mypets/<int:pk>', MyPetView.as_view()),
]