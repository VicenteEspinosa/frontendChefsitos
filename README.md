# Frontend RecipeLib

## Como correr el contenedor Docker

Ejecute los siguientes comandos:

```bash
docker build -t recipelib-frontend .
docker run -p 3000:3000 recipelib-frontend
```

El frontend estará corriendo en [http://localhost:3000](http://localhost:3000)

## Ejecutar localmente

```bash
cd recipelib-frontend
npm run dev
# or
yarn dev
```

Abrir [http://localhost:3000](http://localhost:3000) con el buscador para ver el proyecto.

## Habilitar Pre-commits

```bash
npx husky install
```

## VSC autocorrect

Instalar extensiones de eslint y prittier
