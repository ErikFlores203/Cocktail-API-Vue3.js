<script setup>
    import { computed } from 'vue'
    import { RouterLink, useRoute } from 'vue-router'
    import { useBebidasStore } from '../stores/bebidas'
    import { useNotificacionStore } from '@/stores/notificaciones';

    const route = useRoute()
    const storeBebidas = useBebidasStore()
    const storeNotificaciones = useNotificacionStore()

    const paginaInicio = computed (() => route.name === 'Inicio')
    
    
    const handleSubmit = () =>{
        if(Object.values(storeBebidas.busqueda).includes('')){
            storeNotificaciones.$patch({
                texto : 'Todos los campos son obligatorios',
                mostrar : true,
                error : true
            })
            return
        }

        storeBebidas.obtenerRecetas()
    } 

</script>

<template >
    <header 
        class="bg-slate-800"
        :class="{header : paginaInicio}"
    >
        <div class="mx-auto container px-5 py-16">
            <div class="flex justify-between items-center">
                <div>
                    <RouterLink
                        :to="{name: 'Inicio'}"
                    >
                    <img class="w-32" src="/img/logo.svg" alt="Logotipo"/>
                    </RouterLink>
                </div>
                <nav class="flex gap-4 text-white">
                    <RouterLink
                        :to="{name: 'Inicio'}"
                        class=" uppercase font-bold"
                        active-class="text-orange-500"
                    >
                        Inicio
                    </RouterLink>
                    <RouterLink
                        :to="{name: 'Favoritos'}"
                        class="uppercase font-bold"
                        active-class="text-orange-500"
                    >
                        Favoritos
                    </RouterLink>
                </nav>
            </div>

            <form 
                v-if="paginaInicio"
                class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg 
                shadow space-y-6"
                @submit.prevent="handleSubmit"
            >
                <div class="space-y-4">
                    <label for="ingrediente"
                        class="block text-white uppercase font-extrabold text-lg"
                    >Ingredientes</label>
                    <select
                        id="ingrediente"
                        class="p-3 w-full rounded-lg focus:outline-none"
                        v-model="storeBebidas.busqueda.nombre"
                    >
                        <option value="">-- Seleccione --</option>
                        <option
                            v-for="ingrediente in storeBebidas.ingredientes" 
                            :key="ingrediente.ingrediente"
                            :value="ingrediente.ingrediente"
                        >
                            {{ ingrediente.texto }}
                        </option>
                    </select> 
                </div>

                <div class="space-y-4">
                    <label for="categoria"
                        class="block text-white uppercase font-extrabold text-lg"
                    > Categoria </label>
                    <select
                        id="categoria"
                        class="p-3 w-full rounded-lg focus:outline-none"
                        v-model="storeBebidas.busqueda.categoria"
                    >
                        <option value="">-- Seleccione --</option>
                        <option
                            v-for="categoria in storeBebidas.categorias" 
                            :key="categoria.strCategory"
                            :value="categoria.strCategory"
                        >
                            {{ categoria.strCategory }}
                        </option>
                    </select> 
                        
                    <input 
                        type="submit" 
                        class="bg-orange-800 hover:bg-orange-900 cursor-pointer text-white
                        font-extrabold w-full p-2 rounded-lg uppercase"
                        value="Buscar Recetas"
                    >
                    
                </div>
            </form>
        </div>
    </header>
</template>
<style>
    .header {
        background-image: url('/img/bg.png');
        background-size: cover;
        background-position: center;
    }
</style>