<template>
    <v-card
        flat
        tile
        >
        <v-toolbar
        color="cyan"
        dark
        >
        <v-icon 
        class="mr-3"
        >mdi-vuejs</v-icon>

        <v-toolbar-title>BJ API INTRODUCE</v-toolbar-title>

        <v-spacer></v-spacer>
        
        </v-toolbar>

        <v-container
        v-for="type in types"
        :key="type"
        class="grey lighten-4"
        fluid
        >
        <v-subheader>{{ type }}</v-subheader>

        <v-row>
            <v-spacer></v-spacer>
            <v-col
            v-for="card in cards"
            :key="card.title"
            cols="12"
            sm="6"
            md="4"
            >
            <v-card>
                <v-img
                :src="card.image"
                v-on:click="onClickLink(card.link)"
                :style="{cursor:'pointer'}"
                height="300px"
                >
                    <span
                        class="white--text pl-4 pt-4 d-inline-block"
                        v-text="card.title"
                    ></span>

                    <span 
                    v-text="card.context"
                    class="white--text pl-4 pt-4 d-inline-block"
                    :style="{marginTop: '200px'}"
                    ></span>

                    <template v-slot:placeholder>
                        <div style="background:gray; height:100%;"></div>
                    </template>
                </v-img>
                <v-card-actions class="white justify-center">
                <v-btn
                    v-for="(social, i) in socials"
                    :key="i"
                    :color="social.color"
                    v-on:click="onClickLink(social.link)"
                    class="white--text"
                    fab
                    icon
                    small
                >
                <v-icon
                >{{ social.icon }}</v-icon>
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-col>
        </v-row>
        </v-container>
    </v-card>
</template>

<script>
import axios from 'axios';

export default {
    data: () => ({
        types: ['페이스북 피드'],
        cards: [],
        socials: [
            {
            icon: 'mdi-facebook',
            color: 'indigo',
            link: 'https://www.facebook.com/profile.php?id=100006057602357',
            },
            {
            icon: 'mdi-alpha-v-circle-outline',
            color: 'green accent-2',
            link: 'https://velog.io/@ieed0205',
            },
            {
            icon: 'mdi-instagram',
            color: 'red lighten-3',
            link: 'https://www.instagram.com/2_byung_jun/',
            },
        ],
    }),
    methods: {
        onClickLink(link){
            window.open(link, '_blank')
        },
    },
    mounted(){
        axios.get("https://graph.facebook.com/v9.0/2724006211144606/feed?fields=id%2Cmessage%2Clink%2Cattachments%2Ccreated_time&access_token=EAAaGix3ci3MBAI7udGwN7Ku91aRRitJRZCUeGCLZCFKZBJ7b8HflKsnXMmC0u4E7sh38t0oHuUgFbDvfjQk7gVZCUn1k8V6WBRqNgbjkf8gV971suwd8tRZAsdNjRW8zBwb2BxYZCaOwHfeai45VOLVTSAIWaeCdlTIfgvcE1dGwZDZD")
        .then((res) => {
            var data = res.data.data
            console.log(data)
            for(var i=0; i<data.length; i++){
                var resData = {
                    title:'',
                    image:'',
                    context:'',
                    link:'',
                }
                resData.title = data[i].created_time.substring(0,10)

                if(Object.keys(data[i]).includes('attachments')){
                    resData.image = data[i].attachments.data[0].media.image.src
                }else{    
                    resData.image = '@/img/logo.png'
                }
                if(Object.keys(data[i]).includes('message')){
                    resData.context = data[i].message.substring(0,30) + '...'
                }else{
                    resData.context = ''
                }
                if(Object.keys(data[i]).includes('link')){
                    resData.link = data[i].link
                }else{    
                    resData.link = 'https://www.facebook.com/profile.php?id=100006057602357'
                }
                this.cards.push(resData)
            }
        })
    }
}
</script>

<style>

</style>