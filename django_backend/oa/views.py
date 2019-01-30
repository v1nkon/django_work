# coding=utf-8

from django.http import QueryDict,HttpResponse,JsonResponse
from django.core import serializers,paginator
from django.db import transaction
from oa.models import Task, TaskFileDir, FileDir
from oa.forms import TaskForm,TaskFileDirForm, FileDirForm
import os,json,sys,time,datetime
from oa.commonUtil import *
# Create your views here.


TASK_META_FIELDS = [ f.name for f in Task._meta.fields ]
#获取任务列表
@errHandler(JsonResponse)
def getList(request):
    start, end, currentPage, pageSize = getPagin( request )
    res = RESPONSE_SUCCESS_MODEL.copy()
    listQuerySet = Task.objects.all()
    count = listQuerySet.count()
    res_data = serializeQuerySet(  listQuerySet[start:end]  )
    for obj in res_data:
        obj['TASKFILEDIR'] = serializeQuerySet( obj['TASKFILEDIR'].filedir_set.all() )
    res['data'] = res_data
    res['page'] = {
        'totalPage': count,
        'currentPage': currentPage,
        'pageSize': pageSize,
    }
    # return HttpResponse( res, content_type='application/json; charset=utf-8')
    return JsonResponse( res )

@errHandler(JsonResponse)
def deleteTask( request, taskId ):
    print( type(taskId) )
    res = RESPONSE_SUCCESS_MODEL.copy()
    task =  Task.objects.get(ID=taskId)
    if task:
        print( task )
        task.delete()
        return JsonResponse( res )
    else:
        res = RESPONSE_WRONG_MODEL.copy()
        res['data'] = '任务不存在'
        return JsonResponse(res)

def addTaskFileDir():
    t = TaskFileDir()
    t.save()
    return t

@errHandler(JsonResponse)
def addTask( request ):
    try:
        task_data =   request.POST
        with transaction.atomic():
            dic2 = queryDict2Dict(task_data, TASK_META_FIELDS)
            task_file_dir =  addTaskFileDir()
            dic2['TASKFILEDIR'] = task_file_dir
            taskModel = Task(**dic2)
            taskModel.save()
            task_files_path_list, path_dir = handle_upload_file(request.FILES.getlist('file'),task_file_dir.DIRID)
            task_files_mode_list = []
            for task_files_path in task_files_path_list:
                task_files_model = FileDir( TASKFILEDIR = task_file_dir, FILEDIR = task_files_path )
                task_files_mode_list.append( task_files_model )
                task_files_model.save()
            res = RESPONSE_SUCCESS_MODEL.copy()
            return JsonResponse( res )
    except:
        #当存储数据库失败的时候，将文件和文件夹删掉
        #开启数据库事物功能，当数据库操作出问题的时候，不进行文件操作
        #文件操作的时候，同样数据库会回退
        # logger.error(sys.exc_info())
        # removeDir( path_dir )
        # for task_files_model in task_files_mode_list:
        #     task_files_model.delete()
        # task_file_dir.delete()
        res = RESPONSE_WRONG_MODEL.copy()
        return JsonResponse(res)

        # if Task_data:
        # # if form_data.is_valid():
        #     res = RESPONSE_SUCCESS_MODEL.copy()
        #     # form_data.save( commit=True )
        #     Task_data.save()
        #     return JsonResponse( res )
        # else:
        #     res = RESPONSE_WRONG_MODEL.copy()
        #     return JsonResponse( res )

@errHandler(JsonResponse)
def updateTask( request ):
    try:
        task_data = request.POST
        ID = task_data.get('ID')
        task_model_set = Task.objects.filter(ID=ID)
        if len(task_model_set) != 0:
            dic2 = queryDict2Dict( task_data, TASK_META_FIELDS )
            old_files_list = dic2['TASKFILEDIR'].split(',')
            print(old_files_list)
            # task_file_dir = task_model.TASKFILEDIR
            task_file_dir = task_model_set[0].TASKFILEDIR
            dic2['TASKFILEDIR'] = task_file_dir
            with transaction.atomic():
                task_model_set.update(**dic2)
                task_files_path_list, path_dir = handle_upload_file(request.FILES.getlist('file'), task_file_dir.DIRID)
                file_dir_list = list( task_file_dir.filedir_set.all() )
                for file_dir_obj in file_dir_list:
                    if file_dir_obj.FILEDIR not in old_files_list:
                        file_dir_obj.delete()
                        removeDir( file_dir_obj.FILEDIR )
                task_files_mode_list = []
                for task_files_path in task_files_path_list:
                    task_files_model = FileDir(TASKFILEDIR=task_file_dir, FILEDIR=task_files_path)
                    task_files_mode_list.append(task_files_model)
                    task_files_model.save()
                res = RESPONSE_SUCCESS_MODEL.copy()
                res['msg'] = '修改成功'
                JsonResponse( res )
        else:
            res = RESPONSE_WRONG_MODEL.copy()
            res['msg'] = '不存在修改的数据'
            return JsonResponse(res)
    except Exception:
        logger.error( sys.exc_info() )
        return JsonResponse( RESPONSE_WRONG_MODEL.copy() )


def taskCleanUp():
    logger.error(sys.exc_info())
    removeDir(path_dir)
    for task_files_model in task_files_mode_list:
        task_files_model.delete()
    task_file_dir.delete()
    res = RESPONSE_WRONG_MODEL.copy()
    return JsonResponse(res)

def task( request ):
    try:
        method = request.method
        res = RESPONSE_SUCCESS_MODEL.copy()
        if method == 'POST':
            return addTask( request )
        elif method == 'PUT':
            return updateTask( request )
        else:
            pass
        return JsonResponse( res )

    except Exception :
        print( str( Exception ) )
        res = RESPONSE_WRONG_MODEL.copy()
        JsonResponse( res )


def addFile(request):
    taskFileDir = TaskFileDir.objects.get(DIRID = 1)

    print( taskFileDir )
    file1 = {
        'TASKFILEDIR':taskFileDir,
        'FILEDIR':'static/test.txt'
    }
    # fileData = FileDirForm( **file1 )
    fileData = FileDir( **file1 )
    fileData.save()
    return HttpResponse( 'xxxx' )

