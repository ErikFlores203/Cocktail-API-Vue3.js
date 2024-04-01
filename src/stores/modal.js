import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useFavoritosStore } from "@/stores/favoritos";
import { useBebidasStore } from "@/stores/bebidas";

export const useModalStore = defineStore('mopdal',() => {

    const favoritos = useFavoritosStore()
    const bebidas = useBebidasStore()

    const modal = ref(false)

    function handleClickModal(){
        modal.value = !modal.value
    }

    const textoBoton = computed (()=>{
        return favoritos.existeFavorito(bebidas.receta.idDrink) ? 'Eliminar de Favoritos' : 'Agregar a Favoritos'
    })

    return {
        modal,
        textoBoton,
        handleClickModal
    }
})