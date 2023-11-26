from rest_framework import serializers
from .models import Users, Pets, Vaccine

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('id', 'name', 'email', 'username', 'created_at')

class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pets
        fields = ('id', 'user_id', 'name', 'gender', 'birthdate', 'breed', 'weight', 'created_at')

class VaccineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vaccine
        fields = ('id', 'record_id', 'pet_id', 'name_vaccine', 'veterinarian', 'place', 'vaccine_card')