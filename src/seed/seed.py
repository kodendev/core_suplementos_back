from sqlalchemy import create_engine
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import sessionmaker
import json
import os
from datetime import datetime

# Configuración de la base de datos (PostgreSQL)
DATABASE_URL = "postgresql://user:password@localhost:5432/mydatabase"

# Crear el motor de conexión
engine = create_engine(DATABASE_URL)

# Reflejar las tablas existentes
Base = automap_base()
Base.prepare(engine, reflect=True)

# Mapear las tablas
try:
    Category = Base.classes.category
    Product = Base.classes.product
    User = Base.classes.user
except AttributeError as e:
    print("Error: No se encontraron una o más tablas en la base de datos. Verifica que existan 'category', 'product', y 'user'.")
    raise e

# Crear una sesión
Session = sessionmaker(bind=engine)
session = Session()

# Función para leer un archivo JSON
def read_json_file(filename):
    file_path = os.path.join(os.path.dirname(__file__), "data", filename)
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"El archivo {file_path} no se encuentra.")
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)

# Función para cargar los datos
def seed_database():
    try:
        print("Iniciando la carga de datos...")

        # Leer los JSON
        categories = read_json_file('categories.json')
        products = read_json_file('products.json')
        users = read_json_file('users.json')

        # Insertar categorías
        for category_data in categories:
            category = {
                'name': category_data['name'],
                'description': category_data['description'],
                'isActive': category_data['isActive']
            }
            session.merge(Category(**category))
        session.commit()
        print("Categorías insertadas.")

        # Insertar productos
        for product_data in products:
            product = {
                'name': product_data['name'],
                'description': product_data['description'],
                'smallDescription': product_data['smallDescription'],
                'smallDescriptionOne': product_data['smallDescriptionOne'],
                'smallDescriptionTwo': product_data['smallDescriptionTwo'],
                'smallDescriptionThree': product_data['smallDescriptionThree'],
                'priceUnit': product_data['priceUnit'],
                'stockQuantity': product_data['stockQuantity'],
                'createdAt': datetime.fromisoformat(product_data['createdAt'].replace('Z', '+00:00')),
                'updatedAt': datetime.fromisoformat(product_data['updatedAt'].replace('Z', '+00:00')),
                'isActive': product_data['isActive'],
                'categoryId': product_data['categoryId'],
                'image': product_data['image']
            }
            session.merge(Product(**product))
        session.commit()
        print("Productos insertados.")

        # Insertar usuarios
        for user_data in users:
            user = {
                'name': user_data['name'],
                'email': user_data['email'],
                'passwordHash': user_data['passwordHash'],
                'role': user_data['role'],
                'status': user_data['status'],
            }
            session.merge(User(**user))
        session.commit()
        print("Usuarios insertados.")

        print("Carga de datos completada.")

    except Exception as e:
        print(f"Error al cargar los datos: {e}")
        session.rollback()
    finally:
        session.close()

if __name__ == "__main__":
    seed_database()