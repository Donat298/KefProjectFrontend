import { ref } from 'vue'
const getTodos = () => {
    const state = ref({
        NewName: '',
        NewEmail: '',
        NewPhoneNumber: '',
        todos: {}
    })
    const GetAllTodos = async() => {
        try {
            await  fetch('http://localhost:3000/todos')
            .then(res => res.json())
            .then(data => {
              state.value.todos = data
            })

        }
        catch(error) {
            console.log(error)


        }

    }
    const newTodo = () => {
        const requireOptions = {
            method: "POST",
            headers: {
                "Content-type": "application/json"

            },
            body: JSON.stringify({
                Name: state.value.NewName,
                Email: state.value.NewEmail,
                Phonenumber: state.value.NewPhoneNumber,
            })
        }
        fetch("http://localhost:3000/todos/new",
        requireOptions
        )
        .then(() => {
            GetAllTodos()
         })
             
    }
    const deleteTodo = (_id) => {
        fetch("http://localhost:3000/todos/delete/" + _id , { method: "DELETE"})
        .then(() => {
            GetAllTodos()
         })
        
    }
    
    return {
        state,
        GetAllTodos,
        newTodo,
        deleteTodo
    }
}
export default getTodos