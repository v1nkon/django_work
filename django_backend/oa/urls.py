from django.urls import path
from oa import views

urlpatterns = [
    path('task/<int:taskId>', views.deleteTask),
    path('task', views.task),
    path('task/list', views.getList),
    path('task/addFile',views.addFile),
    path('task/update',views.updateTask),
]