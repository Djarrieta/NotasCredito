<template>
<div class="container max-w-4xl mx-auto">
    <div class="flex justify-between">
        <div>
            <button v-if="!datos.cod" @click="addItem">Agregar Item</button>
            <button @click="clear">Limpiar</button>
        </div>
        <div>
            <button v-if="!datos.cod" @click="generateReport">Guardar Nota Crédito</button>
            <button v-if="datos.cod" @click="printNota">Imprimir</button>
        </div>
    </div>
    <div ref="printable">
        <Formato :datos="datos" @deleteItem="deleteItem"/>
    </div>
    <!-- Datos antiguos -->
    <div class="mx-4 mt-4 bg-white border rounded-xl p-4 w-full">
        <table class="">
            <thead class=" flex ">
                <th class="w-12 text-left border-b">Cod</th>
                <th class="w-full border-b">Tercero</th>
            </thead>
        </table>
        <tbody>
            <tr 
            v-for="(d,n) in listaNotas"
            :key="n" 
            class="flex hover:bg-gray-300 cursor-pointer"
            @click="selectNota(n)">
                <td class="w-12 border-b text-center"> {{d.cod}} </td>
                <td class="w-full border-b"> {{d.ter.name}} </td>
            </tr>
        </tbody>
    </div>
</div>
</template>

<script>
import print from 'ink-html'
import Swal from 'sweetalert2'
import Formato from "@/components/Formato"
import {db} from "@/main.js"
import  firebase from "firebase/app";
 
export default {
    name:"Inicio",
     components: {
        Formato
    },
    data(){
        return{
            listaNotas:[],
            datos:{
                cod:0,
                ter:{
                    name:"",
                    doc:"",
                    tel:"",
                    email:"",
                    dir:"",
                },
                items:[
                    {
                        item:"",
                        cant:null,
                        price:null
                    },

                ]
            },
            problems:""
        }
    },
    created(){
        db.collection("NotasCredito")
            .orderBy("cod","desc")
            .onSnapshot(docs=>{
                this.listaNotas=[]
                docs.forEach(doc=>{
                    this.listaNotas.push(doc.data())
                })
        })
    },
    methods: {
        generateReport () {
            this.problems=""
            if(this.datos.ter.dir===""){this.problems="Dirección tercero inválido."}
            if(this.datos.ter.email==="" || !this.datos.ter.email.includes("@")){this.problems="correo tercero inválido."}
            if(this.datos.ter.tel===""){this.problems="Teléfono tercero inválido."}
            if(this.datos.ter.doc===""){this.problems="Documento tercero inválido."}
            if(this.datos.ter.name===""){this.problems="Nombre tercero inválido."}
            
            this.datos.items.forEach((x,n)=>{
                if(!x.item){this.problems=`El nombre del ítem ${n+1} no es válido`}
                if(!x.cant){this.problems=`La cantidad del ítem ${n+1} no es válido`}
                if(!x.price){this.problems=`El precio del ítem ${n+1} no es válido`}
            })
            
            if(!this.problems){
                Swal.fire({
                    title:"¿Seguro que quieres generar una nueva nota crédito?",
                    showCancelButton:true,
                    cancelButtonText:"Cancelar",
                    showConfirmButton:true,
                    confirmButtonText:"Generar",
                }).then(r=>{
                    if(r.isConfirmed){
                        const ref=db.collection("NotasCounter").doc("counter")
                        ref.update({
                            counter:firebase.firestore.FieldValue.increment(1)
                        }).then(()=>{
                            //lee consecutivo actual
                            db.collection("NotasCounter").doc("counter").get().then(x=>{
                                this.datos.cod=x.data().counter
                            }).then(()=>{
                                db.collection("NotasCredito").doc(this.datos.cod.toString()).set({
                                ...this.datos
                                }).then(()=>{
                                    
                                    this.datos.cod++
                                    Swal.fire({
                                        title: 'Guardado',
                                        text: "Nota crédito guardada con éxito.",
                                        icon: 'success',
                                        position: 'top-end',
                                        timer:1000
                                    })
                                }).catch(e=>console.error(e))
                            })
                        }).catch(e=>console.error(e))
                    }
                })
            }else{
                Swal.fire({
                title: 'Error!',
                text: this.problems,
                icon: 'error',
                confirmButtonText: 'OK',
                position: 'top-end',
                })
            }
        },
        addItem(){
            this.datos.items.push(                    {
                        item:"",
                        cant:0,
                        price:0
                    })
        },
        deleteItem(n){
            if(this.datos.items.length>1){
                this.datos.items.splice(n,1)
            }else if(this.datos.items.length===1){
                this.datos.items[0]= {
                    item:"",
                    cant:0,
                    price:0
                } 
            }
        },
        clear(){
            this.datos={
                cod:0,
                ter:{
                    name:"",
                    doc:"",
                    tel:"",
                    email:"",
                    dir:"",
                },
                items:[
                    {
                        item:"",
                        cant:null,
                        price:null
                    },

                ]
            }
        },
        selectNota(n){
            this.datos={...this.listaNotas[n]}
        },
        printNota(){
            print(this.$refs.printable)
        }
    },
}
</script>
<style scoped>
    button {
        @apply bg-gray-400 rounded border text-gray-100 px-4 py-1 m-2 hover:bg-gray-600
    }

</style>
