# Ejecutar y depurar en VS Code con launch.json

El código se puede ejecutar y depurar en VS Code. Para iniciar la ejecución o la
depuración de la aplicación web mediante `Live Server`, en el `Explorador` de
archivos seleccionaremos la página web index.html, haremos clic con el botón
derecho del ratón y seleccionaremos la opción `Open with Live Server`:

![iniciar el servidor](doc/start.avif)

Pasos para depurar la aplicación web:

1. Abre la pestaña `Run and Debug` de VS Code.
2. Selecciona `Launch Chrome` en la lista desplegable superior.
3. Presiona F5 per iniciar la depuración o al botón que hay junto la lista desplegable superior.

Pasos recomendados en la depuración:

1. Añade breakpoints en el margen izquierdo en el código JavaScript que quieras depurar.
2. Intenta alcanzar la acción que quieres depurar interactuando con la página web en el navegador.
3. Utiliza los controles de depuración:
   - Continue (F5)
   - Step Over (F10)
   - Step Into (F11)
   - Step Out (Shift+F11)
4. Revisa el valor de les variables en panel `VARIABLES` o en el panel `DEBUG CONSOLE`.

![imagen de depuración](doc/debug.avif)