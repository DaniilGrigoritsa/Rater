from django.db import models
from django.contrib.auth.models import User
from .utils import model_id, art_upload_path


# Create your models here.
class Model(models.Model):
    id = models.CharField(primary_key=True, unique=True, default=model_id, editable=False, max_length=6)

    class Meta:
        abstract = True

    def __str__(self):
        return self.id


class Artist(Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='artist')
    balance = models.FloatField(default=0.0)


class Show(Model):
    artist = models.ForeignKey('Artist', on_delete=models.CASCADE, related_name='shows')
    package = models.ForeignKey('Package', on_delete=models.CASCADE)
    is_finished = models.BooleanField(default=False)
    time_start = models.DateTimeField(auto_now=True)
    last_vote = models.DateTimeField(auto_now_add=True)
    on_voting = models.BooleanField(default=False)
    # current_voter = models.OneToOneField('Artist', on_delete=models.CASCADE, related_name='voter', null=True, blank=True)


class Package(Model):
    price = models.FloatField()
    amount = models.PositiveIntegerField()
    max_com = models.FloatField()


class Vote(Model):
    artist = models.ForeignKey('Artist', on_delete=models.CASCADE, related_name='votes')
    art = models.ForeignKey('Art', on_delete=models.CASCADE, related_name='votes')
    reward = models.FloatField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now=True)


class Art(Model):
    show = models.ForeignKey('Show', on_delete=models.CASCADE, related_name='arts')
    image = models.ImageField(upload_to=art_upload_path)
