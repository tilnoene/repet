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
    user_id = models.ForeignKey(Users)
    name = models.CharField()
    gender = models.CharField()
    birthdate = models.DateField()
    breed = models.CharField()
    weight = models.IntegerField()
    created_at = models.DateField()

    def __str__(self):
        return f"{self.name}"

class Records(models.Model):
    id = models.IntegerField(primary_key=True)
    pet_id = models.ForeignKey(Pets)
    title = models.CharField()
    description = models.TextField()
    date = models.DateField()
    time = models.TimeField()
    created_at = models.DateField()

class Vaccine(models.Model):
    id = models.IntegerField(primary_key=True)
    record_id = models.ForeignKey(Records)
    pet_id = models.ForeignKey()

class Reminders(models.Model):
    id = models.IntegerField(primary_key=True)
    pet_id = models.ForeignKey(Pets)
    title = models.CharField()
    description = models.TextField()
    date = models.DateField()
    time = models.TimeField()
    created_at = models.DateField()


