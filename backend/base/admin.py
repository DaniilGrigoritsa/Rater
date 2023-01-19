from django.contrib import admin
from .models import *

# Register your models here.


@admin.register(Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'balance')


@admin.register(Show)
class ShowAdmin(admin.ModelAdmin):
    list_display = ('id', 'artist', 'amount', 'on_voting', 'is_finished')

    def amount(self, obj):
        return obj.package.amount


@admin.register(Vote)
class VoteAdmin(admin.ModelAdmin):
    list_display = ('id', 'artist', 'show', 'timestamp', 'is_finished')

    def show(self, obj):
        return obj.art.show

    def is_finished(self, obj):
        return obj.art.show.is_finished


@admin.register(Art)
class ArtAdmin(admin.ModelAdmin):
    list_display = ('id', 'artist', 'show')

    def artist(self, obj):
        return obj.show.artist.id


@admin.register(Package)
class PackageAdmin(admin.ModelAdmin):
    list_display = ('id', 'price', 'amount')
