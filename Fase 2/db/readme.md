Para hacer un restore de la base de datos de la APP

1.- Abrir pgAdmin 4.

2.- Conectarse a su servidor local (ej. localhost, puerto 5432).

3.- Crear una base vacía (opcional, si el dump no tiene CREATE DATABASE):

  - Clic derecho en Databases → Create → Database...

  - Nombre: el que prefieras (por ejemplo, mi_base).

  - Guardar.

4.- Luego clic derecho en esa base (o en Databases si el dump ya crea la base) → Restore...

5.- En la ventana:

  - Format: Custom or tar.

  - Filename: seleccionar el .backup que le enviaste.

  - En Options → Restore Options #1, marcar:

    - ✅ Clean before restore (para limpiar si ya hay datos, opcional).

  - En Restore Options #2, puede marcar:

    - ✅ Create Database (si el backup incluye la instrucción para crearla).

6.- Hacer clic en Restore y esperar.

7.- Una vez terminado, podrá ver todas las tablas, datos, relaciones, etc., en el panel izquierdo.
