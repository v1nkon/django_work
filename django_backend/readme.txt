DJANGO开发遇到的坑


1 删除
	当删除一张表的一条数据时，如果它已经是另外一张表的外键了 ，需要先删除另外一条记录，在删除这条记录 不然会报错 " 'str' is not callable "
2 文件上传
    前端的请求头  Content-Type为multipart/form-data  然后用FormData对象封装数据
    后端获取文件  <files:list>request.FILES.getlist('file') 可以实现单文件或者多文件

3 QuerySet: 一个装model的集合 有方法update可以用于批量修改（属性和model）


4 POST请求时当请求头为multipart/form-data时,数据会被解析到requset.POST 其他的会被放在request.BODY 用json.loads( request.body )获取数据