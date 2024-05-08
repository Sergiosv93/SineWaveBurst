from flask import Flask, render_template, request, jsonify
import numpy as np

def burst():
    vp = float(request.json['vp'])
    frequency = float(request.json['frequency'])
    cycles = float(request.json['cycles'])
    delay = float(request.json['delay'])
    #print("SE RECIBIERON LOS DATOS")
    #noise_range = float(request.json['noise_range'])

    fs = 30*frequency #Frequency sample
    ts = 1/fs #Time sample
    tp = cycles/frequency #Time pulse
    tt = tp+delay #Total Time
    ns = int(tt/ts) #Number of samples
    t = np.linspace(0,tt,ns) #Time Vector
    y = vp*np.sin(2*np.pi*frequency*t)*(t<=tp)
    data = {'t':t.tolist(), 'y':y.tolist()}
    #print("Todo ok")
    return jsonify(data)