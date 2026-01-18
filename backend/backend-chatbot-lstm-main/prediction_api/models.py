from django.db import models


class PredictionHistory(models.Model):
    text = models.TextField()
    predicted_subreddit = models.CharField(max_length=100)
    confidence = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Prediction Histories'

    def __str__(self):
        return f"{self.predicted_subreddit} - {self.confidence:.2%}"
