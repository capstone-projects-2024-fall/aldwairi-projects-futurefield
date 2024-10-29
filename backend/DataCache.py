import pandas as pd
import statsapi as sts

rawData = (sts.get('team', {'teamId' :143}))
print(rawData)
