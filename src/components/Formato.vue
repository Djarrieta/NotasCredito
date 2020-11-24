<template>
<div>
    <section class="flex flex-col mx-4 mt-4 bg-white border rounded-xl p-4">
        <div class="flex p-2">
            <img 
                class="h-28  mx-auto py-2 object-center"
                src="LogoAIC.JPG" 
                alt="logo">
            <div class="flex flex-col px-2">
                <h1 class="text-xl text-center uppercase"> {{company}} </h1>
                <h3 class="text-xs text-center">Nit: {{nit}}</h3>
                <h3 class="text-xs text-center mx-4 mt-2 text-gray-500"> {{notes}} </h3>
            </div>
            <div class="flex flex-col items-end mr-6">
                <h2 class="text-red-700 text-2xl flex">
                    <span>N°</span><span> {{datos.cod | consecutivo}}</span></h2>
                <h2 class="text-xs">22/11/2020</h2>
            </div>
        </div>
        <h3 class="mt-2 text-center text-gray-500 text-xs">Documento soporte  en adquisiciones  efectuadas a no obligados a facturar, resolución 00042 del 5 de mayo 2020.</h3>
    </section>
    <section class="flex flex-col mx-4 bg-white border rounded-xl px-4 py-1 my-1">
        <div class="grid grid-cols-3 p-2">
            <div class="px-2">
                <!-- Nombre -->
                <div class="flex flex-col ">
                    <span class="text-xs" >Nombre:</span>
                    <input 
                        v-model="datos.ter.name"
                        type="text" 
                        placeholder="Nombre"
                        list="terceros"
                        @change="fillValuesTer"
                        >
                        <datalist id="terceros">
                            <option 
                                v-for="(t,n) in listaTer" 
                                :key=n 
                                :value="t.name + ' #'+t.cod"/>
                        </datalist>
                </div>
                <!-- Documento -->
                <div class="flex flex-col">
                    <span class="text-xs">Documento:</span>
                    <input 
                        v-model="datos.ter.doc"
                        type="text" 
                        placeholder="Documento"
                        
                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                </div>
            </div>
            <div class="px-2">
                <!-- Teléfono -->
                <div class="flex flex-col">
                    <span class="text-xs">Teléfono:</span>
                    <input 
                        v-model="datos.ter.tel"
                        type="text" 
                        placeholder="Teléfono"
                        
                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                </div>
                <!-- Email -->
                <div class="flex flex-col">
                    <span class="text-xs">Email:</span>
                    <input 
                        v-model="datos.ter.email"
                        type="email" 
                        placeholder="Email"
                        >
                </div>

            </div>
            <div class="px-2"> 
                <!-- dirección -->
                <div class="flex flex-col">
                    <span class="text-xs">Dirección:</span>
                    <input 
                        v-model="datos.ter.dir"
                        type="text" 
                        placeholder="Dirección"
                        >
                </div>
            </div>
        </div>
    </section>
    <section class="flex flex-col mx-4 bg-white border rounded-xl my-1 overflow-hidden">
        <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div class="align-middle inline-block min-w-full overflow-hidden ">
            <table class="min-w-full">
                <thead>
                <tr>
                    <th class="px-2 py-2 border-b border-gray-200 bg-gray-500 text-left text-xs leading-4 font-medium text-gray-50 uppercase tracking-wider text-center ">
                    Descripción
                    </th>
                    <th class="px-2 py-2 border-b border-gray-200 bg-gray-500 text-left text-xs leading-4 font-medium text-gray-50 uppercase tracking-wider text-center">
                    Cant
                    </th>
                    <th class="px-2 py-2 border-b border-gray-200 bg-gray-500 text-left text-xs leading-4 font-medium text-gray-50 uppercase tracking-wider text-center">
                    Valor Un
                    </th>
                    <th class="px-2 py-2 border-b border-gray-200 bg-gray-500 text-left text-xs leading-4 font-medium text-gray-50 uppercase tracking-wider text-center">
                    SubTotal
                    </th>
                </tr>
                </thead>
                <tbody class="bg-white">
                <tr v-for="(i,n) in datos.items" :key="n">
                    <td class="px-3 py-1 flex">
                        <button 
                            @click="deleteItem(n)"
                            class="bg-white text-white px-2 h-5 text-xs mr-1 rounded hover:bg-red-500 hover:border">Borrar</button>
                        <input 
                            type="text"
                            placeholder="Nombre del item"
                            v-model="i.item"
                            :list="n+'items'"
                            @change="fillValuesItem(n)"
                        >
                        <datalist :id="n+'items'">
                            <option 
                                v-for="(item,n) in listaItem" 
                                :key=n 
                                :value="item.item+ ' #'+item.cod"/>
                        </datalist>
                    </td>
                    <td >
                        <input class="text-center" type="number"
                        v-model="i.cant"
                        placeholder="0">
                    </td>
                    <td >
                        <input class="text-center" type="number"
                        v-model="i.price"
                        placeholder="0">
                    </td>
                    <td >
                        <span>${{i.cant*i.price}}</span>
                    </td>
                </tr>
                <tr>
                    <td class="px-6 py-1 whitespace-no-wrap"></td>
                    <td />
                    <td class="text-right pr-2">
                        SUBTOTAL
                    </td>
                    <td >
                        <span class="text-xl">{{subtotal}}</span>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
    </section>
</div>
</template>

<script>
import {db} from "@/main.js"
export default {
    name:"Formato",
    props:["datos"],
    data(){
        return{
            company:"ALL IN CONCRETE EJE CAFETERO SAS",
            nit:"901 070 145 - 7",
            img:"https://firebasestorage.googleapis.com/v0/b/notas-credito.appspot.com/o/LogoAIC.jpeg?alt=media&token=d1f48819-229d-49ee-9f9f-6bba62d1c8f5",
            notes:"Resolución Dian No 18764005104508 - Fecha 01/10/2020 Autorización  Facturación del  CA 1 al CA 1000 vigencia  12 meses Calle 38 No 11-11 Bodega 1 Tel: 342 26 66 - 342 26 67",
            listaTer:[],
            listaItem:[]
        }
    },
    computed:{
        subtotal(){
            let suma=0
            this.datos.items.forEach(i=> {
                suma+=parseFloat(i.price)*parseFloat(i.cant)
            });
            if(suma){
                return  suma
            }else{
                return 0
            }
        },
    },
    methods:{
        deleteItem(n){
            this.$emit("deleteItem",n)
        },
        fillValuesTer(){
            const name=this.datos.ter.name
            if(name.includes(" #")){
                const index=2+name.match(" #").index
                const cod=name.substr(index,4)
                const infoTer=this.listaTer.filter(x=>x.cod==cod)[0]
                if(infoTer){
                    this.datos.ter.dir=infoTer.dir
                    this.datos.ter.doc=infoTer.doc
                    this.datos.ter.tel=infoTer.tel
                    this.datos.ter.email=infoTer.email
                    this.datos.ter.name=infoTer.name
                }
            }
        },
        fillValuesItem(n){
           const name=this.datos.items[n].item
            if(name.includes(" #")){
                const index=2+name.match(" #").index
                const cod=name.substr(index,4)
                const infoItem=this.listaItem.filter(x=>x.cod==cod)[0]
                if(infoItem){
                    this.datos.items[n].item=infoItem.item
                    this.datos.items[n].price=infoItem.price
                }
            }
        }
    },
    filters:{
        consecutivo(val){
            let v=val.toString()
            do{v="0"+v}
            while(v.length<4)
            return v
        }
    },
    created(){
        db.collection("NotasCredito").orderBy("cod","desc").get().then(x=>{
            x.forEach(x=>{
                //ter
                const terData={...x.data().ter, cod:x.data().cod}
                let terIncluded=false
                this.listaTer.forEach(ter=>{
                    if(ter.name===terData.name){
                     terIncluded=true
                    }
                })
                if( !terIncluded){
                    this.listaTer.push(terData)
                }
                //item
                x.data().items.forEach(item=>{
                    const itemData={
                        ...item, 
                        cod:x.data().cod}
                    let itemIncluded=false
                    this.listaItem.forEach(i=>{
                        if(i.item===itemData.item){
                            itemIncluded=true
                        }
                    })
                    if( !itemIncluded){
                        this.listaItem.push(itemData)
                    }
                })
            })
        })
    }
}
</script>
