DJANGO���������Ŀ�


1 ɾ��
	��ɾ��һ�ű��һ������ʱ��������Ѿ�������һ�ű������� ����Ҫ��ɾ������һ����¼����ɾ��������¼ ��Ȼ�ᱨ�� " 'str' is not callable "
2 �ļ��ϴ�
    ǰ�˵�����ͷ  Content-TypeΪmultipart/form-data  Ȼ����FormData�����װ����
    ��˻�ȡ�ļ�  <files:list>request.FILES.getlist('file') ����ʵ�ֵ��ļ����߶��ļ�

3 QuerySet: һ��װmodel�ļ��� �з���update�������������޸ģ����Ժ�model��


4 POST����ʱ������ͷΪmultipart/form-dataʱ,���ݻᱻ������requset.POST �����Ļᱻ����request.BODY ��json.loads( request.body )��ȡ����