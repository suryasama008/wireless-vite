import PropTypes from 'prop-types'
import React,{useState} from 'react'

import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from 'reactstrap'
import logodark from '../../assets/images/logo-dark.png'
import logolight from '../../assets/images/logo-light.png'
import CarouselPage from '../AuthenticationInner/CarouselPage'
//redux
import { useSelector, useDispatch } from 'react-redux'
import logoLightPng from '../../assets/images/logo-light.png'
import { withRouter, Link } from 'react-router-dom'

// Formik validation
import * as Yup from 'yup'
import { useFormik } from 'formik'

// actions
import { loginUser } from '../../store/actions'

// import images
import profile from '../../assets/images/profile-img.png'
import logo from '../../assets/images/logo.svg'

const Login = (props) => {
  //meta title
  document.title = 'Login | Skote - Vite React Admin & Dashboard Template'

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
   const [passwordShow, setPasswordShow] = useState(false)
  const [show, setShow] = useState(false);

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const user = { email, password }
    dispatch(loginUser(user, props.history))
  }

  // const { error } = useSelector((state) => ({
  //   error: state.Login.error,
  // }))

   // Form validation 
   const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email:'bccll@wirelessplus.com', 
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your username"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      console.log("values", values);
      const user = { email, password }
      dispatch(loginUser(values, props.history))
    }
  });

  return (
    <React.Fragment>
      <div>
        <Container fluid className='p-0'>
          <Row className='g-0'>
            <CarouselPage />
            <Col xl={3}>
              <div className='auth-full-page-content p-md-5 p-4'>
                <div className='w-100'>
                  <div className='d-flex flex-column h-100'>
                    <div className='my-auto'>
                      <div>
                        <h5 className='text-primary'>Welcome Back !</h5>
                        <p className='text-muted'>
                          Sign in to continue to Wireless +.
                        </p>
                      </div>

                      <div className='mt-4'>
                        <Form
                          className='form-horizontal'
                          onSubmit={(e) => {
                            e.preventDefault()
                            validation.handleSubmit()
                            return false
                          }}
                        >
                          <div className='mb-3'>
                            <Label className='form-label'>Username</Label>
                            <select
                              name='email'
                              value={validation.values.email}
                              className='form-select'
                              onChange={validation.handleChange}
                            >
                              <option value='bccll@wirelessplus.com'>
                                BCC LL
                              </option>
                              <option value='bccul@wirelessplus.com'>
                                BCC UL
                              </option>
                              <option value='emtc@wirelessplus.com'>
                                EMTC
                              </option>
                              <option value='emtccart@wirelessplus.com'>
                                EMTC CART
                              </option>
                              <option value='squareone@wirelessplus.com'>
                                SQUARE ONE
                              </option>
                              <option value='tp1@wirelessplus.com'>TP1</option>
                              <option value='tecumseh@wirelessplus.com'>
                                TECUMSEH
                              </option>
                              <option value='amin@wirelessplus.com'>
                                AMIN
                              </option>
                              <option value='sohil@wirelessplus.com'>
                                SOHIL
                              </option>
                              <option value='admin@wirelessplus.com'>
                                ADMIN
                              </option>
                            </select>
                          </div>

                          <div className='mb-3'>
                            <div className='float-end'>
                              <Link
                                to='/auth-recoverpw-2'
                                className='text-muted'
                              >
                                Forgot password?
                              </Link>
                            </div>
                            <div className='mb-3'>
                              <Label className='form-label'>Password</Label>
                              <div className='input-group auth-pass-inputgroup'>
                                <Input
                                  name='password'
                                  value={validation.values.password || ''}
                                  type={show ? 'text' : 'password'}
                                  placeholder='Enter Password'
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  invalid={
                                    validation.touched.password &&
                                    validation.errors.password
                                      ? true
                                      : undefined
                                  }
                                />
                                <button
                                  onClick={() => setShow(!show)}
                                  className='btn btn-light '
                                  type='button'
                                  id='password-addon'
                                >
                                  <i className='mdi mdi-eye-outline'></i>
                                </button>
                              </div>
                              {validation.touched.password &&
                              validation.errors.password ? (
                                <FormFeedback type='invalid'>
                                  {validation.errors.password}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </div>

                          <div className='form-check'>
                            <Input
                              type='checkbox'
                              className='form-check-input'
                              id='auth-remember-check'
                            />
                            <label
                              className='form-check-label'
                              htmlFor='auth-remember-check'
                            >
                              Remember me
                            </label>
                          </div>

                          <div className='mt-3 d-grid'>
                            <button
                              className='btn btn-primary btn-block '
                              type='submit'
                              // onClick={(e) => handleSubmit(e)}
                            >
                              Log In
                            </button>
                          </div>
                        </Form>

                        <div className='mt-5 text-center'>
                          <p>
                            Don&apos;t have an account ?
                            <Link
                              to='pages-register-2'
                              className='fw-medium text-primary'
                            >
                              Signup now
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className='mt-4 mt-md-5 text-center'>
                      <p className='mb-0'>
                        © {new Date().getFullYear()} Wireless +. Crafted by
                        Surya Sama
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Login)

Login.propTypes = {
  history: PropTypes.object,
}
