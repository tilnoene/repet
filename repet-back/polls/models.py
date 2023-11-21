from django.db import models

# Create your models here.

class Users(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.TextField()
    email = models.EmailField()
    username = models.CharField(max_length=100)
    created_at = models.DateField()


class Pets(models.Model):
    id = models.IntegerField(primary_key=True)
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    gender = models.CharField(max_length=50)
    birthdate = models.DateField()
    breed = models.CharField(max_length=100)
    weight = models.IntegerField()
    created_at = models.DateField()

    def __str__(self):
        return f"{self.name}"

class Records(models.Model):
    id = models.IntegerField(primary_key=True)
    pet_id = models.ForeignKey(Pets, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.TextField()
    date = models.DateField()
    time = models.TimeField()
    created_at = models.DateField()

class Vaccine(models.Model):
    id = models.IntegerField(primary_key=True)
    record_id = models.ForeignKey(Records, on_delete=models.CASCADE)
    pet_id = models.ForeignKey(Pets, on_delete=models.CASCADE)
    veterinarian = models.CharField(max_length=50)
    place = models.CharField(max_length=100)
    vaccine_card = models.ImageField()

class Reminders(models.Model):
    id = models.IntegerField(primary_key=True)
    pet_id = models.ForeignKey(Pets, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    date = models.DateField()
    time = models.TimeField()
    created_at = models.DateField()


