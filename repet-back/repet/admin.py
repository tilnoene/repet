from django.contrib import admin
from .models import User, Pet, Record, Vaccine, Reminder

# Register your models here.

class UsersAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'username', 'created_at')

class PetsAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'name', 'gender', 'birthdate', 'breed', 'weight', 'created_at')

class RecordsAdmin(admin.ModelAdmin):
    list_display = ('id', 'pet', 'title', 'description', 'date', 'time', 'created_at')

class VaccineAdmin(admin.ModelAdmin):
    list_display = ('id', 'record', 'pet', 'veterinarian', 'place', 'vaccine_card')

class RemindersAdmin(admin.ModelAdmin):
    list_display = ('id', 'pet', 'title', 'description', 'date', 'time', 'created_at')

admin.site.register(User, UsersAdmin)
admin.site.register(Pet, PetsAdmin)
admin.site.register(Record, RecordsAdmin)
admin.site.register(Vaccine, VaccineAdmin)
admin.site.register(Reminder, RemindersAdmin)
