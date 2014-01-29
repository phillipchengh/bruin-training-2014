from django.contrib import admin
from contributions.views import IndexView, Sectors, Occupations
from django.conf.urls import patterns, include, url
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', IndexView.as_view(), name='index'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^services/sectors.json', Sectors.as_view(), name='sectors'),
    url(r'^services/occupations.json', Occupations.as_view(), name='occupations'),
)
