from django.shortcuts import render
from django.http import HttpResponse
from django.http.response import Http404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import UserSerializer, PetSerializer, PetSerializerGET, VaccineSerializer, VaccineSerializerGET, RecordSerializer, RecordSerializerGET, RemindersSerializer, RemindersSerializerGET, RegisterSerializer
from .models import User, Pet, Vaccine, Record, Reminder
from django.contrib.auth.models import User as USER
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated

# Create your views here.

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': User.objects.get(user_login=user.pk).pk,
            'email': user.email
        })

def get_my_id(user_pk):
    return User.objects.get(user_login=user_pk)

def can_acess(user_pk, pk):
    return get_my_id(user_pk).pk == pk

class RegisterView(APIView):
    permission_classes = []
    # create
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response("Usuário cadastrado com sucesso.", status=status.HTTP_201_CREATED)
        else:
            # print(serializer.error_messages)
            return Response("Erro ao cadastrar o usuário.", status=status.HTTP_400_BAD_REQUEST)

class UserView(APIView):
    permission_classes = [IsAuthenticated]

    # create
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response("Usuário cadastrado com sucesso.", status=status.HTTP_201_CREATED)
        else:
            return Response("Erro ao cadastrar o usuário.", status=status.HTTP_400_BAD_REQUEST)
        
    def query_user(self, pk):
        try:
            # busca no banco usuario com a chave primaria
            return User.objects.get(id=pk)
        except User.DoesNotExist:
            raise Http404

    # read
    def get(self, request, pk=None):
        if pk:
            if not can_acess(request.user.id, pk):
                return Response("Não autorizado", status=status.HTTP_401_UNAUTHORIZED)
            data = self.query_user(pk)
            serializer = UserSerializer(data)
        else:
            data = User.objects.all()
            serializer = UserSerializer(data, many=True)
        return Response(serializer.data)
    
    # update
    def put(self, request, pk):
        if not can_acess(request.user.id, pk):
            return Response("Não autorizado", status=status.HTTP_401_UNAUTHORIZED)
        user_update = self.query_user(pk)
        serializer = UserSerializer(instance=user_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response("Usuário atualizado com sucesso.", status=status.HTTP_204_NO_CONTENT)
        else:
            return Response("Erro ao atualizar o usuário.", status=status.HTTP_400_BAD_REQUEST)
    
    # delete
    def delete(self, request, pk):
        if not can_acess(request.user.id, pk):
            return Response("Não autorizado", status=status.HTTP_401_UNAUTHORIZED)
        user_delete = self.query_user(pk)
        user_delete.delete()

        return Response("Usuário deletado com sucesso.")

class PetView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = PetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response("Pet cadastrado com sucesso.", status=status.HTTP_201_CREATED)
        else:
            return Response("Erro ao cadastrar Pet.", status=status.HTTP_400_BAD_REQUEST)
    
    def query_pet(self, pk):
        try:
            return Pet.objects.get(id=pk)
        except Pet.DoesNotExist:
            raise Http404

    def get(self, request, pk=None):
        id = get_my_id(request.user.id)
        if pk:
            data = self.query_pet(pk)
            if not can_acess(request.user.id, data.user.pk):
                return Response("Não autorizado", status=status.HTTP_401_UNAUTHORIZED)
            # data = data.filter(user=id)
            serializer = PetSerializerGET(data)
        else:
            data = Pet.objects.all()
            data = data.filter(user=id)
            serializer = PetSerializerGET(data, many=True)

        response = Response(serializer.data)

        return response
    
    def put(self, request, pk):
        pet_update = self.query_pet(pk)
        if not can_acess(request.user.id, pet_update.user.pk):
            return Response("Não autorizado", status=status.HTTP_401_UNAUTHORIZED)
        serializer = PetSerializer(instance=pet_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response("Pet atualizado com sucesso.", status=status.HTTP_204_NO_CONTENT)
        else:
            return Response("Erro ao atualizar o Pet.", status=status.HTTP_400_BAD_REQUEST)
            
    def delete(self, request, pk):
        pet_delete = self.query_pet(pk)
        if not can_acess(request.user.id, pet_delete.user.pk):
            return Response("Não autorizado", status=status.HTTP_401_UNAUTHORIZED)
        pet_delete.delete()

        return Response("Pet deletado com sucesso.")  

class RecordView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = RecordSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response("Registro cadastrada com sucesso.", status=status.HTTP_201_CREATED)
        else:
            return Response("Erro ao cadatrar o Registro.", status=status.HTTP_400_BAD_REQUEST)
    
    def query_record(self, pk):
        try:
            return Record.objects.get(id=pk)
        except Record.DoesNotExist:
            raise Http404

    def get(self, request, pk=None):
        # list just the records, without vaccines
        # get id records of all vaccines
        list_ids = [x.record.id for x in Vaccine.objects.all()]
        list_pets = [x.id for x in Pet.objects.filter(user=id)]

        if pk:
            data = self.query_record(pk)
            if not can_acess(request.user.id, data.pet.user.pk):
                return Response("Não autorizado", status=status.HTTP_401_UNAUTHORIZED)
            # data = data.filter(user=id)
            serializer = RecordSerializerGET(data)
        else:
            data = Record.objects.all()
            data = data.filter(pet__in=list_pets)
            if request.GET.get("pet_id"):
                data = data.filter(pet=request.GET.get("pet_id"))
            data = data.exclude(id__in=list_ids)
            serializer = RecordSerializerGET(data, many=True)
        return Response(serializer.data)
    
    def put(self, request, pk):
        record_update = self.query_record(pk)
        if not can_acess(request.user.id, record_update.pet.user.pk):
            return Response("Não autorizado", status=status.HTTP_401_UNAUTHORIZED)
        serializer = RecordSerializer(instance=record_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response("Registro atualizado com sucesso.", status=status.HTTP_204_NO_CONTENT)
        else:
            return Response("Erro ao atualizar o Registro.", status=status.HTTP_400_BAD_REQUEST)
            
    def delete(self, request, pk):
        record_delete = self.query_record(pk)
        if not can_acess(request.user.id, record_delete.pet.user.pk):
            return Response("Não autorizado", status=status.HTTP_401_UNAUTHORIZED)
        record_delete.delete()

        return Response("Registro deletado com sucesso.")

class VaccineView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        records_serializes = RecordSerializer(data=request.data)

        if records_serializes.is_valid():
            rec = records_serializes.save()
            request.data["record"] = rec.id
            serializer = VaccineSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response("Vacina cadastrada com sucesso.", status=status.HTTP_201_CREATED)
            else:
                rec.delete()
                return Response("Erro ao cadastrar vacina.", status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response("Erro ao cadastrar vacina.", status=status.HTTP_400_BAD_REQUEST)

    def query_records(self, pk):
        try:
            return Record.objects.get(id=pk)
        except Record.DoesNotExist:
            return Http404
        
    def query_vaccine(self, pk):
        try:
            return Vaccine.objects.get(id=pk)
        except Vaccine.DoesNotExist:
            return Http404

    def get(self, request, pk=None):
        id = get_my_id(request.user.id)
        list_pets = [x.id for x in Pet.objects.filter(user=id)]
        if pk:
            data = self.query_vaccine(pk)
            if not can_acess(request.user.id, data.pet.user.pk):
                return Response("Não autorizado", status=status.HTTP_401_UNAUTHORIZED)
            # data = data.filter(pet__in=list_pets)
            serializer = VaccineSerializerGET(data)
        else:
            data = Vaccine.objects.all()
            data = data.filter(pet__in=list_pets)
            if request.GET.get("pet_id"):
                data = data.filter(pet=request.GET.get("pet_id"))
            serializer = VaccineSerializerGET(data, many=True)
        return Response(serializer.data)

    def put(self, request, pk):

        vacc_query = self.query_vaccine(pk)
        if not can_acess(request.user.id, vacc_query.pet.user.pk):
            return Response("Não autorizado", status=status.HTTP_401_UNAUTHORIZED)
        record_update = self.query_records(vacc_query.record.id)
        serializer = RecordSerializer(instance=record_update, data=request.data, partial=True)

        if serializer.is_valid():
            rec = serializer.save()
            inst_vac = self.query_vaccine(pk)
            request.data["record"] = rec.id
            vaccine_serializer = VaccineSerializer(instance=inst_vac, data=request.data, partial=True)
            if vaccine_serializer.is_valid():
                vaccine_serializer.save()
                return Response("Vacina atualizada com sucesso.", status=status.HTTP_204_NO_CONTENT)
            else:
                return Response("Erro ao atualizar a vacina.")
        else:
            return Response("Erro ao atualizar a vacina.")
            
    def delete(self, request, pk=None):
        if pk:
            vaccine_delete = self.query_vaccine(pk)
            if not can_acess(request.user.id, vaccine_delete.pet.user.pk):
                return Response("Não autorizado", status=status.HTTP_401_UNAUTHORIZED)
            vaccine_delete.delete()
            return Response("Vacina deletada com sucesso.")
        else: 
            return Response("Erro ao deletar vacinas.", status=status.HTTP_400_BAD_REQUEST)

class RemindersView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = RemindersSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response("Lembrete cadastrado com sucesso.", status=status.HTTP_201_CREATED)
        else:
            return Response("Erro ao cadastrar lemebrete.", status=status.HTTP_400_BAD_REQUEST)

    def query_reminders(self, pk):
        try:
            return Reminder.objects.get(id=pk)
        except Reminder.DoesNotExist:
            return Http404

    def get(self, request, pk=None):
        id = get_my_id(request.user.id)

        list_pets = [x.id for x in Pet.objects.filter(user=id)]
        if pk:
            data = self.query_reminders(pk)
            if not can_acess(request.user.id, data.pet.user.pk):
                return Response("Não autorizado", status=status.HTTP_401_UNAUTHORIZED)
            # data = data.filter(pet__in=list_pets)
            serializer = RemindersSerializerGET(data)
        else:
            data = Reminder.objects.all()
            data = data.filter(pet__in=list_pets)
            if request.GET.get("pet_id"):
                data = data.filter(pet=request.GET.get("pet_id"))
            serializer = RemindersSerializerGET(data, many=True)
        return Response(serializer.data)

    def put(self, request, pk):
        reminders_update = self.query_reminders(pk)
        if not can_acess(request.user.id, reminders_update.pet.user.pk):
            return Response("Não autorizado", status=status.HTTP_401_UNAUTHORIZED)
        serializer = RemindersSerializer(instance=reminders_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response("Lembrete atualizado com sucesso.", status=status.HTTP_204_NO_CONTENT)
        else:
            return Response("Erro ao atualizar o lembrete.", status=status.HTTP_400_BAD_REQUEST)
            
    def delete(self, request, pk):
        reminders_delete = self.query_reminders(pk)
        if not can_acess(request.user.id, reminders_delete.pet.user.pk):
            return Response("Não autorizado", status=status.HTTP_401_UNAUTHORIZED)
        reminders_delete.delete()

        return Response("Lembrete deletado com sucesso.")

def index(request):
    return HttpResponse("Teste.")
