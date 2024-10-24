import statsapi

sched = statsapi.schedule(start_date='10/17/2024')
game = statsapi.get('game', {'gamePk': 775310})
print(len(sched))