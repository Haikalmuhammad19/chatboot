from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse


class PredictionAPITestCase(APITestCase):
    def test_health_check(self):
        url = reverse('health-check')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'healthy')

    def test_predict_valid_text(self):
        url = reverse('predict')
        data = {"text": "I'm feeling really anxious today"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('predicted_subreddit', response.data)
        self.assertIn('confidence', response.data)

    def test_predict_empty_text(self):
        url = reverse('predict')
        data = {"text": ""}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_prediction_history(self):
        url = reverse('prediction-history')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
