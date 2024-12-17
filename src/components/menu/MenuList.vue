<template>
    <v-list>
        <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.link"
        link
        >
        <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script>
export default {
    computed: {
        items(){
            return this.$store.state.menu.items
        }
    },
    created(){
        this.$store.dispatch('menu/selectMenu')
    }
}
</script>
