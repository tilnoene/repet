from django.test import TestCase

from repet.models import User, Pet, Vaccine, Record, Reminder
import datetime
from repet.serializers import UserSerializer

class UserViewTest(TestCase):

    def setUp(self):
        User.objects.create(
            name='user',
            email='user@gmail.com',
            username='user'
        )
    
    # get all
    def test_url_exists(self):
        response = self.client.get('/users/')
        self.assertEqual(response.status_code, 200)

    # get existing user
    def test_url_user_exists(self):
        user_id = User.objects.all()[0].id
        response = self.client.get(f'/users/{user_id}/')
        self.assertEqual(response.status_code, 200)

    # get non-existing user
    def test_url_user_not_exists(self):
        response = self.client.get('/users/-1/')
        self.assertEqual(response.status_code, 404)

    # post correct user
    def test_create_user(self):
        request = {'name': 'new_user', 'email': 'newuser@gmail.com', 'username': 'new_user'}
        response = self.client.post('/users/', request)
        self.assertEqual(response.status_code, 201)
    
    # post incorrect user
    def test_create_no_user(self):
        request = {'name': 'new_user'}
        response = self.client.post('/users/', request)
        self.assertEqual(response.status_code, 400)
    
    # update existing user
    def test_update_user(self):
        user_id = User.objects.all()[0].id
        request = {"name": "update_user"}
        response = self.client.put(f'/users/{user_id}/', request, content_type='application/json')
        self.assertEqual(response.status_code, 204)
    
    # update non-existing user
    def test_update_no_user(self):
        request = {"name": "update_user"}
        response = self.client.put('/users/-1/', request, content_type='application/json')
        self.assertEqual(response.status_code, 404)
    
    # update without pk
    def test_update_wrong_url(self):
        request = {"name": "update_user"}
        response = self.client.put('/users/', request, content_type='application/json')
        self.assertEqual(response.status_code, 400)

    # delete existing user
    def test_delete_user(self):
        user_id = User.objects.all()[0].id
        response = self.client.delete(f'/users/{user_id}/')
        self.assertEqual(response.status_code, 200)

    # delete non-existing user
    def test_delete_no_user(self):
        response = self.client.delete('/users/-1/')
        self.assertEqual(response.status_code, 404)

class PetViewTest(TestCase):

    def setUp(self):
        user = User.objects.create(
            name='user',
            email='user@gmail.com',
            username='user'
        )

        Pet.objects.create(
            user=user,
            name='pet',
            gender='Macho',
            type='Cachorro',
            birthdate='2022-11-27',
            breed='pet_breed',
            weight='1000'
        )


    # get all
    def test_url_exists(self):
        response = self.client.get('/pets/')
        self.assertEqual(response.status_code, 200)

    # get existing pet
    def test_url_pet_exists(self):
        pet_id = Pet.objects.all()[0].id
        response = self.client.get(f'/pets/{pet_id}/')
        self.assertEqual(response.status_code, 200)

    # get non-existing pet
    def test_url_pet_not_exists(self):
        response = self.client.get('/pets/-1/')
        self.assertEqual(response.status_code, 404)

    # post correct pet
    def test_create_pet(self):
        user_id = User.objects.all()[0].id

        request = {'user': user_id, 'name': 'new_pet', 'gender': 'Fêmea', 'type': 'Gato', 'birthdate': '2023-02-16', 'breed': 'new_pet_breed', 'weight': 1000}
        response = self.client.post('/pets/', request)
        self.assertEqual(response.status_code, 201)
    
    # post incorrect pet
    def test_create_no_pet(self):
        request = {'name': 'new_pet'}
        response = self.client.post('/pets/', request)
        self.assertEqual(response.status_code, 400)
    
    # update existing pet
    def test_update_pet(self):
        pet_id = Pet.objects.all()[0].id
        request = {'name': 'update_pet'}
        response = self.client.put(f'/pets/{pet_id}/', request, content_type='application/json')
        self.assertEqual(response.status_code, 204)
    
    # update non-existing pet
    def test_update_no_pet(self):
        request = {'name': 'update_pet'}
        response = self.client.put('/pets/-1/', request, content_type='application/json')
        self.assertEqual(response.status_code, 404)
    
    # update without pk
    def test_update_wrong_url(self):
        request = {'name': 'update_pet'}
        response = self.client.put('/pets/', request, content_type='application/json')
        self.assertEqual(response.status_code, 400)

    # delete existing pet
    def test_delete_pet(self):
        pet_id = Pet.objects.all()[0].id
        response = self.client.delete(f'/pets/{pet_id}/')
        self.assertEqual(response.status_code, 200)

    # delete non-existing pet
    def test_delete_no_pet(self):
        response = self.client.delete('/pets/-1/')
        self.assertEqual(response.status_code, 404)

class RecordViewTest(TestCase):

    def setUp(self):
        user = User.objects.create(
            name='user',
            email='user@gmail.com',
            username='user'
        )

        pet = Pet.objects.create(
            user=user,
            name='pet',
            gender='Macho',
            type='Cachorro',
            birthdate='2022-11-27',
            breed='pet_breed',
            weight='1000'
        )

        Record.objects.create(
            pet=pet,
            title='record',
            description='description',
            date='2023-12-25',
            time='00:00:00'
        )
    
    
    # get all
    def test_url_exists(self):
        response = self.client.get('/records/')
        self.assertEqual(response.status_code, 200)

    # get existing record
    def test_url_record_exists(self):
        record_id = Record.objects.all()[0].id
        response = self.client.get(f'/records/{record_id}/')
        self.assertEqual(response.status_code, 200)

    # get record by pet
    def test_url_get_by_pet(self):
        pet_id = Pet.objects.all()[0].id
        response = self.client.get(f'/records/?pet_id={pet_id}')
        self.assertEqual(response.data[0]['pet']['id'], pet_id)

    # get non-existing record
    def test_url_record_not_exists(self):
        response = self.client.get('/records/-1/')
        self.assertEqual(response.status_code, 404)

    # post correct record
    def test_create_record(self):
        pet_id = Pet.objects.all()[0].id
        request = {'pet': pet_id, 'title': 'new_record', 'description': 'new_description', 'date': '2022-12-25', 'time': '00:00:00'}
        response = self.client.post('/records/', request)
        self.assertEqual(response.status_code, 201)
    
    # post incorrect record
    def test_create_no_record(self):
        request = {'title': 'new_record'}
        response = self.client.post('/records/', request)
        self.assertEqual(response.status_code, 400)
    
    # update existing record
    def test_update_record(self):
        record_id = Record.objects.all()[0].id
        request = {'title': 'update_record'}
        response = self.client.put(f'/records/{record_id}/', request, content_type='application/json')
        self.assertEqual(response.status_code, 204)
    
    # update non-existing record
    def test_update_no_record(self):
        request = {'title': 'update_record'}
        response = self.client.put('/records/-1/', request, content_type='application/json')
        self.assertEqual(response.status_code, 404)
    
    # update without pk
    def test_update_wrong_url(self):
        request = {'title': 'update_record'}
        response = self.client.put('/records/', request, content_type='application/json')
        self.assertEqual(response.status_code, 400)

    # delete existing record
    def test_delete_record(self):
        record_id = Record.objects.all()[0].id
        response = self.client.delete(f'/records/{record_id}/')
        self.assertEqual(response.status_code, 200)

    # delete non-existing record
    def test_delete_no_record(self):
        response = self.client.delete('/records/-1/')
        self.assertEqual(response.status_code, 404)

class VaccineViewTest(TestCase):

    def setUp(self):
        user = User.objects.create(
            name='user',
            email='user@gmail.com',
            username='user'
        )

        pet = Pet.objects.create(
            user=user,
            name='pet',
            gender='Macho',
            type='Cachorro',
            birthdate='2022-11-27',
            breed='pet_breed',
            weight='1000'
        )

        record = Record.objects.create(
            pet=pet,
            title='record',
            description='description',
            date='2023-12-25',
            time='00:00:00'
        )

        Vaccine.objects.create(
            record=record,
            pet=pet,
            veterinarian='veterinarian',
            place='place'
        )
    
    
    # get all
    def test_url_exists(self):
        response = self.client.get('/vaccines/')
        self.assertEqual(response.status_code, 200)

    # get existing vaccine
    def test_url_vaccine_exists(self):
        vaccine_id = Vaccine.objects.all()[0].id
        response = self.client.get(f'/vaccines/{vaccine_id}/')
        self.assertEqual(response.status_code, 200)

    # get vaccine by pet
    def test_url_get_by_pet(self):
        pet_id = Pet.objects.all()[0].id
        response = self.client.get(f'/vaccines/?pet_id={pet_id}')
        self.assertEqual(response.data[0]['pet']['id'], pet_id)

    # get non-existing vaccine
    def test_url_vaccine_not_exists(self):
        response = self.client.get('/vaccines/-1/')
        self.assertEqual(response.status_code, 404)

    # post correct vaccine
    def test_create_vaccine(self):
        pet_id = Pet.objects.all()[0].id
        record_id = Record.objects.all()[0].id
        request = {'record': record_id, 'title':'record_title', 'pet': pet_id, 'veterinarian': 'new_veterinarian', 'place': 'new_place', 'date': '2023-12-25'}
        response = self.client.post('/vaccines/', request)
        print(response.data)
        self.assertEqual(response.status_code, 201)
    
    # post incorrect vaccine
    def test_create_no_vaccine(self):
        request = {'veterinarian': 'new_veterinarian'}
        response = self.client.post('/vaccines/', request)
        self.assertEqual(response.status_code, 400)
    
    # update existing vaccine
    def test_update_vaccine(self):
        vaccine_id = Vaccine.objects.all()[0].id
        request = {'veterinarian': 'update_veterinarian'}
        response = self.client.put(f'/vaccines/{vaccine_id}/', request, content_type='application/json')
        self.assertEqual(response.status_code, 204)
    
    # update non-existing vaccine
    def test_update_no_vaccine(self):
        request = {'veterinarian': 'update_veterinarian'}
        response = self.client.put('/vaccines/-1/', request, content_type='application/json')
        self.assertEqual(response.status_code, 404)
    
    # update without pk
    def test_update_wrong_url(self):
        request = {'veterinarian': 'update_veterinarian'}
        response = self.client.put('/vaccines/', request, content_type='application/json')
        self.assertEqual(response.status_code, 400)

    # delete existing vaccine
    def test_delete_vaccine(self):
        vaccine_id = Vaccine.objects.all()[0].id
        response = self.client.delete(f'/vaccines/{vaccine_id}/')
        self.assertEqual(response.status_code, 200)

    # delete non-existing vaccine
    def test_delete_no_vaccine(self):
        response = self.client.delete('/vaccines/-1/')
        self.assertEqual(response.status_code, 404)

class ReminderViewTest(TestCase):

    def setUp(self):
        user = User.objects.create(
            name='user',
            email='user@gmail.com',
            username='user'
        )

        pet = Pet.objects.create(
            user=user,
            name='pet',
            gender='Macho',
            type='Cachorro',
            birthdate='2022-11-27',
            breed='pet_breed',
            weight='1000'
        )

        Reminder.objects.create(
            pet=pet,
            title='reminder',
        )
    
    # get all
    def test_url_exists(self):
        response = self.client.get('/reminders/')
        self.assertEqual(response.status_code, 200)

    # get existing reminder
    def test_url_reminder_exists(self):
        reminder_id = Reminder.objects.all()[0].id
        response = self.client.get(f'/reminders/{reminder_id}/')
        self.assertEqual(response.status_code, 200)

    # get reminder by pet
    def test_url_get_by_pet(self):
        pet_id = Pet.objects.all()[0].id
        response = self.client.get(f'/reminders/?pet_id={pet_id}')
        self.assertEqual(response.data[0]['pet']['id'], pet_id)

    # get non-existing reminder
    def test_url_reminder_not_exists(self):
        response = self.client.get('/reminders/-1/')
        self.assertEqual(response.status_code, 404)

    # post correct reminder
    def test_create_reminder(self):
        pet_id = Pet.objects.all()[0].id
        request = {'pet_id': pet_id, 'pet': pet_id, 'title': 'new_reminder'}
        response = self.client.post('/reminders/', request)
        self.assertEqual(response.status_code, 201)
    
    # post incorrect reminder
    def test_create_no_reminder(self):
        request = {'new_fiels': ''}
        response = self.client.post('/reminders/', request)
        self.assertEqual(response.status_code, 400)
    
    # update existing reminder
    def test_update_reminder(self):
        reminder_id = Reminder.objects.all()[0].id
        request = {'title': 'update_title'}
        response = self.client.put(f'/reminders/{reminder_id}/', request, content_type='application/json')
        self.assertEqual(response.status_code, 204)
    
    # update non-existing reminder
    def test_update_no_reminder(self):
        request = {'title': 'update_title'}
        response = self.client.put('/reminders/-1/', request, content_type='application/json')
        self.assertEqual(response.status_code, 404)
    
    # update without pk
    def test_update_wrong_url(self):
        request = {'title': 'update_title'}
        response = self.client.put('/reminders/', request, content_type='application/json')
        self.assertEqual(response.status_code, 400)

    # delete existing reminder
    def test_delete_reminder(self):
        reminder_id = Reminder.objects.all()[0].id
        response = self.client.delete(f'/reminders/{reminder_id}/')
        self.assertEqual(response.status_code, 200)

    # delete non-existing reminder
    def test_delete_no_reminder(self):
        response = self.client.delete('/reminders/-1/')
        self.assertEqual(response.status_code, 404)