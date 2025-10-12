from flask import Flask, render_template, request

app = Flask(__name__)

# ================================
# 🌐 RUTAS PRINCIPALES
# ================================

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/coleccion')
def coleccion():
    selected_category = request.args.get('category', default=None)
    return render_template('categories.html', selected_category=selected_category)

@app.route('/ofertas')
def ofertas():
    """Página de ofertas, con soporte opcional para filtros"""
    category = request.args.get('category')
    return render_template('ofertas.html', selected_category=category)

@app.route('/contacto')
def contacto():
    """Página de contacto"""
    return render_template('contacto.html')

@app.route('/cuenta')
def cuenta():
    """Página de cuenta del usuario"""
    return render_template('mi-cuenta.html')


# ================================
# 🛒 RUTAS DE COMPRA / USUARIO
# ================================

@app.route('/carrito')
def carrito():
    """Carrito de compras"""
    return render_template('cart.html')

@app.route('/registro')
def registro():
    """Registro de nuevos usuarios"""
    return render_template('register.html')

@app.route('/checkout')
def checkout():
    """Página de checkout / pago"""
    return render_template('checkout.html')

@app.route('/confirmacion-compra')
def confirmacion_compra():
    """Confirmación después de la compra"""
    return render_template('purchase_confirmation.html')

@app.route('/estado-pedido')
def estado_pedido():
    """Estado del pedido"""
    return render_template('estado-pedido.html')

@app.route('/gracias')
def gracias():
    """Página de agradecimiento final"""
    return render_template('gracias.html')


# ================================
# 🧪 INICIO DE LA APP
# ================================
if __name__ == '__main__':
    app.run(debug=True)
