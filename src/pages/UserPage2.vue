<template>
    <div v-if="$store.getters.isAuthenticated">
        <v-parallax style="width: 100%;" src="@/assets/ghg.svg">
        <div
            style="
                overflow-y: auto;
                margin-left: auto;
                margin-right: auto;
                width: 100%;
            "
        >
            <v-img class="logh" src="@/assets/5opka.png" />

            <h1 class="wet" style="margin-bottom: 30px;">Create your Account</h1>

            <div class="register1">
                <my-button2
                    @click="show = true"
                    style="
                        background-color: #4d3da0;
                        border: 10px solid #4d3da0;
                        margin-bottom: 20px;
                    "
                    >Create Account <fa icon="fa-solid fa-user-plus"></fa>
                </my-button2>
            </div>
            
            <MyOkno1 v-if="show === true">
                <SignUp1 @newUser="createNewUser" @closeSignUpDialog="this.show = false"/>
            </MyOkno1>

            <div class="register1">
                <AccList2 ref="childRef" @deleteUser="deleteUser" :todos="state.todos"> </AccList2>
            </div>
        </div>
    </v-parallax>
    </div>
    <IfnotAuth v-if="!$store.getters.isAuthenticated"></IfnotAuth>
</template>
    
    <script>
import AccList2 from "@/components/SignUpEx2/AccList2.vue";
import MyOkno1 from "@/components/SignUpEx2/MyOkno1.vue";
import SignUp1 from "@/components/SignUpEx2/SignUp1.vue";
import todocrud from "@/modules/todocrud"
import IfnotAuth from "@/components/IfnotAuth/IfnotAuth.vue";
import { onMounted } from 'vue'

export default {
    name: "UserPage2",
    components: {
        MyOkno1,
        AccList2,
        SignUp1,
        IfnotAuth
    },

    data() {
        return {
            show: false,
            newTo: false,
        };
    },
    setup() {
        const { state, GetAllTodos, newTodo, deleteTodo } = todocrud();

        onMounted(() => {
            GetAllTodos();
        });

        return {
            state,
            GetAllTodos,

            newTodo,
            deleteTodo,
        };
    },
    methods: {
       

        createNewUser(newUser){
            this.state.NewName = newUser.NewName;
            this.state.NewEmail = newUser.NewEmail;
            this.state.NewPhoneNumber = newUser.NewPhoneNumber;
            this.newTodo();
            this.show = false;
        },
        deleteUser(itemId){
          this.deleteTodo(itemId)
        },
    },
    computed: {},
};
</script >
    
<style >
.logh {
    margin-bottom: -20px;
    width: 450px;

    margin: auto;
}
.glob {
    top:64px;
    bottom: 0;
    right: 0;
    left: 0;
    background-color:#26954700;
    position: fixed;
    display: flex;
}

</style>
    