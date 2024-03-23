import json

m = (
    0.2
    ,0.3
    ,0.4
    ,0.5
    ,0.6
    ,0.7
    ,0.8
    ,0.9
    ,1

    )
Data = {}
for starmass in m:
    with open('data/'+('0'+str(int(10*starmass)) if starmass<1 else str(int(10*starmass)))+'.dat') as f:
        splited = [line.split() for line in f][2:]
        Year = [float(x[1]) for x in splited]
        Tempeff = [10**float(x[2]) for x in splited]
        Tempcen = [10**float(x[10]) for x in splited]
        Lum = [10**float(x[3]) for x in splited]
        Mass = [float(x[5]) for x in splited]
        Radius = [float(x[6]) for x in splited]
    NormalizedYear = [x/Year[-1] for x in Year]
    Data[starmass] = {'year':Year,'nyear':NormalizedYear,'tempeff':Tempeff,'tempcen':Tempcen, 'lum':Lum, 'mass': Mass, "radius": Radius}

with open('outputs/low.json','w') as out:
    json.dump(Data,out,indent=4)
