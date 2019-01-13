// export const API_KEY = "b7b132ef558b085b8867a43b9304df23";


class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }

  submitForm() {
    const value = this.budgetInput.value;

    if (value === '' || value < 0) {
      this.budgetFeedback.classList.add('showItem');
      this.budgetFeedback.innerHTML = `<p>Value can not be empty or null</p>`
      const self = this;
      setTimeout(() => {
        self.budgetFeedback.classList.remove('showItem')
      }, 4000)
    } else {
      this.budgetAmount.textContent = value;
      this.budgetInput.value = '';
      this.showBalance()
    }
  }


  // expense form 

 editExpense(element) {
    let id = parseInt(element.dataset.id)
     let parent = element.parentElement.parentElement.parentElement;
     this.expenseList.removeChild(parent)
     let expense = this.itemList.filter(item=>{
        return item.id === id;
     })

     this.expenseInput.value =expense[0].title;
     this.amountInput.value = expense[0].amount;
     let temp = this.itemList.filter(item=>{
        return item.id != id;
     })
     // console.log('chk expense',temp)
     this.itemList = temp;
     this.showBalance();
  }


  deleteExpense(element) {
    let id = parseInt(element.dataset.id)
    let parent = element.parentElement.parentElement.parentElement;
     this.expenseList.removeChild(parent);
     let temp = this.itemList.filter(item=>{
        return item.id != id;
     })
     // console.log('chk expense',temp)
     this.itemList = temp;
     console.log('chk delete',this.itemList)
     this.showBalance();
  }






  expenseSubmitForm() {
    const expenseValue = this.expenseInput.value;
    const amountValue = this.amountInput.value;
    if (expenseValue === '' || amountValue === '' || amountValue < 0) {
      this.expenseFeedback.classList.add('showItem');
      this.expenseFeedback.innerHTML = '<p>Values can not be empty or negative</p>'
      const self = this;
      setTimeout(() => {
        self.expenseFeedback.classList.remove('showItem')
      }, 4000)
    } else {
      let amount = parseInt(amountValue);
      this.expenseInput.value = '';
      this.amountInput.value = '';
      let expense = {
        id: this.itemID,
        title: expenseValue,
        amount

      }
      this.itemID++;
      this.itemList.push(expense);
      this.addExpense(expense);
      this.showBalance()
      console.log('chk items top',this.itemList)
    }

  }




  // show balance
  showBalance() {
    let expense = this.totalExpense();
    let total = parseInt(this.budgetAmount.textContent) - expense

    this.balanceAmount.textContent = total
    if (total < 0) {
      this.balance.classList.remove('showGreen', 'showBlack')
      this.balance.classList.add('showRed')
    } else if (total > 0) {
      this.balance.classList.remove('showRed', 'showBlack');
      this.balance.classList.add('showGreen')
    } else if (total === 0) {
      this.balance.classList.remove('showRed', 'showGreen');
      this.balance.classList.add('showBlack')
    }
  }



  addExpense(expense) {
    let div = document.createElement('div');
    div.classList.add('expense');
    div.innerHTML = `
         <div class="expense-item d-flex justify-content-between align-items-baseline">

         <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>
         <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

         <div class="expense-icons list-item">

          <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
           <i class="fas fa-edit"></i>
          </a>
          <a href="#" class="delete-icon"  data-id="${expense.id}">
           <i class="fas fa-trash"></i>
          </a>
         </div>
        </div>`

    this.expenseList.appendChild(div);

  }

  totalExpense() {
    let total = 0;
    if (this.itemList.length > 0) {
      total = this.itemList.reduce((acc, curr) => {
        console.log('chk value', acc, curr.amount)
        acc += curr.amount;

        return acc;
      }, 0)
    }
    this.expenseAmount.textContent = total;
    return total;
    console.log('sdsds', total)
  }

 

}


function eventListener() {
  const budgetForm = document.getElementById('budget-form');
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');

  const ui = new UI();

  budgetForm.addEventListener('submit', function (event) {
    event.preventDefault();
    ui.submitForm()
  })
  expenseForm.addEventListener('submit', function (event) {
    event.preventDefault();
    ui.expenseSubmitForm()
  })
  expenseList.addEventListener('click', function (event) {
    if (event.target.parentElement.classList.contains('edit-icon')) {

      ui.editExpense(event.target.parentElement);

    } else if (event.target.parentElement.classList.contains('delete-icon')) {
      ui.deleteExpense(event.target.parentElement);
    }
  })
}

document.addEventListener('DOMContentLoaded', function () {
  eventListener();
})