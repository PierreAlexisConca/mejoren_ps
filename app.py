from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/carrito')
def carrito():
    return render_template('cart.html')

@app.route('/registro')
def registro():
    return render_template('register.html')

@app.route('/checkout')
def checkout(): # CORREGIDO: El nombre de la función ahora es 'checkout' para coincidir con url_for.
    return render_template('checkout.html')

@app.route('/confirmacion-compra')
def confirmacion_compra():
    # Aquí podrías pasar información del pedido si la tuvieras
    return render_template('purchase_confirmation.html')

@app.route('/estado-pedido')
def estado_pedido():
    # Aquí podrías pasar el ID del pedido o el estado actual desde tu lógica de negocio
    return render_template('estado-pedido.html')

# Si tienes otras categorías o páginas específicas, también las añadirías aquí
@app.route('/coleccion')
def coleccion(): # CORREGIDO: El nombre de la función ahora es 'coleccion' para coincidir con url_for.
    return render_template('categories.html') # Asumiendo que tendrás una página de categorías más detallada

@app.route('/ofertas')
def ofertas():
    return render_template('ofertas.html') # Asumiendo que tendrás una página de ofertas más detallada

# Ruta para la página de contacto (Esta ya estaba bien)
@app.route('/contacto')
def contacto():
    return render_template('contacto.html')

# Ruta para la página de agradecimiento
@app.route('/gracias')
def gracias():
    return render_template('gracias.html')

# Ruta para la página de estado del pedido
@app.route('/cuenta')
def cuenta(): # El nombre de la función es 'cuenta', que usaremos en el HTML.
    return render_template('mi-cuenta.html')

if __name__ == '__main__':
    app.run(debug=True)
