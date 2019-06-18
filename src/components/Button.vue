<template>
    <button class="button"
        @click="$emit('onClick', label)" 
        :class="{double, triple, operation}"> <!--O parametro que estiver true sera definido como classe css (se nenhum for true nenhuma classe sera aplicada)-->
        <!--$emit() dispara um evento/ label esta sendo passado como parametro para o evento-->
        {{ label }}
    </button>
</template>

<script>
export default {
    props: { //Propriedades do componente passadas por parametro na chamada do evento
        label: {},
        operation: {type: Boolean}, //Definindo tipo, pois se o respectivo atributo não for definido no Button do Arquivo Calculator.vue, ele ficara false
        double: {type: Boolean},
        triple: {type: Boolean}
    }
}
</script>

<style>
    :root{ /*Variaveis*/
        --bg-button: #f0f0f0;
        --border-button: solid 1px #888;
    }

    .button{
        font-size: 1.4em;
        background-color: var(--bg-button);
        border: none;
        border-right: var(--border-button);
        border-bottom: var(--border-button);
        outline: none;
    }

    .button:active{
        background-color: #ccc
    }

    .button.double{
        grid-column: span 2;
    }

    .button.triple{
        grid-column: span 3;
    }

    .button.operation{
        background-color: #fa8231;
        color: #fff;
    }

    .button.operation:active{
        background-color: #fa8231cc;
    }

</style>
