const del = document.querySelectorAll('.del')
const edit = document.getElementById('edit')

del.forEach(button => {
    button.addEventListener('click', (e) => {
        fetch(`http://localhost:3000/${e.target.id}`, {
            method: 'DELETE'
        }).then(res => res.json())
            .then(data => {
                if (data.success) {
                    e.target.parentElement.remove()
                }
            })
            .catch(err => console.log(err))
    })
})

if (edit) { 
    edit.addEventListener('click', (e) => {
        const id = document.getElementById('userId').value
        const name = document.getElementById('name').value
        const lastname = document.getElementById('lastname').value
        const age = document.getElementById('age').value
        const email = document.getElementById('email').value
        const address = document.getElementById('address').value
        fetch(`http://localhost:3000/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, lastname, age, email, address })
        }).then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert('User edited successfully')
                    window.location.href = '/'
                }
            })
            .catch(err => console.log(err))
    })
}