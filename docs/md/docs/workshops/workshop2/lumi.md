# Iluminación global

## ¿Qué es la iluminación global de todos modos?
La iluminación global es muy sencilla de simular pero al mismo tiempo es muy costosa por esto el problema está en hacerlo de una manera eficiente que consuma la menor cantidad de recursos posibles.
Primero definamos que es la iluminación global para esto tenemos que saber cómo somos capaces de observar las cosas, este proceso es posible gracias a que percibimos la luz que rebota en los objetos, este rebote puede ser de dos formas:
directa: cuando el objeto rebota directamente la luz de la fuente.

O indirecta: cuando la luz rebota antes en otros objetos y luego en el que vemos, esto hace que aunque no le llegue luz directamente de la fuente no se vea totalmente oscuro.

<p align="center">
  <img width="750" height="300" src="https://www.scratchapixel.com/images/upload/shading-intro2/shad2-globalillum3.png?">
</p>

La iluminación global entonces consiste en simular correctamente ambos tipos de iluminación, esto es muy importante para el renderizado realista de una imagen por esto se podría 	pensar que un sistema de iluminación global es imprescindible en una herramienta de renderizado sin embargo al ser tan costosa casi no se ve en los renderizados a tiempo real.
Es muy complicado encontrar un solución genérica debido a que los rayos de luz pueden interactuar de diversas maneras con diversos materiales antes de ser captados por el ojo, un ejemplo sería que el rayo se refleje en una superficie difusa, luego en un vaso de agua (lo cual lo refracta y le da un ligero cambio de dirección), luego golpee una superficie metálica y finalmente llegue al ojo. Cómo estas hay una infinidad de combinaciones posibles. El camino desde la fuente hasta el ojo se denomina camino de luz, desde un punto de vista matemático sabes cómo se comporta este camino de luz gracias a leyes cómo la reflexión y la refracción entre otras, por lo tanto simular estas trayectorias es algo posible para una computadora, entonces nos encontramos con que el rastreo hacia adelante es muy ineficiente, simular desde la fuente hacia el ojo, actualmente se prefiere el rastreo hacia atrás que es muy eficaz para simular la iluminación directa en cualquier caso pero no siempre para una iluminación indirecta.

<img style="float: left;" src="https://www.scratchapixel.com/images/upload/shading-intro2/shad2-globalillum1.png?" width="350" height="300">

<p align="left">
  <img width="350" height="300" src="https://www.scratchapixel.com/images/upload/shading-intro2/shad2-globalillum1a.png?">
</p>

La iluminación directa consiste principalmente en proyectar rayos de sombra desde el punto de sombreado hasta las diversas fuentes de luz,la rapidez de este cálculo depende directamente de la cantidad de fuentes de luz, la iluminación indirecta siempre es más lenta debido a que se requiere simular la trayectoria de muchos rayos de luz que adicionalmente rebotan múltiples veces. Estas simulaciones se pueden hacer por rayos o por trazado de rayos, cómo se ha dicho antes el trazado es bastante costoso y a lo largo de este artículo se comprenderá por qué simular la iluminación global es un proceso costoso.
Lo más importante a recordar es que un objeto puede recibir luz de dos formas, directamente de la fuente de luz o indirectamente de otros objetos, los objetos también pueden verse cómo fuentes de luz debido a que la reflejan y esto se debe tener en cuenta para calcular la cantidad de luz que recibe un punto de sombreado. Cómo se puede ver esto es un problema muy complejo debido a que un objeto A puede iluminar a un objeto B y viceversa en varios ciclos haciendo que la iluminación de cada uno dependa del otro, este proceso implica un intercambio de energía entre superficies que puede dar para siempre. Es posible modelar esto matemáticamente pero resolver las ecuaciones resultantes es muy difícil.
Para simular la iluminación indirecta se simulan los caminos que toman los rayos de luz desde que son emitidos por la fuente hasta que los capta el ojo por esto vamos a hablar de transporte de luz, esto se refiere a la propagación en el espacio a medida que rebota de una superficie a otra. Un algoritmo de transporte de luz es aquel que describe cómo se puede resolver este problema. Cómo se explicará más adelante, simular el transporte de luz y encontrar un algoritmo que lo describa es algo complejo y difícil.

## ¿Cómo simulamos la iluminación indirecta con el rastreo hacia atrás?
Para comprender la simulación de rastreo hacia atrás primero debemos comprender la simulación de iluminación indirecta esto se puede hacer de una forma formal y matemática sin embargo lo veremos de una manera más sencilla, a través de procesos sencillos. 
Sabemos que la iluminación de un punto P de un objeto proviene de todas las direcciones posibles contenidas dentro de un hemisferio orientado alrededor de la superficie normal N en P. Cuando se trata de iluminación directa es muy sencillo de calcular solo necesitamos recorrer todas las fuentes de luz contenidas en la escena y considerar su dirección, cuando se trata de iluminación indirecta hay que tener en cuenta todas las superficies por encima de P que están reflejando luz hacia P,¿cómo elegimos la posición inicial? no existe una posición de luz puntual única a partir de la cual se pueda calcular la dirección de la luz. De hecho, dado que tratamos con una superficie, hay una infinidad de puntos que podríamos elegir en la superficie de ese objeto para calcular la dirección de la luz.¿Y por qué deberíamos elegir una dirección en lugar de otra teniendo en cuenta que es probable que cada punto de la superficie de ese objeto refleja la luz hacia P?
La respuesta a esta pregunta puede ser sencilla o compleja, hay casos donde este problema se puede resolver de forma analitica generando una ecuacion, este caso se da cuando los objetos que componen la escena son simples (esferas, cuadrículas, rectángulos), cuando los objetos no se ensombrecen entre sí y cuando tienen una iluminación constante en toda su superficie. Esto es un ejemplo bastante específico una vez se agreguen elementos que cambien esta situación se pierde la posible solución analitica y cerrada.

Por lo tanto, necesitamos encontrar una solución más robusta a este problema en la que la solución funciona independientemente de las formas de los objetos y no depende de la visibilidad de los objetos. Resulta que resolver este problema con estas limitaciones es bastante difícil. Con suerte, podemos usar un método simple llamado integración de Monte Carlo. Pero, ¿por qué la integración ? Porque, en esencia, lo que estamos tratando de hacer es "reunir" toda la luz proveniente de todas las direcciones posibles por encima del hemisferio orientado sobre la normal en P y esto en matemáticas, se puede hacer usando lo que llamamos un operador "integral":

[gather light =\int_{Ω}\{L_{i}}](:Formula)

Ω (la letra griega mayúscula para omega) aquí representa el hemisferio de direcciones orientadas sobre la normal en P. Define la región del espacio sobre la que se realiza la integral.

<p align="center">
  <img width="300" height="420" src="https://www.scratchapixel.com/images/upload/shading-intro2/shad2-lightfunction.png?">
</p>

Lo que integramos es generalmente una función. Entonces, ¿cuál es esa función en nuestro caso? Si observa la figura, puede ver la iluminación de P por otros objetos de la escena, en función. Esta función no es cero en las partes del medio disco sobre las que se proyectan los objetos de la escena (suponiendo que los objetos en sí no sean negros). Esta función se puede parametrizar de diferentes formas. Puede ser una función de un ángulo sólido (la letra griega omega:ω) o una función de las coordenadas esféricas θ y ϕ(las letras griegas theta y phi). Estas son solo dos formas diferentes (pero igualmente válidas) de parametrizar el hemisferio. Si solo consideramos el caso 2D de la figura , entonces esto puede definirse simplemente como función del ánguloθ.

Debería comenzar a ver cómo resolveremos el "qué punto de la superficie de un objeto deberíamos elegir para calcular la contribución de ese objeto a la iluminación de mi punto sombreado P". El hecho de que usemos una integral aquí y necesitamos reunir toda la luz proveniente de todas las direcciones, sugiere que no es un punto en la superficie de ese objeto lo que necesitamos, sino todos los puntos que componen la superficie de esos objetos. Por supuesto, tratar de cubrir la superficie de un objeto con puntos no es práctico ni posible. Los puntos son singularidades, es decir, no tienen área, por lo que no podemos representar una superficie con una infinidad de puntos que no tienen tamaño físico. Para resolver el problema, una posible solución sería dividir la superficie del objeto en una gran cantidad de parches muy pequeños y calcular cuánto contribuye cada parche que hace la superficie de ese objeto a la iluminación de P. Esto, en los gráficos por computadora, es técnicamente posible y se denomina método de radiosidad. Existe un método para resolver el problema de la transferencia de luz entre pequeños parches y P pero tienen limitaciones (son buenas para superficies difusas pero no buenas para superficies brillantes o especulares). Otro método consistiría en dividir la superficie de los objetos en pequeños parches y simular la contribución de estos parches a la iluminación de P reemplazandolos con fuentes de luz puntuales pequeñas. Esto de alguna manera sería posible y una técnica de renderizado avanzada llamada VPL se basa en este principio exacto, pero al final el trazado de rayos de Monte-Carlo es simplemente más simple y más genérico.

### Monte Carlo

Monte Carlo es otra forma de resolver el problema. Es esencialmente un método estadístico que se basa en la idea de que puede aproximarse o estimar cuánta luz se dirige hacia P por otros objetos en la escena, proyectando rayos desde P en direcciones aleatorias sobre la superficie y evaluando el color de los objetos que estos rayos se cruzan (si cruzan la geometría). Luego se suma la contribución de cada uno de estos rayos y la suma resultante se divide por el número total de rayos. En términos pseudo matemáticos, podemos escribir:

[Gatherlight \thickapprox\frac 1 N\textstyle\sum_{n=0}^N\ castRay(P,randomDirectonAboveP)](:Formula)

Esta es una nota rápida para los lectores que ya están familiarizados con el concepto de integración de Monte Carlo. Probablemente ya sepa que la ecuación completa para calcular una aproximación de una integral usando la integración de Monte Carlo es:

[\langle\{F^{N}}\rangle =\frac 1 N\textstyle\sum_{n=0}^{N-1}\frac {f(X_i)} {pd f(X_i)}](:Formula)

Si no está familiarizado con los métodos de Monte Carlo, puede encontrarlos explicados en dos lecciones de la sección Matemáticas de los gráficos por computadora . Si observa la ecuación anterior, notará un término PDF que ignoraremos por ahora, solo por simplicidad. Solo queremos que comprenda el principio de la integración de Monte Carlo en este punto.
En CG, llamamos a estas muestras de direcciones aleatorias . Lo que realmente hacemos con el muestreo de Monte Carlo es muestrear o tomar muestras sobre el dominio de la integral o la región del espacio sobre la cual la integral [\int_{Ω}\{L_{i}}](:Formula) se realiza, que en este caso particular es el hemisferio.

Ahora, no se preocupe todavía por cómo elegimos estas direcciones aleatorias sobre el hemisferio y cuántas muestras N necesitamos usar. Proporcionaremos más información sobre esto pronto. Por ahora, lo que debe recordar de esta parte de la lección es que el método de integración de Monte Carlo sólo le proporciona una estimación (o aproximación) de la solución real que es el resultado de la integral  [\int_{Ω}\{L_{i}}](:Formula). La "calidad" de esta aproximación depende principalmente de N, el número de muestras utilizadas. Cuanto mayor sea N, es más probable que obtenga un resultado cercano al resultado real de esta integral. Volveremos sobre este tema en el próximo capítulo.

## ¿Qué entendemos por muestreo? 
Dado que debemos tener en cuenta el hecho de que la luz puede provenir de cualquier lugar arriba de P, lo que hacemos en cambio en el caso de la integración de Monte Carlo, es seleccionar algunas direcciones aleatorias dentro del hemisferio orientadas sobre P y trazar rayos en estas direcciones en la escena. Si estos rayos se cruzan con alguna geometría en la escena, luego calculamos el color del objeto en el punto de intersección que suponemos que es la cantidad de luz que el objeto intersectado refleja hacia P a lo largo de la dirección definida por el rayo:

La iluminación global se encuentra punto a punto. Para encontrar la cantidad de luz que llega a un punto se realiza un muestreo aleatorio de los rayos de luz que alcanzan este punto. Cuando se realiza de esta forma se le llama raycasting con Monte Carlo. Como la luz se calcula no desde la fuente si no desde el punto, a esta alternativa de método se le llama backtracing.
En el siguiente método se expone el caso para calcular la iluminación de un punto en un plano 2D. Se compone de siete pasos que se pueden aplicar de forma recursiva cuando se quiere tener más detalle en términos de la oclusión entre los objetos que componen la escena e influyen radiantemente sobre el punto.

<img style="float: left;" src="https://www.scratchapixel.com/images/upload/shading-intro2/shad2-globalillum6.png?" width="200" height="670">

- Paso 1: Seleccionar una ubicación aleatoria en el semidisco unitario. Esto se hace simplemente generando un número aleatorio entre 0 y pi. En el diagrama el semicirculo amarillo representa un vista hacia el horizonte para nosotros, en otras palabras, esto es una vista superior.

- Paso 2: Notar que esta ubicación no está orientada a lo largo de la normal del punto que se quiere calcular. Para corregir esto se construye la matriz M a partir de las coordenadas del vector normal. Cuando se opera la ubicación escogida con esta matriz obtendremos un vector que está a lo largo del vector normal al punto que se desea calcular.

- Paso 3: Con el vector normalizado, ahora se procede a generar un rayo. Este rayo puede verse como un factor escalar del vector normalizado, y con él se desea saber si golpea algún elemento de la escena.

- Paso 4: El valor que se obtiene en la intersección se multiplicará por el valor de la normalización y esta será nuestra muestra de luz (color) para ese rayo.

- Paso 5: Se acumula la contribución de luz calculada para cada muestra.

- Paso 6: El acumulado obtenido en el paso anterior se divide entre la cantidad de muestras. Tal como se ve en la siguiente ecuación.

[Gatherlight \thickapprox\frac 1 N\textstyle\sum_{n=0}^N\ castRay(P,randomDirectonAboveP)](:Formula)

- Paso 7: Luego al acumulado promediado del paso 6 se le adiciona el valor obtenido por iluminación directa visto en la sección anterior y se multiplica por el albedo del objeto.

Como se mencionó anteriormente este proceso se puede aplicar recursivamente para capturar mejor los detalles de la iluminación de la escena, pero es bastante costoso porque este método claramente escala exponencialmente (por cada muestra se obtienen otras n muestras). El siguiente diagrama muestra esta idea:

<p align="center">
  <img width="670" height="231" src="https://www.scratchapixel.com/images/upload/shading-intro2/shad2-globalillum5.png?">
</p>

Notar también que este costo se puede contrarrestar pues para cada nivel de profundidad que se realiza este método la contribución de cada rayo a la iluminación del punto es cada vez menor, como consecuencia de la ley del coseno que aparece en el paso 4.
La técnica que se ha mostrado ilumina superficies difusas, como consecuencia de la aleatoriedad del método de Monte Carlo. Para representar otro tipo de superficies como sólidos que encierran líquidos o vidrio se deben tener en cuenta las consideraciones que se encuentran en la siguiente sección.

## El uso del método de muestreo difuso indirecto para calcular la indirecta especular es ineficiente
Hay 2 tipos de material: especular y difuso. Recuerde que una reflexión difusa es independiente de la vista. Una superficie difusa siempre tendrá el mismo brillo independientemente del ángulo que se mire. Las superficies especulares son diferentes: dependen de la vista. solo puede ver el reflejo de un objeto si el ángulo de visión está aproximadamente alineado con el reflejo del espejo a lo largo del cual se refleja la luz de este objeto. Esto esencialmente significa que los rayos de luz reflejados por una superficie brillante se reflejan dentro de un cono de direcciones orientadas alrededor de la dirección de reflexión.

<img style="float: left;" src="https://www.scratchapixel.com/images/upload/shading-intro2/shad2-indirectspec2.png?" width="300" height="332">

Para una superficie difusa, una luz siempre contribuye a la iluminación de P independientemente de su posición (siempre que la luz esté por encima de la superficie). Sin embargo, para una superficie especular, una luz solo puede ser visible si la dirección de la vista V está alineado de alguna manera aproximadamente con la dirección del espejo 
R de la dirección de la luz incidente. Qué tan cerca V y R tienen que estar, depende de la rugosidad de la superficie. Si la superficie es muy rugosa, es posible que refleje algo de luz a lo largo de la dirección de la vista, incluso si V no está estrechamente alineado con la dirección del espejo R. Aunque tan pronto como V esté totalmente fuera del cono de direcciones en las que la superficie refleja los rayos de luz, no debería haber luz reflejada.

Podemos usar esta observación para calcular el brillo del reflejo de un objeto por una superficie lustrosa. Si conocemos la dirección de la vista V, entonces solo los rayos de luz con ciertas direcciones de incidencia se reflejarán hacia los ojos a lo largo de V.
Imaginemos ahora el cono de direcciones en el que los rayos de luz se reflejan pero centrados alrededor VR. ¿qué sucede?, esto nos dice que cualquier rayo de luz cuya dirección de incidencia esté contenida dentro de ese cono de dirección se refleja de alguna manera a lo largo de V o al menos alguna cantidad mayor que 0.

Solo los rayos de luz contenidos dentro del cono de dirección centrado alrededor de VR contribuyen de alguna manera a la cantidad de luz que se refleja a lo largo de V. Por lo tanto, solo deberíamos estar interesados ​​en las direcciones contenidas dentro de ese cono. El problema con la técnica empleada hasta ahora, que consiste en muestrear todo el hemisferio, es que muchas de las direcciones creadas no están contenidas dentro de ese cono de dirección.

## Cáusticas: la pesadilla del rastreo hacia atrás
Las cáusticas son el resultado de que los rayos de luz se enfoquen en puntos específicos o regiones del espacio de una superficie especular o como resultado de la refracción (los rayos de luz que pasan a través de un vaso de agua o vino se enfocan en un punto en el del vaso).

<img style="float: left;" src="https://www.scratchapixel.com/images/upload/shading-intro2/caustics.jpg?" width="350" height="300">

<p align="left">
  <img width="350" height="300" src="https://www.scratchapixel.com/images/upload/rendering-3d-scene-overview/caustics2.png?">
</p>

Las cáusticas son diferentes a los reflejos especulares indirectos, en los reflejos indirectos tenemos algún conocimiento previo de las direcciones en las que debemos proyectar los rayos. Estos deberían estar contenidos con el cono de direcciones del lóbulo especular. Aunque en el caso de las cáusticas, no sabemos en qué parte de la escena se crean estas. No sabemos en qué partes de la escena se concentran y se redirige los rayos de luz hacia P. Por supuesto, podemos aumentar el número de muestras N, pero es posible que deba aumentarlo a un número muy grande para reducir la varianza significativamente, y esto tiene el precio de aumentar considerablemente el tiempo de renderizado. Claramente, esta no es una buena solución. Una buena solución es aquella en la que disminuimos la varianza significativamente mientras mantenemos bajos los tiempos de renderizado.

## Conclusiones
- El método estadístico de montecarlo usado en el cálculo de la iluminación es la mejor opción  para el problema de la iluminación indirecta con el rastreo hacia atrás.
- La representación de superficies especulares debe hacerse de tal manera que los ángulos de los rayos están contenidos en el cono de visión.
- El método de iluminación en un punto puede ser ineficiente en términos
- Debido a las propiedades de las superficies especulares, al tratar de hacer un mapeo del hemisferio se genera mucho ruido debido a que no todos los puntos son significativos para el cálculo de la iluminación.
- El proceso de simular el trazado de rayos para iluminación indirecta es complejo y costoso computacionalmente por esto mismo no ha sido muy usado hasta que se ha tenido mayor poder de cálculo y mejores algoritmos que lo optimicen 


