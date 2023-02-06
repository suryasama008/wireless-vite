import PropTypes from "prop-types"
import React, { useEffect, useRef } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

const SidebarContent = props => {
  const ref = useRef()
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname

    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.location.pathname])

  useEffect(() => {
    ref.current.recalculate()
  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false
    }
    scrollElement(item);
    return false
  }

  return (
    <React.Fragment>
      <SimpleBar className='h-100' ref={ref}>
        <div id='sidebar-menu'>
          <ul className='metismenu list-unstyled' id='side-menu'>
            <li className='menu-title'>{props.t('Menu')} </li>
            <li>
              <Link to='/dashboard' className=''>
                <i className='bx bx-home-circle'></i>
                <span>{props.t('Dashboards')}</span>
              </Link>
            </li>

            <li className='menu-title'>{props.t('Products')}</li>
            <li>
              <Link to='/items' className=''>
                <i className='bx bx-food-menu'></i>
                <span>{props.t('Products')}</span>
              </Link>
            </li>
            <li>
              <Link to='/crypto-orders'>
                <i className='bx bx-task'></i>
                <span>{props.t('Order')}</span>
              </Link>
            </li>
            <li className='menu-title'>{props.t('Employees')}</li>
            <li>
              <Link to='/calendar' className=' '>
                <i className='bx bx-calendar'></i>
                <span>{props.t('Schedule')}</span>
              </Link>
            </li>

            <li>
              <Link to='/chat' className=''>
                <i className='bx bx-chat'></i>
                <span>{props.t('Chat')}</span>
              </Link>
            </li>
            <li className='menu-title'>{props.t('Store')}</li>
            <li>
              <Link to='/contacts-list'>
                <i className='bx bxs-user-detail'></i>
                <span>{props.t('Contacts')}</span>
              </Link>
            </li>
            <li>
              <Link to='/#' className=''>
                <i className='bx bx-paper-plane'></i>
                <span>{props.t('Shootout')}</span>
              </Link>
            </li>
            <li>
              <Link to='/invoices-detail' className=' '>
                <i className='bx bx-receipt'></i>
                <span>{props.t('Invoices')}</span>
              </Link>
            </li>
            <li className='menu-title'>Pages</li>
            <li>
              <Link to='/#' className='has-arrow '>
                <i className='bx bx-user-circle'></i>
                <span>{props.t('Authentication')}</span>
              </Link>
              <ul className='sub-menu'>
                <li>
                  <Link to='/pages-login'>{props.t('Login')}</Link>
                </li>
                <li>
                  <Link to='/pages-login-2'>{props.t('Login 2')}</Link>
                </li>
                <li>
                  <Link to='/pages-register'>{props.t('Register')}</Link>
                </li>
                <li>
                  <Link to='/pages-register-2'>{props.t('Register 2')}</Link>
                </li>
                <li>
                  <Link to='/page-recoverpw'>
                    {props.t('Recover Password')}
                  </Link>
                </li>
                <li>
                  <Link to='/page-recoverpw-2'>
                    {props.t('Recover Password 2')}
                  </Link>
                </li>
                <li>
                  <Link to='/auth-lock-screen'>{props.t('Lock Screen')}</Link>
                </li>
                <li>
                  <Link to='/auth-lock-screen-2'>
                    {props.t('Lock Screen 2')}
                  </Link>
                </li>
                <li>
                  <Link to='/page-confirm-mail'>{props.t('Confirm Mail')}</Link>
                </li>
                <li>
                  <Link to='/page-confirm-mail-2'>
                    {props.t('Confirm Mail 2')}
                  </Link>
                </li>
                <li>
                  <Link to='/auth-email-verification'>
                    {props.t('Email Verification')}
                  </Link>
                </li>
                <li>
                  <Link to='/auth-email-verification-2'>
                    {props.t('Email Verification 2')}
                  </Link>
                </li>
                <li>
                  <Link to='/auth-two-step-verification'>
                    {props.t('Two Step Verification')}
                  </Link>
                </li>
                <li>
                  <Link to='/auth-two-step-verification-2'>
                    {props.t('Two Step Verification 2')}
                  </Link>
                </li>
              </ul>
            </li>
            <li className='menu-title'>{props.t('Components')}</li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
