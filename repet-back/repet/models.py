from django.db import models

# Create your models here.

class Users(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200, verbose_name='Nome')
    email = models.EmailField()
    username = models.CharField(max_length=100, verbose_name='Nome de Usuário')
    created_at = models.DateField(auto_now_add=True, blank=True, verbose_name='Criado em')

    def __str__(self):
        return f"{self.username}:{self.email}"


class Pets(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE, verbose_name='ID do usuário')
    name = models.CharField(max_length=200, verbose_name='Nome')

    genders = [('M', 'Macho'), ('F', 'Fêmea')]
    gender = models.CharField(max_length=1, choices=genders, verbose_name='Gênero')

    birthdate = models.DateField(verbose_name='Aniversário')
    breed = models.CharField(max_length=100, verbose_name='Raça')
    weight = models.IntegerField(verbose_name='Peso')
    created_at = models.DateField(auto_now_add=True, blank=True, verbose_name='Criado em')

    def __str__(self):
        return f"{self.name}:{self.user_id}"

class Records(models.Model):
    id = models.AutoField(primary_key=True)
    pet_id = models.ForeignKey(Pets, on_delete=models.CASCADE, verbose_name='ID do PET')
    title = models.CharField(max_length=50, verbose_name='Título')
    description = models.TextField(verbose_name='Descrição')
    date = models.DateField(verbose_name='Data')
    time = models.TimeField(verbose_name='Horário')
    created_at = models.DateField(auto_now_add=True, blank=True, verbose_name='Criado em')

    def __str__(self):
        return f"{self.pet_id}:{self.title}"

class Vaccine(models.Model):
    id = models.AutoField(primary_key=True)
    record_id = models.ForeignKey(Records, on_delete=models.CASCADE, verbose_name='ID da Record')
    pet_id = models.ForeignKey(Pets, on_delete=models.CASCADE, verbose_name='ID do PET')
    name_vaccine = models.CharField(max_length=100, verbose_name='Vacina', default=None)
    veterinarian = models.CharField(max_length=100, verbose_name='Veterinário(a)')
    place = models.CharField(max_length=100, verbose_name='Local')
    vaccine_card = models.ImageField()

    def __str__(self):
        return f"{self.id}-{self.pet_id}:{self.record_id}"

class Reminders(models.Model):
    id = models.AutoField(primary_key=True)
    pet_id = models.ForeignKey(Pets, on_delete=models.CASCADE, verbose_name='ID do PET')
    title = models.CharField(max_length=100, verbose_name='Título')
    description = models.TextField(verbose_name='Descrição')
    date = models.DateField(verbose_name='Data')
    time = models.TimeField(verbose_name='Horário')
    created_at = models.DateField(auto_now_add=True, blank=True, verbose_name='Criado em')

    def __str__(self):
        return f"{self.id}-{self.pet_id}:{self.title}"


