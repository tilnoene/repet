from rest_framework import serializers
from .models import Users, Pets, Vaccine, Records, Reminders

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'

class PetSerializerGET(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Pets
        fields = '__all__'

class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pets
        fields = '__all__'

class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Records
        fields = '__all__'

class RecordSerializerGET(serializers.ModelSerializer):
    pet = PetSerializerGET()
    class Meta:
        model = Records
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
        model = Reminders
        fields = '__all__'

class RemindersSerializerGET(serializers.ModelSerializer):
    pet = PetSerializerGET()
    class Meta:
        model = Reminders
        fields = '__all__'