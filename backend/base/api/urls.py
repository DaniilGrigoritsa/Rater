from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [

    path('', views.api, name='api'),

    path('get/', views.get, name='get_api'),
    path('get/balance/', views.get_balance, name='get_balance'),
    path('get/activity/', views.get_activity, name='get_activity'),
    path('get/show/', views.get_show, name='get_show'),
    path('get/package/', views.get_packages, name='get_package'),

    path('post/', views.post, name='post_api'),
    path('post/show/', views.post_show, name='post_show'),
    path('post/vote/', views.post_vote, name='post_vote'),

    path('token/', views.token, name='token'),
    path('token/obtain/', TokenObtainPairView.as_view(), name='token_obtain'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]
