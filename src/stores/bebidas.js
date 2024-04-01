import { ref, reactive, onMounted, computed } from 'vue'
import { defineStore } from 'pinia'
import APIService from '@/services/APIService'
import { useModalStore } from '@/stores/modal';


export const useBebidasStore = defineStore('bebidas', function(){

    const modal = useModalStore()
    const categorias = ref([])
    const busqueda = reactive({
        nombre:'',
        categoria:''
    })
    const ingredientes = ref ([
        {ingrediente:'Tequila', texto: 'Tequila'},
        {ingrediente:'Vodka', texto: 'Vodka'},
        {ingrediente:'Grenadine', texto: 'Granadina'},
        {ingrediente:'Rum', texto: 'Ron'},
        {ingrediente:'Water', texto: 'Agua'},
        {ingrediente:'Coffee', texto: 'Cafe'},
        {ingrediente:'Kahlua', texto: 'Kahlua'},
        {ingrediente:'Brandy', texto: 'Brandy'},
        {ingrediente:'Gin', texto: 'Ginebra'},
        {ingrediente:'Light rum', texto: 'Ron Blanco'}
    ])
    const recetas = ref([])
    const receta = ref ({})
    onMounted(async function(){
        const {data: {drinks}} = await APIService.obtenerCategorias()
        categorias.value = drinks
    })
    async function obtenerRecetas(){
        const {data: {drinks}} = await APIService.buscarRecetas(busqueda)
        recetas.value = drinks
    }

    async function seleccionarBebida(id) {
        const {data: {drinks}} = await APIService.buscarReceta(id)
        receta.value = drinks [0]
        modal.handleClickModal()
    }

    const noRecetas = computed(()=> recetas.value.length === 0)

    return {
        categorias,
        busqueda,
        ingredientes,
        recetas,
        receta,
        noRecetas,
        obtenerRecetas,
        seleccionarBebida
    }


})