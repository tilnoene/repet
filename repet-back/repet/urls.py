from django.urls import path

from . import views
from .views import UserView, PetView, VaccineView, RecordView, RemindersView, RegisterView, CustomAuthToken

urlpatterns = [
    path("", views.index, name="index"),

    path('register/', RegisterView.as_view()),
    path('login/', CustomAuthToken.as_view()),

    path('users/', UserView.as_view()),
    path('users/<int:pk>/', UserView.as_view()),

    path('pets/', PetView.as_view()),
    path('pets/<int:pk>/', PetView.as_view()),

    path('vaccines/', VaccineView.as_view()),
    path('vaccines/<int:pk>/', VaccineView.as_view()),

    path('records/', RecordView.as_view()),
    path('records/<int:pk>/', RecordView.as_view()),

    path('reminders/', RemindersView.as_view()),
    path('reminders/<int:pk>/', RemindersView.as_view()),

    path('myreminders/<int:pk>/1/', RemindersView.as_view()),
    path('myreminders/<int:pk>/0/', RemindersView.as_view()),
]
