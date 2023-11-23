from django.shortcuts import render
from django.http import HttpResponse
from django.http.response import Http404
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.views import APIView
from .serializers import UserSerializer, PetSerializer
from django.http.response import JsonResponse
from .models import Users, Pets

# Create your views here.

class UserView(APIView):

    # create
    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Usuário cadastrado com sucesso.")
        else:
            return JsonResponse("Erro ao cadastrar o usuário.")
        
    def query_user(self, pk):
        try:
            # busca no banco usuario com a chave primaria
            return Users.objects.get(id=pk)
        except Users.DoesNotExist:
            raise Http404

    # read
    def get(self, request, pk=None):
        if pk:
            data = self.query_user(pk)
            serializer = UserSerializer(data)
        else:
            data = Users.objects.all()
            serializer = UserSerializer(data, many=True)
        return Response(serializer.data)
    
    # update
    def put(self, request, pk):
        user_update = Users.objects.get(id=pk)
        serializer = UserSerializer(instance=user_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Usuário atualizado com sucesso.")
        else:
            return JsonResponse("Erro ao atualizar o usuário.")
    
    # delete
    def delete(self, request, pk):
        user_delete = Users.objects.get(id=pk)
        user_delete.delete()

        return JsonResponse("Usuário deletado com sucesso.")

class PetView(viewsets.ModelViewSet):
    serializer_class = PetSerializer
    queryset = Pets.objects.all()

def index(request):
    return HttpResponse("Teste.")
