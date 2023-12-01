from rest_framework import serializers
from .models import User, Pet, Vaccine, Record, Reminder
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User as USER
from rest_framework.authtoken.models import Token

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=USER.objects.all())]
            )
    username = serializers.CharField(
            validators=[UniqueValidator(queryset=USER.objects.all())]
            )
    password = serializers.CharField()

    def create(self, validated_data):
        user = USER.objects.create_user(validated_data['username'], validated_data['email'],
             validated_data['password'])
        # print(validated_data)
        User.objects.create(
            user_login = user,
            name = validated_data.get('name'),
            email = validated_data.get('email'),
            image = validated_data.get('image'),
            username = validated_data.get('username'),
        )
        # cria um token para o usuário
        Token.objects.create(user=user)

        return user

    class Meta:
        model = User
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class PetSerializerGET(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Pet
        fields = '__all__'

class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = '__all__'

class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = '__all__'

class RecordSerializerGET(serializers.ModelSerializer):
    pet = PetSerializerGET()
    class Meta:
        model = Record
        fields = '__all__'

class VaccineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vaccine
        fields = '__all__'

class VaccineSerializerGET(serializers.ModelSerializer):
    pet = PetSerializerGET()
    record = RecordSerializer()
    class Meta:
        model = Vaccine
        fields = '__all__'


class RemindersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reminder
        fields = '__all__'

class RemindersSerializerGET(serializers.ModelSerializer):
    pet = PetSerializerGET()
    class Meta:
        model = Reminder
        fields = '__all__'