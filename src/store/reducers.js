import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"


// Inventory Items
import ItemReducer from "./items/reducer"

//E-commerce
import ecommerce from "./e-commerce/reducer"

//Calendar
import calendar from "./calendar/reducer"

//chat
import chat from "./chat/reducer"

//crypto
import crypto from "./crypto/reducer"

//invoices
import invoices from "./invoices/reducer"

//jobs
import JobReducer from "./jobs/reducer"

//projects
import projects from "./projects/reducer"


//tasks
import tasks from "./tasks/reducer"

//contacts
import contacts from "./contacts/reducer"

//mails
import mails from "./mails/reducer";

//Dashboard 
import Dashboard from "./dashboard/reducer";

//Dasboard saas
import DashboardSaas from "./dashboard-saas/reducer";

//models
import models from "./models/reducer";

//addValues
import addValues from "./addValues/reducer";

//login
import login from "./auth/login/reducer";

//users
import users from "./users/reducer"

//orders
import orders from "./orders/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  ecommerce,
  calendar,
  chat,
  mails,
  crypto,
  invoices,
  JobReducer,
  projects,
  tasks,
  contacts,
  Dashboard,
  DashboardSaas,
  ItemReducer,
  models,
  addValues,
  login,
  users,
  orders,
})

export default rootReducer
