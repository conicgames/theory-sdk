import json


with open('data/02.dat') as f:
    splited = [line.split() for line in f][2:]
    Year = [float(x[1]) for x in splited]
    logTempeff = [float(x[2]) for x in splited]
    logTempcen = [float(x[10]) for x in splited]
    logLum = [float(x[3]) for x in splited]
    Mass = [float(x[5]) for x in splited]
    Radius = [float(x[6]) for x in splited]
Data = {0.3:{'year':Year,'logtempeff':logTempeff,'logtempcen':logTempcen, 'loglum':logLum, 'mass': Mass, "radius": Radius}}

with open('output.json','w') as out:
    json.dump(Data[0.3],out)
