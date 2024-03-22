import json


with open('data/12.dat') as f:
    splited = [line.split() for line in f][2:]
    Year = [float(x[1]) for x in splited]
    logTempeff = [float(x[4]) for x in splited]
    logTempcen = [float(x[20]) for x in splited]
    logLum = [float(x[3]) for x in splited]
    Mass = [float(x[2]) for x in splited]
    Radius = [float(x[44]) for x in splited]
Data = {1.2:{'year':Year,'logtempeff':logTempeff,'logtempcen':logTempcen, 'loglum':logLum, 'mass': Mass, "radius": Radius}}

with open('output.json','w') as out:
    json.dump(Data[1.2],out)
