import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";
import { auth } from '../../helpers/firebase'
import { getUsersData as onGetUsers,  getItems as onGetItems, } from '../../store/actions'

import { connect } from "react-redux";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

import logoLightPng from '../../assets/images/logo-light.png';
//i18n
import { withTranslation } from "react-i18next";

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
} from "../../store/actions";
import { useSelector, useDispatch } from 'react-redux'

const Header = props => {
  const dispatch = useDispatch()

  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  function tToggle() {
    var body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }
  }

useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        dispatch(onGetUsers(currentUser.uid))
      } else {
        setUsers(null)
      }
    })

    return () => unsubscribe()
}, [])

  return (
    <React.Fragment>
      <header id='page-topbar'>
        <div className='navbar-header'>
          <div className='d-flex'>
            <button
              type='button'
              onClick={() => {
                tToggle()
              }}
              className='btn btn-sm px-3 font-size-16 header-item '
              id='vertical-menu-btn'
            >
              <i className='fa fa-fw fa-bars' />
            </button>
            <div className=''>
                <span className='logo-sm'>
                  <img src={logoLightPng} alt='' height='50' />
                </span>
            </div>
          </div>
          <div className='d-flex'>

            <div className='dropdown d-none d-lg-inline-block ms-1'>
              <button
                type='button'
                onClick={() => {
                  toggleFullscreen()
                }}
                className='btn header-item noti-icon '
                data-toggle='fullscreen'
              >
                <i className='bx bx-fullscreen' />
              </button>
            </div>

            <ProfileMenu />

            <div
              onClick={() => {
                props.showRightSidebarAction(!props.showRightSidebar)
              }}
              className='dropdown d-inline-block'
            >
              <button
                type='button'
                className='btn header-item noti-icon right-bar-toggle '
              >
                <i className='bx bx-cog bx-spin' />
              </button>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  )
};

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func
};

const mapStatetoProps = state => {
  const {
    layoutType,
    showRightSidebar,
    leftMenu,
    leftSideBarType,
  } = state.Layout;
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header));
