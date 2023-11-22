from django.contrib import admin
from .models import Users, Pets

# Register your models here.

class UsersAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'username', 'created_at')

class PetsAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_id', 'name', 'gender', 'birthdate', 'breed', 'weight', 'created_at')

admin.site.register(Users, UsersAdmin)
admin.site.register(Pets, PetsAdmin)
