# Conclusiones

## Luma y promedio Rbg por hardware
Se crea un shader  y se aplica a cada gráfico creado en el código de processing para el luma se usan los promedios [\{R * 0.299 + G * 0.587 + B * 0.114}](:Formula) y el promedio RGB es igual para cada canal [\{(R + G + B) / 3}](:Formula) al aplicarlo por hardware en las imágenes se puede notar una gran definición en los detalles las diferencias entre ambos modelos son casi mínimas y en cuanto a tiempos de carga se puede apreciar una reducción en estos además de la gran rapidez con la que se pude hacer zoom a las imágenes y verlas como un modelo 2D desde varias perspectivas.

En cuanto a video podemoa apreciar un aumento de los fotogramas por segundo (fps) como se puede ver en el siguiente grafico:
<p align="center">
  <img width="750" height="300" src="https://i.ibb.co/2vr9PgQ/fps.png">
</p>
Se puede concluir que el procesamiento por hardware es mucho más eficiente pero puede tener unos pocas fluctuaciones debido al uso de los componentes del ordenador.

## Ascii Art y Photo Mosaic con Shaders
Al implementar el mismo algoritmo mediante shaders se aprecia un gran aumento de velocidad en los tiempos de carga además de poder cambiar la densidad de pixeles, caracteres o imágenes dependiendo del caso, también con tiempos extremadamente cortos y por último cambiar el canal de color por el cual se visualiza la imagen.