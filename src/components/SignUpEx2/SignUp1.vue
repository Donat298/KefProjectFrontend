<template>
    <div>
        <div class="register1">
            <my-button
                
                @click="$emit('closeSignUpDialog')"
                style="
                    margin-right: -29%;
                    margin-top: -13%;
                    border: 2px solid #4d3da0;
                "
                ><fa icon="fa-solid fa-xmark"></fa>
            </my-button>
        </div>
        <v-img class="logh" src="@/assets/5opka.png" />
        <h1>SignUp</h1>

        <div class="register1">
            <form>
                <my-input
                    v-focus
                    style="border: 2px solid #4d3da0"
                    v-model="newUser.NewName"
                    type="text"
                    placeholder="Enter Name"
                />
                <my-input
                    style="border: 2px solid #4d3da0"
                    type="text"
                    placeholder="Enter Email"
                    v-model="newUser.NewEmail"
                />
                <my-input
                    style="border: 2px solid #4d3da0"
                    type="number"
                    placeholder="Enter Phone Number"
                    v-model="newUser.NewPhoneNumber"
                />
                <my-button
                    
                    style="border: 2px solid #4d3da0"
                    @click="$emit('newUser', newUser)"
                    >SignUp
                </my-button>
            </form>
        </div>
    </div>
</template>

<script>

export default {
    components: {},
    setup() {
        return {
            newUser: {
                NewName: "",
                NewEmail: "",
                NewPhoneNumber: "",
            },
        };
    },
    data() {
        return {};
    },
    methods: {

    },
};
</script>

<style scoped>
.logh {
    width: 400px;
}
</style>