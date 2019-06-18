// Apertando ctrl + espaço , e selecionando scaffold = ele gera a estrutura basica do Vue
// Esse é o componente principal da aplicação, que ira importar os outros
<template>
    <div id="app">
        <h1>Calculadora</h1>
        <Calculator/>
    </div>
</template>

<script>
import Calculator from "./main/Calculator" //importando componente

export default {
    components: {Calculator} //Referenciando componentes

}
</script>

<style>
@font-face {
    font-family: "RobotoMono";
    src: url("./fonts/RobotoMono-Thin.ttf");
}

*{
    font-family: "RobotoMono", monospace;
}

    body {
        margin: 0;

    }

    #app{
        display: flex;
        flex-direction: column;
        height: 100vh;
        justify-content: center;
        align-items: center;
        text-align: center;

        color: #fff;
        background: linear-gradient(to right, rgb(83,105,118), rgb(41,46,73))
    }
</style>

