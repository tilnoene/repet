from django.contrib import admin
from .models import Users, Pets, Records, Vaccine, Reminders

# Register your models here.

class UsersAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'username', 'created_at')

class PetsAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_id', 'name', 'gender', 'birthdate', 'breed', 'weight', 'created_at')

class RecordsAdmin(admin.ModelAdmin):
    list_display = ('id', 'pet_id', 'title', 'description', 'date', 'time', 'created_at')

class VaccineAdmin(admin.ModelAdmin):
    list_display = ('id', 'record_id', 'pet_id', 'name_vaccine', 'veterinarian', 'place', 'vaccine_card')

class RemindersAdmin(admin.ModelAdmin):
    list_display = ('id', 'pet_id', 'title', 'description', 'date', 'time', 'created_at')

admin.site.register(Users, UsersAdmin)
admin.site.register(Pets, PetsAdmin)
admin.site.register(Records, RecordsAdmin)
admin.site.register(Vaccine, VaccineAdmin)
admin.site.register(Reminders, RemindersAdmin)
