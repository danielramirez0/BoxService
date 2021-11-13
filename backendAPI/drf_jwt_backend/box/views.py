from rest_framework.response import Response
from rest_framework.views import APIView
from .models import BoxTier
from .serializers import BoxTierSerializer


class BoxTiers(APIView):
    '''Collect all box tiers'''

    def get(self, request):
        box_tiers = BoxTier.objects.all()
        serializer = BoxTierSerializer(box_tiers, many=True)
        return Response(serializer.data)
