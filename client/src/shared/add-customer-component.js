import MobxReactForm from "mobx-react-form"
import validatorjs from 'validatorjs'

const plugins = { dvr: validatorjs }


const fields=[
"firstName",
"lastName",
"phoneNumber",
"email"
]


const labels={
"firstName":"First Name",
"lastName":"Last Name",
"phoneNumber":"Phone Number",
"email":"Email"
}

export default new MobxReactForm({fields,labels},{plugins})
