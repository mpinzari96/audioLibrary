import MobxReactForm from "mobx-react-form"
import validatorjs from 'validatorjs'

const plugins = { dvr: validatorjs }


// const fields=[
// "firstName",
// "lastName",
// "phoneNumber",
// "email"
// ]
const fields = {

  firstName: {
    name: 'firstName',
    label: 'First Name',
    placeholder: 'Insert First Name',
     rules: 'required|text|string|between:0,25',
  },
  lastName: {
    name: 'lastName',
    label: 'Last Name',
    placeholder: 'Insert Last Name',
    rules: 'required|text|string|between:0,25',
  },
  phoneNumber: {
    name: 'phoneNumber',
    label: 'Phone Number',
    placeholder: 'Insert Phone Number',
    rules: 'required|number',
  },
  email: {
    name: 'email',
    label: 'Email',
    placeholder: 'Insert Email',
    rules: 'email|string|between:5,40',
  }
};

const labels = {
  "firstName": "First Name",
  "lastName": "Last Name",
  "phoneNumber": "Phone Number",
  "email": "Email"
}

export default new MobxReactForm({ fields, labels }, { plugins })
