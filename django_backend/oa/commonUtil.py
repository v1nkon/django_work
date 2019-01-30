import logging, sys, os, time, random

#成功信息模板
RESPONSE_SUCCESS_MODEL = {
    'status':200,
    'msg':'success'
}
#失败信息模板
RESPONSE_WRONG_MODEL = {
    'status':500,
    'msg':'error'
}

#日志对象
logger = logging.getLogger('django')

# 处理对象
def queryDict2Dict( queryDict, MODEL_META_FIELDS ):
    queryDict = dict( queryDict )
    dictObj = {}
    for key in queryDict:
        model_data_value = queryDict[key]
        if key in MODEL_META_FIELDS:
            if type(model_data_value) is list:
                dictObj[key] = model_data_value[0]
            else:
                dictObj[key] = model_data_value
    return dictObj
#文件上传
def handle_upload_file(upload_files_list, dir_id):
    #多线程写文件
    path_name_list = []
    print( upload_files_list )
    try:
        if len(upload_files_list) != 0:
            dir_path = 'static/dir_id_' + str(dir_id)
            if not os.path.exists(dir_path):
                os.makedirs(dir_path)
            for f in upload_files_list:
                file_name,f_extend = f.name.split('.')
                path_name = dir_path + '/' + file_name + time.strftime( '%Y%m%d%H%M%S', time.localtime( time.time() ) ) + '.' + f_extend
                while os.path.exists(path_name):
                    path_name = dir_path + '/' + file_name + time.strftime( '%Y%m%d%H%M%S', time.localtime( time.time() ) ) + str(random.randint(0,100)) + '.' + f_extend
                with open( path_name, 'wb' ) as wf:
                    for chunk in f.chunks():
                        wf.write(chunk)
                path_name_list.append( path_name )
            return ( path_name_list, dir_path)
        else:
            return (path_name_list,'')
    except:
        logger.error( sys.exc_info() )
        return  (path_name_list,'')

#可以删除文件和文件夹 当是文件夹的时候，递归删除文件夹
def removeDir( path_dir ):
    if path_dir == '':
        return 
    curpath = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    path_dir = os.path.join(curpath, path_dir)
    if os.path.exists( path_dir ):
        if os.path.isdir( path_dir ):
            files = os.listdir( path_dir )
            try:
                for file in files:
                    path_file = os.path.join( path_dir, file )
                    if os.path.isfile( path_file ):
                        os.remove(path_file)
                        logger.info( path_file, '文件被删除' )
                    elif os.path.isdir(path_file):
                        removeDir(path_file)
                os.rmdir( path_dir )
            except:
                logger.error('文件删除失败')
        elif os.path.isfile( path_dir ):
            os.remove(path_dir)


    pass

#序列化querySet
def serializeQuerySet( querySet ):
    listData = []
    # jsonStr = serializers.serialize( 'json',querySet )
    # print( jsonStr )
    # jsonJson = json.loads( jsonStr )
    # for obj in jsonJson:
    #     listData.append( obj['fields'] )
    # return listData
    for obj in querySet:
        listData.append( obj.toJSON() )
    return listData


#分页初始化
def getPagin(request):
    currentPage = int(request.GET.get('currentPage', 1))
    startPage = currentPage - 1 if currentPage >= 1 else 0
    pageSize = int(request.GET.get('pageSize', 10))
    start = startPage * pageSize
    end = currentPage * pageSize
    return start,end, currentPage, pageSize 

def errHandler( JsonResponse ):
    def decorator( func ):
        def wrapper( *args, **kwargs ):
             try:
                 return func( *args, **kwargs )
             except:
                 logger.error(sys.exc_info())
                 res = RESPONSE_WRONG_MODEL.copy()
                 res['data'] = []
                 return JsonResponse(res)
        return wrapper
    return decorator

