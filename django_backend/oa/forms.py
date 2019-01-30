from django import forms
from  .models import Task, TaskFileDir, FileDir

class TaskForm( forms.ModelForm ):

    def __init__(self, * args, ** kwargs):
        print( args )
        print( kwargs )
        super(TaskForm, self).__init__(* args, ** kwargs)


    class Meta:
        model = Task
        fields = "__all__"

class TaskFileDirForm( forms.ModelForm ):
    class Meta:
        model = TaskFileDir
        fields = "__all__"

class FileDirForm( forms.ModelForm ):
    class Meta:
        model = FileDir
        fields = "__all__"



