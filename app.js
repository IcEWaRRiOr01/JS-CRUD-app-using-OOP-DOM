const formEmp = document.getElementById('formEmp');
const inputName = document.getElementById('name');
const inputEmail = document.getElementById('email');
const inputMobile = document.getElementById('mobile');
const tableBody = document.querySelector('#example tbody');
const submit = document.getElementById('submit');
const contIdEdit = document.getElementById('contIdEdit');

class Employee {
    constructor(id, name, email, mobile) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
    }
    showData() {
        Employee.showHtml(this.id, this.name, this.email, this.mobile);
        return this;
    }
    storeEmployee() {
        const allData = JSON.parse(localStorage.getItem('employees')) ?? [];
        allData.push({ id: this.id, name: this.name, email: this.email, mobile: this.mobile });
        localStorage.setItem('employees', JSON.stringify(allData));
    }
    static showAllEmployees() {
        if (localStorage.getItem('employees')) {
            JSON.parse(localStorage.getItem('employees')).forEach((item) => {
                Employee.showHtml(item.id, item.name, item.email, item.mobile);

            })

        }

    }
    updateEmployee(id) {
        const newItem = { id: id, name: this.name, email: this.email, mobile: this.mobile };
        const updateData = JSON.parse(localStorage.getItem("employees")).map((item) => {
            if (item.id == id) {
                return newItem;
            }
            return item;
        })

        localStorage.setItem("employees", JSON.stringify(updateData));
    }
    static showHtml(id, name, email, mobile) {
        const trEl = document.createElement('tr');
        trEl.innerHTML = `
            <tr  role='row'>
                <td>${name} </td>
                <td>${email}</td>
                <td>${mobile}</td>
                <td>
                    <button class="btn btn-info edit" data-id="${id}">Edit</button>
                    <button class="btn btn-danger delete" data-id="${id}">Delete</button>
                </td>
            </tr>
        `;
        tableBody.appendChild(trEl);
    }
}
Employee.showAllEmployees();
formEmp.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!contIdEdit.value) {
        let id = Math.floor(Math.random() * 1000000);
        const newEmp = new Employee(id, inputName.value, inputEmail.value, inputMobile.value);
        newEmp.showData().storeEmployee();

    } else {
        const id = contIdEdit.value;
        const newEmp = new Employee(id, inputName.value, inputEmail.value, inputMobile.value);
        newEmp.updateEmployee(id);
        submit.value = "Store This Data";
        tableBody.innerHTML = "";
        Employee.showAllEmployees();
    }
    inputName.value = '';
    inputEmail.value = '';
    inputMobile.value = '';
    contIdEdit.value = '';
})
tableBody.addEventListener("click", (e) => {


    if (e.target.classList.contains("delete")) {
        const id = +e.target.getAttribute("data-id");
        const emps = JSON.parse(localStorage.getItem('employees'))
        const newData = emps.filter((el) => el.id != +id);
        localStorage.setItem("employees", JSON.stringify(newData));
        e.target.parentElement.parentElement.remove();
    }


    if (e.target.classList.contains("edit")) {
        const id = +e.target.getAttribute("data-id");
        const mainItem = JSON.parse(localStorage.getItem('employees')).find(item => item.id === id)
        inputName.value = mainItem.name;
        inputMobile.value = mainItem.mobile;
        inputEmail.value = mainItem.email;
        contIdEdit.value = id;
        submit.value = "Edit This Item";


    }
})
