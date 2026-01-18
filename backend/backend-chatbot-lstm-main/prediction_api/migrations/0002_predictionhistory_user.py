# Generated migration for adding user field to PredictionHistory

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('prediction_api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='predictionhistory',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
