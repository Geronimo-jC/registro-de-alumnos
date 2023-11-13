const record = []

const saveRecord = (element) => {
    localStorage.setItem('recordStudents', JSON.stringify(element))
}

const getStudent = () => {
    const name = document.getElementById('name')
    const clase = document.getElementById('clase')
    const dni = document.getElementById('dni')
    const nt1 = document.getElementById('nt1')
    const nt2 = document.getElementById('nt2')
    const nt3 = document.getElementById('nt3')
    const points = document.getElementById('points')
    const student = {
        name: name.value,
        clase: clase.value,
        dni: dni.value,
        nt1: nt1.value,
        nt2: nt2.value,
        nt3: nt3.value,
        points: points.value
    }
    return student
}

const editRegister = (id) => {
    const register = record[id]
    setForm(register)
    document.getElementById('dni').setAttribute('readonly', '')
    document.getElementById('add').innerHTML = 'Actualizar'
    document.getElementById('delete').classList.remove('notShow')
    document.getElementById('X').classList.remove('notShow')
}

const deleteRegister = () => {
    const dni = document.getElementById('dni').value
    const student = record.find(e => e.dni.includes(dni))
    const id = record.indexOf(student)
    console.log(id)
    record.splice(id, 1)
    setForm('')
    showRecord()
    saveRecord(record)
    add.innerHTML = 'Agregar'
    document.getElementById('dni').removeAttribute('readonly')
    document.getElementById('delete').classList.add('notShow')
    document.getElementById('X').classList.add('notShow')
}

const cancelEdit = () => {
    setForm('')
    add.innerHTML = 'Agregar'
    document.getElementById('dni').removeAttribute('readonly')
    document.getElementById('delete').classList.add('notShow')
    document.getElementById('X').classList.add('notShow')
}

const showRecord = () => {
    const tbody = document.getElementById('tbody')
    tbody.innerHTML = ''
    record.map((e, i) => {
        tbody.innerHTML += `
        <tr onclick="editRegister(${i})">
        <th scope="row">${e.name}</th>
        <td>${e.clase}</td>
        <td>${e.dni}</td>
        <td>${e.nt1}</td>
        <td>${e.nt2}</td>
        <td>${e.nt3}</td>
        <td>${e.points}</td>
        <td>${e.prom}</td>
        </tr>
        `
    })
}

const setForm = (data) => {
    let listInput = ['name', 'clase', 'dni', 'nt1', 'nt2', 'nt3', 'points']
    if (data === '') {
        listInput.map(e => {
            document.getElementById(e).value = data
        })
    } else {
        listInput.map((e) => {
            document.getElementById(e).value = data[e]
        })
    }
}

const promdy = (list, points) => {
    const valueInitial = 0;
    let trimestry = 0
    const sum = list.reduce((a, e) => a + e, valueInitial)
    list.map((e) => {
        if (Number(e)) {
            trimestry++
        }
    })
    let promedy = (sum / trimestry) + points
    if (promedy > 10) promedy = 10
    return promedy.toFixed(2)
}

const addStudent = (event) => {
    event.preventDefault()
    const add = document.getElementById('add')
    const student = getStudent()
    const prom = promdy([Number(student.nt1), Number(student.nt2), Number(student.nt3)], Number(student.points))
    student.prom = prom
    const id = record.findIndex(e => e.dni.includes(student.dni))
    
    if (add.innerHTML === 'Actualizar') {
        add.innerHTML = 'Agregar'
        record[id] = student
        document.getElementById('dni').removeAttribute('readonly')
        document.getElementById('delete').classList.add('notShow')
        document.getElementById('X').classList.add('notShow')
    }

    if (id !== -1 && add.innerHTML === 'Agregar') {
        alert('Existe un alumno con el mismo dni')
    } else {
        record.push(student)
        showRecord()
        setForm('')
        saveRecord(record)
    }
}

const loadRecord = () => {
    const recordStudents = JSON.parse(localStorage.getItem('recordStudents'));
    if (recordStudents) {
        recordStudents.map(e => record.push(e))
    };
}

loadRecord()
showRecord()