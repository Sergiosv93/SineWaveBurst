document.addEventListener("DOMContentLoaded", function() {
    // Crear un gráfico vacío utilizando Plotly.js
    var layout1 = {
        title: 'Sine Wave',
        xaxis: {
            title: 'Time'
        },
        yaxis: {
            title: 'Amplitude'
        }
    };

    var layout2 = {
        title: 'Sine Wave With Noise',
        xaxis: {
            title: 'Time'
        },
        yaxis: {
            title: 'Amplitude'
        }
    };

    var layout3 = {
        title: 'Frequency Analysis',
        xaxis: {
            title: 'Frequency [Hz]'
        },
        yaxis: {
            title: 'Amplitude'
        }
    };

    var values1 = [{
        x: [],
        y: [],
        type: 'scatter',
        mode: 'lines',
        name: 'Sine Wave'
    }];

    var values2 = [{
        x: [],
        y: [],
        type: 'scatter',
        mode: 'lines',
        name: 'Sine Wave With Noise'
    }];

    var values3 = [{
        x: [],
        y: [],
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Frequency Analysis'
    }];

    Plotly.newPlot(plot1, values1, layout1);
    Plotly.newPlot(plot2, values2, layout2);
    Plotly.newPlot(plot3, values3, layout3);
});

function toggleDarkMode(e) {
    var body = document.body;
    body.classList.toggle('dark-mode');
    
    let txt = e.innerText;
    e.innerText = txt == 'Dark Mode' ? 'Light Mode' : 'Dark Mode';

/*     var p = document.p;
    p.getElementById.toggle('dark-mode') */

/*     var plotDiv = document.getElementById('plot');
    plotDiv.classList.toggle('plot'); */
}


function plotSineWave() {
    var vp = document.getElementById('vp').value;
    var frequency = document.getElementById('frequency').value;
    var cycles = document.getElementById('cycles').value;
    var delay = document.getElementById('delay').value;
    var noise_range = document.getElementById('noise_range').value;
    var harmonic =  document.getElementById('harmonic').value;
    //var datos;

    // Aquí debes enviar los datos al servidor Flask utilizando AJAX
    // Ejemplo básico de AJAX con JavaScript:
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/plot', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ vp:vp, frequency:frequency, cycles:cycles, delay:delay, noise_range:noise_range, harmonic:harmonic}));
    console.log("HOLA DESDE JAVA");
    // Obtener el color de fondo del elemento <body>
/*     var bodyBackgroundColor = window.getComputedStyle(document.body).getPropertyValue('background-color');
    var bodycolor = window.getComputedStyle(document.body).getPropertyValue('color');
    console.log("Color de fondo del body:", bodyBackgroundColor);
    console.log("El color es:",bodycolor); */

    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) 
        {
          datos = xhr.response;
          console.log("Datos obtenidos")
          console.log(datos);
          const xValues = JSON.parse(datos)['t'];
          const yValues = JSON.parse(datos)['y'];

          const noise = JSON.parse(datos)['n'];
          const xf = JSON.parse(datos)['xf'];
          const yff = JSON.parse(datos)['yff'];
          

          var layout1 = {
            title: 'Sine Wave',
            xaxis: {
                title: 'Time'
            },
            yaxis: {
                title: 'Amplitude',
                range: [Math.min(yValues), Math.max(yValues)],
                tickformat: '&minus;3'
            }
        };
    
        var layout2 = {
            title: 'Sine Wave With Noise',
            xaxis: {
                title: 'Time'
            },
            yaxis: {
                title: 'Amplitude',
                range: [Math.min(noise), Math.max(noise)],
                tickformat: '&minus;3'
            }
        };
    
        var layout3 = {
            title: 'Frequency Analysis',
            xaxis: {
                title: 'Frequency [Hz]'
            },
            yaxis: {
                title: 'Amplitude'
            }
        };
    
        var values1 = [{
            x: xValues,
            y: yValues,
            type: 'scatter',
            mode: 'lines',
            name: 'Sine Wave'
        }];
    
        var values2 = [{
            x: xValues,
            y: noise,
            type: 'scatter',
            mode: 'lines',
            name: 'Sine Wave With Noise'
        }];
    
        var values3 = [{
            x: xf,
            y: yff,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Frequency Analysis'
        }];

        Plotly.react(plot1, values1, layout1);
        Plotly.react(plot2, values2, layout2);
        Plotly.react(plot3, values3, layout3);
        
        }
        else 
        {
          console.log(`Error: ${xhr.status}`);
        }

    };

    //datos = xhr.response;

    /* const xValues = JSON.parse(datos)['t'];
    const yValues = JSON.parse(datos)['y'];

    console.log(xValues);
    console.log(yValues); */

    // Después de enviar los datos, recibirás una respuesta del servidor con los datos para graficar
    // Utiliza Plotly.js para graficar la onda seno en el elemento con id="plot"

       // Configurar el trazado
    /* var values = [{
        x: xValues,
        y: yValues,
        type: 'scatter',
        mode: 'lines',
        name: 'Sine Wave'
    }]; */

    // Configurar el diseño del gráfico
    /* var layout = {
        title: 'Sine Wave',
        xaxis: {
            title: 'Time'
        },
        yaxis: {
            title: 'Amplitude'
        }
    }; */

    // Dibujar el gráfico utilizando Plotly.js
    // Plotly.newPlot('plot', values, layout);
    
}

