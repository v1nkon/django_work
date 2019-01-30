from django.contrib import admin
from oa.models import Task, FileDir, TaskFileDir
# Register your models here.


class TaskAdmin( admin.ModelAdmin ):
    list_display = ('ID', 'TYPE', 'TASKSTATUS', 'ISFEEDBACK', 'SENDDEPARTMENT', 'TITLE', 'CREATE_TIME', 'CREATOR', 'CONTENT', 'TASKFILEDIR')
    list_editable = ( 'TYPE', 'TASKSTATUS', 'ISFEEDBACK', 'SENDDEPARTMENT', 'TITLE', 'CREATOR', 'CONTENT', 'TASKFILEDIR')
    search_fields = ('ID', 'TYPE', 'TASKSTATUS', 'ISFEEDBACK', 'SENDDEPARTMENT', 'TITLE', 'CREATE_TIME', 'CREATOR', 'CONTENT')


class TaskFileDirAdmin( admin.ModelAdmin ):
    list_display = ('DIRID','CREATETIME')

class FileDirAdmin( admin.ModelAdmin ):
    list_display = ('FILEID','TASKFILEDIR', 'FILEDIR')
    list_editable = ('TASKFILEDIR', )


admin.site.register( Task, TaskAdmin )
admin.site.register( TaskFileDir, TaskFileDirAdmin )
admin.site.register( FileDir, FileDirAdmin )

