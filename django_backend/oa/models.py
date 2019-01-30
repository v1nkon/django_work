from django.db import models
import json

# Create your models here.


class TaskFileDir(models.Model):
    DIRID = models.AutoField(primary_key=True)
    CREATETIME = models.DateTimeField(auto_now=True)


class Task( models.Model ):
    CONTENT = models.CharField(max_length=2048)
    CREATE_TIME = models.DateTimeField(auto_now=True)
    CREATOR = models.CharField(max_length=10)
    ID = models.AutoField(primary_key=True)
    ISFEEDBACK = models.CharField(max_length=1, default='Y')
    SENDDEPARTMENT = models.CharField(max_length=100)
    TASKSTATUS = models.CharField(max_length=2)
    TITLE = models.CharField(max_length=256)
    TYPE = models.CharField(max_length=2)
    TASKFILEDIR = models.OneToOneField(TaskFileDir, on_delete='', related_name="TASKFILEDIR")

    def toJSON(self):
        fields = dict( [(attr, getattr(self, attr)) for attr in [f.name for f in self._meta.fields]] )
        return fields

    class Meta:
        db_table =  'Task'
        ordering = ('ID',)

class FileDir( models.Model ):
    FILEID = models.AutoField( primary_key=True )
    TASKFILEDIR = models.ForeignKey(TaskFileDir, on_delete='')
    FILEDIR = models.FilePathField(  )

    def toJSON(self):
        fields = dict([(attr, getattr(self, attr)) for attr in [f.name for f in self._meta.fields]])
        return fields['FILEDIR']








