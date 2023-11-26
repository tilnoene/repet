from django.shortcuts import render
from django.http import HttpResponse
from django.http.response import Http404
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.views import APIView
from .serializers import UserSerializer, PetSerializer
from .models import Users, Pets

# Create your views here.

class UserView(APIView):

    # create
    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response("Usuário cadastrado com sucesso.")
        else:
            return Response("Erro ao cadastrar o usuário.")
        
    def query_user(self, pk):
        try:
            # busca no banco usuario com a chave primaria
            return Users.objects.get(id=pk)
        except Users.DoesNotExist:
            raise Http404

    # read
    def get(self, pk=None):
        if pk:
            data = self.query_user(pk)
            serializer = UserSerializer(data)
        else:
            data = Users.objects.all()
            serializer = UserSerializer(data, many=True)
        return Response(serializer.data)
    
    # update
    def put(self, request, pk):
        user_update = self.query_user(pk)
        serializer = UserSerializer(instance=user_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response("Usuário atualizado com sucesso.")
        else:
            return Response("Erro ao atualizar o usuário.")
    
    # delete
    def delete(self, request, pk):
        user_delete = self.query_user(pk)
        user_delete.delete()

        return Response("Usuário deletado com sucesso.")

class PetView(APIView):

    def post(self, resquest):
        serializer = PetSerializer(data=resquest.data)

        if serializer.is_valid():
            serializer.save()
            return Response("Pet cadastrado com sucesso.")
        else:
            return Response("Erro ao cadatrar Pet.")
    
    def query_pet(self, pk):
        try:
            return Pets.objects.get(id=pk)
        except Pets.DoesNotExist:
            raise Http404

    def get(self, resquest, pk=None):
        if pk:
            data = self.query_pet(pk)
            serializer = PetSerializer(data)
        else:
            data = Pets.objects.all()
            serializer = PetSerializer(data, many=True)
        return Response(serializer.data)
    
    def put(self, resquest, pk):
        pet_update = self.query_pet(pk)
        serializer = PetSerializer(instance=pet_update, data=resquest.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response("Pet atualizado com sucesso.")
        else:
            return Response("Erro ao atualizar o Pet.")
            
    def delete(self, resquest, pk):
        pet_delete = self.query_pet(pk)
        pet_delete.delete()

        return Response("Pet deletado com sucesso.")
        
class MyPetView(APIView):
    
    def get(self, request, pk):
        pets = Pets.objects.filter(user_id=pk)
        serializer = PetSerializer(pets, many=True)

        return Response(serializer.data)

def index(request):
    return HttpResponse("Teste.")