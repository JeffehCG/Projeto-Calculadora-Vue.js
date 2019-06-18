<template>
    <div class="calculator">
        <!-- Chamando componetes -->
        <Display :value = "displayValue"/> 
        <Button label="AC" triple @onClick="clearMemory"/> <!--@onClick não é um evento padrão, é um evento criada em Button.vue-->
        <Button label="/" operation @onClick="setOperation"/>
        <Button label="7" @onClick="addDigit"/>
        <Button label="8" @onClick="addDigit"/> <!--label = passando propriedades (props) para o componente-->
        <Button label="9" @onClick="addDigit"/>
        <Button label="*" operation @onClick="setOperation"/>
        <Button label="4" @onClick="addDigit"/>
        <Button label="5" @onClick="addDigit"/>
        <Button label="6" @onClick="addDigit"/>
        <Button label="-" operation @onClick="setOperation"/>
        <Button label="1" @onClick="addDigit"/>
        <Button label="2" @onClick="addDigit"/>
        <Button label="3" @onClick="addDigit"/>
        <Button label="+" operation @onClick="setOperation"/>
        <Button label="0" double @onClick="addDigit"/>
        <Button label="." @onClick="addDigit"/>
        <Button label="=" operation @onClick="setOperation"/>
    </div>
</template>

<script>
//Importando componentes
import Display from "../components/Display"
import Button from "../components/Button"

export default {
    data: function() { //Atributos de calculadora (estado inicial)
        return{
            displayValue: "0", //Valor no display
            clearDisplay: false, //Determina se o display precisa ser limpo
            operation: null, //Operação a ser resolvida
            values: [0,0], //Dois valores a serem calculados
            current: 0 //indice atual (posição que define qual é o valor que esta sendo alterado do array acima)
        }
    },
    components: {Button,Display}, //Referenciando Componentes para usar no template
    methods: {
        //Função para limpar display
        clearMemory(){
            Object.assign(this.$data , this.$options.data()) //this.$options.data() = estado inicial do objeto, ou seja, você esta atribuindo o estado inicial para o objeto atual, assim limpando tudo
        },
        //
        setOperation(operation){
            if(this.current === 0) { //Se o indice estiver apontando pro primeiro valor
                this.operation = operation //Colocando o simbolo da operação
                this.current = 1 // clicando na operação, o indice muda
                this.clearDisplay = true // proximo numero a ser digitado limpa o display
            
            }else{ //o indice apontando pro segundo valor
                const equals = operation === "=" // quando operação for = , salvar no equals
                const currentOperation = this.operation //pegando a operação clicada anteriormente

                //Resolvendo a operação
                try{
                    this.values[0] = eval(//Resultado da operação ficara no indice 0
                        `${this.values[0]} ${currentOperation} ${this.values[1]}`
                    )
                }catch(e){
                    this.$emit('onError', e)
                }

                if(this.values[0].toString().includes(".")) this.values[0] = this.values[0].toFixed(2) //Se o numero tiver ponto, deixar apenas com 2 casas decimais depois do ponto

                this.values[1] = 0 //Zerando o indice 1

                this.displayValue = this.values[0] //Colocando o novo valor com apenas duas casas decimais
                this.operation = equals ? null : operation //se a operação foi = , zerar, se não , colocar o simbolo da operação para proxima conta
                this.current = equals ? 0 : 1 //Se a conta for continuar, usar a segunda posição do array
                this.clearDisplay = !equals //Se for diferente de equals limpa o display
            }
        },

        //Função para adicionar digito ao display
        addDigit(n){
            if (n === '.' && this.displayValue.includes(".")){ //se n for igual a ponto, e dentro do display ja estiver incluido um ponto
                return //retorna vazio, assim não deixando o valor ter mais de um ponto
            }

            const clearDisplay = this.displayValue === "0" //se o display estiver zerado
                || this.clearDisplay // ou o clearDisplay estiver true a variavel sera true
            const currentValue = clearDisplay ? "" : this.displayValue //se a variavel acima der true sera retornado vazio, se não ira retornar o valor do display
            //O codigo acima evita que varios 0 sejam digitados em sequencia no começo
            //E tambem limpa o display quando preciso
            const displayValue = currentValue + n //Criando o novo valor, com o valor antigo mais o digito

            this.displayValue = displayValue //Adicionando o novo valor ao estado
            this.clearDisplay = false //Voltando o atributo para false
            this.values[this.current] = displayValue //Alterando o status do novo valor
        }
    }
}
</script>

<style>
    .calculator{
        height: 320px;
        width: 235px;
        border-radius: 5px;
        overflow: hidden;

        display: grid;
        grid-template-columns: repeat(4, 25%);
        grid-template-rows: 1fr 48px 48px 48px 48px 48px;
    }
</style>
