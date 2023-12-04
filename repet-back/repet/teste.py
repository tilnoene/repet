from apscheduler.schedulers.background import BackgroundScheduler
from time import sleep

def h():
    print("Hello!")

    
def f():
    print("Oi!")

scheduler = BackgroundScheduler()
scheduler2 = BackgroundScheduler()
scheduler.start()
scheduler.add_job(h, 'cron', second='*/2')
scheduler.add_job(f, 'cron')



while True:
    pass