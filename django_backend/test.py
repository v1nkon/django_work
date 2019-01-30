#encoding = utf-8

import time, threading

nums = [11,2,7,4,4545,50]

global_num = None

def loop(num):
    global global_num
    global_num = num

threads = []

for i in nums:
    threads.append(threading.Thread(target=loop, args=(i)))

for current_thread in threads:
    current_thread.start()

for current_thread in threads:
    current_thread.join()

time.sleep( global_num )
print( global_num )
