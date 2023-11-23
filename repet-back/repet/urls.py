from django.urls import path

from . import views
from .views import UserView, PetView

urlpatterns = [
    path("", views.index, name="index"),
    path('users/', UserView.as_view()),
    path('users/<int:pk>/', UserView.as_view()),
    # path('pets/', PetView.as_view()),
]
urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
