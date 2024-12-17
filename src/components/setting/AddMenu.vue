<template>
    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    >
    <v-text-field
        v-model="item.title"
        :counter="6"
        :rules="titleRules"
        label="메뉴명"
        required
    ></v-text-field>

    <v-text-field
        v-model="item.link"
        :rules="linkRules"
        label="URL"
        required
    ></v-text-field>

    <v-text-field
        v-model="item.icon"
        label="아이콘"
    ></v-text-field>

    <v-text-field
        v-model="item.etc"
        label="비고"
    ></v-text-field>

    <v-btn
        :disabled="!valid"
        color="success"
        class="mt-4 mr-4"
        @click="validate"
    >
        추가
    </v-btn>

    <v-btn
        color="error"
        class="mt-4 mr-4"
        @click="reset"
    >
        리셋
    </v-btn>

    </v-form>
</template>

<script>
export default {
    data: () => ({
        valid: true,
        titleRules: [
            v => !!v || '메뉴명은 필수입니다.',
            v => (v && v.length <= 6) || '최대 6자까지 가능합니다.',
        ],
        linkRules: [
            v => !!v || 'URL은 필수입니다.',
        ],
        item: {
            title: '',
            link: '/',
            icon: 'mdi-menu',
            etc: ''
        }
    }),
    methods: {
        validate () {
            if(this.$refs.form.validate()){
                this.addMenu()
            }
        },
        reset () {
            this.$refs.form.reset()
        },
        addMenu() {
            /* insert DB */
            this.$store.dispatch('menu/insertMenu', this.item)
            this.reset()
        }
    },
}
</script>