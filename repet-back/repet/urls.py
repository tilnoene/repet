from django.urls import path

from . import views
from .views import UserView, PetView

urlpatterns = [
    path("", views.index, name="index"),
    path('users/', UserView.as_view()),
    path('users/<int:pk>/', UserView.as_view()),
    # path('pets/', PetView.as_view()),
]
