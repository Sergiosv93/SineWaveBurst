from flask import Flask, render_template, request, jsonify
import numpy as np
#from matplotlib import pyplot as plt
from scipy.fft import fft, fftfreq

""" cycles = 10
frequency = 10e3
delay = 0.001
vp = 5 #Volataje Pico
noise_range = 0.4 """

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')

# Burst Pulse
@app.route('/plot', methods=['POST'])
def burst():
    vp = float(request.json['vp'])
    frequency = float(request.json['frequency'])
    cycles = float(request.json['cycles'])
    delay = float(request.json['delay'])/1000
    noise_range = float(request.json['noise_range'])
    harmonic =  float(request.json['harmonic'])
    print("SE RECIBIERON LOS DATOS")
    #noise_range = float(request.json['noise_range'])

    
    fs = 30*frequency*harmonic #Frequency sample
    harmonic = 0 if harmonic == 1 else harmonic
    print(f"El armonico es {harmonic}")
    ts = 1/fs #Time sample
    tp = cycles/frequency #Time pulse
    tt = tp+delay #Total Time
    ns = int(tt/ts) #Number of samples
    t = np.linspace(0,tt,ns) #Time Vector
    y = vp*(np.sin(2*np.pi*frequency*t)+np.sin(2*np.pi*harmonic*frequency*t))*(t<=tp)
    nd = np.random.default_rng().normal(scale=noise_range,size=len(y))
    noise =  nd+y #Burst Noise
    t1 = t[t<=tp]
    ts = np.abs(t1[1]-t1[0])
    N = len(t1)
    y1 = noise[t<=tp]
    yf = fft(y1)
    xf = fftfreq(N, ts)[:N//int(8)]
    yff = 2.0/N * np.abs(yf[0:N//int(8)])
    data = {'t':t.tolist(), 'y':y.tolist(), 'n':noise.tolist(), 'xf':xf.tolist(), 'yff':yff.tolist()}
    print("Todo ok")
    return jsonify(data)

# Add Normal Distribution as Noise in pulse
""" def noise(y,noise_range=0.0):
    nd = np.random.default_rng().normal(scale=noise_range,size=len(y)) # Normal Distribution Vector
    return y+nd """

""" def frequency_analysis(t,y,cycles,frequency):
    tp = cycles/frequency
    t1 = t[t<=tp]
    ts = np.abs(t1[1]-t1[0])
    N = len(t1)
    y1 = y[t<=tp]
    yf = fft(y1)
    xf = fftfreq(N, ts)[:N//4]
    yff = 2.0/N * np.abs(yf[0:N//4])
    return xf, yff """

""" t,y = burst(cycles,frequency,delay,vp)
y_noise = noise(y,noise_range)
x,yff = frequency_analysis(t,y_noise,cycles,frequency) """

""" plt.figure(1)
plt.plot(t,y,t,y_noise)

plt.figure(2)
plt.plot(x,yff)

plt.show()
 """

if __name__ == '__main__':
    app.run(debug=True)
