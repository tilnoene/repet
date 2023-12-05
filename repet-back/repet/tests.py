from django.test import TestCase

from repet.models import User

class UserViewTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        User.objects.create(
            name='user',
            email='user@gmail.com',
            username='user'
        )
        
    def test_url_exists(self):
        response = self.client.get('/users/')
        self.assertEqual(response.status_code, 200)

    def test_url_user_exists(self):
        response = self.client.get('/users/1/')
        self.assertEqual(response.status_code, 200)

    def test_url_user_not_exists(self):
        response = self.client.get('/users/2/')
        self.assertEqual(response.status_code, 404)

    def test_create_user(self):
        request = {'name': 'new_user', 'email': 'newuser@gmail.com', 'username': 'new_user'}
        response = self.client.post('/users/', request)
        self.assertEqual(response.status_code, 201)
    
    def test_update_user(self):
        import json
        request = {"name": "update_user"}
        # request = json.dumps(request)
        response = self.client.put('/users/1/', request, content_type='application/json')
        print(response.data)
        self.assertEqual(response.status_code, 204)
    
    def test_delete_user(self):
        response = self.client.delete('/users/1/')
        self.assertEqual(response.status_code, 200)