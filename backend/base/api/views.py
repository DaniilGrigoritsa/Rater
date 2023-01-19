from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from pprint import pprint

from datetime import datetime, timedelta

from ..models import Show, Art, Package, Vote
from .serializers import Balance, PackageSerializer, ShowSerializer, Activity


@api_view(['GET'])
def api(request):
    response = [
        {
            'Description': 'All the information about api',
            'Method': 'GET',
            'Headers': {
                'Content-Type': 'application/json',
            },
            'Body': None,
            'Endpoint': 'api/'
        },
        {
            'Description': 'All the information about GET api',
            'Method': 'GET',
            'Headers': {
                'Content-Type': 'application/json',
            },
            'Body': None,
            'Endpoint': 'api/get/'
        },
        {
            'Description': 'All the information about POST api',
            'Method': 'GET',
            'Headers': {
                'Content-Type': 'application/json',
            },
            'Body': None,
            'Endpoint': 'api/post/'
        },
        {
            'Description': 'All the information about TOKEN api',
            'Method': 'GET',
            'Headers': {
                'Content-Type': 'application/json',
            },
            'Body': None,
            'Endpoint': 'api/token/'
        },
    ]
    return Response(response)


@api_view(['GET'])
def get(request):
    response = [
        {
            'Description': 'Get user balance',
            'Method': 'GET',
            'Headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + 'USER_ACCESS_TOKEN'
            },
            'Body': None,
            'Response': {'balance': 'float'},
            'Endpoint': 'api/get/balance/'
        },
        {
            'Description': 'Get user activity',
            'Method': 'GET',
            'Headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + 'USER_ACCESS_TOKEN'
            },
            'Body': None,
            'Response': {
                'ongoing_shows': [
                    {
                        'start_time': 'str',
                        'last_vote': 'str',
                        'total_votes': 'int',
                        'already_voted': 'int',
                        'votes': [
                            {
                                'url': 'url',
                                '%': 'int',
                            },
                            {
                                'url': 'url',
                                '%': 'int',
                            },
                        ]
                    },
                    '...'
                ],
                'finished_shows': [
                    {
                        'start_time': 'str',
                        'finish_time': 'str',
                        'total_votes': 'int',
                        'votes': [
                            {
                                'url': 'url',
                                '%': 'int',
                            },
                            {
                                'url': 'url',
                                '%': 'int',
                            },
                        ]
                    },
                    '...'
                ],
                'ongoing_votes': [
                    {
                        'total_votes': 'int',
                        'already_voted': 'int',
                        'timestamp': 'str',
                        'votes': [
                            {
                                'url': 'url',
                                '%': 'int',
                            },
                            {
                                'url': 'url',
                                '%': 'int',
                            },
                        ]
                    },
                    '...'
                ],
                'finished_votes': [
                    {
                        'total_votes': 'int',
                        'reward': 'float',
                        'timestamp': 'str',
                        'votes': [
                            {
                                'url': 'url',
                                '%': 'int',
                            },
                            {
                                'url': 'url',
                                '%': 'int',
                            },
                        ]
                    },
                    '...'
                ],
            },
            'Endpoint': 'api/get/activity/'
        },
        {
            'Description': 'Get random show for voting',
            'Method': 'GET',
            'Headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + 'USER_ACCESS_TOKEN'
            },
            'Body': None,
            'Response': [
                {
                    'id': 'id',
                    'url': 'url'
                },
                {
                    'id': 'id',
                    'url': 'url'
                },
                '...',
                {
                    'status': 817,
                    'description': 'No available shows, come back later'
                }
            ],
            'Endpoint': 'api/get/show/'
        },
        {
            'Description': 'Get all the existing packages',
            'Method': 'GET',
            'Headers': {
                'Content-Type': 'application/json',
            },
            'Body': None,
            'Response': [
                {
                    'package': 'id',
                    'amount': 'int',
                    'price': 'float'
                }
            ],
            'Endpoint': 'api/get/package/'
        },
    ]
    return Response(response)


@api_view(['GET'])
def post(request):
    response = [
        {
            'Description': 'Create a new Show',
            'Method': 'POST',
            'Headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + 'USER_ACCESS_TOKEN'
            },
            'Body': {
                'arts': ['ImageObject', 'ImageObject'],
                'package': 'id',
            },
            'Response': None,
            'Endpoint': 'api/post/show/'
        },
        {
            'Description': 'Post a new vote',
            'Method': 'POST',
            'Headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + 'USER_ACCESS_TOKEN'
            },
            'Body': {
                'result': 'ArtID',
            },
            'Response': None,
            'Endpoint': 'api/post/vote/'
        },
    ]
    return Response(response)


@api_view(['GET'])
def token(request):
    response = [
        {
            'Description': 'Obtain a new token',
            'Method': 'POST',
            'Headers': {
                'Content-Type': 'application/json',
            },
            'Body': {
                'Username': 'USER_USERNAME',
                'Password': 'USER_USERNAME',
            },
            'Response': {
                'refresh': 'token',
                'access': 'token',
            },
            'Endpoint': 'api/get/token/obtain/'
        },
        {
            'Description': 'Update an existing token',
            'Method': 'POST',
            'Headers': {
                'Content-Type': 'application/json',
            },
            'Body': {
                'Refresh': 'USER_REFRESH_TOKEN',
            },
            'Response': {
                'refresh': 'token',
                'access': 'token',
            },
            'Endpoint': 'api/get/token/refresh/'
        },
    ]
    return Response(response)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_balance(request):
    artist = request.user.artist.get()
    serializer = Balance(artist, many=False)
    response = serializer.data
    return Response(response, status=200)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_activity(request):
    id = request.user.artist.get().id

    shows, votes = Show.objects.filter(artist__id=id), Vote.objects.filter(artist__id=id)

    serializer = Activity(shows, votes, id)
    pprint(serializer.data)
    response = serializer.data

    return Response(response, status=200)


@api_view(['GET'])
def get_packages(request):
    packages = Package.objects.all()
    serializer = PackageSerializer(packages, many=True)
    response = serializer.data
    return Response(response, status=200)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_show(request):
    Show.objects.filter(on_voting=True).filter(last_vote__gt=datetime.now() - timedelta(minutes=1)).update(on_voting=False)
    id = request.user.artist.get().id
    show = Show.objects.filter(is_finished=False).exclude(on_voting=True).exclude(
        artist__id=id).exclude(arts__votes__artist_id=id).order_by('last_vote').all()

    print(Show.objects.filter(is_finished=False))
    print(Show.objects.filter(is_finished=False).exclude(on_voting=True))
    print(Show.objects.filter(is_finished=False).exclude(on_voting=True).exclude(artist__id=id).exclude(arts__votes__artist_id=id))
    print(show)

    if len(show):
        show = show.first()
        show.on_voting = True
        show.save()

        arts = Art.objects.filter(show__id=show.id)
        serializer = ShowSerializer(arts, many=True, context={"request": request})
        response = serializer.data
        return Response(response, status=200)

    else:
        return Response({'description': 'No available shows, come back later'}, status=404)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_vote(request):
    artist = request.user.artist.get()

    Show.objects.filter(on_voting=True).filter(last_vote__gt=datetime.now() - timedelta(minutes=1)).update(on_voting=False)

    id = dict(request.POST)['result'][0]

    art = Art.objects.get(id=id)

    show = Show.objects.filter(arts__id=id).get()

    if not show.on_voting:
        return Response({'description': 'The time to post that vote for you expired'}, status=401)

    else:
        Vote.objects.create(art=art, artist=artist)
        show.on_voting = False
        show.save()

        package = show.package
        voted = 0

        win = None
        for art in show.arts.all():
            voted += len(art.votes.all())
            if not win or len(art.votes.all()) > len(win.votes.all()):
                win = art

        if voted == package.amount:
            show.update(is_finished=True)
            reward = (package.price / len(win.votes.all())) * (1 - ((2 * len(win.votes.all()) - package.amount) / package.amount * package.max_com))

            for vote in win.votes:
                vote.update(reward=reward)
                artist = vote.artist.get()
                artist.update(balance=artist.balance + reward)

            for art in show.arts.all():
                if art != win:
                    for vote in art.votes.all():
                        vote.update(reward=0)

        return Response({'description': 'Vote successfully posted'}, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_show(request):
    artist = request.user.artist.get()

    data = dict(request.POST)
    print(data)
    package = Package.objects.get(id=data['package'][0])

    if artist.balance < package.price:
        return Response({'Not enough RTR to buy this package'}, status=403)

    else:

        Show.objects.create(artist=artist, package=package)
        show = Show.objects.order_by('time_start').first()

        for art in data['arts']:
            Art.objects.create(show=show, image=art)

        return Response({'description': 'Show successfully posted'}, status=200)
