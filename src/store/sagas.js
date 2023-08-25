import { all, fork } from "redux-saga/effects"

//public

import LayoutSaga from "./layout/saga"
import ecommerceSaga from "./e-commerce/saga"
import calendarSaga from "./calendar/saga"
import chatSaga from "./chat/saga"
import cryptoSaga from "./crypto/saga"
import invoiceSaga from "./invoices/saga"
import jobsSaga from "./jobs/saga"
import projectsSaga from "./projects/saga"
import tasksSaga from "./tasks/saga"
import mailsSaga from "./mails/saga"
import contactsSaga from "./contacts/saga";
import dashboardSaga from "./dashboard/saga";
import dashboardSaasSaga from "./dashboard-saas/saga";
import itemsSaga from "./items/saga";
import modelsSaga from "./models/saga";
import addValuesSaga from "./addValues/saga";
import loginUser from "./auth/login/saga";
import usersSaga from "./users/saga"
import ordersSaga from "./orders/saga"

export default function* rootSaga() {
  yield all([
    //public
    fork(LayoutSaga),
    fork(ecommerceSaga),
    fork(calendarSaga),
    fork(chatSaga),
    fork(mailsSaga),
    fork(cryptoSaga),
    fork(invoiceSaga),
    fork(jobsSaga),
    fork(projectsSaga),
    fork(tasksSaga),
    fork(contactsSaga),
    fork(dashboardSaga),
    fork(dashboardSaasSaga),
    fork(itemsSaga),
    fork(modelsSaga),
    fork(addValuesSaga),
    fork(loginUser),
    fork(usersSaga),
    fork(ordersSaga),
  ])
}
