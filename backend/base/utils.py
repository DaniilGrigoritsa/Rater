from pathlib import Path
from django.utils.crypto import get_random_string
from django.conf import settings


def model_id():
    return get_random_string(length=6, allowed_chars='0123456789')


def art_upload_path(instance, filename=None):
    return Path.joinpath(settings.MEDIA_ROOT, f'{instance.id}.png')
