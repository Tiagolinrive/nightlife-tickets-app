# NightMarket MVP

Marketplace mínimo viable para boliches y entradas digitales.

## Objetivo

Unificar boliches en una sola app donde:
- los boliches publican sus eventos y entradas,
- los clientes encuentran eventos cercanos y compran online,
- la app cobra una pequeña comisión por venta,
- cada ticket genera un QR para validación en puerta.

## Stack recomendado en este MVP

- Node.js + Express
- HTML + CSS + JavaScript
- Base de datos en memoria para desarrollo
- API REST para eventos, boliches y checkout

## Funcionalidades incluidas

- landing page para la app
- listado de boliches y eventos
- filtro por estilo musical
- compra de entradas con checkout simple
- panel del boliche con login y dashboard básico
- creación de eventos por parte del boliche
- cálculo de comisiones y métricas

## Cómo correr

```bash
npm install
npm start
```

Abrir en:

```bash
http://localhost:3000
```

Panel del boliche:

```bash
http://localhost:3000/club-dashboard.html
```

Credenciales demo:

- Email: praia@nightmarket.app
- Password: boliche123

> Ajustar el email real según el boliche durante desarrollo.

## Roadmap del MVP

1. Registro y login de boliches
2. Publicación de eventos
3. Compra de tickets
4. QR y validación de ingreso
5. Comisiones y liquidación
6. Panel admin y métricas avanzadas
7. Integración con Mercado Pago y base de datos real

## Estructura de archivos

```text
.
├── public/
│   ├── app.js
│   ├── club-dashboard.html
│   ├── index.html
│   └── styles.css
├── .gitignore
├── package.json
├── README.md
├── server.js
└──
```
