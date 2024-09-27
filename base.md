## Les bases

Souvenez-vous de ma présentation sur Three.js, pour afficher quelque chose sur notre écran, nous avons besoin de 4 éléments.

- Un scène qui contiendra des objets
- Des objets
- Une caméra
- Un “renderer”

### La scène

La scène est comme un containeur. Nous ajoutons nos objets, modèles, particules, lumières etc à l’intérieur de cela et à un moment, on demande à Three de render cette scène. 

Pour créer une scène, on utilise la classe `Scene` 

```jsx
import * as THREE from 'three'

const scene = new THREE.Scene()
```

### Les objets

Les objets peuvent être tout et n’importe quoi. Ils peuvent être des géométries primitives (comme un cube, une sphère, etc), un modèle importé (souvent importé de Blender), des particules, de la lumière …

Pour les bases, on va commencer avec une forme simple, comme dans la présentation, mais cette fois-ci vous allez le faire vous-même. 

Pour créer ce cube rouge, nous avons besoin de créer un type d’objet nommé `Mesh` , une Mesh est une combinaison d’une géométrie (la forme) et un matériaux (ce à quoi il ressemble, la “texture”).

Il existe toutes sortes de géométrie et de matériaux, mais pour ce premier test, nous allons commencer simple avec une `BoxGeometry` et une `MeshBasicMaterial` .

```jsx
import * as THREE from 'three'

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1,1,1)
```

Pour créer le matériaux, nous avons besoin de la classe `MeshBasicMaterial`  avec un paramètre, un objet `{}` contenant toutes les options. Ici pour notre cube rouge, nous avons juste besoin de spécifier la couleur.

Il y a plusieurs possibilités pour envoyer la couleur dans Three.js. La première possibilité est d’envoyer un hexadécimal JS `0xff0000` ou bien un hexadécimal sous forme de string `'#ff0000'` , ou bien le nom de la couleur comme `'red'` .

```jsx
import * as THREE from 'three'

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color : 0xff0000})
```

Comme spécifier plus haut, une `Mesh` est une combinaison d’un matériaux et d’une géométrie. 
Donc … On utilise la classe `Mesh`  qui prend 2 paramètres : `geometry`  et `material` 

```jsx
import * as THREE from 'three'

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color : 0xff0000})
const mesh = new THREE.Mesh(geometry, material)
```

Relisez un peu ce que j’ai dit précédemment pour la scène … 
”La scène est comme un containeur. Nous ajoutons nos objets, modèles, particules, lumières etc ….”

Nous avons créer notre objet, mais si nous ne l’AJOUTONS pas à la scène, il ne sera jamais affiché. 

Pour ce faire, nous utilisons la méthode `add()` qui est accessible sur la classe `Scene` .

```jsx
import * as THREE from 'three'

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color : 0xff0000})
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)
```

### La caméra

La caméra n’est pas visible. C’est plus comme un point de vue théorique. Comme si on se plaçait sur la scène et qu’on observait ce qu’il se passait. 

Nous pouvons avoir plusieurs caméras, mais la plupart du temps, nous n’en aurons que une seule que l’on déplacera pour créer une dynamique.

Comme pour le reste, il existe une multitude de type de caméra, mais pour cet exercice, nous utiliserons la plus basique : `PerspectiveCamera` .

Pour cette classe, il y a 2 paramètres essentiels à fournir : 

- Le champs de vision (fov) : Le champ de vision est l'étendue de l'angle de vision. Si vous utilisez un très grand angle, vous pourrez voir dans toutes les directions à la fois, mais avec beaucoup de distorsion, car le résultat sera dessiné sur un petit rectangle. Si vous utilisez un petit angle, vous aurez l'impression de zoomer. Le champ de vision (ou fov) est exprimé en degrés et correspond à l'angle de vision vertical. Pour cet exercice, nous utiliserons un angle de 75 degrés.
    
[fov](./assets/base/fovWorkshop.mp4)
    
- le ratio d’aspect (aspect ratio) : dans la plupart des cas, il s’agit de la largeur du canvas divisé par sa hauteur. Nous allons créer un objet `sizes` dans lequel on va spécifier la largueur et l’hauteur du canvas dans lequel on va render.

```jsx
import * as THREE from 'three'

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color : 0xff0000})
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

// Sizes

const sizes = {
	width : 800, 
	height: 600
}

// Camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
scene.add(camera)
```

### Le Renderer

Nous allons simplement demander au moteur de rendu de rendre notre scène du point de vue de la caméra, et le résultat sera dessiné dans un canevas. Vous pouvez créer le canevas vous-même ou laisser le moteur de rendu le générer et l'ajouter ensuite à votre page. Pour cet exercice, nous ajouterons le canevas au code HTML et l'enverrons au moteur de rendu.

Dans `index.html` , on va y écrire une balise `<canvas>` à laquelle on va y mettre une class `webgl` par exemple :

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <canvas class="webgl"></canvas>
    <script type="module" src="/main.js"></script>
  </body>
</html>

```

Retour à notre fichier `main.js` , au début de notre code, on va créer une variable qui contient notre balise canvas grâce à un `querySelector` .

```jsx
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

// Objet
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color : 0xff0000})
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

// Sizes

const sizes = {
	width : 800, 
	height: 600
}

// Camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
scene.add(camera)
```

Pour créer le renderer, nous allons encore une fois utiliser la classe correspondantes qui prend un paramètre, un obj `{}`  dans lequel on spécifie notre canvas.

Nous avons également besoin de spécifier la taille du renderer avec la méthode `setSize()`  en utilisant l’objet `sizes` créer plus tôt.

```jsx
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

// Objet
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color : 0xff0000})
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

// Sizes

const sizes = {
	width : 800, 
	height: 600
}

// Camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
scene.add(camera)

// Renderer

const renderer = new THREE.WebGLRenderer({
	canvas : canvas
})
renderer.setSize(sizes.width, sizes.height)
```

### Premier rendu

Il est temps de voir notre travail, appelons la méthode `render()`  sur le renderer et on y envoie deux paramètres, la scène et la caméra. 

```jsx
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

// Objet
const geometry = 
const material = new THREE.MeshBasicMaterial({color : 0xff0000})
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

// Sizes

const sizes = {
	width : 800, 
	height: 600
}

// Camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
scene.add(camera)

// Renderer

const renderer = ne THREE.WebGLRenderer({
	canvas : canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
```

Alors satisfait ? :D

Le soucis que l’on rencontre ici, c’est qu’on a spécifié aucune position, que ce soit pour l’objet ou pour la caméra. En fait, les deux sont à la position “par défaut” qui se trouve au centre de la scène et nous ne pouvons pas voir un objet de l’intérieur.  

On a besoin de bouger quelque chose.

Pour ce faire, nous avons accès à plusieurs propriétés sur chaque objet comme `position` , `rotation` , `scale` .

La propriété `position`  est un objet avec 3 propriétés : X, Y et Z. 

Pour bouger la caméra en arrière, on a besoin donner une valeur positive à l’axe Z.

On peut faire ceci n’importe où dans le code à partir du moment où l’on a créé la variable `camera` , et avant qu’on l’on fasse le renderer.

Ici, nous allons la place juste après la création de la caméra : 

```jsx
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

// Objet
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color : 0xff0000})
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

// Sizes

const sizes = {
	width : 800, 
	height: 600
}

// Camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer

const renderer = new THREE.WebGLRenderer({
	canvas : canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
```

### Création d’une animation

Pour créer une animation, il s’agit d’une fonction dans laquelle nous allons faire quelque chose et faire un render après chaque boucle.

Il existe une méthode dans JavaScript qui permet de faire ceci : `window.requestAnimationFrame()` .

L'objectif premier de requestAnimationFrame n'est pas d'exécuter du code à chaque image.

requestAnimationFrame exécutera la fonction que vous lui fournissez sur l'image suivante. Mais si cette fonction utilise également requestAnimationFrame pour exécuter cette même fonction à la prochaine image, votre fonction sera exécutée à chaque image pour toujours, ce qui est exactement ce que nous voulons.

Créons cette fonction, que l’on va nommer `tick`  et ensuite l’appeler. 

```jsx
// Animation

const tick = () => {
	console.log("tick")
	window.requestAnimationFrame(tick)
}

tick()
```

Regardez dans votre console, nous avons une boucle infinie.

Si nous testons ce code dans un ordinateur avec une très bonne config(high frame rate), nous verrons `'tick'` apparaitre plus souvent que sur un ordinateur moins performant. Cela peut-être problématique car cela veut dire que l’un aura une animation plus rapide ou plus lente suivant son pc. Il existe des solutions plus ou moins compliquée qui se basent sur un timer, mais dans cette démonstration, nous n’allons pas l’aborder. 

Si vous êtes curieux de savoir cette méthode, je suis ouvert pour en discuter avec vous. 

Retournons à notre fonction `tick()` …

Si l’on veut que notre forme tourne sur un certain axe, il suffit d’utiliser la propriété `rotation` suivi de l’axe sur lequel on veut qu’il tourne, et on incrémente la valeur à chaque tick.

```jsx
// Animation

const tick = () => {
	// Update de l'objet
	mesh.rotation.y += 0.01
	
	// On déplace le render dans la fonction pour que à chaque frame, on réaffiche l'objet avec sa position modifiée
	renderer.render(scene, camera)
	
	// On appelle tick sur la prochaine frame
	window.requestAnimationFrame(tick)
}

tick()
```

Félicitations ! Tu as maintenant un cube rouge qui tourne sur lui-même. TROP FORT ! 

### A vous de jouer !

Grâce à la documentation officielle (https://threejs.org/docs/), choisissez une forme, restez sur un material basique (`MeshBasicMaterial` ) et ajoutez-y simplement la couleur que vous souhaitez comme dans l’exemple.

Dans un premier temps, affichez simplement la forme à l’écran. 

C’est fait ?
Animons un peu cette forme, faites vos tests.