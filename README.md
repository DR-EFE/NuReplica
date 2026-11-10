# Nubank Mobile Clone (Frontend UI) — React Native & Expo SDK 58

Clon visual pixel-perfect de la aplicación móvil de **Nubank** (Modo Oscuro OLED), construido en base a capturas de pantalla de la app en producción con el sistema de diseño **NuDS (Violet Design System)**.

---

## 📱 Tecnologías Utilizadas

- **Expo SDK 58** (Última versión estable).
- **React Native 0.88**.
- **Expo Router** (Navegación basada en archivos).
- **TypeScript** (Tipado estricto con 0 errores).
- **NuDS Tokens** (Paleta de color y geometrías oficiales de Nubank).
- **Expo Go Ready** (Sin dependencias nativas bloqueantes ni prebuild).

---

## 🚀 Instrucciones de Ejecución

### 1. Clonar e Instalar Dependencias
```bash
npm install
```

### 2. Iniciar el Servidor de Desarrollo
```bash
npx expo start
```

### 3. Probar en Dispositivo Físico con Expo Go
1. Instala la app **Expo Go** desde Google Play Store (Android) o App Store (iOS).
2. Asegúrate de que tu teléfono y tu computadora estén conectados a la misma red Wi-Fi (o usa el modo túnel `npx expo start --tunnel`).
3. Abre Expo Go y escanea el código QR que aparecerá en tu terminal o en la interfaz web de Metro.

---

## 🎨 Flujos y Pantallas Implementadas

### 0. Pantalla de Inicio / Bloqueo Biométrico (`/`)
- Recreación 1:1 de la pantalla de inicio oficial de Nubank (`11_lock_screen.jpg`):
  - Fondo morado oscuro de seguridad (`#530789`).
  - **Logotipo oficial `nu` en blanco**: Renderizado vectorial exacto desde el archivo `src/img/NU.D.svg`.
  - Icono de teléfono con candado (`cellphone-lock`).
  - Mensaje de seguridad: *"Hola, Felipe, por tu seguridad cerramos la sesión cuando hay 5 minutos de inactividad."*
  - **Petición automática de huella**: Al cargar la pantalla invoca automáticamente el escáner biométrico nativo con `expo-local-authentication`.
  - Botón píldora blanco: *"Ingresar con rostro o huella"*.
  - Botón secundario en texto: *"Ingresar con contraseña"*.
  - Pie institucional: *"Nubank S.A., Institución de Banca Múltiple"*.

### 1. Pantalla Principal (Home / Dashboard) (`/home`)
  - Avatar circular con icono de perfil y badge morado `#820AD1` en la esquina superior derecha.
  - Saludo personalizado: `"Hola, F..."`.
  - Iconos de acción: Ojo interactivo (para ocultar/mostrar saldo), Centro de ayuda (`?`) e Invitar amigos.
- **Banner promocional**:
  - Banner morado característico con icono de regalo y mensaje de beneficios MSI y Nuvi.
- **Cuenta Nu de Débito**:
  - Saldo disponible dinámico sincronizado con el saldo inicial de `$1,000,000.00`.
  - Al presionar conduce a la pantalla completa de **Detalle de Cuenta Nu de Débito** (`/account/debit`).

### 1.1 Detalle de Cuenta Nu de Débito (`/account/debit`)
- Recreación exacta de la captura `12_debit_detail.jpg`:
  - **Header**: Flecha de regreso `<` y botón de ayuda `?`.
  - **Saldo disponible**: Monto en blanco grande (`34px`), sincronizado en tiempo real con el backend de transferencias.
  - **Sección "Dinero en tus Cajitas"**: Saldo sincronizado mayor a $100k (`$285,420.76`) y rendimiento verde `↑ $24,850.50`, que conduce a `/account/cajitas`.
  - **Carrusel de Acciones Rápidas (4 botones circulares)**:
    1. *Recibir y depositar* (icono `cash-plus`).
    2. *Transferir* (icono `cash-minus`, enlaza al flujo `/transfer/recipient`).
    3. *Pagar servicios* (icono de factura).
    4. *Recargar celular* (icono de teléfono).
  - **Banner índigo oficial (`#272B6B`)**: *"¡Nunca más olvides un pago!"* con texto explicativo e icono de recibo.
  - **Sección "Movimientos"**:
    - Barra de búsqueda con icono de lupa y placeholder *"Buscar"*.
    - Lista de movimientos con compensación inicial de Nu (`+$0.01` verde) e historial de transferencias enviadas en tiempo real.

### 1.2 Pantalla de Cajitas Nu (`/account/cajitas`)
- Recreación fiel de la captura `13_cajitas.jpg`:
  - **Bloque superior morado profundo (`#27114A`)**:
    - Total en Cajitas aumentado mayor a $100 mil: **`$285,420.76`**.
    - Rendimiento acumulado con flecha hacia arriba verde NuDS: **`↑ $24,850.50`** e icono de ayuda `?`.
  - **Cuerpo inferior negro OLED**:
    - **Cajita Turbo 🚀**: Saldo mayor a 100k de **`$165,000.00`**, badge de tasa fija del **`13.00%`** y rendimiento acumulado de **`↑ $18,420.35`**.
    - **Mi primera Cajita**: Saldo mayor a 100k de **`$120,420.76`**, badge de tasa del **`6.50%`** y rendimiento acumulado de **`↑ $6,430.15`**.
  - **Botón Flotante de Acción (FAB `+`)**: Botón circular morado `#820AD1` en la esquina inferior derecha para crear nuevas Cajitas.
- **Carrusel de Acciones Rápidas**:
  - Botones circulares con iconos: *Recibir y depositar*, *Transferir*, *Simular préstamo* (con badge morado `$26,000`), *Disponer de saldo* (con badge morado `$13,600`).
- **Tarjeta de Crédito**:
  - Saldo a favor: `$4.39`.
  - Límite disponible: `$13,604.39`.
  - Pago automático: `"Activado"` (indicador en verde `#1AAE5C`).
  - Botón píldora: `"Diferir compras"`.
- **Cápsula "Mis tarjetas"**:
  - Acceso directo a administración de tarjetas.

### 2. Flujo de Transferencia

#### Paso 1: Selección de Destinatario (`/transfer/recipient`)
- Botón de cierre `✕` en el header.
- Título `"¿A quién le envías dinero?"` y subtítulo explicativo.
- Campo de búsqueda interactivo `"Escribe aquí"` con underline sutil.
- Leyenda explicativa sobre el guardado automático de contactos.
- Lista completa de contactos con iniciales circulares en gris oscuro (`BY`, `HY`, `MR`, `NM`):
  - *BBVA YO* (BBVA MEXICO – CLABE ••••7922)
  - *HeyBanco Yo* (BANREGIO – CLABE ••••7076)
  - *Miriam Ramos* (AZTECA – Débito ••••3384)
  - *nueva mercado* (Mercado Pago W – CLABE ••••3778)

#### Paso 2: Ingreso de Monto y Origen (`/transfer/amount`)
- Botón de retroceso `<`.
- Detalle del destinatario: `Transferir a: Ramos Velázquez Felipe`.
- Visualizador de monto grande: `$ 0.00` con chips rápidos para simular exactamente los `$0.01` de la captura.
- Teclado numérico táctil en pantalla integrado.
- Selector visual de origen:
  - **Cuenta de débito**: Saldo `$0.01` (adquiere borde morado `#820AD1`, icono y título morados cuando se selecciona).
  - **Tarjeta de crédito**: Con badge superior `"A 12 meses"`.
- Botón píldora inferior `"Continuar con la cuenta"` (activo al tener monto > 0).

#### Paso 3: Confirmación de Envío (`/transfer/confirm`)
- Título `"Estás a punto de enviar"`.
- Bloque de origen con monto `$0.01`, `"Cuenta de débito"` e icono de lápiz editable morado.
- Línea divisoria central con flecha hacia abajo `↓`.
- Información del receptor:
  - Destinatario en color morado claro: `"Ramos Velázquez Felipe"`.
  - Banco: `"BBVA MEXICO"`.
  - CLABE: `"0121 8001 5025 927922"`.
- Bloque de metadata:
  - **Cuándo**: `"Ahora, sin repetir"` con icono de calendario.
  - **Mensaje**: `"Agrega un mensaje"` con botón `+`.
  - **Número de referencia**: `"81126"` con icono de lápiz.
- **Barra inferior sticky**: Saldo `$0.01`, leyenda `"Esta transferencia es gratuita"` y botón de confirmación `"Continuar"` en color morado NuDS. Al pulsar continúa a la pantalla de NIP.

#### Paso 4: Ingreso de NIP de Seguridad (`/transfer/pin`)
- Flecha atrás `<` en header.
- Título `"Cuenta Nu"` en morado `#820AD1` y encabezado `"Ingresa tu NIP"`.
- Tarjeta virtual/física Nu morada asomándose detrás de un bloque de seguridad oscuro.
- 4 puntos de seguridad (dots) que se completan al presionar el teclado numérico integrado.
- Texto explicativo: *"Es el número de 4 dígitos con el que autorizas transferencias en tu Cuenta Nu."*
- Al completar los 4 dígitos avanza automáticamente a la pantalla de procesamiento.

#### Paso 5: Pantalla de Carga y Progreso Secuencial (`/transfer/processing`)
- Fondo negro OLED puro.
- Estados progresivos dinámicos:
  1. *"Transferencia en camino..."* con barra morada al 35%.
  2. *"Preparando el comprobante..."* con barra al 72%.
  3. *"¡Listo!"* con barra completa al 100%.
- Transición suave a la pantalla final.

#### Paso 6: Confirmación de Envío Exitoso (`/transfer/success`)
- Botón de cierre `✕` en el header.
- Ilustración gráfica con las 3 monedas diagonales ascendentes y el círculo verde `#1AAE5C` con checkmark `✓`.
- Título `"¡Listo! Enviaste tu dinero"`.
- Monto destacado: `"$0.01"` y leyenda `"Para Ramos Velázquez Felipe"`.
- Fila de **Estatus**: `"Aceptada"`.
- Fila de **CEP Banxico**: `"Verifica el estatus"` con chevron `>`.
- Botón inferior píldora morado `"Abrir comprobante"` que conduce a la pantalla de comprobante oficial.

#### Paso 7: Comprobante Oficial en Formato de Tira Larga (`/transfer/receipt`)
- Recreación exacta de la captura de comprobante tipo ticket/tira vertical (aspect ratio ~1:4.43, equivalente al formato 289x1280):
  - Fondo blanco `#FFFFFF` estilo documento bancario.
  - Gran espaciado en blanco entre párrafos y secciones (bloque principal $\rightarrow$ Cuenta destino $\rightarrow$ Cuenta origen $\rightarrow$ Footer gris).
  - Logotipo tipográfico `"nu"` en grafito `#262626`.
  - Sello de autorización oficial con fecha y hora CDMX en tiempo real.
  - Bloque Cuenta destino con nota *"Dato no verificado por Nu"*, CLABE y clave de rastreo SPEI.
  - Bloque Cuenta origen con CLABE.
  - Bloque inferior gris claro (`#F4F4F6`) con razón social `Nubank S.A., Institución de Banca Múltiple`, referencia interna UUID y enlace *"Más información →"*.
  - **Exportación y Compartición de Imagen de la Tira**: Integra `react-native-view-shot` y `expo-sharing` para capturar la tira vertical completa en alta resolución (Full Height) y compartir directamente el archivo de imagen PNG en WhatsApp, fotos o email como en la app oficial de Nubank.

---

## 💰 Backend Simulado y Gestión de Saldo (`AccountContext`)

- **Saldo inicial**: **$1,000,000.00 MXN** (Un millón de pesos) en la *"Cuenta Nu de Débito"*.
- **Descuento dinámico**: Cada transferencia realizada (ej. `$0.01` o el monto que el usuario ingrese) se descuenta automáticamente del saldo en tiempo real (`$999,999.99`).
- **Persistencia reactiva**: El saldo se actualiza de forma sincronizada e inmediata en el Home, en el selector de cuentas de origen y en los comprobantes bancarios.
- **Generador de comprobantes**: Crea folios alfanuméricos únicos, sellos de tiempo CDMX y claves de rastreo oficiales SPEI.

---

## 🗂️ Estructura del Código

```text
src/
├── app/                      # Rutas de Expo Router
│   ├── _layout.tsx           # Configuración del Stack y StatusBar
│   ├── index.tsx             # Ruta principal -> HomeScreen
│   └── transfer/             # Sub-rutas del flujo de transferencia
│       ├── recipient.tsx     # Paso 1: Selección de contacto
│       ├── amount.tsx        # Paso 2: Monto y cuenta origen
│       └── confirm.tsx       # Paso 3: Confirmación y comprobante
├── components/               # Componentes reutilizables NuDS
│   ├── NuButton.tsx          # Botón píldora característico
│   ├── NuHeader.tsx          # Header con flecha atrás o botón 'X'
│   ├── NuHomeHeader.tsx      # Header de la pantalla Home con avatar y toggle
│   ├── NuPromoBanner.tsx     # Banner de recompensas con icono de regalo
│   ├── NuDebitCard.tsx       # Sección de cuenta de débito
│   ├── NuCreditCard.tsx      # Sección de tarjeta de crédito
│   ├── NuQuickActions.tsx    # Carrusel horizontal de acciones con badges
│   ├── NuContactItem.tsx     # Item de contacto con iniciales circulares
│   └── NuAccountCardSelect.tsx # Cards interactivas de cuenta débito/crédito
├── mock/
│   └── data.ts               # Datos simulados (usuario, saldos, contactos)
└── theme/                    # Tokens de diseño oficiales (NuDS)
    ├── colors.ts             # Paleta morados, negros OLED y acentos
    ├── typography.ts         # Pesos y tamaños de fuente
    ├── spacing.ts            # Espaciados y radios de borde oblongos
    └── index.ts              # Exportador unificado
```

---

## ℹ️ Nota sobre Mock Data y Frontend Puro

- Este proyecto es **100% frontend offline**: no realiza llamadas a APIs reales, no se comunica con servicios bancarios ni persiste datos en bases de datos externas.
- Toda la información mostrada (saldos, tarjetas, límites, contactos y transferencias) se encuentra simulada de forma local y declarativa en `src/mock/data.ts`.
- Las navegaciones transmiten los datos requeridos a través de parámetros de ruta de Expo Router.
