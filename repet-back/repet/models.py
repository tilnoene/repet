from django.db import models
from django.contrib.auth.models import User as USER

# Create your models here.

class User(models.Model):
    id = models.AutoField(primary_key=True)
    user_login = models.OneToOneField(USER, on_delete=models.CASCADE, blank=True, null=True)
    username = models.CharField(max_length=100, verbose_name='Nome de Usuário')
    email = models.EmailField()
    description = models.TextField(verbose_name='Biografia', blank=True, null=True)
    genders = [('Masculino', 'Masculino'), ('Feminino', 'Feminino'), ('Outro', 'Outro')]
    gender = models.CharField(max_length=9, choices=genders, verbose_name='Gênero', blank=True, null=True)
    birthdate = models.DateField(verbose_name='Aniversário', blank=True, null=True)
    name = models.CharField(max_length=200, verbose_name='Nome')
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    created_at = models.DateField(auto_now_add=True, blank=True, verbose_name='Criado em')

    def __str__(self):
        return f"{self.id}:{self.username}"


class Pet(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='ID do usuário')
    name = models.CharField(max_length=200, verbose_name='Nome')

    # image = models.BinaryField(verbose_name='Imagem do PET', blank=True, null=True)
    image = models.ImageField(upload_to='images/', blank=True, null=True)

    genders = [('Macho', 'Macho'), ('Fêmea', 'Fêmea')]
    gender = models.CharField(max_length=5, choices=genders, verbose_name='Gênero', blank=True, null=True)

    typers = [('Cachorro','Cachorro'),
              ('Gato', 'Gato'),
              ('Roedor', 'Roedor'),
              ('Ave', 'Ave'),
              ('Reptil', 'Réptil'),
              ('Peixe', 'Peixe'),
              ('Outros', 'Outros')]
    type = models.CharField(max_length=8, choices=typers, verbose_name='Tipo', default="")
    birthdate = models.DateField(verbose_name='Aniversário', blank=True, null=True)
    breed = models.CharField(max_length=100, verbose_name='Raça', blank=True, null=True)
    weight = models.IntegerField(verbose_name='Peso', blank=True, null=True)
    created_at = models.DateField(auto_now_add=True, blank=True, verbose_name='Criado em')

    def __str__(self):
        return f"{self.user}:{self.name}"

class Record(models.Model):
    id = models.AutoField(primary_key=True)
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, verbose_name='ID do PET')
    title = models.CharField(max_length=50, verbose_name='Título')
    description = models.TextField(verbose_name='Descrição', blank=True, null=True)
    date = models.DateField(verbose_name='Data', blank=True, null=True)
    time = models.TimeField(verbose_name='Horário', blank=True)
    created_at = models.DateField(auto_now_add=True, blank=True, verbose_name='Criado em')

    def __str__(self):
        return f"{self.pet_id}:{self.title}"

class Vaccine(models.Model):
    id = models.AutoField(primary_key=True)
    record = models.ForeignKey(Record, on_delete=models.CASCADE, verbose_name='ID da Record')
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, verbose_name='ID do PET')
    veterinarian = models.CharField(max_length=100, verbose_name='Veterinário(a)', blank=True, null=True)
    place = models.CharField(max_length=100, verbose_name='Local', blank=True, null=True)
    vaccine_card = models.ImageField(upload_to='images/', blank=True, null=True)

    def __str__(self):
        return f"{self.id}-{self.pet_id}:{self.record_id}"

class Reminder(models.Model):
    id = models.AutoField(primary_key=True)
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, verbose_name='ID do PET')
    title = models.CharField(max_length=100, verbose_name='Título')
    description = models.TextField(verbose_name='Descrição', blank=True, null=True)
    color = models.TextField(verbose_name='Cor', blank=True, null=True)
    date = models.DateField(verbose_name='Data')
    time = models.TimeField(verbose_name='Horário', blank=True, null=True)
    created_at = models.DateField(auto_now_add=True, blank=True, verbose_name='Criado em')
    done = models.BooleanField(verbose_name='Concluído', default=False, blank=True)

    def __str__(self):
        return f"{self.id}-{self.pet_id}:{self.title}"


