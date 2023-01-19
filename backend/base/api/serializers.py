from rest_framework.serializers import ModelSerializer, SerializerMethodField
from ..models import Artist, Show, Vote, Art, Package


class Balance(ModelSerializer):
    class Meta:
        model = Artist
        fields = ('balance',)


class PackageSerializer(ModelSerializer):
    class Meta:
        model = Package
        fields = ('id', 'price', 'amount',)


class ShowSerializer(ModelSerializer):
    url = SerializerMethodField()

    class Meta:
        model = Art
        fields = ('id', 'url')

    def get_url(self, obj):
        request = self.context.get('request')
        url = obj.image.url
        return request.build_absolute_uri(url)


class Activity(dict):
    def __init__(self, shows, votes, user):
        super(Activity, self).__init__()
        self['ongoing_shows'] = list()
        self['finished_shows'] = list()
        self['ongoing_votes'] = list()
        self['finished_votes'] = list()

        for show in shows:
            if not show.is_finished:
                total = sum([len(art.votes.all()) for art in show.arts.all()])
                self['finished_shows'].append({
                    'start_time': show.time_start,
                    'last_vote': show.last_vote,
                    'total_votes': show.package.amount,
                    'already_voted': total,
                    'votes': [{'url': art.image.url, '%': round(len(art.votes.all()) / total * 100)} for art in show.arts.all()]
                })
            else:
                total = show.package.amount
                self['ongoing_shows'].append({
                    'start_time': show.time_start,
                    'last_vote': show.last_vote,
                    'total_votes': total,
                    'votes': [{'url': art.image.url, '%': round(len(art.votes.all()) / total * 100)} for art in show.arts.all()]
                })

        for vote in votes:
            show = vote.art.show
            if not show.is_finished:
                total = sum([len(art.votes.all()) for art in show.arts.all()])
                self['ongoing_votes'].append({
                    'total_votes': show.package.amount,
                    'already_voted': total,
                    'timestamp': vote.timestamp,
                    'votes': [
                        {
                            'url': vote.art.image.url,
                            '%': round(len(vote.art.votes.all()) / total * 100)
                        },
                        {
                            'url': show.arts.all().exclude(votes__artist__id=user).first().image.url,
                            '%': round(len(show.arts.all().exclude(votes__artist__id=user).first().votes.all()) / total * 100)
                        }
                    ]
                })
            else:
                total = show.package.amount
                self['finished_votes'].append({
                    'total_votes': total,
                    'reward': vote.reward,
                    'timestamp': vote.timestamp,
                    'votes': [
                        {
                            'url': vote.art.get().image.url,
                            '%': round(len(vote.art.get().votes) / total)
                        },
                        {
                            'url': show.arts.all().exclude(artist__id=user).first().image.url,
                            '%': round(len(show.arts.all().exclude(artist__id=user).first().votes) / total)
                        }
                    ]
                })

    @property
    def data(self):
        return self
