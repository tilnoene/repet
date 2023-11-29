from django.test import TestCase
from django.urls import reverse

# Create your tests here.

from repet.models import Users

class UserViewTest(TestCase):

    # @classmethod
    # def setUpTestData(cls):
    #     Users.objects.create(
    #         name='Jorginho',
    #         email='jorginho@gmail.com',
    #         image='',
    #         username='jorginho123'
    #     )
        
    def test_url_exists(self):
        response = self.client.get('/users/')
        self.assertEqual(response.status_code, 200)

    def test_url_accessible_by_name(self):
        response = self.client.get(reverse('users'))
        self.assertEqual(response.status_code, 200)

    # def test_create_user(self, request):
    #     response = self.client.get()