from rest_framework import serializers
from .models import User, Pet, Vaccine, Record, Reminder

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