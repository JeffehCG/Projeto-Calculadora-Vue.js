//Arquivo principal - quando o servidor do vue inicial, procura esse arquivo
import Vue from 'vue'
import App from './App'

new Vue ({    

    //Função que renderiza os componentes do Vue na pagina
    // render(createElement){
    //     return createElement(App)
    // }

    //OU TAMBEM
    render: h => h(App) //Forma padrão que vem no arquivo

}).$mount("#app") //.$mount() tem o mesmo papel do el: / você pode usar um dos dois, porem por padrão o sistema vem com .mount
//O codigo sera injetado no arquivo public/index.html, que contem uma div com id app
