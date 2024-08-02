import React, { useState } from 'react';

function CalculadoraPrestamo() {
    const [monto, setMonto] = useState('');
    const [tasa, setTasa] = useState('');
    const [plazo, setPlazo] = useState('');
    const [resultado, setResultado] = useState(null);

    const calcularPrestamo = (monto, tasaAnual, plazoAnios) => {
        let tasaMensual = tasaAnual / 12 / 100;
        let pagosTotales = plazoAnios * 12;
        let pagoMensual = (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -pagosTotales));
        let totalPagado = pagoMensual * pagosTotales;
        let interesTotal = totalPagado - monto;

        let amortizacion = [];
        let saldo = monto;

        for (let i = 0; i < pagosTotales; i++) {
            let interesPago = saldo * tasaMensual;
            let principalPago = pagoMensual - interesPago;
            saldo -= principalPago;
            amortizacion.push({
                mes: i + 1,
                interesPago: interesPago.toFixed(2),
                principalPago: principalPago.toFixed(2),
                saldoRestante: saldo.toFixed(2)
            });
        }

        return { 
            pagoMensual: pagoMensual.toFixed(2), 
            interesTotal: interesTotal.toFixed(2),
            amortizacion
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const montoNum = parseFloat(monto);
        const tasaNum = parseFloat(tasa);
        const plazoNum = parseInt(plazo, 10);

        if (isNaN(montoNum) || isNaN(tasaNum) || isNaN(plazoNum)) {
            alert("Por favor, ingrese valores válidos.");
            return;
        }

        const calculo = calcularPrestamo(montoNum, tasaNum, plazoNum);
        setResultado(calculo);
    };

    return (
        <div>
            <h2>Calculadora de Préstamos</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Monto del Préstamo:</label>
                    <input 
                        type="number" 
                        value={monto} 
                        onChange={(e) => setMonto(e.target.value)} 
                        placeholder="Monto" 
                        required
                    />
                </div>
                <div>
                    <label>Tasa de Interés Anual (%):</label>
                    <input 
                        type="number" 
                        step="0.01" 
                        value={tasa} 
                        onChange={(e) => setTasa(e.target.value)} 
                        placeholder="Tasa de Interés" 
                        required
                    />
                </div>
                <div>
                    <label>Plazo del Préstamo (años):</label>
                    <input 
                        type="number" 
                        value={plazo} 
                        onChange={(e) => setPlazo(e.target.value)} 
                        placeholder="Plazo" 
                        required
                    />
                </div>
                <button type="submit">Calcular</button>
            </form>

            {resultado && (
                <div>
                    <h3>Resultados:</h3>
                    <p>Pago Mensual: ${resultado.pagoMensual}</p>
                    <p>Interés Total: ${resultado.interesTotal}</p>

                    <h4>Tabla de Amortización:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Mes</th>
                                <th>Pago de Interés</th>
                                <th>Pago de Principal</th>
                                <th>Saldo Restante</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultado.amortizacion.map((item) => (
                                <tr key={item.mes}>
                                    <td>{item.mes}</td>
                                    <td>${item.interesPago}</td>
                                    <td>${item.principalPago}</td>
                                    <td>${item.saldoRestante}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default CalculadoraPrestamo;
