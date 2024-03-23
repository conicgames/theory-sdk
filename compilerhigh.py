import json

m = (
    1.2
    ,1.4
    ,1.6
    ,1.8
    ,2
    ,2.2
    ,2.4
    ,2.6
    ,2.8
    ,3
    ,3.4
    ,3.8
    ,4.2
    ,4.6
    ,5
    ,5.4
    ,5.8
    ,6.2
    ,6.6
    ,7
    ,7.8
    ,8.6
    ,9.4
    ,10.2
    ,11
    ,11.8
    ,12.6
    ,13.4
    ,14.2
    ,15
    ,16.6
    ,18.2
    ,19.8
    ,21.4
    ,23
    ,24.6
    ,26.2
    ,27.8
    ,29.4
    ,31
    ,34.2
    ,37.4
    ,40.6
    ,43.8
    ,47
    ,50
    )
Data = {}
for starmass in m:
    with open('data/'+str(int(10*starmass))+'.dat') as f:
        splited = [line.split() for line in f][2:]
        Year = [float(x[1]) for x in splited]
        Tempeff = [10**float(x[4]) for x in splited]
        Tempcen = [10**float(x[20]) for x in splited]
        Lum = [10**float(x[3]) for x in splited]
        Mass = [float(x[2]) for x in splited]
        Radius = [float(x[44]) for x in splited]
    NormalizedYear = [x/Year[-1] for x in Year]
    Data[starmass] = {'year':Year,'nyear':NormalizedYear,'tempeff':Tempeff,'tempcen':Tempcen, 'lum':Lum, 'mass': Mass, "radius": Radius}

with open('outputs/high.json','w') as out:
    json.dump(Data,out,indent=4)
