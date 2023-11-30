from django.db import models
from django.contrib.auth.models import User as USER

# Create your models here.

class User(models.Model):
    id = models.AutoField(primary_key=True)
    user_login = models.OneToOneField(USER, on_delete=models.CASCADE, blank=True)
    name = models.CharField(max_length=200, verbose_name='Nome')
    email = models.EmailField()
    image = models.BinaryField(verbose_name='Imagem do Usuário', blank=True, null=True)
    username = models.CharField(max_length=100, verbose_name='Nome de Usuário')
    created_at = models.DateField(auto_now_add=True, blank=True, verbose_name='Criado em')

    def __str__(self):
        return f"{self.id}:{self.username}"


class Pet(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='ID do usuário')
    name = models.CharField(max_length=200, verbose_name='Nome')

    image = models.BinaryField(verbose_name='Imagem do PET', blank=True)

    genders = [('Macho', 'Macho'), ('Fêmea', 'Fêmea')]
    gender = models.CharField(max_length=5, choices=genders, verbose_name='Gênero', blank=True)

    typers = [('Cachorro','Cachorro'),
              ('Gato', 'Gato'),
              ('Roedor', 'Roedor'),
              ('Ave', 'Ave'),
              ('Reptil', 'Réptil'),
              ('Peixe', 'Peixe'),
              ('Outros', 'Outros')]
    type = models.CharField(max_length=8, choices=typers, verbose_name='Tipo', default="")

    birthdate = models.DateField(verbose_name='Aniversário', blank=True)
    breed = models.CharField(max_length=100, verbose_name='Raça', blank=True)
    weight = models.IntegerField(verbose_name='Peso', blank=True)
    created_at = models.DateField(auto_now_add=True, blank=True, verbose_name='Criado em')

    def __str__(self):
        return f"{self.user}:{self.name}"

class Record(models.Model):
    id = models.AutoField(primary_key=True)
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, verbose_name='ID do PET')
    title = models.CharField(max_length=50, verbose_name='Título')
    description = models.TextField(verbose_name='Descrição', blank=True)
    date = models.DateField(verbose_name='Data', blank=True)
    time = models.TimeField(verbose_name='Horário', blank=True)
    created_at = models.DateField(auto_now_add=True, blank=True, verbose_name='Criado em')

    def __str__(self):
        return f"{self.pet_id}:{self.title}"

class Vaccine(models.Model):
    id = models.AutoField(primary_key=True)
    record = models.ForeignKey(Record, on_delete=models.CASCADE, verbose_name='ID da Record')
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, verbose_name='ID do PET')
    veterinarian = models.CharField(max_length=100, verbose_name='Veterinário(a)', blank=True)
    place = models.CharField(max_length=100, verbose_name='Local', blank=True)
    vaccine_card = models.BinaryField(verbose_name='Cartão de Vacina', blank=True)

    def __str__(self):
        return f"{self.id}-{self.pet_id}:{self.record_id}"

class Reminder(models.Model):
    id = models.AutoField(primary_key=True)
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, verbose_name='ID do PET')
    title = models.CharField(max_length=100, verbose_name='Título')
    description = models.TextField(verbose_name='Descrição', blank=True)
    color = models.TextField(verbose_name='Cor', blank=True)
    date = models.DateField(verbose_name='Data', blank=True)
    time = models.TimeField(verbose_name='Horário', blank=True)
    created_at = models.DateField(auto_now_add=True, blank=True, verbose_name='Criado em')
    done = models.BooleanField(verbose_name='Concluído', default=False, blank=True)

    def __str__(self):
        return f"{self.id}-{self.pet_id}:{self.title}"


