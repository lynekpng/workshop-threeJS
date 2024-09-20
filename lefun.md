## Amusons-nous un peu …

### Ajoutons quelques objets autour de notre texte

Pour ce faire, on va créer un donut mais a l’intérieur d’une boucle.

Dans la fonction de succès, juste après la partie sur le texte, on va ajouter une boucle `for` .

```jsx
for( let i = 0, i<20; i++){

}
```

Dans cette boucle, on va y ajouter une géométrie appelée `TorusGeometry` . 

```jsx
for( let i = 0, i<20; i++){
	const donutGeometry = new THREE.TorusGeometry(0.3,0.2,20,45)
	const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
	const donut = new THREE.Mesh(donutGeometry, donutMaterial)
	scene.add(donut)
}
```

On devrait avoir 20 donuts à la même place.

On va ajouter un peu d’hasard pour leur position :

```jsx
donut.position.x = (Math.random() - 0.5) * 10
donut.position.y = (Math.random() - 0.5) * 10
donut.position.z = (Math.random() - 0.5) * 10
```

On va faire aussi un peu de random dans leur rotation pour les faire aller dans tout les sens.

```jsx
donut.rotation.x = Math.random() * Math.PI
donut.rotation.y = Math.random() * Math.PI
```

Pas besoin de faire sur les 3 axes, et comme le donut est symétrique, la demi d’une révolution (Math.PI) est suffisante.

Enfin, nous allons faire en sorte que chaque donut aie une taille différente. Attention ! Si l’on ne veut pas que nos donut soit difformes, il faut utiliser la même valeur pour X, Y et Z.

```jsx
const scale = Math.random()
donut.scale.set(scale, scale, scale) 
```

### Optimisation

A l’heure actuelle, ce n’est pas très optimisé … On appelle plusieurs fois la classe `TorusGeometry` et le `material` à chaque boucle alors que ce n’est pas nécessaire.

Bougeons `donutGeometry` et `donutMaterial` en dehors de la boucle.

```jsx
const donutGeometry = new THREE.TorusGeometry(0.3,0.2,20,45)
const donutMaterial = new THREE.MeshMatcapMaterial({ matcap : matcapTexture })

for(let i = 0, i<20, i++){
	//...
}
```

On peut encore aller plus loin … Le donut et le texte utilise le même `material` . Supprimons le `donutMaterial` et on renomme le `textMaterial` par `material` et on l’utilise dans les deux.

```jsx
const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
                
// ...

const text = new THREE.Mesh(textGeometry, material)

// ...

for(let i = 0; i < 100; i++)
{
    const donut = new THREE.Mesh(donutGeometry, material)
    
    // ...
}
```

Si vous voulez aller plus loin, on peut ajouter d’autres formes, en animer etc.